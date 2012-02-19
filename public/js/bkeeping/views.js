(function() {
  define(['Backbone'], function(bb) {
    /*
      # Grab the Backbone object 
      */
    var Backbone, pureDirectives, _;
    Backbone = bb.Backbone;
    _ = bb._;
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
      AccountsView: Backbone.View.extend({
        el: $('#accounts'),
        initialize: function(options) {
          return this.collection = options.collection;
        },
        render: function() {
          var htmlContext;
          htmlContext = this.el;
          return this.collection.fetchS({
            success: function(models, response) {
              return $(htmlContext).render({
                puredata: response
              }, pureDirectives.accountsDirective).find('table').dataTable();
            }
          });
        }
      })
    };
  });
}).call(this);
