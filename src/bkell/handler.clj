(ns bkell.handler
  (:import  (javax.crypto Mac)
            (javax.crypto.spec SecretKeySpec))
  (:use compojure.core)
  (:require [compojure.handler :as handler]
            [compojure.route :as route]
            [clojure.java.io :as io]
            [ring.util.response :as ring-resp]

            [clojure.data.json :as json]
            [clojure.data.codec.base64 :as b64]
            [clojure.contrib.string :as cstring]))


(defroutes app-routes

 (GET "/" []
      (-> (ring-resp/response (slurp (io/resource "public/index.html")))
          (ring-resp/content-type "text/html")))

 (GET "/signedUploadParams" []

      (let  [policy-doc "{ 'expiration': '2015-12-01T12:00:00.000Z' ,
                           'conditions': [
                                        {'bucket': 'bkeeping'},
                                        ['starts-with', '$key', ''],
                                        {'acl': 'public-read'}
                                      ]
                         }"

             pdoc-filtered (cstring/replace-re #"\r" "" (cstring/replace-re #"\n" "" policy-doc))
             policy (apply str (map char (-> pdoc-filtered .getBytes b64/encode)))

             hmac-sha1 "HmacSHA1"
             signing-key (SecretKeySpec. (.getBytes "EVnk7c840v0OouypchuzRnnq7qSbJMZLooDUtobL") hmac-sha1)
             mac (doto (Mac/getInstance hmac-sha1) (.init signing-key))
             signature (String. (b64/encode (.doFinal mac (.getBytes policy))))]

        (json/json-str {
                        :bucket "bkeeping"
                        :key "${filename}"
                        :AWSAccessKeyId "AKIAI7QL4ENX5KZ4QQCQ"
                        :acl "public-read"
                        :policy policy
                        :signature signature})))

 (route/resources "/")
 (route/not-found "Not Found"))


(def app
  (handler/site app-routes))
