// Compiled by ClojureScript 0.0-2202
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.ioc_helpers');
cljs.core.async.fn_handler = (function fn_handler(f){if(typeof cljs.core.async.t25848 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t25848 = (function (f,fn_handler,meta25849){
this.f = f;
this.fn_handler = fn_handler;
this.meta25849 = meta25849;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t25848.cljs$lang$type = true;
cljs.core.async.t25848.cljs$lang$ctorStr = "cljs.core.async/t25848";
cljs.core.async.t25848.cljs$lang$ctorPrWriter = (function (this__18294__auto__,writer__18295__auto__,opt__18296__auto__){return cljs.core._write.call(null,writer__18295__auto__,"cljs.core.async/t25848");
});
cljs.core.async.t25848.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t25848.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return true;
});
cljs.core.async.t25848.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.f;
});
cljs.core.async.t25848.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_25850){var self__ = this;
var _25850__$1 = this;return self__.meta25849;
});
cljs.core.async.t25848.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_25850,meta25849__$1){var self__ = this;
var _25850__$1 = this;return (new cljs.core.async.t25848(self__.f,self__.fn_handler,meta25849__$1));
});
cljs.core.async.__GT_t25848 = (function __GT_t25848(f__$1,fn_handler__$1,meta25849){return (new cljs.core.async.t25848(f__$1,fn_handler__$1,meta25849));
});
}
return (new cljs.core.async.t25848(f,fn_handler,null));
});
/**
* Returns a fixed buffer of size n. When full, puts will block/park.
*/
cljs.core.async.buffer = (function buffer(n){return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
* Returns a buffer of size n. When full, puts will complete but
* val will be dropped (no transfer).
*/
cljs.core.async.dropping_buffer = (function dropping_buffer(n){return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
* Returns a buffer of size n. When full, puts will complete, and be
* buffered, but oldest elements in buffer will be dropped (not
* transferred).
*/
cljs.core.async.sliding_buffer = (function sliding_buffer(n){return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
* Returns true if a channel created with buff will never block. That is to say,
* puts into this buffer will never cause the buffer to be full.
*/
cljs.core.async.unblocking_buffer_QMARK_ = (function unblocking_buffer_QMARK_(buff){var G__25852 = buff;if(G__25852)
{var bit__18377__auto__ = null;if(cljs.core.truth_((function (){var or__17727__auto__ = bit__18377__auto__;if(cljs.core.truth_(or__17727__auto__))
{return or__17727__auto__;
} else
{return G__25852.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})()))
{return true;
} else
{if((!G__25852.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__25852);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__25852);
}
});
/**
* Creates a channel with an optional buffer. If buf-or-n is a number,
* will create and use a fixed buffer of that size.
*/
cljs.core.async.chan = (function() {
var chan = null;
var chan__0 = (function (){return chan.call(null,null);
});
var chan__1 = (function (buf_or_n){var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,0))?null:buf_or_n);return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1));
});
chan = function(buf_or_n){
switch(arguments.length){
case 0:
return chan__0.call(this);
case 1:
return chan__1.call(this,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chan.cljs$core$IFn$_invoke$arity$0 = chan__0;
chan.cljs$core$IFn$_invoke$arity$1 = chan__1;
return chan;
})()
;
/**
* Returns a channel that will close after msecs
*/
cljs.core.async.timeout = (function timeout(msecs){return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
* takes a val from port. Must be called inside a (go ...) block. Will
* return nil if closed. Will park if nothing is available.
*/
cljs.core.async._LT__BANG_ = (function _LT__BANG_(port){if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("<! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
});
/**
* Asynchronously takes a val from port, passing to fn1. Will pass nil
* if closed. If on-caller? (default true) is true, and value is
* immediately available, will call fn1 on calling thread.
* Returns nil.
*/
cljs.core.async.take_BANG_ = (function() {
var take_BANG_ = null;
var take_BANG___2 = (function (port,fn1){return take_BANG_.call(null,port,fn1,true);
});
var take_BANG___3 = (function (port,fn1,on_caller_QMARK_){var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));if(cljs.core.truth_(ret))
{var val_25853 = cljs.core.deref.call(null,ret);if(cljs.core.truth_(on_caller_QMARK_))
{fn1.call(null,val_25853);
} else
{cljs.core.async.impl.dispatch.run.call(null,((function (val_25853,ret){
return (function (){return fn1.call(null,val_25853);
});})(val_25853,ret))
);
}
} else
{}
return null;
});
take_BANG_ = function(port,fn1,on_caller_QMARK_){
switch(arguments.length){
case 2:
return take_BANG___2.call(this,port,fn1);
case 3:
return take_BANG___3.call(this,port,fn1,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take_BANG_.cljs$core$IFn$_invoke$arity$2 = take_BANG___2;
take_BANG_.cljs$core$IFn$_invoke$arity$3 = take_BANG___3;
return take_BANG_;
})()
;
cljs.core.async.nop = (function nop(){return null;
});
/**
* puts a val into port. nil values are not allowed. Must be called
* inside a (go ...) block. Will park if no buffer space is available.
*/
cljs.core.async._GT__BANG_ = (function _GT__BANG_(port,val){if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(">! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
});
/**
* Asynchronously puts a val into port, calling fn0 (if supplied) when
* complete. nil values are not allowed. Will throw if closed. If
* on-caller? (default true) is true, and the put is immediately
* accepted, will call fn0 on calling thread.  Returns nil.
*/
cljs.core.async.put_BANG_ = (function() {
var put_BANG_ = null;
var put_BANG___2 = (function (port,val){return put_BANG_.call(null,port,val,cljs.core.async.nop);
});
var put_BANG___3 = (function (port,val,fn0){return put_BANG_.call(null,port,val,fn0,true);
});
var put_BANG___4 = (function (port,val,fn0,on_caller_QMARK_){var ret = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn0));if(cljs.core.truth_((function (){var and__17715__auto__ = ret;if(cljs.core.truth_(and__17715__auto__))
{return cljs.core.not_EQ_.call(null,fn0,cljs.core.async.nop);
} else
{return and__17715__auto__;
}
})()))
{if(cljs.core.truth_(on_caller_QMARK_))
{fn0.call(null);
} else
{cljs.core.async.impl.dispatch.run.call(null,fn0);
}
} else
{}
return null;
});
put_BANG_ = function(port,val,fn0,on_caller_QMARK_){
switch(arguments.length){
case 2:
return put_BANG___2.call(this,port,val);
case 3:
return put_BANG___3.call(this,port,val,fn0);
case 4:
return put_BANG___4.call(this,port,val,fn0,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
put_BANG_.cljs$core$IFn$_invoke$arity$2 = put_BANG___2;
put_BANG_.cljs$core$IFn$_invoke$arity$3 = put_BANG___3;
put_BANG_.cljs$core$IFn$_invoke$arity$4 = put_BANG___4;
return put_BANG_;
})()
;
cljs.core.async.close_BANG_ = (function close_BANG_(port){return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function random_array(n){var a = (new Array(n));var n__18575__auto___25854 = n;var x_25855 = 0;while(true){
if((x_25855 < n__18575__auto___25854))
{(a[x_25855] = 0);
{
var G__25856 = (x_25855 + 1);
x_25855 = G__25856;
continue;
}
} else
{}
break;
}
var i = 1;while(true){
if(cljs.core._EQ_.call(null,i,n))
{return a;
} else
{var j = cljs.core.rand_int.call(null,i);(a[i] = (a[j]));
(a[j] = i);
{
var G__25857 = (i + 1);
i = G__25857;
continue;
}
}
break;
}
});
cljs.core.async.alt_flag = (function alt_flag(){var flag = cljs.core.atom.call(null,true);if(typeof cljs.core.async.t25861 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t25861 = (function (flag,alt_flag,meta25862){
this.flag = flag;
this.alt_flag = alt_flag;
this.meta25862 = meta25862;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t25861.cljs$lang$type = true;
cljs.core.async.t25861.cljs$lang$ctorStr = "cljs.core.async/t25861";
cljs.core.async.t25861.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__18294__auto__,writer__18295__auto__,opt__18296__auto__){return cljs.core._write.call(null,writer__18295__auto__,"cljs.core.async/t25861");
});})(flag))
;
cljs.core.async.t25861.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t25861.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.deref.call(null,self__.flag);
});})(flag))
;
cljs.core.async.t25861.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.flag,null);
return true;
});})(flag))
;
cljs.core.async.t25861.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_25863){var self__ = this;
var _25863__$1 = this;return self__.meta25862;
});})(flag))
;
cljs.core.async.t25861.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_25863,meta25862__$1){var self__ = this;
var _25863__$1 = this;return (new cljs.core.async.t25861(self__.flag,self__.alt_flag,meta25862__$1));
});})(flag))
;
cljs.core.async.__GT_t25861 = ((function (flag){
return (function __GT_t25861(flag__$1,alt_flag__$1,meta25862){return (new cljs.core.async.t25861(flag__$1,alt_flag__$1,meta25862));
});})(flag))
;
}
return (new cljs.core.async.t25861(flag,alt_flag,null));
});
cljs.core.async.alt_handler = (function alt_handler(flag,cb){if(typeof cljs.core.async.t25867 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t25867 = (function (cb,flag,alt_handler,meta25868){
this.cb = cb;
this.flag = flag;
this.alt_handler = alt_handler;
this.meta25868 = meta25868;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t25867.cljs$lang$type = true;
cljs.core.async.t25867.cljs$lang$ctorStr = "cljs.core.async/t25867";
cljs.core.async.t25867.cljs$lang$ctorPrWriter = (function (this__18294__auto__,writer__18295__auto__,opt__18296__auto__){return cljs.core._write.call(null,writer__18295__auto__,"cljs.core.async/t25867");
});
cljs.core.async.t25867.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t25867.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});
cljs.core.async.t25867.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.async.impl.protocols.commit.call(null,self__.flag);
return self__.cb;
});
cljs.core.async.t25867.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_25869){var self__ = this;
var _25869__$1 = this;return self__.meta25868;
});
cljs.core.async.t25867.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_25869,meta25868__$1){var self__ = this;
var _25869__$1 = this;return (new cljs.core.async.t25867(self__.cb,self__.flag,self__.alt_handler,meta25868__$1));
});
cljs.core.async.__GT_t25867 = (function __GT_t25867(cb__$1,flag__$1,alt_handler__$1,meta25868){return (new cljs.core.async.t25867(cb__$1,flag__$1,alt_handler__$1,meta25868));
});
}
return (new cljs.core.async.t25867(cb,flag,alt_handler,null));
});
/**
* returns derefable [val port] if immediate, nil if enqueued
*/
cljs.core.async.do_alts = (function do_alts(fret,ports,opts){var flag = cljs.core.async.alt_flag.call(null);var n = cljs.core.count.call(null,ports);var idxs = cljs.core.async.random_array.call(null,n);var priority = new cljs.core.Keyword(null,"priority","priority",4143410454).cljs$core$IFn$_invoke$arity$1(opts);var ret = (function (){var i = 0;while(true){
if((i < n))
{var idx = (cljs.core.truth_(priority)?i:(idxs[i]));var port = cljs.core.nth.call(null,ports,idx);var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,0):null);var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,1);return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__25870_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__25870_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));if(cljs.core.truth_(vbox))
{return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__17727__auto__ = wport;if(cljs.core.truth_(or__17727__auto__))
{return or__17727__auto__;
} else
{return port;
}
})()], null));
} else
{{
var G__25871 = (i + 1);
i = G__25871;
continue;
}
}
} else
{return null;
}
break;
}
})();var or__17727__auto__ = ret;if(cljs.core.truth_(or__17727__auto__))
{return or__17727__auto__;
} else
{if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",2558708147)))
{var temp__4092__auto__ = (function (){var and__17715__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);if(cljs.core.truth_(and__17715__auto__))
{return cljs.core.async.impl.protocols.commit.call(null,flag);
} else
{return and__17715__auto__;
}
})();if(cljs.core.truth_(temp__4092__auto__))
{var got = temp__4092__auto__;return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",2558708147)], null));
} else
{return null;
}
} else
{return null;
}
}
});
/**
* Completes at most one of several channel operations. Must be called
* inside a (go ...) block. ports is a vector of channel endpoints, which
* can be either a channel to take from or a vector of
* [channel-to-put-to val-to-put], in any combination. Takes will be
* made as if by <!, and puts will be made as if by >!. Unless
* the :priority option is true, if more than one port operation is
* ready a non-deterministic choice will be made. If no operation is
* ready and a :default value is supplied, [default-val :default] will
* be returned, otherwise alts! will park until the first operation to
* become ready completes. Returns [val port] of the completed
* operation, where val is the value taken for takes, and nil for puts.
* 
* opts are passed as :key val ... Supported options:
* 
* :default val - the value to use if none of the operations are immediately ready
* :priority true - (default nil) when true, the operations will be tried in order.
* 
* Note: there is no guarantee that the port exps or val exprs will be
* used, nor in what order should they be, so they should not be
* depended upon for side effects.
* @param {...*} var_args
*/
cljs.core.async.alts_BANG_ = (function() { 
var alts_BANG___delegate = function (ports,p__25872){var map__25874 = p__25872;var map__25874__$1 = ((cljs.core.seq_QMARK_.call(null,map__25874))?cljs.core.apply.call(null,cljs.core.hash_map,map__25874):map__25874);var opts = map__25874__$1;if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("alts! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
};
var alts_BANG_ = function (ports,var_args){
var p__25872 = null;if (arguments.length > 1) {
  p__25872 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return alts_BANG___delegate.call(this,ports,p__25872);};
alts_BANG_.cljs$lang$maxFixedArity = 1;
alts_BANG_.cljs$lang$applyTo = (function (arglist__25875){
var ports = cljs.core.first(arglist__25875);
var p__25872 = cljs.core.rest(arglist__25875);
return alts_BANG___delegate(ports,p__25872);
});
alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = alts_BANG___delegate;
return alts_BANG_;
})()
;
/**
* Takes a function and a source channel, and returns a channel which
* contains the values produced by applying f to each value taken from
* the source channel
*/
cljs.core.async.map_LT_ = (function map_LT_(f,ch){if(typeof cljs.core.async.t25883 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t25883 = (function (ch,f,map_LT_,meta25884){
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta25884 = meta25884;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t25883.cljs$lang$type = true;
cljs.core.async.t25883.cljs$lang$ctorStr = "cljs.core.async/t25883";
cljs.core.async.t25883.cljs$lang$ctorPrWriter = (function (this__18294__auto__,writer__18295__auto__,opt__18296__auto__){return cljs.core._write.call(null,writer__18295__auto__,"cljs.core.async/t25883");
});
cljs.core.async.t25883.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t25883.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn0);
});
cljs.core.async.t25883.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t25883.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){if(typeof cljs.core.async.t25886 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t25886 = (function (fn1,_,meta25884,ch,f,map_LT_,meta25887){
this.fn1 = fn1;
this._ = _;
this.meta25884 = meta25884;
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta25887 = meta25887;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t25886.cljs$lang$type = true;
cljs.core.async.t25886.cljs$lang$ctorStr = "cljs.core.async/t25886";
cljs.core.async.t25886.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__18294__auto__,writer__18295__auto__,opt__18296__auto__){return cljs.core._write.call(null,writer__18295__auto__,"cljs.core.async/t25886");
});})(___$1))
;
cljs.core.async.t25886.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t25886.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;
cljs.core.async.t25886.prototype.cljs$core$async$impl$protocols$Handler$lock_id$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.lock_id.call(null,self__.fn1);
});})(___$1))
;
cljs.core.async.t25886.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);return ((function (f1,___$4,___$1){
return (function (p1__25876_SHARP_){return f1.call(null,(((p1__25876_SHARP_ == null))?null:self__.f.call(null,p1__25876_SHARP_)));
});
;})(f1,___$4,___$1))
});})(___$1))
;
cljs.core.async.t25886.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_25888){var self__ = this;
var _25888__$1 = this;return self__.meta25887;
});})(___$1))
;
cljs.core.async.t25886.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_25888,meta25887__$1){var self__ = this;
var _25888__$1 = this;return (new cljs.core.async.t25886(self__.fn1,self__._,self__.meta25884,self__.ch,self__.f,self__.map_LT_,meta25887__$1));
});})(___$1))
;
cljs.core.async.__GT_t25886 = ((function (___$1){
return (function __GT_t25886(fn1__$1,___$2,meta25884__$1,ch__$2,f__$2,map_LT___$2,meta25887){return (new cljs.core.async.t25886(fn1__$1,___$2,meta25884__$1,ch__$2,f__$2,map_LT___$2,meta25887));
});})(___$1))
;
}
return (new cljs.core.async.t25886(fn1,___$1,self__.meta25884,self__.ch,self__.f,self__.map_LT_,null));
})());if(cljs.core.truth_((function (){var and__17715__auto__ = ret;if(cljs.core.truth_(and__17715__auto__))
{return !((cljs.core.deref.call(null,ret) == null));
} else
{return and__17715__auto__;
}
})()))
{return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else
{return ret;
}
});
cljs.core.async.t25883.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t25883.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t25883.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_25885){var self__ = this;
var _25885__$1 = this;return self__.meta25884;
});
cljs.core.async.t25883.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_25885,meta25884__$1){var self__ = this;
var _25885__$1 = this;return (new cljs.core.async.t25883(self__.ch,self__.f,self__.map_LT_,meta25884__$1));
});
cljs.core.async.__GT_t25883 = (function __GT_t25883(ch__$1,f__$1,map_LT___$1,meta25884){return (new cljs.core.async.t25883(ch__$1,f__$1,map_LT___$1,meta25884));
});
}
return (new cljs.core.async.t25883(ch,f,map_LT_,null));
});
/**
* Takes a function and a target channel, and returns a channel which
* applies f to each value before supplying it to the target channel.
*/
cljs.core.async.map_GT_ = (function map_GT_(f,ch){if(typeof cljs.core.async.t25892 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t25892 = (function (ch,f,map_GT_,meta25893){
this.ch = ch;
this.f = f;
this.map_GT_ = map_GT_;
this.meta25893 = meta25893;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t25892.cljs$lang$type = true;
cljs.core.async.t25892.cljs$lang$ctorStr = "cljs.core.async/t25892";
cljs.core.async.t25892.cljs$lang$ctorPrWriter = (function (this__18294__auto__,writer__18295__auto__,opt__18296__auto__){return cljs.core._write.call(null,writer__18295__auto__,"cljs.core.async/t25892");
});
cljs.core.async.t25892.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t25892.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn0);
});
cljs.core.async.t25892.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t25892.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t25892.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t25892.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t25892.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_25894){var self__ = this;
var _25894__$1 = this;return self__.meta25893;
});
cljs.core.async.t25892.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_25894,meta25893__$1){var self__ = this;
var _25894__$1 = this;return (new cljs.core.async.t25892(self__.ch,self__.f,self__.map_GT_,meta25893__$1));
});
cljs.core.async.__GT_t25892 = (function __GT_t25892(ch__$1,f__$1,map_GT___$1,meta25893){return (new cljs.core.async.t25892(ch__$1,f__$1,map_GT___$1,meta25893));
});
}
return (new cljs.core.async.t25892(ch,f,map_GT_,null));
});
/**
* Takes a predicate and a target channel, and returns a channel which
* supplies only the values for which the predicate returns true to the
* target channel.
*/
cljs.core.async.filter_GT_ = (function filter_GT_(p,ch){if(typeof cljs.core.async.t25898 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t25898 = (function (ch,p,filter_GT_,meta25899){
this.ch = ch;
this.p = p;
this.filter_GT_ = filter_GT_;
this.meta25899 = meta25899;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t25898.cljs$lang$type = true;
cljs.core.async.t25898.cljs$lang$ctorStr = "cljs.core.async/t25898";
cljs.core.async.t25898.cljs$lang$ctorPrWriter = (function (this__18294__auto__,writer__18295__auto__,opt__18296__auto__){return cljs.core._write.call(null,writer__18295__auto__,"cljs.core.async/t25898");
});
cljs.core.async.t25898.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t25898.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.p.call(null,val)))
{return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn0);
} else
{return cljs.core.async.impl.channels.box.call(null,null);
}
});
cljs.core.async.t25898.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t25898.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t25898.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t25898.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t25898.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_25900){var self__ = this;
var _25900__$1 = this;return self__.meta25899;
});
cljs.core.async.t25898.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_25900,meta25899__$1){var self__ = this;
var _25900__$1 = this;return (new cljs.core.async.t25898(self__.ch,self__.p,self__.filter_GT_,meta25899__$1));
});
cljs.core.async.__GT_t25898 = (function __GT_t25898(ch__$1,p__$1,filter_GT___$1,meta25899){return (new cljs.core.async.t25898(ch__$1,p__$1,filter_GT___$1,meta25899));
});
}
return (new cljs.core.async.t25898(ch,p,filter_GT_,null));
});
/**
* Takes a predicate and a target channel, and returns a channel which
* supplies only the values for which the predicate returns false to the
* target channel.
*/
cljs.core.async.remove_GT_ = (function remove_GT_(p,ch){return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
* Takes a predicate and a source channel, and returns a channel which
* contains only the values taken from the source channel for which the
* predicate returns true. The returned channel will be unbuffered by
* default, or a buf-or-n can be supplied. The channel will close
* when the source channel closes.
*/
cljs.core.async.filter_LT_ = (function() {
var filter_LT_ = null;
var filter_LT___2 = (function (p,ch){return filter_LT_.call(null,p,ch,null);
});
var filter_LT___3 = (function (p,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__20231__auto___25983 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto___25983,out){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto___25983,out){
return (function (state_25962){var state_val_25963 = (state_25962[1]);if((state_val_25963 === 1))
{var state_25962__$1 = state_25962;var statearr_25964_25984 = state_25962__$1;(statearr_25964_25984[2] = null);
(statearr_25964_25984[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25963 === 2))
{var state_25962__$1 = state_25962;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25962__$1,4,ch);
} else
{if((state_val_25963 === 3))
{var inst_25960 = (state_25962[2]);var state_25962__$1 = state_25962;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25962__$1,inst_25960);
} else
{if((state_val_25963 === 4))
{var inst_25944 = (state_25962[7]);var inst_25944__$1 = (state_25962[2]);var inst_25945 = (inst_25944__$1 == null);var state_25962__$1 = (function (){var statearr_25965 = state_25962;(statearr_25965[7] = inst_25944__$1);
return statearr_25965;
})();if(cljs.core.truth_(inst_25945))
{var statearr_25966_25985 = state_25962__$1;(statearr_25966_25985[1] = 5);
} else
{var statearr_25967_25986 = state_25962__$1;(statearr_25967_25986[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25963 === 5))
{var inst_25947 = cljs.core.async.close_BANG_.call(null,out);var state_25962__$1 = state_25962;var statearr_25968_25987 = state_25962__$1;(statearr_25968_25987[2] = inst_25947);
(statearr_25968_25987[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25963 === 6))
{var inst_25944 = (state_25962[7]);var inst_25949 = p.call(null,inst_25944);var state_25962__$1 = state_25962;if(cljs.core.truth_(inst_25949))
{var statearr_25969_25988 = state_25962__$1;(statearr_25969_25988[1] = 8);
} else
{var statearr_25970_25989 = state_25962__$1;(statearr_25970_25989[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25963 === 7))
{var inst_25958 = (state_25962[2]);var state_25962__$1 = state_25962;var statearr_25971_25990 = state_25962__$1;(statearr_25971_25990[2] = inst_25958);
(statearr_25971_25990[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25963 === 8))
{var inst_25944 = (state_25962[7]);var state_25962__$1 = state_25962;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25962__$1,11,out,inst_25944);
} else
{if((state_val_25963 === 9))
{var state_25962__$1 = state_25962;var statearr_25972_25991 = state_25962__$1;(statearr_25972_25991[2] = null);
(statearr_25972_25991[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25963 === 10))
{var inst_25955 = (state_25962[2]);var state_25962__$1 = (function (){var statearr_25973 = state_25962;(statearr_25973[8] = inst_25955);
return statearr_25973;
})();var statearr_25974_25992 = state_25962__$1;(statearr_25974_25992[2] = null);
(statearr_25974_25992[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25963 === 11))
{var inst_25952 = (state_25962[2]);var state_25962__$1 = state_25962;var statearr_25975_25993 = state_25962__$1;(statearr_25975_25993[2] = inst_25952);
(statearr_25975_25993[1] = 10);
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
}
}
}
}
});})(c__20231__auto___25983,out))
;return ((function (switch__20216__auto__,c__20231__auto___25983,out){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_25979 = [null,null,null,null,null,null,null,null,null];(statearr_25979[0] = state_machine__20217__auto__);
(statearr_25979[1] = 1);
return statearr_25979;
});
var state_machine__20217__auto____1 = (function (state_25962){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_25962);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e25980){if((e25980 instanceof Object))
{var ex__20220__auto__ = e25980;var statearr_25981_25994 = state_25962;(statearr_25981_25994[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25962);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e25980;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__25995 = state_25962;
state_25962 = G__25995;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_25962){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_25962);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto___25983,out))
})();var state__20233__auto__ = (function (){var statearr_25982 = f__20232__auto__.call(null);(statearr_25982[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto___25983);
return statearr_25982;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto___25983,out))
);
return out;
});
filter_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return filter_LT___2.call(this,p,ch);
case 3:
return filter_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
filter_LT_.cljs$core$IFn$_invoke$arity$2 = filter_LT___2;
filter_LT_.cljs$core$IFn$_invoke$arity$3 = filter_LT___3;
return filter_LT_;
})()
;
/**
* Takes a predicate and a source channel, and returns a channel which
* contains only the values taken from the source channel for which the
* predicate returns false. The returned channel will be unbuffered by
* default, or a buf-or-n can be supplied. The channel will close
* when the source channel closes.
*/
cljs.core.async.remove_LT_ = (function() {
var remove_LT_ = null;
var remove_LT___2 = (function (p,ch){return remove_LT_.call(null,p,ch,null);
});
var remove_LT___3 = (function (p,ch,buf_or_n){return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});
remove_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return remove_LT___2.call(this,p,ch);
case 3:
return remove_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
remove_LT_.cljs$core$IFn$_invoke$arity$2 = remove_LT___2;
remove_LT_.cljs$core$IFn$_invoke$arity$3 = remove_LT___3;
return remove_LT_;
})()
;
cljs.core.async.mapcat_STAR_ = (function mapcat_STAR_(f,in$,out){var c__20231__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto__){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto__){
return (function (state_26147){var state_val_26148 = (state_26147[1]);if((state_val_26148 === 1))
{var state_26147__$1 = state_26147;var statearr_26149_26186 = state_26147__$1;(statearr_26149_26186[2] = null);
(statearr_26149_26186[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26148 === 2))
{var state_26147__$1 = state_26147;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26147__$1,4,in$);
} else
{if((state_val_26148 === 3))
{var inst_26145 = (state_26147[2]);var state_26147__$1 = state_26147;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26147__$1,inst_26145);
} else
{if((state_val_26148 === 4))
{var inst_26093 = (state_26147[7]);var inst_26093__$1 = (state_26147[2]);var inst_26094 = (inst_26093__$1 == null);var state_26147__$1 = (function (){var statearr_26150 = state_26147;(statearr_26150[7] = inst_26093__$1);
return statearr_26150;
})();if(cljs.core.truth_(inst_26094))
{var statearr_26151_26187 = state_26147__$1;(statearr_26151_26187[1] = 5);
} else
{var statearr_26152_26188 = state_26147__$1;(statearr_26152_26188[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26148 === 5))
{var inst_26096 = cljs.core.async.close_BANG_.call(null,out);var state_26147__$1 = state_26147;var statearr_26153_26189 = state_26147__$1;(statearr_26153_26189[2] = inst_26096);
(statearr_26153_26189[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26148 === 6))
{var inst_26093 = (state_26147[7]);var inst_26098 = f.call(null,inst_26093);var inst_26103 = cljs.core.seq.call(null,inst_26098);var inst_26104 = inst_26103;var inst_26105 = null;var inst_26106 = 0;var inst_26107 = 0;var state_26147__$1 = (function (){var statearr_26154 = state_26147;(statearr_26154[8] = inst_26107);
(statearr_26154[9] = inst_26106);
(statearr_26154[10] = inst_26105);
(statearr_26154[11] = inst_26104);
return statearr_26154;
})();var statearr_26155_26190 = state_26147__$1;(statearr_26155_26190[2] = null);
(statearr_26155_26190[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26148 === 7))
{var inst_26143 = (state_26147[2]);var state_26147__$1 = state_26147;var statearr_26156_26191 = state_26147__$1;(statearr_26156_26191[2] = inst_26143);
(statearr_26156_26191[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26148 === 8))
{var inst_26107 = (state_26147[8]);var inst_26106 = (state_26147[9]);var inst_26109 = (inst_26107 < inst_26106);var inst_26110 = inst_26109;var state_26147__$1 = state_26147;if(cljs.core.truth_(inst_26110))
{var statearr_26157_26192 = state_26147__$1;(statearr_26157_26192[1] = 10);
} else
{var statearr_26158_26193 = state_26147__$1;(statearr_26158_26193[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26148 === 9))
{var inst_26140 = (state_26147[2]);var state_26147__$1 = (function (){var statearr_26159 = state_26147;(statearr_26159[12] = inst_26140);
return statearr_26159;
})();var statearr_26160_26194 = state_26147__$1;(statearr_26160_26194[2] = null);
(statearr_26160_26194[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26148 === 10))
{var inst_26107 = (state_26147[8]);var inst_26105 = (state_26147[10]);var inst_26112 = cljs.core._nth.call(null,inst_26105,inst_26107);var state_26147__$1 = state_26147;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26147__$1,13,out,inst_26112);
} else
{if((state_val_26148 === 11))
{var inst_26118 = (state_26147[13]);var inst_26104 = (state_26147[11]);var inst_26118__$1 = cljs.core.seq.call(null,inst_26104);var state_26147__$1 = (function (){var statearr_26164 = state_26147;(statearr_26164[13] = inst_26118__$1);
return statearr_26164;
})();if(inst_26118__$1)
{var statearr_26165_26195 = state_26147__$1;(statearr_26165_26195[1] = 14);
} else
{var statearr_26166_26196 = state_26147__$1;(statearr_26166_26196[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26148 === 12))
{var inst_26138 = (state_26147[2]);var state_26147__$1 = state_26147;var statearr_26167_26197 = state_26147__$1;(statearr_26167_26197[2] = inst_26138);
(statearr_26167_26197[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26148 === 13))
{var inst_26107 = (state_26147[8]);var inst_26106 = (state_26147[9]);var inst_26105 = (state_26147[10]);var inst_26104 = (state_26147[11]);var inst_26114 = (state_26147[2]);var inst_26115 = (inst_26107 + 1);var tmp26161 = inst_26106;var tmp26162 = inst_26105;var tmp26163 = inst_26104;var inst_26104__$1 = tmp26163;var inst_26105__$1 = tmp26162;var inst_26106__$1 = tmp26161;var inst_26107__$1 = inst_26115;var state_26147__$1 = (function (){var statearr_26168 = state_26147;(statearr_26168[14] = inst_26114);
(statearr_26168[8] = inst_26107__$1);
(statearr_26168[9] = inst_26106__$1);
(statearr_26168[10] = inst_26105__$1);
(statearr_26168[11] = inst_26104__$1);
return statearr_26168;
})();var statearr_26169_26198 = state_26147__$1;(statearr_26169_26198[2] = null);
(statearr_26169_26198[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26148 === 14))
{var inst_26118 = (state_26147[13]);var inst_26120 = cljs.core.chunked_seq_QMARK_.call(null,inst_26118);var state_26147__$1 = state_26147;if(inst_26120)
{var statearr_26170_26199 = state_26147__$1;(statearr_26170_26199[1] = 17);
} else
{var statearr_26171_26200 = state_26147__$1;(statearr_26171_26200[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26148 === 15))
{var state_26147__$1 = state_26147;var statearr_26172_26201 = state_26147__$1;(statearr_26172_26201[2] = null);
(statearr_26172_26201[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26148 === 16))
{var inst_26136 = (state_26147[2]);var state_26147__$1 = state_26147;var statearr_26173_26202 = state_26147__$1;(statearr_26173_26202[2] = inst_26136);
(statearr_26173_26202[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26148 === 17))
{var inst_26118 = (state_26147[13]);var inst_26122 = cljs.core.chunk_first.call(null,inst_26118);var inst_26123 = cljs.core.chunk_rest.call(null,inst_26118);var inst_26124 = cljs.core.count.call(null,inst_26122);var inst_26104 = inst_26123;var inst_26105 = inst_26122;var inst_26106 = inst_26124;var inst_26107 = 0;var state_26147__$1 = (function (){var statearr_26174 = state_26147;(statearr_26174[8] = inst_26107);
(statearr_26174[9] = inst_26106);
(statearr_26174[10] = inst_26105);
(statearr_26174[11] = inst_26104);
return statearr_26174;
})();var statearr_26175_26203 = state_26147__$1;(statearr_26175_26203[2] = null);
(statearr_26175_26203[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26148 === 18))
{var inst_26118 = (state_26147[13]);var inst_26127 = cljs.core.first.call(null,inst_26118);var state_26147__$1 = state_26147;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26147__$1,20,out,inst_26127);
} else
{if((state_val_26148 === 19))
{var inst_26133 = (state_26147[2]);var state_26147__$1 = state_26147;var statearr_26176_26204 = state_26147__$1;(statearr_26176_26204[2] = inst_26133);
(statearr_26176_26204[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26148 === 20))
{var inst_26118 = (state_26147[13]);var inst_26129 = (state_26147[2]);var inst_26130 = cljs.core.next.call(null,inst_26118);var inst_26104 = inst_26130;var inst_26105 = null;var inst_26106 = 0;var inst_26107 = 0;var state_26147__$1 = (function (){var statearr_26177 = state_26147;(statearr_26177[8] = inst_26107);
(statearr_26177[9] = inst_26106);
(statearr_26177[10] = inst_26105);
(statearr_26177[11] = inst_26104);
(statearr_26177[15] = inst_26129);
return statearr_26177;
})();var statearr_26178_26205 = state_26147__$1;(statearr_26178_26205[2] = null);
(statearr_26178_26205[1] = 8);
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
});})(c__20231__auto__))
;return ((function (switch__20216__auto__,c__20231__auto__){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_26182 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_26182[0] = state_machine__20217__auto__);
(statearr_26182[1] = 1);
return statearr_26182;
});
var state_machine__20217__auto____1 = (function (state_26147){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_26147);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e26183){if((e26183 instanceof Object))
{var ex__20220__auto__ = e26183;var statearr_26184_26206 = state_26147;(statearr_26184_26206[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26147);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e26183;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__26207 = state_26147;
state_26147 = G__26207;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_26147){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_26147);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto__))
})();var state__20233__auto__ = (function (){var statearr_26185 = f__20232__auto__.call(null);(statearr_26185[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto__);
return statearr_26185;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto__))
);
return c__20231__auto__;
});
/**
* Takes a function and a source channel, and returns a channel which
* contains the values in each collection produced by applying f to
* each value taken from the source channel. f must return a
* collection.
* 
* The returned channel will be unbuffered by default, or a buf-or-n
* can be supplied. The channel will close when the source channel
* closes.
*/
cljs.core.async.mapcat_LT_ = (function() {
var mapcat_LT_ = null;
var mapcat_LT___2 = (function (f,in$){return mapcat_LT_.call(null,f,in$,null);
});
var mapcat_LT___3 = (function (f,in$,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);cljs.core.async.mapcat_STAR_.call(null,f,in$,out);
return out;
});
mapcat_LT_ = function(f,in$,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_LT___2.call(this,f,in$);
case 3:
return mapcat_LT___3.call(this,f,in$,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = mapcat_LT___2;
mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = mapcat_LT___3;
return mapcat_LT_;
})()
;
/**
* Takes a function and a target channel, and returns a channel which
* applies f to each value put, then supplies each element of the result
* to the target channel. f must return a collection.
* 
* The returned channel will be unbuffered by default, or a buf-or-n
* can be supplied. The target channel will be closed when the source
* channel closes.
*/
cljs.core.async.mapcat_GT_ = (function() {
var mapcat_GT_ = null;
var mapcat_GT___2 = (function (f,out){return mapcat_GT_.call(null,f,out,null);
});
var mapcat_GT___3 = (function (f,out,buf_or_n){var in$ = cljs.core.async.chan.call(null,buf_or_n);cljs.core.async.mapcat_STAR_.call(null,f,in$,out);
return in$;
});
mapcat_GT_ = function(f,out,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_GT___2.call(this,f,out);
case 3:
return mapcat_GT___3.call(this,f,out,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = mapcat_GT___2;
mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = mapcat_GT___3;
return mapcat_GT_;
})()
;
/**
* Takes elements from the from channel and supplies them to the to
* channel. By default, the to channel will be closed when the
* from channel closes, but can be determined by the close?
* parameter.
*/
cljs.core.async.pipe = (function() {
var pipe = null;
var pipe__2 = (function (from,to){return pipe.call(null,from,to,true);
});
var pipe__3 = (function (from,to,close_QMARK_){var c__20231__auto___26288 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto___26288){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto___26288){
return (function (state_26267){var state_val_26268 = (state_26267[1]);if((state_val_26268 === 1))
{var state_26267__$1 = state_26267;var statearr_26269_26289 = state_26267__$1;(statearr_26269_26289[2] = null);
(statearr_26269_26289[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26268 === 2))
{var state_26267__$1 = state_26267;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26267__$1,4,from);
} else
{if((state_val_26268 === 3))
{var inst_26265 = (state_26267[2]);var state_26267__$1 = state_26267;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26267__$1,inst_26265);
} else
{if((state_val_26268 === 4))
{var inst_26250 = (state_26267[7]);var inst_26250__$1 = (state_26267[2]);var inst_26251 = (inst_26250__$1 == null);var state_26267__$1 = (function (){var statearr_26270 = state_26267;(statearr_26270[7] = inst_26250__$1);
return statearr_26270;
})();if(cljs.core.truth_(inst_26251))
{var statearr_26271_26290 = state_26267__$1;(statearr_26271_26290[1] = 5);
} else
{var statearr_26272_26291 = state_26267__$1;(statearr_26272_26291[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26268 === 5))
{var state_26267__$1 = state_26267;if(cljs.core.truth_(close_QMARK_))
{var statearr_26273_26292 = state_26267__$1;(statearr_26273_26292[1] = 8);
} else
{var statearr_26274_26293 = state_26267__$1;(statearr_26274_26293[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26268 === 6))
{var inst_26250 = (state_26267[7]);var state_26267__$1 = state_26267;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26267__$1,11,to,inst_26250);
} else
{if((state_val_26268 === 7))
{var inst_26263 = (state_26267[2]);var state_26267__$1 = state_26267;var statearr_26275_26294 = state_26267__$1;(statearr_26275_26294[2] = inst_26263);
(statearr_26275_26294[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26268 === 8))
{var inst_26254 = cljs.core.async.close_BANG_.call(null,to);var state_26267__$1 = state_26267;var statearr_26276_26295 = state_26267__$1;(statearr_26276_26295[2] = inst_26254);
(statearr_26276_26295[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26268 === 9))
{var state_26267__$1 = state_26267;var statearr_26277_26296 = state_26267__$1;(statearr_26277_26296[2] = null);
(statearr_26277_26296[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26268 === 10))
{var inst_26257 = (state_26267[2]);var state_26267__$1 = state_26267;var statearr_26278_26297 = state_26267__$1;(statearr_26278_26297[2] = inst_26257);
(statearr_26278_26297[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26268 === 11))
{var inst_26260 = (state_26267[2]);var state_26267__$1 = (function (){var statearr_26279 = state_26267;(statearr_26279[8] = inst_26260);
return statearr_26279;
})();var statearr_26280_26298 = state_26267__$1;(statearr_26280_26298[2] = null);
(statearr_26280_26298[1] = 2);
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
}
}
}
}
});})(c__20231__auto___26288))
;return ((function (switch__20216__auto__,c__20231__auto___26288){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_26284 = [null,null,null,null,null,null,null,null,null];(statearr_26284[0] = state_machine__20217__auto__);
(statearr_26284[1] = 1);
return statearr_26284;
});
var state_machine__20217__auto____1 = (function (state_26267){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_26267);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e26285){if((e26285 instanceof Object))
{var ex__20220__auto__ = e26285;var statearr_26286_26299 = state_26267;(statearr_26286_26299[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26267);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e26285;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__26300 = state_26267;
state_26267 = G__26300;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_26267){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_26267);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto___26288))
})();var state__20233__auto__ = (function (){var statearr_26287 = f__20232__auto__.call(null);(statearr_26287[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto___26288);
return statearr_26287;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto___26288))
);
return to;
});
pipe = function(from,to,close_QMARK_){
switch(arguments.length){
case 2:
return pipe__2.call(this,from,to);
case 3:
return pipe__3.call(this,from,to,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pipe.cljs$core$IFn$_invoke$arity$2 = pipe__2;
pipe.cljs$core$IFn$_invoke$arity$3 = pipe__3;
return pipe;
})()
;
/**
* Takes a predicate and a source channel and returns a vector of two
* channels, the first of which will contain the values for which the
* predicate returned true, the second those for which it returned
* false.
* 
* The out channels will be unbuffered by default, or two buf-or-ns can
* be supplied. The channels will close after the source channel has
* closed.
*/
cljs.core.async.split = (function() {
var split = null;
var split__2 = (function (p,ch){return split.call(null,p,ch,null,null);
});
var split__4 = (function (p,ch,t_buf_or_n,f_buf_or_n){var tc = cljs.core.async.chan.call(null,t_buf_or_n);var fc = cljs.core.async.chan.call(null,f_buf_or_n);var c__20231__auto___26387 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto___26387,tc,fc){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto___26387,tc,fc){
return (function (state_26365){var state_val_26366 = (state_26365[1]);if((state_val_26366 === 1))
{var state_26365__$1 = state_26365;var statearr_26367_26388 = state_26365__$1;(statearr_26367_26388[2] = null);
(statearr_26367_26388[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26366 === 2))
{var state_26365__$1 = state_26365;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26365__$1,4,ch);
} else
{if((state_val_26366 === 3))
{var inst_26363 = (state_26365[2]);var state_26365__$1 = state_26365;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26365__$1,inst_26363);
} else
{if((state_val_26366 === 4))
{var inst_26346 = (state_26365[7]);var inst_26346__$1 = (state_26365[2]);var inst_26347 = (inst_26346__$1 == null);var state_26365__$1 = (function (){var statearr_26368 = state_26365;(statearr_26368[7] = inst_26346__$1);
return statearr_26368;
})();if(cljs.core.truth_(inst_26347))
{var statearr_26369_26389 = state_26365__$1;(statearr_26369_26389[1] = 5);
} else
{var statearr_26370_26390 = state_26365__$1;(statearr_26370_26390[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26366 === 5))
{var inst_26349 = cljs.core.async.close_BANG_.call(null,tc);var inst_26350 = cljs.core.async.close_BANG_.call(null,fc);var state_26365__$1 = (function (){var statearr_26371 = state_26365;(statearr_26371[8] = inst_26349);
return statearr_26371;
})();var statearr_26372_26391 = state_26365__$1;(statearr_26372_26391[2] = inst_26350);
(statearr_26372_26391[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26366 === 6))
{var inst_26346 = (state_26365[7]);var inst_26352 = p.call(null,inst_26346);var state_26365__$1 = state_26365;if(cljs.core.truth_(inst_26352))
{var statearr_26373_26392 = state_26365__$1;(statearr_26373_26392[1] = 9);
} else
{var statearr_26374_26393 = state_26365__$1;(statearr_26374_26393[1] = 10);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26366 === 7))
{var inst_26361 = (state_26365[2]);var state_26365__$1 = state_26365;var statearr_26375_26394 = state_26365__$1;(statearr_26375_26394[2] = inst_26361);
(statearr_26375_26394[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26366 === 8))
{var inst_26358 = (state_26365[2]);var state_26365__$1 = (function (){var statearr_26376 = state_26365;(statearr_26376[9] = inst_26358);
return statearr_26376;
})();var statearr_26377_26395 = state_26365__$1;(statearr_26377_26395[2] = null);
(statearr_26377_26395[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26366 === 9))
{var state_26365__$1 = state_26365;var statearr_26378_26396 = state_26365__$1;(statearr_26378_26396[2] = tc);
(statearr_26378_26396[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26366 === 10))
{var state_26365__$1 = state_26365;var statearr_26379_26397 = state_26365__$1;(statearr_26379_26397[2] = fc);
(statearr_26379_26397[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26366 === 11))
{var inst_26346 = (state_26365[7]);var inst_26356 = (state_26365[2]);var state_26365__$1 = state_26365;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26365__$1,8,inst_26356,inst_26346);
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
});})(c__20231__auto___26387,tc,fc))
;return ((function (switch__20216__auto__,c__20231__auto___26387,tc,fc){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_26383 = [null,null,null,null,null,null,null,null,null,null];(statearr_26383[0] = state_machine__20217__auto__);
(statearr_26383[1] = 1);
return statearr_26383;
});
var state_machine__20217__auto____1 = (function (state_26365){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_26365);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e26384){if((e26384 instanceof Object))
{var ex__20220__auto__ = e26384;var statearr_26385_26398 = state_26365;(statearr_26385_26398[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26365);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e26384;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__26399 = state_26365;
state_26365 = G__26399;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_26365){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_26365);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto___26387,tc,fc))
})();var state__20233__auto__ = (function (){var statearr_26386 = f__20232__auto__.call(null);(statearr_26386[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto___26387);
return statearr_26386;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto___26387,tc,fc))
);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});
split = function(p,ch,t_buf_or_n,f_buf_or_n){
switch(arguments.length){
case 2:
return split__2.call(this,p,ch);
case 4:
return split__4.call(this,p,ch,t_buf_or_n,f_buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
split.cljs$core$IFn$_invoke$arity$2 = split__2;
split.cljs$core$IFn$_invoke$arity$4 = split__4;
return split;
})()
;
/**
* f should be a function of 2 arguments. Returns a channel containing
* the single result of applying f to init and the first item from the
* channel, then applying f to that result and the 2nd item, etc. If
* the channel closes without yielding items, returns init and f is not
* called. ch must close before reduce produces a result.
*/
cljs.core.async.reduce = (function reduce(f,init,ch){var c__20231__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto__){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto__){
return (function (state_26446){var state_val_26447 = (state_26446[1]);if((state_val_26447 === 7))
{var inst_26442 = (state_26446[2]);var state_26446__$1 = state_26446;var statearr_26448_26464 = state_26446__$1;(statearr_26448_26464[2] = inst_26442);
(statearr_26448_26464[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26447 === 6))
{var inst_26435 = (state_26446[7]);var inst_26432 = (state_26446[8]);var inst_26439 = f.call(null,inst_26432,inst_26435);var inst_26432__$1 = inst_26439;var state_26446__$1 = (function (){var statearr_26449 = state_26446;(statearr_26449[8] = inst_26432__$1);
return statearr_26449;
})();var statearr_26450_26465 = state_26446__$1;(statearr_26450_26465[2] = null);
(statearr_26450_26465[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26447 === 5))
{var inst_26432 = (state_26446[8]);var state_26446__$1 = state_26446;var statearr_26451_26466 = state_26446__$1;(statearr_26451_26466[2] = inst_26432);
(statearr_26451_26466[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26447 === 4))
{var inst_26435 = (state_26446[7]);var inst_26435__$1 = (state_26446[2]);var inst_26436 = (inst_26435__$1 == null);var state_26446__$1 = (function (){var statearr_26452 = state_26446;(statearr_26452[7] = inst_26435__$1);
return statearr_26452;
})();if(cljs.core.truth_(inst_26436))
{var statearr_26453_26467 = state_26446__$1;(statearr_26453_26467[1] = 5);
} else
{var statearr_26454_26468 = state_26446__$1;(statearr_26454_26468[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26447 === 3))
{var inst_26444 = (state_26446[2]);var state_26446__$1 = state_26446;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26446__$1,inst_26444);
} else
{if((state_val_26447 === 2))
{var state_26446__$1 = state_26446;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26446__$1,4,ch);
} else
{if((state_val_26447 === 1))
{var inst_26432 = init;var state_26446__$1 = (function (){var statearr_26455 = state_26446;(statearr_26455[8] = inst_26432);
return statearr_26455;
})();var statearr_26456_26469 = state_26446__$1;(statearr_26456_26469[2] = null);
(statearr_26456_26469[1] = 2);
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
});})(c__20231__auto__))
;return ((function (switch__20216__auto__,c__20231__auto__){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_26460 = [null,null,null,null,null,null,null,null,null];(statearr_26460[0] = state_machine__20217__auto__);
(statearr_26460[1] = 1);
return statearr_26460;
});
var state_machine__20217__auto____1 = (function (state_26446){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_26446);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e26461){if((e26461 instanceof Object))
{var ex__20220__auto__ = e26461;var statearr_26462_26470 = state_26446;(statearr_26462_26470[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26446);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e26461;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__26471 = state_26446;
state_26446 = G__26471;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_26446){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_26446);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto__))
})();var state__20233__auto__ = (function (){var statearr_26463 = f__20232__auto__.call(null);(statearr_26463[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto__);
return statearr_26463;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto__))
);
return c__20231__auto__;
});
/**
* Puts the contents of coll into the supplied channel.
* 
* By default the channel will be closed after the items are copied,
* but can be determined by the close? parameter.
* 
* Returns a channel which will close after the items are copied.
*/
cljs.core.async.onto_chan = (function() {
var onto_chan = null;
var onto_chan__2 = (function (ch,coll){return onto_chan.call(null,ch,coll,true);
});
var onto_chan__3 = (function (ch,coll,close_QMARK_){var c__20231__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto__){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto__){
return (function (state_26533){var state_val_26534 = (state_26533[1]);if((state_val_26534 === 1))
{var inst_26513 = cljs.core.seq.call(null,coll);var inst_26514 = inst_26513;var state_26533__$1 = (function (){var statearr_26535 = state_26533;(statearr_26535[7] = inst_26514);
return statearr_26535;
})();var statearr_26536_26554 = state_26533__$1;(statearr_26536_26554[2] = null);
(statearr_26536_26554[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26534 === 2))
{var inst_26514 = (state_26533[7]);var state_26533__$1 = state_26533;if(cljs.core.truth_(inst_26514))
{var statearr_26537_26555 = state_26533__$1;(statearr_26537_26555[1] = 4);
} else
{var statearr_26538_26556 = state_26533__$1;(statearr_26538_26556[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26534 === 3))
{var inst_26531 = (state_26533[2]);var state_26533__$1 = state_26533;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26533__$1,inst_26531);
} else
{if((state_val_26534 === 4))
{var inst_26514 = (state_26533[7]);var inst_26517 = cljs.core.first.call(null,inst_26514);var state_26533__$1 = state_26533;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26533__$1,7,ch,inst_26517);
} else
{if((state_val_26534 === 5))
{var state_26533__$1 = state_26533;if(cljs.core.truth_(close_QMARK_))
{var statearr_26539_26557 = state_26533__$1;(statearr_26539_26557[1] = 8);
} else
{var statearr_26540_26558 = state_26533__$1;(statearr_26540_26558[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26534 === 6))
{var inst_26529 = (state_26533[2]);var state_26533__$1 = state_26533;var statearr_26541_26559 = state_26533__$1;(statearr_26541_26559[2] = inst_26529);
(statearr_26541_26559[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26534 === 7))
{var inst_26514 = (state_26533[7]);var inst_26519 = (state_26533[2]);var inst_26520 = cljs.core.next.call(null,inst_26514);var inst_26514__$1 = inst_26520;var state_26533__$1 = (function (){var statearr_26542 = state_26533;(statearr_26542[8] = inst_26519);
(statearr_26542[7] = inst_26514__$1);
return statearr_26542;
})();var statearr_26543_26560 = state_26533__$1;(statearr_26543_26560[2] = null);
(statearr_26543_26560[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26534 === 8))
{var inst_26524 = cljs.core.async.close_BANG_.call(null,ch);var state_26533__$1 = state_26533;var statearr_26544_26561 = state_26533__$1;(statearr_26544_26561[2] = inst_26524);
(statearr_26544_26561[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26534 === 9))
{var state_26533__$1 = state_26533;var statearr_26545_26562 = state_26533__$1;(statearr_26545_26562[2] = null);
(statearr_26545_26562[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26534 === 10))
{var inst_26527 = (state_26533[2]);var state_26533__$1 = state_26533;var statearr_26546_26563 = state_26533__$1;(statearr_26546_26563[2] = inst_26527);
(statearr_26546_26563[1] = 6);
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
}
}
}
});})(c__20231__auto__))
;return ((function (switch__20216__auto__,c__20231__auto__){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_26550 = [null,null,null,null,null,null,null,null,null];(statearr_26550[0] = state_machine__20217__auto__);
(statearr_26550[1] = 1);
return statearr_26550;
});
var state_machine__20217__auto____1 = (function (state_26533){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_26533);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e26551){if((e26551 instanceof Object))
{var ex__20220__auto__ = e26551;var statearr_26552_26564 = state_26533;(statearr_26552_26564[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26533);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e26551;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__26565 = state_26533;
state_26533 = G__26565;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_26533){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_26533);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto__))
})();var state__20233__auto__ = (function (){var statearr_26553 = f__20232__auto__.call(null);(statearr_26553[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto__);
return statearr_26553;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto__))
);
return c__20231__auto__;
});
onto_chan = function(ch,coll,close_QMARK_){
switch(arguments.length){
case 2:
return onto_chan__2.call(this,ch,coll);
case 3:
return onto_chan__3.call(this,ch,coll,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
onto_chan.cljs$core$IFn$_invoke$arity$2 = onto_chan__2;
onto_chan.cljs$core$IFn$_invoke$arity$3 = onto_chan__3;
return onto_chan;
})()
;
/**
* Creates and returns a channel which contains the contents of coll,
* closing when exhausted.
*/
cljs.core.async.to_chan = (function to_chan(coll){var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,100,coll));cljs.core.async.onto_chan.call(null,ch,coll);
return ch;
});
cljs.core.async.Mux = (function (){var obj26567 = {};return obj26567;
})();
cljs.core.async.muxch_STAR_ = (function muxch_STAR_(_){if((function (){var and__17715__auto__ = _;if(and__17715__auto__)
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1;
} else
{return and__17715__auto__;
}
})())
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else
{var x__18354__auto__ = (((_ == null))?null:_);return (function (){var or__17727__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
})().call(null,_);
}
});
cljs.core.async.Mult = (function (){var obj26569 = {};return obj26569;
})();
cljs.core.async.tap_STAR_ = (function tap_STAR_(m,ch,close_QMARK_){if((function (){var and__17715__auto__ = m;if(and__17715__auto__)
{return m.cljs$core$async$Mult$tap_STAR_$arity$3;
} else
{return and__17715__auto__;
}
})())
{return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else
{var x__18354__auto__ = (((m == null))?null:m);return (function (){var or__17727__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (cljs.core.async.tap_STAR_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
})().call(null,m,ch,close_QMARK_);
}
});
cljs.core.async.untap_STAR_ = (function untap_STAR_(m,ch){if((function (){var and__17715__auto__ = m;if(and__17715__auto__)
{return m.cljs$core$async$Mult$untap_STAR_$arity$2;
} else
{return and__17715__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else
{var x__18354__auto__ = (((m == null))?null:m);return (function (){var or__17727__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (cljs.core.async.untap_STAR_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.untap_all_STAR_ = (function untap_all_STAR_(m){if((function (){var and__17715__auto__ = m;if(and__17715__auto__)
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1;
} else
{return and__17715__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else
{var x__18354__auto__ = (((m == null))?null:m);return (function (){var or__17727__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
})().call(null,m);
}
});
/**
* Creates and returns a mult(iple) of the supplied channel. Channels
* containing copies of the channel can be created with 'tap', and
* detached with 'untap'.
* 
* Each item is distributed to all taps in parallel and synchronously,
* i.e. each tap must accept before the next item is distributed. Use
* buffering/windowing to prevent slow taps from holding up the mult.
* 
* Items received when there are no taps get dropped.
* 
* If a tap put throws an exception, it will be removed from the mult.
*/
cljs.core.async.mult = (function mult(ch){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var m = (function (){if(typeof cljs.core.async.t26793 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t26793 = (function (cs,ch,mult,meta26794){
this.cs = cs;
this.ch = ch;
this.mult = mult;
this.meta26794 = meta26794;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t26793.cljs$lang$type = true;
cljs.core.async.t26793.cljs$lang$ctorStr = "cljs.core.async/t26793";
cljs.core.async.t26793.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__18294__auto__,writer__18295__auto__,opt__18296__auto__){return cljs.core._write.call(null,writer__18295__auto__,"cljs.core.async/t26793");
});})(cs))
;
cljs.core.async.t26793.prototype.cljs$core$async$Mult$ = true;
cljs.core.async.t26793.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$2,close_QMARK_){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$2,close_QMARK_);
return null;
});})(cs))
;
cljs.core.async.t26793.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$2){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$2);
return null;
});})(cs))
;
cljs.core.async.t26793.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return null;
});})(cs))
;
cljs.core.async.t26793.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t26793.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(cs))
;
cljs.core.async.t26793.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_26795){var self__ = this;
var _26795__$1 = this;return self__.meta26794;
});})(cs))
;
cljs.core.async.t26793.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_26795,meta26794__$1){var self__ = this;
var _26795__$1 = this;return (new cljs.core.async.t26793(self__.cs,self__.ch,self__.mult,meta26794__$1));
});})(cs))
;
cljs.core.async.__GT_t26793 = ((function (cs){
return (function __GT_t26793(cs__$1,ch__$1,mult__$1,meta26794){return (new cljs.core.async.t26793(cs__$1,ch__$1,mult__$1,meta26794));
});})(cs))
;
}
return (new cljs.core.async.t26793(cs,ch,mult,null));
})();var dchan = cljs.core.async.chan.call(null,1);var dctr = cljs.core.atom.call(null,null);var done = ((function (cs,m,dchan,dctr){
return (function (){if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === 0))
{return cljs.core.async.put_BANG_.call(null,dchan,true);
} else
{return null;
}
});})(cs,m,dchan,dctr))
;var c__20231__auto___27016 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto___27016,cs,m,dchan,dctr,done){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto___27016,cs,m,dchan,dctr,done){
return (function (state_26930){var state_val_26931 = (state_26930[1]);if((state_val_26931 === 32))
{var inst_26798 = (state_26930[7]);var inst_26874 = (state_26930[8]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_26930,31,Object,null,30);var inst_26881 = cljs.core.async.put_BANG_.call(null,inst_26874,inst_26798,done);var state_26930__$1 = state_26930;var statearr_26932_27017 = state_26930__$1;(statearr_26932_27017[2] = inst_26881);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26930__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 1))
{var state_26930__$1 = state_26930;var statearr_26933_27018 = state_26930__$1;(statearr_26933_27018[2] = null);
(statearr_26933_27018[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 33))
{var inst_26887 = (state_26930[9]);var inst_26889 = cljs.core.chunked_seq_QMARK_.call(null,inst_26887);var state_26930__$1 = state_26930;if(inst_26889)
{var statearr_26934_27019 = state_26930__$1;(statearr_26934_27019[1] = 36);
} else
{var statearr_26935_27020 = state_26930__$1;(statearr_26935_27020[1] = 37);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 2))
{var state_26930__$1 = state_26930;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26930__$1,4,ch);
} else
{if((state_val_26931 === 34))
{var state_26930__$1 = state_26930;var statearr_26936_27021 = state_26930__$1;(statearr_26936_27021[2] = null);
(statearr_26936_27021[1] = 35);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 3))
{var inst_26928 = (state_26930[2]);var state_26930__$1 = state_26930;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26930__$1,inst_26928);
} else
{if((state_val_26931 === 35))
{var inst_26912 = (state_26930[2]);var state_26930__$1 = state_26930;var statearr_26937_27022 = state_26930__$1;(statearr_26937_27022[2] = inst_26912);
(statearr_26937_27022[1] = 29);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 4))
{var inst_26798 = (state_26930[7]);var inst_26798__$1 = (state_26930[2]);var inst_26799 = (inst_26798__$1 == null);var state_26930__$1 = (function (){var statearr_26938 = state_26930;(statearr_26938[7] = inst_26798__$1);
return statearr_26938;
})();if(cljs.core.truth_(inst_26799))
{var statearr_26939_27023 = state_26930__$1;(statearr_26939_27023[1] = 5);
} else
{var statearr_26940_27024 = state_26930__$1;(statearr_26940_27024[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 36))
{var inst_26887 = (state_26930[9]);var inst_26891 = cljs.core.chunk_first.call(null,inst_26887);var inst_26892 = cljs.core.chunk_rest.call(null,inst_26887);var inst_26893 = cljs.core.count.call(null,inst_26891);var inst_26866 = inst_26892;var inst_26867 = inst_26891;var inst_26868 = inst_26893;var inst_26869 = 0;var state_26930__$1 = (function (){var statearr_26941 = state_26930;(statearr_26941[10] = inst_26867);
(statearr_26941[11] = inst_26868);
(statearr_26941[12] = inst_26869);
(statearr_26941[13] = inst_26866);
return statearr_26941;
})();var statearr_26942_27025 = state_26930__$1;(statearr_26942_27025[2] = null);
(statearr_26942_27025[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 5))
{var inst_26805 = cljs.core.deref.call(null,cs);var inst_26806 = cljs.core.seq.call(null,inst_26805);var inst_26807 = inst_26806;var inst_26808 = null;var inst_26809 = 0;var inst_26810 = 0;var state_26930__$1 = (function (){var statearr_26943 = state_26930;(statearr_26943[14] = inst_26808);
(statearr_26943[15] = inst_26807);
(statearr_26943[16] = inst_26809);
(statearr_26943[17] = inst_26810);
return statearr_26943;
})();var statearr_26944_27026 = state_26930__$1;(statearr_26944_27026[2] = null);
(statearr_26944_27026[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 37))
{var inst_26887 = (state_26930[9]);var inst_26896 = cljs.core.first.call(null,inst_26887);var state_26930__$1 = (function (){var statearr_26945 = state_26930;(statearr_26945[18] = inst_26896);
return statearr_26945;
})();var statearr_26946_27027 = state_26930__$1;(statearr_26946_27027[2] = null);
(statearr_26946_27027[1] = 41);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 6))
{var inst_26858 = (state_26930[19]);var inst_26857 = cljs.core.deref.call(null,cs);var inst_26858__$1 = cljs.core.keys.call(null,inst_26857);var inst_26859 = cljs.core.count.call(null,inst_26858__$1);var inst_26860 = cljs.core.reset_BANG_.call(null,dctr,inst_26859);var inst_26865 = cljs.core.seq.call(null,inst_26858__$1);var inst_26866 = inst_26865;var inst_26867 = null;var inst_26868 = 0;var inst_26869 = 0;var state_26930__$1 = (function (){var statearr_26947 = state_26930;(statearr_26947[20] = inst_26860);
(statearr_26947[10] = inst_26867);
(statearr_26947[11] = inst_26868);
(statearr_26947[12] = inst_26869);
(statearr_26947[13] = inst_26866);
(statearr_26947[19] = inst_26858__$1);
return statearr_26947;
})();var statearr_26948_27028 = state_26930__$1;(statearr_26948_27028[2] = null);
(statearr_26948_27028[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 38))
{var inst_26909 = (state_26930[2]);var state_26930__$1 = state_26930;var statearr_26949_27029 = state_26930__$1;(statearr_26949_27029[2] = inst_26909);
(statearr_26949_27029[1] = 35);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 7))
{var inst_26926 = (state_26930[2]);var state_26930__$1 = state_26930;var statearr_26950_27030 = state_26930__$1;(statearr_26950_27030[2] = inst_26926);
(statearr_26950_27030[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 39))
{var inst_26887 = (state_26930[9]);var inst_26905 = (state_26930[2]);var inst_26906 = cljs.core.next.call(null,inst_26887);var inst_26866 = inst_26906;var inst_26867 = null;var inst_26868 = 0;var inst_26869 = 0;var state_26930__$1 = (function (){var statearr_26951 = state_26930;(statearr_26951[10] = inst_26867);
(statearr_26951[11] = inst_26868);
(statearr_26951[12] = inst_26869);
(statearr_26951[13] = inst_26866);
(statearr_26951[21] = inst_26905);
return statearr_26951;
})();var statearr_26952_27031 = state_26930__$1;(statearr_26952_27031[2] = null);
(statearr_26952_27031[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 8))
{var inst_26809 = (state_26930[16]);var inst_26810 = (state_26930[17]);var inst_26812 = (inst_26810 < inst_26809);var inst_26813 = inst_26812;var state_26930__$1 = state_26930;if(cljs.core.truth_(inst_26813))
{var statearr_26953_27032 = state_26930__$1;(statearr_26953_27032[1] = 10);
} else
{var statearr_26954_27033 = state_26930__$1;(statearr_26954_27033[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 40))
{var inst_26896 = (state_26930[18]);var inst_26897 = (state_26930[2]);var inst_26898 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var inst_26899 = cljs.core.async.untap_STAR_.call(null,m,inst_26896);var state_26930__$1 = (function (){var statearr_26955 = state_26930;(statearr_26955[22] = inst_26898);
(statearr_26955[23] = inst_26897);
return statearr_26955;
})();var statearr_26956_27034 = state_26930__$1;(statearr_26956_27034[2] = inst_26899);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26930__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 9))
{var inst_26855 = (state_26930[2]);var state_26930__$1 = state_26930;var statearr_26957_27035 = state_26930__$1;(statearr_26957_27035[2] = inst_26855);
(statearr_26957_27035[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 41))
{var inst_26798 = (state_26930[7]);var inst_26896 = (state_26930[18]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_26930,40,Object,null,39);var inst_26903 = cljs.core.async.put_BANG_.call(null,inst_26896,inst_26798,done);var state_26930__$1 = state_26930;var statearr_26958_27036 = state_26930__$1;(statearr_26958_27036[2] = inst_26903);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26930__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 10))
{var inst_26808 = (state_26930[14]);var inst_26810 = (state_26930[17]);var inst_26816 = cljs.core._nth.call(null,inst_26808,inst_26810);var inst_26817 = cljs.core.nth.call(null,inst_26816,0,null);var inst_26818 = cljs.core.nth.call(null,inst_26816,1,null);var state_26930__$1 = (function (){var statearr_26959 = state_26930;(statearr_26959[24] = inst_26817);
return statearr_26959;
})();if(cljs.core.truth_(inst_26818))
{var statearr_26960_27037 = state_26930__$1;(statearr_26960_27037[1] = 13);
} else
{var statearr_26961_27038 = state_26930__$1;(statearr_26961_27038[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 42))
{var state_26930__$1 = state_26930;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26930__$1,45,dchan);
} else
{if((state_val_26931 === 11))
{var inst_26807 = (state_26930[15]);var inst_26827 = (state_26930[25]);var inst_26827__$1 = cljs.core.seq.call(null,inst_26807);var state_26930__$1 = (function (){var statearr_26962 = state_26930;(statearr_26962[25] = inst_26827__$1);
return statearr_26962;
})();if(inst_26827__$1)
{var statearr_26963_27039 = state_26930__$1;(statearr_26963_27039[1] = 16);
} else
{var statearr_26964_27040 = state_26930__$1;(statearr_26964_27040[1] = 17);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 43))
{var state_26930__$1 = state_26930;var statearr_26965_27041 = state_26930__$1;(statearr_26965_27041[2] = null);
(statearr_26965_27041[1] = 44);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 12))
{var inst_26853 = (state_26930[2]);var state_26930__$1 = state_26930;var statearr_26966_27042 = state_26930__$1;(statearr_26966_27042[2] = inst_26853);
(statearr_26966_27042[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 44))
{var inst_26923 = (state_26930[2]);var state_26930__$1 = (function (){var statearr_26967 = state_26930;(statearr_26967[26] = inst_26923);
return statearr_26967;
})();var statearr_26968_27043 = state_26930__$1;(statearr_26968_27043[2] = null);
(statearr_26968_27043[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 13))
{var inst_26817 = (state_26930[24]);var inst_26820 = cljs.core.async.close_BANG_.call(null,inst_26817);var state_26930__$1 = state_26930;var statearr_26969_27044 = state_26930__$1;(statearr_26969_27044[2] = inst_26820);
(statearr_26969_27044[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 45))
{var inst_26920 = (state_26930[2]);var state_26930__$1 = state_26930;var statearr_26973_27045 = state_26930__$1;(statearr_26973_27045[2] = inst_26920);
(statearr_26973_27045[1] = 44);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 14))
{var state_26930__$1 = state_26930;var statearr_26974_27046 = state_26930__$1;(statearr_26974_27046[2] = null);
(statearr_26974_27046[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 15))
{var inst_26808 = (state_26930[14]);var inst_26807 = (state_26930[15]);var inst_26809 = (state_26930[16]);var inst_26810 = (state_26930[17]);var inst_26823 = (state_26930[2]);var inst_26824 = (inst_26810 + 1);var tmp26970 = inst_26808;var tmp26971 = inst_26807;var tmp26972 = inst_26809;var inst_26807__$1 = tmp26971;var inst_26808__$1 = tmp26970;var inst_26809__$1 = tmp26972;var inst_26810__$1 = inst_26824;var state_26930__$1 = (function (){var statearr_26975 = state_26930;(statearr_26975[27] = inst_26823);
(statearr_26975[14] = inst_26808__$1);
(statearr_26975[15] = inst_26807__$1);
(statearr_26975[16] = inst_26809__$1);
(statearr_26975[17] = inst_26810__$1);
return statearr_26975;
})();var statearr_26976_27047 = state_26930__$1;(statearr_26976_27047[2] = null);
(statearr_26976_27047[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 16))
{var inst_26827 = (state_26930[25]);var inst_26829 = cljs.core.chunked_seq_QMARK_.call(null,inst_26827);var state_26930__$1 = state_26930;if(inst_26829)
{var statearr_26977_27048 = state_26930__$1;(statearr_26977_27048[1] = 19);
} else
{var statearr_26978_27049 = state_26930__$1;(statearr_26978_27049[1] = 20);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 17))
{var state_26930__$1 = state_26930;var statearr_26979_27050 = state_26930__$1;(statearr_26979_27050[2] = null);
(statearr_26979_27050[1] = 18);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 18))
{var inst_26851 = (state_26930[2]);var state_26930__$1 = state_26930;var statearr_26980_27051 = state_26930__$1;(statearr_26980_27051[2] = inst_26851);
(statearr_26980_27051[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 19))
{var inst_26827 = (state_26930[25]);var inst_26831 = cljs.core.chunk_first.call(null,inst_26827);var inst_26832 = cljs.core.chunk_rest.call(null,inst_26827);var inst_26833 = cljs.core.count.call(null,inst_26831);var inst_26807 = inst_26832;var inst_26808 = inst_26831;var inst_26809 = inst_26833;var inst_26810 = 0;var state_26930__$1 = (function (){var statearr_26981 = state_26930;(statearr_26981[14] = inst_26808);
(statearr_26981[15] = inst_26807);
(statearr_26981[16] = inst_26809);
(statearr_26981[17] = inst_26810);
return statearr_26981;
})();var statearr_26982_27052 = state_26930__$1;(statearr_26982_27052[2] = null);
(statearr_26982_27052[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 20))
{var inst_26827 = (state_26930[25]);var inst_26837 = cljs.core.first.call(null,inst_26827);var inst_26838 = cljs.core.nth.call(null,inst_26837,0,null);var inst_26839 = cljs.core.nth.call(null,inst_26837,1,null);var state_26930__$1 = (function (){var statearr_26983 = state_26930;(statearr_26983[28] = inst_26838);
return statearr_26983;
})();if(cljs.core.truth_(inst_26839))
{var statearr_26984_27053 = state_26930__$1;(statearr_26984_27053[1] = 22);
} else
{var statearr_26985_27054 = state_26930__$1;(statearr_26985_27054[1] = 23);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 21))
{var inst_26848 = (state_26930[2]);var state_26930__$1 = state_26930;var statearr_26986_27055 = state_26930__$1;(statearr_26986_27055[2] = inst_26848);
(statearr_26986_27055[1] = 18);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 22))
{var inst_26838 = (state_26930[28]);var inst_26841 = cljs.core.async.close_BANG_.call(null,inst_26838);var state_26930__$1 = state_26930;var statearr_26987_27056 = state_26930__$1;(statearr_26987_27056[2] = inst_26841);
(statearr_26987_27056[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 23))
{var state_26930__$1 = state_26930;var statearr_26988_27057 = state_26930__$1;(statearr_26988_27057[2] = null);
(statearr_26988_27057[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 24))
{var inst_26827 = (state_26930[25]);var inst_26844 = (state_26930[2]);var inst_26845 = cljs.core.next.call(null,inst_26827);var inst_26807 = inst_26845;var inst_26808 = null;var inst_26809 = 0;var inst_26810 = 0;var state_26930__$1 = (function (){var statearr_26989 = state_26930;(statearr_26989[14] = inst_26808);
(statearr_26989[15] = inst_26807);
(statearr_26989[16] = inst_26809);
(statearr_26989[17] = inst_26810);
(statearr_26989[29] = inst_26844);
return statearr_26989;
})();var statearr_26990_27058 = state_26930__$1;(statearr_26990_27058[2] = null);
(statearr_26990_27058[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 25))
{var inst_26868 = (state_26930[11]);var inst_26869 = (state_26930[12]);var inst_26871 = (inst_26869 < inst_26868);var inst_26872 = inst_26871;var state_26930__$1 = state_26930;if(cljs.core.truth_(inst_26872))
{var statearr_26991_27059 = state_26930__$1;(statearr_26991_27059[1] = 27);
} else
{var statearr_26992_27060 = state_26930__$1;(statearr_26992_27060[1] = 28);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 26))
{var inst_26858 = (state_26930[19]);var inst_26916 = (state_26930[2]);var inst_26917 = cljs.core.seq.call(null,inst_26858);var state_26930__$1 = (function (){var statearr_26993 = state_26930;(statearr_26993[30] = inst_26916);
return statearr_26993;
})();if(inst_26917)
{var statearr_26994_27061 = state_26930__$1;(statearr_26994_27061[1] = 42);
} else
{var statearr_26995_27062 = state_26930__$1;(statearr_26995_27062[1] = 43);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 27))
{var inst_26867 = (state_26930[10]);var inst_26869 = (state_26930[12]);var inst_26874 = cljs.core._nth.call(null,inst_26867,inst_26869);var state_26930__$1 = (function (){var statearr_26996 = state_26930;(statearr_26996[8] = inst_26874);
return statearr_26996;
})();var statearr_26997_27063 = state_26930__$1;(statearr_26997_27063[2] = null);
(statearr_26997_27063[1] = 32);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 28))
{var inst_26866 = (state_26930[13]);var inst_26887 = (state_26930[9]);var inst_26887__$1 = cljs.core.seq.call(null,inst_26866);var state_26930__$1 = (function (){var statearr_27001 = state_26930;(statearr_27001[9] = inst_26887__$1);
return statearr_27001;
})();if(inst_26887__$1)
{var statearr_27002_27064 = state_26930__$1;(statearr_27002_27064[1] = 33);
} else
{var statearr_27003_27065 = state_26930__$1;(statearr_27003_27065[1] = 34);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 29))
{var inst_26914 = (state_26930[2]);var state_26930__$1 = state_26930;var statearr_27004_27066 = state_26930__$1;(statearr_27004_27066[2] = inst_26914);
(statearr_27004_27066[1] = 26);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 30))
{var inst_26867 = (state_26930[10]);var inst_26868 = (state_26930[11]);var inst_26869 = (state_26930[12]);var inst_26866 = (state_26930[13]);var inst_26883 = (state_26930[2]);var inst_26884 = (inst_26869 + 1);var tmp26998 = inst_26867;var tmp26999 = inst_26868;var tmp27000 = inst_26866;var inst_26866__$1 = tmp27000;var inst_26867__$1 = tmp26998;var inst_26868__$1 = tmp26999;var inst_26869__$1 = inst_26884;var state_26930__$1 = (function (){var statearr_27005 = state_26930;(statearr_27005[10] = inst_26867__$1);
(statearr_27005[11] = inst_26868__$1);
(statearr_27005[12] = inst_26869__$1);
(statearr_27005[13] = inst_26866__$1);
(statearr_27005[31] = inst_26883);
return statearr_27005;
})();var statearr_27006_27067 = state_26930__$1;(statearr_27006_27067[2] = null);
(statearr_27006_27067[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_26931 === 31))
{var inst_26874 = (state_26930[8]);var inst_26875 = (state_26930[2]);var inst_26876 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var inst_26877 = cljs.core.async.untap_STAR_.call(null,m,inst_26874);var state_26930__$1 = (function (){var statearr_27007 = state_26930;(statearr_27007[32] = inst_26876);
(statearr_27007[33] = inst_26875);
return statearr_27007;
})();var statearr_27008_27068 = state_26930__$1;(statearr_27008_27068[2] = inst_26877);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26930__$1);
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
}
}
}
}
});})(c__20231__auto___27016,cs,m,dchan,dctr,done))
;return ((function (switch__20216__auto__,c__20231__auto___27016,cs,m,dchan,dctr,done){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_27012 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_27012[0] = state_machine__20217__auto__);
(statearr_27012[1] = 1);
return statearr_27012;
});
var state_machine__20217__auto____1 = (function (state_26930){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_26930);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e27013){if((e27013 instanceof Object))
{var ex__20220__auto__ = e27013;var statearr_27014_27069 = state_26930;(statearr_27014_27069[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26930);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e27013;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__27070 = state_26930;
state_26930 = G__27070;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_26930){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_26930);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto___27016,cs,m,dchan,dctr,done))
})();var state__20233__auto__ = (function (){var statearr_27015 = f__20232__auto__.call(null);(statearr_27015[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto___27016);
return statearr_27015;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto___27016,cs,m,dchan,dctr,done))
);
return m;
});
/**
* Copies the mult source onto the supplied channel.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.tap = (function() {
var tap = null;
var tap__2 = (function (mult,ch){return tap.call(null,mult,ch,true);
});
var tap__3 = (function (mult,ch,close_QMARK_){cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);
return ch;
});
tap = function(mult,ch,close_QMARK_){
switch(arguments.length){
case 2:
return tap__2.call(this,mult,ch);
case 3:
return tap__3.call(this,mult,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
tap.cljs$core$IFn$_invoke$arity$2 = tap__2;
tap.cljs$core$IFn$_invoke$arity$3 = tap__3;
return tap;
})()
;
/**
* Disconnects a target channel from a mult
*/
cljs.core.async.untap = (function untap(mult,ch){return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
* Disconnects all target channels from a mult
*/
cljs.core.async.untap_all = (function untap_all(mult){return cljs.core.async.untap_all_STAR_.call(null,mult);
});
cljs.core.async.Mix = (function (){var obj27072 = {};return obj27072;
})();
cljs.core.async.admix_STAR_ = (function admix_STAR_(m,ch){if((function (){var and__17715__auto__ = m;if(and__17715__auto__)
{return m.cljs$core$async$Mix$admix_STAR_$arity$2;
} else
{return and__17715__auto__;
}
})())
{return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else
{var x__18354__auto__ = (((m == null))?null:m);return (function (){var or__17727__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (cljs.core.async.admix_STAR_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_STAR_ = (function unmix_STAR_(m,ch){if((function (){var and__17715__auto__ = m;if(and__17715__auto__)
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2;
} else
{return and__17715__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else
{var x__18354__auto__ = (((m == null))?null:m);return (function (){var or__17727__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_all_STAR_ = (function unmix_all_STAR_(m){if((function (){var and__17715__auto__ = m;if(and__17715__auto__)
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1;
} else
{return and__17715__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else
{var x__18354__auto__ = (((m == null))?null:m);return (function (){var or__17727__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
})().call(null,m);
}
});
cljs.core.async.toggle_STAR_ = (function toggle_STAR_(m,state_map){if((function (){var and__17715__auto__ = m;if(and__17715__auto__)
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2;
} else
{return and__17715__auto__;
}
})())
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else
{var x__18354__auto__ = (((m == null))?null:m);return (function (){var or__17727__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
})().call(null,m,state_map);
}
});
cljs.core.async.solo_mode_STAR_ = (function solo_mode_STAR_(m,mode){if((function (){var and__17715__auto__ = m;if(and__17715__auto__)
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2;
} else
{return and__17715__auto__;
}
})())
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else
{var x__18354__auto__ = (((m == null))?null:m);return (function (){var or__17727__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
})().call(null,m,mode);
}
});
/**
* Creates and returns a mix of one or more input channels which will
* be put on the supplied out channel. Input sources can be added to
* the mix with 'admix', and removed with 'unmix'. A mix supports
* soloing, muting and pausing multiple inputs atomically using
* 'toggle', and can solo using either muting or pausing as determined
* by 'solo-mode'.
* 
* Each channel can have zero or more boolean modes set via 'toggle':
* 
* :solo - when true, only this (ond other soloed) channel(s) will appear
* in the mix output channel. :mute and :pause states of soloed
* channels are ignored. If solo-mode is :mute, non-soloed
* channels are muted, if :pause, non-soloed channels are
* paused.
* 
* :mute - muted channels will have their contents consumed but not included in the mix
* :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
*/
cljs.core.async.mix = (function mix(out){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",1120344424),null,new cljs.core.Keyword(null,"mute","mute",1017267595),null], null), null);var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",1017440337));var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1017267595));var change = cljs.core.async.chan.call(null);var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){if(cljs.core.truth_(attr.call(null,v)))
{return cljs.core.conj.call(null,ret,c);
} else
{return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){var chs = cljs.core.deref.call(null,cs);var mode = cljs.core.deref.call(null,solo_mode);var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",1017440337),chs);var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",1120344424),chs);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1123523302),solos,new cljs.core.Keyword(null,"mutes","mutes",1118168300),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1017267595),chs),new cljs.core.Keyword(null,"reads","reads",1122290959),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",1120344424))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;var m = (function (){if(typeof cljs.core.async.t27182 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t27182 = (function (pick,out,attrs,cs,calc_state,solo_modes,mix,changed,change,solo_mode,meta27183){
this.pick = pick;
this.out = out;
this.attrs = attrs;
this.cs = cs;
this.calc_state = calc_state;
this.solo_modes = solo_modes;
this.mix = mix;
this.changed = changed;
this.change = change;
this.solo_mode = solo_mode;
this.meta27183 = meta27183;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t27182.cljs$lang$type = true;
cljs.core.async.t27182.cljs$lang$ctorStr = "cljs.core.async/t27182";
cljs.core.async.t27182.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__18294__auto__,writer__18295__auto__,opt__18296__auto__){return cljs.core._write.call(null,writer__18295__auto__,"cljs.core.async/t27182");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t27182.prototype.cljs$core$async$Mix$ = true;
cljs.core.async.t27182.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t27182.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t27182.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t27182.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t27182.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.solo_modes.call(null,mode)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",-1162732933,null),new cljs.core.Symbol(null,"mode","mode",-1637174436,null))))].join('')));
}
cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t27182.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t27182.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t27182.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_27184){var self__ = this;
var _27184__$1 = this;return self__.meta27183;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t27182.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_27184,meta27183__$1){var self__ = this;
var _27184__$1 = this;return (new cljs.core.async.t27182(self__.pick,self__.out,self__.attrs,self__.cs,self__.calc_state,self__.solo_modes,self__.mix,self__.changed,self__.change,self__.solo_mode,meta27183__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.__GT_t27182 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function __GT_t27182(pick__$1,out__$1,attrs__$1,cs__$1,calc_state__$1,solo_modes__$1,mix__$1,changed__$1,change__$1,solo_mode__$1,meta27183){return (new cljs.core.async.t27182(pick__$1,out__$1,attrs__$1,cs__$1,calc_state__$1,solo_modes__$1,mix__$1,changed__$1,change__$1,solo_mode__$1,meta27183));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
}
return (new cljs.core.async.t27182(pick,out,attrs,cs,calc_state,solo_modes,mix,changed,change,solo_mode,null));
})();var c__20231__auto___27291 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto___27291,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto___27291,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_27249){var state_val_27250 = (state_27249[1]);if((state_val_27250 === 1))
{var inst_27188 = (state_27249[7]);var inst_27188__$1 = calc_state.call(null);var inst_27189 = cljs.core.seq_QMARK_.call(null,inst_27188__$1);var state_27249__$1 = (function (){var statearr_27251 = state_27249;(statearr_27251[7] = inst_27188__$1);
return statearr_27251;
})();if(inst_27189)
{var statearr_27252_27292 = state_27249__$1;(statearr_27252_27292[1] = 2);
} else
{var statearr_27253_27293 = state_27249__$1;(statearr_27253_27293[1] = 3);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 2))
{var inst_27188 = (state_27249[7]);var inst_27191 = cljs.core.apply.call(null,cljs.core.hash_map,inst_27188);var state_27249__$1 = state_27249;var statearr_27254_27294 = state_27249__$1;(statearr_27254_27294[2] = inst_27191);
(statearr_27254_27294[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 3))
{var inst_27188 = (state_27249[7]);var state_27249__$1 = state_27249;var statearr_27255_27295 = state_27249__$1;(statearr_27255_27295[2] = inst_27188);
(statearr_27255_27295[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 4))
{var inst_27188 = (state_27249[7]);var inst_27194 = (state_27249[2]);var inst_27195 = cljs.core.get.call(null,inst_27194,new cljs.core.Keyword(null,"reads","reads",1122290959));var inst_27196 = cljs.core.get.call(null,inst_27194,new cljs.core.Keyword(null,"mutes","mutes",1118168300));var inst_27197 = cljs.core.get.call(null,inst_27194,new cljs.core.Keyword(null,"solos","solos",1123523302));var inst_27198 = inst_27188;var state_27249__$1 = (function (){var statearr_27256 = state_27249;(statearr_27256[8] = inst_27197);
(statearr_27256[9] = inst_27196);
(statearr_27256[10] = inst_27198);
(statearr_27256[11] = inst_27195);
return statearr_27256;
})();var statearr_27257_27296 = state_27249__$1;(statearr_27257_27296[2] = null);
(statearr_27257_27296[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 5))
{var inst_27198 = (state_27249[10]);var inst_27201 = cljs.core.seq_QMARK_.call(null,inst_27198);var state_27249__$1 = state_27249;if(inst_27201)
{var statearr_27258_27297 = state_27249__$1;(statearr_27258_27297[1] = 7);
} else
{var statearr_27259_27298 = state_27249__$1;(statearr_27259_27298[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 6))
{var inst_27247 = (state_27249[2]);var state_27249__$1 = state_27249;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27249__$1,inst_27247);
} else
{if((state_val_27250 === 7))
{var inst_27198 = (state_27249[10]);var inst_27203 = cljs.core.apply.call(null,cljs.core.hash_map,inst_27198);var state_27249__$1 = state_27249;var statearr_27260_27299 = state_27249__$1;(statearr_27260_27299[2] = inst_27203);
(statearr_27260_27299[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 8))
{var inst_27198 = (state_27249[10]);var state_27249__$1 = state_27249;var statearr_27261_27300 = state_27249__$1;(statearr_27261_27300[2] = inst_27198);
(statearr_27261_27300[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 9))
{var inst_27206 = (state_27249[12]);var inst_27206__$1 = (state_27249[2]);var inst_27207 = cljs.core.get.call(null,inst_27206__$1,new cljs.core.Keyword(null,"reads","reads",1122290959));var inst_27208 = cljs.core.get.call(null,inst_27206__$1,new cljs.core.Keyword(null,"mutes","mutes",1118168300));var inst_27209 = cljs.core.get.call(null,inst_27206__$1,new cljs.core.Keyword(null,"solos","solos",1123523302));var state_27249__$1 = (function (){var statearr_27262 = state_27249;(statearr_27262[12] = inst_27206__$1);
(statearr_27262[13] = inst_27208);
(statearr_27262[14] = inst_27209);
return statearr_27262;
})();return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_27249__$1,10,inst_27207);
} else
{if((state_val_27250 === 10))
{var inst_27213 = (state_27249[15]);var inst_27214 = (state_27249[16]);var inst_27212 = (state_27249[2]);var inst_27213__$1 = cljs.core.nth.call(null,inst_27212,0,null);var inst_27214__$1 = cljs.core.nth.call(null,inst_27212,1,null);var inst_27215 = (inst_27213__$1 == null);var inst_27216 = cljs.core._EQ_.call(null,inst_27214__$1,change);var inst_27217 = (inst_27215) || (inst_27216);var state_27249__$1 = (function (){var statearr_27263 = state_27249;(statearr_27263[15] = inst_27213__$1);
(statearr_27263[16] = inst_27214__$1);
return statearr_27263;
})();if(cljs.core.truth_(inst_27217))
{var statearr_27264_27301 = state_27249__$1;(statearr_27264_27301[1] = 11);
} else
{var statearr_27265_27302 = state_27249__$1;(statearr_27265_27302[1] = 12);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 11))
{var inst_27213 = (state_27249[15]);var inst_27219 = (inst_27213 == null);var state_27249__$1 = state_27249;if(cljs.core.truth_(inst_27219))
{var statearr_27266_27303 = state_27249__$1;(statearr_27266_27303[1] = 14);
} else
{var statearr_27267_27304 = state_27249__$1;(statearr_27267_27304[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 12))
{var inst_27214 = (state_27249[16]);var inst_27228 = (state_27249[17]);var inst_27209 = (state_27249[14]);var inst_27228__$1 = inst_27209.call(null,inst_27214);var state_27249__$1 = (function (){var statearr_27268 = state_27249;(statearr_27268[17] = inst_27228__$1);
return statearr_27268;
})();if(cljs.core.truth_(inst_27228__$1))
{var statearr_27269_27305 = state_27249__$1;(statearr_27269_27305[1] = 17);
} else
{var statearr_27270_27306 = state_27249__$1;(statearr_27270_27306[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 13))
{var inst_27245 = (state_27249[2]);var state_27249__$1 = state_27249;var statearr_27271_27307 = state_27249__$1;(statearr_27271_27307[2] = inst_27245);
(statearr_27271_27307[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 14))
{var inst_27214 = (state_27249[16]);var inst_27221 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_27214);var state_27249__$1 = state_27249;var statearr_27272_27308 = state_27249__$1;(statearr_27272_27308[2] = inst_27221);
(statearr_27272_27308[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 15))
{var state_27249__$1 = state_27249;var statearr_27273_27309 = state_27249__$1;(statearr_27273_27309[2] = null);
(statearr_27273_27309[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 16))
{var inst_27224 = (state_27249[2]);var inst_27225 = calc_state.call(null);var inst_27198 = inst_27225;var state_27249__$1 = (function (){var statearr_27274 = state_27249;(statearr_27274[10] = inst_27198);
(statearr_27274[18] = inst_27224);
return statearr_27274;
})();var statearr_27275_27310 = state_27249__$1;(statearr_27275_27310[2] = null);
(statearr_27275_27310[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 17))
{var inst_27228 = (state_27249[17]);var state_27249__$1 = state_27249;var statearr_27276_27311 = state_27249__$1;(statearr_27276_27311[2] = inst_27228);
(statearr_27276_27311[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 18))
{var inst_27214 = (state_27249[16]);var inst_27208 = (state_27249[13]);var inst_27209 = (state_27249[14]);var inst_27231 = cljs.core.empty_QMARK_.call(null,inst_27209);var inst_27232 = inst_27208.call(null,inst_27214);var inst_27233 = cljs.core.not.call(null,inst_27232);var inst_27234 = (inst_27231) && (inst_27233);var state_27249__$1 = state_27249;var statearr_27277_27312 = state_27249__$1;(statearr_27277_27312[2] = inst_27234);
(statearr_27277_27312[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 19))
{var inst_27236 = (state_27249[2]);var state_27249__$1 = state_27249;if(cljs.core.truth_(inst_27236))
{var statearr_27278_27313 = state_27249__$1;(statearr_27278_27313[1] = 20);
} else
{var statearr_27279_27314 = state_27249__$1;(statearr_27279_27314[1] = 21);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 20))
{var inst_27213 = (state_27249[15]);var state_27249__$1 = state_27249;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27249__$1,23,out,inst_27213);
} else
{if((state_val_27250 === 21))
{var state_27249__$1 = state_27249;var statearr_27280_27315 = state_27249__$1;(statearr_27280_27315[2] = null);
(statearr_27280_27315[1] = 22);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 22))
{var inst_27206 = (state_27249[12]);var inst_27242 = (state_27249[2]);var inst_27198 = inst_27206;var state_27249__$1 = (function (){var statearr_27281 = state_27249;(statearr_27281[10] = inst_27198);
(statearr_27281[19] = inst_27242);
return statearr_27281;
})();var statearr_27282_27316 = state_27249__$1;(statearr_27282_27316[2] = null);
(statearr_27282_27316[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27250 === 23))
{var inst_27239 = (state_27249[2]);var state_27249__$1 = state_27249;var statearr_27283_27317 = state_27249__$1;(statearr_27283_27317[2] = inst_27239);
(statearr_27283_27317[1] = 22);
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
});})(c__20231__auto___27291,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;return ((function (switch__20216__auto__,c__20231__auto___27291,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_27287 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_27287[0] = state_machine__20217__auto__);
(statearr_27287[1] = 1);
return statearr_27287;
});
var state_machine__20217__auto____1 = (function (state_27249){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_27249);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e27288){if((e27288 instanceof Object))
{var ex__20220__auto__ = e27288;var statearr_27289_27318 = state_27249;(statearr_27289_27318[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27249);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e27288;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__27319 = state_27249;
state_27249 = G__27319;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_27249){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_27249);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto___27291,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();var state__20233__auto__ = (function (){var statearr_27290 = f__20232__auto__.call(null);(statearr_27290[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto___27291);
return statearr_27290;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto___27291,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);
return m;
});
/**
* Adds ch as an input to the mix
*/
cljs.core.async.admix = (function admix(mix,ch){return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
* Removes ch as an input to the mix
*/
cljs.core.async.unmix = (function unmix(mix,ch){return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
* removes all inputs from the mix
*/
cljs.core.async.unmix_all = (function unmix_all(mix){return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
* Atomically sets the state(s) of one or more channels in a mix. The
* state map is a map of channels -> channel-state-map. A
* channel-state-map is a map of attrs -> boolean, where attr is one or
* more of :mute, :pause or :solo. Any states supplied are merged with
* the current state.
* 
* Note that channels can be added to a mix via toggle, which can be
* used to add channels in a particular (e.g. paused) state.
*/
cljs.core.async.toggle = (function toggle(mix,state_map){return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
* Sets the solo mode of the mix. mode must be one of :mute or :pause
*/
cljs.core.async.solo_mode = (function solo_mode(mix,mode){return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});
cljs.core.async.Pub = (function (){var obj27321 = {};return obj27321;
})();
cljs.core.async.sub_STAR_ = (function sub_STAR_(p,v,ch,close_QMARK_){if((function (){var and__17715__auto__ = p;if(and__17715__auto__)
{return p.cljs$core$async$Pub$sub_STAR_$arity$4;
} else
{return and__17715__auto__;
}
})())
{return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else
{var x__18354__auto__ = (((p == null))?null:p);return (function (){var or__17727__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (cljs.core.async.sub_STAR_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
})().call(null,p,v,ch,close_QMARK_);
}
});
cljs.core.async.unsub_STAR_ = (function unsub_STAR_(p,v,ch){if((function (){var and__17715__auto__ = p;if(and__17715__auto__)
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3;
} else
{return and__17715__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else
{var x__18354__auto__ = (((p == null))?null:p);return (function (){var or__17727__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
})().call(null,p,v,ch);
}
});
cljs.core.async.unsub_all_STAR_ = (function() {
var unsub_all_STAR_ = null;
var unsub_all_STAR___1 = (function (p){if((function (){var and__17715__auto__ = p;if(and__17715__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1;
} else
{return and__17715__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else
{var x__18354__auto__ = (((p == null))?null:p);return (function (){var or__17727__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p);
}
});
var unsub_all_STAR___2 = (function (p,v){if((function (){var and__17715__auto__ = p;if(and__17715__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2;
} else
{return and__17715__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else
{var x__18354__auto__ = (((p == null))?null:p);return (function (){var or__17727__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__18354__auto__)]);if(or__17727__auto__)
{return or__17727__auto__;
} else
{var or__17727__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__17727__auto____$1)
{return or__17727__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p,v);
}
});
unsub_all_STAR_ = function(p,v){
switch(arguments.length){
case 1:
return unsub_all_STAR___1.call(this,p);
case 2:
return unsub_all_STAR___2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = unsub_all_STAR___1;
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = unsub_all_STAR___2;
return unsub_all_STAR_;
})()
;
/**
* Creates and returns a pub(lication) of the supplied channel,
* partitioned into topics by the topic-fn. topic-fn will be applied to
* each value on the channel and the result will determine the 'topic'
* on which that value will be put. Channels can be subscribed to
* receive copies of topics using 'sub', and unsubscribed using
* 'unsub'. Each topic will be handled by an internal mult on a
* dedicated channel. By default these internal channels are
* unbuffered, but a buf-fn can be supplied which, given a topic,
* creates a buffer with desired properties.
* 
* Each item is distributed to all subs in parallel and synchronously,
* i.e. each sub must accept before the next item is distributed. Use
* buffering/windowing to prevent slow subs from holding up the pub.
* 
* Items received when there are no matching subs get dropped.
* 
* Note that if buf-fns are used then each topic is handled
* asynchronously, i.e. if a channel is subscribed to more than one
* topic it should not expect them to be interleaved identically with
* the source.
*/
cljs.core.async.pub = (function() {
var pub = null;
var pub__2 = (function (ch,topic_fn){return pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});
var pub__3 = (function (ch,topic_fn,buf_fn){var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var ensure_mult = ((function (mults){
return (function (topic){var or__17727__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);if(cljs.core.truth_(or__17727__auto__))
{return or__17727__auto__;
} else
{return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__17727__auto__,mults){
return (function (p1__27322_SHARP_){if(cljs.core.truth_(p1__27322_SHARP_.call(null,topic)))
{return p1__27322_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__27322_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__17727__auto__,mults))
),topic);
}
});})(mults))
;var p = (function (){if(typeof cljs.core.async.t27447 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t27447 = (function (ensure_mult,mults,buf_fn,topic_fn,ch,pub,meta27448){
this.ensure_mult = ensure_mult;
this.mults = mults;
this.buf_fn = buf_fn;
this.topic_fn = topic_fn;
this.ch = ch;
this.pub = pub;
this.meta27448 = meta27448;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t27447.cljs$lang$type = true;
cljs.core.async.t27447.cljs$lang$ctorStr = "cljs.core.async/t27447";
cljs.core.async.t27447.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__18294__auto__,writer__18295__auto__,opt__18296__auto__){return cljs.core._write.call(null,writer__18295__auto__,"cljs.core.async/t27447");
});})(mults,ensure_mult))
;
cljs.core.async.t27447.prototype.cljs$core$async$Pub$ = true;
cljs.core.async.t27447.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2,close_QMARK_){var self__ = this;
var p__$1 = this;var m = self__.ensure_mult.call(null,topic);return cljs.core.async.tap.call(null,m,ch__$2,close_QMARK_);
});})(mults,ensure_mult))
;
cljs.core.async.t27447.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2){var self__ = this;
var p__$1 = this;var temp__4092__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);if(cljs.core.truth_(temp__4092__auto__))
{var m = temp__4092__auto__;return cljs.core.async.untap.call(null,m,ch__$2);
} else
{return null;
}
});})(mults,ensure_mult))
;
cljs.core.async.t27447.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;
cljs.core.async.t27447.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){var self__ = this;
var ___$1 = this;return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;
cljs.core.async.t27447.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t27447.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(mults,ensure_mult))
;
cljs.core.async.t27447.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_27449){var self__ = this;
var _27449__$1 = this;return self__.meta27448;
});})(mults,ensure_mult))
;
cljs.core.async.t27447.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_27449,meta27448__$1){var self__ = this;
var _27449__$1 = this;return (new cljs.core.async.t27447(self__.ensure_mult,self__.mults,self__.buf_fn,self__.topic_fn,self__.ch,self__.pub,meta27448__$1));
});})(mults,ensure_mult))
;
cljs.core.async.__GT_t27447 = ((function (mults,ensure_mult){
return (function __GT_t27447(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta27448){return (new cljs.core.async.t27447(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta27448));
});})(mults,ensure_mult))
;
}
return (new cljs.core.async.t27447(ensure_mult,mults,buf_fn,topic_fn,ch,pub,null));
})();var c__20231__auto___27571 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto___27571,mults,ensure_mult,p){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto___27571,mults,ensure_mult,p){
return (function (state_27523){var state_val_27524 = (state_27523[1]);if((state_val_27524 === 1))
{var state_27523__$1 = state_27523;var statearr_27525_27572 = state_27523__$1;(statearr_27525_27572[2] = null);
(statearr_27525_27572[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 2))
{var state_27523__$1 = state_27523;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27523__$1,4,ch);
} else
{if((state_val_27524 === 3))
{var inst_27521 = (state_27523[2]);var state_27523__$1 = state_27523;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27523__$1,inst_27521);
} else
{if((state_val_27524 === 4))
{var inst_27452 = (state_27523[7]);var inst_27452__$1 = (state_27523[2]);var inst_27453 = (inst_27452__$1 == null);var state_27523__$1 = (function (){var statearr_27526 = state_27523;(statearr_27526[7] = inst_27452__$1);
return statearr_27526;
})();if(cljs.core.truth_(inst_27453))
{var statearr_27527_27573 = state_27523__$1;(statearr_27527_27573[1] = 5);
} else
{var statearr_27528_27574 = state_27523__$1;(statearr_27528_27574[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 5))
{var inst_27459 = cljs.core.deref.call(null,mults);var inst_27460 = cljs.core.vals.call(null,inst_27459);var inst_27461 = cljs.core.seq.call(null,inst_27460);var inst_27462 = inst_27461;var inst_27463 = null;var inst_27464 = 0;var inst_27465 = 0;var state_27523__$1 = (function (){var statearr_27529 = state_27523;(statearr_27529[8] = inst_27464);
(statearr_27529[9] = inst_27465);
(statearr_27529[10] = inst_27463);
(statearr_27529[11] = inst_27462);
return statearr_27529;
})();var statearr_27530_27575 = state_27523__$1;(statearr_27530_27575[2] = null);
(statearr_27530_27575[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 6))
{var inst_27452 = (state_27523[7]);var inst_27502 = (state_27523[12]);var inst_27500 = (state_27523[13]);var inst_27500__$1 = topic_fn.call(null,inst_27452);var inst_27501 = cljs.core.deref.call(null,mults);var inst_27502__$1 = cljs.core.get.call(null,inst_27501,inst_27500__$1);var state_27523__$1 = (function (){var statearr_27531 = state_27523;(statearr_27531[12] = inst_27502__$1);
(statearr_27531[13] = inst_27500__$1);
return statearr_27531;
})();if(cljs.core.truth_(inst_27502__$1))
{var statearr_27532_27576 = state_27523__$1;(statearr_27532_27576[1] = 19);
} else
{var statearr_27533_27577 = state_27523__$1;(statearr_27533_27577[1] = 20);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 7))
{var inst_27519 = (state_27523[2]);var state_27523__$1 = state_27523;var statearr_27534_27578 = state_27523__$1;(statearr_27534_27578[2] = inst_27519);
(statearr_27534_27578[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 8))
{var inst_27464 = (state_27523[8]);var inst_27465 = (state_27523[9]);var inst_27467 = (inst_27465 < inst_27464);var inst_27468 = inst_27467;var state_27523__$1 = state_27523;if(cljs.core.truth_(inst_27468))
{var statearr_27538_27579 = state_27523__$1;(statearr_27538_27579[1] = 10);
} else
{var statearr_27539_27580 = state_27523__$1;(statearr_27539_27580[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 9))
{var inst_27498 = (state_27523[2]);var state_27523__$1 = state_27523;var statearr_27540_27581 = state_27523__$1;(statearr_27540_27581[2] = inst_27498);
(statearr_27540_27581[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 10))
{var inst_27464 = (state_27523[8]);var inst_27465 = (state_27523[9]);var inst_27463 = (state_27523[10]);var inst_27462 = (state_27523[11]);var inst_27470 = cljs.core._nth.call(null,inst_27463,inst_27465);var inst_27471 = cljs.core.async.muxch_STAR_.call(null,inst_27470);var inst_27472 = cljs.core.async.close_BANG_.call(null,inst_27471);var inst_27473 = (inst_27465 + 1);var tmp27535 = inst_27464;var tmp27536 = inst_27463;var tmp27537 = inst_27462;var inst_27462__$1 = tmp27537;var inst_27463__$1 = tmp27536;var inst_27464__$1 = tmp27535;var inst_27465__$1 = inst_27473;var state_27523__$1 = (function (){var statearr_27541 = state_27523;(statearr_27541[14] = inst_27472);
(statearr_27541[8] = inst_27464__$1);
(statearr_27541[9] = inst_27465__$1);
(statearr_27541[10] = inst_27463__$1);
(statearr_27541[11] = inst_27462__$1);
return statearr_27541;
})();var statearr_27542_27582 = state_27523__$1;(statearr_27542_27582[2] = null);
(statearr_27542_27582[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 11))
{var inst_27476 = (state_27523[15]);var inst_27462 = (state_27523[11]);var inst_27476__$1 = cljs.core.seq.call(null,inst_27462);var state_27523__$1 = (function (){var statearr_27543 = state_27523;(statearr_27543[15] = inst_27476__$1);
return statearr_27543;
})();if(inst_27476__$1)
{var statearr_27544_27583 = state_27523__$1;(statearr_27544_27583[1] = 13);
} else
{var statearr_27545_27584 = state_27523__$1;(statearr_27545_27584[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 12))
{var inst_27496 = (state_27523[2]);var state_27523__$1 = state_27523;var statearr_27546_27585 = state_27523__$1;(statearr_27546_27585[2] = inst_27496);
(statearr_27546_27585[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 13))
{var inst_27476 = (state_27523[15]);var inst_27478 = cljs.core.chunked_seq_QMARK_.call(null,inst_27476);var state_27523__$1 = state_27523;if(inst_27478)
{var statearr_27547_27586 = state_27523__$1;(statearr_27547_27586[1] = 16);
} else
{var statearr_27548_27587 = state_27523__$1;(statearr_27548_27587[1] = 17);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 14))
{var state_27523__$1 = state_27523;var statearr_27549_27588 = state_27523__$1;(statearr_27549_27588[2] = null);
(statearr_27549_27588[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 15))
{var inst_27494 = (state_27523[2]);var state_27523__$1 = state_27523;var statearr_27550_27589 = state_27523__$1;(statearr_27550_27589[2] = inst_27494);
(statearr_27550_27589[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 16))
{var inst_27476 = (state_27523[15]);var inst_27480 = cljs.core.chunk_first.call(null,inst_27476);var inst_27481 = cljs.core.chunk_rest.call(null,inst_27476);var inst_27482 = cljs.core.count.call(null,inst_27480);var inst_27462 = inst_27481;var inst_27463 = inst_27480;var inst_27464 = inst_27482;var inst_27465 = 0;var state_27523__$1 = (function (){var statearr_27551 = state_27523;(statearr_27551[8] = inst_27464);
(statearr_27551[9] = inst_27465);
(statearr_27551[10] = inst_27463);
(statearr_27551[11] = inst_27462);
return statearr_27551;
})();var statearr_27552_27590 = state_27523__$1;(statearr_27552_27590[2] = null);
(statearr_27552_27590[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 17))
{var inst_27476 = (state_27523[15]);var inst_27485 = cljs.core.first.call(null,inst_27476);var inst_27486 = cljs.core.async.muxch_STAR_.call(null,inst_27485);var inst_27487 = cljs.core.async.close_BANG_.call(null,inst_27486);var inst_27488 = cljs.core.next.call(null,inst_27476);var inst_27462 = inst_27488;var inst_27463 = null;var inst_27464 = 0;var inst_27465 = 0;var state_27523__$1 = (function (){var statearr_27553 = state_27523;(statearr_27553[16] = inst_27487);
(statearr_27553[8] = inst_27464);
(statearr_27553[9] = inst_27465);
(statearr_27553[10] = inst_27463);
(statearr_27553[11] = inst_27462);
return statearr_27553;
})();var statearr_27554_27591 = state_27523__$1;(statearr_27554_27591[2] = null);
(statearr_27554_27591[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 18))
{var inst_27491 = (state_27523[2]);var state_27523__$1 = state_27523;var statearr_27555_27592 = state_27523__$1;(statearr_27555_27592[2] = inst_27491);
(statearr_27555_27592[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 19))
{var state_27523__$1 = state_27523;var statearr_27556_27593 = state_27523__$1;(statearr_27556_27593[2] = null);
(statearr_27556_27593[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 20))
{var state_27523__$1 = state_27523;var statearr_27557_27594 = state_27523__$1;(statearr_27557_27594[2] = null);
(statearr_27557_27594[1] = 21);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 21))
{var inst_27516 = (state_27523[2]);var state_27523__$1 = (function (){var statearr_27558 = state_27523;(statearr_27558[17] = inst_27516);
return statearr_27558;
})();var statearr_27559_27595 = state_27523__$1;(statearr_27559_27595[2] = null);
(statearr_27559_27595[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 22))
{var inst_27513 = (state_27523[2]);var state_27523__$1 = state_27523;var statearr_27560_27596 = state_27523__$1;(statearr_27560_27596[2] = inst_27513);
(statearr_27560_27596[1] = 21);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 23))
{var inst_27500 = (state_27523[13]);var inst_27504 = (state_27523[2]);var inst_27505 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_27500);var state_27523__$1 = (function (){var statearr_27561 = state_27523;(statearr_27561[18] = inst_27504);
return statearr_27561;
})();var statearr_27562_27597 = state_27523__$1;(statearr_27562_27597[2] = inst_27505);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27523__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27524 === 24))
{var inst_27452 = (state_27523[7]);var inst_27502 = (state_27523[12]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_27523,23,Object,null,22);var inst_27509 = cljs.core.async.muxch_STAR_.call(null,inst_27502);var state_27523__$1 = state_27523;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27523__$1,25,inst_27509,inst_27452);
} else
{if((state_val_27524 === 25))
{var inst_27511 = (state_27523[2]);var state_27523__$1 = state_27523;var statearr_27563_27598 = state_27523__$1;(statearr_27563_27598[2] = inst_27511);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27523__$1);
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
}
});})(c__20231__auto___27571,mults,ensure_mult,p))
;return ((function (switch__20216__auto__,c__20231__auto___27571,mults,ensure_mult,p){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_27567 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_27567[0] = state_machine__20217__auto__);
(statearr_27567[1] = 1);
return statearr_27567;
});
var state_machine__20217__auto____1 = (function (state_27523){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_27523);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e27568){if((e27568 instanceof Object))
{var ex__20220__auto__ = e27568;var statearr_27569_27599 = state_27523;(statearr_27569_27599[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27523);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e27568;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__27600 = state_27523;
state_27523 = G__27600;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_27523){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_27523);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto___27571,mults,ensure_mult,p))
})();var state__20233__auto__ = (function (){var statearr_27570 = f__20232__auto__.call(null);(statearr_27570[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto___27571);
return statearr_27570;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto___27571,mults,ensure_mult,p))
);
return p;
});
pub = function(ch,topic_fn,buf_fn){
switch(arguments.length){
case 2:
return pub__2.call(this,ch,topic_fn);
case 3:
return pub__3.call(this,ch,topic_fn,buf_fn);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pub.cljs$core$IFn$_invoke$arity$2 = pub__2;
pub.cljs$core$IFn$_invoke$arity$3 = pub__3;
return pub;
})()
;
/**
* Subscribes a channel to a topic of a pub.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.sub = (function() {
var sub = null;
var sub__3 = (function (p,topic,ch){return sub.call(null,p,topic,ch,true);
});
var sub__4 = (function (p,topic,ch,close_QMARK_){return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});
sub = function(p,topic,ch,close_QMARK_){
switch(arguments.length){
case 3:
return sub__3.call(this,p,topic,ch);
case 4:
return sub__4.call(this,p,topic,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
sub.cljs$core$IFn$_invoke$arity$3 = sub__3;
sub.cljs$core$IFn$_invoke$arity$4 = sub__4;
return sub;
})()
;
/**
* Unsubscribes a channel from a topic of a pub
*/
cljs.core.async.unsub = (function unsub(p,topic,ch){return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
* Unsubscribes all channels from a pub, or a topic of a pub
*/
cljs.core.async.unsub_all = (function() {
var unsub_all = null;
var unsub_all__1 = (function (p){return cljs.core.async.unsub_all_STAR_.call(null,p);
});
var unsub_all__2 = (function (p,topic){return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});
unsub_all = function(p,topic){
switch(arguments.length){
case 1:
return unsub_all__1.call(this,p);
case 2:
return unsub_all__2.call(this,p,topic);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all.cljs$core$IFn$_invoke$arity$1 = unsub_all__1;
unsub_all.cljs$core$IFn$_invoke$arity$2 = unsub_all__2;
return unsub_all;
})()
;
/**
* Takes a function and a collection of source channels, and returns a
* channel which contains the values produced by applying f to the set
* of first items taken from each source channel, followed by applying
* f to the set of second items from each channel, until any one of the
* channels is closed, at which point the output channel will be
* closed. The returned channel will be unbuffered by default, or a
* buf-or-n can be supplied
*/
cljs.core.async.map = (function() {
var map = null;
var map__2 = (function (f,chs){return map.call(null,f,chs,null);
});
var map__3 = (function (f,chs,buf_or_n){var chs__$1 = cljs.core.vec.call(null,chs);var out = cljs.core.async.chan.call(null,buf_or_n);var cnt = cljs.core.count.call(null,chs__$1);var rets = cljs.core.object_array.call(null,cnt);var dchan = cljs.core.async.chan.call(null,1);var dctr = cljs.core.atom.call(null,null);var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){(rets[i] = ret);
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === 0))
{return cljs.core.async.put_BANG_.call(null,dchan,rets.slice(0));
} else
{return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));var c__20231__auto___27737 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto___27737,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto___27737,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_27707){var state_val_27708 = (state_27707[1]);if((state_val_27708 === 1))
{var state_27707__$1 = state_27707;var statearr_27709_27738 = state_27707__$1;(statearr_27709_27738[2] = null);
(statearr_27709_27738[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27708 === 2))
{var inst_27670 = cljs.core.reset_BANG_.call(null,dctr,cnt);var inst_27671 = 0;var state_27707__$1 = (function (){var statearr_27710 = state_27707;(statearr_27710[7] = inst_27670);
(statearr_27710[8] = inst_27671);
return statearr_27710;
})();var statearr_27711_27739 = state_27707__$1;(statearr_27711_27739[2] = null);
(statearr_27711_27739[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27708 === 3))
{var inst_27705 = (state_27707[2]);var state_27707__$1 = state_27707;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27707__$1,inst_27705);
} else
{if((state_val_27708 === 4))
{var inst_27671 = (state_27707[8]);var inst_27673 = (inst_27671 < cnt);var state_27707__$1 = state_27707;if(cljs.core.truth_(inst_27673))
{var statearr_27712_27740 = state_27707__$1;(statearr_27712_27740[1] = 6);
} else
{var statearr_27713_27741 = state_27707__$1;(statearr_27713_27741[1] = 7);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27708 === 5))
{var inst_27691 = (state_27707[2]);var state_27707__$1 = (function (){var statearr_27714 = state_27707;(statearr_27714[9] = inst_27691);
return statearr_27714;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27707__$1,12,dchan);
} else
{if((state_val_27708 === 6))
{var state_27707__$1 = state_27707;var statearr_27715_27742 = state_27707__$1;(statearr_27715_27742[2] = null);
(statearr_27715_27742[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27708 === 7))
{var state_27707__$1 = state_27707;var statearr_27716_27743 = state_27707__$1;(statearr_27716_27743[2] = null);
(statearr_27716_27743[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27708 === 8))
{var inst_27689 = (state_27707[2]);var state_27707__$1 = state_27707;var statearr_27717_27744 = state_27707__$1;(statearr_27717_27744[2] = inst_27689);
(statearr_27717_27744[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27708 === 9))
{var inst_27671 = (state_27707[8]);var inst_27684 = (state_27707[2]);var inst_27685 = (inst_27671 + 1);var inst_27671__$1 = inst_27685;var state_27707__$1 = (function (){var statearr_27718 = state_27707;(statearr_27718[8] = inst_27671__$1);
(statearr_27718[10] = inst_27684);
return statearr_27718;
})();var statearr_27719_27745 = state_27707__$1;(statearr_27719_27745[2] = null);
(statearr_27719_27745[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27708 === 10))
{var inst_27675 = (state_27707[2]);var inst_27676 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var state_27707__$1 = (function (){var statearr_27720 = state_27707;(statearr_27720[11] = inst_27675);
return statearr_27720;
})();var statearr_27721_27746 = state_27707__$1;(statearr_27721_27746[2] = inst_27676);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27707__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27708 === 11))
{var inst_27671 = (state_27707[8]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_27707,10,Object,null,9);var inst_27680 = chs__$1.call(null,inst_27671);var inst_27681 = done.call(null,inst_27671);var inst_27682 = cljs.core.async.take_BANG_.call(null,inst_27680,inst_27681);var state_27707__$1 = state_27707;var statearr_27722_27747 = state_27707__$1;(statearr_27722_27747[2] = inst_27682);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27707__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27708 === 12))
{var inst_27693 = (state_27707[12]);var inst_27693__$1 = (state_27707[2]);var inst_27694 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_27693__$1);var state_27707__$1 = (function (){var statearr_27723 = state_27707;(statearr_27723[12] = inst_27693__$1);
return statearr_27723;
})();if(cljs.core.truth_(inst_27694))
{var statearr_27724_27748 = state_27707__$1;(statearr_27724_27748[1] = 13);
} else
{var statearr_27725_27749 = state_27707__$1;(statearr_27725_27749[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27708 === 13))
{var inst_27696 = cljs.core.async.close_BANG_.call(null,out);var state_27707__$1 = state_27707;var statearr_27726_27750 = state_27707__$1;(statearr_27726_27750[2] = inst_27696);
(statearr_27726_27750[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27708 === 14))
{var inst_27693 = (state_27707[12]);var inst_27698 = cljs.core.apply.call(null,f,inst_27693);var state_27707__$1 = state_27707;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27707__$1,16,out,inst_27698);
} else
{if((state_val_27708 === 15))
{var inst_27703 = (state_27707[2]);var state_27707__$1 = state_27707;var statearr_27727_27751 = state_27707__$1;(statearr_27727_27751[2] = inst_27703);
(statearr_27727_27751[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27708 === 16))
{var inst_27700 = (state_27707[2]);var state_27707__$1 = (function (){var statearr_27728 = state_27707;(statearr_27728[13] = inst_27700);
return statearr_27728;
})();var statearr_27729_27752 = state_27707__$1;(statearr_27729_27752[2] = null);
(statearr_27729_27752[1] = 2);
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
}
}
}
}
}
}
}
}
}
});})(c__20231__auto___27737,chs__$1,out,cnt,rets,dchan,dctr,done))
;return ((function (switch__20216__auto__,c__20231__auto___27737,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_27733 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_27733[0] = state_machine__20217__auto__);
(statearr_27733[1] = 1);
return statearr_27733;
});
var state_machine__20217__auto____1 = (function (state_27707){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_27707);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e27734){if((e27734 instanceof Object))
{var ex__20220__auto__ = e27734;var statearr_27735_27753 = state_27707;(statearr_27735_27753[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27707);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e27734;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__27754 = state_27707;
state_27707 = G__27754;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_27707){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_27707);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto___27737,chs__$1,out,cnt,rets,dchan,dctr,done))
})();var state__20233__auto__ = (function (){var statearr_27736 = f__20232__auto__.call(null);(statearr_27736[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto___27737);
return statearr_27736;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto___27737,chs__$1,out,cnt,rets,dchan,dctr,done))
);
return out;
});
map = function(f,chs,buf_or_n){
switch(arguments.length){
case 2:
return map__2.call(this,f,chs);
case 3:
return map__3.call(this,f,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
map.cljs$core$IFn$_invoke$arity$2 = map__2;
map.cljs$core$IFn$_invoke$arity$3 = map__3;
return map;
})()
;
/**
* Takes a collection of source channels and returns a channel which
* contains all values taken from them. The returned channel will be
* unbuffered by default, or a buf-or-n can be supplied. The channel
* will close after all the source channels have closed.
*/
cljs.core.async.merge = (function() {
var merge = null;
var merge__1 = (function (chs){return merge.call(null,chs,null);
});
var merge__2 = (function (chs,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__20231__auto___27862 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto___27862,out){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto___27862,out){
return (function (state_27838){var state_val_27839 = (state_27838[1]);if((state_val_27839 === 1))
{var inst_27809 = cljs.core.vec.call(null,chs);var inst_27810 = inst_27809;var state_27838__$1 = (function (){var statearr_27840 = state_27838;(statearr_27840[7] = inst_27810);
return statearr_27840;
})();var statearr_27841_27863 = state_27838__$1;(statearr_27841_27863[2] = null);
(statearr_27841_27863[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27839 === 2))
{var inst_27810 = (state_27838[7]);var inst_27812 = cljs.core.count.call(null,inst_27810);var inst_27813 = (inst_27812 > 0);var state_27838__$1 = state_27838;if(cljs.core.truth_(inst_27813))
{var statearr_27842_27864 = state_27838__$1;(statearr_27842_27864[1] = 4);
} else
{var statearr_27843_27865 = state_27838__$1;(statearr_27843_27865[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27839 === 3))
{var inst_27836 = (state_27838[2]);var state_27838__$1 = state_27838;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27838__$1,inst_27836);
} else
{if((state_val_27839 === 4))
{var inst_27810 = (state_27838[7]);var state_27838__$1 = state_27838;return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_27838__$1,7,inst_27810);
} else
{if((state_val_27839 === 5))
{var inst_27832 = cljs.core.async.close_BANG_.call(null,out);var state_27838__$1 = state_27838;var statearr_27844_27866 = state_27838__$1;(statearr_27844_27866[2] = inst_27832);
(statearr_27844_27866[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27839 === 6))
{var inst_27834 = (state_27838[2]);var state_27838__$1 = state_27838;var statearr_27845_27867 = state_27838__$1;(statearr_27845_27867[2] = inst_27834);
(statearr_27845_27867[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27839 === 7))
{var inst_27818 = (state_27838[8]);var inst_27817 = (state_27838[9]);var inst_27817__$1 = (state_27838[2]);var inst_27818__$1 = cljs.core.nth.call(null,inst_27817__$1,0,null);var inst_27819 = cljs.core.nth.call(null,inst_27817__$1,1,null);var inst_27820 = (inst_27818__$1 == null);var state_27838__$1 = (function (){var statearr_27846 = state_27838;(statearr_27846[8] = inst_27818__$1);
(statearr_27846[9] = inst_27817__$1);
(statearr_27846[10] = inst_27819);
return statearr_27846;
})();if(cljs.core.truth_(inst_27820))
{var statearr_27847_27868 = state_27838__$1;(statearr_27847_27868[1] = 8);
} else
{var statearr_27848_27869 = state_27838__$1;(statearr_27848_27869[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27839 === 8))
{var inst_27818 = (state_27838[8]);var inst_27817 = (state_27838[9]);var inst_27819 = (state_27838[10]);var inst_27810 = (state_27838[7]);var inst_27822 = (function (){var c = inst_27819;var v = inst_27818;var vec__27815 = inst_27817;var cs = inst_27810;return ((function (c,v,vec__27815,cs,inst_27818,inst_27817,inst_27819,inst_27810,state_val_27839,c__20231__auto___27862,out){
return (function (p1__27755_SHARP_){return cljs.core.not_EQ_.call(null,c,p1__27755_SHARP_);
});
;})(c,v,vec__27815,cs,inst_27818,inst_27817,inst_27819,inst_27810,state_val_27839,c__20231__auto___27862,out))
})();var inst_27823 = cljs.core.filterv.call(null,inst_27822,inst_27810);var inst_27810__$1 = inst_27823;var state_27838__$1 = (function (){var statearr_27849 = state_27838;(statearr_27849[7] = inst_27810__$1);
return statearr_27849;
})();var statearr_27850_27870 = state_27838__$1;(statearr_27850_27870[2] = null);
(statearr_27850_27870[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27839 === 9))
{var inst_27818 = (state_27838[8]);var state_27838__$1 = state_27838;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27838__$1,11,out,inst_27818);
} else
{if((state_val_27839 === 10))
{var inst_27830 = (state_27838[2]);var state_27838__$1 = state_27838;var statearr_27852_27871 = state_27838__$1;(statearr_27852_27871[2] = inst_27830);
(statearr_27852_27871[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27839 === 11))
{var inst_27810 = (state_27838[7]);var inst_27827 = (state_27838[2]);var tmp27851 = inst_27810;var inst_27810__$1 = tmp27851;var state_27838__$1 = (function (){var statearr_27853 = state_27838;(statearr_27853[11] = inst_27827);
(statearr_27853[7] = inst_27810__$1);
return statearr_27853;
})();var statearr_27854_27872 = state_27838__$1;(statearr_27854_27872[2] = null);
(statearr_27854_27872[1] = 2);
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
}
}
}
}
});})(c__20231__auto___27862,out))
;return ((function (switch__20216__auto__,c__20231__auto___27862,out){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_27858 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_27858[0] = state_machine__20217__auto__);
(statearr_27858[1] = 1);
return statearr_27858;
});
var state_machine__20217__auto____1 = (function (state_27838){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_27838);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e27859){if((e27859 instanceof Object))
{var ex__20220__auto__ = e27859;var statearr_27860_27873 = state_27838;(statearr_27860_27873[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27838);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e27859;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__27874 = state_27838;
state_27838 = G__27874;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_27838){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_27838);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto___27862,out))
})();var state__20233__auto__ = (function (){var statearr_27861 = f__20232__auto__.call(null);(statearr_27861[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto___27862);
return statearr_27861;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto___27862,out))
);
return out;
});
merge = function(chs,buf_or_n){
switch(arguments.length){
case 1:
return merge__1.call(this,chs);
case 2:
return merge__2.call(this,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
merge.cljs$core$IFn$_invoke$arity$1 = merge__1;
merge.cljs$core$IFn$_invoke$arity$2 = merge__2;
return merge;
})()
;
/**
* Returns a channel containing the single (collection) result of the
* items taken from the channel conjoined to the supplied
* collection. ch must close before into produces a result.
*/
cljs.core.async.into = (function into(coll,ch){return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
* Returns a channel that will return, at most, n items from ch. After n items
* have been returned, or ch has been closed, the return chanel will close.
* 
* The output channel is unbuffered by default, unless buf-or-n is given.
*/
cljs.core.async.take = (function() {
var take = null;
var take__2 = (function (n,ch){return take.call(null,n,ch,null);
});
var take__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__20231__auto___27967 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto___27967,out){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto___27967,out){
return (function (state_27944){var state_val_27945 = (state_27944[1]);if((state_val_27945 === 1))
{var inst_27921 = 0;var state_27944__$1 = (function (){var statearr_27946 = state_27944;(statearr_27946[7] = inst_27921);
return statearr_27946;
})();var statearr_27947_27968 = state_27944__$1;(statearr_27947_27968[2] = null);
(statearr_27947_27968[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27945 === 2))
{var inst_27921 = (state_27944[7]);var inst_27923 = (inst_27921 < n);var state_27944__$1 = state_27944;if(cljs.core.truth_(inst_27923))
{var statearr_27948_27969 = state_27944__$1;(statearr_27948_27969[1] = 4);
} else
{var statearr_27949_27970 = state_27944__$1;(statearr_27949_27970[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27945 === 3))
{var inst_27941 = (state_27944[2]);var inst_27942 = cljs.core.async.close_BANG_.call(null,out);var state_27944__$1 = (function (){var statearr_27950 = state_27944;(statearr_27950[8] = inst_27941);
return statearr_27950;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27944__$1,inst_27942);
} else
{if((state_val_27945 === 4))
{var state_27944__$1 = state_27944;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27944__$1,7,ch);
} else
{if((state_val_27945 === 5))
{var state_27944__$1 = state_27944;var statearr_27951_27971 = state_27944__$1;(statearr_27951_27971[2] = null);
(statearr_27951_27971[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27945 === 6))
{var inst_27939 = (state_27944[2]);var state_27944__$1 = state_27944;var statearr_27952_27972 = state_27944__$1;(statearr_27952_27972[2] = inst_27939);
(statearr_27952_27972[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27945 === 7))
{var inst_27926 = (state_27944[9]);var inst_27926__$1 = (state_27944[2]);var inst_27927 = (inst_27926__$1 == null);var inst_27928 = cljs.core.not.call(null,inst_27927);var state_27944__$1 = (function (){var statearr_27953 = state_27944;(statearr_27953[9] = inst_27926__$1);
return statearr_27953;
})();if(inst_27928)
{var statearr_27954_27973 = state_27944__$1;(statearr_27954_27973[1] = 8);
} else
{var statearr_27955_27974 = state_27944__$1;(statearr_27955_27974[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27945 === 8))
{var inst_27926 = (state_27944[9]);var state_27944__$1 = state_27944;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27944__$1,11,out,inst_27926);
} else
{if((state_val_27945 === 9))
{var state_27944__$1 = state_27944;var statearr_27956_27975 = state_27944__$1;(statearr_27956_27975[2] = null);
(statearr_27956_27975[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27945 === 10))
{var inst_27936 = (state_27944[2]);var state_27944__$1 = state_27944;var statearr_27957_27976 = state_27944__$1;(statearr_27957_27976[2] = inst_27936);
(statearr_27957_27976[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_27945 === 11))
{var inst_27921 = (state_27944[7]);var inst_27931 = (state_27944[2]);var inst_27932 = (inst_27921 + 1);var inst_27921__$1 = inst_27932;var state_27944__$1 = (function (){var statearr_27958 = state_27944;(statearr_27958[7] = inst_27921__$1);
(statearr_27958[10] = inst_27931);
return statearr_27958;
})();var statearr_27959_27977 = state_27944__$1;(statearr_27959_27977[2] = null);
(statearr_27959_27977[1] = 2);
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
}
}
}
}
});})(c__20231__auto___27967,out))
;return ((function (switch__20216__auto__,c__20231__auto___27967,out){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_27963 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_27963[0] = state_machine__20217__auto__);
(statearr_27963[1] = 1);
return statearr_27963;
});
var state_machine__20217__auto____1 = (function (state_27944){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_27944);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e27964){if((e27964 instanceof Object))
{var ex__20220__auto__ = e27964;var statearr_27965_27978 = state_27944;(statearr_27965_27978[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27944);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e27964;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__27979 = state_27944;
state_27944 = G__27979;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_27944){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_27944);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto___27967,out))
})();var state__20233__auto__ = (function (){var statearr_27966 = f__20232__auto__.call(null);(statearr_27966[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto___27967);
return statearr_27966;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto___27967,out))
);
return out;
});
take = function(n,ch,buf_or_n){
switch(arguments.length){
case 2:
return take__2.call(this,n,ch);
case 3:
return take__3.call(this,n,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take.cljs$core$IFn$_invoke$arity$2 = take__2;
take.cljs$core$IFn$_invoke$arity$3 = take__3;
return take;
})()
;
/**
* Returns a channel that will contain values from ch. Consecutive duplicate
* values will be dropped.
* 
* The output channel is unbuffered by default, unless buf-or-n is given.
*/
cljs.core.async.unique = (function() {
var unique = null;
var unique__1 = (function (ch){return unique.call(null,ch,null);
});
var unique__2 = (function (ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__20231__auto___28076 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto___28076,out){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto___28076,out){
return (function (state_28051){var state_val_28052 = (state_28051[1]);if((state_val_28052 === 1))
{var inst_28028 = null;var state_28051__$1 = (function (){var statearr_28053 = state_28051;(statearr_28053[7] = inst_28028);
return statearr_28053;
})();var statearr_28054_28077 = state_28051__$1;(statearr_28054_28077[2] = null);
(statearr_28054_28077[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28052 === 2))
{var state_28051__$1 = state_28051;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28051__$1,4,ch);
} else
{if((state_val_28052 === 3))
{var inst_28048 = (state_28051[2]);var inst_28049 = cljs.core.async.close_BANG_.call(null,out);var state_28051__$1 = (function (){var statearr_28055 = state_28051;(statearr_28055[8] = inst_28048);
return statearr_28055;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28051__$1,inst_28049);
} else
{if((state_val_28052 === 4))
{var inst_28031 = (state_28051[9]);var inst_28031__$1 = (state_28051[2]);var inst_28032 = (inst_28031__$1 == null);var inst_28033 = cljs.core.not.call(null,inst_28032);var state_28051__$1 = (function (){var statearr_28056 = state_28051;(statearr_28056[9] = inst_28031__$1);
return statearr_28056;
})();if(inst_28033)
{var statearr_28057_28078 = state_28051__$1;(statearr_28057_28078[1] = 5);
} else
{var statearr_28058_28079 = state_28051__$1;(statearr_28058_28079[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28052 === 5))
{var inst_28031 = (state_28051[9]);var inst_28028 = (state_28051[7]);var inst_28035 = cljs.core._EQ_.call(null,inst_28031,inst_28028);var state_28051__$1 = state_28051;if(inst_28035)
{var statearr_28059_28080 = state_28051__$1;(statearr_28059_28080[1] = 8);
} else
{var statearr_28060_28081 = state_28051__$1;(statearr_28060_28081[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28052 === 6))
{var state_28051__$1 = state_28051;var statearr_28062_28082 = state_28051__$1;(statearr_28062_28082[2] = null);
(statearr_28062_28082[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28052 === 7))
{var inst_28046 = (state_28051[2]);var state_28051__$1 = state_28051;var statearr_28063_28083 = state_28051__$1;(statearr_28063_28083[2] = inst_28046);
(statearr_28063_28083[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28052 === 8))
{var inst_28028 = (state_28051[7]);var tmp28061 = inst_28028;var inst_28028__$1 = tmp28061;var state_28051__$1 = (function (){var statearr_28064 = state_28051;(statearr_28064[7] = inst_28028__$1);
return statearr_28064;
})();var statearr_28065_28084 = state_28051__$1;(statearr_28065_28084[2] = null);
(statearr_28065_28084[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28052 === 9))
{var inst_28031 = (state_28051[9]);var state_28051__$1 = state_28051;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28051__$1,11,out,inst_28031);
} else
{if((state_val_28052 === 10))
{var inst_28043 = (state_28051[2]);var state_28051__$1 = state_28051;var statearr_28066_28085 = state_28051__$1;(statearr_28066_28085[2] = inst_28043);
(statearr_28066_28085[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28052 === 11))
{var inst_28031 = (state_28051[9]);var inst_28040 = (state_28051[2]);var inst_28028 = inst_28031;var state_28051__$1 = (function (){var statearr_28067 = state_28051;(statearr_28067[7] = inst_28028);
(statearr_28067[10] = inst_28040);
return statearr_28067;
})();var statearr_28068_28086 = state_28051__$1;(statearr_28068_28086[2] = null);
(statearr_28068_28086[1] = 2);
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
}
}
}
}
});})(c__20231__auto___28076,out))
;return ((function (switch__20216__auto__,c__20231__auto___28076,out){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_28072 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_28072[0] = state_machine__20217__auto__);
(statearr_28072[1] = 1);
return statearr_28072;
});
var state_machine__20217__auto____1 = (function (state_28051){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_28051);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e28073){if((e28073 instanceof Object))
{var ex__20220__auto__ = e28073;var statearr_28074_28087 = state_28051;(statearr_28074_28087[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28051);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e28073;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__28088 = state_28051;
state_28051 = G__28088;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_28051){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_28051);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto___28076,out))
})();var state__20233__auto__ = (function (){var statearr_28075 = f__20232__auto__.call(null);(statearr_28075[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto___28076);
return statearr_28075;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto___28076,out))
);
return out;
});
unique = function(ch,buf_or_n){
switch(arguments.length){
case 1:
return unique__1.call(this,ch);
case 2:
return unique__2.call(this,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unique.cljs$core$IFn$_invoke$arity$1 = unique__1;
unique.cljs$core$IFn$_invoke$arity$2 = unique__2;
return unique;
})()
;
/**
* Returns a channel that will contain vectors of n items taken from ch. The
* final vector in the return channel may be smaller than n if ch closed before
* the vector could be completely filled.
* 
* The output channel is unbuffered by default, unless buf-or-n is given
*/
cljs.core.async.partition = (function() {
var partition = null;
var partition__2 = (function (n,ch){return partition.call(null,n,ch,null);
});
var partition__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__20231__auto___28223 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto___28223,out){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto___28223,out){
return (function (state_28193){var state_val_28194 = (state_28193[1]);if((state_val_28194 === 1))
{var inst_28156 = (new Array(n));var inst_28157 = inst_28156;var inst_28158 = 0;var state_28193__$1 = (function (){var statearr_28195 = state_28193;(statearr_28195[7] = inst_28157);
(statearr_28195[8] = inst_28158);
return statearr_28195;
})();var statearr_28196_28224 = state_28193__$1;(statearr_28196_28224[2] = null);
(statearr_28196_28224[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28194 === 2))
{var state_28193__$1 = state_28193;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28193__$1,4,ch);
} else
{if((state_val_28194 === 3))
{var inst_28191 = (state_28193[2]);var state_28193__$1 = state_28193;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28193__$1,inst_28191);
} else
{if((state_val_28194 === 4))
{var inst_28161 = (state_28193[9]);var inst_28161__$1 = (state_28193[2]);var inst_28162 = (inst_28161__$1 == null);var inst_28163 = cljs.core.not.call(null,inst_28162);var state_28193__$1 = (function (){var statearr_28197 = state_28193;(statearr_28197[9] = inst_28161__$1);
return statearr_28197;
})();if(inst_28163)
{var statearr_28198_28225 = state_28193__$1;(statearr_28198_28225[1] = 5);
} else
{var statearr_28199_28226 = state_28193__$1;(statearr_28199_28226[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28194 === 5))
{var inst_28166 = (state_28193[10]);var inst_28161 = (state_28193[9]);var inst_28157 = (state_28193[7]);var inst_28158 = (state_28193[8]);var inst_28165 = (inst_28157[inst_28158] = inst_28161);var inst_28166__$1 = (inst_28158 + 1);var inst_28167 = (inst_28166__$1 < n);var state_28193__$1 = (function (){var statearr_28200 = state_28193;(statearr_28200[11] = inst_28165);
(statearr_28200[10] = inst_28166__$1);
return statearr_28200;
})();if(cljs.core.truth_(inst_28167))
{var statearr_28201_28227 = state_28193__$1;(statearr_28201_28227[1] = 8);
} else
{var statearr_28202_28228 = state_28193__$1;(statearr_28202_28228[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28194 === 6))
{var inst_28158 = (state_28193[8]);var inst_28179 = (inst_28158 > 0);var state_28193__$1 = state_28193;if(cljs.core.truth_(inst_28179))
{var statearr_28204_28229 = state_28193__$1;(statearr_28204_28229[1] = 12);
} else
{var statearr_28205_28230 = state_28193__$1;(statearr_28205_28230[1] = 13);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28194 === 7))
{var inst_28189 = (state_28193[2]);var state_28193__$1 = state_28193;var statearr_28206_28231 = state_28193__$1;(statearr_28206_28231[2] = inst_28189);
(statearr_28206_28231[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28194 === 8))
{var inst_28166 = (state_28193[10]);var inst_28157 = (state_28193[7]);var tmp28203 = inst_28157;var inst_28157__$1 = tmp28203;var inst_28158 = inst_28166;var state_28193__$1 = (function (){var statearr_28207 = state_28193;(statearr_28207[7] = inst_28157__$1);
(statearr_28207[8] = inst_28158);
return statearr_28207;
})();var statearr_28208_28232 = state_28193__$1;(statearr_28208_28232[2] = null);
(statearr_28208_28232[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28194 === 9))
{var inst_28157 = (state_28193[7]);var inst_28171 = cljs.core.vec.call(null,inst_28157);var state_28193__$1 = state_28193;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28193__$1,11,out,inst_28171);
} else
{if((state_val_28194 === 10))
{var inst_28177 = (state_28193[2]);var state_28193__$1 = state_28193;var statearr_28209_28233 = state_28193__$1;(statearr_28209_28233[2] = inst_28177);
(statearr_28209_28233[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28194 === 11))
{var inst_28173 = (state_28193[2]);var inst_28174 = (new Array(n));var inst_28157 = inst_28174;var inst_28158 = 0;var state_28193__$1 = (function (){var statearr_28210 = state_28193;(statearr_28210[12] = inst_28173);
(statearr_28210[7] = inst_28157);
(statearr_28210[8] = inst_28158);
return statearr_28210;
})();var statearr_28211_28234 = state_28193__$1;(statearr_28211_28234[2] = null);
(statearr_28211_28234[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28194 === 12))
{var inst_28157 = (state_28193[7]);var inst_28181 = cljs.core.vec.call(null,inst_28157);var state_28193__$1 = state_28193;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28193__$1,15,out,inst_28181);
} else
{if((state_val_28194 === 13))
{var state_28193__$1 = state_28193;var statearr_28212_28235 = state_28193__$1;(statearr_28212_28235[2] = null);
(statearr_28212_28235[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28194 === 14))
{var inst_28186 = (state_28193[2]);var inst_28187 = cljs.core.async.close_BANG_.call(null,out);var state_28193__$1 = (function (){var statearr_28213 = state_28193;(statearr_28213[13] = inst_28186);
return statearr_28213;
})();var statearr_28214_28236 = state_28193__$1;(statearr_28214_28236[2] = inst_28187);
(statearr_28214_28236[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28194 === 15))
{var inst_28183 = (state_28193[2]);var state_28193__$1 = state_28193;var statearr_28215_28237 = state_28193__$1;(statearr_28215_28237[2] = inst_28183);
(statearr_28215_28237[1] = 14);
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
}
}
}
}
}
}
}
}
});})(c__20231__auto___28223,out))
;return ((function (switch__20216__auto__,c__20231__auto___28223,out){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_28219 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_28219[0] = state_machine__20217__auto__);
(statearr_28219[1] = 1);
return statearr_28219;
});
var state_machine__20217__auto____1 = (function (state_28193){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_28193);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e28220){if((e28220 instanceof Object))
{var ex__20220__auto__ = e28220;var statearr_28221_28238 = state_28193;(statearr_28221_28238[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28193);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e28220;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__28239 = state_28193;
state_28193 = G__28239;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_28193){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_28193);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto___28223,out))
})();var state__20233__auto__ = (function (){var statearr_28222 = f__20232__auto__.call(null);(statearr_28222[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto___28223);
return statearr_28222;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto___28223,out))
);
return out;
});
partition = function(n,ch,buf_or_n){
switch(arguments.length){
case 2:
return partition__2.call(this,n,ch);
case 3:
return partition__3.call(this,n,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
partition.cljs$core$IFn$_invoke$arity$2 = partition__2;
partition.cljs$core$IFn$_invoke$arity$3 = partition__3;
return partition;
})()
;
/**
* Returns a channel that will contain vectors of items taken from ch. New
* vectors will be created whenever (f itm) returns a value that differs from
* the previous item's (f itm).
* 
* The output channel is unbuffered, unless buf-or-n is given
*/
cljs.core.async.partition_by = (function() {
var partition_by = null;
var partition_by__2 = (function (f,ch){return partition_by.call(null,f,ch,null);
});
var partition_by__3 = (function (f,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__20231__auto___28382 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__20231__auto___28382,out){
return (function (){var f__20232__auto__ = (function (){var switch__20216__auto__ = ((function (c__20231__auto___28382,out){
return (function (state_28352){var state_val_28353 = (state_28352[1]);if((state_val_28353 === 1))
{var inst_28311 = [];var inst_28312 = inst_28311;var inst_28313 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",4382193538);var state_28352__$1 = (function (){var statearr_28354 = state_28352;(statearr_28354[7] = inst_28313);
(statearr_28354[8] = inst_28312);
return statearr_28354;
})();var statearr_28355_28383 = state_28352__$1;(statearr_28355_28383[2] = null);
(statearr_28355_28383[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28353 === 2))
{var state_28352__$1 = state_28352;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28352__$1,4,ch);
} else
{if((state_val_28353 === 3))
{var inst_28350 = (state_28352[2]);var state_28352__$1 = state_28352;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28352__$1,inst_28350);
} else
{if((state_val_28353 === 4))
{var inst_28316 = (state_28352[9]);var inst_28316__$1 = (state_28352[2]);var inst_28317 = (inst_28316__$1 == null);var inst_28318 = cljs.core.not.call(null,inst_28317);var state_28352__$1 = (function (){var statearr_28356 = state_28352;(statearr_28356[9] = inst_28316__$1);
return statearr_28356;
})();if(inst_28318)
{var statearr_28357_28384 = state_28352__$1;(statearr_28357_28384[1] = 5);
} else
{var statearr_28358_28385 = state_28352__$1;(statearr_28358_28385[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28353 === 5))
{var inst_28320 = (state_28352[10]);var inst_28316 = (state_28352[9]);var inst_28313 = (state_28352[7]);var inst_28320__$1 = f.call(null,inst_28316);var inst_28321 = cljs.core._EQ_.call(null,inst_28320__$1,inst_28313);var inst_28322 = cljs.core.keyword_identical_QMARK_.call(null,inst_28313,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",4382193538));var inst_28323 = (inst_28321) || (inst_28322);var state_28352__$1 = (function (){var statearr_28359 = state_28352;(statearr_28359[10] = inst_28320__$1);
return statearr_28359;
})();if(cljs.core.truth_(inst_28323))
{var statearr_28360_28386 = state_28352__$1;(statearr_28360_28386[1] = 8);
} else
{var statearr_28361_28387 = state_28352__$1;(statearr_28361_28387[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28353 === 6))
{var inst_28312 = (state_28352[8]);var inst_28337 = inst_28312.length;var inst_28338 = (inst_28337 > 0);var state_28352__$1 = state_28352;if(cljs.core.truth_(inst_28338))
{var statearr_28363_28388 = state_28352__$1;(statearr_28363_28388[1] = 12);
} else
{var statearr_28364_28389 = state_28352__$1;(statearr_28364_28389[1] = 13);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28353 === 7))
{var inst_28348 = (state_28352[2]);var state_28352__$1 = state_28352;var statearr_28365_28390 = state_28352__$1;(statearr_28365_28390[2] = inst_28348);
(statearr_28365_28390[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28353 === 8))
{var inst_28320 = (state_28352[10]);var inst_28316 = (state_28352[9]);var inst_28312 = (state_28352[8]);var inst_28325 = inst_28312.push(inst_28316);var tmp28362 = inst_28312;var inst_28312__$1 = tmp28362;var inst_28313 = inst_28320;var state_28352__$1 = (function (){var statearr_28366 = state_28352;(statearr_28366[11] = inst_28325);
(statearr_28366[7] = inst_28313);
(statearr_28366[8] = inst_28312__$1);
return statearr_28366;
})();var statearr_28367_28391 = state_28352__$1;(statearr_28367_28391[2] = null);
(statearr_28367_28391[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28353 === 9))
{var inst_28312 = (state_28352[8]);var inst_28328 = cljs.core.vec.call(null,inst_28312);var state_28352__$1 = state_28352;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28352__$1,11,out,inst_28328);
} else
{if((state_val_28353 === 10))
{var inst_28335 = (state_28352[2]);var state_28352__$1 = state_28352;var statearr_28368_28392 = state_28352__$1;(statearr_28368_28392[2] = inst_28335);
(statearr_28368_28392[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28353 === 11))
{var inst_28320 = (state_28352[10]);var inst_28316 = (state_28352[9]);var inst_28330 = (state_28352[2]);var inst_28331 = [];var inst_28332 = inst_28331.push(inst_28316);var inst_28312 = inst_28331;var inst_28313 = inst_28320;var state_28352__$1 = (function (){var statearr_28369 = state_28352;(statearr_28369[12] = inst_28330);
(statearr_28369[13] = inst_28332);
(statearr_28369[7] = inst_28313);
(statearr_28369[8] = inst_28312);
return statearr_28369;
})();var statearr_28370_28393 = state_28352__$1;(statearr_28370_28393[2] = null);
(statearr_28370_28393[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28353 === 12))
{var inst_28312 = (state_28352[8]);var inst_28340 = cljs.core.vec.call(null,inst_28312);var state_28352__$1 = state_28352;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28352__$1,15,out,inst_28340);
} else
{if((state_val_28353 === 13))
{var state_28352__$1 = state_28352;var statearr_28371_28394 = state_28352__$1;(statearr_28371_28394[2] = null);
(statearr_28371_28394[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28353 === 14))
{var inst_28345 = (state_28352[2]);var inst_28346 = cljs.core.async.close_BANG_.call(null,out);var state_28352__$1 = (function (){var statearr_28372 = state_28352;(statearr_28372[14] = inst_28345);
return statearr_28372;
})();var statearr_28373_28395 = state_28352__$1;(statearr_28373_28395[2] = inst_28346);
(statearr_28373_28395[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_28353 === 15))
{var inst_28342 = (state_28352[2]);var state_28352__$1 = state_28352;var statearr_28374_28396 = state_28352__$1;(statearr_28374_28396[2] = inst_28342);
(statearr_28374_28396[1] = 14);
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
}
}
}
}
}
}
}
}
});})(c__20231__auto___28382,out))
;return ((function (switch__20216__auto__,c__20231__auto___28382,out){
return (function() {
var state_machine__20217__auto__ = null;
var state_machine__20217__auto____0 = (function (){var statearr_28378 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_28378[0] = state_machine__20217__auto__);
(statearr_28378[1] = 1);
return statearr_28378;
});
var state_machine__20217__auto____1 = (function (state_28352){while(true){
var ret_value__20218__auto__ = (function (){try{while(true){
var result__20219__auto__ = switch__20216__auto__.call(null,state_28352);if(cljs.core.keyword_identical_QMARK_.call(null,result__20219__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__20219__auto__;
}
break;
}
}catch (e28379){if((e28379 instanceof Object))
{var ex__20220__auto__ = e28379;var statearr_28380_28397 = state_28352;(statearr_28380_28397[5] = ex__20220__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28352);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e28379;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20218__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__28398 = state_28352;
state_28352 = G__28398;
continue;
}
} else
{return ret_value__20218__auto__;
}
break;
}
});
state_machine__20217__auto__ = function(state_28352){
switch(arguments.length){
case 0:
return state_machine__20217__auto____0.call(this);
case 1:
return state_machine__20217__auto____1.call(this,state_28352);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__20217__auto____0;
state_machine__20217__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__20217__auto____1;
return state_machine__20217__auto__;
})()
;})(switch__20216__auto__,c__20231__auto___28382,out))
})();var state__20233__auto__ = (function (){var statearr_28381 = f__20232__auto__.call(null);(statearr_28381[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20231__auto___28382);
return statearr_28381;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20233__auto__);
});})(c__20231__auto___28382,out))
);
return out;
});
partition_by = function(f,ch,buf_or_n){
switch(arguments.length){
case 2:
return partition_by__2.call(this,f,ch);
case 3:
return partition_by__3.call(this,f,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
partition_by.cljs$core$IFn$_invoke$arity$2 = partition_by__2;
partition_by.cljs$core$IFn$_invoke$arity$3 = partition_by__3;
return partition_by;
})()
;

//# sourceMappingURL=async.js.map