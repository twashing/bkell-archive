(defproject bkell "0.1.0-SNAPSHOT"
  :description "Bkell provides a Shell and API for maintaining balanced records for business transactions."
  :url "http://bkeeping.com"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2268"]
                 [org.clojure/core.async "0.1.303.0-886421-alpha"]
                 [org.clojure/core.match "0.2.1"]
                 [compojure "1.1.8"]
                 [enlive "1.1.5"]
                 [http-kit "2.1.18"]
                 [com.taoensso/timbre "3.1.6"]
                 [com.taoensso/sente "0.14.1"]
                 [com.stuartsierra/component "0.2.1"]
                 [environ "0.5.0"]
                 [missing-utils "0.1.1"]]

  :plugins [[lein-cljsbuild "1.0.2"]]

  :repl-options {:init-ns bkell.bkell}

  :profiles {:dev {:resource-paths ["." "resources/public"]
                   :plugins [[com.cemerick/austin "0.1.3"]]
                   :dependencies [[javax.servlet/servlet-api "2.5"]
                                  [alembic "0.2.1"]
                                  [ring/ring-jetty-adapter "1.2.1"]]}}

  :cljsbuild {:builds [{:id "bkell"

                        ;; The path to the top-level ClojureScript source directory:
                        :source-paths ["resources/templ/clojurescript/"]

                        ;; The standard ClojureScript compiler options:
                        ;; (See the ClojureScript compiler documentation for details.)
                        :compiler {
                                   :output-to "resources/public/js/bkell.js"
                                   :output-dir "resources/public/js/out/"
                                   :optimizations :none
                                   :source-map true
                                   :pretty-print true}}]})
