(ns bkell

  (:import java.io.FileReader)
  (:require [commands.add]
            [commands.get]
            [commands.update]
            [commands.remove]
            [commands.authenticate]
            [domain]
            [util])
)


(defn init-shell [] 
  (def shell (ref { :active true })) 	;; the shell and memory 
)


(defn add [artifact-p & etal]
  
  (let [  logged-in-user (commands/logged-in-user)]
    (if (and  (-> logged-in-user nil?)  ;; we want to see a logged-in-user 
              (-> artifact-p :tag (= :user) not) ;; you do not have to be authenticated to add a user 
        )
      (util/generate-error-response "User is not authenticated")
      (eval `(commands/add (domain/keywordize-tags ~artifact-p) ~@etal))
    )
  )
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



