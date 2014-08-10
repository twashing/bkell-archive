(ns bkell.domain.user

  (:require [bkell.domain.user :refer :all]
            [clojure.test :refer :all]
            [clojure.test.check :as tc]
            [clojure.test.check.generators :as gen]
            [clojure.test.check.properties :as prop]))


;; belongs to at least 1 group
(def has-agroup
  (prop/for-all [v (gen/vector gen/int)]
                (= (sort v) (sort (sort v)))))

;; can belong to many groups
;; can own a group
