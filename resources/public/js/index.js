// Compiled by ClojureScript 0.0-2173
goog.provide('index');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('taoensso.sente');
goog.require('taoensso.sente');
goog.require('taoensso.sente');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
goog.require('cljs.core.match');
var map__20260_20261 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"auto","auto",1016910113)], null));var map__20260_20262__$1 = ((cljs.core.seq_QMARK_.call(null,map__20260_20261))?cljs.core.apply.call(null,cljs.core.hash_map,map__20260_20261):map__20260_20261);var send_fn_20263 = cljs.core.get.call(null,map__20260_20262__$1,new cljs.core.Keyword(null,"send-fn","send-fn",2993769631));var ch_recv_20264 = cljs.core.get.call(null,map__20260_20262__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",1704942016));var chsk_20265 = cljs.core.get.call(null,map__20260_20262__$1,new cljs.core.Keyword(null,"chsk","chsk",1016957167));index.chsk = chsk_20265;
index.ch_chsk = ch_recv_20264;
index.chsk_send_BANG_ = send_fn_20263;

//# sourceMappingURL=index.js.map