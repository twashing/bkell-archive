
//require("/javascript/model/user.js", true);
//require("/javascript/json2.js", true)
//require("/javascript/underscore.js", true)
//require("/javascript/backbone.js", true)

bkeeping = {};
bkeeping.models = {};

bkeeping.models.Register = Backbone.Model.extend({

  urlRoot : "/user",
  
  login : function() { 
    
  }, 
  
  savek : function(valueMap, successCallb, errorCallb) { 
        
        // assigning default success and error callbacks unless user passes one in
        var successC = (successCallb) ? successCallb : function(model, response) { 
             
             console.log("success CALLED > model["+ model +"] > response["+ response +"]"); 
             
             this["_id"] = response._id;
             this["id"] = response.username;
             
           }; 
        var errorC = (errorCallb) ? errorCallb : function(model, response) { 
             console.log("error CALLED > model["+ model +"] > response["+ response.responseText +"]"); 
           }; 
        
        this.save(  (valueMap) ? valueMap : {}, 
                              { success : successC,
                                error : errorC
                              }
       );}
}); 


