(defproject bkell "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2268"]
                 [compojure "1.1.8"]
                 [enlive "1.1.5"]
                 [http-kit "2.1.18"]
                 [com.taoensso/sente "0.14.1"]]

  :plugins [[lein-cljsbuild "1.0.2"]]

  :profiles {:dev {:resource-paths ["." "resources/public"]
                   :plugins [[com.cemerick/austin "0.1.3"]]
                   :dependencies [[javax.servlet/servlet-api "2.5"]]}}

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
