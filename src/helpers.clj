
(ns helpers 
	(:use clj-stacktrace.repl)
	(:require clojure.contrib.string)
	(:require clojure.contrib.http.agent)
	(:require clojure-http.resourcefully)
	(:require clojure.pprint)) 

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
(defn url-encode-spaces 
	" Replacing just spaces  
	<space>		%20 "
  [text]
  
  (clojure.contrib.string/replace-str " " "%20" text )	
)
(defn url-encode-newlines 
	" Replacing just newlines"
  [text]
  
  (clojure.contrib.string/replace-str (str \newline) "" text )	
)
(defn strip-xml-header [text]
  (clojure.contrib.string/replace-str "<?xml version='1.0' encoding='UTF-8'?>" "" text )	
)


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
;; TODO - replace URL with a config value 
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
	 "users" "com/interrupt/bookkeeping/users" 
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
		(println "DEBUG > FINAL http query[" full-URL "] > http-method[" http-method "] > header-hash[" header-hash "] > xml-content[" xml-content "]")
		
		(cond 
			(. "GET" equals http-method) 
				(try 
					(clojure-http.resourcefully/get full-URL header-hash xml-content)
					(catch Exception e { :msg "Error" :dmsg (. e getMessage ) } )
				)
			
			(. "PUT" equals http-method)
				(try 
					(clojure-http.resourcefully/put full-URL header-hash xml-content)
					(catch Exception e { :msg "Error" :dmsg (. e getMessage ) } )
				)
			(. "POST" equals http-method)
				(try 
					(clojure-http.resourcefully/post full-URL header-hash xml-content)
					(catch Exception e { :msg "Error" :dmsg (. e getMessage ) } )
				)
			
		)
)



