(ns bkell.component.runner
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]

            [bkell.handler :as handler]
            [bkell.run :as run]))


(defrecord Runner [env]
  component/Lifecycle

  (start [component]

    (timbre/debug "Runner.start CALLED")
    (let [server (run/start (:app component))]
      (assoc component :server server)))

  (stop [component]

    (timbre/debug "Runner.stop CALLED")
    (dissoc component :server)))


(defn component-runner [env]
  (map->Runner env))
