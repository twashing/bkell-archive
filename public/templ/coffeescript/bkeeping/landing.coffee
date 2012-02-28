require.config({
  baseUrl: "/js",
  paths:
    'js' : '/js/'
    #'order' : 'lib/order'
    #'domReady' : 'lib/domReady'
    #'use' : 'lib/use'
    #'jQuery' : 'lib/jquery-1.6.3'
    #'json2' : 'lib/json2'
    #'Underscore' : 'lib/underscore'
    #'Backbone' : 'lib/backbone_loader'
    #'pure' : 'lib/pure'
})


require( ['bkeeping/bkeeping', 'bkeeping/bindings']
  (bkeeping, bindings) ->
    
    console.log("landing LOADED / bkeeping[#{bkeeping.models}]")
    
    
    ###
    # LIB imports 
    ###
    models = bkeeping.models
    views = bkeeping.views
    
    
    ###
    # ACCOUNTS and ENTRIES objects 
    ###
    accounts = new models.Accounts()
    entries = new models.Entries()
    
    
    ###
    # STATE MACHINEs for Accounts and Entries 
    ###
    asm = bindings.asm
    
    
    ###
    # VIEWs: Load Accounts and Entries panes, then render
    ###
    accountsView = new views.AccountsView( { collection: accounts } )
    $('#accounts').load("/include/accounts.html", () ->
      
      accounts.fetchS(
        success: () ->
          
          # bind account row to the Accounts State Machine
          _.each(accountsView['accountRows'], (ech) ->
            ech.el
              .find('.editaccount')
              .unbind('click')
              .bind('click', _.bind(asm.AsA, asm))
          )
      )
    )
    
    $('#account').load('/include/account.html', () ->
      
      # Working horizontal / serial scrolling 
      #$('#left-col').serialScroll({ target: '#left-wrapper', items: '#accounts , #account', duration: 500, axis: 'x', force: true })
      
      # Basic usage 
      #$('#left-wrapper').scrollTo($('#account'), 500, {axis:'x'})
      
      # Using this to toggle between views
      #$('#left-col').trigger('next')
    )
    
    entriesView = new views.EntriesView( { collection: entries } )
    $('#right-col').load("/include/entries.html", () ->
      entries.fetchS()
    )
    
    ###
    # Load Footer
    ###
    $('#footer').load("/include/footerPart.html")
)



