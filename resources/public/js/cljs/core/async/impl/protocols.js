// Compiled by ClojureScript 0.0-2173
goog.provide('cljs.core.async.impl.protocols');
goog.require('cljs.core');
cljs.core.async.impl.protocols.MAX_QUEUE_SIZE = 1024;
cljs.core.async.impl.protocols.ReadPort = (function (){var obj24374 = {};return obj24374;
})();
cljs.core.async.impl.protocols.take_BANG_ = (function take_BANG_(port,fn1_handler){if((function (){var and__15212__auto__ = port;if(and__15212__auto__)
{return port.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2;
} else
{return and__15212__auto__;
}
})())
{return port.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2(port,fn1_handler);
} else
{var x__15851__auto__ = (((port == null))?null:port);return (function (){var or__15224__auto__ = (cljs.core.async.impl.protocols.take_BANG_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.impl.protocols.take_BANG_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ReadPort.take!",port);
}
}
})().call(null,port,fn1_handler);
}
});
cljs.core.async.impl.protocols.WritePort = (function (){var obj24376 = {};return obj24376;
})();
cljs.core.async.impl.protocols.put_BANG_ = (function put_BANG_(port,val,fn0_handler){if((function (){var and__15212__auto__ = port;if(and__15212__auto__)
{return port.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3;
} else
{return and__15212__auto__;
}
})())
{return port.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3(port,val,fn0_handler);
} else
{var x__15851__auto__ = (((port == null))?null:port);return (function (){var or__15224__auto__ = (cljs.core.async.impl.protocols.put_BANG_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.impl.protocols.put_BANG_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"WritePort.put!",port);
}
}
})().call(null,port,val,fn0_handler);
}
});
cljs.core.async.impl.protocols.Channel = (function (){var obj24378 = {};return obj24378;
})();
cljs.core.async.impl.protocols.close_BANG_ = (function close_BANG_(chan){if((function (){var and__15212__auto__ = chan;if(and__15212__auto__)
{return chan.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1;
} else
{return and__15212__auto__;
}
})())
{return chan.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1(chan);
} else
{var x__15851__auto__ = (((chan == null))?null:chan);return (function (){var or__15224__auto__ = (cljs.core.async.impl.protocols.close_BANG_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.impl.protocols.close_BANG_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Channel.close!",chan);
}
}
})().call(null,chan);
}
});
cljs.core.async.impl.protocols.Handler = (function (){var obj24380 = {};return obj24380;
})();
cljs.core.async.impl.protocols.active_QMARK_ = (function active_QMARK_(h){if((function (){var and__15212__auto__ = h;if(and__15212__auto__)
{return h.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1;
} else
{return and__15212__auto__;
}
})())
{return h.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(h);
} else
{var x__15851__auto__ = (((h == null))?null:h);return (function (){var or__15224__auto__ = (cljs.core.async.impl.protocols.active_QMARK_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.impl.protocols.active_QMARK_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Handler.active?",h);
}
}
})().call(null,h);
}
});
cljs.core.async.impl.protocols.commit = (function commit(h){if((function (){var and__15212__auto__ = h;if(and__15212__auto__)
{return h.cljs$core$async$impl$protocols$Handler$commit$arity$1;
} else
{return and__15212__auto__;
}
})())
{return h.cljs$core$async$impl$protocols$Handler$commit$arity$1(h);
} else
{var x__15851__auto__ = (((h == null))?null:h);return (function (){var or__15224__auto__ = (cljs.core.async.impl.protocols.commit[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.impl.protocols.commit["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Handler.commit",h);
}
}
})().call(null,h);
}
});
cljs.core.async.impl.protocols.Buffer = (function (){var obj24382 = {};return obj24382;
})();
cljs.core.async.impl.protocols.full_QMARK_ = (function full_QMARK_(b){if((function (){var and__15212__auto__ = b;if(and__15212__auto__)
{return b.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1;
} else
{return and__15212__auto__;
}
})())
{return b.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1(b);
} else
{var x__15851__auto__ = (((b == null))?null:b);return (function (){var or__15224__auto__ = (cljs.core.async.impl.protocols.full_QMARK_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.impl.protocols.full_QMARK_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Buffer.full?",b);
}
}
})().call(null,b);
}
});
cljs.core.async.impl.protocols.remove_BANG_ = (function remove_BANG_(b){if((function (){var and__15212__auto__ = b;if(and__15212__auto__)
{return b.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1;
} else
{return and__15212__auto__;
}
})())
{return b.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1(b);
} else
{var x__15851__auto__ = (((b == null))?null:b);return (function (){var or__15224__auto__ = (cljs.core.async.impl.protocols.remove_BANG_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.impl.protocols.remove_BANG_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Buffer.remove!",b);
}
}
})().call(null,b);
}
});
cljs.core.async.impl.protocols.add_BANG_ = (function add_BANG_(b,itm){if((function (){var and__15212__auto__ = b;if(and__15212__auto__)
{return b.cljs$core$async$impl$protocols$Buffer$add_BANG_$arity$2;
} else
{return and__15212__auto__;
}
})())
{return b.cljs$core$async$impl$protocols$Buffer$add_BANG_$arity$2(b,itm);
} else
{var x__15851__auto__ = (((b == null))?null:b);return (function (){var or__15224__auto__ = (cljs.core.async.impl.protocols.add_BANG_[goog.typeOf(x__15851__auto__)]);if(or__15224__auto__)
{return or__15224__auto__;
} else
{var or__15224__auto____$1 = (cljs.core.async.impl.protocols.add_BANG_["_"]);if(or__15224__auto____$1)
{return or__15224__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Buffer.add!",b);
}
}
})().call(null,b,itm);
}
});
cljs.core.async.impl.protocols.UnblockingBuffer = (function (){var obj24384 = {};return obj24384;
})();

//# sourceMappingURL=protocols.js.map