(require 'clojure.contrib.string)
(use 'helpers) 
(require 'bkell) 


(defn remove-user [db-base-URL db-system-DIR working-USER] 
		
		;; 1. check that there's not an existing user 
		(let [check-user (get-user db-base-URL db-system-DIR working-USER) ]
			
			(println "check-user[" check-user "]")	;; TODO - if <error/>, ADD user; user exists otherwise 
			
			(if (and 
                  (= (:msg check-user) "OK")
                  (= (:code check-user) 200)
				)
                
					(do 
						
						(println "REMOVING user[" working-USER "]")  
		
								
								;; PUT to eXist 
								(println "REMOVing group [" working-USER "]" )
								(execute-http-call 		
									(str db-base-URL db-system-DIR (working-dir-lookup :group)
										"/" "group." (:id (:attrs working-USER)))
									"DELETE" 
									{	"Content-Type" "text/xml"
										"Authorization" "Basic YWRtaW46"}
									nil
								)
								
								;; 3. add to aauth.users ... PUT to eXist 
								;; 4. profile Details ... PUT to eXist	... TODO 
								(println "REMOVing user [" working-USER "] / XML[" 
                                    (with-out-str (clojure.xml/emit working-USER)) "]" )
								(execute-http-call 		
									(str db-base-URL db-system-DIR (working-dir-lookup :user)
										"/" "user." (:id (:attrs working-USER)))
									"DELETE" 
									{	"Content-Type" "text/xml"
										"Authorization" "Basic YWRtaW46"}
                                    nil
								)
								
								;; 5. add associated Bookkeeping to Group ... PUT to eXist 
								(execute-http-call 		
									(str db-base-URL db-system-DIR (working-dir-lookup :bookkeeping)
										"/" "group." (:id (:attrs working-USER)) )
									"DELETE" 
									{	"Content-Type" "text/xml"
										"Authorization" "Basic YWRtaW46"}
                                    nil
								)
		
			        )
			        (println "user DOES NOT exist") ;; TODO - throw error if user does not exist 
		  	  
			)
	)
)
