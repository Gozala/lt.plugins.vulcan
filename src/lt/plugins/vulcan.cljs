(ns lt.plugins.vulcan
  (:require [lt.object :as object]
            [lt.objs.eval :as eval]
            [lt.objs.console :as console]
            [lt.objs.command :as cmd]
            [lt.objs.clients.tcp :as tcp]
            [lt.objs.sidebar.clients :as clients-ui]
            [lt.objs.dialogs :as dialogs]
            [lt.objs.files :as files]
            [lt.objs.popup :as popup]
            [lt.objs.platform :as platform]
            [lt.objs.editor :as editor]
            [lt.objs.plugins :as plugins]
            [lt.plugins.watches :as watches]
            [lt.objs.proc :as proc]
            [clojure.string :as string]
            [lt.objs.clients :as clients]
            [lt.objs.context :as context]
            [lt.objs.notifos :as notifos]
            [lt.util.load :as load]
            [lt.util.dom :as dom]
            [lt.util.cljs :refer [js->clj]])
    (:require-macros [lt.macros :refer [behavior defui]]))


(def *ns-name* (name :lt.plugins.vulcan))
(def *plugin-path* (:dir (plugins/by-name "vulcan")))
(def *firefox-client-path* (files/join *plugin-path*
                                       "node_modules/firefox-client"))

(def Buffer (js/require "buffer"))
(def net (js/require "net"))
(def FirefoxClient (js/require *firefox-client-path*))



;; Adds a connection to the Light Table's "Add connection" UI.
(clients-ui/add-connector
 {:name "Firefox"
  :desc "Enter in the host:port address Firefox listening on"
  :connect (fn [] (show-connection-ui))})

;; Utility function that creates input field for
;; entering `host:port` for the connection.
(defui make-connection-input []
  [:input {:type "text"
           :placeholder "host:port"
           :value "localhost:6000"}]
  :focus (fn [] (context/in! :popup.input))
  :blur (fn [] (context/out! :popup.input)))

(defn show-connection-ui
  "Brings up a connection dialog to input host:port
  when clicked connect-to-remote is invoked"
  []
  (let [input (make-connection-input)
        popup (popup/popup! {:header "Connect to a Firefox's remote debugging API"
                             :body [:div
                                    [:h3 "In order to connect:"]
                                    [:h5 "Enable remote debugging"
                                     [:ul
                                      [:li "Open developer tools in firefox"]
                                      [:li "Visit the settings panel (gear icon in the top left)"]
                                      [:il "Set \"Enable remote debugging\" under \"Advanced Settings\""]]]
                                    [:h5 "Listen to a connection"
                                     [:ul
                                      [:li "Open the Firefox CLI (Tools > Web Developer > Developer Toolbar)"]
                                      [:li "Start a listener by entering: "[:code "listen 6000"]]]]
                                    [:label "Server: "] input]
                             :buttons [{:label "cancel"}
                                       {:label "connect"
                                        :action (fn [] (connect-to (dom/val input)))}]})]
    (dom/focus input)
    (.setSelectionRange input 1000 1000)))



(defn connect-to
  "Utility function invoked when UI displayed by `show-connection-ui` receives an
  input. Function parses given `address`, writes configuration into global state
  and dispatches :connect! event"
  [address]
  (let [[host port] (string/split address ":")]
    (when (and host port)
      (let [client (clients/client! :firefox.client)]
        (object/merge! client {:port port
                               :host host
                               :name (str "Firefox " address)})
        (object/raise client :connect!)))))


(behavior
 ;; GUESS: Action attempt to reconnect.
 ::try-connect!
 :triggers #{:try-connect!}
 :reaction (fn [client _]
             (when (:port @client)
               _
               (object/raise client :connect!))))

(behavior
 ;; Action triggered from the LT connect to firefox UI.
 ::connect!
 :triggers #{:connect!}
 :reaction (fn [client]
             (notifos/working "Connecting to a Firefox")
             (object/merge! client {:socket (FirefoxClient.)})
             (connect client)))

(behavior
 ::connection-failed
 :triggers #{:connection-failed}
 :reaction (fn [client error]
             (object/raise client :close!)
             (if (= (.-code error) "ECONNREFUSED")
               (notifos/done-working "Firefox isn't listening for connections")
               (notifos/done-working "Failed to connect to a Firefox"))))

(behavior
 ::set-session!
 :triggers #{:set-session!}
 :reaction (fn [client session]
             (object/merge! client {:session session
                                    :type "Remote Debugging Protocol"
                                    :sheets {}
                                    :commands #{:editor.eval.js
                                                :editor.eval.css
                                                :editor.eval.cljs.exec}})
             (notifos/done-working "Firefox session is set")))

(behavior
 ::init-session
 :triggers #{:init-session}
 :reaction (fn [client]
             (notifos/working "Setting up Firefox session")
             (.selectedTab (:socket @client)
                           (fn [error tab]
                             (if error
                               (object/raise client :connection-failed error)
                               (object/raise client :set-session! tab))))))

(behavior
 ::connected
 :triggers #{:connect}
 :reaction (fn [client]
             ;(clients/handle-connection! @client)
             (object/raise client :init-session)))

(behavior
 ::close
 :triggers #{:close!}
 :reaction clients/rem!)



(defn connect [client]
  "Creates a client connection on given host & port.
  When connected ::connect behavior is triggered.
  When connection fails ::connect-fail behavior is triggered
  When connection is clsoed ::close is triggered"
  (.on (:socket @client) "end" #(object/raise client :close!))
  (.on (:socket @client) "error" #(object/raise client :connection-failed %))
  (.on (:socket @client) "timeout" #(object/raise client :connection-failed %))
  (.connect (:socket @client)
            (:port @client)
            (:host @client "localhost")
            #(when-not % (object/raise client :connect))))






(object/object* ::firefox-lang
                :tags #{:firefox.lang})

(def lang (object/create ::firefox-lang))

(defn handle-message [client message]
  (print message))

(behavior
 ::editor.eval.css
 :triggers #{::editor.eval.css}
 :reaction (fn [client request callback]
             (let [id (keyword (string/replace (str "local-" (:name request)) #"\." "-"))
                   sheet (id (:sheets @client))
                   sheets (.-StyleSheets (:session @client))]

               (if sheet
                 (.update sheet
                          (:code request)
                          (fn [error] error))
                 (.addStyleSheet sheets
                                 (:code request)
                                 (fn [error sheet]
                                   (object/merge! client
                                                  {:sheets (assoc
                                                             (:sheets @client)
                                                             id
                                                             sheet)})))))))

(behavior
 ::editor.eval.cljs.exec
 :triggers #{::editor.eval.cljs.exec}
 :reaction (fn [client requests]
             (doseq [request (:results requests)]
               (let [console (.-Console (:session @client))
                     info (merge (:meta requests) (:meta request))
                     editor (object/by-id (:ed-id request))]
                 (.evaluateJS console
                              (:code request)
                              (fn [error response]
                                (if (.-exception response)
                                  (object/raise editor
                                                :editor.eval.cljs.exception
                                                {:meta info
                                                 :ex (.-preview (.-obj (.-exception response)))})
                                  (object/raise editor
                                                :editor.eval.cljs.result
                                                {:meta info
                                                 :result (eval/cljs-result-format (.-result response))}))))))))


(defn firefox-parse-simple-grip [result]
  (let [result-type (.-type result)]
    (cond
     (= result-type "undefined") js/undefined
     (= result-type "null") (js* "null")
     (= result-type "Infinity") js/Infinity
     (= result-type "-Infinity") (- js/Infinity)
     (= result-type "NaN") js/NaN
     (= result-type "-0") 0
     (= result-type "longString") (+ (.-initial result) "...")
     :else result)))

(defn firefox-parse-grip [client response cb err]
  "Pretty-print the firefox output"
  (let [result (.-result response)]
    (if (= (.-type result) "object")
      (.selectedTab (:socket @client)
                        (fn [error tab]
                          (if error
                            (err error)
                            (.ownProperties (.createJSObject tab result)
                                            (fn [error properties]
                                              (if error
                                                (err error)
                                                (cb properties)))))))
      (cb (firefox-parse-simple-grip result)))))

(def util-inspect (.-inspect (js/require "util")))

(defn firefox-pretty-print [thing]
  ;; TODO(nikita): better pretty-printing of property values
  ;; Map firefox-parse-simple-grip over the values for better pretty-printing
  ;; Except I don't know how to map over js objects in cljs.
  ;; Might make sense to just port the grip parsing to javascript (and make it part of the firefox-client module)
  (util-inspect thing false 0))

(behavior
 ::editor.eval.js
 :triggers #{::editor.eval.js}
 :reaction (fn [client request]
             (let [console (.-Console (:session @client))
                   info (:meta request)
                   editor (object/by-id (:ed-id request))]
               (.evaluateJS console
                            (:code request)
                            (fn [error response]
                              (if (.-exception response)
                                (object/raise editor
                                              :editor.eval.js.exception
                                              {:meta info
                                               :ex (.-preview (.-obj (.-exception response)))})
                                (firefox-parse-grip client
                                                       response
                                                       (fn [value]
                                                         (object/raise editor
                                                           :editor.eval.js.result
                                                           {:meta info
                                                            :result (firefox-pretty-print value)
                                                            :no-inspect true
                                                            }))
                                                       (fn []))))))))


(behavior
 ::send!
 :triggers #{:send!}
 :reaction (fn [client message]
             (object/raise client
                           (keyword *ns-name* (:command message))
                           (:data message))))

(behavior
 ::client.settings
 :triggers #{:client.settings}
 :reaction (fn [client info]
             (clients/handle-connection! info)))
