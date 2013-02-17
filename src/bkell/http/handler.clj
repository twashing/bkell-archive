(ns bkell.http.handler
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
            [bkell.bkell :as bkell]
            [bkell.http.handler-utils :as hutils]
            [bkell.commands.get :as getk]
            [bkell.http.handler-utils :as hutils]
            [bkell.commands.authenticate :as authenticatek]
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
        ;;pbody request

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




#_(defn current-authentication
  "Returns the authentication associated with either the current in-flight
request, or the provided Ring request or response map.

Providing the Ring request map explicitly is strongly encouraged, to avoid
any funny-business related to the dynamic binding of `*identity*`."
  ([identity-or-ring-map]
    (let [identity (or (identity identity-or-ring-map)
                     identity-or-ring-map)]
      (pprint/pprint (<< "current-authentication > identity [~{identity}]"))
      (-> identity :authentications (get (:current identity))))))
#_(defn authorized?
  "Returns the first value in the :roles of the current authentication
   in the given identity map that isa? one of the required roles.
   Returns nil otherwise, indicating that the identity is not authorized
   for the set of required roles."
  [roles identity]

  (println (<< "authorized? [~{roles}] / [~{identity}]"))
  (let [granted-roles (-> identity current-authentication :roles)
        xx (println (<< "granted-roles[~{granted-roles}]"))
        xy (println (<< "roles[~{roles}]"))
        xz (println (<< "result[~{(first (for [granted granted-roles
                 required roles
                 :when (isa? granted required)]
             granted))}]"))
        ]
    (first (for [granted granted-roles
                 required roles
                 :when (isa? granted required)]
             granted))))


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
        (let [logu (if (nil? (:new-user rsetup)) ru (:new-user rsetup))]

          (authenticatek/login-user logu)
          (session/put! :current-user logu)
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

       #_(friend/authorized? #{::user}
         #(ring-response/file-response "landing.html" { :root "public" })
         )
       #_(authorized? #{ ::user } (merge (:logged-in-user @bkell/shell) { :current ::thing :authentications { ::thing { :roles #{ ::admin ::user } } } }  ))


       (if (friend/authorized? #{ ::user } (merge (:logged-in-user @bkell/shell) { :current ::thing :authentications { ::thing { :roles #{ ::admin ::user } } } }  ))
         (ring-response/file-response "landing.html" { :root "public" })
         "No go"
       )
  )

  ;; ======
  ;; Resource Routes
  (route/files "/")
  (route/resources "/")
  (route/not-found "Not Found")


)




#_(def app
  (session/wrap-noir-session*
   (handler/site
    (friend/authenticate app-routes { :credential-fn (partial credential-fn (:logged-in-user @bkell/shell)) })))
)

(def app
  (handler/site
   (session/wrap-noir-session* app-routes)))
