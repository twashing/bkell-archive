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




(defn list-entries [conn]

  (let [query-expression '[:find ?e ?id ?date ?currency
                           :where
                           [?e :bookkeeping.group.books.journal.entry/id ?id]
                           [?e :bookkeeping.group.books.journal.entry/date ?date]
                           [?e :bookkeeping.group.books.journal.entry/currency ?currency]]
        query-parameters []]
    (spittoon/query query-expression query-parameters conn)))


(defn find-entry-by-id [conn eid]

  (let [query-expression '[:find ?e ?id ?date ?currency
                           :in $ [?id]
                           :where
                           [?e :bookkeeping.group.books.journal.entry/id ?id]
                           [?e :bookkeeping.group.books.journal.entry/date ?date]
                           [?e :bookkeeping.group.books.journal.entry/currency ?currency]]
        query-parameters [eid]]
    (spittoon/query query-expression query-parameters conn)))

(defn find-entry-by-date [conn edate]

  (let [query-expression '[:find ?e ?id ?date ?currency
                           :in $ [?date]
                           :where
                           [?e :bookkeeping.group.books.journal.entry/id ?id]
                           [?e :bookkeeping.group.books.journal.entry/date ?date]
                           [?e :bookkeeping.group.books.journal.entry/currency ?currency]]
        query-parameters [edate]]
    (spittoon/query query-expression query-parameters conn)))

(defn find-entry-by-currency [conn currency-id]

  (let [query-expression '[:find ?e ?id ?date ?currency
                           :in $ [?currency]
                           :where
                           [?e :bookkeeping.group.books.journal.entry/id ?id]
                           [?e :bookkeeping.group.books.journal.entry/date ?date]
                           [?e :bookkeeping.group.books.journal.entry/currency ?currency]]
        query-parameters [currency-id]]
    (spittoon/query query-expression query-parameters conn)))


(defn generate-entry-nominal [conn currency-id]

  [{:db/id (d/tempid :db.part/user)
    :bookkeeping.group.books.journal.entry/id (d/squuid)
    :bookkeeping.group.books.journal.entry/date (java.util.Date.)
    :bookkeeping.group.books.journal.entry/currency (ffirst (identity/find-currency-by-id currency-id conn))
    ;; :bookkeeping.group.books.journal.entry/assets ...
    ;; :bookkeeping.group.books.journal.entry/content ...
    }])

(defn create-entry [conn & params]

  (let [[date currency-id assets content] params

        ;; otherwise find :bookkeeping.group/defaultCurrency
        ;; ... currency-f (if currency-id currency-id)
        currency-f currency-id
        entry-nominal (generate-entry-nominal conn currency-f)

        ;; potentially add assets
        ;; ...

        ;; potentially add content
        ;; ...

        entry-f entry-nominal]

    (spittoon/write-data conn entry-f)))
