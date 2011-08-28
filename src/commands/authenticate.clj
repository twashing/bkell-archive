(ns commands
  (:require [get]
            [clojure.string]
            [domain]
            [util]
  )
)



(defn logged-in-user []
  (if-let [bk (util/get-bkell)] 
    (-> nil? (:logged-in-user @bk)))
)
(defn authenticated? [user]
  (= (:username (:logged-in-user @(util/get-bkell)))
     (:username user))
)
(defn same-user-check [user]

    ;; check if 
    ;;  i. there is a logged-in-user 
    ;;  ii. incoming user & logged-in-user are same (OK)
    ;;  iii. incoming user & logged-in-user are different (ERROR)
    ;;(debug/debug-repl)
	(and 
      (not (nil? (:logged-in-user @(util/get-bkell))))
      (authenticated? user))
)
(defn login-user [user]
    
    { :pre  [ (not (same-user-check user))
              ;;(not (nil? (seq (commands/get :user (:username user))))) ;; TODO - figure out a way to make 1 DB call 
              (= (:password user) (->> user :username (get :user) :password))
            ]
    }
    (dosync 
	  (alter (util/get-bkell) conj 
		{ :logged-in-user user } )
	  (alter (util/get-bkell) conj 
		{ :previous user })) 
    
)

(defn logout-user [user] 
    
    { :pre  [(same-user-check user)] }
    
    (dosync 
        (alter (util/get-bkell) dissoc :logged-in-user )
		(alter (util/get-bkell) conj { :previous user } )
    )
)

