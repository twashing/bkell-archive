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
 [{:tag :users:groups,
   :attrs {:id "main.groups"},
   :content
   [{:tag :users:group,
     :attrs {:id "webkell", :name "Webkell", :owner "root"},
     :content
     [{:tag :users:profileDetails,
       :attrs {:id "group.details"},
       :content
       [{:tag :users:profileDetail,
         :attrs {:id "", :name "defaultCurrency", :value "USD"},
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
             :content nil}]}]}]}]}]}
  {:tag :users:groups, :attrs {:id "group.attic"}, :content nil}]}
