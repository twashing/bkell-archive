(ns bkell.component.datomic
  (:require [com.stuartsierra.component :as component]))

(defrecord Datomic []
  component/Lifecycle

  (start [component]

    (println "Datomic.start CALLED")
    component)

  (stop [component]

    (println "Datomic.stop CALLED")
    component))

(defn component-datomic []
  (map->Datomic {}))
