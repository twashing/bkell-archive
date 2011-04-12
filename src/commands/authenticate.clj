(ns commands
  (:require get)
  (:require clojure.string)
)

(defn same-user-check [user shell]

    ;; check if 
    ;;  i) there is a logged-in-user 
    ;;  ii) incoming user & logged-in-user are same (OK)
    ;;  iii) incoming user & logged-in-user are different (ERROR)
    ;;(debug/debug-repl)
	(and 
      (not (nil? (:logged-in-user @shell)))
      (not (= 
        (:username (:logged-in-user @shell))
        (:username user))))
      ;;(throw (Exception. "A different user is logged in")))
)
(defn login-user [user shell]
    
    { :pre  [ (not (same-user-check user shell))
              ;;(nil? (println (seq (commands/get :user (:username user))))) ;; TODO - figure out a way to make 1 DB call 
              ;;(not (nil? (seq (commands/get :user (:username user))))) ;; TODO - figure out a way to make 1 DB call 
              (= (:password user) (:password (commands/get :user (:username user))))
            ]
    }
    (dosync 
	  (alter shell conj 
		{ :logged-in-user user } )
	  (alter shell conj 
		{ :previous user })) 
    
)

(defn logout-user [user shell] 

    (same-user-check user shell)
    (dosync 
        (alter shell dissoc :logged-in-user )
		(alter shell conj { :previous user } )
    )
)

