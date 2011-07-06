(ns http.handler
  (:use compojure.core)
  ;;(:use net.cgrand.enlive-html)
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [bjell]
            [clojure.contrib.duck-streams]
            )
)

#_(deftemplate index "public/index.html"
  
  []
  [:input#fuid] (do-> 
                  (content "Tim")
                  (set-attr :value "XXxxx"))
  [:input#barid] (do->
                  (content "Washington") 
                  (set-attr :value "ZZzzz"))
)


(defroutes main
  "Some core functions and thier URL mappings 
  
    (commands/get :accounts \"stub\")     ->  /accounts     -> /account/:id 
    (commands/get :bookkeeping \"stub\")  ->  /bookkeeping  -> /bookkeeping/:id 
    (commands/get :entries \"stub\")      ->  /entries      -> /entry/:id 
  "
  
  ;; ======
  ;; initialize the shell incl. DB connection 
  (bjell/init-shell)
  
  
  ;; ======
  ;; CRUD on User
  (POST "/user" [:as req]
    
    (println (str "POST ; /user/:id ; " req))
    (if-let [user (clojure.contrib.duck-streams/slurp* (:body req))]
      (.toString      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
        (bjell/add user)) ;; TODO - stubbing in 'stub' user for now
      (println "ERROR - POST body is nil")
    )
  )
  
  ;; ======
  ;; CRUD on Accounts
  (POST "/account" [:as req] 
    
    (println (str "POST ; /account ; " req))
    (bjell/add nil "stub") ;; TODO - stubbing in 'stub' user for now
  )
  (GET "/accounts" [] (str "{}"))
  (GET "/account/:id" [id] (str "{}"))
  (PUT "/account/:id" [id :as req]
    
    (println (str "PUT ; /account/:id ; " req))
    (if-let [body (clojure.contrib.duck-streams/slurp* (:body req))]
      (.toString      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
        (bjell/update body "stub")) ;; TODO - stubbing in 'stub' user for now
      (println "ERROR - PUT body is nil")
    )
  )
  (DELETE "/account/:id" [id] (str "{}"))
  
  
  ;; ======
  ;; CRUD on Bookkeeping
  (GET "/bookkeeping:id" [id]
    (str "{}"))
  
  
  ;; ======
  ;; CRUD on Entries
  (GET "/entries" []
    (str "{}"))
  (GET "/entry" [id]
    (str "{}"))
  
  
  (route/resources "/")
  (route/not-found "Page not found")
)


(def app
  (handler/site main))


