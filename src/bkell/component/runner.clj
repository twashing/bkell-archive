(ns bkell.component.runner
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]

            [bkell.handler :as handler]
            [bkell.run :as run]))


(defrecord Runner [env]
  component/Lifecycle

  (start [component]

    (timbre/debug "Runner.start CALLED / " component)
    (if-not (:server component)
      (let [server (run/start (-> component :httphandler :app))]
        (assoc component :server server))
      component))

  (stop [component]

    (timbre/debug "Runner.stop CALLED")
    ((:server component))
    (dissoc component :server)))

(defn component-runner [env]
  (map->Runner env))
