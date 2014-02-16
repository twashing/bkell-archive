(defproject bkell "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [compojure "1.1.6"]
                 ]

  :ring {:handler bkell.handler/app}

  :resources-path "resources/public"
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]

                        [ring/ring-jetty-adapter "1.2.1"]
                        [alembic "0.2.1"]]}})
