(ns bkell.domain.journals
  (:require [datomic.api :only [q db] :as d]
            [bkell.spittoon :as spittoon]
            [bkell.domain.identity :as identity]))


(defn generate-journal-nominal [jname]

  [{:db/id (d/tempid :db.part/user)
    :bookkeeping.group.books.journal/id (d/squuid)
    :bookkeeping.group.books.journal/name jname
    ;; :bookkeeping.group.books.journal/entries ...
    }])

(defn create-journal [conn jname]

  (let [journal-nominal (generate-journal-nominal jname)]
    (spittoon/write-data conn journal-nominal)))
