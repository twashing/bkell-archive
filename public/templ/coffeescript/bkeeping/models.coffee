
#define(['Backbone'], (bb) ->
define([], () ->
  
  
  ###
  # Grab the Backbone object 
  ###
  #Backbone = bb.Backbone
  #_ = bb._
  
  
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
    
    url : () ->
      base = this.urlRoot || getUrl(this.collection) || urlError()  # look for the urlRoot first
      if (this.isNew())
        return base
      return base + `(base.charAt(base.length - 1) == '/' ? '' : '/')` + encodeURIComponent(this.id)  # inlining the .JS, otherwise coffeescript does weirdness
    
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
    
    parse : (data) ->
      console.log("AbstractK > parse fn CALLED")
      return data
  })
  
  
  ###
  # Account & Entry
  ###
  Account = AbstractK.extend(
    urlRoot : "/account",
  )
  Entry = AbstractK.extend(
    urlRoot : "/entry",
    balances : (accounts) ->
      
      result = _.reduce( this.get("content"),
                ((tally, ech) ->
                  
                  #console.log("tally[#{tally}] > ech[#{ech}]")
                  
                  account = _.find(accounts.models, (act) -> return (act.get("id") == ech.accountid))
                  
                  if (((ech.tag == "debit") and (account.get("counterWeight") == "debit")) or (ech.tag == "credit") and (account.get("counterWeight") == "debit"))
                    tally.lhs += parseFloat(ech.amount)
                  else
                    tally.rhs += parseFloat(ech.amount)

                  return tally
                ),
                { lhs: 0, rhs: 0 }
      )
      
      return _.extend( `{ balances: result.lhs == result.rhs }`, result )
  )
  
  
  ###
  # Collections
  ###
  Accounts = Backbone.Collection.extend(
    url: '/accounts',
    model: Account,
    fetchS : commonFetch
    
  )
  Entries = Backbone.Collection.extend(
    url: '/entries',
    model: Entry,
    fetchS : commonFetch
    
  )
  
  # return an object with the following object classes
  Account : Account
  Entry : Entry
  Accounts : Accounts
  Entries : Entries
)


