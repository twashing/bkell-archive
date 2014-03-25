(ns bkell.component.httphandler
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]))


(defrecord HttpHandler [env]
  component/Lifecycle

  (start [component]

    (timbre/debug "HttpHandler.start CALLED")
    (assoc component :app nil))

  (stop [component]

    (timbre/debug "HttpHandler.stop CALLED")
    (dissoc component :app)))


(defn component-httphandler [env]
  (map->HttpHandler env))
