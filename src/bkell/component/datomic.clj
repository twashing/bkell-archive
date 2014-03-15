(ns bkell.component.datomic
  (:require [com.stuartsierra.component :as component]))


(defn startd [url])
(defn startd-ephemeral [url])

(defn bootd [env]
  (if (:ephemeral env)
    (with-meta
      (partial startd-ephemeral (:url-datomic env))
      {:name :startd-ephemeral})
    (with-meta
      (partial startd (:url-datomic env))
      {:name :startd})))

(defrecord Datomic [env]
  component/Lifecycle

  (start [this]
    (println "Datomic.start CALLED / env[" env "]")
    this)

  (stop [this]
    (println "Datomic.stop CALLED")
    this))

(defn component-datomic [env]
  (map->Datomic {:env env}))
