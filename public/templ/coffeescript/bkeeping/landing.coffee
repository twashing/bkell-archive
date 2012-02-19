require.config({
  baseUrl: "/js",
  paths:
    'js' : '/js/'
    'order' : 'lib/order'
    'domReady' : 'lib/domReady'
    'use' : 'lib/use'
    'jQuery' : 'lib/jquery-1.7'
    'json2' : 'lib/json2'
    'Underscore' : 'lib/underscore'
    'Backbone' : 'lib/backbone_loader'
    'pure' : 'lib/pure'
})


require( ['bkeeping/bkeeping']
  (bkeeping) ->
    
    console.log("landing LOADED / bkeeping[#{bkeeping.models}]")
    
    
    ###
    # LIB imports 
    ###
    models = bkeeping.models
    views = bkeeping.views
    $ = bkeeping.jQuery
    json2 = bkeeping.json2
    _ = bkeeping.Underscore
    Backbone = bkeeping.Backbone
    pure = bkeeping.pure
    
    
    ###
    # ACCOUNTS and ENTRIES objects 
    ###
    accounts = new models.Accounts()
    entries = new models.Entries()
    
    
    ###
    # Load Accounts and Entries panes, then render
    ###
    accountsView = new views.AccountsView( { collection: accounts } )
    $('#accounts').load("/include/accounts.html", () ->
      accounts.fetchS()
    )
    
    entriesView = new views.EntriesView( { collection: entries } )
    $('#right-col').load("/include/entries.html", () ->
      entries.fetchS()
    )
    
    $('#footer').load("/include/footerPart.html")
)



