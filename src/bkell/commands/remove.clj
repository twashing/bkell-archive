(ns bkell.commands.remove

  (:require [monger.core :as mg]
            [monger.collection :as mc]
            [monger.operators :as mop]
            [clojure.core.match :as match]
  )
)


(defn remove-user 
  "Removes the 'user' and its related 'group' and 'bookkeeping'"
  [user] 
  
  { :pre  [ (not (nil? user)) 
            (not (nil? (:username user))) ] 
  }
  
  (mc/remove "users" { :username (:username user) })
  (mc/remove "groups" { :owner (:username user) })
  (mc/remove "bookkeeping" { :owner (:username user) })
  nil
)


;; remove currency 
#_(defn remove-currency [currency uname]

  (let  [ ru {} #_(fetch-one "bookkeeping" :where { :owner uname }) ]
    #_(update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
      (domain/traverse-tree ru :remove { :id (:id currency) } nil))
  )
)


;; remove account 
(defn remove-account [account uname]
  
  (mc/update "bookkeeping"  { :owner uname
                              "content.0.content.tag" "account"
                              "content.0.content.id" (:id account) }
                            { mop/$pull { "content.0.content" { :id (:id account) } } }
  )
  
)


;; remove entry 
(defn remove-entry [entry uname]
  
  (mc/update "bookkeeping"  { :owner uname
                              "content.1.content.0.content.0.content.tag" "entry"
                              "content.1.content.0.content.0.content.id" (:id entry) }
                            { mop/$pull { "content.1.content.0.content.0.content" { :id (:id entry) } } }
  )
  
)

(defn removek [obj & etal]
  (let [a (:tag obj)]
    (case a
      :user (remove-user obj)
      :account (remove-account obj (first etal))
      :entry (remove-entry obj (first etal))
    )
  )
)

