(ns bkell.handler
  (:use compojure.core)
  (:require [compojure.handler :as handler]
            [compojure.route :as route]
            [clojure.java.io :as io]
            [ring.util.response :as ring-resp]))


(defroutes app-routes

 (GET "/" []
      (-> (ring-resp/response (slurp (io/resource "public/index.html")))
          (ring-resp/content-type "text/html")))

 (route/resources "/")
 (route/not-found "Not Found"))

(def app
  (handler/site app-routes))
