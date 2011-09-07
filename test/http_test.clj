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
          ruser (request "/user" handler/main :post {:body (java.io.File. "test/etc/data/stubu-one.js")})
          result (request "/login" handler/main :post 
                  {:body (StringBufferInputStream. 
                          "{ \"tag\":\"user\", \"username\":\"stub\", \"password\":\"5f4dcc3b5aa765d61d8327deb882cf99\" }") })
        ] 
    
    (println "... " result)
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= :user (->   result       ;; this ensures that the body is a JSON string and that the tag is an error
                       :body 
                       clojure.data.json/read-json 
                       domain/keywordize-tags
                       :tag)))
  )
)

(deftest test-account-add
  
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
#_(deftest test-account-get 
  
  ;; ensure that an error is returned if we try to get accounts without being logged in
  #_(let [ eresult (bjell/add currency "stub" false)]
    
    (is (-> eresult nil? not))
    (is (-> eresult clojure.data.json/read-json domain/keywordize-tags :tag (= :error)))
  )
    
  (let [result (request "/accounts" handler/main :GET nil)]
    
    (is (= 200 (:status result))) ;; ensure status is 200
    (is (= :error (->  :body       ;; this ensures that the body is a JSON string and that the tag is an error
                       result 
                       clojure.data.json/read-json 
                       domain/keywordize-tags
                       :tag)))
  )
)

#_(defroutes main
  

  ;; *** These functions have to work after someone has authenticated 
  ;;... create authentication function 
  ;; try google / OpenID approach 
  
  
  ;; ======
  ;; CRUD on Accounts
  (POST "/account" [:as req]) ;; assert i. only allowed w/ login ii. 200 ... 
  (GET "/accounts" [] (str "{}")) ;; assert i. only allowed w/ login ii. 200 ... 
  (GET "/account/:id" [id] (str "{}")) ;; assert i. only allowed w/ login ii. 200 ... 
  (PUT "/account/:id" [id :as req]) ;; assert i. only allowed w/ login ii. 200 ... 
  (DELETE "/account/:id" [id] (str "{}")) ;; assert i. only allowed w/ login ii. 200 ... 
  
  
  ;; ======
  ;; CRUD on Bookkeeping
  (GET "/bookkeeping:id" [id]) ;; assert i. only allowed w/ login ii. 200 ... 
  
  
  ;; ======
  ;; CRUD on Entries
  (GET "/entries" []) ;; assert i. only allowed w/ login ii. 200 ... 
  (GET "/entry" [id]) ;; assert i. only allowed w/ login ii. 200 ... 
  
  
  (route/files "/")
  (route/resources "/")
  (route/not-found "Page not found")
)


