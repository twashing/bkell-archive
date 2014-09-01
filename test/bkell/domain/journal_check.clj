(ns bkell.domain.journal-check
  (:require [bkell.domain.journal :as dj]
            [clojure.test.check :as tc]
            [clojure.test.check.generators :as gen]
            [clojure.test.check.properties :as prop]))


(def can-have-manyentries nil)
