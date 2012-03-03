
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
                                  
                                  # bind actions to 'Ok' and 'Cancel' buttons
                                  $('#account-ok')
                                    .unbind('click')
                                    .bind('click',
                                          { accounts: args.data.accounts, accountsView: args.data.accountsView, accountView: args.data.accountView, asm: args.data.asm },
                                          _.bind(args.data.asm.AAs, args.data.asm)) # transition back to Accounts pane
                                
                                onbeforeAAs: (event, from, to, args) ->
                                  
                                  console.log('START Transition from A->As')
                                  
                                  # 1. updaate Backbone model (wait for callback) 
                                  
                                  # 2. ensure Accounts list is updated -> list UI should be re-rendered 
                                  
                                  # 3. scroll to Accounts pane 
                                  $('#left-wrapper').scrollTo($('#accounts'), 500, { axis:'x' })
                                  
                                  # 4. clear previous Account UI ; unbind account Backbone model
                                  
                            }
  )

)


