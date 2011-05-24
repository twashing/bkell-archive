(ns bkell-test 
  (:use [bkell] :reload-all)
  (:use [clojure.test])
  (:require test-utils)
  (:require clojure.contrib.logging)
)


(use-fixtures :each test-utils/test-fixture-db )
(somnium.congomongo/mongo! :db "bkell") ;; connect to mongodb


;; ==================
;; 'ADD' tests
;; ==================
(deftest test-addU
  (let [user (load-file "test/etc/data/stubu-two.clj")]
    (bkell/add user)
  )
)
#_(deftest test-addC
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        currency (load-file "test/etc/data/test-currency.clj")]
    (bkell/add currency "stub" false)
  )
)
#_(deftest test-addA
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        account (load-file "test/etc/data/test-account-asset.clj")]
    (bkell/add account "stub")
  )
)
#_(deftest test-addE
  (let  [user (load-file "test/etc/data/stubu-two.clj")
         ru (commands/add-user user)
         xx (test-utils/populate-accounts)
         entry (test-utils/create-balanced-test-entry)
         ]
    (bkell/add entry "stub")
  )
)


