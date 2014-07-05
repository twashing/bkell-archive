(ns bkell.domain.helper.identity
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

(defn group-exists? [conn gname]
  (not (empty? (si/find-group-by-name conn gname))))
