
(ns depth_adapter
  
  (:import com.interrupt.bookkeeping.cc.analysis.DepthFirstAdapter) 
  
	(:require clojure.contrib.str-utils2) 
	(:require clojure.contrib.http.agent) 
	(:require clojure.contrib.io) 
	(:require clojure.contrib.string) 
  
  (:use helpers) 
  (:use clojure.xml)
  
  (:require xml_handler)
  (:require opts_handler)
  (:require xpath_handler)
  
)


(use 'clj-stacktrace.repl)
(comment try
 ("foo")
 (catch Exception e
   (clj-stacktrace.repl/pst e)))


(defn operate-dep-inputtype 
	[node handler_block]	;; input args ; for now we are going to load by ID 
	
	(let [ checks [	xml_handler option_handler xpath_handler/xpath_handler ] ]
			
			(doseq [ each_check checks ] 
				(do
					;;(println "DEBUG > each > check[" each_check "] > node[" node "]" ) 
					(each_check node handler_block)
				)
			)
			
	)
	
)

(defn get-depth-adapter [] 
	 
   (proxy [DepthFirstAdapter] [] 
	 
	 ;; EXIT command 
	 (caseAExitCommand4 [node] 
	    
	    (println (str "DEBUG > caseAExitCommand4: " node))
	    
	    (proxy-super inAExitCommand4 node) 
	    (proxy-super outAExitCommand4 node) 
			
	    (. System exit 0) 
	 )

	 
	 ;; LOGIN command 
	 (caseALoginCommand3 [node] 
	    (println "DEBUG > caseALoginCommand3: " node)
	    
	    
	    (proxy-super inALoginCommand3 node) 
	    
	    (if (not= (. node getLogin ) nil) 
	       (.. node getLogin (apply this) ) )
	    
	    (if (not= (. node getLbracket ) nil) 
	       (.. node getLbracket (apply this) ) )
	    
      (if (not= (. node getCommandInput ) nil) 
	      
	      (do 
	      	
	      	(.. node getCommandInput (apply this) ) 
	    		
	    		;; execute LOGIN 
					(operate-dep-inputtype node 
																(fn [result_seq] 
																	
																	(dosync 
																		(alter com.interrupt.bookkeeping/shell conj 
																						{ :logged-in-user result_seq } )
																		(alter com.interrupt.bookkeeping/shell conj 
																						{	:previous result_seq })) 
																	(println "DEBUG > logged-in-user > " ((deref com.interrupt.bookkeeping/shell) :logged-in-user))
																))
	    	)
	    )
	    
      (if (not= (. node getRbracket ) nil) 
	       (.. node getRbracket (apply this) ) )
	    
      (proxy-super outALoginCommand3 node) 
	    
	 )
	 
	 ;; PRINT command 
	 (caseAPrintCommand6 [node] 
	    (println (str "caseAPrintCommand6: " node)) )
	 
	 
	 ;; LOAD command 
	 (caseALoadCommand3 [node] 
	    (println "DEBUG > caseALoadCommand3 [" (class (. node getCommandInput)) "]: " node) 
	    
	    (comment "replicating java calls in the 'DepthFirstAdapter.caseALoadCommand3'")
	    
	    
	    (proxy-super inALoadCommand3 node) 
	    
	    (if (not= (. node getLoad ) nil) 
	       (.. node getLoad (apply this) ) )
	    
	    (if (not= (. node getLbracket ) nil) 
	       (.. node getLbracket (apply this) ) )
	     
	    (if (not= (. node getCommandInput ) nil) 
	       
		    (do ;; execute 'if' block 
				  (.. node getCommandInput (apply this) ) 
				  
				  
					(if (not (contains? (deref com.interrupt.bookkeeping/shell) :logged-in-user )) 	;; check if there is a 'logged-in-user' 
		    		
		    		;;throw an error if no 'logged-in-user' 
		    		(println "ERROR - NO logged-in-user") 
		    		
		    		;; execute LOAD 
		    		(operate-dep-inputtype node (fn [result_seq] 
		    																	
		    																	(println "loading... " result_seq)
		    																	(dosync (alter com.interrupt.bookkeeping/shell conj 
																							{	:previous result_seq }))
		    																))
			    	
				  )
				  
		    )
	    )
	    
	    (if (not= (. node getRbracket ) nil) 
	       (.. node getRbracket (apply this) ) )
	    
	    
	    (proxy-super outALoadCommand3 node) 
	    
	 )
	
	(caseStart [node] 
			
			(println "DEBUG > caseStart CALLED > com.interrupt.bookkeeping/shell[" (deref com.interrupt.bookkeeping/shell) "]")
			
			(proxy-super inStart node) 
      
      (.. node getPExpr (apply this) )
      (.. node getEOF (apply this) )
      
      (proxy-super outStart node) 
      
	) 
	
	(caseAAddCommand1 [node]		;; public void caseAAddCommand1(AAddCommand1 node)
				
				(println "DEBUG > caseAAddCommand1 [" (class (. node getCommandInput)) "]: " node) 
	    	
	    	
        (proxy-super inAAddCommand1 node) 
	    	
		    (if (not= (. node getAdd ) nil) 
		       (.. node getAdd (apply this) ) ) 
		    
        (if (not= (. node getLbdepth1 ) nil) 
		       (.. node getLbdepth1 (apply this) ) ) 
		    
		    (if (not= (. node getLbdepth2 ) nil) 
		       (.. node getLbdepth2 (apply this) ) ) 
		    
        (if (not= (. node getCommandInput ) nil) 
        	 
        	 (do 
	        	 
	        	 ;; any i) 'load' ii) direct XML or iii) variable should be in the shell's :previous 
			       (.. node getCommandInput (apply this) ) 
			       
			       ;; set the :previous result as the :command-context 
			       (dosync (alter com.interrupt.bookkeeping/shell conj 
								{ :command-context (:previous @com.interrupt.bookkeeping/shell) } ))
		       )
		    ) 
		    
		    (if (not= (. node getRbdepth2 ) nil) 
		       (.. node getRbdepth2 (apply this) ) ) 
		    
		    (println)
		    (println "shell > before arguments > [" @com.interrupt.bookkeeping/shell "]")
				(let [ copy (. node getIlist) ]
						
						(doseq [ each_copy copy ] 
							(do 
								
								;; apply each element in the list 
								(. each_copy apply this)
								(operate-dep-inputtype each_copy 
											(fn [result_seq] 
												
												(dosync 
													(alter com.interrupt.bookkeeping/shell conj 
																	{	:previous result_seq })) 
											))
								
								;; DEBUG 
								(println 	"Add command > context[" (:tag (:command-context @com.interrupt.bookkeeping/shell )) 
													"] > users?[" (= (keyword "users") (:tag (:command-context @com.interrupt.bookkeeping/shell ))) 
													"] > :previous / each_copy["(:previous @com.interrupt.bookkeeping/shell)"] > match?[" 
														(and 	(= (keyword "users") (:tag (:command-context @com.interrupt.bookkeeping/shell )))
																	(= (keyword "user") (:tag (:previous @com.interrupt.bookkeeping/shell )))) "]")
								
								;; check if we are adding a 'User' to 'Users' 
								(and 	(= (keyword "users") (:tag (:command-context @com.interrupt.bookkeeping/shell )))
											(= (keyword "user") (:tag (:previous @com.interrupt.bookkeeping/shell ))) 
									
									;; 1. check that there's not an existing user 
									(let [check-user
													(execute-http-call 	;; TODO - put in 404 check 
														(str db-base-URL db-system-DIR) 
														(str  																				;; stringing together lookup URL leaf  
															(working-dir-lookup (:tag (:previous @com.interrupt.bookkeeping/shell ))) 
																"/" 
																(str 
																	(name (:tag (:previous @com.interrupt.bookkeeping/shell ))) 
																	"." 
																	(:id (:attrs (:previous @com.interrupt.bookkeeping/shell ))))
																"/"
																(str 			;; repeating user name as leaf document 
																	(name (:tag (:previous @com.interrupt.bookkeeping/shell ))) 
																	"." 
																	(:id (:attrs (:previous @com.interrupt.bookkeeping/shell )))))
														nil
													)
											 ]
										
										(println "check-user[" check-user "]")
										(let [ parsed-check (clojure.xml/parse (ByteArrayInputStream. (.getBytes check-user "UTF-8")))] 
											
											(println "parsed-checked[" parsed-check "]")
											(if	(and	(= (keyword "user") (:tag parsed-check))
														(= 	(:id (:attr (:previous @com.interrupt.bookkeeping/shell ))) 	;; checking incoming user against existing user 
																(:id (:attrs parsed-check)))
													)
													(println "user[" (:id (:attrs parsed-check)) "] ALREADY exists") ;; TODO - throw error to user 
													(do 
														
														(println "ADDING user[" (:id (:attrs parsed-check)) "]")			;; TODO - go through add user process 
														
														;; 2. add to aauth.groups and corresponding default group to the new user
														(let [aauth-group (clojure.xml/parse "etc/xml/add.group.xml")] 
															
															(println "...loading add.group.xml[" aauth-group "]")
															(println "CREATED group" (assoc aauth-group 
																																:attrs 	{	
																																					:id (str "group." (:id (:attrs parsed-check))) , 
																																					:name (str "group." (:id (:attrs parsed-check))) , 
																																					:owner (:id (:attrs parsed-check)) 
																																				},  
																														 		:content 	[ 
																														 								{ 
																														 									:tag "user", 
																														 									:attrs 	{ 
																												 																:xmlns "com/interrupt/bookkeeping/users", 
																												 																:id (:id (:attrs parsed-check)) 
																												 															}
																														 								} 
																														 						 	] 
																									 			))
																;; TODO ... PUT to eXist
															
														)
														
														
														;; 3. add to aauth.users ... PUT to eXist
														
														
														;; 4. profile Details ... PUT to eXist
														
														
														;; 5. add associated Bookkeeping to Group ... PUT to eXist
														(println "...loading default.bookkeeping.xml[" (clojure.xml/parse "etc/xml/default.bookkeeping.xml") "]")
														
														
													)
											)
											
										)
										
									)
									
									 
									
								)
								
							)
						)
						
				)
        (if (not= (. node getRbdepth1 ) nil) 
		       (.. node getRbdepth1 (apply this) ) ) 
		    
		    
        
        (proxy-super outAAddCommand1 node) 
	    	
	)
		
	 	;; TODO - handle variables 
	 	
	 	;; TODO - finish 'print' command 
	 	
	 	
	)
)



