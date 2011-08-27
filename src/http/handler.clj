(ns http.handler

  (:use [compojure.core]
  )
  ;;(:use net.cgrand.enlive-html)
  (:import java.io.FileReader)
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [bjell]
            [clojure.contrib.duck-streams :as duck-streams]
            [clojure.data.json :as json]
            [ring.middleware.file :as ring-file]
            [ring.util.response :as response]
  )
)


(defn- generate-error-response [ msg ]
  (merge { :tag :error } { :message msg }))
(defn- generate-error-responses [ & msgs ]
  { :tag :errors 
    :content  (reduce #(conj %1 (generate-error-response %2))
                [] msgs)
  }
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
  
  
  (GET "/" []   ;; index is the default page of the application 
    (ring-file/wrap-file "index.html" "public"))
  (GET "/register" []   ;; return static register.html page 
    (response/file-response "register.html" { :root "public" }))
  
  ;; ======
  ;; CRUD on User
  (POST "/user" [:as req]
    
    (println (str "POST ; /user/:id ; " req))
    (if-let [user (duck-streams/slurp* (:body req))]
      (try
        (.toString (bjell/add user)) 
        (catch Exception e (clojure.data.json/json-str (generate-error-responses (.getMessage e)))))
      (clojure.data.json/json-str (generate-error-responses "POST body is nil"))
    )
  )
  
  ;; ======
  ;; CRUD on Accounts
  (POST "/account" [:as req] 
    
    (println (str "POST ; /account ; " req))
    (if-let [body (duck-streams/slurp* (:body req))]
      (.toString      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
        (bjell/add body "stub")) ;; TODO - stubbing in 'stub' user for now
      (println "ERROR - POST body is nil")
    )
  )
  (GET "/accounts" [] (str "{}"))
  (GET "/account/:id" [id] (str "{}"))
  (PUT "/account/:id" [id :as req]
    
    (println (str "PUT ; /account/:id ; " req))
    (if-let [body (duck-streams/slurp* (:body req))]
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


