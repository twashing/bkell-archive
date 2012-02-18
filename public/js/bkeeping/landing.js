(function() {
  require.config({
    baseUrl: "/js",
    paths: {
      'js': '/js/',
      'order': 'lib/order',
      'domReady': 'lib/domReady',
      'use': 'lib/use',
      'jQuery': 'lib/jquery-1.7',
      'json2': 'lib/json2',
      'Underscore': 'lib/underscore',
      'Backbone': 'lib/backbone_loader',
      'pure': 'lib/pure'
    },
    use: {
      'Backbone': {
        deps: ['use!Underscore', 'jQuery']
      }
    }
  });
  require(['bkeeping/bkeeping'], function(bkeeping) {
    var $, Backbone, handlers, json2, models, pure, _;
    console.log("landing LOADED / bkeeping[" + bkeeping.models + "]");
    models = bkeeping.models;
    $ = bkeeping.jQuery;
    json2 = bkeeping.json2;
    _ = bkeeping.Underscore;
    Backbone = bkeeping.Backbone;
    pure = bkeeping.pure;
    handlers = {
      accountsLoad: function() {
        console.log("accounts LOADED");
        return $(this).render(accountsData, accountsDirective).find('table').dataTable();
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
