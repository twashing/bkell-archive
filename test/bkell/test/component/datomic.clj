(ns bkell.test.component.datomic
  (:require [clojure.test :refer :all]
            [taoensso.timbre :as timbre]
            [com.stuartsierra.component :as component]

            [bkell.config :as config]
            [bkell.component.datomic :as cd]))


(def env nil)

(defn fixture-datomic [f]

  (alter-var-root #'env (constantly (:test (config/get-config-raw))))
  (f))

(use-fixtures :once fixture-datomic)


(deftest test-component

  (testing "basic startd"
    (let [conn (cd/startd (:url-datomic env))]
      (is (-> conn nil? not))
      (is (= datomic.peer.LocalConnection (type conn)))))

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
      (is (map? result-populate))))

  (testing "start component"
    (let [cdatomic (cd/component-datomic env)
          component (component/start cdatomic)]

      (is (-> component nil? not))
      (is (map? component))

      (is (-> (:conn component) nil? not))
      (is (= datomic.peer.LocalConnection  (type (:conn component)))))))
