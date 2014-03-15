(ns bkell.domain.books
  (:require [datomic.api :only [q db] :as d]
            [taoensso.timbre :as timbre]
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
        group-assert [[:db/add
                       group-ref-id
                       :bookkeeping.group/bookkeeping
                       (->> books first :db/id)]]

        ;; attaching default accounts
        books-a (if (not (empty? default-accounts))
                  (assoc-in books [0 :bookkeeping.group.books/accounts] default-accounts)
                  books)

        ;; attaching default journals
        books-b (if (not (empty? default-journals))
                  (assoc-in books-a [0 :bookkeeping.group.books/journals] default-journals)
                  books-a)]

    (spittoon/write-data conn (conj books-b (first group-assert)))))


(require '[clojure.reflect :as r])
(print-table
 (sort-by :name
          (filter :exception-types (:members (r/reflect "foo")))))
