(function() {
  require.config({
    baseUrl: '/js'
  });
  define(['Backbone'], function(bb) {
    /*
      # Grab the Backbone object 
      */
    var AbstractK, AbstractL, Backbone, commonFetch;
    Backbone = bb.Backbone;
    /*
      # Setup an Abstract Class & Collection that accepts success and error callbacks
      */
    commonFetch = function(valueMap, options) {
      var errorC, statusC, successC;
      successC = options && options.success ? options.success : (function(model, response) {
        return console.log("success [commonFetch] CALLED > model[ " + model + " ] > response[ " + response + " ]");
      });
      errorC = options && options.error ? options.error : (function(model, response) {
        return console.log("error CALLED > model[" + model(+"] > response[" + response.responseText(+"]")));
      });
      statusC = options && options.statusCode ? options.statusCode : {
        302: function() {
          return console.log("302 called");
        }
      };
      return this.fetch({
        success: successC
      }, {
        error: errorC
      });
    };
    AbstractK = Backbone.Model.extend({
      saveS: function(valueMap, options) {
        var errorC, statusC, successC;
        successC = options && options.success ? options.success : (function(model, response) {
          console.log("success [bkeeping.models.AbstractK] CALLED > model[ " + model + " ] > response[ " + response + " ]");
          this["_id"] = response._id;
          return this["id"] = response.username;
        });
        errorC = options && options.error ? options.error : (function(model, response) {
          return console.log("error CALLED > model[" + model(+"] > response[" + response.responseText(+"]")));
        });
        statusC = options && options.statusCode ? options.statusCode : {
          302: function() {
            return console.log("302 called");
          }
        };
        return this.save((valueMap ? valueMap : {}), {
          success: successC,
          error: errorC,
          statusCode: statusC
        });
      },
      fetchS: commonFetch
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
        model: this.Account
      }),
      Entries: AbstractL.extend({
        model: this.Entry
      })
    };
  });
}).call(this);
