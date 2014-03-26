(ns bkell.test.handler
  (:require [clojure.test :refer :all]
            [ring.mock.request :as mock]
            [taoensso.timbre :as timbre]
            [com.stuartsierra.component :as component]

            [bkell.config :as config]
            [bkell.handler :as handler]
            [bkell.component.bkell :as kc]
            [bkell.domain.domain :as domain]))


(def env nil)
(def system nil)

(defn fixture-http-handler [f]

  (timbre/debug "[FIXTURE] fixture-http-handler")

  (alter-var-root #'env (constantly (:test (config/get-config-raw))))
  (let [cbkell (kc/component-bkell env)
        component (component/start cbkell)]
    (alter-var-root #'system (fn [x] component))

    (f)

    (component/stop cbkell)))

(use-fixtures :each fixture-http-handler)


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
          cbresp (mock/request :get "/callbackGitkit" (:params request-params))]

      ;;(timbre/debug "1... " cbresp)
      (is (not (nil? cbresp)))
      (is (map? cbresp))

      ;; adduser-ifnil
      (let [r1 (domain/retrieve-user
                (-> system :datomic :conn)
                (-> request-params :params :rp_input_email))]

        (is (not (nil? r1))))

      ;; arrive at landing page

      ;; session is active
      )))
