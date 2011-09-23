(ns http.handler

  (:use [compojure.core]
  )
  ;;(:use net.cgrand.enlive-html)
  (:import java.io.FileReader)
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [bjell]
            [bkell]
            [commands.authenticate]
            [clojure.contrib.duck-streams :as duck-streams]
            [clojure.data.json :as json]
            [ring.middleware.file :as ring-file]
            [ring.util.response :as response]
            [util])
)


(defn init-handler []
  
  ;; initialize the shell incl. DB connection 
  (bjell/init-shell)
)
 

(defn handle-errors [result status]
  
  (if (or (= :error (:tag result))
          (= :errors (:tag result)))
    (util/wrap-error result status)
    result
  )
)
(defn substitute-body [input]
  
  (if-let [body (:body input)]
    (merge input { :body (clojure.data.json/json-str body) })
    (clojure.data.json/json-str input))
)


(defroutes main
  "Some core functions and their URL mappings 
    
    (commands/get :accounts \"stub\")     ->  /accounts     -> /account/:id 
    (commands/get :bookkeeping \"stub\")  ->  /bookkeeping  -> /bookkeeping/:id 
    (commands/get :entries \"stub\")      ->  /entries      -> /entry/:id 
  "
  
  (init-handler)
  
  ;; ======
  ;; REGISTER & LOGIN
  (GET "/" []   ;; index is the default page of the application 
    (ring-file/wrap-file "index.html" "public"))
  (GET "/register" []   ;; return static register.html page 
    (response/file-response "register.html" { :root "public" }))
  (POST "/login" [:as req] 
    
    (println (str "POST ; /login ; " req))
    (if-let [user (duck-streams/slurp* (:body req))]
      
      (try
        (-> user bjell/login (handle-errors 400) substitute-body )
        (catch Exception e (clojure.data.json/json-str (util/wrap-error-msg (.getMessage e) 500))))
      (clojure.data.json/json-str (util/wrap-error-msg "POST body is nil" 400))
    )
  )
  
  
  ;; ======
  ;; CRUD on User
  (POST "/user" [:as req]
    
    (println (str "POST ; /user/ ; " req))
    (if-let [user (duck-streams/slurp* (:body req))]
      (try
        (let  [result (-> user bjell/add bkell/login :logged-in-user (handle-errors 400) substitute-body ) ]
          { :status 302 :location "/bookkeeping/main-bookkeeping" :body result })
        (catch Exception e (-> e .getMessage (util/wrap-error-msg 500) substitute-body )))
      (-> "POST body is nil" (util/wrap-error-msg 400) substitute-body)
    )
  )
  (DELETE "/user/:id" [id] 
    
    (println (str "DELETE ; /user/:id ; " id))
    (let [lin-user (commands/logged-in-user)]
      
      (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
        lin-user (bjell/remove id) (handle-errors 400) substitute-body) ;; TODO - stubbing in 'stub' user for now
    )
  )
  
  
  ;; ======
  ;; CRUD on Accounts
  (POST "/account" [:as req] 
    
    (println (str "POST ; /account ; " req))
    (let [lin-user (commands/logged-in-user)]
      (if-let [body (duck-streams/slurp* (:body req))]
        (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
          body (bjell/add (:username lin-user)) (handle-errors 400) substitute-body) ;; TODO - stubbing in 'stub' user for now
        (println "ERROR - POST body is nil")
      )
    )
  )
  (GET "/accounts" [:as req] 
    
    (println (str "GET ; /accounts ; " req))
    (let [lin-user (commands/logged-in-user)]
      
      (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
        (bjell/get :accounts (:username lin-user)) (handle-errors 400) substitute-body) ;; TODO - stubbing in 'stub' user for now
    )
  )
  (GET "/account/:id" [id] 
    
    (println (str "GET ; /accounts/:id ; " id))
    (let [lin-user (commands/logged-in-user)]
      
      (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
        (bjell/get :account (:username lin-user) id ) (handle-errors 400) substitute-body) ;; TODO - stubbing in 'stub' user for now
    )
  )
  (PUT "/account/:id" [id :as req]
    
    (println (str "PUT ; /account/:id ; " req))
    (let [lin-user (commands/logged-in-user)]
      (if-let [body (duck-streams/slurp* (:body req))]
        (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
          (bjell/update body (:username lin-user) ) (handle-errors 400) substitute-body) ;; TODO - stubbing in 'stub' user for now
        (println "ERROR - PUT body is nil")
      )
    )
  )
  (DELETE "/account/:id" [id] 
    
    (println (str "DELETE ; /account/:id ; " id))
    (let [lin-user (commands/logged-in-user)]
      
      (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
        lin-user (bjell/remove id) (handle-errors 400) substitute-body) ;; TODO - stubbing in 'stub' user for now
    )
  )
  
  
  ;; ======
  ;; CRUD on Bookkeeping
  (GET "/bookkeeping/:id" [id]
     
    (println (str "GET ; /bookkeeping/:id ; " id))
    (let [lin-user (commands/logged-in-user)]
      
      (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
        (bjell/get :bookkeeping (:username lin-user) id ) (handle-errors 400) substitute-body) ;; TODO - stubbing in 'stub' user for now
    )
  )
  
  
  ;; ======
  ;; CRUD on Entries
  (POST "/entry" [:as req] 
    
    (println (str "POST ; /entry ; " req))
    (let [lin-user (commands/logged-in-user)]
      (if-let [body (duck-streams/slurp* (:body req))]
        (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
          body (bjell/add (:username lin-user)) (handle-errors 400) substitute-body) ;; TODO - stubbing in 'stub' user for now
        (println "ERROR - POST body is nil")
      )
    )
  )
  (GET "/entries" [:as req] 
    
    (println (str "GET ; /entries ; " req))
    (let [lin-user (commands/logged-in-user)]
      
      (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
        (bjell/get :entries (:username lin-user)) (handle-errors 400) substitute-body) ;; TODO - stubbing in 'stub' user for now
    )
  )
  (GET "/entry/:id" [id] 
    
    (println (str "GET ; /entries/:id ; " id))
    (let [lin-user (commands/logged-in-user)]
      
      (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
        (bjell/get :entry (:username lin-user) id ) (handle-errors 400) substitute-body) ;; TODO - stubbing in 'stub' user for now
    )
  )
  (PUT "/entry/:id" [id :as req]
    
    (println (str "PUT ; /entry/:id ; " req))
    (let [lin-user (commands/logged-in-user)]
      (if-let [body (duck-streams/slurp* (:body req))]
        (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
          body (bjell/update (:username lin-user) ) (handle-errors 400) substitute-body) ;; TODO - stubbing in 'stub' user for now
        (println "ERROR - PUT body is nil")
      )
    )
  )
  (DELETE "/entry/:id" [id] 
    
    (println (str "DELETE ; /entry/:id ; " id))
    (let [lin-user (commands/logged-in-user)]
      
      (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
        lin-user (bjell/remove id ) (handle-errors 400) substitute-body) ;; TODO - stubbing in 'stub' user for now
    )
  )
  
  
  ;; ======
  ;; CRUD on Bookkeeping
  (GET "/bookkeeping/:id" [id]
     
    (println (str "GET ; /bookkeeping/:id ; " id))
    (let [lin-user (commands/logged-in-user)]
      
      (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
        (bjell/get :bookkeeping (:username lin-user) id ) (handle-errors 400) substitute-body) ;; TODO - stubbing in 'stub' user for now
    )
  )
  
  
  
  (route/files "/")
  (route/resources "/")
  (route/not-found "Page not found")
  ;;(ANY "/*" [path]    ;; for any other route or page that compojure cannot find 
    ;;(redirect "/"))
)


#_(def app
  (-> #'handler/site
      (ring-file/wrap-file "public")
      main))
(def app
  (handler/site main))


