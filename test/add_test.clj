(ns add-test
  
  (:use [monger.operators]
        [midje.sweet]
  )
  (:require [bkell.commands.add :as addk]
            [bkell.domain :as domain]
            [monger.core :as mg]
            [monger.collection :as mc]
            [monger.operators :as mop]
            [test-utils :as tutils]
  )
)

(fact 
  
  (tutils/test-fixture-db)
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
#_(fact  ;; test adding a new user 
  
  ;;(tutils/test-fixture-db)
      (1 => 1)
  
  ;; assert basic add
  #_(let[ user (load-file "test/etc/data/stubu-two.clj")
        result (addk/add-user user)
        ru (mc/find-one "users" { :username (:username user) })
      ]
      
      (1 => 1)
      ;(true => (not (nil? ru)))   ;;"There SHOULD be a user with the username 'stub'"
      ;(provided
      ;  (tutils/test-fixture-db => nil))
;      
;      ;; assert that there are some associated profileDetails: [ last.name first.name email country ]
;      (let [pd (:tag (nth (:content (nth ru 0)) 0))]
;        (is (= "profileDetails" pd) "There SHOULD be a profileDetail element in the user")
;      )
  )

)

(comment 
;; test adding against an existing user
#_(deftest test-add-existing-user 
  
;  (let [user (load-file "test/etc/data/stubu-two.clj")]
;    
;    (addk/add-user user) 
;    (let [ae  (try  (addk/add-user user)
;                    (catch java.lang.AssertionError ae ae)
;                    (catch java.lang.IllegalArgumentException iae iae))]
;      
;      (is (not (nil? ae)) "There SHOULD be an error when adding a duplicate user")
;      (is (= java.lang.IllegalArgumentException (type ae)) "return type is NOT an assertion error")
;    )
;  )
)

;; test that associated group is getting added as well 
#_(deftest test-add-associated-group 
  
;  (let [user (load-file "test/etc/data/stubu-two.clj")]
;    (let [  result (addk/add-user user) 
;            gr (:owner (first (fetch "groups" :where { :owner (:username user) })))]
;      
;      (is (not (nil? gr)) "There SHOULD be an associated group with the added user")
;      (is (= 1 (fetch-count "groups" :where { :owner (:username user) })) "There should NOT be any duplicate groups" )
;    )
;  )
)

;; test that associated bookkeeping is getting added as well 
#_(deftest test-add-associated-bookkeeping 
  
;  (let [user (load-file "test/etc/data/stubu-two.clj")]
;    (let [  result (addk/add-user user) 
;            bk (:owner (first (fetch "bookkeeping" :where { :owner (:username user) })))]
;      
;      (is (not (nil? bk)) "There SHOULD be an associated bookkeeping with the added user")
;      (is (= 1 (fetch-count "bookkeeping" :where { :owner (:username user) })) "There should NOT be any duplicate bookkeeping(s)" )
;    )
;  )

)
)
