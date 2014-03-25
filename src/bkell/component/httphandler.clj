(ns bkell.component.httphandler
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]

            [bkell.handler :as handler]))


(defrecord HttpHandler [env]
  component/Lifecycle

  (start [component]

    (timbre/debug "HttpHandler.start CALLED / " (-> component :datomic :conn))
    (assoc component :app (handler/create-app (-> component :datomic :conn))))

  (stop [component]

    (timbre/debug "HttpHandler.stop CALLED")
    (dissoc component :app)))


(defn component-httphandler [env]
  (map->HttpHandler env))
