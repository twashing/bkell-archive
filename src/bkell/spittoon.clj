(ns bkell.spittoon
  (:require [datomic.api :only [q db] :as d]
            [taoensso.timbre :as timbre]
            [bkell.config :as config]))


(declare write-data)


(defn database-create [url] (d/create-database url))
(defn database-delete [url] (d/delete-database url))


(defn database-connect [url]
  (d/connect url))

(defn database-schema-create [conn]
  (let [schema-tx (read-string (slurp "resources/schema/bkeeping-schema.edn"))]
    (write-data conn schema-tx)))

(defn query [query-expression query-parameters conn]
  (d/q query-expression (d/db conn) query-parameters))

(defn write-data [conn data]
  @(d/transact conn data))


(defn populate-entity [conn eid]
  (let [entity (d/entity (d/db conn) eid)]
    (d/touch entity)))
