(ns http.handler
  (:use compojure.core)
  (:use net.cgrand.enlive-html)
  (:require [compojure.route :as route]
            [compojure.handler :as handler]))

(deftemplate index "public/index.html"
  
  []
  [:input#fuid] (do-> 
                  (content "Tim")
                  (set-attr :value "XXxxx"))
  [:input#barid] (do->
                  (content "Washington") 
                  (set-attr :value "ZZzzz"))
)


(defroutes main
  (GET "/" [] (index))
  (route/resources "/")
  (route/not-found "Page not found")
)
(def app
  (handler/site main))


