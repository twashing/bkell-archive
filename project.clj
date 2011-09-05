
(defproject bkell-clj "pre-alpha"
   :description "A Clojure implementation of the bookkeeping project"
   
   :dependencies  [ [org.clojure/clojure "1.3.0-beta1"]
                    [org.clojure/data.json "0.1.0"]
	                [org.clojure/clojure-contrib "1.2.0"]
                    [compojure "0.6.2"]
	                ;;[enlive "1.0.0-SNAPSHOT"]
                    ;;[log4j/log4j "1.2.7"]
                    [congomongo "0.1.5-SNAPSHOT"]
	          ]
  
  :dev-dependencies [ [lein-ring "0.4.0"]
                      [lein-search "0.3.4"]
                      [vimclojure/server "2.3.0-SNAPSHOT"]
                      [swank-clojure "1.4.0-SNAPSHOT"]
                      [slamhound "1.2.0"]
                      ;;[org.clojars.emh/vimclojure "2.2.0-SNAPSHOT"]
                      ;;[org.apache/commons-logging "1.1.1"]
                      ;;[log4j/log4j "1.2.15"]
	            ] 
  
  ;;:repl-init "src/bkell.clj" 
  :ring {:handler http.handler/app}
  :resources-path ".:src/:test/:src/commands/:src/spittoon/:vendor/:vendor/debug/:vendor/clojure/contrib/:public/:etc/resources/"
  ;;:resources-path ".:build/gen/:build/src/:src/:test/:src/commands/:src/spittoon/:vendor/252421/:vendor/congomongo/src/:vendor/congomongo/lib/mongo-java-driver-2.3.jar:vendor/congomongo/lib/clojure-1.2.0.jar:vendor/congomongo/lib/clojure-contrib-1.2.0.jar"
  
)

