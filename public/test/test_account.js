(function() {
  define(['js/bkeeping/models'], function(models) {
    return {
      ping: function() {
        return console.log("bkeeping/models loaded: " + models);
      }
    };
  });
}).call(this);
