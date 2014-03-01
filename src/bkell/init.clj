(ns bkell.init
  (:require [datomic.api :only [q db] :as d]))

(defn init-db []

  (let [
        currency-list
        [ { :bookkeeping.currency/id "CDN" :bookkeeping.currency/name "Canadian Dollar" }
          { :bookkeeping.currency/id "USD" :bookkeeping.currency/name "United States Dollar" }
          { :bookkeeping.currency/id "EUR" :bookkeeping.currency/name "European Euro" }
          { :bookkeeping.currency/id "GBP" :bookkeeping.currency/name "Great British Pound" }
          { :bookkeeping.currency/id "YEN" :bookkeeping.currency/name "Japanese Yen" }
          { :bookkeeping.currency/id "AUD" :bookkeeping.currency/name "Australian Dollar" }
          { :bookkeeping.currency/id "ZAR" :bookkeeping.currency/name "South African Rand" }
          { :bookkeeping.currency/id "CNY" :bookkeeping.currency/name "Chinese Yuan Renminbi" }
          { :bookkeeping.currency/id "RUB" :bookkeeping.currency/name "Russian Ruble" }
          { :bookkeeping.currency/id "BRL" :bookkeeping.currency/name "Brazilian Ruble" }
          { :bookkeeping.currency/id "INR" :bookkeeping.currency/name "Indian Rupee" }]

        country-list
        [ { :bookkeeping.country/id "CA" :bookkeeping.country/name "Canada" }
          { :bookkeeping.country/id "US" :bookkeeping.country/name "United States" }
          { :bookkeeping.country/id "EU" :bookkeeping.country/name "Europe" }
          { :bookkeeping.country/id "UK" :bookkeeping.country/name "United Kingdom" }
          { :bookkeeping.country/id "JP" :bookkeeping.country/name "Japan" }
          { :bookkeeping.country/id "AU" :bookkeeping.country/name "Australia" }
          { :bookkeeping.country/id "ZA" :bookkeeping.country/name "South Africa" }
          { :bookkeeping.country/id "CN" :bookkeeping.country/name "China" }
          { :bookkeeping.country/id "RU" :bookkeeping.country/name "Russia" }
          { :bookkeeping.country/id "BR" :bookkeeping.country/name "Brazil" }
          { :bookkeeping.country/id "IN" :bookkeeping.country/name "India" }]

        account-types
        [ { :bookkeeping.accountType/id "asset" :bookkeeping.accountType/name "asset" }
          { :bookkeeping.accountType/id "liability" :bookkeeping.accountType/name "liability" }
          { :bookkeeping.accountType/id "revenue" :bookkeeping.accountType/name "revenue" }
          { :bookkeeping.accountType/id "expense" :bookkeeping.accountType/name "expense" } ]

        counter-weights
        [ { :bookkeeping.counterWeight/id "dt" :bookkeeping.counterWeight/name "debit" }
          { :bookkeeping.counterWeight/id "ct" :bookkeeping.counterWeight/name "credit" }]]
    ))
