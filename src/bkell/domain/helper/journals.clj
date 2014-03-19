(ns bkell.domain.helper.journals
  (:require [bkell.spittoon :as spittoon]
            [bkell.spittoon.identity :as si]
            [bkell.spittoon.accounts :as sa]
            [bkell.spittoon.journals :as sj]
            [bkell.spittoon.books :as sb]))


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

(defn find-linked-account [conn dtct accounts]

  ;; given main.account list, loop through dt / ct in entrys and see if accountid matches
  (loop [x dtct y accounts]

    (let [araw (:bookkeeping.group.books.journal.entry.content/account x)
          avalue (if (string? araw)
                   (ffirst (sa/find-account-by-name conn araw))
                   araw)]

      (if (= avalue (:db/id (first y)))
        (first y)
        (if (< 1 (count y))
          (recur x (rest y)))))))

(defn account-for-entry? [conn entry accounts]
  (empty?
   (filter
    (fn [a]

      ;; given main.account list, loop through dt / ct in entrys and see if accountid matches
      (loop [x a y accounts]

        (let [araw (:bookkeeping.group.books.journal.entry.content/account x)
              avalue (if (string? araw)
                       (ffirst (sa/find-account-by-name conn araw))
                       araw)]

          ;;(println ">> araw [" araw "] / avalue[" avalue "]")
          ;;(println ">> entry-part [" x "] / account-list [" (count y) "]")
          (if (= avalue (:db/id (first y)))
            false
            (if (< 1 (count y))
              (recur x (rest y))
              true     ;; entry added to filter if there was no accountid(s) that matched its reference
              )))))
    (:bookkeeping.group.books.journal.entry/content entry))))

(defn entry-balanced?
  " Entry balance criteria is:

    :lhs -> dt/dt == ct/ct
    :rhs -> dt/cr == ct/dt "
  [conn entry accounts]

  ;;(println (str "entry-balanced? > uname[" uname "] > entry[" entry "]"))
  (let [result  (reduce (fn [a b]
                          (let [acct (find-linked-account conn b accounts)]
                            (if (or (and (= "debit" (:bookkeeping.group.books.account/counterWeight acct))
                                         (= "dt" (:bookkeeping.group.books.journal.entry.content/type a)))

                                    (and (= "credit" (:bookkeeping.group.books.account/counterWeight acct))
                                         (= "ct" (:bookkeeping.group.books.journal.entry.content/type a))))

                              ;; increase :lhs if debit(ing) a debit account OR credit(ing) a credit account
                              (merge a {:lhs
                                        (+ (:lhs a)
                                           (:bookkeeping.group.books.journal.entry.content/amount b))})

                              (merge a {:rhs
                                        (+ (:rhs a)
                                           (:bookkeeping.group.books.journal.entry.content/amount b))}))))
                        {:lhs 0.0 :rhs 0.0}   ;; beginning tally
                        (:bookkeeping.group.books.journal.entry/content entry))] ;; list of debits and credits

    (println (str "entry-balanced? > result[" result "]"))
    (= (:lhs result) (:rhs result))))
