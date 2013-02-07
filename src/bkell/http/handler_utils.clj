(ns bkell.http.handler-utils

  (:import [java.net URLEncoder NetworkInterface])
  ;;(:require [bkell.bkell :as bkell])
  )


(defn encode-params [request-params]
  (let [encode #(URLEncoder/encode (str %) "UTF-8")
        coded (for [[n v] request-params] (str (encode (name n)) "=" (encode
                                                                      v)))]
    (apply str (interpose "&" coded))))

(defn generate-host-address [host-url host-port]
  (str  "http://"
        (if (-> host-url nil? not) host-url "localhost")
        (if (-> host-port nil? not) (str ":" host-port))
        ))

#_(defn adduser-ifnil [ruser cb-resp]

  (if (nil? ruser)

    (try  ;; add user if it is nil in DB
      (let [json (println (str "from-verify-JSON" cb-resp))
            add-resp (bkell/add {  :tag :user
                                 :username (:verifiedEmail cb-resp)
                                 :password ""
                                 :content
                                 [{  :tag :profileDetails,
                                   :content
                                   [{:tag :profileDetail,
                                     :name "first.name",
                                     :value (:firstName cb-resp),
                                     :content nil}
                                    {:tag :profileDetail,
                                     :name "last.name",
                                     :value (:lastName cb-resp),
                                     :content nil}
                                    {:tag :profileDetail,
                                     :name "email",
                                     :value (:verifiedEmail cb-resp),
                                     :content nil}
                                    {:tag :profileDetail,
                                     :name "currency",
                                     :value "CAD",
                                     :content nil}
                                    {:tag :profileDetail,
                                     :name "company",
                                     :value "",
                                     :content nil}
                                    {:tag :profileDetail,
                                     :name "country",
                                     :value "",
                                     :content nil}
                                    {:tag :profileDetail
                                     :name :paywallState
                                     :value "trial"
                                     :content nil}]}]})]

        (println (str "add-resp: " add-resp))
        { :cb-resp (merge cb-resp { :exists true}) :new-user add-resp})
      (catch java.lang.Exception ae (println (str "Error adding this user:  " (.getMessage ae)))))

    { :cb-resp cb-resp :new-user nil}   ;; otherwise just return the result
    ))
