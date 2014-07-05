(ns bkell.run
  (:require [org.httpkit.server :as httpkit]
            [bkell.http.handler :as handler]))


(def server nil)

(defn run []
  (alter-var-root #'server (fn [f] (httpkit/run-server handler/app {}))))

(defn start [] (run))
(defn stop [] (if-not (nil? server) (server)))
