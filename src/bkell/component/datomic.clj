(ns bkell.component.datomic
  (:require [com.stuartsierra.component :as component]
            [bkell.config :as config]))



;; make connection

(defrecord Datomic [env]
  component/Lifecycle

  (start [component]

    (println "Datomic.start CALLED > " env)
    component)

  (stop [component]

    (println "Datomic.stop CALLED")
    component))

(defn component-datomic [env]
  (map->Datomic {:env env}))
