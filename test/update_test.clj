(ns update-test
  (:use [clojure.test])
  (:use somnium.congomongo)
  (:require test-utils)
  (:require commands.update)
  (:require commands.get)
  ;;(:require debug)
)


(use-fixtures :each test-utils/test-fixture-db )
(somnium.congomongo/mongo! :db "bkell") ;; connect to mongodb


;; update user 
(deftest test-update-user-1
  
  ;; error if user doesn't exist 
  (let  [ u1  (load-file "test/etc/data/stubu-one.clj")
          ae  (try (commands/update-user u1)
                  (catch java.lang.AssertionError ae ae))]
        
        (is (not (nil? ae)) "there SHOULD be an error if user doesn't exist")
        (is (= java.lang.AssertionError (type ae)) "return type is NOT an assertion error")
  )
)
(deftest test-update-user-2
  
  ;; assert that user was updated 
  (let  [ u1 (test-utils/add-user nil)
          result  (commands/update-user (load-file "test/etc/data/stubu-one.clj"))
          check   (first (commands/get-user "stub"))]
    
    (is (= "xxx" (:password check)) "user attributes have NOT changed")
  )
)


;; update currency 
(deftest test-update-currency-1
  
  ;; insert if currency doesn't exist 
  (let [user (commands/add-user (load-file "test/etc/data/stubu-two.clj"))
        currency (load-file "test/etc/data/test-currency.clj")
        rc0 (commands/update-currency currency "stub" false)
        rc1 (commands/get-currency "stub" "AUD")]
    (is (not (nil? rc1)) "1. we SHOULD have the 'AUD' currency")
    (is (= "AUD" (:id rc1)) "2. we SHOULD have the 'AUD' currency")
  )
)
(deftest test-update-currency-2
  
  ;; assert that currency was updated 
  (let [user (commands/add-user (load-file "test/etc/data/stubu-two.clj"))
        currency (load-file "test/etc/data/test-currency-CAD.clj")
        rc0 (commands/update-currency currency "stub" false)
        rc1 (commands/get-currency "stub" "CDN")]

    (is (not (nil? rc1)) "we SHOULD have the 'CDN' currency")
    (is (= "CDN" (:id rc1)) "1. 'CDN' currency SHOULD have been updated")
    (is (= "Some content" (:content rc1)) "2. 'CDN' currency SHOULD have been updated with 'Some content'")
  )
)


;; CAN'T update accounts, only destroy and re-add them 
(comment deftest test-update-account )


;; update entry 
(deftest test-update-entry-1
  
  ;; insert if entry doesn't exist 
  (let [user (commands/add-user (load-file "test/etc/data/stubu-two.clj"))
        ra (test-utils/populate-accounts)
        entry (load-file "test/etc/data/test-entry-FULL.clj")
        re0 (commands/update-entry entry "stub")
        re1 (commands/get-entry "stub" (:id entry))]
    (is (not (nil? re1)) "1. result entry should NOT be nil")
    (is (= "testid" (:id re1)) "2. entry SHOULD have the :id 'testid'")
  )
)
(deftest test-update-entry-2
  
  ;; assert that entry was updated 
  (let [user (commands/add-user (load-file "test/etc/data/stubu-two.clj"))
        ra (test-utils/populate-accounts)
        entry (load-file "test/etc/data/test-entry-FULL.clj")
        re0 (commands/add-entry entry "stub")
        re1 (commands/update-entry (merge entry { :date "06/30/2011" }) "stub" )
        re2 (commands/get-entry "stub" (:id entry))]
    
    (is (not (nil? re2)) "1. result entry should NOT be nil")
    (is (= "testid" (:id re2)) "2. entry SHOULD have the :id 'testid'")
    (is (= "06/30/2011" (:date re2)) "3. entry SHOULD have update date of '06/30/2011'")
  )
  
)



;; Tests for Multimethods 

(deftest test-updateU
  
  ;; assert that user was updated 
  (let  [ u1 (test-utils/add-user nil)
          result  (commands/update (load-file "test/etc/data/stubu-one.clj"))
          check   (first (commands/get-user "stub"))]
    
    (is (= "xxx" (:password check)) "user attributes have NOT changed")
  )
)


;; update currency 
(deftest test-updateC
  
  ;; assert that currency was updated 
  (let [user (commands/add-user (load-file "test/etc/data/stubu-two.clj"))
        currency (load-file "test/etc/data/test-currency-CAD.clj")
        rc0 (commands/update currency "stub" false)
        rc1 (commands/get-currency "stub" "CDN")]

    (is (not (nil? rc1)) "we SHOULD have the 'CDN' currency")
    (is (= "CDN" (:id rc1)) "1. 'CDN' currency SHOULD have been updated")
    (is (= "Some content" (:content rc1)) "2. 'CDN' currency SHOULD have been updated with 'Some content'")
  )
)


;; update entry 
(deftest test-updateE
  
  ;; assert that entry was updated 
  (let [user (commands/add-user (load-file "test/etc/data/stubu-two.clj"))
        ra (test-utils/populate-accounts)
        entry (load-file "test/etc/data/test-entry-FULL.clj")
        re0 (commands/add-entry entry "stub")
        re1 (commands/update (merge entry { :date "06/30/2011" }) "stub" )
        re2 (commands/get-entry "stub" (:id entry))]
    
    (is (not (nil? re2)) "1. result entry should NOT be nil")
    (is (= "testid" (:id re2)) "2. entry SHOULD have the :id 'testid'")
    (is (= "06/30/2011" (:date re2)) "3. entry SHOULD have update date of '06/30/2011'")
  )
  
)


