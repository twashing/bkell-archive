(ns bkell.domain.models.nominal)

(defn make-group []
  {:name ""
   :users #{}
   :owner {}
   :defaultCurrency {}
   :books #{}})

(defn make-user []
  {:username ""
   :password ""
   :firstname ""
   :lastname ""
   :email ""
   :defaultgroup {}
   :country {}})
