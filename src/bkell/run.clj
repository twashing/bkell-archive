(ns bkell.run
  (:require [ring.adapter.jetty :refer :all]
            [bkell.handler :as handler]))

(defn run []
  (defonce server
    (run-jetty #'handler/app {:port 8080 :join? false})))
