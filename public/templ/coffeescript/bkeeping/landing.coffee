require.config({
  baseUrl: "/js",
})

require( ['bkeeping/bkeeping']
  (bkeeping) ->
    
    console.log("landing LOADED / bkeeping[#{bkeeping.models}]")
    
    
    # LIB imports 
    models = bkeeping.models
    $ = bkeeping.jQuery
    json2 = bkeeping.json2
    _ = bkeeping.Underscore
    Backbone = bkeeping.Backbone
    pure = bkeeping.pure
    
    
    handlers =
      accountsLoad: () ->
        console.log("accounts LOADED")
        $(this)
          .render(accountsData, accountsDirective)
          .find('table')
          .dataTable()
      
      entriesLoad: () ->
        console.log("entries LOADED")
      
    $('#accounts').load("/include/accounts.html", handlers.accountsLoad)
    $('#right-col').load("/include/entries.html", handlers.entriesLoad)
    $('#footer').load("/include/footerPart.html")
)

