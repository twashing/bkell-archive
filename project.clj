(defproject bkell "0.1.0-SNAPSHOT"
  
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  
  :plugins [[lein-swank "1.4.4"]]
  
  :dependencies [ [org.clojure/clojure "1.3.0"]
                  [com.novemberain/monger "1.0.0-SNAPSHOT"]
                  [noir "1.3.0-beta8"]
                  [org.clojure/data.json "0.1.0"]
                  [org.clojure/clojure-contrib "1.2.0"]
                  [clj-http "0.4.1"]
                  [enlive "1.0.0"]
                  [org.clojure/core.match "0.2.0-alpha9"]
                  [com.cemerick/drawbridge "0.0.4"]
                  [ring/ring-core "1.1.1"]
                  [swank-clojure "1.4.2"]
                ]
  :dev-dependencies [ [midje "1.4.0"]
                      [lein-ring "0.7.1"]
                      [lein-midje "1.0.10"]
                      [com.stuartsierra/lazytest "1.2.3"]
                    ]
  
  :repositories {"stuart" "http://stuartsierra.com/maven2"}
  ;:resources-path ".:src/:test/:vendor/:vendor/debug/:public/:etc/resources/"
  :profiles {
              :dev {:resource-paths ["." "src/" "test/" "vendor/" "vendor/debug/" "public/" "etc/resources/"]}
            }
  :main bkell.run.run-ring
)
