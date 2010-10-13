(require 'bkell) 

(defn login-user [user_seq]
    
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
