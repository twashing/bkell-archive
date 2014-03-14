(ns bkell.config
  (:require [clojure.java.io :as io]
            [clojure.edn :as edn]))


(defn get-config-raw []
  (let [pbreader (java.io.PushbackReader. (io/reader (io/resource "config.edn")))]
    (edn/read pbreader)))

(def get-config (memoize get-config-raw))
