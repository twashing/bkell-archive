(ns bkell.config
  (:require [clojure.java.io :as io]
            [clojure.edn :as edn]))


(defn load-edn [fname]
  (let [pbreader (java.io.PushbackReader. (io/reader (io/resource fname)))]
    (edn/read pbreader)))

(defn get-config-raw []
  (load-edn "config.edn"))

(def get-config (memoize get-config-raw))
