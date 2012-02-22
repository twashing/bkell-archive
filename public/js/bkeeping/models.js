(function() {
  define([], function() {
    /*
      # Grab the Backbone object 
      */
    /*
      # Setup an Abstract Class & Collection that accepts success and error callbacks
      */
    var AbstractK, AbstractL, commonFetch;
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
      fetchS: commonFetch,
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
      }
    });
    AbstractL = Backbone.Collection.extend({
      fetchS: commonFetch
    });
    return {
      /*
        # Account & Entry
        */
      Account: AbstractK.extend({
        urlRoot: "/account"
      }),
      Entry: AbstractK.extend({
        urlRoot: "/entry"
      }),
      /*
        # Collections
        */
      Accounts: AbstractL.extend({
        url: '/accounts',
        model: this.Account
      }),
      Entries: AbstractL.extend({
        url: '/entries',
        model: this.Entry
      })
    };
  });
}).call(this);
