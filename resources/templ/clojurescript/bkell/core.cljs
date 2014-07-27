(ns bkell.core
  (:require-macros
   [cljs.core.match.macros :refer (match)] ; Optional, useful
   [cljs.core.async.macros :as asyncm :refer (go go-loop)])
  (:require
   [clojure.browser.repl :as repl]
   [cljs.core.match] ; Optional, useful
   [cljs.core.async :as async :refer (<! >! put! chan)]
   [taoensso.sente :as sente :refer (cb-success?)]))


(enable-console-print!)


(defn chsk-url-fn [path {:as window-location :keys [protocol host pathname]} websocket?]
  "ws://172.28.128.5:8090/chsk")

(let [{:keys [chsk ch-recv send-fn state]}
      (sente/make-channel-socket! "/chsk" {:type :auto
                                           :chsk-url-fn chsk-url-fn})]

  (def chsk       chsk)
  (def ch-chsk    ch-recv) ; ChannelSocket's receive channel
  (def chsk-send! send-fn) ; ChannelSocket's send API fn
  (def chsk-state state))


(defn one []
  (chsk-send! [:some/request-id {:name "Rich Hickey" :type "Awesome"}]))


(defn hello []
  (js/alert "Hello World"))


(defn- event-handler [[id data :as ev] _]
  (logf "Event: %s" ev)
  (match [id data]
    ;; TODO Match your events here <...>
    [:chsk/state {:first-open? true}]
    (logf "Channel socket successfully established!")
    [:chsk/state new-state] (logf "Chsk state change: %s" new-state)
    [:chsk/recv  payload]   (logf "Push event from server: %s" payload)
    :else (logf "Unmatched event: %s" ev)))


(defonce chsk-router
  (sente/start-chsk-router-loop! event-handler ch-chsk))
