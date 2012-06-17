(ns init.database
  (require  [monger.collection :as mc])
)

(defn setup [] 
  
  (let [  currency-list
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
            { :tag :currency :id "INR" :name "Indian Rupee" :content [] }
          ]
        ]

    (map 
      #(mc/insert :currencies %1)
      currency-list
    )
  )
)


