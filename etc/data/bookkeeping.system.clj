{:tag :system,
 :attrs
 {:xmlns "com/interrupt/bookkeeping",
  :xmlns:users "com/interrupt/bookkeeping/users",
  :xmlns:bkell "com/interrupt/bookkeeping/cc/bkell",
  :xmlns:command "com/interrupt/bookkeeping/cc/bkell/command",
  :xmlns:interpret "com/interrupt/bookkeeping/interpret",
  :xmlns:aauth "com/interrupt/bookkeeping/cc/bkell/aauth",
  :id "main.system"},
 :content
 [{:tag :aauth:aauthentication,
   :attrs {:id "main.authentication", :sessiontimeout "6000"},
   :content
   [{:tag :users:groups,
     :attrs {:id "aauth.groups"},
     :content
     [{:tag :users:group,
       :attrs {:id "webkell", :name "Webkell", :owner "root"},
       :content
       [{:tag :users:user, :attrs {:id "root"}, :content nil}]}]}
    {:tag :users:users,
     :attrs {:id "aauth.users"},
     :content
     [{:tag :users:user,
       :attrs
       {:id "root",
        :username "root",
        :password "password",
        :logintimeout "600000",
        :accountLevel "FREE",
        :defaultGroup "webkell",
        :authenticated ""},
       :content
       [{:tag :users:userSession,
         :attrs {:id "", :groupid "", :userid ""},
         :content
         [{:tag :aauth:aauthentication, :attrs nil, :content nil}]}
        {:tag :aauth:allowedActions,
         :attrs {:id "root.allowedActions"},
         :content
         [{:tag :command:command,
           :attrs {:name "create", :id "command.create"},
           :content nil}
          {:tag :command:command,
           :attrs {:name "add", :id "command.add"},
           :content nil}
          {:tag :command:command,
           :attrs {:name "remove", :id "command.remove"},
           :content nil}
          {:tag :command:command,
           :attrs {:name "reverse", :id "command.reverse"},
           :content nil}
          {:tag :command:command,
           :attrs {:name "find", :id "command.find"},
           :content nil}
          {:tag :command:command,
           :attrs {:name "load", :id "command.load"},
           :content nil}
          {:tag :command:command,
           :attrs {:name "list", :id "command.list"},
           :content nil}
          {:tag :command:command,
           :attrs {:name "print", :id "command.print"},
           :content nil}
          {:tag :command:command,
           :attrs {:name "commit", :id "command.commit"},
           :content nil}
          {:tag :command:command,
           :attrs {:name "login", :id "command.login"},
           :content nil}
          {:tag :command:command,
           :attrs {:name "logout", :id "command.logout"},
           :content nil}
          {:tag :command:command,
           :attrs {:name "exit", :id "command.exit"},
           :content nil}]}
        {:tag :users:profileDetails,
         :attrs {:id "user.details"},
         :content
         [{:tag :users:profileDetail,
           :attrs {:id "first.name", :name "first.name", :value ""},
           :content nil}
          {:tag :users:profileDetail,
           :attrs {:id "last.name", :name "last.name", :value ""},
           :content nil}
          {:tag :users:profileDetail,
           :attrs {:id "email", :name "email", :value ""},
           :content nil}
          {:tag :users:profileDetail,
           :attrs {:id "country", :name "country", :value ""},
           :content nil}]}]}]}]}
  {:tag :users:groups,
   :attrs {:id "main.groups"},
   :content
   [{:tag :users:group,
     :attrs {:id "webkell", :name "Webkell", :owner "root"},
     :content
     [{:tag :users:profileDetails,
       :attrs {:id "group.details"},
       :content
       [{:tag :users:profileDetail,
         :attrs
         {:id "defaultCurrency", :name "defaultCurrency", :value ""},
         :content nil}]}
      {:tag :bookkeeping,
       :attrs
       {:xmlns "com/interrupt/bookkeeping",
        :xmlns:account "com/interrupt/bookkeeping/account",
        :xmlns:journal "com/interrupt/bookkeeping/journal",
        :xmlns:currency "com/interrupt/bookkeeping/currency",
        :id "main.bookkeeping"},
       :content
       [{:tag :currency:currencies,
         :attrs {:id "main.currencies", :default "CDN"},
         :content
         [{:tag :currency:currency,
           :attrs {:id "CDN", :name "Canadian Dollar"},
           :content nil}
          {:tag :currency:currency,
           :attrs {:id "USD", :name "US Dollar"},
           :content nil}
          {:tag :currency:currency,
           :attrs {:id "BP", :name "British Pound"},
           :content nil}
          {:tag :currency:currency,
           :attrs {:id "EUR", :name "Euoropean Euro"},
           :content nil}
          {:tag :currency:currency,
           :attrs {:id "JPN", :name "Japanese Yen"},
           :content nil}]}
        {:tag :account:accounts,
         :attrs {:id "main.accounts"},
         :content
         [{:tag :account:account,
           :attrs
           {:type "asset", :id "", :name "", :counterWeight "debit"},
           :content nil}]}
        {:tag :journal:journals,
         :attrs {:id "main.journals"},
         :content
         [{:tag :journal:journal,
           :attrs
           {:id "generalledger",
            :name "generalledger",
            :type "",
            :balance ""},
           :content
           [{:tag :journal:entries,
             :attrs {:id "main.entries"},
             :content
             [{:tag :journal:entry,
               :attrs
               {:id "qwertySTUB",
                :entrynum "",
                :state "",
                :journalid "generalledger",
                :date "",
                :currency "CDN"},
               :content
               [{:tag :account:debit,
                 :attrs
                 {:id "dtS",
                  :amount "120.00",
                  :entryid "qwertySTUB",
                  :accountid "05",
                  :account "",
                  :currency "CDN"},
                 :content nil}
                {:tag :account:credit,
                 :attrs
                 {:id "crS",
                  :amount "120.00",
                  :entryid "qwertySTUB",
                  :accountid "06",
                  :account "",
                  :currency "CDN"},
                 :content nil}]}]}]}]}]}]}]}
  {:tag :users:groups, :attrs {:id "group.attic"}, :content nil}
  {:tag :bkell:bkell,
   :attrs {:id "bkell.main"},
   :content
   [{:tag :command:result, :attrs nil, :content nil}
    {:tag :command:memory,
     :attrs {:id "main.memory"},
     :content
     [{:tag :command:variable, :attrs {:name ""}, :content nil}]}
    {:tag :command:commands,
     :attrs {:id "commands.def"},
     :content
     [{:tag :command:command,
       :attrs {:name "create", :id "command.create"},
       :content
       [{:tag :command:tokens,
         :attrs {:id "create.tokens"},
         :content
         [{:tag :command:token, :attrs {:name "system"}, :content nil}
          {:tag :command:token, :attrs {:name "debit"}, :content nil}
          {:tag :command:token, :attrs {:name "credit"}, :content nil}
          {:tag :command:token, :attrs {:name "entry"}, :content nil}
          {:tag :command:token, :attrs {:name "entries"}, :content nil}
          {:tag :command:token, :attrs {:name "journal"}, :content nil}
          {:tag :command:token,
           :attrs {:name "journals"},
           :content nil}
          {:tag :command:token,
           :attrs {:name "transaction"},
           :content nil}
          {:tag :command:token, :attrs {:name "account"}, :content nil}
          {:tag :command:token,
           :attrs {:name "accounts"},
           :content nil}
          {:tag :command:token, :attrs {:name "user"}, :content nil}
          {:tag :command:token, :attrs {:name "users"}, :content nil}
          {:tag :command:token, :attrs {:name "group"}, :content nil}
          {:tag :command:token, :attrs {:name "groups"}, :content nil}
          {:tag :command:token,
           :attrs {:name "allowedActions"},
           :content nil}
          {:tag :command:token, :attrs {:name "command"}, :content nil}
          {:tag :command:token,
           :attrs {:name "profileDetails"},
           :content nil}
          {:tag :command:token,
           :attrs {:name "profileDetail"},
           :content nil}
          {:tag :command:token,
           :attrs {:name "userSession"},
           :content nil}]}
        {:tag :command:tokenLiterals,
         :attrs {:id "input.tokens"},
         :content nil}]}
      {:tag :command:command,
       :attrs {:name "add", :id "command.add"},
       :content nil}
      {:tag :command:command,
       :attrs {:name "remove", :id "command.remove"},
       :content nil}
      {:tag :command:command,
       :attrs {:name "reverse", :id "command.reverse"},
       :content nil}
      {:tag :command:command,
       :attrs {:name "find", :id "command.find"},
       :content
       [{:tag :command:tokens,
         :attrs {:id "find.tokens"},
         :content
         [{:tag :command:token, :attrs {:name "system"}, :content nil}
          {:tag :command:token, :attrs {:name "debit"}, :content nil}
          {:tag :command:token, :attrs {:name "credit"}, :content nil}
          {:tag :command:token, :attrs {:name "entry"}, :content nil}
          {:tag :command:token, :attrs {:name "entries"}, :content nil}
          {:tag :command:token, :attrs {:name "journal"}, :content nil}
          {:tag :command:token,
           :attrs {:name "journals"},
           :content nil}
          {:tag :command:token,
           :attrs {:name "transaction"},
           :content nil}
          {:tag :command:token, :attrs {:name "account"}, :content nil}
          {:tag :command:token,
           :attrs {:name "accounts"},
           :content nil}
          {:tag :command:token, :attrs {:name "user"}, :content nil}
          {:tag :command:token, :attrs {:name "users"}, :content nil}
          {:tag :command:token, :attrs {:name "group"}, :content nil}
          {:tag :command:token, :attrs {:name "groups"}, :content nil}
          {:tag :command:token,
           :attrs {:name "allowedActions"},
           :content nil}
          {:tag :command:token, :attrs {:name "command"}, :content nil}
          {:tag :command:token,
           :attrs {:name "profileDetails"},
           :content nil}
          {:tag :command:token,
           :attrs {:name "profileDetail"},
           :content nil}
          {:tag :command:token,
           :attrs {:name "userSession"},
           :content nil}]}]}
      {:tag :command:command,
       :attrs {:name "load", :id "command.load"},
       :content
       [{:tag :command:tokens,
         :attrs {:id "load.tokens"},
         :content
         [{:tag :command:token, :attrs {:name "system"}, :content nil}
          {:tag :command:token, :attrs {:name "debit"}, :content nil}
          {:tag :command:token, :attrs {:name "credit"}, :content nil}
          {:tag :command:token, :attrs {:name "entry"}, :content nil}
          {:tag :command:token, :attrs {:name "entries"}, :content nil}
          {:tag :command:token, :attrs {:name "journal"}, :content nil}
          {:tag :command:token,
           :attrs {:name "journals"},
           :content nil}
          {:tag :command:token,
           :attrs {:name "transaction"},
           :content nil}
          {:tag :command:token, :attrs {:name "account"}, :content nil}
          {:tag :command:token,
           :attrs {:name "accounts"},
           :content nil}
          {:tag :command:token, :attrs {:name "user"}, :content nil}
          {:tag :command:token, :attrs {:name "users"}, :content nil}
          {:tag :command:token, :attrs {:name "group"}, :content nil}
          {:tag :command:token, :attrs {:name "groups"}, :content nil}
          {:tag :command:token,
           :attrs {:name "allowedActions"},
           :content nil}
          {:tag :command:token, :attrs {:name "command"}, :content nil}
          {:tag :command:token,
           :attrs {:name "profileDetails"},
           :content nil}
          {:tag :command:token,
           :attrs {:name "profileDetail"},
           :content nil}
          {:tag :command:token,
           :attrs {:name "userSession"},
           :content nil}]}]}
      {:tag :command:command,
       :attrs {:name "list", :id "command.list"},
       :content
       [{:tag :command:tokens,
         :attrs {:id "list.tokens"},
         :content
         [{:tag :command:token, :attrs {:name "system"}, :content nil}
          {:tag :command:token, :attrs {:name "debit"}, :content nil}
          {:tag :command:token, :attrs {:name "credit"}, :content nil}
          {:tag :command:token, :attrs {:name "entry"}, :content nil}
          {:tag :command:token, :attrs {:name "entries"}, :content nil}
          {:tag :command:token, :attrs {:name "journal"}, :content nil}
          {:tag :command:token,
           :attrs {:name "journals"},
           :content nil}
          {:tag :command:token,
           :attrs {:name "transaction"},
           :content nil}
          {:tag :command:token, :attrs {:name "account"}, :content nil}
          {:tag :command:token,
           :attrs {:name "accounts"},
           :content nil}
          {:tag :command:token, :attrs {:name "user"}, :content nil}
          {:tag :command:token, :attrs {:name "users"}, :content nil}
          {:tag :command:token, :attrs {:name "group"}, :content nil}
          {:tag :command:token, :attrs {:name "groups"}, :content nil}
          {:tag :command:token,
           :attrs {:name "allowedActions"},
           :content nil}
          {:tag :command:token, :attrs {:name "command"}, :content nil}
          {:tag :command:token,
           :attrs {:name "profileDetails"},
           :content nil}
          {:tag :command:token,
           :attrs {:name "profileDetail"},
           :content nil}
          {:tag :command:token,
           :attrs {:name "userSession"},
           :content nil}]}]}
      {:tag :command:command,
       :attrs {:name "commit", :id "command.commit"},
       :content
       [{:tag :command:tokens,
         :attrs {:id "find.tokens"},
         :content
         [{:tag :command:token, :attrs {:name "system"}, :content nil}
          {:tag :command:token, :attrs {:name "debit"}, :content nil}
          {:tag :command:token, :attrs {:name "credit"}, :content nil}
          {:tag :command:token, :attrs {:name "entry"}, :content nil}
          {:tag :command:token, :attrs {:name "entries"}, :content nil}
          {:tag :command:token, :attrs {:name "journal"}, :content nil}
          {:tag :command:token,
           :attrs {:name "journals"},
           :content nil}
          {:tag :command:token,
           :attrs {:name "transaction"},
           :content nil}
          {:tag :command:token, :attrs {:name "account"}, :content nil}
          {:tag :command:token,
           :attrs {:name "accounts"},
           :content nil}
          {:tag :command:token, :attrs {:name "user"}, :content nil}
          {:tag :command:token, :attrs {:name "users"}, :content nil}
          {:tag :command:token, :attrs {:name "group"}, :content nil}
          {:tag :command:token, :attrs {:name "groups"}, :content nil}
          {:tag :command:token,
           :attrs {:name "allowedActions"},
           :content nil}
          {:tag :command:token, :attrs {:name "command"}, :content nil}
          {:tag :command:token,
           :attrs {:name "profileDetails"},
           :content nil}
          {:tag :command:token,
           :attrs {:name "profileDetail"},
           :content nil}
          {:tag :command:token,
           :attrs {:name "userSession"},
           :content nil}]}]}
      {:tag :command:command,
       :attrs {:name "login", :id "command.login"},
       :content
       [{:tag :command:tokens,
         :attrs {:id "list.tokens"},
         :content
         [{:tag :command:token,
           :attrs {:name "user"},
           :content nil}]}]}
      {:tag :command:command,
       :attrs {:name "logout", :id "command.logout"},
       :content nil}
      {:tag :command:command,
       :attrs {:name "exit", :id "command.exit"},
       :content nil}]}
    {:tag :command:tokens,
     :attrs {:id "tokens.def"},
     :content
     [{:tag :command:token,
       :attrs {:name "debit", :optionRequired "false"},
       :content
       [{:tag :command:optionSet,
         :attrs {:id "oset"},
         :content
         [{:tag :command:options,
           :attrs {:id "entry.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "entryid", :value "0876-42356523-2456"},
             :content nil}
            {:tag :command:option,
             :attrs {:name "accountid", :value "tims-34577143"},
             :content nil}
            {:tag :command:option,
             :attrs {:name "amount", :value "155000.00"},
             :content nil}]}
          {:tag :command:options,
           :attrs {:id "entryid.single.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "entryid", :value ""},
             :content nil}]}
          {:tag :command:options,
           :attrs {:id "accountid.single.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "accountid", :value ""},
             :content nil}]}
          {:tag :command:options,
           :attrs {:id "amount.single.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "amount", :value ""},
             :content nil}]}
          {:tag :command:options,
           :attrs {:id "id.single.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "id", :value ""},
             :content nil}]}]}]}
      {:tag :command:token,
       :attrs {:name "credit", :optionRequired "false"},
       :content
       [{:tag :command:optionSet,
         :attrs {:id "oset"},
         :content
         [{:tag :command:options,
           :attrs {:id "entry.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "entryid", :value ""},
             :content nil}
            {:tag :command:option,
             :attrs {:name "accountid", :value ""},
             :content nil}
            {:tag :command:option,
             :attrs {:name "amount", :value ""},
             :content nil}]}
          {:tag :command:options,
           :attrs {:id "entryid.single.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "entryid", :value ""},
             :content nil}]}
          {:tag :command:options,
           :attrs {:id "accountid.single.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "accountid", :value ""},
             :content nil}]}
          {:tag :command:options,
           :attrs {:id "amount.single.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "amount", :value ""},
             :content nil}]}
          {:tag :command:options,
           :attrs {:id "id.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "id", :value ""},
             :content nil}]}]}]}
      {:tag :command:token,
       :attrs {:name "entry", :optionRequired "false"},
       :content
       [{:tag :command:optionSet,
         :attrs {:id "oset"},
         :content
         [{:tag :command:options,
           :attrs {:id "entrynum.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "entrynum", :value ""},
             :content nil}
            {:tag :command:option,
             :attrs {:name "journal", :value ""},
             :content nil}
            {:tag :command:option,
             :attrs {:name "date", :value ""},
             :content nil}]}
          {:tag :command:options,
           :attrs {:id "entrynum.single.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "entrynum", :value ""},
             :content nil}]}
          {:tag :command:options,
           :attrs {:id "journal.single.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "journal", :value ""},
             :content nil}]}
          {:tag :command:options,
           :attrs {:id "date.single.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "date", :value ""},
             :content nil}]}
          {:tag :command:options,
           :attrs {:id "id.single.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "id", :value ""},
             :content nil}]}]}]}
      {:tag :command:token,
       :attrs {:name "journal", :optionRequired "false"},
       :content
       [{:tag :command:optionSet,
         :attrs {:id "oset"},
         :content
         [{:tag :command:options,
           :attrs {:id "name.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "name", :value ""},
             :content nil}]}
          {:tag :command:options,
           :attrs {:id "id.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "id", :value ""},
             :content nil}]}]}]}
      {:tag :command:token,
       :attrs {:name "transaction", :optionRequired "false"},
       :content
       [{:tag :command:optionSet,
         :attrs {:id "oset"},
         :content
         [{:tag :command:options,
           :attrs {:id "name.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "name", :value ""},
             :content nil}]}
          {:tag :command:options,
           :attrs {:id "id.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "id", :value ""},
             :content nil}]}]}]}
      {:tag :command:token,
       :attrs {:name "account", :optionRequired "false"},
       :content
       [{:tag :command:optionSet,
         :attrs {:id "oset"},
         :content
         [{:tag :command:options,
           :attrs {:id "cweight.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "name", :value ""},
             :content nil}
            {:tag :command:option,
             :attrs {:name "type", :value ""},
             :content nil}
            {:tag :command:option,
             :attrs {:name "counterWeight", :value ""},
             :content nil}]}
          {:tag :command:options,
           :attrs {:id "name.single.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "name", :value ""},
             :content nil}]}
          {:tag :command:options,
           :attrs {:id "id.single.option"},
           :content
           [{:tag :command:option,
             :attrs {:name "id", :value ""},
             :content nil}]}]}]}]}]}]}
