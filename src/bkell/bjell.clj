(ns bkell.bjell

  (:import java.io.FileReader)
  (:use somnium.congomongo)
  (:require [bkell.bkell]
            [clojure.data.json]
            [bkell.domain]
            [bkell.util])

)


(defn init-shell [] 
  (bkell.bkell/init-shell) 	;; the shell and memory 
)

(defn generate-id [entity]

  (if (-> entity :id nil? not) 
    entity
    (merge entity { :id (:name entity) }) ) ;; give the entity, an id of it's name 
)

(defn add [artifact & etal]
  "artifact - input can be JSON String or Reader"
  
  (let  [ artifact-p (-> artifact clojure.data.json/read-json bkell.domain/keywordize-tags generate-id)]

      (bkell.domain/bsonid-to-id
        (eval `(bkell.bkell/add ~artifact-p ~@etal)) )
  )
)

;; java.rmi.dgc.VMID iid = new java.rmi.dgc.VMID();

(defn get [akey & etal]
  "akey - input is a String"
    (let [result (eval `(bkell.bkell/get ~akey ~@etal))]

      (if (or (vector? result)
              (list? result)
              (empty? result))
        result
        (bkell.domain/bsonid-to-id result)
      )
    )
)

(defn update [artifact & etal]
  "artifact - input can be JSON String or Reader"
  
  (let  [ artifact-p (bkell.domain/keywordize-tags (clojure.data.json/read-json artifact))]
    (bkell.domain/bsonid-to-id
      (eval `(bkell.bkell/update ~artifact-p ~@etal)) )
  )
)

(defn remove [entity & etal]
  "entity - input is a String"
  
    (let [result (eval `(bkell.bkell/remove ~entity ~@etal))]
      result
      #_(if (-> result nil? not)
        (clojure.data.json/json-str result)
        result
      )
    )
)

(defn login [user]
  (let  [ user-p (bkell.domain/keywordize-tags (clojure.data.json/read-json user))]
    (-> user-p bkell.bkell/login bkell.domain/bsonid-to-id ))

)

