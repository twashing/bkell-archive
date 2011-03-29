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


