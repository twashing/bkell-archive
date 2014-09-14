(ns bkell.domain.group
  (:require [adi.core :as adi]
            [adi.utils :refer [iid ?q]]
            [missing-utils.core :as mu]
            [bkell.domain.models.nominal :as nm]))


(defn create [system opts]

  ;;... ensure group has associated name

  (let [group-name (:name opts)
        user-name (str "user-" group-name)

        user-nominal (assoc (nm/make-user)
                       :db/id (iid (keyword user-name))
                       :username user-name
                       :defaultgroup {:+/db/id (iid (keyword group-name))}
                       #_:country #_{:+/db/id (iid :country-ca)})
        books-nominal (nm/make-books)
        group-nominal (assoc (nm/make-group)
                        :db/id (iid (keyword group-name))
                        :owner {:+/db/id (iid (keyword user-name))}
                        #_:defaultCurrency #_{:+/db/id (iid :currency-cdn)}
                        :users #{user-nominal}
                        :books #{books-nominal})
        input-optional (nm/filter-empty-map opts) ]

    (merge group-nominal
           input-optional)))

(defn create! [system opts]

  ;; TODO - ensure group has associated name

  (let [group-final [{:group (create system opts)}]
        db  (-> system :spittoon :db)]

    (adi/insert! db group-final)))
