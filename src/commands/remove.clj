(ns commands 
)


(defn remove-user 
  "Removes the 'user' and its related 'group' and 'bookkeeping'"
  [uname] 
  
  { :pre  [ (not (nil? uname)) ]
  }
  
  (destroy! :users { :username uname })
  (destroy! :groups { :owner uname })
  (destroy! :bookkeeping { :owner uname })
)


;; remove currency 
(defn remove-currency [uname currency]

  (let  [ ru (fetch-one "bookkeeping" :where { :owner uname }) ]
    (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
      (domain/traverse-tree ru :remove { :id currency } nil))
  )
)


;; remove account 
(defn remove-account [uname account]

  (let  [ ru (fetch-one "bookkeeping" :where { :owner uname }) ]
    (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
      (domain/traverse-tree ru :remove { :id account } nil))
  )
)


;; remove entry 
(defn remove-entry [uname entry]

  (let  [ ru (fetch-one "bookkeeping" :where { :owner uname }) ]
    (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
      (domain/traverse-tree ru :remove { :id entry } nil))
  )
)


(defmulti remove (fn [tagk & etal] tagk)) 
(defmethod remove :user [tagk & etal] (remove-user (first etal))) 
(defmethod remove :currency [currency & etal] (remove-currency (first etal) (second etal)))   ;; input arguments are: uname currency 
(defmethod remove :account [account & etal] (remove-account (first etal) (second etal)))  ;; input arguments are: uname account
(defmethod remove :entry [entry & etal] (remove-entry (first etal) (second etal)))  ;; input arguments are: uname entry 


