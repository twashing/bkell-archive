
		  (defn xml_handler [node handler] 
		     (if (instance? com.interrupt.bookkeeping.cc.node.AXmlCommandInput (. node getCommandInput) )
			(do 
			   (println "XML input[" (.. node getCommandInput toString) "]")
			   
			   ;; extract the context 
			   (let [ result_seq []]
			      
			      ;; operate with handler
			      (handler result_seq)
			   )
			)
		     ) 
		  )

