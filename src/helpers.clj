
(ns helpers 
	(:use clj-stacktrace.repl)
	(:require clojure.contrib.string)
	(:require clojure.contrib.http.agent)
	(:require clojure-http.resourcefully)
	(:require clojure.pprint)
  
    (:import java.io.ByteArrayInputStream)
) 

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


(defn execute-embedded-db [ full-URL http-method header-hash xml-content ]
  
  (let [cl (. Class forName "org.exist.xmldb.DatabaseImpl")]
    (let [database (. cl newInstance)]
      (. database setProperty "create-database" "true")
      (. org.xmldb.api.DatabaseManager registerDatabase database)
      
      (println "DEBUG > FINAL embedded query[" full-URL "] > http-method[" http-method "] > header-hash[" header-hash "] > xml-content[" xml-content "]")
      
      (let  [col 
                  (try  (. org.xmldb.api.DatabaseManager getCollection 
                          (subs full-URL 0 (. full-URL lastIndexOf "/")) ;; get just the collection name 
                        "admin" "")
                        (catch java.lang.Exception e (println (str "Error type[" (type e) "] > msg[" (. e getMessage) "]" )))
      
                  )
            ]
           
	      (if col 
            (try    ;; only executing of parent collection was found 
              (cond 
		        (. "GET" equals http-method) 
	              (let  [resource (. col  getResource 
                                    (subs full-URL (+ 1 (. full-URL lastIndexOf "/"))) )  ;; the name of the document
                                ])
		        (. "PUT" equals http-method)
			      (try ;; createResource / storeResource
			      )
		        (. "POST" equals http-method)
			      (try ;; createResource / storeResource
			      )
		        (. "DELETE" equals http-method)
	              (. col removeResource)
              )
                  
              ;;(finally 
              ;;  (do 
              ;;    (let [dmanager (. col getService "DatabaseInstanceManager" "1.0")]
              ;;      (. dmanager shutdown))
                  
              ;;    (. org.xmldb.api.DatabaseManager deregisterDatabase database)))
            )
            nil
          )
      )
    )
  )
) 

;;(execute-embedded-db "http:///exist/rest/testDB/aauthentication.main.authentication/users.aauth.users/user.test.user/user.test.user" "GET" nil nil)

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
			(. "DELETE" equals http-method)
				(try 
					(clojure-http.resourcefully/delete full-URL header-hash nil)
					(catch Exception e { :msg "Error" :dmsg (. e getMessage ) } )
				)
			
		)
)


(defn execute-command [ full-URL http-method header-hash xml-content ] 
  (if (empty? (re-seq #"http:\/\/\/exist" full-URL))    ;; check for URL prefix - http:///exist
    (execute-http-call full-URL http-method header-hash xml-content) ;; true - a remote DB call 
    (execute-embedded-db full-URL http-method header-hash xml-content) ;; false - a local DB call
  )
)


(defn parse-xml-to-hash [x-input]

  (clojure.xml/parse (ByteArrayInputStream. (.getBytes 
	(clojure.contrib.str-utils/str-join nil x-input)		;; get the XML string  
	"UTF-8"))) 
)	

(defn get-user [db-base-URL db-system-DIR working-USER] 

    (let 
      [result-hash 
	    (execute-command 	;; TODO - put in 404 check 
		  (str 
			db-base-URL 
			db-system-DIR 
			(working-dir-lookup (:tag working-USER)) 	;; stringing together lookup URL leaf 
			"/" 
			(str 
				(name (:tag working-USER)) 
				"." 
				(:id (:attrs working-USER)))
			"/"
			(str 			;; repeating user name as leaf document 
				(name (:tag working-USER)) 
				"." 
				(:id (:attrs working-USER))))
			"GET" 
			{"Content-Type" "text/xml"} 
			nil
      ) ]
	  
      (println "RESULT USER > result-hash... " result-hash)
      (if (not (nil? result-hash))
        (parse-xml-to-hash (:body-seq result-hash))
      )
    )

)
