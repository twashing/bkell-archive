(ns bkell.http.handler
  (:use compojure.core)
  (:require [compojure.handler :as handler]
            [compojure.route :as route]))

(defroutes app-routes
  (GET "/" [:as request]
       (throw (Exception. "fubar"))
       "Hello World")
  (route/not-found "Not Found"))

(def app
  (handler/site app-routes))
