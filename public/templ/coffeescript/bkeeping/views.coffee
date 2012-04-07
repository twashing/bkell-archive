
define( ['js/bkeeping/bkeeping'], (bkeeping) ->
  
  
  ###
  # Pure Template DIRECTIVES
  ###
  pureDirectives =
    accountsDirective: {
      "tbody tr" : {
        "each<-puredata" : {
          "a.editaccount@data-aid" : "each.id"
          "td.name" : "each.name"
          "td.type" : "each.type"
          "td.weight" : "each.counterWeight"
        }
      }
    }
    accountDirective: {
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
    entryDirective: {
      "tbody tr" : {
        "each<-puredata" : {
          "a.editentrypart@data-eid" : "each.id"
          "a.editentrypart@data-type" : "each.tag"
          "td.debitAccount" : (arg) -> return pureDirectives.determineAccountDtCt(this, "debit")
          "td.debitAmount" : (arg) -> return pureDirectives.determineAmountDtCt(this, "debit")
          "td.creditAccount" : (arg) -> return pureDirectives.determineAccountDtCt(this, "credit")
          "td.creditAmount" : (arg) -> return pureDirectives.determineAmountDtCt(this, "credit")
        }
      }
    }
    determineCommon : (arg, weight, attribute) ->
      if(arg["tag"] == weight)
        return arg[attribute]
      return "&nbsp;"
    determineAccountDtCt : (arg, weight) -> return pureDirectives.determineCommon(arg, weight, "accountid")
    determineAmountDtCt : (arg, weight) -> return pureDirectives.determineCommon(arg, weight, "amount")
    
    entryPartDirective: {   # this is just meant to list out accounts, for now
      "select#entry-part-account option" : {
        "each<-puredata" : {
          ".@value" : "each.id"
          "." : "each.name"
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
  EntryView = Backbone.View.extend({
    
    initialize : (options) ->
      console.log('EntryView initialize CALLED')
      this.el = $(options.el)
    
    render : (options) ->
      console.log('EntryView render CALLED')
      
      ###
      # clear the container each time - don't want to incrementally add
      ###
      
      template = $("<tr> <td> <a class='editentrypart' href='#'>edit</a> </td> <td class='debitAccount'>Debit Account</td> <td class='debitAmount'>Debit Amount</td> <td>&nbsp;</td> <td class='creditAccount'>Credit Account</td> <td class='creditAmount'>Credit Amount</td> <td> <a class='deleteentrypart' href='#'>delete</a> </td> </tr>")
      
      $(".entry_container tbody")
        .empty()
        .append(template)
      
      $(".entry_container")
        .render( { puredata : this.model.get('content') } , pureDirectives.entryDirective )
      
    renderEntry: (options) ->
      console.log('commonEntryRender CALLED')
      
      ###
      # load the UI 
      ###
      _.extend(options.entry, Backbone.Events)
      options.entry
        .unbind('change')
        .bind('change', options.entryView.render, { model: options.entry, view: options.entryView })  # bind Backbone event
        .trigger('change')   # this should trigger the entryView to render
                                  
    instrumentEntry: (options) ->
      
      console.log('instrumentEntry CALLED')
      
      bindObjects = {
        entriesView: options.entriesView,
        entryView: options.entryView,
        entryPartView: options.entryPartView,
        entries: options.entries,
        accounts: options.accounts,
        entry : options.entry,
        esm: options.esm
      }
      
      $.get("/generateid", (result, status, obj) ->
        
        # make a new entryPart
        $("#entrypart-add")
          .unbind('click')
          .bind(  'click',
                  _.extend( { epart: { accountid: null, amount: null, id: result, tag: null } }, bindObjects ),   # creating a new epart
                  _.bind(options.esm.EEpart, options.esm))  # trigger the transition when edit clicked
        
        # handle edit CLICKs and ii. bind entry row to the Entries State Machine
        $(options.entryView.el)
          .find('.editentrypart')
          .unbind('click')
          .bind(  'click',
                  bindObjects,
                  _.bind(options.esm.EEpart, options.esm))  # trigger the transition when edit clicked
        
        # bind actions to 'Ok' and 'Cancel' buttons
        $('#entry-ok')
          .unbind('click')
          .bind('click',
                _.extend( { ok: true }, bindObjects ),
                _.bind(options.esm.EEs, options.esm)) # transition back to Accounts pane
         
        $('#entry-cancel')
          .unbind('click')
          .bind('click',
                _.extend( { cancel: true }, bindObjects ),
                _.bind(options.esm.EEs, options.esm)) # transition back to Accounts pane
      )
      
  })
  EntryPartView = Backbone.View.extend({
    
    initialize : (options) ->
      console.log('EntryPartView initialize CALLED')
      this.el = $(options.el)
    
    render : (options) ->
      console.log('EntryPartView render CALLED')
      
      # render with PURE - just populate the accounts for now
      template = "<div> <label>Amount</label> <input id='entry-part-amount' type='text' /> </div> <div> <label>Account</label> <select id='entry-part-account'> <option label='' value=''></option> </select> </div> <div> <label>Type</label> <select id='entry-part-type'> <option value='debit'>debit</option> <option value='credit'>credit</option> </select> </div> <div> <input id='entry-part-ok' type='button' value='Save' /> <input id='entry-part-cancel' type='button' value='Cancel' /> </div>"
      
      
      $(".entryPart_container .entryPart_content")
        .empty()
        .append(template)
      
      $(".entryPart_container .entryPart_content").render( { puredata : this.accounts.toJSON() } , pureDirectives.entryPartDirective )
      
      $("#entry-part-amount").attr('value', this.model['amount'])
      $("#entry-part-account > option[value='#{ this.model['accountid'] }']").attr('selected', 'selected')
      $("#entry-part-type > option[value='#{ this.model['tag'] }']").attr('selected', 'selected')
  })
  
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
      this.collection.bind('add', _.bind(this.render, this))
      this.collection.bind('change', _.bind(this.render, this))
   
    accountRows: []
    render: () ->
      
      console.log("AccountsView.render CALLED")
      
      # ensure we don't re-render the accounts
      template = $("<table id='accounts-table'> <thead> <tr> <th></th> <th>Name</th> <th>Category</th> <th>Type</th> <th></th> </tr> </thead> <tbody> <tr> <td> <a class='editaccount' href='#'>edit</a> </td> <td class='name'>My Name</td> <td class='type'>My Type</td> <td class='weight'>My Weight</td> <td> <a class='deleteaccount' href='#'>delete</a> </td> </tr> </tbody> <tfoot> <tr> <td> <input id='account-add' type='button' value='Add' /> </td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> </tfoot> </table>")
      
      $("#accounts-pane > .tab_container > .tab_content > .dataTables_wrapper")   # empty generated DataTable divs
        .empty()
        .append(template)
      
      
      ctx = this
      $("#accounts")
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
    
    ###
    # instrument Accounts pane with actions
    ###
    instrumentAccounts: (elem, bindings, asm) ->
          
      # bind account row to the Accounts State Machine
      elem
        .find('.editaccount')
        .unbind('click')
        .bind(  'click', bindings, _.bind(asm.AsA, asm))  # trigger the transition when edit clicked
      
      elem
        .find("#account-add")
        .unbind("click")
        .bind("click",
              _.extend( { account: new bkeeping.models.Account() }, bindings ),
              _.bind(asm.AsA, asm)  # trigger the transition when add clicked
        )
  )
  EntriesView = Backbone.View.extend(
    
    el: $('#entries')
    initialize : (options) ->
    
      this.collection = options.collection
      
      this.collection.bind('reset', _.bind(this.render, this))
      this.collection.bind('add', _.bind(this.render, this))
      this.collection.bind('change', _.bind(this.render, this))
    
    entryRows: []
    render: () ->
      
      console.log("EntriesView.render CALLED")
      
      # ensure we don't re-render the accounts
      template = $("<table id='entries-table'> <thead> <tr> <th></th> <th>Date</th> <th>Name</th> <th>Balance</th> <th></th> </tr> </thead> <tbody> <tr> <td> <a class='editentry' href='#'>edit</a> </td> <td class='date'>My Date</td> <td class='name'>My Name</td> <td class='balance'>My Balance</td> <td> <a class='deleteentry' href='#'>delete</a> </td> </tr> </tbody> <tfoot> <tr> <td> <input id='entry-add' type='button' value='Add' /> </td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> </tfoot> </table>")
      
      
      $("#entries-pane > .entries_container > .entry_content > .dataTables_wrapper")   # empty generated DataTable divs
        .empty()
        .append(template)
      
      ctx = this
      $("#entries")
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
           
    instrumentEntries: (elem, bindings, esm) ->
        
      elem
        .find('.editentry')
        .unbind('click')
        .bind(  'click',
                bindings,
                _.bind(esm.EsE, esm))  # trigger the transition when edit clicked
      elem
        .find('#entry-add')
        .unbind('click')
        .bind(  'click',
                _.extend( { entry: new bkeeping.models.Entry() }, bindings ),
                _.bind(esm.EsE, esm))  # trigger the transition when add clicked
  )
  
  ###
  # return an object with the View classes
  ###
  AccountView : AccountView
  EntryView : EntryView
  EntryPartView : EntryPartView
  AccountRow : AccountRow
  EntryRow : EntryRow
  AccountsView : AccountsView
  EntriesView : EntriesView
)


