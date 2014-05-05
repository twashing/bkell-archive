// Compiled by ClojureScript 0.0-2202
goog.provide('index');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('taoensso.sente');
goog.require('taoensso.sente');
goog.require('taoensso.sente');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
goog.require('cljs.core.match');
var map__23763_23764 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"auto","auto",1016910113)], null));var map__23763_23765__$1 = ((cljs.core.seq_QMARK_.call(null,map__23763_23764))?cljs.core.apply.call(null,cljs.core.hash_map,map__23763_23764):map__23763_23764);var send_fn_23766 = cljs.core.get.call(null,map__23763_23765__$1,new cljs.core.Keyword(null,"send-fn","send-fn",2993769631));var ch_recv_23767 = cljs.core.get.call(null,map__23763_23765__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",1704942016));var chsk_23768 = cljs.core.get.call(null,map__23763_23765__$1,new cljs.core.Keyword(null,"chsk","chsk",1016957167));index.chsk = chsk_23768;
index.ch_chsk = ch_recv_23767;
index.chsk_send_BANG_ = send_fn_23766;

//# sourceMappingURL=index.js.map