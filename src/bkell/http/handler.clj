(ns bkell.http.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [compojure.handler :as handler]
            [net.cgrand.enlive-html :as enlive]
            [ring.util.response :as ring-resp]
            [net.cgrand.enlive-html :as enlive]))


(defn with-browser-repl [filename]

  (let [templ (enlive/html-resource filename)
        host "http://172.28.128.5"
        port "44610"
        connect-channel "4731"]

    (apply str (enlive/emit*
                (enlive/transform templ
                                  [:html]
                                  (enlive/after

                                   ;; splitting up the tags to give time for 'clojure' JS object to load
                                   [{:tag :script :content (str "goog.provide('bkell.core'); goog.require('cljs.core'); goog.require('clojure.browser.repl');")}
                                    {:tag :script :content (str "clojure.browser.repl.connect.call(null,\"" host ":" port "/" connect-channel "/repl/start\");")}]))))))

(defroutes app-routes

  #_(GET "/" []
       (-> (ring-resp/file-response "index.html" {:root "resources/public"})
           (ring-resp/content-type "text/html")))

  (GET "/" []
       (-> (ring-resp/response (with-browser-repl "index.html"))
           (ring-resp/content-type "text/html")))

  (route/resources "/" {:root "resources/public/"})
  (route/not-found "Not Found"))

(def app
  (handler/site app-routes))
