
(ns bkell-test 
  (:use [bkell] :reload-all)
  (:use [clojure.test])
  (:require test-utils)
  (:require clojure.contrib.logging)
)


(use-fixtures :each test-utils/test-fixture-db)
(somnium.congomongo/mongo! :db "bkell") ;; connect to mongodb


;; ==================
;; 'ADD' tests
;; ==================
(deftest test-addU
  (let [  user (load-file "test/etc/data/stubu-two.clj")
          bk (bkell/init-shell)      ;; initialize the bkell 
          ruser (bkell/add user)]
    (is (= :user (:tag user)))  ;; ensure that a :user tag is coming back 
  )
)
(deftest test-addC
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        
        bk (bkell/init-shell)      ;; initialize the bkell 
        currency (load-file "test/etc/data/test-currency.clj")]
    
    
    ;; ensure that an error is returned if we try to add a currency without logging in 
    (let [ eresult (bkell/add currency "stub" false)]
      (is (-> eresult nil? not))
      (is (-> eresult :tag (= :error)))
    )
  )
)
(deftest test-addC1
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        
        bk (bkell/init-shell)      ;; initialize the bkell 
        currency (load-file "test/etc/data/test-currency.clj")]
    
    ;; now log-in a user
    (commands/login-user ru) 
    
    (let [ fresult (bkell/add currency "stub" false)]

      (println "... " fresult)
      (is (-> fresult nil? not))
      (is (-> fresult :tag (= :currency)))
    )

  )
)
#_(deftest test-addA
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        account (load-file "test/etc/data/test-account-asset.clj")]
    (bkell/add account "stub")
  )
)
#_(deftest test-addE
  (let  [user (load-file "test/etc/data/stubu-two.clj")
         ru (commands/add-user user)
         xx (test-utils/populate-accounts)
         entry (test-utils/create-balanced-test-entry)
         ]
    (bkell/add entry "stub")
  )
)

