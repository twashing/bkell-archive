(ns bkell-test 
	(:use [bkell] :reload-all)
	(:use [clojure.test])
	(:use depth_adapter)
)


(deftest test-exit 
	
	(use 'depth_adapter)
	
	(let [agt (agent nil)] 
		
		(send-off agt 
			(fn [] (println "FINAL > " 
				(with-out-str (bkell (get-depth-adapter)))))
			nil
		) 
	)
	
	(println "foobar")	
)

