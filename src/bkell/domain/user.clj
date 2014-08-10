(ns bkell.domain.user)

(defn create []
  {:id [{:type :uuid
         :unique :value
         :required true
         :doc "System ID for a given user"}]

   :username ""
   :password ""
   :default-group [{:type :ref
                    :ref {:ns :bookkeeping.group}
                    :required true
                    :doc "A user can be a member of many groups. This points to the default one"}]

   :first-name ""
   :last-name ""
   :email ""
   :country [{:type :ref
              :ref {:ns :bookkeeping.country}}]})
