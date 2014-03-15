(ns bkell.test.component.datomic
  (:require [bkell.test.component.datomic :refer :all]
            [clojure.test :refer :all]
            [midje.sweet :refer :all]
            [bkell.component.datomic :as dc]))


(defn fixture-datomic [f]
  (println "[FIXTURE] fixture-datomic"))


(use-fixtures :once fixture-datomic)


(deftest test-app

  (testing "not-found route"
    (is (= 1 1))))
