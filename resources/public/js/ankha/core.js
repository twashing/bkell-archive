// Compiled by ClojureScript 0.0-2202
goog.provide('ankha.core');
goog.require('cljs.core');
goog.require('goog.object');
goog.require('goog.object');
goog.require('clojure.string');
goog.require('clojure.string');
goog.require('om.dom');
goog.require('om.dom');
goog.require('om.core');
goog.require('om.core');
cljs.core.enable_console_print_BANG_.call(null);
ankha.core.empty_QMARK_ = (function empty_QMARK_(x){if(cljs.core.object_QMARK_.call(null,x))
{return goog.object.isEmpty(x);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.empty_QMARK_.call(null,x);
} else
{return null;
}
}
});
ankha.core.record_QMARK_ = (function record_QMARK_(x){var G__25795 = x;if(G__25795)
{var bit__18377__auto__ = (G__25795.cljs$lang$protocol_mask$partition0$ & 67108864);if((bit__18377__auto__) || (G__25795.cljs$core$IRecord$))
{return true;
} else
{if((!G__25795.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IRecord,G__25795);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IRecord,G__25795);
}
});
ankha.core.regex_QMARK_ = (function regex_QMARK_(x){return (x instanceof RegExp);
});
ankha.core.record_name = (function record_name(r){return cljs.core.first.call(null,clojure.string.split.call(null,cljs.core.pr_str.call(null,r),"{"));
});
ankha.core.literal = (function literal(class$,x){return React.DOM.span({"key": x, "className": class$},cljs.core.pr_str.call(null,x));
});
ankha.core.collection = (function collection(cursor,coll,class$,opener,closer){return om.core.build.call(null,ankha.core.view,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",1125876963),coll], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opts","opts",1017322386),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"opener","opener",4298292201),opener,new cljs.core.Keyword(null,"class","class",1108647146),class$,new cljs.core.Keyword(null,"closer","closer",3951351020),closer], null)], null));
});
ankha.core.inspect = (function inspect(data,x){if(typeof x === 'number')
{return ankha.core.literal.call(null,"number",x);
} else
{if((x instanceof cljs.core.Keyword))
{return ankha.core.literal.call(null,"keyword",x);
} else
{if((x instanceof cljs.core.Symbol))
{return ankha.core.literal.call(null,"symbol",x);
} else
{if(typeof x === 'string')
{return ankha.core.literal.call(null,"string",x);
} else
{if(x === true)
{return ankha.core.literal.call(null,"boolean",x);
} else
{if(x === false)
{return ankha.core.literal.call(null,"boolean",x);
} else
{if((x == null))
{return ankha.core.literal.call(null,"nil",x);
} else
{if(cljs.core.fn_QMARK_.call(null,x))
{return ankha.core.literal.call(null,"function",x);
} else
{if(ankha.core.regex_QMARK_.call(null,x))
{return ankha.core.literal.call(null,"regex",x);
} else
{if(ankha.core.record_QMARK_.call(null,x))
{return ankha.core.collection.call(null,data,x,"record",[cljs.core.str(ankha.core.record_name.call(null,x)),cljs.core.str("{")].join(''),"}");
} else
{if(cljs.core.map_QMARK_.call(null,x))
{return ankha.core.collection.call(null,data,x,"map","{","}");
} else
{if(cljs.core.vector_QMARK_.call(null,x))
{return ankha.core.collection.call(null,data,x,"vector","[","]");
} else
{if(cljs.core.set_QMARK_.call(null,x))
{return ankha.core.collection.call(null,data,x,"set","#{","}");
} else
{if(cljs.core.seq_QMARK_.call(null,x))
{return ankha.core.collection.call(null,data,x,"seq ","(",")");
} else
{if(cljs.core.object_QMARK_.call(null,x))
{return ankha.core.collection.call(null,data,x,"object","#js {","}");
} else
{if(x instanceof Array)
{return ankha.core.collection.call(null,data,x,"array","#js [","]");
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return ankha.core.literal.call(null,"literal",x);
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
}
}
}
}
}
}
}
}
}
});
ankha.core.associative__GT_dom = (function associative__GT_dom(data,kvs,p__25796){var map__25806 = p__25796;var map__25806__$1 = ((cljs.core.seq_QMARK_.call(null,map__25806))?cljs.core.apply.call(null,cljs.core.hash_map,map__25806):map__25806);var val_class = cljs.core.get.call(null,map__25806__$1,new cljs.core.Keyword(null,"val-class","val-class",2480724798));var key_class = cljs.core.get.call(null,map__25806__$1,new cljs.core.Keyword(null,"key-class","key-class",2216807420));var entry_class = cljs.core.get.call(null,map__25806__$1,new cljs.core.Keyword(null,"entry-class","entry-class",3066174415));return cljs.core.into_array.call(null,(function (){var iter__18444__auto__ = ((function (map__25806,map__25806__$1,val_class,key_class,entry_class){
return (function iter__25807(s__25808){return (new cljs.core.LazySeq(null,((function (map__25806,map__25806__$1,val_class,key_class,entry_class){
return (function (){var s__25808__$1 = s__25808;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__25808__$1);if(temp__4092__auto__)
{var s__25808__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__25808__$2))
{var c__18442__auto__ = cljs.core.chunk_first.call(null,s__25808__$2);var size__18443__auto__ = cljs.core.count.call(null,c__18442__auto__);var b__25810 = cljs.core.chunk_buffer.call(null,size__18443__auto__);if((function (){var i__25809 = 0;while(true){
if((i__25809 < size__18443__auto__))
{var vec__25813 = cljs.core._nth.call(null,c__18442__auto__,i__25809);var k = cljs.core.nth.call(null,vec__25813,0,null);var v = cljs.core.nth.call(null,vec__25813,1,null);cljs.core.chunk_append.call(null,b__25810,React.DOM.li(null,React.DOM.div({"style": {"position": "relative"}, "className": [cljs.core.str("entry "),cljs.core.str(entry_class)].join('')},React.DOM.span({"style": {"verticalAlign": "top", "display": "inline-block"}, "className": [cljs.core.str("key "),cljs.core.str(key_class)].join('')},ankha.core.inspect.call(null,data,om.core.value.call(null,k))),React.DOM.span({"style": {"width": "1em", "display": "inline-block"}}),React.DOM.span({"style": {"verticalAlign": "top", "display": "inline-block"}, "className": [cljs.core.str("val "),cljs.core.str(val_class)].join('')},ankha.core.inspect.call(null,data,om.core.value.call(null,v))))));
{
var G__25815 = (i__25809 + 1);
i__25809 = G__25815;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__25810),iter__25807.call(null,cljs.core.chunk_rest.call(null,s__25808__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__25810),null);
}
} else
{var vec__25814 = cljs.core.first.call(null,s__25808__$2);var k = cljs.core.nth.call(null,vec__25814,0,null);var v = cljs.core.nth.call(null,vec__25814,1,null);return cljs.core.cons.call(null,React.DOM.li(null,React.DOM.div({"style": {"position": "relative"}, "className": [cljs.core.str("entry "),cljs.core.str(entry_class)].join('')},React.DOM.span({"style": {"verticalAlign": "top", "display": "inline-block"}, "className": [cljs.core.str("key "),cljs.core.str(key_class)].join('')},ankha.core.inspect.call(null,data,om.core.value.call(null,k))),React.DOM.span({"style": {"width": "1em", "display": "inline-block"}}),React.DOM.span({"style": {"verticalAlign": "top", "display": "inline-block"}, "className": [cljs.core.str("val "),cljs.core.str(val_class)].join('')},ankha.core.inspect.call(null,data,om.core.value.call(null,v))))),iter__25807.call(null,cljs.core.rest.call(null,s__25808__$2)));
}
} else
{return null;
}
break;
}
});})(map__25806,map__25806__$1,val_class,key_class,entry_class))
,null,null));
});})(map__25806,map__25806__$1,val_class,key_class,entry_class))
;return iter__18444__auto__.call(null,kvs);
})());
});
ankha.core.map__GT_dom = (function map__GT_dom(data,m){return ankha.core.associative__GT_dom.call(null,data,m,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"entry-class","entry-class",3066174415),"map-entry",new cljs.core.Keyword(null,"key-class","key-class",2216807420),"map-key",new cljs.core.Keyword(null,"val-class","val-class",2480724798),"map-val"], null));
});
ankha.core.object__GT_dom = (function object__GT_dom(data,o){var _ = cljs.core.zipmap.call(null,goog.object.getKeys(o),goog.object.getValues(o));var ___$1 = ankha.core.associative__GT_dom.call(null,data,_,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"entry-class","entry-class",3066174415),"object-entry",new cljs.core.Keyword(null,"key-class","key-class",2216807420),"object-key",new cljs.core.Keyword(null,"val-class","val-class",2480724798),"object-val"], null));return ___$1;
});
ankha.core.coll__GT_dom = (function coll__GT_dom(data,v){return cljs.core.into_array.call(null,(function (){var iter__18444__auto__ = (function iter__25820(s__25821){return (new cljs.core.LazySeq(null,(function (){var s__25821__$1 = s__25821;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__25821__$1);if(temp__4092__auto__)
{var s__25821__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__25821__$2))
{var c__18442__auto__ = cljs.core.chunk_first.call(null,s__25821__$2);var size__18443__auto__ = cljs.core.count.call(null,c__18442__auto__);var b__25823 = cljs.core.chunk_buffer.call(null,size__18443__auto__);if((function (){var i__25822 = 0;while(true){
if((i__25822 < size__18443__auto__))
{var x = cljs.core._nth.call(null,c__18442__auto__,i__25822);cljs.core.chunk_append.call(null,b__25823,React.DOM.li({"className": "entry"},ankha.core.inspect.call(null,data,om.core.value.call(null,x))));
{
var G__25824 = (i__25822 + 1);
i__25822 = G__25824;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__25823),iter__25820.call(null,cljs.core.chunk_rest.call(null,s__25821__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__25823),null);
}
} else
{var x = cljs.core.first.call(null,s__25821__$2);return cljs.core.cons.call(null,React.DOM.li({"className": "entry"},ankha.core.inspect.call(null,data,om.core.value.call(null,x))),iter__25820.call(null,cljs.core.rest.call(null,s__25821__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__18444__auto__.call(null,v);
})());
});
ankha.core.toggle_button = (function toggle_button(owner,p__25825){var map__25827 = p__25825;var map__25827__$1 = ((cljs.core.seq_QMARK_.call(null,map__25827))?cljs.core.apply.call(null,cljs.core.hash_map,map__25827):map__25827);var disable_QMARK_ = cljs.core.get.call(null,map__25827__$1,new cljs.core.Keyword(null,"disable?","disable?",1284845001));return React.DOM.button({"style": {"fontWeight": "bold", "cursor": "pointer", "opacity": (cljs.core.truth_(disable_QMARK_)?"0.5":"1.0"), "padding": "0", "display": "inline-block", "outline": "none", "verticalAlign": "top", "background": "none", "border": "none"}, "onClick": ((function (map__25827,map__25827__$1,disable_QMARK_){
return (function (_){return om.core.set_state_BANG_.call(null,owner,new cljs.core.Keyword(null,"open?","open?",1119852199),cljs.core.not.call(null,om.core.get_state.call(null,owner,new cljs.core.Keyword(null,"open?","open?",1119852199))));
});})(map__25827,map__25827__$1,disable_QMARK_))
, "disabled": disable_QMARK_, "className": "toggle-button"},(cljs.core.truth_(om.core.get_state.call(null,owner,new cljs.core.Keyword(null,"open?","open?",1119852199)))?"-":"+"));
});
ankha.core.view = (function view(data,owner,p__25828){var map__25833 = p__25828;var map__25833__$1 = ((cljs.core.seq_QMARK_.call(null,map__25833))?cljs.core.apply.call(null,cljs.core.hash_map,map__25833):map__25833);var opts = map__25833__$1;var closer = cljs.core.get.call(null,map__25833__$1,new cljs.core.Keyword(null,"closer","closer",3951351020));var opener = cljs.core.get.call(null,map__25833__$1,new cljs.core.Keyword(null,"opener","opener",4298292201));var class$ = cljs.core.get.call(null,map__25833__$1,new cljs.core.Keyword(null,"class","class",1108647146));var value = new cljs.core.Keyword(null,"value","value",1125876963).cljs$core$IFn$_invoke$arity$1(data);var value_QMARK_ = ankha.core.empty_QMARK_.call(null,value);var open_QMARK_ = ((function (value,value_QMARK_,map__25833,map__25833__$1,opts,closer,opener,class$){
return (function (){return om.core.get_state.call(null,owner,new cljs.core.Keyword(null,"open?","open?",1119852199));
});})(value,value_QMARK_,map__25833,map__25833__$1,opts,closer,opener,class$))
;if(typeof ankha.core.t25834 !== 'undefined')
{} else
{
/**
* @constructor
*/
ankha.core.t25834 = (function (opener,opts,value,view,data,closer,class$,p__25828,open_QMARK_,owner,value_QMARK_,map__25833,meta25835){
this.opener = opener;
this.opts = opts;
this.value = value;
this.view = view;
this.data = data;
this.closer = closer;
this.class$ = class$;
this.p__25828 = p__25828;
this.open_QMARK_ = open_QMARK_;
this.owner = owner;
this.value_QMARK_ = value_QMARK_;
this.map__25833 = map__25833;
this.meta25835 = meta25835;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
ankha.core.t25834.cljs$lang$type = true;
ankha.core.t25834.cljs$lang$ctorStr = "ankha.core/t25834";
ankha.core.t25834.cljs$lang$ctorPrWriter = ((function (value,value_QMARK_,open_QMARK_,map__25833,map__25833__$1,opts,closer,opener,class$){
return (function (this__18294__auto__,writer__18295__auto__,opt__18296__auto__){return cljs.core._write.call(null,writer__18295__auto__,"ankha.core/t25834");
});})(value,value_QMARK_,open_QMARK_,map__25833,map__25833__$1,opts,closer,opener,class$))
;
ankha.core.t25834.prototype.om$core$IRender$ = true;
ankha.core.t25834.prototype.om$core$IRender$render$arity$1 = ((function (value,value_QMARK_,open_QMARK_,map__25833,map__25833__$1,opts,closer,opener,class$){
return (function (_){var self__ = this;
var ___$1 = this;return React.DOM.div({"className": self__.class$},ankha.core.toggle_button.call(null,self__.owner,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"disable?","disable?",1284845001),self__.value_QMARK_], null)),React.DOM.span({"style": {"display": "inline-block"}, "className": "opener"},self__.opener),React.DOM.ul({"style": {"margin": "0", "listStyleType": "none", "display": (cljs.core.truth_(self__.open_QMARK_.call(null))?"block":"none")}, "className": "values"},(function (){var f = ((cljs.core.map_QMARK_.call(null,self__.value))?ankha.core.map__GT_dom:((cljs.core.object_QMARK_.call(null,self__.value))?ankha.core.object__GT_dom:((new cljs.core.Keyword(null,"else","else",1017020587))?ankha.core.coll__GT_dom:null)));return f.call(null,self__.data,self__.value);
})()),React.DOM.span({"style": {"display": (cljs.core.truth_(self__.open_QMARK_.call(null))?"none":(cljs.core.truth_(self__.value_QMARK_)?"none":((new cljs.core.Keyword(null,"else","else",1017020587))?"inline":null)))}, "className": "ellipsis"},"\u2026"),React.DOM.span({"style": {"display": ((cljs.core.not.call(null,self__.value_QMARK_))?"inline-block":(cljs.core.truth_(self__.open_QMARK_.call(null))?"block":((new cljs.core.Keyword(null,"else","else",1017020587))?"inline-block":null)))}, "className": "closer"},self__.closer));
});})(value,value_QMARK_,open_QMARK_,map__25833,map__25833__$1,opts,closer,opener,class$))
;
ankha.core.t25834.prototype.om$core$IInitState$ = true;
ankha.core.t25834.prototype.om$core$IInitState$init_state$arity$1 = ((function (value,value_QMARK_,open_QMARK_,map__25833,map__25833__$1,opts,closer,opener,class$){
return (function (_){var self__ = this;
var ___$1 = this;return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open?","open?",1119852199),(!(new cljs.core.Keyword(null,"open?","open?",1119852199).cljs$core$IFn$_invoke$arity$1(self__.opts) === false)) && (cljs.core.not.call(null,self__.value_QMARK_))], null);
});})(value,value_QMARK_,open_QMARK_,map__25833,map__25833__$1,opts,closer,opener,class$))
;
ankha.core.t25834.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (value,value_QMARK_,open_QMARK_,map__25833,map__25833__$1,opts,closer,opener,class$){
return (function (_25836){var self__ = this;
var _25836__$1 = this;return self__.meta25835;
});})(value,value_QMARK_,open_QMARK_,map__25833,map__25833__$1,opts,closer,opener,class$))
;
ankha.core.t25834.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (value,value_QMARK_,open_QMARK_,map__25833,map__25833__$1,opts,closer,opener,class$){
return (function (_25836,meta25835__$1){var self__ = this;
var _25836__$1 = this;return (new ankha.core.t25834(self__.opener,self__.opts,self__.value,self__.view,self__.data,self__.closer,self__.class$,self__.p__25828,self__.open_QMARK_,self__.owner,self__.value_QMARK_,self__.map__25833,meta25835__$1));
});})(value,value_QMARK_,open_QMARK_,map__25833,map__25833__$1,opts,closer,opener,class$))
;
ankha.core.__GT_t25834 = ((function (value,value_QMARK_,open_QMARK_,map__25833,map__25833__$1,opts,closer,opener,class$){
return (function __GT_t25834(opener__$1,opts__$1,value__$1,view__$1,data__$1,closer__$1,class$__$1,p__25828__$1,open_QMARK___$1,owner__$1,value_QMARK___$1,map__25833__$2,meta25835){return (new ankha.core.t25834(opener__$1,opts__$1,value__$1,view__$1,data__$1,closer__$1,class$__$1,p__25828__$1,open_QMARK___$1,owner__$1,value_QMARK___$1,map__25833__$2,meta25835));
});})(value,value_QMARK_,open_QMARK_,map__25833,map__25833__$1,opts,closer,opener,class$))
;
}
return (new ankha.core.t25834(opener,opts,value,view,data,closer,class$,p__25828,open_QMARK_,owner,value_QMARK_,map__25833__$1,null));
});
ankha.core.inspector = (function() {
var inspector = null;
var inspector__2 = (function (data,owner){return inspector.call(null,data,owner,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opts","opts",1017322386),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"inspector"], null)], null));
});
var inspector__3 = (function (data,owner,opts){var map__25841 = opts;var map__25841__$1 = ((cljs.core.seq_QMARK_.call(null,map__25841))?cljs.core.apply.call(null,cljs.core.hash_map,map__25841):map__25841);var class$ = cljs.core.get.call(null,map__25841__$1,new cljs.core.Keyword(null,"class","class",1108647146),"inspector");if(typeof ankha.core.t25842 !== 'undefined')
{} else
{
/**
* @constructor
*/
ankha.core.t25842 = (function (class$,map__25841,opts,owner,data,inspector,meta25843){
this.class$ = class$;
this.map__25841 = map__25841;
this.opts = opts;
this.owner = owner;
this.data = data;
this.inspector = inspector;
this.meta25843 = meta25843;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
ankha.core.t25842.cljs$lang$type = true;
ankha.core.t25842.cljs$lang$ctorStr = "ankha.core/t25842";
ankha.core.t25842.cljs$lang$ctorPrWriter = ((function (map__25841,map__25841__$1,class$){
return (function (this__18294__auto__,writer__18295__auto__,opt__18296__auto__){return cljs.core._write.call(null,writer__18295__auto__,"ankha.core/t25842");
});})(map__25841,map__25841__$1,class$))
;
ankha.core.t25842.prototype.om$core$IRender$ = true;
ankha.core.t25842.prototype.om$core$IRender$render$arity$1 = ((function (map__25841,map__25841__$1,class$){
return (function (_){var self__ = this;
var ___$1 = this;return React.DOM.div({"style": {"overflowX": "scroll", "width": "100%", "whiteSpace": "pre-wrap", "fontFamily": "monospace"}, "className": "inspector"},ankha.core.inspect.call(null,self__.data,om.core.value.call(null,self__.data)));
});})(map__25841,map__25841__$1,class$))
;
ankha.core.t25842.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__25841,map__25841__$1,class$){
return (function (_25844){var self__ = this;
var _25844__$1 = this;return self__.meta25843;
});})(map__25841,map__25841__$1,class$))
;
ankha.core.t25842.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__25841,map__25841__$1,class$){
return (function (_25844,meta25843__$1){var self__ = this;
var _25844__$1 = this;return (new ankha.core.t25842(self__.class$,self__.map__25841,self__.opts,self__.owner,self__.data,self__.inspector,meta25843__$1));
});})(map__25841,map__25841__$1,class$))
;
ankha.core.__GT_t25842 = ((function (map__25841,map__25841__$1,class$){
return (function __GT_t25842(class$__$1,map__25841__$2,opts__$1,owner__$1,data__$1,inspector__$1,meta25843){return (new ankha.core.t25842(class$__$1,map__25841__$2,opts__$1,owner__$1,data__$1,inspector__$1,meta25843));
});})(map__25841,map__25841__$1,class$))
;
}
return (new ankha.core.t25842(class$,map__25841__$1,opts,owner,data,inspector,null));
});
inspector = function(data,owner,opts){
switch(arguments.length){
case 2:
return inspector__2.call(this,data,owner);
case 3:
return inspector__3.call(this,data,owner,opts);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
inspector.cljs$core$IFn$_invoke$arity$2 = inspector__2;
inspector.cljs$core$IFn$_invoke$arity$3 = inspector__3;
return inspector;
})()
;

//# sourceMappingURL=core.js.map