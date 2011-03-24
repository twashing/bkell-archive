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
  (commands/add-account "stub" (load-file "test/etc/data/test-account-asset.clj"))
  (commands/add-account "stub" (load-file "test/etc/data/test-account-expense.clj"))
  (commands/add-account "stub" (load-file "test/etc/data/test-account-liability.clj"))
  (commands/add-account "stub" (load-file "test/etc/data/test-account-revenue.clj"))
)


