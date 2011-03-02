;;(require 'bkell) 
;;(require 'debug)

(defn same-user-check [user_seq shell]

    ;; check if 
    ;;  i) there is a logged-in-user 
    ;;  ii) incoming user & logged-in-user are same (OK)
    ;;  iii) incoming user & logged-in-user are different (ERROR)
    ;;(debug/debug-repl)
	(and 
      (not (nil? (:logged-in-user @shell)))
      (not (= 
        (:id (:attrs (:logged-in-user @shell)))
        (:id (:attrs user_seq))))
      (throw (Exception. "A different user is logged in")))
)
(defn login-user [user_seq shell]
    
    (same-user-check user_seq shell)
    (dosync 
	  (alter shell conj 
		{ :logged-in-user user_seq } )
	  (alter shell conj 
		{ :previous user_seq })) 
    
)

(defn logout-user [user_seq shell] 

    (same-user-check user_seq shell)
    (dosync 
        (alter shell dissoc :logged-in-user )
		(alter shell conj { :previous user_seq } )
    )
)

