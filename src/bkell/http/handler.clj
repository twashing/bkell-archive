(ns bkell.http.handler
  
  (:use [compojure.core]
        [noir.core :only [defpage]]
  )
  
  (:import [java.io FileReader]
           [java.net URLEncoder NetworkInterface]
  ) 
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [bkell.bjell :as bjell]
            [bkell.bkell :as bkell]
            [bkell.commands.authenticate :as authenticatek]
            [bkell.util :as util]
            [clojure.contrib.duck-streams :as duck-streams]
            [clojure.data.json :as json]
            [clojure.pprint :as pprint]
            [ring.middleware.file :as ring-file]
            [ring.util.response :as response]
            [clj-http.client :as client]
            [clojure.contrib.duck-streams :as dstreams]
            [net.cgrand.enlive-html :as enlive]
            [ring.adapter.jetty :as jetty]
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

(defn encode-params [request-params]
  (let [encode #(URLEncoder/encode (str %) "UTF-8")
        coded (for [[n v] request-params] (str (encode (name n)) "=" (encode
                                                               v)))]
        (apply str (interpose "&" coded))))

(defn callbackHandlerCommon [method req]
  
    ;; needs to call 'verifyAssertion' to parse response - should return a { :user :map }
    (let [  ruri "http://172.16.210.144:8080/callbackGitkit" 
            pbody (encode-params (:params req))
            final-body (clojure.data.json/json-str { :requestUri ruri :postBody pbody })
            print1 (println (str "final-body:[" final-body "]"))
            verify-resp (client/post
                    "https://www.googleapis.com/identitytoolkit/v1/relyingparty/verifyAssertion?key=AIzaSyDc7_lGZsmbtdOUpprPClKBOxXCQ6LztRE"
                    { :body final-body
                      :content-type :json
                    })
            print2 (println (str "verify-resp " verify-resp))
            
         ]
      
        ; check if user exists ; add to DB if not 
        ; ** bjell will throw an AssertionError if user already exists 
        (try 
          (let [verify-sexp (-> verify-resp :body clojure.data.json/read-json (merge { :exists false }))
                json (println (str "from-verify-JSON" verify-sexp))
                add-resp (bkell/add {  :tag :user
                                       :username (:verifiedEmail verify-sexp)
                                       :password ""
                                       :content 
                                         [{  :tag :profileDetails,
                                             :content
                                             [{:tag :profileDetail,
                                               :name "first.name", 
                                               :value (:firstName verify-sexp),
                                               :content nil}
                                              {:tag :profileDetail,
                                               :name "last.name", 
                                               :value (:lastName verify-sexp),
                                               :content nil}
                                              {:tag :profileDetail,
                                               :name "email", 
                                               :value (:verifiedEmail verify-sexp),
                                               :content nil}
                                              {:tag :profileDetail,
                                               :name "country", 
                                               :value "",
                                               :content nil}]}]
                                    })]
            
            (println (str "add-resp: " add-resp))
            
            (merge verify-sexp { :exists true })
            ; log the user in ; session should die after some inactivity 
            ;;(session-put! :current-user add-resp)
            
          )
          (catch java.lang.Exception ae (println (str "Not adding this user as it already exists:  " ae))))
        
      
      ; FINAL - return verify-resp
      (-> verify-resp :body clojure.data.json/read-json (merge { :exists false }))
    )
)



;; ======
;; ROOT Page 
(defpage "/" []   ;; index is the default page of the application 
  (response/file-response "index.html" { :root "public" }))



;; ======
;; ACCOUNT CHOOSER (GITkit) URL handlers
(defpage "/callbackGitkit" [:as req]
  (callbackHandlerCommon "GET" req))
(defpage [:post "/callbackGitkit"] [:as req]
  
  (let  [ cb-resp (callbackHandlerCommon "POST" req)
          one (println (str "cb-resp: " cb-resp))
          templ (enlive/html-resource "include/callbackUrlSuccess.html")
          notify-input { :email (:verifiedEmail cb-resp) :registered (-> cb-resp :exists str) }
          notify-input-str (clojure.data.json/json-str notify-input)
        ]
    
    (apply str (enlive/emit*  (enlive/transform 
                                templ
                                [[ :script (enlive/nth-of-type 3) ]]  ;; get the 3rd script tag 
                                (enlive/content (str "window.google.identitytoolkit.notifyFederatedSuccess(" notify-input-str ");")))
    ))
  )
)


