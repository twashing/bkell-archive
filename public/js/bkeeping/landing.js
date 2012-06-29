(function() {
  require.config({
    baseUrl: "/js",
    paths: {
      'js': '/js/'
    }
  });
  require(['bkeeping/bkeeping', 'bkeeping/bindings', 'bkeeping/util'], function(bkeeping, bindings, util) {
    var accountView, accounts, accountsView, adjustEntryPanes, asm, currencies, entries, entriesView, entryPartView, entryView, esm, loadAccounts, loadEntries, models, views;
    console.log("landing LOADED / bkeeping[" + bkeeping.models + "]");
    String.prototype.isempty = util.isempty;
    /*
        # Adjust Entry panes based on right width
        */
    adjustEntryPanes = function() {
      var rightWidth;
      rightWidth = $(".bkell-container").width() - $("#left-col").width() - 10;
      $("#right-col").css("width", rightWidth);
      $('#entries, #entry, #entry-part').css("width", rightWidth - 5);
      return $("#right-content").css("width", (rightWidth * 3) + 50);
    };
    /*
        # Bootstrap pane sizes
        */
    $(window).resize(function() {
      return adjustEntryPanes();
    });
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
    currencies = null;
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
    entryView = null;
    entryPartView = new views.EntryPartView({
      el: '#entry-part'
    });
    accountsView = new views.AccountsView({
      collection: accounts,
      accountView: accountView,
      asm: asm
    });
    entriesView = null;
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
            $('#account').load('/include/account.html', function() {
              return $('#left-col').serialScroll({
                target: '#left-wrapper',
                items: '#accounts , #account',
                duration: 500,
                axis: 'x',
                force: true
              });
            });
            return loadEntries();
          }
        });
      });
    };
    /*
        # Load Entry pages
        */
    loadEntries = function() {
      return $.get("/currencies", function(result, status, obj) {
        currencies = $.parseJSON(result);
        entryView = new views.EntryView({
          el: '#entry',
          currencies: currencies,
          accounts: accounts
        });
        entriesView = new views.EntriesView({
          collection: entries,
          entryView: entryView,
          entryPartView: entryPartView,
          accounts: accounts,
          currencies: currencies,
          esm: esm
        });
        return $('#entries').load("/include/entries.html", function() {
          return entries.fetchS({
            success: function() {
              /*
                            # bind entry row to the Entries State Machine
                            */              entriesView.instrumentEntries($("#entries-table"), {
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
      });
    };
    /* 
    # LOAD Accounts & Entries
    */
    loadAccounts();
    /*
        # Load Footer
        */
    return $('#footer').load("/include/footerPart.html");
  });
}).call(this);
