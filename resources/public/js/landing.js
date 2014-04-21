// Compiled by ClojureScript 0.0-2173
goog.provide('landing');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('taoensso.sente');
goog.require('taoensso.sente');
goog.require('taoensso.sente');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
goog.require('cljs.core.match');
var map__20254_20255 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"auto","auto",1016910113)], null));var map__20254_20256__$1 = ((cljs.core.seq_QMARK_.call(null,map__20254_20255))?cljs.core.apply.call(null,cljs.core.hash_map,map__20254_20255):map__20254_20255);var send_fn_20257 = cljs.core.get.call(null,map__20254_20256__$1,new cljs.core.Keyword(null,"send-fn","send-fn",2993769631));var ch_recv_20258 = cljs.core.get.call(null,map__20254_20256__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",1704942016));var chsk_20259 = cljs.core.get.call(null,map__20254_20256__$1,new cljs.core.Keyword(null,"chsk","chsk",1016957167));landing.chsk = chsk_20259;
landing.ch_chsk = ch_recv_20258;
landing.chsk_send_BANG_ = send_fn_20257;
landing.thingp = (function thingp(){return null;
});

//# sourceMappingURL=landing.js.map