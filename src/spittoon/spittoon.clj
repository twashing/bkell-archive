(ns spittoon

"Spittoon is functionality to convert (CRUD) calls between 
    1. absolute XML path, to 
    2. a mapped XML path 


MAPPINGS 
/system.main.system/aauthentication.main.aauthentication/groups.aauth.groups/group.* 
/system.main.system/aauthentication.main.aauthentication/users.aauth.users/user.* 
/system.main.system/groups.main.groups/group.* 


CREATE - will create the node in the mapped path 
RETREVE - will retrieve the node from the mapped path 
UPDATE - will update the node at the mapped path 
DELETE - will delete the node from the mapped path 


For some examples, the absolute XML path A) will be mapped to a relative path B) 

A) /system.main.system/aauthentication.main.aauthentication/groups.aauth.groups/group.webkell/user.root
B) /system.main.system/aauthentication.main.aauthentication/groups.aauth.groups/<group.webkell>
        doc & path ->   group.webkell/user.root


A) /system.main.system/aauthentication.main.aauthentication/users.aauth.users/user.root/profileDetails.user.details
B) /system.main.system/aauthentication.main.aauthentication/users.aauth.users/<user.root>
        doc & path ->   user.root/profileDetails.user.details


A) /system.main.system/groups.main.groups/group.webkell/bookkeeping.main.bookkeeping/journals.main.journals/journal.generalledger/entries.main.entries/entry.qwertySTUB
B) /system.main.system/groups.main.groups/<group.webkell>
        doc & path ->   group.webkell/bookkeeping.main.bookkeeping/journals.main.journals/journal.generalledger/entries.main.entries/entry.qwertySTUB"

  (:import java.io.ByteArrayInputStream) 
  (:require helpers)
  (:require clojure.string)
  (:require clojure.contrib.logging)
  (:require clojure.contrib.str-utils2)
  (:require clojure.contrib.string)
  (:require clojure.xml)
  (:require [clj-http.client :as client])
  ;;(:require debug)
)

(def configs (load-file "etc/config/config.clj"))
(defn reconfigure 
  "Give Spittoon a new configuration using the given config file"
  [config-file]
  
  (def configs (load-file config-file))
)


(defn get-mapping 
  "For the eXist path A), we should get a mapping vector B) 
  A) /system.main.system/aauthentication.main.aauthentication/groups.aauth.groups/group.webkell/user.root
  B) ['/system.main.system/aauthentication.main.aauthentication/groups.aauth.groups/group.webkell', 'group.webkell/user.root']"

  [location map-list]
  
  (loop [mitem (first map-list) mlist map-list ]
    
    (if (clojure.contrib.str-utils2/contains? location mitem)
      (let [leaf-item (last (clojure.contrib.string/split (re-pattern mitem) location))]
        [ (str mitem (first (clojure.contrib.string/split #"/" leaf-item)) ) leaf-item ])
      (recur (first (rest mlist)) (rest mlist) ))
    
  )
)


(defn string-xpath-part 
  "Convert 'fu.bar' into fu[@id='bar']"
  [part]  
    (let [ ml (clojure.contrib.string/split #"\." part) ] 
        (str    (first ml) 
            "[@id='" 
            (clojure.contrib.str-utils2/join "." (rest ml)) 
            "']" ) ) 
) 
(defn xpath-from-epath 
  "We want to return a normal XPath chunk like so: 
    group.webkell/user.root   ->  group[@id='webkell']/user[@id='root'] "
    [epath]
    
    (let [rlist (clojure.contrib.string/split #"/" epath)]
        (reduce 
            (fn [a b] 
                (str  a (str "/" (string-xpath-part b)))) 
            (string-xpath-part (first rlist)) 
            (rest rlist) )
    )
)

(defn execute-http 

  "this function assumes eXist-db is running with the following services available
  
  RESTful Interface: 
  http://exist-db.org/devguide_rest.html
  
  XQuery Update Extensions: 
  http://exist-db.org/update_ext.html
  "

  [ http-method full-URL etal ] 
  ;;[ full-URL http-method header-hash xml-content ] 
	
	;; from DB, get 'token' for 'option' args & value 
	(clojure.contrib.logging/debug 
      (str "DEBUG > FINAL http query[" full-URL "] > http-method[" http-method "] > et al.[" etal "]"))
	
    (try
	  (cond 
		(. "GET" equals http-method) 
		  (client/get full-URL {:query-params etal } )
        
		(. "PUT" equals http-method)  ;; CREATE 
		  (client/put full-URL {:body (:body etal)} )
		
        (. "POST" equals http-method) ;; CREATE / UPDATE 
		  (client/post full-URL )
		
        (. "DELETE" equals http-method)
		  (client/delete full-URL )
	  )
	  (catch Exception e { :msg "Error" :dmsg (. e getMessage ) } )
    )
)


(comment ****
  HELPER functions for CRUD operations)
(defn xpath-derive-parent 
  "For a given xpath, returns the parent. So, given A), we want B)
  A) group[@id='webkell']/user[@id='root']
  B) group[@id='webkell'] "
  [xpath]
  
  (let [slist (clojure.contrib.string/split #"/" xpath )] ;; separate the list 
    (let [rlist (take (- (count slist) 1) slist)]   ;; reduce the list
      (clojure.string/join "/" rlist)     ;; join together the final product 
    )
  )
)
(defn build-update-query 
  "Builds a query that follows eXists XQuery Update Extensions: http://exist-db.org/update_ext.html
  So an insert might look something like: 
    update insert <email type='office'>andrew@gmail.com</email> into //address[fname='Andrew']"
  [action xinput xpath]
  
  (let [apfn #(str "declare default element namespace '" (helpers/namespace-lookup %1) "'; "
      "update " action " " xinput " into " xpath)]
    (if (map? xinput) 
      (let [token 
            (clojure.contrib.string/as-str (:tag xinput)) ] ;; XML tagname returned as :keyword -> converting to string 
        (apfn token))
      (let [token 
            (clojure.contrib.string/as-str (:tag (clojure.xml/parse (ByteArrayInputStream. (.getBytes xinput "UTF-8"))))) ]
        (apfn token))
    )
  )
)

(comment ****
  CRUD operations)
(defn create [exist-path xpath xdoc]
  
  ;;(debug/debug-repl)
  (let  [ base-url (str (:db-base-URL spittoon/configs) (:system-dir spittoon/configs)) ]
    
    (let [  filtered-path (if (= "/" (clojure.contrib.string/take 1 exist-path)) ;; removing / prefix if exists 
                            (clojure.contrib.str-utils2/drop exist-path 1)
                            exist-path)
            parent-path (xpath-derive-parent xpath) ] 
      
      (if (clojure.string/blank? parent-path)
        (execute-http "PUT" (str base-url filtered-path) { :body xdoc }) ;; direct PUT if xpath has no parent 
        (execute-http "GET" (str base-url filtered-path) 
          { :body xdoc 
            :query-params { "_wrap" "no" "_query" (build-update-query "insert" xdoc parent-path)}}) ;; insert into location if xpath HAS parent 
      )
    )
  )
)

