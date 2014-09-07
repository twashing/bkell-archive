(ns bkell.domain.group-check
  (:require [bkell.domain.group :as dg]
            [clojure.test.check :as tc]
            [clojure.test.check.generators :as gen]
            [clojure.test.check.properties :as prop]))


(def gend-group
  (gen/fmap dg/create
            (gen/hash-map :name gen/string-alpha-numeric
                          :users (gen/fmap set (gen/vector gen/keyword)) #_(gen/such-that gen/not-empty (gen/vector gen/keyword))
                          :owner gen/string-alpha-numeric
                          :defaultCurrency gen/string-alpha-numeric
                          :books gen/string-alpha-numeric)))

(def ^{:tag :run} only-has-oneowner
  (prop/for-all [g gend-group]
                (-> g nil? not)))

(def ^{:tag :run} must-have-one-owner nil)
(def ^{:tag :run} can-have-manyusers nil)
(def ^{:tag :run} can-have-manybooks nil)
