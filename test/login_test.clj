(ns login-test

	(:use [helpers] :reload-all)
	(:use [depth_adapter])
	(:require [bkell])

    (:use [clojure.test])
	(:import java.io.ByteArrayInputStream)
	(:require clojure.contrib.str-utils)
    (:require commands.add)
    (:require commands.remove)
    (:require commands.authenticate)
    (:require clojure.contrib.logging)
    (:require bkell)
)


(def configs (load-file "etc/config/config.test.clj"))


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
    (add-user (:url-test configs) (:system-dir configs) { :tag "user" :attrs { :id "test.user" :password "testing" } } )

    ;; ** execute the TEST function
    (test)
    
    (clojure.contrib.logging/info "test-fixture-db EXIT")
    
    ;; make the shell inactive
	(dosync (alter bkell/shell conj { :active false }))
    (remove-user (:url-test configs) (:system-dir configs) { :tag "user" :attrs { :id "test.user" } :content { :tag "stub" } } )

)

(use-fixtures :each login-test/test-fixture-shell login-test/test-fixture-db )
(comment deftest test-ping [] 
  (clojure.contrib.logging/info "test-ping > hello"))


;; test basic login
(deftest test-login []

    
    (let [ user_seq (helpers/get-user   (:url-test configs) (:system-dir configs) 
                      { :tag "user" :attrs { :id "test.user"} :content {:tag "stub"} } ) ]
      
      (login-user user_seq @bkell/shell)
      (clojure.contrib.logging/error (str "test-login > Retrieved User > " user_seq))
      
      (is (not (nil? user_seq))
          (str 
              "User should NOT be nil > inputs > " 
                (:url-test configs) " " (:system-dir configs) " " { :tag "user" :attrs { :id "test.user"}} ))
      
      (is (not (nil? (bkell/shell :logged-in-user)))
          "User should be in a 'logged-in-user' state")
    )
)


;; test result when already logged in
(deftest test-existing-login []
    
    (let [ user_seq (helpers/get-user   (:url-test configs) (:system-dir configs) 
                      { :tag "user" :attrs { :id "test.user"} :content {:tag "stub"} } ) ]
      
      (login-user user_seq @bkell/shell)
      (clojure.contrib.logging/error (str "test-existing-login > Retrieved User > " user_seq))
      
      (let [ nd_user (helpers/get-user   (:url-test configs) (:system-dir configs) 
                      { :tag "user" :attrs { :id "test.user"} :content {:tag "stub"} } ) ]
        
        ;; check that nd_user is NOT nil 
        (is (not (nil? nd_user))
            (str "2nd User should NOT be nil > inputs > " 
                (:url-test configs) " " (:system-dir configs) " " { :tag "user" :attrs { :id "test.user"}} ))
      

        ;; login the '2nd_user' 
        (def nd_error nil)
        (try  (login-user nd_user @bkell/shell)
              (catch Exception e (def nd_error e)))

        ;; check that there are no errors 
        (is (nil? nd_error)
            (str "There should be NO errors when logging in nd_user" ))
        
      )
      
    )
    
    ;; ** ADD another user and try to login him in, without logging 1st user out; there SHOULD be an error 
    (add-user (:url-test configs) (:system-dir configs) { :tag "user" :attrs { :id "new.user" } } )
    (let [ new_user (helpers/get-user   (:url-test configs) (:system-dir configs) 
                      { :tag "user" :attrs { :id "new.user"} :content {:tag "stub"} } ) ]
      
      (def new_error nil)
      (try  (login-user new_user @bkell/shell)
            (catch Exception e (def new_error e)))
      
      ;; There SHOULD be errors when trying to login a new user without logging out the old 
      (is (not (nil? new_error))
        (str "There SHOULD be errors when logging in new_user (existing user still logged in)" ))
    )
    (remove-user (:url-test configs) (:system-dir configs) { :tag "user" :attrs { :id "nd.user" } } )
)

;; TODO - this function doesn't hold water; login just puts the user into the shell; need an 'authenticate' function 
;; test a login with a bad password
#_(deftest test-bad-password []
    
    (let [  logged-in-user  
            (login-user 
              (helpers/get-user 
                (:url-test configs) (:system-dir configs) { :tag "user" :attrs { :id "test.user" :password "fubar" } :content {:tag "stub"} } ) 
                @bkell/shell)]
        (is (not (nil? nd_user)) "2nd_user SHOULD NOT be nil") 
    )
)


;; test logging out
(deftest test-logout-1 []

    (let [ user_seq (helpers/get-user   (:url-test configs) (:system-dir configs) 
                      { :tag "user" :attrs { :id "test.user"} :content {:tag "stub"} } ) ]
      
      (login-user user_seq @bkell/shell)
      (is (not (nil? (bkell/shell :logged-in-user)))
          "test-logout > User should be in a 'logged-in-user' state")
         
      (logout-user user_seq)
      (is (nil? (@bkell/shell :logged-in-user)) "there SHOULD NOT be a logged-in-user" )
      
    )
)

;; ensure that user being logged out is indeed logged in 
(deftest test-logout-2 []
  
  (let [ user_seq (helpers/get-user   (:url-test configs) (:system-dir configs) 
                    { :tag "user" :attrs { :id "test.user"} :content {:tag "stub"} } ) ]
    
    (login-user user_seq @bkell/shell)
    (is (not (nil? (bkell/shell :logged-in-user)))
        "test-logout > User should be in a 'logged-in-user' state")
    
    (def logout_error nil)
    (try  (logout-user { :tag "user" :attrs { :id "new.user" } })
          (catch Exception e (def logout_error e)))

    (is (not (nil? logout_error))
      (str "There SHOULD be an error when trying to logout different user from existing logged in user" ))
    
  )
  
)


