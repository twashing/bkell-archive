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
    esm = bindings.esm
    
    
    ###
    # VIEWs: Load Accounts and Entries panes, then render
    ###
    accountView = new views.AccountView( { el: '#account' } )
    entryView = new views.EntryView( { el: '#entry' } )
    entryPartView = new views.EntryPartView( { el: '#entry-part' } )
    
    accountsView = new views.AccountsView( { collection: accounts, accountView: accountView, asm: asm } )
    entriesView = new views.EntriesView( { collection: entries, entryView: entryView, entryPartView: entryPartView, accounts: accounts, esm: esm} )
    
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
    
    ### 
    # LOAD Accounts & Entries
    ###
    loadAccounts()
    
    
    ###
    # Load Footer
    ###
    $('#footer').load("/include/footerPart.html")
)


