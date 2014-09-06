(ns bkell.component.spittoon
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]
            [adi.core :as adi]
            [bkell.config :as cfg]))


(defn db-load-schema [file-name]
  (cfg/load-edn file-name))

(defn db-getconnection [env]
  (let [install-schema? true
        create-db? true
        schema-file "schema/bkeeping-adi.edn"
        db-url "datomic:mem://bkeeping"]

    (adi/datastore db-url (db-load-schema schema-file) install-schema? create-db?)))


(defrecord Spittoon [env]
  component/Lifecycle

  (start [component]

    (timbre/trace "Spittoon.start CALLED / env[" (keys env) "] / component[" (keys component) "]")


    (assoc component :db (db-getconnection env)))

  (stop [component]

    (timbre/trace "Spittoon.stop CALLED")
    (dissoc component :db)))


(defn component-spittoon [env]
    (map->Spittoon {:env env}))
