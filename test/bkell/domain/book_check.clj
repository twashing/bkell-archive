(ns bkell.domain.book-check
  (:require [bkell.domain.book :as db]
            [clojure.test.check :as tc]
            [clojure.test.check.generators :as gen]
            [clojure.test.check.properties :as prop]))

(def ^{:tag :run} can-have-many-accounts nil)

(def ^{:tag :run} can-haveonly-onejournal nil)
