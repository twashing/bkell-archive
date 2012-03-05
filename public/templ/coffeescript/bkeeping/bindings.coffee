
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
                                onbeforeEsE: (event, from, to, args) ->
                                  console.log('START Transition from Es->E')
                                  
                                onafterEsE: (event, from, to, args) ->
                                  console.log('END Transition from Es->E')
                                  
                                onbeforeEEpart: (event, from, to, args) ->
                                  console.log('START Transition from E->Epart')
                                  
                                onafterEEpart: (event, from, to, args) ->
                                  console.log('END Transition from E->Epart')
                                  
                                # STATE callbacks from EntryPart, and from Entry
                                onleaveEpart: (event, from, to, args) ->
                                  console.log('START Transition from Epart->E')
                                  
                                onleaveE: (event, from, to, args) ->
                                  console.log('START Transition from E->Es')
                                  
                            }
  )

)


