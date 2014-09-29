(defproject bkell "0.1.1"
  :description "Bkell provides a Shell and API for maintaining balanced records for business transactions."
  :url "http://bkeeping.com"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2342"]
                 [org.clojure/core.async "0.1.303.0-886421-alpha"]
                 [org.clojure/core.match "0.2.2"]
                 [org.clojure/tools.trace "0.7.8"]
                 [compojure "1.1.9"]
                 [enlive "1.1.5"]
                 [http-kit "2.1.19"]
                 [ring/ring-anti-forgery "1.0.0"]
                 [com.taoensso/timbre "3.3.1"]
                 [com.taoensso/encore "1.9.1"]
                 [com.taoensso/sente "1.0.0" :exclusions [org.clojure/clojure]]
                 [im.chit/hara.component "2.1.3"]
                 [com.cemerick/austin "0.1.4"]
                 [environ "1.0.0"]
                 [missing-utils "0.1.5"]
                 [adi "0.1.6"]
                 [crypto-random "1.2.0"]
                 [com.datomic/datomic-free "0.9.4899"] ]

  :clean-targets ^{:protect false} [:target-path :compile-path "out"]
  :plugins [[lein-cljsbuild "1.0.2"]
            ]

  :repl-options {:init-ns bkell.bkell}

  :profiles {:dev {:resource-paths ["." "resources/public"]
                   :dependencies [[javax.servlet/servlet-api "2.5"]
                                  [alembic "0.3.1"]
                                  [ring/ring-jetty-adapter "1.3.1"]
                                  [org.clojure/test.check "0.5.9"]]
                   :source-paths ["dev"]}}

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
