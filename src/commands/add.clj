(ns commands

  (:require clojure.contrib.logging)
  (:require helpers)
  (:use somnium.congomongo)
)




(defn add-user [user] 
  
  ;; check that there is not a duplicate user 
  (if (not (= (:username user) 
              (:username (first (fetch "users" :where { :username (:username user) })))))
    (do 
      (insert! :users (assoc user :password (helpers/md5-sum (:password user)))) ;; insert the user, after MD5 encrypting the password 
      (let [gr (load-file "etc/data/default.group.clj")]  ;; insert the associated group
        (insert! :groups (assoc gr :name (:username user) :owner (:username user))))
      (let [bk (load-file "etc/data/default.bookkeeping.clj")]  ;; insert the associated bookkeeping
        (insert! :bookkeeping (assoc bk :owner (:username user))))
    )
    { :tag "error" :msg "There is a duplicate user" }
  )
)

(defn add-generic [db-base-URL db-system-DIR working-ITEM working-USER command-context]
)

