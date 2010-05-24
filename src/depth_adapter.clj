
(ns depth_adapter
   (:import com.interrupt.bookkeeping.cc.analysis.DepthFirstAdapter) 

)

(defn get-depth-adapter [] 
	
      (proxy [DepthFirstAdapter] [] 
	 
	 ;; EXIT commnad 
	 (caseAExitCommand4 [node] 
	    
	    (println (str "caseAExitCommand4: " node))
	    
	    (proxy-super inAExitCommand4 node) 
	    (proxy-super outAExitCommand4 node)

	    (. System exit 0)
	 )

	 
	 ;; LOGIN command 
	 (caseALoginCommand3 [node] 
	    (println (str "caseALoginCommand3: " node))
	 )
	 
	 ;; PRINT command 
	 (caseAPrintCommand6 [node] 
	    (println (str "caseAPrintCommand6: " node)) 
	 )
	 
	 
	 ;; LOAD command 
	 (caseALoadCommand3 [node] 
	    (println (str "caseALoadCommand3: " node)) 
	    
	    (comment "replicating java calls in the 'DepthFirstAdapter'")
	    
	    
	    ;; check user login 
	    ;; ... TODO 
	    
	    
	    (proxy-super inALoadCommand3 node)   ;; inALoadCommand3(node);
	    
	    (if (not= (. node getLoad ) nil)	 ;; if(node.getLoad() != null) { node.getLoad().apply(this); }
	       (.. node getLoad (apply this) ) 
	    )
	    
	    (if (not= (. node getLbracket ) nil) ;; if(node.getLbracket() != null) { node.getLbracket().apply(this); }
	       (.. node getLbracket (apply this) ) 
	    )
	     
	    (if (not= (. node getCommandInput ) nil) ;; if(node.getCommandInput() != null) { node.getCommandInput().apply(this); }
	       
	       (do ;; execute 'if' block 
		  (.. node getCommandInput (apply this) ) 
		  
		  ;; TODO - AOptsCommandInput ... 
		  (if (instance? com.interrupt.bookkeeping.cc.node.AOptsCommandInput (. node getCommandInput) ) 
		     (do (println "OPTIONS input"))
		  ) 
		  
		  ;; AXpathCommandInput ... 
		  (if (instance? com.interrupt.bookkeeping.cc.node.AXpathCommandInput (. node getCommandInput) ) 
		     
		     (println "XPATH input")
		     
		     ;; trim xpath 
		     ;; ... TODO 
		     
		     ;; get User 
		     ;; ... TODO 
		     
		     ;; execute ADD for 'User' 
		     ;; ... TODO 
		     
		  ) 
	       )
	    )
	    
	    (if (not= (. node getRbracket ) nil) ;; if(node.getRbracket() != null) { node.getRbracket().apply(this); }
	       (.. node getRbracket (apply this) ) 
	    )
	    
	    
	    (proxy-super outALoadCommand3 node)  ;; outALoadCommand3(node);
	    
	 )
	 
	 ;; ADD command (for registering users too) 
		  ;; 1. check that there's not an existing user 
		  ;; 2. add corresponding default group to the new user 
		  ;; 3. add to aauth.groups 
		  ;; 4. add to aauth.users 
		  ;; 5. add Associated Bookkeeping to Group 
	 
	 
	)
)
