(ns add-test
	(:use [clojure.test])
    (:use somnium.congomongo)
    (:require commands.add)
)


(defn test-fixture-db
    "test to clear out shell memory before a test is run"
    [test]

    (clojure.contrib.logging/info "test-fixture-db CALLED")
    (destroy! :users {})  ;; destroying all users
    (destroy! :groups {}) ;; destroying all groups
    (destroy! :bookkeeping {}) ;; destroying all bookkeeping

    ;; ** execute the TEST function
    (test)
    (clojure.contrib.logging/info "test-fixture-db EXIT")

)
(use-fixtures :each add-test/test-fixture-db )


(def configs (load-file "test/etc/config/config.clj")) ;; load config file 
(somnium.congomongo/mongo! :db "bkell") ;; connect to mongodb



(comment *** 
  USER tests)
(deftest test-add-new-user  ;; test adding a new user 
  
  ;; assert basic add
  (let [user (load-file "test/etc/data/stubu-two.clj")]
    (commands/add-user user)
    (let [ru (fetch "users" :where { :username (:username user) })]
      
      (is (not (nil? ru)) "There SHOULD be a user with the username 'stub'")
      
      ;; assert that there are some associated profileDetails: [ last.name first.name email country ]
      (let [pd (:tag (nth (:content (nth ru 0)) 0))]
        (is (= "profileDetails" pd) "There SHOULD be a profileDetail element in the user")
      )
    )
  )

)

;; test adding against an existing user
(deftest test-add-existing-user 
  
  (let [user (load-file "test/etc/data/stubu-two.clj")]
    
    (commands/add-user user) 
    (let [result (commands/add-user user)] 
      
      (is (= "error" (:tag result)) "There SHOULD be an error when adding a duplicate user")
    )
  )
)

;; test that associated group is getting added as well 
(deftest test-add-associated-group 
  
  (let [user (load-file "test/etc/data/stubu-two.clj")]
    (let [  result (commands/add-user user) 
            gr (:owner (first (fetch "groups" :where { :owner (:username user) })))]
      
      (is (not (nil? gr)) "There SHOULD be an associated group with the added user")
      (is (= 1 (fetch-count "groups" :where { :owner (:username user) })) "There should NOT be any duplicate groups" )
    )
  )
)

;; test that associated bookkeeping is getting added as well 
(deftest test-add-associated-bookkeeping 
  
  (let [user (load-file "test/etc/data/stubu-two.clj")]
    (let [  result (commands/add-user user) 
            bk (:owner (first (fetch "bookkeeping" :where { :owner (:username user) })))]
      
      (is (not (nil? bk)) "There SHOULD be an associated bookkeeping with the added user")
      (is (= 1 (fetch-count "bookkeeping" :where { :owner (:username user) })) "There should NOT be any duplicate bookkeeping(s)" )
    )
  )

)

;; test that password is encrypted - MD5 checksum 
(deftest test-encrypted-password 
    
  (let [user (load-file "test/etc/data/stubu-two.clj")]
    (let [  result (commands/add-user user) 
            ru (first (fetch "users" :where { :username (:username user) }))]
      
      (is (not (nil? ru)) "There SHOULD be a user after creation")
      (is (= "5185e8b8fd8a71fc80545e144f91faf2" (:password ru) ) "The password SHOULD be MD5 checksumed" )
    )
  )
)


(comment *** 
  BOOKKEEPING tests)
(deftest test-add-currency-1
  (let [user (load-file "test/etc/data/stubu-two.clj")]
    (let  [ result (commands/add-user user) 
            currency (load-file "test/etc/data/test-currency.clj")]
      
      ;; there SHOULD be an error if 'uname' is not set 
      (let [ae  (try (commands/add-currency nil currency false)
                  (catch java.lang.AssertionError ae ae))]
        
        (is (not (nil? ae)) "there SHOULD be an error if 'uname' is not set ")
        (is (= java.lang.AssertionError (type ae)) "return type is NOT an assertion error")
      )
      )
  )
)
(deftest test-add-currency-2
  (let [user (load-file "test/etc/data/stubu-two.clj")]
    (let  [ result (commands/add-user user) 
            currency (load-file "test/etc/data/test-currency.clj")]
      
      ;; there SHOULD be an error if adding currency without a 'name' or 'id' 
      (let [aee  (try (commands/add-currency "stub" { :tag :currency } false)
                  (catch java.lang.AssertionError ae ae))]
        
        (is (not (nil? aee)) "there SHOULD be an error if 'name' or 'id' is not set ")
        (is (= java.lang.AssertionError (type aee)) "return type is NOT an assertion error")
      )
    )
  )
)
(deftest test-add-currency-3
  (let [user (load-file "test/etc/data/stubu-two.clj")]
    (let  [ result (commands/add-user user) 
            currency (load-file "test/etc/data/test-currency.clj")]
      
      (commands/add-currency "stub" currency true)
      (let  [ bk (first (fetch "bookkeeping" :where { :owner (:username user) })) ]
        
        ;; assert that currency was added
        (let [ clist (:content (first (:content bk))) ]
          (is (= 1 (count (filter #(= "AUD" (:id %1)) clist))) "the AUD currency was NOT found in the DB"))
        
        ;; assert that it is now the default currency 
        (let [ dc (:default (first (:content bk))) ]
          (is (= "AUD" dc) "the default currency was NOT 'AUD'"))
        
      )
    )
  )
)
(deftest test-add-currency-4
  (let [user (load-file "test/etc/data/stubu-two.clj")]
    (let  [ result (commands/add-user user) 
            currency (load-file "test/etc/data/test-currency.clj")]
      
      ;; ensure that we cannot add a duplicate currency 
      (commands/add-currency "stub" currency false)
      (let [ae  (try (commands/add-currency "stub" currency false)
                  (catch java.lang.AssertionError ae ae))]
        
        (is (not (nil? ae)) "there SHOULD be an error if a duplicate currency is added")
        (is (= java.lang.AssertionError (type ae)) "return type is NOT an assertion error")
      )
      
      ;; add Swiss Franc (CHF) and ensure that it is NOT default 
      (let  [ bk (first (fetch "bookkeeping" :where { :owner (:username user) })) ]
        
        ;; assert that it is NOT the default currency 
        (let [ dc (:default (first (:content bk))) ]
          (is (not (= "AUD" dc)) "the default currency was NOT 'AUD'"))
      )
    )
  )
)
(deftest test-add-account-1
  
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        account (load-file "test/etc/data/test-account-one.clj")]
    
    (let [ae  (try (commands/add-account "stub" { :tag :account :type "asset" :id "cash" :name nil :counterWeight "debit" })
                (catch java.lang.AssertionError ae ae))]
      
      ;; assert that we can't add a bad account 
      (is (not (nil? ae)) "there SHOULD be an error if account with no name is added")
      (is (= java.lang.AssertionError (type ae)) "return type is NOT an assertion error")
    )
     
    (let [ra (commands/add-account "stub" { :tag :account :type "asset" :id "cash" :name "cash" :counterWeight "debit" }) ]
      
      (let  [ bk (first (fetch "bookkeeping" :where { :owner (:username user) })) ]
        
        ;; assert that account was added
        (let [ ac (commands/traverse-tree bk :get { :id (:id account) } {}) ]
          
          (is (not (nil? ac)) "we do NOT have a 'cash' account - 1")
          (is (= "cash" (:id ac)) "we do NOT have a 'cash' account - 2")
        )
      )
    )
  )
)
    
(deftest test-add-account-2
  
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        account (load-file "test/etc/data/test-account-one.clj")]
    
    (commands/add-account "stub" account)
    (let [ae  (try (commands/add-account "stub" account)
                (catch java.lang.AssertionError ae ae))]
      
      ;; assert that there is no duplicate account
      (is (not (nil? ae)) "there SHOULD be an error if account if we try adding a duplicate")
      (is (= java.lang.AssertionError (type ae)) "return type is NOT an assertion error")
    )
     
  )
  
)
#_(deftest test-add-entry
  ;; assert that entry is balanced
  ;; assert that accounts correspond with existing accounts
)


