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
#_(deftest test-encrypted-password )


(comment *** 
  BOOKKEEPING tests)
#_(deftest test-add-currency
  ;; assert that currency was added
  ;; assert that there is no duplicate currency
)
#_(deftest test-add-account 
  ;; assert that account was added
  ;; assert that there is no duplicate account
  ;; assert that account has an associated currency 
)
#_(deftest test-add-entry
  ;; assert that entry is balanced
  ;; assert that accounts correspond with existing accounts
)


