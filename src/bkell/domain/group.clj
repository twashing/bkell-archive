(ns bkell.domain.group
  (:require [missing-utils.core :as mu]))


;; Create
(defn create [opts]
  (merge {:id (mu/generate-uuid)
          :name ""
          :users []}
         opts))


;; Retrieve.. not implemented in the raw

;; Update

;; Delete.. not implemented in the raw
