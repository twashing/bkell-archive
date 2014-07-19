// Compiled by ClojureScript 0.0-2268
goog.provide('bkell.core');
goog.require('cljs.core');
goog.require('taoensso.sente');
goog.require('cljs.core.async');
goog.require('taoensso.sente');
goog.require('taoensso.sente');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
goog.require('cljs.core.match');
var map__10609_10610 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492)], null));var map__10609_10611__$1 = ((cljs.core.seq_QMARK_.call(null,map__10609_10610))?cljs.core.apply.call(null,cljs.core.hash_map,map__10609_10610):map__10609_10610);var send_fn_10612 = cljs.core.get.call(null,map__10609_10611__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));var ch_recv_10613 = cljs.core.get.call(null,map__10609_10611__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));var chsk_10614 = cljs.core.get.call(null,map__10609_10611__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));bkell.core.chsk = chsk_10614;
bkell.core.ch_chsk = ch_recv_10613;
bkell.core.chsk_send_BANG_ = send_fn_10612;

//# sourceMappingURL=core.js.map