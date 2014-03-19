(ns bkell.domain.identity
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
          (not (clojure.string/blank?
                (:bookkeeping.group.books.journal.entry/id entry)))
          (not (clojure.string/blank?
                (:bookkeeping.group.books.journal.entry/date entry)))
          (not (clojure.string/blank?
                (:bookkeeping.group.books.journal.entry/currency entry)))

           ;; ASSERT that accounts correspond with existing accounts
           ;;(bkell.domain/account-for-entry? uname entry (getk/get-accounts uname))


           ;; ASSERT that entry is balanced
           ;; :lhs -> dt/dt == ct/ct
           ;; :rhs -> dt/cr == ct/dt
           ;;(bkell.domain/entry-balanced? uname entry (getk/get-accounts uname))
          ]}

  )

(comment

  (defn account-for-entry? [uname entry accounts]
    (empty?
     (filter
      (fn [a]
        (loop [x a y accounts]    ;; given main.account list, loop through dt / ct in entrys and see if accountid matches

          (if (= (:accountid x) (:id (first y)))
            false
            (if (< 1 (count y))
              (recur x (rest y))
              true                ;; entry added to filter if there was no accountid(s) that matched its reference
              ))))
      (:content entry))))

  (defn entry-balanced?
    " Entry balance criteria is:

    :lhs -> dt/dt == ct/ct
    :rhs -> dt/cr == ct/dt "
    [uname entry accounts]

    ;;(println (str "entry-balanced? > uname[" uname "] > entry[" entry "]"))
    (let [result  (reduce (fn [a b]
                            (let [acct (find-linked-account uname b accounts)]
                              (if (or (and (= "debit" (:counterWeight acct)) (= :debit (keyword (:tag b))))
                                      (and (= "credit" (:counterWeight acct)) (= :credit (keyword (:tag b)))))
                                (merge a { :lhs (+ (:lhs a) (:amount b))})     ;; increase :lhs if debit(ing) a debit account OR credit(ing) a credit account
                                (merge a { :rhs (+ (:rhs a) (:amount b))}))))
                          { :lhs 0.0 :rhs 0.0}   ;; beginning tally
                          (:content entry))]       ;; list of debits and credits

      ;;(println (str "entry-balanced? > result[" result "]"))
      (= (:lhs result) (:rhs result))))

  (defn add-entry [entry uname]

    { :pre  [ (not (nil? uname))
              (not (nil? entry))
              (not (clojure.string/blank? (:id entry)))
              (not (clojure.string/blank? (:date entry)))

              ;; ASSERT that accounts correspond with existing accounts
              (bkell.domain/account-for-entry? uname entry (getk/get-accounts uname))


              ;; ASSERT that entry is balanced
              ;; :lhs -> dt/dt == ct/ct
              ;; :rhs -> dt/cr == ct/dt
              (bkell.domain/entry-balanced? uname entry (getk/get-accounts uname))]}

    (mc/update "bookkeeping" { :owner uname "content.content.content.id" "main.entries"} { mop/$push { :content.$.content.0.content.0.content entry}})
    entry))
