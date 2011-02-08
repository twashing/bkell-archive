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
    (add-user (:url-test configs) (:system-dir configs) { :tag "user" :attrs { :id "test.user" } } )

    ;; ** execute the TEST function
    (test)
    
    (clojure.contrib.logging/info "test-fixture-db EXIT")
    
    ;; make the shell inactive
	(dosync (alter bkell/shell conj { :active false }))
    (remove-user (:url-test configs) (:system-dir configs) { :tag "user" :attrs { :id "test.user" } :content { :tag "stub" } } )

)

;;(use-fixtures :once login-test/test-fixture-shell )
(use-fixtures :each login-test/test-fixture-shell login-test/test-fixture-db )

;; test basic login
(deftest test-login []

    
    (let [ user_seq 
            (helpers/get-user   (:url-test configs) (:system-dir configs) 
                                { :tag "user" :attrs { :id "test.user"} :content {:tag "stub"} } 
            ) ]
      
      ;;(login-user user_seq)
      (clojure.pprint/pprint user_seq)
      (clojure.pprint/pprint bkell/shell)
      
      
      (is (not (nil? user_seq))
          (str 
              "User should NOT be nil > inputs > " 
                (:url-test configs) " " (:system-dir configs) " " { :tag "user" :attrs { :id "test.user"}} )
      )
      
      (is (not (nil? (bkell/shell :logged-in-user)))
          "User should be in a 'logged-in-user' state")
    )
)


;; test result when already logged in
(deftest test-existing-login []

    (let [
          user_seq 
          (login-user (helpers/get-user (:url-test configs) (:system-dir configs) { :tag "user" :attrs { :id "test.user"} :content {:tag "stub"} } )) ]
      
      (try 
        (def 
          nd_user 
          (login-user (helpers/get-user (:url-test configs) (:system-dir configs) { :tag "user" :attrs { :id "test.user"} :content {:tag "stub"} } )) )
        ;;(catch ...)
        (finally 
          (is (not (nil? nd_user)) "2nd_user SHOULD NOT be nil") 
        )
      )

    )
)

(comment 

;; test a login with a bad password
(deftest test-bad-password []

    (comment let [  logged-in-user  
            (login-user 
              (helpers/get-user 
                (:url-test configs) (:system-dir configs) { :tag "user" :attrs { :id "test.user" :password "fubar" } :content {:tag "stub"} } ))]
        (is (not (nil? nd_user)) "2nd_user SHOULD NOT be nil") 
    )
)


;; test logging out
(deftest test-logout []

    (let [
          user_seq 
          (login-user (helpers/get-user (:url-test configs) (:system-dir configs) { :tag "user" :attrs { :id "test.user"} :content {:tag "stub"} } )) ]
         
        (let [logged-out-user 
            (logout-user 
              (helpers/get-user 
                (:url-test configs) (:system-dir configs) { :tag "user" :attrs { :id "test.user"} :content {:tag "stub"} } ))] 
          
          (is (not (nil? logged-out-user)) "SHOULD return the logged-out-user") 
          (is (nil? (@bkell/shell :logged-in-user)) "there SHOULD NOT be a logged-in-user" )
        )

    )
)

) 

