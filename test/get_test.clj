(ns get-test
	(:use [clojure.test]
    )
    (:require [test-utils]
              [bkell.commands.get :as getk])
)


(use-fixtures :each test-utils/test-fixture-db)
#_(somnium.congomongo/mongo! :db "bkell") ;; connect to mongodb


;; get user 
#_(deftest test-get-user 

  (let [result (test-utils/add-user nil)
        ru (getk/get-user "stub")]
      
      (is (not (nil? ru)) "There SHOULD be a user with the username 'stub'")
      
      ;; assert that there are some associated profileDetails: [ last.name first.name email country ]
      (let [pd (:tag (nth (:content ru) 0))]
        (is (= :profileDetails pd) "There SHOULD be a profileDetail element in the user")
      )
  )
)


;; get currency 
#_(deftest test-get-currency 

  (let [result (test-utils/add-user nil)
        rc (getk/get-currency "stub" "CDN")]
    
    (is (not (nil? rc)) "currency result should NOT be nil")
    (is (= "CDN" (:id rc)) "There SHOULD be a 'CDN' currency with the username 'stub'")
  )
)
#_(deftest test-get-currencies

  (let [result (test-utils/add-user nil)
        rc (getk/get-currencies "stub")]
    
    (is (not (nil? rc)) "result currency list should NOT be nil")
    (is (not (empty? rc)) "result SHOULD be list with content")
  )
)

    
;; get account 
(deftest test-get-account

  (let [result (test-utils/add-user nil)
        ra (getk/get-account "stub" "cash")]
    
    (is (not (nil? ra)) "cash result should NOT be nil")
    (is (= "cash" (:id ra)) "There SHOULD be a 'cash' account with the username 'stub'")
  )
)
#_(deftest test-get-accounts

  (let [result (test-utils/add-user nil)
        ;;xx (test-utils/populate-accounts)
        ra (getk/get-accounts "stub")]
    
    (is (not (nil? ra)) "result account list should NOT be nil")
    (is (not (empty? ra)) "result SHOULD be list with content")
  )
)


;; get entry 
#_(deftest test-get-entry

  (let [result (test-utils/add-user nil)
        xx (test-utils/populate-accounts)
        yy (test-utils/populate-entries)
        re (getk/get-entry "stub" "testid")]
    
    (is (not (nil? re)) "entry result should NOT be nil")
    (is (= "testid" (:id re)) "There SHOULD be a 'testid' entry with the username 'stub'")
  )
)
#_(deftest test-get-entries

  (let [result (test-utils/add-user nil)
        xx (test-utils/populate-accounts)
        yy (test-utils/populate-entries)
        re (getk/get-entries "stub")]
    
    (is (not (nil? re)) "result entries list should NOT be nil")
    (is (not (empty? re)) "result SHOULD be list with content")
  )
)



;; Testing multimethods 

;; get user 
#_(deftest test-getU

  (let [result (test-utils/add-user nil)
        ru (getk/get :user "stub")]
      
      (is (not (nil? ru)) "There SHOULD be a user with the username 'stub'")
      
      ;; assert that there are some associated profileDetails: [ last.name first.name email country ]
      (let [pd (:tag (nth (:content ru) 0))]
        (is (= :profileDetails pd) "There SHOULD be a profileDetail element in the user")
      )
  )
)


;; get currency 
#_(deftest test-getC

  (let [result (test-utils/add-user nil)
        rc (getk/get :currency "stub" "CDN")]
    
    (is (not (nil? rc)) "currency result should NOT be nil")
    (is (= "CDN" (:id rc)) "There SHOULD be a 'CDN' currency with the username 'stub'")
  )
)
#_(deftest test-getCs

  (let [result (test-utils/add-user nil)
        rc (getk/get :currencies "stub")]
    
    (is (not (nil? rc)) "result currency list should NOT be nil")
    (is (not (empty? rc)) "result SHOULD be list with content")
  )
)

    
;; get account 
#_(deftest test-getA

  (let [result (test-utils/add-user nil)
        xx (test-utils/populate-accounts)
        ra (getk/get :account "stub" "cash")]
    
    (is (not (nil? ra)) "cash result should NOT be nil")
    (is (= "cash" (:id ra)) "There SHOULD be a 'cash' account with the username 'stub'")
  )
)
#_(deftest test-getAs

  (let [result (test-utils/add-user nil)
        xx (test-utils/populate-accounts)
        ra (getk/get :accounts "stub")]
    
    (is (not (nil? ra)) "result account list should NOT be nil")
    (is (not (empty? ra)) "result SHOULD be list with content")
  )
)


;; get entry 
#_(deftest test-getE

  (let [result (test-utils/add-user nil)
        xx (test-utils/populate-accounts)
        yy (test-utils/populate-entries)
        re (getk/get :entry "stub" "testid")]
    
    (is (not (nil? re)) "entry result should NOT be nil")
    (is (= "testid" (:id re)) "There SHOULD be a 'testid' entry with the username 'stub'")
  )
)
#_(deftest test-getEs

  (let [result (test-utils/add-user nil)
        xx (test-utils/populate-accounts)
        yy (test-utils/populate-entries)
        re (getk/get :entries "stub")]
    
    (is (not (nil? re)) "result entries list should NOT be nil")
    (is (not (empty? re)) "result SHOULD be list with content")
  )
)



