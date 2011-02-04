(ns bkell-test 
	(:use [bkell] :reload-all)
	(:use [clojure.test])
	(:use depth_adapter)
    (:require clojure.contrib.logging)
)


(deftest test-exit 
	
	(use 'depth_adapter)
	
	(comment 
		(let [agt (agent java.lang.System/in)] 
			
			(send agt 
				(fn [] 
					(clojure.contrib.logging/info "FINAL > " 
						(with-out-str (bkell (get-depth-adapter)))))
				nil
			) 
		)
		
		(clojure.contrib.logging/info "foobar")
	)
	
	(comment	;; TODO - try and test callback code with threads 
		(def my-future
		(future 
			(bkell (get-depth-adapter)))
		)
		(clojure.contrib.logging/info "foobar")
		
	)
	
)

