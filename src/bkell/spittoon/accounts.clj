(ns bkell.spittoon.accounts
  (:require [datomic.api :only [q db] :as d]
            [bkell.spittoon :as spittoon]
            [bkell.spittoon.identity :as identity]))


(defn list-accounts [conn]

  (let [query-expression '[:find ?e ?id ?name ?type ?counterWeight
                           :where
                           [?e :bookkeeping.group.books.account/id ?id]
                           [?e :bookkeeping.group.books.account/name ?name]
                           [?e :bookkeeping.group.books.account/type ?type]
                           [?e :bookkeeping.group.books.account/counterWeight ?counterWeight]]
        query-parameters []]
    (spittoon/query query-expression query-parameters conn)))


(defn find-account-by-id [conn aid]

  (let [query-expression '[:find ?e ?id ?name ?type ?counterWeight
                           :in $ [?id]
                           :where
                           [?e :bookkeeping.group.books.account/id ?id]
                           [?e :bookkeeping.group.books.account/name ?name]
                           [?e :bookkeeping.group.books.account/type ?type]
                           [?e :bookkeeping.group.books.account/counterWeight ?counterWeight]]
        query-parameters [aid]]
    (spittoon/query query-expression query-parameters conn)))

(defn find-account-by-name [conn aname]

  (let [query-expression '[:find ?e ?id ?name ?type ?counterWeight
                           :in $ [?name]
                           :where
                           [?e :bookkeeping.group.books.account/id ?id]
                           [?e :bookkeeping.group.books.account/name ?name]
                           [?e :bookkeeping.group.books.account/type ?type]
                           [?e :bookkeeping.group.books.account/counterWeight ?counterWeight]]
        query-parameters [aname]]
    (spittoon/query query-expression query-parameters conn)))

(defn find-account-by-type [conn atype]

  (let [query-expression '[:find ?e ?id ?name ?type ?counterWeight
                           :in $ [?type]
                           :where
                           [?e :bookkeeping.group.books.account/id ?id]
                           [?e :bookkeeping.group.books.account/name ?name]
                           [?e :bookkeeping.group.books.account/type ?type]
                           [?e :bookkeeping.group.books.account/counterWeight ?counterWeight]]
        query-parameters [(ffirst (identity/find-accounttype-by-name conn atype))]]
    (spittoon/query query-expression query-parameters conn)))

(defn find-account-by-counterWeight [conn aweight]

  (let [query-expression '[:find ?e ?id ?name ?type ?counterWeight
                           :in $ [?counterWeight]
                           :where
                           [?e :bookkeeping.group.books.account/id ?id]
                           [?e :bookkeeping.group.books.account/name ?name]
                           [?e :bookkeeping.group.books.account/type ?type]
                           [?e :bookkeeping.group.books.account/counterWeight ?counterWeight]]
        query-parameters [(ffirst (identity/find-counterweight-by-name conn aweight))]]
    (spittoon/query query-expression query-parameters conn)))


(defn generate-account-nominal [aname type-id weight-id]

  [{:db/id (d/tempid :db.part/user)
    :bookkeeping.group.books.account/id (d/squuid)
    :bookkeeping.group.books.account/name aname
    :bookkeeping.group.books.account/type type-id
    :bookkeeping.group.books.account/counterWeight weight-id}])

(defn create-account [conn aname atype counterWeight]

  (let [account (generate-account-nominal
                 aname
                 (ffirst (identity/find-accounttype-by-name conn atype))
                 (ffirst (identity/find-counterweight-by-name conn counterWeight)))]

    (spittoon/write-data conn account)))

(defn create-default-accounts [conn]

  (let [account-inputs [["cash"
                         (ffirst (identity/find-accounttype-by-name conn "asset"))
                         (ffirst (identity/find-counterweight-by-name conn "debit"))]
                        ["expense"
                         (ffirst (identity/find-accounttype-by-name conn "expense"))
                         (ffirst (identity/find-counterweight-by-name conn "credit"))]
                        ["revenue"
                         (ffirst (identity/find-accounttype-by-name conn "revenue"))
                         (ffirst (identity/find-counterweight-by-name conn "debit"))]
                        ["accounts payable"
                         (ffirst (identity/find-accounttype-by-name conn "liability"))
                         (ffirst (identity/find-counterweight-by-name conn "credit"))]]

        create-fn (fn [each-inputs]
                    (apply generate-account-nominal each-inputs))

        account-results (into []
                              (apply concat
                                     (map create-fn account-inputs)))]

    (spittoon/write-data conn account-results)))
