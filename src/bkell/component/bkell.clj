(ns bkell.component.bkell
  (:require [com.stuartsierra.component :as component]
            [bkell.component.datomic :as cd]))


(def system-components [:datomic])

(defrecord Bkell [env]
  component/Lifecycle

  (start [this]

    (println "Bkell.start CALLED > " env)
    (component/start-system this system-components))

  (stop [this]

    (println "Bkell.stop CALLED")
    (component/stop-system this system-components)))

(defn component-bkell [env]

  (component/using
   (map->Bkell {:env env
                :datomic (cd/component-datomic env)})
   {:datomic :datomic}))
