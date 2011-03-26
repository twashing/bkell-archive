(ns update-test
  (:use [clojure.test])
  (:use somnium.congomongo)
  (:require test-utils)
  (:require commands.update)
)

(use-fixtures :each test-utils/test-fixture-db )
(somnium.congomongo/mongo! :db "bkell") ;; connect to mongodb


;; update user 
(deftest test-update-user 
)


;; update currency 
(deftest test-update-currency 
)


;; update account 
(deftest test-update-account 
)


;; update entry 
(deftest test-update-entry 
)


