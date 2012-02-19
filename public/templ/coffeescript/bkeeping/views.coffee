
define(['Backbone'], (bb) ->
  
  
  ###
  # Grab the Backbone object 
  ###
  Backbone = bb.Backbone
  _ = bb._
  
  
  ###
  # Pure Template DIRECTIVES
  ###
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
  
  
  ###
  # return an object with the View classes
  ###
  AccountsView : Backbone.View.extend(
    
    el: $('#accounts')
    initialize : (options) ->
      
      this.collection = options.collection
      
      # doing a double bind so that render has proper context. See: 
      # http://stackoverflow.com/questions/7254290/passing-context-with-bind-in-backbone-js
      this.collection.bind('reset', _.bind(this.render, this))
    
    render: () ->
      
      this.el      # the HTML context should be passed in as an argument
        .render(  { puredata : this.collection.toJSON() } ,   # returning raw JSON object (instead of BB models) for pure templ
                  pureDirectives.accountsDirective
        )
        .find('table')
        .dataTable()
  )
  EntriesView : Backbone.View.extend(
    
    el: $('#right-col')
    initialize : (options) ->
      this.collection = options.collection
      this.collection.bind('reset', _.bind(this.render, this))
    
    render: () ->
      
      this.el
        .render(  { puredata : this.collection.toJSON() } ,
                  pureDirectives.entriesDirective
        )
        .find('table')
        .dataTable()
           
  )
  
)


