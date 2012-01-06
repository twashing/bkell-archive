(ns bkell

  (:import java.io.FileReader)
  (:import java.lang.AssertionError)
  (:require [domain]
            [util]
            [commands.add]
            [commands.update]
            [commands.get]
            [commands.remove]
            [commands.authenticate])
)


(defn init-shell [] 
  (somnium.congomongo/mongo! :db "bkell") ;; connect to mongodb
  (def shell (ref { :active true })) 	;; the shell and memory 
)


(defn add [artifact-p & etal]
  
  (let [  logged-in-user (commands/logged-in-user)]

    (if (-> logged-in-user nil?)  ;; we want to see a logged-in-user 
      (if (-> artifact-p :tag (= :user) not) ;; you do not have to be authenticated to add a user 
        (util/generate-error-response "User is not authenticated")
        (eval `(commands/add (domain/keywordize-tags ~artifact-p) ~@etal))
      )
      (eval `(commands/add (domain/keywordize-tags ~artifact-p) ~@etal))
    )
  )
)

(defn get [akey & etal]
  
  (let [  logged-in-user (commands/logged-in-user)]
    (if (-> logged-in-user nil?)  ;; we want to see a logged-in-user 
      (util/generate-error-response "User is not authenticated")
      (eval `(commands/get ~akey ~@etal))  ;; ensure result is not nil before returning
    )
  )
)

(defn update [artifact-p & etal]
  
  (let [  logged-in-user (commands/logged-in-user)]
    (if (-> logged-in-user nil?)  ;; we want to see a logged-in-user 
      (util/generate-error-response "User is not authenticated")
      (domain/keywordize-tags 
        (eval `(commands/update (domain/keywordize-tags ~artifact-p) ~@etal)))
    )
  )
)

(defn remove [entity & etal]
  (let [  logged-in-user (commands/logged-in-user)]
    (if (-> logged-in-user nil?)  ;; we want to see a logged-in-user 
      (util/generate-error-response "User is not authenticated")
      (eval `(commands/removek ~entity ~@etal))
    )
  )
)

(defn login [user]
  { :pre  [ (-> user nil? not)
            (-> user :username nil? not)
            (-> user :password nil? not)
          ] }
  
  (try 
    (commands/login-user user) 
    (catch java.lang.AssertionError e (util/generate-error-responses (str "Error logging in: " (.getMessage e))))
  )
)


(defn -main [& args]
    
  (ns bkell) 
  (use 'bkell) 
  (init-shell) 
  
  (println "-main CALLED")
  (require 'clojure.main)
  (clojure.main/repl)
  
)


;;(-main)
