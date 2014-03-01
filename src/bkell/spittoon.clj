(ns bkell.spittoon
  (:require [datomic.api :only [q db] :as d]))


(def url "datomic:free://localhost:4334/bkeeping")


(defn database-create [iurl]
  (d/create-database (if iurl iurl url)))
(defn database-delete [iurl]
  (d/delete-database (if iurl iurl url)))


(defn database-connect [iurl]
  (d/connect (if iurl iurl url)))


(defn write-data [conn data]
  @(d/transact conn data))

(defn database-schema-create [conn]
  (let [schema-tx (read-string (slurp "resources/schema/bkeeping-schema.edn"))]
    (write-data conn schema-tx)))

(defn query [query-expression query-parameters conn]

  (println "query-expression: " query-expression)
  (println "query-aparameters: " query-parameters)
  (d/q query-expression (d/db conn) query-parameters))
