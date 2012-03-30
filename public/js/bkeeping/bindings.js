(function() {
  define(["bkeeping/util"], function(util) {
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
            if (!util.exists(account)) {
              account = args.data.account;
            }
            _.extend(account, Backbone.Events);
            account.bind('change', args.data.accountView.render, {
              model: account,
              view: args.data.accountView
            }).trigger('change');
            return $('#left-wrapper').scrollTo($('#account'), 500, {
              axis: 'x'
            });
          },
          onafterAsA: function(event, from, to, args) {
            var account;
            console.log('END Transition from As->A');
            account = args.data.accounts.get(args.target.dataset['aid']);
            if (!util.exists(account)) {
              account = args.data.account;
            }
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
            var fdata, saveAccount;
            console.log('START Transition from A->As');
            if (args.data.cancel) {
              console.log("Accounts cancel");
              $('#left-wrapper').scrollTo($('#accounts'), 500, {
                axis: 'x'
              });
              args.data.asm.transition();
            } else {
              saveAccount = function(fdata) {
                return args.data.account.saveS(_.extend(fdata, {
                  name: $("#account-name").attr('value'),
                  type: $("#account-type").attr("value"),
                  counterWeight: $("#account-counterWeight").attr("value")
                }), {
                  wait: true,
                  type: args.data.account.isNew() ? "PUT" : "POST",
                  success: function() {
                    console.log("successful save");
                    args.data.accountsView.collection.reset(args.data.accounts);
                    $('#left-wrapper').scrollTo($('#accounts'), 500, {
                      axis: 'x'
                    });
                    return args.data.asm.transition();
                  }
                });
              };
              fdata = {};
              if (args.data.account.isNew()) {
                args.data.accounts.add(args.data.account);
                $.get("/generateid", function(result, status, obj) {
                  console.log("Generated account ID[" + result + "]");
                  fdata.id = result;
                  fdata.tag = "account";
                  return saveAccount(fdata);
                });
              } else {
                saveAccount(fdata);
              }
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
          commonEntryRender: function(options) {
            console.log('commonEntryRender CALLED');
            /*
                                              # load the UI 
                                              */
            _.extend(options.entry, Backbone.Events);
            options.entry.unbind('change');
            options.entry.bind('change', options.entryView.render, {
              model: options.entry,
              view: options.entryView
            });
            return options.entry.trigger('change');
          },
          commonEntryInstrument: function(options) {
            var bindObjects;
            console.log('commonEntryInstrument CALLED');
            bindObjects = {
              entriesView: options.entriesView,
              entryView: options.entryView,
              entryPartView: options.entryPartView,
              entries: options.entries,
              accounts: options.accounts,
              entry: options.entry,
              esm: options.esm
            };
            $(options.entryView.el).find('.editentrypart').unbind('click').bind('click', bindObjects, _.bind(options.esm.EEpart, options.esm));
            $('#entry-ok').unbind('click').bind('click', _.extend({
              ok: true
            }, bindObjects), _.bind(options.esm.EEs, options.esm));
            return $('#entry-cancel').unbind('click').bind('click', _.extend({
              cancel: true
            }, bindObjects), _.bind(options.esm.EEs, options.esm));
          },
          /* 
          # PART 1
          */
          onbeforeEsE: function(event, from, to, args) {
            console.log('START Transition from Es->E');
            /*
                                              # render Entry Pane
                                              */
            this.commonEntryRender({
              entry: args.data.entries.get(args.target.dataset['eid']),
              entryView: args.data.entryView
            });
            /*
                                              # scroll to the relevant pane 
                                              */
            return $('#right-wrapper').scrollTo($('#entry'), 500, {
              axis: 'x'
            });
          },
          onafterEsE: function(event, from, to, args) {
            console.log('END Transition from Es->E');
            /*
                                              # instrument the Entry Pane
                                              */
            return this.commonEntryInstrument({
              entriesView: args.data.entriesView,
              entryView: args.data.entryView,
              entryPartView: args.data.entryPartView,
              entries: args.data.entries,
              accounts: args.data.accounts,
              entry: args.data.entries.get(args.target.dataset['eid']),
              esm: args.data.esm
            });
          },
          /* 
          # PART 2
          */
          onbeforeEEpart: function(event, from, to, args) {
            var epart;
            console.log('START Transition from E->Epart');
            epart = _.find(args.data.entry.get('content'), function(ech) {
              return ech.id === args.target.dataset['eid'];
            });
            _.extend(epart, Backbone.Events);
            epart.unbind('change').bind('change', args.data.entryPartView.render, {
              model: epart,
              view: args.data.entryPartView,
              accounts: args.data.accounts
            });
            epart.trigger('change');
            return $('#right-wrapper').scrollTo($('#entry-part'), 500, {
              axis: 'x'
            });
          },
          onafterEEpart: function(event, from, to, args) {
            var bindObjects;
            console.log('END Transition from E->Epart');
            bindObjects = {
              entriesView: args.data.entriesView,
              entryView: args.data.entryView,
              entryPartView: args.data.entryPartView,
              entries: args.data.entries,
              entry: args.data.entry,
              epart: _.find(args.data.entry.get('content'), function(ech) {
                return ech.id === args.target.dataset['eid'];
              }),
              accounts: args.data.accounts,
              esm: args.data.esm
            };
            $('#entry-part-ok').unbind('click').bind('click', _.extend({
              ok: true
            }, bindObjects), _.bind(args.data.esm.EpartE, args.data.esm));
            return $('#entry-part-cancel').unbind('click').bind('click', _.extend({
              cancel: true
            }, bindObjects), _.bind(args.data.esm.EpartE, args.data.esm));
          },
          /*
                                          # BACK > STATE callbacks from EntryPart, and from Entry
                                          */
          onleaveEpart: function(event, from, to, args) {
            console.log('START Transition from Epart->E');
            if (args.data.ok) {
              console.log("#entry-part > ok clicked");
              args.data.epart.accountid = $("#entry-part-account").val();
              args.data.epart.amount = parseFloat($("#entry-part-amount").val());
              args.data.epart.tag = $("#entry-part-type").val();
              _.map(args.data.entry.get("contents"), function(ech) {
                if (ech.id === args.data.epart.id) {
                  return ech = args.data.epart;
                }
              });
            }
            this.commonEntryRender({
              entry: args.data.entry,
              entryView: args.data.entryView
            });
            this.commonEntryInstrument({
              entriesView: args.data.entriesView,
              entryView: args.data.entryView,
              entryPartView: args.data.entryPartView,
              entries: args.data.entries,
              entry: args.data.entry,
              accounts: args.data.accounts,
              esm: args.data.esm
            });
            return $('#right-wrapper').scrollTo($('#entry'), 500, {
              axis: 'x'
            });
          },
          onleaveE: function(event, from, to, args) {
            var bal;
            if (args.data.cancel) {
              console.log("START Transition from E->Es > Entriess cancel");
              return $('#right-wrapper').scrollTo($('#entries'), 500, {
                axis: 'x'
              });
            } else if (args.data.ok) {
              console.log("START Transition from E->Es > Entriess ok");
              bal = args.data.entry.balances(args.data.accounts);
              console.log("entry balances? [" + bal + "]");
              if (bal.balances) {
                args.data.entry.saveS({}, {
                  success: function(model, response) {
                    console.log("success on CUSTOM Entry CALLED > model[ " + model + " ] > response[ " + response + " ]");
                    $('#right-wrapper').scrollTo($('#entries'), 500, {
                      axis: 'x'
                    });
                    return args.data.esm.transition();
                  }
                });
                return StateMachine.ASYNC;
              } else {
                $(".entry_content > table").effect("shake", {
                  times: 2
                }, 50);
                return false;
              }
            }
          }
        }
      })
    };
  });
}).call(this);
