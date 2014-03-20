(ns bkell.domain.domain
  (:require [bkell.spittoon :as spittoon]
            [bkell.spittoon.identity :as si]
            [bkell.spittoon.accounts :as sa]
            [bkell.spittoon.journals :as sj]
            [bkell.spittoon.books :as sb]

            [bkell.domain.helper.identity :as helperi]
            [bkell.domain.helper.journals :as helperj]
            [bkell.domain.helper.accounts :as helpera]))


(defn create-group [conn name currencyid countryid]
  (let [transact-result (si/create-group conn [name currencyid countryid])
        populated-group (si/populate-group-from-transact conn transact-result)
        result-group (helperi/build-group-internals conn populated-group)]
    result-group))

(defn load-group [conn gname]
  (let [r1 (si/find-group-by-name conn gname)]
    (spittoon/populate-entity conn (ffirst r1))))


;; login / logout
;; add user to group
;; add journal (set of books) to group
(defn add-journal [conn name])


(defn add-account

  ([conn gname aname atype aweight]
     (add-account conn gname "generalledger" aname atype aweight))

  ([conn gname jname aname atype aweight]
     {:pre [(helperi/group-exists? conn gname)
            (helperj/journal-exists? conn gname jname)
            (not (helpera/account-exists? conn gname jname aname))
            (helpera/accounttype-exists? conn atype)]}

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
(defn add-entry [conn gname jname entry]
  {:pre  [(not (nil? gname))
          (not (nil? jname))
          (not (nil? entry))
          (not (clojure.string/blank? (:bookkeeping.group.books.journal.entry/id entry)))
          (not (clojure.string/blank? (:bookkeeping.group.books.journal.entry/date entry)))


          ;; Entry currency can be a String or Number
          (let [pred-fn (if (string? (:bookkeeping.group.books.journal.entry/currency entry))
                          clojure.string/blank?
                          nil?)]
            (not (pred-fn (:bookkeeping.group.books.journal.entry/currency entry))))


          (let [group-entity (load-group conn gname)
                account-list (helpera/list-accounts-forgroup conn group-entity)]

            (and

             ;; ASSERT that accounts correspond with existing accounts
             (helperj/account-for-entry? conn entry account-list)

             ;; ASSERT that entry is balanced
             ;; :lhs -> dt/dt == ct/ct
             ;; :rhs -> dt/cr == ct/dt
             (helperj/entry-balanced? conn entry account-list)))]}

  (sj/create-entry conn entry))
