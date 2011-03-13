(ns commands

  (:require clojure.contrib.logging)
  (:use somnium.congomongo)
)



(defn add-user [user] 
  
  ;; check that there is not a duplicate user 
  (if (not (= (:username user) 
              (:username (first (fetch "users" :where { :username (:username user) })))))
    (insert! :users user)
    { :tag "error" :msg "There is a duplicate user" }
  )
)

(defn add-generic [db-base-URL db-system-DIR working-ITEM working-USER command-context]
)

