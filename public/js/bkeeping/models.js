(function() {
  require.config({
    baseUrl: '/js'
  });
  define(['Backbone'], function(bb) {
    var Account, Backbone;
    Backbone = bb.Backbone;
    return Account = Backbone.Model.extend({
      urlRoot: "/account"
    });
  });
}).call(this);
