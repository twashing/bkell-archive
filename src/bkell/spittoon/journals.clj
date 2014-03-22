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

(defn entrypart-conversion [conn entry]

  ;;(println (str "entry-balanced? > uname[" uname "] > entry[" entry "]"))
  (let [result  (map (fn [epart]

                       (let [
                             ;; :bookkeeping.group.books.journal.entry.content/type "dt" ; conversion
                             epart-1 (if (string? (:bookkeeping.group.books.journal.entry.content/type epart))
                                       (let [cwvalue
                                             (:bookkeeping.group.books.journal.entry.content/type epart)
                                             cwid (ffirst (identity/find-counterweight-by-id cwvalue conn))]

                                         (assoc epart
                                           :bookkeeping.group.books.journal.entry.content/type cwid))
                                       epart)

                             ;; :bookkeeping.group.books.journal.entry.content/account "cash" ; conversion
                             epart-2 (if (string? (:bookkeeping.group.books.journal.entry.content/account
                                                   epart-1))
                                       (let [avalue
                                             (:bookkeeping.group.books.journal.entry.content/account epart-1)
                                             aid (ffirst (accounts/find-account-by-name conn avalue))]

                                         (assoc epart-1
                                           :bookkeeping.group.books.journal.entry.content/account aid))
                                       epart-1)

                             ;; :db/id ; conversion
                             epart-3 (if (nil? (:db/id epart-2))
                                       (assoc epart-2 :db/id (d/tempid :db.part/user))
                                       epart-2)

                             ;; :bookkeeping.group.books.journal.entry.content/id ; conversion
                             epart-4 (let [eid (:bookkeeping.group.books.journal.entry.content/id epart-3)]

                                       (if (or (nil? eid) (string? eid))
                                         (assoc epart-3
                                           :bookkeeping.group.books.journal.entry.content/id
                                           (d/squuid))
                                         epart-3))]

                         epart-4))
                     (:bookkeeping.group.books.journal.entry/content entry))] ;; list of debits and credits

    ;;(println (str "entry-balanced? > result[" result "]"))
    (into [] result)))

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

           ;; replace current entry content
           entry-5 (assoc entry-4
                     :bookkeeping.group.books.journal.entry/content
                     (entrypart-conversion conn entry-4))

           ;; apply entry to containing journals
           journal-id (-> (identity/load-group conn gname)
                          :bookkeeping.group/bookkeeping
                          first
                          :bookkeeping.group.books/journals
                          first
                          :db/id)

           add-to-journal [:db/add journal-id :bookkeeping.group.books.journal/entries (:db/id entry-5)]
           ]

       (clojure.pprint/pprint [entry-5 add-to-journal])
       (spittoon/write-data conn [entry-5 add-to-journal])
       )))
