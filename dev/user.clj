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

   [bkell.component.bkell :as bk]
   [bkell.component.datomic :as cd]
   [bkell.config :as config]
   [bkell.run :as run]
   [bkell.domain.domain :as domain]
   [bkell.spittoon :as spittoon]

   [bkell.spittoon.identity :as si]
   [bkell.spittoon.books :as sb]
   [bkell.spittoon.accounts :as sa]
   [bkell.spittoon.journals :as sj]))


(defn reload-project []
  (alembic.still/load-project))


(def env-key :test)
(def system nil)
(def conn nil)
(defn init []
  (alter-var-root #'system
                  (constantly (bk/component-bkell (env-key (config/get-config-raw))))))


(defn start []
  (alter-var-root #'system component/start)
  (alter-var-root #'conn (fn [x] (-> system :datomic :conn))))
(defn stop []
  (alter-var-root #'system
                  (fn [s] (when s (component/stop s)))))


(defn go []
  (init)
  (start))

(defn reset []
  (stop)
  (refresh :after 'user/go))
