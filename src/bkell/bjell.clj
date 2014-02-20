(ns bkell.bjell

  (:import java.io.FileReader)
  (:require [bkell.bkell]
            [clojure.data.json]
            [bkell.domain]
            [bkell.util])

)


(defn init-shell [mode & extend-params]
  (bkell.bkell/init-shell mode (first extend-params)) 	;; the shell and memory 
)

(defn generate-id [entity]

  (if (-> entity :id nil? not) 
    entity
    (merge entity { :id (:name entity) }) ) ;; give the entity, an id of it's name 
)

(defn add [artifact & etal]
  "artifact - input can be JSON String or Reader"
  
  (let  [ artifact-p (bkell.domain/keywordize-tags (clojure.data.json/read-json artifact))]
    (eval `(bkell.bkell/add ~artifact-p ~@etal))
  )
)
  

(defn getk [akey & etal]
  "akey - input is a String"
    (let [result (eval `(bkell.bkell/getk ~akey ~@etal))]

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
    (eval `(bkell.bkell/update ~artifact-p ~@etal))
  )
)

(defn removek [entity & etal]
  "entity - input is a String"
  
    (let [result (eval `(bkell.bkell/removek ~entity ~@etal))]
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

