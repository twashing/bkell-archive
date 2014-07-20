(ns bkell.core
  (:require-macros
   [cljs.core.match.macros :refer (match)] ; Optional, useful
   [cljs.core.async.macros :as asyncm :refer (go go-loop)])
  (:require
   [clojure.browser.repl :as repl]
   [cljs.core.match] ; Optional, useful
   [cljs.core.async :as async :refer (<! >! put! chan)]
   [taoensso.sente :as sente :refer (cb-success?)]))


(let [{:keys [chsk ch-recv send-fn]}
      (sente/make-channel-socket! "/chsk" {} {:type :auto})]

  (def chsk       chsk)
  (def ch-chsk    ch-recv) ; ChannelSocket's receive channel
  (def chsk-send! send-fn) ; ChannelSocket's send API fn
  )

(defn hello []
  (js/alert "Hello World"))
