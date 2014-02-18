if(!lt.util.load.provided_QMARK_('lt.plugins.vulcan')) {
goog.provide('lt.plugins.vulcan');
goog.require('cljs.core');
goog.require('lt.util.cljs');
goog.require('lt.objs.plugins');
goog.require('lt.objs.files');
goog.require('lt.util.dom');
goog.require('lt.objs.platform');
goog.require('lt.objs.popup');
goog.require('lt.objs.dialogs');
goog.require('lt.objs.popup');
goog.require('lt.objs.context');
goog.require('lt.objs.notifos');
goog.require('lt.objs.proc');
goog.require('lt.objs.notifos');
goog.require('lt.util.dom');
goog.require('lt.objs.context');
goog.require('clojure.string');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.util.cljs');
goog.require('lt.objs.command');
goog.require('lt.objs.platform');
goog.require('lt.objs.files');
goog.require('lt.objs.clients.tcp');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.plugins');
goog.require('lt.plugins.watches');
goog.require('lt.objs.eval');
goog.require('lt.objs.clients');
goog.require('lt.objs.clients.tcp');
goog.require('lt.util.load');
goog.require('clojure.string');
goog.require('lt.plugins.watches');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.dialogs');
goog.require('lt.util.load');
goog.require('lt.objs.console');
goog.require('lt.objs.proc');
goog.require('lt.objs.editor');
goog.require('lt.objs.console');
goog.require('lt.objs.eval');
goog.require('lt.objs.clients');
goog.require('lt.objs.command');
lt.plugins.vulcan.bencode = lt.util.load.node_module.call(null,"bencode");
lt.plugins.vulcan.Buffer = require("buffer");
lt.plugins.vulcan.net = require("net");
lt.plugins.vulcan.create_buffer = (function create_buffer(size){var b = lt.plugins.vulcan.Buffer.Buffer;return (new b(size));
});
lt.objs.sidebar.clients.add_connector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"Firefox",new cljs.core.Keyword(null,"desc","desc",1016984067),"Enter in the host:port address Firefox listening on",new cljs.core.Keyword(null,"connect","connect",1965255772),(function (){return lt.plugins.vulcan.show_connection_ui.call(null);
})], null));
lt.plugins.vulcan.make_connection_input = (function make_connection_input(){var e__8120__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),"text",new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),"host:port",new cljs.core.Keyword(null,"value","value",1125876963),"localhost:"], null)], null));var seq__8210_8228 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",1111509066),(function (){return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"popup.input","popup.input",4788025210));
}),new cljs.core.Keyword(null,"blur","blur",1016931289),(function (){return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"popup.input","popup.input",4788025210));
})], null)));var chunk__8211_8229 = null;var count__8212_8230 = 0;var i__8213_8231 = 0;while(true){
if((i__8213_8231 < count__8212_8230))
{var vec__8214_8232 = cljs.core._nth.call(null,chunk__8211_8229,i__8213_8231);var ev__8121__auto___8233 = cljs.core.nth.call(null,vec__8214_8232,0,null);var func__8122__auto___8234 = cljs.core.nth.call(null,vec__8214_8232,1,null);lt.util.dom.on.call(null,e__8120__auto__,ev__8121__auto___8233,func__8122__auto___8234);
{
var G__8235 = seq__8210_8228;
var G__8236 = chunk__8211_8229;
var G__8237 = count__8212_8230;
var G__8238 = (i__8213_8231 + 1);
seq__8210_8228 = G__8235;
chunk__8211_8229 = G__8236;
count__8212_8230 = G__8237;
i__8213_8231 = G__8238;
continue;
}
} else
{var temp__4092__auto___8239 = cljs.core.seq.call(null,seq__8210_8228);if(temp__4092__auto___8239)
{var seq__8210_8240__$1 = temp__4092__auto___8239;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8210_8240__$1))
{var c__7500__auto___8241 = cljs.core.chunk_first.call(null,seq__8210_8240__$1);{
var G__8242 = cljs.core.chunk_rest.call(null,seq__8210_8240__$1);
var G__8243 = c__7500__auto___8241;
var G__8244 = cljs.core.count.call(null,c__7500__auto___8241);
var G__8245 = 0;
seq__8210_8228 = G__8242;
chunk__8211_8229 = G__8243;
count__8212_8230 = G__8244;
i__8213_8231 = G__8245;
continue;
}
} else
{var vec__8215_8246 = cljs.core.first.call(null,seq__8210_8240__$1);var ev__8121__auto___8247 = cljs.core.nth.call(null,vec__8215_8246,0,null);var func__8122__auto___8248 = cljs.core.nth.call(null,vec__8215_8246,1,null);lt.util.dom.on.call(null,e__8120__auto__,ev__8121__auto___8247,func__8122__auto___8248);
{
var G__8249 = cljs.core.next.call(null,seq__8210_8240__$1);
var G__8250 = null;
var G__8251 = 0;
var G__8252 = 0;
seq__8210_8228 = G__8249;
chunk__8211_8229 = G__8250;
count__8212_8230 = G__8251;
i__8213_8231 = G__8252;
continue;
}
}
} else
{}
}
break;
}
return e__8120__auto__;
});
/**
* Brings up a connection dialog to input host:port
* when clicked connect-to-remote is invoked
*/
lt.plugins.vulcan.show_connection_ui = (function show_connection_ui(){var input = lt.plugins.vulcan.make_connection_input.call(null);var popup = lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"Connect to a Firefox's remote debugging API",new cljs.core.Keyword(null,"body","body",1016933652),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1014003715),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",1013907517),"In order to connect:"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h5","h5",1013907519),"Enable remote debugging",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",1013907977),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),"Open developer tools in firefox"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),"Visit the settings panel (gear icon in the top left)"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"il","il",1013907605),"Set \"Enable remote debugging\" under \"Advanced Settings\""], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h5","h5",1013907519),"Listen to a connection",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",1013907977),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),"Open the Firefox CLI (Tools > Web Developer > Developer Toolbar)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),"Start a listener by entering: ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"code","code",1016963423),"listen 6000"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1116631654),"Server: "], null),input], null),new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"cancel"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"connect",new cljs.core.Keyword(null,"action","action",3885920680),((function (input){
return (function (){return lt.plugins.vulcan.connect_to_remote.call(null,lt.util.dom.val.call(null,input));
});})(input))
], null)], null)], null));lt.util.dom.focus.call(null,input);
return input.setSelectionRange(1000,1000);
});
/**
* Utility function invoked when UI displayed by `show-connection-ui` receives an
* input. Function parses given `address`, writes configuration into global state
* and dispatches :connect! event
*/
lt.plugins.vulcan.connect_to_remote = (function connect_to_remote(address){var vec__8217 = clojure.string.split.call(null,address,":");var host = cljs.core.nth.call(null,vec__8217,0,null);var port = cljs.core.nth.call(null,vec__8217,1,null);if(cljs.core.truth_((function (){var and__6746__auto__ = host;if(cljs.core.truth_(and__6746__auto__))
{return port;
} else
{return and__6746__auto__;
}
})()))
{var client = lt.objs.clients.client_BANG_.call(null,new cljs.core.Keyword(null,"firefox.client","firefox.client",3134125042));lt.object.merge_BANG_.call(null,client,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"port","port",1017351155),port,new cljs.core.Keyword(null,"host","host",1017112858),host,new cljs.core.Keyword(null,"name","name",1017277949),address], null));
return lt.object.raise.call(null,client,new cljs.core.Keyword(null,"connect!","connect!",4735997929));
} else
{return null;
}
});
lt.plugins.vulcan.__BEH__init_remote_session = (function __BEH__init_remote_session(this$,session){return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"session","session",2998892040),session], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.vulcan","init-remote-session","lt.plugins.vulcan/init-remote-session",746867174),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.vulcan.__BEH__init_remote_session,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"new-session","new-session",1013080795),null], null), null));
lt.plugins.vulcan.__BEH__client__DOT__settings__DOT__remote = (function __BEH__client__DOT__settings__DOT__remote(this$,info){lt.objs.clients.handle_connection_BANG_.call(null,info);
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dir","dir",1014003711),null], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.vulcan","client.settings.remote","lt.plugins.vulcan/client.settings.remote",3430969284),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.vulcan.__BEH__client__DOT__settings__DOT__remote,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"client.settings","client.settings",3356017240),null], null), null));
lt.plugins.vulcan.__BEH__try_connect_BANG_ = (function __BEH__try_connect_BANG_(this$,_){if(cljs.core.truth_(new cljs.core.Keyword(null,"port","port",1017351155).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))
{return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"connect!","connect!",4735997929));
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.vulcan","try-connect!","lt.plugins.vulcan/try-connect!",1164687289),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.vulcan.__BEH__try_connect_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"try-connect!","try-connect!",1801329595),null], null), null));
lt.plugins.vulcan.__BEH__connect_BANG_ = (function __BEH__connect_BANG_(client){var socket = lt.plugins.vulcan.connect_to.call(null,new cljs.core.Keyword(null,"host","host",1017112858).cljs$core$IFn$_invoke$arity$2(cljs.core.deref.call(null,client),"localhost"),new cljs.core.Keyword(null,"port","port",1017351155).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client)),client);lt.object.merge_BANG_.call(null,lt.plugins.vulcan.this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"socket","socket",4411822821),socket], null));
return lt.objs.notifos.working.call(null,"Connecting to firefox");
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.vulcan","connect!","lt.plugins.vulcan/connect!",3036689547),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.vulcan.__BEH__connect_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect!","connect!",4735997929),null], null), null));
lt.plugins.vulcan.__BEH__connect_fail = (function __BEH__connect_fail(this$){lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"close!","close!",3951350939));
return lt.objs.notifos.done_working.call(null,"Failed to connect to firefox");
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.vulcan","connect-fail","lt.plugins.vulcan/connect-fail",2240548401),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.vulcan.__BEH__connect_fail,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.vulcan","connect-fail","lt.plugins.vulcan/connect-fail",2240548401),null], null), null));
lt.plugins.vulcan.__BEH__connected = (function __BEH__connected(this$){return lt.objs.notifos.done_working.call(null);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.vulcan","connected","lt.plugins.vulcan/connected",3034767097),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.vulcan.__BEH__connected,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.vulcan","connected","lt.plugins.vulcan/connected",3034767097),null], null), null));
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.vulcan","close","lt.plugins.vulcan/close",4785105418),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.objs.clients.rem_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close!","close!",3951350939),null], null), null));
lt.plugins.vulcan.__BEH__receive_message_BANG_ = (function __BEH__receive_message_BANG_(client){var message = new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client));return message;
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.vulcan","receive-message!","lt.plugins.vulcan/receive-message!",2334339230),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.vulcan.__BEH__receive_message_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"receive-message!","receive-message!",3022558230),null], null), null));
lt.plugins.vulcan.parse_message = (function parse_message(buffer){return JSON.parse(buffer.toString("utf-8"));
});
lt.plugins.vulcan.connect_to = (function connect_to(host,port,client){var socket = lt.plugins.vulcan.net.connect(port,host);socket.on("connect",(function (){if(cljs.core.truth_(cljs.core.deref.call(null,client)))
{return lt.object.raise.call(null,client,new cljs.core.Keyword("lt.plugins.vulcan","connected","lt.plugins.vulcan/connected",3034767097));
} else
{return null;
}
}));
socket.on("error",(function (){if(cljs.core.truth_(cljs.core.deref.call(null,client)))
{return lt.object.raise.call(null,client,new cljs.core.Keyword("lt.plugins.vulcan","connect-fail","lt.plugins.vulcan/connect-fail",2240548401));
} else
{return null;
}
}));
socket.on("data",(function (data){if(cljs.core.truth_(cljs.core.deref.call(null,client)))
{cljs.core.swap_BANG_.call(null,new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client)),(function (){return lt.plugins.vulcan.parse_message.call(null,data);
}));
return lt.object.raise.call(null,client,new cljs.core.Keyword("lt.plugins.vulcan","receive-message!","lt.plugins.vulcan/receive-message!",2334339230));
} else
{return null;
}
}));
socket.on("close",(function (){if(cljs.core.truth_(cljs.core.deref.call(null,client)))
{return lt.object.raise.call(null,client,new cljs.core.Keyword(null,"close!","close!",3951350939));
} else
{return null;
}
}));
return socket;
});
lt.plugins.vulcan.send = (function send(client,message){var session = new cljs.core.Keyword(null,"session","session",2998892040).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client));var message__$1 = cljs.core.merge.call(null,(cljs.core.truth_(session)?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"session","session",2998892040),session], null):null),message);return lt.plugins.vulcan.send_STAR_.call(null,client,message__$1);
});
lt.plugins.vulcan.send_STAR_ = (function send_STAR_(client,message){return new cljs.core.Keyword(null,"socket","socket",4411822821).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client)).write(lt.plugins.vulcan.encode.call(null,message));
});
}

//# sourceMappingURL=vulcan_compiled.js.map