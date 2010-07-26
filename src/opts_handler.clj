
		  (defn option_handler [node handler] 
		     (if (instance? com.interrupt.bookkeeping.cc.node.AOptsCommandInput (. node getCommandInput) )
					(do 
					   (println "DEBUG > OPTIONS input > token[" (.. node getCommandInput getInputOption getCommandtoken) "] > options[" (.. node getCommandInput getInputOption getCommandoption) "]")
					   
					   ;; get token string (ie user, entry, etc) -> 
					   (def token (.. node getCommandInput getInputOption getCommandtoken))
					   
					   ;; get option args & value -> use a 'CommandOptionVisitor' 
					   (def options (seq (.. node getCommandInput getInputOption getCommandoption)))
					   
					   (def option-id  
					      (take 1 (filter 
						 (fn [input] 
						    (if (instance? com.interrupt.bookkeeping.cc.node.AIdCommandoption input ) 
						       (true? true)
						       (false? false)
						    )
						 )
						 options
					      ))
					   )
					   (def db-id-ID  ;; TODO - chain this to look for other options if 'id' is not there
					      
								(clojure.contrib.str-utils2/trim 
									(nth  
										(clojure.contrib.str-utils2/split (.. (nth option-id 0)  ;; class 'com.interrupt.bookkeeping.cc.node.AIdCommandoption' 
											getIdOpt getText) #"-[a-z]+")
											1
									)
								)
					   )
					   
					   (println "DEBUG > extracted > [" token "] > [" options "] > [" db-id-ID "]")
					   
					   ;; from HASH -> find containing folder for token 
					   (def db-working-DIR (working-dir-lookup (.. token toString trim)))
					   
					   ;; build another <my.group> to end of db-working-DIR 
					   (def db-leaf (str (.. token toString trim) "." db-id-ID )   )
					   (def db-full-PARENT (str db-base-URL db-system-DIR db-working-DIR "/" db-leaf  ))
					   
					   (def db-document-NAME db-leaf) 
					   
					   
					   (println "DEBUG > db-base-URL["db-base-URL"] > db-system-DIR["db-system-DIR"] > db-working-DIR["db-working-DIR"] > leaf["db-leaf"]") 
					   (println "DEBUG > db-base-URL[" db-full-PARENT "]")
					   
					   
					   ;; this will find all <SPEECH> elements in the collection /db/shakespeare  with "Juliet" as the <SPEAKER> 
					   ;;	    http://localhost:8080/exist/rest/db/shakespeare?_query=//SPEECH[SPEAKER=%22JULIET%22] 
					   
					   ;; build XPATH expression to find 'token' based on option 
					   ;; http://localhost:8080/exist/rest/db/two.xml?_query= 
					   ;;	 declare default element namespace 'com/interrupt/bookkeeping/users' 
					   ;;	 declare namespace aauth='com/interrupt/bookkeeping/cc/bkell/aauth'; 
					   ;;	 //system/aauth:aauthentication 
					   
					   ;; TODO - a check if we even need a query 
					   (def db-query (str "_wrap=no&_query=" 
						    "declare default element namespace '"(namespace-lookup (.. token toString trim)) "';" 
						    ;;"declare namespace users='com/interrupt/bookkeeping/users'; declare namespace bkell='com/interrupt/bookkeeping/cc/bkell'; declare namespace command='com/interrupt/bookkeeping/cc/bkell/command'; declare namespace interpret='com/interrupt/bookkeeping/interpret'; declare namespace aauth='com/interrupt/bookkeeping/cc/bkell/aauth'; " 
						    
						    ;; TODO - check if we need 'and' conditions 
						    ;; "**/<token>[ @option='option_value' [ and @option='option_value' ] ]" 
						    "//"(.. token toString trim)"[ @" 
						       (. (nth (re-seq #"-[a-z]+" (.. (nth option-id 0) getIdOpt getText)) 0) substring 1)    ;; TODO - put this part into a function (being re-used) 
						    "='"db-id-ID"']"
						    )
						    
					   )
					   
					   (handler (xml-seq 
					   		(execute-http-call 	(str db-full-PARENT "/" db-leaf (str "?" (url-encode db-query))) 
					   												"GET" 
					   												{"Content-Type" "text/xml"}
					   												nil )
					   					))
					   
					)
		     )
		  )
