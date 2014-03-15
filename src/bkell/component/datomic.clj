(ns bkell.component.datomic
  (:require [com.stuartsierra.component :as component]
            [bkell.init :as init]
            [bkell.spittoon :as spittoon]
            [bkell.domain.books :as books]
            [bkell.domain.accounts :as accounts]
            [bkell.domain.journals :as journals]))


(defn startd [url])

(defn startd-delete-create [url]
  (let [_ (try (spittoon/database-delete url) (catch Exception e nil))
        _ (spittoon/database-create url)]
    (spittoon/database-connect url)))

(defn startd-ephemeral [url]

  (let [conn (startd-delete-create url)

        result-schema (init/init-schema conn)
        result-group (init/init-default-group conn)
        result-accounts (accounts/create-default-accounts conn)
        result-journals (journals/create-journal conn "generalledger")
        result-books (books/create-books conn nil result-accounts result-journals)]

    ))

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
