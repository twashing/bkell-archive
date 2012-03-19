
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
                                  account.bind('change', args.data.accountView.render, { model: account, view: args.data.accountView })  # bind Backbone event
                                  account.trigger('change')   # this should trigger the accountView to render
                                  
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
                                
                                { name: 'EpartE', from: 'Epart', to: 'E' }
                                { name: 'EEs', from: 'E', to: 'Es' }
                              ]
                              callbacks:
                                
                                # EVENT callbacks from Entries, and from Entry
                                
                                ### 
                                # PART 1
                                ###
                                onbeforeEsE: (event, from, to, args) ->
                                  console.log('START Transition from Es->E')
                                  
                                  # 1. create / edit an entry 
                                  entry = args.data.entries.get( args.target.dataset['eid'] )
                                  
                                  # 2. load the UI 
                                  _.extend(entry, Backbone.Events)
                                  entry.bind('change', args.data.entryView.render, { model: entry, view: args.data.entryView })  # bind Backbone event
                                  entry.trigger('change')   # this should trigger the entryView to render
                                  
                                  # 3. scroll to the relevant pane 
                                  $('#right-wrapper').scrollTo($('#entry'), 500, { axis:'x' })
                                  
                                  
                                onafterEsE: (event, from, to, args) ->
                                  console.log('END Transition from Es->E')
                                  
                                  # i. handle edit CLICKs and ii. bind entry row to the Entries State Machine
                                  $(args.data.entryView.el)
                                    .find('.editentrypart')
                                    .unbind('click')
                                    .bind(  'click',
                                            { entries: args.data.entries, entriesView: args.data.entriesView, entryView: args.data.entryView, esm: args.data.esm },
                                            _.bind(args.data.esm.EEpart, args.data.esm))  # trigger the transition when edit clicked
                                  
                                  # bind actions to 'Ok' and 'Cancel' buttons
                                  $('#entry-ok')
                                    .unbind('click')
                                    .bind('click',
                                          #{ accounts: args.data.accounts, account: account, accountsView: args.data.accountsView, accountView: args.data.accountView, asm: args.data.asm },
                                          { esm: args.data.esm },
                                          _.bind(args.data.esm.EEs, args.data.esm)) # transition back to Accounts pane
                                   
                                  $('#entry-cancel')
                                    .unbind('click')
                                    .bind('click',
                                          { cancel: true, esm: args.data.esm },
                                          _.bind(args.data.esm.EEs, args.data.esm)) # transition back to Accounts pane
                                
                                  
                                ### 
                                # PART 2
                                ###
                                onbeforeEEpart: (event, from, to, args) ->
                                  console.log('START Transition from E->Epart')
                                  
                                  # 1. create / edit an entry part
                                  
                                  # 2. load the UI 
                                  
                                  # 3. scroll to the relevant pane 
                                  $('#right-wrapper').scrollTo($('#entry-part'), 500, { axis:'x' })
                                  
                                onafterEEpart: (event, from, to, args) ->
                                  console.log('END Transition from E->Epart')
                                  
                                  # bind actions to 'Ok' and 'Cancel' buttons
                                  
                                
                                ###
                                # BACK > STATE callbacks from EntryPart, and from Entry
                                ###
                                onleaveEpart: (event, from, to, args) ->
                                  console.log('START Transition from Epart->E')
                                  
                                onleaveE: (event, from, to, args) ->
                                  
                                  console.log('START Transition from E->Es')
                                  
                                  if(args.data.cancel)
                                    
                                    console.log("Entriess cancel")
                                    
                                    # 1. scroll to Accounts pane 
                                    $('#right-wrapper').scrollTo($('#entries'), 500, { axis:'x' })
                                    
                                    args.data.esm.transition() # now fire off the transition 
                                     
                                  else if(args.data.ok)
                                    
                                    console.log("Entriess ok")
                                    
                                    # 1. scroll to Accounts pane 
                                    $('#right-wrapper').scrollTo($('#entries'), 500, { axis:'x' })
                                    
                                    args.data.esm.transition() # now fire off the transition 
                                     
                                  return StateMachine.ASYNC; # tell StateMachine to defer next state until we call transition (in fadeOut callback above)
                            }
  )

)


