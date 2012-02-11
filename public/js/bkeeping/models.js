(function() {
  require.config({
    baseUrl: '/js'
  });
  define(['Backbone'], function(Backbone) {
    var Account;
    return Account = Backbone.Model.extend({
      urlRoot: "/account"
    });
  });
}).call(this);
