// Compiled by ClojureScript 0.0-2173
goog.provide('taoensso.encore');
goog.require('cljs.core');
goog.require('goog.structs');
goog.require('goog.Uri.QueryData');
goog.require('goog.string');
goog.require('goog.net.XhrIoPool');
goog.require('goog.events');
goog.require('cljs.reader');
goog.require('goog.net.EventType');
goog.require('goog.string.format');
goog.require('goog.structs');
goog.require('goog.net.ErrorCode');
goog.require('goog.Uri.QueryData');
goog.require('goog.string.StringBuffer');
goog.require('clojure.string');
goog.require('clojure.string');
goog.require('cljs.reader');
goog.require('goog.string');
goog.require('goog.net.XhrIo');
goog.require('goog.net.XhrIoPool');
goog.require('goog.net.XhrIo');
goog.require('goog.events');
/**
* Stolen from `clojure.tools.macro`.
* Handles optional docstrings & attr maps for a macro def's name.
*/
taoensso.encore.name_with_attrs = (function name_with_attrs(name,macro_args){var vec__22710 = ((typeof cljs.core.first.call(null,macro_args) === 'string')?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,macro_args),cljs.core.next.call(null,macro_args)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,macro_args], null));var docstring = cljs.core.nth.call(null,vec__22710,0,null);var macro_args__$1 = cljs.core.nth.call(null,vec__22710,1,null);var vec__22711 = ((cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,macro_args__$1)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,macro_args__$1),cljs.core.next.call(null,macro_args__$1)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.EMPTY,macro_args__$1], null));var attr = cljs.core.nth.call(null,vec__22711,0,null);var macro_args__$2 = cljs.core.nth.call(null,vec__22711,1,null);var attr__$1 = (cljs.core.truth_(docstring)?cljs.core.assoc.call(null,attr,new cljs.core.Keyword(null,"doc","doc",1014003882),docstring):attr);var attr__$2 = (cljs.core.truth_(cljs.core.meta.call(null,name))?cljs.core.conj.call(null,cljs.core.meta.call(null,name),attr__$1):attr__$1);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta.call(null,name,attr__$2),macro_args__$2], null);
});
taoensso.encore.nnil_QMARK_ = cljs.core.complement.call(null,cljs.core.nil_QMARK_);
taoensso.encore.nblank_QMARK_ = cljs.core.complement.call(null,clojure.string.blank_QMARK_);
/**
* Removed from cljs.core 0.0-1885, Ref. http://goo.gl/su7Xkj
* @param {...*} var_args
*/
taoensso.encore.format = (function() { 
var format__delegate = function (fmt,args){return cljs.core.apply.call(null,goog.string.format,fmt,args);
};
var format = function (fmt,var_args){
var args = null;if (arguments.length > 1) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return format__delegate.call(this,fmt,args);};
format.cljs$lang$maxFixedArity = 1;
format.cljs$lang$applyTo = (function (arglist__22712){
var fmt = cljs.core.first(arglist__22712);
var args = cljs.core.rest(arglist__22712);
return format__delegate(fmt,args);
});
format.cljs$core$IFn$_invoke$arity$variadic = format__delegate;
return format;
})()
;
/**
* Returns x as a unambiguous Boolean, or nil on failure. Requires more
* explicit truthiness than (boolean x).
*/
taoensso.encore.parse_bool = (function parse_bool(x){if(cljs.core.truth_(x))
{if((x === true) || (x === false))
{return x;
} else
{if((cljs.core._EQ_.call(null,x,"false")) || (cljs.core._EQ_.call(null,x,"FALSE")) || (cljs.core._EQ_.call(null,x,"0")) || (cljs.core._EQ_.call(null,x,0)))
{return false;
} else
{if((cljs.core._EQ_.call(null,x,"true")) || (cljs.core._EQ_.call(null,x,"TRUE")) || (cljs.core._EQ_.call(null,x,"1")) || (cljs.core._EQ_.call(null,x,1)))
{return true;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return null;
} else
{return null;
}
}
}
}
} else
{return null;
}
});
taoensso.encore.as_bool = (function as_bool(x){if(cljs.core.truth_(x))
{var p = taoensso.encore.parse_bool.call(null,x);if(!((p == null)))
{return p;
} else
{throw cljs.core.ex_info.call(null,taoensso.encore.format.call(null,"as-bool failed: %s",x),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1017479852),cljs.core.type.call(null,x)], null));
}
} else
{return null;
}
});
/**
* Returns x as Long (or JavaScript integer), or nil on failure.
*/
taoensso.encore.parse_int = (function parse_int(x){if(cljs.core.truth_(x))
{if(typeof x === 'number')
{return cljs.core.long$.call(null,x);
} else
{if(typeof x === 'string')
{var x__$1 = parseInt(x);if(cljs.core.truth_(isNaN(x__$1)))
{return null;
} else
{return x__$1;
}
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
});
taoensso.encore.as_int = (function as_int(x){if(cljs.core.truth_(x))
{var or__15224__auto__ = taoensso.encore.parse_int.call(null,x);if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{throw cljs.core.ex_info.call(null,taoensso.encore.format.call(null,"as-int failed: %s",x),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1017479852),cljs.core.type.call(null,x)], null));
}
} else
{return null;
}
});
/**
* Returns x as Double (or JavaScript float), or nil on failure.
*/
taoensso.encore.parse_float = (function parse_float(x){if(cljs.core.truth_(x))
{if(typeof x === 'number')
{return x;
} else
{if(typeof x === 'string')
{var x__$1 = parseFloat(x);if(cljs.core.truth_(isNan(x__$1)))
{return null;
} else
{return x__$1;
}
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
});
taoensso.encore.as_float = (function as_float(x){var or__15224__auto__ = taoensso.encore.parse_float.call(null,x);if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{throw cljs.core.ex_info.call(null,taoensso.encore.format.call(null,"as-float failed: %s",x),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1017479852),cljs.core.type.call(null,x)], null));
}
});
taoensso.encore.stringy_QMARK_ = (function stringy_QMARK_(x){return ((x instanceof cljs.core.Keyword)) || (typeof x === 'string');
});
/**
* Like `name` but includes namespace in string when present.
*/
taoensso.encore.fq_name = (function fq_name(x){if(typeof x === 'string')
{return x;
} else
{var n = cljs.core.name.call(null,x);var temp__4090__auto__ = cljs.core.namespace.call(null,x);if(cljs.core.truth_(temp__4090__auto__))
{var ns = temp__4090__auto__;return [cljs.core.str(ns),cljs.core.str("/"),cljs.core.str(n)].join('');
} else
{return n;
}
}
});
taoensso.encore.explode_keyword = (function explode_keyword(k){return clojure.string.split.call(null,taoensso.encore.fq_name.call(null,k),/[\.\/]/);
});
/**
* @param {...*} var_args
*/
taoensso.encore.merge_keywords = (function() { 
var merge_keywords__delegate = function (ks,p__22713){var vec__22715 = p__22713;var as_ns_QMARK_ = cljs.core.nth.call(null,vec__22715,0,null);var parts = cljs.core.reduce.call(null,cljs.core.into,cljs.core.PersistentVector.EMPTY,cljs.core.mapv.call(null,taoensso.encore.explode_keyword,cljs.core.filterv.call(null,cljs.core.identity,ks)));if(cljs.core.empty_QMARK_.call(null,parts))
{return null;
} else
{if(cljs.core.truth_(as_ns_QMARK_))
{return cljs.core.keyword.call(null,clojure.string.join.call(null,".",parts));
} else
{var ppop = cljs.core.pop.call(null,parts);return cljs.core.keyword.call(null,((cljs.core.empty_QMARK_.call(null,ppop))?null:clojure.string.join.call(null,".",ppop)),cljs.core.peek.call(null,parts));
}
}
};
var merge_keywords = function (ks,var_args){
var p__22713 = null;if (arguments.length > 1) {
  p__22713 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return merge_keywords__delegate.call(this,ks,p__22713);};
merge_keywords.cljs$lang$maxFixedArity = 1;
merge_keywords.cljs$lang$applyTo = (function (arglist__22716){
var ks = cljs.core.first(arglist__22716);
var p__22713 = cljs.core.rest(arglist__22716);
return merge_keywords__delegate(ks,p__22713);
});
merge_keywords.cljs$core$IFn$_invoke$arity$variadic = merge_keywords__delegate;
return merge_keywords;
})()
;
taoensso.encore.error_QMARK_ = (function error_QMARK_(x){var or__15224__auto__ = cljs.core.ex_data.call(null,x);if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{return (x instanceof Error);
}
});
taoensso.encore.pos_int_QMARK_ = (function pos_int_QMARK_(x){return (cljs.core.integer_QMARK_.call(null,x)) && ((x > 0));
});
taoensso.encore.nneg_int_QMARK_ = (function nneg_int_QMARK_(x){return (cljs.core.integer_QMARK_.call(null,x)) && (!((x < 0)));
});
/**
* @param {...*} var_args
*/
taoensso.encore.round = (function() { 
var round__delegate = function (x,p__22717){var vec__22720 = p__22717;var type = cljs.core.nth.call(null,vec__22720,0,null);var nplaces = cljs.core.nth.call(null,vec__22720,1,null);var modifier = (cljs.core.truth_(nplaces)?Math.pow.call(null,10.0,nplaces):null);var x_STAR_ = ((cljs.core.not.call(null,modifier))?x:(x * modifier));var rounded = (function (){var G__22721 = (function (){var or__15224__auto__ = type;if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{return new cljs.core.Keyword(null,"round","round",1122608384);
}
})();if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"trunc","trunc",1124544798),G__22721))
{return cljs.core.long$.call(null,x_STAR_);
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"ceil","ceil",1016953975),G__22721))
{return cljs.core.long$.call(null,Math.ceil.call(null,x_STAR_));
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"floor","floor",1111431038),G__22721))
{return cljs.core.long$.call(null,Math.floor.call(null,x_STAR_));
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"round","round",1122608384),G__22721))
{return Math.round.call(null,x_STAR_);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw cljs.core.ex_info.call(null,"Unknown round type",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1017479852),type], null));
} else
{return null;
}
}
}
}
}
})();if(cljs.core.not.call(null,modifier))
{return rounded;
} else
{return (rounded / modifier);
}
};
var round = function (x,var_args){
var p__22717 = null;if (arguments.length > 1) {
  p__22717 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return round__delegate.call(this,x,p__22717);};
round.cljs$lang$maxFixedArity = 1;
round.cljs$lang$applyTo = (function (arglist__22722){
var x = cljs.core.first(arglist__22722);
var p__22717 = cljs.core.rest(arglist__22722);
return round__delegate(x,p__22717);
});
round.cljs$core$IFn$_invoke$arity$variadic = round__delegate;
return round;
})()
;
taoensso.encore.round_STAR_ = taoensso.encore.round;
/**
* Optimized common case.
*/
taoensso.encore.round2 = (function round2(x){return (Math.round.call(null,(x * 1000.0)) / 1000.0);
});
/**
* Returns a UUIDv4 string of form "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
* Ref. http://www.ietf.org/rfc/rfc4122.txt,
* https://gist.github.com/franks42/4159427
*/
taoensso.encore.uuid_str = (function uuid_str(){var fs = (function (n){return cljs.core.apply.call(null,cljs.core.str,cljs.core.repeatedly.call(null,n,(function (){return cljs.core.rand_int.call(null,16).toString(16);
})));
});var g = ((function (fs){
return (function (){return (8 | (3 & cljs.core.rand_int.call(null,15))).toString(16);
});})(fs))
;var sb = (new goog.string.StringBuffer()).append(fs.call(null,8),"-",fs.call(null,4),"-4",fs.call(null,3),"-",g.call(null),fs.call(null,3),"-",fs.call(null,12));return sb.toString();
});
/**
* Returns binary exponential backoff value.
* @param {...*} var_args
*/
taoensso.encore.exp_backoff = (function() { 
var exp_backoff__delegate = function (nattempt,p__22723){var vec__22726 = p__22723;var map__22727 = cljs.core.nth.call(null,vec__22726,0,null);var map__22727__$1 = ((cljs.core.seq_QMARK_.call(null,map__22727))?cljs.core.apply.call(null,cljs.core.hash_map,map__22727):map__22727);var factor = cljs.core.get.call(null,map__22727__$1,new cljs.core.Keyword(null,"factor","factor",4026723521),1000);var min_SINGLEQUOTE_ = cljs.core.get.call(null,map__22727__$1,new cljs.core.Keyword(null,"min","min",1014012356));var max_SINGLEQUOTE_ = cljs.core.get.call(null,map__22727__$1,new cljs.core.Keyword(null,"max","max",1014012118));var binary_exp = Math.pow.call(null,2,(nattempt - 1));var time = (((binary_exp + cljs.core.rand.call(null,binary_exp)) * 0.5) * factor);return cljs.core.long$.call(null,(function (){var time__$1 = (cljs.core.truth_(min_SINGLEQUOTE_)?(function (){var x__15531__auto__ = min_SINGLEQUOTE_;var y__15532__auto__ = time;return ((x__15531__auto__ > y__15532__auto__) ? x__15531__auto__ : y__15532__auto__);
})():time);var time__$2 = (cljs.core.truth_(max_SINGLEQUOTE_)?(function (){var x__15538__auto__ = max_SINGLEQUOTE_;var y__15539__auto__ = time__$1;return ((x__15538__auto__ < y__15539__auto__) ? x__15538__auto__ : y__15539__auto__);
})():time__$1);return time__$2;
})());
};
var exp_backoff = function (nattempt,var_args){
var p__22723 = null;if (arguments.length > 1) {
  p__22723 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return exp_backoff__delegate.call(this,nattempt,p__22723);};
exp_backoff.cljs$lang$maxFixedArity = 1;
exp_backoff.cljs$lang$applyTo = (function (arglist__22728){
var nattempt = cljs.core.first(arglist__22728);
var p__22723 = cljs.core.rest(arglist__22728);
return exp_backoff__delegate(nattempt,p__22723);
});
exp_backoff.cljs$core$IFn$_invoke$arity$variadic = exp_backoff__delegate;
return exp_backoff;
})()
;
taoensso.encore.now_udt = (function now_udt(){return (new Date()).valueOf();
});
/**
* Useful for testing.
* @param {...*} var_args
*/
taoensso.encore.now_udt_mock_fn = (function() { 
var now_udt_mock_fn__delegate = function (p__22729){var vec__22731 = p__22729;var mock_udts = cljs.core.nth.call(null,vec__22731,0,null);var mock_udts__$1 = (function (){var or__15224__auto__ = mock_udts;if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{return cljs.core.range.call(null);
}
})();var idx = cljs.core.atom.call(null,-1);return (function (){return cljs.core.nth.call(null,mock_udts__$1,cljs.core.swap_BANG_.call(null,idx,cljs.core.inc));
});
};
var now_udt_mock_fn = function (var_args){
var p__22729 = null;if (arguments.length > 0) {
  p__22729 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return now_udt_mock_fn__delegate.call(this,p__22729);};
now_udt_mock_fn.cljs$lang$maxFixedArity = 0;
now_udt_mock_fn.cljs$lang$applyTo = (function (arglist__22732){
var p__22729 = cljs.core.seq(arglist__22732);
return now_udt_mock_fn__delegate(p__22729);
});
now_udt_mock_fn.cljs$core$IFn$_invoke$arity$variadic = now_udt_mock_fn__delegate;
return now_udt_mock_fn;
})()
;
taoensso.encore.secs__GT_ms = (function secs__GT_ms(secs){return (secs * 1000);
});
taoensso.encore.ms__GT_secs = (function ms__GT_secs(ms){return cljs.core.quot.call(null,ms,1000);
});
/**
* Returns number of milliseconds in period defined by given args.
* @param {...*} var_args
*/
taoensso.encore.ms = (function() { 
var ms__delegate = function (p__22733){var map__22735 = p__22733;var map__22735__$1 = ((cljs.core.seq_QMARK_.call(null,map__22735))?cljs.core.apply.call(null,cljs.core.hash_map,map__22735):map__22735);var opts = map__22735__$1;var ms__$1 = cljs.core.get.call(null,map__22735__$1,new cljs.core.Keyword(null,"ms","ms",1013907736));var msecs = cljs.core.get.call(null,map__22735__$1,new cljs.core.Keyword(null,"msecs","msecs",1118094241));var secs = cljs.core.get.call(null,map__22735__$1,new cljs.core.Keyword(null,"secs","secs",1017430452));var mins = cljs.core.get.call(null,map__22735__$1,new cljs.core.Keyword(null,"mins","mins",1017255891));var hours = cljs.core.get.call(null,map__22735__$1,new cljs.core.Keyword(null,"hours","hours",1113373313));var days = cljs.core.get.call(null,map__22735__$1,new cljs.core.Keyword(null,"days","days",1016980425));var weeks = cljs.core.get.call(null,map__22735__$1,new cljs.core.Keyword(null,"weeks","weeks",1126912625));var months = cljs.core.get.call(null,map__22735__$1,new cljs.core.Keyword(null,"months","months",4240384357));var years = cljs.core.get.call(null,map__22735__$1,new cljs.core.Keyword(null,"years","years",1128756040));if(cljs.core.every_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 9, [new cljs.core.Keyword(null,"weeks","weeks",1126912625),null,new cljs.core.Keyword(null,"secs","secs",1017430452),null,new cljs.core.Keyword(null,"msecs","msecs",1118094241),null,new cljs.core.Keyword(null,"mins","mins",1017255891),null,new cljs.core.Keyword(null,"hours","hours",1113373313),null,new cljs.core.Keyword(null,"years","years",1128756040),null,new cljs.core.Keyword(null,"days","days",1016980425),null,new cljs.core.Keyword(null,"ms","ms",1013907736),null,new cljs.core.Keyword(null,"months","months",4240384357),null], null), null),cljs.core.keys.call(null,opts)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"every?","every?",1363110461,null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 9, [new cljs.core.Keyword(null,"weeks","weeks",1126912625),null,new cljs.core.Keyword(null,"secs","secs",1017430452),null,new cljs.core.Keyword(null,"msecs","msecs",1118094241),null,new cljs.core.Keyword(null,"mins","mins",1017255891),null,new cljs.core.Keyword(null,"hours","hours",1113373313),null,new cljs.core.Keyword(null,"years","years",1128756040),null,new cljs.core.Keyword(null,"days","days",1016980425),null,new cljs.core.Keyword(null,"ms","ms",1013907736),null,new cljs.core.Keyword(null,"months","months",4240384357),null], null), null),cljs.core.list(new cljs.core.Symbol(null,"keys","keys",-1637242963,null),new cljs.core.Symbol(null,"opts","opts",-1637113383,null)))))].join('')));
}
return taoensso.encore.round.call(null,(((((((((cljs.core.truth_(years)?(((((years * 1000) * 60) * 60) * 24) * 365):0) + (cljs.core.truth_(months)?(((((months * 1000) * 60) * 60) * 24) * 29.53):0)) + (cljs.core.truth_(weeks)?(((((weeks * 1000) * 60) * 60) * 24) * 7):0)) + (cljs.core.truth_(days)?((((days * 1000) * 60) * 60) * 24):0)) + (cljs.core.truth_(hours)?(((hours * 1000) * 60) * 60):0)) + (cljs.core.truth_(mins)?((mins * 1000) * 60):0)) + (cljs.core.truth_(secs)?(secs * 1000):0)) + (cljs.core.truth_(msecs)?msecs:0)) + (cljs.core.truth_(ms__$1)?ms__$1:0)));
};
var ms = function (var_args){
var p__22733 = null;if (arguments.length > 0) {
  p__22733 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return ms__delegate.call(this,p__22733);};
ms.cljs$lang$maxFixedArity = 0;
ms.cljs$lang$applyTo = (function (arglist__22736){
var p__22733 = cljs.core.seq(arglist__22736);
return ms__delegate(p__22733);
});
ms.cljs$core$IFn$_invoke$arity$variadic = ms__delegate;
return ms;
})()
;
taoensso.encore.secs = cljs.core.comp.call(null,taoensso.encore.ms__GT_secs,taoensso.encore.ms);
/**
* (seq     {:a :A}) => ([:a :A])
* (seq-kvs {:a :A}) => (:a :A)
*/
taoensso.encore.seq_kvs = cljs.core.partial.call(null,cljs.core.reduce,cljs.core.concat);
/**
* Like `apply` but assumes last arg is a map whose elements should be applied
* to `f` as an unpaired seq:
* (mapply (fn [x & {:keys [y z]}] (str x y z)) 1 {:y 2 :z 3})
* where fn will receive args as: `(1 :y 2 :z 3)`.
* @param {...*} var_args
*/
taoensso.encore.mapply = (function() { 
var mapply__delegate = function (f,args){return cljs.core.apply.call(null,f,cljs.core.apply.call(null,cljs.core.concat,cljs.core.butlast.call(null,args),cljs.core.last.call(null,args)));
};
var mapply = function (f,var_args){
var args = null;if (arguments.length > 1) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return mapply__delegate.call(this,f,args);};
mapply.cljs$lang$maxFixedArity = 1;
mapply.cljs$lang$applyTo = (function (arglist__22737){
var f = cljs.core.first(arglist__22737);
var args = cljs.core.rest(arglist__22737);
return mapply__delegate(f,args);
});
mapply.cljs$core$IFn$_invoke$arity$variadic = mapply__delegate;
return mapply;
})()
;
taoensso.encore.map_kvs = (function map_kvs(kf,vf,m){if(cljs.core.truth_(m))
{var kf__$1 = ((!((kf === new cljs.core.Keyword(null,"keywordize","keywordize",1249131069))))?kf:(function (k,_){return cljs.core.keyword.call(null,k);
}));var vf__$1 = ((!((vf === new cljs.core.Keyword(null,"keywordize","keywordize",1249131069))))?vf:((function (kf__$1){
return (function (_,v){return cljs.core.keyword.call(null,v);
});})(kf__$1))
);return cljs.core.persistent_BANG_.call(null,cljs.core.reduce_kv.call(null,(function (m__$1,k,v){return cljs.core.assoc_BANG_.call(null,m__$1,(cljs.core.truth_(kf__$1)?kf__$1.call(null,k,v):k),(cljs.core.truth_(vf__$1)?vf__$1.call(null,v,v):v));
}),cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY),(function (){var or__15224__auto__ = m;if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{return cljs.core.PersistentArrayMap.EMPTY;
}
})()));
} else
{return null;
}
});
taoensso.encore.map_keys = (function map_keys(f,m){return taoensso.encore.map_kvs.call(null,(function (k,_){return f.call(null,k);
}),null,m);
});
taoensso.encore.map_vals = (function map_vals(f,m){return taoensso.encore.map_kvs.call(null,null,(function (_,v){return f.call(null,v);
}),m);
});
taoensso.encore.filter_kvs = (function filter_kvs(predk,predv,m){if(cljs.core.truth_(m))
{return cljs.core.reduce_kv.call(null,(function (m__$1,k,v){if(cljs.core.truth_((function (){var and__15212__auto__ = predk.call(null,k);if(cljs.core.truth_(and__15212__auto__))
{return predv.call(null,v);
} else
{return and__15212__auto__;
}
})()))
{return m__$1;
} else
{return cljs.core.dissoc.call(null,m__$1,k);
}
}),(function (){var or__15224__auto__ = m;if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{return cljs.core.PersistentArrayMap.EMPTY;
}
})(),(function (){var or__15224__auto__ = m;if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{return cljs.core.PersistentArrayMap.EMPTY;
}
})());
} else
{return null;
}
});
taoensso.encore.filter_keys = (function filter_keys(pred,m){return taoensso.encore.filter_kvs.call(null,pred,cljs.core.constantly.call(null,true),m);
});
taoensso.encore.filter_vals = (function filter_vals(pred,m){return taoensso.encore.filter_kvs.call(null,cljs.core.constantly.call(null,true),pred,m);
});
/**
* Smaller, common-case version of `filter-vals`. Esp useful with `nil?`/`blank?`
* pred when constructing maps: {:foo (when _ <...>) :bar (when _ <...>)} in a
* way that preservers :or semantics.
*/
taoensso.encore.remove_vals = (function remove_vals(pred,m){return cljs.core.reduce_kv.call(null,(function (m__$1,k,v){if(cljs.core.truth_(pred.call(null,v)))
{return cljs.core.dissoc.call(null,m__$1,k);
} else
{return m__$1;
}
}),m,m);
});
taoensso.encore.keywordize_map = (function keywordize_map(m){if(cljs.core.truth_(m))
{return cljs.core.reduce_kv.call(null,(function (m__$1,k,v){return cljs.core.assoc.call(null,m__$1,cljs.core.keyword.call(null,k),v);
}),cljs.core.PersistentArrayMap.EMPTY,m);
} else
{return null;
}
});
/**
* Cross between `hash-map` & `map-kvs`.
* @param {...*} var_args
*/
taoensso.encore.as_map = (function() { 
var as_map__delegate = function (coll,p__22738){var vec__22744 = p__22738;var kf = cljs.core.nth.call(null,vec__22744,0,null);var vf = cljs.core.nth.call(null,vec__22744,1,null);if(cljs.core.coll_QMARK_.call(null,coll))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"coll?","coll?",-1545688948,null),new cljs.core.Symbol(null,"coll","coll",-1637472091,null))))].join('')));
}
if(((kf == null)) || (cljs.core.fn_QMARK_.call(null,kf)) || ((kf === new cljs.core.Keyword(null,"keywordize","keywordize",1249131069))))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"or","or",-1640527972,null),cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",-1637150201,null),new cljs.core.Symbol(null,"kf","kf",-1640528108,null)),cljs.core.list(new cljs.core.Symbol(null,"fn?","fn?",-1640430032,null),new cljs.core.Symbol(null,"kf","kf",-1640528108,null)),cljs.core.list(new cljs.core.Symbol(null,"identical?","identical?",1035906019,null),new cljs.core.Symbol(null,"kf","kf",-1640528108,null),new cljs.core.Keyword(null,"keywordize","keywordize",1249131069)))))].join('')));
}
if(((vf == null)) || (cljs.core.fn_QMARK_.call(null,vf)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"or","or",-1640527972,null),cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",-1637150201,null),new cljs.core.Symbol(null,"vf","vf",-1640527767,null)),cljs.core.list(new cljs.core.Symbol(null,"fn?","fn?",-1640430032,null),new cljs.core.Symbol(null,"vf","vf",-1640527767,null)))))].join('')));
}
var _PERCENT_ = (function (){var temp__4092__auto__ = cljs.core.seq.call(null,coll);if(temp__4092__auto__)
{var s_SINGLEQUOTE_ = temp__4092__auto__;var kf__$1 = ((!((kf === new cljs.core.Keyword(null,"keywordize","keywordize",1249131069))))?kf:((function (s_SINGLEQUOTE_,temp__4092__auto__){
return (function (k,_){return cljs.core.keyword.call(null,k);
});})(s_SINGLEQUOTE_,temp__4092__auto__))
);var m = cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY);var G__22746 = s_SINGLEQUOTE_;var vec__22747 = G__22746;var k = cljs.core.nth.call(null,vec__22747,0,null);var v = cljs.core.nth.call(null,vec__22747,1,null);var s = vec__22747;var m__$1 = m;var G__22746__$1 = G__22746;while(true){
var m__$2 = m__$1;var vec__22748 = G__22746__$1;var k__$1 = cljs.core.nth.call(null,vec__22748,0,null);var v__$1 = cljs.core.nth.call(null,vec__22748,1,null);var s__$1 = vec__22748;var k__$2 = ((cljs.core.not.call(null,kf__$1))?k__$1:kf__$1.call(null,k__$1,v__$1));var v__$2 = ((cljs.core.not.call(null,vf))?v__$1:vf.call(null,k__$2,v__$1));var new_m = cljs.core.assoc_BANG_.call(null,m__$2,k__$2,v__$2);var temp__4090__auto__ = cljs.core.nnext.call(null,s__$1);if(temp__4090__auto__)
{var n = temp__4090__auto__;{
var G__22749 = new_m;
var G__22750 = n;
m__$1 = G__22749;
G__22746__$1 = G__22750;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,new_m);
}
break;
}
} else
{return null;
}
})();if(((_PERCENT_ == null)) || (cljs.core.map_QMARK_.call(null,_PERCENT_)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"or","or",-1640527972,null),cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",-1637150201,null),new cljs.core.Symbol(null,"%","%",-1640531490,null)),cljs.core.list(new cljs.core.Symbol(null,"map?","map?",-1637187556,null),new cljs.core.Symbol(null,"%","%",-1640531490,null)))))].join('')));
}
return _PERCENT_;
};
var as_map = function (coll,var_args){
var p__22738 = null;if (arguments.length > 1) {
  p__22738 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return as_map__delegate.call(this,coll,p__22738);};
as_map.cljs$lang$maxFixedArity = 1;
as_map.cljs$lang$applyTo = (function (arglist__22751){
var coll = cljs.core.first(arglist__22751);
var p__22738 = cljs.core.rest(arglist__22751);
return as_map__delegate(coll,p__22738);
});
as_map.cljs$core$IFn$_invoke$arity$variadic = as_map__delegate;
return as_map;
})()
;
/**
* Like `into` but supports multiple "from"s.
* @param {...*} var_args
*/
taoensso.encore.into_all = (function() {
var into_all = null;
var into_all__2 = (function (to,from){return cljs.core.into.call(null,to,from);
});
var into_all__3 = (function() { 
var G__22752__delegate = function (to,from,more){return cljs.core.reduce.call(null,cljs.core.into,cljs.core.into.call(null,to,from),more);
};
var G__22752 = function (to,from,var_args){
var more = null;if (arguments.length > 2) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__22752__delegate.call(this,to,from,more);};
G__22752.cljs$lang$maxFixedArity = 2;
G__22752.cljs$lang$applyTo = (function (arglist__22753){
var to = cljs.core.first(arglist__22753);
arglist__22753 = cljs.core.next(arglist__22753);
var from = cljs.core.first(arglist__22753);
var more = cljs.core.rest(arglist__22753);
return G__22752__delegate(to,from,more);
});
G__22752.cljs$core$IFn$_invoke$arity$variadic = G__22752__delegate;
return G__22752;
})()
;
into_all = function(to,from,var_args){
var more = var_args;
switch(arguments.length){
case 2:
return into_all__2.call(this,to,from);
default:
return into_all__3.cljs$core$IFn$_invoke$arity$variadic(to,from, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
into_all.cljs$lang$maxFixedArity = 2;
into_all.cljs$lang$applyTo = into_all__3.cljs$lang$applyTo;
into_all.cljs$core$IFn$_invoke$arity$2 = into_all__2;
into_all.cljs$core$IFn$_invoke$arity$variadic = into_all__3.cljs$core$IFn$_invoke$arity$variadic;
return into_all;
})()
;
/**
* Greedy version of `interleave`.
* Ref. https://groups.google.com/d/msg/clojure/o4Hg0s_1Avs/rPn3P4Ig6MsJ
* @param {...*} var_args
*/
taoensso.encore.interleave_all = (function() {
var interleave_all = null;
var interleave_all__2 = (function (c1,c2){return (new cljs.core.LazySeq(null,(function (){var s1 = cljs.core.seq.call(null,c1);var s2 = cljs.core.seq.call(null,c2);if((s1) && (s2))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s1),cljs.core.cons.call(null,cljs.core.first.call(null,s2),interleave_all.call(null,cljs.core.rest.call(null,s1),cljs.core.rest.call(null,s2))));
} else
{if(s1)
{return s1;
} else
{if(s2)
{return s2;
} else
{return null;
}
}
}
}),null,null));
});
var interleave_all__3 = (function() { 
var G__22754__delegate = function (c1,c2,colls){return (new cljs.core.LazySeq(null,(function (){var ss = cljs.core.filter.call(null,cljs.core.identity,cljs.core.map.call(null,cljs.core.seq,cljs.core.conj.call(null,colls,c2,c1)));return cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.first,ss),cljs.core.apply.call(null,interleave_all,cljs.core.map.call(null,cljs.core.rest,ss)));
}),null,null));
};
var G__22754 = function (c1,c2,var_args){
var colls = null;if (arguments.length > 2) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__22754__delegate.call(this,c1,c2,colls);};
G__22754.cljs$lang$maxFixedArity = 2;
G__22754.cljs$lang$applyTo = (function (arglist__22755){
var c1 = cljs.core.first(arglist__22755);
arglist__22755 = cljs.core.next(arglist__22755);
var c2 = cljs.core.first(arglist__22755);
var colls = cljs.core.rest(arglist__22755);
return G__22754__delegate(c1,c2,colls);
});
G__22754.cljs$core$IFn$_invoke$arity$variadic = G__22754__delegate;
return G__22754;
})()
;
interleave_all = function(c1,c2,var_args){
var colls = var_args;
switch(arguments.length){
case 2:
return interleave_all__2.call(this,c1,c2);
default:
return interleave_all__3.cljs$core$IFn$_invoke$arity$variadic(c1,c2, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
interleave_all.cljs$lang$maxFixedArity = 2;
interleave_all.cljs$lang$applyTo = interleave_all__3.cljs$lang$applyTo;
interleave_all.cljs$core$IFn$_invoke$arity$2 = interleave_all__2;
interleave_all.cljs$core$IFn$_invoke$arity$variadic = interleave_all__3.cljs$core$IFn$_invoke$arity$variadic;
return interleave_all;
})()
;
/**
* Prefer `set` when order doesn't matter (much faster).
*/
taoensso.encore.distinctv = (function() {
var distinctv = null;
var distinctv__1 = (function (coll){return cljs.core.persistent_BANG_.call(null,cljs.core.nth.call(null,cljs.core.reduce.call(null,(function (p__22760,in$){var vec__22761 = p__22760;var v = cljs.core.nth.call(null,vec__22761,0,null);var seen = cljs.core.nth.call(null,vec__22761,1,null);if(!(cljs.core.contains_QMARK_.call(null,seen,in$)))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj_BANG_.call(null,v,in$),cljs.core.conj.call(null,seen,in$)], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [v,seen], null);
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY),cljs.core.PersistentHashSet.EMPTY], null),coll),0));
});
var distinctv__2 = (function (keyfn,coll){return cljs.core.persistent_BANG_.call(null,cljs.core.nth.call(null,cljs.core.reduce.call(null,(function (p__22762,in$){var vec__22763 = p__22762;var v = cljs.core.nth.call(null,vec__22763,0,null);var seen = cljs.core.nth.call(null,vec__22763,1,null);var in_STAR_ = keyfn.call(null,in$);if(!(cljs.core.contains_QMARK_.call(null,seen,in_STAR_)))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj_BANG_.call(null,v,in$),cljs.core.conj.call(null,seen,in_STAR_)], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [v,seen], null);
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY),cljs.core.PersistentHashSet.EMPTY], null),coll),0));
});
distinctv = function(keyfn,coll){
switch(arguments.length){
case 1:
return distinctv__1.call(this,keyfn);
case 2:
return distinctv__2.call(this,keyfn,coll);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
distinctv.cljs$core$IFn$_invoke$arity$1 = distinctv__1;
distinctv.cljs$core$IFn$_invoke$arity$2 = distinctv__2;
return distinctv;
})()
;
/**
* Like `sort-by` for distinct. Based on clojure.core/distinct.
*/
taoensso.encore.distinct_by = (function distinct_by(keyfn,coll){var step = (function step(xs,seen){return (new cljs.core.LazySeq(null,(function (){return (function (p__22770,seen__$1){while(true){
var vec__22771 = p__22770;var v = cljs.core.nth.call(null,vec__22771,0,null);var xs__$1 = vec__22771;var temp__4092__auto__ = cljs.core.seq.call(null,xs__$1);if(temp__4092__auto__)
{var s = temp__4092__auto__;var v_STAR_ = keyfn.call(null,v);if(cljs.core.contains_QMARK_.call(null,seen__$1,v_STAR_))
{{
var G__22772 = cljs.core.rest.call(null,s);
var G__22773 = seen__$1;
p__22770 = G__22772;
seen__$1 = G__22773;
continue;
}
} else
{return cljs.core.cons.call(null,v,step.call(null,cljs.core.rest.call(null,s),cljs.core.conj.call(null,seen__$1,v_STAR_)));
}
} else
{return null;
}
break;
}
}).call(null,xs,seen);
}),null,null));
});return step.call(null,coll,cljs.core.PersistentHashSet.EMPTY);
});
/**
* Reverse comparator.
*/
taoensso.encore.rcompare = (function rcompare(x,y){return cljs.core.compare.call(null,y,x);
});
/**
* Like `merge-with` but merges maps recursively, applying the given fn
* only when there's a non-map at a particular level.
* 
* (merge-deep-with + {:a {:b {:c 1 :d {:x 1 :y 2}} :e 3} :f 4}
* {:a {:b {:c 2 :d {:z 9} :z 3} :e 100}})
* => {:a {:b {:z 3, :c 3, :d {:z 9, :x 1, :y 2}}, :e 103}, :f 4}
* @param {...*} var_args
*/
taoensso.encore.merge_deep_with = (function() { 
var merge_deep_with__delegate = function (f,maps){return cljs.core.apply.call(null,(function() { 
var m__delegate = function (maps__$1){if(cljs.core.every_QMARK_.call(null,cljs.core.map_QMARK_,maps__$1))
{return cljs.core.apply.call(null,cljs.core.merge_with,m,maps__$1);
} else
{return cljs.core.apply.call(null,f,maps__$1);
}
};
var m = function (var_args){
var maps__$1 = null;if (arguments.length > 0) {
  maps__$1 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return m__delegate.call(this,maps__$1);};
m.cljs$lang$maxFixedArity = 0;
m.cljs$lang$applyTo = (function (arglist__22774){
var maps__$1 = cljs.core.seq(arglist__22774);
return m__delegate(maps__$1);
});
m.cljs$core$IFn$_invoke$arity$variadic = m__delegate;
return m;
})()
,maps);
};
var merge_deep_with = function (f,var_args){
var maps = null;if (arguments.length > 1) {
  maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return merge_deep_with__delegate.call(this,f,maps);};
merge_deep_with.cljs$lang$maxFixedArity = 1;
merge_deep_with.cljs$lang$applyTo = (function (arglist__22775){
var f = cljs.core.first(arglist__22775);
var maps = cljs.core.rest(arglist__22775);
return merge_deep_with__delegate(f,maps);
});
merge_deep_with.cljs$core$IFn$_invoke$arity$variadic = merge_deep_with__delegate;
return merge_deep_with;
})()
;
taoensso.encore.merge_deep = cljs.core.partial.call(null,taoensso.encore.merge_deep_with,(function (x,y){return y;
}));
/**
* Returns the 'greatest' element in coll in O(n) time.
* @param {...*} var_args
*/
taoensso.encore.greatest = (function() { 
var greatest__delegate = function (coll,p__22778){var vec__22780 = p__22778;var _QMARK_comparator = cljs.core.nth.call(null,vec__22780,0,null);var comparator = (function (){var or__15224__auto__ = _QMARK_comparator;if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{return taoensso.encore.rcompare;
}
})();return cljs.core.reduce.call(null,(function (p1__22776_SHARP_,p2__22777_SHARP_){if((comparator.call(null,p1__22776_SHARP_,p2__22777_SHARP_) > 0))
{return p2__22777_SHARP_;
} else
{return p1__22776_SHARP_;
}
}),coll);
};
var greatest = function (coll,var_args){
var p__22778 = null;if (arguments.length > 1) {
  p__22778 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return greatest__delegate.call(this,coll,p__22778);};
greatest.cljs$lang$maxFixedArity = 1;
greatest.cljs$lang$applyTo = (function (arglist__22781){
var coll = cljs.core.first(arglist__22781);
var p__22778 = cljs.core.rest(arglist__22781);
return greatest__delegate(coll,p__22778);
});
greatest.cljs$core$IFn$_invoke$arity$variadic = greatest__delegate;
return greatest;
})()
;
/**
* Returns the 'least' element in coll in O(n) time.
* @param {...*} var_args
*/
taoensso.encore.least = (function() { 
var least__delegate = function (coll,p__22784){var vec__22786 = p__22784;var _QMARK_comparator = cljs.core.nth.call(null,vec__22786,0,null);var comparator = (function (){var or__15224__auto__ = _QMARK_comparator;if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{return taoensso.encore.rcompare;
}
})();return cljs.core.reduce.call(null,(function (p1__22782_SHARP_,p2__22783_SHARP_){if((comparator.call(null,p1__22782_SHARP_,p2__22783_SHARP_) < 0))
{return p2__22783_SHARP_;
} else
{return p1__22782_SHARP_;
}
}),coll);
};
var least = function (coll,var_args){
var p__22784 = null;if (arguments.length > 1) {
  p__22784 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return least__delegate.call(this,coll,p__22784);};
least.cljs$lang$maxFixedArity = 1;
least.cljs$lang$applyTo = (function (arglist__22787){
var coll = cljs.core.first(arglist__22787);
var p__22784 = cljs.core.rest(arglist__22787);
return least__delegate(coll,p__22784);
});
least.cljs$core$IFn$_invoke$arity$variadic = least__delegate;
return least;
})()
;
/**
* Like `repeatedly` but faster and `conj`s items into given collection.
*/
taoensso.encore.repeatedly_into = (function repeatedly_into(coll,n,f){if((coll instanceof clojure.lang.IEditableCollection))
{var v = cljs.core.transient$.call(null,coll);var idx = 0;while(true){
if((idx >= n))
{return cljs.core.persistent_BANG_.call(null,v);
} else
{{
var G__22788 = cljs.core.conj_BANG_.call(null,v,f.call(null));
var G__22789 = (idx + 1);
v = G__22788;
idx = G__22789;
continue;
}
}
break;
}
} else
{var v = coll;var idx = 0;while(true){
if((idx >= n))
{return v;
} else
{{
var G__22790 = cljs.core.conj.call(null,v,f.call(null));
var G__22791 = (idx + 1);
v = G__22790;
idx = G__22791;
continue;
}
}
break;
}
}
});
taoensso.encore.str_contains_QMARK_ = (function str_contains_QMARK_(s,substr){return cljs.core.not_EQ_.call(null,-1,s.indexOf(substr));
});
taoensso.encore.str_starts_with_QMARK_ = (function str_starts_with_QMARK_(s,substr){return (s.indexOf(substr) === 0);
});
taoensso.encore.str_ends_with_QMARK_ = (function str_ends_with_QMARK_(s,substr){var s_len = s.length;var substr_len = substr.length;if((s_len >= substr_len))
{return cljs.core.not_EQ_.call(null,-1,s.indexOf(substr,(s_len - substr_len)));
} else
{return null;
}
});
taoensso.encore.str_trunc = (function str_trunc(s,max_len){if((s.length <= max_len))
{return s;
} else
{return s.substring(0,max_len);
}
});
/**
* Like `clojure.string/join` but ensures no double separators.
* @param {...*} var_args
*/
taoensso.encore.join_once = (function() { 
var join_once__delegate = function (separator,coll){return cljs.core.reduce.call(null,(function (s1,s2){var s1__$1 = [cljs.core.str(s1)].join('');var s2__$1 = [cljs.core.str(s2)].join('');if(cljs.core.truth_(taoensso.encore.str_ends_with_QMARK_.call(null,s1__$1,separator)))
{if(taoensso.encore.str_starts_with_QMARK_.call(null,s2__$1,separator))
{return [cljs.core.str(s1__$1),cljs.core.str(s2__$1.substring(1))].join('');
} else
{return [cljs.core.str(s1__$1),cljs.core.str(s2__$1)].join('');
}
} else
{if(taoensso.encore.str_starts_with_QMARK_.call(null,s2__$1,separator))
{return [cljs.core.str(s1__$1),cljs.core.str(s2__$1)].join('');
} else
{if((cljs.core._EQ_.call(null,s1__$1,"")) || (cljs.core._EQ_.call(null,s2__$1,"")))
{return [cljs.core.str(s1__$1),cljs.core.str(s2__$1)].join('');
} else
{return [cljs.core.str(s1__$1),cljs.core.str(separator),cljs.core.str(s2__$1)].join('');
}
}
}
}),null,coll);
};
var join_once = function (separator,var_args){
var coll = null;if (arguments.length > 1) {
  coll = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return join_once__delegate.call(this,separator,coll);};
join_once.cljs$lang$maxFixedArity = 1;
join_once.cljs$lang$applyTo = (function (arglist__22792){
var separator = cljs.core.first(arglist__22792);
var coll = cljs.core.rest(arglist__22792);
return join_once__delegate(separator,coll);
});
join_once.cljs$core$IFn$_invoke$arity$variadic = join_once__delegate;
return join_once;
})()
;
/**
* Joins string paths (URLs, file paths, etc.) ensuring correct "/"
* interposition.
* @param {...*} var_args
*/
taoensso.encore.path = (function() { 
var path__delegate = function (parts){return cljs.core.apply.call(null,taoensso.encore.join_once,"/",parts);
};
var path = function (var_args){
var parts = null;if (arguments.length > 0) {
  parts = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return path__delegate.call(this,parts);};
path.cljs$lang$maxFixedArity = 0;
path.cljs$lang$applyTo = (function (arglist__22793){
var parts = cljs.core.seq(arglist__22793);
return path__delegate(parts);
});
path.cljs$core$IFn$_invoke$arity$variadic = path__delegate;
return path;
})()
;
/**
* Converts all word breaks of any form and length (including line breaks of any
* form, tabs, spaces, etc.) to a single regular space.
*/
taoensso.encore.norm_word_breaks = (function norm_word_breaks(s){return clojure.string.replace.call(null,[cljs.core.str(s)].join(''),/\s+/," ");
});
taoensso.encore.count_words = (function count_words(s){if(cljs.core.truth_(clojure.string.blank_QMARK_.call(null,s)))
{return 0;
} else
{return cljs.core.count.call(null,clojure.string.split.call(null,s,/\s+/));
}
});
taoensso.encore.count_words.call(null,"Hello this is a    test");
taoensso.encore.gc_rate = (1.0 / 8000);
taoensso.encore.locked = (function locked(lock_object,f){return f.call(null);
});
/**
* Like `(memoize* f)` but takes an explicit cache atom (possibly nil)
* and immediately applies memoized f to given arguments.
* @param {...*} var_args
*/
taoensso.encore.memoized = (function() { 
var memoized__delegate = function (cache,f,args){var lockf = (function (){var temp__4090__auto__ = cljs.core.deref.call(null,cache).call(null,args);if(cljs.core.truth_(temp__4090__auto__))
{var dv = temp__4090__auto__;return cljs.core.deref.call(null,dv);
} else
{var dv = (new cljs.core.Delay(cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"done","done",1016993524),false,new cljs.core.Keyword(null,"value","value",1125876963),null], null)),((function (temp__4090__auto__){
return (function (){return cljs.core.apply.call(null,f,args);
});})(temp__4090__auto__))
));cljs.core.swap_BANG_.call(null,cache,cljs.core.assoc,args,dv);
return cljs.core.deref.call(null,dv);
}
});if(cljs.core.not.call(null,cache))
{return cljs.core.apply.call(null,f,args);
} else
{var temp__4090__auto__ = cljs.core.deref.call(null,cache).call(null,args);if(cljs.core.truth_(temp__4090__auto__))
{var dv = temp__4090__auto__;return cljs.core.deref.call(null,dv);
} else
{return taoensso.encore.locked.call(null,cache,lockf);
}
}
};
var memoized = function (cache,f,var_args){
var args = null;if (arguments.length > 2) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return memoized__delegate.call(this,cache,f,args);};
memoized.cljs$lang$maxFixedArity = 2;
memoized.cljs$lang$applyTo = (function (arglist__22794){
var cache = cljs.core.first(arglist__22794);
arglist__22794 = cljs.core.next(arglist__22794);
var f = cljs.core.first(arglist__22794);
var args = cljs.core.rest(arglist__22794);
return memoized__delegate(cache,f,args);
});
memoized.cljs$core$IFn$_invoke$arity$variadic = memoized__delegate;
return memoized;
})()
;
/**
* Like `clojure.core/memoize` but:
* * Uses delays & a fn lock to prevent unnecessary race value recomputation.
* * Supports auto invalidation & gc with `ttl-ms` option.
* * Supports manual invalidation by prepending args with `:mem/del` or `:mem/fresh`.
* * Supports cache size limit & gc with `cache-size` option.
*/
taoensso.encore.memoize_STAR_ = (function() {
var memoize_STAR_ = null;
var memoize_STAR___1 = (function (f){var cache = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);return (function() { 
var G__22823__delegate = function (p__22810){var vec__22811 = p__22810;var arg1 = cljs.core.nth.call(null,vec__22811,0,null);var argn = cljs.core.nthnext.call(null,vec__22811,1);var args = vec__22811;if((arg1 === new cljs.core.Keyword("mem","del","mem/del",1020982117)))
{if((cljs.core.first.call(null,argn) === new cljs.core.Keyword("mem","all","mem/all",1020981651)))
{cljs.core.reset_BANG_.call(null,cache,cljs.core.PersistentArrayMap.EMPTY);
} else
{cljs.core.swap_BANG_.call(null,cache,cljs.core.dissoc,argn);
}
return null;
} else
{var fresh_QMARK_ = (arg1 === new cljs.core.Keyword("mem","fresh","mem/fresh",1118645762));var args__$1 = ((fresh_QMARK_)?argn:args);var try1 = ((function (fresh_QMARK_,args__$1){
return (function (){if(fresh_QMARK_)
{return null;
} else
{return cljs.core.deref.call(null,cache).call(null,args__$1);
}
});})(fresh_QMARK_,args__$1))
;var lockf = ((function (fresh_QMARK_,args__$1,try1){
return (function (){var temp__4090__auto__ = try1.call(null);if(cljs.core.truth_(temp__4090__auto__))
{var dv = temp__4090__auto__;return cljs.core.deref.call(null,dv);
} else
{var dv = (new cljs.core.Delay(cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"done","done",1016993524),false,new cljs.core.Keyword(null,"value","value",1125876963),null], null)),((function (temp__4090__auto__,fresh_QMARK_,args__$1,try1){
return (function (){return cljs.core.apply.call(null,f,args__$1);
});})(temp__4090__auto__,fresh_QMARK_,args__$1,try1))
));cljs.core.swap_BANG_.call(null,cache,cljs.core.assoc,args__$1,dv);
return cljs.core.deref.call(null,dv);
}
});})(fresh_QMARK_,args__$1,try1))
;var temp__4090__auto__ = try1.call(null);if(cljs.core.truth_(temp__4090__auto__))
{var dv = temp__4090__auto__;return cljs.core.deref.call(null,dv);
} else
{return taoensso.encore.locked.call(null,cache,lockf);
}
}
};
var G__22823 = function (var_args){
var p__22810 = null;if (arguments.length > 0) {
  p__22810 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return G__22823__delegate.call(this,p__22810);};
G__22823.cljs$lang$maxFixedArity = 0;
G__22823.cljs$lang$applyTo = (function (arglist__22824){
var p__22810 = cljs.core.seq(arglist__22824);
return G__22823__delegate(p__22810);
});
G__22823.cljs$core$IFn$_invoke$arity$variadic = G__22823__delegate;
return G__22823;
})()
;
});
var memoize_STAR___2 = (function (ttl_ms,f){var cache = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);return (function() { 
var G__22825__delegate = function (p__22812){var vec__22813 = p__22812;var arg1 = cljs.core.nth.call(null,vec__22813,0,null);var argn = cljs.core.nthnext.call(null,vec__22813,1);var args = vec__22813;if((arg1 === new cljs.core.Keyword("mem","del","mem/del",1020982117)))
{if((cljs.core.first.call(null,argn) === new cljs.core.Keyword("mem","all","mem/all",1020981651)))
{cljs.core.reset_BANG_.call(null,cache,cljs.core.PersistentArrayMap.EMPTY);
} else
{cljs.core.swap_BANG_.call(null,cache,cljs.core.dissoc,argn);
}
return null;
} else
{if((cljs.core.rand.call(null) <= taoensso.encore.gc_rate))
{var instant_22826 = taoensso.encore.now_udt.call(null);cljs.core.swap_BANG_.call(null,cache,(function (m){return cljs.core.reduce_kv.call(null,(function (m_STAR_,k,p__22814){var vec__22815 = p__22814;var dv = cljs.core.nth.call(null,vec__22815,0,null);var udt = cljs.core.nth.call(null,vec__22815,1,null);var cv = vec__22815;if(((instant_22826 - udt) > ttl_ms))
{return m_STAR_;
} else
{return cljs.core.assoc.call(null,m_STAR_,k,cv);
}
}),cljs.core.PersistentArrayMap.EMPTY,m);
}));
} else
{}
var fresh_QMARK_ = (arg1 === new cljs.core.Keyword("mem","fresh","mem/fresh",1118645762));var args__$1 = ((fresh_QMARK_)?argn:args);var try1 = ((function (fresh_QMARK_,args__$1){
return (function (){var temp__4092__auto__ = ((fresh_QMARK_)?null:cljs.core.deref.call(null,cache).call(null,args__$1));if(cljs.core.truth_(temp__4092__auto__))
{var vec__22816 = temp__4092__auto__;var dv = cljs.core.nth.call(null,vec__22816,0,null);var udt = cljs.core.nth.call(null,vec__22816,1,null);if(cljs.core.truth_((function (){var and__15212__auto__ = dv;if(cljs.core.truth_(and__15212__auto__))
{return ((taoensso.encore.now_udt.call(null) - udt) < ttl_ms);
} else
{return and__15212__auto__;
}
})()))
{return dv;
} else
{return null;
}
} else
{return null;
}
});})(fresh_QMARK_,args__$1))
;var lockf = ((function (fresh_QMARK_,args__$1,try1){
return (function (){var temp__4090__auto__ = try1.call(null);if(cljs.core.truth_(temp__4090__auto__))
{var dv = temp__4090__auto__;return cljs.core.deref.call(null,dv);
} else
{var dv = (new cljs.core.Delay(cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"done","done",1016993524),false,new cljs.core.Keyword(null,"value","value",1125876963),null], null)),((function (temp__4090__auto__,fresh_QMARK_,args__$1,try1){
return (function (){return cljs.core.apply.call(null,f,args__$1);
});})(temp__4090__auto__,fresh_QMARK_,args__$1,try1))
));var cv = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dv,taoensso.encore.now_udt.call(null)], null);cljs.core.swap_BANG_.call(null,cache,cljs.core.assoc,args__$1,cv);
return cljs.core.deref.call(null,dv);
}
});})(fresh_QMARK_,args__$1,try1))
;var temp__4090__auto__ = try1.call(null);if(cljs.core.truth_(temp__4090__auto__))
{var dv = temp__4090__auto__;return cljs.core.deref.call(null,dv);
} else
{return taoensso.encore.locked.call(null,cache,lockf);
}
}
};
var G__22825 = function (var_args){
var p__22812 = null;if (arguments.length > 0) {
  p__22812 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return G__22825__delegate.call(this,p__22812);};
G__22825.cljs$lang$maxFixedArity = 0;
G__22825.cljs$lang$applyTo = (function (arglist__22827){
var p__22812 = cljs.core.seq(arglist__22827);
return G__22825__delegate(p__22812);
});
G__22825.cljs$core$IFn$_invoke$arity$variadic = G__22825__delegate;
return G__22825;
})()
;
});
var memoize_STAR___3 = (function (cache_size,ttl_ms,f){var state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tick","tick",1017464079),0], null));return (function() { 
var G__22828__delegate = function (p__22817){var vec__22818 = p__22817;var arg1 = cljs.core.nth.call(null,vec__22818,0,null);var argn = cljs.core.nthnext.call(null,vec__22818,1);var args = vec__22818;if((arg1 === new cljs.core.Keyword("mem","del","mem/del",1020982117)))
{if((cljs.core.first.call(null,argn) === new cljs.core.Keyword("mem","all","mem/all",1020981651)))
{cljs.core.reset_BANG_.call(null,state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tick","tick",1017464079),0], null));
} else
{cljs.core.swap_BANG_.call(null,state,cljs.core.dissoc,argn);
}
return null;
} else
{if((cljs.core.rand.call(null) <= taoensso.encore.gc_rate))
{var instant_22829 = taoensso.encore.now_udt.call(null);cljs.core.swap_BANG_.call(null,state,(function (m){var m_STAR_ = cljs.core.dissoc.call(null,m,new cljs.core.Keyword(null,"tick","tick",1017464079));var m_STAR___$1 = ((cljs.core.not.call(null,ttl_ms))?m_STAR_:cljs.core.reduce_kv.call(null,((function (m_STAR_){
return (function (m_STAR___$1,k,p__22819){var vec__22820 = p__22819;var dv = cljs.core.nth.call(null,vec__22820,0,null);var udt = cljs.core.nth.call(null,vec__22820,1,null);var _ = cljs.core.nth.call(null,vec__22820,2,null);var ___$1 = cljs.core.nth.call(null,vec__22820,3,null);var cv = vec__22820;if(((instant_22829 - udt) > ttl_ms))
{return m_STAR___$1;
} else
{return cljs.core.assoc.call(null,m_STAR___$1,k,cv);
}
});})(m_STAR_))
,cljs.core.PersistentArrayMap.EMPTY,m_STAR_));var n_to_prune = (cljs.core.count.call(null,m_STAR___$1) - cache_size);var m_STAR___$2 = ((!((n_to_prune > 0)))?m_STAR___$1:cljs.core.apply.call(null,cljs.core.dissoc,m_STAR___$1,cljs.core.mapv.call(null,((function (m_STAR_,m_STAR___$1,n_to_prune){
return (function (p1__22796_SHARP_){return cljs.core.nth.call(null,p1__22796_SHARP_,1);
});})(m_STAR_,m_STAR___$1,n_to_prune))
,cljs.core.take.call(null,n_to_prune,cljs.core.sort_by.call(null,((function (m_STAR_,m_STAR___$1,n_to_prune){
return (function (p1__22795_SHARP_){return cljs.core.nth.call(null,p1__22795_SHARP_,0);
});})(m_STAR_,m_STAR___$1,n_to_prune))
,cljs.core.mapv.call(null,((function (m_STAR_,m_STAR___$1,n_to_prune){
return (function (k){var vec__22821 = m_STAR___$1.call(null,k);var _ = cljs.core.nth.call(null,vec__22821,0,null);var ___$1 = cljs.core.nth.call(null,vec__22821,1,null);var tick_lru = cljs.core.nth.call(null,vec__22821,2,null);var tick_lfu = cljs.core.nth.call(null,vec__22821,3,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(tick_lru + tick_lfu),k], null);
});})(m_STAR_,m_STAR___$1,n_to_prune))
,cljs.core.keys.call(null,m_STAR___$1)))))));return cljs.core.assoc.call(null,m_STAR___$2,new cljs.core.Keyword(null,"tick","tick",1017464079),new cljs.core.Keyword(null,"tick","tick",1017464079).cljs$core$IFn$_invoke$arity$1(m));
}));
} else
{}
var fresh_QMARK_ = (arg1 === new cljs.core.Keyword("mem","fresh","mem/fresh",1118645762));var args__$1 = ((fresh_QMARK_)?argn:args);var try1 = ((function (fresh_QMARK_,args__$1){
return (function (){var state_SINGLEQUOTE_ = cljs.core.deref.call(null,state);var tick_SINGLEQUOTE_ = new cljs.core.Keyword(null,"tick","tick",1017464079).cljs$core$IFn$_invoke$arity$1(state_SINGLEQUOTE_);var temp__4092__auto__ = ((fresh_QMARK_)?null:state_SINGLEQUOTE_.call(null,args__$1));if(cljs.core.truth_(temp__4092__auto__))
{var vec__22822 = temp__4092__auto__;var dv = cljs.core.nth.call(null,vec__22822,0,null);var udt = cljs.core.nth.call(null,vec__22822,1,null);var tick_lru = cljs.core.nth.call(null,vec__22822,2,null);var tick_lfu = cljs.core.nth.call(null,vec__22822,3,null);if(cljs.core.truth_((function (){var and__15212__auto__ = dv;if(cljs.core.truth_(and__15212__auto__))
{return ((ttl_ms == null)) || (((taoensso.encore.now_udt.call(null) - udt) < ttl_ms));
} else
{return and__15212__auto__;
}
})()))
{var sv_22830 = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [dv,udt,(tick_SINGLEQUOTE_ + 1),(tick_lfu + 1)], null);cljs.core.swap_BANG_.call(null,state,cljs.core.assoc,new cljs.core.Keyword(null,"tick","tick",1017464079),(tick_SINGLEQUOTE_ + 1),args__$1,sv_22830);
return dv;
} else
{return null;
}
} else
{return null;
}
});})(fresh_QMARK_,args__$1))
;var lockf = ((function (fresh_QMARK_,args__$1,try1){
return (function (){var temp__4090__auto__ = try1.call(null);if(cljs.core.truth_(temp__4090__auto__))
{var dv = temp__4090__auto__;return cljs.core.deref.call(null,dv);
} else
{var dv = (new cljs.core.Delay(cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"done","done",1016993524),false,new cljs.core.Keyword(null,"value","value",1125876963),null], null)),((function (temp__4090__auto__,fresh_QMARK_,args__$1,try1){
return (function (){return cljs.core.apply.call(null,f,args__$1);
});})(temp__4090__auto__,fresh_QMARK_,args__$1,try1))
));var tick = new cljs.core.Keyword(null,"tick","tick",1017464079).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,state));var sv = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [dv,(cljs.core.truth_(ttl_ms)?taoensso.encore.now_udt.call(null):null),(tick + 1),1], null);cljs.core.swap_BANG_.call(null,state,cljs.core.assoc,new cljs.core.Keyword(null,"tick","tick",1017464079),(tick + 1),args__$1,sv);
return cljs.core.deref.call(null,dv);
}
});})(fresh_QMARK_,args__$1,try1))
;var temp__4090__auto__ = try1.call(null);if(cljs.core.truth_(temp__4090__auto__))
{var dv = temp__4090__auto__;return cljs.core.deref.call(null,dv);
} else
{return taoensso.encore.locked.call(null,state,lockf);
}
}
};
var G__22828 = function (var_args){
var p__22817 = null;if (arguments.length > 0) {
  p__22817 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return G__22828__delegate.call(this,p__22817);};
G__22828.cljs$lang$maxFixedArity = 0;
G__22828.cljs$lang$applyTo = (function (arglist__22831){
var p__22817 = cljs.core.seq(arglist__22831);
return G__22828__delegate(p__22817);
});
G__22828.cljs$core$IFn$_invoke$arity$variadic = G__22828__delegate;
return G__22828;
})()
;
});
memoize_STAR_ = function(cache_size,ttl_ms,f){
switch(arguments.length){
case 1:
return memoize_STAR___1.call(this,cache_size);
case 2:
return memoize_STAR___2.call(this,cache_size,ttl_ms);
case 3:
return memoize_STAR___3.call(this,cache_size,ttl_ms,f);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
memoize_STAR_.cljs$core$IFn$_invoke$arity$1 = memoize_STAR___1;
memoize_STAR_.cljs$core$IFn$_invoke$arity$2 = memoize_STAR___2;
memoize_STAR_.cljs$core$IFn$_invoke$arity$3 = memoize_STAR___3;
return memoize_STAR_;
})()
;
/**
* Returns a `(fn [& [id]])` that returns either `nil` (limit okay) or number of
* msecs until next rate limit window (rate limited).
*/
taoensso.encore.rate_limiter = (function rate_limiter(ncalls_limit,window_ms){var state = cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,cljs.core.PersistentArrayMap.EMPTY], null));return (function() { 
var G__22850__delegate = function (p__22841){var vec__22842 = p__22841;var id = cljs.core.nth.call(null,vec__22842,0,null);if((cljs.core.rand.call(null) <= taoensso.encore.gc_rate))
{var instant_22851 = taoensso.encore.now_udt.call(null);cljs.core.swap_BANG_.call(null,state,(function (p__22843){var vec__22844 = p__22843;var _ = cljs.core.nth.call(null,vec__22844,0,null);var m = cljs.core.nth.call(null,vec__22844,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,cljs.core.reduce_kv.call(null,(function (m_STAR_,id__$1,p__22845){var vec__22846 = p__22845;var udt_window_start = cljs.core.nth.call(null,vec__22846,0,null);var ncalls = cljs.core.nth.call(null,vec__22846,1,null);if(((instant_22851 - udt_window_start) > window_ms))
{return m_STAR_;
} else
{return cljs.core.assoc.call(null,m_STAR_,id__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [udt_window_start,ncalls], null));
}
}),cljs.core.PersistentArrayMap.EMPTY,m)], null);
}));
} else
{}
return cljs.core.nth.call(null,(function (){var instant = taoensso.encore.now_udt.call(null);return cljs.core.swap_BANG_.call(null,state,(function (p__22847){var vec__22848 = p__22847;var _ = cljs.core.nth.call(null,vec__22848,0,null);var m = cljs.core.nth.call(null,vec__22848,1,null);var temp__4090__auto__ = m.call(null,id);if(cljs.core.truth_(temp__4090__auto__))
{var vec__22849 = temp__4090__auto__;var udt_window_start = cljs.core.nth.call(null,vec__22849,0,null);var ncalls = cljs.core.nth.call(null,vec__22849,1,null);if(((instant - udt_window_start) > window_ms))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,cljs.core.assoc.call(null,m,id,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [instant,1], null))], null);
} else
{if((ncalls < ncalls_limit))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,cljs.core.assoc.call(null,m,id,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [udt_window_start,(ncalls + 1)], null))], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((udt_window_start + window_ms) - instant),m], null);
}
}
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,cljs.core.assoc.call(null,m,id,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [instant,1], null))], null);
}
}));
})(),0);
};
var G__22850 = function (var_args){
var p__22841 = null;if (arguments.length > 0) {
  p__22841 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return G__22850__delegate.call(this,p__22841);};
G__22850.cljs$lang$maxFixedArity = 0;
G__22850.cljs$lang$applyTo = (function (arglist__22852){
var p__22841 = cljs.core.seq(arglist__22852);
return G__22850__delegate(p__22841);
});
G__22850.cljs$core$IFn$_invoke$arity$variadic = G__22850__delegate;
return G__22850;
})()
;
});
/**
* Wraps fn so that it returns {:result _ :backoff-ms _}.
*/
taoensso.encore.rate_limited = (function rate_limited(ncalls_limit,window_ms,f){var rl = taoensso.encore.rate_limiter.call(null,ncalls_limit,window_ms);return (function() { 
var G__22853__delegate = function (args){var temp__4090__auto__ = rl.call(null);if(cljs.core.truth_(temp__4090__auto__))
{var backoff_ms = temp__4090__auto__;return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backoff-ms","backoff-ms",4194291165),backoff_ms], null);
} else
{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"result","result",4374444943),f.call(null)], null);
}
};
var G__22853 = function (var_args){
var args = null;if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return G__22853__delegate.call(this,args);};
G__22853.cljs$lang$maxFixedArity = 0;
G__22853.cljs$lang$applyTo = (function (arglist__22854){
var args = cljs.core.seq(arglist__22854);
return G__22853__delegate(args);
});
G__22853.cljs$core$IFn$_invoke$arity$variadic = G__22853__delegate;
return G__22853;
})()
;
});
taoensso.encore.log = (function log(x){if(cljs.core.truth_(typeof console != 'undefined'))
{console.log(x);
} else
{print(x);
}
return null;
});
/**
* @param {...*} var_args
*/
taoensso.encore.sayp = (function() { 
var sayp__delegate = function (xs){return alert(clojure.string.join.call(null," ",xs));
};
var sayp = function (var_args){
var xs = null;if (arguments.length > 0) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return sayp__delegate.call(this,xs);};
sayp.cljs$lang$maxFixedArity = 0;
sayp.cljs$lang$applyTo = (function (arglist__22859){
var xs = cljs.core.seq(arglist__22859);
return sayp__delegate(xs);
});
sayp.cljs$core$IFn$_invoke$arity$variadic = sayp__delegate;
return sayp;
})()
;
/**
* @param {...*} var_args
*/
taoensso.encore.sayf = (function() { 
var sayf__delegate = function (fmt,xs){return alert(cljs.core.apply.call(null,taoensso.encore.format,fmt,xs));
};
var sayf = function (fmt,var_args){
var xs = null;if (arguments.length > 1) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return sayf__delegate.call(this,fmt,xs);};
sayf.cljs$lang$maxFixedArity = 1;
sayf.cljs$lang$applyTo = (function (arglist__22860){
var fmt = cljs.core.first(arglist__22860);
var xs = cljs.core.rest(arglist__22860);
return sayf__delegate(fmt,xs);
});
sayf.cljs$core$IFn$_invoke$arity$variadic = sayf__delegate;
return sayf;
})()
;
/**
* @param {...*} var_args
*/
taoensso.encore.logp = (function() { 
var logp__delegate = function (xs){return taoensso.encore.log.call(null,clojure.string.join.call(null," ",xs));
};
var logp = function (var_args){
var xs = null;if (arguments.length > 0) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return logp__delegate.call(this,xs);};
logp.cljs$lang$maxFixedArity = 0;
logp.cljs$lang$applyTo = (function (arglist__22861){
var xs = cljs.core.seq(arglist__22861);
return logp__delegate(xs);
});
logp.cljs$core$IFn$_invoke$arity$variadic = logp__delegate;
return logp;
})()
;
/**
* @param {...*} var_args
*/
taoensso.encore.logf = (function() { 
var logf__delegate = function (fmt,xs){return taoensso.encore.log.call(null,cljs.core.apply.call(null,taoensso.encore.format,fmt,xs));
};
var logf = function (fmt,var_args){
var xs = null;if (arguments.length > 1) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return logf__delegate.call(this,fmt,xs);};
logf.cljs$lang$maxFixedArity = 1;
logf.cljs$lang$applyTo = (function (arglist__22862){
var fmt = cljs.core.first(arglist__22862);
var xs = cljs.core.rest(arglist__22862);
return logf__delegate(fmt,xs);
});
logf.cljs$core$IFn$_invoke$arity$variadic = logf__delegate;
return logf;
})()
;
taoensso.encore.debugf = cljs.core.comp.call(null,(function (p1__22855_SHARP_){return [cljs.core.str(""),cljs.core.str(p1__22855_SHARP_)].join('');
}),taoensso.encore.logf);
taoensso.encore.infof = cljs.core.comp.call(null,(function (p1__22856_SHARP_){return [cljs.core.str(""),cljs.core.str(p1__22856_SHARP_)].join('');
}),taoensso.encore.logf);
taoensso.encore.warnf = cljs.core.comp.call(null,(function (p1__22857_SHARP_){return [cljs.core.str("WARN: "),cljs.core.str(p1__22857_SHARP_)].join('');
}),taoensso.encore.logf);
taoensso.encore.errorf = cljs.core.comp.call(null,(function (p1__22858_SHARP_){return [cljs.core.str("ERROR: "),cljs.core.str(p1__22858_SHARP_)].join('');
}),taoensso.encore.logf);
/**
* Returns browser window's current location. Forgeable.
*/
taoensso.encore.get_window_location = (function get_window_location(){var loc_STAR_ = window.location;var loc = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"href","href",1017115293),loc_STAR_.href,new cljs.core.Keyword(null,"protocol","protocol",4319707658),loc_STAR_.protocol,new cljs.core.Keyword(null,"hostname","hostname",714100645),loc_STAR_.hostname,new cljs.core.Keyword(null,"host","host",1017112858),loc_STAR_.host,new cljs.core.Keyword(null,"pathname","pathname",2249078690),loc_STAR_.pathname,new cljs.core.Keyword(null,"search","search",4402534682),loc_STAR_.search,new cljs.core.Keyword(null,"hash","hash",1017099392),loc_STAR_.hash], null);return loc;
});
/**
* @param {...*} var_args
*/
taoensso.encore.set_exp_backoff_timeout_BANG_ = (function() { 
var set_exp_backoff_timeout_BANG___delegate = function (nullary_f,p__22863){var vec__22865 = p__22863;var nattempt = cljs.core.nth.call(null,vec__22865,0,null);return window.setTimeout(nullary_f,taoensso.encore.exp_backoff.call(null,(function (){var or__15224__auto__ = nattempt;if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{return 0;
}
})()));
};
var set_exp_backoff_timeout_BANG_ = function (nullary_f,var_args){
var p__22863 = null;if (arguments.length > 1) {
  p__22863 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return set_exp_backoff_timeout_BANG___delegate.call(this,nullary_f,p__22863);};
set_exp_backoff_timeout_BANG_.cljs$lang$maxFixedArity = 1;
set_exp_backoff_timeout_BANG_.cljs$lang$applyTo = (function (arglist__22866){
var nullary_f = cljs.core.first(arglist__22866);
var p__22863 = cljs.core.rest(arglist__22866);
return set_exp_backoff_timeout_BANG___delegate(nullary_f,p__22863);
});
set_exp_backoff_timeout_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_exp_backoff_timeout_BANG___delegate;
return set_exp_backoff_timeout_BANG_;
})()
;
taoensso.encore.xhr_pool_ = (new cljs.core.Delay(cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"done","done",1016993524),false,new cljs.core.Keyword(null,"value","value",1125876963),null], null)),(function (){return (new goog.net.XhrIoPool());
})));
/**
* Returns an immediately available XhrIo instance, or nil. The instance must be
* released back to pool manually. Use core.async to wait for an available
* instance, etc.
*/
taoensso.encore.get_pooled_xhr_BANG_ = (function get_pooled_xhr_BANG_(){var result = cljs.core.deref.call(null,taoensso.encore.xhr_pool_).getObject();if((void 0 === result))
{return null;
} else
{return result;
}
});
/**
* [uri method get-or-post-params] -> [uri post-content]
*/
taoensso.encore.coerce_xhr_params = (function coerce_xhr_params(uri,method,params){if(((params == null)) || (cljs.core.map_QMARK_.call(null,params)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"or","or",-1640527972,null),cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",-1637150201,null),new cljs.core.Symbol(null,"params","params",1659007807,null)),cljs.core.list(new cljs.core.Symbol(null,"map?","map?",-1637187556,null),new cljs.core.Symbol(null,"params","params",1659007807,null)))))].join('')));
}
var _QMARK_pstr = ((cljs.core.empty_QMARK_.call(null,params))?null:(function (){var s = goog.Uri.QueryData.createFromMap((new goog.structs.Map(cljs.core.clj__GT_js.call(null,params)))).toString();if(cljs.core.truth_(clojure.string.blank_QMARK_.call(null,s)))
{return null;
} else
{return s;
}
})());var G__22868 = method;if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"post","post",1017351186),G__22868))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [uri,_QMARK_pstr], null);
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"get","get",1014006472),G__22868))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(_QMARK_pstr)?[cljs.core.str(uri),cljs.core.str("?"),cljs.core.str(_QMARK_pstr)].join(''):uri),null], null);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(method)].join('')));
} else
{return null;
}
}
}
});
/**
* Alpha - subject to change.
* Simple+lightweight Ajax via Google Closure.
* Ref. https://developers.google.com/closure/library/docs/xhrio
*/
taoensso.encore.ajax_lite = (function ajax_lite(uri,p__22871,callback){var map__22885 = p__22871;var map__22885__$1 = ((cljs.core.seq_QMARK_.call(null,map__22885))?cljs.core.apply.call(null,cljs.core.hash_map,map__22885):map__22885);var resp_type = cljs.core.get.call(null,map__22885__$1,new cljs.core.Keyword(null,"resp-type","resp-type",3288017545),new cljs.core.Keyword(null,"auto","auto",1016910113));var timeout = cljs.core.get.call(null,map__22885__$1,new cljs.core.Keyword(null,"timeout","timeout",3994960083),10000);var headers = cljs.core.get.call(null,map__22885__$1,new cljs.core.Keyword(null,"headers","headers",1809212152));var params = cljs.core.get.call(null,map__22885__$1,new cljs.core.Keyword(null,"params","params",4313443576));var method = cljs.core.get.call(null,map__22885__$1,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472));if(((timeout == null)) || (taoensso.encore.nneg_int_QMARK_.call(null,timeout)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"or","or",-1640527972,null),cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",-1637150201,null),new cljs.core.Symbol(null,"timeout","timeout",1340524314,null)),cljs.core.list(new cljs.core.Symbol(null,"nneg-int?","nneg-int?",-2019261324,null),new cljs.core.Symbol(null,"timeout","timeout",1340524314,null)))))].join('')));
}
var temp__4090__auto__ = taoensso.encore.get_pooled_xhr_BANG_.call(null);if(cljs.core.truth_(temp__4090__auto__))
{var xhr = temp__4090__auto__;try{var method_STAR_ = (function (){var G__22888 = method;if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"post","post",1017351186),G__22888))
{return "POST";
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"get","get",1014006472),G__22888))
{return "GET";
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(method)].join('')));
} else
{return null;
}
}
}
})();var params__$1 = taoensso.encore.map_keys.call(null,cljs.core.name,params);var headers__$1 = cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, ["X-Requested-With","XMLHTTPRequest"], null),taoensso.encore.map_keys.call(null,cljs.core.name,headers));var vec__22887 = taoensso.encore.coerce_xhr_params.call(null,uri,method,params__$1);var uri_STAR_ = cljs.core.nth.call(null,vec__22887,0,null);var post_content_STAR_ = cljs.core.nth.call(null,vec__22887,1,null);var headers_STAR_ = cljs.core.clj__GT_js.call(null,((cljs.core.not.call(null,post_content_STAR_))?headers__$1:cljs.core.assoc.call(null,headers__$1,"Content-Type","application/x-www-form-urlencoded; charset=UTF-8")));var G__22889 = xhr;goog.events.listenOnce(G__22889,goog.net.EventType.READY,(function (_){return cljs.core.deref.call(null,taoensso.encore.xhr_pool_).releaseObject(xhr);
}));
goog.events.listenOnce(G__22889,goog.net.EventType.COMPLETE,(function wrapped_callback(resp){var status = xhr.getStatus();var got_resp_QMARK_ = cljs.core.not_EQ_.call(null,status,-1);var content_type = ((got_resp_QMARK_)?xhr.getResponseHeader("Content-Type"):null);var cb_arg = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"raw-resp","raw-resp",1471254983),resp,new cljs.core.Keyword(null,"xhr","xhr",1014022900),xhr,new cljs.core.Keyword(null,"content-type","content-type",1799574400),((got_resp_QMARK_)?content_type:null),new cljs.core.Keyword(null,"content","content",1965434859),((got_resp_QMARK_)?(function (){var resp_type__$1 = ((!(cljs.core._EQ_.call(null,resp_type,new cljs.core.Keyword(null,"auto","auto",1016910113))))?resp_type:(function (){var pred__22894 = ((function (status,got_resp_QMARK_,content_type){
return (function (p1__22870_SHARP_,p2__22869_SHARP_){return taoensso.encore.str_ends_with_QMARK_.call(null,p2__22869_SHARP_,p1__22870_SHARP_);
});})(status,got_resp_QMARK_,content_type))
;var expr__22895 = [cljs.core.str(content_type)].join('');if(cljs.core.truth_(pred__22894.call(null,"edn",expr__22895)))
{return new cljs.core.Keyword(null,"edn","edn",1014004513);
} else
{if(cljs.core.truth_(pred__22894.call(null,"json",expr__22895)))
{return new cljs.core.Keyword(null,"json","json",1017176154);
} else
{if(cljs.core.truth_(pred__22894.call(null,"xml",expr__22895)))
{return new cljs.core.Keyword(null,"xml","xml",1014023049);
} else
{if(cljs.core.truth_(pred__22894.call(null,"html",expr__22895)))
{return new cljs.core.Keyword(null,"xml","xml",1014023049);
} else
{return new cljs.core.Keyword(null,"text","text",1017460895);
}
}
}
}
})());var G__22897 = resp_type__$1;if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"edn","edn",1014004513),G__22897))
{return cljs.reader.read_string.call(null,xhr.getResponseText());
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"xml","xml",1014023049),G__22897))
{return xhr.getResponseXml();
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"json","json",1017176154),G__22897))
{return xhr.getResponseJson();
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"text","text",1017460895),G__22897))
{return xhr.getResponseText();
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(resp_type__$1)].join('')));
} else
{return null;
}
}
}
}
}
})():null),new cljs.core.Keyword(null,"status","status",4416389988),((got_resp_QMARK_)?status:null),new cljs.core.Keyword(null,"error","error",1110689146),((got_resp_QMARK_)?((((200 <= status)) && ((status <= 299)))?null:status):cljs.core.get.call(null,new cljs.core.PersistentArrayMap.fromArray([goog.net.ErrorCode.EXCEPTION,new cljs.core.Keyword(null,"exception","exception",2495529921),goog.net.ErrorCode.HTTP_ERROR,new cljs.core.Keyword(null,"http-error","http-error",848845813),goog.net.ErrorCode.ABORT,new cljs.core.Keyword(null,"abort","abort",1106515618),goog.net.ErrorCode.TIMEOUT,new cljs.core.Keyword(null,"timeout","timeout",3994960083)], true, false),xhr.getLastErrorCode(),new cljs.core.Keyword(null,"unknown","unknown",729063356)))], null);return callback.call(null,cb_arg);
}));
G__22889.setTimeoutInterval((function (){var or__15224__auto__ = timeout;if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{return 0;
}
})());
G__22889.send(uri_STAR_,method_STAR_,post_content_STAR_,headers_STAR_);
return G__22889;
}catch (e22886){if((e22886 instanceof error))
{var e = e22886;taoensso.encore.logf.call(null,"Ajax error: %s",e);
cljs.core.deref.call(null,taoensso.encore.xhr_pool_).releaseObject(xhr);
return null;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e22886;
} else
{return null;
}
}
}} else
{return callback.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",1110689146),new cljs.core.Keyword(null,"xhr-pool-depleted","xhr-pool-depleted",4237587523)], null));
}
});

//# sourceMappingURL=encore.js.map