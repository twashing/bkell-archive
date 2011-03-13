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
  {:tag :account:accounts, :attrs {:id "main.accounts"}, :content nil}
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
       :content nil}]}]}]}
