// Compiled by ClojureScript 0.0-2202
goog.provide('taoensso.sente');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('taoensso.encore');
goog.require('taoensso.encore');
goog.require('taoensso.encore');
goog.require('cljs.reader');
goog.require('cljs.reader');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
goog.require('clojure.string');
goog.require('clojure.string');
taoensso.sente.chan_QMARK_ = (function chan_QMARK_(x){return (x instanceof cljs.core.async.impl.channels.ManyToManyChannel);
});
taoensso.sente.validate_event_form = (function validate_event_form(x){if(!(cljs.core.vector_QMARK_.call(null,x)))
{return new cljs.core.Keyword(null,"wrong-type","wrong-type",1225767628);
} else
{if(cljs.core.not.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [1,null,2,null], null), null).call(null,cljs.core.count.call(null,x))))
{return new cljs.core.Keyword(null,"wrong-length","wrong-length",2503597688);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{var vec__24817 = x;var ev_id = cljs.core.nth.call(null,vec__24817,0,null);var _ = cljs.core.nth.call(null,vec__24817,1,null);if(!((ev_id instanceof cljs.core.Keyword)))
{return new cljs.core.Keyword(null,"wrong-id-type","wrong-id-type",1493951486);
} else
{if(cljs.core.not.call(null,cljs.core.namespace.call(null,ev_id)))
{return new cljs.core.Keyword(null,"unnamespaced-id","unnamespaced-id",1327792248);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return null;
} else
{return null;
}
}
}
} else
{return null;
}
}
}
});
/**
* Valid [ev-id ?ev-data] form?
*/
taoensso.sente.event_QMARK_ = (function event_QMARK_(x){return (taoensso.sente.validate_event_form.call(null,x) == null);
});
taoensso.sente.assert_event = (function assert_event(x){var temp__4092__auto__ = taoensso.sente.validate_event_form.call(null,x);if(cljs.core.truth_(temp__4092__auto__))
{var _QMARK_err = temp__4092__auto__;var err_fmt = [cljs.core.str((function (){var G__24819 = _QMARK_err;if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"else","else",1017020587),G__24819))
{return "Malformed event (unknown error).";
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"unnamespaced-id","unnamespaced-id",1327792248),G__24819))
{return "Malformed event (`ev-id` should be a namespaced keyword).";
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"wrong-id-type","wrong-id-type",1493951486),G__24819))
{return "Malformed event (`ev-id` should be a namespaced keyword).";
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"wrong-length","wrong-length",2503597688),G__24819))
{return "Malformed event (wrong length).";
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"wrong-type","wrong-type",1225767628),G__24819))
{return "Malformed event (wrong type).";
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(_QMARK_err)].join('')));
} else
{return null;
}
}
}
}
}
}
})()),cljs.core.str(" Event should be of `[ev-id ?ev-data]` form: %s")].join('');throw cljs.core.ex_info.call(null,taoensso.encore.format.call(null,err_fmt,[cljs.core.str(x)].join('')),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"malformed-event","malformed-event",894090618),x], null));
} else
{return null;
}
});
taoensso.sente.cb_success_QMARK_ = (function cb_success_QMARK_(cb_reply){return cljs.core.not.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("chsk","timeout","chsk/timeout",4193310845),null,new cljs.core.Keyword("chsk","error","chsk/error",1304116950),null,new cljs.core.Keyword("chsk","closed","chsk/closed",4144514162),null], null), null).call(null,cb_reply));
});
/**
* edn -> [clj ?cb-uuid]
*/
taoensso.sente.unwrap_edn_msg_with__QMARK_cb__GT_clj = (function unwrap_edn_msg_with__QMARK_cb__GT_clj(edn){var msg = cljs.reader.read_string.call(null,edn);var _QMARK_cb_uuid = (function (){var and__17715__auto__ = cljs.core.map_QMARK_.call(null,msg);if(and__17715__auto__)
{return new cljs.core.Keyword("chsk","cb-uuid","chsk/cb-uuid",1730902389).cljs$core$IFn$_invoke$arity$1(msg);
} else
{return and__17715__auto__;
}
})();var clj = ((cljs.core.not.call(null,_QMARK_cb_uuid))?msg:new cljs.core.Keyword("chsk","clj","chsk/clj",1207886781).cljs$core$IFn$_invoke$arity$1(msg));return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clj,_QMARK_cb_uuid], null);
});
taoensso.sente.assert_send_args = (function assert_send_args(x,_QMARK_timeout_ms,_QMARK_cb){taoensso.sente.assert_event.call(null,x);
if((((_QMARK_timeout_ms == null)) && ((_QMARK_cb == null))) || (taoensso.encore.nneg_int_QMARK_.call(null,_QMARK_timeout_ms)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(taoensso.encore.format.call(null,"cb requires a timeout; timeout-ms should be a +ive integer: %s",_QMARK_timeout_ms)),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"or","or",-1640527972,null),cljs.core.list(new cljs.core.Symbol(null,"and","and",-1640434800,null),cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",-1637150201,null),new cljs.core.Symbol(null,"?timeout-ms","?timeout-ms",-1583490870,null)),cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",-1637150201,null),new cljs.core.Symbol(null,"?cb","?cb",-1640467817,null))),cljs.core.list(new cljs.core.Symbol(null,"and","and",-1640434800,null),cljs.core.list(new cljs.core.Symbol("encore","nneg-int?","encore/nneg-int?",-1421067858,null),new cljs.core.Symbol(null,"?timeout-ms","?timeout-ms",-1583490870,null))))))].join('')));
}
if(((_QMARK_cb == null)) || (cljs.core.ifn_QMARK_.call(null,_QMARK_cb)) || (taoensso.sente.chan_QMARK_.call(null,_QMARK_cb)))
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(taoensso.encore.format.call(null,"cb should be nil, an ifn, or a channel: %s",cljs.core.type.call(null,_QMARK_cb))),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"or","or",-1640527972,null),cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",-1637150201,null),new cljs.core.Symbol(null,"?cb","?cb",-1640467817,null)),cljs.core.list(new cljs.core.Symbol(null,"ifn?","ifn?",-1637301977,null),new cljs.core.Symbol(null,"?cb","?cb",-1640467817,null)),cljs.core.list(new cljs.core.Symbol(null,"chan?","chan?",-1545907994,null),new cljs.core.Symbol(null,"?cb","?cb",-1640467817,null)))))].join('')));
}
});
taoensso.sente.pull_unused_cb_fn_BANG_ = (function pull_unused_cb_fn_BANG_(cbs_waiting,cb_uuid){if(cljs.core.truth_(cb_uuid))
{return cljs.core.first.call(null,cljs.core.swap_BANG_.call(null,cbs_waiting,(function (p__24822){var vec__24823 = p__24822;var _ = cljs.core.nth.call(null,vec__24823,0,null);var m = cljs.core.nth.call(null,vec__24823,1,null);var temp__4090__auto__ = m.call(null,cb_uuid);if(cljs.core.truth_(temp__4090__auto__))
{var f = temp__4090__auto__;return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,cljs.core.dissoc.call(null,m,cb_uuid)], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,m], null);
}
})));
} else
{return null;
}
});
/**
* clj -> [edn ?cb-uuid]
*/
taoensso.sente.wrap_clj__GT_edn_msg_with__QMARK_cb = (function wrap_clj__GT_edn_msg_with__QMARK_cb(cbs_waiting,clj,_QMARK_timeout_ms,_QMARK_cb_fn){var _QMARK_cb_uuid = (cljs.core.truth_(_QMARK_cb_fn)?taoensso.encore.uuid_str.call(null):null);var msg = ((cljs.core.not.call(null,_QMARK_cb_uuid))?clj:new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("chsk","clj","chsk/clj",1207886781),clj,new cljs.core.Keyword("chsk","cb-uuid","chsk/cb-uuid",1730902389),_QMARK_cb_uuid], null));var edn = cljs.core.pr_str.call(null,msg);if(cljs.core.truth_(_QMARK_cb_uuid))
{cljs.core.swap_BANG_.call(null,cbs_waiting,((function (_QMARK_cb_uuid,msg,edn){
return (function (p__24850){var vec__24851 = p__24850;var _ = cljs.core.nth.call(null,vec__24851,0,null);var m = cljs.core.nth.call(null,vec__24851,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,cljs.core.assoc.call(null,m,_QMARK_cb_uuid,_QMARK_cb_fn)], null);
});})(_QMARK_cb_uuid,msg,edn))
);
if(cljs.core.truth_(_QMARK_timeout_ms))
{var c__20231__auto___24876 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto___24876,_QMARK_cb_uuid,msg,edn){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto___24876,_QMARK_cb_uuid,msg,edn){
return (function (state_24862){var state_val_24863 = (state_24862[1]);if((state_val_24863 === 5))
{var inst_24860 = (state_24862[2]);var state_24862__$1 = state_24862;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24862__$1,inst_24860);
} else
{if((state_val_24863 === 4))
{var state_24862__$1 = state_24862;var statearr_24864_24877 = state_24862__$1;(statearr_24864_24877[2] = null);
(statearr_24864_24877[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24863 === 3))
{var inst_24855 = (state_24862[7]);var inst_24857 = inst_24855.call(null,new cljs.core.Keyword("chsk","timeout","chsk/timeout",4193310845));var state_24862__$1 = state_24862;var statearr_24865_24878 = state_24862__$1;(statearr_24865_24878[2] = inst_24857);
(statearr_24865_24878[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24863 === 2))
{var inst_24855 = (state_24862[7]);var inst_24854 = (state_24862[2]);var inst_24855__$1 = taoensso.sente.pull_unused_cb_fn_BANG_.call(null,cbs_waiting,_QMARK_cb_uuid);var state_24862__$1 = (function (){var statearr_24866 = state_24862;(statearr_24866[8] = inst_24854);
(statearr_24866[7] = inst_24855__$1);
return statearr_24866;
})();if(cljs.core.truth_(inst_24855__$1))
{var statearr_24867_24879 = state_24862__$1;(statearr_24867_24879[1] = 3);
} else
{var statearr_24868_24880 = state_24862__$1;(statearr_24868_24880[1] = 4);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24863 === 1))
{var inst_24852 = cljs.core.async.timeout.call(null,_QMARK_timeout_ms);var state_24862__$1 = state_24862;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24862__$1,2,inst_24852);
} else
{return null;
}
}
}
}
}
});})(c__20231__auto___24876,_QMARK_cb_uuid,msg,edn))
;return ((function (switch__20216__auto__,c__20231__auto___24876,_QMARK_cb_uuid,msg,edn){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_24872 = [null,null,null,null,null,null,null,null,null];(statearr_24872[0] = state_machine__20217__auto__);
(statearr_24872[1] = 1);
return statearr_24872;
});
var state_machine__20217__auto____1 = (function (state_24862){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_24862);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e24873){if((e24873 instanceof Object))
{var ex__20220__auto__ = e24873;var statearr_24874_24881 = state_24862;(statearr_24874_24881[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24862);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e24873;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__24882 = state_24862;
state_24862 = G__24882;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_24862){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_24862);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto___24876,_QMARK_cb_uuid,msg,edn))
})();var state__20233__auto__ = (function (){var statearr_24875 = f__20232__auto__.call(null);(statearr_24875[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto___24876);
return statearr_24875;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto___24876,_QMARK_cb_uuid,msg,edn))
);
} else
{}
} else
{}
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [edn,_QMARK_cb_uuid], null);
});
taoensso.sente.IChSocket = (function (){var obj24884 = {};return obj24884;
})();
taoensso.sente.chsk_type = (function chsk_type(chsk){if((function (){var and__17715__auto__ = chsk;if(and__17715__auto__)
{return chsk.taoensso$sente$IChSocket$chsk_type$arity$1;
} else
{return and__17715__auto__;
}
})())
{return chsk.taoensso$sente$IChSocket$chsk_type$arity$1(chsk);
} else
{var x__18354__auto__ = (((chsk == null))?null:chsk);return (function (){var or__17727__auto__ = (taoensso.sente.chsk_type[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (taoensso.sente.chsk_type["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IChSocket.chsk-type",chsk);
}
}
})().call(null,chsk);
}
});
taoensso.sente.chsk_open_QMARK_ = (function chsk_open_QMARK_(chsk){if((function (){var and__17715__auto__ = chsk;if(and__17715__auto__)
{return chsk.taoensso$sente$IChSocket$chsk_open_QMARK_$arity$1;
} else
{return and__17715__auto__;
}
})())
{return chsk.taoensso$sente$IChSocket$chsk_open_QMARK_$arity$1(chsk);
} else
{var x__18354__auto__ = (((chsk == null))?null:chsk);return (function (){var or__17727__auto__ = (taoensso.sente.chsk_open_QMARK_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (taoensso.sente.chsk_open_QMARK_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IChSocket.chsk-open?",chsk);
}
}
})().call(null,chsk);
}
});
taoensso.sente.chsk_send_BANG_ = (function() {
var chsk_send_BANG_ = null;
var chsk_send_BANG___2 = (function (chsk,ev){if((function (){var and__17715__auto__ = chsk;if(and__17715__auto__)
{return chsk.taoensso$sente$IChSocket$chsk_send_BANG_$arity$2;
} else
{return and__17715__auto__;
}
})())
{return chsk.taoensso$sente$IChSocket$chsk_send_BANG_$arity$2(chsk,ev);
} else
{var x__18354__auto__ = (((chsk == null))?null:chsk);return (function (){var or__17727__auto__ = (taoensso.sente.chsk_send_BANG_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (taoensso.sente.chsk_send_BANG_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IChSocket.chsk-send!",chsk);
}
}
})().call(null,chsk,ev);
}
});
var chsk_send_BANG___4 = (function (chsk,ev,_QMARK_timeout_ms,_QMARK_cb){if((function (){var and__17715__auto__ = chsk;if(and__17715__auto__)
{return chsk.taoensso$sente$IChSocket$chsk_send_BANG_$arity$4;
} else
{return and__17715__auto__;
}
})())
{return chsk.taoensso$sente$IChSocket$chsk_send_BANG_$arity$4(chsk,ev,_QMARK_timeout_ms,_QMARK_cb);
} else
{var x__18354__auto__ = (((chsk == null))?null:chsk);return (function (){var or__17727__auto__ = (taoensso.sente.chsk_send_BANG_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (taoensso.sente.chsk_send_BANG_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IChSocket.chsk-send!",chsk);
}
}
})().call(null,chsk,ev,_QMARK_timeout_ms,_QMARK_cb);
}
});
chsk_send_BANG_ = function(chsk,ev,_QMARK_timeout_ms,_QMARK_cb){
switch(arguments.length){
case 2:
return chsk_send_BANG___2.call(this,chsk,ev);
case 4:
return chsk_send_BANG___4.call(this,chsk,ev,_QMARK_timeout_ms,_QMARK_cb);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chsk_send_BANG_.cljs$core$IFn$_invoke$arity$2 = chsk_send_BANG___2;
chsk_send_BANG_.cljs$core$IFn$_invoke$arity$4 = chsk_send_BANG___4;
return chsk_send_BANG_;
})()
;
taoensso.sente.chsk_make_BANG_ = (function chsk_make_BANG_(chsk,opts){if((function (){var and__17715__auto__ = chsk;if(and__17715__auto__)
{return chsk.taoensso$sente$IChSocket$chsk_make_BANG_$arity$2;
} else
{return and__17715__auto__;
}
})())
{return chsk.taoensso$sente$IChSocket$chsk_make_BANG_$arity$2(chsk,opts);
} else
{var x__18354__auto__ = (((chsk == null))?null:chsk);return (function (){var or__17727__auto__ = (taoensso.sente.chsk_make_BANG_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (taoensso.sente.chsk_make_BANG_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IChSocket.chsk-make!",chsk);
}
}
})().call(null,chsk,opts);
}
});
taoensso.sente.reset_chsk_state_BANG_ = (function reset_chsk_state_BANG_(p__24885,now_open_QMARK_){var map__24887 = p__24885;var map__24887__$1 = ((cljs.core.seq_QMARK_.call(null,map__24887))?cljs.core.apply.call(null,cljs.core.hash_map,map__24887):map__24887);var chsk = map__24887__$1;var open_QMARK_ = cljs.core.get.call(null,map__24887__$1,new cljs.core.Keyword(null,"open?","open?",1119852199));var chs = cljs.core.get.call(null,map__24887__$1,new cljs.core.Keyword(null,"chs","chs",1014002720));if(cljs.core.not_EQ_.call(null,cljs.core.deref.call(null,open_QMARK_),now_open_QMARK_))
{cljs.core.reset_BANG_.call(null,open_QMARK_,now_open_QMARK_);
var new_state = (cljs.core.truth_(now_open_QMARK_)?new cljs.core.Keyword(null,"open","open",1017321916):new cljs.core.Keyword(null,"closed","closed",3951351006));cljs.core.async.put_BANG_.call(null,new cljs.core.Keyword(null,"state","state",1123661827).cljs$core$IFn$_invoke$arity$1(chs),new_state);
return new_state;
} else
{return null;
}
});
taoensso.sente.wrap_cb_chan_as_fn = (function wrap_cb_chan_as_fn(_QMARK_cb,ev){if(((_QMARK_cb == null)) || (cljs.core.ifn_QMARK_.call(null,_QMARK_cb)))
{return _QMARK_cb;
} else
{if(taoensso.sente.chan_QMARK_.call(null,_QMARK_cb))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"chan?","chan?",-1545907994,null),new cljs.core.Symbol(null,"?cb","?cb",-1640467817,null))))].join('')));
}
taoensso.sente.assert_event.call(null,ev);
var vec__24889 = ev;var ev_id = cljs.core.nth.call(null,vec__24889,0,null);var _ = cljs.core.nth.call(null,vec__24889,1,null);var cb_ch = _QMARK_cb;return ((function (vec__24889,ev_id,_,cb_ch){
return (function (reply){return cljs.core.async.put_BANG_.call(null,cb_ch,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,[cljs.core.str(taoensso.encore.fq_name.call(null,ev_id)),cljs.core.str(".cb")].join('')),reply], null));
});
;})(vec__24889,ev_id,_,cb_ch))
}
});
taoensso.sente.receive_buffered_evs_BANG_ = (function receive_buffered_evs_BANG_(ch_recv,clj){if(cljs.core.vector_QMARK_.call(null,clj))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"vector?","vector?",-1302740715,null),new cljs.core.Symbol(null,"clj","clj",-1640432934,null))))].join('')));
}
var buffered_evs = clj;var seq__24894 = cljs.core.seq.call(null,buffered_evs);var chunk__24895 = null;var count__24896 = 0;var i__24897 = 0;while(true){
if((i__24897 < count__24896))
{var ev = cljs.core._nth.call(null,chunk__24895,i__24897);taoensso.sente.assert_event.call(null,ev);
cljs.core.async.put_BANG_.call(null,ch_recv,ev);
{
var G__24898 = seq__24894;
var G__24899 = chunk__24895;
var G__24900 = count__24896;
var G__24901 = (i__24897 + 1);
seq__24894 = G__24898;
chunk__24895 = G__24899;
count__24896 = G__24900;
i__24897 = G__24901;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__24894);if(temp__4092__auto__)
{var seq__24894__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__24894__$1))
{var c__18475__auto__ = cljs.core.chunk_first.call(null,seq__24894__$1);{
var G__24902 = cljs.core.chunk_rest.call(null,seq__24894__$1);
var G__24903 = c__18475__auto__;
var G__24904 = cljs.core.count.call(null,c__18475__auto__);
var G__24905 = 0;
seq__24894 = G__24902;
chunk__24895 = G__24903;
count__24896 = G__24904;
i__24897 = G__24905;
continue;
}
} else
{var ev = cljs.core.first.call(null,seq__24894__$1);taoensso.sente.assert_event.call(null,ev);
cljs.core.async.put_BANG_.call(null,ch_recv,ev);
{
var G__24906 = cljs.core.next.call(null,seq__24894__$1);
var G__24907 = null;
var G__24908 = 0;
var G__24909 = 0;
seq__24894 = G__24906;
chunk__24895 = G__24907;
count__24896 = G__24908;
i__24897 = G__24909;
continue;
}
}
} else
{return null;
}
}
break;
}
});

/**
* @constructor
* @param {*} url
* @param {*} chs
* @param {*} open_QMARK_
* @param {*} socket_atom
* @param {*} kalive_timer
* @param {*} kalive_due_QMARK_
* @param {*} cbs_waiting
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
taoensso.sente.ChWebSocket = (function (url,chs,open_QMARK_,socket_atom,kalive_timer,kalive_due_QMARK_,cbs_waiting,__meta,__extmap){
this.url = url;
this.chs = chs;
this.open_QMARK_ = open_QMARK_;
this.socket_atom = socket_atom;
this.kalive_timer = kalive_timer;
this.kalive_due_QMARK_ = kalive_due_QMARK_;
this.cbs_waiting = cbs_waiting;
this.__meta = __meta;
this.__extmap = __extmap;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
if(arguments.length>7){
this.__meta = __meta;
this.__extmap = __extmap;
} else {
this.__meta=null;
this.__extmap=null;
}
})
taoensso.sente.ChWebSocket.prototype.taoensso$sente$IChSocket$ = true;
taoensso.sente.ChWebSocket.prototype.taoensso$sente$IChSocket$chsk_type$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return new cljs.core.Keyword(null,"ws","ws",1013908046);
});
taoensso.sente.ChWebSocket.prototype.taoensso$sente$IChSocket$chsk_open_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.deref.call(null,self__.open_QMARK_);
});
taoensso.sente.ChWebSocket.prototype.taoensso$sente$IChSocket$chsk_send_BANG_$arity$2 = (function (chsk,ev){var self__ = this;
var chsk__$1 = this;return taoensso.sente.chsk_send_BANG_.call(null,chsk__$1,ev,null,null);
});
taoensso.sente.ChWebSocket.prototype.taoensso$sente$IChSocket$chsk_send_BANG_$arity$4 = (function (chsk,ev,_QMARK_timeout_ms,_QMARK_cb){var self__ = this;
var chsk__$1 = this;taoensso.sente.assert_send_args.call(null,ev,_QMARK_timeout_ms,_QMARK_cb);
var _QMARK_cb_fn = taoensso.sente.wrap_cb_chan_as_fn.call(null,_QMARK_cb,ev);if(cljs.core.not.call(null,cljs.core.deref.call(null,self__.open_QMARK_)))
{taoensso.encore.warnf.call(null,"Chsk send against closed chsk.");
if(cljs.core.truth_(_QMARK_cb_fn))
{return _QMARK_cb_fn.call(null,new cljs.core.Keyword("chsk","closed","chsk/closed",4144514162));
} else
{return null;
}
} else
{var vec__24913 = taoensso.sente.wrap_clj__GT_edn_msg_with__QMARK_cb.call(null,self__.cbs_waiting,ev,_QMARK_timeout_ms,_QMARK_cb_fn);var edn = cljs.core.nth.call(null,vec__24913,0,null);var _QMARK_cb_uuid = cljs.core.nth.call(null,vec__24913,1,null);try{cljs.core.deref.call(null,self__.socket_atom).send(edn);
cljs.core.reset_BANG_.call(null,self__.kalive_due_QMARK_,false);
return new cljs.core.Keyword(null,"apparent-success","apparent-success",1519477569);
}catch (e24914){if((e24914 instanceof Error))
{var e = e24914;taoensso.encore.errorf.call(null,"Chsk send %s",e);
if(cljs.core.truth_(_QMARK_cb_uuid))
{var cb_fn_STAR__24926 = (function (){var or__17727__auto__ = taoensso.sente.pull_unused_cb_fn_BANG_.call(null,self__.cbs_waiting,_QMARK_cb_uuid);if(cljs.core.truth_(or__17727__auto__))
{return or__17727__auto__;
} else
{return _QMARK_cb_fn;
}
})();cb_fn_STAR__24926.call(null,new cljs.core.Keyword("chsk","error","chsk/error",1304116950));
} else
{}
return false;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e24914;
} else
{return null;
}
}
}}
});
taoensso.sente.ChWebSocket.prototype.taoensso$sente$IChSocket$chsk_make_BANG_$arity$2 = (function (chsk,p__24915){var self__ = this;
var map__24916 = p__24915;var map__24916__$1 = ((cljs.core.seq_QMARK_.call(null,map__24916))?cljs.core.apply.call(null,cljs.core.hash_map,map__24916):map__24916);var kalive_ms = cljs.core.get.call(null,map__24916__$1,new cljs.core.Keyword(null,"kalive-ms","kalive-ms",2622924675));var chsk__$1 = this;var temp__4092__auto__ = (function (){var or__17727__auto__ = (window["WebSocket"]);if(cljs.core.truth_(or__17727__auto__))
{return or__17727__auto__;
} else
{return (window["MozWebSocket"]);
}
})();if(cljs.core.truth_(temp__4092__auto__))
{var WebSocket = temp__4092__auto__;((function (WebSocket,temp__4092__auto__,chsk__$1,map__24916,map__24916__$1,kalive_ms){
return (function connect_BANG_(nattempt){var retry_BANG_ = ((function (WebSocket,temp__4092__auto__,chsk__$1,map__24916,map__24916__$1,kalive_ms){
return (function (){var nattempt_STAR_ = (nattempt + 1);window.clearInterval(cljs.core.deref.call(null,self__.kalive_timer));
taoensso.encore.warnf.call(null,"Chsk is closed: will try reconnect (%s).",nattempt_STAR_);
return taoensso.encore.set_exp_backoff_timeout_BANG_.call(null,cljs.core.partial.call(null,connect_BANG_,nattempt_STAR_),nattempt_STAR_);
});})(WebSocket,temp__4092__auto__,chsk__$1,map__24916,map__24916__$1,kalive_ms))
;var temp__4090__auto__ = (function (){try{return (new WebSocket(self__.url));
}catch (e24920){if((e24920 instanceof Error))
{var e = e24920;taoensso.encore.errorf.call(null,"WebSocket js/Error: %s",e);
return false;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e24920;
} else
{return null;
}
}
}})();if(cljs.core.truth_(temp__4090__auto__))
{var socket = temp__4090__auto__;return cljs.core.reset_BANG_.call(null,self__.socket_atom,(function (){var G__24921 = socket;(G__24921["onerror"] = ((function (G__24921,socket,temp__4090__auto__,retry_BANG_,WebSocket,temp__4092__auto__,chsk__$1,map__24916,map__24916__$1,kalive_ms){
return (function (ws_ev){return taoensso.encore.errorf.call(null,"WebSocket error: %s",ws_ev);
});})(G__24921,socket,temp__4090__auto__,retry_BANG_,WebSocket,temp__4092__auto__,chsk__$1,map__24916,map__24916__$1,kalive_ms))
);
(G__24921["onmessage"] = ((function (G__24921,socket,temp__4090__auto__,retry_BANG_,WebSocket,temp__4092__auto__,chsk__$1,map__24916,map__24916__$1,kalive_ms){
return (function (ws_ev){var edn = (ws_ev["data"]);var vec__24922 = taoensso.sente.unwrap_edn_msg_with__QMARK_cb__GT_clj.call(null,edn);var clj = cljs.core.nth.call(null,vec__24922,0,null);var _QMARK_cb_uuid = cljs.core.nth.call(null,vec__24922,1,null);if(cljs.core._EQ_.call(null,clj,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","handshake","chsk/handshake",1281878251),new cljs.core.Keyword(null,"ws","ws",1013908046)], null)))
{return taoensso.sente.reset_chsk_state_BANG_.call(null,chsk__$1,true);
} else
{if(cljs.core.truth_(_QMARK_cb_uuid))
{var temp__4090__auto____$1 = taoensso.sente.pull_unused_cb_fn_BANG_.call(null,self__.cbs_waiting,_QMARK_cb_uuid);if(cljs.core.truth_(temp__4090__auto____$1))
{var cb_fn = temp__4090__auto____$1;return cb_fn.call(null,clj);
} else
{return taoensso.encore.warnf.call(null,"Cb reply w/o local cb-fn: %s",clj);
}
} else
{var buffered_evs = clj;return taoensso.sente.receive_buffered_evs_BANG_.call(null,new cljs.core.Keyword(null,"recv","recv",1017400664).cljs$core$IFn$_invoke$arity$1(self__.chs),buffered_evs);
}
}
});})(G__24921,socket,temp__4090__auto__,retry_BANG_,WebSocket,temp__4092__auto__,chsk__$1,map__24916,map__24916__$1,kalive_ms))
);
(G__24921["onopen"] = ((function (G__24921,socket,temp__4090__auto__,retry_BANG_,WebSocket,temp__4092__auto__,chsk__$1,map__24916,map__24916__$1,kalive_ms){
return (function (_ws_ev){return cljs.core.reset_BANG_.call(null,self__.kalive_timer,window.setInterval(((function (G__24921,socket,temp__4090__auto__,retry_BANG_,WebSocket,temp__4092__auto__,chsk__$1,map__24916,map__24916__$1,kalive_ms){
return (function (){if(cljs.core.truth_(cljs.core.deref.call(null,self__.kalive_due_QMARK_)))
{taoensso.sente.chsk_send_BANG_.call(null,chsk__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","ping","chsk/ping",1214899312),new cljs.core.Keyword(null,"ws","ws",1013908046)], null));
} else
{}
return cljs.core.reset_BANG_.call(null,self__.kalive_due_QMARK_,true);
});})(G__24921,socket,temp__4090__auto__,retry_BANG_,WebSocket,temp__4092__auto__,chsk__$1,map__24916,map__24916__$1,kalive_ms))
,kalive_ms));
});})(G__24921,socket,temp__4090__auto__,retry_BANG_,WebSocket,temp__4092__auto__,chsk__$1,map__24916,map__24916__$1,kalive_ms))
);
(G__24921["onclose"] = ((function (G__24921,socket,temp__4090__auto__,retry_BANG_,WebSocket,temp__4092__auto__,chsk__$1,map__24916,map__24916__$1,kalive_ms){
return (function (_ws_ev){return retry_BANG_.call(null);
});})(G__24921,socket,temp__4090__auto__,retry_BANG_,WebSocket,temp__4092__auto__,chsk__$1,map__24916,map__24916__$1,kalive_ms))
);
return G__24921;
})());
} else
{return retry_BANG_.call(null);
}
});})(WebSocket,temp__4092__auto__,chsk__$1,map__24916,map__24916__$1,kalive_ms))
.call(null,0);
return chsk__$1;
} else
{return null;
}
});
taoensso.sente.ChWebSocket.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__18308__auto__){var self__ = this;
var this__18308__auto____$1 = this;var h__18138__auto__ = self__.__hash;if(!((h__18138__auto__ == null)))
{return h__18138__auto__;
} else
{var h__18138__auto____$1 = cljs.core.hash_imap.call(null,this__18308__auto____$1);self__.__hash = h__18138__auto____$1;
return h__18138__auto____$1;
}
});
taoensso.sente.ChWebSocket.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__18313__auto__,k__18314__auto__){var self__ = this;
var this__18313__auto____$1 = this;return cljs.core._lookup.call(null,this__18313__auto____$1,k__18314__auto__,null);
});
taoensso.sente.ChWebSocket.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__18315__auto__,k24911,else__18316__auto__){var self__ = this;
var this__18315__auto____$1 = this;if(cljs.core.keyword_identical_QMARK_.call(null,k24911,new cljs.core.Keyword(null,"url","url",1014020321)))
{return self__.url;
} else
{if(cljs.core.keyword_identical_QMARK_.call(null,k24911,new cljs.core.Keyword(null,"chs","chs",1014002720)))
{return self__.chs;
} else
{if(cljs.core.keyword_identical_QMARK_.call(null,k24911,new cljs.core.Keyword(null,"open?","open?",1119852199)))
{return self__.open_QMARK_;
} else
{if(cljs.core.keyword_identical_QMARK_.call(null,k24911,new cljs.core.Keyword(null,"socket-atom","socket-atom",1946648285)))
{return self__.socket_atom;
} else
{if(cljs.core.keyword_identical_QMARK_.call(null,k24911,new cljs.core.Keyword(null,"kalive-timer","kalive-timer",3512875116)))
{return self__.kalive_timer;
} else
{if(cljs.core.keyword_identical_QMARK_.call(null,k24911,new cljs.core.Keyword(null,"kalive-due?","kalive-due?",1094050792)))
{return self__.kalive_due_QMARK_;
} else
{if(cljs.core.keyword_identical_QMARK_.call(null,k24911,new cljs.core.Keyword(null,"cbs-waiting","cbs-waiting",1960425702)))
{return self__.cbs_waiting;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.get.call(null,self__.__extmap,k24911,else__18316__auto__);
} else
{return null;
}
}
}
}
}
}
}
}
});
taoensso.sente.ChWebSocket.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__18320__auto__,k__18321__auto__,G__24910){var self__ = this;
var this__18320__auto____$1 = this;var pred__24923 = cljs.core.keyword_identical_QMARK_;var expr__24924 = k__18321__auto__;if(cljs.core.truth_(pred__24923.call(null,new cljs.core.Keyword(null,"url","url",1014020321),expr__24924)))
{return (new taoensso.sente.ChWebSocket(G__24910,self__.chs,self__.open_QMARK_,self__.socket_atom,self__.kalive_timer,self__.kalive_due_QMARK_,self__.cbs_waiting,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__24923.call(null,new cljs.core.Keyword(null,"chs","chs",1014002720),expr__24924)))
{return (new taoensso.sente.ChWebSocket(self__.url,G__24910,self__.open_QMARK_,self__.socket_atom,self__.kalive_timer,self__.kalive_due_QMARK_,self__.cbs_waiting,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__24923.call(null,new cljs.core.Keyword(null,"open?","open?",1119852199),expr__24924)))
{return (new taoensso.sente.ChWebSocket(self__.url,self__.chs,G__24910,self__.socket_atom,self__.kalive_timer,self__.kalive_due_QMARK_,self__.cbs_waiting,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__24923.call(null,new cljs.core.Keyword(null,"socket-atom","socket-atom",1946648285),expr__24924)))
{return (new taoensso.sente.ChWebSocket(self__.url,self__.chs,self__.open_QMARK_,G__24910,self__.kalive_timer,self__.kalive_due_QMARK_,self__.cbs_waiting,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__24923.call(null,new cljs.core.Keyword(null,"kalive-timer","kalive-timer",3512875116),expr__24924)))
{return (new taoensso.sente.ChWebSocket(self__.url,self__.chs,self__.open_QMARK_,self__.socket_atom,G__24910,self__.kalive_due_QMARK_,self__.cbs_waiting,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__24923.call(null,new cljs.core.Keyword(null,"kalive-due?","kalive-due?",1094050792),expr__24924)))
{return (new taoensso.sente.ChWebSocket(self__.url,self__.chs,self__.open_QMARK_,self__.socket_atom,self__.kalive_timer,G__24910,self__.cbs_waiting,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__24923.call(null,new cljs.core.Keyword(null,"cbs-waiting","cbs-waiting",1960425702),expr__24924)))
{return (new taoensso.sente.ChWebSocket(self__.url,self__.chs,self__.open_QMARK_,self__.socket_atom,self__.kalive_timer,self__.kalive_due_QMARK_,G__24910,self__.__meta,self__.__extmap,null));
} else
{return (new taoensso.sente.ChWebSocket(self__.url,self__.chs,self__.open_QMARK_,self__.socket_atom,self__.kalive_timer,self__.kalive_due_QMARK_,self__.cbs_waiting,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__18321__auto__,G__24910),null));
}
}
}
}
}
}
}
});
taoensso.sente.ChWebSocket.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__18327__auto__,writer__18328__auto__,opts__18329__auto__){var self__ = this;
var this__18327__auto____$1 = this;var pr_pair__18330__auto__ = ((function (this__18327__auto____$1){
return (function (keyval__18331__auto__){return cljs.core.pr_sequential_writer.call(null,writer__18328__auto__,cljs.core.pr_writer,""," ","",opts__18329__auto__,keyval__18331__auto__);
});})(this__18327__auto____$1))
;return cljs.core.pr_sequential_writer.call(null,writer__18328__auto__,pr_pair__18330__auto__,"#taoensso.sente.ChWebSocket{",", ","}",opts__18329__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"url","url",1014020321),self__.url],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"chs","chs",1014002720),self__.chs],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"open?","open?",1119852199),self__.open_QMARK_],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"socket-atom","socket-atom",1946648285),self__.socket_atom],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"kalive-timer","kalive-timer",3512875116),self__.kalive_timer],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"kalive-due?","kalive-due?",1094050792),self__.kalive_due_QMARK_],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"cbs-waiting","cbs-waiting",1960425702),self__.cbs_waiting],null))], null),self__.__extmap));
});
taoensso.sente.ChWebSocket.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__18318__auto__,entry__18319__auto__){var self__ = this;
var this__18318__auto____$1 = this;if(cljs.core.vector_QMARK_.call(null,entry__18319__auto__))
{return cljs.core._assoc.call(null,this__18318__auto____$1,cljs.core._nth.call(null,entry__18319__auto__,0),cljs.core._nth.call(null,entry__18319__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__18318__auto____$1,entry__18319__auto__);
}
});
taoensso.sente.ChWebSocket.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__18325__auto__){var self__ = this;
var this__18325__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"url","url",1014020321),self__.url],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"chs","chs",1014002720),self__.chs],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"open?","open?",1119852199),self__.open_QMARK_],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"socket-atom","socket-atom",1946648285),self__.socket_atom],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"kalive-timer","kalive-timer",3512875116),self__.kalive_timer],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"kalive-due?","kalive-due?",1094050792),self__.kalive_due_QMARK_],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"cbs-waiting","cbs-waiting",1960425702),self__.cbs_waiting],null))], null),self__.__extmap));
});
taoensso.sente.ChWebSocket.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__18317__auto__){var self__ = this;
var this__18317__auto____$1 = this;return (7 + cljs.core.count.call(null,self__.__extmap));
});
taoensso.sente.ChWebSocket.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__18309__auto__,other__18310__auto__){var self__ = this;
var this__18309__auto____$1 = this;if(cljs.core.truth_((function (){var and__17715__auto__ = other__18310__auto__;if(cljs.core.truth_(and__17715__auto__))
{return ((this__18309__auto____$1.constructor === other__18310__auto__.constructor)) && (cljs.core.equiv_map.call(null,this__18309__auto____$1,other__18310__auto__));
} else
{return and__17715__auto__;
}
})()))
{return true;
} else
{return false;
}
});
taoensso.sente.ChWebSocket.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__18312__auto__,G__24910){var self__ = this;
var this__18312__auto____$1 = this;return (new taoensso.sente.ChWebSocket(self__.url,self__.chs,self__.open_QMARK_,self__.socket_atom,self__.kalive_timer,self__.kalive_due_QMARK_,self__.cbs_waiting,G__24910,self__.__extmap,self__.__hash));
});
taoensso.sente.ChWebSocket.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__18307__auto__){var self__ = this;
var this__18307__auto____$1 = this;return (new taoensso.sente.ChWebSocket(self__.url,self__.chs,self__.open_QMARK_,self__.socket_atom,self__.kalive_timer,self__.kalive_due_QMARK_,self__.cbs_waiting,self__.__meta,self__.__extmap,self__.__hash));
});
taoensso.sente.ChWebSocket.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__18311__auto__){var self__ = this;
var this__18311__auto____$1 = this;return self__.__meta;
});
taoensso.sente.ChWebSocket.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__18322__auto__,k__18323__auto__){var self__ = this;
var this__18322__auto____$1 = this;if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"chs","chs",1014002720),null,new cljs.core.Keyword(null,"kalive-timer","kalive-timer",3512875116),null,new cljs.core.Keyword(null,"open?","open?",1119852199),null,new cljs.core.Keyword(null,"socket-atom","socket-atom",1946648285),null,new cljs.core.Keyword(null,"url","url",1014020321),null,new cljs.core.Keyword(null,"kalive-due?","kalive-due?",1094050792),null,new cljs.core.Keyword(null,"cbs-waiting","cbs-waiting",1960425702),null], null), null),k__18323__auto__))
{return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__18322__auto____$1),self__.__meta),k__18323__auto__);
} else
{return (new taoensso.sente.ChWebSocket(self__.url,self__.chs,self__.open_QMARK_,self__.socket_atom,self__.kalive_timer,self__.kalive_due_QMARK_,self__.cbs_waiting,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__18323__auto__)),null));
}
});
taoensso.sente.ChWebSocket.cljs$lang$type = true;
taoensso.sente.ChWebSocket.cljs$lang$ctorPrSeq = (function (this__18347__auto__){return cljs.core._conj.call(null,cljs.core.List.EMPTY,"taoensso.sente/ChWebSocket");
});
taoensso.sente.ChWebSocket.cljs$lang$ctorPrWriter = (function (this__18347__auto__,writer__18348__auto__){return cljs.core._write.call(null,writer__18348__auto__,"taoensso.sente/ChWebSocket");
});
taoensso.sente.__GT_ChWebSocket = (function __GT_ChWebSocket(url,chs,open_QMARK_,socket_atom,kalive_timer,kalive_due_QMARK_,cbs_waiting){return (new taoensso.sente.ChWebSocket(url,chs,open_QMARK_,socket_atom,kalive_timer,kalive_due_QMARK_,cbs_waiting));
});
taoensso.sente.map__GT_ChWebSocket = (function map__GT_ChWebSocket(G__24912){return (new taoensso.sente.ChWebSocket(new cljs.core.Keyword(null,"url","url",1014020321).cljs$core$IFn$_invoke$arity$1(G__24912),new cljs.core.Keyword(null,"chs","chs",1014002720).cljs$core$IFn$_invoke$arity$1(G__24912),new cljs.core.Keyword(null,"open?","open?",1119852199).cljs$core$IFn$_invoke$arity$1(G__24912),new cljs.core.Keyword(null,"socket-atom","socket-atom",1946648285).cljs$core$IFn$_invoke$arity$1(G__24912),new cljs.core.Keyword(null,"kalive-timer","kalive-timer",3512875116).cljs$core$IFn$_invoke$arity$1(G__24912),new cljs.core.Keyword(null,"kalive-due?","kalive-due?",1094050792).cljs$core$IFn$_invoke$arity$1(G__24912),new cljs.core.Keyword(null,"cbs-waiting","cbs-waiting",1960425702).cljs$core$IFn$_invoke$arity$1(G__24912),null,cljs.core.dissoc.call(null,G__24912,new cljs.core.Keyword(null,"url","url",1014020321),new cljs.core.Keyword(null,"chs","chs",1014002720),new cljs.core.Keyword(null,"open?","open?",1119852199),new cljs.core.Keyword(null,"socket-atom","socket-atom",1946648285),new cljs.core.Keyword(null,"kalive-timer","kalive-timer",3512875116),new cljs.core.Keyword(null,"kalive-due?","kalive-due?",1094050792),new cljs.core.Keyword(null,"cbs-waiting","cbs-waiting",1960425702))));
});

/**
* @constructor
* @param {*} url
* @param {*} chs
* @param {*} open_QMARK_
* @param {*} ajax_client_uuid
* @param {*} csrf_token
* @param {*} has_uid_QMARK_
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
taoensso.sente.ChAjaxSocket = (function (url,chs,open_QMARK_,ajax_client_uuid,csrf_token,has_uid_QMARK_,__meta,__extmap){
this.url = url;
this.chs = chs;
this.open_QMARK_ = open_QMARK_;
this.ajax_client_uuid = ajax_client_uuid;
this.csrf_token = csrf_token;
this.has_uid_QMARK_ = has_uid_QMARK_;
this.__meta = __meta;
this.__extmap = __extmap;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
if(arguments.length>6){
this.__meta = __meta;
this.__extmap = __extmap;
} else {
this.__meta=null;
this.__extmap=null;
}
})
taoensso.sente.ChAjaxSocket.prototype.taoensso$sente$IChSocket$ = true;
taoensso.sente.ChAjaxSocket.prototype.taoensso$sente$IChSocket$chsk_type$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return new cljs.core.Keyword(null,"ajax","ajax",1016898962);
});
taoensso.sente.ChAjaxSocket.prototype.taoensso$sente$IChSocket$chsk_open_QMARK_$arity$1 = (function (chsk){var self__ = this;
var chsk__$1 = this;return cljs.core.deref.call(null,self__.open_QMARK_);
});
taoensso.sente.ChAjaxSocket.prototype.taoensso$sente$IChSocket$chsk_send_BANG_$arity$2 = (function (chsk,ev){var self__ = this;
var chsk__$1 = this;return taoensso.sente.chsk_send_BANG_.call(null,chsk__$1,ev,null,null);
});
taoensso.sente.ChAjaxSocket.prototype.taoensso$sente$IChSocket$chsk_send_BANG_$arity$4 = (function (chsk,ev,_QMARK_timeout_ms,_QMARK_cb){var self__ = this;
var chsk__$1 = this;taoensso.sente.assert_send_args.call(null,ev,_QMARK_timeout_ms,_QMARK_cb);
var _QMARK_cb_fn = taoensso.sente.wrap_cb_chan_as_fn.call(null,_QMARK_cb,ev);if(cljs.core.not.call(null,(function (){var or__17727__auto__ = cljs.core.deref.call(null,self__.open_QMARK_);if(cljs.core.truth_(or__17727__auto__))
{return or__17727__auto__;
} else
{return cljs.core._EQ_.call(null,ev,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","handshake","chsk/handshake",1281878251),new cljs.core.Keyword(null,"ajax","ajax",1016898962)], null));
}
})()))
{taoensso.encore.warnf.call(null,"Chsk send against closed chsk.");
if(cljs.core.truth_(_QMARK_cb_fn))
{return _QMARK_cb_fn.call(null,new cljs.core.Keyword("chsk","closed","chsk/closed",4144514162));
} else
{return null;
}
} else
{taoensso.encore.ajax_lite.call(null,self__.url,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"post","post",1017351186),new cljs.core.Keyword(null,"timeout","timeout",3994960083),_QMARK_timeout_ms,new cljs.core.Keyword(null,"resp-type","resp-type",3288017545),new cljs.core.Keyword(null,"text","text",1017460895),new cljs.core.Keyword(null,"params","params",4313443576),(function (){var dummy_cb_QMARK_ = cljs.core.not.call(null,_QMARK_cb_fn);var msg = ((!(dummy_cb_QMARK_))?ev:new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("chsk","clj","chsk/clj",1207886781),ev,new cljs.core.Keyword("chsk","dummy-cb?","chsk/dummy-cb?",4088721351),true], null));var edn = cljs.core.pr_str.call(null,msg);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"_","_",1013904337),taoensso.encore.now_udt.call(null),new cljs.core.Keyword(null,"edn","edn",1014004513),edn,new cljs.core.Keyword(null,"csrf-token","csrf-token",4176868610),self__.csrf_token], null);
})()], null),((function (_QMARK_cb_fn,chsk__$1){
return (function ajax_cb(p__24930){var map__24932 = p__24930;var map__24932__$1 = ((cljs.core.seq_QMARK_.call(null,map__24932))?cljs.core.apply.call(null,cljs.core.hash_map,map__24932):map__24932);var error = cljs.core.get.call(null,map__24932__$1,new cljs.core.Keyword(null,"error","error",1110689146));var content = cljs.core.get.call(null,map__24932__$1,new cljs.core.Keyword(null,"content","content",1965434859));if(cljs.core.truth_(error))
{if(cljs.core._EQ_.call(null,error,new cljs.core.Keyword(null,"timeout","timeout",3994960083)))
{if(cljs.core.truth_(_QMARK_cb_fn))
{return _QMARK_cb_fn.call(null,new cljs.core.Keyword("chsk","timeout","chsk/timeout",4193310845));
} else
{return null;
}
} else
{taoensso.sente.reset_chsk_state_BANG_.call(null,chsk__$1,false);
if(cljs.core.truth_(_QMARK_cb_fn))
{return _QMARK_cb_fn.call(null,new cljs.core.Keyword("chsk","error","chsk/error",1304116950));
} else
{return null;
}
}
} else
{var resp_edn = content;var resp_clj = cljs.reader.read_string.call(null,resp_edn);if(cljs.core.truth_(_QMARK_cb_fn))
{_QMARK_cb_fn.call(null,resp_clj);
} else
{if(cljs.core.not_EQ_.call(null,resp_clj,new cljs.core.Keyword("chsk","dummy-200","chsk/dummy-200",4088736209)))
{taoensso.encore.warnf.call(null,"Cb reply w/o local cb-fn: %s",resp_clj);
} else
{}
}
return taoensso.sente.reset_chsk_state_BANG_.call(null,chsk__$1,true);
}
});})(_QMARK_cb_fn,chsk__$1))
);
return new cljs.core.Keyword(null,"apparent-success","apparent-success",1519477569);
}
});
taoensso.sente.ChAjaxSocket.prototype.taoensso$sente$IChSocket$chsk_make_BANG_$arity$2 = (function (chsk,p__24933){var self__ = this;
var map__24934 = p__24933;var map__24934__$1 = ((cljs.core.seq_QMARK_.call(null,map__24934))?cljs.core.apply.call(null,cljs.core.hash_map,map__24934):map__24934);var timeout = cljs.core.get.call(null,map__24934__$1,new cljs.core.Keyword(null,"timeout","timeout",3994960083));var chsk__$1 = this;if(cljs.core.not.call(null,self__.has_uid_QMARK_))
{taoensso.sente.reset_chsk_state_BANG_.call(null,chsk__$1,true);
} else
{((function (chsk__$1,map__24934,map__24934__$1,timeout){
return (function async_poll_for_update_BANG_(nattempt){var retry_BANG__24944 = ((function (chsk__$1,map__24934,map__24934__$1,timeout){
return (function (){var nattempt_STAR_ = (nattempt + 1);taoensso.encore.warnf.call(null,"Chsk is closed: will try reconnect (%s).",nattempt_STAR_);
return taoensso.encore.set_exp_backoff_timeout_BANG_.call(null,cljs.core.partial.call(null,async_poll_for_update_BANG_,nattempt_STAR_),nattempt_STAR_);
});})(chsk__$1,map__24934,map__24934__$1,timeout))
;var ajax_req_BANG__24945 = ((function (retry_BANG__24944,chsk__$1,map__24934,map__24934__$1,timeout){
return (function (){return taoensso.encore.ajax_lite.call(null,self__.url,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"timeout","timeout",3994960083),timeout,new cljs.core.Keyword(null,"resp-type","resp-type",3288017545),new cljs.core.Keyword(null,"text","text",1017460895),new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"_","_",1013904337),taoensso.encore.now_udt.call(null),new cljs.core.Keyword(null,"ajax-client-uuid","ajax-client-uuid",2569162690),self__.ajax_client_uuid], null)], null),((function (retry_BANG__24944,chsk__$1,map__24934,map__24934__$1,timeout){
return (function ajax_cb(p__24938){var map__24940 = p__24938;var map__24940__$1 = ((cljs.core.seq_QMARK_.call(null,map__24940))?cljs.core.apply.call(null,cljs.core.hash_map,map__24940):map__24940);var error = cljs.core.get.call(null,map__24940__$1,new cljs.core.Keyword(null,"error","error",1110689146));var content = cljs.core.get.call(null,map__24940__$1,new cljs.core.Keyword(null,"content","content",1965434859));if(cljs.core.truth_(error))
{if(cljs.core._EQ_.call(null,error,new cljs.core.Keyword(null,"timeout","timeout",3994960083)))
{return async_poll_for_update_BANG_.call(null,0);
} else
{taoensso.sente.reset_chsk_state_BANG_.call(null,chsk__$1,false);
return retry_BANG__24944.call(null);
}
} else
{var edn = content;var buffered_evs = cljs.reader.read_string.call(null,edn);taoensso.sente.receive_buffered_evs_BANG_.call(null,new cljs.core.Keyword(null,"recv","recv",1017400664).cljs$core$IFn$_invoke$arity$1(self__.chs),buffered_evs);
taoensso.sente.reset_chsk_state_BANG_.call(null,chsk__$1,true);
return async_poll_for_update_BANG_.call(null,0);
}
});})(retry_BANG__24944,chsk__$1,map__24934,map__24934__$1,timeout))
);
});})(retry_BANG__24944,chsk__$1,map__24934,map__24934__$1,timeout))
;var temp__4090__auto___24946 = (window["Pace"]);if(cljs.core.truth_(temp__4090__auto___24946))
{var pace_24947 = temp__4090__auto___24946;pace_24947.ignore(ajax_req_BANG__24945);
} else
{ajax_req_BANG__24945.call(null);
}
if(cljs.core.truth_(cljs.core.deref.call(null,self__.open_QMARK_)))
{return null;
} else
{return taoensso.sente.chsk_send_BANG_.call(null,chsk__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","handshake","chsk/handshake",1281878251),new cljs.core.Keyword(null,"ajax","ajax",1016898962)], null));
}
});})(chsk__$1,map__24934,map__24934__$1,timeout))
.call(null,0);
}
return chsk__$1;
});
taoensso.sente.ChAjaxSocket.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__18308__auto__){var self__ = this;
var this__18308__auto____$1 = this;var h__18138__auto__ = self__.__hash;if(!((h__18138__auto__ == null)))
{return h__18138__auto__;
} else
{var h__18138__auto____$1 = cljs.core.hash_imap.call(null,this__18308__auto____$1);self__.__hash = h__18138__auto____$1;
return h__18138__auto____$1;
}
});
taoensso.sente.ChAjaxSocket.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__18313__auto__,k__18314__auto__){var self__ = this;
var this__18313__auto____$1 = this;return cljs.core._lookup.call(null,this__18313__auto____$1,k__18314__auto__,null);
});
taoensso.sente.ChAjaxSocket.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__18315__auto__,k24928,else__18316__auto__){var self__ = this;
var this__18315__auto____$1 = this;if(cljs.core.keyword_identical_QMARK_.call(null,k24928,new cljs.core.Keyword(null,"url","url",1014020321)))
{return self__.url;
} else
{if(cljs.core.keyword_identical_QMARK_.call(null,k24928,new cljs.core.Keyword(null,"chs","chs",1014002720)))
{return self__.chs;
} else
{if(cljs.core.keyword_identical_QMARK_.call(null,k24928,new cljs.core.Keyword(null,"open?","open?",1119852199)))
{return self__.open_QMARK_;
} else
{if(cljs.core.keyword_identical_QMARK_.call(null,k24928,new cljs.core.Keyword(null,"ajax-client-uuid","ajax-client-uuid",2569162690)))
{return self__.ajax_client_uuid;
} else
{if(cljs.core.keyword_identical_QMARK_.call(null,k24928,new cljs.core.Keyword(null,"csrf-token","csrf-token",4176868610)))
{return self__.csrf_token;
} else
{if(cljs.core.keyword_identical_QMARK_.call(null,k24928,new cljs.core.Keyword(null,"has-uid?","has-uid?",1108596916)))
{return self__.has_uid_QMARK_;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.get.call(null,self__.__extmap,k24928,else__18316__auto__);
} else
{return null;
}
}
}
}
}
}
}
});
taoensso.sente.ChAjaxSocket.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__18320__auto__,k__18321__auto__,G__24927){var self__ = this;
var this__18320__auto____$1 = this;var pred__24941 = cljs.core.keyword_identical_QMARK_;var expr__24942 = k__18321__auto__;if(cljs.core.truth_(pred__24941.call(null,new cljs.core.Keyword(null,"url","url",1014020321),expr__24942)))
{return (new taoensso.sente.ChAjaxSocket(G__24927,self__.chs,self__.open_QMARK_,self__.ajax_client_uuid,self__.csrf_token,self__.has_uid_QMARK_,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__24941.call(null,new cljs.core.Keyword(null,"chs","chs",1014002720),expr__24942)))
{return (new taoensso.sente.ChAjaxSocket(self__.url,G__24927,self__.open_QMARK_,self__.ajax_client_uuid,self__.csrf_token,self__.has_uid_QMARK_,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__24941.call(null,new cljs.core.Keyword(null,"open?","open?",1119852199),expr__24942)))
{return (new taoensso.sente.ChAjaxSocket(self__.url,self__.chs,G__24927,self__.ajax_client_uuid,self__.csrf_token,self__.has_uid_QMARK_,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__24941.call(null,new cljs.core.Keyword(null,"ajax-client-uuid","ajax-client-uuid",2569162690),expr__24942)))
{return (new taoensso.sente.ChAjaxSocket(self__.url,self__.chs,self__.open_QMARK_,G__24927,self__.csrf_token,self__.has_uid_QMARK_,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__24941.call(null,new cljs.core.Keyword(null,"csrf-token","csrf-token",4176868610),expr__24942)))
{return (new taoensso.sente.ChAjaxSocket(self__.url,self__.chs,self__.open_QMARK_,self__.ajax_client_uuid,G__24927,self__.has_uid_QMARK_,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_(pred__24941.call(null,new cljs.core.Keyword(null,"has-uid?","has-uid?",1108596916),expr__24942)))
{return (new taoensso.sente.ChAjaxSocket(self__.url,self__.chs,self__.open_QMARK_,self__.ajax_client_uuid,self__.csrf_token,G__24927,self__.__meta,self__.__extmap,null));
} else
{return (new taoensso.sente.ChAjaxSocket(self__.url,self__.chs,self__.open_QMARK_,self__.ajax_client_uuid,self__.csrf_token,self__.has_uid_QMARK_,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__18321__auto__,G__24927),null));
}
}
}
}
}
}
});
taoensso.sente.ChAjaxSocket.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__18327__auto__,writer__18328__auto__,opts__18329__auto__){var self__ = this;
var this__18327__auto____$1 = this;var pr_pair__18330__auto__ = ((function (this__18327__auto____$1){
return (function (keyval__18331__auto__){return cljs.core.pr_sequential_writer.call(null,writer__18328__auto__,cljs.core.pr_writer,""," ","",opts__18329__auto__,keyval__18331__auto__);
});})(this__18327__auto____$1))
;return cljs.core.pr_sequential_writer.call(null,writer__18328__auto__,pr_pair__18330__auto__,"#taoensso.sente.ChAjaxSocket{",", ","}",opts__18329__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"url","url",1014020321),self__.url],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"chs","chs",1014002720),self__.chs],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"open?","open?",1119852199),self__.open_QMARK_],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ajax-client-uuid","ajax-client-uuid",2569162690),self__.ajax_client_uuid],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"csrf-token","csrf-token",4176868610),self__.csrf_token],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"has-uid?","has-uid?",1108596916),self__.has_uid_QMARK_],null))], null),self__.__extmap));
});
taoensso.sente.ChAjaxSocket.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__18318__auto__,entry__18319__auto__){var self__ = this;
var this__18318__auto____$1 = this;if(cljs.core.vector_QMARK_.call(null,entry__18319__auto__))
{return cljs.core._assoc.call(null,this__18318__auto____$1,cljs.core._nth.call(null,entry__18319__auto__,0),cljs.core._nth.call(null,entry__18319__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__18318__auto____$1,entry__18319__auto__);
}
});
taoensso.sente.ChAjaxSocket.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__18325__auto__){var self__ = this;
var this__18325__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"url","url",1014020321),self__.url],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"chs","chs",1014002720),self__.chs],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"open?","open?",1119852199),self__.open_QMARK_],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ajax-client-uuid","ajax-client-uuid",2569162690),self__.ajax_client_uuid],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"csrf-token","csrf-token",4176868610),self__.csrf_token],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"has-uid?","has-uid?",1108596916),self__.has_uid_QMARK_],null))], null),self__.__extmap));
});
taoensso.sente.ChAjaxSocket.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__18317__auto__){var self__ = this;
var this__18317__auto____$1 = this;return (6 + cljs.core.count.call(null,self__.__extmap));
});
taoensso.sente.ChAjaxSocket.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__18309__auto__,other__18310__auto__){var self__ = this;
var this__18309__auto____$1 = this;if(cljs.core.truth_((function (){var and__17715__auto__ = other__18310__auto__;if(cljs.core.truth_(and__17715__auto__))
{return ((this__18309__auto____$1.constructor === other__18310__auto__.constructor)) && (cljs.core.equiv_map.call(null,this__18309__auto____$1,other__18310__auto__));
} else
{return and__17715__auto__;
}
})()))
{return true;
} else
{return false;
}
});
taoensso.sente.ChAjaxSocket.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__18312__auto__,G__24927){var self__ = this;
var this__18312__auto____$1 = this;return (new taoensso.sente.ChAjaxSocket(self__.url,self__.chs,self__.open_QMARK_,self__.ajax_client_uuid,self__.csrf_token,self__.has_uid_QMARK_,G__24927,self__.__extmap,self__.__hash));
});
taoensso.sente.ChAjaxSocket.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__18307__auto__){var self__ = this;
var this__18307__auto____$1 = this;return (new taoensso.sente.ChAjaxSocket(self__.url,self__.chs,self__.open_QMARK_,self__.ajax_client_uuid,self__.csrf_token,self__.has_uid_QMARK_,self__.__meta,self__.__extmap,self__.__hash));
});
taoensso.sente.ChAjaxSocket.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__18311__auto__){var self__ = this;
var this__18311__auto____$1 = this;return self__.__meta;
});
taoensso.sente.ChAjaxSocket.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__18322__auto__,k__18323__auto__){var self__ = this;
var this__18322__auto____$1 = this;if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"chs","chs",1014002720),null,new cljs.core.Keyword(null,"has-uid?","has-uid?",1108596916),null,new cljs.core.Keyword(null,"csrf-token","csrf-token",4176868610),null,new cljs.core.Keyword(null,"open?","open?",1119852199),null,new cljs.core.Keyword(null,"url","url",1014020321),null,new cljs.core.Keyword(null,"ajax-client-uuid","ajax-client-uuid",2569162690),null], null), null),k__18323__auto__))
{return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__18322__auto____$1),self__.__meta),k__18323__auto__);
} else
{return (new taoensso.sente.ChAjaxSocket(self__.url,self__.chs,self__.open_QMARK_,self__.ajax_client_uuid,self__.csrf_token,self__.has_uid_QMARK_,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__18323__auto__)),null));
}
});
taoensso.sente.ChAjaxSocket.cljs$lang$type = true;
taoensso.sente.ChAjaxSocket.cljs$lang$ctorPrSeq = (function (this__18347__auto__){return cljs.core._conj.call(null,cljs.core.List.EMPTY,"taoensso.sente/ChAjaxSocket");
});
taoensso.sente.ChAjaxSocket.cljs$lang$ctorPrWriter = (function (this__18347__auto__,writer__18348__auto__){return cljs.core._write.call(null,writer__18348__auto__,"taoensso.sente/ChAjaxSocket");
});
taoensso.sente.__GT_ChAjaxSocket = (function __GT_ChAjaxSocket(url,chs,open_QMARK_,ajax_client_uuid,csrf_token,has_uid_QMARK_){return (new taoensso.sente.ChAjaxSocket(url,chs,open_QMARK_,ajax_client_uuid,csrf_token,has_uid_QMARK_));
});
taoensso.sente.map__GT_ChAjaxSocket = (function map__GT_ChAjaxSocket(G__24929){return (new taoensso.sente.ChAjaxSocket(new cljs.core.Keyword(null,"url","url",1014020321).cljs$core$IFn$_invoke$arity$1(G__24929),new cljs.core.Keyword(null,"chs","chs",1014002720).cljs$core$IFn$_invoke$arity$1(G__24929),new cljs.core.Keyword(null,"open?","open?",1119852199).cljs$core$IFn$_invoke$arity$1(G__24929),new cljs.core.Keyword(null,"ajax-client-uuid","ajax-client-uuid",2569162690).cljs$core$IFn$_invoke$arity$1(G__24929),new cljs.core.Keyword(null,"csrf-token","csrf-token",4176868610).cljs$core$IFn$_invoke$arity$1(G__24929),new cljs.core.Keyword(null,"has-uid?","has-uid?",1108596916).cljs$core$IFn$_invoke$arity$1(G__24929),null,cljs.core.dissoc.call(null,G__24929,new cljs.core.Keyword(null,"url","url",1014020321),new cljs.core.Keyword(null,"chs","chs",1014002720),new cljs.core.Keyword(null,"open?","open?",1119852199),new cljs.core.Keyword(null,"ajax-client-uuid","ajax-client-uuid",2569162690),new cljs.core.Keyword(null,"csrf-token","csrf-token",4176868610),new cljs.core.Keyword(null,"has-uid?","has-uid?",1108596916))));
});
/**
* @param {...*} var_args
*/
taoensso.sente.chsk_url = (function() { 
var chsk_url__delegate = function (path,p__24948){var vec__24951 = p__24948;var websocket_QMARK_ = cljs.core.nth.call(null,vec__24951,0,null);var map__24952 = taoensso.encore.get_window_location.call(null);var map__24952__$1 = ((cljs.core.seq_QMARK_.call(null,map__24952))?cljs.core.apply.call(null,cljs.core.hash_map,map__24952):map__24952);var pathname = cljs.core.get.call(null,map__24952__$1,new cljs.core.Keyword(null,"pathname","pathname",2249078690));var host = cljs.core.get.call(null,map__24952__$1,new cljs.core.Keyword(null,"host","host",1017112858));var protocol = cljs.core.get.call(null,map__24952__$1,new cljs.core.Keyword(null,"protocol","protocol",4319707658));return [cljs.core.str(((cljs.core.not.call(null,websocket_QMARK_))?protocol:((cljs.core._EQ_.call(null,protocol,"https:"))?"wss:":"ws:"))),cljs.core.str("//"),cljs.core.str(host),cljs.core.str((function (){var or__17727__auto__ = path;if(cljs.core.truth_(or__17727__auto__))
{return or__17727__auto__;
} else
{return pathname;
}
})())].join('');
};
var chsk_url = function (path,var_args){
var p__24948 = null;if (arguments.length > 1) {
  p__24948 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return chsk_url__delegate.call(this,path,p__24948);};
chsk_url.cljs$lang$maxFixedArity = 1;
chsk_url.cljs$lang$applyTo = (function (arglist__24953){
var path = cljs.core.first(arglist__24953);
var p__24948 = cljs.core.rest(arglist__24953);
return chsk_url__delegate(path,p__24948);
});
chsk_url.cljs$core$IFn$_invoke$arity$variadic = chsk_url__delegate;
return chsk_url;
})()
;
/**
* Returns `{:keys [chsk ch-recv send-fn]}` for a new ChWebSocket or ChAjaxSocket that
* provides an ISocket interface:
* * An efficient, convenient, high-performance client/server message API.
* * Both callback and channel (routing) style bidirectional support.
* * Encapsulation of all low-level nastiness like capability fallback,
* reconnects, keep-alives, error logging, etc.
* 
* Note that the *same* URL is used for: WebSockets, POSTs, GETs. Server-side
* routes should be configured accordingly.
* @param {...*} var_args
*/
taoensso.sente.make_channel_socket_BANG_ = (function() { 
var make_channel_socket_BANG___delegate = function (url,p__24954){var vec__24957 = p__24954;var map__24958 = cljs.core.nth.call(null,vec__24957,0,null);var map__24958__$1 = ((cljs.core.seq_QMARK_.call(null,map__24958))?cljs.core.apply.call(null,cljs.core.hash_map,map__24958):map__24958);var lp_timeout = cljs.core.get.call(null,map__24958__$1,new cljs.core.Keyword(null,"lp-timeout","lp-timeout",4791954826),38000);var ws_kalive_ms = cljs.core.get.call(null,map__24958__$1,new cljs.core.Keyword(null,"ws-kalive-ms","ws-kalive-ms",4354717138),38000);var recv_buf_or_n = cljs.core.get.call(null,map__24958__$1,new cljs.core.Keyword(null,"recv-buf-or-n","recv-buf-or-n",1549384087),cljs.core.async.sliding_buffer.call(null,2048));var type = cljs.core.get.call(null,map__24958__$1,new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"auto","auto",1016910113));var has_uid_QMARK_ = cljs.core.get.call(null,map__24958__$1,new cljs.core.Keyword(null,"has-uid?","has-uid?",1108596916));var csrf_token = cljs.core.get.call(null,map__24958__$1,new cljs.core.Keyword(null,"csrf-token","csrf-token",4176868610));var _deprecated_more_opts = cljs.core.nth.call(null,vec__24957,1,null);if(!((_deprecated_more_opts == null)))
{taoensso.encore.warnf.call(null,"`make-channel-socket!` fn signature CHANGED with Sente v0.10.0.");
} else
{}
if(cljs.core.truth_(clojure.string.blank_QMARK_.call(null,csrf_token)))
{taoensso.encore.warnf.call(null,"No csrf-token provided");
} else
{}
var chs = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"state","state",1123661827),cljs.core.async.chan.call(null,cljs.core.async.sliding_buffer.call(null,1)),new cljs.core.Keyword(null,"recv","recv",1017400664),cljs.core.async.chan.call(null,recv_buf_or_n),new cljs.core.Keyword(null,"internal","internal",1584314927),cljs.core.async.chan.call(null,recv_buf_or_n)], null);var chsk = (function (){var or__17727__auto__ = (function (){var and__17715__auto__ = cljs.core.not_EQ_.call(null,type,new cljs.core.Keyword(null,"ajax","ajax",1016898962));if(and__17715__auto__)
{return taoensso.sente.chsk_make_BANG_.call(null,(new taoensso.sente.ChWebSocket(taoensso.sente.chsk_url.call(null,url,new cljs.core.Keyword(null,"ws","ws",1013908046)),chs,cljs.core.atom.call(null,false),cljs.core.atom.call(null,null),cljs.core.atom.call(null,null),cljs.core.atom.call(null,true),cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,cljs.core.PersistentArrayMap.EMPTY], null)))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"kalive-ms","kalive-ms",2622924675),ws_kalive_ms], null));
} else
{return and__17715__auto__;
}
})();if(cljs.core.truth_(or__17727__auto__))
{return or__17727__auto__;
} else
{var and__17715__auto__ = cljs.core.not_EQ_.call(null,type,new cljs.core.Keyword(null,"ws","ws",1013908046));if(and__17715__auto__)
{var ajax_client_uuid = taoensso.encore.uuid_str.call(null);return taoensso.sente.chsk_make_BANG_.call(null,(new taoensso.sente.ChAjaxSocket(taoensso.sente.chsk_url.call(null,url),chs,cljs.core.atom.call(null,false),ajax_client_uuid,csrf_token,has_uid_QMARK_)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"timeout","timeout",3994960083),lp_timeout], null));
} else
{return and__17715__auto__;
}
}
})();var type_STAR_ = taoensso.sente.chsk_type.call(null,chsk);var ever_opened_QMARK_ = cljs.core.atom.call(null,false);var state_STAR_ = ((function (chs,chsk,type_STAR_,ever_opened_QMARK_,vec__24957,map__24958,map__24958__$1,lp_timeout,ws_kalive_ms,recv_buf_or_n,type,has_uid_QMARK_,csrf_token,_deprecated_more_opts){
return (function (clj){if(cljs.core.truth_((function (){var or__17727__auto__ = cljs.core.not_EQ_.call(null,clj,new cljs.core.Keyword(null,"open","open",1017321916));if(or__17727__auto__)
{return or__17727__auto__;
} else
{return cljs.core.deref.call(null,ever_opened_QMARK_);
}
})()))
{return clj;
} else
{cljs.core.reset_BANG_.call(null,ever_opened_QMARK_,true);
return new cljs.core.Keyword(null,"first-open","first-open",806786745);
}
});})(chs,chsk,type_STAR_,ever_opened_QMARK_,vec__24957,map__24958,map__24958__$1,lp_timeout,ws_kalive_ms,recv_buf_or_n,type,has_uid_QMARK_,csrf_token,_deprecated_more_opts))
;if(cljs.core.truth_(chsk))
{return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"chsk","chsk",1016957167),chsk,new cljs.core.Keyword(null,"send-fn","send-fn",2993769631),cljs.core.partial.call(null,taoensso.sente.chsk_send_BANG_,chsk),new cljs.core.Keyword(null,"ch-recv","ch-recv",1704942016),cljs.core.async.merge.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.async.map_LT_.call(null,((function (chs,chsk,type_STAR_,ever_opened_QMARK_,state_STAR_,vec__24957,map__24958,map__24958__$1,lp_timeout,ws_kalive_ms,recv_buf_or_n,type,has_uid_QMARK_,csrf_token,_deprecated_more_opts){
return (function (ev){if(taoensso.sente.event_QMARK_.call(null,ev))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"event?","event?",1363106462,null),new cljs.core.Symbol(null,"ev","ev",-1640528278,null))))].join('')));
}
return ev;
});})(chs,chsk,type_STAR_,ever_opened_QMARK_,state_STAR_,vec__24957,map__24958,map__24958__$1,lp_timeout,ws_kalive_ms,recv_buf_or_n,type,has_uid_QMARK_,csrf_token,_deprecated_more_opts))
,new cljs.core.Keyword(null,"internal","internal",1584314927).cljs$core$IFn$_invoke$arity$1(chs)),cljs.core.async.map_LT_.call(null,((function (chs,chsk,type_STAR_,ever_opened_QMARK_,state_STAR_,vec__24957,map__24958,map__24958__$1,lp_timeout,ws_kalive_ms,recv_buf_or_n,type,has_uid_QMARK_,csrf_token,_deprecated_more_opts){
return (function (clj){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","state","chsk/state",1318408525),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [state_STAR_.call(null,clj),type_STAR_], null)], null);
});})(chs,chsk,type_STAR_,ever_opened_QMARK_,state_STAR_,vec__24957,map__24958,map__24958__$1,lp_timeout,ws_kalive_ms,recv_buf_or_n,type,has_uid_QMARK_,csrf_token,_deprecated_more_opts))
,new cljs.core.Keyword(null,"state","state",1123661827).cljs$core$IFn$_invoke$arity$1(chs)),cljs.core.async.map_LT_.call(null,((function (chs,chsk,type_STAR_,ever_opened_QMARK_,state_STAR_,vec__24957,map__24958,map__24958__$1,lp_timeout,ws_kalive_ms,recv_buf_or_n,type,has_uid_QMARK_,csrf_token,_deprecated_more_opts){
return (function (ev){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","recv","chsk/recv",1214957308),ev], null);
});})(chs,chsk,type_STAR_,ever_opened_QMARK_,state_STAR_,vec__24957,map__24958,map__24958__$1,lp_timeout,ws_kalive_ms,recv_buf_or_n,type,has_uid_QMARK_,csrf_token,_deprecated_more_opts))
,new cljs.core.Keyword(null,"recv","recv",1017400664).cljs$core$IFn$_invoke$arity$1(chs))], null))], null);
} else
{return null;
}
};
var make_channel_socket_BANG_ = function (url,var_args){
var p__24954 = null;if (arguments.length > 1) {
  p__24954 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return make_channel_socket_BANG___delegate.call(this,url,p__24954);};
make_channel_socket_BANG_.cljs$lang$maxFixedArity = 1;
make_channel_socket_BANG_.cljs$lang$applyTo = (function (arglist__24959){
var url = cljs.core.first(arglist__24959);
var p__24954 = cljs.core.rest(arglist__24959);
return make_channel_socket_BANG___delegate(url,p__24954);
});
make_channel_socket_BANG_.cljs$core$IFn$_invoke$arity$variadic = make_channel_socket_BANG___delegate;
return make_channel_socket_BANG_;
})()
;
taoensso.sente.start_chsk_router_loop_BANG_ = (function start_chsk_router_loop_BANG_(event_handler,ch){var ctrl_ch = cljs.core.async.chan.call(null);var c__20231__auto___25036 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto___25036,ctrl_ch){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto___25036,ctrl_ch){
return (function (state_25019){var state_val_25020 = (state_25019[1]);if((state_val_25020 === 7))
{var inst_25015 = (state_25019[2]);var state_25019__$1 = state_25019;var statearr_25021_25037 = state_25019__$1;(statearr_25021_25037[2] = inst_25015);
(statearr_25021_25037[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25020 === 6))
{var inst_25004 = (state_25019[7]);var inst_25010 = cljs.core.nth.call(null,inst_25004,0,null);var inst_25011 = cljs.core.nth.call(null,inst_25004,1,null);var inst_25012 = event_handler.call(null,inst_25004,ch);var state_25019__$1 = (function (){var statearr_25022 = state_25019;(statearr_25022[8] = inst_25011);
(statearr_25022[9] = inst_25012);
(statearr_25022[10] = inst_25010);
return statearr_25022;
})();var statearr_25023_25038 = state_25019__$1;(statearr_25023_25038[2] = null);
(statearr_25023_25038[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25020 === 5))
{var state_25019__$1 = state_25019;var statearr_25024_25039 = state_25019__$1;(statearr_25024_25039[2] = new cljs.core.Keyword("taoensso.sente","stop","taoensso.sente/stop",4001192801));
(statearr_25024_25039[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25020 === 4))
{var inst_25003 = (state_25019[2]);var inst_25004 = cljs.core.nth.call(null,inst_25003,0,null);var inst_25005 = cljs.core.nth.call(null,inst_25003,1,null);var inst_25006 = (inst_25005 === ctrl_ch);var state_25019__$1 = (function (){var statearr_25025 = state_25019;(statearr_25025[7] = inst_25004);
return statearr_25025;
})();if(cljs.core.truth_(inst_25006))
{var statearr_25026_25040 = state_25019__$1;(statearr_25026_25040[1] = 5);
} else
{var statearr_25027_25041 = state_25019__$1;(statearr_25027_25041[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25020 === 3))
{var inst_25017 = (state_25019[2]);var state_25019__$1 = state_25019;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25019__$1,inst_25017);
} else
{if((state_val_25020 === 2))
{var inst_25000 = [ch,ctrl_ch];var inst_25001 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_25000,null));var state_25019__$1 = state_25019;return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_25019__$1,4,inst_25001);
} else
{if((state_val_25020 === 1))
{var state_25019__$1 = state_25019;var statearr_25028_25042 = state_25019__$1;(statearr_25028_25042[2] = null);
(statearr_25028_25042[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
});})(c__20231__auto___25036,ctrl_ch))
;return ((function (switch__20216__auto__,c__20231__auto___25036,ctrl_ch){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_25032 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_25032[0] = state_machine__20217__auto__);
(statearr_25032[1] = 1);
return statearr_25032;
});
var state_machine__20217__auto____1 = (function (state_25019){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_25019);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e25033){if((e25033 instanceof Object))
{var ex__20220__auto__ = e25033;var statearr_25034_25043 = state_25019;(statearr_25034_25043[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25019);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e25033;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__25044 = state_25019;
state_25019 = G__25044;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_25019){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_25019);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto___25036,ctrl_ch))
})();var state__20233__auto__ = (function (){var statearr_25035 = f__20232__auto__.call(null);(statearr_25035[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto___25036);
return statearr_25035;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto___25036,ctrl_ch))
);
return ((function (ctrl_ch){
return (function stop_BANG_(){return cljs.core.async.close_BANG_.call(null,ctrl_ch);
});
;})(ctrl_ch))
});

//# sourceMappingURL=sente.js.map