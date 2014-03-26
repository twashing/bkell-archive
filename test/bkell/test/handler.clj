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


(deftest test-gitkit

  (testing "callbackGitkit"

    (let [request-params (config/load-edn "test-request.edn")
          request (mock/request :get "/callbackGitkit" (:params request-params))

          conn (-> system :datomic :conn)
          appfn (handler/create-app conn)
          resp (appfn request)]

      (timbre/debug "1... " resp)
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
