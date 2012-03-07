
define([], () ->
  
  
  ###
  # Grab the Backbone object 
  ###
  #Backbone = bb.Backbone
  #_ = bb._
  
  
  ###
  # Pure Template DIRECTIVES
  ###
  pureDirectives =
    accountsDirective:
      {
        "tbody tr" : {
          "each<-puredata" : {
            "a.editaccount@data-aid" : "each.id"
            "td.name" : "each.name"
            "td.type" : "each.type"
            "td.weight" : "each.counterWeight"
          }
        }
      }
    accountDirective:
      {
        "#account-name@value" : "id"
        #"#account-type option@selected": (a) ->
        #  return ( (a.context.type == '.') ? 'selected' : '' )
        #"#account-counterWeight" : "id"
      }
    entriesDirective: {
        "tbody tr" : {
          "each<-puredata" : {
            "a.editentry@data-eid" : "each.id"
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
      console.log('AccountView initialize CALLED')
      this.el = $(options.el)
    
    render : (options) ->
      console.log('AccountView render CALLED')

      # render pane with PURE
      #this.view.el.render( this.model.toJSON(), pureDirectives.accountDirective )
      
      # hack together a jquery render of the select dropdowns
      $("#account-name").attr('value', this.model.get('name'))
      $("#account-type > option[value='#{ this.model.get('type') }']").attr('selected', 'selected')
      $("#account-counterWeight > option[value='#{ this.model.get('counterWeight') }']").attr('selected', 'selected')
  })
  EntryView = Backbone.View.extend()
  
  
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
    
    deleteClicked : () ->
      console.log('delete CLICKED')
    
    accountChanged : () ->
      console.log('account has been CHANGED')
    
  })
  EntryRow = Backbone.View.extend({
     
    initialize : (options) ->
      this.el = $(options.el)
      this.el.bind('change', this.entryChanged)     # listening for changes to a particular account
      this.el.find('.editentry').bind('click', _.bind(this.editClicked, this))      # handling edit and delete click events
      this.el.find('.deleteentry').bind('click', _.bind(this.deleteClicked, this))
    
    editClicked : () ->
      console.log('edit entry CLICKED')
      return false
    
    deleteClicked : () ->
      console.log('delete entry CLICKED')
      return false
    
    entryChanged : () ->
      console.log('entry has been CHANGED')
      return false
    
  })
  
  
  ###
  # Accounts and Entries VIEWs
  ###
  # TODO - create and bind i. add event
  AccountsView = Backbone.View.extend(
    
    el: $('#accounts')
    initialize : (options) ->
      
      this.collection = options.collection
      
      # doing a double bind so that render has proper context. See: 
      # http://stackoverflow.com/questions/7254290/passing-context-with-bind-in-backbone-js
      this.collection.bind('reset', _.bind(this.render, this))
   
    accountRows: []
    render: () ->
      
      console.log("AccountsView.render CALLED")
      
      ctx = this
      this.el      # the HTML context should be passed in as an argument
        .render(  { puredata : this.collection.toJSON() } ,   # i) using PURE templ lib, ii) returning raw JSON object (instead of BB models) for pure templ
                  pureDirectives.accountsDirective )
        .find('table')
        .dataTable()    # using dataTables to render accounts tabular data
        .find('tbody > tr')
        .each((index, ech) ->
          
          ###
          # Nesting Row Views here
          ###
          arow = new AccountRow( { el: ech } )
          ctx.accountRows.push(arow)
        )
  )
  EntriesView = Backbone.View.extend(
    
    el: $('#entries')
    initialize : (options) ->
      this.collection = options.collection
      this.collection.bind('reset', _.bind(this.render, this))
    
    entryRows: []
    render: () ->
      
      console.log("EntriesView.render CALLED")
      
      ctx = this
      this.el
        .render(  { puredata : this.collection.toJSON() } ,
                  pureDirectives.entriesDirective)
        .find('table')
        .dataTable()
        .find('tbody > tr')
        .each((index, ech) ->
          
          ###
          # Nesting Row Views here
          ###
          arow = new EntryRow( { el: ech } )
          ctx.entryRows.push(arow)
        )
           
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


