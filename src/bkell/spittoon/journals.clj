(ns bkell.spittoon.journals
  (:require [datomic.api :only [q db] :as d]
            [bkell.spittoon :as spittoon]
            [bkell.spittoon.identity :as identity]
            [bkell.spittoon.accounts :as accounts]))


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

;; find at (exactly)
(defn find-entry-by-date [conn edate]

  (let [query-expression '[:find ?e ?id ?date ?currency
                           :in $ [?date]
                           :where
                           [?e :bookkeeping.group.books.journal.entry/id ?id]
                           [?e :bookkeeping.group.books.journal.entry/date ?date]
                           [?e :bookkeeping.group.books.journal.entry/currency ?currency]]
        query-parameters [edate]]
    (spittoon/query query-expression query-parameters conn)))

;; find before
;; find after
;; find within a range


(defn find-entry-by-currency [conn currency-id]

  (let [query-expression '[:find ?e ?id ?date ?currency
                           :in $ [?currency]
                           :where
                           [?e :bookkeeping.group.books.journal.entry/id ?id]
                           [?e :bookkeeping.group.books.journal.entry/date ?date]
                           [?e :bookkeeping.group.books.journal.entry/currency ?currency]]
        query-parameters [currency-id]]
    (spittoon/query query-expression query-parameters conn)))


(defn generate-entry-nominal [conn date currency-id]

  [{:db/id (d/tempid :db.part/user)
    :bookkeeping.group.books.journal.entry/id (d/squuid)
    :bookkeeping.group.books.journal.entry/date (if date date (java.util.Date.))
    :bookkeeping.group.books.journal.entry/currency (ffirst (identity/find-currency-by-id currency-id conn))
    ;; :bookkeeping.group.books.journal.entry/assets ...
    ;; :bookkeeping.group.books.journal.entry/content ...
    }])

(defn create-entry

  ([conn gname date currencyid assets content]

     (let [date-f (if date date (java.util.Date.))

           ;; find :bookkeeping.group/defaultCurrency if none passed in
           currency-f (if currencyid
                        currencyid
                        (-> (identity/find-group-by-name conn gname) first (nth 3)))

           entry-nominal (generate-entry-nominal conn date-f currency-f)

           ;; potentially add assets
           entry-i (if (not (empty? assets))
                     (assoc-in entry-nominal [0 :bookkeeping.group.books.journal.entry/assets] assets)
                     entry-nominal)

           ;; potentially add content
           entry-f (if (not (empty? content))
                     (assoc-in entry-i [0 :bookkeeping.group.books.journal.entry/content] content)
                     entry-i)]

       (create-entry conn gname entry-f)))

  ([conn gname entry]

     (let [

           ;; create :db/id, conditionally
           entry-1 (if-not (:db/id entry)
                    (assoc entry :db/id (d/tempid :db.part/user))
                    entry)

           ;; create id, conditionally
           entry-2 (if-not (= java.util.UUID (type (:bookkeeping.group.books.journal.entry/id entry-1)))
                     (assoc entry-1 :bookkeeping.group.books.journal.entry/id (d/squuid))
                     entry-1)

           ;; convert date, conditionally
           entry-3 (if (nil? (type (:bookkeeping.group.books.journal.entry/date entry-2)))
                     (assoc entry-2 :bookkeeping.group.books.journal.entry/date (java.util.Date.))
                     (if (string? (:bookkeeping.group.books.journal.entry/date entry-2))
                       (assoc entry-2
                         :bookkeeping.group.books.journal.entry/date
                         (java.util.Date. (:bookkeeping.group.books.journal.entry/date entry-2)))
                       entry-2))

           ;; convert currency, conditionally
           entry-4 (if (nil? (:bookkeeping.group.books.journal.entry/currency entry-3))

                     ;; use default currency if existing is nil
                     (assoc entry-3
                       :bookkeeping.group.books.journal.entry/currency
                       (-> (identity/find-group-by-name conn gname) first (nth 3)))

                     ;; otherwise, lookup a string version
                     (let [cvalue (:bookkeeping.group.books.journal.entry/currency entry-3)]
                       (if (string? cvalue)
                         (assoc entry-3
                           :bookkeeping.group.books.journal.entry/currency
                           (ffirst (identity/find-currency-by-id cvalue conn)))
                         entry-3)))
           ]

       (clojure.pprint/pprint [entry-4])
       (spittoon/write-data conn [entry-4])
       )))


(defn generate-entrypart-nominal [conn & params]

  (let [[etype eamount eaccount ecurrency] params]

    [{:db/id (d/tempid :db.part/user)
      :bookkeeping.group.books.journal.entry.content/id (d/squuid)
      :bookkeeping.group.books.journal.entry.content/type
        (ffirst (identity/find-counterweight-by-name etype conn))
      :bookkeeping.group.books.journal.entry.content/amount eamount
      :bookkeeping.group.books.journal.entry.content/account
        (ffirst (accounts/find-account-by-name conn eaccount))
      :bookkeeping.group.books.journal.entry.content/currency
        (ffirst (identity/find-currency-by-id ecurrency conn))}]))
