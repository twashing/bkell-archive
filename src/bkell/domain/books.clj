(ns bkell.domain.books
  (:require [datomic.api :only [q db] :as d]
            [bkell.spittoon :as spittoon]))


(defn generate-books-nominal []

  [{:db/id (d/tempid :db.part/user)
    ;; :db/ident :bookkeeping.group.books/accounts
    ;; :db/ident :bookkeeping.group.books/journals
    }])

(defn create-books [conn group-ref-id default-accounts default-journals]
  {:pre [(not (nil? group-ref-id))
         (not (nil? conn))]}

  (let [books (generate-books-nominal)

        ;; attaching to group
        group-assert [:db/add group-ref-id :bookkeeping.group/bookkeeping (:db/id books)]

        ;; attaching default accounts
        ;; ...

        ;; attaching default journals
        ;; ...
        ]

    (spittoon/write-data conn (concat books group-assert))))
