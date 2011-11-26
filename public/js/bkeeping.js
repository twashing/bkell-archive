
//require("/javascript/model/user.js", true);
//require("/javascript/json2.js", true)
//require("/javascript/underscore.js", true)
//require("/javascript/backbone.js", true)

bkeeping = {};
bkeeping.models = {};
bkeeping.router = {};

bkeeping.models.AbstractK = Backbone.Model.extend({

  savek : function(valueMap, options) { 
        
        // assigning default success, error and options unless user passes one in
        var successC = (options && options.success) ? options.success : function(model, response) { 
             
             console.log("success [bkeeping.models.Abstract] CALLED > model["+ model +"] > response["+ response +"]"); 
             
             this["_id"] = response._id;
             this["id"] = response.username;
             
           }; 
        var errorC = (options && options.error) ? options.error : function(model, response) { 
             console.log("error CALLED > model["+ model +"] > response["+ response.responseText +"]"); 
           }; 
        var statusC = (options && options.statusCode) ? options.statusCode : { 302 : function() { console.log("... 302 called"); } }
        
        this.save(  (valueMap) ? valueMap : {}, 
                              { success : successC,
                                error : errorC,
                                statusCode: statusC
                              }
       );}
});

bkeeping.models.Register = bkeeping.models.AbstractK.extend({
  
  urlRoot : "/user",
  
}); 
bkeeping.models.Login = bkeeping.models.AbstractK.extend({
  
  urlRoot : "/login",
  
});



/********* 
 * Accounts & Entries 
 *********/
bkeeping.models.Accounts = bkeeping.models.AbstractK.extend({
  
  urlRoot : "/accounts",
  
}); 

bkeeping.models.Entries = bkeeping.models.AbstractK.extend({
  
  urlRoot : "/entries",
  
}); 



/********* 
 * Routes
 *********/
bkeeping.router.BkeepingRouter = Backbone.Router.extend({
  
  routes : { 
    '/accounts':                         'accounts',
    '/accounts/account/:account':        'account',
    '/entries':                          'entries',
    '/entries/entry/:entry':             'entry',
    '/entries/entry/:entry/part/:part':  'entryPart',
  }, 

  accounts : function() { 
    
    console.log('accounts CALLED'); 
  }, 

  account : function(account) { 
    
    console.log('account CALLED'); 
  }, 

  entries : function() { 
    
    console.log('entries CALLED'); 
  },

  entry : function(entry) {
    
    console.log('entry CALLED'); 
  },

  entryPart : function(epart) { 
    
    console.log('entryPart CALLED'); 
  },
});




