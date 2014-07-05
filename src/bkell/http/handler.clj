(ns bkell.http.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [compojure.handler :as handler]
            [net.cgrand.enlive-html :as enlive]
            [ring.util.response :as ring-resp]))


(defroutes app-routes

  (GET "/" []
       (-> (ring-resp/file-response "index.html" {:root "resources/public"})
           (ring-resp/content-type "text/html")))

  (route/resources "/" {:root "resources/public/"})
  (route/not-found "Not Found"))

(def app
  (handler/site app-routes))
