(defproject thing "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [compojure "1.1.5"]
                 [com.cemerick/friend "0.1.3"]
                 [ring/ring-jetty-adapter "1.2.0-SNAPSHOT"]]
  :plugins [[lein-ring "0.8.2"]]
  :ring {:handler thing.handler/app}
  :profiles
  {:dev {:dependencies [[ring-mock "0.1.3"]]}})
