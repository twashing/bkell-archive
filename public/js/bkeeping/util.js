(function() {
  define([], function() {
    return {
      /*
        # Grab the Backbone object 
        */
      exists: function(thing) {
        if ((!(typeof thing === "undefined")) && thing) {
          return true;
        }
        return false;
      }
    };
  });
}).call(this);
