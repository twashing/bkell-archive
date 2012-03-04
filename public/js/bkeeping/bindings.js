(function() {
  define([], function() {
    return {
      asm: StateMachine.create({
        initial: 'As',
        events: [
          {
            name: 'AsA',
            from: 'As',
            to: 'A'
          }, {
            name: 'AAs',
            from: 'A',
            to: 'As'
          }
        ],
        callbacks: {
          onbeforeAsA: function(event, from, to, args) {
            var account;
            console.log('START Transition from As->A');
            account = args.data.accounts.get(args.target.dataset['aid']);
            _.extend(account, Backbone.Events);
            account.bind('change', args.data.accountView.render, {
              model: account,
              view: args.data.accountView
            });
            account.trigger('change');
            return $('#left-wrapper').scrollTo($('#account'), 500, {
              axis: 'x'
            });
          },
          onafterAsA: function(event, from, to, args) {
            var account;
            console.log('END Transition from As->A');
            account = args.data.accounts.get(args.target.dataset['aid']);
            return $('#account-ok').unbind('click').bind('click', {
              accounts: args.data.accounts,
              account: account,
              accountsView: args.data.accountsView,
              accountView: args.data.accountView,
              asm: args.data.asm
            }, _.bind(args.data.asm.AAs, args.data.asm));
          },
          onbeforeAAs: function(event, from, to, args) {
            console.log('START Transition from A->As');
            args.data.account.save({
              name: $("#account-name").attr('value'),
              type: $("#account-type").attr("value"),
              counterWeight: $("#account-counterWeight").attr("value")
            }, {
              success: function() {
                console.log("successful save");
                $('#left-wrapper').scrollTo($('#accounts'), 500, {
                  axis: 'x'
                });
                return args.data.asm.transition();
              }
            });
            return StateMachine.ASYNC;
          }
        }
      })
    };
  });
}).call(this);
