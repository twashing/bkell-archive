(defproject bkell "0.1.0-SNAPSHOT"

  :description "The bkell project is a Clojure implementation of 'Bookkeeping'. bkell provides a Shell and API for maintaining balanced records for business transactions."
  :url "http://bkeeping.com"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  :dependencies [ [org.clojure/clojure "1.4.0"]
                  [org.clojure/core.incubator "0.1.2"]
                  [com.novemberain/monger "1.0.0-SNAPSHOT"]
                  [compojure "1.1.5"]
                  [com.cemerick/friend "0.1.3"]
                  [ring/ring-jetty-adapter "1.2.0-SNAPSHOT"]
                  [org.clojure/data.json "0.1.0"]
                  [org.clojure/clojure-contrib "1.2.0"]
                  [clj-http "0.4.1"]
                  [org.clojure/core.match "0.2.0-alpha9"]
                  [enlive "1.0.0"]
                  [lib-noir "0.8.0"]
                  [org.clojars.hozumi/session-expiry "1.0.0-SNAPSHOT"]
                  ;;[com.cemerick/drawbridge "0.0.6"]
                  ;;[ring/ring-core "1.1.1"]
                  ;;[swank-clojure "1.4.2"]
                ]
  :dev-dependencies [ [midje "1.4.0"]
                      [lein-midje "1.0.10"]
                      [com.stuartsierra/lazytest "1.2.3"]
                    ]
  :plugins [[lein-ring "0.8.2"]
            [lein-swank "1.4.5"]]
  :ring {:handler bkell.handler/app}


  :repositories {"stuart" "http://stuartsierra.com/maven2"}

  ;; including both lein 1 & 2 configs for dev and local environments
  :resources-path ".:src/:test/:vendor/:vendor/debug/:public/:etc/resources/"
  :profiles {
             :dev {:resource-paths ["." "src/" "test/" "vendor/" "vendor/debug/" "public/" "etc/resources/"]
                   :dependencies [[ring-mock "0.1.3"]]}
            }
  ;;:main bkell.run.run-ring
)

