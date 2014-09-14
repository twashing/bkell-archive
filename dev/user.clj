(ns user
  (:require [alembic.still]
            [bkell.bkell :as bkell]))


(defn reload-project []
  (alembic.still/load-project))
