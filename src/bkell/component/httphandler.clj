(ns bkell.component.httphandler
  (:require [hara.component :as hco]
            [taoensso.timbre :as timbre]
            [bkell.http.handler :as handler]))


(defrecord HttpHandler [env]
  hco/IComponent

  (-start [hh]

    (timbre/trace "HttpHandler.start CALLED > hh[" hh "]")
    (if-not (:app hh)
      (assoc hh :app (handler/create-app env (:browserrepl hh)))
      hh))

  (-stop [hh]

    (timbre/trace "HttpHandler.stop CALLED")
    (dissoc hh :app)))
