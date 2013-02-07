(ns init.database
  (require  [monger.collection :as mc])
)

(defn setup []

  (let [currency-list
          [
            { :tag :currency :id "CDN" :name "Canadian Dollar" :content [] }
            { :tag :currency :id "USD" :name "United States Dollar" :content [] }
            { :tag :currency :id "EUR" :name "European Euro" :content [] }
            { :tag :currency :id "GBP" :name "Great British Pound" :content [] }
            { :tag :currency :id "YEN" :name "Japanese Yen" :content [] }
            { :tag :currency :id "AUD" :name "Australian Dollar" :content [] }
            { :tag :currency :id "ZAR" :name "South African Rand" :content [] }
            { :tag :currency :id "CNY" :name "Chinese Yuan Renminbi" :content [] }
            { :tag :currency :id "RUB" :name "Russian Ruble" :content [] }
            { :tag :currency :id "BRL" :name "Brazilian Ruble" :content [] }
            { :tag :currency :id "INR" :name "Indian Rupee" :content [] }]
        country-list
          [
            { :tag :country :id "CA" :name "Canada" :content [] }
            { :tag :country :id "US" :name "United States" :content [] }
            { :tag :country :id "EU" :name "Europe" :content [] }
            { :tag :country :id "UK" :name "United Kingdom" :content [] }
            { :tag :country :id "JP" :name "Japan" :content [] }
            { :tag :country :id "AU" :name "Australia" :content [] }
            { :tag :country :id "ZA" :name "South Africa" :content [] }
            { :tag :country :id "CN" :name "China" :content [] }
            { :tag :country :id "RU" :name "Russia" :content [] }
            { :tag :country :id "BR" :name "Brazil" :content [] }
            { :tag :country :id "IN" :name "India" :content [] }]
        ]

    (map
      #(mc/insert "currencies" %1)
      currency-list)
    (map
     #(mc/insert "countries" %1)
     country-list)
  )
)
