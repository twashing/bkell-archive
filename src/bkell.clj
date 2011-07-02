(ns bkell

  (:import java.io.FileReader)
  (:require commands.add)
  (:require commands.get)
  (:require commands.update)
  (:require commands.remove)
  (:require domain)
)


(defn init-shell [] 
  (def shell (ref { :active true })) 	;; the shell and memory 
)


(defn add [artifact-p & etal]
  
  (eval `(commands/add (domain/keywordize-tags ~artifact-p) ~@etal))
)

(defn get [akey & etal]
  (eval `(commands/get akey ~@etal))
)

(defn update [artifact-p & etal]
  
  (eval `(commands/update (domain/keywordize-tags ~artifact-p) ~@etal))
)

(defn remove [akey & etal]
  (eval `(commands/remove akey ~@etal))
)



