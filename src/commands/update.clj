(ns commands 
  (:use somnium.congomongo)
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
)


;; CAN'T update accounts, only destroy and re-add them 
(comment defn update-account [uname account])


;; update entry 
(defn update-entry [uname entry]
)


