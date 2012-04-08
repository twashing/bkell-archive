(function() {
  define(['js/bkeeping/bkeeping'], function(bkeeping) {
    /*
      # Pure Template DIRECTIVES
      */
    var AccountRow, AccountView, AccountsView, EntriesView, EntryPartView, EntryRow, EntryView, pureDirectives;
    pureDirectives = {
      accountsDirective: {
        "tbody tr": {
          "each<-puredata": {
            "a.editaccount@data-aid": "each.id",
            "td.name": "each.name",
            "td.type": "each.type",
            "td.weight": "each.counterWeight",
            "a.deleteaccount@data-aid": "each.id"
          }
        }
      },
      accountDirective: {
        "#account-name@value": "id"
      },
      entriesDirective: {
        "tbody tr": {
          "each<-puredata": {
            "a.editentry@data-eid": "each.id",
            "td.date": "each.date",
            "td.name": "each.id",
            "td.balance": "",
            "a.deleteentry@data-eid": "each.id"
          }
        }
      },
      entryDirective: {
        "tbody tr": {
          "each<-puredata": {
            "a.editentrypart@data-eid": "each.id",
            "a.editentrypart@data-type": "each.tag",
            "td.debitAccount": function(arg) {
              return pureDirectives.determineAccountDtCt(this, "debit");
            },
            "td.debitAmount": function(arg) {
              return pureDirectives.determineAmountDtCt(this, "debit");
            },
            "td.creditAccount": function(arg) {
              return pureDirectives.determineAccountDtCt(this, "credit");
            },
            "td.creditAmount": function(arg) {
              return pureDirectives.determineAmountDtCt(this, "credit");
            }
          }
        }
      },
      determineCommon: function(arg, weight, attribute) {
        if (arg["tag"] === weight) {
          return arg[attribute];
        }
        return "&nbsp;";
      },
      determineAccountDtCt: function(arg, weight) {
        return pureDirectives.determineCommon(arg, weight, "accountid");
      },
      determineAmountDtCt: function(arg, weight) {
        return pureDirectives.determineCommon(arg, weight, "amount");
      },
      entryPartDirective: {
        "select#entry-part-account option": {
          "each<-puredata": {
            ".@value": "each.id",
            ".": "each.name"
          }
        }
      }
    };
    /*
      # Detail VIEWs
      */
    AccountView = Backbone.View.extend({
      initialize: function(options) {
        console.log('AccountView initialize CALLED');
        return this.el = $(options.el);
      },
      render: function(options) {
        console.log('AccountView render CALLED');
        $("#account-name").attr('value', this.model.get('name'));
        $("#account-type > option[value='" + (this.model.get('type')) + "']").attr('selected', 'selected');
        return $("#account-counterWeight > option[value='" + (this.model.get('counterWeight')) + "']").attr('selected', 'selected');
      }
    });
    EntryView = Backbone.View.extend({
      initialize: function(options) {
        console.log('EntryView initialize CALLED');
        return this.el = $(options.el);
      },
      render: function(options) {
        var template;
        console.log('EntryView render CALLED');
        /*
              # clear the container each time - don't want to incrementally add
              */
        template = $("<tr> <td> <a class='editentrypart' href='#'>edit</a> </td> <td class='debitAccount'>Debit Account</td> <td class='debitAmount'>Debit Amount</td> <td>&nbsp;</td> <td class='creditAccount'>Credit Account</td> <td class='creditAmount'>Credit Amount</td> <td> <a class='deleteentrypart' href='#'>delete</a> </td> </tr>");
        $(".entry_container tbody").empty().append(template);
        return $(".entry_container").render({
          puredata: this.model.get('content')
        }, pureDirectives.entryDirective);
      },
      renderEntry: function(options) {
        console.log('commonEntryRender CALLED');
        /*
              # load the UI 
              */
        _.extend(options.entry, Backbone.Events);
        return options.entry.unbind('change').bind('change', options.entryView.render, {
          model: options.entry,
          view: options.entryView
        }).trigger('change');
      },
      instrumentEntry: function(options) {
        var bindObjects;
        console.log('instrumentEntry CALLED');
        bindObjects = {
          entriesView: options.entriesView,
          entryView: options.entryView,
          entryPartView: options.entryPartView,
          entries: options.entries,
          accounts: options.accounts,
          entry: options.entry,
          esm: options.esm
        };
        return $.get("/generateid", function(result, status, obj) {
          $("#entrypart-add").unbind('click').bind('click', _.extend({
            epart: {
              accountid: null,
              amount: null,
              id: result,
              tag: null
            }
          }, bindObjects), _.bind(options.esm.EEpart, options.esm));
          $(options.entryView.el).find('.editentrypart').unbind('click').bind('click', bindObjects, _.bind(options.esm.EEpart, options.esm));
          $('#entry-ok').unbind('click').bind('click', _.extend({
            ok: true
          }, bindObjects), _.bind(options.esm.EEs, options.esm));
          return $('#entry-cancel').unbind('click').bind('click', _.extend({
            cancel: true
          }, bindObjects), _.bind(options.esm.EEs, options.esm));
        });
      }
    });
    EntryPartView = Backbone.View.extend({
      initialize: function(options) {
        console.log('EntryPartView initialize CALLED');
        return this.el = $(options.el);
      },
      render: function(options) {
        var template;
        console.log('EntryPartView render CALLED');
        template = "<div> <label>Amount</label> <input id='entry-part-amount' type='text' /> </div> <div> <label>Account</label> <select id='entry-part-account'> <option label='' value=''></option> </select> </div> <div> <label>Type</label> <select id='entry-part-type'> <option value='debit'>debit</option> <option value='credit'>credit</option> </select> </div> <div> <input id='entry-part-ok' type='button' value='Save' /> <input id='entry-part-cancel' type='button' value='Cancel' /> </div>";
        $(".entryPart_container .entryPart_content").empty().append(template);
        $(".entryPart_container .entryPart_content").render({
          puredata: this.accounts.toJSON()
        }, pureDirectives.entryPartDirective);
        $("#entry-part-amount").attr('value', this.model['amount']);
        $("#entry-part-account > option[value='" + this.model['accountid'] + "']").attr('selected', 'selected');
        return $("#entry-part-type > option[value='" + this.model['tag'] + "']").attr('selected', 'selected');
      }
    });
    /*
      # Row VIEWs
      */
    AccountRow = Backbone.View.extend({
      initialize: function(options) {
        this.el = $(options.el);
        this.el.bind('change', this.accountChanged);
        this.el.find('.editaccount').bind('click', _.bind(this.editClicked, this));
        return this.el.find('.deleteaccount').bind('click', _.bind(this.deleteClicked, this));
      },
      editClicked: function() {
        return console.log('edit CLICKED');
      },
      deleteClicked: function() {
        return console.log('delete CLICKED');
      },
      accountChanged: function() {
        return console.log('account has been CHANGED');
      }
    });
    EntryRow = Backbone.View.extend({
      initialize: function(options) {
        this.el = $(options.el);
        this.el.bind('change', this.entryChanged);
        this.el.find('.editentry').bind('click', _.bind(this.editClicked, this));
        return this.el.find('.deleteentry').bind('click', _.bind(this.deleteClicked, this));
      },
      editClicked: function() {
        console.log('edit entry CLICKED');
        return false;
      },
      deleteClicked: function() {
        console.log('delete entry CLICKED');
        return false;
      },
      entryChanged: function() {
        console.log('entry has been CHANGED');
        return false;
      }
    });
    /*
      # Accounts and Entries VIEWs
      */
    AccountsView = Backbone.View.extend({
      el: $('#accounts'),
      initialize: function(options) {
        var bindInstrumentAccounts, bindObjects, bindRender;
        this.collection = options.collection;
        this.collection.bind('reset', _.bind(this.render, this));
        this.collection.bind('add', _.bind(this.render, this));
        this.collection.bind('change', _.bind(this.render, this));
        bindRender = _.bind(this.render, this);
        bindInstrumentAccounts = _.bind(this.instrumentAccounts, this);
        bindObjects = {
          accounts: options.collection,
          accountsView: this,
          accountView: options.accountView,
          asm: options.asm
        };
        return this.collection.bind('destroy', function() {
          bindRender();
          return bindInstrumentAccounts($("#accounts-table"), bindObjects, bindObjects.asm);
        });
      },
      accountRows: [],
      render: function() {
        var ctx, template;
        console.log("AccountsView.render CALLED");
        template = $("<table id='accounts-table'> <thead> <tr> <th></th> <th>Name</th> <th>Category</th> <th>Type</th> <th></th> </tr> </thead> <tbody> <tr> <td> <a class='editaccount' href='#'>edit</a> </td> <td class='name'>My Name</td> <td class='type'>My Type</td> <td class='weight'>My Weight</td> <td> <a class='deleteaccount' href='#'>delete</a> </td> </tr> </tbody> <tfoot> <tr> <td> <input id='account-add' type='button' value='Add' /> </td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> </tfoot> </table>");
        $("#accounts-pane > .tab_container > .tab_content > .dataTables_wrapper").empty().append(template);
        ctx = this;
        return $("#accounts").render({
          puredata: this.collection.toJSON()
        }, pureDirectives.accountsDirective).find('table').dataTable().find('tbody > tr').each(function(index, ech) {
          /*
                    # Nesting Row Views here
                    */
          var arow;
          arow = new AccountRow({
            el: ech
          });
          return ctx.accountRows.push(arow);
        });
      },
      /*
          # instrument Accounts pane with actions
          */
      instrumentAccounts: function(elem, bindings, asm) {
        elem.find('.editaccount').unbind('click').bind('click', bindings, _.bind(asm.AsA, asm));
        elem.find('.deleteaccount').unbind('click').bind('click', bindings, function(args) {
          var aid;
          console.log(".deleteaccount");
          aid = $(this).data("aid");
          return args.data.accounts.get(aid).destroy();
        });
        return elem.find("#account-add").unbind("click").bind("click", _.extend({
          account: new bkeeping.models.Account()
        }, bindings), _.bind(asm.AsA, asm));
      }
    });
    EntriesView = Backbone.View.extend({
      el: $('#entries'),
      initialize: function(options) {
        var bindInstrumentEntries, bindObjects, bindRender;
        this.collection = options.collection;
        this.collection.bind('reset', _.bind(this.render, this));
        this.collection.bind('add', _.bind(this.render, this));
        this.collection.bind('change', _.bind(this.render, this));
        bindRender = _.bind(this.render, this);
        bindInstrumentEntries = _.bind(this.instrumentEntries, this);
        bindObjects = {
          entries: options.collection,
          entriesView: this,
          entryView: options.entryView,
          entryPartView: options.entryPartView,
          accounts: options.accounts,
          esm: options.esm
        };
        return this.collection.bind('destroy', function() {
          bindRender();
          return bindInstrumentEntries($("#entries-table"), bindObjects, bindObjects.esm);
        });
      },
      entryRows: [],
      render: function() {
        var ctx, template;
        console.log("EntriesView.render CALLED");
        template = $("<table id='entries-table'> <thead> <tr> <th></th> <th>Date</th> <th>Name</th> <th>Balance</th> <th></th> </tr> </thead> <tbody> <tr> <td> <a class='editentry' href='#'>edit</a> </td> <td class='date'>My Date</td> <td class='name'>My Name</td> <td class='balance'>My Balance</td> <td> <a class='deleteentry' href='#'>delete</a> </td> </tr> </tbody> <tfoot> <tr> <td> <input id='entry-add' type='button' value='Add' /> </td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> </tfoot> </table>");
        $("#entries-pane > .entries_container > .entry_content > .dataTables_wrapper").empty().append(template);
        ctx = this;
        return $("#entries").render({
          puredata: this.collection.toJSON()
        }, pureDirectives.entriesDirective).find('table').dataTable().find('tbody > tr').each(function(index, ech) {
          /*
                    # Nesting Row Views here
                    */
          var arow;
          arow = new EntryRow({
            el: ech
          });
          return ctx.entryRows.push(arow);
        });
      },
      instrumentEntries: function(elem, bindings, esm) {
        elem.find('.editentry').unbind('click').bind('click', bindings, _.bind(esm.EsE, esm));
        elem.find('.deleteentry').unbind('click').bind('click', bindings, function(args) {
          var eid;
          console.log(".deleteentry");
          eid = $(this).data("eid");
          return args.data.entries.get(eid).destroy();
        });
        return elem.find('#entry-add').unbind('click').bind('click', _.extend({
          entry: new bkeeping.models.Entry()
        }, bindings), _.bind(esm.EsE, esm));
      }
    });
    return {
      /*
        # return an object with the View classes
        */
      AccountView: AccountView,
      EntryView: EntryView,
      EntryPartView: EntryPartView,
      AccountRow: AccountRow,
      EntryRow: EntryRow,
      AccountsView: AccountsView,
      EntriesView: EntriesView
    };
  });
}).call(this);
