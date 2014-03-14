(ns bkell.component.datomic
  (:require [com.stuartsierra.component :as component]))

(defrecord Datomic []
  component/Lifecycle

  (start [this]
    (println "Datomic.start CALLED")
    this)

  (stop [this]
    (println "Datomic.stop CALLED")
    this))

(defn component-datomic []
  (map->Datomic {}))
