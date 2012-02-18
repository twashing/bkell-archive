(function() {
  require.config({
    baseUrl: "/js"
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
