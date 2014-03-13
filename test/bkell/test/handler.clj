(ns bkell.test.handler
  (:use clojure.test
        ring.mock.request
        bkell.handler)
  (:require [bkell.component.datomic :as dc]))


(defn fixture-datomic [f]
  (println "[FIXTURE] fixture-datomic"))

(defn fixture-http-handler [f]
  (println "[FIXTURE] fixture-http-handler"))

(use-fixtures :once fixture-http-handler)


(deftest test-app


  #_(testing "main route"
    (let [response (app (request :get "/"))]
      (is (= (:status response) 200))
      (is (= (:body response) "Hello World"))))

  (testing "not-found route"
    (let [response (app (request :get "/invalid"))]
      (is (= (:status response) 404)))))
