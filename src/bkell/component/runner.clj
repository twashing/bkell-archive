(ns bkell.component.runner
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]

            [bkell.handler :as handler]
            [bkell.run :as run]))


(defrecord Runner [env]
  component/Lifecycle

  (start [component]

    (timbre/debug "Runner.start CALLED / " (with-out-str (clojure.pprint/pprint component)))
    (if-not (:server component)
      (assoc component :server (run/start (-> component :httphandler :app)))
      component))

  (stop [component]

    (timbre/debug "Runner.stop CALLED / " (with-out-str (clojure.pprint/pprint component)))
    ((:server component))
    (dissoc component :server)))

(defn component-runner [env]
  (map->Runner {:env env}))
