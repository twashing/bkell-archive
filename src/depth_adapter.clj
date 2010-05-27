
(ns depth_adapter
   (:import com.interrupt.bookkeeping.cc.analysis.DepthFirstAdapter) 

)


;; set get base URL ...TODO - put in config 
(def db-base-URL "http://localhost:8080/exist/rest/") 

;; set root/system dir fragment ...TODO - put in config 
(def db-system-DIR "rootDir/system.main.system/") 

;; working directory lookup ...TODO - put in config 
(defn working-dir-lookup 
	[token]
	
	(println "DEBUG > 'working-dir-lookup' CALLED > ["(keyword token)"]" )
	
	(	{	:group "aauthentication.main.authentication/groups.aauth.groups/"
			:user "aauthentication.main.authentication/users.aauth.users/"
			:account "groups.main.groups/"
			:journal "groups.main.groups/"
			:entry "groups.main.groups/"
			:debit "groups.main.groups/"
			:credit "groups.main.groups/" 
		}
		(keyword token)
	)
)

(defn operate-dep-inputtype  
	[node handler_block]	;; input args 
	
	(let [ checks 
		
					[	(fn [node handler] 
							(if (instance? com.interrupt.bookkeeping.cc.node.AXmlCommandInput (. node getCommandInput) )
								(do 
									(println "XML input[" (.. node getCommandInput toString) "]")
									
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
									(println "DEBUG > OPTIONS input > token[" (.. node getCommandInput getInputOption getCommandtoken) "] > options[" (.. node getCommandInput getInputOption getCommandoption) "]")
									
									;; get token string (ie user, entry, etc) -> 
									(def token (.. node getCommandInput getInputOption getCommandtoken))
									
									;; get option args & value -> use a 'CommandOptionVisitor' 
									(def options (.. node getCommandInput getInputOption getCommandoption))
									
									(println "DEBUG > extracted > [" token "] > [" options "]")
									 
									;; from HASH -> find containing folder for token 
									(def db-working-DIR (working-dir-lookup (.. token toString trim)))
									
									(println "DEBUG > db-base-URL["db-base-URL"] > db-system-DIR["db-system-DIR"] > db-working-DIR["db-working-DIR"]") 
									
									;; TODO - build XPATH expression to find 'token' based on option 
									
									
									;; TODO - from DB, get 'token' for 'option' args & value 
									(comment clojure.contrib.http.agent/result  (clojure.contrib.http.agent/http-agent ... 
											:method "GET" 
											:header {"Content-Type" "text/xml"} 
											
											;; TODO - parse results, check for i) null or ii) multiple results 
											
											:handler 	(fn [agnt] 
																	(with-open [w (clojure.contrib.io/writer "/tmp/out")] 
																		(clojure.contrib.io/copy (clojure.contrib.http.agent/stream agnt) w))
																		
																		;; TODO - pass built XML to handler 
																		(handler result_seq)
																	) 
										) 
									)
								)
							)
						)
						
						(fn [node handler] 
							(if (instance? com.interrupt.bookkeeping.cc.node.AXpathCommandInput (. node getCommandInput) )
								
								(do 
									(println "XPATH input[" (.. node getCommandInput toString) "]")
									
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
					(println "DEBUG > each... " each_check) 
					(each_check node handler_block)
				)
			)
			
	)
	
)

(defn get-depth-adapter [] 
	 
   (proxy [DepthFirstAdapter] [] 
	 
	 ;; EXIT commnad 
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
					(operate-dep-inputtype node (fn [result_seq] (println "DEBUG > logging in on... " result_seq)))
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
				  
				  
					(if (not (contains? com.interrupt.bookkeeping/shell :logged-in-user )) 	;; check if there is a 'logged-in-user' 
		    		
		    		;;throw an error if no 'logged-in-user' 
		    		(println "ERROR - NO logged-in-user") 
		    		
		    		;; execute LOAD 
		    		(operate-dep-inputtype node (fn [result_seq] (println "loading... " result_seq)))
			    	
				  )
				  
		    )
	    )
	    
	    (if (not= (. node getRbracket ) nil) 
	       (.. node getRbracket (apply this) ) )
	    
	    
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



