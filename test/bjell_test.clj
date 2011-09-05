(ns bjell-test 
  (:use [bjell] :reload-all)
  (:use [clojure.test])
  (:use somnium.congomongo)
  (:require test-utils)
  ;;(:require clojure.contrib.logging)
  (:require clojure.data.json)
  (:require clojure.contrib.str-utils2)
  (:import java.io.FileReader)
  (:require bkell)
  (:require domain)
)


(use-fixtures :each test-utils/test-fixture-db )
(somnium.congomongo/mongo! :db "bkell") ;; connect to mongodb


;; ==================
;; 'ADD' tests
;; ==================
(deftest test-addU
  (let [user (FileReader. "test/etc/data/stubu-two.js")
        bk (bkell/init-shell)      ;; initialize the bkell 
        ]
    
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
(deftest test-addC
  (let [user (FileReader. "test/etc/data/stubu-two.js")
        ;;bk (bkell/init-shell)      ;; initialize the bkell 
        ru (bjell/add user)
        currency (FileReader.  "test/etc/data/test-currency.js")]
    
    
    ;; ensure that an error is returned if we try to add a currency without logging in 
    (let [ eresult (bjell/add currency "stub" false)]
      
      (is (-> eresult nil? not))
      (is (-> eresult clojure.data.json/read-json domain/keywordize-tags :tag (= :error)))
    )
    
    ;; now log-in a user
    (bjell/login ru) 
    
    (let [  fresult 
            (bjell/add (FileReader. "test/etc/data/test-currency.js") "stub" false)]  ;; have to reread the file b/c can't reset stram
      
      (is (-> fresult nil? not))
      (is (-> fresult clojure.data.json/read-json domain/keywordize-tags :tag (= :currency)))
    )
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
#_(deftest test-getU 

  (let [result (test-utils/add-user nil)
        ru (bjell/get :user "stub")]
      
      ;;(println ru)
      (is (not (nil? ru )) "There SHOULD be a user with the username 'stub'")
      
      (is (string? ru)  "The result SHOULD be a JSON String")
      ;;(is (clojure.contrib.str-utils2/contains ru ...))
  )
)



;; ==================
;; 'UPDATE' tests
;; ==================


;; ==================
;; 'REMOVE' tests
;; ==================






