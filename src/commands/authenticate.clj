(ns commands
  (:require get)
  (:require clojure.string)
  (:require bkell)
  (:require domain)
  ;;(:require debug)
)

(defn same-user-check [user]

    ;; check if 
    ;;  i) there is a logged-in-user 
    ;;  ii) incoming user & logged-in-user are same (OK)
    ;;  iii) incoming user & logged-in-user are different (ERROR)
    ;;(debug/debug-repl)
	(and 
      (not (nil? (:logged-in-user @bkell/shell)))
      (= 
        (:username (:logged-in-user @bkell/shell))
        (:username user)))
)
(defn login-user [user]
    
    { :pre  [ (not (same-user-check user))
              ;;(not (nil? (seq (commands/get :user (:username user))))) ;; TODO - figure out a way to make 1 DB call 
              (= (:password user) (->> user :username (get :user) :password))
            ]
    }
    (dosync 
	  (alter bkell/shell conj 
		{ :logged-in-user user } )
	  (alter bkell/shell conj 
		{ :previous user })) 
    
)

(defn logout-user [user] 
    
    { :pre  [(same-user-check user)] }
    
    (dosync 
        (alter bkell/shell dissoc :logged-in-user )
		(alter bkell/shell conj { :previous user } )
    )
)

