(ns bkell.bkell

  (:import java.io.FileReader)
  (:import java.lang.AssertionError)
  (:require [bkell.domain]
            [bkell.util :as util]
            [bkell.commands.add :as addk]
            [bkell.commands.update :as updatek]
            [bkell.commands.get :as getk]
            [bkell.commands.remove :as removek]
            [bkell.commands.authenticate :as authenticatek]
            [monger.core :as mg]
            [clojure.pprint :as pprint]
  )
)


(defn init-shell [mode & extend-params]
  
  (let [config (load-file "etc/config/config.clj")
        dburl (-> config mode :host-url-db)
        dport (-> config mode :host-port-db)
        database (-> config mode :database)]
    
    ;; connect to the DB server
    (println (str "Connecting to DB url[" dburl  "] / port[" dport  "]"))

    (if (= :prod mode)
      (mg/connect-via-uri! dburl)
      (do
        (mg/connect! { :host dburl :port dport }) 
        (mg/set-db! (mg/get-db database))    ;; select the DB 
        (println (str "Setting Database[" database "]"))
      )
    )

  )
  (def shell (ref { :active true })) 	;; the shell and memory 
)


(defn add [artifact-p & etal]
  
  (let [  logged-in-user (authenticatek/logged-in-user)]

    (println "bkell.add CALLED / artifact-p["+ artifact-p +"]")
    (if (-> logged-in-user nil?)  ;; we want to see a logged-in-user 
      (if (-> artifact-p :tag (= :user) not) ;; you do not have to be authenticated to add a user 
        (bkell.util/generate-error-response "User is not authenticated")
        (eval `(addk/add (bkell.domain/keywordize-tags ~artifact-p) ~@etal))
      )
      (eval `(addk/add (bkell.domain/keywordize-tags ~artifact-p) ~@etal))
    )
  )
)

(defn getk [akey & etal]
  
  (let [  logged-in-user (authenticatek/logged-in-user)]
    (if (-> logged-in-user nil?)  ;; we want to see a logged-in-user 
      (bkell.util/generate-error-response "User is not authenticated")
      (eval `(getk/getk ~akey ~@etal))  ;; ensure result is not nil before returning
    )
  )
)

(defn update [artifact-p & etal]
  
  (let [  logged-in-user (authenticatek/logged-in-user)]
    (if (-> logged-in-user nil?)  ;; we want to see a logged-in-user 
      (bkell.util/generate-error-response "User is not authenticated")
      (eval `(updatek/update (bkell.domain/keywordize-tags ~artifact-p) ~@etal))
    )
  )
)

(defn removek [entity & etal]
  (let [  logged-in-user (authenticatek/logged-in-user)]
    (if (-> logged-in-user nil?)  ;; we want to see a logged-in-user 
      (bkell.util/generate-error-response "User is not authenticated")
      (eval `(removek/removek ~entity ~@etal))
    )
  )
)

(defn login [user]
  { :pre  [ (-> user nil? not)
            (-> user :username nil? not)
            (-> user :password nil? not)
          ] }
  
  (try 
    (authenticatek/login-user user) 
    (catch java.lang.AssertionError e (bkell.util/generate-error-responses (str "Error logging in: " (.getMessage e))))
  )
)


(defn -main [& args]
    
  (ns bkell)
  (use 'bkell.bkell)
  (init-shell) 
  
  #_(println "-main CALLED")
  #_(require 'clojure.main)
  #_(clojure.main/repl)
  
)


;;(-main)
