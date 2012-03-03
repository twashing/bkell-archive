(function() {
  require.config({
    baseUrl: "/js",
    paths: {
      'js': '/js/'
    }
  });
  require(['bkeeping/bkeeping', 'bkeeping/bindings'], function(bkeeping, bindings) {
    var accountView, accounts, accountsView, asm, entries, entriesView, models, views;
    console.log("landing LOADED / bkeeping[" + bkeeping.models + "]");
    /*
        # LIB imports 
        */
    models = bkeeping.models;
    views = bkeeping.views;
    /*
        # ACCOUNTS and ENTRIES objects 
        */
    accounts = new models.Accounts();
    entries = new models.Entries();
    /*
        # STATE MACHINEs for Accounts and Entries 
        */
    asm = bindings.asm;
    /*
        # VIEWs: Load Accounts and Entries panes, then render
        */
    accountsView = new views.AccountsView({
      collection: accounts
    });
    accountView = new views.AccountView({
      el: '#account'
    });
    entriesView = new views.EntriesView({
      collection: entries
    });
    /*
        # Load the actual pages
        */
    $('#accounts').load("/include/accounts.html", function() {
      return accounts.fetchS({
        success: function() {
          return _.each(accountsView['accountRows'], function(ech) {
            return ech.el.find('.editaccount').unbind('click').bind('click', {
              accounts: accounts,
              accountsView: accountsView,
              accountView: accountView,
              asm: asm
            }, _.bind(asm.AsA, asm));
          });
        }
      });
    });
    $('#account').load('/include/account.html', function() {
      return $('#left-col').serialScroll({
        target: '#left-wrapper',
        items: '#accounts , #account',
        duration: 500,
        axis: 'x',
        force: true
      });
      /*
            # bind actions to 'Ok' and 'Cancel' buttons
            $('#account-ok')
              .unbind('click')
              .bind('click',
                    { accounts: accounts, accountsView: accountsView, accountView: accountView, asm: asm },
                    _.bind(asm.AAs, asm)) # transition back to Accounts pane
            */
    });
    $('#right-col').load("/include/entries.html", function() {
      return entries.fetchS();
    });
    /*
        # Load Footer
        */
    return $('#footer').load("/include/footerPart.html");
  });
}).call(this);
