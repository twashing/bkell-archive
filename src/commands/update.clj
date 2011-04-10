(ns commands 
  (:use somnium.congomongo)
  (:require clojure.string)
  (:require commands.get)
  (:require commands.add)
  (:require domain)
  ;;(:require debug)
)


;; update user 
(defn update-user [user]
  
  { :pre  [ (not (nil? (first (fetch "users" :where { :username (:username user) })))) ;; assert that user exists
          ] }
   
  (let [ru  (first (fetch "users" :where { :username (:username user) }))]
    (update!  :users { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
              user)
  )
)


;; update currency 
(defn update-currency [currency uname default]
  
  { :pre  [ (not (nil? uname)) 
            (not (clojure.string/blank? (:name currency)))
            (not (clojure.string/blank? (:id currency)))
          ] }
  (let [ru (fetch-one "bookkeeping" :where { :owner uname })
        rc (commands/get-currency uname (:id currency))]
    ;;(debug/debug-repl)
    (if rc 
      (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object 
        (domain/modify-currency                       ;; update the currency if existing  
          ru
          :update
          currency 
          default))
      (commands/add-currency currency uname default)  ;; insert the currency otherwise 
    )
  )
)


;; CAN'T update accounts, only destroy and re-add them 
(comment defn update-account [uname account])


;; update entry 
(defn update-entry [entry uname]
  
  { :pre  [ (not (nil? uname))
            (not (nil? entry))
            (not (clojure.string/blank? (:id entry)))
            (not (clojure.string/blank? (:date entry)))
            
            ;; ASSERT that accounts correspond with existing accounts
            (domain/account-for-entry? uname entry)
            
            
            ;; ASSERT that entry is balanced 
            ;; :lhs -> dt/dt == ct/ct
            ;; :rhs -> dt/cr == ct/dt 
            (domain/entry-balanced? uname entry)
            ]
  }
  
  (let [ru (fetch-one "bookkeeping" :where { :owner uname })
        re (commands/get-entry uname (:id entry))]
    ;;(debug/debug-repl)
    (if re 
      (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
        (domain/traverse-tree ru :update { :id (:id entry) } entry))
      (commands/add-entry entry uname)  ;; insert the entry otherwise 
    )
  )
  
)


(defmulti update (fn [obj & etal] (:tag obj)))
(defmethod update :user [user] (update-user user))
(defmethod update :currency [currency & etal] (update-currency currency (first etal) (second etal)))   ;; input arguments are: currency uname default
(defmethod update :entry [entry & etal] (update-entry entry (first etal)))  ;; input arguments are: entry uname 


