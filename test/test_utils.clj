(ns test-utils 
  (:use somnium.congomongo)
  (:require [clojure.contrib.logging]
            [bkell.commands.add :as addk]
            [bkell.bkell :as bkell]
  )
)

(defn test-fixture-db
    "test to clear out DB before a test is run"
    [test]

    (clojure.contrib.logging/info "test-fixture-db CALLED")
    (destroy! :users {})  ;; destroying all users
    (destroy! :groups {}) ;; destroying all groups
    (destroy! :bookkeeping {}) ;; destroying all bookkeeping

    ;; ** execute the TEST function
    (bkell/init-shell)      ;; initialize the bkell 
    (test)
    (clojure.contrib.logging/info "test-fixture-db EXIT")

)

(defn add-user [uloc]

  (let [user (load-file (if (not (nil? uloc)) uloc "test/etc/data/stubu-two.clj"))]
    (addk/add-user user)
  )
)

(defn populate-currencies
  "populate with Canadian and Austrilian currencies"
  [] 
  
  ;; Adding AUD to already existing list of CDN, USD, BP, EUR, JPN
  (addk/add-currency (load-file "test/etc/data/test-currency.clj") "stub" false)
   
)

(defn populate-accounts
  "create 4 test accounts "
  []
  (addk/add-account (load-file "test/etc/data/test-account-asset.clj") "stub")
  (addk/add-account (load-file "test/etc/data/test-account-expense.clj") "stub")
  (addk/add-account (load-file "test/etc/data/test-account-liability.clj") "stub")
  (addk/add-account (load-file "test/etc/data/test-account-revenue.clj") "stub")
)

(defn populate-entries 
  "create 2 test entries"
  [] 

  (let [entry (load-file "test/etc/data/test-entry-bal.clj") ]
    
    (addk/add-entry 
      (merge  (merge entry { :id "testid" :date "03/22/2011" }) 
        {:content [ {:tag :debit :id "dtS" :amount 120.00 :accountid "cash" } 
                    {:tag :credit :id "crS" :amount 120.00 :accountid "accounts payable" }]}) 
      "stub") 
    
    (addk/add-entry 
      (merge  (merge entry { :id "testid2" :date "03/22/2011" }) 
        {:content [ {:tag :debit :id "dtS" :amount 3000.00 :accountid "cash" } 
                    {:tag :credit :id "crS" :amount 3000.00 :accountid "accounts payable" }]})
      "stub") 
  )
)


(defn create-balanced-test-entry []
  (let [entry (load-file "test/etc/data/test-entry-bal.clj")]
  
    (merge  (merge entry { :id "testid" :date "03/22/2011" }) 
      {:content [ {:tag :debit :id "dtS" :amount 120.00 :accountid "cash" } 
                  {:tag :credit :id "crS" :amount 120.00 :accountid "accounts payable" }]})
  )
)


