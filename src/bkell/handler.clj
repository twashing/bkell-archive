(ns bkell.handler

  (:import  (javax.crypto Mac)
            (javax.crypto.spec SecretKeySpec))

  (:require [compojure.core :refer :all]
            [clojure.core.strint :refer :all]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [compojure.response :as response]
            [clojure.java.io :as io]
            [ring.util.response :as rresp]
            [clj-http.client :as client]

            [net.cgrand.enlive-html :as enlive]
            [clojure.data.json :as json]
            [clojure.data.codec.base64 :as b64]
            [clojure.contrib.string :as cstring]

            ;; Sente stuff
            [clojure.core.match :as match :refer (match)] ; Optional, useful
            [clojure.core.async :as async :refer (<! <!! >! >!! put! chan go go-loop)]
            [taoensso.sente :as sente]
            [taoensso.timbre :as timbre]

            ;; Autstin Stuff
            [cemerick.austin.repls :refer (browser-connected-repl-js)]

            [bkell.utils :as utils]
            [bkell.handler-utils :as hutils]
            [bkell.domain.domain :as domain]
            [bkell.spittoon.identity :as si]))


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
         host-url "172.16.210.128" ;;(-> mode (@bkell/shell) :host-url)
         host-port "8090" ;;(-> mode (@bkell/shell) :host-port)
         developer-key "AIzaSyDc7_lGZsmbtdOUpprPClKBOxXCQ6LztRE" ;;(-> mode (@bkell/shell) :developer-key)

         ;;ruri (str (hutils/generate-host-address host-url (if (= mode :dev) host-port nil)) "/callbackGitkit") ;; conditionally assign the host-port
         ruri (str
               (hutils/generate-host-address host-url host-port)
               "/callbackGitkit") ;; conditionally assign the host-port
         ]

    (apply str (enlive/emit*  (enlive/transform
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
        host-url "172.16.210.128" ;;(-> mode (@bkell/shell) :host-url)
        host-port "8090" ;;(-> mode (@bkell/shell) :host-port)
        developer-key "AIzaSyDc7_lGZsmbtdOUpprPClKBOxXCQ6LztRE" ;;(-> mode (@bkell/shell) :developer-key)
        ;;ruri (str (hutils/generate-host-address host-url (if (= mode :dev) host-port nil)) "/callbackGitkit")
        ruri (str (hutils/generate-host-address host-url host-port) "/callbackGitkit")

        pbody (hutils/encode-params request)

        _ (timbre/debug (str "ruri:[" ruri "]"))

        final-url (str
                   "https://www.googleapis.com/identitytoolkit/v1/relyingparty/verifyAssertion?key="
                   developer-key)
        final-body (str "{'requestUri':'" ruri "','postBody':'" pbody "'}")

        _ (timbre/debug (str "final-url:[" final-url "]"))
        _ (timbre/debug (str "final-body:[" final-body "]"))

        verify-resp (client/post
                     final-url
                     {:body final-body
                      :content-type :json})

        _ (timbre/debug (str "verify-resp: " verify-resp))]

    (-> verify-resp :body clojure.data.json/read-json (merge { :exists false}))))

(defn check-live-session [request-or-session]
  {:pre [(map? request-or-session)]}

  (let [scheckfn (fn [ros]
                   (and (not (nil? ros))
                        (not (empty? ros))))]

    ;; operate on a ring request OR a session map directly
    (if-not (nil? (:uri request-or-session))
      (scheckfn (:session request-or-session))
      (scheckfn request-or-session))))

(defmacro with-session [request & body]
  `(if (check-live-session ~request)
     (do ~@body)
     (rresp/redirect "/")))

(defn create-session-response [request]

  (let [result (check-live-session request)]

           (timbre/debug "check-live-session > " result)
           (if-not result
             (-> (rresp/response "create-session")
                 (rresp/content-type "text/html")
                 (assoc :session {:username "webkell-user"}))
             (-> (rresp/response (str "existing-session[" (:session request) "]"))
                 (rresp/content-type "text/html")))))

(defn create-approutes [conn]

  (defroutes approutes

    ;; Sente stuff
    (GET  "/chsk" req (#'ring-ajax-get-or-ws-handshake req)) ; Note the #'
    (POST "/chsk" req (#'ring-ajax-post                req))

    (GET "/callbackGitkit" [:as request & etal]

         (timbre/debug
          (<< "/callbackGitkit HANDLER [GET]: request[~{(keys request)}] > etal[~{(keys etal)}]"))

         (let  [req (merge (:form-params request) (:query-params request))
                cb-resp (callbackHandlerCommon "POST" req)

                ru (domain/retrieve-user conn (:verifiedEmail cb-resp))
                ra (if (nil? ru)
                     (domain/create-user conn (:verifiedEmail cb-resp) "default" "USD" "US")
                     ru)

                templ (enlive/html-resource "include/callbackUrlSuccess.html")]

           (let  [notify-input { :email (:verifiedEmail cb-resp) :registered (-> cb-resp :exists str) }
                  notify-input-str (clojure.data.json/json-str notify-input)]

             (apply str  (enlive/emit*  (enlive/transform
                                         templ
                                         [[:script (enlive/nth-of-type 3)]]  ;; get the 3rd script tag
                                         (enlive/content
                                          (str "window.google.identitytoolkit.notifyFederatedSuccess("
                                               notify-input-str ");"))))))))

    (GET "/" []
         (-> (rresp/response (goindex))
             (rresp/content-type "text/html")))

    (GET "/create-session" [:as request]

         (create-session-response request))

    (GET "/landing" [:as request]

         (with-session request
           (let [_ (timbre/debug "request params["request "]")
                 landing-page (if true   ;; flag for DEV or PROD

                                (let [repl-env (reset! cemerick.austin.repls/browser-repl-env
                                                       (cemerick.austin/repl-env
                                                        :host (:server-name request)))]
                                  (rresp/response
                                   (apply str (enlive/emit*
                                               (enlive/transform (enlive/html-resource "landing.html")
                                                                 [:#repl-connection]
                                                                 (fn [node]
                                                                   (assoc node
                                                                     :content (browser-connected-repl-js))))))))

                                (rresp/file-response "landing.html" { :root "resources/public" }))]

             (rresp/content-type landing-page "text/html"))))


    (PUT "/account" [:as request])
    (GET "/account/:id" [:as request])
    (POST "/account" [:as request])
    (DELETE "/account" [:as request])
    (GET "/accounts" [:as request]

         (with-session request
           (timbre/debug "/accounts CALLED / session[" (:session request) "]")
           (let [uname (-> request :session :username)
                 gname (si/generate-groupname-from-username uname)
                 account-list (domain/list-accounts conn gname)]

             (-> (rresp/response account-list)
                 (rresp/content-type "text/html")))))

    (PUT "/entry" [:as request])
    (GET "/entry/:id" [:as request])
    (POST "/entry" [:as request])
    (DELETE "/entry" [:as request])
    (GET "/entries" [:as request]
         (with-session request
           (timbre/debug "/entries CALLED / session[" (:session request) "]")))

    ;; ====
    ;; AWS Upload
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


    ;; ====
    ;; Resources
    (route/resources "/" { :root "resources/public/" })
    (route/not-found "Not Found")))


(def app nil)
(defn create-app
  ([conn] (create-app conn true))
  ([conn use-session?]
     (alter-var-root #'app (fn [x] (handler/site
                                   (create-approutes conn)
                                   {:session {:cookie-attrs {:max-age 60000}}})))))
