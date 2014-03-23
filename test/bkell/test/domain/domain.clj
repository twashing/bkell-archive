(ns bkell.test.domain.domain
  (:require [clojure.test :refer :all]
            [taoensso.timbre :as timbre]
            [com.stuartsierra.component :as component]

            [bkell.config :as config]
            [bkell.component.datomic :as cd]))


(def env nil)

(defn fixture-datomic [f]

  (alter-var-root #'env (constantly (:test (config/get-config-raw))))
  (let [cdatomic (cd/component-datomic env)
        component (component/start cdatomic)
        conn (:conn component)]
    )

  (f))

(use-fixtures :each fixture-datomic)


(deftest test-account-for-entry

  (testing "account-for-entry?"
    (let [entry-full (config/load-edn "test-entry-bal.edn")]))

  (testing "entry-balanced?" ))
