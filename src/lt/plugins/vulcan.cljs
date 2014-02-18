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

(def bencode (load/node-module "bencode"))
(def Buffer (js/require "buffer"))
(def net (js/require "net"))

(defn create-buffer [size]
  (let [b (.-Buffer Buffer)]
    (new b size)))

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
           :value "localhost:"}]
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
                                        :action (fn [] (connect-to-remote (dom/val input)))}]})]
    (dom/focus input)
    (.setSelectionRange input 1000 1000)))



(defn connect-to-remote
  "Utility function invoked when UI displayed by `show-connection-ui` receives an
  input. Function parses given `address`, writes configuration into global state
  and dispatches :connect! event"
  [address]
  (let [[host port] (string/split address ":")]
    (when (and host port)
      (let [client (clients/client! :firefox.client)]
        (object/merge! client {:port port
                               :host host
                               :name address})
        (object/raise client :connect!)))))


(behavior
 ::init-remote-session
 :triggers #{:new-session}
 :reaction (fn [this session]
             (object/merge! this {:session session})))

(behavior
 ::client.settings.remote
 :triggers #{:client.settings}
 :reaction (fn [this info]
             (clients/handle-connection! info)
             (object/merge! this {:dir nil})))

(behavior
 ;; GUESS: Action attempt to reconnect.
 ::try-connect!
 :triggers #{:try-connect!}
 :reaction (fn [this _]
             (when (:port @this)
               (object/raise this :connect!))))

(behavior
 ;; Action triggered from the LT connect to firefox UI.
 ::connect!
 :triggers #{:connect!}
 :reaction (fn [client]
             (let [socket (connect-to (:host @client "localhost")
                                      (:port @client)
                                      client)]
               (object/merge! this {:socket socket})
               (notifos/working "Connecting to firefox"))))

(behavior
 ::connect-fail
 :triggers #{::connect-fail}
 :reaction (fn [this]
             (object/raise this :close!)
             (notifos/done-working "Failed to connect to firefox")))

(behavior
 ::connected
 :triggers #{::connected}
 :reaction (fn [this]
             (notifos/done-working)))

(behavior
 ::close
 :triggers #{:close!}
 :reaction clients/rem!)


(behavior
 ::receive-message!
 :triggers #{:receive-message!}
 :reaction (fn [client]
             (let [message (:buffer @client)]
               message)))

(defn parse-message
  [buffer]
  (.parse js/JSON (.toString buffer "utf-8")))


(defn connect-to [host port client]
  "Creates a client connection on given host & port.
  When connected ::connect behavior is triggered.
  When connection fails ::connect-fail behavior is triggered
  When connection is clsoed ::close is triggered"
  (let [socket (.connect net port host)]
    (.on socket "connect" #(when @client (object/raise client ::connected)))
    (.on socket "error" #(when @client (object/raise client ::connect-fail)))
    (.on socket "data" (fn [data]
                         (when @client
                           (swap! (:buffer @client) (fn [] (parse-message data)))
                           (object/raise client ::receive-message!))))
    (.on socket "close" #(when @client (object/raise client :close!)))
    socket))



(defn send [client message]
  (let [session (:session @client)
        message (merge (when session {:session session})
                       message)]
    (send* client message)))

(defn send* [client message]
  (.write (:socket @client)
          (encode message)))
