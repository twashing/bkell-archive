
;; This is how the mathing will work:
;; (re-matches #"\/account\/[0-9a-z]+" "/account/1n2k3b5l")

{:trial [
         ;; i) direct user manipulation and ii) logout
         {:uri #"/user/[a-z0-9]+"
          :method :delete
          :authorized false}
         {:uri #"/logout"
          :method :get
          :authorized true}

         ;; CRUD Account authorizations
         {:uri "/account/[0-9a-z]+"
          :method :put
          :authorized true}
         {:uri "/account/[0-9a-z]+"
          :method :get
          :authorized true}
         {:uri "/account/[0-9a-z]+"
          :method :post
          :authorized true}
         {:uri "/accounts"
          :method :get
          :authorized true}

         ;; CRUD Entry authorizations
         {:uri "/entry/[0-9a-z]+"
          :method :put
          :authorized true}
         {:uri "/entry/[0-9a-z]+"
          :method :get
          :authorized true}
         {:uri "/entry/[0-9a-z]+"
          :method :post
          :authorized true}
         {:uri "/entries"
          :method :get
          :authorized true}

         ;; Miscellaneous calls
         {:uri #"/generateid"
          :method :get
          :authorized true}
         {:uri #"/currencies"
          :method :get
          :authorized true}
         ]

 :basic [
         ;; i) direct user manipulation and ii) logout
         {:uri #"/user/[a-z0-9]+"
          :method :delete
          :authorized false}
         {:uri #"/logout"
          :method :get
          :authorized true}

         ;; CRUD Account authorizations
         {:uri "/account/[0-9a-z]+"
          :method :put
          :authorized true}
         {:uri "/account/[0-9a-z]+"
          :method :get
          :authorized true}
         {:uri "/account/[0-9a-z]+"
          :method :post
          :authorized true}
         {:uri "/accounts"
          :method :get
          :authorized true}

         ;; CRUD Entry authorizations
         {:uri "/entry/[0-9a-z]+"
          :method :put
          :authorized true}
         {:uri "/entry/[0-9a-z]+"
          :method :get
          :authorized true}
         {:uri "/entry/[0-9a-z]+"
          :method :post
          :authorized true}
         {:uri "/entries"
          :method :get
          :authorized true}

         ;; Miscellaneous calls
         {:uri #"/generateid"
          :method :get
          :authorized true}
         {:uri #"/currencies"
          :method :get
          :authorized true}
         ]

 :productivity [
         ;; i) direct user manipulation and ii) logout
         {:uri #"/user/[a-z0-9]+"
          :method :delete
          :authorized false}
         {:uri #"/logout"
          :method :get
          :authorized true}

         ;; CRUD Account authorizations
         {:uri "/account/[0-9a-z]+"
          :method :put
          :authorized true}
         {:uri "/account/[0-9a-z]+"
          :method :get
          :authorized true}
         {:uri "/account/[0-9a-z]+"
          :method :post
          :authorized true}
         {:uri "/accounts"
          :method :get
          :authorized true}

         ;; CRUD Entry authorizations
         {:uri "/entry/[0-9a-z]+"
          :method :put
          :authorized true}
         {:uri "/entry/[0-9a-z]+"
          :method :get
          :authorized true}
         {:uri "/entry/[0-9a-z]+"
          :method :post
          :authorized true}
         {:uri "/entries"
          :method :get
          :authorized true}

         ;; Miscellaneous calls
         {:uri #"/generateid"
          :method :get
          :authorized true}
         {:uri #"/currencies"
          :method :get
          :authorized true}
         ]
 :enterprise [
         ;; i) direct user manipulation and ii) logout
         {:uri #"/user/[a-z0-9]+"
          :method :delete
          :authorized false}
         {:uri #"/logout"
          :method :get
          :authorized true}

         ;; CRUD Account authorizations
         {:uri "/account/[0-9a-z]+"
          :method :put
          :authorized true}
         {:uri "/account/[0-9a-z]+"
          :method :get
          :authorized true}
         {:uri "/account/[0-9a-z]+"
          :method :post
          :authorized true}
         {:uri "/accounts"
          :method :get
          :authorized true}

         ;; CRUD Entry authorizations
         {:uri "/entry/[0-9a-z]+"
          :method :put
          :authorized true}
         {:uri "/entry/[0-9a-z]+"
          :method :get
          :authorized true}
         {:uri "/entry/[0-9a-z]+"
          :method :post
          :authorized true}
         {:uri "/entries"
          :method :get
          :authorized true}

         ;; Miscellaneous calls
         {:uri #"/generateid"
          :method :get
          :authorized true}
         {:uri #"/currencies"
          :method :get
          :authorized true}
         ]

 :expired [
         ;; i) direct user manipulation and ii) logout
         {:uri #"/user/[a-z0-9]+"
          :method :delete
          :authorized false}
         {:uri #"/logout"
          :method :get
          :authorized true}

         ;; CRUD Account authorizations
         {:uri "/account/[0-9a-z]+"
          :method :put
          :authorized true}
         {:uri "/account/[0-9a-z]+"
          :method :get
          :authorized true}
         {:uri "/account/[0-9a-z]+"
          :method :post
          :authorized true}
         {:uri "/accounts"
          :method :get
          :authorized true}

         ;; CRUD Entry authorizations
         {:uri "/entry/[0-9a-z]+"
          :method :put
          :authorized true}
         {:uri "/entry/[0-9a-z]+"
          :method :get
          :authorized true}
         {:uri "/entry/[0-9a-z]+"
          :method :post
          :authorized true}
         {:uri "/entries"
          :method :get
          :authorized true}

         ;; Miscellaneous calls
         {:uri #"/generateid"
          :method :get
          :authorized true}
         {:uri #"/currencies"
          :method :get
          :authorized true}
         ]
 }
