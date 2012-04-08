(function() {
  require.config({
    baseUrl: "/js",
    paths: {
      'js': '/js/'
    }
  });
  require(['bkeeping/bkeeping', 'bkeeping/bindings'], function(bkeeping, bindings) {
    var accountView, accounts, accountsView, asm, entries, entriesView, entryPartView, entryView, esm, loadAccounts, loadEntries, models, views;
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
    accountView = new views.AccountView({
      el: '#account'
    });
    entryView = new views.EntryView({
      el: '#entry'
    });
    entryPartView = new views.EntryPartView({
      el: '#entry-part'
    });
    accountsView = new views.AccountsView({
      collection: accounts
    });
    entriesView = new views.EntriesView({
      collection: entries,
      entryView: entryView,
      entryPartView: entryPartView,
      accounts: accounts,
      esm: esm
    });
    /*
        # Load Accounts pages
        */
    loadAccounts = function() {
      return $('#accounts').load("/include/accounts.html", function() {
        return accounts.fetchS({
          success: function() {
            /*
                        # bind account row to the Accounts State Machine
                        */            accountsView.instrumentAccounts($("#accounts-table"), {
              accounts: accounts,
              accountsView: accountsView,
              accountView: accountView,
              asm: asm
            }, asm);
            /*
                        # Load Account pages
                        */
            return $('#account').load('/include/account.html', function() {
              return $('#left-col').serialScroll({
                target: '#left-wrapper',
                items: '#accounts , #account',
                duration: 500,
                axis: 'x',
                force: true
              });
            });
          }
        });
      });
    };
    /*
        # Load Entry pages
        */
    loadEntries = function() {
      return $('#entries').load("/include/entries.html", function() {
        return entries.fetchS({
          success: function() {
            /*
                        # bind entry row to the Entries State Machine
                        */            entriesView.instrumentEntries($("#entries-table"), {
              entries: entries,
              entriesView: entriesView,
              entryView: entryView,
              entryPartView: entryPartView,
              accounts: accounts,
              esm: esm
            }, esm);
            /*
                        # Sequentially loading inner panes
                        */
            return $('#entry').load('/include/entry.html', function() {
              return $('#entry-part').load('/include/entryPart.html', function() {
                $('#right-col').serialScroll({
                  target: '#right-wrapper',
                  items: '#entries , #entry, #entry-part',
                  duration: 500,
                  axis: 'x',
                  force: true
                });
                return adjustEntryPanes();
              });
            });
          }
        });
      });
    };
    /* 
    # LOAD Accounts & Entries
    */
    loadAccounts();
    loadEntries();
    /*
        # Load Footer
        */
    return $('#footer').load("/include/footerPart.html");
  });
}).call(this);
