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
(defn update-currency [uname currency default]
  
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
          (domain/traverse-tree ru :update { :id (:id rc) } currency)
          :update
          currency 
          default))
      (commands/add-currency uname currency default)  ;; insert the currency otherwise 
    )
  )
)


;; CAN'T update accounts, only destroy and re-add them 
(comment defn update-account [uname account])


;; update entry 
(defn update-entry [uname entry]
)


