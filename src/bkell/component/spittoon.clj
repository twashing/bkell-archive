(ns bkell.component.spittoon
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]
            [adi.core :as adi]
            [adi.utils :refer [iid ?q]]
            [bkell.config :as cfg]))


(defn db-load-schema [file-name]
  (cfg/load-edn file-name))

(defn db-install-schema [data-store default-file]
  (let [df (eval (cfg/load-edn default-file))]
    (adi/insert! data-store df)))

(defn db-getconnection [env]

  (let [install-schema? true
        create-db? true

        schema-file "db/schema-adi.edn"
        default-file "db/default.edn"
        db-url "datomic:mem://bkeeping"
        ds (adi/datastore db-url (db-load-schema schema-file) install-schema? create-db?)]

    (if create-db? (db-install-schema ds default-file))
    ds))


(defrecord Spittoon [env]
  component/Lifecycle

  (start [component]

    (timbre/trace "Spittoon.start CALLED / env[" (keys env) "] / component[" (keys component) "]")
    (let [db (db-getconnection env)]
      (assoc component :db db)))

  (stop [component]

    (timbre/trace "Spittoon.stop CALLED")
    component #_(dissoc component :db)))


(defn component-spittoon [env]
  (map->Spittoon {:env env}))
