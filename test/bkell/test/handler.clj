(ns bkell.test.handler
  (:require [clojure.test :refer :all]
            [ring.mock.request :as mock]
            [taoensso.timbre :as timbre]
            [com.stuartsierra.component :as component]
            [ring.util.response :as rresp]

            [bkell.config :as config]
            [bkell.handler :as handler]
            [bkell.component.bkell :as kc]
            [bkell.domain.domain :as domain]))


(def env nil)

(defn fixture-http-handler [f]

  (alter-var-root #'env (constantly (:test (config/get-config-raw))))
  (f))

(use-fixtures :each fixture-http-handler)

#_(alter-var-root #'system (fn [x] component))
#_(let [cbkell (kc/component-bkell env)
        component (component/start cbkell)]

    (component/stop cbkell))


(deftest test-with-session

  (testing "turn session on"

    (let [request-params (config/load-edn "test-request.edn")
          request (assoc (mock/request :get "/accounts" (:params request-params))
                    :session {:username "webkell-user"})
          response (handler/with-session request (rresp/response (+ 1 2)))]

      (is (= 200 (:status response)))
      (is (empty? (:headers response)))
      (is (= 3 (:body response)))))

  (testing "turn session off"

    (let [request-params (config/load-edn "test-request.edn")

          request (mock/request :get "/accounts" (:params request-params))
          response (handler/with-session request (rresp/response (+ 1 2)))]

      (= 302 (:status response))
      (= "/" ((:headers response) "Location")))))

#_(deftest test-gitkit

  (testing "callbackGitkit"

    (let [request-params (config/load-edn "test-request.edn")
          request (mock/request :get "/callbackGitkit" (:params request-params))

          conn (-> system :datomic :conn)
          appfn (handler/create-app conn)
          resp (appfn request)]

      (is (not (nil? resp)))
      (is (map? resp))


      ;; adduser-ifnil
      (let [r1 (domain/retrieve-user
                (-> system :datomic :conn)
                (-> request-params :params :rp_input_email))]

        (is (not (nil? r1))))

      ;; arrive at landing page

      ;; session is active
      )))
