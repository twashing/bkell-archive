(ns bkell.http.handler
  
  (:use [compojure.core]
        [noir.core :only [defpage]]
  )
  
  (:import [java.io FileReader]
           [java.net URLEncoder]
  ) 
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [bkell.bjell :as bjell]
            [bkell.bkell :as bkell]
            [bkell.commands.authenticate :as authenticatek]
            [bkell.util :as util]
            [clojure.contrib.duck-streams :as duck-streams]
            [clojure.data.json :as json]
            [clojure.pprint :as pprint]
            [ring.middleware.file :as ring-file]
            [ring.util.response :as response]
            [clj-http.client :as client]
            [clojure.contrib.duck-streams :as dstreams]
            [net.cgrand.enlive-html :as enlive]
            [ring.adapter.jetty :as jetty]
  )
)


(defpage "/" []   ;; index is the default page of the application 
  (response/file-response "index.html" { :root "public" }))

