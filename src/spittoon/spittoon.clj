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

  (:require clojure.contrib.str-utils2)
  (:require clojure.contrib.string)
  ;;(:require debug)
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


(defn string-xpath-part [part]  ;; convert "fu.bar" into fu[@id='bar']
    
    (let [ ml (clojure.contrib.string/split #"\." part) ] 
        (str    (first ml) 
            "[@id='" 
            (clojure.contrib.str-utils2/join "." (rest ml)) 
            "']" ) 
    ) 
) 

(defn xpath-from-epath 
"We want to return a normal XPath chunk like so: 
    group.webkell/user.root   ->  group[@id='webkell']/user[@id='root'] "
    [epath]
    
    (let [rlist (clojure.contrib.string/split #"/" epath)]
        ;;(debug/debug-repl)
        (reduce 
            (fn [a b] 
                (str    a 
                    (str "/" (string-xpath-part b))
                )) 
            (string-xpath-part (first rlist)) 
            (rest rlist) )
    )
)





