(defproject bkell "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/clojurescript "0.0-2173"]
                 [org.clojure/clojure-contrib "1.2.0"]

                 [org.clojure/data.codec "0.1.0"]
                 [compojure "1.1.6"]
                 [com.datomic/datomic-pro "0.9.4572"]

                 [http-kit "2.1.17"]
                 [com.taoensso/sente "0.8.2"]]

  :ring {:handler bkell.handler/app}

  :resources-path "resources/public"
  :source-paths ["src/" "resources/templ/clojurescript/"]

  :plugins [[lein-cljsbuild "1.0.2"]
            [com.cemerick/austin "0.1.4"]]

  :cljsbuild {:builds [{
                        ;; The path to the top-level ClojureScript source directory:
                        :source-paths ["resources/templ/clojurescript/"]

                        ;; The standard ClojureScript compiler options:
                        ;; (See the ClojureScript compiler documentation for details.)
                        :compiler {
                                   :output-to "resources/public/js/main.js"
                                   :optimizations :whitespace
                                   :pretty-print true}}]}

  :profiles {:dev {:dependencies [[midje "1.6.3"]
                                  [javax.servlet/servlet-api "2.5"]
                                  [ring-mock "0.1.5"]

                                  [ring/ring-jetty-adapter "1.2.1"]
                                  [alembic "0.2.1"]]}})
