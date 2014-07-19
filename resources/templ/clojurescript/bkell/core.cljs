;;(ns bkell.core (:require [clojure.browser.repl :as repl]))

;;(enable-console-print!)
;;(println "bkell.core UP")

;;(repl/connect "http://172.28.128.5:41936/432/repl/start")
;;(repl/connect "http://<host>:<port>/432/repl/start")
;;(repl/connect "http://172.28.128.5:9000/repl")
;;(repl/connect "http://172.28.128.5:56608/6569/repl/start")


(ns bkell.core
  (:require-macros
   [cljs.core.match.macros :refer (match)] ; Optional, useful
   [cljs.core.async.macros :as asyncm :refer (go go-loop)])
  (:require
   [cljs.core.match] ; Optional, useful
   [cljs.core.async :as async :refer (<! >! put! chan)]
   [taoensso.sente :as sente :refer (cb-success?)]))


(let [{:keys [chsk ch-recv send-fn]}
      (sente/make-channel-socket! "/chsk" {} {:type :auto})]

  (def chsk       chsk)
  (def ch-chsk    ch-recv) ; ChannelSocket's receive channel
  (def chsk-send! send-fn) ; ChannelSocket's send API fn
  )
