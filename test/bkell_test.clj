(ns bkell-test 
	(:use [bkell] :reload-all)
	(:use [clojure.test])
	(:use depth_adapter)
)


(deftest test-exit 
	
	(use 'depth_adapter)
	
	(comment 
		(let [agt (agent java.lang.System/in)] 
			
			(send agt 
				(fn [] 
					(println "FINAL > " 
						(with-out-str (bkell (get-depth-adapter)))))
				nil
			) 
		)
		
		(println "foobar")
	)
	
	(comment	;; TODO - try and test callback code with threads 
		(def my-future
		(future 
			(bkell (get-depth-adapter)))
		)
		(println "foobar")
		
	)
	
)

