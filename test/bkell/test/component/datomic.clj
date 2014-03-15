(ns bkell.test.component.datomic
  (:require [clojure.test :refer :all]
            [taoensso.timbre :as timbre]

            [bkell.config :as config]
            [bkell.component.datomic :as cd]))


(defn fixture-datomic [f]
  (timbre/debug "[FIXTURE] fixture-datomic")
  (f))
(use-fixtures :once fixture-datomic)


(deftest test-component

  (let [env (:test (config/get-config-raw))
        rslt (cd/bootd env) ]

    (is (fn? rslt))
    (is (= :startd-ephemeral (-> rslt meta :name)))))
