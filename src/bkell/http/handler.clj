(ns bkell.http.handler
  
  (:use [compojure.core]
  )
  
  (:import [java.io FileReader]
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
  )
)


(def local-ip
     (let [ ifc (NetworkInterface/getNetworkInterfaces)
            ifsq (enumeration-seq ifc)
            ifmp (map #(bean %) ifsq)
            ipsq (filter #(false? (% :loopback)) ifmp)
            ipa (map :interfaceAddresses ipsq)
            ipaf (nth ipa 0)
            ipafs (.split (str ipaf) " " )
            ips (first (nnext ipafs))]
            (str (second (.split ips "/")))
      ))

(defn generate-host-address [host-url host-port]
  (str  "http://"  
        (if (-> host-url nil? not) host-url "localhost") 
        (if (-> host-port nil? not) (str ":" host-port)) 
  )
)


;; ======
;; ROOT Page 
(noir/defpage "/" []   ;; index is the default page of the application 
  (let  [ templ (enlive/html-resource "index.html")
          host-url (-> @bkell/shell :mode (@bkell/shell) :host-url)
          host-port (-> @bkell/shell :mode (@bkell/shell) :host-port)
          developer-key (-> @bkell/shell :mode (@bkell/shell) :developer-key)
          ruri  (str  (generate-host-address host-url host-port) "/callbackGitkit" )
        ]
  
    ;;(response/file-response "index.html" { :root "public" })
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

(defn encode-params [request-params]
  (let [encode #(URLEncoder/encode (str %) "UTF-8")
        coded (for [[n v] request-params] (str (encode (name n)) "=" (encode
                                                               v)))]
        (apply str (interpose "&" coded))))

(defn callbackHandlerCommon [method req]
  
    ;; needs to call 'verifyAssertion' to parse response - should return a { :user :map }
    (let [  host-url (-> @bkell/shell :mode (@bkell/shell) :host-url)
            host-port (-> @bkell/shell :mode (@bkell/shell) :host-port)
            developer-key (-> @bkell/shell :mode (@bkell/shell) :developer-key)
            ruri  (str  (generate-host-address host-url host-port) "/callbackGitkit" )
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
                                           :name "country", 
                                           :value "",
                                           :content nil}]}]
                                })]
        
        (println (str "add-resp: " add-resp))
        { :cb-resp (merge cb-resp { :exists true }) :new-user add-resp }
      )
      (catch java.lang.Exception ae (println (str "Not adding this user as it already exists:  " ae))))
    
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
      (session/put! :current-user (if (nil? (:new-user rsetup)) ru (:new-user rsetup) ))
      
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
    (-> "User is not authenticated" (util/wrap-error-msg 400) substitute-body)
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


;; ======
;; CRUD on Accounts
(noir/defpage [ :post "/account" ] [:as req] 
    
    (println (str "POST ; /account ; " req))
    (let [lin-user (authenticatek/logged-in-user)]
      
      (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
        req (bkell/add (:username lin-user)) (handle-errors 500) substitute-body) 
    )
)
(noir/defpage [ :get "/accounts" ] [:as req] 
  
  (println (str "GET ; /accounts ; " req))
  (let [lin-user (authenticatek/logged-in-user)]
    
    (->      ;; JSON of MongoDB WriteResult; TODO - make a proper JSON string for client 
      (bkell/get :accounts (:username lin-user)) (handle-errors 400) substitute-body) 
  )
)
#_(GET "/account/:id" [id] )
#_(PUT "/account/:id" [id :as req])
#_(DELETE "/account/:id" [id] )


;; ======
;; CRUD on Entries
#_(POST "/entry" [:as req] )
#_(GET "/entries" [:as req] )
#_(GET "/entry/:id" [id] )
#_(PUT "/entry/:id" [id :as req])
#_(DELETE "/entry/:id" [id] )


;; ======
;; CRUD on Bookkeeping
#_(GET "/bookkeeping/:id" [id])


#_(route/files "/")
#_(route/resources "/")
#_(route/not-found "Page not found")
#_(ANY "/*" [path] )

