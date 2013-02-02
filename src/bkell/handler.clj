(ns bkell.handler
  (:use compojure.core)
  (:require [compojure.handler :as handler]
            [compojure.route :as route]
            [cemerick.friend :as friend]))

(defroutes app-routes
  (GET "/" [] "Hello World")
  (GET "/authorized" request
       (friend/authorize #{::user} "This page can only be seen by authenticated users."))
  (GET "/login" [] "Here is our login page.")
  (route/not-found "Not Found"))

#_(def app
  (handler/site app-routes))

(def app
  (handler/site
   (friend/authenticate app-routes {})))
