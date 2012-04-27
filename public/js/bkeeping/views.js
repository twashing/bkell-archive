(function() {
  define(['js/bkeeping/bkeeping', 'js/bkeeping/util'], function(bkeeping, util) {
    /*
      # Pure Template DIRECTIVES
      */
    var AccountRow, AccountView, AccountsView, EntriesView, EntryPartView, EntryRow, EntryView, pureDirectives;
    pureDirectives = {
      accountsDirective: {
        "tbody tr": {
          "each<-puredata": {
            "button.editaccount@data-aid": "each.id",
            "td.name": "each.name",
            "td.type": "each.type",
            "td.weight": "each.counterWeight",
            "button.deleteaccount@data-aid": "each.id"
          }
        }
      },
      accountDirective: {
        "#account-name@value": "id"
      },
      entriesDirective: {
        "tbody tr": {
          "each<-puredata": {
            "button.editentry@data-eid": "each.id",
            "td.date": "each.date",
            "td.name": "each.name",
            "td.balance": "each.balance",
            "button.deleteentry@data-eid": "each.id"
          }
        }
      },
      entryDirective: {
        "tbody tr": {
          "each<-puredata": {
            "button.editentrypart@data-eid": "each.id",
            "button.editentrypart@data-type": "each.tag",
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
            },
            "button.deleteentrypart@data-eid": "each.id"
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
        var template;
        console.log('AccountView render CALLED');
        template = "<div class='account_content'> <div> <label>Name</label> <input id='account-name' type='text' /> </div> <div> <label>Category</label> <select id='account-type'> <option value='asset'>asset</option> <option value='liability'>liability</option> <option value='revenue'>revenue</option> <option value='expense'>expense</option> </select> </div> <div> <label>Type</label> <select id='account-counterWeight'> <option value='debit'>debit</option> <option value='credit'>credit</option> </select> </div> <div> <button id='account-ok' >Save</button> <button id='account-cancel' >Cancel</button> </div> </div>";
        $(".account_container").empty().append(template);
        $("#account-ok").addClass("btn").addClass("btn-success");
        $("#account-cancel").addClass("btn").addClass("btn-danger");
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
        template = $("<tr> <td> <button class='editentrypart' >edit</button> </td> <td class='debitAccount'>Debit Account</td> <td class='debitAmount'>Debit Amount</td> <td>&nbsp;</td> <td class='creditAccount'>Credit Account</td> <td class='creditAmount'>Credit Amount</td> <td> <button class='deleteentrypart' >delete</button> </td> </tr>");
        $(".entry_container tbody").empty().append(template);
        template.find(".editentrypart").addClass("btn");
        template.find(".deleteentrypart").addClass("btn");
        $("#entrypart-add").addClass("btn").addClass("btn-primary");
        $("#entry-ok").addClass("btn").addClass("btn-success");
        $("#entry-cancel").addClass("btn").addClass("btn-danger");
        $(".entry_content > table").addClass("table");
        $(".entry_container").render({
          puredata: this.model.get('content')
        }, pureDirectives.entryDirective);
        $("td").css("border", 0);
        $("#entry-date").datepicker();
        $("#entry-date").val(this.model.get("date"));
        return $("#entry-name").val(this.model.get("name"));
      },
      renderEntry: function(options) {
        console.log('commonEntryRender CALLED');
        /*
              # load the UI 
              */
        _.extend(options.entry, Backbone.Events);
        options.entry.unbind('change');
        return options.entry.bind('change', options.entryView.render, {
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
          $("#entrypart-add").unbind("click").bind("click", _.extend({
            epart: {
              accountid: null,
              amount: null,
              id: result,
              tag: null
            }
          }, bindObjects), _.bind(options.esm.EEpart, options.esm));
          $(options.entryView.el).find(".editentrypart").unbind("click").bind("click", bindObjects, _.bind(options.esm.EEpart, options.esm));
          $(options.entryView.el).find(".deleteentrypart").unbind("click").bind("click", bindObjects, function(event) {
            var bobjs, entry, entryView, epId;
            bobjs = {
              entriesView: event.data.entriesView,
              entryView: event.data.entryView,
              entryPartView: event.data.entryPartView,
              entries: event.data.entries,
              accounts: event.data.accounts,
              entry: event.data.entry,
              esm: event.data.esm
            };
            epId = event.target.dataset['eid'];
            entry = event.data.entry;
            entryView = event.data.entryView;
            return util.makeGenericDialog("Are you sure you want to delete this entry part?", function() {
              entry.removeEntryPart(epId);
              return entryView.instrumentEntry(bobjs);
            });
          });
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
        template = "<div> <label>Amount</label> <input id='entry-part-amount' type='text' /> </div> <div> <label>Account</label> <select id='entry-part-account'> <option label='' value=''></option> </select> </div> <div> <label>Type</label> <select id='entry-part-type'> <option value='debit'>debit</option> <option value='credit'>credit</option> </select> </div> <div> <button id='entry-part-ok' >Save</button> <button id='entry-part-cancel' >Cancel</button> </div>";
        $(".entryPart_container .entryPart_content").empty().append(template);
        $("#entry-part-ok").addClass("btn").addClass("btn-success");
        $("#entry-part-cancel").addClass("btn").addClass("btn-danger");
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
        template = $("<table id='accounts-table'> <thead> <tr> <th></th> <th>Name</th> <th>Category</th> <th>Type</th> <th></th> </tr> </thead> <tbody> <tr> <td> <button class='editaccount' >edit</a> </td> <td class='name'>My Name</td> <td class='type'>My Type</td> <td class='weight'>My Weight</td> <td> <button class='deleteaccount' data-toggle='modal' data-target='#delete-confirm' >delete</a> </td> </tr> </tbody> <tfoot> <tr> <td> <button id='account-add' >Add</button> </td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> </tfoot> </table>");
        template.addClass("table").addClass("table-condensed");
        template.find(".editaccount").addClass("btn");
        template.find(".deleteaccount").addClass("btn");
        template.find("#account-add").addClass("btn btn-primary");
        $("#accounts-pane > .tab_container > .tab_content").empty().append(template);
        ctx = this;
        $("#accounts").render({
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
        return $("td").css("border", 0);
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
        var bindFunction, bindInstrumentEntries, bindObjects, bindRender;
        bindObjects = {
          entries: options.collection,
          entriesView: this,
          entryView: options.entryView,
          entryPartView: options.entryPartView,
          accounts: options.accounts,
          esm: options.esm
        };
        this.collection = options.collection;
        this.collection.bind('reset', _.bind(this.render, this), bindObjects);
        this.collection.bind('add', _.bind(this.render, this), bindObjects);
        this.collection.bind('change', _.bind(this.render, this), bindObjects);
        bindRender = _.bind(this.render, this);
        bindInstrumentEntries = _.bind(this.instrumentEntries, this);
        bindFunction = function() {
          bindRender();
          return bindInstrumentEntries($("#entries-table"), bindObjects, bindObjects.esm);
        };
        return this.collection.bind('destroy', bindFunction, bindObjects);
      },
      entryRows: [],
      render: function(args) {
        var ctx, template;
        console.log("EntriesView.render CALLED");
        template = $("<table id='entries-table'> <thead> <tr> <th></th> <th>Date</th> <th>Name</th> <th>Balance</th> <th></th> </tr> </thead> <tbody> <tr> <td> <button class='editentry' >edit</a> </td> <td class='date'>My Date</td> <td class='name'>My Name</td> <td class='balance'>My Balance</td> <td> <button class='deleteentry' >delete</a> </td> </tr> </tbody> <tfoot> <tr> <td> <input id='entry-add' type='button' value='Add' /> </td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> </tfoot> </table>");
        template.addClass("table");
        template.find(".editentry").addClass("btn");
        template.find(".deleteentry").addClass("btn");
        template.find("#entry-add").addClass("btn btn-primary");
        $("#entries-pane > .entries_container > .entry_content").empty().append(template);
        ctx = this;
        _.map(this.collection.models, function(ech) {
          var bal;
          bal = ech.balances(ctx.options.accounts);
          return ech.attributes.balance = bal.lhs;
        });
        $("#entries").render({
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
        return $("td").css("border", 0);
      },
      instrumentEntries: function(elem, bindings, esm) {
        elem.find('.editentry').unbind('click').bind('click', bindings, _.bind(esm.EsE, esm));
        elem.find('.deleteentry').unbind('click').bind('click', bindings, function(args) {
          var eid, entry;
          console.log(".deleteentry");
          eid = $(this).data("eid");
          entry = args.data.entries.get(eid);
          return util.makeGenericDialog("Are you sure you want to delete this entry?", function() {
            return entry.destroy();
          });
        });
        return elem.find('#entry-add').unbind('click').bind('click', _.extend({
          entry: new bkeeping.models.Entry({
            content: []
          })
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
