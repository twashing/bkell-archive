(function() {
  define(['Backbone'], function(bb) {
    /*
      # Grab the Backbone object 
      */
    var Backbone, pureDirectives, _;
    Backbone = bb.Backbone;
    _ = bb._;
    /*
      # Pure Template DIRECTIVES
      */
    pureDirectives = {
      accountsDirective: {
        "tbody tr": {
          "each<-puredata": {
            "a.editaccount@href": function(arg) {
              return "/accounts/account/" + arg.each.item.id;
            },
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
    return {
      /*
        # return an object with the View classes
        */
      AccountsView: Backbone.View.extend({
        el: $('#accounts'),
        initialize: function(options) {
          this.collection = options.collection;
          return this.collection.bind('reset', _.bind(this.render, this));
        },
        render: function() {
          return this.el.render({
            puredata: this.collection.toJSON()
          }, pureDirectives.accountsDirective).find('table').dataTable();
        }
      }),
      EntriesView: Backbone.View.extend({
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
      })
    };
  });
}).call(this);
