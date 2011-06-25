(ns bjell

  (:import java.io.FileReader)
  (:require commands.add)
  ;;(:require commands.get)
  ;;(:require commands.update)
  ;;(:require commands.remove)
  (:require clojure.contrib.json)
  (:require domain)
)


(defn init-shell [] 
  (def shell (ref { :active true })) 	;; the shell and memory 
)


(defn add [artifact & etal]
  
  ;;(let  [processed (domain/keywordize-tags (clojure.contrib.json/read-json (FileReader. "user.js")))]
  (let  [ artifact-p (domain/keywordize-tags artifact)]

    (println (str "Rock With You... " artifact-p))
    (eval `(commands/add ~artifact-p ~@etal))
  )
)

(defn get [akey & etal]
  (eval `(commands/get akey ~@etal))
)

(defn update [artifact & etal]
  
  (let  [ artifact-p (domain/keywordize-tags (clojure.contrib.json/read-json artifact))]
    (eval `(commands/update ~artifact-p ~@etal))
  )
)

(defn remove [akey & etal]
  (eval `(commands/remove akey ~@etal))
)



