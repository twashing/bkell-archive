(ns bkell.test.handler
  (:require [clojure.test :refer :all]
            [ring.mock.request :as mock]
            [taoensso.timbre :as timbre]

            [bkell.config :as config]
            [bkell.handler :as handler]
            [bkell.component.datomic :as dc]))


(defn fixture-http-handler [f]
  (timbre/debug "[FIXTURE] fixture-http-handler"))

(use-fixtures :once fixture-http-handler)


(deftest test-defaults

  #_(testing "main route"
    (let [response (app (request :get "/"))]
      (is (= (:status response) 200))
      (is (= (:body response) "Hello World"))))

  (testing "not-found route"
    (let [response (handler/app (mock/request :get "/invalid"))]
      (is (= (:status response) 404)))))


(deftest test-gitkit

  (testing "calbackGitkit"

    (let [request-params (config/load-edn "test-request.edn")
          cbresp (mock/request :get "/callbackGitkit" request-params)]

      (timbre/debug "1... " cbresp)

      (is (not (nil? cbresp)))
      (is (map? cbresp)))))
