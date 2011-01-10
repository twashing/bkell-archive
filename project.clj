
(defproject bkell-clj "pre-alpha"
   :description "A Clojure implementation of the bookkeeping project"
   
   :dependencies  [  	[org.clojure/clojure "1.2.0"]
						[org.clojure/clojure-contrib "1.2.0"]
                        [compojure "0.5.2"]
                        [ring/ring-jetty-adapter "0.3.3"]
                        [log4j/log4j "1.2.7"]
                        [sablecc "3.2"]
                        [clj-stacktrace "0.1.2"]
                        [clojure-http-client "1.1.0-SNAPSHOT"]
                        [com.interrupt/bookkeeping "0.0.0-prealpha"]
                        [com.interrupt/bob "0.0.0-prealpha"]
				  ]

    :dev-dependencies   [   [exist-db "1.4.0"]
                        ]
	
)

