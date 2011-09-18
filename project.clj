
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
                      [clojure-source "1.2.0"]
                      [lein-fail-fast "1.0.0"]
	            ] 
  
  :jvm-opts ["-agentlib:jdwp=transport=dt_socket,server=y,suspend=n"]
  ;; Running SHELL bkell 
  ;; ... 

  ;; Running TESTs for server 
  ;; lein test bkell-test bjell-test http-test
  
  ;; Running TESTs for client
  ;; DISPLAY=:0 phantomjs public/test/run_tests.js  - basic test wrapper that pulls jasmine, bkeeping and test specs

  ;; trying with i) jasmine-node: https://github.com/mhevery/jasmine-node ii) downgraded nodejs to a stable version (v0.4.12)
  ;; ./public/test/bin/jasmine-node -i . -i public/javascript/ public/test/test_register.js 

  ;;:repl-init "src/bkell.clj" 
  :ring {:handler http.handler/app}
  :resources-path ".:src/:test/:src/commands/:src/spittoon/:vendor/:vendor/debug/:vendor/clojure/contrib/:public/:etc/resources/"
  ;;:resources-path ".:build/gen/:build/src/:src/:test/:src/commands/:src/spittoon/:vendor/252421/:vendor/congomongo/src/:vendor/congomongo/lib/mongo-java-driver-2.3.jar:vendor/congomongo/lib/clojure-1.2.0.jar:vendor/congomongo/lib/clojure-contrib-1.2.0.jar"
  
)

