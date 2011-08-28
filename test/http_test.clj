(ns http-test
  
    (:use clojure.test)
    (:use somnium.congomongo)
	(:require clojure.contrib.str-utils)
    (:require clojure.contrib.logging)
    ;;(:require debug)
    (:require test-utils)
    (:require [http.handler :as handler])
)


(defn request [resource defroutes-fn method & params]
  (defroutes-fn {:request-method method :uri resource :params (first params)})
)


(deftest test-index 

    (let [result (request "/" handler/main :get {})]  
      (is (= 200 (:status result)))  ;; assert that i. status is 200, the index page has ii. a link to register page iii. inputs for login 
      (is (= "index.html" (->> :body result .getName)))
    )
)

(deftest test-register-get

    (let [result (request "/register" handler/main :get {})]  
      (is (= 200 (:status result)))  ;; return static register.html page; assert that i. status is 200, register page has ii. inputs for registering
      (is (= "register.html" (->> :body result .getName)))
    )
)


#_(defroutes main
  

  ;; *** These functions have to work after someone has authenticated 
  ;;... create authentication function 
  ;; try google / OpenID approach 
  
  
  ;; ======
  ;; CRUD on User
  (POST "/user" [:as req]) ;; assert i. 200, ii. user was created iii. user JSON is returned 
  
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


