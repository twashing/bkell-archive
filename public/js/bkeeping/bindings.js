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
            $('#account-ok').unbind('click').bind('click', {
              accounts: args.data.accounts,
              account: account,
              accountsView: args.data.accountsView,
              accountView: args.data.accountView,
              asm: args.data.asm
            }, _.bind(args.data.asm.AAs, args.data.asm));
            return $('#account-cancel').unbind('click').bind('click', {
              cancel: true,
              asm: args.data.asm
            }, _.bind(args.data.asm.AAs, args.data.asm));
          },
          onleaveA: function(event, from, to, args) {
            console.log('START Transition from A->As');
            if (args.data.cancel) {
              console.log("Accounts cancel");
              $('#left-wrapper').scrollTo($('#accounts'), 500, {
                axis: 'x'
              });
              args.data.asm.transition();
            } else {
              args.data.account.saveS({
                name: $("#account-name").attr('value'),
                type: $("#account-type").attr("value"),
                counterWeight: $("#account-counterWeight").attr("value")
              }, {
                wait: true,
                type: "POST",
                success: function() {
                  console.log("successful save");
                  $('#left-wrapper').scrollTo($('#accounts'), 500, {
                    axis: 'x'
                  });
                  return args.data.asm.transition();
                }
              });
            }
            return StateMachine.ASYNC;
          }
        }
      }),
      esm: StateMachine.create({
        initial: 'Es',
        events: [
          {
            name: 'EsE',
            from: 'Es',
            to: 'E'
          }, {
            name: 'EEpart',
            from: 'E',
            to: 'Epart'
          }, {
            name: 'EpartE',
            from: 'Epart',
            to: 'E'
          }, {
            name: 'EEs',
            from: 'E',
            to: 'Es'
          }
        ],
        callbacks: {
          /* 
          # PART 1
          */
          onbeforeEsE: function(event, from, to, args) {
            var entry;
            console.log('START Transition from Es->E');
            entry = args.data.entries.get(args.target.dataset['eid']);
            _.extend(entry, Backbone.Events);
            entry.bind('change', args.data.entryView.render, {
              model: entry,
              view: args.data.entryView
            });
            entry.trigger('change');
            return $('#right-wrapper').scrollTo($('#entry'), 500, {
              axis: 'x'
            });
          },
          onafterEsE: function(event, from, to, args) {
            console.log('END Transition from Es->E');
            $('#entry-ok').unbind('click').bind('click', {
              esm: args.data.esm
            }, _.bind(args.data.esm.EEs, args.data.esm));
            return $('#entry-cancel').unbind('click').bind('click', {
              cancel: true,
              esm: args.data.esm
            }, _.bind(args.data.esm.EEs, args.data.esm));
          },
          /* 
          # PART 2
          */
          onbeforeEEpart: function(event, from, to, args) {
            return console.log('START Transition from E->Epart');
          },
          onafterEEpart: function(event, from, to, args) {
            return console.log('END Transition from E->Epart');
          },
          /*
                                          # STATE callbacks from EntryPart, and from Entry
                                          */
          onleaveEpart: function(event, from, to, args) {
            return console.log('START Transition from Epart->E');
          },
          onleaveE: function(event, from, to, args) {
            console.log('START Transition from E->Es');
            if (args.data.cancel) {
              console.log("Entriess cancel");
              $('#right-wrapper').scrollTo($('#entries'), 500, {
                axis: 'x'
              });
              args.data.asm.transition();
            } else {
              console.log("Entriess ok");
              $('#right-wrapper').scrollTo($('#entries'), 500, {
                axis: 'x'
              });
              args.data.asm.transition();
            }
            return StateMachine.ASYNC;
          }
        }
      })
    };
  });
}).call(this);
