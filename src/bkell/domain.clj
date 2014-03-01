(ns bkell.domain
  (:require [datomic.api :only [q db] :as d]
            [bkell.spittoon :as spittoon]))


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
