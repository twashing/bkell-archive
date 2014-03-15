(ns bkell.test.component.datomic
  (:require [clojure.test :refer :all]
            [taoensso.timbre :as timbre]

            [bkell.config :as config]
            [bkell.component.datomic :as cd]))


(def env nil)

(defn fixture-datomic [f]

  (alter-var-root #'env (constantly (:test (config/get-config-raw))))

  (timbre/debug "[FIXTURE] fixture-datomic / env[" env "]")
  (f))

(use-fixtures :once fixture-datomic)


(deftest test-component

  (testing "ephemeral"
    (let [env (:test (config/get-config-raw))
          rslt (cd/bootd env) ]

      (is (fn? rslt))
      (is (= :startd-ephemeral (-> rslt meta :name)))))

  (testing "delete-create"
    (let [conn (cd/startd-delete-create (:url-datomic env))]

      (is (-> conn nil? not))
      (is (= datomic.peer.LocalConnection (type conn))))))
