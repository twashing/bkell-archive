(ns bkell.component.bkell
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]))


(def system-components [])

(defrecord Mrservice [env]
  component/Lifecycle

  (start [this]

    (timbre/trace "Bkell.start CALLED > system[" this "] / env[" env "]")
    (component/start-system this system-components))

  (stop [this]

    (timbre/trace "Bkell.stop CALLED")
    (component/stop-system this system-components)))

(defn component-bkell [env]

  (component/system-map
   :bkell (component/using
               (map->Mrservice {:env env})
               {})))
