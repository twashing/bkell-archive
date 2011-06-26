(ns bjell

  (:import java.io.FileReader)
  (:require commands.add)
  (:require commands.get)
  ;;(:require commands.update)
  ;;(:require commands.remove)
  (:require clojure.contrib.json)
  (:require domain)

  ;;(:use clojure.contrib.debug)
)


(defn init-shell [] 
  (def shell (ref { :active true })) 	;; the shell and memory 
)


(defn add [artifact & etal]
  "artifact - input can be JSON String or Reader"
  
  (let  [ artifact-p (domain/keywordize-tags (clojure.contrib.json/read-json artifact))]

    (eval `(commands/add ~artifact-p ~@etal))
  )
)

(defn get [akey & etal]
  "akey - input is a String"
  
  ;;(debug-repl)
  (eval `(commands/get ~akey ~@etal))
)

(defn update [artifact & etal]
  "artifact - input can be JSON String or Reader"
  
  (let  [ artifact-p (domain/keywordize-tags (clojure.contrib.json/read-json artifact))]
    (eval `(commands/update ~artifact-p ~@etal))
  )
)

(defn remove [akey & etal]
  "akey - input is a String"
  
  (eval `(commands/remove akey ~@etal))
)



