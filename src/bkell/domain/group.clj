(ns bkell.domain.group
  (:require [adi.core :as adi]
            [missing-utils.core :as mu]
            [bkell.domain.models.nominal :as nm]))


(defn create [system opts]

  ;;... ensure group has associated name

  (let [user-nominal (assoc (nm/make-user) :username (str "user-" (:name opts)))
        books-nominal (nm/make-books)
        group-nominal (assoc (nm/make-group)
                        :users #{user-nominal}
                        :books #{books-nominal})
        input-optional (nm/filter-empty-map opts) ]

    (merge group-nominal
           input-optional)))

(defn create! [system opts]

  ;;... ensure group has associated name

  (let [group-final (create system opts)
        db (-> system :spittoon :db)]

    (adi/insert! db group-final)))
