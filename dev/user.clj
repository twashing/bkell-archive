(ns user
  (:require [alembic.still]
            [bkell.bkell :as bkell]))


(defn reload-project []
  (alembic.still/load-project))


(defn init
  ([] (init :test))
  ([env-key]
     (bkell/init env-key)))

(defn start []
  (bkell/start))

(defn stop []
  (bkell/stop))
