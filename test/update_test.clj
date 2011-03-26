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
#_(deftest test-update-currency
  
  ;; insert if currency doesn't exist 
  ;; assert that currency was updated 
  
)


;; CAN'T update accounts, only destroy and re-add them 
(comment deftest test-update-account )


;; update entry 
#_(deftest test-update-entry 
  
  ;; insert if entry doesn't exist 
  ;; assert that entry was updated 
  
)


