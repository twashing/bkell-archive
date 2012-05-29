(ns add-test
  
  (:use [monger.operators]
        [midje.sweet]
        [clojure.test]
  )
  (:require [bkell.commands.add :as addk]
            [bkell.domain :as domain]
            [monger.core :as mg]
            [monger.collection :as mc]
            [monger.operators :as mop]
            [test-utils :as tutils]
  )
)

(fact  ;; test adding a new user 
  
  (tutils/test-fixture-midje)
  (let[ user (load-file "test/etc/data/stubu-two.clj")
        result (addk/add-user user)
        ru (mc/find-one-as-map "users" { :username (:username user) })
      ]
      
      true => (not (nil? ru))   ;;"There SHOULD be a user with the username 'stub'"
      
      ;; assert that there are some associated profileDetails: [ last.name first.name email country ]
      (let [pd (:tag (first (:content ru)))]
         
        pd => "profileDetails"    ;;"There SHOULD be a profileDetail element in the user")
      )
  )
)


(use-fixtures :each test-utils/test-fixture-db)

;; test adding against an existing user
(deftest test-add-existing-user 
  
  (let[ user (load-file "test/etc/data/stubu-two.clj")
        result (addk/add-user user) 
      ]
    
    (let [ae  (try  (addk/add-user user)
                    (catch java.lang.AssertionError ae ae)
                    (catch java.lang.IllegalArgumentException iae iae))]
      
      (is (not (nil? ae)) "There SHOULD be an error when adding a duplicate user")
      (is (= java.lang.IllegalArgumentException (type ae)) "return type is NOT an assertion error")
    )
  )
)

;; test that associated group is getting added as well 
(deftest test-add-associated-group 
  
  (let[ user (load-file "test/etc/data/stubu-two.clj")
        result (addk/add-user user) 
        gr (mc/find-one-as-map "groups" { :owner (:username user) })
      ]
      
      (is (not (nil? gr)) "There SHOULD be an associated group with the added user")
      (is (= 1 (mc/count "groups" { :owner (:username user) })) "There should NOT be any duplicate groups" )
  )
)

;; test that associated bookkeeping is getting added as well 
(deftest test-add-associated-bookkeeping 
  
  (let[ user (load-file "test/etc/data/stubu-two.clj")
        result (addk/add-user user) 
        ;;bk (:owner (first (fetch "bookkeeping" :where { :owner (:username user) })))
        bk (mc/find-one-as-map "bookkeeping" { :owner (:username user) })
      ]
      
      (is (not (nil? bk)) "There SHOULD be an associated bookkeeping with the added user")
      (is (= 1 (mc/count "bookkeeping" { :owner (:username user) })) "There should NOT be any duplicate bookkeeping(s)" )
  )

)
