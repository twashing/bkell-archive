(function() {
  define(['bkeeping/util'], function(util) {
    /*
      # Grab the Backbone object 
      */
    /*
      # Setup an Abstract Class & Collection that accepts success and error callbacks
      */
    var AbstractK, Account, Accounts, Entries, Entry, commonFetch;
    commonFetch = function(options) {
      var errorC, successC;
      successC = options && options.success ? options.success : (function(model, response) {
        return console.log("success [commonFetch] CALLED > model[ " + model + " ] > response[ " + response + " ]");
      });
      errorC = options && options.error ? options.error : (function(model, response) {
        return console.log("error CALLED > model[" + model(+"] > response[" + response.responseText(+"]")));
      });
      return this.fetch(_.extend((options ? options : {}), {
        success: successC,
        error: errorC
      }));
    };
    AbstractK = Backbone.Model.extend({
      url: function() {
        var base;
        base = this.urlRoot || getUrl(this.collection) || urlError();
        if (this.isNew()) {
          return base;
        }
        return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + encodeURIComponent(this.id);
      },
      saveS: function(valueMap, options) {
        var errorC, statusC, successC;
        successC = options && options.success ? options.success : (function(model, response) {
          return console.log("success [bkeeping.models.AbstractK.saveS] CALLED > model[ " + model + " ] > response[ " + response + " ]");
          /*
                  this["_id"] = response._id
                  this["id"] = response.username
                  */
        });
        errorC = options && options.error ? options.error : (function(model, response) {});
        statusC = options && options.statusCode ? options.statusCode : {
          302: function() {
            return console.log("302 called");
          }
        };
        return this.save((valueMap ? valueMap : {}), _.extend((options ? options : {}), {
          success: successC,
          error: errorC,
          statusCode: statusC
        }));
      },
      removeS: function(options) {
        var errorC, successC;
        successC = options && options.success ? options.success : (function(model, response) {
          return console.log("success [bkeeping.models.AbstractK.removeS] CALLED > model[ " + model + " ] > response[ " + response + " ]");
        });
        errorC = options && options.error ? options.error : (function(model, response) {});
        return this.destroy(_.extend((options ? options : {}), {
          success: successC,
          error: errorC
        }));
      },
      parse: function(data) {
        console.log("AbstractK > parse fn CALLED");
        return data;
      }
    });
    /*
      # Account & Entry
      */
    Account = AbstractK.extend({
      urlRoot: "/account",
      validate: function(attrs) {
        if (!util.exists(attrs.name) || attrs.name.isempty()) {
          return {
            name: false
          };
        }
      }
    });
    Entry = AbstractK.extend({
      urlRoot: "/entry",
      balances: function(accounts) {
        var result;
        result = _.reduce(this.get("content"), (function(tally, ech) {
          var account;
          account = _.find(accounts.models, function(act) {
            return act.get("id") === ech.accountid;
          });
          if (!account) {} else if (((ech.tag === "debit") && (account.get("counterWeight") === "debit")) || (ech.tag === "credit") && (account.get("counterWeight") === "credit")) {
            tally.lhs += parseFloat(ech.amount);
          } else {
            tally.rhs += parseFloat(ech.amount);
          }
          return tally;
        }), {
          lhs: 0,
          rhs: 0
        });
        return _.extend({ balances: result.lhs == result.rhs }, result);
      },
      findEntryPart: function(eid) {
        return _.find(this.get("content"), function(ech) {
          return ech.id === eid;
        });
      },
      removeEntryPart: function(eid) {
        var filteredContentList;
        filteredContentList = _.reject(this.get("content"), function(ech) {
          return ech.id === eid;
        });
        return this.set({
          "content": filteredContentList
        });
      }
    });
    /*
      # Collections
      */
    Accounts = Backbone.Collection.extend({
      url: '/accounts',
      model: Account,
      fetchS: function(options) {
        var errorC, successC;
        successC = options && options.success ? options.success : (function(model, response) {
          return console.log("success [commonFetch] CALLED > model[ " + model + " ] > response[ " + response + " ]");
        });
        errorC = options && options.error ? options.error : (function(model, response) {
          return console.log("error CALLED > model[" + model(+"] > response[" + response.responseText(+"]")));
        });
        return this.fetch(_.extend((options ? options : {}), {
          success: successC,
          error: errorC
        }));
      }
    });
    Entries = Backbone.Collection.extend({
      url: '/entries',
      model: Entry,
      fetchS: function(options) {
        var errorC, successC;
        successC = options && options.success ? options.success : (function(model, response) {
          return console.log("success [commonFetch] CALLED > model[ " + model + " ] > response[ " + response + " ]");
        });
        errorC = options && options.error ? options.error : (function(model, response) {
          return console.log("error CALLED > model[" + model(+"] > response[" + response.responseText(+"]")));
        });
        return this.fetch(_.extend((options ? options : {}), {
          success: successC,
          error: errorC
        }));
      }
    });
    return {
      Account: Account,
      Entry: Entry,
      Accounts: Accounts,
      Entries: Entries
    };
  });
}).call(this);
