(ns bkell.http.handler

  (:use [compojure.core]
  )

  (:import  [java.io FileReader InputStreamReader]
            [java.net URLEncoder NetworkInterface]
  )
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [bkell.bjell :as bjell]
            [bkell.bkell :as bkell]
            [bkell.commands.authenticate :as authenticatek]
            [bkell.commands.get :as getk]
            [bkell.util :as util]
            [clojure.contrib.duck-streams :as duck-streams]
            [clojure.data.json :as json]
            [clojure.pprint :as pprint]
            [ring.middleware.file :as ring-file]
            [ring.util.response :as response]
            [clj-http.client :as client]
            [net.cgrand.enlive-html :as enlive]
            [ring.adapter.jetty :as jetty]
            [noir.core :as noir]
            [noir.session :as session]
            [noir.request :as request]
            [cemerick.drawbridge :as dbridge]
  )
)


;; (def local-ip
;;      (let [ ifc (NetworkInterface/getNetworkInterfaces)
;;             ifsq (enumeration-seq ifc)
;;             ifmp (map #(bean %) ifsq)
;;             ipsq (filter #(false? (% :loopback)) ifmp)
;;             ipa (map :interfaceAddresses ipsq)
;;             ipaf (nth ipa 0)
;;             ipafs (.split (str ipaf) " " )
;;             ips (first (nnext ipafs))]
;;             (str (second (.split ips "/")))
;;       ))

(defn generate-host-address [host-url host-port]
  (str  "http://"
        (if (-> host-url nil? not) host-url "localhost")
        (if (-> host-port nil? not) (str ":" host-port))
  )
)

(defn goindex []
  (let  [ templ (enlive/html-resource "index.html")
          mode (:mode @bkell/shell)
          host-url (-> mode (@bkell/shell) :host-url)
          host-port (-> mode (@bkell/shell) :host-port)
          developer-key (-> mode (@bkell/shell) :developer-key)
          ruri  (str  (generate-host-address host-url (if (= mode :dev) host-port nil)) "/callbackGitkit" ) ;; conditionally assign the host-port
        ]

    (apply str (enlive/emit*  (enlive/transform
                                templ
                                [[ :script (enlive/nth-of-type 10) ]]  ;; get the 3rd script tag
                                (enlive/content
                                  (str
                                    "
                                          //<![CDATA[
                                            $(document).ready(function() {

                                              /*********
                                               * Some internal code is giving the body a margin - can't figure out what it is
                                               *********/
                                              $('body').css('margin', '0px');


                                              /*********
                                               * GITkit Account Chooser code
                                               *********/
                                              window.google.identitytoolkit.setConfig({
                                                developerKey: '" developer-key "',
                                                companyName: 'Interrupt Software Inc.',
                                                callbackUrl: '" ruri "',
                                                realm: '',
                                                userStatusUrl: '/userStatusUrl',
                                                loginUrl: '/loginUrl',
                                                signupUrl: '/register',
                                                homeUrl: '/landing',
                                                logoutUrl: '/logout',
                                                idps: ['Gmail', 'Yahoo', 'AOL'],
                                                tryFederatedFirst: true,
                                                useCachedUserStatus: false
                                              });

                                              $('#account-chooser').accountChooser();


                                              /*********
                                               * load the footer file
                                               *********/
                                              $('#footer').load('/include/footerPart.html');

                                            });
                                          //]]>
                                    "
                                  ))
              ))
    )
  )
)
(defn gocfinstall []
  (let  [ templ (enlive/html-resource "include/cfinstall.html") ]

    (apply str (enlive/emit* templ))
  )
)

;; ======
;; ROOT Page
(noir/defpage [ :get "/" ] [:as req]   ;; index is the default page of the application
  (let  [ templ (enlive/html-resource "index.html")
          mode (:mode @bkell/shell)
          host-url (-> mode (@bkell/shell) :host-url)
          host-port (-> mode (@bkell/shell) :host-port)
          developer-key (-> mode (@bkell/shell) :developer-key)
          ;ruri  (str  (generate-host-address host-url host-port) "/callbackGitkit" )
          ruri  (str  (generate-host-address host-url (if (= mode :dev) host-port nil)) "/callbackGitkit" ) ;; conditionally assign the host-port
        ]
    (goindex)

    ;; ;; get (-> raw-request :headers "user-agent")
    ;; (println (str "/ ROOT HANDLER: " (request/ring-request)))
    ;; (let [raw-request (request/ring-request)
    ;;       uagent (get (:headers raw-request) "user-agent")]
    ;;   ;; if IE, then return a ChromeFrameInstall page, otherwise, go to index
    ;;   (println (str "/ ROOT user-agent: " uagent " / is solely IE (without GCF) [" (re-find #"MSIE" uagent) "] "))
    ;;   (if (and (re-find #"MSIE" uagent) (not (re-find #"chromeframe" uagent)))
    ;;     (gocfinstall)
    ;;     (goindex)
    )
  )



(defn encode-params [request-params]
  (let [encode #(URLEncoder/encode (str %) "UTF-8")
        coded (for [[n v] request-params] (str (encode (name n)) "=" (encode
                                                               v)))]
        (apply str (interpose "&" coded))))

(defn callbackHandlerCommon [method req]

    ;; needs to call 'verifyAssertion' to parse response - should return a { :user :map }
    (let [  mode (:mode @bkell/shell)
            host-url (-> mode (@bkell/shell) :host-url)
            host-port (-> mode (@bkell/shell) :host-port)
            developer-key (-> mode (@bkell/shell) :developer-key)
            ;ruri  (str  (generate-host-address host-url host-port) "/callbackGitkit" )
            ruri  (str  (generate-host-address host-url (if (= mode :dev) host-port nil)) "/callbackGitkit" )
            pbody (encode-params req)

            print0 (println (str "ruri:[" ruri "]"))

            final-url (str "https://www.googleapis.com/identitytoolkit/v1/relyingparty/verifyAssertion?key=" developer-key)
            ;;final-body (clojure.data.json/json-str { :requestUri ruri :postBody pbody })
            final-body (str "{'requestUri':'" ruri "','postBody':'" pbody "'}")

            print1 (println (str "final-url:[" final-url "]"))
            print2 (println (str "final-body:[" final-body "]"))

            verify-resp (client/post
                    final-url
                    { :body final-body
                      :content-type :json
                    })

            print3 (println (str "verify-resp: " verify-resp))
         ]

      (-> verify-resp :body clojure.data.json/read-json (merge { :exists false }))
    )
)

(defn adduser-ifnil [ruser cb-resp]

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
                                           :content nil}]}]
                                })]

        (println (str "add-resp: " add-resp))
        { :cb-resp (merge cb-resp { :exists true }) :new-user add-resp }
      )
      (catch java.lang.Exception ae (println (str "Error adding this user:  " (.getMessage ae) ))))

    { :cb-resp cb-resp :new-user nil }   ;; otherwise just return the result
  )
)

;; ======
;; ACCOUNT CHOOSER (GITkit) URL handlers
(noir/defpage "/callbackGitkit" [:as req]
  (noir/render [:post "/callbackGitkit"] { :request req } )
)
(noir/defpage [:post "/callbackGitkit"] [:as req]

  (println (str "/callbackGitkit HANDLER [POST]: " req))
  (let  [ cb-resp (callbackHandlerCommon "POST" req)
          one (println (str "cb-resp: " cb-resp))
          ru (getk/get-user (:verifiedEmail cb-resp))
          templ (enlive/html-resource "include/callbackUrlSuccess.html")
        ]

    (comment
      ? Email exists in the user database
        Log the user in;

      ? Email does not exist in the user database
        Create a new entry in your account database with that email address;
        Add additional information such as the user attributes from the verifyAssertion response.
          <Google suggests always saving the value of displayName and photoUrl if available because they can be used later to add the user's name and photo to the account chooser>
        Log the user in to the newly created account;
        By setting registered=true in the HTML response below, the user will then be redirected to your signupURL to collect any addditional information.

    )

    (let  [ rsetup (adduser-ifnil ru cb-resp)
            rresp (:cb-resp rsetup)
          ]

      ;; Log the user in; session should die after some inactivity
      (let [logu (if (nil? (:new-user rsetup)) ru (:new-user rsetup) )]

        (authenticatek/login-user logu)
        (session/put! :current-user logu)
      )

      (let  [ notify-input { :email (:verifiedEmail rresp) :registered (-> rresp :exists str) }
              notify-input-str (clojure.data.json/json-str notify-input)
            ]
        (apply str  (enlive/emit*  (enlive/transform
                                    templ
                                    [[ :script (enlive/nth-of-type 3) ]]  ;; get the 3rd script tag
                                    (enlive/content (str "window.google.identitytoolkit.notifyFederatedSuccess(" notify-input-str ");")))
                    ))
      )
    )
  )
)


;; ======
;; ACCOUNT CHOOSER Legacy handlers
  ;; /userStatusUrl
  ;; /loginUrl
  ;; /signupUrl


(defn substitute-body [input]

  (if-let [body (:body input)]
    (merge input { :body (json/json-str body) })
    (json/json-str input))
)
(defmacro page-preconditions [ fn-run ]

  (comment  i. block action unless authenticated
            ii. block action unless correct user )
  `(if (nil? (session/get :current-user))
    #_(-> "User is not authenticated" (util/wrap-error-msg 400) substitute-body)
    (response/redirect "/")
    (~fn-run)
  )
)
(defn handle-errors [result status]

  (if (or (= :error (:tag result))
          (= :errors (:tag result)))
    (util/wrap-error result status)
    result
  )
)

;; ======
;; LANDING Page
(noir/defpage "/landing" [:as req]

  (page-preconditions
    #(response/file-response "landing.html" { :root "public" }))
)


;; ======
;; CRUD on User
#_(POST "/user" [:as req])
#_(DELETE "/user/:id" [id] )

(noir/defpage [ :get "/logout" ] [ :as req ]

  (session/remove! :current-user)
  (response/redirect "/")
)


;; ======
;; CRUD on Accounts
(noir/defpage [ :put "/account/:id" ] [:as req]

  (let [raw-req (request/ring-request)]
    (println (str "PUT ; /account ; " raw-req))
    (let [body (InputStreamReader. (:body raw-req))
          lin-user (authenticatek/logged-in-user)]

      (->      ;; JSON of MongoDB WriteResult;
        body (bjell/add (:username lin-user)) (handle-errors 500) substitute-body)
    )
  )
)
(noir/defpage [ :get "/accounts" ] [:as req]

  (println (str "GET ; /accounts ; " req))
  (let [lin-user (authenticatek/logged-in-user)]

    (->      ;; JSON of MongoDB WriteResult;
      (bkell/getk :accounts (:username lin-user)) (handle-errors 400) substitute-body)
  )
)
(noir/defpage [ :get "/account/:id" ] { :keys [id] }

  (println (str "GET ; /account/:id ; " id))
  (let [lin-user (authenticatek/logged-in-user)]

    (->      ;; JSON of MongoDB WriteResult;
      (bkell/getk :account (:username lin-user) id ) (handle-errors 400) substitute-body)
  )
)
(noir/defpage [ :post "/account/:id" ] [ :as req { :keys [id] } ]

  (let [raw-req (request/ring-request)]
    (println (str "POST ; /account/:id ; " raw-req))
    (let [body (InputStreamReader. (:body raw-req))
          lin-user (authenticatek/logged-in-user)]

      (->      ;; JSON of MongoDB WriteResult;
        body (bjell/update (:username lin-user) ) (handle-errors 400) substitute-body)
    )
  )
)
(noir/defpage [ :delete "/account/:id" ] { :keys [id] }

  (println (str "DELETE ; /account/:id ; " id))

  (let [lin-user (authenticatek/logged-in-user)]

    (->      ;; JSON of MongoDB WriteResult;
      (bkell/removek { :tag :account :id id } (:username lin-user)) (handle-errors 400) )
    { :tag :account :id id }
  )
)


;; ======
;; CRUD on Entries
(noir/defpage [ :put "/entry/:id" ] [:as req]

  (let [raw-req (request/ring-request)]

    (println (str "PUT ; /entry ; " raw-req))
    (let [lin-user (authenticatek/logged-in-user)]
      (if-let [body (InputStreamReader. (:body raw-req))]
        (->      ;; JSON of MongoDB WriteResult;
          body (bjell/add (:username lin-user)) (handle-errors 400) substitute-body)
      )
    )
  )
)
(noir/defpage [ :get "/entries" ] [:as req]

  (println (str "GET ; /entries ; " req))
  (let [lin-user (authenticatek/logged-in-user)]

    (->      ;; JSON of MongoDB WriteResult;
      (bkell/getk :entries (:username lin-user)) (handle-errors 400) substitute-body)
  )
)
(noir/defpage [ :get "/entry/:id" ] { :keys [id] }

  (println (str "GET ; /entry/:id ; " id))
  (let [lin-user (authenticatek/logged-in-user)]

    (->      ;; JSON of MongoDB WriteResult;
      (bkell/getk :entry (:username lin-user) id ) (handle-errors 400) substitute-body)
  )
)
(noir/defpage [ :post "/entry/:id" ] { :keys [id] }

  (let [raw-req (request/ring-request)]

    (println (str "POST ; /entry/:id ; " raw-req))
    (let  [ lin-user (authenticatek/logged-in-user)
            body (InputStreamReader. (:body raw-req))
           ]
      (->      ;; JSON of MongoDB WriteResult;
        body (bjell/update (:username lin-user) ) (handle-errors 400) substitute-body)
    )
  )
)
(noir/defpage [ :delete "/entry/:id" ] { :keys [id] }

  (println (str "DELETE ; /entry/:id ; " id))

  (let [lin-user (authenticatek/logged-in-user)]

    (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client
      (bkell/removek { :tag :entry :id id } (:username lin-user) ) (handle-errors 400) ) ;; TODO - stubbing in 'stub' user for now
    { :tag :entry :id id }
  )
)

(noir/defpage [ :get "/generateid" ] [:as req]

  (println (str "GET ; /generateid ; " req))
  (let [lin-user (authenticatek/logged-in-user)]

    (util/generate-id)
  )
)

(noir/defpage [ :get "/currencies" ] [:as req]

  (println (str "GET ; /currencies ; " req))
  (let [lin-user (authenticatek/logged-in-user)]


    (let  [ cur (bkell/getk :currencies (:username lin-user))
            fcur (map #(dissoc %1 :_id) cur)    ;; removing ObjectId
          ]

      (->      ;; JSON of MongoDB WriteResult;
        fcur (handle-errors 400) substitute-body)
    )
  )
)

;; nrepl Drawbridge handler
(noir/defpage [ :get "/repl" ] [:as req]
  (println (request/ring-request))
  (dbridge/ring-handler (request/ring-request))
)
(noir/defpage [ :post "/repl" ] [:as req]
  (println (request/ring-request))
  (dbridge/ring-handler (request/ring-request))
)

;; ======
;; CRUD on Bookkeeping
#_(GET "/bookkeeping/:id" [id])


(route/files "/")
(route/resources "/")
#_(route/not-found "Page not found")
#_(ANY "/*" [path] )
