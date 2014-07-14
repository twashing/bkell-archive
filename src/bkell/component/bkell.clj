(ns bkell.component.bkell
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]

            [bkell.component.httphandler :as ch]
            [bkell.component.webrunner :as cw]))


(def system-components [:httphandler :webrunner])

(defrecord Bkell [env]
  component/Lifecycle

  (start [this]

    (timbre/trace "Bkell.start CALLED > system[" this "] / env[" env "]")
    (component/start-system this system-components))

  (stop [this]

    (timbre/trace "Bkell.stop CALLED")
    (component/stop-system this system-components)))

(defn component-bkell [env]

  (component/system-map
   :httphandler (component/using
                 (ch/component-httphandler env)
                 {})
   :webrunner (component/using
               (cw/component-webrunner env)
               {:httphandler :httphandler})
   :bkell (component/using
               (map->Bkell {:env env})
               {:httphandler :httphandler
                :webrunner :webrunner})))
