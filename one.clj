
(use 'clojure.pprint)
(use 'helpers)

(def configs (load-file "etc/config/config.test.clj"))
(execute-embedded-db (:url-test configs) "PUT" {} nil)

;; 


;;(. java.lang.System setProperty "exist.initdb" "true")

(use 'clojure.pprint)
(require 'helpers)
(require 'commands.add)


(def configs (load-file "etc/config/config.test.clj"))

(def cl (. Class forName "org.exist.xmldb.DatabaseImpl"))
(def database (. cl newInstance))
(. database setProperty "create-database" "true")
(. org.xmldb.api.DatabaseManager registerDatabase database)

;;(def col (. org.xmldb.api.DatabaseManager getCollection "xmldb:exist://localhost:8088/xmlrpc/db/"))
(def col (. org.xmldb.api.DatabaseManager getCollection "xmldb:exist:///db" "admin" ""))


(add-user (:url-test configs) (:system-dir configs) { :tag "user" :attrs { :id "test.user" } } )

(get-user (:url-test configs) (:system-dir configs) { :tag "user" :attrs { :id "test.user" } } )

(helpers/execute-embedded-db "xmldb:exist:///db/exist/rest/testDB/aauthentication.main.authentication/users.aauth.users/user.test.user/user.test.user" 
    "PUT" 
    {"Content-Type" "text/xml"} 
    "<fubar/>")

(helpers/execute-embedded-db "xmldb:exist:///db/exist/rest/testDB/aauthentication.main.authentication/users.aauth.users/user.test.user/user.test.user" 
    "GET" {"Content-Type" "text/xml"} nil )

(let  [ dmanager
        (. col getService "DatabaseInstanceManager" "1.0")
      ]
      (. dmanager shutdown)
)


