(ns bkell.http.auth
  )

(defn is-authorized [request]

  (let [auth-config (load-file "etc/config/auth.clj")
        uri (:uri request)
        method (:request-method request)
        uname (-> request :session :noir :current-user :username)
        ]

    ;; get user

    ;; get paywallState

    ;; get paywallState in auth-config

    ;; filter i) :uri then ii) :method

    ;; determine if authorized
    )
  )
