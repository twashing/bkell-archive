(ns bkell.domain.user-check
  (:require [bkell.domain.user :as du]
            [clojure.test.check :as tc]
            [clojure.test.check.generators :as gen]
            [clojure.test.check.properties :as prop]))

(def ^{:tag :run} belongsto-atleast-onegroup
  (prop/for-all [ee (gen/hash-map :username gen/string-alpha-numeric
                                  :first-name gen/string-alpha-numeric
                                  :last-name gen/string-alpha-numeric
                                  :email gen/string-alpha-numeric)]

                (let [ei (du/create ee)]

                  (-> ei nil? not)
                  (-> ei :id nil? not)
                  (-> ei :password nil? not))))

(def ^{:tag :run} can-belongto-manygroups nil)

(def ^{:tag :run} must-own-onegroup nil)




(defn ascending?
  "clojure.core/sorted? doesn't do what we might expect, so we write our
  own function"
  [coll]
  (every? (fn [[a b]] (<= a b))
          (partition 2 1 coll)))

(def property
  (prop/for-all [v (gen/vector gen/int)]
                (let [s (sort v)]
                  (and (= (count v) (count s))
                       (ascending? s)))))

(tc/quick-check 100 property)
