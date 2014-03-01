(ns bkell.domain
  (:require [datomic.api :only [q db] :as d]
            [bkell.spittoon :as spittoon]))



(defn generate-prefixed-attribute [prefix attribute]
  (keyword (str (name prefix) "/" attribute)))


(defn find-by-id [prefix cid conn]
  {:pre [(keyword? prefix)]}

  (let [query-expression '[:find ?e ?id ?name
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

  (let [query-expression '[:find ?e ?id ?name
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
(defn generate-user-nominal [uname passwd fname lname email country-ref]

  [{:db/id (d/tempid :db.part/user)
    :bookkeeping.user/id (d/squuid)
    :bookkeeping.user/username uname
    :bookkeeping.user/password passwd
    ;; :bookkeeping.user/accountLevel "<>"
    ;; :bookkeeping.user/defaultGroup "<>"
    :bookkeeping.user/firstName fname
    :bookkeeping.user/lastName lname
    :bookkeeping.user/email email
    :bookkeeping.user/country country-ref
    }])


;; construct a nominal group (before inserting user)
(defn generate-group-nominal [group-name default-currency-ref]

  [{:db/id (d/tempid :db.part/user)
    :bookkeeping.group/id (d/squuid)
    :bookkeeping.group/name group-name
    ;; :bookkeeping.group/owner "<>"
    :bookkeeping.group/defaultCurrency default-currency-ref

    ;; :bookkeeping.group/users "<>" ;; list of users belonging to this group
    ;; :bookkeeping.group/bookkeeping "<>"  ;; the set of books belonging to this group
    }])


;; create a full user (with an implicit group)
(defn create-user
  "Creates a user with an implicit group"

  [conn [username password currency-id country-id]]

  (let [group-nominal (generate-group-nominal
                       (str "group-" username)
                       (ffirst (find-currency-by-id currency-id conn)))

        user-nominal (generate-user-nominal
                      username
                      password
                      "" "" ""
                      (ffirst (find-country-by-id country-id conn)))

        ;; set the group's owner - :bookkeeping.group/owner
        group-final (assoc-in
                     group-nominal
                     [0 :bookkeeping.group/owner]
                     (-> user-nominal first :db/id))

        ;; set the user's default group - :bookkeeping.user/defaultGroup
        user-final (assoc-in
                    user-nominal
                    [0 :bookkeeping.user/defaultGroup]
                    (-> group-nominal first :db/id))]

    (spittoon/write-data conn (concat group-final user-final))))

(defn create-group
  "Creates a group with a default user, if one is not passed in."

  ([conn [group-name currency-id country-id]]

     (let [user-nominal (generate-user-nominal
                         (str group-name "-user")
                         "password"
                         "" "" ""
                         (ffirst (find-country-by-id country-id conn)))]

       (create-group conn [group-name currency-id country-id] user-nominal true)))

  ([conn [group-name currency-id country-id] user set-default-group?]

     (let [group-nominal (generate-group-nominal
                          group-name
                          (ffirst (find-currency-by-id currency-id conn)))

           ;; set the group's owner - :bookkeeping.group/owner
           group-final (assoc-in
                        group-nominal
                        [0 :bookkeeping.group/owner]
                        (-> user first :db/id))

           ;; set the user's default group - :bookkeeping.user/defaultGroup
           user-final (if set-default-group?

                        ;; set the user's defaultGroup
                        (assoc-in
                         user
                         [0 :bookkeeping.user/defaultGroup]
                         (-> group-nominal first :db/id))

                        ;; otherwise, not
                        user)]

       (spittoon/write-data conn (concat group-final user-final)))))
