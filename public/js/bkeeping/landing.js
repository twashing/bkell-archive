(function() {
  require.config({
    baseUrl: "/js",
    paths: {
      js: '/js/',
      jQuery: '/js/lib/jquery-1.6.3',
      Underscore: '/js/lib/underscore',
      Backbone: '/js/lib/backbone_loader'
    }
  });
  require(['js/bkeeping/bkeeping'], function(bkeeping) {
    return console.log("landing LOADED / bkeeping[" + bkeeping.models + "]");
  });
}).call(this);
