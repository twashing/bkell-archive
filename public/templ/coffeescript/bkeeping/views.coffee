
define(['Backbone'], (bb) ->
  
  
  ###
  # Grab the Backbone object 
  ###
  Backbone = bb.Backbone
  _ = bb._
  
  
  # Pure Template DIRECTIVES
  pureDirectives =
    accountsDirective:
      {
        "tbody tr" : {
          "each<-puredata" : {
            "a.editaccount@href" : (arg) ->
              return "/accounts/account/"+ arg.each.item.id
            "td.name" : "each.name"
            "td.type" : "each.type"
            "td.weight" : "each.counterWeight"
          }
        }
      }
    entriesDirective:
      {
        "tbody tr" : {
          "each<-puredata" : {
            "a.editentry@href" : (arg) ->
              return "/entries/entry/"+ arg.each.item.id
            "td.date" : "each.date"
            "td.name" : "each.id"
            "td.balance" : ""
          }
        }
      }
  
  
  # return an object with the View classes
  
  AccountsView : Backbone.View.extend(
    
    el: $('#accounts')
    initialize : (options) ->
      this.collection = options.collection
    
    render: () ->
      
      htmlContext = this.el
      this.collection.fetchS( { success: (models, response) ->
         
        $(htmlContext)
          .render( { puredata : response } , pureDirectives.accountsDirective)
          .find('table')
          .dataTable()
      
      } )
  )
  
)


