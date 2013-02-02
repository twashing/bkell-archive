(ns bkell.http.auth
  (:require [bkell.commands.get :as get])
  (:use [clojure.core.strint]))

(defn is-authorized [request]

  (let [auth-config (load-file "etc/config/auth.clj")
        uri (:uri request)
        method (:request-method request)
        uname (-> request :session :noir :current-user :username)
        xxx (println (<< "uname: ~{uname}"))
        ]

    ;;To get the paywallState, we have to traverse through a structure like this:
     #_{:tag :user
        :content
          [{:tag :profileDetails,
            :content
            [{:tag :profileDetail
              :name :paywallState
              :value "trial"
              :content nil}]}]
    }
    (let [duser (get/get-user uname)  ;; get user
          pstate (->> duser           ;; get paywallState
                      :content
                      (filter (fn [inp] (= :profileDetails (:tag inp) )) )
                      first
                      :content
                      (filter (fn [inp] (= :paywallState (:name inp))) )
                      first
                      :value)
          xxx (println (<< "pstate: ~{pstate}"))
          op-list (->> auth-config  ;; filter i) :uri then ii) :method
                       pstate
                       (filter (fn [inp] (= (:method inp) method)))
                       (filter (fn [inp] (re-matches (:uri inp) uri ))))

          ]

      ;; determine if authorized
      op-list
      )

    )
  )
