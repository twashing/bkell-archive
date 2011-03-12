(ns add-test
	
	(:use [clojure.test])
    (:use somnium.congomongo)
)


(def configs (load-file "test/etc/config/config.clj"))
(somnium.congomongo/mongo! :db "bkell")



(comment *** 
  USER tests)

;; test adding a new user 
(deftest test-add-new-user 
  
  ;; assert basic add
  (let [user (load-file "test/etc/data/stubu-two.clj")]
    (insert! :users user)
    (let [ru (fetch "users" :where { :username (:username user) })]
      (is (not (nil? ru)) "There SHOULD be a user with the username 'stub'")
    )
  )

  ;; assert that there are some associated profileDetails: [ last.name first.name email country ]
)

;; test adding against an existing user
(deftest test-add-existing-user )

;; test that associated group is getting added as well 
(deftest test-add-associated-group )

;; test that associated bookkeeping is getting added as well 
(deftest test-add-associated-bookkeeping )

;; test that password is encrypted - MD5 checksum 
(deftest test-encrypted-password )


(deftest test-add-currency
  ;; assert that currency was added
  ;; assert that there is no duplicate currency
)
(deftest test-add-account 
  ;; assert that account was added
  ;; assert that there is no duplicate account
  ;; assert that account has an associated currency 
)
(deftest test-add-entry
  ;; assert that entry is balanced
  ;; assert that accounts correspond with existing accounts
)
