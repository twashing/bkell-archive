(ns commands 
  (:use somnium.congomongo)
  (:require domain)
)


(defn remove-user 
  "Removes the 'user' and its related 'group' and 'bookkeeping'"
  [user] 
  
  { :pre  [ (not (nil? user)) 
            (not (nil? (:username user))) ] 
  }
  
  (destroy! :users { :username (:username user) })
  (destroy! :groups { :owner (:username user) })
  (destroy! :bookkeeping { :owner (:username user) })
  nil
)


;; remove currency 
(defn remove-currency [currency uname]

  (let  [ ru (fetch-one "bookkeeping" :where { :owner uname }) ]
    (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
      (domain/traverse-tree ru :remove { :id (:id currency) } nil))
  )
)


;; remove account 
(defn remove-account [account uname]

  (let  [ ru (fetch-one "bookkeeping" :where { :owner uname }) ]
    (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
      (domain/traverse-tree ru :remove { :id (:id account) } nil))
  )
)


;; remove entry 
(defn remove-entry [entry uname]

  (let  [ ru (fetch-one "bookkeeping" :where { :owner uname }) ]
    (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
      (domain/traverse-tree ru :remove { :id (:id entry) } nil))
  )
)


(defmulti removek (fn [tagk & etal] (:tag tagk))) 
(defmethod removek :user [user & etal] (remove-user user)) 
(defmethod removek :currency [currency & etal] (remove-currency currency (-> etal first) ))   ;; input arguments are: uname currency 
(defmethod removek :account [account & etal] (remove-account account (-> etal first) ))  ;; input arguments are: uname account
(defmethod removek :entry [entry & etal] (remove-entry entry (-> etal first) ))  ;; input arguments are: uname entry 

