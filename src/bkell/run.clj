(ns bkell.run
  (:require [ring.adapter.jetty :refer :all]
            [bkell.handler]))

(defn run []
  (defonce server
    (run-jetty #'bkell.handler/app {:port 8080 :join? false})))
