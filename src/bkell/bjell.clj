(ns bjell

  (:import java.io.FileReader)
  (:use somnium.congomongo)
  ;;(:use clojure.contrib.debug)
  
  (:require [bkell]
            [clojure.data.json]
            [domain]
            [util])

)


(defn init-shell [] 
  (bkell/init-shell) 	;; the shell and memory 
)

(defn generate-id [entity]

  (if (-> entity :id nil? not) 
    entity
    (merge entity { :id (:name entity) }) ) ;; give the entity, an id of it's name 
)

(defn add [artifact & etal]
  "artifact - input can be JSON String or Reader"
  
  (let  [ artifact-p (-> artifact clojure.data.json/read-json domain/keywordize-tags generate-id)]

      (domain/bsonid-to-id
        (eval `(bkell/add ~artifact-p ~@etal)) )
  )
)

;; java.rmi.dgc.VMID iid = new java.rmi.dgc.VMID();

(defn get [akey & etal]
  "akey - input is a String"
    (let [result (eval `(bkell/get ~akey ~@etal))]

      (if (or (vector? result)
              (list? result)
              (empty? result))
        result
        (domain/bsonid-to-id result)
      )
    )
)

(defn update [artifact & etal]
  "artifact - input can be JSON String or Reader"
  
  (let  [ artifact-p (domain/keywordize-tags (clojure.data.json/read-json artifact))]
    (domain/bsonid-to-id
      (eval `(bkell/update ~artifact-p ~@etal)) )
  )
)

(defn remove [entity & etal]
  "entity - input is a String"
  
    (let [result (eval `(bkell/remove ~entity ~@etal))]
      result
      #_(if (-> result nil? not)
        (clojure.data.json/json-str result)
        result
      )
    )
)

(defn login [user]
  (let  [ user-p (domain/keywordize-tags (clojure.data.json/read-json user))]
    (-> user-p bkell/login domain/bsonid-to-id ))

)

