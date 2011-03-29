(ns remove-test
	(:use [clojure.test])
    (:use somnium.congomongo)
    (:require test-utils)
    (:require commands.add)
    (:require commands.get)
    (:require commands.remove)
    (:require debug)
)


(use-fixtures :each test-utils/test-fixture-db )
(somnium.congomongo/mongo! :db "bkell") ;; connect to mongodb


;; get user 
(deftest test-remove-user 

  (let [result (test-utils/add-user nil)
        r0 (commands/get-user "stub")]

      (is (not (nil? r0)) "a user SHOULD have been added")
      (let [r1 (commands/remove-user "stub")
            r2 (first (commands/get-user "stub"))
            gg (first (commands/get-group "stub"))
            bb (first (commands/get-bookkeeping "stub"))]
        (is (nil? r2) "user SHOULD have been deleted")
        (is (nil? gg) "group SHOULD have been deleted")
        (is (nil? bb) "bookkeeping SHOULD have been deleted")
      )
  )
)


;; get currency 
(deftest test-remove-currency 

  (let [result (commands/add-user (load-file "test/etc/data/stubu-two.clj"))
        rc (commands/get-currency "stub" "CDN")]
    
    (is (not (nil? rc)) "currency result should NOT be nil")
    (is (= "CDN" (:id rc)) "There SHOULD be a 'CDN' currency with the username 'stub'")

    (let [zz (commands/remove-currency "stub" "CDN")
          rm (commands/get-currency "stub" "CDN")]
      (is (nil? rm) "currency SHOULD be nil")
    )
  )
)

    
;; get account 
(deftest test-remove-account
  
  (let [result (commands/add-user (load-file "test/etc/data/stubu-two.clj"))
        xx (test-utils/populate-accounts)
        ra (commands/get-account "stub" "cash")]
    
    (is (not (nil? ra)) "cash result should NOT be nil")
    (is (= "cash" (:id ra)) "There SHOULD be a 'cash' account with the username 'stub'")
    
    (let [zz (commands/remove-account "stub" "cash")
          ra (commands/get-account "stub" "cash")]
      (is (nil? ra) "account SHOULD be nil")
    )
  )
)


;; get entry 
(deftest test-remove-entry

  (let [result (commands/add-user (load-file "test/etc/data/stubu-two.clj"))
        xx (test-utils/populate-accounts)
        yy (test-utils/populate-entries)
        re (commands/get-entry "stub" "testid")]
    
    (is (not (nil? re)) "entry result should NOT be nil")
    (is (= "testid" (:id re)) "There SHOULD be a 'testid' entry with the username 'stub'")
    
    (let [zz (commands/remove-entry "stub" "testid")
          re (commands/get-entry "stub" "testid")]
      (is (nil? re) "entry SHOULD be nil")
    )
  )
)



