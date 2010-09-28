(ns add-test
	
	(:use [helpers] :reload-all)
	(:use [clojure.test])
	(:use [depth_adapter])
	
	(:import java.io.ByteArrayInputStream) 
	(:require clojure.contrib.str-utils)
)


(def configs (load-file "etc/config/config.test.clj"))


;; -------- 
;; TESTs for Registering a user 


;; test adding against an existing user
(deftest test-add-existing-user 
		
		
		;;(bkell (get-depth-adapter)) 
		
		;; check for failure (we should NOT be able to add) 
		
		
)


;; test adding a new user 
(deftest test-add-existing-user 
		
		;; check for add to aauth.groups 
		;; check for add to aauth.users 
		;; check for Associated Bookkeeping to Group 
		
)



;; -------- 
;; TESTs for adding an account 




;; -------- 
;; TESTs for adding an entry 






