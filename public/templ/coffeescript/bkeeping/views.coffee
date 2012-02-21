
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
  # Detail VIEWs
  ###
  AccountView = Backbone.View.extend({
    
    initialize : (options) ->
      console('AccountView initialize CALLED')

      # TODO - handle i) data updates ii) transition back to AccountsView
    
    render : (options) ->
      console('AccountView render CALLED')
  })
  EntryView = Backbone.View.extend({})
  
  
  ###
  # Row VIEWs
  ###
  AccountRow = Backbone.View.extend({
     
    initialize : (options) ->
      this.el = $(options.el)
      this.el.bind('change', this.accountChanged)     # listening for changes to a particular account
      this.el.find('.editaccount').bind('click', _.bind(this.editClicked, this))      # handling edit and delete click events
      this.el.find('.deleteaccount').bind('click', _.bind(this.deleteClicked, this))
    
    editClicked : () ->
      console.log('edit CLICKED')
    
      # TODO - transition to Account Detail pane
      # 1. transition out then load
      # 2. use Workflow ??
    
    deleteClicked : () ->
      console.log('delete CLICKED')
    
    accountChanged : () ->
      console.log('account has been CHANGED')
    
  })
  EntryRow = Backbone.View.extend({})
  
  
  ###
  # Accounts and Entries VIEWs
  ###
  # TODO - create and bind i) add event
  AccountsView = Backbone.View.extend(
    
    el: $('#accounts')
    initialize : (options) ->
      
      this.collection = options.collection
      
      # doing a double bind so that render has proper context. See: 
      # http://stackoverflow.com/questions/7254290/passing-context-with-bind-in-backbone-js
      this.collection.bind('reset', _.bind(this.render, this))
   
    accountRows: []
    render: () ->
      
      ctx = this
      this.el      # the HTML context should be passed in as an argument
        .render(  { puredata : this.collection.toJSON() } ,   # i) using PURE templ lib, ii) returning raw JSON object (instead of BB models) for pure templ
                  pureDirectives.accountsDirective )
        .find('table')
        .dataTable()    # using dataTables to render accounts tabular data
        .find('tr')
        .each((index, ech) ->
          
          ###
          # Nesting Row Views here
          ###
          arow = new AccountRow( { el: ech } )
          ctx.accountRows.push(arow)
        )
  )
  EntriesView = Backbone.View.extend(
    
    el: $('#right-col')
    initialize : (options) ->
      this.collection = options.collection
      this.collection.bind('reset', _.bind(this.render, this))
    
    render: () ->
      
      this.el
        .render(  { puredata : this.collection.toJSON() } ,
                  pureDirectives.entriesDirective)
        .find('table')
        .dataTable()
           
  )
  
  ###
  # return an object with the View classes
  ###
  AccountView : AccountView
  EntryView : EntryView
  AccountRow : AccountRow
  EntryRow : EntryRow
  AccountsView : AccountsView
  EntriesView : EntriesView
)


