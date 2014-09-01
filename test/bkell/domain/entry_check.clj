(ns bkell.domain.entry-check
  (:require [bkell.domain.entry :as de]
            [clojure.test.check :as tc]
            [clojure.test.check.generators :as gen]
            [clojure.test.check.properties :as prop]))


(def each-entrymust-bebalanced nil)
