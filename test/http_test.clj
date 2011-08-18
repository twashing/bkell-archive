(ns http-test
  
	(:require [bkell])
      
    (:require test-utils)
    (:use [clojure.test])
    (:use somnium.congomongo)
	(:require clojure.contrib.str-utils)
    (:require clojure.contrib.logging)
    ;;(:require debug)
    (:require bkell)
)




#_(defroutes main
  "Some core functions and thier URL mappings 
  
    (commands/get :accounts \"stub\")     ->  /accounts     -> /account/:id 
    (commands/get :bookkeeping \"stub\")  ->  /bookkeeping  -> /bookkeeping/:id 
    (commands/get :entries \"stub\")      ->  /entries      -> /entry/:id 
  "
  
  
  (GET "/" []   ;; index is the default page of the application 
  (GET "/register" []   ;; return static register.html page 
  


  ;; *** These functions have to work after someone has authenticated 
  ;;... create authentication function 
  ;; try google / OpenID approach 
  
  
  ;; ======
  ;; CRUD on User
  (POST "/user" [:as req]
  
  ;; ======
  ;; CRUD on Accounts
  (POST "/account" [:as req] 
  (GET "/accounts" [] (str "{}"))
  (GET "/account/:id" [id] (str "{}"))
  (PUT "/account/:id" [id :as req]
  (DELETE "/account/:id" [id] (str "{}"))
  
  
  ;; ======
  ;; CRUD on Bookkeeping
  (GET "/bookkeeping:id" [id]
  
  
  ;; ======
  ;; CRUD on Entries
  (GET "/entries" []
  (GET "/entry" [id]
  
  
  (route/files "/")
  (route/resources "/")
  (route/not-found "Page not found")
)


