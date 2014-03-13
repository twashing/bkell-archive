(ns bkell.test.handler
  (:use clojure.test
        ring.mock.request  
        bkell.handler))

(deftest test-app
  
  #_(testing "main route"
    (let [response (app (request :get "/"))]
      (is (= (:status response) 200))
      (is (= (:body response) "Hello World"))))
  
  (testing "not-found route"
    (let [response (app (request :get "/invalid"))]
      (is (= (:status response) 404)))))
