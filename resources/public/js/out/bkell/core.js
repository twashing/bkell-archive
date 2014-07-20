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
goog.require('clojure.browser.repl');
goog.require('clojure.browser.repl');
var map__10886_10887 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492)], null));var map__10886_10888__$1 = ((cljs.core.seq_QMARK_.call(null,map__10886_10887))?cljs.core.apply.call(null,cljs.core.hash_map,map__10886_10887):map__10886_10887);var send_fn_10889 = cljs.core.get.call(null,map__10886_10888__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));var ch_recv_10890 = cljs.core.get.call(null,map__10886_10888__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));var chsk_10891 = cljs.core.get.call(null,map__10886_10888__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));bkell.core.chsk = chsk_10891;
bkell.core.ch_chsk = ch_recv_10890;
bkell.core.chsk_send_BANG_ = send_fn_10889;
bkell.core.hello = (function hello(){return alert("Hello World");
});

//# sourceMappingURL=core.js.map