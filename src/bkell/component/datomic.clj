(ns bkell.component.datomic
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]
            [bkell.init :as init]
            [bkell.spittoon :as spittoon]
            [bkell.domain.books :as books]
            [bkell.domain.accounts :as accounts]
            [bkell.domain.journals :as journals]))


(defn startd [url]
  (spittoon/database-connect url))


(defn startd-populate [conn]
  (let [result-default (init/init-default conn)
        _ (vals result-default)  ;; kludge - needed elements won't transact unless realized here

        result-group (init/init-default-group conn)
        _ (vals result-group)

        group-entity (->> result-group
                          :tempids
                          seq
                          (map second)
                          (map #(spittoon/populate-entity conn %))
                          (filter #(not (nil? (:bookkeeping.group/name %))))
                          first)

        result-accounts (accounts/create-default-accounts conn)
        account-list (->> result-accounts :tempids vals (into []))


        result-journals (journals/create-journal conn "generalledger")
        journal-list (->> result-journals :tempids vals (into []))

        result-books (books/create-books conn (:db/id group-entity) account-list journal-list)]

    result-books))

(defn startd-schema [conn]
  (spittoon/database-schema-create conn))

(defn startd-delete-create [url]
  (let [_ (try (spittoon/database-delete url) (catch Exception e nil))
        _ (spittoon/database-create url)]
    (spittoon/database-connect url)))

(defn startd-ephemeral [url]
  (let [conn (startd-delete-create url)
        _ (startd-schema conn)
        _ (startd-populate conn)]
    conn))

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
