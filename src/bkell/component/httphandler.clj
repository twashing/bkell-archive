(ns bkell.component.httphandler
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]

            [bkell.http.handler :as handler]))


(defrecord HttpHandler [env]
  component/Lifecycle

  (start [component]

    (timbre/trace "HttpHandler.start CALLED / env[" (keys env) "] / component[" (keys component) "]")

    (if-not (:app component)
      (assoc component :app (handler/create-app env))
      component))

  (stop [component]

    (timbre/trace "HttpHandler.stop CALLED")
    (dissoc component :app)))


(defn component-httphandler [env]
    (map->HttpHandler {:env env}))
