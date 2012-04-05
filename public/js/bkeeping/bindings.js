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
            var account, binds;
            console.log('END Transition from As->A');
            account = args.data.accounts.get(args.target.dataset['aid']);
            if (!util.exists(account)) {
              account = args.data.account;
            }
            binds = {
              accounts: args.data.accounts,
              account: account,
              accountsView: args.data.accountsView,
              accountView: args.data.accountView,
              asm: args.data.asm
            };
            $('#account-ok').unbind('click').bind('click', binds, _.bind(args.data.asm.AAs, args.data.asm));
            return $('#account-cancel').unbind('click').bind('click', _.extend({
              cancel: true
            }, binds), _.bind(args.data.asm.AAs, args.data.asm));
          },
          onleaveA: function(event, from, to, args) {
            var fdata, saveAccount;
            console.log('START Transition from A->As');
            if (args.data.cancel) {
              console.log("Accounts cancel");
              args.data.accountsView.instrumentAccounts($("#accounts-table"), {
                accounts: args.data.accounts,
                accountsView: args.data.accountsView,
                accountView: args.data.accountView,
                asm: args.data.asm
              }, args.data.asm);
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
                    args.data.accountsView.instrumentAccounts($("#accounts-table"), {
                      accounts: args.data.accounts,
                      accountsView: args.data.accountsView,
                      accountView: args.data.accountView,
                      asm: args.data.asm
                    }, args.data.asm);
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
          /* 
          # PART 1
          */
          onbeforeEsE: function(event, from, to, args) {
            console.log('START Transition from Es->E');
            /*
                                              # render Entry Pane
                                              */
            args.data.entryView.renderEntry({
              entry: args.data.entry ? args.data.entry : args.data.entries.get(args.target.dataset['eid']),
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
            return args.data.entryView.instrumentEntry({
              entriesView: args.data.entriesView,
              entryView: args.data.entryView,
              entryPartView: args.data.entryPartView,
              entries: args.data.entries,
              accounts: args.data.accounts,
              entry: args.data.entry ? args.data.entry : args.data.entries.get(args.target.dataset['eid']),
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
            /*
                                              # this is cause a circular JSON error - unbind
                                              */
            args.data.epart.unbind("change");
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
            args.data.entryView.renderEntry({
              entry: args.data.entry,
              entryView: args.data.entryView
            });
            args.data.entryView.instrumentEntry({
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
            var bal, fdata, saveEntry;
            if (args.data.cancel) {
              console.log("START Transition from E->Es > Entriess cancel");
              args.data.entriesView.instrumentEntries($("#entries-table"), {
                entries: args.data.entries,
                entriesView: args.data.entriesView,
                entryView: args.data.entryView,
                entryPartView: args.data.entryPartView,
                accounts: args.data.accounts,
                esm: args.data.esm
              }, args.data.esm);
              return $('#right-wrapper').scrollTo($('#entries'), 500, {
                axis: 'x'
              });
            } else if (args.data.ok) {
              console.log("START Transition from E->Es > Entriess ok");
              bal = args.data.entry.balances(args.data.accounts);
              console.log("entry balances? [" + bal + "]");
              if (bal.balances) {
                /*
                                                      # common saveEntry function
                                                      */
                saveEntry = function(fdata) {
                  return args.data.entry.saveS(fdata, {
                    wait: true,
                    type: args.data.entry.isNew() ? "PUT" : "POST",
                    success: function(model, response) {
                      console.log("success on CUSTOM Entry CALLED > model[ " + model + " ] > response[ " + response + " ]");
                      args.data.entriesView.instrumentEntries($("#entries-table"), {
                        entries: args.data.entries,
                        entriesView: args.data.entriesView,
                        entryView: args.data.entryView,
                        entryPartView: args.data.entryPartView,
                        accounts: args.data.accounts,
                        esm: args.data.esm
                      }, args.data.esm);
                      $('#right-wrapper').scrollTo($('#entries'), 500, {
                        axis: 'x'
                      });
                      return args.data.esm.transition();
                    }
                  });
                };
                /*
                                                      # 2. update entry 
                                                      */
                fdata = {};
                if (args.data.entry.isNew()) {
                  args.data.entries.add(args.data.entry, {
                    at: 0
                  });
                  $.get("/generateid", function(result, status, obj) {
                    console.log("Generated entry ID[" + result + "]");
                    fdata.id = result;
                    fdata.tag = "entry";
                    fdata.date = new Date(Date.now()).toString();
                    return saveEntry(fdata);
                  });
                } else {
                  saveEntry(args.data.entry.toJSON());
                }
                /*
                                                      # last statement in IF block
                                                      */
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
