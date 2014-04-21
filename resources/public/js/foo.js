// Compiled by ClojureScript 0.0-2173
goog.provide('foo');
goog.require('cljs.core');
foo.greet = (function greet(n){return [cljs.core.str("Hello "),cljs.core.str(n)].join('');
});
goog.exportSymbol('foo.greet', foo.greet);
foo.thing = (function thing(){return "Foobar";
});
goog.exportSymbol('foo.thing', foo.thing);

//# sourceMappingURL=foo.js.map