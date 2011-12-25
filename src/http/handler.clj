(ns http.handler
  
  (:use [compojure.core]
        [debug]
        [sandbar.stateful-session]
        [hozumi.session-expiry]
  )
  
  ;;(:use net.cgrand.enlive-html)
  (:import [java.io FileReader]
           [java.net URLEncoder]
  ) 
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [bjell]
            [bkell]
            [commands.authenticate]
            [clojure.contrib.duck-streams :as duck-streams]
            [clojure.data.json :as json]
            [clojure.pprint :as pprint]
            [ring.middleware.file :as ring-file]
            [ring.util.response :as response]
            [util]
            [clj-http.client :as client]
            [clojure.contrib.duck-streams :as dstreams]
            [net.cgrand.enlive-html :as enlive]
            )
  
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
    (merge input { :body (json/json-str body) })
    (json/json-str input))
)

(defn encode-params [request-params]
  (let [encode #(URLEncoder/encode (str %) "UTF-8")
        coded (for [[n v] request-params] (str (encode (name n)) "=" (encode
                                                               v)))]
        (apply str (interpose "&" coded))))

(defn callbackHandlerCommon [method req]
  
    ;; needs to call 'verifyAssertion' to parse response - should return a { :user :map }
    (let [  ruri "http://172.16.210.144:3000/callbackGitkit" 
            pbody (encode-params (:params req))
            final-body (clojure.data.json/json-str { :requestUri ruri :postBody pbody })
            print1 (println (str "final-body:[" final-body "]"))
            verify-resp (client/post
                    "https://www.googleapis.com/identitytoolkit/v1/relyingparty/verifyAssertion?key=AIzaSyDc7_lGZsmbtdOUpprPClKBOxXCQ6LztRE"
                    { :body final-body
                      :content-type :json
                    })
            print2 (println (str "verify-resp " verify-resp))
            
         ]
      
        ; check if user exists ; add to DB if not 
        ; ** bjell will throw an AssertionError if user already exists 
        (try 
          (let [verify-sexp (-> verify-resp :body clojure.data.json/read-json (merge { :exists false }))
                vjson (println (str "from-verify-JSON" verify-sexp))
                add-resp (bkell/add {  :tag :user
                                       :username (:verifiedEmail verify-sexp)
                                       :password ""
                                       :content 
                                         [{  :tag :profileDetails,
                                             :content
                                             [{:tag :profileDetail,
                                               :name "first.name", 
                                               :value (:firstName verify-sexp),
                                               :content nil}
                                              {:tag :profileDetail,
                                               :name "last.name", 
                                               :value (:lastName verify-sexp),
                                               :content nil}
                                              {:tag :profileDetail,
                                               :name "email", 
                                               :value (:verifiedEmail verify-sexp),
                                               :content nil}
                                              {:tag :profileDetail,
                                               :name "country", 
                                               :value "",
                                               :content nil}]}]
                                    })]
            
            (println (str "add-resp: " add-resp))
            
            (merge verify-sexp { :exists true })
            ; log the user in ; session should die after some inactivity 
            ;;(session-put! :current-user add-resp)
            
          )
          (catch java.lang.Exception ae (println (str "Not adding this user as it already exists:  " ae))))
        
      
      ; FINAL - return verify-resp
      (-> verify-resp :body clojure.data.json/read-json (merge { :exists false }))
    )
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
    (response/file-response "index.html" { :root "public" }))
  (GET "/register" []   ;; return static register.html page 
   (response/file-response "register.html" { :root "public" }))
  (POST "/login" [:as req] 
    
    (println (str "POST ; /login ; " req))
    (if-let [user (duck-streams/slurp* (:body req))]
      
      (try
        (let  [ result (-> user bjell/login (handle-errors 400) substitute-body )]
              
          (if (:status result)  ;; if there's already a status, that means there's been an error somewhere 
              result 
              { :status 302 :headers { "Location" "/bookkeeping/main-bookkeeping" } :body result })
        )
        (catch Exception e (clojure.data.json/json-str (util/wrap-error-msg (.getMessage e) 500))))
      (clojure.data.json/json-str (util/wrap-error-msg "POST body is nil" 400))
    )
  )
  
  
  ;; ======
  ;; ACCOUNT CHOOSER (GITkit) URL handlers
  (GET "/callbackGitkit" [:as req]
    (callbackHandlerCommon "GET" req))
  (POST "/callbackGitkit" [:as req]
    
    (let  [ cb-resp (callbackHandlerCommon "POST" req)
            one (println (str "cb-resp: " cb-resp))
            templ (enlive/html-resource "include/callbackUrlSuccess.html")
            notify-input { :email (:verifiedEmail cb-resp) :registered (-> cb-resp :exists str) }
            notify-input-str (clojure.data.json/json-str notify-input)
          ]
      
      (apply str (enlive/emit*  (enlive/transform 
                                  templ
                                  [[ :script (enlive/nth-of-type 3) ]]  ;; get the 3rd script tag 
                                  (enlive/content (str "window.google.identitytoolkit.notifyFederatedSuccess(" notify-input-str ");")))
      ))
    )
  )
  
  ;; TODO 
  (POST "/userStatusUrl" [:as req]
        ;; parse request
        ;; user email
    { "registered" false }
  )
  (POST "/loginUrl" [:as req]
    { "status" "OK" }
  )
  (GET "/landing" [:as req]
    (response/file-response "landing.html" { :root "public" })
  )
  
  
  ;; ======
  ;; CRUD on User
  (POST "/user" [:as req]
    
    (println (str "POST ; /user/ ; " req))
    (if-let [user (duck-streams/slurp* (:body req))]
      (try
        (let  [result (-> user bjell/add bkell/login :logged-in-user (handle-errors 400) substitute-body ) ]
          (if (:status result)  ;; if there's already a status, that means there's been an error somewhere 
              result 
              { :status 302 :headers { "Location" "/bookkeeping/main-bookkeeping" } :body result })
        )
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


(def app
  (-> main 
      handler/site
      ;;(wrap-session-expiry 3600)  ;; 1 hour 
      ;;wrap-stateful-session))
      ))

#_(def app
  (handler/site main))


