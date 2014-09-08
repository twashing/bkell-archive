(ns bkell.domain.models.nominal)


(defn filter-map [predicate mpa]
  (filter predicate
          (seq mpa)))

(defn filter-empty-map [mpa]
  (into {} (sort (filter-map #(if-not (number? (second %))
                                (if-not (empty? (second %))
                                  true
                                  false)
                                true)
                             mpa))))

(defn make-default-accounts []
  #{{:name "cash"
     :type :asset
     :counterWeight :debit}
    {:name "debt"
     :type :liability
     :counterWeight :credit}
    {:name "revenue"
     :type :revenue
     :counterWeight :credit}
    {:name "expense"
     :type :expense
     :counterWeight :debit}})

(defn make-default-journals []
  #{{:name "generalledger"
     :entries #{}}})

(defn make-books []
  {:accounts (make-default-accounts)
   :journals (make-default-journals)})

(defn make-user []
  {:username ""
   :password ""
   :firstname ""
   :lastname ""
   :email ""
   :defaultgroup {}
   :country {}})

(defn make-group []
  {:name ""
   :users #{}
   :owner {}
   :defaultCurrency {}
   :books #{}})
