(ns bkell.http.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [compojure.handler :as handler]
            [clojure.string :as str]
            [net.cgrand.enlive-html :as enlive]
            [ring.util.response :as ring-resp]
            [net.cgrand.enlive-html :as enlive]
            [taoensso.timbre :as timbre]

            ;; Sente stuff
            [clojure.core.match :as match :refer (match)] ; Optional, useful
            [clojure.core.async :as async :refer (<! <!! >! >!! put! chan go go-loop)]
            [taoensso.sente :as sente]))


;; Sente stuff
(let [{:keys [ch-recv send-fn ajax-post-fn ajax-get-or-ws-handshake-fn]}
      (sente/make-channel-socket! {})]
  (def ring-ajax-post                ajax-post-fn)
  (def ring-ajax-get-or-ws-handshake ajax-get-or-ws-handshake-fn)
  (def ch-chsk                       ch-recv) ; ChannelSocket's receive channel
  (def chsk-send!                    send-fn) ; ChannelSocket's send API fn
  )

(go-loop [from-client (<! ch-chsk)]
  (timbre/info "from CLIENT[" from-client "]")
  (def one from-client)
  (def two 123))


(defn with-browser-repl [filename repl-env]

  (let [chopped-url (str/split (:repl-url repl-env) #"\/")
        host (:host repl-env)
        port (second (str/split (nth chopped-url 2) #":"))
        sessionid (nth chopped-url 3)

        templ (enlive/html-resource filename)]

    (apply str (enlive/emit*
                (enlive/transform templ
                                  [:html]
                                  (enlive/after

                                   ;; splitting up the tags to give time for 'clojure' JS object to load
                                   [{:tag :script :content (str "")}
                                    {:tag :script :content (str "clojure.browser.repl.connect.call(null,\"" host ":" port "/" sessionid "/repl/start\");")}]))))))



(defn create-approutes [project-config]

  (defroutes app-routes

    ;; Sente stuff
    (GET  "/chsk" req (#'ring-ajax-get-or-ws-handshake req)) ; Note the #'
    (POST "/chsk" req (#'ring-ajax-post                req))


    (GET "/" []
         (-> (ring-resp/response (with-browser-repl "index.html" (:repl-env project-config)))
             (ring-resp/content-type "text/html")))

    (route/resources "/" {:root "resources/public/"})
    (route/not-found "Not Found")))


(def app nil)
(defn create-app

  [project-config]

  (timbre/trace "create-app CALLED [" project-config "]")
  (alter-var-root #'app (fn [x]
                          (handler/site (create-approutes project-config)))))
