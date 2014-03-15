(ns bkell.test.handler
  (:use clojure.test
        ring.mock.request
        bkell.handler)
  (:require [bkell.component.datomic :as dc]
            [taoensso.timbre :as timbre]))


(defn fixture-datomic [f]
  (timbre/debug "[FIXTURE] fixture-datomic"))

(defn fixture-http-handler [f]
  (timbre/debug "[FIXTURE] fixture-http-handler"))

(use-fixtures :once fixture-http-handler)


(deftest test-app


  #_(testing "main route"
    (let [response (app (request :get "/"))]
      (is (= (:status response) 200))
      (is (= (:body response) "Hello World"))))

  (testing "not-found route"
    (let [response (app (request :get "/invalid"))]
      (is (= (:status response) 404)))))
