(ns bkell.component.bkell
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]

            [bkell.component.browserrepl :as cb]
            [bkell.component.httphandler :as ch]
            [bkell.component.webrunner :as cw]))


(def system-components [:browserrepl :httphandler :webrunner])

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
   :browserrepl (component/using
                 (cb/component-browserrepl env)
                 {})
   :httphandler (component/using
                 (ch/component-httphandler env)
                 {:browserrepl :browserrepl})
   :webrunner (component/using
               (cw/component-webrunner env)
               {:httphandler :httphandler})
   :bkell (component/using
               (map->Bkell {:env env})
               {:httphandler :httphandler
                :webrunner :webrunner})))
