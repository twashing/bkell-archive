(ns bkell.test.domain.domain
  (:require [clojure.test :refer :all]
            [clojure.pprint :as pprint]
            [taoensso.timbre :as timbre]
            [com.stuartsierra.component :as component]

            [bkell.config :as config]
            [bkell.domain.domain :as domain]
            [bkell.component.datomic :as cd]
            [bkell.spittoon :as spittoon]
            [bkell.spittoon.identity :as si]
            [bkell.spittoon.journals :as sj]))


(def env nil)
(def system nil)

(defn fixture-datomic [f]

  (alter-var-root #'env (constantly (:test (config/get-config-raw))))
  (let [cdatomic (cd/component-datomic env)
        component (component/start cdatomic)
        conn (:conn component)]
    (alter-var-root #'system (fn [x] component))

    (f)

    (component/stop cdatomic)))

(use-fixtures :each fixture-datomic)


(deftest test-add-user

  ;; add a user
  ;;   verify that associated group was created
  ;;   verify that associated set of books was created
  (let [uname "fubar"
        gname (si/generate-groupname-from-username uname)
        conn (:conn system)]


    (let [_ (domain/create-user conn uname "password" "USD" "US")
          assoc-user (si/load-user conn "fubar")
          assoc-group (si/load-group conn gname)

          rb (sj/find-books-by-group conn gname)
          assoc-books (map #(spittoon/populate-entity conn (first %)) rb)]

      (is (not (nil? assoc-user)))
      (is (= uname (:bookkeeping.user/username assoc-user)))

      (is (not (nil? assoc-group)))
      (is (= (-> assoc-user :db/id)
             (-> assoc-group :bookkeeping.group/owner :db/id)))

      (is (= 1 (count rb)))
      (is (= 1 (-> assoc-books first :bookkeeping.group.books/journals count)))
      (is (= "generalledger" (-> assoc-books
                                 first
                                 :bookkeeping.group.books/journals
                                 first
                                 :bookkeeping.group.books.journal/name))))))


(deftest test-crud-user

  (testing "retrieve a user"

    (let [uname "fubar1"
          gname (si/generate-groupname-from-username uname)
          conn (:conn system)]

      (let [_ (domain/create-user conn uname "password" "USD" "US")
            assoc-user (domain/retrieve-user conn uname)]

        (is (not (nil? assoc-user)))
        (is (= uname (:bookkeeping.user/username assoc-user))))))

  (testing "update a user"

    (let [uname "fubar2"
          gname (si/generate-groupname-from-username uname)
          conn (:conn system)]

      (let [_ (domain/create-user conn uname "password" "USD" "US")
            intermmediate-user (domain/retrieve-user conn uname)

            fname "Noam"
            lname "Chomsky"
            email "chomsky@mit.edu"

            updated-user (assoc intermmediate-user
                           :bookkeeping.user/firstName fname
                           :bookkeeping.user/lastName lname
                           :bookkeeping.user/email email)

            _ (domain/update-user conn updated-user)]

        (let [result-user (domain/retrieve-user conn uname)]

          (is (not (nil? result-user)))
          (is (= uname (:bookkeeping.user/username result-user)))
          (is (= fname (:bookkeeping.user/firstName result-user)))
          (is (= lname (:bookkeeping.user/lastName result-user)))
          (is (= email (:bookkeeping.user/email result-user)))))))

  ;; delete user
  ;;   verify that associated group is deleted (when there are no other users)

  ;; list user(s)
  )

(deftest test-add-account

  (testing "add an account"
    (let [conn (-> system :datomic :conn)

          gname "webkell"
          aname "New Account"
          r1 (domain/add-account conn gname aname "asset")]

      (let [ra (domain/retrieve-account conn gname aname)]))))

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
