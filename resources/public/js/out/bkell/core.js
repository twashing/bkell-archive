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
bkell.core.fubar = (function fubar(){var map__10887 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"ajax","ajax",814345549)], null));var map__10887__$1 = ((cljs.core.seq_QMARK_.call(null,map__10887))?cljs.core.apply.call(null,cljs.core.hash_map,map__10887):map__10887);var send_fn = cljs.core.get.call(null,map__10887__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));var ch_recv = cljs.core.get.call(null,map__10887__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));var chsk = cljs.core.get.call(null,map__10887__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));bkell.core.chsk = chsk;
bkell.core.ch_chsk = ch_recv;
bkell.core.chsk_send_BANG_ = send_fn;
});
bkell.core.hello = (function hello(){return alert("Hello World");
});
bkell.core.one = (function one(){return bkell.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("some","request-id","some/request-id",-1022780241),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),"Rich Hickey",new cljs.core.Keyword(null,"type","type",1174270348),"Awesome"], null)], null));
});

//# sourceMappingURL=core.js.map