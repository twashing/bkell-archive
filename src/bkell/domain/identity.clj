(ns bkell.domain.identity
  (:require [bkell.spittoon :as spittoon]
            [bkell.spittoon.identity :as si]
            [bkell.spittoon.accounts :as sa]
            [bkell.spittoon.journals :as sj]
            [bkell.spittoon.books :as sb]))


(defn build-group-internals
  "Builds the default accounts, journals and books for the group"
  [conn group-entity]

  (let [result-accounts (sa/create-default-accounts conn)
        account-list (->> result-accounts :tempids vals (into []))

        result-journals (sj/create-journal conn "generalledger")
        journal-list (->> result-journals :tempids vals (into []))

        result-books (sb/create-books conn (:db/id group-entity) account-list journal-list)]

    (spittoon/populate-entity conn (:db/id group-entity))))

(defn create-group [conn name currencyid countryid]

  (let [transact-result (si/create-group conn [name currencyid countryid])
        populated-group (si/populate-group-from-transact conn transact-result)

        result-group (build-group-internals conn populated-group)]

    result-group))

(defn load-group [conn gname]
  (let [r1 (si/find-group-by-name conn gname)]
    (spittoon/populate-entity conn (ffirst r1))))


;; login / logout
;; add user to group
;; add journal (set of books) to group
(defn add-journal [conn name]
  )


(defn group-exists? [conn gname]
  (not (empty? (si/find-group-by-name conn gname))))

(defn list-journals-forgroup [conn gname]
  (let [r1 (si/find-group-by-name conn gname)
        r2 (spittoon/populate-entity conn (ffirst r1))]

    (->> r2
         :bookkeeping.group/bookkeeping
         first
         :bookkeeping.group.books/journals
         (map #(spittoon/populate-entity conn (:db/id %))))))

(defn journal-exists? [conn gname jname]
  (let [js (list-journals-forgroup conn gname)]
    (not (empty? (filter #(= jname (:bookkeeping.group.books.journal/name %)) js)))))


(defn account-names-forentities [conn account-entities]
  (map :bookkeeping.group.books.account/name account-entities))

(defn list-accounts-forgroup [conn group-entity]
  (->> group-entity
       :bookkeeping.group/bookkeeping
       first
       :bookkeeping.group.books/accounts
       (map #(spittoon/populate-entity conn (:db/id %)))))

(defn account-exists? [conn gname jname name]
  (let [r1 (si/find-group-by-name conn gname)
        group-entity (spittoon/populate-entity conn (ffirst r1))

        as (list-accounts-forgroup conn group-entity)
        anames (account-names-forentities conn as)]

    (not (empty? (filter #(= name %) anames)))))

(defn accounttype-exists? [conn atype]

  (let [atypes (si/list-account-types conn)
        anames (map #(second %) atypes)]
    (not (empty? (filter #(= atype %) anames)))))

(defn add-account

  ([conn gname aname atype aweight]
     (add-account conn gname "generalledger" aname atype aweight))

  ([conn gname jname aname atype aweight]
     {:pre [(group-exists? conn gname)
            (journal-exists? conn gname jname)
            (not (account-exists? conn gname jname aname))
            (accounttype-exists? conn atype)]}

     (let [gid (ffirst (si/find-group-by-name conn gname))
           group-entity (spittoon/populate-entity conn gid)
           tx-result (sa/create-account conn aname atype aweight)

           aid (-> tx-result :tempids vals first)
           bid (->> group-entity :bookkeeping.group/bookkeeping first :db/id)
           add-to-group [[:db/add bid :bookkeeping.group.books/accounts aid]]]

       (spittoon/write-data conn add-to-group))))


;; add journal entry
;;   - balanced
;;   - linked against valid accounts
(defn add-journal-entry [conn entry]
  )
