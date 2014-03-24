(ns bkell.domain.domain
  (:require [bkell.spittoon :as spittoon]
            [bkell.spittoon.identity :as si]
            [bkell.spittoon.accounts :as sa]
            [bkell.spittoon.journals :as sj]
            [bkell.spittoon.books :as sb]

            [bkell.domain.helper.identity :as helperi]
            [bkell.domain.helper.journals :as helperj]
            [bkell.domain.helper.accounts :as helpera]))


(defn convert-user-from-entitymap [user-entity-map]

  (assoc (into {} user-entity-map)
    :db/id (:db/id user-entity-map)
    :bookkeeping.user/country {:db/id (-> user-entity-map :bookkeeping.user/country :db/id)}
    :bookkeeping.user/defaultGroup {:db/id (-> user-entity-map :bookkeeping.user/defaultGroup :db/id)}))

(defn create-user [conn uname password currencyid countryid]

  (let [r1 (si/create-user conn uname password currencyid countryid)
        r2 (si/load-group conn (si/generate-groupname-from-username uname))
        result-group (helperi/build-group-internals conn r2)
        result-user (si/load-user conn uname)]
    (convert-user-from-entitymap result-user)))

(defn retrieve-user [conn uname]

  (let [result-user (si/load-user conn uname)]
    (convert-user-from-entitymap result-user)))

(defn update-user [conn user]
  (spittoon/write-data conn [user]))


(defn create-group [conn name currencyid countryid]

  (let [transact-result (si/create-group conn name currencyid countryid)
        populated-group (si/populate-group-from-transact conn transact-result)
        result-group (helperi/build-group-internals conn populated-group)]
    result-group))


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


          (let [group-entity (si/load-group conn gname)
                account-list (helpera/list-accounts-forgroup conn group-entity)]

            (and

             ;; ASSERT that accounts correspond with existing accounts
             (helperj/account-for-entry? conn entry account-list)

             ;; ASSERT that entry is balanced
             ;; :lhs -> dt/dt == ct/ct
             ;; :rhs -> dt/cr == ct/dt
             (helperj/entry-balanced? conn entry account-list)))]}

  (sj/create-entry conn entry))
