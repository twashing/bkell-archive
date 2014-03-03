(ns bkell.domain.accounts
  (:require [datomic.api :only [q db] :as d]
            [bkell.spittoon :as spittoon]
            [bkell.domain.identity :as identity]))


(defn list-accounts [conn]

  (let [query-expression '[:find ?e ?id ?name ?type ?counterWeight
                           :where
                           [?e :bookkeeping.group.books.account/id ?id]
                           [?e :bookkeeping.group.books.account/name ?name]
                           [?e :bookkeeping.group.books.account/type ?type]
                           [?e :bookkeeping.group.books.account/counterWeight ?counterWeight]]
        query-parameters []]
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
                 (ffirst (identity/find-accounttype-by-name atype conn))
                 (ffirst (identity/find-counterweight-by-name counterWeight conn)))]

    (spittoon/write-data conn account)))

(defn create-default-accounts [conn]

  (let [account-inputs [["cash"
                         (ffirst (identity/find-accounttype-by-name "asset" conn))
                         (ffirst (identity/find-counterweight-by-name "debit" conn))]
                        ["expense"
                         (ffirst (identity/find-accounttype-by-name "expense" conn))
                         (ffirst (identity/find-counterweight-by-name "credit" conn))]
                        ["revenue"
                         (ffirst (identity/find-accounttype-by-name "revenue" conn))
                         (ffirst (identity/find-counterweight-by-name "debit" conn))]
                        ["accounts payable"
                         (ffirst (identity/find-accounttype-by-name "liability" conn))
                         (ffirst (identity/find-counterweight-by-name "credit" conn))]]

        create-fn (fn [each-inputs]
                    (apply generate-account-nominal each-inputs))

        account-results (into []
                              (apply concat
                                     (map create-fn account-inputs)))]

    (spittoon/write-data conn account-results)))
