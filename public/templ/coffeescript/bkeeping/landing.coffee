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


require( ['bkeeping/bkeeping', 'bkeeping/bindings',  'bkeeping/util']
  (bkeeping, bindings, util) ->
    
    console.log("landing LOADED / bkeeping[#{bkeeping.models}]")
    
    String.prototype.isempty = util.isempty
    
    ###
    # Adjust Entry panes based on right width
    ###
    adjustEntryPanes = () ->
      
      
      rightWidth = $(".bkell-container").width() - $("#left-col").width() - 10  # adjustment to make the Entries layout work in FF
      
      $("#right-col").css("width", rightWidth)
      $('#entries, #entry, #entry-part').css("width", rightWidth)
      $("#right-content").css("width", (rightWidth * 3) + 50)
    
    ###
    # Bootstrap pane sizes
    ###
    $(window).resize(() -> adjustEntryPanes() )
    
    
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
    currencies = null
    
    
    ###
    # STATE MACHINEs for Accounts and Entries 
    ###
    asm = bindings.asm
    esm = bindings.esm
    
    
    ###
    # VIEWs: Load Accounts and Entries panes, then render
    ###
    accountView = new views.AccountView( { el: '#account' } )
    entryView = null
    entryPartView = new views.EntryPartView( { el: '#entry-part' } )
    
    accountsView = new views.AccountsView( { collection: accounts, accountView: accountView, asm: asm } )
    entriesView = null
    
    ###
    # Load Accounts pages
    ###
    loadAccounts = () ->
      
      $('#accounts').load("/include/accounts.html", () ->
        
        accounts.fetchS(
          success: () ->
            
            ###
            # bind account row to the Accounts State Machine
            ###
            accountsView.instrumentAccounts($("#accounts-table"),
                                            {
                                              accounts: accounts,
                                              accountsView: accountsView,
                                              accountView: accountView,
                                              asm: asm
                                            },
                                            asm)
            
            ###
            # Load Account pages
            ###
            $('#account').load('/include/account.html', () ->
            
              # Initialize horizontal / serial scrolling 
              $('#left-col').serialScroll({ target: '#left-wrapper', items: '#accounts , #account', duration: 500, axis: 'x', force: true })

            )
            
            loadEntries()
        )
      )
    
    
    ###
    # Load Entry pages
    ###
    loadEntries = () ->
      
      $.get("/currencies", (result, status, obj) ->
        
        currencies = $.parseJSON(result)
        entryView = new views.EntryView( { el: '#entry', currencies: currencies } )
        entriesView = new views.EntriesView( { collection: entries, entryView: entryView, entryPartView: entryPartView, accounts: accounts, currencies: currencies, esm: esm} )
        
        $('#entries').load("/include/entries.html", () ->
          entries.fetchS(
            success: () ->
              
              ###
              # bind entry row to the Entries State Machine
              ###
              entriesView.instrumentEntries($("#entries-table"),
                                            {
                                              entries: entries,
                                              entriesView: entriesView,
                                              entryView: entryView,
                                              entryPartView: entryPartView,
                                              accounts: accounts,
                                              esm: esm
                                            },
                                            esm)
              
              ###
              # Sequentially loading inner panes
              ###
              $('#entry').load('/include/entry.html', () ->
              
                $('#entry-part').load('/include/entryPart.html', () ->
                
                  # Initialize horizontal / serial scrolling 
                  $('#right-col').serialScroll({ target: '#right-wrapper', items: '#entries , #entry, #entry-part', duration: 500, axis: 'x', force: true })
                  
                  # set adjustible entry panes > parent width, minus the left pane
                  adjustEntryPanes()
                )
              )
          )
        )
      )
    
    ### 
    # LOAD Accounts & Entries
    ###
    loadAccounts()
    
    
    ###
    # Load Footer
    ###
    $('#footer').load("/include/footerPart.html")
)


