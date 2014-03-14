(ns user
  "Tools for interactive development with the REPL. This file should
  not be included in a production build of the application."
  (:require
   [clojure.java.io :as io]
   [clojure.java.javadoc :refer (javadoc)]
   [clojure.pprint :refer (pprint)]
   [clojure.reflect :refer (reflect)]
   [clojure.repl :refer (apropos dir doc find-doc pst source)]
   [clojure.set :as set]
   [clojure.string :as str]
   [clojure.test :as test]
   [clojure.tools.namespace.repl :refer (refresh refresh-all)]
   [com.stuartsierra.component :as component]

   [alembic.still]

   [bkell.config :as config]
   [bkell.component.bkell :as ck]
   [bkell.component.datomic :as cd]
   :reload-all))


(defn reload-project []
  (alembic.still/load-project))


(def env-key :test)
(def system nil)
(defn init []
  (let [env (env-key (config/get-config-raw))]
    (alter-var-root #'system
                    #_(constantly (ck/component-bkell env))
                    (constantly (cd/component-datomic env)))))
(defn start []
  (alter-var-root #'system component/start))
(defn stop []
  (alter-var-root #'system
                  (fn [s] (when s (component/stop s)))))


(defn go []
  (init)
  (start))

(defn reset []
  (stop)
  (refresh :after 'user/go))
