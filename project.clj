(defproject thing "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [compojure "1.1.5"]
                 [com.cemerick/friend "0.1.3"]
                 [ring/ring-jetty-adapter "1.2.0-SNAPSHOT"]
                 [org.clojure/core.incubator "0.1.2"]
                 [enlive "1.0.1"]
                 [com.novemberain/monger "1.0.0-SNAPSHOT"]
                 [org.clojure/core.match "0.2.0-alpha9"]
                 [org.clojure/data.json "0.1.0"]
                 [clj-http "0.4.1"]
                 [lib-noir "0.3.5"]
                 ]
  :plugins [[lein-ring "0.8.2"]]
  :ring {:handler bkell.http.handler/app-routes}
  :profiles
  {:dev {:resource-paths ["public/" "etc/resources/"]
         :dependencies [[ring-mock "0.1.3"]]}})
