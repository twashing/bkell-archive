(ns bkell

  (:import java.io.FileReader)
  (:import java.lang.AssertionError)
  (:require [bkell.domain]
            [bkell.util]
            [bkell.commands.add]
            [bkell.commands.update]
            [bkell.commands.get]
            [bkell.commands.remove]
            [bkell.commands.authenticate])
)


(defn init-shell [] 
  (somnium.congomongo/mongo! :db "bkell") ;; connect to mongodb
  (def shell (ref { :active true })) 	;; the shell and memory 
)


(defn add [artifact-p & etal]
  
  (let [  logged-in-user (bkell.commands/logged-in-user)]

    (if (-> logged-in-user nil?)  ;; we want to see a logged-in-user 
      (if (-> artifact-p :tag (= :user) not) ;; you do not have to be authenticated to add a user 
        (bkell.util/generate-error-response "User is not authenticated")
        (eval `(bkell.commands/add (bkell.domain/keywordize-tags ~artifact-p) ~@etal))
      )
      (eval `(bkell.commands/add (bkell.domain/keywordize-tags ~artifact-p) ~@etal))
    )
  )
)

(defn get [akey & etal]
  
  (let [  logged-in-user (bkell.commands/logged-in-user)]
    (if (-> logged-in-user nil?)  ;; we want to see a logged-in-user 
      (bkell.util/generate-error-response "User is not authenticated")
      (eval `(bkell.commands/get ~akey ~@etal))  ;; ensure result is not nil before returning
    )
  )
)

(defn update [artifact-p & etal]
  
  (let [  logged-in-user (bkell.commands/logged-in-user)]
    (if (-> logged-in-user nil?)  ;; we want to see a logged-in-user 
      (bkell.util/generate-error-response "User is not authenticated")
      (bkell.domain/keywordize-tags 
        (eval `(bkell.commands/update (bkell.domain/keywordize-tags ~artifact-p) ~@etal)))
    )
  )
)

(defn remove [entity & etal]
  (let [  logged-in-user (bkell.commands/logged-in-user)]
    (if (-> logged-in-user nil?)  ;; we want to see a logged-in-user 
      (bkell.util/generate-error-response "User is not authenticated")
      (eval `(bkell.commands/removek ~entity ~@etal))
    )
  )
)

(defn login [user]
  { :pre  [ (-> user nil? not)
            (-> user :username nil? not)
            (-> user :password nil? not)
          ] }
  
  (try 
    (bkell.commands/login-user user) 
    (catch java.lang.AssertionError e (bkell.util/generate-error-responses (str "Error logging in: " (.getMessage e))))
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
