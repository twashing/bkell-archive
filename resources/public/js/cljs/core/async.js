// Compiled by ClojureScript 0.0-2173
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
cljs.core.async.fn_handler = (function fn_handler(f){if(typeof cljs.core.async.t21798 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t21798 = (function (f,fn_handler,meta21799){
this.f = f;
this.fn_handler = fn_handler;
this.meta21799 = meta21799;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t21798.cljs$lang$type = true;
cljs.core.async.t21798.cljs$lang$ctorStr = "cljs.core.async/t21798";
cljs.core.async.t21798.cljs$lang$ctorPrWriter = (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t21798");
});
cljs.core.async.t21798.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t21798.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return true;
});
cljs.core.async.t21798.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.f;
});
cljs.core.async.t21798.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_21800){var self__ = this;
var _21800__$1 = this;return self__.meta21799;
});
cljs.core.async.t21798.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_21800,meta21799__$1){var self__ = this;
var _21800__$1 = this;return (new cljs.core.async.t21798(self__.f,self__.fn_handler,meta21799__$1));
});
cljs.core.async.__GT_t21798 = (function __GT_t21798(f__$1,fn_handler__$1,meta21799){return (new cljs.core.async.t21798(f__$1,fn_handler__$1,meta21799));
});
}
return (new cljs.core.async.t21798(f,fn_handler,null));
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
cljs.core.async.unblocking_buffer_QMARK_ = (function unblocking_buffer_QMARK_(buff){var G__21802 = buff;if(G__21802)
{var bit__15874__auto__ = null;if(cljs.core.truth_((function (){var or__15224__auto__ = bit__15874__auto__;if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{return G__21802.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})()))
{return true;
} else
{if((!G__21802.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__21802);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__21802);
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
{var val_21803 = cljs.core.deref.call(null,ret);if(cljs.core.truth_(on_caller_QMARK_))
{fn1.call(null,val_21803);
} else
{cljs.core.async.impl.dispatch.run.call(null,(function (){return fn1.call(null,val_21803);
}));
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
var put_BANG___4 = (function (port,val,fn0,on_caller_QMARK_){var ret = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn0));if(cljs.core.truth_((function (){var and__15212__auto__ = ret;if(cljs.core.truth_(and__15212__auto__))
{return cljs.core.not_EQ_.call(null,fn0,cljs.core.async.nop);
} else
{return and__15212__auto__;
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
cljs.core.async.random_array = (function random_array(n){var a = (new Array(n));var n__16072__auto___21804 = n;var x_21805 = 0;while(true){
if((x_21805 < n__16072__auto___21804))
{(a[x_21805] = 0);
{
var G__21806 = (x_21805 + 1);
x_21805 = G__21806;
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
var G__21807 = (i + 1);
i = G__21807;
continue;
}
}
break;
}
});
cljs.core.async.alt_flag = (function alt_flag(){var flag = cljs.core.atom.call(null,true);if(typeof cljs.core.async.t21811 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t21811 = (function (flag,alt_flag,meta21812){
this.flag = flag;
this.alt_flag = alt_flag;
this.meta21812 = meta21812;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t21811.cljs$lang$type = true;
cljs.core.async.t21811.cljs$lang$ctorStr = "cljs.core.async/t21811";
cljs.core.async.t21811.cljs$lang$ctorPrWriter = (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t21811");
});
cljs.core.async.t21811.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t21811.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.deref.call(null,self__.flag);
});
cljs.core.async.t21811.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.flag,null);
return true;
});
cljs.core.async.t21811.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_21813){var self__ = this;
var _21813__$1 = this;return self__.meta21812;
});
cljs.core.async.t21811.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_21813,meta21812__$1){var self__ = this;
var _21813__$1 = this;return (new cljs.core.async.t21811(self__.flag,self__.alt_flag,meta21812__$1));
});
cljs.core.async.__GT_t21811 = (function __GT_t21811(flag__$1,alt_flag__$1,meta21812){return (new cljs.core.async.t21811(flag__$1,alt_flag__$1,meta21812));
});
}
return (new cljs.core.async.t21811(flag,alt_flag,null));
});
cljs.core.async.alt_handler = (function alt_handler(flag,cb){if(typeof cljs.core.async.t21817 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t21817 = (function (cb,flag,alt_handler,meta21818){
this.cb = cb;
this.flag = flag;
this.alt_handler = alt_handler;
this.meta21818 = meta21818;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t21817.cljs$lang$type = true;
cljs.core.async.t21817.cljs$lang$ctorStr = "cljs.core.async/t21817";
cljs.core.async.t21817.cljs$lang$ctorPrWriter = (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t21817");
});
cljs.core.async.t21817.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t21817.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});
cljs.core.async.t21817.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.async.impl.protocols.commit.call(null,self__.flag);
return self__.cb;
});
cljs.core.async.t21817.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_21819){var self__ = this;
var _21819__$1 = this;return self__.meta21818;
});
cljs.core.async.t21817.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_21819,meta21818__$1){var self__ = this;
var _21819__$1 = this;return (new cljs.core.async.t21817(self__.cb,self__.flag,self__.alt_handler,meta21818__$1));
});
cljs.core.async.__GT_t21817 = (function __GT_t21817(cb__$1,flag__$1,alt_handler__$1,meta21818){return (new cljs.core.async.t21817(cb__$1,flag__$1,alt_handler__$1,meta21818));
});
}
return (new cljs.core.async.t21817(cb,flag,alt_handler,null));
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
return (function (p1__21820_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__21820_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));if(cljs.core.truth_(vbox))
{return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__15224__auto__ = wport;if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{return port;
}
})()], null));
} else
{{
var G__21821 = (i + 1);
i = G__21821;
continue;
}
}
} else
{return null;
}
break;
}
})();var or__15224__auto__ = ret;if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",2558708147)))
{var temp__4092__auto__ = (function (){var and__15212__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);if(cljs.core.truth_(and__15212__auto__))
{return cljs.core.async.impl.protocols.commit.call(null,flag);
} else
{return and__15212__auto__;
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
var alts_BANG___delegate = function (ports,p__21822){var map__21824 = p__21822;var map__21824__$1 = ((cljs.core.seq_QMARK_.call(null,map__21824))?cljs.core.apply.call(null,cljs.core.hash_map,map__21824):map__21824);var opts = map__21824__$1;if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("alts! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
};
var alts_BANG_ = function (ports,var_args){
var p__21822 = null;if (arguments.length > 1) {
  p__21822 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return alts_BANG___delegate.call(this,ports,p__21822);};
alts_BANG_.cljs$lang$maxFixedArity = 1;
alts_BANG_.cljs$lang$applyTo = (function (arglist__21825){
var ports = cljs.core.first(arglist__21825);
var p__21822 = cljs.core.rest(arglist__21825);
return alts_BANG___delegate(ports,p__21822);
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
cljs.core.async.map_LT_ = (function map_LT_(f,ch){if(typeof cljs.core.async.t21833 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t21833 = (function (ch,f,map_LT_,meta21834){
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta21834 = meta21834;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t21833.cljs$lang$type = true;
cljs.core.async.t21833.cljs$lang$ctorStr = "cljs.core.async/t21833";
cljs.core.async.t21833.cljs$lang$ctorPrWriter = (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t21833");
});
cljs.core.async.t21833.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t21833.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn0);
});
cljs.core.async.t21833.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t21833.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){if(typeof cljs.core.async.t21836 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t21836 = (function (fn1,_,meta21834,ch,f,map_LT_,meta21837){
this.fn1 = fn1;
this._ = _;
this.meta21834 = meta21834;
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta21837 = meta21837;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t21836.cljs$lang$type = true;
cljs.core.async.t21836.cljs$lang$ctorStr = "cljs.core.async/t21836";
cljs.core.async.t21836.cljs$lang$ctorPrWriter = (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t21836");
});
cljs.core.async.t21836.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t21836.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});
cljs.core.async.t21836.prototype.cljs$core$async$impl$protocols$Handler$lock_id$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.lock_id.call(null,self__.fn1);
});
cljs.core.async.t21836.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);return ((function (f1,___$4){
return (function (p1__21826_SHARP_){return f1.call(null,(((p1__21826_SHARP_ == null))?null:self__.f.call(null,p1__21826_SHARP_)));
});
;})(f1,___$4))
});
cljs.core.async.t21836.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_21838){var self__ = this;
var _21838__$1 = this;return self__.meta21837;
});
cljs.core.async.t21836.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_21838,meta21837__$1){var self__ = this;
var _21838__$1 = this;return (new cljs.core.async.t21836(self__.fn1,self__._,self__.meta21834,self__.ch,self__.f,self__.map_LT_,meta21837__$1));
});
cljs.core.async.__GT_t21836 = (function __GT_t21836(fn1__$1,___$2,meta21834__$1,ch__$2,f__$2,map_LT___$2,meta21837){return (new cljs.core.async.t21836(fn1__$1,___$2,meta21834__$1,ch__$2,f__$2,map_LT___$2,meta21837));
});
}
return (new cljs.core.async.t21836(fn1,___$1,self__.meta21834,self__.ch,self__.f,self__.map_LT_,null));
})());if(cljs.core.truth_((function (){var and__15212__auto__ = ret;if(cljs.core.truth_(and__15212__auto__))
{return !((cljs.core.deref.call(null,ret) == null));
} else
{return and__15212__auto__;
}
})()))
{return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else
{return ret;
}
});
cljs.core.async.t21833.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t21833.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t21833.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_21835){var self__ = this;
var _21835__$1 = this;return self__.meta21834;
});
cljs.core.async.t21833.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_21835,meta21834__$1){var self__ = this;
var _21835__$1 = this;return (new cljs.core.async.t21833(self__.ch,self__.f,self__.map_LT_,meta21834__$1));
});
cljs.core.async.__GT_t21833 = (function __GT_t21833(ch__$1,f__$1,map_LT___$1,meta21834){return (new cljs.core.async.t21833(ch__$1,f__$1,map_LT___$1,meta21834));
});
}
return (new cljs.core.async.t21833(ch,f,map_LT_,null));
});
/**
* Takes a function and a target channel, and returns a channel which
* applies f to each value before supplying it to the target channel.
*/
cljs.core.async.map_GT_ = (function map_GT_(f,ch){if(typeof cljs.core.async.t21842 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t21842 = (function (ch,f,map_GT_,meta21843){
this.ch = ch;
this.f = f;
this.map_GT_ = map_GT_;
this.meta21843 = meta21843;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t21842.cljs$lang$type = true;
cljs.core.async.t21842.cljs$lang$ctorStr = "cljs.core.async/t21842";
cljs.core.async.t21842.cljs$lang$ctorPrWriter = (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t21842");
});
cljs.core.async.t21842.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t21842.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn0);
});
cljs.core.async.t21842.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t21842.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t21842.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t21842.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t21842.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_21844){var self__ = this;
var _21844__$1 = this;return self__.meta21843;
});
cljs.core.async.t21842.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_21844,meta21843__$1){var self__ = this;
var _21844__$1 = this;return (new cljs.core.async.t21842(self__.ch,self__.f,self__.map_GT_,meta21843__$1));
});
cljs.core.async.__GT_t21842 = (function __GT_t21842(ch__$1,f__$1,map_GT___$1,meta21843){return (new cljs.core.async.t21842(ch__$1,f__$1,map_GT___$1,meta21843));
});
}
return (new cljs.core.async.t21842(ch,f,map_GT_,null));
});
/**
* Takes a predicate and a target channel, and returns a channel which
* supplies only the values for which the predicate returns true to the
* target channel.
*/
cljs.core.async.filter_GT_ = (function filter_GT_(p,ch){if(typeof cljs.core.async.t21848 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t21848 = (function (ch,p,filter_GT_,meta21849){
this.ch = ch;
this.p = p;
this.filter_GT_ = filter_GT_;
this.meta21849 = meta21849;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t21848.cljs$lang$type = true;
cljs.core.async.t21848.cljs$lang$ctorStr = "cljs.core.async/t21848";
cljs.core.async.t21848.cljs$lang$ctorPrWriter = (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t21848");
});
cljs.core.async.t21848.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t21848.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.p.call(null,val)))
{return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn0);
} else
{return cljs.core.async.impl.channels.box.call(null,null);
}
});
cljs.core.async.t21848.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t21848.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t21848.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t21848.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t21848.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_21850){var self__ = this;
var _21850__$1 = this;return self__.meta21849;
});
cljs.core.async.t21848.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_21850,meta21849__$1){var self__ = this;
var _21850__$1 = this;return (new cljs.core.async.t21848(self__.ch,self__.p,self__.filter_GT_,meta21849__$1));
});
cljs.core.async.__GT_t21848 = (function __GT_t21848(ch__$1,p__$1,filter_GT___$1,meta21849){return (new cljs.core.async.t21848(ch__$1,p__$1,filter_GT___$1,meta21849));
});
}
return (new cljs.core.async.t21848(ch,p,filter_GT_,null));
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
var filter_LT___3 = (function (p,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__17054__auto___21933 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__17055__auto__ = (function (){var switch__17039__auto__ = (function (state_21912){var state_val_21913 = (state_21912[1]);if((state_val_21913 === 1))
{var state_21912__$1 = state_21912;var statearr_21914_21934 = state_21912__$1;(statearr_21914_21934[2] = null);
(statearr_21914_21934[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_21913 === 2))
{var state_21912__$1 = state_21912;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_21912__$1,4,ch);
} else
{if((state_val_21913 === 3))
{var inst_21910 = (state_21912[2]);var state_21912__$1 = state_21912;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_21912__$1,inst_21910);
} else
{if((state_val_21913 === 4))
{var inst_21894 = (state_21912[7]);var inst_21894__$1 = (state_21912[2]);var inst_21895 = (inst_21894__$1 == null);var state_21912__$1 = (function (){var statearr_21915 = state_21912;(statearr_21915[7] = inst_21894__$1);
return statearr_21915;
})();if(cljs.core.truth_(inst_21895))
{var statearr_21916_21935 = state_21912__$1;(statearr_21916_21935[1] = 5);
} else
{var statearr_21917_21936 = state_21912__$1;(statearr_21917_21936[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_21913 === 5))
{var inst_21897 = cljs.core.async.close_BANG_.call(null,out);var state_21912__$1 = state_21912;var statearr_21918_21937 = state_21912__$1;(statearr_21918_21937[2] = inst_21897);
(statearr_21918_21937[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_21913 === 6))
{var inst_21894 = (state_21912[7]);var inst_21899 = p.call(null,inst_21894);var state_21912__$1 = state_21912;if(cljs.core.truth_(inst_21899))
{var statearr_21919_21938 = state_21912__$1;(statearr_21919_21938[1] = 8);
} else
{var statearr_21920_21939 = state_21912__$1;(statearr_21920_21939[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_21913 === 7))
{var inst_21908 = (state_21912[2]);var state_21912__$1 = state_21912;var statearr_21921_21940 = state_21912__$1;(statearr_21921_21940[2] = inst_21908);
(statearr_21921_21940[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_21913 === 8))
{var inst_21894 = (state_21912[7]);var state_21912__$1 = state_21912;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_21912__$1,11,out,inst_21894);
} else
{if((state_val_21913 === 9))
{var state_21912__$1 = state_21912;var statearr_21922_21941 = state_21912__$1;(statearr_21922_21941[2] = null);
(statearr_21922_21941[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_21913 === 10))
{var inst_21905 = (state_21912[2]);var state_21912__$1 = (function (){var statearr_21923 = state_21912;(statearr_21923[8] = inst_21905);
return statearr_21923;
})();var statearr_21924_21942 = state_21912__$1;(statearr_21924_21942[2] = null);
(statearr_21924_21942[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_21913 === 11))
{var inst_21902 = (state_21912[2]);var state_21912__$1 = state_21912;var statearr_21925_21943 = state_21912__$1;(statearr_21925_21943[2] = inst_21902);
(statearr_21925_21943[1] = 10);
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
});return ((function (switch__17039__auto__){
return (function() {
var state_machine__17040__auto__ = null;
var state_machine__17040__auto____0 = (function (){var statearr_21929 = [null,null,null,null,null,null,null,null,null];(statearr_21929[0] = state_machine__17040__auto__);
(statearr_21929[1] = 1);
return statearr_21929;
});
var state_machine__17040__auto____1 = (function (state_21912){while(true){
var ret_value__17041__auto__ = (function (){try{while(true){
var result__17042__auto__ = switch__17039__auto__.call(null,state_21912);if(cljs.core.keyword_identical_QMARK_.call(null,result__17042__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__17042__auto__;
}
break;
}
}catch (e21930){if((e21930 instanceof Object))
{var ex__17043__auto__ = e21930;var statearr_21931_21944 = state_21912;(statearr_21931_21944[5] = ex__17043__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_21912);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e21930;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__17041__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__21945 = state_21912;
state_21912 = G__21945;
continue;
}
} else
{return ret_value__17041__auto__;
}
break;
}
});
state_machine__17040__auto__ = function(state_21912){
switch(arguments.length){
case 0:
return state_machine__17040__auto____0.call(this);
case 1:
return state_machine__17040__auto____1.call(this,state_21912);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__17040__auto____0;
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__17040__auto____1;
return state_machine__17040__auto__;
})()
;})(switch__17039__auto__))
})();var state__17056__auto__ = (function (){var statearr_21932 = f__17055__auto__.call(null);(statearr_21932[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__17054__auto___21933);
return statearr_21932;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__17056__auto__);
}));
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
cljs.core.async.mapcat_STAR_ = (function mapcat_STAR_(f,in$,out){var c__17054__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__17055__auto__ = (function (){var switch__17039__auto__ = (function (state_22097){var state_val_22098 = (state_22097[1]);if((state_val_22098 === 1))
{var state_22097__$1 = state_22097;var statearr_22099_22136 = state_22097__$1;(statearr_22099_22136[2] = null);
(statearr_22099_22136[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22098 === 2))
{var state_22097__$1 = state_22097;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22097__$1,4,in$);
} else
{if((state_val_22098 === 3))
{var inst_22095 = (state_22097[2]);var state_22097__$1 = state_22097;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22097__$1,inst_22095);
} else
{if((state_val_22098 === 4))
{var inst_22043 = (state_22097[7]);var inst_22043__$1 = (state_22097[2]);var inst_22044 = (inst_22043__$1 == null);var state_22097__$1 = (function (){var statearr_22100 = state_22097;(statearr_22100[7] = inst_22043__$1);
return statearr_22100;
})();if(cljs.core.truth_(inst_22044))
{var statearr_22101_22137 = state_22097__$1;(statearr_22101_22137[1] = 5);
} else
{var statearr_22102_22138 = state_22097__$1;(statearr_22102_22138[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22098 === 5))
{var inst_22046 = cljs.core.async.close_BANG_.call(null,out);var state_22097__$1 = state_22097;var statearr_22103_22139 = state_22097__$1;(statearr_22103_22139[2] = inst_22046);
(statearr_22103_22139[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22098 === 6))
{var inst_22043 = (state_22097[7]);var inst_22048 = f.call(null,inst_22043);var inst_22053 = cljs.core.seq.call(null,inst_22048);var inst_22054 = inst_22053;var inst_22055 = null;var inst_22056 = 0;var inst_22057 = 0;var state_22097__$1 = (function (){var statearr_22104 = state_22097;(statearr_22104[8] = inst_22057);
(statearr_22104[9] = inst_22056);
(statearr_22104[10] = inst_22054);
(statearr_22104[11] = inst_22055);
return statearr_22104;
})();var statearr_22105_22140 = state_22097__$1;(statearr_22105_22140[2] = null);
(statearr_22105_22140[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22098 === 7))
{var inst_22093 = (state_22097[2]);var state_22097__$1 = state_22097;var statearr_22106_22141 = state_22097__$1;(statearr_22106_22141[2] = inst_22093);
(statearr_22106_22141[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22098 === 8))
{var inst_22057 = (state_22097[8]);var inst_22056 = (state_22097[9]);var inst_22059 = (inst_22057 < inst_22056);var inst_22060 = inst_22059;var state_22097__$1 = state_22097;if(cljs.core.truth_(inst_22060))
{var statearr_22107_22142 = state_22097__$1;(statearr_22107_22142[1] = 10);
} else
{var statearr_22108_22143 = state_22097__$1;(statearr_22108_22143[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22098 === 9))
{var inst_22090 = (state_22097[2]);var state_22097__$1 = (function (){var statearr_22109 = state_22097;(statearr_22109[12] = inst_22090);
return statearr_22109;
})();var statearr_22110_22144 = state_22097__$1;(statearr_22110_22144[2] = null);
(statearr_22110_22144[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22098 === 10))
{var inst_22057 = (state_22097[8]);var inst_22055 = (state_22097[11]);var inst_22062 = cljs.core._nth.call(null,inst_22055,inst_22057);var state_22097__$1 = state_22097;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_22097__$1,13,out,inst_22062);
} else
{if((state_val_22098 === 11))
{var inst_22068 = (state_22097[13]);var inst_22054 = (state_22097[10]);var inst_22068__$1 = cljs.core.seq.call(null,inst_22054);var state_22097__$1 = (function (){var statearr_22114 = state_22097;(statearr_22114[13] = inst_22068__$1);
return statearr_22114;
})();if(inst_22068__$1)
{var statearr_22115_22145 = state_22097__$1;(statearr_22115_22145[1] = 14);
} else
{var statearr_22116_22146 = state_22097__$1;(statearr_22116_22146[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22098 === 12))
{var inst_22088 = (state_22097[2]);var state_22097__$1 = state_22097;var statearr_22117_22147 = state_22097__$1;(statearr_22117_22147[2] = inst_22088);
(statearr_22117_22147[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22098 === 13))
{var inst_22057 = (state_22097[8]);var inst_22056 = (state_22097[9]);var inst_22054 = (state_22097[10]);var inst_22055 = (state_22097[11]);var inst_22064 = (state_22097[2]);var inst_22065 = (inst_22057 + 1);var tmp22111 = inst_22056;var tmp22112 = inst_22054;var tmp22113 = inst_22055;var inst_22054__$1 = tmp22112;var inst_22055__$1 = tmp22113;var inst_22056__$1 = tmp22111;var inst_22057__$1 = inst_22065;var state_22097__$1 = (function (){var statearr_22118 = state_22097;(statearr_22118[14] = inst_22064);
(statearr_22118[8] = inst_22057__$1);
(statearr_22118[9] = inst_22056__$1);
(statearr_22118[10] = inst_22054__$1);
(statearr_22118[11] = inst_22055__$1);
return statearr_22118;
})();var statearr_22119_22148 = state_22097__$1;(statearr_22119_22148[2] = null);
(statearr_22119_22148[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22098 === 14))
{var inst_22068 = (state_22097[13]);var inst_22070 = cljs.core.chunked_seq_QMARK_.call(null,inst_22068);var state_22097__$1 = state_22097;if(inst_22070)
{var statearr_22120_22149 = state_22097__$1;(statearr_22120_22149[1] = 17);
} else
{var statearr_22121_22150 = state_22097__$1;(statearr_22121_22150[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22098 === 15))
{var state_22097__$1 = state_22097;var statearr_22122_22151 = state_22097__$1;(statearr_22122_22151[2] = null);
(statearr_22122_22151[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22098 === 16))
{var inst_22086 = (state_22097[2]);var state_22097__$1 = state_22097;var statearr_22123_22152 = state_22097__$1;(statearr_22123_22152[2] = inst_22086);
(statearr_22123_22152[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22098 === 17))
{var inst_22068 = (state_22097[13]);var inst_22072 = cljs.core.chunk_first.call(null,inst_22068);var inst_22073 = cljs.core.chunk_rest.call(null,inst_22068);var inst_22074 = cljs.core.count.call(null,inst_22072);var inst_22054 = inst_22073;var inst_22055 = inst_22072;var inst_22056 = inst_22074;var inst_22057 = 0;var state_22097__$1 = (function (){var statearr_22124 = state_22097;(statearr_22124[8] = inst_22057);
(statearr_22124[9] = inst_22056);
(statearr_22124[10] = inst_22054);
(statearr_22124[11] = inst_22055);
return statearr_22124;
})();var statearr_22125_22153 = state_22097__$1;(statearr_22125_22153[2] = null);
(statearr_22125_22153[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22098 === 18))
{var inst_22068 = (state_22097[13]);var inst_22077 = cljs.core.first.call(null,inst_22068);var state_22097__$1 = state_22097;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_22097__$1,20,out,inst_22077);
} else
{if((state_val_22098 === 19))
{var inst_22083 = (state_22097[2]);var state_22097__$1 = state_22097;var statearr_22126_22154 = state_22097__$1;(statearr_22126_22154[2] = inst_22083);
(statearr_22126_22154[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22098 === 20))
{var inst_22068 = (state_22097[13]);var inst_22079 = (state_22097[2]);var inst_22080 = cljs.core.next.call(null,inst_22068);var inst_22054 = inst_22080;var inst_22055 = null;var inst_22056 = 0;var inst_22057 = 0;var state_22097__$1 = (function (){var statearr_22127 = state_22097;(statearr_22127[15] = inst_22079);
(statearr_22127[8] = inst_22057);
(statearr_22127[9] = inst_22056);
(statearr_22127[10] = inst_22054);
(statearr_22127[11] = inst_22055);
return statearr_22127;
})();var statearr_22128_22155 = state_22097__$1;(statearr_22128_22155[2] = null);
(statearr_22128_22155[1] = 8);
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
});return ((function (switch__17039__auto__){
return (function() {
var state_machine__17040__auto__ = null;
var state_machine__17040__auto____0 = (function (){var statearr_22132 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_22132[0] = state_machine__17040__auto__);
(statearr_22132[1] = 1);
return statearr_22132;
});
var state_machine__17040__auto____1 = (function (state_22097){while(true){
var ret_value__17041__auto__ = (function (){try{while(true){
var result__17042__auto__ = switch__17039__auto__.call(null,state_22097);if(cljs.core.keyword_identical_QMARK_.call(null,result__17042__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__17042__auto__;
}
break;
}
}catch (e22133){if((e22133 instanceof Object))
{var ex__17043__auto__ = e22133;var statearr_22134_22156 = state_22097;(statearr_22134_22156[5] = ex__17043__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22097);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e22133;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__17041__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__22157 = state_22097;
state_22097 = G__22157;
continue;
}
} else
{return ret_value__17041__auto__;
}
break;
}
});
state_machine__17040__auto__ = function(state_22097){
switch(arguments.length){
case 0:
return state_machine__17040__auto____0.call(this);
case 1:
return state_machine__17040__auto____1.call(this,state_22097);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__17040__auto____0;
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__17040__auto____1;
return state_machine__17040__auto__;
})()
;})(switch__17039__auto__))
})();var state__17056__auto__ = (function (){var statearr_22135 = f__17055__auto__.call(null);(statearr_22135[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__17054__auto__);
return statearr_22135;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__17056__auto__);
}));
return c__17054__auto__;
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
var pipe__3 = (function (from,to,close_QMARK_){var c__17054__auto___22238 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__17055__auto__ = (function (){var switch__17039__auto__ = (function (state_22217){var state_val_22218 = (state_22217[1]);if((state_val_22218 === 1))
{var state_22217__$1 = state_22217;var statearr_22219_22239 = state_22217__$1;(statearr_22219_22239[2] = null);
(statearr_22219_22239[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22218 === 2))
{var state_22217__$1 = state_22217;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22217__$1,4,from);
} else
{if((state_val_22218 === 3))
{var inst_22215 = (state_22217[2]);var state_22217__$1 = state_22217;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22217__$1,inst_22215);
} else
{if((state_val_22218 === 4))
{var inst_22200 = (state_22217[7]);var inst_22200__$1 = (state_22217[2]);var inst_22201 = (inst_22200__$1 == null);var state_22217__$1 = (function (){var statearr_22220 = state_22217;(statearr_22220[7] = inst_22200__$1);
return statearr_22220;
})();if(cljs.core.truth_(inst_22201))
{var statearr_22221_22240 = state_22217__$1;(statearr_22221_22240[1] = 5);
} else
{var statearr_22222_22241 = state_22217__$1;(statearr_22222_22241[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22218 === 5))
{var state_22217__$1 = state_22217;if(cljs.core.truth_(close_QMARK_))
{var statearr_22223_22242 = state_22217__$1;(statearr_22223_22242[1] = 8);
} else
{var statearr_22224_22243 = state_22217__$1;(statearr_22224_22243[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22218 === 6))
{var inst_22200 = (state_22217[7]);var state_22217__$1 = state_22217;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_22217__$1,11,to,inst_22200);
} else
{if((state_val_22218 === 7))
{var inst_22213 = (state_22217[2]);var state_22217__$1 = state_22217;var statearr_22225_22244 = state_22217__$1;(statearr_22225_22244[2] = inst_22213);
(statearr_22225_22244[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22218 === 8))
{var inst_22204 = cljs.core.async.close_BANG_.call(null,to);var state_22217__$1 = state_22217;var statearr_22226_22245 = state_22217__$1;(statearr_22226_22245[2] = inst_22204);
(statearr_22226_22245[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22218 === 9))
{var state_22217__$1 = state_22217;var statearr_22227_22246 = state_22217__$1;(statearr_22227_22246[2] = null);
(statearr_22227_22246[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22218 === 10))
{var inst_22207 = (state_22217[2]);var state_22217__$1 = state_22217;var statearr_22228_22247 = state_22217__$1;(statearr_22228_22247[2] = inst_22207);
(statearr_22228_22247[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22218 === 11))
{var inst_22210 = (state_22217[2]);var state_22217__$1 = (function (){var statearr_22229 = state_22217;(statearr_22229[8] = inst_22210);
return statearr_22229;
})();var statearr_22230_22248 = state_22217__$1;(statearr_22230_22248[2] = null);
(statearr_22230_22248[1] = 2);
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
});return ((function (switch__17039__auto__){
return (function() {
var state_machine__17040__auto__ = null;
var state_machine__17040__auto____0 = (function (){var statearr_22234 = [null,null,null,null,null,null,null,null,null];(statearr_22234[0] = state_machine__17040__auto__);
(statearr_22234[1] = 1);
return statearr_22234;
});
var state_machine__17040__auto____1 = (function (state_22217){while(true){
var ret_value__17041__auto__ = (function (){try{while(true){
var result__17042__auto__ = switch__17039__auto__.call(null,state_22217);if(cljs.core.keyword_identical_QMARK_.call(null,result__17042__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__17042__auto__;
}
break;
}
}catch (e22235){if((e22235 instanceof Object))
{var ex__17043__auto__ = e22235;var statearr_22236_22249 = state_22217;(statearr_22236_22249[5] = ex__17043__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22217);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e22235;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__17041__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__22250 = state_22217;
state_22217 = G__22250;
continue;
}
} else
{return ret_value__17041__auto__;
}
break;
}
});
state_machine__17040__auto__ = function(state_22217){
switch(arguments.length){
case 0:
return state_machine__17040__auto____0.call(this);
case 1:
return state_machine__17040__auto____1.call(this,state_22217);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__17040__auto____0;
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__17040__auto____1;
return state_machine__17040__auto__;
})()
;})(switch__17039__auto__))
})();var state__17056__auto__ = (function (){var statearr_22237 = f__17055__auto__.call(null);(statearr_22237[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__17054__auto___22238);
return statearr_22237;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__17056__auto__);
}));
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
var split__4 = (function (p,ch,t_buf_or_n,f_buf_or_n){var tc = cljs.core.async.chan.call(null,t_buf_or_n);var fc = cljs.core.async.chan.call(null,f_buf_or_n);var c__17054__auto___22337 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__17055__auto__ = (function (){var switch__17039__auto__ = (function (state_22315){var state_val_22316 = (state_22315[1]);if((state_val_22316 === 1))
{var state_22315__$1 = state_22315;var statearr_22317_22338 = state_22315__$1;(statearr_22317_22338[2] = null);
(statearr_22317_22338[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22316 === 2))
{var state_22315__$1 = state_22315;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22315__$1,4,ch);
} else
{if((state_val_22316 === 3))
{var inst_22313 = (state_22315[2]);var state_22315__$1 = state_22315;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22315__$1,inst_22313);
} else
{if((state_val_22316 === 4))
{var inst_22296 = (state_22315[7]);var inst_22296__$1 = (state_22315[2]);var inst_22297 = (inst_22296__$1 == null);var state_22315__$1 = (function (){var statearr_22318 = state_22315;(statearr_22318[7] = inst_22296__$1);
return statearr_22318;
})();if(cljs.core.truth_(inst_22297))
{var statearr_22319_22339 = state_22315__$1;(statearr_22319_22339[1] = 5);
} else
{var statearr_22320_22340 = state_22315__$1;(statearr_22320_22340[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22316 === 5))
{var inst_22299 = cljs.core.async.close_BANG_.call(null,tc);var inst_22300 = cljs.core.async.close_BANG_.call(null,fc);var state_22315__$1 = (function (){var statearr_22321 = state_22315;(statearr_22321[8] = inst_22299);
return statearr_22321;
})();var statearr_22322_22341 = state_22315__$1;(statearr_22322_22341[2] = inst_22300);
(statearr_22322_22341[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22316 === 6))
{var inst_22296 = (state_22315[7]);var inst_22302 = p.call(null,inst_22296);var state_22315__$1 = state_22315;if(cljs.core.truth_(inst_22302))
{var statearr_22323_22342 = state_22315__$1;(statearr_22323_22342[1] = 9);
} else
{var statearr_22324_22343 = state_22315__$1;(statearr_22324_22343[1] = 10);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22316 === 7))
{var inst_22311 = (state_22315[2]);var state_22315__$1 = state_22315;var statearr_22325_22344 = state_22315__$1;(statearr_22325_22344[2] = inst_22311);
(statearr_22325_22344[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22316 === 8))
{var inst_22308 = (state_22315[2]);var state_22315__$1 = (function (){var statearr_22326 = state_22315;(statearr_22326[9] = inst_22308);
return statearr_22326;
})();var statearr_22327_22345 = state_22315__$1;(statearr_22327_22345[2] = null);
(statearr_22327_22345[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22316 === 9))
{var state_22315__$1 = state_22315;var statearr_22328_22346 = state_22315__$1;(statearr_22328_22346[2] = tc);
(statearr_22328_22346[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22316 === 10))
{var state_22315__$1 = state_22315;var statearr_22329_22347 = state_22315__$1;(statearr_22329_22347[2] = fc);
(statearr_22329_22347[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22316 === 11))
{var inst_22296 = (state_22315[7]);var inst_22306 = (state_22315[2]);var state_22315__$1 = state_22315;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_22315__$1,8,inst_22306,inst_22296);
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
});return ((function (switch__17039__auto__){
return (function() {
var state_machine__17040__auto__ = null;
var state_machine__17040__auto____0 = (function (){var statearr_22333 = [null,null,null,null,null,null,null,null,null,null];(statearr_22333[0] = state_machine__17040__auto__);
(statearr_22333[1] = 1);
return statearr_22333;
});
var state_machine__17040__auto____1 = (function (state_22315){while(true){
var ret_value__17041__auto__ = (function (){try{while(true){
var result__17042__auto__ = switch__17039__auto__.call(null,state_22315);if(cljs.core.keyword_identical_QMARK_.call(null,result__17042__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__17042__auto__;
}
break;
}
}catch (e22334){if((e22334 instanceof Object))
{var ex__17043__auto__ = e22334;var statearr_22335_22348 = state_22315;(statearr_22335_22348[5] = ex__17043__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22315);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e22334;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__17041__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__22349 = state_22315;
state_22315 = G__22349;
continue;
}
} else
{return ret_value__17041__auto__;
}
break;
}
});
state_machine__17040__auto__ = function(state_22315){
switch(arguments.length){
case 0:
return state_machine__17040__auto____0.call(this);
case 1:
return state_machine__17040__auto____1.call(this,state_22315);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__17040__auto____0;
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__17040__auto____1;
return state_machine__17040__auto__;
})()
;})(switch__17039__auto__))
})();var state__17056__auto__ = (function (){var statearr_22336 = f__17055__auto__.call(null);(statearr_22336[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__17054__auto___22337);
return statearr_22336;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__17056__auto__);
}));
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
cljs.core.async.reduce = (function reduce(f,init,ch){var c__17054__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__17055__auto__ = (function (){var switch__17039__auto__ = (function (state_22396){var state_val_22397 = (state_22396[1]);if((state_val_22397 === 7))
{var inst_22392 = (state_22396[2]);var state_22396__$1 = state_22396;var statearr_22398_22414 = state_22396__$1;(statearr_22398_22414[2] = inst_22392);
(statearr_22398_22414[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22397 === 6))
{var inst_22385 = (state_22396[7]);var inst_22382 = (state_22396[8]);var inst_22389 = f.call(null,inst_22382,inst_22385);var inst_22382__$1 = inst_22389;var state_22396__$1 = (function (){var statearr_22399 = state_22396;(statearr_22399[8] = inst_22382__$1);
return statearr_22399;
})();var statearr_22400_22415 = state_22396__$1;(statearr_22400_22415[2] = null);
(statearr_22400_22415[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22397 === 5))
{var inst_22382 = (state_22396[8]);var state_22396__$1 = state_22396;var statearr_22401_22416 = state_22396__$1;(statearr_22401_22416[2] = inst_22382);
(statearr_22401_22416[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22397 === 4))
{var inst_22385 = (state_22396[7]);var inst_22385__$1 = (state_22396[2]);var inst_22386 = (inst_22385__$1 == null);var state_22396__$1 = (function (){var statearr_22402 = state_22396;(statearr_22402[7] = inst_22385__$1);
return statearr_22402;
})();if(cljs.core.truth_(inst_22386))
{var statearr_22403_22417 = state_22396__$1;(statearr_22403_22417[1] = 5);
} else
{var statearr_22404_22418 = state_22396__$1;(statearr_22404_22418[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22397 === 3))
{var inst_22394 = (state_22396[2]);var state_22396__$1 = state_22396;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22396__$1,inst_22394);
} else
{if((state_val_22397 === 2))
{var state_22396__$1 = state_22396;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22396__$1,4,ch);
} else
{if((state_val_22397 === 1))
{var inst_22382 = init;var state_22396__$1 = (function (){var statearr_22405 = state_22396;(statearr_22405[8] = inst_22382);
return statearr_22405;
})();var statearr_22406_22419 = state_22396__$1;(statearr_22406_22419[2] = null);
(statearr_22406_22419[1] = 2);
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
});return ((function (switch__17039__auto__){
return (function() {
var state_machine__17040__auto__ = null;
var state_machine__17040__auto____0 = (function (){var statearr_22410 = [null,null,null,null,null,null,null,null,null];(statearr_22410[0] = state_machine__17040__auto__);
(statearr_22410[1] = 1);
return statearr_22410;
});
var state_machine__17040__auto____1 = (function (state_22396){while(true){
var ret_value__17041__auto__ = (function (){try{while(true){
var result__17042__auto__ = switch__17039__auto__.call(null,state_22396);if(cljs.core.keyword_identical_QMARK_.call(null,result__17042__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__17042__auto__;
}
break;
}
}catch (e22411){if((e22411 instanceof Object))
{var ex__17043__auto__ = e22411;var statearr_22412_22420 = state_22396;(statearr_22412_22420[5] = ex__17043__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22396);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e22411;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__17041__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__22421 = state_22396;
state_22396 = G__22421;
continue;
}
} else
{return ret_value__17041__auto__;
}
break;
}
});
state_machine__17040__auto__ = function(state_22396){
switch(arguments.length){
case 0:
return state_machine__17040__auto____0.call(this);
case 1:
return state_machine__17040__auto____1.call(this,state_22396);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__17040__auto____0;
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__17040__auto____1;
return state_machine__17040__auto__;
})()
;})(switch__17039__auto__))
})();var state__17056__auto__ = (function (){var statearr_22413 = f__17055__auto__.call(null);(statearr_22413[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__17054__auto__);
return statearr_22413;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__17056__auto__);
}));
return c__17054__auto__;
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
var onto_chan__3 = (function (ch,coll,close_QMARK_){var c__17054__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__17055__auto__ = (function (){var switch__17039__auto__ = (function (state_22483){var state_val_22484 = (state_22483[1]);if((state_val_22484 === 1))
{var inst_22463 = cljs.core.seq.call(null,coll);var inst_22464 = inst_22463;var state_22483__$1 = (function (){var statearr_22485 = state_22483;(statearr_22485[7] = inst_22464);
return statearr_22485;
})();var statearr_22486_22504 = state_22483__$1;(statearr_22486_22504[2] = null);
(statearr_22486_22504[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22484 === 2))
{var inst_22464 = (state_22483[7]);var state_22483__$1 = state_22483;if(cljs.core.truth_(inst_22464))
{var statearr_22487_22505 = state_22483__$1;(statearr_22487_22505[1] = 4);
} else
{var statearr_22488_22506 = state_22483__$1;(statearr_22488_22506[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22484 === 3))
{var inst_22481 = (state_22483[2]);var state_22483__$1 = state_22483;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22483__$1,inst_22481);
} else
{if((state_val_22484 === 4))
{var inst_22464 = (state_22483[7]);var inst_22467 = cljs.core.first.call(null,inst_22464);var state_22483__$1 = state_22483;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_22483__$1,7,ch,inst_22467);
} else
{if((state_val_22484 === 5))
{var state_22483__$1 = state_22483;if(cljs.core.truth_(close_QMARK_))
{var statearr_22489_22507 = state_22483__$1;(statearr_22489_22507[1] = 8);
} else
{var statearr_22490_22508 = state_22483__$1;(statearr_22490_22508[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22484 === 6))
{var inst_22479 = (state_22483[2]);var state_22483__$1 = state_22483;var statearr_22491_22509 = state_22483__$1;(statearr_22491_22509[2] = inst_22479);
(statearr_22491_22509[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22484 === 7))
{var inst_22464 = (state_22483[7]);var inst_22469 = (state_22483[2]);var inst_22470 = cljs.core.next.call(null,inst_22464);var inst_22464__$1 = inst_22470;var state_22483__$1 = (function (){var statearr_22492 = state_22483;(statearr_22492[8] = inst_22469);
(statearr_22492[7] = inst_22464__$1);
return statearr_22492;
})();var statearr_22493_22510 = state_22483__$1;(statearr_22493_22510[2] = null);
(statearr_22493_22510[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22484 === 8))
{var inst_22474 = cljs.core.async.close_BANG_.call(null,ch);var state_22483__$1 = state_22483;var statearr_22494_22511 = state_22483__$1;(statearr_22494_22511[2] = inst_22474);
(statearr_22494_22511[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22484 === 9))
{var state_22483__$1 = state_22483;var statearr_22495_22512 = state_22483__$1;(statearr_22495_22512[2] = null);
(statearr_22495_22512[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22484 === 10))
{var inst_22477 = (state_22483[2]);var state_22483__$1 = state_22483;var statearr_22496_22513 = state_22483__$1;(statearr_22496_22513[2] = inst_22477);
(statearr_22496_22513[1] = 6);
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
});return ((function (switch__17039__auto__){
return (function() {
var state_machine__17040__auto__ = null;
var state_machine__17040__auto____0 = (function (){var statearr_22500 = [null,null,null,null,null,null,null,null,null];(statearr_22500[0] = state_machine__17040__auto__);
(statearr_22500[1] = 1);
return statearr_22500;
});
var state_machine__17040__auto____1 = (function (state_22483){while(true){
var ret_value__17041__auto__ = (function (){try{while(true){
var result__17042__auto__ = switch__17039__auto__.call(null,state_22483);if(cljs.core.keyword_identical_QMARK_.call(null,result__17042__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__17042__auto__;
}
break;
}
}catch (e22501){if((e22501 instanceof Object))
{var ex__17043__auto__ = e22501;var statearr_22502_22514 = state_22483;(statearr_22502_22514[5] = ex__17043__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22483);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e22501;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__17041__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__22515 = state_22483;
state_22483 = G__22515;
continue;
}
} else
{return ret_value__17041__auto__;
}
break;
}
});
state_machine__17040__auto__ = function(state_22483){
switch(arguments.length){
case 0:
return state_machine__17040__auto____0.call(this);
case 1:
return state_machine__17040__auto____1.call(this,state_22483);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__17040__auto____0;
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__17040__auto____1;
return state_machine__17040__auto__;
})()
;})(switch__17039__auto__))
})();var state__17056__auto__ = (function (){var statearr_22503 = f__17055__auto__.call(null);(statearr_22503[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__17054__auto__);
return statearr_22503;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__17056__auto__);
}));
return c__17054__auto__;
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
cljs.core.async.Mux = (function (){var obj22517 = {};return obj22517;
})();
cljs.core.async.muxch_STAR_ = (function muxch_STAR_(_){if((function (){var and__15212__auto__ = _;if(and__15212__auto__)
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1;
} else
{return and__15212__auto__;
}
})())
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else
{var x__15851__auto__ = (((_ == null))?null:_);return (function (){var or__15224__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
})().call(null,_);
}
});
cljs.core.async.Mult = (function (){var obj22519 = {};return obj22519;
})();
cljs.core.async.tap_STAR_ = (function tap_STAR_(m,ch,close_QMARK_){if((function (){var and__15212__auto__ = m;if(and__15212__auto__)
{return m.cljs$core$async$Mult$tap_STAR_$arity$3;
} else
{return and__15212__auto__;
}
})())
{return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else
{var x__15851__auto__ = (((m == null))?null:m);return (function (){var or__15224__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.tap_STAR_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
})().call(null,m,ch,close_QMARK_);
}
});
cljs.core.async.untap_STAR_ = (function untap_STAR_(m,ch){if((function (){var and__15212__auto__ = m;if(and__15212__auto__)
{return m.cljs$core$async$Mult$untap_STAR_$arity$2;
} else
{return and__15212__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else
{var x__15851__auto__ = (((m == null))?null:m);return (function (){var or__15224__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.untap_STAR_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.untap_all_STAR_ = (function untap_all_STAR_(m){if((function (){var and__15212__auto__ = m;if(and__15212__auto__)
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1;
} else
{return and__15212__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else
{var x__15851__auto__ = (((m == null))?null:m);return (function (){var or__15224__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
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
cljs.core.async.mult = (function mult(ch){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var m = (function (){if(typeof cljs.core.async.t22743 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t22743 = (function (cs,ch,mult,meta22744){
this.cs = cs;
this.ch = ch;
this.mult = mult;
this.meta22744 = meta22744;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t22743.cljs$lang$type = true;
cljs.core.async.t22743.cljs$lang$ctorStr = "cljs.core.async/t22743";
cljs.core.async.t22743.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t22743");
});})(cs))
;
cljs.core.async.t22743.prototype.cljs$core$async$Mult$ = true;
cljs.core.async.t22743.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$2,close_QMARK_){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$2,close_QMARK_);
return null;
});})(cs))
;
cljs.core.async.t22743.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$2){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$2);
return null;
});})(cs))
;
cljs.core.async.t22743.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return null;
});})(cs))
;
cljs.core.async.t22743.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t22743.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(cs))
;
cljs.core.async.t22743.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_22745){var self__ = this;
var _22745__$1 = this;return self__.meta22744;
});})(cs))
;
cljs.core.async.t22743.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_22745,meta22744__$1){var self__ = this;
var _22745__$1 = this;return (new cljs.core.async.t22743(self__.cs,self__.ch,self__.mult,meta22744__$1));
});})(cs))
;
cljs.core.async.__GT_t22743 = ((function (cs){
return (function __GT_t22743(cs__$1,ch__$1,mult__$1,meta22744){return (new cljs.core.async.t22743(cs__$1,ch__$1,mult__$1,meta22744));
});})(cs))
;
}
return (new cljs.core.async.t22743(cs,ch,mult,null));
})();var dchan = cljs.core.async.chan.call(null,1);var dctr = cljs.core.atom.call(null,null);var done = ((function (cs,m,dchan,dctr){
return (function (){if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === 0))
{return cljs.core.async.put_BANG_.call(null,dchan,true);
} else
{return null;
}
});})(cs,m,dchan,dctr))
;var c__17054__auto___22966 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__17055__auto__ = (function (){var switch__17039__auto__ = (function (state_22880){var state_val_22881 = (state_22880[1]);if((state_val_22881 === 32))
{var inst_22824 = (state_22880[7]);var inst_22748 = (state_22880[8]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_22880,31,Object,null,30);var inst_22831 = cljs.core.async.put_BANG_.call(null,inst_22824,inst_22748,done);var state_22880__$1 = state_22880;var statearr_22882_22967 = state_22880__$1;(statearr_22882_22967[2] = inst_22831);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22880__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 1))
{var state_22880__$1 = state_22880;var statearr_22883_22968 = state_22880__$1;(statearr_22883_22968[2] = null);
(statearr_22883_22968[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 33))
{var inst_22837 = (state_22880[9]);var inst_22839 = cljs.core.chunked_seq_QMARK_.call(null,inst_22837);var state_22880__$1 = state_22880;if(inst_22839)
{var statearr_22884_22969 = state_22880__$1;(statearr_22884_22969[1] = 36);
} else
{var statearr_22885_22970 = state_22880__$1;(statearr_22885_22970[1] = 37);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 2))
{var state_22880__$1 = state_22880;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22880__$1,4,ch);
} else
{if((state_val_22881 === 34))
{var state_22880__$1 = state_22880;var statearr_22886_22971 = state_22880__$1;(statearr_22886_22971[2] = null);
(statearr_22886_22971[1] = 35);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 3))
{var inst_22878 = (state_22880[2]);var state_22880__$1 = state_22880;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22880__$1,inst_22878);
} else
{if((state_val_22881 === 35))
{var inst_22862 = (state_22880[2]);var state_22880__$1 = state_22880;var statearr_22887_22972 = state_22880__$1;(statearr_22887_22972[2] = inst_22862);
(statearr_22887_22972[1] = 29);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 4))
{var inst_22748 = (state_22880[8]);var inst_22748__$1 = (state_22880[2]);var inst_22749 = (inst_22748__$1 == null);var state_22880__$1 = (function (){var statearr_22888 = state_22880;(statearr_22888[8] = inst_22748__$1);
return statearr_22888;
})();if(cljs.core.truth_(inst_22749))
{var statearr_22889_22973 = state_22880__$1;(statearr_22889_22973[1] = 5);
} else
{var statearr_22890_22974 = state_22880__$1;(statearr_22890_22974[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 36))
{var inst_22837 = (state_22880[9]);var inst_22841 = cljs.core.chunk_first.call(null,inst_22837);var inst_22842 = cljs.core.chunk_rest.call(null,inst_22837);var inst_22843 = cljs.core.count.call(null,inst_22841);var inst_22816 = inst_22842;var inst_22817 = inst_22841;var inst_22818 = inst_22843;var inst_22819 = 0;var state_22880__$1 = (function (){var statearr_22891 = state_22880;(statearr_22891[10] = inst_22818);
(statearr_22891[11] = inst_22819);
(statearr_22891[12] = inst_22816);
(statearr_22891[13] = inst_22817);
return statearr_22891;
})();var statearr_22892_22975 = state_22880__$1;(statearr_22892_22975[2] = null);
(statearr_22892_22975[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 5))
{var inst_22755 = cljs.core.deref.call(null,cs);var inst_22756 = cljs.core.seq.call(null,inst_22755);var inst_22757 = inst_22756;var inst_22758 = null;var inst_22759 = 0;var inst_22760 = 0;var state_22880__$1 = (function (){var statearr_22893 = state_22880;(statearr_22893[14] = inst_22758);
(statearr_22893[15] = inst_22757);
(statearr_22893[16] = inst_22759);
(statearr_22893[17] = inst_22760);
return statearr_22893;
})();var statearr_22894_22976 = state_22880__$1;(statearr_22894_22976[2] = null);
(statearr_22894_22976[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 37))
{var inst_22837 = (state_22880[9]);var inst_22846 = cljs.core.first.call(null,inst_22837);var state_22880__$1 = (function (){var statearr_22895 = state_22880;(statearr_22895[18] = inst_22846);
return statearr_22895;
})();var statearr_22896_22977 = state_22880__$1;(statearr_22896_22977[2] = null);
(statearr_22896_22977[1] = 41);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 6))
{var inst_22808 = (state_22880[19]);var inst_22807 = cljs.core.deref.call(null,cs);var inst_22808__$1 = cljs.core.keys.call(null,inst_22807);var inst_22809 = cljs.core.count.call(null,inst_22808__$1);var inst_22810 = cljs.core.reset_BANG_.call(null,dctr,inst_22809);var inst_22815 = cljs.core.seq.call(null,inst_22808__$1);var inst_22816 = inst_22815;var inst_22817 = null;var inst_22818 = 0;var inst_22819 = 0;var state_22880__$1 = (function (){var statearr_22897 = state_22880;(statearr_22897[19] = inst_22808__$1);
(statearr_22897[20] = inst_22810);
(statearr_22897[10] = inst_22818);
(statearr_22897[11] = inst_22819);
(statearr_22897[12] = inst_22816);
(statearr_22897[13] = inst_22817);
return statearr_22897;
})();var statearr_22898_22978 = state_22880__$1;(statearr_22898_22978[2] = null);
(statearr_22898_22978[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 38))
{var inst_22859 = (state_22880[2]);var state_22880__$1 = state_22880;var statearr_22899_22979 = state_22880__$1;(statearr_22899_22979[2] = inst_22859);
(statearr_22899_22979[1] = 35);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 7))
{var inst_22876 = (state_22880[2]);var state_22880__$1 = state_22880;var statearr_22900_22980 = state_22880__$1;(statearr_22900_22980[2] = inst_22876);
(statearr_22900_22980[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 39))
{var inst_22837 = (state_22880[9]);var inst_22855 = (state_22880[2]);var inst_22856 = cljs.core.next.call(null,inst_22837);var inst_22816 = inst_22856;var inst_22817 = null;var inst_22818 = 0;var inst_22819 = 0;var state_22880__$1 = (function (){var statearr_22901 = state_22880;(statearr_22901[21] = inst_22855);
(statearr_22901[10] = inst_22818);
(statearr_22901[11] = inst_22819);
(statearr_22901[12] = inst_22816);
(statearr_22901[13] = inst_22817);
return statearr_22901;
})();var statearr_22902_22981 = state_22880__$1;(statearr_22902_22981[2] = null);
(statearr_22902_22981[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 8))
{var inst_22759 = (state_22880[16]);var inst_22760 = (state_22880[17]);var inst_22762 = (inst_22760 < inst_22759);var inst_22763 = inst_22762;var state_22880__$1 = state_22880;if(cljs.core.truth_(inst_22763))
{var statearr_22903_22982 = state_22880__$1;(statearr_22903_22982[1] = 10);
} else
{var statearr_22904_22983 = state_22880__$1;(statearr_22904_22983[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 40))
{var inst_22846 = (state_22880[18]);var inst_22847 = (state_22880[2]);var inst_22848 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var inst_22849 = cljs.core.async.untap_STAR_.call(null,m,inst_22846);var state_22880__$1 = (function (){var statearr_22905 = state_22880;(statearr_22905[22] = inst_22848);
(statearr_22905[23] = inst_22847);
return statearr_22905;
})();var statearr_22906_22984 = state_22880__$1;(statearr_22906_22984[2] = inst_22849);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22880__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 9))
{var inst_22805 = (state_22880[2]);var state_22880__$1 = state_22880;var statearr_22907_22985 = state_22880__$1;(statearr_22907_22985[2] = inst_22805);
(statearr_22907_22985[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 41))
{var inst_22846 = (state_22880[18]);var inst_22748 = (state_22880[8]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_22880,40,Object,null,39);var inst_22853 = cljs.core.async.put_BANG_.call(null,inst_22846,inst_22748,done);var state_22880__$1 = state_22880;var statearr_22908_22986 = state_22880__$1;(statearr_22908_22986[2] = inst_22853);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22880__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 10))
{var inst_22758 = (state_22880[14]);var inst_22760 = (state_22880[17]);var inst_22766 = cljs.core._nth.call(null,inst_22758,inst_22760);var inst_22767 = cljs.core.nth.call(null,inst_22766,0,null);var inst_22768 = cljs.core.nth.call(null,inst_22766,1,null);var state_22880__$1 = (function (){var statearr_22909 = state_22880;(statearr_22909[24] = inst_22767);
return statearr_22909;
})();if(cljs.core.truth_(inst_22768))
{var statearr_22910_22987 = state_22880__$1;(statearr_22910_22987[1] = 13);
} else
{var statearr_22911_22988 = state_22880__$1;(statearr_22911_22988[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 42))
{var state_22880__$1 = state_22880;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22880__$1,45,dchan);
} else
{if((state_val_22881 === 11))
{var inst_22757 = (state_22880[15]);var inst_22777 = (state_22880[25]);var inst_22777__$1 = cljs.core.seq.call(null,inst_22757);var state_22880__$1 = (function (){var statearr_22912 = state_22880;(statearr_22912[25] = inst_22777__$1);
return statearr_22912;
})();if(inst_22777__$1)
{var statearr_22913_22989 = state_22880__$1;(statearr_22913_22989[1] = 16);
} else
{var statearr_22914_22990 = state_22880__$1;(statearr_22914_22990[1] = 17);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 43))
{var state_22880__$1 = state_22880;var statearr_22915_22991 = state_22880__$1;(statearr_22915_22991[2] = null);
(statearr_22915_22991[1] = 44);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 12))
{var inst_22803 = (state_22880[2]);var state_22880__$1 = state_22880;var statearr_22916_22992 = state_22880__$1;(statearr_22916_22992[2] = inst_22803);
(statearr_22916_22992[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 44))
{var inst_22873 = (state_22880[2]);var state_22880__$1 = (function (){var statearr_22917 = state_22880;(statearr_22917[26] = inst_22873);
return statearr_22917;
})();var statearr_22918_22993 = state_22880__$1;(statearr_22918_22993[2] = null);
(statearr_22918_22993[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 13))
{var inst_22767 = (state_22880[24]);var inst_22770 = cljs.core.async.close_BANG_.call(null,inst_22767);var state_22880__$1 = state_22880;var statearr_22919_22994 = state_22880__$1;(statearr_22919_22994[2] = inst_22770);
(statearr_22919_22994[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 45))
{var inst_22870 = (state_22880[2]);var state_22880__$1 = state_22880;var statearr_22923_22995 = state_22880__$1;(statearr_22923_22995[2] = inst_22870);
(statearr_22923_22995[1] = 44);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 14))
{var state_22880__$1 = state_22880;var statearr_22924_22996 = state_22880__$1;(statearr_22924_22996[2] = null);
(statearr_22924_22996[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 15))
{var inst_22758 = (state_22880[14]);var inst_22757 = (state_22880[15]);var inst_22759 = (state_22880[16]);var inst_22760 = (state_22880[17]);var inst_22773 = (state_22880[2]);var inst_22774 = (inst_22760 + 1);var tmp22920 = inst_22758;var tmp22921 = inst_22757;var tmp22922 = inst_22759;var inst_22757__$1 = tmp22921;var inst_22758__$1 = tmp22920;var inst_22759__$1 = tmp22922;var inst_22760__$1 = inst_22774;var state_22880__$1 = (function (){var statearr_22925 = state_22880;(statearr_22925[14] = inst_22758__$1);
(statearr_22925[15] = inst_22757__$1);
(statearr_22925[16] = inst_22759__$1);
(statearr_22925[27] = inst_22773);
(statearr_22925[17] = inst_22760__$1);
return statearr_22925;
})();var statearr_22926_22997 = state_22880__$1;(statearr_22926_22997[2] = null);
(statearr_22926_22997[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 16))
{var inst_22777 = (state_22880[25]);var inst_22779 = cljs.core.chunked_seq_QMARK_.call(null,inst_22777);var state_22880__$1 = state_22880;if(inst_22779)
{var statearr_22927_22998 = state_22880__$1;(statearr_22927_22998[1] = 19);
} else
{var statearr_22928_22999 = state_22880__$1;(statearr_22928_22999[1] = 20);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 17))
{var state_22880__$1 = state_22880;var statearr_22929_23000 = state_22880__$1;(statearr_22929_23000[2] = null);
(statearr_22929_23000[1] = 18);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 18))
{var inst_22801 = (state_22880[2]);var state_22880__$1 = state_22880;var statearr_22930_23001 = state_22880__$1;(statearr_22930_23001[2] = inst_22801);
(statearr_22930_23001[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 19))
{var inst_22777 = (state_22880[25]);var inst_22781 = cljs.core.chunk_first.call(null,inst_22777);var inst_22782 = cljs.core.chunk_rest.call(null,inst_22777);var inst_22783 = cljs.core.count.call(null,inst_22781);var inst_22757 = inst_22782;var inst_22758 = inst_22781;var inst_22759 = inst_22783;var inst_22760 = 0;var state_22880__$1 = (function (){var statearr_22931 = state_22880;(statearr_22931[14] = inst_22758);
(statearr_22931[15] = inst_22757);
(statearr_22931[16] = inst_22759);
(statearr_22931[17] = inst_22760);
return statearr_22931;
})();var statearr_22932_23002 = state_22880__$1;(statearr_22932_23002[2] = null);
(statearr_22932_23002[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 20))
{var inst_22777 = (state_22880[25]);var inst_22787 = cljs.core.first.call(null,inst_22777);var inst_22788 = cljs.core.nth.call(null,inst_22787,0,null);var inst_22789 = cljs.core.nth.call(null,inst_22787,1,null);var state_22880__$1 = (function (){var statearr_22933 = state_22880;(statearr_22933[28] = inst_22788);
return statearr_22933;
})();if(cljs.core.truth_(inst_22789))
{var statearr_22934_23003 = state_22880__$1;(statearr_22934_23003[1] = 22);
} else
{var statearr_22935_23004 = state_22880__$1;(statearr_22935_23004[1] = 23);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 21))
{var inst_22798 = (state_22880[2]);var state_22880__$1 = state_22880;var statearr_22936_23005 = state_22880__$1;(statearr_22936_23005[2] = inst_22798);
(statearr_22936_23005[1] = 18);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 22))
{var inst_22788 = (state_22880[28]);var inst_22791 = cljs.core.async.close_BANG_.call(null,inst_22788);var state_22880__$1 = state_22880;var statearr_22937_23006 = state_22880__$1;(statearr_22937_23006[2] = inst_22791);
(statearr_22937_23006[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 23))
{var state_22880__$1 = state_22880;var statearr_22938_23007 = state_22880__$1;(statearr_22938_23007[2] = null);
(statearr_22938_23007[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 24))
{var inst_22777 = (state_22880[25]);var inst_22794 = (state_22880[2]);var inst_22795 = cljs.core.next.call(null,inst_22777);var inst_22757 = inst_22795;var inst_22758 = null;var inst_22759 = 0;var inst_22760 = 0;var state_22880__$1 = (function (){var statearr_22939 = state_22880;(statearr_22939[14] = inst_22758);
(statearr_22939[15] = inst_22757);
(statearr_22939[16] = inst_22759);
(statearr_22939[29] = inst_22794);
(statearr_22939[17] = inst_22760);
return statearr_22939;
})();var statearr_22940_23008 = state_22880__$1;(statearr_22940_23008[2] = null);
(statearr_22940_23008[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 25))
{var inst_22818 = (state_22880[10]);var inst_22819 = (state_22880[11]);var inst_22821 = (inst_22819 < inst_22818);var inst_22822 = inst_22821;var state_22880__$1 = state_22880;if(cljs.core.truth_(inst_22822))
{var statearr_22941_23009 = state_22880__$1;(statearr_22941_23009[1] = 27);
} else
{var statearr_22942_23010 = state_22880__$1;(statearr_22942_23010[1] = 28);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 26))
{var inst_22808 = (state_22880[19]);var inst_22866 = (state_22880[2]);var inst_22867 = cljs.core.seq.call(null,inst_22808);var state_22880__$1 = (function (){var statearr_22943 = state_22880;(statearr_22943[30] = inst_22866);
return statearr_22943;
})();if(inst_22867)
{var statearr_22944_23011 = state_22880__$1;(statearr_22944_23011[1] = 42);
} else
{var statearr_22945_23012 = state_22880__$1;(statearr_22945_23012[1] = 43);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 27))
{var inst_22819 = (state_22880[11]);var inst_22817 = (state_22880[13]);var inst_22824 = cljs.core._nth.call(null,inst_22817,inst_22819);var state_22880__$1 = (function (){var statearr_22946 = state_22880;(statearr_22946[7] = inst_22824);
return statearr_22946;
})();var statearr_22947_23013 = state_22880__$1;(statearr_22947_23013[2] = null);
(statearr_22947_23013[1] = 32);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 28))
{var inst_22837 = (state_22880[9]);var inst_22816 = (state_22880[12]);var inst_22837__$1 = cljs.core.seq.call(null,inst_22816);var state_22880__$1 = (function (){var statearr_22951 = state_22880;(statearr_22951[9] = inst_22837__$1);
return statearr_22951;
})();if(inst_22837__$1)
{var statearr_22952_23014 = state_22880__$1;(statearr_22952_23014[1] = 33);
} else
{var statearr_22953_23015 = state_22880__$1;(statearr_22953_23015[1] = 34);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 29))
{var inst_22864 = (state_22880[2]);var state_22880__$1 = state_22880;var statearr_22954_23016 = state_22880__$1;(statearr_22954_23016[2] = inst_22864);
(statearr_22954_23016[1] = 26);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 30))
{var inst_22818 = (state_22880[10]);var inst_22819 = (state_22880[11]);var inst_22816 = (state_22880[12]);var inst_22817 = (state_22880[13]);var inst_22833 = (state_22880[2]);var inst_22834 = (inst_22819 + 1);var tmp22948 = inst_22818;var tmp22949 = inst_22816;var tmp22950 = inst_22817;var inst_22816__$1 = tmp22949;var inst_22817__$1 = tmp22950;var inst_22818__$1 = tmp22948;var inst_22819__$1 = inst_22834;var state_22880__$1 = (function (){var statearr_22955 = state_22880;(statearr_22955[10] = inst_22818__$1);
(statearr_22955[11] = inst_22819__$1);
(statearr_22955[12] = inst_22816__$1);
(statearr_22955[13] = inst_22817__$1);
(statearr_22955[31] = inst_22833);
return statearr_22955;
})();var statearr_22956_23017 = state_22880__$1;(statearr_22956_23017[2] = null);
(statearr_22956_23017[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_22881 === 31))
{var inst_22824 = (state_22880[7]);var inst_22825 = (state_22880[2]);var inst_22826 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var inst_22827 = cljs.core.async.untap_STAR_.call(null,m,inst_22824);var state_22880__$1 = (function (){var statearr_22957 = state_22880;(statearr_22957[32] = inst_22826);
(statearr_22957[33] = inst_22825);
return statearr_22957;
})();var statearr_22958_23018 = state_22880__$1;(statearr_22958_23018[2] = inst_22827);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22880__$1);
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
});return ((function (switch__17039__auto__){
return (function() {
var state_machine__17040__auto__ = null;
var state_machine__17040__auto____0 = (function (){var statearr_22962 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_22962[0] = state_machine__17040__auto__);
(statearr_22962[1] = 1);
return statearr_22962;
});
var state_machine__17040__auto____1 = (function (state_22880){while(true){
var ret_value__17041__auto__ = (function (){try{while(true){
var result__17042__auto__ = switch__17039__auto__.call(null,state_22880);if(cljs.core.keyword_identical_QMARK_.call(null,result__17042__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__17042__auto__;
}
break;
}
}catch (e22963){if((e22963 instanceof Object))
{var ex__17043__auto__ = e22963;var statearr_22964_23019 = state_22880;(statearr_22964_23019[5] = ex__17043__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22880);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e22963;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__17041__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__23020 = state_22880;
state_22880 = G__23020;
continue;
}
} else
{return ret_value__17041__auto__;
}
break;
}
});
state_machine__17040__auto__ = function(state_22880){
switch(arguments.length){
case 0:
return state_machine__17040__auto____0.call(this);
case 1:
return state_machine__17040__auto____1.call(this,state_22880);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__17040__auto____0;
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__17040__auto____1;
return state_machine__17040__auto__;
})()
;})(switch__17039__auto__))
})();var state__17056__auto__ = (function (){var statearr_22965 = f__17055__auto__.call(null);(statearr_22965[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__17054__auto___22966);
return statearr_22965;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__17056__auto__);
}));
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
cljs.core.async.Mix = (function (){var obj23022 = {};return obj23022;
})();
cljs.core.async.admix_STAR_ = (function admix_STAR_(m,ch){if((function (){var and__15212__auto__ = m;if(and__15212__auto__)
{return m.cljs$core$async$Mix$admix_STAR_$arity$2;
} else
{return and__15212__auto__;
}
})())
{return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else
{var x__15851__auto__ = (((m == null))?null:m);return (function (){var or__15224__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.admix_STAR_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_STAR_ = (function unmix_STAR_(m,ch){if((function (){var and__15212__auto__ = m;if(and__15212__auto__)
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2;
} else
{return and__15212__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else
{var x__15851__auto__ = (((m == null))?null:m);return (function (){var or__15224__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_all_STAR_ = (function unmix_all_STAR_(m){if((function (){var and__15212__auto__ = m;if(and__15212__auto__)
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1;
} else
{return and__15212__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else
{var x__15851__auto__ = (((m == null))?null:m);return (function (){var or__15224__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
})().call(null,m);
}
});
cljs.core.async.toggle_STAR_ = (function toggle_STAR_(m,state_map){if((function (){var and__15212__auto__ = m;if(and__15212__auto__)
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2;
} else
{return and__15212__auto__;
}
})())
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else
{var x__15851__auto__ = (((m == null))?null:m);return (function (){var or__15224__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
})().call(null,m,state_map);
}
});
cljs.core.async.solo_mode_STAR_ = (function solo_mode_STAR_(m,mode){if((function (){var and__15212__auto__ = m;if(and__15212__auto__)
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2;
} else
{return and__15212__auto__;
}
})())
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else
{var x__15851__auto__ = (((m == null))?null:m);return (function (){var or__15224__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
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
;var m = (function (){if(typeof cljs.core.async.t23132 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t23132 = (function (pick,out,attrs,cs,calc_state,solo_modes,mix,changed,change,solo_mode,meta23133){
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
this.meta23133 = meta23133;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t23132.cljs$lang$type = true;
cljs.core.async.t23132.cljs$lang$ctorStr = "cljs.core.async/t23132";
cljs.core.async.t23132.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t23132");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t23132.prototype.cljs$core$async$Mix$ = true;
cljs.core.async.t23132.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t23132.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t23132.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t23132.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t23132.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.solo_modes.call(null,mode)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",-1162732933,null),new cljs.core.Symbol(null,"mode","mode",-1637174436,null))))].join('')));
}
cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t23132.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t23132.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t23132.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_23134){var self__ = this;
var _23134__$1 = this;return self__.meta23133;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t23132.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_23134,meta23133__$1){var self__ = this;
var _23134__$1 = this;return (new cljs.core.async.t23132(self__.pick,self__.out,self__.attrs,self__.cs,self__.calc_state,self__.solo_modes,self__.mix,self__.changed,self__.change,self__.solo_mode,meta23133__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.__GT_t23132 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function __GT_t23132(pick__$1,out__$1,attrs__$1,cs__$1,calc_state__$1,solo_modes__$1,mix__$1,changed__$1,change__$1,solo_mode__$1,meta23133){return (new cljs.core.async.t23132(pick__$1,out__$1,attrs__$1,cs__$1,calc_state__$1,solo_modes__$1,mix__$1,changed__$1,change__$1,solo_mode__$1,meta23133));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
}
return (new cljs.core.async.t23132(pick,out,attrs,cs,calc_state,solo_modes,mix,changed,change,solo_mode,null));
})();var c__17054__auto___23241 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__17055__auto__ = (function (){var switch__17039__auto__ = (function (state_23199){var state_val_23200 = (state_23199[1]);if((state_val_23200 === 1))
{var inst_23138 = (state_23199[7]);var inst_23138__$1 = calc_state.call(null);var inst_23139 = cljs.core.seq_QMARK_.call(null,inst_23138__$1);var state_23199__$1 = (function (){var statearr_23201 = state_23199;(statearr_23201[7] = inst_23138__$1);
return statearr_23201;
})();if(inst_23139)
{var statearr_23202_23242 = state_23199__$1;(statearr_23202_23242[1] = 2);
} else
{var statearr_23203_23243 = state_23199__$1;(statearr_23203_23243[1] = 3);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 2))
{var inst_23138 = (state_23199[7]);var inst_23141 = cljs.core.apply.call(null,cljs.core.hash_map,inst_23138);var state_23199__$1 = state_23199;var statearr_23204_23244 = state_23199__$1;(statearr_23204_23244[2] = inst_23141);
(statearr_23204_23244[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 3))
{var inst_23138 = (state_23199[7]);var state_23199__$1 = state_23199;var statearr_23205_23245 = state_23199__$1;(statearr_23205_23245[2] = inst_23138);
(statearr_23205_23245[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 4))
{var inst_23138 = (state_23199[7]);var inst_23144 = (state_23199[2]);var inst_23145 = cljs.core.get.call(null,inst_23144,new cljs.core.Keyword(null,"reads","reads",1122290959));var inst_23146 = cljs.core.get.call(null,inst_23144,new cljs.core.Keyword(null,"mutes","mutes",1118168300));var inst_23147 = cljs.core.get.call(null,inst_23144,new cljs.core.Keyword(null,"solos","solos",1123523302));var inst_23148 = inst_23138;var state_23199__$1 = (function (){var statearr_23206 = state_23199;(statearr_23206[8] = inst_23148);
(statearr_23206[9] = inst_23147);
(statearr_23206[10] = inst_23146);
(statearr_23206[11] = inst_23145);
return statearr_23206;
})();var statearr_23207_23246 = state_23199__$1;(statearr_23207_23246[2] = null);
(statearr_23207_23246[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 5))
{var inst_23148 = (state_23199[8]);var inst_23151 = cljs.core.seq_QMARK_.call(null,inst_23148);var state_23199__$1 = state_23199;if(inst_23151)
{var statearr_23208_23247 = state_23199__$1;(statearr_23208_23247[1] = 7);
} else
{var statearr_23209_23248 = state_23199__$1;(statearr_23209_23248[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 6))
{var inst_23197 = (state_23199[2]);var state_23199__$1 = state_23199;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23199__$1,inst_23197);
} else
{if((state_val_23200 === 7))
{var inst_23148 = (state_23199[8]);var inst_23153 = cljs.core.apply.call(null,cljs.core.hash_map,inst_23148);var state_23199__$1 = state_23199;var statearr_23210_23249 = state_23199__$1;(statearr_23210_23249[2] = inst_23153);
(statearr_23210_23249[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 8))
{var inst_23148 = (state_23199[8]);var state_23199__$1 = state_23199;var statearr_23211_23250 = state_23199__$1;(statearr_23211_23250[2] = inst_23148);
(statearr_23211_23250[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 9))
{var inst_23156 = (state_23199[12]);var inst_23156__$1 = (state_23199[2]);var inst_23157 = cljs.core.get.call(null,inst_23156__$1,new cljs.core.Keyword(null,"reads","reads",1122290959));var inst_23158 = cljs.core.get.call(null,inst_23156__$1,new cljs.core.Keyword(null,"mutes","mutes",1118168300));var inst_23159 = cljs.core.get.call(null,inst_23156__$1,new cljs.core.Keyword(null,"solos","solos",1123523302));var state_23199__$1 = (function (){var statearr_23212 = state_23199;(statearr_23212[13] = inst_23159);
(statearr_23212[14] = inst_23158);
(statearr_23212[12] = inst_23156__$1);
return statearr_23212;
})();return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_23199__$1,10,inst_23157);
} else
{if((state_val_23200 === 10))
{var inst_23163 = (state_23199[15]);var inst_23164 = (state_23199[16]);var inst_23162 = (state_23199[2]);var inst_23163__$1 = cljs.core.nth.call(null,inst_23162,0,null);var inst_23164__$1 = cljs.core.nth.call(null,inst_23162,1,null);var inst_23165 = (inst_23163__$1 == null);var inst_23166 = cljs.core._EQ_.call(null,inst_23164__$1,change);var inst_23167 = (inst_23165) || (inst_23166);var state_23199__$1 = (function (){var statearr_23213 = state_23199;(statearr_23213[15] = inst_23163__$1);
(statearr_23213[16] = inst_23164__$1);
return statearr_23213;
})();if(cljs.core.truth_(inst_23167))
{var statearr_23214_23251 = state_23199__$1;(statearr_23214_23251[1] = 11);
} else
{var statearr_23215_23252 = state_23199__$1;(statearr_23215_23252[1] = 12);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 11))
{var inst_23163 = (state_23199[15]);var inst_23169 = (inst_23163 == null);var state_23199__$1 = state_23199;if(cljs.core.truth_(inst_23169))
{var statearr_23216_23253 = state_23199__$1;(statearr_23216_23253[1] = 14);
} else
{var statearr_23217_23254 = state_23199__$1;(statearr_23217_23254[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 12))
{var inst_23164 = (state_23199[16]);var inst_23159 = (state_23199[13]);var inst_23178 = (state_23199[17]);var inst_23178__$1 = inst_23159.call(null,inst_23164);var state_23199__$1 = (function (){var statearr_23218 = state_23199;(statearr_23218[17] = inst_23178__$1);
return statearr_23218;
})();if(cljs.core.truth_(inst_23178__$1))
{var statearr_23219_23255 = state_23199__$1;(statearr_23219_23255[1] = 17);
} else
{var statearr_23220_23256 = state_23199__$1;(statearr_23220_23256[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 13))
{var inst_23195 = (state_23199[2]);var state_23199__$1 = state_23199;var statearr_23221_23257 = state_23199__$1;(statearr_23221_23257[2] = inst_23195);
(statearr_23221_23257[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 14))
{var inst_23164 = (state_23199[16]);var inst_23171 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_23164);var state_23199__$1 = state_23199;var statearr_23222_23258 = state_23199__$1;(statearr_23222_23258[2] = inst_23171);
(statearr_23222_23258[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 15))
{var state_23199__$1 = state_23199;var statearr_23223_23259 = state_23199__$1;(statearr_23223_23259[2] = null);
(statearr_23223_23259[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 16))
{var inst_23174 = (state_23199[2]);var inst_23175 = calc_state.call(null);var inst_23148 = inst_23175;var state_23199__$1 = (function (){var statearr_23224 = state_23199;(statearr_23224[18] = inst_23174);
(statearr_23224[8] = inst_23148);
return statearr_23224;
})();var statearr_23225_23260 = state_23199__$1;(statearr_23225_23260[2] = null);
(statearr_23225_23260[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 17))
{var inst_23178 = (state_23199[17]);var state_23199__$1 = state_23199;var statearr_23226_23261 = state_23199__$1;(statearr_23226_23261[2] = inst_23178);
(statearr_23226_23261[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 18))
{var inst_23164 = (state_23199[16]);var inst_23159 = (state_23199[13]);var inst_23158 = (state_23199[14]);var inst_23181 = cljs.core.empty_QMARK_.call(null,inst_23159);var inst_23182 = inst_23158.call(null,inst_23164);var inst_23183 = cljs.core.not.call(null,inst_23182);var inst_23184 = (inst_23181) && (inst_23183);var state_23199__$1 = state_23199;var statearr_23227_23262 = state_23199__$1;(statearr_23227_23262[2] = inst_23184);
(statearr_23227_23262[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 19))
{var inst_23186 = (state_23199[2]);var state_23199__$1 = state_23199;if(cljs.core.truth_(inst_23186))
{var statearr_23228_23263 = state_23199__$1;(statearr_23228_23263[1] = 20);
} else
{var statearr_23229_23264 = state_23199__$1;(statearr_23229_23264[1] = 21);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 20))
{var inst_23163 = (state_23199[15]);var state_23199__$1 = state_23199;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23199__$1,23,out,inst_23163);
} else
{if((state_val_23200 === 21))
{var state_23199__$1 = state_23199;var statearr_23230_23265 = state_23199__$1;(statearr_23230_23265[2] = null);
(statearr_23230_23265[1] = 22);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 22))
{var inst_23156 = (state_23199[12]);var inst_23192 = (state_23199[2]);var inst_23148 = inst_23156;var state_23199__$1 = (function (){var statearr_23231 = state_23199;(statearr_23231[19] = inst_23192);
(statearr_23231[8] = inst_23148);
return statearr_23231;
})();var statearr_23232_23266 = state_23199__$1;(statearr_23232_23266[2] = null);
(statearr_23232_23266[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23200 === 23))
{var inst_23189 = (state_23199[2]);var state_23199__$1 = state_23199;var statearr_23233_23267 = state_23199__$1;(statearr_23233_23267[2] = inst_23189);
(statearr_23233_23267[1] = 22);
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
});return ((function (switch__17039__auto__){
return (function() {
var state_machine__17040__auto__ = null;
var state_machine__17040__auto____0 = (function (){var statearr_23237 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_23237[0] = state_machine__17040__auto__);
(statearr_23237[1] = 1);
return statearr_23237;
});
var state_machine__17040__auto____1 = (function (state_23199){while(true){
var ret_value__17041__auto__ = (function (){try{while(true){
var result__17042__auto__ = switch__17039__auto__.call(null,state_23199);if(cljs.core.keyword_identical_QMARK_.call(null,result__17042__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__17042__auto__;
}
break;
}
}catch (e23238){if((e23238 instanceof Object))
{var ex__17043__auto__ = e23238;var statearr_23239_23268 = state_23199;(statearr_23239_23268[5] = ex__17043__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23199);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e23238;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__17041__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__23269 = state_23199;
state_23199 = G__23269;
continue;
}
} else
{return ret_value__17041__auto__;
}
break;
}
});
state_machine__17040__auto__ = function(state_23199){
switch(arguments.length){
case 0:
return state_machine__17040__auto____0.call(this);
case 1:
return state_machine__17040__auto____1.call(this,state_23199);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__17040__auto____0;
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__17040__auto____1;
return state_machine__17040__auto__;
})()
;})(switch__17039__auto__))
})();var state__17056__auto__ = (function (){var statearr_23240 = f__17055__auto__.call(null);(statearr_23240[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__17054__auto___23241);
return statearr_23240;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__17056__auto__);
}));
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
cljs.core.async.Pub = (function (){var obj23271 = {};return obj23271;
})();
cljs.core.async.sub_STAR_ = (function sub_STAR_(p,v,ch,close_QMARK_){if((function (){var and__15212__auto__ = p;if(and__15212__auto__)
{return p.cljs$core$async$Pub$sub_STAR_$arity$4;
} else
{return and__15212__auto__;
}
})())
{return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else
{var x__15851__auto__ = (((p == null))?null:p);return (function (){var or__15224__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.sub_STAR_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
})().call(null,p,v,ch,close_QMARK_);
}
});
cljs.core.async.unsub_STAR_ = (function unsub_STAR_(p,v,ch){if((function (){var and__15212__auto__ = p;if(and__15212__auto__)
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3;
} else
{return and__15212__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else
{var x__15851__auto__ = (((p == null))?null:p);return (function (){var or__15224__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
})().call(null,p,v,ch);
}
});
cljs.core.async.unsub_all_STAR_ = (function() {
var unsub_all_STAR_ = null;
var unsub_all_STAR___1 = (function (p){if((function (){var and__15212__auto__ = p;if(and__15212__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1;
} else
{return and__15212__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else
{var x__15851__auto__ = (((p == null))?null:p);return (function (){var or__15224__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p);
}
});
var unsub_all_STAR___2 = (function (p,v){if((function (){var and__15212__auto__ = p;if(and__15212__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2;
} else
{return and__15212__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else
{var x__15851__auto__ = (((p == null))?null:p);return (function (){var or__15224__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
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
return (function (topic){var or__15224__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__15224__auto__,mults){
return (function (p1__23272_SHARP_){if(cljs.core.truth_(p1__23272_SHARP_.call(null,topic)))
{return p1__23272_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__23272_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__15224__auto__,mults))
),topic);
}
});})(mults))
;var p = (function (){if(typeof cljs.core.async.t23397 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t23397 = (function (ensure_mult,mults,buf_fn,topic_fn,ch,pub,meta23398){
this.ensure_mult = ensure_mult;
this.mults = mults;
this.buf_fn = buf_fn;
this.topic_fn = topic_fn;
this.ch = ch;
this.pub = pub;
this.meta23398 = meta23398;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t23397.cljs$lang$type = true;
cljs.core.async.t23397.cljs$lang$ctorStr = "cljs.core.async/t23397";
cljs.core.async.t23397.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t23397");
});})(mults,ensure_mult))
;
cljs.core.async.t23397.prototype.cljs$core$async$Pub$ = true;
cljs.core.async.t23397.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2,close_QMARK_){var self__ = this;
var p__$1 = this;var m = self__.ensure_mult.call(null,topic);return cljs.core.async.tap.call(null,m,ch__$2,close_QMARK_);
});})(mults,ensure_mult))
;
cljs.core.async.t23397.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2){var self__ = this;
var p__$1 = this;var temp__4092__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);if(cljs.core.truth_(temp__4092__auto__))
{var m = temp__4092__auto__;return cljs.core.async.untap.call(null,m,ch__$2);
} else
{return null;
}
});})(mults,ensure_mult))
;
cljs.core.async.t23397.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;
cljs.core.async.t23397.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){var self__ = this;
var ___$1 = this;return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;
cljs.core.async.t23397.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t23397.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(mults,ensure_mult))
;
cljs.core.async.t23397.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_23399){var self__ = this;
var _23399__$1 = this;return self__.meta23398;
});})(mults,ensure_mult))
;
cljs.core.async.t23397.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_23399,meta23398__$1){var self__ = this;
var _23399__$1 = this;return (new cljs.core.async.t23397(self__.ensure_mult,self__.mults,self__.buf_fn,self__.topic_fn,self__.ch,self__.pub,meta23398__$1));
});})(mults,ensure_mult))
;
cljs.core.async.__GT_t23397 = ((function (mults,ensure_mult){
return (function __GT_t23397(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta23398){return (new cljs.core.async.t23397(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta23398));
});})(mults,ensure_mult))
;
}
return (new cljs.core.async.t23397(ensure_mult,mults,buf_fn,topic_fn,ch,pub,null));
})();var c__17054__auto___23521 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__17055__auto__ = (function (){var switch__17039__auto__ = (function (state_23473){var state_val_23474 = (state_23473[1]);if((state_val_23474 === 1))
{var state_23473__$1 = state_23473;var statearr_23475_23522 = state_23473__$1;(statearr_23475_23522[2] = null);
(statearr_23475_23522[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 2))
{var state_23473__$1 = state_23473;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23473__$1,4,ch);
} else
{if((state_val_23474 === 3))
{var inst_23471 = (state_23473[2]);var state_23473__$1 = state_23473;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23473__$1,inst_23471);
} else
{if((state_val_23474 === 4))
{var inst_23402 = (state_23473[7]);var inst_23402__$1 = (state_23473[2]);var inst_23403 = (inst_23402__$1 == null);var state_23473__$1 = (function (){var statearr_23476 = state_23473;(statearr_23476[7] = inst_23402__$1);
return statearr_23476;
})();if(cljs.core.truth_(inst_23403))
{var statearr_23477_23523 = state_23473__$1;(statearr_23477_23523[1] = 5);
} else
{var statearr_23478_23524 = state_23473__$1;(statearr_23478_23524[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 5))
{var inst_23409 = cljs.core.deref.call(null,mults);var inst_23410 = cljs.core.vals.call(null,inst_23409);var inst_23411 = cljs.core.seq.call(null,inst_23410);var inst_23412 = inst_23411;var inst_23413 = null;var inst_23414 = 0;var inst_23415 = 0;var state_23473__$1 = (function (){var statearr_23479 = state_23473;(statearr_23479[8] = inst_23413);
(statearr_23479[9] = inst_23414);
(statearr_23479[10] = inst_23415);
(statearr_23479[11] = inst_23412);
return statearr_23479;
})();var statearr_23480_23525 = state_23473__$1;(statearr_23480_23525[2] = null);
(statearr_23480_23525[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 6))
{var inst_23452 = (state_23473[12]);var inst_23450 = (state_23473[13]);var inst_23402 = (state_23473[7]);var inst_23450__$1 = topic_fn.call(null,inst_23402);var inst_23451 = cljs.core.deref.call(null,mults);var inst_23452__$1 = cljs.core.get.call(null,inst_23451,inst_23450__$1);var state_23473__$1 = (function (){var statearr_23481 = state_23473;(statearr_23481[12] = inst_23452__$1);
(statearr_23481[13] = inst_23450__$1);
return statearr_23481;
})();if(cljs.core.truth_(inst_23452__$1))
{var statearr_23482_23526 = state_23473__$1;(statearr_23482_23526[1] = 19);
} else
{var statearr_23483_23527 = state_23473__$1;(statearr_23483_23527[1] = 20);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 7))
{var inst_23469 = (state_23473[2]);var state_23473__$1 = state_23473;var statearr_23484_23528 = state_23473__$1;(statearr_23484_23528[2] = inst_23469);
(statearr_23484_23528[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 8))
{var inst_23414 = (state_23473[9]);var inst_23415 = (state_23473[10]);var inst_23417 = (inst_23415 < inst_23414);var inst_23418 = inst_23417;var state_23473__$1 = state_23473;if(cljs.core.truth_(inst_23418))
{var statearr_23488_23529 = state_23473__$1;(statearr_23488_23529[1] = 10);
} else
{var statearr_23489_23530 = state_23473__$1;(statearr_23489_23530[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 9))
{var inst_23448 = (state_23473[2]);var state_23473__$1 = state_23473;var statearr_23490_23531 = state_23473__$1;(statearr_23490_23531[2] = inst_23448);
(statearr_23490_23531[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 10))
{var inst_23413 = (state_23473[8]);var inst_23414 = (state_23473[9]);var inst_23415 = (state_23473[10]);var inst_23412 = (state_23473[11]);var inst_23420 = cljs.core._nth.call(null,inst_23413,inst_23415);var inst_23421 = cljs.core.async.muxch_STAR_.call(null,inst_23420);var inst_23422 = cljs.core.async.close_BANG_.call(null,inst_23421);var inst_23423 = (inst_23415 + 1);var tmp23485 = inst_23413;var tmp23486 = inst_23414;var tmp23487 = inst_23412;var inst_23412__$1 = tmp23487;var inst_23413__$1 = tmp23485;var inst_23414__$1 = tmp23486;var inst_23415__$1 = inst_23423;var state_23473__$1 = (function (){var statearr_23491 = state_23473;(statearr_23491[8] = inst_23413__$1);
(statearr_23491[9] = inst_23414__$1);
(statearr_23491[14] = inst_23422);
(statearr_23491[10] = inst_23415__$1);
(statearr_23491[11] = inst_23412__$1);
return statearr_23491;
})();var statearr_23492_23532 = state_23473__$1;(statearr_23492_23532[2] = null);
(statearr_23492_23532[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 11))
{var inst_23426 = (state_23473[15]);var inst_23412 = (state_23473[11]);var inst_23426__$1 = cljs.core.seq.call(null,inst_23412);var state_23473__$1 = (function (){var statearr_23493 = state_23473;(statearr_23493[15] = inst_23426__$1);
return statearr_23493;
})();if(inst_23426__$1)
{var statearr_23494_23533 = state_23473__$1;(statearr_23494_23533[1] = 13);
} else
{var statearr_23495_23534 = state_23473__$1;(statearr_23495_23534[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 12))
{var inst_23446 = (state_23473[2]);var state_23473__$1 = state_23473;var statearr_23496_23535 = state_23473__$1;(statearr_23496_23535[2] = inst_23446);
(statearr_23496_23535[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 13))
{var inst_23426 = (state_23473[15]);var inst_23428 = cljs.core.chunked_seq_QMARK_.call(null,inst_23426);var state_23473__$1 = state_23473;if(inst_23428)
{var statearr_23497_23536 = state_23473__$1;(statearr_23497_23536[1] = 16);
} else
{var statearr_23498_23537 = state_23473__$1;(statearr_23498_23537[1] = 17);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 14))
{var state_23473__$1 = state_23473;var statearr_23499_23538 = state_23473__$1;(statearr_23499_23538[2] = null);
(statearr_23499_23538[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 15))
{var inst_23444 = (state_23473[2]);var state_23473__$1 = state_23473;var statearr_23500_23539 = state_23473__$1;(statearr_23500_23539[2] = inst_23444);
(statearr_23500_23539[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 16))
{var inst_23426 = (state_23473[15]);var inst_23430 = cljs.core.chunk_first.call(null,inst_23426);var inst_23431 = cljs.core.chunk_rest.call(null,inst_23426);var inst_23432 = cljs.core.count.call(null,inst_23430);var inst_23412 = inst_23431;var inst_23413 = inst_23430;var inst_23414 = inst_23432;var inst_23415 = 0;var state_23473__$1 = (function (){var statearr_23501 = state_23473;(statearr_23501[8] = inst_23413);
(statearr_23501[9] = inst_23414);
(statearr_23501[10] = inst_23415);
(statearr_23501[11] = inst_23412);
return statearr_23501;
})();var statearr_23502_23540 = state_23473__$1;(statearr_23502_23540[2] = null);
(statearr_23502_23540[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 17))
{var inst_23426 = (state_23473[15]);var inst_23435 = cljs.core.first.call(null,inst_23426);var inst_23436 = cljs.core.async.muxch_STAR_.call(null,inst_23435);var inst_23437 = cljs.core.async.close_BANG_.call(null,inst_23436);var inst_23438 = cljs.core.next.call(null,inst_23426);var inst_23412 = inst_23438;var inst_23413 = null;var inst_23414 = 0;var inst_23415 = 0;var state_23473__$1 = (function (){var statearr_23503 = state_23473;(statearr_23503[16] = inst_23437);
(statearr_23503[8] = inst_23413);
(statearr_23503[9] = inst_23414);
(statearr_23503[10] = inst_23415);
(statearr_23503[11] = inst_23412);
return statearr_23503;
})();var statearr_23504_23541 = state_23473__$1;(statearr_23504_23541[2] = null);
(statearr_23504_23541[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 18))
{var inst_23441 = (state_23473[2]);var state_23473__$1 = state_23473;var statearr_23505_23542 = state_23473__$1;(statearr_23505_23542[2] = inst_23441);
(statearr_23505_23542[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 19))
{var state_23473__$1 = state_23473;var statearr_23506_23543 = state_23473__$1;(statearr_23506_23543[2] = null);
(statearr_23506_23543[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 20))
{var state_23473__$1 = state_23473;var statearr_23507_23544 = state_23473__$1;(statearr_23507_23544[2] = null);
(statearr_23507_23544[1] = 21);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 21))
{var inst_23466 = (state_23473[2]);var state_23473__$1 = (function (){var statearr_23508 = state_23473;(statearr_23508[17] = inst_23466);
return statearr_23508;
})();var statearr_23509_23545 = state_23473__$1;(statearr_23509_23545[2] = null);
(statearr_23509_23545[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 22))
{var inst_23463 = (state_23473[2]);var state_23473__$1 = state_23473;var statearr_23510_23546 = state_23473__$1;(statearr_23510_23546[2] = inst_23463);
(statearr_23510_23546[1] = 21);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 23))
{var inst_23450 = (state_23473[13]);var inst_23454 = (state_23473[2]);var inst_23455 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_23450);var state_23473__$1 = (function (){var statearr_23511 = state_23473;(statearr_23511[18] = inst_23454);
return statearr_23511;
})();var statearr_23512_23547 = state_23473__$1;(statearr_23512_23547[2] = inst_23455);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23473__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23474 === 24))
{var inst_23452 = (state_23473[12]);var inst_23402 = (state_23473[7]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_23473,23,Object,null,22);var inst_23459 = cljs.core.async.muxch_STAR_.call(null,inst_23452);var state_23473__$1 = state_23473;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23473__$1,25,inst_23459,inst_23402);
} else
{if((state_val_23474 === 25))
{var inst_23461 = (state_23473[2]);var state_23473__$1 = state_23473;var statearr_23513_23548 = state_23473__$1;(statearr_23513_23548[2] = inst_23461);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23473__$1);
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
});return ((function (switch__17039__auto__){
return (function() {
var state_machine__17040__auto__ = null;
var state_machine__17040__auto____0 = (function (){var statearr_23517 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_23517[0] = state_machine__17040__auto__);
(statearr_23517[1] = 1);
return statearr_23517;
});
var state_machine__17040__auto____1 = (function (state_23473){while(true){
var ret_value__17041__auto__ = (function (){try{while(true){
var result__17042__auto__ = switch__17039__auto__.call(null,state_23473);if(cljs.core.keyword_identical_QMARK_.call(null,result__17042__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__17042__auto__;
}
break;
}
}catch (e23518){if((e23518 instanceof Object))
{var ex__17043__auto__ = e23518;var statearr_23519_23549 = state_23473;(statearr_23519_23549[5] = ex__17043__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23473);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e23518;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__17041__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__23550 = state_23473;
state_23473 = G__23550;
continue;
}
} else
{return ret_value__17041__auto__;
}
break;
}
});
state_machine__17040__auto__ = function(state_23473){
switch(arguments.length){
case 0:
return state_machine__17040__auto____0.call(this);
case 1:
return state_machine__17040__auto____1.call(this,state_23473);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__17040__auto____0;
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__17040__auto____1;
return state_machine__17040__auto__;
})()
;})(switch__17039__auto__))
})();var state__17056__auto__ = (function (){var statearr_23520 = f__17055__auto__.call(null);(statearr_23520[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__17054__auto___23521);
return statearr_23520;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__17056__auto__);
}));
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
,cljs.core.range.call(null,cnt));var c__17054__auto___23687 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__17055__auto__ = (function (){var switch__17039__auto__ = (function (state_23657){var state_val_23658 = (state_23657[1]);if((state_val_23658 === 1))
{var state_23657__$1 = state_23657;var statearr_23659_23688 = state_23657__$1;(statearr_23659_23688[2] = null);
(statearr_23659_23688[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23658 === 2))
{var inst_23620 = cljs.core.reset_BANG_.call(null,dctr,cnt);var inst_23621 = 0;var state_23657__$1 = (function (){var statearr_23660 = state_23657;(statearr_23660[7] = inst_23621);
(statearr_23660[8] = inst_23620);
return statearr_23660;
})();var statearr_23661_23689 = state_23657__$1;(statearr_23661_23689[2] = null);
(statearr_23661_23689[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23658 === 3))
{var inst_23655 = (state_23657[2]);var state_23657__$1 = state_23657;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23657__$1,inst_23655);
} else
{if((state_val_23658 === 4))
{var inst_23621 = (state_23657[7]);var inst_23623 = (inst_23621 < cnt);var state_23657__$1 = state_23657;if(cljs.core.truth_(inst_23623))
{var statearr_23662_23690 = state_23657__$1;(statearr_23662_23690[1] = 6);
} else
{var statearr_23663_23691 = state_23657__$1;(statearr_23663_23691[1] = 7);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23658 === 5))
{var inst_23641 = (state_23657[2]);var state_23657__$1 = (function (){var statearr_23664 = state_23657;(statearr_23664[9] = inst_23641);
return statearr_23664;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23657__$1,12,dchan);
} else
{if((state_val_23658 === 6))
{var state_23657__$1 = state_23657;var statearr_23665_23692 = state_23657__$1;(statearr_23665_23692[2] = null);
(statearr_23665_23692[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23658 === 7))
{var state_23657__$1 = state_23657;var statearr_23666_23693 = state_23657__$1;(statearr_23666_23693[2] = null);
(statearr_23666_23693[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23658 === 8))
{var inst_23639 = (state_23657[2]);var state_23657__$1 = state_23657;var statearr_23667_23694 = state_23657__$1;(statearr_23667_23694[2] = inst_23639);
(statearr_23667_23694[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23658 === 9))
{var inst_23621 = (state_23657[7]);var inst_23634 = (state_23657[2]);var inst_23635 = (inst_23621 + 1);var inst_23621__$1 = inst_23635;var state_23657__$1 = (function (){var statearr_23668 = state_23657;(statearr_23668[10] = inst_23634);
(statearr_23668[7] = inst_23621__$1);
return statearr_23668;
})();var statearr_23669_23695 = state_23657__$1;(statearr_23669_23695[2] = null);
(statearr_23669_23695[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23658 === 10))
{var inst_23625 = (state_23657[2]);var inst_23626 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var state_23657__$1 = (function (){var statearr_23670 = state_23657;(statearr_23670[11] = inst_23625);
return statearr_23670;
})();var statearr_23671_23696 = state_23657__$1;(statearr_23671_23696[2] = inst_23626);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23657__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23658 === 11))
{var inst_23621 = (state_23657[7]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_23657,10,Object,null,9);var inst_23630 = chs__$1.call(null,inst_23621);var inst_23631 = done.call(null,inst_23621);var inst_23632 = cljs.core.async.take_BANG_.call(null,inst_23630,inst_23631);var state_23657__$1 = state_23657;var statearr_23672_23697 = state_23657__$1;(statearr_23672_23697[2] = inst_23632);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23657__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23658 === 12))
{var inst_23643 = (state_23657[12]);var inst_23643__$1 = (state_23657[2]);var inst_23644 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_23643__$1);var state_23657__$1 = (function (){var statearr_23673 = state_23657;(statearr_23673[12] = inst_23643__$1);
return statearr_23673;
})();if(cljs.core.truth_(inst_23644))
{var statearr_23674_23698 = state_23657__$1;(statearr_23674_23698[1] = 13);
} else
{var statearr_23675_23699 = state_23657__$1;(statearr_23675_23699[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23658 === 13))
{var inst_23646 = cljs.core.async.close_BANG_.call(null,out);var state_23657__$1 = state_23657;var statearr_23676_23700 = state_23657__$1;(statearr_23676_23700[2] = inst_23646);
(statearr_23676_23700[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23658 === 14))
{var inst_23643 = (state_23657[12]);var inst_23648 = cljs.core.apply.call(null,f,inst_23643);var state_23657__$1 = state_23657;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23657__$1,16,out,inst_23648);
} else
{if((state_val_23658 === 15))
{var inst_23653 = (state_23657[2]);var state_23657__$1 = state_23657;var statearr_23677_23701 = state_23657__$1;(statearr_23677_23701[2] = inst_23653);
(statearr_23677_23701[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23658 === 16))
{var inst_23650 = (state_23657[2]);var state_23657__$1 = (function (){var statearr_23678 = state_23657;(statearr_23678[13] = inst_23650);
return statearr_23678;
})();var statearr_23679_23702 = state_23657__$1;(statearr_23679_23702[2] = null);
(statearr_23679_23702[1] = 2);
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
});return ((function (switch__17039__auto__){
return (function() {
var state_machine__17040__auto__ = null;
var state_machine__17040__auto____0 = (function (){var statearr_23683 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_23683[0] = state_machine__17040__auto__);
(statearr_23683[1] = 1);
return statearr_23683;
});
var state_machine__17040__auto____1 = (function (state_23657){while(true){
var ret_value__17041__auto__ = (function (){try{while(true){
var result__17042__auto__ = switch__17039__auto__.call(null,state_23657);if(cljs.core.keyword_identical_QMARK_.call(null,result__17042__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__17042__auto__;
}
break;
}
}catch (e23684){if((e23684 instanceof Object))
{var ex__17043__auto__ = e23684;var statearr_23685_23703 = state_23657;(statearr_23685_23703[5] = ex__17043__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23657);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e23684;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__17041__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__23704 = state_23657;
state_23657 = G__23704;
continue;
}
} else
{return ret_value__17041__auto__;
}
break;
}
});
state_machine__17040__auto__ = function(state_23657){
switch(arguments.length){
case 0:
return state_machine__17040__auto____0.call(this);
case 1:
return state_machine__17040__auto____1.call(this,state_23657);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__17040__auto____0;
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__17040__auto____1;
return state_machine__17040__auto__;
})()
;})(switch__17039__auto__))
})();var state__17056__auto__ = (function (){var statearr_23686 = f__17055__auto__.call(null);(statearr_23686[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__17054__auto___23687);
return statearr_23686;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__17056__auto__);
}));
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
var merge__2 = (function (chs,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__17054__auto___23812 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__17055__auto__ = (function (){var switch__17039__auto__ = (function (state_23788){var state_val_23789 = (state_23788[1]);if((state_val_23789 === 1))
{var inst_23759 = cljs.core.vec.call(null,chs);var inst_23760 = inst_23759;var state_23788__$1 = (function (){var statearr_23790 = state_23788;(statearr_23790[7] = inst_23760);
return statearr_23790;
})();var statearr_23791_23813 = state_23788__$1;(statearr_23791_23813[2] = null);
(statearr_23791_23813[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23789 === 2))
{var inst_23760 = (state_23788[7]);var inst_23762 = cljs.core.count.call(null,inst_23760);var inst_23763 = (inst_23762 > 0);var state_23788__$1 = state_23788;if(cljs.core.truth_(inst_23763))
{var statearr_23792_23814 = state_23788__$1;(statearr_23792_23814[1] = 4);
} else
{var statearr_23793_23815 = state_23788__$1;(statearr_23793_23815[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23789 === 3))
{var inst_23786 = (state_23788[2]);var state_23788__$1 = state_23788;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23788__$1,inst_23786);
} else
{if((state_val_23789 === 4))
{var inst_23760 = (state_23788[7]);var state_23788__$1 = state_23788;return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_23788__$1,7,inst_23760);
} else
{if((state_val_23789 === 5))
{var inst_23782 = cljs.core.async.close_BANG_.call(null,out);var state_23788__$1 = state_23788;var statearr_23794_23816 = state_23788__$1;(statearr_23794_23816[2] = inst_23782);
(statearr_23794_23816[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23789 === 6))
{var inst_23784 = (state_23788[2]);var state_23788__$1 = state_23788;var statearr_23795_23817 = state_23788__$1;(statearr_23795_23817[2] = inst_23784);
(statearr_23795_23817[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23789 === 7))
{var inst_23767 = (state_23788[8]);var inst_23768 = (state_23788[9]);var inst_23767__$1 = (state_23788[2]);var inst_23768__$1 = cljs.core.nth.call(null,inst_23767__$1,0,null);var inst_23769 = cljs.core.nth.call(null,inst_23767__$1,1,null);var inst_23770 = (inst_23768__$1 == null);var state_23788__$1 = (function (){var statearr_23796 = state_23788;(statearr_23796[10] = inst_23769);
(statearr_23796[8] = inst_23767__$1);
(statearr_23796[9] = inst_23768__$1);
return statearr_23796;
})();if(cljs.core.truth_(inst_23770))
{var statearr_23797_23818 = state_23788__$1;(statearr_23797_23818[1] = 8);
} else
{var statearr_23798_23819 = state_23788__$1;(statearr_23798_23819[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23789 === 8))
{var inst_23769 = (state_23788[10]);var inst_23760 = (state_23788[7]);var inst_23767 = (state_23788[8]);var inst_23768 = (state_23788[9]);var inst_23772 = (function (){var c = inst_23769;var v = inst_23768;var vec__23765 = inst_23767;var cs = inst_23760;return ((function (c,v,vec__23765,cs,inst_23769,inst_23760,inst_23767,inst_23768,state_val_23789){
return (function (p1__23705_SHARP_){return cljs.core.not_EQ_.call(null,c,p1__23705_SHARP_);
});
;})(c,v,vec__23765,cs,inst_23769,inst_23760,inst_23767,inst_23768,state_val_23789))
})();var inst_23773 = cljs.core.filterv.call(null,inst_23772,inst_23760);var inst_23760__$1 = inst_23773;var state_23788__$1 = (function (){var statearr_23799 = state_23788;(statearr_23799[7] = inst_23760__$1);
return statearr_23799;
})();var statearr_23800_23820 = state_23788__$1;(statearr_23800_23820[2] = null);
(statearr_23800_23820[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23789 === 9))
{var inst_23768 = (state_23788[9]);var state_23788__$1 = state_23788;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23788__$1,11,out,inst_23768);
} else
{if((state_val_23789 === 10))
{var inst_23780 = (state_23788[2]);var state_23788__$1 = state_23788;var statearr_23802_23821 = state_23788__$1;(statearr_23802_23821[2] = inst_23780);
(statearr_23802_23821[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23789 === 11))
{var inst_23760 = (state_23788[7]);var inst_23777 = (state_23788[2]);var tmp23801 = inst_23760;var inst_23760__$1 = tmp23801;var state_23788__$1 = (function (){var statearr_23803 = state_23788;(statearr_23803[7] = inst_23760__$1);
(statearr_23803[11] = inst_23777);
return statearr_23803;
})();var statearr_23804_23822 = state_23788__$1;(statearr_23804_23822[2] = null);
(statearr_23804_23822[1] = 2);
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
});return ((function (switch__17039__auto__){
return (function() {
var state_machine__17040__auto__ = null;
var state_machine__17040__auto____0 = (function (){var statearr_23808 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_23808[0] = state_machine__17040__auto__);
(statearr_23808[1] = 1);
return statearr_23808;
});
var state_machine__17040__auto____1 = (function (state_23788){while(true){
var ret_value__17041__auto__ = (function (){try{while(true){
var result__17042__auto__ = switch__17039__auto__.call(null,state_23788);if(cljs.core.keyword_identical_QMARK_.call(null,result__17042__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__17042__auto__;
}
break;
}
}catch (e23809){if((e23809 instanceof Object))
{var ex__17043__auto__ = e23809;var statearr_23810_23823 = state_23788;(statearr_23810_23823[5] = ex__17043__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23788);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e23809;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__17041__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__23824 = state_23788;
state_23788 = G__23824;
continue;
}
} else
{return ret_value__17041__auto__;
}
break;
}
});
state_machine__17040__auto__ = function(state_23788){
switch(arguments.length){
case 0:
return state_machine__17040__auto____0.call(this);
case 1:
return state_machine__17040__auto____1.call(this,state_23788);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__17040__auto____0;
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__17040__auto____1;
return state_machine__17040__auto__;
})()
;})(switch__17039__auto__))
})();var state__17056__auto__ = (function (){var statearr_23811 = f__17055__auto__.call(null);(statearr_23811[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__17054__auto___23812);
return statearr_23811;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__17056__auto__);
}));
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
var take__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__17054__auto___23917 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__17055__auto__ = (function (){var switch__17039__auto__ = (function (state_23894){var state_val_23895 = (state_23894[1]);if((state_val_23895 === 1))
{var inst_23871 = 0;var state_23894__$1 = (function (){var statearr_23896 = state_23894;(statearr_23896[7] = inst_23871);
return statearr_23896;
})();var statearr_23897_23918 = state_23894__$1;(statearr_23897_23918[2] = null);
(statearr_23897_23918[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23895 === 2))
{var inst_23871 = (state_23894[7]);var inst_23873 = (inst_23871 < n);var state_23894__$1 = state_23894;if(cljs.core.truth_(inst_23873))
{var statearr_23898_23919 = state_23894__$1;(statearr_23898_23919[1] = 4);
} else
{var statearr_23899_23920 = state_23894__$1;(statearr_23899_23920[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23895 === 3))
{var inst_23891 = (state_23894[2]);var inst_23892 = cljs.core.async.close_BANG_.call(null,out);var state_23894__$1 = (function (){var statearr_23900 = state_23894;(statearr_23900[8] = inst_23891);
return statearr_23900;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23894__$1,inst_23892);
} else
{if((state_val_23895 === 4))
{var state_23894__$1 = state_23894;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23894__$1,7,ch);
} else
{if((state_val_23895 === 5))
{var state_23894__$1 = state_23894;var statearr_23901_23921 = state_23894__$1;(statearr_23901_23921[2] = null);
(statearr_23901_23921[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23895 === 6))
{var inst_23889 = (state_23894[2]);var state_23894__$1 = state_23894;var statearr_23902_23922 = state_23894__$1;(statearr_23902_23922[2] = inst_23889);
(statearr_23902_23922[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23895 === 7))
{var inst_23876 = (state_23894[9]);var inst_23876__$1 = (state_23894[2]);var inst_23877 = (inst_23876__$1 == null);var inst_23878 = cljs.core.not.call(null,inst_23877);var state_23894__$1 = (function (){var statearr_23903 = state_23894;(statearr_23903[9] = inst_23876__$1);
return statearr_23903;
})();if(inst_23878)
{var statearr_23904_23923 = state_23894__$1;(statearr_23904_23923[1] = 8);
} else
{var statearr_23905_23924 = state_23894__$1;(statearr_23905_23924[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23895 === 8))
{var inst_23876 = (state_23894[9]);var state_23894__$1 = state_23894;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23894__$1,11,out,inst_23876);
} else
{if((state_val_23895 === 9))
{var state_23894__$1 = state_23894;var statearr_23906_23925 = state_23894__$1;(statearr_23906_23925[2] = null);
(statearr_23906_23925[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23895 === 10))
{var inst_23886 = (state_23894[2]);var state_23894__$1 = state_23894;var statearr_23907_23926 = state_23894__$1;(statearr_23907_23926[2] = inst_23886);
(statearr_23907_23926[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23895 === 11))
{var inst_23871 = (state_23894[7]);var inst_23881 = (state_23894[2]);var inst_23882 = (inst_23871 + 1);var inst_23871__$1 = inst_23882;var state_23894__$1 = (function (){var statearr_23908 = state_23894;(statearr_23908[10] = inst_23881);
(statearr_23908[7] = inst_23871__$1);
return statearr_23908;
})();var statearr_23909_23927 = state_23894__$1;(statearr_23909_23927[2] = null);
(statearr_23909_23927[1] = 2);
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
});return ((function (switch__17039__auto__){
return (function() {
var state_machine__17040__auto__ = null;
var state_machine__17040__auto____0 = (function (){var statearr_23913 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_23913[0] = state_machine__17040__auto__);
(statearr_23913[1] = 1);
return statearr_23913;
});
var state_machine__17040__auto____1 = (function (state_23894){while(true){
var ret_value__17041__auto__ = (function (){try{while(true){
var result__17042__auto__ = switch__17039__auto__.call(null,state_23894);if(cljs.core.keyword_identical_QMARK_.call(null,result__17042__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__17042__auto__;
}
break;
}
}catch (e23914){if((e23914 instanceof Object))
{var ex__17043__auto__ = e23914;var statearr_23915_23928 = state_23894;(statearr_23915_23928[5] = ex__17043__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23894);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e23914;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__17041__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__23929 = state_23894;
state_23894 = G__23929;
continue;
}
} else
{return ret_value__17041__auto__;
}
break;
}
});
state_machine__17040__auto__ = function(state_23894){
switch(arguments.length){
case 0:
return state_machine__17040__auto____0.call(this);
case 1:
return state_machine__17040__auto____1.call(this,state_23894);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__17040__auto____0;
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__17040__auto____1;
return state_machine__17040__auto__;
})()
;})(switch__17039__auto__))
})();var state__17056__auto__ = (function (){var statearr_23916 = f__17055__auto__.call(null);(statearr_23916[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__17054__auto___23917);
return statearr_23916;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__17056__auto__);
}));
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
var unique__2 = (function (ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__17054__auto___24026 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__17055__auto__ = (function (){var switch__17039__auto__ = (function (state_24001){var state_val_24002 = (state_24001[1]);if((state_val_24002 === 1))
{var inst_23978 = null;var state_24001__$1 = (function (){var statearr_24003 = state_24001;(statearr_24003[7] = inst_23978);
return statearr_24003;
})();var statearr_24004_24027 = state_24001__$1;(statearr_24004_24027[2] = null);
(statearr_24004_24027[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24002 === 2))
{var state_24001__$1 = state_24001;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24001__$1,4,ch);
} else
{if((state_val_24002 === 3))
{var inst_23998 = (state_24001[2]);var inst_23999 = cljs.core.async.close_BANG_.call(null,out);var state_24001__$1 = (function (){var statearr_24005 = state_24001;(statearr_24005[8] = inst_23998);
return statearr_24005;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24001__$1,inst_23999);
} else
{if((state_val_24002 === 4))
{var inst_23981 = (state_24001[9]);var inst_23981__$1 = (state_24001[2]);var inst_23982 = (inst_23981__$1 == null);var inst_23983 = cljs.core.not.call(null,inst_23982);var state_24001__$1 = (function (){var statearr_24006 = state_24001;(statearr_24006[9] = inst_23981__$1);
return statearr_24006;
})();if(inst_23983)
{var statearr_24007_24028 = state_24001__$1;(statearr_24007_24028[1] = 5);
} else
{var statearr_24008_24029 = state_24001__$1;(statearr_24008_24029[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24002 === 5))
{var inst_23978 = (state_24001[7]);var inst_23981 = (state_24001[9]);var inst_23985 = cljs.core._EQ_.call(null,inst_23981,inst_23978);var state_24001__$1 = state_24001;if(inst_23985)
{var statearr_24009_24030 = state_24001__$1;(statearr_24009_24030[1] = 8);
} else
{var statearr_24010_24031 = state_24001__$1;(statearr_24010_24031[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24002 === 6))
{var state_24001__$1 = state_24001;var statearr_24012_24032 = state_24001__$1;(statearr_24012_24032[2] = null);
(statearr_24012_24032[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24002 === 7))
{var inst_23996 = (state_24001[2]);var state_24001__$1 = state_24001;var statearr_24013_24033 = state_24001__$1;(statearr_24013_24033[2] = inst_23996);
(statearr_24013_24033[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24002 === 8))
{var inst_23978 = (state_24001[7]);var tmp24011 = inst_23978;var inst_23978__$1 = tmp24011;var state_24001__$1 = (function (){var statearr_24014 = state_24001;(statearr_24014[7] = inst_23978__$1);
return statearr_24014;
})();var statearr_24015_24034 = state_24001__$1;(statearr_24015_24034[2] = null);
(statearr_24015_24034[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24002 === 9))
{var inst_23981 = (state_24001[9]);var state_24001__$1 = state_24001;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24001__$1,11,out,inst_23981);
} else
{if((state_val_24002 === 10))
{var inst_23993 = (state_24001[2]);var state_24001__$1 = state_24001;var statearr_24016_24035 = state_24001__$1;(statearr_24016_24035[2] = inst_23993);
(statearr_24016_24035[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24002 === 11))
{var inst_23981 = (state_24001[9]);var inst_23990 = (state_24001[2]);var inst_23978 = inst_23981;var state_24001__$1 = (function (){var statearr_24017 = state_24001;(statearr_24017[10] = inst_23990);
(statearr_24017[7] = inst_23978);
return statearr_24017;
})();var statearr_24018_24036 = state_24001__$1;(statearr_24018_24036[2] = null);
(statearr_24018_24036[1] = 2);
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
});return ((function (switch__17039__auto__){
return (function() {
var state_machine__17040__auto__ = null;
var state_machine__17040__auto____0 = (function (){var statearr_24022 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_24022[0] = state_machine__17040__auto__);
(statearr_24022[1] = 1);
return statearr_24022;
});
var state_machine__17040__auto____1 = (function (state_24001){while(true){
var ret_value__17041__auto__ = (function (){try{while(true){
var result__17042__auto__ = switch__17039__auto__.call(null,state_24001);if(cljs.core.keyword_identical_QMARK_.call(null,result__17042__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__17042__auto__;
}
break;
}
}catch (e24023){if((e24023 instanceof Object))
{var ex__17043__auto__ = e24023;var statearr_24024_24037 = state_24001;(statearr_24024_24037[5] = ex__17043__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24001);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e24023;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__17041__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__24038 = state_24001;
state_24001 = G__24038;
continue;
}
} else
{return ret_value__17041__auto__;
}
break;
}
});
state_machine__17040__auto__ = function(state_24001){
switch(arguments.length){
case 0:
return state_machine__17040__auto____0.call(this);
case 1:
return state_machine__17040__auto____1.call(this,state_24001);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__17040__auto____0;
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__17040__auto____1;
return state_machine__17040__auto__;
})()
;})(switch__17039__auto__))
})();var state__17056__auto__ = (function (){var statearr_24025 = f__17055__auto__.call(null);(statearr_24025[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__17054__auto___24026);
return statearr_24025;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__17056__auto__);
}));
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
var partition__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__17054__auto___24173 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__17055__auto__ = (function (){var switch__17039__auto__ = (function (state_24143){var state_val_24144 = (state_24143[1]);if((state_val_24144 === 1))
{var inst_24106 = (new Array(n));var inst_24107 = inst_24106;var inst_24108 = 0;var state_24143__$1 = (function (){var statearr_24145 = state_24143;(statearr_24145[7] = inst_24107);
(statearr_24145[8] = inst_24108);
return statearr_24145;
})();var statearr_24146_24174 = state_24143__$1;(statearr_24146_24174[2] = null);
(statearr_24146_24174[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24144 === 2))
{var state_24143__$1 = state_24143;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24143__$1,4,ch);
} else
{if((state_val_24144 === 3))
{var inst_24141 = (state_24143[2]);var state_24143__$1 = state_24143;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24143__$1,inst_24141);
} else
{if((state_val_24144 === 4))
{var inst_24111 = (state_24143[9]);var inst_24111__$1 = (state_24143[2]);var inst_24112 = (inst_24111__$1 == null);var inst_24113 = cljs.core.not.call(null,inst_24112);var state_24143__$1 = (function (){var statearr_24147 = state_24143;(statearr_24147[9] = inst_24111__$1);
return statearr_24147;
})();if(inst_24113)
{var statearr_24148_24175 = state_24143__$1;(statearr_24148_24175[1] = 5);
} else
{var statearr_24149_24176 = state_24143__$1;(statearr_24149_24176[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24144 === 5))
{var inst_24116 = (state_24143[10]);var inst_24107 = (state_24143[7]);var inst_24108 = (state_24143[8]);var inst_24111 = (state_24143[9]);var inst_24115 = (inst_24107[inst_24108] = inst_24111);var inst_24116__$1 = (inst_24108 + 1);var inst_24117 = (inst_24116__$1 < n);var state_24143__$1 = (function (){var statearr_24150 = state_24143;(statearr_24150[10] = inst_24116__$1);
(statearr_24150[11] = inst_24115);
return statearr_24150;
})();if(cljs.core.truth_(inst_24117))
{var statearr_24151_24177 = state_24143__$1;(statearr_24151_24177[1] = 8);
} else
{var statearr_24152_24178 = state_24143__$1;(statearr_24152_24178[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24144 === 6))
{var inst_24108 = (state_24143[8]);var inst_24129 = (inst_24108 > 0);var state_24143__$1 = state_24143;if(cljs.core.truth_(inst_24129))
{var statearr_24154_24179 = state_24143__$1;(statearr_24154_24179[1] = 12);
} else
{var statearr_24155_24180 = state_24143__$1;(statearr_24155_24180[1] = 13);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24144 === 7))
{var inst_24139 = (state_24143[2]);var state_24143__$1 = state_24143;var statearr_24156_24181 = state_24143__$1;(statearr_24156_24181[2] = inst_24139);
(statearr_24156_24181[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24144 === 8))
{var inst_24116 = (state_24143[10]);var inst_24107 = (state_24143[7]);var tmp24153 = inst_24107;var inst_24107__$1 = tmp24153;var inst_24108 = inst_24116;var state_24143__$1 = (function (){var statearr_24157 = state_24143;(statearr_24157[7] = inst_24107__$1);
(statearr_24157[8] = inst_24108);
return statearr_24157;
})();var statearr_24158_24182 = state_24143__$1;(statearr_24158_24182[2] = null);
(statearr_24158_24182[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24144 === 9))
{var inst_24107 = (state_24143[7]);var inst_24121 = cljs.core.vec.call(null,inst_24107);var state_24143__$1 = state_24143;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24143__$1,11,out,inst_24121);
} else
{if((state_val_24144 === 10))
{var inst_24127 = (state_24143[2]);var state_24143__$1 = state_24143;var statearr_24159_24183 = state_24143__$1;(statearr_24159_24183[2] = inst_24127);
(statearr_24159_24183[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24144 === 11))
{var inst_24123 = (state_24143[2]);var inst_24124 = (new Array(n));var inst_24107 = inst_24124;var inst_24108 = 0;var state_24143__$1 = (function (){var statearr_24160 = state_24143;(statearr_24160[12] = inst_24123);
(statearr_24160[7] = inst_24107);
(statearr_24160[8] = inst_24108);
return statearr_24160;
})();var statearr_24161_24184 = state_24143__$1;(statearr_24161_24184[2] = null);
(statearr_24161_24184[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24144 === 12))
{var inst_24107 = (state_24143[7]);var inst_24131 = cljs.core.vec.call(null,inst_24107);var state_24143__$1 = state_24143;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24143__$1,15,out,inst_24131);
} else
{if((state_val_24144 === 13))
{var state_24143__$1 = state_24143;var statearr_24162_24185 = state_24143__$1;(statearr_24162_24185[2] = null);
(statearr_24162_24185[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24144 === 14))
{var inst_24136 = (state_24143[2]);var inst_24137 = cljs.core.async.close_BANG_.call(null,out);var state_24143__$1 = (function (){var statearr_24163 = state_24143;(statearr_24163[13] = inst_24136);
return statearr_24163;
})();var statearr_24164_24186 = state_24143__$1;(statearr_24164_24186[2] = inst_24137);
(statearr_24164_24186[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24144 === 15))
{var inst_24133 = (state_24143[2]);var state_24143__$1 = state_24143;var statearr_24165_24187 = state_24143__$1;(statearr_24165_24187[2] = inst_24133);
(statearr_24165_24187[1] = 14);
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
});return ((function (switch__17039__auto__){
return (function() {
var state_machine__17040__auto__ = null;
var state_machine__17040__auto____0 = (function (){var statearr_24169 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_24169[0] = state_machine__17040__auto__);
(statearr_24169[1] = 1);
return statearr_24169;
});
var state_machine__17040__auto____1 = (function (state_24143){while(true){
var ret_value__17041__auto__ = (function (){try{while(true){
var result__17042__auto__ = switch__17039__auto__.call(null,state_24143);if(cljs.core.keyword_identical_QMARK_.call(null,result__17042__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__17042__auto__;
}
break;
}
}catch (e24170){if((e24170 instanceof Object))
{var ex__17043__auto__ = e24170;var statearr_24171_24188 = state_24143;(statearr_24171_24188[5] = ex__17043__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24143);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e24170;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__17041__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__24189 = state_24143;
state_24143 = G__24189;
continue;
}
} else
{return ret_value__17041__auto__;
}
break;
}
});
state_machine__17040__auto__ = function(state_24143){
switch(arguments.length){
case 0:
return state_machine__17040__auto____0.call(this);
case 1:
return state_machine__17040__auto____1.call(this,state_24143);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__17040__auto____0;
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__17040__auto____1;
return state_machine__17040__auto__;
})()
;})(switch__17039__auto__))
})();var state__17056__auto__ = (function (){var statearr_24172 = f__17055__auto__.call(null);(statearr_24172[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__17054__auto___24173);
return statearr_24172;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__17056__auto__);
}));
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
var partition_by__3 = (function (f,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__17054__auto___24332 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__17055__auto__ = (function (){var switch__17039__auto__ = (function (state_24302){var state_val_24303 = (state_24302[1]);if((state_val_24303 === 1))
{var inst_24261 = [];var inst_24262 = inst_24261;var inst_24263 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",4382193538);var state_24302__$1 = (function (){var statearr_24304 = state_24302;(statearr_24304[7] = inst_24263);
(statearr_24304[8] = inst_24262);
return statearr_24304;
})();var statearr_24305_24333 = state_24302__$1;(statearr_24305_24333[2] = null);
(statearr_24305_24333[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 2))
{var state_24302__$1 = state_24302;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24302__$1,4,ch);
} else
{if((state_val_24303 === 3))
{var inst_24300 = (state_24302[2]);var state_24302__$1 = state_24302;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24302__$1,inst_24300);
} else
{if((state_val_24303 === 4))
{var inst_24266 = (state_24302[9]);var inst_24266__$1 = (state_24302[2]);var inst_24267 = (inst_24266__$1 == null);var inst_24268 = cljs.core.not.call(null,inst_24267);var state_24302__$1 = (function (){var statearr_24306 = state_24302;(statearr_24306[9] = inst_24266__$1);
return statearr_24306;
})();if(inst_24268)
{var statearr_24307_24334 = state_24302__$1;(statearr_24307_24334[1] = 5);
} else
{var statearr_24308_24335 = state_24302__$1;(statearr_24308_24335[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 5))
{var inst_24266 = (state_24302[9]);var inst_24263 = (state_24302[7]);var inst_24270 = (state_24302[10]);var inst_24270__$1 = f.call(null,inst_24266);var inst_24271 = cljs.core._EQ_.call(null,inst_24270__$1,inst_24263);var inst_24272 = cljs.core.keyword_identical_QMARK_.call(null,inst_24263,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",4382193538));var inst_24273 = (inst_24271) || (inst_24272);var state_24302__$1 = (function (){var statearr_24309 = state_24302;(statearr_24309[10] = inst_24270__$1);
return statearr_24309;
})();if(cljs.core.truth_(inst_24273))
{var statearr_24310_24336 = state_24302__$1;(statearr_24310_24336[1] = 8);
} else
{var statearr_24311_24337 = state_24302__$1;(statearr_24311_24337[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 6))
{var inst_24262 = (state_24302[8]);var inst_24287 = inst_24262.length;var inst_24288 = (inst_24287 > 0);var state_24302__$1 = state_24302;if(cljs.core.truth_(inst_24288))
{var statearr_24313_24338 = state_24302__$1;(statearr_24313_24338[1] = 12);
} else
{var statearr_24314_24339 = state_24302__$1;(statearr_24314_24339[1] = 13);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 7))
{var inst_24298 = (state_24302[2]);var state_24302__$1 = state_24302;var statearr_24315_24340 = state_24302__$1;(statearr_24315_24340[2] = inst_24298);
(statearr_24315_24340[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 8))
{var inst_24266 = (state_24302[9]);var inst_24262 = (state_24302[8]);var inst_24270 = (state_24302[10]);var inst_24275 = inst_24262.push(inst_24266);var tmp24312 = inst_24262;var inst_24262__$1 = tmp24312;var inst_24263 = inst_24270;var state_24302__$1 = (function (){var statearr_24316 = state_24302;(statearr_24316[7] = inst_24263);
(statearr_24316[8] = inst_24262__$1);
(statearr_24316[11] = inst_24275);
return statearr_24316;
})();var statearr_24317_24341 = state_24302__$1;(statearr_24317_24341[2] = null);
(statearr_24317_24341[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 9))
{var inst_24262 = (state_24302[8]);var inst_24278 = cljs.core.vec.call(null,inst_24262);var state_24302__$1 = state_24302;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24302__$1,11,out,inst_24278);
} else
{if((state_val_24303 === 10))
{var inst_24285 = (state_24302[2]);var state_24302__$1 = state_24302;var statearr_24318_24342 = state_24302__$1;(statearr_24318_24342[2] = inst_24285);
(statearr_24318_24342[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 11))
{var inst_24266 = (state_24302[9]);var inst_24270 = (state_24302[10]);var inst_24280 = (state_24302[2]);var inst_24281 = [];var inst_24282 = inst_24281.push(inst_24266);var inst_24262 = inst_24281;var inst_24263 = inst_24270;var state_24302__$1 = (function (){var statearr_24319 = state_24302;(statearr_24319[12] = inst_24282);
(statearr_24319[7] = inst_24263);
(statearr_24319[8] = inst_24262);
(statearr_24319[13] = inst_24280);
return statearr_24319;
})();var statearr_24320_24343 = state_24302__$1;(statearr_24320_24343[2] = null);
(statearr_24320_24343[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 12))
{var inst_24262 = (state_24302[8]);var inst_24290 = cljs.core.vec.call(null,inst_24262);var state_24302__$1 = state_24302;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24302__$1,15,out,inst_24290);
} else
{if((state_val_24303 === 13))
{var state_24302__$1 = state_24302;var statearr_24321_24344 = state_24302__$1;(statearr_24321_24344[2] = null);
(statearr_24321_24344[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 14))
{var inst_24295 = (state_24302[2]);var inst_24296 = cljs.core.async.close_BANG_.call(null,out);var state_24302__$1 = (function (){var statearr_24322 = state_24302;(statearr_24322[14] = inst_24295);
return statearr_24322;
})();var statearr_24323_24345 = state_24302__$1;(statearr_24323_24345[2] = inst_24296);
(statearr_24323_24345[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 15))
{var inst_24292 = (state_24302[2]);var state_24302__$1 = state_24302;var statearr_24324_24346 = state_24302__$1;(statearr_24324_24346[2] = inst_24292);
(statearr_24324_24346[1] = 14);
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
});return ((function (switch__17039__auto__){
return (function() {
var state_machine__17040__auto__ = null;
var state_machine__17040__auto____0 = (function (){var statearr_24328 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_24328[0] = state_machine__17040__auto__);
(statearr_24328[1] = 1);
return statearr_24328;
});
var state_machine__17040__auto____1 = (function (state_24302){while(true){
var ret_value__17041__auto__ = (function (){try{while(true){
var result__17042__auto__ = switch__17039__auto__.call(null,state_24302);if(cljs.core.keyword_identical_QMARK_.call(null,result__17042__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__17042__auto__;
}
break;
}
}catch (e24329){if((e24329 instanceof Object))
{var ex__17043__auto__ = e24329;var statearr_24330_24347 = state_24302;(statearr_24330_24347[5] = ex__17043__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24302);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e24329;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__17041__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__24348 = state_24302;
state_24302 = G__24348;
continue;
}
} else
{return ret_value__17041__auto__;
}
break;
}
});
state_machine__17040__auto__ = function(state_24302){
switch(arguments.length){
case 0:
return state_machine__17040__auto____0.call(this);
case 1:
return state_machine__17040__auto____1.call(this,state_24302);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__17040__auto____0;
state_machine__17040__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__17040__auto____1;
return state_machine__17040__auto__;
})()
;})(switch__17039__auto__))
})();var state__17056__auto__ = (function (){var statearr_24331 = f__17055__auto__.call(null);(statearr_24331[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__17054__auto___24332);
return statearr_24331;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__17056__auto__);
}));
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