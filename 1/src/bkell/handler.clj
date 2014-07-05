(ns bkell.handler

  (:import  (javax.crypto Mac)
            (javax.crypto.spec SecretKeySpec))

  (:require [compojure.core :refer :all]
            [clojure.core.strint :refer :all]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [compojure.response :as response]
            [clojure.java.io :as io]
            [ring.util.response :as ring-resp]
            [clj-http.client :as client]

            [net.cgrand.enlive-html :as enlive]
            [clojure.data.json :as json]
            [clojure.data.codec.base64 :as b64]
            [clojure.contrib.string :as cstring]

            ;; Sente stuff
            [clojure.core.match :as match :refer (match)] ; Optional, useful
            [clojure.core.async :as async :refer (<! <!! >! >!! put! chan go go-loop)]
            [taoensso.sente :as sente]
            [bkell.handler-utils :as hutils]
            ))


;; Sente stuff
(let [{:keys [ch-recv send-fn ajax-post-fn ajax-get-or-ws-handshake-fn]}
      (sente/make-channel-socket! {})]
  (def ring-ajax-post                ajax-post-fn)
  (def ring-ajax-get-or-ws-handshake ajax-get-or-ws-handshake-fn)
  (def ch-chsk                       ch-recv) ; ChannelSocket's receive channel
  (def chsk-send!                    send-fn) ; ChannelSocket's send API fn
  )


(defn goindex []
  (let  [templ (enlive/html-resource "index.html")
         ;;mode (:mode @bkell/shell)
         host-url "10.0.2.15" ;;(-> mode (@bkell/shell) :host-url)
         host-port "8090" ;;(-> mode (@bkell/shell) :host-port)
         developer-key "AIzaSyDc7_lGZsmbtdOUpprPClKBOxXCQ6LztRE" ;;(-> mode (@bkell/shell) :developer-key)

         ;;ruri (str (hutils/generate-host-address host-url (if (= mode :dev) host-port nil)) "/callbackGitkit") ;; conditionally assign the host-port
         ruri (str
               (hutils/generate-host-address host-url host-port)
               "/callbackGitkit") ;; conditionally assign the host-port
         ]
    (apply str  (enlive/emit* (enlive/transform
                               templ
                               [[:script (enlive/nth-of-type 3)]]  ;; get the 3rd script tag
                               (enlive/content [:script (cemerick.austin.repls/browser-connected-repl-js)]))))

    #_(apply str (enlive/emit*  (enlive/transform
                               templ
                               [[:script (enlive/nth-of-type 6)]]
                               (enlive/content
                                (str
                                 "
    //<![CDATA[
      function load() {
        google.load('identitytoolkit', '1.0', {packages: ['ac'], callback: callback});
      }
      function callback() {
        window.google.identitytoolkit.setConfig({

          developerKey: '"developer-key"',
          companyName: 'Interrupt Software Inc.',
          callbackUrl: '" ruri "',

          userStatusUrl: '/userStatusUrl', // these can just be partial paths
          loginUrl: '/loginUrl',
          signupUrl: '/register',
          homeUrl: '/landing',
          logoutUrl: '/logout',

          realm: '', // optional
          language: 'en',
          idps: ['Gmail', 'AOL', 'Hotmail', 'Yahoo'],
          tryFederatedFirst: true,
          useCachedUserStatus: false
        });
        $('#login-control').accountChooser()
      }
    //]]>
                                    ")))))))

(defn callbackHandlerCommon [method request]

  ;; needs to call 'verifyAssertion' to parse response - should return a { :user :map }
  (let [;;mode (:mode @bkell/shell)
        host-url "10.0.2.15" ;;(-> mode (@bkell/shell) :host-url)
        host-port "8090" ;;(-> mode (@bkell/shell) :host-port)
        developer-key "AIzaSyDc7_lGZsmbtdOUpprPClKBOxXCQ6LztRE" ;;(-> mode (@bkell/shell) :developer-key)
        ;;ruri (str (hutils/generate-host-address host-url (if (= mode :dev) host-port nil)) "/callbackGitkit")
        ruri (str (hutils/generate-host-address host-url host-port) "/callbackGitkit")

        pbody (hutils/encode-params request)

        _ (println (str "ruri:[" ruri "]"))

        final-url (str
                   "https://www.googleapis.com/identitytoolkit/v1/relyingparty/verifyAssertion?key="
                   developer-key)
        final-body (str "{'requestUri':'" ruri "','postBody':'" pbody "'}")

        _ (println (str "final-url:[" final-url "]"))
        _ (println (str "final-body:[" final-body "]"))

        verify-resp (client/post
                     final-url
                     {:body final-body
                      :content-type :json})

        _ (println (str "verify-resp: " verify-resp))]

    (-> verify-resp :body clojure.data.json/read-json (merge { :exists false}))))

(defroutes app-routes

 ;; Sente stuff
 (GET  "/chsk" req (#'ring-ajax-get-or-ws-handshake req)) ; Note the #'
 (POST "/chsk" req (#'ring-ajax-post                req))

 (GET "/" []
      (-> (ring-resp/response (goindex))
          (ring-resp/content-type "text/html")))

 (GET "/landing" [:as request]
      (-> (ring-resp/response "<html>Landing Page</html>")
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

 (GET "/callbackGitkit" [:as request & etal]

       (println (<< "/callbackGitkit HANDLER [POST]: request[~{request}]) > etal[~{etal}]"))
       (let  [req (merge (:form-params request) (:query-params request))
              cb-resp (callbackHandlerCommon "POST" req)
              ;;ru (getk/get-user (:verifiedEmail cb-resp))
              templ (enlive/html-resource "include/callbackUrlSuccess.html")
              ]

         (let  [;;rsetup (hutils/adduser-ifnil ru cb-resp)
                ;;rresp (:cb-resp rsetup)
                ]

           ;; Log the user in; session should die after some inactivity
           #_(let [logu (if (nil? (:new-user rsetup)) ru (:new-user rsetup))]

             (authenticatek/login-user (merge logu { :current ::authentication}))
             ;;(session/clear!)
             ;;(session/put! :current-user (merge logu { :current ::authentication }))
             )

           (let  [;;notify-input { :email (:verifiedEmail rresp) :registered (-> rresp :exists str) }
                  notify-input { :email "twashing@gmail.com" :registered "true" }
                  notify-input-str (clojure.data.json/json-str notify-input)]
             (apply str  (enlive/emit*  (enlive/transform
                                         templ
                                         [[:script (enlive/nth-of-type 3)]]  ;; get the 3rd script tag
                                         (enlive/content (str "window.google.identitytoolkit.notifyFederatedSuccess(" notify-input-str ");")))))))))

 (route/resources "/" {:root "resources/public/"})
 (route/not-found "Not Found"))


(def app
  (handler/site app-routes))
