(ns login-test
  
	(:require [bkell])
      
    (:use somnium.congomongo)
    (:require test-utils)
    (:use [clojure.test])
	(:require clojure.contrib.str-utils)
    (:require commands.add)
    (:require commands.get)
    (:require commands.remove)
    (:require commands.authenticate)
    (:require clojure.contrib.logging)
    ;;(:require debug)
    (:require bkell)
)


(use-fixtures :each test-utils/test-fixture-db )
(somnium.congomongo/mongo! :db "bkell") ;; connect to mongodb


;; FIXTUREs
(defn test-fixture-shell
    "Initialize the shell"
    [test]

    (clojure.contrib.logging/info "test-fixture-shell CALLED")
    (bkell/init-shell)

    (test)
)

(defn test-fixture-db
    "test to clear out shell memory before a test is run"
    [test]

    (clojure.contrib.logging/info "test-fixture-db CALLED")

    ;; make the shell active
    ;; create a basic user in the DB
	(dosync (alter bkell/shell conj { :active true }))
    
    (destroy! :users {})  ;; destroying all users
    (destroy! :groups {}) ;; destroying all groups
    (destroy! :bookkeeping {}) ;; destroying all bookkeeping
    (test-utils/add-user nil)
    
    ;; ** execute the TEST function
    (test)
    
    (clojure.contrib.logging/info "test-fixture-db EXIT")
    
    ;; make the shell inactive
	(dosync (alter bkell/shell conj { :active false }))

)

(use-fixtures :each login-test/test-fixture-shell login-test/test-fixture-db )


;; test basic login
(deftest test-login []
    
    (let [ user (commands/get-user "stub") ]
      
      (commands/login-user user)
      
      (is (not (nil? user)) "User should NOT be nil")
      (is (not (nil? (bkell/shell :logged-in-user))) "User should be in a 'logged-in-user' state")
    )
)


;; test result when already logged in
(deftest test-existing-login []
    
    (let [ user (commands/get-user "stub") ]
      
      (commands/login-user user)
      
      (let [ nd_user (commands/get-user "stub") ]
        
        ;; check that nd_user is NOT nil 
        (is (not (nil? nd_user)))

        ;; login the '2nd_user' 
        (def nd_error nil)
        (try  (commands/login-user nd_user)
          (catch java.lang.AssertionError e e))
          
        ;; check that there are no errors 
        (is (nil? nd_error) "There should be NO errors when logging in nd_user" )
      )
    )
    
    ;; ** ADD another user and try to log him in, without logging 1st user out; there SHOULD be an error 
    (let [ new_user (merge (load-file "test/etc/data/stubu-one.clj") { :username "two" } ) ]
      
      (def new_error nil)
      (try  (commands/login-user new_user)
        (catch java.lang.AssertionError e (def new_error e)))
      
      ;; There SHOULD be errors when trying to login a new user without logging out the old 
      (is (not (nil? new_error)) "There SHOULD be errors when logging in new_user (existing user still logged in)" )
    )
)

;; TODO - this function doesn't hold water; login just puts the user into the shell; need an 'authenticate' function 
;; test a login with a bad password
(deftest test-bad-password []
    
    (let [  auth-error
            (try  (commands/login-user { :tag :user :username "stub" :password "xxxxxx" })
                  (catch java.lang.AssertionError e e))]
        (is (not (nil? auth-error)) "There SHOULD be an error when givin a bad password") 
    )
)


;; test logging out
(deftest test-logout-1 []

    (let [ user (commands/get-user "stub") ]
      
      (commands/login-user user)
      (is (not (nil? (@bkell/shell :logged-in-user))) "test-logout > User should be in a 'logged-in-user' state")
         
      (commands/logout-user user)
      (is (nil? (@bkell/shell :logged-in-user)) "there SHOULD NOT be a logged-in-user" )
      
    )
)

;; ensure that user being logged out is indeed logged in 
(deftest test-logout-2 []
  
  (let [ user (commands/get-user "stub") ]
    
    (commands/login-user user)
    (is (not (nil? (@bkell/shell :logged-in-user))) "test-logout > User should be in a 'logged-in-user' state")
    
    (let  [ err (try  (commands/logout-user { :tag "user" :username "new.user" })
                      (catch java.lang.AssertionError e e))]

      (is (not (nil? err)) "There SHOULD be an error when trying to logout different user from existing logged in user" )
    )
  )
)


