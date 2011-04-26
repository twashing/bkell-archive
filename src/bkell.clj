(ns bkell

  (:import java.io.FileReader)
  (:require commands.add)
  ;;(:require commands.get)
  ;;(:require commands.update)
  ;;(:require commands.remove)
  (:require debug)
)


(defn init-shell [] 
  (def shell (ref { :active true })) 	;; the shell and memory 
)

(defn add [artifact & etal]
  
  (let  [json (clojure.contrib.json/read-json (FileReader. "user.js"))]

    (debug/debug-repl)
    ;; TODO - turn tag strings into :keywords 
    (eval `(commands/add ~json ~@etal))
  )
)

;;(defmethod add :user [user] (add-user user))
;;(defmethod add :currency [currency & etal] (add-currency currency (first etal) (second etal)))   ;; input arguments are: currency uname default
;;(defmethod add :account [account & etal] (add-account account (first etal)))  ;; input arguments are: account uname 
;;(defmethod add :entry [entry & etal] (add-entry entry (first etal)))  ;; input arguments are: entry uname 

