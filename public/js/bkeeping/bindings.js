(function() {
  define([], function() {
    return {
      asm: StateMachine.create({
        initial: 'As',
        events: [
          {
            name: 'As->A',
            from: 'As',
            to: 'A'
          }, {
            name: 'A->As',
            from: 'A',
            to: 'As'
          }
        ]
      })
    };
  });
}).call(this);
