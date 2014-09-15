(ns bkell.component.webrunner
  (:require [hara.component :as hco]
            [taoensso.timbre :as timbre]
            [org.httpkit.server :as httpkit]))

(defrecord Runner [env]
  hco/IComponent

  (-start [rc]

    (timbre/trace "Runner.start CALLED > rc[" rc "]")

    (if-not (:server rc)
      (let [theapp (-> rc :httphandler :app)
            theserver (httpkit/run-server theapp {})]
        (assoc rc :server theserver))
      rc))

  (-stop [rc]

    (timbre/trace "Runner.stop CALLED")
    ((:server rc))
    (dissoc rc :server)))
