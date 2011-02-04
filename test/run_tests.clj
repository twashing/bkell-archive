(use 'clojure.test)
(require 'clojure.contrib.logging)

(require 'login-test)
(run-tests 'login-test)

;;                                (comment  
;;								(clojure.contrib.logging/info 	"Add command > context[" (:tag (:command-context @bkell/shell )) 
;;													"] > users?[" (= (keyword "users") (:tag (:command-context @bkell/shell ))) 
;;													"] > :previous / each_copy[" (:previous @bkell/shell)"] > match?[" 
;;														(and 	(= (keyword "users") (:tag (:command-context @bkell/shell )))
;;																	(= (keyword "user") (:tag (:previous @bkell/shell )))) "]")
;;								
;;								(if (and 	(= (keyword "users") (:tag (:command-context @bkell/shell )))
;;											(= (keyword "user") (:tag (:previous @bkell/shell ))))
;;										
;;										;; we are adding a user 
;;										(add-user db-base-URL db-system-DIR (:previous @bkell/shell))
;;										
;;										;; this is a generic 'add' 
;;										(add-generic db-base-URL db-system-DIR (:previous @bkell/shell) (:command-context @bkell/shell ))
;;										
;;								)
;;                                )
