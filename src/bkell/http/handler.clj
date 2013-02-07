(ns bkell.http.handler
  (:use [compojure.core]
        [clojure.core.strint])
  (:require [compojure.handler :as handler]
            [compojure.route :as route]
            [cemerick.friend :as friend]
            [net.cgrand.enlive-html :as enlive]
            [bkell.bkell :as bkell]
            ))


(defn generate-host-address [host-url host-port]
  (str  "http://"
        (if (-> host-url nil? not) host-url "localhost")
        (if (-> host-port nil? not) (str ":" host-port))
        )
)
(defn goindex []
  (let  [templ (enlive/html-resource "index.html")
         mode (:mode @bkell/shell)
         host-url (-> mode (@bkell/shell) :host-url)
         host-port (-> mode (@bkell/shell) :host-port)
         developer-key (-> mode (@bkell/shell) :developer-key)

         xx (println (<< "(xfn ~{host-url} ~{(if (= mode :dev) host-port nil)})"))
         ruri  (str  (generate-host-address host-url (if (= mode :dev) host-port nil)) "/callbackGitkit" ) ;; conditionally assign the host-port
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


(defroutes app-routes


  #_(GET "/" [:as request]
       (throw (Exception. "fubar"))
       "Hello World")
  #_(route/not-found "Not Found")


  ;; ======
  ;; ROOT Page
  (GET "/" []   ;; index is the default page of the application
    (goindex)
  )

)


(def app
  (handler/site
   (friend/authenticate app-routes {})))
