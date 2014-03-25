(ns bkell.component.bkell
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]
            [bkell.component.datomic :as cd]
            [bkell.component.httphandler :as ch]
            [bkell.component.runner :as cr]))


(def system-components [:datomic :httphandler])

(defrecord Bkell [env]
  component/Lifecycle

  (start [this]

    (timbre/debug "Bkell.start CALLED / env[" env "]")
    (component/start-system this system-components))

  (stop [this]

    (timbre/debug "Bkell.stop CALLED")
    (component/stop-system this system-components)))

(defn component-bkell [env]

  (component/system-map
   :datomic (cd/component-datomic env)
   :httphandler (component/using
                 (ch/component-httphandler env)
                 {:datomic :datomic})
   :runner (component/using
            (cr/component-runner env)
            {:datomic :datomic})
   :bkell (component/using
           (map->Bkell env)
           {:datomic :datomic
            :httphandler :httphandler})))
