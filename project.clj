
(defproject bkell-clj 
   :description "A Clojure implementation of the bookkeeping project"
   
   
   ;;:repositories  [   ["clojars" "http://clojars.org/repo"]
	 ;;  						]
   :dependencies  [  	[org.clojure/clojure-lang "1.2.0-RC3"]
		     							[org.clojure/clojure-contrib "1.2.0-RC3"]
		  						]
	
   :library-path  [ 	["lib/"]
		     							["lib/zob"] ]
   
   (comment :compile-path "build"
   
   :java-source-path "src"
   :javac-fork "true"
   )
   
)

