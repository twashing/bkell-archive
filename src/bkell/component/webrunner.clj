(ns bkell.component.webrunner
  (:require [com.stuartsierra.component :as component]
            [ring.adapter.jetty :as jetty]
            [taoensso.timbre :as timbre]))

(defrecord Runner [env]
  component/Lifecycle

  (start [component]

    (timbre/trace "Runner.start CALLED / " component)

    (if-not (:server component)
      (let [theapp (-> component :httphandler :app)
            theserver (jetty/run-jetty theapp {:port 8080 :join? false})]
        (assoc component :server theserver))
      component))

  (stop [component]

    (timbre/trace "Runner.stop CALLED")
    (.stop (:server component))
    (dissoc component :server)))

(defn component-webrunner [env]
  (map->Runner {:env env}))
