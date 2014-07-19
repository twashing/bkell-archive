(ns bkell.component.webrunner
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]
            [org.httpkit.server :as httpkit]))

(defrecord Runner [env]
  component/Lifecycle

  (start [component]

    (timbre/trace "Runner.start CALLED / " component)

    (if-not (:server component)
      (let [theapp (-> component :httphandler :app)
            theserver (httpkit/run-server theapp {})]
        (assoc component :server theserver))
      component))

  (stop [component]

    (timbre/trace "Runner.stop CALLED")
    ((:server component))
    (dissoc component :server)))

(defn component-webrunner [env]
  (map->Runner {:env env}))
