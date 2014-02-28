(ns bkell.spittoon
  (:require [datomic.api :only [q db] :as d]))


(def url "datomic:free://localhost:4334/bkeeping")


(defn database-create [iurl]
  (d/create-database (if iurl iurl url)))
(defn database-delete [iurl]
  (d/delete-database (if iurl iurl url)))


(defn database-connect [iurl]
  (d/connect (if iurl iurl url)))


(defn database-schema-create [conn]
  (def schema-tx (read-string (slurp "resources/schema/bkeeping-schema.edn")))
  @(d/transact conn schema-tx))
