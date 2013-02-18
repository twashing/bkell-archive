(ns bkell.http.handler

  (:import [java.io FileReader InputStreamReader])
  (:use [compojure.core]
        [clojure.core.strint])
  (:require [compojure.handler :as handler]
            [compojure.route :as route]
            [compojure.response :as response]
            [cemerick.friend :as friend]
            [net.cgrand.enlive-html :as enlive]
            [clj-http.client :as client]
            [clojure.data.json :as json]
            [noir.session :as session]
            [ring.middleware.session :as rsession]
            [ring.util.response :as ring-response]
            [clojure.pprint :as pprint]
            [hozumi.session-expiry :as hozumi]

            [bkell.bkell :as bkell]
            [bkell.http.handler-utils :as hutils]
            [bkell.commands.get :as getk]
            [bkell.http.handler-utils :as hutils]
            [bkell.commands.authenticate :as authenticatek]
            [bkell.domain :as domain]
            [bkell.bjell :as bjell]
            [bkell.util :as util]
            ))


(defn goindex []
  (let  [templ (enlive/html-resource "index.html")
         mode (:mode @bkell/shell)
         host-url (-> mode (@bkell/shell) :host-url)
         host-port (-> mode (@bkell/shell) :host-port)
         developer-key (-> mode (@bkell/shell) :developer-key)

         xx (println (<< "(xfn ~{host-url} ~{(if (= mode :dev) host-port nil)})"))
         ruri  (str  (hutils/generate-host-address host-url (if (= mode :dev) host-port nil)) "/callbackGitkit" ) ;; conditionally assign the host-port
        ]

    (apply str (enlive/emit*  (enlive/transform
                                templ
                                [[ :script (enlive/nth-of-type 11) ]]  ;; get the 3rd script tag
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
(defn callbackHandlerCommon [method request]

  ;; needs to call 'verifyAssertion' to parse response - should return a { :user :map }
  (let [mode (:mode @bkell/shell)
        host-url (-> mode (@bkell/shell) :host-url)
        host-port (-> mode (@bkell/shell) :host-port)
        developer-key (-> mode (@bkell/shell) :developer-key)
        ruri  (str  (hutils/generate-host-address host-url (if (= mode :dev) host-port nil)) "/callbackGitkit")
        pbody (hutils/encode-params request)

        print0 (println (str "ruri:[" ruri "]"))

        final-url (str "https://www.googleapis.com/identitytoolkit/v1/relyingparty/verifyAssertion?key=" developer-key)
        final-body (str "{'requestUri':'" ruri "','postBody':'" pbody "'}")

        print1 (println (str "final-url:[" final-url "]"))
        print2 (println (str "final-body:[" final-body "]"))

        verify-resp (client/post
                     final-url
                     {:body final-body
                      :content-type :json})

        print3 (println (str "verify-resp: " verify-resp))]

    (-> verify-resp :body clojure.data.json/read-json (merge { :exists false}))))


(defroutes app-routes


  ;; ======
  ;; ROOT Page
  (GET "/" [:as request]   ;; index is the default page of the application
    (goindex)
    )


  ;; ======
  ;; Gitkit Handler
  ;;
  ;;  ? Email exists in the user database
  ;;  Log the user in;
  ;;
  ;;  ? Email does not exist in the user database
  ;;  Create a new entry in your account database with that email address;
  ;;  Add additional information such as the user attributes from the verifyAssertion response.
  ;;  <Google suggests always saving the value of displayName and photoUrl if available because they can be used later to add the user's name and photo to the account chooser>
  ;;  Log the user in to the newly created account;
  ;;  By setting registered=true in the HTML response below, the user will then be redirected to your signupURL to collect any addditional information.

  ;; ======
  ;; ACCOUNT CHOOSER (GITkit) URL handlers
  (GET "/callbackGitkit" [:as request]
    (println (<< "/callbackGitkit HANDLER [GET]: ~{request}"))
    (response/render [:post "/callbackGitkit"] { :request request }))

  (POST "/callbackGitkit" [ :as request & etal ]

    (println (<< "/callbackGitkit HANDLER [POST]: request[~{request}]) > etal[~{etal}]"))
    (let  [req (merge (:form-params request) (:query-params request))
           cb-resp (callbackHandlerCommon "POST" req)
           ru (getk/get-user (:verifiedEmail cb-resp))
           templ (enlive/html-resource "include/callbackUrlSuccess.html")]

      (let  [rsetup (hutils/adduser-ifnil ru cb-resp)
             rresp (:cb-resp rsetup)]

        ;; Log the user in; session should die after some inactivity
        (let [;;dbuser (if (nil? (:new-user rsetup)) ru (:new-user rsetup))
              ;;logu (domain/keywordize-roles (str *ns*) dbuser)
              logu (if (nil? (:new-user rsetup)) ru (:new-user rsetup))
              ]

          (authenticatek/login-user (merge logu { :current ::authentication}))
          ;;(session/clear!)
          ;;(session/put! :current-user (merge logu { :current ::authentication }))
          )

        (let  [notify-input { :email (:verifiedEmail rresp) :registered (-> rresp :exists str)}
               notify-input-str (clojure.data.json/json-str notify-input)]
          (apply str  (enlive/emit*  (enlive/transform
                                      templ
                                      [[ :script (enlive/nth-of-type 3)]]  ;; get the 3rd script tag
                                      (enlive/content (str "window.google.identitytoolkit.notifyFederatedSuccess(" notify-input-str ");")))))))))

  ;; ======
  ;; LANDING Page
  (GET "/landing" [ :as request ]

       #_(println (<< "... ~{(pprint/pprint (:logged-in-user @bkell/shell))}"))
       #_(if (friend/authorized? #{ ::user } (merge (:logged-in-user @bkell/shell) { :current ::thing :authentications { ::thing { :roles #{ ::admin ::user } } } }  ))
         (ring-response/file-response "landing.html" { :root "public" })
         "No go"
         )


       (if (friend/authorized? #{ "user" } (merge (:logged-in-user @bkell/shell) { :current :authentication }) )
         (ring-response/file-response "landing.html" { :root "public" })
         "No go"
       )
  )


  ;; ======
  ;; CRUD on Accounts
  (PUT "/account/:id" [ :as raw-req ]

     (println (str "PUT ; /account ; " raw-req))
     (let [body (InputStreamReader. (:body raw-req))
           lin-user (authenticatek/logged-in-user)]

       (->      ;; JSON of MongoDB WriteResult;
         body (bjell/add (:username lin-user)) (hutils/handle-errors 500) hutils/substitute-body)
     )
  )
  (GET "/accounts" [ :as req ]

    (println (str "GET ; /accounts ; " req))
    (let [lin-user (authenticatek/logged-in-user)]

      (->      ;; JSON of MongoDB WriteResult;
        (bkell/getk :accounts (:username lin-user)) (hutils/handle-errors 400) hutils/substitute-body)
    )
  )
  (GET "/account/:id" [id]

    (println (str "GET ; /account/:id ; " id))
    (let [lin-user (authenticatek/logged-in-user)]

      (->      ;; JSON of MongoDB WriteResult;
        (bkell/getk :account (:username lin-user) id ) (hutils/handle-errors 400) hutils/substitute-body)
    )
  )
  (POST "/account/:id" [ id :as raw-req ]

    (println (str "POST ; /account/:id ; " raw-req))
    (let [body (InputStreamReader. (:body raw-req))
          lin-user (authenticatek/logged-in-user)]

      (->      ;; JSON of MongoDB WriteResult;
        body (bjell/update (:username lin-user) ) (hutils/handle-errors 400) hutils/substitute-body)
    )
    #_(let [raw-req (request/ring-request)]

    )
  )
  (DELETE "/account/:id" [id]

    (println (str "DELETE ; /account/:id ; " id))

    (let [lin-user (authenticatek/logged-in-user)]

      (->      ;; JSON of MongoDB WriteResult;
        (bkell/removek { :tag :account :id id } (:username lin-user)) (hutils/handle-errors 400) )
      { :tag :account :id id }
    )
  )


  ;; ======
  ;; CRUD on Entries
  (PUT  "/entry/:id" [:as raw-req]

    (println (str "PUT ; /entry ; " raw-req))
    (let [lin-user (authenticatek/logged-in-user)]
      (if-let [body (InputStreamReader. (:body raw-req))]
        (->      ;; JSON of MongoDB WriteResult;
          body (bjell/add (:username lin-user)) (hutils/handle-errors 400) hutils/substitute-body)
      )
    )
  )
  (GET "/entries" [:as req]

    (println (str "GET ; /entries ; " req))
    (let [lin-user (authenticatek/logged-in-user)]

      (->      ;; JSON of MongoDB WriteResult;
        (bkell/getk :entries (:username lin-user)) (hutils/handle-errors 400) hutils/substitute-body)
    )
  )
  (GET "/entry/:id" [id]

    (println (str "GET ; /entry/:id ; " id))
    (let [lin-user (authenticatek/logged-in-user)]

      (->      ;; JSON of MongoDB WriteResult;
        (bkell/getk :entry (:username lin-user) id ) (hutils/handle-errors 400) hutils/substitute-body)
    )
  )
  (POST "/entry/:id" [id :as raw-req]

    (println (str "POST ; /entry/:id ; " raw-req))
    (let  [ lin-user (authenticatek/logged-in-user)
            body (InputStreamReader. (:body raw-req))
           ]
      (->      ;; JSON of MongoDB WriteResult;
        body (bjell/update (:username lin-user) ) (hutils/handle-errors 400) hutils/substitute-body)
    )
    #_(let [raw-req (request/ring-request)]
    )
  )
  (DELETE "/entry/:id" [id]

    (println (str "DELETE ; /entry/:id ; " id))

    (let [lin-user (authenticatek/logged-in-user)]

      (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client
        (bkell/removek { :tag :entry :id id } (:username lin-user) ) (hutils/handle-errors 400) ) ;; TODO - stubbing in 'stub' user for now
      { :tag :entry :id id }
    )
  )


  ;; ======
  ;; Generate a new ID
  (GET "/generateid" [:as req]

    (println (str "GET ; /generateid ; " req))
    (let [lin-user (authenticatek/logged-in-user)]
      (util/generate-id)
    )
  )


  ;; ======
  ;; Currencies
  (GET "/currencies" [:as raw-req]

    (println (str "GET ; /currencies ; " raw-req))
    (let [lin-user (authenticatek/logged-in-user)]

      (let  [ cur (bkell/getk :currencies (:username lin-user))
              fcur (map #(dissoc %1 :_id) cur)    ;; removing ObjectId
            ]

        (->      ;; JSON of MongoDB WriteResult;
          fcur (hutils/handle-errors 400) hutils/substitute-body)
      )
    )
  )


  ;; ======
  ;; Resource Routes
  (route/files "/")
  (route/resources "/")
  (route/not-found "Not Found")

)


#_(def app
  (handler/site
   (session/wrap-noir-session* app-routes)))

(def app
  (->
   app-routes
   (session/wrap-noir-session)
   (hozumi/wrap-session-expiry 3600)
   (handler/site)))
