(ns bkell.component.root
  (:require [com.stuartsierra.component :as component]
            [bkell.component.datomic :as cd]))


(def system-components [:datomic])

(defrecord Root []
  component/Lifecycle

  (start [this]

    (println "Root.start CALLED")
    (component/start-system this system-components))

  (stop [this]

    (println "Root.stop CALLED")
    (component/stop-system this system-components)))

(defn component-root []

  (component/using
   (map->Root {:datomic (cd/component-datomic)})
   {:datomic :datomic}))
