(function() {
  require.config({
    baseUrl: "/js",
    paths: {
      'js': '/js/',
      'order': 'lib/order',
      'domReady': 'lib/domReady',
      'use': 'lib/use',
      'jQuery': 'lib/jquery-1.6.3',
      'json2': 'lib/json2',
      'Underscore': 'lib/underscore',
      'Backbone': 'lib/backbone_loader',
      'pure': 'lib/pure'
    }
  });
  require(['bkeeping/bkeeping'], function(bkeeping) {
    var accounts, accountsView, entries, entriesView, models, views;
    console.log("landing LOADED / bkeeping[" + bkeeping.models + "]");
    /*
        # LIB imports 
        */
    models = bkeeping.models;
    views = bkeeping.views;
    /*
        $ = bkeeping.jQuery
        json2 = bkeeping.json2
        _ = bkeeping.Underscore
        Backbone = bkeeping.Backbone
        pure = bkeeping.pure
        */
    /*
        # ACCOUNTS and ENTRIES objects 
        */
    accounts = new models.Accounts();
    entries = new models.Entries();
    /*
        # Load Accounts and Entries panes, then render
        */
    accountsView = new views.AccountsView({
      collection: accounts
    });
    $('#accounts').load("/include/accounts.html", function() {
      return accounts.fetchS();
    });
    $('#account').load('/include/account.html', function() {});
    entriesView = new views.EntriesView({
      collection: entries
    });
    $('#right-col').load("/include/entries.html", function() {
      return entries.fetchS();
    });
    /*
        # Load Footer
        */
    return $('#footer').load("/include/footerPart.html");
  });
}).call(this);
