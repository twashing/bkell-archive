(ns bkell.domain.identity
  (:require [bkell.spittoon.identity :as si]
            [bkell.spittoon.accounts :as sa]
            [bkell.spittoon.journals :as sj]
            [bkell.spittoon.books :as sb]))


(defn create-group [conn name currencyid countryid]

  (let [transact-result (si/create-group conn [name currencyid countryid])
        populated-group (si/populate-group-from-transact conn transact-result)

        result-group (si/build-group-internals conn populated-group)]

    result-group))


;; login / logout
;; add user to group
;; add journal (set of books) to group
(defn add-journal [conn name]
  )


;; add account
;;  - no duplicate names
(defn add-account

  ([conn name counter-weight]
     (add-account conn "generalledger" name counter-weight))

  ([conn journal name counter-weight]

     ))


;; add journal entry
;;   - balanced
;;   - linked against valid accounts
(defn add-journal-entry [conn entry]
  )
