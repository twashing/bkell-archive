(ns http-test
  
  (:import java.io.StringBufferInputStream)
  (:use clojure.test)
  (:use somnium.congomongo)
  (:require [clojure.contrib.str-utils]
            [clojure.contrib.logging]
            [clojure.data.json]
            [test-utils]
            [http.handler :as handler])
)


(use-fixtures :each test-utils/test-fixture-db )
(somnium.congomongo/mongo! :db "bkell") ;; connect to mongodb

(defn request [resource defroutes-fn method & params]
  
  (defroutes-fn (merge { :request-method method :uri resource } (first params) ))
)


;; ======
;; REGISTER & LOGIN page retrieval

;; assert that i. status is 200, the index page has ii. a link to register page iii. inputs for login 
(deftest test-index 

    (let [result (request "/" handler/main :get {})]  
      (is (= 200 (:status result)))  
      (is (= "index.html" (->> :body result .getName)))
    )
)


;; return static register.html page; assert that i. status is 200, register page has ii. inputs for registering
(deftest test-register-get

    (let [result (request "/register" handler/main :get {})]  
      (is (= 200 (:status result)))  
      (is (= "register.html" (->> :body result .getName)))
    )
)

;; ======
;; REGISTER a User

(deftest test-user-create
  
  (let  [ result (request "/user" handler/main :post {:body (java.io.File. "test/etc/data/stubu-one.js")})] 
    
    ;;when creating a user, the result should look some like below:
      
    ;;{:status 200, :headers {Content-Type text/html}, :body {"content":[{"content":[{"content":null,"name":"first.name","value":"xxx","tag":"profileDetail"},{"content":null,"name":"last.name","value":"xxx","tag":"profileDetail"},{"content":null,"name":"email","value":"xxx","tag":"profileDetail"},{"content":null,"name":"country","value":"xxx","tag":"profileDetail"}],"tag":"profileDetails"}],"username":"stub","password":"f561aaf6ef0bf14d4208bb46a4ccb3ad","tag":"user","_id":"4e59be91d36d2ff4076079dd"}}
    
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= :user (->   result      ;; this ensures that the body is a JSON string and that the tag is a user
                       :body 
                       clojure.data.json/read-json 
                       domain/keywordize-tags
                       :tag)))
  )
)

;; ======
;; LOGIN tests

(deftest test-login-bad
  
  ;; ensure that an error is returned if we give a bad password 
  (let  [ result (request "/login" handler/main :post 
                          {:body (StringBufferInputStream. "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"badpassword\" }") })
        ] 
    
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= :errors (-> result       ;; this ensures that the body is a JSON string and that the tag is an error
                       :body 
                       clojure.data.json/read-json 
                       domain/keywordize-tags
                       :tag)))
  )
)

(deftest test-login-good
  
  ;; ensure that we can login
  (let  [ 
          ruser (request "/user" handler/main :post {:body (java.io.File. "test/etc/data/stubu-two.js")})
          result (request "/login" handler/main :post 
                  {:body (StringBufferInputStream. 
                          "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5185e8b8fd8a71fc80545e144f91faf2\" }") })
        ] 
    
    ;; the result will look like: {:status 200, :headers {Content-Type text/html}, :body {"previous":{"tag":"user","username":"stub","password":"5185e8b8fd8a71fc80545e144f91faf2"},"logged-in-user":{"tag":"user","username":"stub","password
    ;; ":"5185e8b8fd8a71fc80545e144f91faf2"},"active":true}}
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= :user (->   result       ;; this ensures that the body is a JSON string and that the tag is a user
                       :body 
                       clojure.data.json/read-json 
                       :logged-in-user  ;; have to dig into the entity before keywordizing
                       domain/keywordize-tags
                       :tag)))
  )
)

;; ======
;; CRUD on Accounts

(deftest test-account-add1
  
  ;; ensure that an error is returned if we try to add an account without being logged in
  (let [result (request "/account" handler/main :post {:body (java.io.File. "test/etc/data/test-account-asset.js")})] 
    
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= :error (->  :body       ;; this ensures that the body is a JSON string and that the tag is an error
                       result 
                       clojure.data.json/read-json 
                       domain/keywordize-tags
                       :tag)))
  )
)
(deftest test-account-add2
  
  (let  [ ruser (test-utils/add-user nil)
          rlogin (request "/login" handler/main :post 
                  {:body (StringBufferInputStream. 
                          "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5185e8b8fd8a71fc80545e144f91faf2\" }") })
          raccount (request "/account" handler/main :post {:body (java.io.File. "test/etc/data/test-account-asset.js")})
        ] 
    
    ;; the result will look like: {:status 200, :headers {Content-Type text/html}, :body {"previous":{"tag":"user","username":"stub","password":"5185e8b8fd8a71fc80545e144f91faf2"},"logged-in-user":{"tag":"user","username":"stub","password
    ;; ":"5185e8b8fd8a71fc80545e144f91faf2"},"active":true}}
    (is (= 200 (:status raccount))) ;; ensure status is 200
    (is (= :account (-> raccount       ;; this ensures that the body is a JSON string and that the tag is an error
                        :body 
                        clojure.data.json/read-json 
                        domain/keywordize-tags
                        :tag)))
  )
)
(deftest test-account-getlist1
  
  ;; ensure that an error is returned if we try to get an account list without being logged in
  (let [rk (handler/init-handler)
        result (request "/accounts" handler/main :get {})] 
    
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= :error (->  :body       ;; this ensures that the body is a JSON string and that the tag is an error
                       result 
                       clojure.data.json/read-json 
                       domain/keywordize-tags
                       :tag)))
  )
)
(deftest test-account-getlist2
  
  (let  [ ruser (test-utils/add-user nil)
          rk (handler/init-handler)
          rlogin (request "/login" handler/main :post 
                  {:body (StringBufferInputStream. 
                          "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5185e8b8fd8a71fc80545e144f91faf2\" }") })
          result (request "/accounts" handler/main :get {})] 
    
    ;; ensure that we get even empty list of accounts
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= [] (-> result       ;; this ensures that the body is a JSON string and that the tag is an error
                  :body 
                  clojure.data.json/read-json )))
  )
)
(deftest test-account-getlist3
  
  (let  [ ruser (test-utils/add-user nil)
          rk (handler/init-handler)
          rlogin (request "/login" handler/main :post 
                  {:body (StringBufferInputStream. 
                          "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5185e8b8fd8a71fc80545e144f91faf2\" }") })
          pas (test-utils/populate-accounts)
          result (request "/accounts" handler/main :get {})] 
    
    ;; result should look like the following...
    ;; {:status 200, :headers {Content-Type text/html}, :body [{"counterWeight":"debit","name":"revenue","type":"revenue","id":"revenue","tag":"account"},{"counterWeight":"debit","name":"accounts payable","type":"liability","id":"accounts payable","tag":"account"},{"counterWeight":"debit","name":"expense","type":"expense","id":"expense","tag":"account"},{"counterWeight":"debit","name":"cash","type":"asset","id":"cash","tag":"account"}]}

    ;; ensure that we get even empty list of accounts
    (is (-> result :body nil? not))
    (is (-> result :body empty? not))
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= :account  (-> result       ;; this ensures that the body is a JSON string and that the tag is an account
                          :body 
                          clojure.data.json/read-json 
                          first
                          domain/keywordize-tags
                          :tag)))
  )
)
(deftest test-account-get
  
  ;; ensure that an error is returned if we try to get an account without being logged in
  (let  [ ruser (test-utils/add-user nil)
          rk (handler/init-handler)
          rlogin (request "/login" handler/main :post 
                  {:body (StringBufferInputStream. 
          "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5185e8b8fd8a71fc80545e144f91faf2\" }") })
          pas (test-utils/populate-accounts)
          result (request "/account/cash" handler/main :get {})] 
    
    (is (-> result :body nil? not))
    (is (-> result :body empty? not))
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= :account (->  :body       ;; this ensures that the body is a JSON string and that the tag is an account
                       result 
                       clojure.data.json/read-json 
                       domain/keywordize-tags
                       :tag)))
  )
)
(deftest test-account-update
  
  (let  [ ruser (test-utils/add-user nil)
          rlogin (request "/login" handler/main :post 
                  {:body (StringBufferInputStream. 
                          "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5185e8b8fd8a71fc80545e144f91faf2\" }") })
          ;;raccount (request "/account" handler/main :post {:body (java.io.File. "test/etc/data/test-account-asset.js")})
          pas (test-utils/populate-accounts)
          r1 (request "/account/cash" handler/main :get {})
        ] 
    
    ;; get the original 
    (is (= 200 (:status r1))) ;; ensure status is 200
    (is (= :account (-> r1       ;; this ensures that the body is a JSON string and that the tag is an account
                        :body 
                        clojure.data.json/read-json 
                        domain/keywordize-tags
                        :tag)))
    
    ;; update account 
    (let [r2 (request "/account/cash" handler/main :put
              {:body 
                (StringBufferInputStream. 
                  "{\"tag\":\"account\", \"type\":\"asset\", \"id\":\"cash\", \"name\":\"fubar\", \"counterWeight\":\"debit\"}")
              })]
      
      (is (= 200 (:status r2))) ;; ensure status is 200
      (is (= :account (-> r2       ;; this ensures that the body is a JSON string and that the tag is an account
                          :body 
                          clojure.data.json/read-json 
                          domain/keywordize-tags
                          :tag)))
      (is (= "fubar" (-> r2       ;; this ensures that the body is a JSON string and that the tag is an account
                         :body 
                         clojure.data.json/read-json 
                         domain/keywordize-tags
                         :name)))
    
    )
    
    ;; get the update  
    (let [r3 (request "/account/cash" handler/main :get {})]
      (is (= 200 (:status r3))) ;; ensure status is 200
      (is (= :account (-> r3       ;; this ensures that the body is a JSON string and that the tag is an account
                          :body 
                          clojure.data.json/read-json 
                          domain/keywordize-tags
                          :tag)))
      (is (= "fubar" (-> r3       ;; this ensures that the body is a JSON string and that the tag is an account
                         :body 
                         clojure.data.json/read-json 
                         domain/keywordize-tags
                         :name)))
    )
    
  )
)
(deftest test-account-delete
  
  (let  [ ruser (test-utils/add-user nil)
          ;;rlogin (request "/login" handler/main :post 
          ;;        {:body (StringBufferInputStream. 
          ;;                "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5185e8b8fd8a71fc80545e144f91faf2\" }") })
          pas (test-utils/populate-accounts)
          r1 (request "/account/cash" handler/main :get {})
        ] 
    
    (let [  r2 (request "/account/cash" handler/main :delete {:body nil })]
      (is (= 200 (:status r2))) ;; ensure status is 200
      (is (= :error (-> :body       ;; this ensures that the body is a JSON string and that the tag is an error
                        r2 
                        clojure.data.json/read-json 
                        domain/keywordize-tags
                        :tag)))
    )
    
    (let  [ rlogin (request "/login" handler/main :post 
                    {:body (StringBufferInputStream. 
                            "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5185e8b8fd8a71fc80545e144f91faf2\" }") })
            r3 (request "/account/cash" handler/main :delete {:body nil })
          ]
        
      (is (= 200 (:status r3))) ;; ensure status is 200
      (is (empty? (:body r3)))
    )
    
  )
)

;; ======
;; CRUD on Bookkeeping

(deftest test-bookkeeping-get1
  
  ;; ensure that an error is returned if we try to get a bookkeeping without being logged in
  (let [rk (handler/init-handler)
        result (request "/bookkeeping/main-bookkeeping" handler/main :get {})] 
    
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= :error (->  :body       ;; this ensures that the body is a JSON string and that the tag is an error
                       result 
                       clojure.data.json/read-json 
                       domain/keywordize-tags
                       :tag)))
  )
)
(deftest test-bookkeeping-get2
  
  (let  [ ruser (test-utils/add-user nil)
          rk (handler/init-handler)
          rlogin (request "/login" handler/main :post 
                  {:body (StringBufferInputStream. 
          "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5185e8b8fd8a71fc80545e144f91faf2\" }") })
          result (request "/bookkeeping/main-bookkeeping" handler/main :get {})] 
    
    (is (-> result :body nil? not))
    (is (-> result :body empty? not))
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= :bookkeeping (-> :body       ;; this ensures that the body is a JSON string and that the tag is an account
                            result 
                            clojure.data.json/read-json 
                            domain/keywordize-tags
                            :tag)))
  )
)


;; ======
;; CRUD on Entries

(comment deftest test-account-add1
  
  ;; ensure that an error is returned if we try to add an account without being logged in
  (let [result (request "/account" handler/main :post {:body (java.io.File. "test/etc/data/test-account-asset.js")})] 
    
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= :error (->  :body       ;; this ensures that the body is a JSON string and that the tag is an error
                       result 
                       clojure.data.json/read-json 
                       domain/keywordize-tags
                       :tag)))
  )
)
(comment deftest test-account-add2
  
  (let  [ ruser (test-utils/add-user nil)
          rlogin (request "/login" handler/main :post 
                  {:body (StringBufferInputStream. 
                          "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5185e8b8fd8a71fc80545e144f91faf2\" }") })
          raccount (request "/account" handler/main :post {:body (java.io.File. "test/etc/data/test-account-asset.js")})
        ] 
    
    ;; the result will look like: {:status 200, :headers {Content-Type text/html}, :body {"previous":{"tag":"user","username":"stub","password":"5185e8b8fd8a71fc80545e144f91faf2"},"logged-in-user":{"tag":"user","username":"stub","password
    ;; ":"5185e8b8fd8a71fc80545e144f91faf2"},"active":true}}
    (is (= 200 (:status raccount))) ;; ensure status is 200
    (is (= :account (-> raccount       ;; this ensures that the body is a JSON string and that the tag is an error
                        :body 
                        clojure.data.json/read-json 
                        domain/keywordize-tags
                        :tag)))
  )
)
(comment deftest test-account-getlist1
  
  ;; ensure that an error is returned if we try to get an account list without being logged in
  (let [rk (handler/init-handler)
        result (request "/accounts" handler/main :get {})] 
    
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= :error (->  :body       ;; this ensures that the body is a JSON string and that the tag is an error
                       result 
                       clojure.data.json/read-json 
                       domain/keywordize-tags
                       :tag)))
  )
)
(comment deftest test-account-getlist2
  
  (let  [ ruser (test-utils/add-user nil)
          rk (handler/init-handler)
          rlogin (request "/login" handler/main :post 
                  {:body (StringBufferInputStream. 
                          "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5185e8b8fd8a71fc80545e144f91faf2\" }") })
          result (request "/accounts" handler/main :get {})] 
    
    ;; ensure that we get even empty list of accounts
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= [] (-> result       ;; this ensures that the body is a JSON string and that the tag is an error
                  :body 
                  clojure.data.json/read-json )))
  )
)
(comment deftest test-account-getlist3
  
  (let  [ ruser (test-utils/add-user nil)
          rk (handler/init-handler)
          rlogin (request "/login" handler/main :post 
                  {:body (StringBufferInputStream. 
                          "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5185e8b8fd8a71fc80545e144f91faf2\" }") })
          pas (test-utils/populate-accounts)
          result (request "/accounts" handler/main :get {})] 
    
    ;; result should look like the following...
    ;; {:status 200, :headers {Content-Type text/html}, :body [{"counterWeight":"debit","name":"revenue","type":"revenue","id":"revenue","tag":"account"},{"counterWeight":"debit","name":"accounts payable","type":"liability","id":"accounts payable","tag":"account"},{"counterWeight":"debit","name":"expense","type":"expense","id":"expense","tag":"account"},{"counterWeight":"debit","name":"cash","type":"asset","id":"cash","tag":"account"}]}

    ;; ensure that we get even empty list of accounts
    (is (-> result :body nil? not))
    (is (-> result :body empty? not))
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= :account  (-> result       ;; this ensures that the body is a JSON string and that the tag is an account
                          :body 
                          clojure.data.json/read-json 
                          first
                          domain/keywordize-tags
                          :tag)))
  )
)
(comment deftest test-account-get
  
  ;; ensure that an error is returned if we try to get an account without being logged in
  (let  [ ruser (test-utils/add-user nil)
          rk (handler/init-handler)
          rlogin (request "/login" handler/main :post 
                  {:body (StringBufferInputStream. 
          "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5185e8b8fd8a71fc80545e144f91faf2\" }") })
          pas (test-utils/populate-accounts)
          result (request "/account/cash" handler/main :get {})] 
    
    (is (-> result :body nil? not))
    (is (-> result :body empty? not))
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= :account (->  :body       ;; this ensures that the body is a JSON string and that the tag is an account
                       result 
                       clojure.data.json/read-json 
                       domain/keywordize-tags
                       :tag)))
  )
)
(comment deftest test-account-update
  
  (let  [ ruser (test-utils/add-user nil)
          rlogin (request "/login" handler/main :post 
                  {:body (StringBufferInputStream. 
                          "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5185e8b8fd8a71fc80545e144f91faf2\" }") })
          ;;raccount (request "/account" handler/main :post {:body (java.io.File. "test/etc/data/test-account-asset.js")})
          pas (test-utils/populate-accounts)
          r1 (request "/account/cash" handler/main :get {})
        ] 
    
    ;; get the original 
    (is (= 200 (:status r1))) ;; ensure status is 200
    (is (= :account (-> r1       ;; this ensures that the body is a JSON string and that the tag is an account
                        :body 
                        clojure.data.json/read-json 
                        domain/keywordize-tags
                        :tag)))
    
    ;; update account 
    (let [r2 (request "/account/cash" handler/main :put
              {:body 
                (StringBufferInputStream. 
                  "{\"tag\":\"account\", \"type\":\"asset\", \"id\":\"cash\", \"name\":\"fubar\", \"counterWeight\":\"debit\"}")
              })]
      
      (is (= 200 (:status r2))) ;; ensure status is 200
      (is (= :account (-> r2       ;; this ensures that the body is a JSON string and that the tag is an account
                          :body 
                          clojure.data.json/read-json 
                          domain/keywordize-tags
                          :tag)))
      (is (= "fubar" (-> r2       ;; this ensures that the body is a JSON string and that the tag is an account
                         :body 
                         clojure.data.json/read-json 
                         domain/keywordize-tags
                         :name)))
    
    )
    
    ;; get the update  
    (let [r3 (request "/account/cash" handler/main :get {})]
      (is (= 200 (:status r3))) ;; ensure status is 200
      (is (= :account (-> r3       ;; this ensures that the body is a JSON string and that the tag is an account
                          :body 
                          clojure.data.json/read-json 
                          domain/keywordize-tags
                          :tag)))
      (is (= "fubar" (-> r3       ;; this ensures that the body is a JSON string and that the tag is an account
                         :body 
                         clojure.data.json/read-json 
                         domain/keywordize-tags
                         :name)))
    )
    
  )
)
(comment deftest test-account-delete
  
  (let  [ ruser (test-utils/add-user nil)
          ;;rlogin (request "/login" handler/main :post 
          ;;        {:body (StringBufferInputStream. 
          ;;                "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5185e8b8fd8a71fc80545e144f91faf2\" }") })
          pas (test-utils/populate-accounts)
          r1 (request "/account/cash" handler/main :get {})
        ] 
    
    (let [  r2 (request "/account/cash" handler/main :delete {:body nil })]
      (is (= 200 (:status r2))) ;; ensure status is 200
      (is (= :error (-> :body       ;; this ensures that the body is a JSON string and that the tag is an error
                        r2 
                        clojure.data.json/read-json 
                        domain/keywordize-tags
                        :tag)))
    )
    
    (let  [ rlogin (request "/login" handler/main :post 
                    {:body (StringBufferInputStream. 
                            "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5185e8b8fd8a71fc80545e144f91faf2\" }") })
            r3 (request "/account/cash" handler/main :delete {:body nil })
          ]
        
      (is (= 200 (:status r3))) ;; ensure status is 200
      (is (empty? (:body r3)))
    )
    
  )
)

