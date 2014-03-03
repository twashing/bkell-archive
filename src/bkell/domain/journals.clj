(ns bkell.domain.journals
  (:require [datomic.api :only [q db] :as d]
            [bkell.spittoon :as spittoon]
            [bkell.domain.identity :as identity]))


(defn list-journals [conn]

  (let [query-expression '[:find ?e ?id ?name
                           :where
                           [?e :bookkeeping.group.books.journal/id ?id]
                           [?e :bookkeeping.group.books.journal/name ?name]]
        query-parameters []]
    (spittoon/query query-expression query-parameters conn)))


(defn find-journal-by-id [conn jid]

  (let [query-expression '[:find ?e ?id ?name
                           :in $ [?id]
                           :where
                           [?e :bookkeeping.group.books.journal/id ?id]
                           [?e :bookkeeping.group.books.journal/name ?name]]
        query-parameters [jid]]
    (spittoon/query query-expression query-parameters conn)))


(defn find-journal-by-name [conn jname]

  (let [query-expression '[:find ?e ?id ?name
                           :in $ [?name]
                           :where
                           [?e :bookkeeping.group.books.journal/id ?id]
                           [?e :bookkeeping.group.books.journal/name ?name]]
        query-parameters [jname]]
    (spittoon/query query-expression query-parameters conn)))


(defn generate-journal-nominal [jname]

  [{:db/id (d/tempid :db.part/user)
    :bookkeeping.group.books.journal/id (d/squuid)
    :bookkeeping.group.books.journal/name jname
    ;; :bookkeeping.group.books.journal/entries ...
    }])

(defn create-journal [conn jname]

  (let [journal-nominal (generate-journal-nominal jname)]
    (spittoon/write-data conn journal-nominal)))