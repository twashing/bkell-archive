(ns bjell

  (:import java.io.FileReader)
  (:require bkell)
  ;;(:require commands.add)
  ;;(:require commands.get)
  ;;(:require commands.update)
  ;;(:require commands.remove)
  (:require clojure.data.json)
  (:require domain)

  (:use somnium.congomongo)
  (:use clojure.contrib.debug)
)


#_(defn init-shell [] 
  
  (somnium.congomongo/mongo! :db "bkell") ;; connect to mongodb
  (def shell (ref { :active true })) 	;; the shell and memory 
)


(defn add [artifact & etal]
  "artifact - input can be JSON String or Reader"
  
  (let  [ artifact-p (domain/keywordize-tags (clojure.data.json/read-json artifact))]

    (clojure.data.json/json-str 
      (domain/bsonid-to-id
        (eval `(bkell/add ~artifact-p ~@etal)) ))
  )
)


(defn get [akey & etal]
  "akey - input is a String"
    
    (clojure.data.json/json-str 
      (domain/bsonid-to-id
        (eval `(bkell/get ~akey ~@etal))))
    
)

(defn update [artifact & etal]
  "artifact - input can be JSON String or Reader"
  
  (let  [ artifact-p (domain/keywordize-tags (clojure.data.json/read-json artifact))]
    (eval `(bkell/update ~artifact-p ~@etal)))
)

(defn remove [akey & etal]
  "akey - input is a String"
  
  (eval `(bkell/remove akey ~@etal))
)

(defn login [user]
  (let  [ user-p (domain/keywordize-tags (clojure.data.json/read-json user))]
    (-> user-p bkell/login domain/bsonid-to-id clojure.data.json/json-str))

)

