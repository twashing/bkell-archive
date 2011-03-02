
(ns helpers 
	(:use clj-stacktrace.repl)
	(:require clojure.string)
	(:require clojure.contrib.string)
	(:require clojure.contrib.http.agent)
	(:require clojure-http.resourcefully)
    (:require clojure.contrib.logging)
  
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


(defn fsxml-prep [text] 
  
  (let [smap { "< " "<" " : " ":" " / >" " />" "< /" "</" " / " "/" #"=\"\s" "=\"" #"\s\"" "\"" " = " "=" }]  ;; map of all pattenrs to find 
    (loop [skeys (keys smap) txt text]  ;; loop point with i) search keys and ii) text 
      (if (empty? skeys)
        txt                 ;; return text if we've exhasted search keys 
        (recur              ;; otherwise recurse with remaining keys and ii) altered text 
          (rest skeys) 
          (let [cur (first skeys)] 
            (apply (if (string? cur) clojure.contrib.string/replace-str clojure.contrib.string/replace-re )
              `(~cur ~(smap cur) ~txt ) )))
      )
    )
  )
)

(defn filterSpacesFromXML 

  "this is supposed to turn something like A. into B.
     A. <profileDetail xmlns=' com/interrupt/bookkeeping/users ' id=' email ' name=' email ' value=' twashing-gmail.com ' >
     B. <profileDetail xmlns='com/interrupt/bookkeeping/users' id='email' name='email' value='twashing-gmail.com' >"
  [text] 

  (let [prep (fsxml-prep text)]
  
    (reduce 
            #(clojure.string/replace-first %1 %2 (clojure.contrib.string/trim %2)) 
            text (re-seq #"\s[\/\-\.a-zA-Z]+\s" prep)) )
)


;; set get base URL ...TODO - put in config 
;; TODO - replace URL with a config value 
(def configs (load-file "etc/config/config.clj"))
(def db-base-URL (:db-base-URL configs)) 


;; set root/system dir fragment ...TODO - put in config 
(def db-system-DIR "rootDir/system.main.system/") 

;; working directory lookup ...TODO - put these lookups into config 
(defn working-dir-lookup [token]
   
   ;;(clojure.contrib.logging/info (str "DEBUG > 'working-dir-lookup' CALLED > ["(keyword token)"]" ))
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
   
   ;;(clojure.contrib.logging/info (str "DEBUG > 'namespace-lookup' CALLED > ["token"]" ))
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


  
(defn parse-url 

  "This function just groks for various chunks of the URL. So for example: 
  
  URL:  xmldb:exist:///db/exist/rest/testDB/groups.main.groups/group.test.user/bookkeeping.main.bookkeeping/bookkeeping.main.bookkeeping
  
  chunk-root: xmldb:exist:///db/
  chunk-parent: exist/rest/testDB/groups.main.groups/group.test.user/bookkeeping.main.bookkeeping/
  name-parent:  xmldb:exist:///db/exist/rest/testDB/groups.main.groups/group.test.user/bookkeeping.main.bookkeeping/
  name-leaf:  bookkeeping.main.bookkeeping"

  [url key-name]
  
  (def url-parse-map  { :chunk-root   #(first (re-seq #"xmldb:exist:\/\/\/db" %))
                        :chunk-parent #(subs ((:name-parent url-parse-map) %) (count ((:chunk-root url-parse-map) %)))
                        :name-parent  #(subs % 0 (. % lastIndexOf "/"))
                        :name-leaf    #(subs % (+ 1 (. % lastIndexOf "/")))
                      })

  ((key-name url-parse-map) url)
  
)

(defn internal-create-resource [col full-URL xml-content] 
  
  (let  [resource (. col createResource (parse-url full-URL :name-leaf) "XMLResource" ) ]
      
      (. resource setContent xml-content)
      (. col storeResource resource))
)
(defn execute-embedded-db [ full-URL http-method header-hash xml-content ]
  
  (clojure.contrib.logging/info (str "execute-embedded-db CALLED [" full-URL "] > http-method[" http-method "] > header-hash[" header-hash "] > xml-content[" xml-content "]"))
  (let [cl (. Class forName "org.exist.xmldb.DatabaseImpl")]  ;; fire up db class driver and initialize database
    (let [database (. cl newInstance)]
      (. database setProperty "create-database" "true")
      (. org.xmldb.api.DatabaseManager registerDatabase database)
      
      (clojure.contrib.logging/debug (str "URL parent: " (parse-url full-URL :name-parent)) )
      (clojure.contrib.logging/debug (str "URL leaf: " (parse-url full-URL :name-leaf)) )
      
      (let  [col  (try  (. org.xmldb.api.DatabaseManager getCollection (parse-url full-URL :name-parent) "admin" "")  ;; get parent collection for URL 
                        (catch java.lang.Exception e (clojure.contrib.logging/info (str "Error type[" (type e) "] > msg[" (. e getMessage) "]" )))
                  )
            ]
           
          (clojure.contrib.logging/debug (str "parent collection: " col))
          (try    ;; only executing of parent collection was found 
            (cond 
		      (. "GET" equals http-method) 
			    (if (not (nil?  col))
			      (let  [res (. col  getResource (parse-url full-URL :name-leaf))]
		            (if (not (nil? res)) (. res getContent))))
		      (. "PUT" equals http-method)
			    (if (nil?  col)
		          (let [root  (. org.xmldb.api.DatabaseManager getCollection (parse-url full-URL :chunk-root))]
		            (let  [mgt (. root getService "CollectionManagementService" "1.0")]
		              (let  [col (. mgt createCollection (parse-url full-URL :chunk-parent))]
		                  (internal-create-resource col full-URL xml-content)
		              )
		            ))
		          (internal-create-resource col full-URL xml-content))

		      (. "POST" equals http-method)
		        (try ;; createResource / storeResource
		        )
		      (. "DELETE" equals http-method)
                (try  ;; with XML:DB, no way to check type of URI (collection or resource), i) trying collection then ii) resource 
	              
		          (let [root  (. org.xmldb.api.DatabaseManager getCollection (parse-url full-URL :chunk-root))]
                    
                    (clojure.contrib.logging/info (str "DELETE > URI[" (str (parse-url full-URL :chunk-parent) "/" (parse-url full-URL :name-leaf)) "]" ))
                    
		            (let  [mgt (. root getService "CollectionManagementService" "1.0")]     ;; first try removing collection 
		              (. mgt removeCollection (str (parse-url full-URL :chunk-parent) "/" (parse-url full-URL :name-leaf)))))
                  (catch java.lang.Exception e          ;; if failed, try removing resource
                    (clojure.contrib.logging/info (str "URI not a collection, trying resource > Error[" (type e) "] > msg[" (. e getMessage) "]" ))
                    (try  (let  [resource (. col getResource (parse-url full-URL :name-leaf)) ]
                            (. col removeResource resource))
                          (catch java.lang.Exception e (clojure.contrib.logging/info (str "URI not a resource, nil > Error type[" 
                            (type e) "] > msg[" (. e getMessage) "]" ))))
                  )
                )
            )
          )
      )
    )
  )
) 

(defn execute-http-call [ full-URL http-method header-hash xml-content ] 
		
		;; from DB, get 'token' for 'option' args & value 
		(clojure.contrib.logging/debug (str "DEBUG > FINAL http query[" full-URL "] > http-method[" http-method "] > header-hash[" header-hash "] > xml-content[" xml-content "]"))
		
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
  (clojure.contrib.logging/debug (str "execute-command CALLED > full-URL["full-URL"] > http-method["http-method"] > header-hash["header-hash"] > xml-content["xml-content"]"))
  (if (empty? (re-seq #"xmldb:exist:\/\/\/db" full-URL))    ;; check for URL prefix - xmldb:exist:///db
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
      [result
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
	  
      (clojure.contrib.logging/info (str "RESULT USER > type[" (type result) "] > result[" result "]" ))
      (if (not (nil? result))
        (if (map? result)
          (if (not (nil? (:msg result)))   ;; this message is usually "Error" 
            (parse-xml-to-hash (:body-seq result)))
          (parse-xml-to-hash result))
      )
    )

)
