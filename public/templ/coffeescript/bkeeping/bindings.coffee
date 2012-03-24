
define([], () ->
  
  asm : StateMachine.create({
                              initial:  'As',
                              events: [
                                { name: 'AsA', from: 'As', to: 'A' },   # transition from the Accounts to the Account pane
                                { name: 'AAs', from: 'A', to: 'As' }    # transition from Account, back to the Accounts pane
                              ]
                              callbacks:
                                
                                onbeforeAsA: (event, from, to, args) ->
                                  console.log('START Transition from As->A')
                                  
                                  # 1. edit / retrieve the account
                                  account = args.data.accounts.get( args.target.dataset['aid'] )
                                  
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
                                  
                                  # bind actions to 'Ok' and 'Cancel' buttons
                                  $('#account-ok')
                                    .unbind('click')
                                    .bind('click',
                                          { accounts: args.data.accounts, account: account, accountsView: args.data.accountsView, accountView: args.data.accountView, asm: args.data.asm },
                                          _.bind(args.data.asm.AAs, args.data.asm)) # transition back to Accounts pane
                                
                                  $('#account-cancel')
                                    .unbind('click')
                                    .bind('click',
                                          { cancel: true, asm: args.data.asm },
                                          _.bind(args.data.asm.AAs, args.data.asm)) # transition back to Accounts pane
                                
                                onleaveA: (event, from, to, args) ->
                                  console.log('START Transition from A->As')
                                  
                                  if(args.data.cancel)
                                    console.log("Accounts cancel")
                                    
                                    # 1. scroll to Accounts pane 
                                    $('#left-wrapper').scrollTo($('#accounts'), 500, { axis:'x' })
                                    
                                    args.data.asm.transition() # now fire off the transition 
                                  
                                  else
                                    
                                    # 1. updaate Backbone model (wait for callback) 
                                    args.data.account.saveS(
                                                            {
                                                              name: $("#account-name").attr('value'),
                                                              type: $("#account-type").attr("value"),
                                                              counterWeight: $("#account-counterWeight").attr("value")
                                                            },
                                                            {
                                                              wait: true,
                                                              type: "POST",
                                                              success: () ->
                                                                console.log("successful save")
                                                                
                                                                # 2. ensure Accounts list is updated -> list UI should be re-rendered ... "change" event should fire 
                                                                
                                                                # 3. scroll to Accounts pane 
                                                                $('#left-wrapper').scrollTo($('#accounts'), 500, { axis:'x' })
                                                                
                                                                args.data.asm.transition() # now fire off the transition 
                                                              
                                                            })
                                  
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
                                
                                commonEntryRender: (options) ->
                                  console.log('commonEntryRender CALLED')
                                  
                                  ###
                                  # load the UI 
                                  ###
                                  _.extend(options.entry, Backbone.Events)
                                  options.entry.unbind('change')
                                  options.entry.bind('change', options.entryView.render, { model: options.entry, view: options.entryView })  # bind Backbone event
                                  options.entry.trigger('change')   # this should trigger the entryView to render
                                  
                                  
                                commonEntryInstrument: (options) ->
                                  console.log('commonEntryInstrument CALLED')
                                  
                                  bindObjects = {
                                    entriesView: options.entriesView,
                                    entryView: options.entryView,
                                    entryPartView: options.entryPartView,
                                    entries: options.entries,
                                    accounts: options.accounts,
                                    entry : options.entry,
                                    esm: options.esm
                                  }
                                  
                                  # i. handle edit CLICKs and ii. bind entry row to the Entries State Machine
                                  $(options.entryView.el)
                                    .find('.editentrypart')
                                    .unbind('click')
                                    .bind(  'click',
                                            bindObjects,
                                            _.bind(options.esm.EEpart, options.esm))  # trigger the transition when edit clicked
                                  
                                  # bind actions to 'Ok' and 'Cancel' buttons
                                  $('#entry-ok')
                                    .unbind('click')
                                    .bind('click',
                                          _.extend( { ok: true }, bindObjects ),
                                          _.bind(options.esm.EEs, options.esm)) # transition back to Accounts pane
                                   
                                  $('#entry-cancel')
                                    .unbind('click')
                                    .bind('click',
                                          _.extend( { cancel: true }, bindObjects ),
                                          _.bind(options.esm.EEs, options.esm)) # transition back to Accounts pane
                                
                                
                                # EVENT callbacks from Entries, and from Entry
                                
                                ### 
                                # PART 1
                                ###
                                onbeforeEsE: (event, from, to, args) ->
                                  console.log('START Transition from Es->E')
                                  
                                  
                                  ###
                                  # render Entry Pane
                                  ###
                                  this.commonEntryRender({
                                    entry: args.data.entries.get( args.target.dataset['eid'] )
                                    entryView: args.data.entryView
                                  })
                                  
                                  ###
                                  # scroll to the relevant pane 
                                  ###
                                  $('#right-wrapper').scrollTo($('#entry'), 500, { axis:'x' })
                                  
                                
                                onafterEsE: (event, from, to, args) ->
                                  console.log('END Transition from Es->E')
                                  
                                  ###
                                  # instrument the Entry Pane
                                  ###
                                  this.commonEntryInstrument({
                                    entriesView: args.data.entriesView,
                                    entryView: args.data.entryView,
                                    entryPartView: args.data.entryPartView,
                                    entries: args.data.entries,
                                    accounts: args.data.accounts,
                                    entry : args.data.entries.get( args.target.dataset['eid'] ),
                                    esm: args.data.esm
                                  })
                                
                                
                                ### 
                                # PART 2
                                ###
                                onbeforeEEpart: (event, from, to, args) ->
                                  console.log('START Transition from E->Epart')
                                  
                                  # 1. create / edit an entry part
                                  # 2. load the UI 
                                  epart = _.find(args.data.entry.get('content'), (ech) -> return ech.id == args.target.dataset['eid'] )
                                  _.extend(epart, Backbone.Events)
                                  
                                  epart
                                    .unbind('change')
                                    .bind('change', args.data.entryPartView.render, { model: epart, view: args.data.entryPartView, accounts: args.data.accounts });  # bind Backbone event
                                  
                                  epart.trigger('change')   # this should trigger the entryView to render
                                  
                                  # 3. scroll to the relevant pane 
                                  $('#right-wrapper').scrollTo($('#entry-part'), 500, { axis:'x' })
                                
                                
                                onafterEEpart: (event, from, to, args) ->
                                  console.log('END Transition from E->Epart')
                                  
                                  # bind actions to 'Ok' and 'Cancel' buttons
                                  $('#entry-part-ok')
                                    .unbind('click')
                                    .bind('click',
                                          {
                                            ok: true,
                                            entriesView: args.data.entriesView,
                                            entryView: args.data.entryView,
                                            entryPartView: args.data.entryPartView,
                                            entries: args.data.entries,
                                            entry : args.data.entry,
                                            epart : _.find(args.data.entry.get('content'), (ech) -> return ech.id == args.target.dataset['eid'] )
                                            accounts: args.data.accounts,
                                            esm: args.data.esm
                                          }
                                          _.bind(args.data.esm.EpartE, args.data.esm)) # transition back to Entries pane
                                
                                  $('#entry-part-cancel')
                                    .unbind('click')
                                    .bind('click',
                                          { cancel: true, esm: args.data.esm },
                                          _.bind(args.data.esm.EpartE, args.data.esm)) # transition back to Entries pane
                                  
                                
                                ###
                                # BACK > STATE callbacks from EntryPart, and from Entry
                                ###
                                
                                onleaveEpart: (event, from, to, args) ->
                                  
                                  console.log('START Transition from Epart->E')
                                  
                                  if(args.data.ok)
                                    
                                    # 1. update the model inline 
                                    console.log("#entry-part > ok clicked")
                                    
                                    args.data.epart.accountid = $("#entry-part-account").val()
                                    args.data.epart.amount = parseFloat($("#entry-part-amount").val())
                                    args.data.epart.tag = $("#entry-part-type").val()

                                    _.map(args.data.entry.get("contents"), (ech) ->
                                      ech = args.data.epart if ech.id == args.data.epart.id
                                    )
                                  
                                  # 2. render Entry Pane
                                  this.commonEntryRender({
                                    entry: args.data.entry,
                                    entryView: args.data.entryView
                                  })
                                  
                                  # 3. render entry pane
                                  this.commonEntryInstrument({
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
                                
                                
                                onleaveE: (event, from, to, args) ->
                                  
                                  if(args.data.cancel)
                                    
                                    console.log("START Transition from E->Es > Entriess cancel")
                                    
                                    # 1. scroll to Accounts pane 
                                    $('#right-wrapper').scrollTo($('#entries'), 500, { axis:'x' })
                                    
                                    #args.data.esm.transition() # now fire off the transition 
                                     
                                  else if(args.data.ok)
                                    
                                    console.log("START Transition from E->Es > Entriess ok")

                                    # 1. validate balance 
                                    bal = args.data.entry.balances(args.data.accounts)
                                    console.log("entry balances? [#{bal}]")
                                    
                                    if(bal.balances)
                                      
                                      # 2. update entry 
                                      args.data.entry.saveS( {}, {success: (model, response) ->
                                      
                                        console.log("success on CUSTOM Entry CALLED > model[ #{model} ] > response[ #{response} ]")
                                        
                                        # 3. scroll to Accounts pane 
                                        $('#right-wrapper').scrollTo($('#entries'), 500, { axis:'x' })
                                        args.data.esm.transition() # now fire off the transition 
                                      })
                                      return StateMachine.ASYNC; # tell StateMachine to defer next state until we call transition (in fadeOut callback above)
                                      
                                    else
                                      
                                      # 3. throw error condition
                                      # .. http://docs.jquery.com/UI/Effects/Shake
                                      # .. http://stackoverflow.com/questions/4399005/implementing-jquerys-shake-effect-with-animate
                                     
                                  #if( args.data.cancel or args.data.ok)
                                  #  return StateMachine.ASYNC; # tell StateMachine to defer next state until we call transition (in fadeOut callback above)
                            }
  )

)


