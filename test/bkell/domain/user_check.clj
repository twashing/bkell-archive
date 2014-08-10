(ns bkell.domain.user-check

  (:require [bkell.domain.user :as du]
            [clojure.test :refer :all]
            [clojure.test.check :as tc]
            [clojure.test.check.generators :as gen]
            [clojure.test.check.properties :as prop]))


(def gend-user
  (gen/fmap du/create
            (gen/hash-map :username gen/string-alpha-numeric
                          :first-name gen/string-alpha-numeric
                          :last-name gen/string-alpha-numeric
                          :email gen/string-alpha-numeric)))

;; belongs to at least 1 group
(def has-agroup
  (prop/for-all [v (gen/sample gend-user)]
                (-> v nil? not)))

;; can belong to many groups
;; can own a group
