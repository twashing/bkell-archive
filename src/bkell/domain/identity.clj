(ns bkell.domain.identity
  (:require [bkell.spittoon.identity :as si]))


(defn create-group [conn name currencyid countryid]

  (let [transact-result (si/create-group conn [name currencyid countryid])
        populated-group (si/populate-group-from-transact conn transact-result)]
    populated-group))
