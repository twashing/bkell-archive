(ns user
  (:require [alembic.still]
            #_[bkell.bkell :as bkell]))

(defn reload-project []
  (alembic.still/load-project))
