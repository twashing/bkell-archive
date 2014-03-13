(ns bkell.component.datomic
  (:require [com.stuartsierra.component :as component]))


(defrecord Datomic [] component/Lifecycle

           (start [component] component)

           (stop [component] component))
