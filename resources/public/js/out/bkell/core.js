// Compiled by ClojureScript 0.0-2277
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
cljs.core.enable_console_print_BANG_.call(null);
var map__10886_10887 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492)], null));var map__10886_10888__$1 = ((cljs.core.seq_QMARK_.call(null,map__10886_10887))?cljs.core.apply.call(null,cljs.core.hash_map,map__10886_10887):map__10886_10887);var state_10889 = cljs.core.get.call(null,map__10886_10888__$1,new cljs.core.Keyword(null,"state","state",-1988618099));var send_fn_10890 = cljs.core.get.call(null,map__10886_10888__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));var ch_recv_10891 = cljs.core.get.call(null,map__10886_10888__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));var chsk_10892 = cljs.core.get.call(null,map__10886_10888__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));bkell.core.chsk = chsk_10892;
bkell.core.ch_chsk = ch_recv_10891;
bkell.core.chsk_send_BANG_ = send_fn_10890;
bkell.core.chsk_state = state_10889;
bkell.core.one = (function one(){return bkell.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("some","request-id","some/request-id",-1022780241),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),"Rich Hickey",new cljs.core.Keyword(null,"type","type",1174270348),"Awesome"], null)], null));
});
bkell.core.hello = (function hello(){return alert("Hello World");
});
bkell.core.event_handler = (function event_handler(p__10893,_){var vec__10905 = p__10893;var id = cljs.core.nth.call(null,vec__10905,(0),null);var data = cljs.core.nth.call(null,vec__10905,(1),null);var ev = vec__10905;bkell.core.logf.call(null,"Event: %s",ev);
try{if(cljs.core.keyword_identical_QMARK_.call(null,id,new cljs.core.Keyword("chsk","state","chsk/state",-1991397620)))
{try{if((function (){var G__10914 = data;if(G__10914)
{var bit__4193__auto__ = (G__10914.cljs$lang$protocol_mask$partition0$ & (256));if((bit__4193__auto__) || (G__10914.cljs$core$ILookup$))
{return true;
} else
{if((!G__10914.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ILookup,G__10914);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ILookup,G__10914);
}
})())
{try{var data_first_open_QMARK___10910 = cljs.core.get.call(null,data,new cljs.core.Keyword(null,"first-open?","first-open?",396686530),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));if((data_first_open_QMARK___10910 === true))
{return bkell.core.logf.call(null,"Channel socket successfully established!");
} else
{if(new cljs.core.Keyword(null,"else","else",-1508377146))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}catch (e10915){if((e10915 instanceof Error))
{var e__6225__auto__ = e10915;if((e__6225__auto__ === cljs.core.match.backtrack))
{throw cljs.core.match.backtrack;
} else
{throw e__6225__auto__;
}
} else
{if(new cljs.core.Keyword(null,"else","else",-1508377146))
{throw e10915;
} else
{return null;
}
}
}} else
{if(new cljs.core.Keyword(null,"else","else",-1508377146))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}catch (e10913){if((e10913 instanceof Error))
{var e__6225__auto__ = e10913;if((e__6225__auto__ === cljs.core.match.backtrack))
{throw cljs.core.match.backtrack;
} else
{throw e__6225__auto__;
}
} else
{if(new cljs.core.Keyword(null,"else","else",-1508377146))
{throw e10913;
} else
{return null;
}
}
}} else
{if(new cljs.core.Keyword(null,"else","else",-1508377146))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}catch (e10911){if((e10911 instanceof Error))
{var e__6225__auto__ = e10911;if((e__6225__auto__ === cljs.core.match.backtrack))
{try{if(cljs.core.keyword_identical_QMARK_.call(null,id,new cljs.core.Keyword("chsk","state","chsk/state",-1991397620)))
{var new_state = data;return bkell.core.logf.call(null,"Chsk state change: %s",new_state);
} else
{if(cljs.core.keyword_identical_QMARK_.call(null,id,new cljs.core.Keyword("chsk","recv","chsk/recv",561097091)))
{var payload = data;return bkell.core.logf.call(null,"Push event from server: %s",payload);
} else
{if(new cljs.core.Keyword(null,"else","else",-1508377146))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}
}catch (e10912){if((e10912 instanceof Error))
{var e__6225__auto____$1 = e10912;if((e__6225__auto____$1 === cljs.core.match.backtrack))
{return bkell.core.logf.call(null,"Unmatched event: %s",ev);
} else
{throw e__6225__auto____$1;
}
} else
{if(new cljs.core.Keyword(null,"else","else",-1508377146))
{throw e10912;
} else
{return null;
}
}
}} else
{throw e__6225__auto__;
}
} else
{if(new cljs.core.Keyword(null,"else","else",-1508377146))
{throw e10911;
} else
{return null;
}
}
}});
if(typeof bkell.core.chsk_router !== 'undefined')
{} else
{bkell.core.chsk_router = taoensso.sente.start_chsk_router_loop_BANG_.call(null,bkell.core.event_handler,bkell.core.ch_chsk);
}

//# sourceMappingURL=core.js.map