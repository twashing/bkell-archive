(ns bkell.http.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [compojure.handler :as handler]
            [clojure.string :as str]
            [net.cgrand.enlive-html :as enlive]
            [ring.util.response :as ring-resp]
            [net.cgrand.enlive-html :as enlive]
            [taoensso.timbre :as timbre]
            [ring.middleware.anti-forgery :as af]



            #_[ring.util.anti-forgery :as afu]

            ;; Sente stuff
            [clojure.core.match :as match :refer (match)] ; Optional, useful
            [clojure.core.async :as async :refer (<! <!! >! >!! put! chan go go-loop)]
            [taoensso.sente :as sente]))


;; Sente stuff
(let [{:keys [ch-recv send-fn ajax-post-fn ajax-get-or-ws-handshake-fn]}
      (sente/make-channel-socket! {})]

  (def ring-ajax-post                ajax-post-fn)
  (def ring-ajax-get-or-ws-handshake ajax-get-or-ws-handshake-fn)

  ;; ChannelSocket's receive channel
  (def ch-chsk                       ch-recv)

  ;; ChannelSocket's send API fn
  (def chsk-send!                    send-fn))


(defn- event-msg-handler
  [{:as ev-msg :keys [ring-req event ?reply-fn]} _]
  (let [session (:session ring-req)
        uid     (:uid session)
        [id data :as ev] event]

    (spit "ev.edn" ev)
    #_(timbre/info "Sente Event [" ev "]")
    #_(match [id data]
           ;; TODO: Match your events here, reply when appropriate <...>
           :else
           (do (timbre/debug "Unmatched event [" ev "]")
               (when-not (:dummy-reply-fn? (meta ?reply-fn))
                 (?reply-fn {:umatched-event-as-echoed-from-from-server ev}))))))


(defonce chsk-router
  (sente/start-chsk-router-loop! event-msg-handler ch-chsk))


(defn ws-handler [{:keys [ws-channel] :as req}]
  (println "Opened connection from" (:remote-addr req))
  (go-loop []
    (when-let [{:keys [message error] :as msg} (<! ws-channel)]
      (prn "Message received:" msg)
      (>! ws-channel (if error
                       (format "Error: '%s'." (pr-str msg))
                       {:received (format "You passed: '%s' at %s." (pr-str message) (java.util.Date.))}))
      (recur))))

(defn with-browser-repl [filename browserrepl]

  (timbre/trace "with-browser-repl CALLED / browserrepl[" browserrepl "]")
  (let [repl-env (:repl-env browserrepl)
        chopped-url (str/split (:repl-url repl-env) #"\/")
        host (str "http://" (:host repl-env))
        port (second (str/split (nth chopped-url 2) #":"))
        sessionid (nth chopped-url 3)

        templ (enlive/html-resource filename)]

    (apply str (enlive/emit*
                (enlive/transform templ
                                  [:html]
                                  (enlive/after

                                   ;; splitting up the tags to give time for 'clojure' JS object to load
                                   [{:tag :script :content (str "")}
                                    {:tag :script :content (str "clojure.browser.repl.connect.call(null,\""
                                                                host ":" port "/" sessionid "/repl/start\");")}
                                    #_{:tag :input
                                     :attrs {:type :hidden
                                             :name "__anti-forgery-token"
                                             :value afu/*anti-forgery-token*}}]))))))


(defn create-approutes [project-config browserrepl]

  (defroutes app-routes

    (->
     (routes

      ;; Sente stuff
      (GET  "/chsk" req (ring-ajax-get-or-ws-handshake req))
      (POST "/chsk" req (ring-ajax-post                req))

      (GET "/" []
           (-> (ring-resp/response (with-browser-repl "index.html" browserrepl))
               (ring-resp/content-type "text/html")))

      (route/resources "/" {:root "resources/public/"})
      (route/not-found "Not Found"))

     ;; Sente adds a :csrf-token param to Ajax requests:
     (af/wrap-anti-forgery
      {:read-token (fn [req] (-> req :params :csrf-token))})

     handler/site)))


(defn create-app
  [project-config browserrepl]

  (timbre/trace "create-app CALLED [" project-config "]")
  (create-approutes project-config browserrepl))
