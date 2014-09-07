(ns bkell.domain.group
  (:require [missing-utils.core :as mu]
            [bkell.domain.models.nominal :as nm]))


(defn create
  ([] (create {}))
  ([opts]
     (merge (assoc (nm/make-group) :users #{(nm/make-user)})
            opts)))


;; Retrieve.. not implemented in the raw

;; Update

;; Delete.. not implemented in the raw
