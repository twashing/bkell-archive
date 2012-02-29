(function() {
  define([], function() {
    /*
      # Grab the Backbone object 
      */
    /*
      # Pure Template DIRECTIVES
      */
    var AccountRow, AccountView, AccountsView, EntriesView, EntryRow, EntryView, pureDirectives;
    pureDirectives = {
      accountsDirective: {
        "tbody tr": {
          "each<-puredata": {
            "a.editaccount@data-aid": "each.id",
            "td.name": "each.name",
            "td.type": "each.type",
            "td.weight": "each.counterWeight"
          }
        }
      },
      entriesDirective: {
        "tbody tr": {
          "each<-puredata": {
            "a.editentry@href": function(arg) {
              return "/entries/entry/" + arg.each.item.id;
            },
            "td.date": "each.date",
            "td.name": "each.id",
            "td.balance": ""
          }
        }
      }
    };
    /*
      # Detail VIEWs
      */
    AccountView = Backbone.View.extend({
      initialize: function(options) {
        return console.log('AccountView initialize CALLED');
      },
      render: function(options) {
        return console.log('AccountView render CALLED');
      }
    });
    EntryView = Backbone.View.extend({});
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
    EntryRow = Backbone.View.extend({});
    /*
      # Accounts and Entries VIEWs
      */
    AccountsView = Backbone.View.extend({
      el: $('#accounts'),
      initialize: function(options) {
        this.collection = options.collection;
        return this.collection.bind('reset', _.bind(this.render, this));
      },
      accountRows: [],
      render: function() {
        var ctx;
        ctx = this;
        return this.el.render({
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
      }
    });
    EntriesView = Backbone.View.extend({
      el: $('#right-col'),
      initialize: function(options) {
        this.collection = options.collection;
        return this.collection.bind('reset', _.bind(this.render, this));
      },
      render: function() {
        return this.el.render({
          puredata: this.collection.toJSON()
        }, pureDirectives.entriesDirective).find('table').dataTable();
      }
    });
    return {
      /*
        # return an object with the View classes
        */
      AccountView: AccountView,
      EntryView: EntryView,
      AccountRow: AccountRow,
      EntryRow: EntryRow,
      AccountsView: AccountsView,
      EntriesView: EntriesView
    };
  });
}).call(this);
