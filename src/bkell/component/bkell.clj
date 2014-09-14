(ns bkell.component.bkell
  (:require [hara.component :as hco]))

(defrecord Bkell []
  Object
  (toString [bk]
    (str "#bk" (into {} bk)))

  hco/IComponent
  (-start [bk]
    (assoc bk :status "started"))
  (-stop [bk]
    (dissoc bk :status)))

(defmethod print-method Bkell
  [v w]
  (.write w (str v)))


(def topology {:bkell   [map->Bkell]})

(def config   {:bkell {:foo :bar}})

(defn start []
  (hco/start (hco/system topology config)))
