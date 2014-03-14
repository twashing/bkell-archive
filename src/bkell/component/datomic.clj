(ns bkell.component.datomic
  (:import java.lang.Exception)
  (:require [com.stuartsierra.component :as component]
            [bkell.config :as config]
            [bkell.spittoon :as spittoon]
            [bkell.init :as init]
            [bkell.domain.books :as books]
            [bkell.domain.accounts :as accounts]
            [bkell.domain.journals :as journals]
            [bkell.domain.identity :as identity]))



(defn database-construct [conn]

  (let [_ (spittoon/database-schema-create conn)
        init-result (init/init-db conn)
        _ init-result ;; kludge - ensuring transact result is being evaluated

        transact-result (init/init-default-group conn)
        group-populated (identity/populate-group-from-transact conn transact-result)
        aresults (accounts/create-default-accounts conn)
        jresults (journals/create-journal conn "generalledger")

        _ (println "group DB id: " (:db/id group-populated))
        _ (books/create-books conn (:db/id group-populated) aresults jresults)]
    ))


(defn database-boot [env]

  (if (:ephemeral env)
    (let [url (:url-datomic env)
          _ (try
              (spittoon/database-delete url)
              (catch Exception e (println "DB Boot: no database to delete... skipping")))
          _ (spittoon/database-create url)
          conn (spittoon/database-connect url)
          _ (database-construct conn)]

      conn)))


(defrecord Datomic [env]
  component/Lifecycle

  (start [component]

    (println "Datomic.start CALLED > " env)

    (assoc component :conn (database-boot env)))

  (stop [component]

    (println "Datomic.stop CALLED")
    component))

(defn component-datomic [env]
  (map->Datomic {:env env}))
