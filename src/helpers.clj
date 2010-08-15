
(ns helpers 
	(:use clj-stacktrace.repl)) 

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

(defn filterSpacesFromXML [text]
  
  (clojure.contrib.string/replace-str "< " "<"   
  	(clojure.contrib.string/replace-str " : " ":"   
  		(clojure.contrib.string/replace-str " / >" " />"   
  			(clojure.contrib.string/replace-str "< /" "</"   
  				(clojure.contrib.string/replace-str "</ " "</"   
  					(clojure.contrib.string/replace-str " / " "/"   
  						(clojure.contrib.string/replace-re #"=\"\s" "=\""
  							(clojure.contrib.string/replace-re #"\s\"" "\"" 
  								(clojure.contrib.string/replace-str " = " "=" 
  					text 
  					)))))))))
  )
		
		
;; set get base URL ...TODO - put in config 
(def db-base-URL "http://localhost:8080/exist/rest/") 


;; set root/system dir fragment ...TODO - put in config 
(def db-system-DIR "rootDir/system.main.system/") 

;; working directory lookup ...TODO - put these lookups into config 
(defn working-dir-lookup [token]
   
   ;;(println "DEBUG > 'working-dir-lookup' CALLED > ["(keyword token)"]" )
   (  {	 :group "aauthentication.main.authentication/groups.aauth.groups"
				 :user "aauthentication.main.authentication/users.aauth.users"
				 :users "aauthentication.main.authentication/users.aauth.users"
				 :account "groups.main.groups"
				 :journal "groups.main.groups"
				 :entry "groups.main.groups" 
				 :entries "groups.main.groups" 
				 :debit "groups.main.groups"
				 :credit "groups.main.groups" 
				 :bookkeeping "groups.main.groups" 
				 
      }
      (keyword token)
   )
)
(defn namespace-lookup 
   [token]
   
   ;;(println "DEBUG > 'namespace-lookup' CALLED > ["token"]" )
   (  {	 "group" "com/interrupt/bookkeeping/users"
	 "user" "com/interrupt/bookkeeping/users"
	 "account"  "com/interrupt/bookkeeping/account"
	 "journal"  "com/interrupt/bookkeeping/journal"
	 "entry"  "com/interrupt/bookkeeping/journal"
	 "entries"  "com/interrupt/bookkeeping/journal"
	 "debit"  "com/interrupt/bookkeeping/account"
	 "credit"  "com/interrupt/bookkeeping/account" 
      }
      token
   )
)

(defn execute-http-call [ full-URL http-method header-hash xml-content ] 
		
		;; from DB, get 'token' for 'option' args & value 
		(println "DEBUG > FINAL http query[" full-URL "]")
		
		(let [agt (clojure.contrib.http.agent/http-agent   
								
							 	;; TODO - parse results, check for i) null or ii) multiple results 
						  	full-URL 
						  	:method http-method 
							 	:header header-hash 
							 	:body xml-content 
							 	)]
				(if (clojure.contrib.http.agent/error? agt)
					(str "<error method='GET' query='" full-URL "' errors='" (agent-errors agt) "' />")
					(clojure.contrib.http.agent/string agt))
		)
	;;)
)



