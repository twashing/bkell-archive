(ns bkell.component.httphandler
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]

            [bkell.handler :as handler]))


(defrecord HttpHandler [env]
  component/Lifecycle

  (start [component]

    (timbre/debug "HttpHandler.start CALLED / env[" env "] / conn[" (-> component :datomic :conn) "]")

    (if-not (:app component)
      (assoc component
        :app (handler/create-app
              (-> component :datomic :conn)
              (:use-session env)))
      component))

  (stop [component]

    (timbre/debug "HttpHandler.stop CALLED / " (with-out-str (clojure.pprint/pprint component)))
    (dissoc component :app)))


(defn component-httphandler [env]
  (map->HttpHandler {:env env}))
