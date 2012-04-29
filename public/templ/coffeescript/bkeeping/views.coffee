
define( ['js/bkeeping/bkeeping', 'js/bkeeping/util'], (bkeeping, util) ->
  
  
  ###
  # Pure Template DIRECTIVES
  ###
  pureDirectives =
    accountsDirective: {
      "tbody tr" : {
        "each<-puredata" : {
          "button.editaccount@data-aid" : "each.id"
          "td.name" : "each.name"
          "td.type" : "each.type"
          "td.weight" : "each.counterWeight"
          "button.deleteaccount@data-aid" : "each.id"
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
          "button.editentry@data-eid" : "each.id"
          "td.date" : "each.date"
          "td.name" : "each.name"
          "td.balance" : "each.balance"
          "td.currency" : "each.currency"
          "button.deleteentry@data-eid" : "each.id"
        }
      }
    }
    entryDirective: {
      "tbody tr" : {
        "each<-puredata" : {
          "button.editentrypart@data-eid" : "each.id"
          "button.editentrypart@data-type" : "each.tag"
          "td.debitAccount" : (arg) -> return pureDirectives.determineAccountDtCt(this, "debit")
          "td.debitAmount" : (arg) -> return pureDirectives.determineAmountDtCt(this, "debit")
          "td.creditAccount" : (arg) -> return pureDirectives.determineAccountDtCt(this, "credit")
          "td.creditAmount" : (arg) -> return pureDirectives.determineAmountDtCt(this, "credit")
          "button.deleteentrypart@data-eid" : "each.id"
        }
      }
    }
    entryCurrencyDirective: {   # this is just meant to list out accounts, for now
      "select#entry-currency > option" : {
        "each<-puredata" : {
          ".@value" : "each.id"
          "." : "each.name"
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
      
      template = "<div class='account_content'> <div> <label>Name</label> <input id='account-name' type='text' /> </div> <div> <label>Category</label> <select id='account-type'> <option value='asset'>asset</option> <option value='liability'>liability</option> <option value='revenue'>revenue</option> <option value='expense'>expense</option> </select> </div> <div> <label>Type</label> <select id='account-counterWeight'> <option value='debit'>debit</option> <option value='credit'>credit</option> </select> </div> <div> <button id='account-ok' >Save</button> <button id='account-cancel' >Cancel</button> </div> </div>"
      
      $(".account_container")
        .empty()
        .append(template)
      
      $("#account-ok")
        .addClass("btn")
        .addClass("btn-success")
      
      $("#account-cancel")
        .addClass("btn")
        .addClass("btn-danger")
      
      # hack together a jquery render of the select dropdowns
      $("#account-name").attr('value', this.model.get('name'))
      $("#account-type > option[value='#{ this.model.get('type') }']").attr('selected', 'selected')
      $("#account-counterWeight > option[value='#{ this.model.get('counterWeight') }']").attr('selected', 'selected')
  })
  EntryView = Backbone.View.extend({
    
    initialize : (options) ->
      console.log('EntryView initialize CALLED')
      this.el = $(options.el)
      this.currencies = options.currencies
    
    render : (options) ->
      console.log('EntryView render CALLED')
      
      ###
      # clear the container each time - don't want to incrementally add
      ###
      
      template = $("<tr> <td> <button class='editentrypart' >edit</button> </td> <td class='debitAccount'>Debit Account</td> <td class='debitAmount'>Debit Amount</td> <td>&nbsp;</td> <td class='creditAccount'>Credit Account</td> <td class='creditAmount'>Credit Amount</td> <td> <button class='deleteentrypart' >delete</button> </td> </tr>")
      
      $(".entry_container tbody")
        .empty()
        .append(template)
      
      template
        .find(".editentrypart")
        .addClass("btn")
      
      template
        .find(".deleteentrypart")
        .addClass("btn")
      
      $("#entrypart-add")
        .addClass("btn")
        .addClass("btn-primary")
      
      $("#entry-ok")
        .addClass("btn")
        .addClass("btn-success")
      
      $("#entry-cancel")
        .addClass("btn")
        .addClass("btn-danger")
      
      
      # adding twitter boostrap table styling
      $(".entry_content > table")
        .addClass("table")
        #.addClass("table-bordered")
        #.addClass("table-condensed")
      
      
      $(".entry_container").render( { puredata : this.model.get('content') } , pureDirectives.entryDirective )
      
      $("select#entry-currency")
        .empty()
        .append("<option value=''></option>")
      
      $("#entry").render( { puredata : this.currencies } , pureDirectives.entryCurrencyDirective )
      
      
      # removing table row borders 
      $("td").css("border", 0)
      
      $("#entry-name").val(this.model.get("name"))
      #$("#entry-date").datepicker()
      $(".input-append.date").datepicker()
      $("#entry-date").val(this.model.get("date"))
      $("#entry-currency > option[value='#{ this.model.get('currency') }']").attr('selected', 'selected')
      
    renderEntry: (options) ->
      console.log('commonEntryRender CALLED')
      
      ###
      # load the UI 
      ###
      _.extend(options.entry, Backbone.Events)
      options.entry
        .unbind('change')
      
      options.entry
        .bind('change', options.entryView.render, { model: options.entry, view: options.entryView, currencies: this.currencies })  # bind Backbone event
        .trigger('change')   # this should trigger the entryView to render
                                  
    instrumentEntry: (options) ->
      
      console.log('instrumentEntry CALLED')
      
      bindObjects = {
        entriesView: options.entriesView,
        entryView: options.entryView,
        entryPartView: options.entryPartView,
        entries: options.entries,
        accounts: options.accounts,
        currencies:  options.currencies,
        entry : options.entry,
        esm: options.esm
      }
      
      $.get("/generateid", (result, status, obj) ->
        
        # make a new entryPart
        $("#entrypart-add")
          .unbind("click")
          .bind(  "click",
                  _.extend( { epart: { accountid: null, amount: null, id: result, tag: null } }, bindObjects ),   # creating a new epart
                  _.bind(options.esm.EEpart, options.esm))  # trigger the transition when edit clicked
        
        # handle edit CLICKs and ii. bind entry row to the Entries State Machine
        $(".editentrypart")
          .unbind("click")
          .bind(  "click",
                  bindObjects,
                  _.bind(options.esm.EEpart, options.esm))  # trigger the transition when edit clicked
        
        $(".deleteentrypart")
          .unbind("click")
          .bind(  "click",
                  bindObjects,
                  (event) ->
                     
                     # needed objects for the "util.makeGenericDialog" call
                    bobjs =
                      entriesView: event.data.entriesView,
                      entryView: event.data.entryView,
                      entryPartView: event.data.entryPartView,
                      entries: event.data.entries,
                      accounts: event.data.accounts,
                      entry : event.data.entry,
                      esm: event.data.esm
                    epId = event.target.dataset['eid']
                    entry = event.data.entry
                    entryView = event.data.entryView
                    
                    # bring up the dialog
                    util.makeGenericDialog("Are you sure you want to delete this entry part?", () ->
                      
                      # remove entryPart
                      entry.removeEntryPart(epId)
                      
                      # re-"instrumentEntry"
                      entryView.instrumentEntry(bobjs)
                    )
          )
      
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
      
      # render with PURE - just populate entry part fields for now
      template = "<div> <label>Amount</label> <input id='entry-part-amount' type='text' /> </div> <div> <label>Account</label> <select id='entry-part-account'> <option label='' value=''></option> </select> </div> <div> <label>Type</label> <select id='entry-part-type'> <option value='debit'>debit</option> <option value='credit'>credit</option> </select> </div> <div> <button id='entry-part-ok' >Save</button> <button id='entry-part-cancel' >Cancel</button> </div>"
      
      
      $(".entryPart_container .entryPart_content")
        .empty()
        .append(template)
      
      $("#entry-part-ok")
        .addClass("btn")
        .addClass("btn-success")
      
      $("#entry-part-cancel")
        .addClass("btn")
        .addClass("btn-danger")
      
      
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
      
      bindRender = _.bind(this.render, this)
      bindInstrumentAccounts = _.bind(this.instrumentAccounts, this)
      bindObjects = {
                      accounts: options.collection,
                      accountsView: this,
                      accountView: options.accountView,
                      asm: options.asm
                    }
      this.collection.bind('destroy', () ->
        bindRender()
        bindInstrumentAccounts($("#accounts-table"), bindObjects, bindObjects.asm)
      )
    
    accountRows: []
    render: () ->
      
      console.log("AccountsView.render CALLED")
      
      # ensure we don't re-render the accounts
      template = $("<table id='accounts-table'> <thead> <tr> <th></th> <th>Name</th> <th>Category</th> <th>Type</th> <th></th> </tr> </thead> <tbody> <tr> <td> <button class='editaccount' >edit</a> </td> <td class='name'>My Name</td> <td class='type'>My Type</td> <td class='weight'>My Weight</td> <td> <button class='deleteaccount' >delete</a> </td> </tr> </tbody> <tfoot> <tr> <td> <button id='account-add' >Add</button> </td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> </tfoot> </table>")
      
      # adding twitter boostrap styling
      template
        .addClass("table")
        #.addClass("table-bordered")
        .addClass("table-condensed")
      
      template
        .find(".editaccount")
        .addClass("btn")
      
      template
        .find(".deleteaccount")
        .addClass("btn")
      
      template
        .find("#account-add")
        .addClass("btn btn-primary")
      
      
      $("#accounts-pane > .tab_container > .tab_content")   # empty generated DataTable divs
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
    
      # removing table row borders 
      $("td").css("border", 0)
      
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
        .find('.deleteaccount')
        .unbind('click')
        .bind(  'click',
                bindings,
                (args) ->
                  console.log(".deleteaccount")
                  
                  aid = $(this).data("aid")
                  account = args.data.accounts.get(aid)
                  
                  util.makeGenericDialog("Are you sure you want to delete this account?", () ->
                    account.destroy()
                  )
              )
       
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
    
      bindObjects = {
                      entries: options.collection,
                      entriesView: this,
                      entryView: options.entryView,
                      entryPartView: options.entryPartView,
                      accounts: options.accounts,
                      currencies: options.currencies,
                      esm: options.esm
                    }
      
      this.collection = options.collection
      
      this.collection.bind('reset', _.bind(this.render, this), bindObjects)
      this.collection.bind('add', _.bind(this.render, this), bindObjects)
      this.collection.bind('change', _.bind(this.render, this), bindObjects)

      bindRender = _.bind(this.render, this)
      bindInstrumentEntries = _.bind(this.instrumentEntries, this)
      bindFunction = () ->
        bindRender()
        bindInstrumentEntries($("#entries-table"), bindObjects, bindObjects.esm)
      this.collection.bind('destroy', bindFunction, bindObjects)
    
    entryRows: []
    render: (args) ->
      
      console.log("EntriesView.render CALLED")
      
      # ensure we don't re-render the accounts
      template = $("<table id='entries-table'> <thead> <tr> <th></th> <th>Date</th> <th>Name</th> <th>Balance</th> <th>Currency</th> <th></th> </tr> </thead> <tbody> <tr> <td> <button class='editentry' >edit</a> </td> <td class='date'>My Date</td> <td class='name'>My Name</td> <td class='balance'>My Balance</td> <td class='currency'>My Currency</td> <td> <button class='deleteentry' >delete</a> </td> </tr> </tbody> <tfoot> <tr> <td> <input id='entry-add' type='button' value='Add' /> </td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> </tfoot> </table>")
      
      # adding twitter boostrap table styling
      template
        .addClass("table")
        #.addClass("table-bordered")
        #.addClass("table-condensed")
      
      template
        .find(".editentry")
        .addClass("btn")
      
      template
        .find(".deleteentry")
        .addClass("btn")
      
      template
        .find("#entry-add")
        .addClass("btn btn-primary")
      
      $("#entries-pane > .entries_container > .entry_content")   # empty generated DataTable divs
        .empty()
        .append(template)
      
      ctx = this
      _.map(this.collection.models, (ech) ->
        bal = ech.balances(ctx.options.accounts)
        ech.attributes.balance = bal.lhs
      )
      
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
     
      # removing table row borders 
      $("td").css("border", 0)
      
    instrumentEntries: (elem, bindings, esm) ->
       
      elem
        .find('.editentry')
        .unbind('click')
        .bind(  'click',
                bindings,
                _.bind(esm.EsE, esm))  # trigger the transition when edit clicked
      


      
      elem
        .find('.deleteentry')
        .unbind('click')
        .bind(  'click',
                bindings,
                (args) ->
                  console.log(".deleteentry")
                  
                  eid = $(this).data("eid")
                  entry = args.data.entries.get(eid)
          
                  # show the confirm dialog
                  util.makeGenericDialog( "Are you sure you want to delete this entry?", () ->
                    entry.destroy()
                  )
              )  # trigger the transition when edit clicked
      elem
        .find('#entry-add')
        .unbind('click')
        .bind(  'click',
                _.extend( { entry: new bkeeping.models.Entry({ content: [] }) }, bindings ),
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


