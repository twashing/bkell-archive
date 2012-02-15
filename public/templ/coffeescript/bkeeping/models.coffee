require.config(
  baseUrl: '/js',
)

define(['Backbone'], (bb) ->
  
  
  # grab the Backbone object 
  Backbone = bb.Backbone
  
  
  # setup an Abstract class that accepts success and error callbacks
  AbstractK = Backbone.Model.extend({
    
    savek : (valueMap, options) ->  
        
        # assigning default success, error and options unless user passes one in
        successC = if(options && options.success) then (options.success) else ((model, response) -> 
          
          console.log("success [bkeeping.models.Abstract] CALLED > model[ #{model} ] > response[ #{response} ]"); 
          
          this["_id"] = response._id
          this["id"] = response.username
        )
        
        errorC = if(options && options.error) then (options.error) else ((model, response) -> 
          console.log("error CALLED > model["+ model +"] > response["+ response.responseText +"]"); 
        )
        
        statusC = if(options && options.statusCode) then (options.statusCode) else ({ 302 : -> console.log("302 called")  })
        
        
        this.save(  ( if(valueMap) then (valueMap) else ({}) ), 
                    { success : successC
                      error : errorC
                      statusCode: statusC
                    }
        )
  });
  
  
  # return an object with the Account and Entry classes in them
  Account : AbstractK.extend(
    urlRoot : "/account",
  )
  Entry : AbstractK.extend(
    urlRoot : "/entry",
  )
  
  
)


