(require 'bkell) 

(defn login-user [user_seq]
    
    ;; check if 
    ;;  i) there is a logged-in-user 
    ;;  ii) incoming user & logged-in-user are same (OK)
    ;;  iii) incoming user & logged-in-user are different (ERROR)
	(and 
      (not (nil? (:logged-in-user @bkell/shell)))
      (not (= 
        (:id (:attrs (:logged-in-user @bkell/shell)))
        (:id (:attrs user_seq))))
      (throw (Exception. "A different user is logged in")))
    (dosync 
	  (alter bkell/shell conj 
		{ :logged-in-user user_seq } )
	  (alter bkell/shell conj 
		{ :previous user_seq })) 
    
)

(defn logout-user [user_seq] 
    (dosync 
        (alter bkell/shell dissoc :logged-in-user )
		(alter bkell/shell conj { :previous user_seq } )
    )
)

