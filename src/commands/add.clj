(ns commands

  (:require clojure.contrib.logging)
  (:require clojure.string)
  (:require [clojure.zip :as zip])
  (:require helpers)
  
  (:use somnium.congomongo)
  (:require clojure.contrib.debug)
)




(defn add-user [user] 
  
  ;; check that there is not a duplicate user 
  (if (not (= (:username user) 
              (:username (first (fetch "users" :where { :username (:username user) })))))
    (do 
      (insert! :users (assoc user :password (helpers/md5-sum (:password user)))) ;; insert the user, after MD5 encrypting the password 
      (let [gr (load-file "etc/data/default.group.clj")]  ;; insert the associated group
        (insert! :groups (assoc gr :name (:username user) :owner (:username user))))
      (let [bk (load-file "etc/data/default.bookkeeping.clj")]  ;; insert the associated bookkeeping
        (insert! :bookkeeping (assoc bk :owner (:username user))))
    )
    { :tag "error" :msg "There is a duplicate user" }
  )
)


(defn traverse-tree 
  "Traverse through tree until we find a tag with the given :id, then insert 'insertion'"
  [original id insertion]
  (loop [loc (zip/zipper map? #(:content %1) #(assoc %1 :content %2 ) original)]
    
    (debug/debug-repl)
    (if (zip/end? loc)
      (zip/root loc)
      (recur (zip/next
                (cond (= id (:id (zip/node loc)))
                      (zip/insert-child loc insertion)
                      :else loc) ))))
)


(defn add-currency [uname currency default]
  
  { :pre  [ (not (nil? uname)) 
            (not (clojure.string/blank? (:name currency)))
            (not (clojure.string/blank? (:id currency)))
          ] }
  
  ;; creating a zipper function. Good reference points are: 
  ;;  1. http://tech.puredanger.com/2010/10/22/zippers-with-records-in-clojure ; http://tech.puredanger.com/2010/10/23/pattern-matching-and-tree-mutation
  (let [ru (fetch "users" :where { :username (:username uname) })]
    (traverse-tree ru "main.currencies" currency))
)


(commands/add-currency "stub" { :tag "currency" :id "AUD" :name "Aussie"} false)

