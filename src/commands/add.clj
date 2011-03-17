(ns commands

  (:require clojure.contrib.logging)
  (:require clojure.string)
  (:require [clojure.zip :as zip])
  (:require helpers)
  
  (:use somnium.congomongo)
  ;;(:use debug)
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
  "Traverse through tree until we find a tag with the given :id, then on 'original' perform 'action' with 'obj'. 
  Right now, the 'criteria-map' only takes 1 key/value pair"
  [original action criteria-map obj]
  { :pre  [ (map? original) 
            (keyword? action) ] } ;; ensure that our root node is a map 
  
  (let [  ky (-> criteria-map keys first) 
          vl (ky criteria-map)]
  (loop [loc (zip/zipper map? #(:content %1) #(assoc %1 :content %2 ) original)]
    
    (if (zip/end? loc)
      (zip/root loc)
      (if (and (= :get action) (= vl (ky (zip/node loc)))) ;; break if this is a :get and have found node 
          (zip/node loc)
          (recur (zip/next
                (cond (= vl (ky (zip/node loc))) ;; going to next, if ky@loc = vl, the do 'action' 
                      (cond
                        (= :insert action)
                          (zip/insert-child loc obj)
                        (= :update action)
                          (zip/edit loc merge obj)
                      )
                      :else loc) ))))
    )
  )
)


(defn add-currency [uname currency default]
  
  { :pre  [ (not (nil? uname)) 
            (not (clojure.string/blank? (:name currency)))
            (not (clojure.string/blank? (:id currency)))
            (= 0 (count (fetch "bookkeeping" :where { "content.content.id" (:id currency) }))) ;; ensure no duplicates 
          ] }
  
  ;; creating a zipper function. Good reference points are: 
  ;;  1. http://tech.puredanger.com/2010/10/22/zippers-with-records-in-clojure 
  ;;  2. http://tech.puredanger.com/2010/10/23/pattern-matching-and-tree-mutation
  (let  [ ru (fetch-one "bookkeeping" :where { :owner uname })
          alist [ [:insert {:id "main.currencies"} currency] 
                  (if default [:update {:id "main.currencies"} { :default (:id currency)}]) ] ;; give 'update' vector if we want to set as default currency
        ]
    
    (update! :bookkeeping { :_id (:_id ru) }  ;; passing in had w/ ObjecId, NOT original object 
      (reduce (fn [a b] (apply traverse-tree    ;; before calling update!, iterate through action list and apply on tree
                          (into [a] b)))        ;; give a vector of args to apply fn 'traverse-tree'
                        ru (filter #(not (nil? %1)) alist)))  ;; filter out nils from action list 
  )
)

(defn add-account [uname account] 
  
  { :pre  [ (not (nil? uname))
            (not (clojure.string/blank? (:name account)))
            (not (clojure.string/blank? (:id account)))
            (not (clojure.string/blank? (:type account)))
            (not (clojure.string/blank? (:counterWeight account)))
            (= 0 (count (fetch "bookkeeping" :where { "content.content.id" (:id account) }))) ;; ensure no duplicates 
          ] }
  
  (let  [ ru (fetch-one "bookkeeping" :where { :owner uname }) ]
    
    (update! :bookkeeping { :_id (:_id ru) }  ;; passing in had w/ ObjecId, NOT original object
      (traverse-tree ru :insert { :id "main.accounts" } account))
  )
)




