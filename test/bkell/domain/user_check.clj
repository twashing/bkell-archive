(ns bkell.domain.user-check

  (:require [bkell.domain.user :as du]
            [clojure.test :refer :all]
            [clojure.test.check :as tc]
            [clojure.test.check.generators :as gen]
            [clojure.test.check.properties :as prop]))


(defn gend-user [generator size]
  (gen/fmap du/create
            (gen/hash-map :username gen/string-alpha-numeric
                          :first-name gen/string-alpha-numeric
                          :last-name gen/string-alpha-numeric
                          :email gen/string-alpha-numeric)))

(def has-agroup
  (prop/for-all [v (gend-user nil nil)]
                (-> v nil? not)))

;; can belong to many groups
;; can own a group
