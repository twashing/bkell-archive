(ns bkell.domain
  (:require [datomic.api :only [q db] :as d]
            [bkell.spittoon :as spittoon]))



(defn generate-prefixed-attribute [prefix attribute]
  (keyword (str (name prefix) "/" attribute)))


(defn find-by-id [prefix cid conn]
  {:pre [(keyword? prefix)]}

  (let [query-expression '[:find ?id ?name
                          :in $ [?attribute-id ?attribute-name ?cid]
                          :where
                          [?e ?attribute-id ?cid]
                          [?e ?attribute-id ?id]
                          [?e ?attribute-name ?name]]
        query-parameters [(generate-prefixed-attribute prefix "id")
                          (generate-prefixed-attribute prefix "name")
                          cid]]

    (spittoon/query query-expression query-parameters conn)))

(defn find-by-name [prefix cname conn]
  {:pre [(keyword? prefix)]}

  (let [query-expression '[:find ?id ?name
                          :in $ [?attribute-id ?attribute-name ?cname]
                          :where
                          [?e ?attribute-name ?cname]
                          [?e ?attribute-id ?id]
                          [?e ?attribute-name ?name]]
        query-parameters [(generate-prefixed-attribute prefix "id")
                          (generate-prefixed-attribute prefix "name")
                          cname]]

    (spittoon/query query-expression query-parameters conn)))


(defn find-country-by-id [id conn] (find-by-id :bookkeeping.country id conn))
(defn find-country-by-name [name conn] (find-by-name :bookkeeping.country name conn))

(defn find-currency-by-id [id conn] (find-by-id :bookkeeping.currency id conn))
(defn find-currency-by-name [name conn] (find-by-name :bookkeeping.currency name conn))

(defn find-accounttype-by-id [id conn] (find-by-id :bookkeeping.accountType id conn))
(defn find-accounttype-by-name [name conn] (find-by-name :bookkeeping.accountType name conn))

(defn find-counterweight-by-id [id conn] (find-by-id :bookkeeping.counterWeight id conn))
(defn find-counterweight-by-name [name conn] (find-by-name :bookkeeping.counterWeight name conn))



;; create a nominal user (before wrapping in a group)
(defn create-user-nominal [conn uname passwd fname lname email country-ref]

  {:bookkeeping.user/id (d/squuid)
   :bookkeeping.user/username uname
   :bookkeeping.user/password passwd
   ;; :bookkeeping.user/accountLevel "<>"
   ;; :bookkeeping.user/defaultGroup "<>"
   :bookkeeping.user/firstName fname
   :bookkeeping.user/lastName lname
   :bookkeeping.user/email email
   :bookkeeping.user/country country-ref
   })

;; create a full user (with an implicit group)


;; construct a nominal group (before inserting user)
(defn create-group-nominal [conn group-name default-currency-ref]

  {:bookkeeping.group/id (d/squuid)
   :bookkeeping.group/name group-name
   ;; :bookkeeping.group/owner "<>"
   :bookkeeping.group/defaultCurrency default-currency-ref

   ;; :bookkeeping.group/users "<>" ;; list of users belonging to this group
   ;; :bookkeeping.group/bookkeeping "<>"  ;; the set of books belonging to this group
   })

;; create a group with a new (default)

;; create a group with an existing user
