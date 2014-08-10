(ns bkell.domain.user
  (:require [missing-utils.core :as mu]
            [crypto.random :as crypto]))


;; Create
(defn create
  ([] (create {}))
  ([opts]

     (println opts)

     (let [sans-nils (apply merge (for [[k v]
                                        opts
                                        :when (not (nil? v))]
                                    {k v}))]

       (merge {:id (mu/generate-uuid)
               :username ""
               :password (crypto/base64 12)
               :first-name ""
               :last-name ""
               :email ""
               :country {}}
              sans-nils))))


;; Retrieve.. not implemented in the raw


;; Update
(defn update [user n]
  (merge user n))


;; Delete.. not implemented in the raw
