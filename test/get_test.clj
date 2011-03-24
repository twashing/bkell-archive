(ns get-test
	(:use [clojure.test])
    (:use somnium.congomongo)
    (:require test-utils)
    (:require commands.get)
)


(use-fixtures :each test-utils/test-fixture-db )
(somnium.congomongo/mongo! :db "bkell") ;; connect to mongodb


;; get user 


;; get currency 


;; get account 


;; get entry 



