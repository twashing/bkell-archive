(ns http-test
  
  (:use clojure.test)
  (:use somnium.congomongo)
  (:require clojure.contrib.str-utils)
  (:require clojure.contrib.logging)
  (:require clojure.data.json)
  ;;(:require debug)
  (:require test-utils)
  (:require [http.handler :as handler])
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
    (is (= :user (->  :body       ;; this ensures that the body is a JSON string and that the tag is a user
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


