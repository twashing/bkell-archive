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
   [ring.mock.request :as mock]
   [cemerick.austin]
   [cemerick.austin.repls :refer :all]
   [net.cgrand.enlive-html :as enlive]

   [alembic.still]

   [bkell.component.bkell :as bk]
   [bkell.component.datomic :as cd]
   [bkell.config :as config]
   [bkell.handler :as handler]
   [bkell.run :as run]
   [bkell.utils :as utils]
   [bkell.domain.domain :as domain]
   [bkell.spittoon :as spittoon]

   [bkell.spittoon.identity :as si]
   [bkell.spittoon.books :as sb]
   [bkell.spittoon.accounts :as sa]
   [bkell.spittoon.journals :as sj]))


(defn reload-project []
  (alembic.still/load-project))

(defn load-browser-repl
  "After this is called, point your browser to the host (defaults to \"localhost\")"

  ([] (load-browser-repl "localhost"))
  ([host]

     (let [ repl-env (reset! cemerick.austin.repls/browser-repl-env
                            (cemerick.austin/repl-env :host host))]

       (cemerick.austin.repls/cljs-repl repl-env))))

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
