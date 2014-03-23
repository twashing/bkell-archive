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


#_(deftest test-add-user

  ;; add a user
  ;;   verify that associated group was created
  ;;   verify that associated journal and set of books was created

  )
#_(deftest test-crud-user

  ;; retrieve user
  ;; update user
  ;; delete user
  ;;   verify that associated group is deleted (when there are no other users)

  ;; list user(s)
  )

#_(deftest test-add-account)
#_(deftest test-crud-account

  ;; retrieve account
  ;; update account (except for counterweight)
  ;; delete account
  ;;   verify that there are no attached journal entries

  ;; list account(s) for a given group
  )

#_(deftest test-add-entry

  (testing "account-for-entry?"
    (let [entry-full (config/load-edn "test-entry-bal.edn")]))

  (testing "entry-balanced?"
    ))
#_(deftest test-crud-entry

  ;; retrieve entry
  ;; update entry
  ;; delete entry

  ;; list entries, for a given group
  )
