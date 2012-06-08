(ns remove-test
	(:use [clojure.test])
    (:require [test-utils]
              [bkell.commands.add :as addk]
              [bkell.commands.get :as getk]
              [bkell.commands.remove :as removek]
              [clojure.pprint :as pprint]
    )
)


(use-fixtures :each test-utils/test-fixture-db )


;; get user 
(deftest test-remove-user 

  (let  [ result (test-utils/add-user nil)
          r0 (getk/get-user "stub")
        ]

      (is (not (nil? r0)) "a user SHOULD have been added")
      (let [r1 (removek/remove-user r0)
            r2 (first (getk/get-user "stub"))
            gg (first (getk/get-group "stub"))
            bb (first (getk/get-bookkeeping "stub"))]
        (is (nil? r2) "user SHOULD have been deleted")
        (is (nil? gg) "group SHOULD have been deleted")
        (is (nil? bb) "bookkeeping SHOULD have been deleted")
      )
  )
)


;; get currency 
#_(deftest test-remove-currency 

  (let [result (addk/add-user (load-file "test/etc/data/stubu-two.clj"))
        rc (getk/get-currency "stub" "CDN")]
    
    (is (not (nil? rc)) "currency result should NOT be nil")
    (is (= "CDN" (:id rc)) "There SHOULD be a 'CDN' currency with the username 'stub'")

    (let [zz (removek/remove-currency { :id "CDN" } "stub")
          rm (getk/get-currency "stub" "CDN")]
      (is (nil? rm) "currency SHOULD be nil")
    )
  )
)

    
;; get account 
(deftest test-remove-account
  
  (let [result (addk/add-user (load-file "test/etc/data/stubu-two.clj"))
        ra (getk/get-account "stub" "cash")]
    
    (is (not (nil? ra)) "cash result should NOT be nil")
    (is (= "cash" (:id ra)) "There SHOULD be a 'cash' account with the username 'stub'")
    
    (let  [ zz (removek/remove-account { :id "cash" } "stub")
            ra (getk/get-account "stub" "cash")
          ]
      (is (nil? ra) "account SHOULD be nil")
    )
  )
)


;; get entry 
(deftest test-remove-entry

  (let [result (addk/add-user (load-file "test/etc/data/stubu-two.clj"))
        yy (test-utils/populate-entries)
        re (getk/get-entry "stub" "testid")]
    
    (is (not (nil? re)) "entry result should NOT be nil")
    (is (= "testid" (:id re)) "There SHOULD be a 'testid' entry with the username 'stub'")
    
    (let  [ zz (removek/remove-entry { :id "testid" } "stub")
            re (getk/get-entry "stub" "testid")
          ]
      (is (nil? re) "entry SHOULD be nil")
    )
  )
)



;; Testing Multimethods 
#_(deftest test-removeU

  (let [result (test-utils/add-user nil)
        r0 (getk/get-user "stub")]

      (is (not (nil? r0)) "a user SHOULD have been added")
      (let [r1 (removek/removek { :tag :user :username "stub" })
            r2 (first (getk/get-user "stub"))
            gg (first (getk/get-group "stub"))
            bb (first (getk/get-bookkeeping "stub"))]
        (is (nil? r2) "user SHOULD have been deleted")
        (is (nil? gg) "group SHOULD have been deleted")
        (is (nil? bb) "bookkeeping SHOULD have been deleted")
      )
  )
)


;; get currency 
#_(deftest test-removeC

  (let [result (addk/add-user (load-file "test/etc/data/stubu-two.clj"))
        rc (getk/get-currency "stub" "CDN")]
    
    (is (not (nil? rc)) "currency result should NOT be nil")
    (is (= "CDN" (:id rc)) "There SHOULD be a 'CDN' currency with the username 'stub'")

    (let [zz (removek/removek { :tag :currency :id "CDN" } "stub")
          rm (getk/get-currency "stub" "CDN")]
      (is (nil? rm) "currency SHOULD be nil")
    )
  )
)

 
;; get account 
#_(deftest test-removeA
  
  (let [result (addk/add-user (load-file "test/etc/data/stubu-two.clj"))
        xx (test-utils/populate-accounts)
        ra (getk/get-account "stub" "cash")]
    
    (is (not (nil? ra)) "cash result should NOT be nil")
    (is (= "cash" (:id ra)) "There SHOULD be a 'cash' account with the username 'stub'")
    
    (let [zz (removek/removek { :tag :account :id "cash" } "stub")
          ra (getk/get-account "stub" "cash")]
      (is (nil? ra) "account SHOULD be nil")
    )
  )
)


;; get entry 
#_(deftest test-removeE

  (let [result (addk/add-user (load-file "test/etc/data/stubu-two.clj"))
        xx (test-utils/populate-accounts)
        yy (test-utils/populate-entries)
        re (getk/get-entry "stub" "testid")]
    
    (is (not (nil? re)) "entry result should NOT be nil")
    (is (= "testid" (:id re)) "There SHOULD be a 'testid' entry with the username 'stub'")
    
    (let [zz (removek/removek { :tag :entry :id "testid" } "stub")
          re (getk/get-entry "stub" "testid")]
      (is (nil? re) "entry SHOULD be nil")
    )
  )
)


