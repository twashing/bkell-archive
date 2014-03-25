(ns bkell.run
  (:require [ring.adapter.jetty :refer :all]
            [org.httpkit.server :as httpkit]
            [bkell.handler :as handler]))


(def server nil)

(defn run [app]
  (alter-var-root #'server (fn [f] (httpkit/run-server app {}))))

(defn start [app] (run app))
(defn stop [] (if-not (nil? server) (server)))
