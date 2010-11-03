(ns http.handler
    (:use compojure.core)
    (:require [compojure.route :as route])
    (:use ring.adapter.jetty)
    )

(defroutes core
  (GET "/" [] "<h1>Hello World Wide Web!</h1>")
  (route/not-found "Page not found")
)

(run-jetty core {:port 8080})

