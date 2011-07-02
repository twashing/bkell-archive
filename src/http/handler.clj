(ns http.handler
  (:use compojure.core)
  ;;(:use net.cgrand.enlive-html)
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [bjell])
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
  ;;(GET "/" [] (index))

  ;; ======
  ;; CRUD on Accounts
  (POST "/account" [body :as req] 
    
    (println (str "POST ; /account ; " req))
    (bjell/add body "stub") ;; TODO - stubbing in 'stub' user for now
  )
  (GET "/accounts" [] (str "{}"))
  (GET "/account/:id" [id] (str "{}"))
  (PUT "/account/:id" [id body :as req] 
    
    (println (str "PUT ; /account/:id ; " req))
    (println (str "Body... " body))
    (bjell/update body "stub") ;; TODO - stubbing in 'stub' user for now
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


