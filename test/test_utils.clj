(ns test-utils 
  (require :clojure.contrib.logging)
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


