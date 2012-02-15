require.config(
  baseUrl: '/js',
)

define(['Backbone'], (bb) ->
  
  
  ###
  # Grab the Backbone object 
  ###
  Backbone = bb.Backbone
  
  
  ###
  # Setup an Abstract Class & Collection that accepts success and error callbacks
  ###
  commonFetch = (valueMap, options) ->
    
    # assigning default success, error and options unless user passes one in
    successC = if(options && options.success) then (options.success) else ((model, response) ->
      console.log("success [commonFetch] CALLED > model[ #{model} ] > response[ #{response} ]")
    )
    errorC = if(options && options.error) then (options.error) else ((model, response) ->
      console.log("error CALLED > model["+ model +"] > response["+ response.responseText +"]")
    )
    statusC = if(options && options.statusCode) then (options.statusCode) else ({ 302 : -> console.log("302 called")  })
    
    
    this.fetch( success : successC,
                error : errorC
                
    )
  
  AbstractK = Backbone.Model.extend({
    
    saveS : (valueMap, options) ->
      
      # assigning default success, error and options unless user passes one in
      successC = if(options && options.success) then (options.success) else ((model, response) ->
        
        console.log("success [bkeeping.models.AbstractK] CALLED > model[ #{model} ] > response[ #{response} ]")
        
        this["_id"] = response._id
        this["id"] = response.username
      )
      
      errorC = if(options && options.error) then (options.error) else ((model, response) ->
        console.log("error CALLED > model["+ model +"] > response["+ response.responseText +"]")
      )
      
      statusC = if(options && options.statusCode) then (options.statusCode) else ({ 302 : -> console.log("302 called")  })
      
      
      this.save(  ( if(valueMap) then (valueMap) else ({}) ),
                  success : successC,
                  error : errorC,
                  statusCode: statusC
                  
      )
    
    fetchS : commonFetch
  })
  
  AbstractL = Backbone.Collection.extend({
    
    fetchS : commonFetch
  })
  
  
  # return an object with the following object classes
  
  ###
  # Account & Entry
  ###
  Account : AbstractK.extend(
    urlRoot : "/account",
  )
  Entry : AbstractK.extend(
    urlRoot : "/entry",
  )
  
  
  ###
  # Collections
  ###
  Accounts : AbstractL.extend(
    model: this.Account,
  )
  Entries : AbstractL.extend(
    model: this.Entry,
  )
  
)


