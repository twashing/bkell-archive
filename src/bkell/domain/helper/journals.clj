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
