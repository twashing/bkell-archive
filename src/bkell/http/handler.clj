(ns bkell.http.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [compojure.handler :as handler]
            [net.cgrand.enlive-html :as enlive]
            [ring.util.response :as ring-resp]))

(defn goindex []
  (apply str  (enlive/emit* (enlive/transform
                             (enlive/html-resource "index.html")
                             [[:script (enlive/nth-of-type 3)]]  ;; get the 3rd script tag
                             (enlive/content [:script (cemerick.austin.repls/browser-connected-repl-js)])))))

(defroutes app-routes

  (GET "/" []
       (-> (ring-resp/response (goindex))
           (ring-resp/content-type "text/html")))

  (route/resources "/" {:root "resources/public/"})
  (route/not-found "Not Found"))

(def app
  (handler/site app-routes))
