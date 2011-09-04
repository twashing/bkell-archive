(ns bkell-test 
  
  (:use [bkell] :reload-all)
  (:use [clojure.test])
  
  (:require test-utils)
  (:require clojure.contrib.logging)
  (:require commands.add)
  (:require commands.get)
  (:require commands.update)
  (:require commands.remove)
  (:require commands.authenticate)
  (:require domain)
  (:require util)
)


(use-fixtures :each test-utils/test-fixture-db)
(somnium.congomongo/mongo! :db "bkell-test") ;; connect to mongodb


;; ==================
;; 'ADD' tests
;; ==================
(deftest test-addU
  (let [  user (load-file "test/etc/data/stubu-two.clj")
          bk (bkell/init-shell)      ;; initialize the bkell 
          ruser (bkell/add user)]

    (is (= :user (:tag ruser)))  ;; ensure that a :user tag is coming back 
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
    
    ;; now log-in a user
    (commands/login-user ru) 
    
    (let [ fresult (bkell/add currency "stub" false)]
      
      (is (-> fresult nil? not))
      (is (-> fresult :tag (= :currency)))
    )
  )
)
(deftest test-addA
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        
        bk (bkell/init-shell)      ;; initialize the bkell 
        account (load-file "test/etc/data/test-account-asset.clj")]
    
    ;; ensure that an error is returned if we try to add an account without logging in 
    (let [ eresult (bkell/add account "stub" false)]
      (is (-> eresult nil? not))
      (is (-> eresult :tag (= :error)))
    )
    ;; now log-in a user
    (commands/login-user ru) 
    
    (let [fresult (bkell/add account "stub")]
      
      (is (-> fresult nil? not))
      (is (-> fresult :tag (= :account)))
    )
  )
)
(deftest test-addE
  (let  [ user (load-file "test/etc/data/stubu-two.clj")
          ru (commands/add-user user)
          
          bk (bkell/init-shell)      ;; initialize the bkell 
          xx (test-utils/populate-accounts)
          entry (test-utils/create-balanced-test-entry)
         ]
    
    ;; ensure that an error is returned if we try to add an entry without logging in 
    (let [ eresult (bkell/add entry "stub" false)]
      (is (-> eresult nil? not))
      (is (-> eresult :tag (= :error)))
    )
    ;; now log-in a user
    (commands/login-user ru) 
    
    (let [fresult (bkell/add entry "stub")]
      
      (is (-> fresult nil? not))
      (is (-> fresult :tag (= :entry)))
    )
  )
)

;; ==================
;; 'GET' tests
;; ==================
(deftest test-getU
  (let [  user (load-file "test/etc/data/stubu-two.clj")
          bk (bkell/init-shell)      ;; initialize the bkell 
          ruser (bkell/add user)]
    
    ;; ensure that an error is returned if we try to get a user without logging in 
    (let [ eresult (bkell/get :user (:username ruser))]
      (is (-> eresult nil? not))
      (is (-> eresult :tag (= :error)))
    )
    
    ;; now log-in a user
    (commands/login-user ruser) 
    
    (let [ fresult (bkell/get :user (:username ruser))]
      
      (is (-> fresult nil? not))
      (is (-> fresult :tag (= :user)))
    )
    
  )
)
(deftest test-getC
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        
        bk (bkell/init-shell)      ;; initialize the bkell 
        ]
    
    
    ;; ensure that an error is returned if we try to get a currency without logging in 
    (let [ eresult (bkell/get :currency "stub" "USD")]
      (is (-> eresult nil? not))
      (is (-> eresult :tag (= :error)))
    )
    
    ;; now log-in a user
    (commands/login-user ru) 
    
    (let [ fresult (bkell/get :currency "stub" "USD")]
      
      (is (-> fresult nil? not))
      (is (-> fresult :tag (= :currency)))
      (is (-> fresult :id (= "USD")))
    )
  )
)

;; ACCOUNTS 
(deftest test-getA
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        
        bk (bkell/init-shell)      ;; initialize the bkell 
        account (load-file "test/etc/data/test-account-asset.clj")]
    
    
    ;; ensure that an error is returned if we try to get a currency without logging in 
    (let [ eresult (bkell/get :account "stub" "cash")]
      (is (-> eresult nil? not))
      (is (-> eresult :tag (= :error)))
    )
    
    (commands/login-user ru) ;; now log-in a user
    (bkell/add account "stub" false) ;; now add an account 
    
    (let [ fresult (bkell/get :account "stub" "cash")]
      
      (is (-> fresult nil? not))
      (is (-> fresult :tag (= :account)))
      (is (-> fresult :id (= "cash")))
    )
  )
)

;; ENTRY 
(deftest test-getE
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        
        bk (bkell/init-shell)      ;; initialize the bkell 
        entry (test-utils/create-balanced-test-entry)]
    
    ;; ensure that an error is returned if we try to get a currency without logging in 
    (let [ eresult (bkell/get :entry "stub" "testid")]
      (is (-> eresult nil? not))
      (is (-> eresult :tag (= :error)))
    )
    
    
    (commands/login-user ru) ;; now log-in a user
    (test-utils/populate-accounts)
    (test-utils/populate-entries)  ;; add a test entry before retreival
    
    
    (let [ fresult (bkell/get :entry "stub" "testid")]
      
      (is (-> fresult nil? not))
      (is (-> fresult :tag (= :entry)))
      (is (-> fresult :id (= "testid")))
    )
  )
)

;; LISTs 
(deftest test-get-lists
  
  ;; add the user 
  (commands/add-user (load-file "test/etc/data/stubu-two.clj"))
  (bkell/init-shell)      ;; initialize the bkell 
  
  ;; test get currencies 
  (test-utils/populate-currencies)
  
  ;; test get accounts 
  (test-utils/populate-accounts)
  
  ;; test get entries 
  (test-utils/populate-entries)
  
  ;; ensure that an error is returned if we try to get any list without logging in
  (let [ eresult (bkell/get :entries "stub")]
    (is (-> eresult nil? not))
    (is (-> eresult :tag (= :error)))
  )
    
  (let  [fresult (commands/get :currencies "stub")]
    (is (-> fresult nil? not))
    (is (-> fresult vector?))
    (is (-> fresult first :tag (= :currency)))
  )
  
  (let  [fresult (commands/get :accounts "stub")]
    (is (-> fresult nil? not))
    (is (-> fresult vector?))
    (is (-> fresult first :tag (= :account)))
  )
  
  (let  [fresult (commands/get :entries "stub")]
    (is (-> fresult nil? not))
    (is (-> fresult vector?))
    (is (-> fresult first :tag (= :entry)))
  )
  
)


;; ==================
;; 'UPDATE' tests
;; ==================

;; update user 
(deftest test-updateU
  (let [  user (load-file "test/etc/data/stubu-two.clj")
          bk (bkell/init-shell)      ;; initialize the bkell 
          ruser (bkell/add user)]
    
    ;; ensure that an error is returned if we try to get a user without logging in 
    (let [ eresult (bkell/update ruser)]
      (is (-> eresult nil? not))
      (is (-> eresult :tag (= :error)))
    )
    
    ;; now log-in a user
    (commands/login-user ruser) 
    
    ;; ensure we are returning a :user map
    (let [ fresult (bkell/update (merge user {:password "asdf"}))]
      
      (is (-> fresult nil? not))
      (is (-> fresult :tag (= :user)))
    )

    ;; ensure we have updated the value
    (let [gresult (bkell/get :user (:username user))]
      
      (is (-> gresult nil? not))
      (is (-> gresult :tag (= :user)))
      (is (-> gresult :password (= "asdf")))
    )
    
  )
)

;; update currency 
(deftest test-updateC
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        
        bk (bkell/init-shell)      ;; initialize the bkell 
        currency (load-file "test/etc/data/test-currency.clj")]
    
    
    ;; ensure that an error is returned if we try to get a currency without logging in 
    (let [ eresult (bkell/update currency)]
      (is (-> eresult nil? not))
      (is (-> eresult :tag (= :error)))
    )
    
    ;; now log-in a user
    (commands/login-user ru) 
    
    ;; ensure we are returning a :user map
    (let [ fresult (bkell/update (merge currency {:content "some content"}) (:username ru) false)]
      
      (is (-> fresult nil? not))
      (is (-> fresult :tag (= :currency)))
    )
    
    ;; ensure we have updated the value
    (let [gresult (bkell/get :currency (:username ru) (:id currency))]
      
      (is (-> gresult nil? not))
      (is (-> gresult :tag (= :currency)))
      (is (-> gresult :content (= "some content")))
    )
  )
)

;; update account 
(deftest test-updateA
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        
        bk (bkell/init-shell)      ;; initialize the bkell 
        account (load-file "test/etc/data/test-account-asset.clj")]
    
    
    ;; ensure that an error is returned if we try to get an account without logging in 
    (let [ eresult (bkell/update account)]
      (is (-> eresult nil? not))
      (is (-> eresult :tag (= :error)))
    )
    
    ;; now log-in a user
    (commands/login-user ru) 
    
    ;; ensure we are returning a :user map
    (let [ fresult (bkell/update (merge account {:name "thing"}) (:username ru))]
      
      (is (-> fresult nil? not))
      (is (-> fresult :tag (= :account)))
    )
    
    ;; ensure we have updated the value
    (let [gresult (bkell/get :account (:username ru) (:id account))]
      
      (is (-> gresult nil? not))
      (is (-> gresult :tag (= :account)))
      (is (-> gresult :name (= "thing")))
    )
    
  )
)

;; update entry 
(deftest test-updateE
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        
        bk (bkell/init-shell)      ;; initialize the bkell 
        entry (test-utils/create-balanced-test-entry)]
    
    
    ;; ensure that an error is returned if we try to get an account without logging in 
    (let [ eresult (bkell/update entry)]
      (is (-> eresult nil? not))
      (is (-> eresult :tag (= :error)))
    )
    
    ;; now log-in a user
    (commands/login-user ru) 
    (test-utils/populate-accounts)
    
    ;; ensure we are returning a :user map
    (let [ fresult (bkell/update (merge entry {:date "01/01/2011"}) (:username ru))]
      
      (is (-> fresult nil? not))
      (is (-> fresult :tag (= :entry)))
    )
    
    ;; ensure we have updated the value
    (let [gresult (bkell/get :entry (:username ru) (:id entry))]
      
      (is (-> gresult nil? not))
      (is (-> gresult :tag (= :entry)))
      (is (-> gresult :date (= "01/01/2011")))
    )
    
  )
)



;; ==================
;; 'REMOVE' tests
;; ==================

;; remove user 
(deftest test-removeU
  (let [  user (load-file "test/etc/data/stubu-two.clj")
          bk (bkell/init-shell)      ;; initialize the bkell 
          ruser (bkell/add user)]
    
    ;; ensure that an error is returned if we try to get a user without logging in 
    (let [ eresult (bkell/remove ruser)]
      (is (-> eresult nil? not))
      (is (-> eresult :tag (= :error)))
    )
    
    ;; now log-in a user
    (commands/login-user ruser) 
    
    ;; ensure we are returning nil
    (let [ fresult (bkell/remove ruser)]
      (is (-> fresult nil?)))
    
    ;; ensure we get a nil
    (let [gresult (bkell/get :user (:username ruser))]
      (is (-> gresult nil?)))
    
    ;; ensure we get a nil when trying to get an associated object 
    (let [gresult (bkell/get :currency (:username ruser) "USD")]
      (is (-> gresult nil?)))
  )
)

;; remove currency 
(deftest test-removeC
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        
        bk (bkell/init-shell)      ;; initialize the bkell 
        currency (load-file "test/etc/data/test-currency.clj")
        rc (commands/add-currency currency (:username ru) false)]
    
    ;; ensure that an error is returned if we try to get a currency without logging in 
    (let [ eresult (bkell/remove currency (:username ru))]
      (is (-> eresult nil? not))
      (is (-> eresult :tag (= :error)))
    )
    
    ;; now log-in a user
    (commands/login-user ru) 
    
    ;; ensure we are returning a :currency map
    (let [ fresult (bkell/remove currency (:username ru))]
      (is (-> fresult nil? not)))
    
    ;; ensure we get a nil when trying to get an associated object 
    (let [gresult (bkell/get :currency (:username ru) (:id currency))]
      (is (-> gresult nil?)))
  )
)

;; remove account 
(deftest test-removeA
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        
        bk (bkell/init-shell)      ;; initialize the bkell 
        account (load-file "test/etc/data/test-account-asset.clj")]
    
    
    ;; ensure that an error is returned if we try to get an account without logging in 
    (let [ eresult (bkell/update account)]
      (is (-> eresult nil? not))
      (is (-> eresult :tag (= :error)))
    )
    
    ;; now log-in a user
    (commands/login-user ru) 
    
    ;; ensure we are returning a :user map
    (let [ fresult (bkell/update (merge account {:name "thing"}) (:username ru))]
      
      (is (-> fresult nil? not))
      (is (-> fresult :tag (= :account)))
    )
    
    ;; ensure we have updated the value
    (let [gresult (bkell/get :account (:username ru) (:id account))]
      
      (is (-> gresult nil? not))
      (is (-> gresult :tag (= :account)))
      (is (-> gresult :name (= "thing")))
    )
    
  )
)

;; remove entry 
#_(deftest test-removeE
  (let [user (load-file "test/etc/data/stubu-two.clj")
        ru (commands/add-user user)
        
        bk (bkell/init-shell)      ;; initialize the bkell 
        entry (test-utils/create-balanced-test-entry)]
    
    
    ;; ensure that an error is returned if we try to get an account without logging in 
    (let [ eresult (bkell/update entry)]
      (is (-> eresult nil? not))
      (is (-> eresult :tag (= :error)))
    )
    
    ;; now log-in a user
    (commands/login-user ru) 
    (test-utils/populate-accounts)
    
    ;; ensure we are returning a :user map
    (let [ fresult (bkell/update (merge entry {:date "01/01/2011"}) (:username ru))]
      
      (is (-> fresult nil? not))
      (is (-> fresult :tag (= :entry)))
    )
    
    ;; ensure we have updated the value
    (let [gresult (bkell/get :entry (:username ru) (:id entry))]
      
      (is (-> gresult nil? not))
      (is (-> gresult :tag (= :entry)))
      (is (-> gresult :date (= "01/01/2011")))
    )
    
  )
)




