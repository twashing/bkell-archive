
define( [ "bkeeping/util", ], (util) ->
  
  asm : StateMachine.create({
                              initial:  'As',
                              events: [
                                { name: 'AsA', from: 'As', to: 'A' },   # transition from the Accounts to the Account pane
                                { name: 'AAs', from: 'A', to: 'As' }    # transition from Account, back to the Accounts pane
                              ]
                              callbacks:
                                
                                onbeforeAsA: (event, from, to, args) ->
                                  console.log('START Transition from As->A')
                                  
                                  # 1. add OR edit / retrieve the account
                                  account = args.data.accounts.get( args.target.dataset['aid'] )
                                  if(not util.exists(account))
                                    account = args.data.account
                                  
                                  # 2. load the account into the UI
                                  _.extend(account, Backbone.Events)
                                  account
                                    .bind('change', args.data.accountView.render, { model: account, view: args.data.accountView })  # bind Backbone event
                                    .trigger('change')   # this should trigger the accountView to render
                                  
                                  # 3. scroll the UI to the right pane (horizontal serialScroll lib)
                                  $('#left-wrapper').scrollTo($('#account'), 500, { axis:'x' })
                                
                                onafterAsA: (event, from, to, args) ->
                                  console.log('END Transition from As->A')
                                  
                                  account = args.data.accounts.get( args.target.dataset['aid'] )
                                  if(not util.exists(account))
                                    account = args.data.account
                                  
                                  binds = { accounts: args.data.accounts, account: account, accountsView: args.data.accountsView, accountView: args.data.accountView, asm: args.data.asm }
                                  
                                  # bind actions to 'Ok' and 'Cancel' buttons
                                  $('#account-ok')
                                    .unbind('click')
                                    .bind('click',
                                          binds,
                                          _.bind(args.data.asm.AAs, args.data.asm)) # transition back to Accounts pane
                                
                                  $('#account-cancel')
                                    .unbind('click')
                                    .bind('click',
                                          _.extend( { cancel: true }, binds )
                                          _.bind(args.data.asm.AAs, args.data.asm)) # transition back to Accounts pane
                                
                                onleaveA: (event, from, to, args) ->
                                  console.log('START Transition from A->As')
                                  
                                  if(args.data.cancel)
                                    
                                    console.log("Accounts cancel")
                                    
                                    # removing any possible error highlists in Account pane
                                    $(".account_content *").removeClass("control-group error")  # getting selector for all children under ".account_content"
                                                                  
                                    args.data.accountsView.instrumentAccounts($("#accounts-table"),
                                                                              {
                                                                                accounts: args.data.accounts,
                                                                                accountsView: args.data.accountsView,
                                                                                accountView: args.data.accountView,
                                                                                asm: args.data.asm
                                                                              },
                                                                              args.data.asm)
                                    # 1. scroll to Accounts pane 
                                    $('#left-wrapper').scrollTo($('#accounts'), 500, { axis:'x' })
                                    
                                    args.data.asm.transition() # now fire off the transition 
                                  
                                  else
                                    
                                    saveAccount = (fdata) ->
                                      
                                      # 1. updaate Backbone model (wait for callback) 
                                      args.data.account.saveS(
                                                              _.extend( fdata,
                                                                {
                                                                  name: $("#account-name").attr('value'),
                                                                  type: $("#account-type").attr("value"),
                                                                  counterWeight: $("#account-counterWeight").attr("value")
                                                                }
                                                              ),
                                                              {
                                                                wait: true,
                                                                type: if args.data.account.isNew() then "PUT" else "POST",
                                                                success: () ->
                                                                  console.log("successful save")
                                                                  
                                                                  
                                                                  # 0. add to the Accounts list
                                                                  args.data.accounts.add( args.data.account )   # add to the Accounts list
                                                                   
                                                                  # 1. removing any possible error highlists in Account pane
                                                                  $(".account_content *").removeClass("control-group error")  # getting selector for all children under ".account_content"
                                                                  
                                                                  # 2. ensure Accounts list is updated -> list UI should be re-rendered ... "change" event should fire 
                                                                  args.data.accountsView.instrumentAccounts($("#accounts-table"),
                                                                                                            {
                                                                                                              accounts: args.data.accounts,
                                                                                                              accountsView: args.data.accountsView,
                                                                                                              accountView: args.data.accountView,
                                                                                                              asm: args.data.asm
                                                                                                            },
                                                                                                            args.data.asm)
                                                                  
                                                                  # 3. scroll to Accounts pane 
                                                                  $('#left-wrapper').scrollTo($('#accounts'), 500, { axis:'x' })
                                                                  
                                                                  args.data.asm.transition() # now fire off the transition 
                                                                error: (model, error, options) ->
                                                                  
                                                                  console.log("error on saving account")
                                                                   
                                                                  # light up the error field(s)
                                                                  errorKeys = _.keys(error)
                                                                  _.each(errorKeys, (ech) ->
                                                                    $(".account_content > div > #account-#{ech}").parent().addClass("control-group error")
                                                                  )
                                                                  
                                                                  # shake the Account pane
                                                                  $(".account_content").effect("shake", { times: 3 }, 60)
                                                                  
                                                                  args.data.asm.transition = null # hacking a StateMachine.CANCELLED event
                                                                  
                                                              })
                                    
                                    fdata = {}
                                    if args.data.account.isNew()
                                      
                                      $.get("/generateid", (result, status, obj) ->
                                        
                                        console.log("Generated account ID[#{result}]")
                                        fdata.id = result
                                        fdata.tag = "account"
                                        
                                        saveAccount(fdata)
                                      )
                                    else
                                      saveAccount(fdata)
                                    
                                  return StateMachine.ASYNC; # tell StateMachine to defer next state until we call transition (in fadeOut callback above)
                            }
  ),
  esm : StateMachine.create({
                              initial:  'Es',
                              events: [
                                { name: 'EsE', from: 'Es', to: 'E' },   # transition from the Entries to the Entry pane
                                { name: 'EEpart', from: 'E', to: 'Epart' },
                                
                                { name: 'EpartE', from: 'Epart', to: 'E' },
                                { name: 'EEs', from: 'E', to: 'Es' }
                              ],
                              
                              callbacks:
                                
                                
                                # EVENT callbacks from Entries, and from Entry
                                
                                ### 
                                # PART 1
                                ###
                                onbeforeEsE: (event, from, to, args) ->
                                  console.log('START Transition from Es->E')
                                  
                                  ###
                                  # render Entry Pane
                                  ###
                                  args.data.entryView.renderEntry({
                                    entry: if args.data.entry then args.data.entry else args.data.entries.get( args.target.dataset['eid'] )
                                    entryView: args.data.entryView
                                  })
                                  
                                  ###
                                  # scroll to the relevant pane 
                                  ###
                                  $('#right-wrapper').scrollTo($('#entry'), 500, { axis:'x' })
                                  global.CURRENT_ENTRY_PANE = "#entry"
                                  
                                
                                onafterEsE: (event, from, to, args) ->
                                  console.log('END Transition from Es->E')
                                  
                                  ###
                                  # instrument the Entry Pane
                                  ###
                                  args.data.entryView.instrumentEntry({
                                    entriesView: args.data.entriesView,
                                    entryView: args.data.entryView,
                                    entryPartView: args.data.entryPartView,
                                    entries: args.data.entries,
                                    accounts: args.data.accounts,
                                    entry: if args.data.entry then args.data.entry else args.data.entries.get( args.target.dataset['eid'] )
                                    esm: args.data.esm
                                  })
                                
                                
                                ### 
                                # PART 2
                                ###
                                onbeforeEEpart: (event, from, to, args) ->
                                  console.log('START Transition from E->Epart')
                                  
                                  # 1. create / edit an entry part
                                  # 2. load the UI 
                                  epart = null
                                  if args.target.dataset['eid']   # edit 
                                    epart = _.find(args.data.entry.get('content'), (ech) -> return ech.id == args.target.dataset['eid'] )
                                  else  # otherwise, new
                                    epart = args.data.epart
                                  
                                  _.extend(epart, Backbone.Events)
                                  epart
                                    .unbind('change')
                                  epart
                                    .bind('change', args.data.entryPartView.render, { model: epart, view: args.data.entryPartView, accounts: args.data.accounts });  # bind Backbone event
                                  
                                  epart.trigger('change')   # this should trigger the entryView to render
                                  
                                  # 3. scroll to the relevant pane 
                                  global.CURRENT_ENTRY_PANE = "#entry-part"
                                  $('#right-wrapper').scrollTo($('#entry-part'), 500, { axis:'x' })
                                
                                
                                onafterEEpart: (event, from, to, args) ->
                                  
                                  console.log('END Transition from E->Epart')
                                  
                                  epart = null
                                  if args.target.dataset['eid']   # edit 
                                    epart = _.find(args.data.entry.get('content'), (ech) -> return ech.id == args.target.dataset['eid'] )
                                  else  # otherwise, new
                                    epart = args.data.epart
                                  
                                  _.extend(epart, Backbone.Events)
                                  bindObjects = {
                                    entriesView: args.data.entriesView,
                                    entryView: args.data.entryView,
                                    entryPartView: args.data.entryPartView,
                                    entries: args.data.entries,
                                    entry : args.data.entry,
                                    epart : epart
                                    accounts: args.data.accounts,
                                    esm: args.data.esm
                                  }
                                  
                                  # bind actions to 'Ok' and 'Cancel' buttons
                                  $('#entry-part-ok')
                                    .unbind('click')
                                    .bind('click',
                                          _.extend({ ok: true, }, bindObjects),
                                          _.bind(args.data.esm.EpartE, args.data.esm)) # transition back to Entries pane
                                
                                  $('#entry-part-cancel')
                                    .unbind('click')
                                    .bind('click',
                                          _.extend({ cancel: true, }, bindObjects),
                                          _.bind(args.data.esm.EpartE, args.data.esm)) # transition back to Entries pane
                                  
                                
                                ###
                                # BACK > STATE callbacks from EntryPart, and from Entry
                                ###
                                
                                onleaveEpart: (event, from, to, args) ->
                                  
                                  console.log('START Transition from Epart->E')
                                  
                                  ###
                                  # this is cause a circular JSON error - unbind
                                  ###
                                  args.data.epart.unbind("change")
                                  
                                  
                                  if(args.data.ok)
                                    
                                    # 1. update the model inline 
                                    console.log("#entry-part > ok clicked")
                                    
                                    args.data.epart.accountid = $("#entry-part-account").val()
                                    args.data.epart.amount = parseFloat($("#entry-part-amount").val())
                                    args.data.epart.tag = $("#entry-part-type").val()
                                    
                                    isNew = not _.any(args.data.entry.get("content"), (ech) ->
                                      ech.id == args.data.epart.id
                                    )

                                    if isNew then args.data.entry.get("content").push(args.data.epart)
                                  
                                  # 2. render Entry Pane
                                  args.data.entryView.renderEntry({
                                    entry: args.data.entry,
                                    entryView: args.data.entryView
                                  })
                                  
                                  # 3. render entry pane
                                  args.data.entryView.instrumentEntry({
                                    entriesView: args.data.entriesView,
                                    entryView: args.data.entryView,
                                    entryPartView: args.data.entryPartView,
                                    entries: args.data.entries,
                                    entry : args.data.entry,
                                    accounts: args.data.accounts,
                                    esm: args.data.esm
                                  })
                                  
                                  # 4. scroll back to #entry
                                  $('#right-wrapper').scrollTo($('#entry'), 500, { axis:'x' })
                                  global.CURRENT_ENTRY_PANE = "#entry"
                                  
                                  
                                onleaveE: (event, from, to, args) ->
                                  
                                  if(args.data.cancel)
                                    
                                    console.log("START Transition from E->Es > Entriess cancel")
                                    
                                    # removing possible error highlights
                                    $("#entry > article > header > div").removeClass("control-group error")
                                    $(".entry_content > table > tbody").removeClass("alert alert-error")
                                          
                                    args.data.entriesView.instrumentEntries(
                                      $("#entries-table"),
                                      {
                                        entries: args.data.entries,
                                        entriesView: args.data.entriesView,
                                        entryView: args.data.entryView,
                                        entryPartView: args.data.entryPartView,
                                        accounts: args.data.accounts,
                                        esm: args.data.esm
                                      },
                                      args.data.esm
                                    )
                                    
                                    # 1. scroll to Accounts pane 
                                    $('#right-wrapper').scrollTo($('#entries'), 500, { axis:'x' })
                                    global.CURRENT_ENTRY_PANE = "#entries"
                                    
                                    #args.data.esm.transition() # now fire off the transition 
                                     
                                  else if(args.data.ok)
                                    
                                    console.log("START Transition from E->Es > Entriess ok")

                                    # 1. validate balance 
                                    bal = args.data.entry.balances(args.data.accounts)
                                    console.log("entry balances? [#{bal}]")
                                    
                                    ###
                                    # common saveEntry function
                                    ###
                                    saveEntry = (fdata) ->
                                      
                                      args.data.entry.saveS( fdata, {
                                        accounts: args.data.accounts,
                                        wait: true,
                                        type: if args.data.entry.isNew() then "PUT" else "POST",
                                        success: (model, response) ->
                                          
                                          console.log("success on CUSTOM Entry CALLED > model[ #{model} ] > response[ #{response} ]")
                                          
                                          # only add entry to Entries onsuccess
                                          args.data.entries.add( args.data.entry, { at: 0 } )   # add to the Accounts list
                                      
                                          # removing possible error highlights
                                          $("#entry > article > header > div").removeClass("control-group error")
                                          $(".entry_content > table > tbody").removeClass("alert alert-error")
                                          
                                          # re-instrument Entries pane
                                          args.data.entriesView.instrumentEntries(
                                            $("#entries-table"),
                                            {
                                              entries: args.data.entries,
                                              entriesView: args.data.entriesView,
                                              entryView: args.data.entryView,
                                              entryPartView: args.data.entryPartView,
                                              accounts: args.data.accounts,
                                              esm: args.data.esm
                                            },
                                            args.data.esm
                                          )
                                          
                                          # 3. scroll to Accounts pane 
                                          $('#right-wrapper').scrollTo($('#entries'), 500, { axis:'x' })
                                          global.CURRENT_ENTRY_PANE = "#entries"
                                          
                                          args.data.esm.transition() # now fire off the transition 
                                        error: (model, error) ->
                                          
                                          console.log("error saving the entry")
                                          
                                          # clear slate 
                                          $("#entry > article > header > div").removeClass("control-group error")
                                          $(".entry_content > table > tbody").removeClass("alert alert-error")
                                          
                                          # light up the error field(s)
                                          errorKeys = _.keys(error)
                                          _.each(errorKeys, (ech) ->
                                            $("#entry > article > header > div > #entry-#{ech}").parent().addClass("control-group error")
                                          )
                                          
                                          # adding the balance error highlight
                                          if not (typeof error.balances is "undefined") and not error.balances
                                            $(".entry_content > table > tbody").addClass("alert alert-error")
                                          
                                          # shake to notify user of imbalance error 
                                          # http://docs.jquery.com/UI/Effects/Shake
                                          # http://stackoverflow.com/questions/4399005/implementing-jquerys-shake-effect-with-animate
                                          $("#entry > article > header > div , .entry_content > table").effect("shake", { times: 3 }, 60)
                                          
                                          # don't transition - this should cancel the transition
                                          args.data.esm.transition = null
                                      })
                                    
                                    ###
                                    # 2. update entry 
                                    ###
                                    fdata = {}
                                    if args.data.entry.isNew()
                                      
                                      $.get("/generateid", (result, status, obj) ->
                                        
                                        console.log("Generated entry ID[#{result}]")
                                        fdata.id = result
                                        fdata.tag = "entry"
                                        fdata.name = $("#entry-name").val()
                                        fdata.date = $("#entry-date > input.span2").val()
                                        fdata.currency = $("#entry-currency").val()
                                        fdata.content = args.data.entry.get("content")
                                        
                                        saveEntry(fdata)
                                      )
                                    else
                                      
                                      args.data.entry.set({
                                                            "name" : $("#entry-name").val()
                                                            "date" : $("#entry-date > input.span2").val()
                                                            "currency" : $("#entry-currency").val()
                                                          })
                                      saveEntry(args.data.entry.toJSON())
                                    
                                    ###
                                    # last statement in IF block
                                    ###
                                    return StateMachine.ASYNC; # tell StateMachine to defer next state until we call transition (in fadeOut callback above)
                                      
                            }
  )
)


