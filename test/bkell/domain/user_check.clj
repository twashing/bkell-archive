(ns bkell.domain.user-check
  (:require [bkell.domain.user :as du]
            [clojure.test.check :as tc]
            [clojure.test.check.generators :as gen]
            [clojure.test.check.properties :as prop]))


(def gend-user
  (gen/fmap du/create
            (gen/hash-map :username gen/string-alpha-numeric
                          :first-name gen/string-alpha-numeric
                          :last-name gen/string-alpha-numeric
                          :email gen/string-alpha-numeric)))

(def ^{:tag :run} belongsto-atleast-onegroup
  (prop/for-all [u gend-user]
                (-> u nil? not)
                (-> u :id nil? not)
                (-> u :password nil? not)))

(def ^{:tag :run} can-belongto-manygroups nil)

(def ^{:tag :run} must-own-onegroup nil)
