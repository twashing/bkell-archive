(ns bkell.test.component.datomic
  (:require [clojure.test :refer :all]
            [taoensso.timbre :as timbre]

            [bkell.config :as config]
            [bkell.component.datomic :as cd]))


(def env nil)

(defn fixture-datomic [f]

  (alter-var-root #'env (constantly (:test (config/get-config-raw))))
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
      (is (= datomic.peer.LocalConnection (type conn)))))


  (testing "schema"
    (let [conn (cd/startd-delete-create (:url-datomic env))
          result (cd/startd-schema conn)]

      (is (= '(:db-after :db-before :tempids :tx-data) (sort (keys result))))
      (is (map? result))))

  (testing "populate"
    (let [conn (cd/startd-delete-create (:url-datomic env))
          result-schema (cd/startd-schema conn)
          result-populate (cd/startd-populate conn)]

      (is (-> result-populate nil? not))
      (is (= '(:db-after :db-before :tempids :tx-data) (sort (keys result-populate))))
      (is (map? result-populate)))))
