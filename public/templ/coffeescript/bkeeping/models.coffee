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
  commonFetch = (options) ->
    
    # assigning default success, error and options unless user passes one in
    successC = if(options && options.success) then (options.success) else ((model, response) ->
      console.log("success [commonFetch] CALLED > model[ #{model} ] > response[ #{response} ]")
    )
    errorC = if(options && options.error) then (options.error) else ((model, response) ->
      console.log("error CALLED > model["+ model +"] > response["+ response.responseText +"]")
    )
    
    this.fetch( _.extend((if(options) then (options) else ({})),
                  success : successC,
                  error : errorC
                )
    )
  
  AbstractK = Backbone.Model.extend({
    
    fetchS : commonFetch
    
    saveS : (valueMap, options) ->
      
      # assigning default success, error and options unless user passes one in
      successC = if(options && options.success) then (options.success) else ((model, response) ->
        
        console.log("success [bkeeping.models.AbstractK.saveS] CALLED > model[ #{model} ] > response[ #{response} ]")
        
        ###
        this["_id"] = response._id
        this["id"] = response.username
        ###
      )
      
      errorC = if(options && options.error) then (options.error) else ((model, response) ->
        #console.log("error CALLED > model["+ model +"] > response["+ response.responseText +"]")
      )
      
      statusC = if(options && options.statusCode) then (options.statusCode) else ({ 302 : -> console.log("302 called")  })
      
      this.save(  ( if(valueMap) then (valueMap) else ({}) ),
                  _.extend((if(options) then (options) else ({})),
                    success : successC,
                    error : errorC,
                    statusCode: statusC
                  )
      )
    
    removeS : (options) ->
      
      # assigning default success, error and options unless user passes one in
      successC = if(options && options.success) then (options.success) else ((model, response) ->
        console.log("success [bkeeping.models.AbstractK.removeS] CALLED > model[ #{model} ] > response[ #{response} ]")
      )
      errorC = if(options && options.error) then (options.error) else ((model, response) ->
        #console.log("error CALLED > model["+ model +"] > response["+ response.responseText +"]")
      )
      
      this.destroy(  _.extend((if(options) then (options) else ({})),
                      success : successC,
                      error : errorC
                  )
      )
    
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
    url: '/accounts',
    model: this.Account,
  )
  Entries : AbstractL.extend(
    url: '/entries',
    model: this.Entry,
  )
  
)


