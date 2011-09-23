
//require("/javascript/model/user.js", true);
//require("/javascript/json2.js", true)
//require("/javascript/underscore.js", true)
//require("/javascript/backbone.js", true)

bkeeping = {};
bkeeping.models = {};

bkeeping.models.AbstractK = Backbone.Model.extend({

  savek : function(valueMap, successCallb, errorCallb) { 
        
        // assigning default success and error callbacks unless user passes one in
        var successC = (successCallb) ? successCallb : function(model, response) { 
             
             console.log("success [bkeeping.models.Abstract] CALLED > model["+ model +"] > response["+ response +"]"); 
             
             this["_id"] = response._id;
             this["id"] = response.username;
             
           }; 
        var errorC = (errorCallb) ? errorCallb : function(model, response) { 
             console.log("error CALLED > model["+ model +"] > response["+ response.responseText +"]"); 
           }; 
        
        this.save(  (valueMap) ? valueMap : {}, 
                              { success : successC,
                                error : errorC,
                                statusCode: {
                                  302 : function() { console.log("... 302 called"); }
                                }
                              }
       );}
});

bkeeping.models.Register = bkeeping.models.AbstractK.extend({

  urlRoot : "/user",
  
}); 
bkeeping.models.Login = bkeeping.models.AbstractK.extend({
  
  urlRoot : "/login",
  
}); 


