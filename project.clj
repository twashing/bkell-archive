
(defproject bkell-clj "pre-alpha"
   :description "A Clojure implementation of the bookkeeping project"
   
   :dependencies  [ [org.clojure/clojure "1.2.0"]
		    [org.clojure/clojure-contrib "1.2.0"]
                    [compojure "0.6.2"]
		    [enlive "1.0.0-SNAPSHOT"]
                    [log4j/log4j "1.2.7"]
		  ]
  
  :dev-dependencies [ [lein-ring "0.4.0"]
		    ] 
  
  :ring {:handler http.handler/app}
  :resources-path ".:src/:test/:src/commands/:src/spittoon/:vendor/debug/"
  ;;:resources-path ".:build/gen/:build/src/:src/:test/:src/commands/:src/spittoon/:vendor/252421/:vendor/congomongo/src/:vendor/congomongo/lib/mongo-java-driver-2.3.jar:vendor/congomongo/lib/clojure-1.2.0.jar:vendor/congomongo/lib/clojure-contrib-1.2.0.jar"
  
)

