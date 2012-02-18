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
    var $, handlers, models;
    console.log("landing LOADED / bkeeping[" + bkeeping.models + "]");
    models = bkeeping.models;
    $ = bkeeping.jQuery;
    handlers = {
      accountsLoad: function() {
        return console.log("accounts LOADED");
      },
      entriesLoad: function() {
        return console.log("entries LOADED");
      }
    };
    $('#accounts').load("/include/accounts.html", handlers.accountsLoad);
    $('#right-col').load("/include/entries.html", handlers.entriesLoad);
    return $('#footer').load("/include/footerPart.html");
  });
}).call(this);
