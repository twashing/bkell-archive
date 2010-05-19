
(defproject bkell-clj 
   :description "A clojure implementation of the beekkeeping project"
   
   
   :repositories  [   ["clojars" "http://clojars.org/repo"]
		  ]
   :dependencies  [  [org.clojure/clojure-lang "1.1.0-alpha-SNAPSHOT"]
		     [org.clojure/clojure-contrib "1.0-SNAPSHOT"]
		  ]
   :dev-dependencies [	[lein-javac "0.0.1-SNAPSHOT"]
		     ]

   :library-path  [  ["lib/"]
		     ["lib/zob"] ]
   
   
   
   (comment :compile-path "build"
   
   :java-source-path "src"
   :javac-fork "true"
   )
   
)

