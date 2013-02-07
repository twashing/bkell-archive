(ns bkell.run.run-ring
  (:require
            [bkell.bjell :as bjell]
            [bkell.bkell :as bkell]
            [bkell.http.auth :as auth]
            [bkell.http.handler :as handler]
            ;;[ring.middleware.keyword-params :as keyword-params]
            ;;[ring.middleware.nested-params :as nested-params]
            ;;[ring.middleware.params :as params]
            ;;[ring.middleware.session :as session]
            )
  (:use [clojure.core.strint]
        [ring.adapter.jetty]) )


;; the default mode is 'dev',
;; for heroku, you can set the environment variable with the command:
;; `heroku config:add MODE=prod`
(defn main [& m]
  (let[ config (load-file "etc/config/config.clj")
        mode (keyword (or (get (System/getenv) "MODE" "dev")
                          (second m) ))
        host-port (or (get (System/getenv) "PORT" "8080")
                      (first m)                   ;; see if PORT is passed in as a parameter
                      (-> config mode :host-port) ;; otherwise, get the PORT from the config mode
                      )  ;; last ditch is to set the PORT manually to 8080
      ]


    (println (str "Initializing shell with mode: " mode))

    ;; ====
    ;; Initialize the shell incl. DB connection
    (bjell/init-shell mode { :host-port host-port })


    ;; ====
    ;; Setting the mode in the shell
    (dosync
      (alter bkell/shell conj { :mode mode })
      (let [new-prod (merge (:prod config) { :host-port host-port })]
        (alter bkell/shell conj (merge config { :prod new-prod }))
      )
    )

    (println (str "Bkell: " @bkell/shell))

    ;; ====
    ;; Startup the Noir server (wraps Jetty)
    ;;(server/start (Integer. host-port) {  :mode mode :ns 'bkell  })
    (defonce server
      (run-jetty #'bkell.http.handler/app-routes {:port 8080 :join? false}))

    ))

#_(main)
