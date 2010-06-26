
(ns depth_adapter
   (:import com.interrupt.bookkeeping.cc.analysis.DepthFirstAdapter) 
)

(use 'clj-stacktrace.repl)
(comment try
 ("foo")
 (catch Exception e
   (clj-stacktrace.repl/pst e)))

(require 'clojure.contrib.str-utils2) 
(require 'clojure.contrib.http.agent) 
(require 'clojure.contrib.io) 
(require 'clojure.contrib.string) 


(import (java.net URLEncoder))


;; function stolen from http://p.hagelb.org/http-client-send-body 
(defn url-encode 
	" Replacing these characters http encoded ones 
	<space>		%20
	'					%27
	;					%3B
	[					%5B
	@					%40
	=					%3D
	]					%5D "
  [text]
  
  (clojure.contrib.string/replace-str " " "%20"   
  	(clojure.contrib.string/replace-str "'" "%27"   
  		(clojure.contrib.string/replace-str ";" "%3B"   
  			(clojure.contrib.string/replace-str "[" "%5B"   
  				(clojure.contrib.string/replace-str "@" "%40"   
  					(clojure.contrib.string/replace-str "=" "%3D"   
  						(clojure.contrib.string/replace-str "]" "%5D" text 
  					)))))	
  )
))


;; set get base URL ...TODO - put in config 
(def db-base-URL "http://localhost:8080/exist/rest/") 

;; set root/system dir fragment ...TODO - put in config 
(def db-system-DIR "rootDir/system.main.system/") 

;; working directory lookup ...TODO - put these lookups into config 
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
(defn namespace-lookup 
	[token]
	
	(println "DEBUG > 'namespace-lookup' CALLED > ["token"]" )
	
	(	{	"group" "com/interrupt/bookkeeping/users"
			"user" "com/interrupt/bookkeeping/users"
			"account"  "com/interrupt/bookkeeping/account"
			"journal"  "com/interrupt/bookkeeping/journal"
			"entry"  "com/interrupt/bookkeeping/journal"
			"debit"  "com/interrupt/bookkeeping/account"
			"credit"  "com/interrupt/bookkeeping/account" 
		}
		token
	)
)

(defn operate-dep-inputtype 
	[node handler_block]	;; input args ; for now we are going to load by ID 
	
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
									(def db-id-ID 	;; TODO - chain this to look for other options if 'id' is not there
										
										(clojure.contrib.str-utils2/trim 
											(nth  
												(clojure.contrib.str-utils2/split (.. (nth option-id 0)	;; class 'com.interrupt.bookkeeping.cc.node.AIdCommandoption' 
													getIdOpt getText) #"-[a-z]+")
												1
											)
										)
										
									)
									
									(println "DEBUG > extracted > [" token "] > [" options "] > [" db-id-ID "]")
									
									;; from HASH -> find containing folder for token 
									(def db-working-DIR (working-dir-lookup (.. token toString trim)))
									
									;; build another <my.group> to end of db-working-DIR 
									(def db-leaf (str (.. token toString trim) "." db-id-ID )	)
									(def db-full-PARENT (str db-base-URL db-system-DIR db-working-DIR db-leaf	))
									
									(def db-document-NAME db-leaf) 
									
									
									(println "DEBUG > db-base-URL["db-base-URL"] > db-system-DIR["db-system-DIR"] > db-working-DIR["db-working-DIR"] > leaf["db-leaf"]") 
									(println "DEBUG > db-base-URL[" db-full-PARENT "]")
									
									
									;; this will find all <SPEECH> elements in the collection /db/shakespeare  with "Juliet" as the <SPEAKER> 
									;; 		http://localhost:8080/exist/rest/db/shakespeare?_query=//SPEECH[SPEAKER=%22JULIET%22] 
									
									;; build XPATH expression to find 'token' based on option 
									;; http://localhost:8080/exist/rest/db/two.xml?_query= 
									;;		declare default element namespace 'com/interrupt/bookkeeping/users' 
									;;		declare namespace aauth='com/interrupt/bookkeeping/cc/bkell/aauth'; 
									;;		//system/aauth:aauthentication 
									
									;; TODO - a check if we even need a query 
									(def db-query (str "_wrap=no&_query=" 
												"declare default element namespace '"(namespace-lookup (.. token toString trim)) "';" 
												;;"declare namespace users='com/interrupt/bookkeeping/users'; declare namespace bkell='com/interrupt/bookkeeping/cc/bkell'; declare namespace command='com/interrupt/bookkeeping/cc/bkell/command'; declare namespace interpret='com/interrupt/bookkeeping/interpret'; declare namespace aauth='com/interrupt/bookkeeping/cc/bkell/aauth'; " 
												
												;; TODO - check if we need 'and' conditions 
												;; "**/<token>[ @option='option_value' [ and @option='option_value' ] ]" 
												"//"(.. token toString trim)"[ @" 
													(. (nth (re-seq #"-[a-z]+" (.. (nth option-id 0) getIdOpt getText)) 0) substring 1)		;; TODO - put this part into a function (being re-used) 
												"='"db-id-ID"']"
												)
												
									)
									(println "DEBUG > db-query[" db-query "]")
									
									(println "DEBUG > FINAL http query[" (str db-full-PARENT "/" db-leaf "?" (url-encode db-query) ) "]")
									
									;; from DB, get 'token' for 'option' args & value 
									(def result-XML (clojure.contrib.http.agent/string (clojure.contrib.http.agent/http-agent (str db-full-PARENT "/" db-leaf "?" (url-encode db-query) ) 
											:method "GET" 
											:header {"Content-Type" "text/xml"} 
											
											;; TODO - parse results, check for i) null or ii) multiple results 
										) 
									))
									
									;; pass built XML sequence to handler
									(handler (xml-seq result-XML))
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



