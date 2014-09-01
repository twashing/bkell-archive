(ns bkell.domain.group-check
  (:require [bkell.domain.group :as dg]
            [clojure.test.check :as tc]
            [clojure.test.check.generators :as gen]
            [clojure.test.check.properties :as prop]))


(def ^{:tag :run} only-has-oneowner nil)

(def ^{:tag :run} can-have-manybooks nil)
