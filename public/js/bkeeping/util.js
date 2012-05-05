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
      },
      makeGenericDialog: function(message, okfn) {
        $(".modal-body").text(message);
        $("#modal-delete-ok").unbind("click").bind("click", function() {
          console.log("OK delete clicked");
          $("#delete-confirm").modal("hide");
          return okfn.apply();
        });
        $("#modal-delete-cancel").unbind("click").bind("click", function() {
          console.log("CANCEL delete clicked");
          return $("#delete-confirm").modal("hide");
        });
        $("#delete-confirm").modal();
        return true;
      }
    };
  });
}).call(this);
