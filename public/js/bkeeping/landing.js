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
    }
  });
  require(['bkeeping/bkeeping'], function(bkeeping) {
    var $, Backbone, accounts, accountsView, entries, json2, models, pure, views, _;
    console.log("landing LOADED / bkeeping[" + bkeeping.models + "]");
    models = bkeeping.models;
    views = bkeeping.views;
    $ = bkeeping.jQuery;
    json2 = bkeeping.json2;
    _ = bkeeping.Underscore;
    Backbone = bkeeping.Backbone;
    pure = bkeeping.pure;
    accounts = new models.Accounts();
    entries = new models.Entries();
    /*
        # Pure Template DIRECTIVES
        pureDirectives =
          accountsDirective:
            {
              "tbody tr" : {
                "each<-puredata" : {
                  "a.editaccount@href" : (arg) ->
                    return "/accounts/account/"+ arg.each.item.id
                  "td.name" : "each.name"
                  "td.type" : "each.type"
                  "td.weight" : "each.counterWeight"
                }
              }
            }
          entriesDirective:
            {
              "tbody tr" : {
                "each<-puredata" : {
                  "a.editentry@href" : (arg) ->
                    return "/entries/entry/"+ arg.each.item.id
                  "td.date" : "each.date"
                  "td.name" : "each.id"
                  "td.balance" : ""
                }
              }
            }
        
        
        # HANDLERS
        handlers =
          
          accountsLoad: () ->
            
            console.log("accounts.html LOADED")
            htmlContext = this
            accounts.fetchS( { success: (models, response) ->
               
              $(htmlContext)
                .render( { puredata : response } , pureDirectives.accountsDirective)
                .find('table')
                .dataTable()
            
            } )
          
          entriesLoad: () ->
             
            console.log("entries.html LOADED")
            htmlContext = this
            entries.fetchS( { success: (models, response) ->
               
              $(htmlContext)
                .render( { puredata : response } , pureDirectives.entriesDirective)
                .find('table')
                .dataTable()
            
            } )
          
        $('#accounts').load("/include/accounts.html", handlers.accountsLoad)
        $('#right-col').load("/include/entries.html", handlers.entriesLoad)
        */
    accountsView = new views.AccountsView({
      collection: accounts
    });
    $('#accounts').load("/include/accounts.html", function() {
      return accountsView.render();
    });
    return $('#footer').load("/include/footerPart.html");
  });
}).call(this);
