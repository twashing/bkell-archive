
(ns depth_adapter
   (:import com.interrupt.bookkeeping.cc.analysis.DepthFirstAdapter) 

)

(defn operate-dep-inputtype  
	[node handler_block]	;; input args 
	
	(let [ 	checks 
		
					[	(fn [node handler] 
							(if (instance? com.interrupt.bookkeeping.cc.node.AXmlCommandInput (. node getCommandInput) )
								(do 
									(println "XML input")
									
									;; extract the context 
									(let [ result_seq []]
										
										;; operate with handler
										(handler result_seq)
									)
								)
							) 
						)
						
						(fn [node handler] 
							(if (instance? com.interrupt.bookkeeping.cc.node.AOptsCommandInput (. node getCommandInput) )
								(do 
									(println "OPTIONS input")
									
									;; extract the context 
									(let [ result_seq []]
										
										;; operate with handler
										(handler result_seq)
									)
								)
							)
						)
						
						(fn [node handler] 
							(if (instance? com.interrupt.bookkeeping.cc.node.AXpathCommandInput (. node getCommandInput) )
								
								(do 
									(println "XPATH input")
									
									;; extract the context 
									(let [ result_seq []]
										
										;; operate with handler
										(handler result_seq)
									)
								)
							)
						)
					]
			]
			
			(doseq [ each_check checks ] 
				(do
					(println "each... " each_check) 
					;;(apply each_check node handler_block)
				)
			)
			
	)
	
)

(defn get-depth-adapter [] 
	 
   (proxy [DepthFirstAdapter] [] 
	 
	 ;; EXIT commnad 
	 (caseAExitCommand4 [node] 
	    
	    (println (str "caseAExitCommand4: " node))
	    
	    (proxy-super inAExitCommand4 node) 
	    (proxy-super outAExitCommand4 node) 
			
	    (. System exit 0) 
	 )

	 
	 ;; LOGIN command 
	 (caseALoginCommand3 [node] 
	    (println (str "caseALoginCommand3: " node))
	    
	    
	    (proxy-super inALoginCommand3 node) 
	    
	    (if (not= (. node getLogin ) nil) 
	       (.. node getLogin (apply this) ) 
	    )
	    
	    (if (not= (. node getLbracket ) nil) 
	       (.. node getLbracket (apply this) ) 
	    )
	    
      (if (not= (. node getCommandInput ) nil) 
	      
	      (do 
	      	
	      	(.. node getCommandInput (apply this) ) 
	    		
	    		;; execute LOGIN 
					(operate-dep-inputtype node (fn [result_seq] (println "logging in on... " result_seq)))
	    	)
	    )
	    
      (if (not= (. node getRbracket ) nil) 
	       (.. node getRbracket (apply this) ) 
	    )
	    
      (proxy-super outALoginCommand3 node) 
	    
	 )
	 
	 ;; PRINT command 
	 (caseAPrintCommand6 [node] 
	    (println (str "caseAPrintCommand6: " node)) 
	 )
	 
	 
	 ;; LOAD command 
	 (caseALoadCommand3 [node] 
	    (println (str "caseALoadCommand3 [" (class (. node getCommandInput)) "]: " node)) 
	    
	    (comment "replicating java calls in the 'DepthFirstAdapter.caseALoadCommand3'")
	    
	    
	    (proxy-super inALoadCommand3 node) 
	    
	    (if (not= (. node getLoad ) nil) 
	       (.. node getLoad (apply this) ) 
	    )
	    
	    (if (not= (. node getLbracket ) nil) 
	       (.. node getLbracket (apply this) ) 
	    )
	     
	    (if (not= (. node getCommandInput ) nil) 
	       
		    (do ;; execute 'if' block 
				  (.. node getCommandInput (apply this) ) 
				  
				  
					(if (not (contains? com.interrupt.bookkeeping/shell :logged-in-user )) 	;; check if there is a 'logged-in-user' 
		    		
		    		;;throw an error if no 'logged-in-user' 
		    		(println "ERROR - NO logged-in-user") 
		    		
		    		
		    		;; execute LOAD 
		    		(operate-dep-inputtype node (fn [result_seq] (println "loading... " result_seq)))
			    	
				  )
				  
		    )
	    )
	    
	    (if (not= (. node getRbracket ) nil) 
	       (.. node getRbracket (apply this) ) 
	    )
	    
	    
	    (proxy-super outALoadCommand3 node) 
	    
	 )
	 
	 ;; ADD command (for registering users too) 
		  ;; 1. check that there's not an existing user 
		  ;; 2. add corresponding default group to the new user 
		  ;; 3. add to aauth.groups 
		  ;; 4. add to aauth.users 
		  ;; 5. add Associated Bookkeeping to Group 
	 
	 
	)
)



