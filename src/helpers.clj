(ns helpers) 

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
(defn working-dir-lookup [token]
   
   (println "DEBUG > 'working-dir-lookup' CALLED > ["(keyword token)"]" )
   
   (  {	 :group "aauthentication.main.authentication/groups.aauth.groups"
				 :user "aauthentication.main.authentication/users.aauth.users"
				 :account "groups.main.groups"
				 :journal "groups.main.groups"
				 :entry "groups.main.groups" 
				 :entries "groups.main.groups" 
				 :debit "groups.main.groups"
				 :credit "groups.main.groups" 
      }
      (keyword token)
   )
)
(defn namespace-lookup 
   [token]
   
   (println "DEBUG > 'namespace-lookup' CALLED > ["token"]" )
   
   (  {	 "group" "com/interrupt/bookkeeping/users"
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

