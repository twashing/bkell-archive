
dome = function() {

  // this gives the correct input on the server (a clojure map)
  // POST ; /account ; {:counterWeight "debit", :name "cash", :id "cash", :type "asset", :tag "account"}
  $.post('/account', {tag : 'account',  type : 'asset', id : 'cash', name : 'cash', counterWeight: 'debit'}, function(data) {
    console.log(arguments);
  });

}


bkeeping = {};
bkeeping.models = {};
bkeeping.views = {};
bkeeping.router = {};

bkeeping.models.AbstractK = Backbone.Model.extend({

  savek : function(valueMap, options) {

        // assigning default success, error and options unless user passes one in
        var successC = (options && options.success) ? options.success : function(model, response) {

             console.log("success [bkeeping.models.Abstract] CALLED > model["+ model +"] > response["+ response +"]");

             this["_id"] = response._id;
             this["id"] = response.username;

           };
        var errorC = (options && options.error) ? options.error : function(model, response) {
             console.log("error CALLED > model["+ model +"] > response["+ response.responseText +"]");
           };
        var statusC = (options && options.statusCode) ? options.statusCode : { 302 : function() { console.log("... 302 called"); } }

        this.save(  (valueMap) ? valueMap : {},
                              { success : successC,
                                error : errorC,
                                statusCode: statusC
                              }
       );}
});


/*********
 * User & Login
 *********/
bkeeping.models.Register = bkeeping.models.AbstractK.extend({

  urlRoot : "/user"
});
bkeeping.models.Login = bkeeping.models.AbstractK.extend({

  urlRoot : "/login"
});



/*********
 * Account & Entry
 *********/
bkeeping.models.Account = bkeeping.models.AbstractK.extend({

  urlRoot : "/account",
});

bkeeping.models.Entry = bkeeping.models.AbstractK.extend({

  urlRoot : "/entry",
});


/*********
 * Collections
 *********/
bkeeping.models.Accounts = Backbone.Collection.extend({

  model: bkeeping.models.Account,
});
bkeeping.models.Entries = Backbone.Collection.extend({

  model: bkeeping.models.Entry,
});


/*********
 * Routes
 *********/
bkeeping.router.BkeepingRouter = Backbone.Router.extend({

  initialize:  function(params) {

    //this._bindRoutes();
  },

  routes : {
    '/accounts':                         'accounts',
    '/accounts/account/:account':        'account',

    '/entries':                          'entries',
    '/entries/entry/:entry':             'entry',
    '/entries/entry/:entry/part/:part':  'entryPart',
  },

  accounts : function() {

    console.log('accounts CALLED');
  },

  account : function(account) {

    console.log('account CALLED');
    /*$('<div/>').load('/include/account.html', function() {

      console.log('ok');
      $(this).show("slide", { direction: "down" }, 1000);

    });
    */
    //$('#accounts-pane').hide("slide", { direction: "down" }, 1000);
  },

  entries : function() {

    console.log('entries CALLED');
  },

  entry : function(entry) {

    console.log('entry CALLED');
  },

  entryPart : function(epart) {

    console.log('entryPart CALLED');
  },
});



/*********
 * Views
 *********/
bkeeping.views.AccountsView = Backbone.View.extend({

  el: '#accounts-pane',

  initialize : function() { },

  events : {
    'click a.editaccount' :   'editAccount',
    'click a.deleteaccount' :   'deleteAccount',
  },

  render : function() {

    $(this.el)
      .render(accountsData, accountsDirective)
      .find('table')
      .dataTable();

    return this;
  },

  editAccount : function(evt) {

    console.log('bkeeping.views.AccountsView > editAccount CALLED > arguments['+ arguments +']');
    bkeeping.ROUTER.navigate($(evt.srcElement).attr('href'), true);
    return false;   // ensures that the browser window does not go to this URL... yet
  },
  deleteAccount : function(evt) {

    console.log('bkeeping.views.AccountsView > deleteAccount CALLED > arguments['+ arguments +']');
  },
});


bkeeping.views.AccountView = Backbone.View.extend({

  initialize : function() { },

});




