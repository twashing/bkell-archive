(defn add-user [db-base-URL db-system-DIR] 
		
		;; 1. check that there's not an existing user 
		(let [check-user
						(execute-http-call 	;; TODO - put in 404 check 
							(str 
								db-base-URL 
								db-system-DIR 
								(working-dir-lookup (:tag (:previous @bkell/shell ))) 	;; stringing together lookup URL leaf 
								"/" 
								(str 
									(name (:tag (:previous @bkell/shell ))) 
									"." 
									(:id (:attrs (:previous @bkell/shell ))))
								"/"
								(str 			;; repeating user name as leaf document 
									(name (:tag (:previous @bkell/shell ))) 
									"." 
									(:id (:attrs (:previous @bkell/shell )))))
								"GET" 
								{"Content-Type" "text/xml"} 
								nil
						)
				 ]
			
			(println "check-user[" check-user "]")	;; TODO - if <error/>, ADD user; user exists otherwise 
			
			(if (not (= (:msg check-user) "Error"))
					
					(println "user ALREADY exists") ;; TODO - throw error to user
					
					(do 
						
						(println "ADDING user[" (:previous @bkell/shell ) "]")  
						
						;; 2. add to aauth.groups and corresponding default group to the new user
						(let [aauth-group (clojure.xml/parse "etc/xml/add.group.xml")] 
							
							(println "...loading add.group.xml[" aauth-group "]")
							(let [local-id 	(str 
												(name (:tag (:previous @bkell/shell ))) 
												"." 
												(:id (:attrs (:previous @bkell/shell ))))] 
										
										(let [db-group 	(assoc aauth-group 
																						:attrs 	{	
																											:id local-id , 
																											:name local-id , 
																											:owner (:id (:attrs (:previous @bkell/shell ))) 
																										}, 
																				 		:content 	[ 
																				 								{ 
																				 									:tag (keyword "user"), 
																				 									:attrs 	{ 
																		 																:xmlns "com/interrupt/bookkeeping/users", 
																		 																:id (:id (:attrs (:previous @bkell/shell ))) 
																		 															}
																				 								} 
																				 						 	] 
																		)
															]
															
												
												;; PUT to eXist 
												(println "CREATing group [" db-group "] / XML[" (with-out-str (clojure.xml/emit db-group)) "]" )
												(execute-http-call 		
																							(str db-base-URL db-system-DIR (working-dir-lookup :group)
																															"/" "group." (:id (:attrs (:previous @bkell/shell ))) 
																															"/" "group." (:id (:attrs (:previous @bkell/shell ))))
																							"PUT" 
																							{	"Content-Type" "text/xml"
																								"Authorization" "Basic YWRtaW46"}
																							(with-out-str (clojure.xml/emit db-group))
																						
													
												)
												
												;; 3. add to aauth.users ... PUT to eXist 
												;; 4. profile Details ... PUT to eXist	... TODO 
												(println "CREATing user [" (:previous @bkell/shell ) "] / XML[" (with-out-str (clojure.xml/emit (:previous @bkell/shell ))) "]" )
												(execute-http-call 		
																							(str db-base-URL db-system-DIR (working-dir-lookup :user)
																															"/" "user." (:id (:attrs (:previous @bkell/shell ))) 
																															"/" "user." (:id (:attrs (:previous @bkell/shell ))))
																							"PUT" 
																							{	"Content-Type" "text/xml"
																								"Authorization" "Basic YWRtaW46"}
																							(with-out-str (clojure.xml/emit (:previous @bkell/shell )))
												)
												
												;; 5. add associated Bookkeeping to Group ... PUT to eXist 
												(execute-http-call 		
																							(str db-base-URL db-system-DIR (working-dir-lookup :bookkeeping)
																															"/" "group." (:id (:attrs (:previous @bkell/shell ))) 
																															"/bookkeeping.main.bookkeeping/bookkeeping.main.bookkeeping" )
																							"PUT" 
																							{	"Content-Type" "text/xml"
																								"Authorization" "Basic YWRtaW46"}
																							(slurp "etc/xml/default.bookkeeping.xml" )
												)
										)
								)
						)
						
			)
			)
	)
)