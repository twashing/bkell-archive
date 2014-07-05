(ns bkell.domain.helper.accounts
  (:require [bkell.spittoon :as spittoon]
            [bkell.spittoon.identity :as si]
            [bkell.spittoon.accounts :as sa]
            [bkell.spittoon.journals :as sj]
            [bkell.spittoon.books :as sb]))

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
