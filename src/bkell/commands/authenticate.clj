(ns bkell.commands.authenticate
  (:require [clojure.string]
            [bkell.util]
            [bkell.commands.get :as getk]
  )
)



(defn logged-in-user []
  (if-let [bk (bkell.util/get-bkell)] 
    (-> @bk deref :logged-in-user)))

(defn authenticated? [user]
  (= (:username (logged-in-user))
     (:username user))
)
(defn logged-in-user? []
  
  (if-let [bk (bkell.util/get-bkell)]
    (-> @bk deref :logged-in-user nil? not))
)
(defn same-user-check [user]

  ;; check if 
  ;;  i. there is a logged-in-user 
  ;;  ii. incoming user & logged-in-user are same (OK)
  ;;  iii. incoming user & logged-in-user are different (ERROR)
  (if-let [bk (bkell.util/get-bkell)]
    (and 
      (-> @bk :logged-in-user nil? not)
      (authenticated? user))
  )
)
(defn login-user [user]
  
  { :pre  [ (not (same-user-check user))
            ;;(not (nil? (seq (commands/get :user (:username user))))) ;; TODO - figure out a way to make 1 DB call 
            (= (:password user) (->> user :username (getk/get :user) :password))
          ]
  }
  (dosync 
    (alter @(bkell.util/get-bkell) conj 
  	{ :logged-in-user user } )
    (alter @(bkell.util/get-bkell) conj 
  	{ :previous user })) 
  
)

(defn logout-user [user] 
  
  { :pre  [ (logged-in-user?)
            (authenticated? user)
          ] }
  
  (dosync 
    (alter @(bkell.util/get-bkell) dissoc :logged-in-user )
  	(alter @(bkell.util/get-bkell) conj { :previous user } )
  )
)


