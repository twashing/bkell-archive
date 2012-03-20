(function() {
  require.config({
    baseUrl: "/js",
    paths: {
      'js': '/js/'
    }
  });
  require(['bkeeping/bkeeping', 'bkeeping/bindings'], function(bkeeping, bindings) {
    var accountView, accounts, accountsView, asm, entries, entriesView, entryPartView, entryView, esm, models, views;
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
    esm = bindings.esm;
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
    entryView = new views.EntryView({
      el: '#entry'
    });
    entryPartView = new views.EntryPartView({
      el: '#entry-part'
    });
    /*
        # Load Account pages
        */
    $('#accounts').load("/include/accounts.html", function() {
      accounts.fetchS({
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
      return $('#left-col').serialScroll({
        target: '#left-wrapper',
        items: '#accounts , #account',
        duration: 500,
        axis: 'x',
        force: true
      });
    });
    $('#account').load('/include/account.html');
    /*
        # Load Entry pages
        */
    $('#entries').load("/include/entries.html", function() {
      entries.fetchS({
        success: function() {
          return _.each(entriesView['entryRows'], function(ech) {
            return ech.el.find('.editentry').unbind('click').bind('click', {
              entries: entries,
              entriesView: entriesView,
              entryView: entryView,
              entryPartView: entryPartView,
              accounts: accounts,
              esm: esm
            }, _.bind(esm.EsE, esm));
          });
        }
      });
      $('#right-col').serialScroll({
        target: '#right-wrapper',
        items: '#entries , #entry, #entry-part',
        duration: 500,
        axis: 'x',
        force: true
      });
      return adjustEntryPanes();
    });
    $('#entry').load('/include/entry.html');
    $('#entry-part').load('/include/entryPart.html');
    /*
        # Load Footer
        */
    return $('#footer').load("/include/footerPart.html");
  });
}).call(this);
