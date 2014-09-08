(ns bkell.domain.user
  (:require [missing-utils.core :as mu]
            [crypto.random :as crypto]
            [bkell.domain.models.nominal :as nm]))


(defn create [system opts]

  (let [input-optional (nm/filter-empty-map opts)]
    (merge (nm/make-user)
           opts)))


;; Retrieve.. not implemented in the raw


;; Update
(defn update [user n]
  (merge user n))


;; Delete.. not implemented in the raw
