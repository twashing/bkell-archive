
	       (defn xpath_handler [node handler] 
		     (if (instance? com.interrupt.bookkeeping.cc.node.AXpathCommandInput (. node getCommandInput) )
			
			(do 
			   (println "XPATH input[" (.. node getCommandInput toString) "]")
			   
			   ;; extract the context 
			   (let [ result_seq []]
			      
			      ;; operate with handler
			      (handler result_seq)
			   )
			)
		     )
		  )
