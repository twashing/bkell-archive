(ns landing
  (:require-macros
   [cljs.core.match.macros :refer (match)] ; Optional, useful
   [cljs.core.async.macros :as asyncm :refer (go go-loop)])
  (:require
   [om.core :as om :include-macros true]
   [om.dom :as dom :include-macros true]
   [cljs.core.match] ; Optional, useful
   [cljs.core.async :as async :refer (<! >! put! chan)]
   [taoensso.sente :as sente :refer (cb-success?)]

   [clojure.browser.repl]))


(enable-console-print!)

(let [{:keys [chsk ch-recv send-fn]}
      (sente/make-channel-socket! "/chsk" {} {:type :auto})]

  (def chsk       chsk)
  (def ch-chsk    ch-recv) ; ChannelSocket's receive channel
  (def chsk-send! send-fn) ; ChannelSocket's send API fn
  )

(def app-state
  (atom {:list [{:bookkeeping.group.books.account/id "535724e0-aab9-4710-ae55-f7adbae1b991",
                  :bookkeeping.group.books.account/name "expense",
                  :bookkeeping.group.books.account/type {:db/id 17592186045445},
                  :bookkeeping.group.books.account/counterWeight {:db/id 17592186045448},
                  :db/id 17592186045454}
                 {:bookkeeping.group.books.account/id "535724e0-2db5-408a-9be3-902e286677ba",
                  :bookkeeping.group.books.account/name "cash",
                  :bookkeeping.group.books.account/type {:db/id 17592186045442},
                  :bookkeeping.group.books.account/counterWeight {:db/id 17592186045447},
                  :db/id 17592186045453}
                 {:bookkeeping.group.books.account/id "535724e0-5b0b-4120-b50e-b37b9498da34",
                  :bookkeeping.group.books.account/name "accounts payable",
                  :bookkeeping.group.books.account/type {:db/id 17592186045443},
                  :bookkeeping.group.books.account/counterWeight {:db/id 17592186045448},
                  :db/id 17592186045456}
                 {:bookkeeping.group.books.account/id "535724e0-7552-474d-8434-00a2a4f3c5b3",
                  :bookkeeping.group.books.account/name "revenue",
                  :bookkeeping.group.books.account/type {:db/id 17592186045444},
                  :bookkeeping.group.books.account/counterWeight {:db/id 17592186045447},
                  :db/id 17592186045455}]}))

(defn bkeeping-app [app owner]
  (apply dom/ul nil
         (map (fn [ech] (dom/li nil
                               (:bookkeeping.group.books.account/name ech)))
              (:list app))))

(om/root bkeeping-app
         app-state
         {:target (.getElementById js/document "duo")})
