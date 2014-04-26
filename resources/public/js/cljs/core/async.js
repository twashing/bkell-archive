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
cljs.core.async.fn_handler = (function fn_handler(f){if(typeof cljs.core.async.t22901 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t22901 = (function (f,fn_handler,meta22902){
this.f = f;
this.fn_handler = fn_handler;
this.meta22902 = meta22902;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t22901.cljs$lang$type = true;
cljs.core.async.t22901.cljs$lang$ctorStr = "cljs.core.async/t22901";
cljs.core.async.t22901.cljs$lang$ctorPrWriter = (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t22901");
});
cljs.core.async.t22901.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t22901.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return true;
});
cljs.core.async.t22901.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.f;
});
cljs.core.async.t22901.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_22903){var self__ = this;
var _22903__$1 = this;return self__.meta22902;
});
cljs.core.async.t22901.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_22903,meta22902__$1){var self__ = this;
var _22903__$1 = this;return (new cljs.core.async.t22901(self__.f,self__.fn_handler,meta22902__$1));
});
cljs.core.async.__GT_t22901 = (function __GT_t22901(f__$1,fn_handler__$1,meta22902){return (new cljs.core.async.t22901(f__$1,fn_handler__$1,meta22902));
});
}
return (new cljs.core.async.t22901(f,fn_handler,null));
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
cljs.core.async.unblocking_buffer_QMARK_ = (function unblocking_buffer_QMARK_(buff){var G__22905 = buff;if(G__22905)
{var bit__15874__auto__ = null;if(cljs.core.truth_((function (){var or__15224__auto__ = bit__15874__auto__;if(cljs.core.truth_(or__15224__auto__))
{return or__15224__auto__;
} else
{return G__22905.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})()))
{return true;
} else
{if((!G__22905.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__22905);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__22905);
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
{var val_22906 = cljs.core.deref.call(null,ret);if(cljs.core.truth_(on_caller_QMARK_))
{fn1.call(null,val_22906);
} else
{cljs.core.async.impl.dispatch.run.call(null,(function (){return fn1.call(null,val_22906);
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
cljs.core.async.random_array = (function random_array(n){var a = (new Array(n));var n__16072__auto___22907 = n;var x_22908 = 0;while(true){
if((x_22908 < n__16072__auto___22907))
{(a[x_22908] = 0);
{
var G__22909 = (x_22908 + 1);
x_22908 = G__22909;
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
var G__22910 = (i + 1);
i = G__22910;
continue;
}
}
break;
}
});
cljs.core.async.alt_flag = (function alt_flag(){var flag = cljs.core.atom.call(null,true);if(typeof cljs.core.async.t22914 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t22914 = (function (flag,alt_flag,meta22915){
this.flag = flag;
this.alt_flag = alt_flag;
this.meta22915 = meta22915;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t22914.cljs$lang$type = true;
cljs.core.async.t22914.cljs$lang$ctorStr = "cljs.core.async/t22914";
cljs.core.async.t22914.cljs$lang$ctorPrWriter = (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t22914");
});
cljs.core.async.t22914.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t22914.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.deref.call(null,self__.flag);
});
cljs.core.async.t22914.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.flag,null);
return true;
});
cljs.core.async.t22914.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_22916){var self__ = this;
var _22916__$1 = this;return self__.meta22915;
});
cljs.core.async.t22914.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_22916,meta22915__$1){var self__ = this;
var _22916__$1 = this;return (new cljs.core.async.t22914(self__.flag,self__.alt_flag,meta22915__$1));
});
cljs.core.async.__GT_t22914 = (function __GT_t22914(flag__$1,alt_flag__$1,meta22915){return (new cljs.core.async.t22914(flag__$1,alt_flag__$1,meta22915));
});
}
return (new cljs.core.async.t22914(flag,alt_flag,null));
});
cljs.core.async.alt_handler = (function alt_handler(flag,cb){if(typeof cljs.core.async.t22920 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t22920 = (function (cb,flag,alt_handler,meta22921){
this.cb = cb;
this.flag = flag;
this.alt_handler = alt_handler;
this.meta22921 = meta22921;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t22920.cljs$lang$type = true;
cljs.core.async.t22920.cljs$lang$ctorStr = "cljs.core.async/t22920";
cljs.core.async.t22920.cljs$lang$ctorPrWriter = (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t22920");
});
cljs.core.async.t22920.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t22920.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});
cljs.core.async.t22920.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.async.impl.protocols.commit.call(null,self__.flag);
return self__.cb;
});
cljs.core.async.t22920.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_22922){var self__ = this;
var _22922__$1 = this;return self__.meta22921;
});
cljs.core.async.t22920.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_22922,meta22921__$1){var self__ = this;
var _22922__$1 = this;return (new cljs.core.async.t22920(self__.cb,self__.flag,self__.alt_handler,meta22921__$1));
});
cljs.core.async.__GT_t22920 = (function __GT_t22920(cb__$1,flag__$1,alt_handler__$1,meta22921){return (new cljs.core.async.t22920(cb__$1,flag__$1,alt_handler__$1,meta22921));
});
}
return (new cljs.core.async.t22920(cb,flag,alt_handler,null));
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
return (function (p1__22923_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__22923_SHARP_,port], null));
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
var G__22924 = (i + 1);
i = G__22924;
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
var alts_BANG___delegate = function (ports,p__22925){var map__22927 = p__22925;var map__22927__$1 = ((cljs.core.seq_QMARK_.call(null,map__22927))?cljs.core.apply.call(null,cljs.core.hash_map,map__22927):map__22927);var opts = map__22927__$1;if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("alts! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
};
var alts_BANG_ = function (ports,var_args){
var p__22925 = null;if (arguments.length > 1) {
  p__22925 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return alts_BANG___delegate.call(this,ports,p__22925);};
alts_BANG_.cljs$lang$maxFixedArity = 1;
alts_BANG_.cljs$lang$applyTo = (function (arglist__22928){
var ports = cljs.core.first(arglist__22928);
var p__22925 = cljs.core.rest(arglist__22928);
return alts_BANG___delegate(ports,p__22925);
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
cljs.core.async.map_LT_ = (function map_LT_(f,ch){if(typeof cljs.core.async.t22936 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t22936 = (function (ch,f,map_LT_,meta22937){
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta22937 = meta22937;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t22936.cljs$lang$type = true;
cljs.core.async.t22936.cljs$lang$ctorStr = "cljs.core.async/t22936";
cljs.core.async.t22936.cljs$lang$ctorPrWriter = (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t22936");
});
cljs.core.async.t22936.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t22936.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn0);
});
cljs.core.async.t22936.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t22936.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){if(typeof cljs.core.async.t22939 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t22939 = (function (fn1,_,meta22937,ch,f,map_LT_,meta22940){
this.fn1 = fn1;
this._ = _;
this.meta22937 = meta22937;
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta22940 = meta22940;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t22939.cljs$lang$type = true;
cljs.core.async.t22939.cljs$lang$ctorStr = "cljs.core.async/t22939";
cljs.core.async.t22939.cljs$lang$ctorPrWriter = (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t22939");
});
cljs.core.async.t22939.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t22939.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});
cljs.core.async.t22939.prototype.cljs$core$async$impl$protocols$Handler$lock_id$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.lock_id.call(null,self__.fn1);
});
cljs.core.async.t22939.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);return ((function (f1,___$4){
return (function (p1__22929_SHARP_){return f1.call(null,(((p1__22929_SHARP_ == null))?null:self__.f.call(null,p1__22929_SHARP_)));
});
;})(f1,___$4))
});
cljs.core.async.t22939.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_22941){var self__ = this;
var _22941__$1 = this;return self__.meta22940;
});
cljs.core.async.t22939.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_22941,meta22940__$1){var self__ = this;
var _22941__$1 = this;return (new cljs.core.async.t22939(self__.fn1,self__._,self__.meta22937,self__.ch,self__.f,self__.map_LT_,meta22940__$1));
});
cljs.core.async.__GT_t22939 = (function __GT_t22939(fn1__$1,___$2,meta22937__$1,ch__$2,f__$2,map_LT___$2,meta22940){return (new cljs.core.async.t22939(fn1__$1,___$2,meta22937__$1,ch__$2,f__$2,map_LT___$2,meta22940));
});
}
return (new cljs.core.async.t22939(fn1,___$1,self__.meta22937,self__.ch,self__.f,self__.map_LT_,null));
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
cljs.core.async.t22936.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t22936.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t22936.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_22938){var self__ = this;
var _22938__$1 = this;return self__.meta22937;
});
cljs.core.async.t22936.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_22938,meta22937__$1){var self__ = this;
var _22938__$1 = this;return (new cljs.core.async.t22936(self__.ch,self__.f,self__.map_LT_,meta22937__$1));
});
cljs.core.async.__GT_t22936 = (function __GT_t22936(ch__$1,f__$1,map_LT___$1,meta22937){return (new cljs.core.async.t22936(ch__$1,f__$1,map_LT___$1,meta22937));
});
}
return (new cljs.core.async.t22936(ch,f,map_LT_,null));
});
/**
* Takes a function and a target channel, and returns a channel which
* applies f to each value before supplying it to the target channel.
*/
cljs.core.async.map_GT_ = (function map_GT_(f,ch){if(typeof cljs.core.async.t22945 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t22945 = (function (ch,f,map_GT_,meta22946){
this.ch = ch;
this.f = f;
this.map_GT_ = map_GT_;
this.meta22946 = meta22946;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t22945.cljs$lang$type = true;
cljs.core.async.t22945.cljs$lang$ctorStr = "cljs.core.async/t22945";
cljs.core.async.t22945.cljs$lang$ctorPrWriter = (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t22945");
});
cljs.core.async.t22945.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t22945.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn0);
});
cljs.core.async.t22945.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t22945.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t22945.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t22945.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t22945.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_22947){var self__ = this;
var _22947__$1 = this;return self__.meta22946;
});
cljs.core.async.t22945.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_22947,meta22946__$1){var self__ = this;
var _22947__$1 = this;return (new cljs.core.async.t22945(self__.ch,self__.f,self__.map_GT_,meta22946__$1));
});
cljs.core.async.__GT_t22945 = (function __GT_t22945(ch__$1,f__$1,map_GT___$1,meta22946){return (new cljs.core.async.t22945(ch__$1,f__$1,map_GT___$1,meta22946));
});
}
return (new cljs.core.async.t22945(ch,f,map_GT_,null));
});
/**
* Takes a predicate and a target channel, and returns a channel which
* supplies only the values for which the predicate returns true to the
* target channel.
*/
cljs.core.async.filter_GT_ = (function filter_GT_(p,ch){if(typeof cljs.core.async.t22951 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t22951 = (function (ch,p,filter_GT_,meta22952){
this.ch = ch;
this.p = p;
this.filter_GT_ = filter_GT_;
this.meta22952 = meta22952;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t22951.cljs$lang$type = true;
cljs.core.async.t22951.cljs$lang$ctorStr = "cljs.core.async/t22951";
cljs.core.async.t22951.cljs$lang$ctorPrWriter = (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t22951");
});
cljs.core.async.t22951.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t22951.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.p.call(null,val)))
{return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn0);
} else
{return cljs.core.async.impl.channels.box.call(null,null);
}
});
cljs.core.async.t22951.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t22951.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t22951.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t22951.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t22951.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_22953){var self__ = this;
var _22953__$1 = this;return self__.meta22952;
});
cljs.core.async.t22951.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_22953,meta22952__$1){var self__ = this;
var _22953__$1 = this;return (new cljs.core.async.t22951(self__.ch,self__.p,self__.filter_GT_,meta22952__$1));
});
cljs.core.async.__GT_t22951 = (function __GT_t22951(ch__$1,p__$1,filter_GT___$1,meta22952){return (new cljs.core.async.t22951(ch__$1,p__$1,filter_GT___$1,meta22952));
});
}
return (new cljs.core.async.t22951(ch,p,filter_GT_,null));
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
var filter_LT___3 = (function (p,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__18288__auto___23036 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__18289__auto__ = (function (){var switch__18273__auto__ = (function (state_23015){var state_val_23016 = (state_23015[1]);if((state_val_23016 === 1))
{var state_23015__$1 = state_23015;var statearr_23017_23037 = state_23015__$1;(statearr_23017_23037[2] = null);
(statearr_23017_23037[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23016 === 2))
{var state_23015__$1 = state_23015;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23015__$1,4,ch);
} else
{if((state_val_23016 === 3))
{var inst_23013 = (state_23015[2]);var state_23015__$1 = state_23015;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23015__$1,inst_23013);
} else
{if((state_val_23016 === 4))
{var inst_22997 = (state_23015[7]);var inst_22997__$1 = (state_23015[2]);var inst_22998 = (inst_22997__$1 == null);var state_23015__$1 = (function (){var statearr_23018 = state_23015;(statearr_23018[7] = inst_22997__$1);
return statearr_23018;
})();if(cljs.core.truth_(inst_22998))
{var statearr_23019_23038 = state_23015__$1;(statearr_23019_23038[1] = 5);
} else
{var statearr_23020_23039 = state_23015__$1;(statearr_23020_23039[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23016 === 5))
{var inst_23000 = cljs.core.async.close_BANG_.call(null,out);var state_23015__$1 = state_23015;var statearr_23021_23040 = state_23015__$1;(statearr_23021_23040[2] = inst_23000);
(statearr_23021_23040[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23016 === 6))
{var inst_22997 = (state_23015[7]);var inst_23002 = p.call(null,inst_22997);var state_23015__$1 = state_23015;if(cljs.core.truth_(inst_23002))
{var statearr_23022_23041 = state_23015__$1;(statearr_23022_23041[1] = 8);
} else
{var statearr_23023_23042 = state_23015__$1;(statearr_23023_23042[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23016 === 7))
{var inst_23011 = (state_23015[2]);var state_23015__$1 = state_23015;var statearr_23024_23043 = state_23015__$1;(statearr_23024_23043[2] = inst_23011);
(statearr_23024_23043[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23016 === 8))
{var inst_22997 = (state_23015[7]);var state_23015__$1 = state_23015;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23015__$1,11,out,inst_22997);
} else
{if((state_val_23016 === 9))
{var state_23015__$1 = state_23015;var statearr_23025_23044 = state_23015__$1;(statearr_23025_23044[2] = null);
(statearr_23025_23044[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23016 === 10))
{var inst_23008 = (state_23015[2]);var state_23015__$1 = (function (){var statearr_23026 = state_23015;(statearr_23026[8] = inst_23008);
return statearr_23026;
})();var statearr_23027_23045 = state_23015__$1;(statearr_23027_23045[2] = null);
(statearr_23027_23045[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23016 === 11))
{var inst_23005 = (state_23015[2]);var state_23015__$1 = state_23015;var statearr_23028_23046 = state_23015__$1;(statearr_23028_23046[2] = inst_23005);
(statearr_23028_23046[1] = 10);
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
});return ((function (switch__18273__auto__){
return (function() {
var state_machine__18274__auto__ = null;
var state_machine__18274__auto____0 = (function (){var statearr_23032 = [null,null,null,null,null,null,null,null,null];(statearr_23032[0] = state_machine__18274__auto__);
(statearr_23032[1] = 1);
return statearr_23032;
});
var state_machine__18274__auto____1 = (function (state_23015){while(true){
var ret_value__18275__auto__ = (function (){try{while(true){
var result__18276__auto__ = switch__18273__auto__.call(null,state_23015);if(cljs.core.keyword_identical_QMARK_.call(null,result__18276__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__18276__auto__;
}
break;
}
}catch (e23033){if((e23033 instanceof Object))
{var ex__18277__auto__ = e23033;var statearr_23034_23047 = state_23015;(statearr_23034_23047[5] = ex__18277__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23015);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e23033;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18275__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__23048 = state_23015;
state_23015 = G__23048;
continue;
}
} else
{return ret_value__18275__auto__;
}
break;
}
});
state_machine__18274__auto__ = function(state_23015){
switch(arguments.length){
case 0:
return state_machine__18274__auto____0.call(this);
case 1:
return state_machine__18274__auto____1.call(this,state_23015);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__18274__auto____0;
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__18274__auto____1;
return state_machine__18274__auto__;
})()
;})(switch__18273__auto__))
})();var state__18290__auto__ = (function (){var statearr_23035 = f__18289__auto__.call(null);(statearr_23035[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__18288__auto___23036);
return statearr_23035;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18290__auto__);
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
cljs.core.async.mapcat_STAR_ = (function mapcat_STAR_(f,in$,out){var c__18288__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__18289__auto__ = (function (){var switch__18273__auto__ = (function (state_23200){var state_val_23201 = (state_23200[1]);if((state_val_23201 === 1))
{var state_23200__$1 = state_23200;var statearr_23202_23239 = state_23200__$1;(statearr_23202_23239[2] = null);
(statearr_23202_23239[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23201 === 2))
{var state_23200__$1 = state_23200;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23200__$1,4,in$);
} else
{if((state_val_23201 === 3))
{var inst_23198 = (state_23200[2]);var state_23200__$1 = state_23200;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23200__$1,inst_23198);
} else
{if((state_val_23201 === 4))
{var inst_23146 = (state_23200[7]);var inst_23146__$1 = (state_23200[2]);var inst_23147 = (inst_23146__$1 == null);var state_23200__$1 = (function (){var statearr_23203 = state_23200;(statearr_23203[7] = inst_23146__$1);
return statearr_23203;
})();if(cljs.core.truth_(inst_23147))
{var statearr_23204_23240 = state_23200__$1;(statearr_23204_23240[1] = 5);
} else
{var statearr_23205_23241 = state_23200__$1;(statearr_23205_23241[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23201 === 5))
{var inst_23149 = cljs.core.async.close_BANG_.call(null,out);var state_23200__$1 = state_23200;var statearr_23206_23242 = state_23200__$1;(statearr_23206_23242[2] = inst_23149);
(statearr_23206_23242[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23201 === 6))
{var inst_23146 = (state_23200[7]);var inst_23151 = f.call(null,inst_23146);var inst_23156 = cljs.core.seq.call(null,inst_23151);var inst_23157 = inst_23156;var inst_23158 = null;var inst_23159 = 0;var inst_23160 = 0;var state_23200__$1 = (function (){var statearr_23207 = state_23200;(statearr_23207[8] = inst_23159);
(statearr_23207[9] = inst_23160);
(statearr_23207[10] = inst_23158);
(statearr_23207[11] = inst_23157);
return statearr_23207;
})();var statearr_23208_23243 = state_23200__$1;(statearr_23208_23243[2] = null);
(statearr_23208_23243[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23201 === 7))
{var inst_23196 = (state_23200[2]);var state_23200__$1 = state_23200;var statearr_23209_23244 = state_23200__$1;(statearr_23209_23244[2] = inst_23196);
(statearr_23209_23244[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23201 === 8))
{var inst_23159 = (state_23200[8]);var inst_23160 = (state_23200[9]);var inst_23162 = (inst_23160 < inst_23159);var inst_23163 = inst_23162;var state_23200__$1 = state_23200;if(cljs.core.truth_(inst_23163))
{var statearr_23210_23245 = state_23200__$1;(statearr_23210_23245[1] = 10);
} else
{var statearr_23211_23246 = state_23200__$1;(statearr_23211_23246[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23201 === 9))
{var inst_23193 = (state_23200[2]);var state_23200__$1 = (function (){var statearr_23212 = state_23200;(statearr_23212[12] = inst_23193);
return statearr_23212;
})();var statearr_23213_23247 = state_23200__$1;(statearr_23213_23247[2] = null);
(statearr_23213_23247[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23201 === 10))
{var inst_23160 = (state_23200[9]);var inst_23158 = (state_23200[10]);var inst_23165 = cljs.core._nth.call(null,inst_23158,inst_23160);var state_23200__$1 = state_23200;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23200__$1,13,out,inst_23165);
} else
{if((state_val_23201 === 11))
{var inst_23157 = (state_23200[11]);var inst_23171 = (state_23200[13]);var inst_23171__$1 = cljs.core.seq.call(null,inst_23157);var state_23200__$1 = (function (){var statearr_23217 = state_23200;(statearr_23217[13] = inst_23171__$1);
return statearr_23217;
})();if(inst_23171__$1)
{var statearr_23218_23248 = state_23200__$1;(statearr_23218_23248[1] = 14);
} else
{var statearr_23219_23249 = state_23200__$1;(statearr_23219_23249[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23201 === 12))
{var inst_23191 = (state_23200[2]);var state_23200__$1 = state_23200;var statearr_23220_23250 = state_23200__$1;(statearr_23220_23250[2] = inst_23191);
(statearr_23220_23250[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23201 === 13))
{var inst_23159 = (state_23200[8]);var inst_23160 = (state_23200[9]);var inst_23158 = (state_23200[10]);var inst_23157 = (state_23200[11]);var inst_23167 = (state_23200[2]);var inst_23168 = (inst_23160 + 1);var tmp23214 = inst_23159;var tmp23215 = inst_23158;var tmp23216 = inst_23157;var inst_23157__$1 = tmp23216;var inst_23158__$1 = tmp23215;var inst_23159__$1 = tmp23214;var inst_23160__$1 = inst_23168;var state_23200__$1 = (function (){var statearr_23221 = state_23200;(statearr_23221[14] = inst_23167);
(statearr_23221[8] = inst_23159__$1);
(statearr_23221[9] = inst_23160__$1);
(statearr_23221[10] = inst_23158__$1);
(statearr_23221[11] = inst_23157__$1);
return statearr_23221;
})();var statearr_23222_23251 = state_23200__$1;(statearr_23222_23251[2] = null);
(statearr_23222_23251[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23201 === 14))
{var inst_23171 = (state_23200[13]);var inst_23173 = cljs.core.chunked_seq_QMARK_.call(null,inst_23171);var state_23200__$1 = state_23200;if(inst_23173)
{var statearr_23223_23252 = state_23200__$1;(statearr_23223_23252[1] = 17);
} else
{var statearr_23224_23253 = state_23200__$1;(statearr_23224_23253[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23201 === 15))
{var state_23200__$1 = state_23200;var statearr_23225_23254 = state_23200__$1;(statearr_23225_23254[2] = null);
(statearr_23225_23254[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23201 === 16))
{var inst_23189 = (state_23200[2]);var state_23200__$1 = state_23200;var statearr_23226_23255 = state_23200__$1;(statearr_23226_23255[2] = inst_23189);
(statearr_23226_23255[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23201 === 17))
{var inst_23171 = (state_23200[13]);var inst_23175 = cljs.core.chunk_first.call(null,inst_23171);var inst_23176 = cljs.core.chunk_rest.call(null,inst_23171);var inst_23177 = cljs.core.count.call(null,inst_23175);var inst_23157 = inst_23176;var inst_23158 = inst_23175;var inst_23159 = inst_23177;var inst_23160 = 0;var state_23200__$1 = (function (){var statearr_23227 = state_23200;(statearr_23227[8] = inst_23159);
(statearr_23227[9] = inst_23160);
(statearr_23227[10] = inst_23158);
(statearr_23227[11] = inst_23157);
return statearr_23227;
})();var statearr_23228_23256 = state_23200__$1;(statearr_23228_23256[2] = null);
(statearr_23228_23256[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23201 === 18))
{var inst_23171 = (state_23200[13]);var inst_23180 = cljs.core.first.call(null,inst_23171);var state_23200__$1 = state_23200;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23200__$1,20,out,inst_23180);
} else
{if((state_val_23201 === 19))
{var inst_23186 = (state_23200[2]);var state_23200__$1 = state_23200;var statearr_23229_23257 = state_23200__$1;(statearr_23229_23257[2] = inst_23186);
(statearr_23229_23257[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23201 === 20))
{var inst_23171 = (state_23200[13]);var inst_23182 = (state_23200[2]);var inst_23183 = cljs.core.next.call(null,inst_23171);var inst_23157 = inst_23183;var inst_23158 = null;var inst_23159 = 0;var inst_23160 = 0;var state_23200__$1 = (function (){var statearr_23230 = state_23200;(statearr_23230[8] = inst_23159);
(statearr_23230[9] = inst_23160);
(statearr_23230[10] = inst_23158);
(statearr_23230[11] = inst_23157);
(statearr_23230[15] = inst_23182);
return statearr_23230;
})();var statearr_23231_23258 = state_23200__$1;(statearr_23231_23258[2] = null);
(statearr_23231_23258[1] = 8);
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
});return ((function (switch__18273__auto__){
return (function() {
var state_machine__18274__auto__ = null;
var state_machine__18274__auto____0 = (function (){var statearr_23235 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_23235[0] = state_machine__18274__auto__);
(statearr_23235[1] = 1);
return statearr_23235;
});
var state_machine__18274__auto____1 = (function (state_23200){while(true){
var ret_value__18275__auto__ = (function (){try{while(true){
var result__18276__auto__ = switch__18273__auto__.call(null,state_23200);if(cljs.core.keyword_identical_QMARK_.call(null,result__18276__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__18276__auto__;
}
break;
}
}catch (e23236){if((e23236 instanceof Object))
{var ex__18277__auto__ = e23236;var statearr_23237_23259 = state_23200;(statearr_23237_23259[5] = ex__18277__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23200);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e23236;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18275__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__23260 = state_23200;
state_23200 = G__23260;
continue;
}
} else
{return ret_value__18275__auto__;
}
break;
}
});
state_machine__18274__auto__ = function(state_23200){
switch(arguments.length){
case 0:
return state_machine__18274__auto____0.call(this);
case 1:
return state_machine__18274__auto____1.call(this,state_23200);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__18274__auto____0;
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__18274__auto____1;
return state_machine__18274__auto__;
})()
;})(switch__18273__auto__))
})();var state__18290__auto__ = (function (){var statearr_23238 = f__18289__auto__.call(null);(statearr_23238[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__18288__auto__);
return statearr_23238;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18290__auto__);
}));
return c__18288__auto__;
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
var pipe__3 = (function (from,to,close_QMARK_){var c__18288__auto___23341 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__18289__auto__ = (function (){var switch__18273__auto__ = (function (state_23320){var state_val_23321 = (state_23320[1]);if((state_val_23321 === 1))
{var state_23320__$1 = state_23320;var statearr_23322_23342 = state_23320__$1;(statearr_23322_23342[2] = null);
(statearr_23322_23342[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23321 === 2))
{var state_23320__$1 = state_23320;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23320__$1,4,from);
} else
{if((state_val_23321 === 3))
{var inst_23318 = (state_23320[2]);var state_23320__$1 = state_23320;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23320__$1,inst_23318);
} else
{if((state_val_23321 === 4))
{var inst_23303 = (state_23320[7]);var inst_23303__$1 = (state_23320[2]);var inst_23304 = (inst_23303__$1 == null);var state_23320__$1 = (function (){var statearr_23323 = state_23320;(statearr_23323[7] = inst_23303__$1);
return statearr_23323;
})();if(cljs.core.truth_(inst_23304))
{var statearr_23324_23343 = state_23320__$1;(statearr_23324_23343[1] = 5);
} else
{var statearr_23325_23344 = state_23320__$1;(statearr_23325_23344[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23321 === 5))
{var state_23320__$1 = state_23320;if(cljs.core.truth_(close_QMARK_))
{var statearr_23326_23345 = state_23320__$1;(statearr_23326_23345[1] = 8);
} else
{var statearr_23327_23346 = state_23320__$1;(statearr_23327_23346[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23321 === 6))
{var inst_23303 = (state_23320[7]);var state_23320__$1 = state_23320;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23320__$1,11,to,inst_23303);
} else
{if((state_val_23321 === 7))
{var inst_23316 = (state_23320[2]);var state_23320__$1 = state_23320;var statearr_23328_23347 = state_23320__$1;(statearr_23328_23347[2] = inst_23316);
(statearr_23328_23347[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23321 === 8))
{var inst_23307 = cljs.core.async.close_BANG_.call(null,to);var state_23320__$1 = state_23320;var statearr_23329_23348 = state_23320__$1;(statearr_23329_23348[2] = inst_23307);
(statearr_23329_23348[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23321 === 9))
{var state_23320__$1 = state_23320;var statearr_23330_23349 = state_23320__$1;(statearr_23330_23349[2] = null);
(statearr_23330_23349[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23321 === 10))
{var inst_23310 = (state_23320[2]);var state_23320__$1 = state_23320;var statearr_23331_23350 = state_23320__$1;(statearr_23331_23350[2] = inst_23310);
(statearr_23331_23350[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23321 === 11))
{var inst_23313 = (state_23320[2]);var state_23320__$1 = (function (){var statearr_23332 = state_23320;(statearr_23332[8] = inst_23313);
return statearr_23332;
})();var statearr_23333_23351 = state_23320__$1;(statearr_23333_23351[2] = null);
(statearr_23333_23351[1] = 2);
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
});return ((function (switch__18273__auto__){
return (function() {
var state_machine__18274__auto__ = null;
var state_machine__18274__auto____0 = (function (){var statearr_23337 = [null,null,null,null,null,null,null,null,null];(statearr_23337[0] = state_machine__18274__auto__);
(statearr_23337[1] = 1);
return statearr_23337;
});
var state_machine__18274__auto____1 = (function (state_23320){while(true){
var ret_value__18275__auto__ = (function (){try{while(true){
var result__18276__auto__ = switch__18273__auto__.call(null,state_23320);if(cljs.core.keyword_identical_QMARK_.call(null,result__18276__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__18276__auto__;
}
break;
}
}catch (e23338){if((e23338 instanceof Object))
{var ex__18277__auto__ = e23338;var statearr_23339_23352 = state_23320;(statearr_23339_23352[5] = ex__18277__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23320);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e23338;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18275__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__23353 = state_23320;
state_23320 = G__23353;
continue;
}
} else
{return ret_value__18275__auto__;
}
break;
}
});
state_machine__18274__auto__ = function(state_23320){
switch(arguments.length){
case 0:
return state_machine__18274__auto____0.call(this);
case 1:
return state_machine__18274__auto____1.call(this,state_23320);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__18274__auto____0;
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__18274__auto____1;
return state_machine__18274__auto__;
})()
;})(switch__18273__auto__))
})();var state__18290__auto__ = (function (){var statearr_23340 = f__18289__auto__.call(null);(statearr_23340[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__18288__auto___23341);
return statearr_23340;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18290__auto__);
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
var split__4 = (function (p,ch,t_buf_or_n,f_buf_or_n){var tc = cljs.core.async.chan.call(null,t_buf_or_n);var fc = cljs.core.async.chan.call(null,f_buf_or_n);var c__18288__auto___23440 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__18289__auto__ = (function (){var switch__18273__auto__ = (function (state_23418){var state_val_23419 = (state_23418[1]);if((state_val_23419 === 1))
{var state_23418__$1 = state_23418;var statearr_23420_23441 = state_23418__$1;(statearr_23420_23441[2] = null);
(statearr_23420_23441[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23419 === 2))
{var state_23418__$1 = state_23418;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23418__$1,4,ch);
} else
{if((state_val_23419 === 3))
{var inst_23416 = (state_23418[2]);var state_23418__$1 = state_23418;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23418__$1,inst_23416);
} else
{if((state_val_23419 === 4))
{var inst_23399 = (state_23418[7]);var inst_23399__$1 = (state_23418[2]);var inst_23400 = (inst_23399__$1 == null);var state_23418__$1 = (function (){var statearr_23421 = state_23418;(statearr_23421[7] = inst_23399__$1);
return statearr_23421;
})();if(cljs.core.truth_(inst_23400))
{var statearr_23422_23442 = state_23418__$1;(statearr_23422_23442[1] = 5);
} else
{var statearr_23423_23443 = state_23418__$1;(statearr_23423_23443[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23419 === 5))
{var inst_23402 = cljs.core.async.close_BANG_.call(null,tc);var inst_23403 = cljs.core.async.close_BANG_.call(null,fc);var state_23418__$1 = (function (){var statearr_23424 = state_23418;(statearr_23424[8] = inst_23402);
return statearr_23424;
})();var statearr_23425_23444 = state_23418__$1;(statearr_23425_23444[2] = inst_23403);
(statearr_23425_23444[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23419 === 6))
{var inst_23399 = (state_23418[7]);var inst_23405 = p.call(null,inst_23399);var state_23418__$1 = state_23418;if(cljs.core.truth_(inst_23405))
{var statearr_23426_23445 = state_23418__$1;(statearr_23426_23445[1] = 9);
} else
{var statearr_23427_23446 = state_23418__$1;(statearr_23427_23446[1] = 10);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23419 === 7))
{var inst_23414 = (state_23418[2]);var state_23418__$1 = state_23418;var statearr_23428_23447 = state_23418__$1;(statearr_23428_23447[2] = inst_23414);
(statearr_23428_23447[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23419 === 8))
{var inst_23411 = (state_23418[2]);var state_23418__$1 = (function (){var statearr_23429 = state_23418;(statearr_23429[9] = inst_23411);
return statearr_23429;
})();var statearr_23430_23448 = state_23418__$1;(statearr_23430_23448[2] = null);
(statearr_23430_23448[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23419 === 9))
{var state_23418__$1 = state_23418;var statearr_23431_23449 = state_23418__$1;(statearr_23431_23449[2] = tc);
(statearr_23431_23449[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23419 === 10))
{var state_23418__$1 = state_23418;var statearr_23432_23450 = state_23418__$1;(statearr_23432_23450[2] = fc);
(statearr_23432_23450[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23419 === 11))
{var inst_23399 = (state_23418[7]);var inst_23409 = (state_23418[2]);var state_23418__$1 = state_23418;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23418__$1,8,inst_23409,inst_23399);
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
});return ((function (switch__18273__auto__){
return (function() {
var state_machine__18274__auto__ = null;
var state_machine__18274__auto____0 = (function (){var statearr_23436 = [null,null,null,null,null,null,null,null,null,null];(statearr_23436[0] = state_machine__18274__auto__);
(statearr_23436[1] = 1);
return statearr_23436;
});
var state_machine__18274__auto____1 = (function (state_23418){while(true){
var ret_value__18275__auto__ = (function (){try{while(true){
var result__18276__auto__ = switch__18273__auto__.call(null,state_23418);if(cljs.core.keyword_identical_QMARK_.call(null,result__18276__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__18276__auto__;
}
break;
}
}catch (e23437){if((e23437 instanceof Object))
{var ex__18277__auto__ = e23437;var statearr_23438_23451 = state_23418;(statearr_23438_23451[5] = ex__18277__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23418);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e23437;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18275__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__23452 = state_23418;
state_23418 = G__23452;
continue;
}
} else
{return ret_value__18275__auto__;
}
break;
}
});
state_machine__18274__auto__ = function(state_23418){
switch(arguments.length){
case 0:
return state_machine__18274__auto____0.call(this);
case 1:
return state_machine__18274__auto____1.call(this,state_23418);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__18274__auto____0;
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__18274__auto____1;
return state_machine__18274__auto__;
})()
;})(switch__18273__auto__))
})();var state__18290__auto__ = (function (){var statearr_23439 = f__18289__auto__.call(null);(statearr_23439[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__18288__auto___23440);
return statearr_23439;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18290__auto__);
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
cljs.core.async.reduce = (function reduce(f,init,ch){var c__18288__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__18289__auto__ = (function (){var switch__18273__auto__ = (function (state_23499){var state_val_23500 = (state_23499[1]);if((state_val_23500 === 7))
{var inst_23495 = (state_23499[2]);var state_23499__$1 = state_23499;var statearr_23501_23517 = state_23499__$1;(statearr_23501_23517[2] = inst_23495);
(statearr_23501_23517[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23500 === 6))
{var inst_23488 = (state_23499[7]);var inst_23485 = (state_23499[8]);var inst_23492 = f.call(null,inst_23485,inst_23488);var inst_23485__$1 = inst_23492;var state_23499__$1 = (function (){var statearr_23502 = state_23499;(statearr_23502[8] = inst_23485__$1);
return statearr_23502;
})();var statearr_23503_23518 = state_23499__$1;(statearr_23503_23518[2] = null);
(statearr_23503_23518[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23500 === 5))
{var inst_23485 = (state_23499[8]);var state_23499__$1 = state_23499;var statearr_23504_23519 = state_23499__$1;(statearr_23504_23519[2] = inst_23485);
(statearr_23504_23519[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23500 === 4))
{var inst_23488 = (state_23499[7]);var inst_23488__$1 = (state_23499[2]);var inst_23489 = (inst_23488__$1 == null);var state_23499__$1 = (function (){var statearr_23505 = state_23499;(statearr_23505[7] = inst_23488__$1);
return statearr_23505;
})();if(cljs.core.truth_(inst_23489))
{var statearr_23506_23520 = state_23499__$1;(statearr_23506_23520[1] = 5);
} else
{var statearr_23507_23521 = state_23499__$1;(statearr_23507_23521[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23500 === 3))
{var inst_23497 = (state_23499[2]);var state_23499__$1 = state_23499;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23499__$1,inst_23497);
} else
{if((state_val_23500 === 2))
{var state_23499__$1 = state_23499;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23499__$1,4,ch);
} else
{if((state_val_23500 === 1))
{var inst_23485 = init;var state_23499__$1 = (function (){var statearr_23508 = state_23499;(statearr_23508[8] = inst_23485);
return statearr_23508;
})();var statearr_23509_23522 = state_23499__$1;(statearr_23509_23522[2] = null);
(statearr_23509_23522[1] = 2);
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
});return ((function (switch__18273__auto__){
return (function() {
var state_machine__18274__auto__ = null;
var state_machine__18274__auto____0 = (function (){var statearr_23513 = [null,null,null,null,null,null,null,null,null];(statearr_23513[0] = state_machine__18274__auto__);
(statearr_23513[1] = 1);
return statearr_23513;
});
var state_machine__18274__auto____1 = (function (state_23499){while(true){
var ret_value__18275__auto__ = (function (){try{while(true){
var result__18276__auto__ = switch__18273__auto__.call(null,state_23499);if(cljs.core.keyword_identical_QMARK_.call(null,result__18276__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__18276__auto__;
}
break;
}
}catch (e23514){if((e23514 instanceof Object))
{var ex__18277__auto__ = e23514;var statearr_23515_23523 = state_23499;(statearr_23515_23523[5] = ex__18277__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23499);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e23514;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18275__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__23524 = state_23499;
state_23499 = G__23524;
continue;
}
} else
{return ret_value__18275__auto__;
}
break;
}
});
state_machine__18274__auto__ = function(state_23499){
switch(arguments.length){
case 0:
return state_machine__18274__auto____0.call(this);
case 1:
return state_machine__18274__auto____1.call(this,state_23499);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__18274__auto____0;
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__18274__auto____1;
return state_machine__18274__auto__;
})()
;})(switch__18273__auto__))
})();var state__18290__auto__ = (function (){var statearr_23516 = f__18289__auto__.call(null);(statearr_23516[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__18288__auto__);
return statearr_23516;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18290__auto__);
}));
return c__18288__auto__;
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
var onto_chan__3 = (function (ch,coll,close_QMARK_){var c__18288__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__18289__auto__ = (function (){var switch__18273__auto__ = (function (state_23586){var state_val_23587 = (state_23586[1]);if((state_val_23587 === 1))
{var inst_23566 = cljs.core.seq.call(null,coll);var inst_23567 = inst_23566;var state_23586__$1 = (function (){var statearr_23588 = state_23586;(statearr_23588[7] = inst_23567);
return statearr_23588;
})();var statearr_23589_23607 = state_23586__$1;(statearr_23589_23607[2] = null);
(statearr_23589_23607[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23587 === 2))
{var inst_23567 = (state_23586[7]);var state_23586__$1 = state_23586;if(cljs.core.truth_(inst_23567))
{var statearr_23590_23608 = state_23586__$1;(statearr_23590_23608[1] = 4);
} else
{var statearr_23591_23609 = state_23586__$1;(statearr_23591_23609[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23587 === 3))
{var inst_23584 = (state_23586[2]);var state_23586__$1 = state_23586;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23586__$1,inst_23584);
} else
{if((state_val_23587 === 4))
{var inst_23567 = (state_23586[7]);var inst_23570 = cljs.core.first.call(null,inst_23567);var state_23586__$1 = state_23586;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23586__$1,7,ch,inst_23570);
} else
{if((state_val_23587 === 5))
{var state_23586__$1 = state_23586;if(cljs.core.truth_(close_QMARK_))
{var statearr_23592_23610 = state_23586__$1;(statearr_23592_23610[1] = 8);
} else
{var statearr_23593_23611 = state_23586__$1;(statearr_23593_23611[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23587 === 6))
{var inst_23582 = (state_23586[2]);var state_23586__$1 = state_23586;var statearr_23594_23612 = state_23586__$1;(statearr_23594_23612[2] = inst_23582);
(statearr_23594_23612[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23587 === 7))
{var inst_23567 = (state_23586[7]);var inst_23572 = (state_23586[2]);var inst_23573 = cljs.core.next.call(null,inst_23567);var inst_23567__$1 = inst_23573;var state_23586__$1 = (function (){var statearr_23595 = state_23586;(statearr_23595[8] = inst_23572);
(statearr_23595[7] = inst_23567__$1);
return statearr_23595;
})();var statearr_23596_23613 = state_23586__$1;(statearr_23596_23613[2] = null);
(statearr_23596_23613[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23587 === 8))
{var inst_23577 = cljs.core.async.close_BANG_.call(null,ch);var state_23586__$1 = state_23586;var statearr_23597_23614 = state_23586__$1;(statearr_23597_23614[2] = inst_23577);
(statearr_23597_23614[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23587 === 9))
{var state_23586__$1 = state_23586;var statearr_23598_23615 = state_23586__$1;(statearr_23598_23615[2] = null);
(statearr_23598_23615[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23587 === 10))
{var inst_23580 = (state_23586[2]);var state_23586__$1 = state_23586;var statearr_23599_23616 = state_23586__$1;(statearr_23599_23616[2] = inst_23580);
(statearr_23599_23616[1] = 6);
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
});return ((function (switch__18273__auto__){
return (function() {
var state_machine__18274__auto__ = null;
var state_machine__18274__auto____0 = (function (){var statearr_23603 = [null,null,null,null,null,null,null,null,null];(statearr_23603[0] = state_machine__18274__auto__);
(statearr_23603[1] = 1);
return statearr_23603;
});
var state_machine__18274__auto____1 = (function (state_23586){while(true){
var ret_value__18275__auto__ = (function (){try{while(true){
var result__18276__auto__ = switch__18273__auto__.call(null,state_23586);if(cljs.core.keyword_identical_QMARK_.call(null,result__18276__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__18276__auto__;
}
break;
}
}catch (e23604){if((e23604 instanceof Object))
{var ex__18277__auto__ = e23604;var statearr_23605_23617 = state_23586;(statearr_23605_23617[5] = ex__18277__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23586);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e23604;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18275__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__23618 = state_23586;
state_23586 = G__23618;
continue;
}
} else
{return ret_value__18275__auto__;
}
break;
}
});
state_machine__18274__auto__ = function(state_23586){
switch(arguments.length){
case 0:
return state_machine__18274__auto____0.call(this);
case 1:
return state_machine__18274__auto____1.call(this,state_23586);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__18274__auto____0;
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__18274__auto____1;
return state_machine__18274__auto__;
})()
;})(switch__18273__auto__))
})();var state__18290__auto__ = (function (){var statearr_23606 = f__18289__auto__.call(null);(statearr_23606[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__18288__auto__);
return statearr_23606;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18290__auto__);
}));
return c__18288__auto__;
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
cljs.core.async.Mux = (function (){var obj23620 = {};return obj23620;
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
cljs.core.async.Mult = (function (){var obj23622 = {};return obj23622;
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
cljs.core.async.mult = (function mult(ch){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var m = (function (){if(typeof cljs.core.async.t23846 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t23846 = (function (cs,ch,mult,meta23847){
this.cs = cs;
this.ch = ch;
this.mult = mult;
this.meta23847 = meta23847;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t23846.cljs$lang$type = true;
cljs.core.async.t23846.cljs$lang$ctorStr = "cljs.core.async/t23846";
cljs.core.async.t23846.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t23846");
});})(cs))
;
cljs.core.async.t23846.prototype.cljs$core$async$Mult$ = true;
cljs.core.async.t23846.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$2,close_QMARK_){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$2,close_QMARK_);
return null;
});})(cs))
;
cljs.core.async.t23846.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$2){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$2);
return null;
});})(cs))
;
cljs.core.async.t23846.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return null;
});})(cs))
;
cljs.core.async.t23846.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t23846.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(cs))
;
cljs.core.async.t23846.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_23848){var self__ = this;
var _23848__$1 = this;return self__.meta23847;
});})(cs))
;
cljs.core.async.t23846.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_23848,meta23847__$1){var self__ = this;
var _23848__$1 = this;return (new cljs.core.async.t23846(self__.cs,self__.ch,self__.mult,meta23847__$1));
});})(cs))
;
cljs.core.async.__GT_t23846 = ((function (cs){
return (function __GT_t23846(cs__$1,ch__$1,mult__$1,meta23847){return (new cljs.core.async.t23846(cs__$1,ch__$1,mult__$1,meta23847));
});})(cs))
;
}
return (new cljs.core.async.t23846(cs,ch,mult,null));
})();var dchan = cljs.core.async.chan.call(null,1);var dctr = cljs.core.atom.call(null,null);var done = ((function (cs,m,dchan,dctr){
return (function (){if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === 0))
{return cljs.core.async.put_BANG_.call(null,dchan,true);
} else
{return null;
}
});})(cs,m,dchan,dctr))
;var c__18288__auto___24069 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__18289__auto__ = (function (){var switch__18273__auto__ = (function (state_23983){var state_val_23984 = (state_23983[1]);if((state_val_23984 === 32))
{var inst_23927 = (state_23983[7]);var inst_23851 = (state_23983[8]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_23983,31,Object,null,30);var inst_23934 = cljs.core.async.put_BANG_.call(null,inst_23927,inst_23851,done);var state_23983__$1 = state_23983;var statearr_23985_24070 = state_23983__$1;(statearr_23985_24070[2] = inst_23934);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23983__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 1))
{var state_23983__$1 = state_23983;var statearr_23986_24071 = state_23983__$1;(statearr_23986_24071[2] = null);
(statearr_23986_24071[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 33))
{var inst_23940 = (state_23983[9]);var inst_23942 = cljs.core.chunked_seq_QMARK_.call(null,inst_23940);var state_23983__$1 = state_23983;if(inst_23942)
{var statearr_23987_24072 = state_23983__$1;(statearr_23987_24072[1] = 36);
} else
{var statearr_23988_24073 = state_23983__$1;(statearr_23988_24073[1] = 37);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 2))
{var state_23983__$1 = state_23983;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23983__$1,4,ch);
} else
{if((state_val_23984 === 34))
{var state_23983__$1 = state_23983;var statearr_23989_24074 = state_23983__$1;(statearr_23989_24074[2] = null);
(statearr_23989_24074[1] = 35);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 3))
{var inst_23981 = (state_23983[2]);var state_23983__$1 = state_23983;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23983__$1,inst_23981);
} else
{if((state_val_23984 === 35))
{var inst_23965 = (state_23983[2]);var state_23983__$1 = state_23983;var statearr_23990_24075 = state_23983__$1;(statearr_23990_24075[2] = inst_23965);
(statearr_23990_24075[1] = 29);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 4))
{var inst_23851 = (state_23983[8]);var inst_23851__$1 = (state_23983[2]);var inst_23852 = (inst_23851__$1 == null);var state_23983__$1 = (function (){var statearr_23991 = state_23983;(statearr_23991[8] = inst_23851__$1);
return statearr_23991;
})();if(cljs.core.truth_(inst_23852))
{var statearr_23992_24076 = state_23983__$1;(statearr_23992_24076[1] = 5);
} else
{var statearr_23993_24077 = state_23983__$1;(statearr_23993_24077[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 36))
{var inst_23940 = (state_23983[9]);var inst_23944 = cljs.core.chunk_first.call(null,inst_23940);var inst_23945 = cljs.core.chunk_rest.call(null,inst_23940);var inst_23946 = cljs.core.count.call(null,inst_23944);var inst_23919 = inst_23945;var inst_23920 = inst_23944;var inst_23921 = inst_23946;var inst_23922 = 0;var state_23983__$1 = (function (){var statearr_23994 = state_23983;(statearr_23994[10] = inst_23919);
(statearr_23994[11] = inst_23920);
(statearr_23994[12] = inst_23921);
(statearr_23994[13] = inst_23922);
return statearr_23994;
})();var statearr_23995_24078 = state_23983__$1;(statearr_23995_24078[2] = null);
(statearr_23995_24078[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 5))
{var inst_23858 = cljs.core.deref.call(null,cs);var inst_23859 = cljs.core.seq.call(null,inst_23858);var inst_23860 = inst_23859;var inst_23861 = null;var inst_23862 = 0;var inst_23863 = 0;var state_23983__$1 = (function (){var statearr_23996 = state_23983;(statearr_23996[14] = inst_23863);
(statearr_23996[15] = inst_23862);
(statearr_23996[16] = inst_23861);
(statearr_23996[17] = inst_23860);
return statearr_23996;
})();var statearr_23997_24079 = state_23983__$1;(statearr_23997_24079[2] = null);
(statearr_23997_24079[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 37))
{var inst_23940 = (state_23983[9]);var inst_23949 = cljs.core.first.call(null,inst_23940);var state_23983__$1 = (function (){var statearr_23998 = state_23983;(statearr_23998[18] = inst_23949);
return statearr_23998;
})();var statearr_23999_24080 = state_23983__$1;(statearr_23999_24080[2] = null);
(statearr_23999_24080[1] = 41);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 6))
{var inst_23911 = (state_23983[19]);var inst_23910 = cljs.core.deref.call(null,cs);var inst_23911__$1 = cljs.core.keys.call(null,inst_23910);var inst_23912 = cljs.core.count.call(null,inst_23911__$1);var inst_23913 = cljs.core.reset_BANG_.call(null,dctr,inst_23912);var inst_23918 = cljs.core.seq.call(null,inst_23911__$1);var inst_23919 = inst_23918;var inst_23920 = null;var inst_23921 = 0;var inst_23922 = 0;var state_23983__$1 = (function (){var statearr_24000 = state_23983;(statearr_24000[19] = inst_23911__$1);
(statearr_24000[20] = inst_23913);
(statearr_24000[10] = inst_23919);
(statearr_24000[11] = inst_23920);
(statearr_24000[12] = inst_23921);
(statearr_24000[13] = inst_23922);
return statearr_24000;
})();var statearr_24001_24081 = state_23983__$1;(statearr_24001_24081[2] = null);
(statearr_24001_24081[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 38))
{var inst_23962 = (state_23983[2]);var state_23983__$1 = state_23983;var statearr_24002_24082 = state_23983__$1;(statearr_24002_24082[2] = inst_23962);
(statearr_24002_24082[1] = 35);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 7))
{var inst_23979 = (state_23983[2]);var state_23983__$1 = state_23983;var statearr_24003_24083 = state_23983__$1;(statearr_24003_24083[2] = inst_23979);
(statearr_24003_24083[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 39))
{var inst_23940 = (state_23983[9]);var inst_23958 = (state_23983[2]);var inst_23959 = cljs.core.next.call(null,inst_23940);var inst_23919 = inst_23959;var inst_23920 = null;var inst_23921 = 0;var inst_23922 = 0;var state_23983__$1 = (function (){var statearr_24004 = state_23983;(statearr_24004[21] = inst_23958);
(statearr_24004[10] = inst_23919);
(statearr_24004[11] = inst_23920);
(statearr_24004[12] = inst_23921);
(statearr_24004[13] = inst_23922);
return statearr_24004;
})();var statearr_24005_24084 = state_23983__$1;(statearr_24005_24084[2] = null);
(statearr_24005_24084[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 8))
{var inst_23863 = (state_23983[14]);var inst_23862 = (state_23983[15]);var inst_23865 = (inst_23863 < inst_23862);var inst_23866 = inst_23865;var state_23983__$1 = state_23983;if(cljs.core.truth_(inst_23866))
{var statearr_24006_24085 = state_23983__$1;(statearr_24006_24085[1] = 10);
} else
{var statearr_24007_24086 = state_23983__$1;(statearr_24007_24086[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 40))
{var inst_23949 = (state_23983[18]);var inst_23950 = (state_23983[2]);var inst_23951 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var inst_23952 = cljs.core.async.untap_STAR_.call(null,m,inst_23949);var state_23983__$1 = (function (){var statearr_24008 = state_23983;(statearr_24008[22] = inst_23951);
(statearr_24008[23] = inst_23950);
return statearr_24008;
})();var statearr_24009_24087 = state_23983__$1;(statearr_24009_24087[2] = inst_23952);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23983__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 9))
{var inst_23908 = (state_23983[2]);var state_23983__$1 = state_23983;var statearr_24010_24088 = state_23983__$1;(statearr_24010_24088[2] = inst_23908);
(statearr_24010_24088[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 41))
{var inst_23949 = (state_23983[18]);var inst_23851 = (state_23983[8]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_23983,40,Object,null,39);var inst_23956 = cljs.core.async.put_BANG_.call(null,inst_23949,inst_23851,done);var state_23983__$1 = state_23983;var statearr_24011_24089 = state_23983__$1;(statearr_24011_24089[2] = inst_23956);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23983__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 10))
{var inst_23863 = (state_23983[14]);var inst_23861 = (state_23983[16]);var inst_23869 = cljs.core._nth.call(null,inst_23861,inst_23863);var inst_23870 = cljs.core.nth.call(null,inst_23869,0,null);var inst_23871 = cljs.core.nth.call(null,inst_23869,1,null);var state_23983__$1 = (function (){var statearr_24012 = state_23983;(statearr_24012[24] = inst_23870);
return statearr_24012;
})();if(cljs.core.truth_(inst_23871))
{var statearr_24013_24090 = state_23983__$1;(statearr_24013_24090[1] = 13);
} else
{var statearr_24014_24091 = state_23983__$1;(statearr_24014_24091[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 42))
{var state_23983__$1 = state_23983;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23983__$1,45,dchan);
} else
{if((state_val_23984 === 11))
{var inst_23880 = (state_23983[25]);var inst_23860 = (state_23983[17]);var inst_23880__$1 = cljs.core.seq.call(null,inst_23860);var state_23983__$1 = (function (){var statearr_24015 = state_23983;(statearr_24015[25] = inst_23880__$1);
return statearr_24015;
})();if(inst_23880__$1)
{var statearr_24016_24092 = state_23983__$1;(statearr_24016_24092[1] = 16);
} else
{var statearr_24017_24093 = state_23983__$1;(statearr_24017_24093[1] = 17);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 43))
{var state_23983__$1 = state_23983;var statearr_24018_24094 = state_23983__$1;(statearr_24018_24094[2] = null);
(statearr_24018_24094[1] = 44);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 12))
{var inst_23906 = (state_23983[2]);var state_23983__$1 = state_23983;var statearr_24019_24095 = state_23983__$1;(statearr_24019_24095[2] = inst_23906);
(statearr_24019_24095[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 44))
{var inst_23976 = (state_23983[2]);var state_23983__$1 = (function (){var statearr_24020 = state_23983;(statearr_24020[26] = inst_23976);
return statearr_24020;
})();var statearr_24021_24096 = state_23983__$1;(statearr_24021_24096[2] = null);
(statearr_24021_24096[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 13))
{var inst_23870 = (state_23983[24]);var inst_23873 = cljs.core.async.close_BANG_.call(null,inst_23870);var state_23983__$1 = state_23983;var statearr_24022_24097 = state_23983__$1;(statearr_24022_24097[2] = inst_23873);
(statearr_24022_24097[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 45))
{var inst_23973 = (state_23983[2]);var state_23983__$1 = state_23983;var statearr_24026_24098 = state_23983__$1;(statearr_24026_24098[2] = inst_23973);
(statearr_24026_24098[1] = 44);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 14))
{var state_23983__$1 = state_23983;var statearr_24027_24099 = state_23983__$1;(statearr_24027_24099[2] = null);
(statearr_24027_24099[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 15))
{var inst_23863 = (state_23983[14]);var inst_23862 = (state_23983[15]);var inst_23861 = (state_23983[16]);var inst_23860 = (state_23983[17]);var inst_23876 = (state_23983[2]);var inst_23877 = (inst_23863 + 1);var tmp24023 = inst_23862;var tmp24024 = inst_23861;var tmp24025 = inst_23860;var inst_23860__$1 = tmp24025;var inst_23861__$1 = tmp24024;var inst_23862__$1 = tmp24023;var inst_23863__$1 = inst_23877;var state_23983__$1 = (function (){var statearr_24028 = state_23983;(statearr_24028[27] = inst_23876);
(statearr_24028[14] = inst_23863__$1);
(statearr_24028[15] = inst_23862__$1);
(statearr_24028[16] = inst_23861__$1);
(statearr_24028[17] = inst_23860__$1);
return statearr_24028;
})();var statearr_24029_24100 = state_23983__$1;(statearr_24029_24100[2] = null);
(statearr_24029_24100[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 16))
{var inst_23880 = (state_23983[25]);var inst_23882 = cljs.core.chunked_seq_QMARK_.call(null,inst_23880);var state_23983__$1 = state_23983;if(inst_23882)
{var statearr_24030_24101 = state_23983__$1;(statearr_24030_24101[1] = 19);
} else
{var statearr_24031_24102 = state_23983__$1;(statearr_24031_24102[1] = 20);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 17))
{var state_23983__$1 = state_23983;var statearr_24032_24103 = state_23983__$1;(statearr_24032_24103[2] = null);
(statearr_24032_24103[1] = 18);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 18))
{var inst_23904 = (state_23983[2]);var state_23983__$1 = state_23983;var statearr_24033_24104 = state_23983__$1;(statearr_24033_24104[2] = inst_23904);
(statearr_24033_24104[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 19))
{var inst_23880 = (state_23983[25]);var inst_23884 = cljs.core.chunk_first.call(null,inst_23880);var inst_23885 = cljs.core.chunk_rest.call(null,inst_23880);var inst_23886 = cljs.core.count.call(null,inst_23884);var inst_23860 = inst_23885;var inst_23861 = inst_23884;var inst_23862 = inst_23886;var inst_23863 = 0;var state_23983__$1 = (function (){var statearr_24034 = state_23983;(statearr_24034[14] = inst_23863);
(statearr_24034[15] = inst_23862);
(statearr_24034[16] = inst_23861);
(statearr_24034[17] = inst_23860);
return statearr_24034;
})();var statearr_24035_24105 = state_23983__$1;(statearr_24035_24105[2] = null);
(statearr_24035_24105[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 20))
{var inst_23880 = (state_23983[25]);var inst_23890 = cljs.core.first.call(null,inst_23880);var inst_23891 = cljs.core.nth.call(null,inst_23890,0,null);var inst_23892 = cljs.core.nth.call(null,inst_23890,1,null);var state_23983__$1 = (function (){var statearr_24036 = state_23983;(statearr_24036[28] = inst_23891);
return statearr_24036;
})();if(cljs.core.truth_(inst_23892))
{var statearr_24037_24106 = state_23983__$1;(statearr_24037_24106[1] = 22);
} else
{var statearr_24038_24107 = state_23983__$1;(statearr_24038_24107[1] = 23);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 21))
{var inst_23901 = (state_23983[2]);var state_23983__$1 = state_23983;var statearr_24039_24108 = state_23983__$1;(statearr_24039_24108[2] = inst_23901);
(statearr_24039_24108[1] = 18);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 22))
{var inst_23891 = (state_23983[28]);var inst_23894 = cljs.core.async.close_BANG_.call(null,inst_23891);var state_23983__$1 = state_23983;var statearr_24040_24109 = state_23983__$1;(statearr_24040_24109[2] = inst_23894);
(statearr_24040_24109[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 23))
{var state_23983__$1 = state_23983;var statearr_24041_24110 = state_23983__$1;(statearr_24041_24110[2] = null);
(statearr_24041_24110[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 24))
{var inst_23880 = (state_23983[25]);var inst_23897 = (state_23983[2]);var inst_23898 = cljs.core.next.call(null,inst_23880);var inst_23860 = inst_23898;var inst_23861 = null;var inst_23862 = 0;var inst_23863 = 0;var state_23983__$1 = (function (){var statearr_24042 = state_23983;(statearr_24042[14] = inst_23863);
(statearr_24042[29] = inst_23897);
(statearr_24042[15] = inst_23862);
(statearr_24042[16] = inst_23861);
(statearr_24042[17] = inst_23860);
return statearr_24042;
})();var statearr_24043_24111 = state_23983__$1;(statearr_24043_24111[2] = null);
(statearr_24043_24111[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 25))
{var inst_23921 = (state_23983[12]);var inst_23922 = (state_23983[13]);var inst_23924 = (inst_23922 < inst_23921);var inst_23925 = inst_23924;var state_23983__$1 = state_23983;if(cljs.core.truth_(inst_23925))
{var statearr_24044_24112 = state_23983__$1;(statearr_24044_24112[1] = 27);
} else
{var statearr_24045_24113 = state_23983__$1;(statearr_24045_24113[1] = 28);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 26))
{var inst_23911 = (state_23983[19]);var inst_23969 = (state_23983[2]);var inst_23970 = cljs.core.seq.call(null,inst_23911);var state_23983__$1 = (function (){var statearr_24046 = state_23983;(statearr_24046[30] = inst_23969);
return statearr_24046;
})();if(inst_23970)
{var statearr_24047_24114 = state_23983__$1;(statearr_24047_24114[1] = 42);
} else
{var statearr_24048_24115 = state_23983__$1;(statearr_24048_24115[1] = 43);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 27))
{var inst_23920 = (state_23983[11]);var inst_23922 = (state_23983[13]);var inst_23927 = cljs.core._nth.call(null,inst_23920,inst_23922);var state_23983__$1 = (function (){var statearr_24049 = state_23983;(statearr_24049[7] = inst_23927);
return statearr_24049;
})();var statearr_24050_24116 = state_23983__$1;(statearr_24050_24116[2] = null);
(statearr_24050_24116[1] = 32);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 28))
{var inst_23940 = (state_23983[9]);var inst_23919 = (state_23983[10]);var inst_23940__$1 = cljs.core.seq.call(null,inst_23919);var state_23983__$1 = (function (){var statearr_24054 = state_23983;(statearr_24054[9] = inst_23940__$1);
return statearr_24054;
})();if(inst_23940__$1)
{var statearr_24055_24117 = state_23983__$1;(statearr_24055_24117[1] = 33);
} else
{var statearr_24056_24118 = state_23983__$1;(statearr_24056_24118[1] = 34);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 29))
{var inst_23967 = (state_23983[2]);var state_23983__$1 = state_23983;var statearr_24057_24119 = state_23983__$1;(statearr_24057_24119[2] = inst_23967);
(statearr_24057_24119[1] = 26);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 30))
{var inst_23919 = (state_23983[10]);var inst_23920 = (state_23983[11]);var inst_23921 = (state_23983[12]);var inst_23922 = (state_23983[13]);var inst_23936 = (state_23983[2]);var inst_23937 = (inst_23922 + 1);var tmp24051 = inst_23919;var tmp24052 = inst_23920;var tmp24053 = inst_23921;var inst_23919__$1 = tmp24051;var inst_23920__$1 = tmp24052;var inst_23921__$1 = tmp24053;var inst_23922__$1 = inst_23937;var state_23983__$1 = (function (){var statearr_24058 = state_23983;(statearr_24058[31] = inst_23936);
(statearr_24058[10] = inst_23919__$1);
(statearr_24058[11] = inst_23920__$1);
(statearr_24058[12] = inst_23921__$1);
(statearr_24058[13] = inst_23922__$1);
return statearr_24058;
})();var statearr_24059_24120 = state_23983__$1;(statearr_24059_24120[2] = null);
(statearr_24059_24120[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_23984 === 31))
{var inst_23927 = (state_23983[7]);var inst_23928 = (state_23983[2]);var inst_23929 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var inst_23930 = cljs.core.async.untap_STAR_.call(null,m,inst_23927);var state_23983__$1 = (function (){var statearr_24060 = state_23983;(statearr_24060[32] = inst_23929);
(statearr_24060[33] = inst_23928);
return statearr_24060;
})();var statearr_24061_24121 = state_23983__$1;(statearr_24061_24121[2] = inst_23930);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23983__$1);
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
});return ((function (switch__18273__auto__){
return (function() {
var state_machine__18274__auto__ = null;
var state_machine__18274__auto____0 = (function (){var statearr_24065 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_24065[0] = state_machine__18274__auto__);
(statearr_24065[1] = 1);
return statearr_24065;
});
var state_machine__18274__auto____1 = (function (state_23983){while(true){
var ret_value__18275__auto__ = (function (){try{while(true){
var result__18276__auto__ = switch__18273__auto__.call(null,state_23983);if(cljs.core.keyword_identical_QMARK_.call(null,result__18276__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__18276__auto__;
}
break;
}
}catch (e24066){if((e24066 instanceof Object))
{var ex__18277__auto__ = e24066;var statearr_24067_24122 = state_23983;(statearr_24067_24122[5] = ex__18277__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23983);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e24066;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18275__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__24123 = state_23983;
state_23983 = G__24123;
continue;
}
} else
{return ret_value__18275__auto__;
}
break;
}
});
state_machine__18274__auto__ = function(state_23983){
switch(arguments.length){
case 0:
return state_machine__18274__auto____0.call(this);
case 1:
return state_machine__18274__auto____1.call(this,state_23983);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__18274__auto____0;
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__18274__auto____1;
return state_machine__18274__auto__;
})()
;})(switch__18273__auto__))
})();var state__18290__auto__ = (function (){var statearr_24068 = f__18289__auto__.call(null);(statearr_24068[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__18288__auto___24069);
return statearr_24068;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18290__auto__);
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
cljs.core.async.Mix = (function (){var obj24125 = {};return obj24125;
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
;var m = (function (){if(typeof cljs.core.async.t24235 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t24235 = (function (pick,out,attrs,cs,calc_state,solo_modes,mix,changed,change,solo_mode,meta24236){
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
this.meta24236 = meta24236;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t24235.cljs$lang$type = true;
cljs.core.async.t24235.cljs$lang$ctorStr = "cljs.core.async/t24235";
cljs.core.async.t24235.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t24235");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t24235.prototype.cljs$core$async$Mix$ = true;
cljs.core.async.t24235.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t24235.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t24235.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t24235.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t24235.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.solo_modes.call(null,mode)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",-1162732933,null),new cljs.core.Symbol(null,"mode","mode",-1637174436,null))))].join('')));
}
cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t24235.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t24235.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t24235.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_24237){var self__ = this;
var _24237__$1 = this;return self__.meta24236;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t24235.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_24237,meta24236__$1){var self__ = this;
var _24237__$1 = this;return (new cljs.core.async.t24235(self__.pick,self__.out,self__.attrs,self__.cs,self__.calc_state,self__.solo_modes,self__.mix,self__.changed,self__.change,self__.solo_mode,meta24236__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.__GT_t24235 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function __GT_t24235(pick__$1,out__$1,attrs__$1,cs__$1,calc_state__$1,solo_modes__$1,mix__$1,changed__$1,change__$1,solo_mode__$1,meta24236){return (new cljs.core.async.t24235(pick__$1,out__$1,attrs__$1,cs__$1,calc_state__$1,solo_modes__$1,mix__$1,changed__$1,change__$1,solo_mode__$1,meta24236));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
}
return (new cljs.core.async.t24235(pick,out,attrs,cs,calc_state,solo_modes,mix,changed,change,solo_mode,null));
})();var c__18288__auto___24344 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__18289__auto__ = (function (){var switch__18273__auto__ = (function (state_24302){var state_val_24303 = (state_24302[1]);if((state_val_24303 === 1))
{var inst_24241 = (state_24302[7]);var inst_24241__$1 = calc_state.call(null);var inst_24242 = cljs.core.seq_QMARK_.call(null,inst_24241__$1);var state_24302__$1 = (function (){var statearr_24304 = state_24302;(statearr_24304[7] = inst_24241__$1);
return statearr_24304;
})();if(inst_24242)
{var statearr_24305_24345 = state_24302__$1;(statearr_24305_24345[1] = 2);
} else
{var statearr_24306_24346 = state_24302__$1;(statearr_24306_24346[1] = 3);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 2))
{var inst_24241 = (state_24302[7]);var inst_24244 = cljs.core.apply.call(null,cljs.core.hash_map,inst_24241);var state_24302__$1 = state_24302;var statearr_24307_24347 = state_24302__$1;(statearr_24307_24347[2] = inst_24244);
(statearr_24307_24347[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 3))
{var inst_24241 = (state_24302[7]);var state_24302__$1 = state_24302;var statearr_24308_24348 = state_24302__$1;(statearr_24308_24348[2] = inst_24241);
(statearr_24308_24348[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 4))
{var inst_24241 = (state_24302[7]);var inst_24247 = (state_24302[2]);var inst_24248 = cljs.core.get.call(null,inst_24247,new cljs.core.Keyword(null,"reads","reads",1122290959));var inst_24249 = cljs.core.get.call(null,inst_24247,new cljs.core.Keyword(null,"mutes","mutes",1118168300));var inst_24250 = cljs.core.get.call(null,inst_24247,new cljs.core.Keyword(null,"solos","solos",1123523302));var inst_24251 = inst_24241;var state_24302__$1 = (function (){var statearr_24309 = state_24302;(statearr_24309[8] = inst_24249);
(statearr_24309[9] = inst_24248);
(statearr_24309[10] = inst_24251);
(statearr_24309[11] = inst_24250);
return statearr_24309;
})();var statearr_24310_24349 = state_24302__$1;(statearr_24310_24349[2] = null);
(statearr_24310_24349[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 5))
{var inst_24251 = (state_24302[10]);var inst_24254 = cljs.core.seq_QMARK_.call(null,inst_24251);var state_24302__$1 = state_24302;if(inst_24254)
{var statearr_24311_24350 = state_24302__$1;(statearr_24311_24350[1] = 7);
} else
{var statearr_24312_24351 = state_24302__$1;(statearr_24312_24351[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 6))
{var inst_24300 = (state_24302[2]);var state_24302__$1 = state_24302;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24302__$1,inst_24300);
} else
{if((state_val_24303 === 7))
{var inst_24251 = (state_24302[10]);var inst_24256 = cljs.core.apply.call(null,cljs.core.hash_map,inst_24251);var state_24302__$1 = state_24302;var statearr_24313_24352 = state_24302__$1;(statearr_24313_24352[2] = inst_24256);
(statearr_24313_24352[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 8))
{var inst_24251 = (state_24302[10]);var state_24302__$1 = state_24302;var statearr_24314_24353 = state_24302__$1;(statearr_24314_24353[2] = inst_24251);
(statearr_24314_24353[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 9))
{var inst_24259 = (state_24302[12]);var inst_24259__$1 = (state_24302[2]);var inst_24260 = cljs.core.get.call(null,inst_24259__$1,new cljs.core.Keyword(null,"reads","reads",1122290959));var inst_24261 = cljs.core.get.call(null,inst_24259__$1,new cljs.core.Keyword(null,"mutes","mutes",1118168300));var inst_24262 = cljs.core.get.call(null,inst_24259__$1,new cljs.core.Keyword(null,"solos","solos",1123523302));var state_24302__$1 = (function (){var statearr_24315 = state_24302;(statearr_24315[12] = inst_24259__$1);
(statearr_24315[13] = inst_24262);
(statearr_24315[14] = inst_24261);
return statearr_24315;
})();return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_24302__$1,10,inst_24260);
} else
{if((state_val_24303 === 10))
{var inst_24266 = (state_24302[15]);var inst_24267 = (state_24302[16]);var inst_24265 = (state_24302[2]);var inst_24266__$1 = cljs.core.nth.call(null,inst_24265,0,null);var inst_24267__$1 = cljs.core.nth.call(null,inst_24265,1,null);var inst_24268 = (inst_24266__$1 == null);var inst_24269 = cljs.core._EQ_.call(null,inst_24267__$1,change);var inst_24270 = (inst_24268) || (inst_24269);var state_24302__$1 = (function (){var statearr_24316 = state_24302;(statearr_24316[15] = inst_24266__$1);
(statearr_24316[16] = inst_24267__$1);
return statearr_24316;
})();if(cljs.core.truth_(inst_24270))
{var statearr_24317_24354 = state_24302__$1;(statearr_24317_24354[1] = 11);
} else
{var statearr_24318_24355 = state_24302__$1;(statearr_24318_24355[1] = 12);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 11))
{var inst_24266 = (state_24302[15]);var inst_24272 = (inst_24266 == null);var state_24302__$1 = state_24302;if(cljs.core.truth_(inst_24272))
{var statearr_24319_24356 = state_24302__$1;(statearr_24319_24356[1] = 14);
} else
{var statearr_24320_24357 = state_24302__$1;(statearr_24320_24357[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 12))
{var inst_24281 = (state_24302[17]);var inst_24262 = (state_24302[13]);var inst_24267 = (state_24302[16]);var inst_24281__$1 = inst_24262.call(null,inst_24267);var state_24302__$1 = (function (){var statearr_24321 = state_24302;(statearr_24321[17] = inst_24281__$1);
return statearr_24321;
})();if(cljs.core.truth_(inst_24281__$1))
{var statearr_24322_24358 = state_24302__$1;(statearr_24322_24358[1] = 17);
} else
{var statearr_24323_24359 = state_24302__$1;(statearr_24323_24359[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 13))
{var inst_24298 = (state_24302[2]);var state_24302__$1 = state_24302;var statearr_24324_24360 = state_24302__$1;(statearr_24324_24360[2] = inst_24298);
(statearr_24324_24360[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 14))
{var inst_24267 = (state_24302[16]);var inst_24274 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_24267);var state_24302__$1 = state_24302;var statearr_24325_24361 = state_24302__$1;(statearr_24325_24361[2] = inst_24274);
(statearr_24325_24361[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 15))
{var state_24302__$1 = state_24302;var statearr_24326_24362 = state_24302__$1;(statearr_24326_24362[2] = null);
(statearr_24326_24362[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 16))
{var inst_24277 = (state_24302[2]);var inst_24278 = calc_state.call(null);var inst_24251 = inst_24278;var state_24302__$1 = (function (){var statearr_24327 = state_24302;(statearr_24327[10] = inst_24251);
(statearr_24327[18] = inst_24277);
return statearr_24327;
})();var statearr_24328_24363 = state_24302__$1;(statearr_24328_24363[2] = null);
(statearr_24328_24363[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 17))
{var inst_24281 = (state_24302[17]);var state_24302__$1 = state_24302;var statearr_24329_24364 = state_24302__$1;(statearr_24329_24364[2] = inst_24281);
(statearr_24329_24364[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 18))
{var inst_24262 = (state_24302[13]);var inst_24261 = (state_24302[14]);var inst_24267 = (state_24302[16]);var inst_24284 = cljs.core.empty_QMARK_.call(null,inst_24262);var inst_24285 = inst_24261.call(null,inst_24267);var inst_24286 = cljs.core.not.call(null,inst_24285);var inst_24287 = (inst_24284) && (inst_24286);var state_24302__$1 = state_24302;var statearr_24330_24365 = state_24302__$1;(statearr_24330_24365[2] = inst_24287);
(statearr_24330_24365[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 19))
{var inst_24289 = (state_24302[2]);var state_24302__$1 = state_24302;if(cljs.core.truth_(inst_24289))
{var statearr_24331_24366 = state_24302__$1;(statearr_24331_24366[1] = 20);
} else
{var statearr_24332_24367 = state_24302__$1;(statearr_24332_24367[1] = 21);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 20))
{var inst_24266 = (state_24302[15]);var state_24302__$1 = state_24302;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24302__$1,23,out,inst_24266);
} else
{if((state_val_24303 === 21))
{var state_24302__$1 = state_24302;var statearr_24333_24368 = state_24302__$1;(statearr_24333_24368[2] = null);
(statearr_24333_24368[1] = 22);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 22))
{var inst_24259 = (state_24302[12]);var inst_24295 = (state_24302[2]);var inst_24251 = inst_24259;var state_24302__$1 = (function (){var statearr_24334 = state_24302;(statearr_24334[10] = inst_24251);
(statearr_24334[19] = inst_24295);
return statearr_24334;
})();var statearr_24335_24369 = state_24302__$1;(statearr_24335_24369[2] = null);
(statearr_24335_24369[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24303 === 23))
{var inst_24292 = (state_24302[2]);var state_24302__$1 = state_24302;var statearr_24336_24370 = state_24302__$1;(statearr_24336_24370[2] = inst_24292);
(statearr_24336_24370[1] = 22);
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
});return ((function (switch__18273__auto__){
return (function() {
var state_machine__18274__auto__ = null;
var state_machine__18274__auto____0 = (function (){var statearr_24340 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_24340[0] = state_machine__18274__auto__);
(statearr_24340[1] = 1);
return statearr_24340;
});
var state_machine__18274__auto____1 = (function (state_24302){while(true){
var ret_value__18275__auto__ = (function (){try{while(true){
var result__18276__auto__ = switch__18273__auto__.call(null,state_24302);if(cljs.core.keyword_identical_QMARK_.call(null,result__18276__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__18276__auto__;
}
break;
}
}catch (e24341){if((e24341 instanceof Object))
{var ex__18277__auto__ = e24341;var statearr_24342_24371 = state_24302;(statearr_24342_24371[5] = ex__18277__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24302);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e24341;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18275__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__24372 = state_24302;
state_24302 = G__24372;
continue;
}
} else
{return ret_value__18275__auto__;
}
break;
}
});
state_machine__18274__auto__ = function(state_24302){
switch(arguments.length){
case 0:
return state_machine__18274__auto____0.call(this);
case 1:
return state_machine__18274__auto____1.call(this,state_24302);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__18274__auto____0;
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__18274__auto____1;
return state_machine__18274__auto__;
})()
;})(switch__18273__auto__))
})();var state__18290__auto__ = (function (){var statearr_24343 = f__18289__auto__.call(null);(statearr_24343[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__18288__auto___24344);
return statearr_24343;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18290__auto__);
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
cljs.core.async.Pub = (function (){var obj24374 = {};return obj24374;
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
return (function (p1__24375_SHARP_){if(cljs.core.truth_(p1__24375_SHARP_.call(null,topic)))
{return p1__24375_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__24375_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__15224__auto__,mults))
),topic);
}
});})(mults))
;var p = (function (){if(typeof cljs.core.async.t24500 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t24500 = (function (ensure_mult,mults,buf_fn,topic_fn,ch,pub,meta24501){
this.ensure_mult = ensure_mult;
this.mults = mults;
this.buf_fn = buf_fn;
this.topic_fn = topic_fn;
this.ch = ch;
this.pub = pub;
this.meta24501 = meta24501;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t24500.cljs$lang$type = true;
cljs.core.async.t24500.cljs$lang$ctorStr = "cljs.core.async/t24500";
cljs.core.async.t24500.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__15791__auto__,writer__15792__auto__,opt__15793__auto__){return cljs.core._write.call(null,writer__15792__auto__,"cljs.core.async/t24500");
});})(mults,ensure_mult))
;
cljs.core.async.t24500.prototype.cljs$core$async$Pub$ = true;
cljs.core.async.t24500.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2,close_QMARK_){var self__ = this;
var p__$1 = this;var m = self__.ensure_mult.call(null,topic);return cljs.core.async.tap.call(null,m,ch__$2,close_QMARK_);
});})(mults,ensure_mult))
;
cljs.core.async.t24500.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2){var self__ = this;
var p__$1 = this;var temp__4092__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);if(cljs.core.truth_(temp__4092__auto__))
{var m = temp__4092__auto__;return cljs.core.async.untap.call(null,m,ch__$2);
} else
{return null;
}
});})(mults,ensure_mult))
;
cljs.core.async.t24500.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;
cljs.core.async.t24500.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){var self__ = this;
var ___$1 = this;return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;
cljs.core.async.t24500.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t24500.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(mults,ensure_mult))
;
cljs.core.async.t24500.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_24502){var self__ = this;
var _24502__$1 = this;return self__.meta24501;
});})(mults,ensure_mult))
;
cljs.core.async.t24500.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_24502,meta24501__$1){var self__ = this;
var _24502__$1 = this;return (new cljs.core.async.t24500(self__.ensure_mult,self__.mults,self__.buf_fn,self__.topic_fn,self__.ch,self__.pub,meta24501__$1));
});})(mults,ensure_mult))
;
cljs.core.async.__GT_t24500 = ((function (mults,ensure_mult){
return (function __GT_t24500(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta24501){return (new cljs.core.async.t24500(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta24501));
});})(mults,ensure_mult))
;
}
return (new cljs.core.async.t24500(ensure_mult,mults,buf_fn,topic_fn,ch,pub,null));
})();var c__18288__auto___24624 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__18289__auto__ = (function (){var switch__18273__auto__ = (function (state_24576){var state_val_24577 = (state_24576[1]);if((state_val_24577 === 1))
{var state_24576__$1 = state_24576;var statearr_24578_24625 = state_24576__$1;(statearr_24578_24625[2] = null);
(statearr_24578_24625[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 2))
{var state_24576__$1 = state_24576;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24576__$1,4,ch);
} else
{if((state_val_24577 === 3))
{var inst_24574 = (state_24576[2]);var state_24576__$1 = state_24576;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24576__$1,inst_24574);
} else
{if((state_val_24577 === 4))
{var inst_24505 = (state_24576[7]);var inst_24505__$1 = (state_24576[2]);var inst_24506 = (inst_24505__$1 == null);var state_24576__$1 = (function (){var statearr_24579 = state_24576;(statearr_24579[7] = inst_24505__$1);
return statearr_24579;
})();if(cljs.core.truth_(inst_24506))
{var statearr_24580_24626 = state_24576__$1;(statearr_24580_24626[1] = 5);
} else
{var statearr_24581_24627 = state_24576__$1;(statearr_24581_24627[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 5))
{var inst_24512 = cljs.core.deref.call(null,mults);var inst_24513 = cljs.core.vals.call(null,inst_24512);var inst_24514 = cljs.core.seq.call(null,inst_24513);var inst_24515 = inst_24514;var inst_24516 = null;var inst_24517 = 0;var inst_24518 = 0;var state_24576__$1 = (function (){var statearr_24582 = state_24576;(statearr_24582[8] = inst_24515);
(statearr_24582[9] = inst_24516);
(statearr_24582[10] = inst_24518);
(statearr_24582[11] = inst_24517);
return statearr_24582;
})();var statearr_24583_24628 = state_24576__$1;(statearr_24583_24628[2] = null);
(statearr_24583_24628[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 6))
{var inst_24555 = (state_24576[12]);var inst_24553 = (state_24576[13]);var inst_24505 = (state_24576[7]);var inst_24553__$1 = topic_fn.call(null,inst_24505);var inst_24554 = cljs.core.deref.call(null,mults);var inst_24555__$1 = cljs.core.get.call(null,inst_24554,inst_24553__$1);var state_24576__$1 = (function (){var statearr_24584 = state_24576;(statearr_24584[12] = inst_24555__$1);
(statearr_24584[13] = inst_24553__$1);
return statearr_24584;
})();if(cljs.core.truth_(inst_24555__$1))
{var statearr_24585_24629 = state_24576__$1;(statearr_24585_24629[1] = 19);
} else
{var statearr_24586_24630 = state_24576__$1;(statearr_24586_24630[1] = 20);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 7))
{var inst_24572 = (state_24576[2]);var state_24576__$1 = state_24576;var statearr_24587_24631 = state_24576__$1;(statearr_24587_24631[2] = inst_24572);
(statearr_24587_24631[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 8))
{var inst_24518 = (state_24576[10]);var inst_24517 = (state_24576[11]);var inst_24520 = (inst_24518 < inst_24517);var inst_24521 = inst_24520;var state_24576__$1 = state_24576;if(cljs.core.truth_(inst_24521))
{var statearr_24591_24632 = state_24576__$1;(statearr_24591_24632[1] = 10);
} else
{var statearr_24592_24633 = state_24576__$1;(statearr_24592_24633[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 9))
{var inst_24551 = (state_24576[2]);var state_24576__$1 = state_24576;var statearr_24593_24634 = state_24576__$1;(statearr_24593_24634[2] = inst_24551);
(statearr_24593_24634[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 10))
{var inst_24515 = (state_24576[8]);var inst_24516 = (state_24576[9]);var inst_24518 = (state_24576[10]);var inst_24517 = (state_24576[11]);var inst_24523 = cljs.core._nth.call(null,inst_24516,inst_24518);var inst_24524 = cljs.core.async.muxch_STAR_.call(null,inst_24523);var inst_24525 = cljs.core.async.close_BANG_.call(null,inst_24524);var inst_24526 = (inst_24518 + 1);var tmp24588 = inst_24515;var tmp24589 = inst_24516;var tmp24590 = inst_24517;var inst_24515__$1 = tmp24588;var inst_24516__$1 = tmp24589;var inst_24517__$1 = tmp24590;var inst_24518__$1 = inst_24526;var state_24576__$1 = (function (){var statearr_24594 = state_24576;(statearr_24594[14] = inst_24525);
(statearr_24594[8] = inst_24515__$1);
(statearr_24594[9] = inst_24516__$1);
(statearr_24594[10] = inst_24518__$1);
(statearr_24594[11] = inst_24517__$1);
return statearr_24594;
})();var statearr_24595_24635 = state_24576__$1;(statearr_24595_24635[2] = null);
(statearr_24595_24635[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 11))
{var inst_24515 = (state_24576[8]);var inst_24529 = (state_24576[15]);var inst_24529__$1 = cljs.core.seq.call(null,inst_24515);var state_24576__$1 = (function (){var statearr_24596 = state_24576;(statearr_24596[15] = inst_24529__$1);
return statearr_24596;
})();if(inst_24529__$1)
{var statearr_24597_24636 = state_24576__$1;(statearr_24597_24636[1] = 13);
} else
{var statearr_24598_24637 = state_24576__$1;(statearr_24598_24637[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 12))
{var inst_24549 = (state_24576[2]);var state_24576__$1 = state_24576;var statearr_24599_24638 = state_24576__$1;(statearr_24599_24638[2] = inst_24549);
(statearr_24599_24638[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 13))
{var inst_24529 = (state_24576[15]);var inst_24531 = cljs.core.chunked_seq_QMARK_.call(null,inst_24529);var state_24576__$1 = state_24576;if(inst_24531)
{var statearr_24600_24639 = state_24576__$1;(statearr_24600_24639[1] = 16);
} else
{var statearr_24601_24640 = state_24576__$1;(statearr_24601_24640[1] = 17);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 14))
{var state_24576__$1 = state_24576;var statearr_24602_24641 = state_24576__$1;(statearr_24602_24641[2] = null);
(statearr_24602_24641[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 15))
{var inst_24547 = (state_24576[2]);var state_24576__$1 = state_24576;var statearr_24603_24642 = state_24576__$1;(statearr_24603_24642[2] = inst_24547);
(statearr_24603_24642[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 16))
{var inst_24529 = (state_24576[15]);var inst_24533 = cljs.core.chunk_first.call(null,inst_24529);var inst_24534 = cljs.core.chunk_rest.call(null,inst_24529);var inst_24535 = cljs.core.count.call(null,inst_24533);var inst_24515 = inst_24534;var inst_24516 = inst_24533;var inst_24517 = inst_24535;var inst_24518 = 0;var state_24576__$1 = (function (){var statearr_24604 = state_24576;(statearr_24604[8] = inst_24515);
(statearr_24604[9] = inst_24516);
(statearr_24604[10] = inst_24518);
(statearr_24604[11] = inst_24517);
return statearr_24604;
})();var statearr_24605_24643 = state_24576__$1;(statearr_24605_24643[2] = null);
(statearr_24605_24643[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 17))
{var inst_24529 = (state_24576[15]);var inst_24538 = cljs.core.first.call(null,inst_24529);var inst_24539 = cljs.core.async.muxch_STAR_.call(null,inst_24538);var inst_24540 = cljs.core.async.close_BANG_.call(null,inst_24539);var inst_24541 = cljs.core.next.call(null,inst_24529);var inst_24515 = inst_24541;var inst_24516 = null;var inst_24517 = 0;var inst_24518 = 0;var state_24576__$1 = (function (){var statearr_24606 = state_24576;(statearr_24606[8] = inst_24515);
(statearr_24606[9] = inst_24516);
(statearr_24606[16] = inst_24540);
(statearr_24606[10] = inst_24518);
(statearr_24606[11] = inst_24517);
return statearr_24606;
})();var statearr_24607_24644 = state_24576__$1;(statearr_24607_24644[2] = null);
(statearr_24607_24644[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 18))
{var inst_24544 = (state_24576[2]);var state_24576__$1 = state_24576;var statearr_24608_24645 = state_24576__$1;(statearr_24608_24645[2] = inst_24544);
(statearr_24608_24645[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 19))
{var state_24576__$1 = state_24576;var statearr_24609_24646 = state_24576__$1;(statearr_24609_24646[2] = null);
(statearr_24609_24646[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 20))
{var state_24576__$1 = state_24576;var statearr_24610_24647 = state_24576__$1;(statearr_24610_24647[2] = null);
(statearr_24610_24647[1] = 21);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 21))
{var inst_24569 = (state_24576[2]);var state_24576__$1 = (function (){var statearr_24611 = state_24576;(statearr_24611[17] = inst_24569);
return statearr_24611;
})();var statearr_24612_24648 = state_24576__$1;(statearr_24612_24648[2] = null);
(statearr_24612_24648[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 22))
{var inst_24566 = (state_24576[2]);var state_24576__$1 = state_24576;var statearr_24613_24649 = state_24576__$1;(statearr_24613_24649[2] = inst_24566);
(statearr_24613_24649[1] = 21);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 23))
{var inst_24553 = (state_24576[13]);var inst_24557 = (state_24576[2]);var inst_24558 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_24553);var state_24576__$1 = (function (){var statearr_24614 = state_24576;(statearr_24614[18] = inst_24557);
return statearr_24614;
})();var statearr_24615_24650 = state_24576__$1;(statearr_24615_24650[2] = inst_24558);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24576__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24577 === 24))
{var inst_24555 = (state_24576[12]);var inst_24505 = (state_24576[7]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_24576,23,Object,null,22);var inst_24562 = cljs.core.async.muxch_STAR_.call(null,inst_24555);var state_24576__$1 = state_24576;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24576__$1,25,inst_24562,inst_24505);
} else
{if((state_val_24577 === 25))
{var inst_24564 = (state_24576[2]);var state_24576__$1 = state_24576;var statearr_24616_24651 = state_24576__$1;(statearr_24616_24651[2] = inst_24564);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24576__$1);
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
});return ((function (switch__18273__auto__){
return (function() {
var state_machine__18274__auto__ = null;
var state_machine__18274__auto____0 = (function (){var statearr_24620 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_24620[0] = state_machine__18274__auto__);
(statearr_24620[1] = 1);
return statearr_24620;
});
var state_machine__18274__auto____1 = (function (state_24576){while(true){
var ret_value__18275__auto__ = (function (){try{while(true){
var result__18276__auto__ = switch__18273__auto__.call(null,state_24576);if(cljs.core.keyword_identical_QMARK_.call(null,result__18276__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__18276__auto__;
}
break;
}
}catch (e24621){if((e24621 instanceof Object))
{var ex__18277__auto__ = e24621;var statearr_24622_24652 = state_24576;(statearr_24622_24652[5] = ex__18277__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24576);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e24621;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18275__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__24653 = state_24576;
state_24576 = G__24653;
continue;
}
} else
{return ret_value__18275__auto__;
}
break;
}
});
state_machine__18274__auto__ = function(state_24576){
switch(arguments.length){
case 0:
return state_machine__18274__auto____0.call(this);
case 1:
return state_machine__18274__auto____1.call(this,state_24576);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__18274__auto____0;
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__18274__auto____1;
return state_machine__18274__auto__;
})()
;})(switch__18273__auto__))
})();var state__18290__auto__ = (function (){var statearr_24623 = f__18289__auto__.call(null);(statearr_24623[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__18288__auto___24624);
return statearr_24623;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18290__auto__);
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
,cljs.core.range.call(null,cnt));var c__18288__auto___24790 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__18289__auto__ = (function (){var switch__18273__auto__ = (function (state_24760){var state_val_24761 = (state_24760[1]);if((state_val_24761 === 1))
{var state_24760__$1 = state_24760;var statearr_24762_24791 = state_24760__$1;(statearr_24762_24791[2] = null);
(statearr_24762_24791[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24761 === 2))
{var inst_24723 = cljs.core.reset_BANG_.call(null,dctr,cnt);var inst_24724 = 0;var state_24760__$1 = (function (){var statearr_24763 = state_24760;(statearr_24763[7] = inst_24723);
(statearr_24763[8] = inst_24724);
return statearr_24763;
})();var statearr_24764_24792 = state_24760__$1;(statearr_24764_24792[2] = null);
(statearr_24764_24792[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24761 === 3))
{var inst_24758 = (state_24760[2]);var state_24760__$1 = state_24760;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24760__$1,inst_24758);
} else
{if((state_val_24761 === 4))
{var inst_24724 = (state_24760[8]);var inst_24726 = (inst_24724 < cnt);var state_24760__$1 = state_24760;if(cljs.core.truth_(inst_24726))
{var statearr_24765_24793 = state_24760__$1;(statearr_24765_24793[1] = 6);
} else
{var statearr_24766_24794 = state_24760__$1;(statearr_24766_24794[1] = 7);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24761 === 5))
{var inst_24744 = (state_24760[2]);var state_24760__$1 = (function (){var statearr_24767 = state_24760;(statearr_24767[9] = inst_24744);
return statearr_24767;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24760__$1,12,dchan);
} else
{if((state_val_24761 === 6))
{var state_24760__$1 = state_24760;var statearr_24768_24795 = state_24760__$1;(statearr_24768_24795[2] = null);
(statearr_24768_24795[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24761 === 7))
{var state_24760__$1 = state_24760;var statearr_24769_24796 = state_24760__$1;(statearr_24769_24796[2] = null);
(statearr_24769_24796[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24761 === 8))
{var inst_24742 = (state_24760[2]);var state_24760__$1 = state_24760;var statearr_24770_24797 = state_24760__$1;(statearr_24770_24797[2] = inst_24742);
(statearr_24770_24797[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24761 === 9))
{var inst_24724 = (state_24760[8]);var inst_24737 = (state_24760[2]);var inst_24738 = (inst_24724 + 1);var inst_24724__$1 = inst_24738;var state_24760__$1 = (function (){var statearr_24771 = state_24760;(statearr_24771[10] = inst_24737);
(statearr_24771[8] = inst_24724__$1);
return statearr_24771;
})();var statearr_24772_24798 = state_24760__$1;(statearr_24772_24798[2] = null);
(statearr_24772_24798[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24761 === 10))
{var inst_24728 = (state_24760[2]);var inst_24729 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var state_24760__$1 = (function (){var statearr_24773 = state_24760;(statearr_24773[11] = inst_24728);
return statearr_24773;
})();var statearr_24774_24799 = state_24760__$1;(statearr_24774_24799[2] = inst_24729);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24760__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24761 === 11))
{var inst_24724 = (state_24760[8]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_24760,10,Object,null,9);var inst_24733 = chs__$1.call(null,inst_24724);var inst_24734 = done.call(null,inst_24724);var inst_24735 = cljs.core.async.take_BANG_.call(null,inst_24733,inst_24734);var state_24760__$1 = state_24760;var statearr_24775_24800 = state_24760__$1;(statearr_24775_24800[2] = inst_24735);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24760__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24761 === 12))
{var inst_24746 = (state_24760[12]);var inst_24746__$1 = (state_24760[2]);var inst_24747 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_24746__$1);var state_24760__$1 = (function (){var statearr_24776 = state_24760;(statearr_24776[12] = inst_24746__$1);
return statearr_24776;
})();if(cljs.core.truth_(inst_24747))
{var statearr_24777_24801 = state_24760__$1;(statearr_24777_24801[1] = 13);
} else
{var statearr_24778_24802 = state_24760__$1;(statearr_24778_24802[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24761 === 13))
{var inst_24749 = cljs.core.async.close_BANG_.call(null,out);var state_24760__$1 = state_24760;var statearr_24779_24803 = state_24760__$1;(statearr_24779_24803[2] = inst_24749);
(statearr_24779_24803[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24761 === 14))
{var inst_24746 = (state_24760[12]);var inst_24751 = cljs.core.apply.call(null,f,inst_24746);var state_24760__$1 = state_24760;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24760__$1,16,out,inst_24751);
} else
{if((state_val_24761 === 15))
{var inst_24756 = (state_24760[2]);var state_24760__$1 = state_24760;var statearr_24780_24804 = state_24760__$1;(statearr_24780_24804[2] = inst_24756);
(statearr_24780_24804[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24761 === 16))
{var inst_24753 = (state_24760[2]);var state_24760__$1 = (function (){var statearr_24781 = state_24760;(statearr_24781[13] = inst_24753);
return statearr_24781;
})();var statearr_24782_24805 = state_24760__$1;(statearr_24782_24805[2] = null);
(statearr_24782_24805[1] = 2);
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
});return ((function (switch__18273__auto__){
return (function() {
var state_machine__18274__auto__ = null;
var state_machine__18274__auto____0 = (function (){var statearr_24786 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_24786[0] = state_machine__18274__auto__);
(statearr_24786[1] = 1);
return statearr_24786;
});
var state_machine__18274__auto____1 = (function (state_24760){while(true){
var ret_value__18275__auto__ = (function (){try{while(true){
var result__18276__auto__ = switch__18273__auto__.call(null,state_24760);if(cljs.core.keyword_identical_QMARK_.call(null,result__18276__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__18276__auto__;
}
break;
}
}catch (e24787){if((e24787 instanceof Object))
{var ex__18277__auto__ = e24787;var statearr_24788_24806 = state_24760;(statearr_24788_24806[5] = ex__18277__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24760);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e24787;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18275__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__24807 = state_24760;
state_24760 = G__24807;
continue;
}
} else
{return ret_value__18275__auto__;
}
break;
}
});
state_machine__18274__auto__ = function(state_24760){
switch(arguments.length){
case 0:
return state_machine__18274__auto____0.call(this);
case 1:
return state_machine__18274__auto____1.call(this,state_24760);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__18274__auto____0;
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__18274__auto____1;
return state_machine__18274__auto__;
})()
;})(switch__18273__auto__))
})();var state__18290__auto__ = (function (){var statearr_24789 = f__18289__auto__.call(null);(statearr_24789[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__18288__auto___24790);
return statearr_24789;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18290__auto__);
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
var merge__2 = (function (chs,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__18288__auto___24915 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__18289__auto__ = (function (){var switch__18273__auto__ = (function (state_24891){var state_val_24892 = (state_24891[1]);if((state_val_24892 === 1))
{var inst_24862 = cljs.core.vec.call(null,chs);var inst_24863 = inst_24862;var state_24891__$1 = (function (){var statearr_24893 = state_24891;(statearr_24893[7] = inst_24863);
return statearr_24893;
})();var statearr_24894_24916 = state_24891__$1;(statearr_24894_24916[2] = null);
(statearr_24894_24916[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24892 === 2))
{var inst_24863 = (state_24891[7]);var inst_24865 = cljs.core.count.call(null,inst_24863);var inst_24866 = (inst_24865 > 0);var state_24891__$1 = state_24891;if(cljs.core.truth_(inst_24866))
{var statearr_24895_24917 = state_24891__$1;(statearr_24895_24917[1] = 4);
} else
{var statearr_24896_24918 = state_24891__$1;(statearr_24896_24918[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24892 === 3))
{var inst_24889 = (state_24891[2]);var state_24891__$1 = state_24891;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24891__$1,inst_24889);
} else
{if((state_val_24892 === 4))
{var inst_24863 = (state_24891[7]);var state_24891__$1 = state_24891;return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_24891__$1,7,inst_24863);
} else
{if((state_val_24892 === 5))
{var inst_24885 = cljs.core.async.close_BANG_.call(null,out);var state_24891__$1 = state_24891;var statearr_24897_24919 = state_24891__$1;(statearr_24897_24919[2] = inst_24885);
(statearr_24897_24919[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24892 === 6))
{var inst_24887 = (state_24891[2]);var state_24891__$1 = state_24891;var statearr_24898_24920 = state_24891__$1;(statearr_24898_24920[2] = inst_24887);
(statearr_24898_24920[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24892 === 7))
{var inst_24870 = (state_24891[8]);var inst_24871 = (state_24891[9]);var inst_24870__$1 = (state_24891[2]);var inst_24871__$1 = cljs.core.nth.call(null,inst_24870__$1,0,null);var inst_24872 = cljs.core.nth.call(null,inst_24870__$1,1,null);var inst_24873 = (inst_24871__$1 == null);var state_24891__$1 = (function (){var statearr_24899 = state_24891;(statearr_24899[10] = inst_24872);
(statearr_24899[8] = inst_24870__$1);
(statearr_24899[9] = inst_24871__$1);
return statearr_24899;
})();if(cljs.core.truth_(inst_24873))
{var statearr_24900_24921 = state_24891__$1;(statearr_24900_24921[1] = 8);
} else
{var statearr_24901_24922 = state_24891__$1;(statearr_24901_24922[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24892 === 8))
{var inst_24872 = (state_24891[10]);var inst_24870 = (state_24891[8]);var inst_24871 = (state_24891[9]);var inst_24863 = (state_24891[7]);var inst_24875 = (function (){var c = inst_24872;var v = inst_24871;var vec__24868 = inst_24870;var cs = inst_24863;return ((function (c,v,vec__24868,cs,inst_24872,inst_24870,inst_24871,inst_24863,state_val_24892){
return (function (p1__24808_SHARP_){return cljs.core.not_EQ_.call(null,c,p1__24808_SHARP_);
});
;})(c,v,vec__24868,cs,inst_24872,inst_24870,inst_24871,inst_24863,state_val_24892))
})();var inst_24876 = cljs.core.filterv.call(null,inst_24875,inst_24863);var inst_24863__$1 = inst_24876;var state_24891__$1 = (function (){var statearr_24902 = state_24891;(statearr_24902[7] = inst_24863__$1);
return statearr_24902;
})();var statearr_24903_24923 = state_24891__$1;(statearr_24903_24923[2] = null);
(statearr_24903_24923[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24892 === 9))
{var inst_24871 = (state_24891[9]);var state_24891__$1 = state_24891;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24891__$1,11,out,inst_24871);
} else
{if((state_val_24892 === 10))
{var inst_24883 = (state_24891[2]);var state_24891__$1 = state_24891;var statearr_24905_24924 = state_24891__$1;(statearr_24905_24924[2] = inst_24883);
(statearr_24905_24924[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24892 === 11))
{var inst_24863 = (state_24891[7]);var inst_24880 = (state_24891[2]);var tmp24904 = inst_24863;var inst_24863__$1 = tmp24904;var state_24891__$1 = (function (){var statearr_24906 = state_24891;(statearr_24906[11] = inst_24880);
(statearr_24906[7] = inst_24863__$1);
return statearr_24906;
})();var statearr_24907_24925 = state_24891__$1;(statearr_24907_24925[2] = null);
(statearr_24907_24925[1] = 2);
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
});return ((function (switch__18273__auto__){
return (function() {
var state_machine__18274__auto__ = null;
var state_machine__18274__auto____0 = (function (){var statearr_24911 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_24911[0] = state_machine__18274__auto__);
(statearr_24911[1] = 1);
return statearr_24911;
});
var state_machine__18274__auto____1 = (function (state_24891){while(true){
var ret_value__18275__auto__ = (function (){try{while(true){
var result__18276__auto__ = switch__18273__auto__.call(null,state_24891);if(cljs.core.keyword_identical_QMARK_.call(null,result__18276__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__18276__auto__;
}
break;
}
}catch (e24912){if((e24912 instanceof Object))
{var ex__18277__auto__ = e24912;var statearr_24913_24926 = state_24891;(statearr_24913_24926[5] = ex__18277__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24891);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e24912;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18275__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__24927 = state_24891;
state_24891 = G__24927;
continue;
}
} else
{return ret_value__18275__auto__;
}
break;
}
});
state_machine__18274__auto__ = function(state_24891){
switch(arguments.length){
case 0:
return state_machine__18274__auto____0.call(this);
case 1:
return state_machine__18274__auto____1.call(this,state_24891);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__18274__auto____0;
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__18274__auto____1;
return state_machine__18274__auto__;
})()
;})(switch__18273__auto__))
})();var state__18290__auto__ = (function (){var statearr_24914 = f__18289__auto__.call(null);(statearr_24914[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__18288__auto___24915);
return statearr_24914;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18290__auto__);
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
var take__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__18288__auto___25020 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__18289__auto__ = (function (){var switch__18273__auto__ = (function (state_24997){var state_val_24998 = (state_24997[1]);if((state_val_24998 === 1))
{var inst_24974 = 0;var state_24997__$1 = (function (){var statearr_24999 = state_24997;(statearr_24999[7] = inst_24974);
return statearr_24999;
})();var statearr_25000_25021 = state_24997__$1;(statearr_25000_25021[2] = null);
(statearr_25000_25021[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24998 === 2))
{var inst_24974 = (state_24997[7]);var inst_24976 = (inst_24974 < n);var state_24997__$1 = state_24997;if(cljs.core.truth_(inst_24976))
{var statearr_25001_25022 = state_24997__$1;(statearr_25001_25022[1] = 4);
} else
{var statearr_25002_25023 = state_24997__$1;(statearr_25002_25023[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24998 === 3))
{var inst_24994 = (state_24997[2]);var inst_24995 = cljs.core.async.close_BANG_.call(null,out);var state_24997__$1 = (function (){var statearr_25003 = state_24997;(statearr_25003[8] = inst_24994);
return statearr_25003;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24997__$1,inst_24995);
} else
{if((state_val_24998 === 4))
{var state_24997__$1 = state_24997;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24997__$1,7,ch);
} else
{if((state_val_24998 === 5))
{var state_24997__$1 = state_24997;var statearr_25004_25024 = state_24997__$1;(statearr_25004_25024[2] = null);
(statearr_25004_25024[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24998 === 6))
{var inst_24992 = (state_24997[2]);var state_24997__$1 = state_24997;var statearr_25005_25025 = state_24997__$1;(statearr_25005_25025[2] = inst_24992);
(statearr_25005_25025[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24998 === 7))
{var inst_24979 = (state_24997[9]);var inst_24979__$1 = (state_24997[2]);var inst_24980 = (inst_24979__$1 == null);var inst_24981 = cljs.core.not.call(null,inst_24980);var state_24997__$1 = (function (){var statearr_25006 = state_24997;(statearr_25006[9] = inst_24979__$1);
return statearr_25006;
})();if(inst_24981)
{var statearr_25007_25026 = state_24997__$1;(statearr_25007_25026[1] = 8);
} else
{var statearr_25008_25027 = state_24997__$1;(statearr_25008_25027[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24998 === 8))
{var inst_24979 = (state_24997[9]);var state_24997__$1 = state_24997;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24997__$1,11,out,inst_24979);
} else
{if((state_val_24998 === 9))
{var state_24997__$1 = state_24997;var statearr_25009_25028 = state_24997__$1;(statearr_25009_25028[2] = null);
(statearr_25009_25028[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24998 === 10))
{var inst_24989 = (state_24997[2]);var state_24997__$1 = state_24997;var statearr_25010_25029 = state_24997__$1;(statearr_25010_25029[2] = inst_24989);
(statearr_25010_25029[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_24998 === 11))
{var inst_24974 = (state_24997[7]);var inst_24984 = (state_24997[2]);var inst_24985 = (inst_24974 + 1);var inst_24974__$1 = inst_24985;var state_24997__$1 = (function (){var statearr_25011 = state_24997;(statearr_25011[7] = inst_24974__$1);
(statearr_25011[10] = inst_24984);
return statearr_25011;
})();var statearr_25012_25030 = state_24997__$1;(statearr_25012_25030[2] = null);
(statearr_25012_25030[1] = 2);
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
});return ((function (switch__18273__auto__){
return (function() {
var state_machine__18274__auto__ = null;
var state_machine__18274__auto____0 = (function (){var statearr_25016 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_25016[0] = state_machine__18274__auto__);
(statearr_25016[1] = 1);
return statearr_25016;
});
var state_machine__18274__auto____1 = (function (state_24997){while(true){
var ret_value__18275__auto__ = (function (){try{while(true){
var result__18276__auto__ = switch__18273__auto__.call(null,state_24997);if(cljs.core.keyword_identical_QMARK_.call(null,result__18276__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__18276__auto__;
}
break;
}
}catch (e25017){if((e25017 instanceof Object))
{var ex__18277__auto__ = e25017;var statearr_25018_25031 = state_24997;(statearr_25018_25031[5] = ex__18277__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24997);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e25017;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18275__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__25032 = state_24997;
state_24997 = G__25032;
continue;
}
} else
{return ret_value__18275__auto__;
}
break;
}
});
state_machine__18274__auto__ = function(state_24997){
switch(arguments.length){
case 0:
return state_machine__18274__auto____0.call(this);
case 1:
return state_machine__18274__auto____1.call(this,state_24997);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__18274__auto____0;
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__18274__auto____1;
return state_machine__18274__auto__;
})()
;})(switch__18273__auto__))
})();var state__18290__auto__ = (function (){var statearr_25019 = f__18289__auto__.call(null);(statearr_25019[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__18288__auto___25020);
return statearr_25019;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18290__auto__);
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
var unique__2 = (function (ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__18288__auto___25129 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__18289__auto__ = (function (){var switch__18273__auto__ = (function (state_25104){var state_val_25105 = (state_25104[1]);if((state_val_25105 === 1))
{var inst_25081 = null;var state_25104__$1 = (function (){var statearr_25106 = state_25104;(statearr_25106[7] = inst_25081);
return statearr_25106;
})();var statearr_25107_25130 = state_25104__$1;(statearr_25107_25130[2] = null);
(statearr_25107_25130[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25105 === 2))
{var state_25104__$1 = state_25104;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25104__$1,4,ch);
} else
{if((state_val_25105 === 3))
{var inst_25101 = (state_25104[2]);var inst_25102 = cljs.core.async.close_BANG_.call(null,out);var state_25104__$1 = (function (){var statearr_25108 = state_25104;(statearr_25108[8] = inst_25101);
return statearr_25108;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25104__$1,inst_25102);
} else
{if((state_val_25105 === 4))
{var inst_25084 = (state_25104[9]);var inst_25084__$1 = (state_25104[2]);var inst_25085 = (inst_25084__$1 == null);var inst_25086 = cljs.core.not.call(null,inst_25085);var state_25104__$1 = (function (){var statearr_25109 = state_25104;(statearr_25109[9] = inst_25084__$1);
return statearr_25109;
})();if(inst_25086)
{var statearr_25110_25131 = state_25104__$1;(statearr_25110_25131[1] = 5);
} else
{var statearr_25111_25132 = state_25104__$1;(statearr_25111_25132[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25105 === 5))
{var inst_25081 = (state_25104[7]);var inst_25084 = (state_25104[9]);var inst_25088 = cljs.core._EQ_.call(null,inst_25084,inst_25081);var state_25104__$1 = state_25104;if(inst_25088)
{var statearr_25112_25133 = state_25104__$1;(statearr_25112_25133[1] = 8);
} else
{var statearr_25113_25134 = state_25104__$1;(statearr_25113_25134[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25105 === 6))
{var state_25104__$1 = state_25104;var statearr_25115_25135 = state_25104__$1;(statearr_25115_25135[2] = null);
(statearr_25115_25135[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25105 === 7))
{var inst_25099 = (state_25104[2]);var state_25104__$1 = state_25104;var statearr_25116_25136 = state_25104__$1;(statearr_25116_25136[2] = inst_25099);
(statearr_25116_25136[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25105 === 8))
{var inst_25081 = (state_25104[7]);var tmp25114 = inst_25081;var inst_25081__$1 = tmp25114;var state_25104__$1 = (function (){var statearr_25117 = state_25104;(statearr_25117[7] = inst_25081__$1);
return statearr_25117;
})();var statearr_25118_25137 = state_25104__$1;(statearr_25118_25137[2] = null);
(statearr_25118_25137[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25105 === 9))
{var inst_25084 = (state_25104[9]);var state_25104__$1 = state_25104;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25104__$1,11,out,inst_25084);
} else
{if((state_val_25105 === 10))
{var inst_25096 = (state_25104[2]);var state_25104__$1 = state_25104;var statearr_25119_25138 = state_25104__$1;(statearr_25119_25138[2] = inst_25096);
(statearr_25119_25138[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25105 === 11))
{var inst_25084 = (state_25104[9]);var inst_25093 = (state_25104[2]);var inst_25081 = inst_25084;var state_25104__$1 = (function (){var statearr_25120 = state_25104;(statearr_25120[7] = inst_25081);
(statearr_25120[10] = inst_25093);
return statearr_25120;
})();var statearr_25121_25139 = state_25104__$1;(statearr_25121_25139[2] = null);
(statearr_25121_25139[1] = 2);
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
});return ((function (switch__18273__auto__){
return (function() {
var state_machine__18274__auto__ = null;
var state_machine__18274__auto____0 = (function (){var statearr_25125 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_25125[0] = state_machine__18274__auto__);
(statearr_25125[1] = 1);
return statearr_25125;
});
var state_machine__18274__auto____1 = (function (state_25104){while(true){
var ret_value__18275__auto__ = (function (){try{while(true){
var result__18276__auto__ = switch__18273__auto__.call(null,state_25104);if(cljs.core.keyword_identical_QMARK_.call(null,result__18276__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__18276__auto__;
}
break;
}
}catch (e25126){if((e25126 instanceof Object))
{var ex__18277__auto__ = e25126;var statearr_25127_25140 = state_25104;(statearr_25127_25140[5] = ex__18277__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25104);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e25126;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18275__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__25141 = state_25104;
state_25104 = G__25141;
continue;
}
} else
{return ret_value__18275__auto__;
}
break;
}
});
state_machine__18274__auto__ = function(state_25104){
switch(arguments.length){
case 0:
return state_machine__18274__auto____0.call(this);
case 1:
return state_machine__18274__auto____1.call(this,state_25104);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__18274__auto____0;
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__18274__auto____1;
return state_machine__18274__auto__;
})()
;})(switch__18273__auto__))
})();var state__18290__auto__ = (function (){var statearr_25128 = f__18289__auto__.call(null);(statearr_25128[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__18288__auto___25129);
return statearr_25128;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18290__auto__);
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
var partition__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__18288__auto___25276 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__18289__auto__ = (function (){var switch__18273__auto__ = (function (state_25246){var state_val_25247 = (state_25246[1]);if((state_val_25247 === 1))
{var inst_25209 = (new Array(n));var inst_25210 = inst_25209;var inst_25211 = 0;var state_25246__$1 = (function (){var statearr_25248 = state_25246;(statearr_25248[7] = inst_25211);
(statearr_25248[8] = inst_25210);
return statearr_25248;
})();var statearr_25249_25277 = state_25246__$1;(statearr_25249_25277[2] = null);
(statearr_25249_25277[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25247 === 2))
{var state_25246__$1 = state_25246;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25246__$1,4,ch);
} else
{if((state_val_25247 === 3))
{var inst_25244 = (state_25246[2]);var state_25246__$1 = state_25246;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25246__$1,inst_25244);
} else
{if((state_val_25247 === 4))
{var inst_25214 = (state_25246[9]);var inst_25214__$1 = (state_25246[2]);var inst_25215 = (inst_25214__$1 == null);var inst_25216 = cljs.core.not.call(null,inst_25215);var state_25246__$1 = (function (){var statearr_25250 = state_25246;(statearr_25250[9] = inst_25214__$1);
return statearr_25250;
})();if(inst_25216)
{var statearr_25251_25278 = state_25246__$1;(statearr_25251_25278[1] = 5);
} else
{var statearr_25252_25279 = state_25246__$1;(statearr_25252_25279[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25247 === 5))
{var inst_25211 = (state_25246[7]);var inst_25210 = (state_25246[8]);var inst_25219 = (state_25246[10]);var inst_25214 = (state_25246[9]);var inst_25218 = (inst_25210[inst_25211] = inst_25214);var inst_25219__$1 = (inst_25211 + 1);var inst_25220 = (inst_25219__$1 < n);var state_25246__$1 = (function (){var statearr_25253 = state_25246;(statearr_25253[11] = inst_25218);
(statearr_25253[10] = inst_25219__$1);
return statearr_25253;
})();if(cljs.core.truth_(inst_25220))
{var statearr_25254_25280 = state_25246__$1;(statearr_25254_25280[1] = 8);
} else
{var statearr_25255_25281 = state_25246__$1;(statearr_25255_25281[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25247 === 6))
{var inst_25211 = (state_25246[7]);var inst_25232 = (inst_25211 > 0);var state_25246__$1 = state_25246;if(cljs.core.truth_(inst_25232))
{var statearr_25257_25282 = state_25246__$1;(statearr_25257_25282[1] = 12);
} else
{var statearr_25258_25283 = state_25246__$1;(statearr_25258_25283[1] = 13);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25247 === 7))
{var inst_25242 = (state_25246[2]);var state_25246__$1 = state_25246;var statearr_25259_25284 = state_25246__$1;(statearr_25259_25284[2] = inst_25242);
(statearr_25259_25284[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25247 === 8))
{var inst_25210 = (state_25246[8]);var inst_25219 = (state_25246[10]);var tmp25256 = inst_25210;var inst_25210__$1 = tmp25256;var inst_25211 = inst_25219;var state_25246__$1 = (function (){var statearr_25260 = state_25246;(statearr_25260[7] = inst_25211);
(statearr_25260[8] = inst_25210__$1);
return statearr_25260;
})();var statearr_25261_25285 = state_25246__$1;(statearr_25261_25285[2] = null);
(statearr_25261_25285[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25247 === 9))
{var inst_25210 = (state_25246[8]);var inst_25224 = cljs.core.vec.call(null,inst_25210);var state_25246__$1 = state_25246;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25246__$1,11,out,inst_25224);
} else
{if((state_val_25247 === 10))
{var inst_25230 = (state_25246[2]);var state_25246__$1 = state_25246;var statearr_25262_25286 = state_25246__$1;(statearr_25262_25286[2] = inst_25230);
(statearr_25262_25286[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25247 === 11))
{var inst_25226 = (state_25246[2]);var inst_25227 = (new Array(n));var inst_25210 = inst_25227;var inst_25211 = 0;var state_25246__$1 = (function (){var statearr_25263 = state_25246;(statearr_25263[7] = inst_25211);
(statearr_25263[8] = inst_25210);
(statearr_25263[12] = inst_25226);
return statearr_25263;
})();var statearr_25264_25287 = state_25246__$1;(statearr_25264_25287[2] = null);
(statearr_25264_25287[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25247 === 12))
{var inst_25210 = (state_25246[8]);var inst_25234 = cljs.core.vec.call(null,inst_25210);var state_25246__$1 = state_25246;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25246__$1,15,out,inst_25234);
} else
{if((state_val_25247 === 13))
{var state_25246__$1 = state_25246;var statearr_25265_25288 = state_25246__$1;(statearr_25265_25288[2] = null);
(statearr_25265_25288[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25247 === 14))
{var inst_25239 = (state_25246[2]);var inst_25240 = cljs.core.async.close_BANG_.call(null,out);var state_25246__$1 = (function (){var statearr_25266 = state_25246;(statearr_25266[13] = inst_25239);
return statearr_25266;
})();var statearr_25267_25289 = state_25246__$1;(statearr_25267_25289[2] = inst_25240);
(statearr_25267_25289[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25247 === 15))
{var inst_25236 = (state_25246[2]);var state_25246__$1 = state_25246;var statearr_25268_25290 = state_25246__$1;(statearr_25268_25290[2] = inst_25236);
(statearr_25268_25290[1] = 14);
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
});return ((function (switch__18273__auto__){
return (function() {
var state_machine__18274__auto__ = null;
var state_machine__18274__auto____0 = (function (){var statearr_25272 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_25272[0] = state_machine__18274__auto__);
(statearr_25272[1] = 1);
return statearr_25272;
});
var state_machine__18274__auto____1 = (function (state_25246){while(true){
var ret_value__18275__auto__ = (function (){try{while(true){
var result__18276__auto__ = switch__18273__auto__.call(null,state_25246);if(cljs.core.keyword_identical_QMARK_.call(null,result__18276__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__18276__auto__;
}
break;
}
}catch (e25273){if((e25273 instanceof Object))
{var ex__18277__auto__ = e25273;var statearr_25274_25291 = state_25246;(statearr_25274_25291[5] = ex__18277__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25246);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e25273;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18275__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__25292 = state_25246;
state_25246 = G__25292;
continue;
}
} else
{return ret_value__18275__auto__;
}
break;
}
});
state_machine__18274__auto__ = function(state_25246){
switch(arguments.length){
case 0:
return state_machine__18274__auto____0.call(this);
case 1:
return state_machine__18274__auto____1.call(this,state_25246);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__18274__auto____0;
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__18274__auto____1;
return state_machine__18274__auto__;
})()
;})(switch__18273__auto__))
})();var state__18290__auto__ = (function (){var statearr_25275 = f__18289__auto__.call(null);(statearr_25275[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__18288__auto___25276);
return statearr_25275;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18290__auto__);
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
var partition_by__3 = (function (f,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__18288__auto___25435 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__18289__auto__ = (function (){var switch__18273__auto__ = (function (state_25405){var state_val_25406 = (state_25405[1]);if((state_val_25406 === 1))
{var inst_25364 = [];var inst_25365 = inst_25364;var inst_25366 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",4382193538);var state_25405__$1 = (function (){var statearr_25407 = state_25405;(statearr_25407[7] = inst_25365);
(statearr_25407[8] = inst_25366);
return statearr_25407;
})();var statearr_25408_25436 = state_25405__$1;(statearr_25408_25436[2] = null);
(statearr_25408_25436[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25406 === 2))
{var state_25405__$1 = state_25405;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25405__$1,4,ch);
} else
{if((state_val_25406 === 3))
{var inst_25403 = (state_25405[2]);var state_25405__$1 = state_25405;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25405__$1,inst_25403);
} else
{if((state_val_25406 === 4))
{var inst_25369 = (state_25405[9]);var inst_25369__$1 = (state_25405[2]);var inst_25370 = (inst_25369__$1 == null);var inst_25371 = cljs.core.not.call(null,inst_25370);var state_25405__$1 = (function (){var statearr_25409 = state_25405;(statearr_25409[9] = inst_25369__$1);
return statearr_25409;
})();if(inst_25371)
{var statearr_25410_25437 = state_25405__$1;(statearr_25410_25437[1] = 5);
} else
{var statearr_25411_25438 = state_25405__$1;(statearr_25411_25438[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25406 === 5))
{var inst_25373 = (state_25405[10]);var inst_25369 = (state_25405[9]);var inst_25366 = (state_25405[8]);var inst_25373__$1 = f.call(null,inst_25369);var inst_25374 = cljs.core._EQ_.call(null,inst_25373__$1,inst_25366);var inst_25375 = cljs.core.keyword_identical_QMARK_.call(null,inst_25366,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",4382193538));var inst_25376 = (inst_25374) || (inst_25375);var state_25405__$1 = (function (){var statearr_25412 = state_25405;(statearr_25412[10] = inst_25373__$1);
return statearr_25412;
})();if(cljs.core.truth_(inst_25376))
{var statearr_25413_25439 = state_25405__$1;(statearr_25413_25439[1] = 8);
} else
{var statearr_25414_25440 = state_25405__$1;(statearr_25414_25440[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25406 === 6))
{var inst_25365 = (state_25405[7]);var inst_25390 = inst_25365.length;var inst_25391 = (inst_25390 > 0);var state_25405__$1 = state_25405;if(cljs.core.truth_(inst_25391))
{var statearr_25416_25441 = state_25405__$1;(statearr_25416_25441[1] = 12);
} else
{var statearr_25417_25442 = state_25405__$1;(statearr_25417_25442[1] = 13);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25406 === 7))
{var inst_25401 = (state_25405[2]);var state_25405__$1 = state_25405;var statearr_25418_25443 = state_25405__$1;(statearr_25418_25443[2] = inst_25401);
(statearr_25418_25443[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25406 === 8))
{var inst_25373 = (state_25405[10]);var inst_25369 = (state_25405[9]);var inst_25365 = (state_25405[7]);var inst_25378 = inst_25365.push(inst_25369);var tmp25415 = inst_25365;var inst_25365__$1 = tmp25415;var inst_25366 = inst_25373;var state_25405__$1 = (function (){var statearr_25419 = state_25405;(statearr_25419[11] = inst_25378);
(statearr_25419[7] = inst_25365__$1);
(statearr_25419[8] = inst_25366);
return statearr_25419;
})();var statearr_25420_25444 = state_25405__$1;(statearr_25420_25444[2] = null);
(statearr_25420_25444[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25406 === 9))
{var inst_25365 = (state_25405[7]);var inst_25381 = cljs.core.vec.call(null,inst_25365);var state_25405__$1 = state_25405;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25405__$1,11,out,inst_25381);
} else
{if((state_val_25406 === 10))
{var inst_25388 = (state_25405[2]);var state_25405__$1 = state_25405;var statearr_25421_25445 = state_25405__$1;(statearr_25421_25445[2] = inst_25388);
(statearr_25421_25445[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25406 === 11))
{var inst_25373 = (state_25405[10]);var inst_25369 = (state_25405[9]);var inst_25383 = (state_25405[2]);var inst_25384 = [];var inst_25385 = inst_25384.push(inst_25369);var inst_25365 = inst_25384;var inst_25366 = inst_25373;var state_25405__$1 = (function (){var statearr_25422 = state_25405;(statearr_25422[12] = inst_25385);
(statearr_25422[13] = inst_25383);
(statearr_25422[7] = inst_25365);
(statearr_25422[8] = inst_25366);
return statearr_25422;
})();var statearr_25423_25446 = state_25405__$1;(statearr_25423_25446[2] = null);
(statearr_25423_25446[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25406 === 12))
{var inst_25365 = (state_25405[7]);var inst_25393 = cljs.core.vec.call(null,inst_25365);var state_25405__$1 = state_25405;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25405__$1,15,out,inst_25393);
} else
{if((state_val_25406 === 13))
{var state_25405__$1 = state_25405;var statearr_25424_25447 = state_25405__$1;(statearr_25424_25447[2] = null);
(statearr_25424_25447[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25406 === 14))
{var inst_25398 = (state_25405[2]);var inst_25399 = cljs.core.async.close_BANG_.call(null,out);var state_25405__$1 = (function (){var statearr_25425 = state_25405;(statearr_25425[14] = inst_25398);
return statearr_25425;
})();var statearr_25426_25448 = state_25405__$1;(statearr_25426_25448[2] = inst_25399);
(statearr_25426_25448[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_25406 === 15))
{var inst_25395 = (state_25405[2]);var state_25405__$1 = state_25405;var statearr_25427_25449 = state_25405__$1;(statearr_25427_25449[2] = inst_25395);
(statearr_25427_25449[1] = 14);
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
});return ((function (switch__18273__auto__){
return (function() {
var state_machine__18274__auto__ = null;
var state_machine__18274__auto____0 = (function (){var statearr_25431 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_25431[0] = state_machine__18274__auto__);
(statearr_25431[1] = 1);
return statearr_25431;
});
var state_machine__18274__auto____1 = (function (state_25405){while(true){
var ret_value__18275__auto__ = (function (){try{while(true){
var result__18276__auto__ = switch__18273__auto__.call(null,state_25405);if(cljs.core.keyword_identical_QMARK_.call(null,result__18276__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__18276__auto__;
}
break;
}
}catch (e25432){if((e25432 instanceof Object))
{var ex__18277__auto__ = e25432;var statearr_25433_25450 = state_25405;(statearr_25433_25450[5] = ex__18277__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25405);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e25432;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18275__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__25451 = state_25405;
state_25405 = G__25451;
continue;
}
} else
{return ret_value__18275__auto__;
}
break;
}
});
state_machine__18274__auto__ = function(state_25405){
switch(arguments.length){
case 0:
return state_machine__18274__auto____0.call(this);
case 1:
return state_machine__18274__auto____1.call(this,state_25405);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__18274__auto____0;
state_machine__18274__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__18274__auto____1;
return state_machine__18274__auto__;
})()
;})(switch__18273__auto__))
})();var state__18290__auto__ = (function (){var statearr_25434 = f__18289__auto__.call(null);(statearr_25434[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__18288__auto___25435);
return statearr_25434;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18290__auto__);
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