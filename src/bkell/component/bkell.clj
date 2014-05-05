(ns bkell.component.bkell
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]
            [bkell.component.datomic :as cd]
            [bkell.component.httphandler :as ch]
            [bkell.component.runner :as cr]))


(def system-components [:datomic :httphandler :runner])

(defrecord Bkell [env]
  component/Lifecycle

  (start [this]

    (timbre/debug "Bkell.start CALLED / env[" env "]")

    (if-not (:env this)
      (component/start-system (assoc this :env env)
                              system-components)
      this))

  (stop [this]

    (timbre/debug "Bkell.stop CALLED / " (with-out-str (clojure.pprint/pprint this)))
    (component/stop-system this system-components)))

(defn component-bkell [env]

  (component/system-map
   :datomic (component/using
             (cd/component-datomic env)
             {})
   :httphandler (component/using
                 (ch/component-httphandler env)
                 {:datomic :datomic})
   :runner (component/using
            (cr/component-runner env)
            {:httphandler :httphandler})
   :bkell (component/using
           (map->Bkell {:env env})
           {:datomic :datomic
            :httphandler :httphandler
            :runner :runner})))
