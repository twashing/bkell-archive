
(ns depth_adapter
  (:import com.interrupt.bookkeeping.cc.analysis.DepthFirstAdapter) 
   
	(:require clojure.contrib.str-utils2) 
	(:require clojure.contrib.http.agent) 
	(:require clojure.contrib.io) 
	(:require clojure.contrib.string) 
  
  (:require helpers) 
  
  (:require xml_handler)
  (:require opts_handler)
  (:require xpath_handler)
  
)


(use 'clj-stacktrace.repl)
(comment try
 ("foo")
 (catch Exception e
   (clj-stacktrace.repl/pst e)))


(comment

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
)

(defn operate-dep-inputtype 
	[node handler_block]	;; input args ; for now we are going to load by ID 
	
	(let [ checks [	xml_handler option_handler xpath_handler ] ]
			
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



