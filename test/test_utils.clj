(ns test-utils 
  (:require [clojure.contrib.logging]
            [bkell.commands.add :as addk]
            [bkell.bkell :as bkell]
            [monger.core :as mg]
            [monger.collection :as mc]
  )
)

(defn test-fixture-db
  "test to clear out DB before a test is run"
  [test]
  
  ;; ** execute the TEST function
  (bkell/init-shell :dev)      ;; initialize the bkell 
  
  (mc/remove "users")  ;; destroying all users
  (mc/remove "groups") ;; destroying all groups
  (mc/remove "bookkeeping") ;; destroying all bookkeeping
  
  (test)
)
#_(defn test-fixture-midje
  "test to clear out DB before a test is run"
  []
  
  ;; ** execute the TEST function
  (bkell/init-shell)      ;; initialize the bkell 
  
  (mc/remove "users")  ;; destroying all users
  (mc/remove "groups") ;; destroying all groups
  (mc/remove "bookkeeping") ;; destroying all bookkeeping
  
)

(defn add-user [uloc]

  (let [user (load-file (if (not (nil? uloc)) uloc "test/etc/data/stubu-two.clj"))]
    (addk/add-user user)
  )
)

(comment
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


)
(defn populate-entries 
  "create 2 test entries"
  [] 

  (let [entry (load-file "test/etc/data/test-entry-bal.clj") ]
    
    (addk/add-entry 
      (merge  (merge entry { :id "testid" :date "03/22/2011" }) 
        {:content [ {:tag :debit :id "dtS" :amount 120.00 :accountid "cash" } 
                    {:tag :credit :id "crS" :amount 120.00 :accountid "revenue" }]}) 
      "stub") 
    
    (addk/add-entry 
      (merge  (merge entry { :id "testid2" :date "03/22/2011" }) 
        {:content [ {:tag :debit :id "dtS" :amount 3000.00 :accountid "cash" } 
                    {:tag :credit :id "crS" :amount 3000.00 :accountid "revenue" }]})
      "stub") 
  )
)


(defn create-balanced-test-entry []
  (let [entry (load-file "test/etc/data/test-entry-bal.clj")]
  
    (merge  (merge entry { :id "testid" :date "03/22/2011" }) 
      {:content [ {:tag :debit :id "dtS" :amount 120.00 :accountid "cash" } 
                  {:tag :credit :id "crS" :amount 120.00 :accountid "revenue" }]})
  )
)

