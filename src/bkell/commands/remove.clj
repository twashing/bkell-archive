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
                              "content.content.tag" "account"
                              "content.content.id" (:id account) }
                            { mop/$unset { "content.$.content.0" { :id (:id account) } } }
  )
  
  (mc/update "bookkeeping"  { :owner uname
                              "content.content" nil }
                            { mop/$pull { "content.$.content" nil } } )
)


;; remove entry 
(defn remove-entry [entry uname]
  
  (mc/update "bookkeeping"  { :owner uname
                              "content.content.content.content.tag" "entry"
                              "content.content.content.content.id" (:id entry) }
                            { mop/$unset { "content.1.content.0.content.0.content.$" { :id (:id entry) } } }
  )
  
  ;; based on this...
  ; db.bookkeeping.update( { owner : "stub" , 
  ;                               "content.content.content.id" : "main.entries" } , 
  ;                             { $pull : { "content.$.content.0.content.0.content" : null } } ) 
  #_(mc/update "bookkeeping"  { :owner uname
                              "content.content.content.id" "main.entries" }
                            { mop/$pull { "content.1.content.0.content.0.content.$" nil } } )
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

