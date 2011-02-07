(require 'clojure.contrib.string)
(use 'helpers) 
(require 'bkell) 
(require 'clojure.contrib.logging)


(defn add-user [db-base-URL db-system-DIR working-USER] 
		
		;; 1. check that there's not an existing user 
		(let [check-user (get-user db-base-URL db-system-DIR working-USER) ]
			
			(clojure.contrib.logging/info (str "check-user[" check-user "]"))	;; TODO - if <error/>, ADD user; user exists otherwise 
			
			(if (and 
                ;; (not (= (:msg check-user) "Error"))
                (= (:msg check-user) "OK")
                (= (:code check-user) 200)
				)

					(clojure.contrib.logging/info "user ALREADY exists") ;; TODO - throw error to user
					
					(do 
						
						(clojure.contrib.logging/info (str "ADDING user[" working-USER "]"))  
						
						;; 2. add to aauth.groups and corresponding default group to the new user
						(let [aauth-group (clojure.xml/parse "etc/xml/add.group.xml")] 
							
							(clojure.contrib.logging/info (str "...loading add.group.xml[" aauth-group "]"))
							(let [local-id 	(str 
												(name (:tag working-USER)) 
												"." 
												(:id (:attrs working-USER)))] 
										
										(let [db-group 	(assoc aauth-group 
															:attrs 	{	
																:id local-id , 
																:name local-id , 
																:owner (:id (:attrs working-USER)) 
															}, 
									 		                :content 	[ 
									 							{ 
									 								:tag (keyword "user"), 
									 								:attrs 	{ 
							 											:xmlns "com/interrupt/bookkeeping/users", 
							 											:id (:id (:attrs working-USER)) 
							 										}
									 							} 
									 						 ] 
							                            )
				                             ]
						
			
												;; PUT to eXist 
												(clojure.contrib.logging/info (str "CREATing group [" db-group "] / XML[" (with-out-str (clojure.xml/emit db-group)) "]" ))
										        (execute-command 		
														(str db-base-URL db-system-DIR (working-dir-lookup :group)
																						"/" "group." (:id (:attrs working-USER)) 
																						"/" "group." (:id (:attrs working-USER)))
														"PUT" 
														{	"Content-Type" "text/xml"
															"Authorization" "Basic YWRtaW46"}
														(with-out-str (clojure.xml/emit db-group))
													
				
												)
												
												;; 3. add to aauth.users ... PUT to eXist 
												;; 4. profile Details ... PUT to eXist	... TODO 
												(clojure.contrib.logging/info (str "CREATing user [" working-USER "] / XML[" (with-out-str (clojure.xml/emit working-USER)) "]" ))
												(execute-command 		
														(str db-base-URL db-system-DIR (working-dir-lookup :user)
																						"/" "user." (:id (:attrs working-USER)) 
																						"/" "user." (:id (:attrs working-USER)))
														"PUT" 
														{	"Content-Type" "text/xml"
															"Authorization" "Basic YWRtaW46"}
														(with-out-str (clojure.xml/emit working-USER))
												)
												
												;; 5. add associated Bookkeeping to Group ... PUT to eXist 
												(execute-command 		
														(str db-base-URL db-system-DIR (working-dir-lookup :bookkeeping)
																						"/" "group." (:id (:attrs working-USER)) 
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

(defn add-generic [db-base-URL db-system-DIR working-ITEM command-context]
		
		
		;; ... TODO - logic to build XQuery to use to insert 
		
		;; PUT to eXist 
		(clojure.contrib.logging/info (str "CREATing [" working-ITEM "] / XML[" (with-out-str (clojure.xml/emit working-ITEM)) "]" ))
		(let [result (execute-command 		
				(url-encode-newlines (url-encode-spaces (str db-base-URL db-system-DIR (working-dir-lookup :bookkeeping)
												"/" "group." (:id (:attrs (:logged-in-user @bkell/shell))) ".group"
												"/" "group." (:id (:attrs (:logged-in-user @bkell/shell))) ".group"
												;;"/bookkeeping.main.bookkeeping/bookkeeping.main.bookkeeping" 
												"?_wrap=no&_query="
												"declare default element namespace '"
                                                    (namespace-lookup (clojure.contrib.string/as-str (:tag working-ITEM)))"';"
                                                "update insert "(strip-xml-header (with-out-str (clojure.xml/emit working-ITEM)))
	                                                " into //"(clojure.contrib.string/as-str (:tag command-context))
		                                                "[@id='" (:id (:attrs command-context)) "']"
																					)))
												"GET" 
												{	"Content-Type" "text/xml" 
													"Connection" "Keep-Alive"
													"Authorization" "Basic YWRtaW46" }
												nil
		)]
		(clojure.contrib.logging/info (str "result[" result "]"))
		)
)

