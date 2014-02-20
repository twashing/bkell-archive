(ns bkell.run
  (:require [ring.adapter.jetty :refer :all]))

(defn run []
  (defonce server
    (run-jetty #'bkell.handler/app {:port 8080 :join? false})))
