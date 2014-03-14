(ns bkell.component.bkell
  (:require [com.stuartsierra.component :as component]
            [bkell.component.datomic :as cd]))


(def system-components [:datomic])

(defrecord Bkell []
  component/Lifecycle

  (start [this]

    (println "Bkell.start CALLED")
    (component/start-system this system-components))

  (stop [this]

    (println "Bkell.stop CALLED")
    (component/stop-system this system-components)))

(defn component-bkell []

  (component/using
   (map->Bkell {:datomic (cd/component-datomic)})
   {:datomic :datomic}))
