(ns commands 
  (:use somnium.congomongo)
  (:require domain)
)


(defn remove-user 
  "Removes the 'user' and its related 'group' and 'bookkeeping'"
  [uname] 
  
  { :pre  [ (not (nil? uname)) ]
  }
  
  (destroy! :users { :username uname })
  (destroy! :groups { :owner uname })
  (destroy! :bookkeeping { :owner uname })
  nil
)


;; remove currency 
(defn remove-currency [currency uname]

  (let  [ ru (fetch-one "bookkeeping" :where { :owner uname }) ]
    (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
      (domain/traverse-tree ru :remove { :id currency } nil))
  )
)


;; remove account 
(defn remove-account [account uname]

  (let  [ ru (fetch-one "bookkeeping" :where { :owner uname }) ]
    (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
      (domain/traverse-tree ru :remove { :id account } nil))
  )
)


;; remove entry 
(defn remove-entry [entry uname]

  (let  [ ru (fetch-one "bookkeeping" :where { :owner uname }) ]
    (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
      (domain/traverse-tree ru :remove { :id entry } nil))
  )
)


(defmulti remove (fn [tagk & etal] (:tag tagk))) 
(defmethod remove :user [user & etal] (remove-user user)) 
(defmethod remove :currency [currency & etal] (remove-currency currency (first etal) ))   ;; input arguments are: uname currency 
(defmethod remove :account [account & etal] (remove-account account (first etal) ))  ;; input arguments are: uname account
(defmethod remove :entry [entry & etal] (remove-entry entry (first etal) ))  ;; input arguments are: uname entry 


