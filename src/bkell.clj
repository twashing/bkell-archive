(ns bkell

  (:import java.io.FileReader)
  (:import java.lang.AssertionError)
  (:require domain)
  (:require util)
  (:require commands.add)
  (:require commands.update)
  (:require commands.get)
  (:require commands.remove)
  (:require commands.authenticate)
)


(defn init-shell [] 
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
      (if-let [result (eval `(commands/get ~akey ~@etal))]  ;; ensure result is not nil before returning
        (domain/keywordize-tags result))
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

(defn remove [akey & etal]
  (let [  logged-in-user (commands/logged-in-user)]
    (if (-> logged-in-user nil?)  ;; we want to see a logged-in-user 
      (util/generate-error-response "User is not authenticated")
      (eval `(commands/removek ~akey ~@etal))
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
    (catch java.lang.AssertionError e (util/generate-error-responses "Error logging in"))
  )
)


(defn -main [& args]
    
  (ns bkell) 
  (use 'bkell) 
  (init-shell) 
  (require 'somnium.congomongo) 
  (somnium.congomongo/mongo! :db "bkell") 
  
  ;;(require 'clojure.main)
  ;;(clojure.main/repl)
  
)


