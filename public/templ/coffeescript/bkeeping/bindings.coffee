
define([], () ->
  
  asm : StateMachine.create({
                              initial:  'As',
                              events: [
                                { name: 'AsA', from: 'As', to: 'A' },
                                { name: 'AAs', from: 'A', to: 'As' }
                              ]
                              callbacks: [
                                onbeforeAsA: (event, from, to, args) -> console.log('START Transition from As->A')
                              ]
                            }
  )

)


