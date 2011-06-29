(ns bjell-test 
  (:use [bjell] :reload-all)
  (:use [clojure.test])
  (:use somnium.congomongo)
  (:require test-utils)
  ;;(:require clojure.contrib.logging)
  (:require clojure.data.json)
  (:import java.io.FileReader)
)


(use-fixtures :each test-utils/test-fixture-db )
(somnium.congomongo/mongo! :db "bkell") ;; connect to mongodb


;; ==================
;; 'ADD' tests
;; ==================
(deftest test-addU
  (let [user (FileReader. "test/etc/data/stubu-two.js")]
    
    (bjell/add user)

    (let [ru (fetch "users" :where { :username "stub" })]
      
      (is (not (nil? (nth ru 0))) "There SHOULD be a user with the username 'stub'")
      
      ;; assert that there are some associated profileDetails: [ last.name first.name email country ]
      (let [pd (:tag (nth (:content (nth ru 0)) 0))]
        (is (= "profileDetails" pd) "There SHOULD be a profileDetail element in the user")
      )
  )

  )
)
#_(deftest test-addC
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        currency (load-file "test/etc/data/test-currency.clj")]
    (bjell/add currency "stub" false)
  )
)
#_(deftest test-addA
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        account (load-file "test/etc/data/test-account-asset.clj")]
    (bjell/add account "stub")
  )
)
#_(deftest test-addE
  (let  [user (load-file "test/etc/data/stubu-two.clj")
         ru (commands/add-user user)
         xx (test-utils/populate-accounts)
         entry (test-utils/create-balanced-test-entry)
         ]
    (bjell/add entry "stub")
  )
)


;; ==================
;; 'GET' tests
;; ==================
(deftest test-getU 

  (let [result (test-utils/add-user nil)
        ru (bjell/get :user "stub")]
      
      (println ru)
      (is (not (nil? ru )) "There SHOULD be a user with the username 'stub'")
      
      ;; assert that there are some associated profileDetails: [ last.name first.name email country ]
      (let [pd (:tag (nth (:content ru ) 0))]
        (is (= "profileDetails" pd) "There SHOULD be a profileDetail element in the user")
      )
  )
)



;; ==================
;; 'UPDATE' tests
;; ==================


;; ==================
;; 'REMOVE' tests
;; ==================






