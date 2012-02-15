(function() {
  require.config({
    baseUrl: '/js'
  });
  define(['Backbone'], function(bb) {
    var AbstractK, Backbone;
    Backbone = bb.Backbone;
    AbstractK = Backbone.Model.extend({
      savek: function(valueMap, options) {
        var errorC, statusC, successC;
        successC = options && options.success ? options.success : (function(model, response) {
          console.log("success [bkeeping.models.Abstract] CALLED > model[ " + model + " ] > response[ " + response + " ]");
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
          success: successC({
            error: errorC,
            statusCode: statusC
          })
        });
      }
    });
    return {
      Account: AbstractK.extend({
        urlRoot: "/account"
      }),
      Entry: AbstractK.extend({
        urlRoot: "/entry"
      })
    };
  });
}).call(this);
