(ns test-utils 
  (:require clojure.contrib.logging)
  (:use somnium.congomongo)
  (:require commands.add)
)

(defn test-fixture-db
    "test to clear out DB before a test is run"
    [test]

    (clojure.contrib.logging/info "test-fixture-db CALLED")
    (destroy! :users {})  ;; destroying all users
    (destroy! :groups {}) ;; destroying all groups
    (destroy! :bookkeeping {}) ;; destroying all bookkeeping

    ;; ** execute the TEST function
    (test)
    (clojure.contrib.logging/info "test-fixture-db EXIT")

)

(defn add-user [uloc]

  (let [user (load-file (if (not (nil? uloc)) uloc "test/etc/data/stubu-two.clj"))]
    (commands/add-user user)
  )
)

(defn populate-accounts
  "create 4 test accounts "
  []
  (commands/add-account (load-file "test/etc/data/test-account-asset.clj") "stub")
  (commands/add-account (load-file "test/etc/data/test-account-expense.clj") "stub")
  (commands/add-account (load-file "test/etc/data/test-account-liability.clj") "stub")
  (commands/add-account (load-file "test/etc/data/test-account-revenue.clj") "stub")
)

(defn populate-entries 
  "create 2 test entries"
  [] 

  (let [entry (load-file "test/etc/data/test-entry-bal.clj") ]
    
    (commands/add-entry 
      (merge  (merge entry { :id "testid" :date "03/22/2011" }) 
        {:content [ {:tag :debit :id "dtS" :amount 120.00 :accountid "cash" } 
                    {:tag :credit :id "crS" :amount 120.00 :accountid "accounts payable" }]}) 
      "stub") 
    
    (commands/add-entry 
      (merge  (merge entry { :id "testid2" :date "03/22/2011" }) 
        {:content [ {:tag :debit :id "dtS" :amount 3000.00 :accountid "cash" } 
                    {:tag :credit :id "crS" :amount 3000.00 :accountid "accounts payable" }]})
      "stub") 
  )
)


