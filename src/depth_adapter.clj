
(ns depth_adapter
  
  (:import com.interrupt.bookkeeping.cc.analysis.DepthFirstAdapter) 
  
    ;;(:require clojure.contrib.str-utils2) 
    (:require clojure.contrib.http.agent) 
    (:require clojure.contrib.io) 
    (:require clojure.contrib.string) 
  
  (:use helpers) 
  (:use clojure.xml)
  
  (:require xml_handler)
  (:require opts_handler)
  (:require xpath_handler)
  
  (:require commands.add)
  (:require commands.update)
  (:require commands.authenticate)

  (:require clojure.contrib.logging)
  (:require debug)
  
)


#_(use 'clj-stacktrace.repl)
#_(try
 ("foo")
 (catch Exception e
   (clj-stacktrace.repl/pst e)))


(defn print-to-shell [msg]

  (clojure.contrib.logging/warn (str " > " msg) )
)

(defn operate-dep-inputtype 
    [node handler_block]    ;; input args ; for now we are going to load by ID 
    
    (let [ checks [ xml_handler option_handler xpath_handler/xpath_handler ] ]
            
            (doseq [ each_check checks ] 
                (do
                    ;;(clojure.contrib.logging/info "DEBUG > each > check[" each_check "] > node[" node "]" ) 
                    (each_check node handler_block)
                )
            )
            
    )
    
)

(defn get-depth-adapter [ shell ] 
     
   (proxy [DepthFirstAdapter] [] 
     
     ;; EXIT command 
     (caseAExitCommand4 [node] 
        
        (clojure.contrib.logging/info (str str "DEBUG > caseAExitCommand4: " node))
        
        (proxy-super inAExitCommand4 node) 
        (proxy-super outAExitCommand4 node) 
            
            (dosync 
                (alter shell conj   ;; make the shell inactive to disable loop 
                    {   :active false }))
        
     )

     
     ;; LOGIN command 
     (caseALoginCommand3 [node] 
        (clojure.contrib.logging/info (str "DEBUG > caseALoginCommand3: " node))
        
        
        (proxy-super inALoginCommand3 node) 
        
        (if (not= (. node getLogin ) nil) 
           (.. node getLogin (apply this) ) )
        
        (if (not= (. node getLbracket ) nil) 
           (.. node getLbracket (apply this) ) )
        
      (if (not= (. node getCommandInput ) nil) 
          
          (do 
            
            (.. node getCommandInput (apply this) ) 
                
                ;; execute LOGIN 
                (operate-dep-inputtype node 
                    (fn [result_seq] 
                        
                        (login-user result_seq shell)
                        (clojure.contrib.logging/info (str "DEBUG > logged-in-user > " (:logged-in-user @shell)))
                    ))
            )
        )
        
      (if (not= (. node getRbracket ) nil) 
           (.. node getRbracket (apply this) ) )
        
      (proxy-super outALoginCommand3 node) 
        
     )
     
     ;; PRINT command 
     (caseAPrintCommand6 [node] 
        (clojure.contrib.logging/warn (str "caseAPrintCommand6: " node)) 
        
        (proxy-super inAPrintCommand6 node)
        
        (if (not= (. node getPrint) nil)
            (.. node getPrint (apply this)))


        (if (not= (. node getLbracket) nil)
            (.. node getLbracket (apply this)))

        (if (not= (. node getCommandInput) nil)
            (.. node getCommandInput (apply this))
        )
            
        ;; print the result 
        (print-to-shell  (:previous @shell))

        (if (not= (. node getRbracket) nil)
            (.. node getRbracket (apply this)))
        
        (proxy-super outAPrintCommand6 node)
        
     )
     
     ;; CREATE command 
    (caseACreateCommand3 [node]
        (clojure.contrib.logging/info (str "caseACreateCommand3 CALLED: " node))
        
        (proxy-super inACreateCommand3 node)
        
        (if (not= (. node getCreate) nil)
            (.. node getCreate (apply this)))
        
        (if (not= (. node getLbracket) nil)
            (.. node getLbracket (apply this)))
        
        (if (not= (. node getCommandInput) nil)
            
            (do 
            (.. node getCommandInput (apply this))
        
            ;; execute LOGIN 
            (operate-dep-inputtype node 
                (fn [result_seq] 

                    (clojure.contrib.logging/info (str "DEBUG > create result > " result_seq))
                    (dosync (alter shell conj { :previous result_seq }))
                ))
             )
        )
        
        (if (not= (. node getRbracket) nil)
            (.. node getRbracket (apply this)))
        
        (proxy-super outACreateCommand3 node)
        
    )

    
    ;; UPDATE command 
    (caseAUpdateCommand1 [node] ;; AUpdateCommand1 node
        
        (proxy-super inAUpdateCommand1 node)
        
        (if (not= (. node getUpdate) nil)
            (.. node getUpdate (apply this)))
        
        (if (not= (. node getLbdepth1) nil)
            (.. node getLbdepth1 (apply this)))
        
        (if (not= (. node getLbdepth2) nil)
            (.. node getLbdepth2 (apply this)))
        
        (if (not= (. node getC1) nil)
            
            (do 
                (.. node getC1 (apply this))
                (operate-dep-inputtype (. node getC1) 
                    (fn [result_seq] 
                        
                        (clojure.contrib.logging/info (str "DEBUG > update CONTEXT result > " result_seq))
                        (dosync (alter shell conj { :previous result_seq }))
                        (dosync (alter shell conj { :command-context result_seq } ))
                    ))
            )
        )
        
        (if (not= (. node getRbdepth2) nil)
            (.. node getRbdepth2 (apply this)))
        
        (if (not= (. node getC2) nil)
            
            (do 
                (.. node getC2 (apply this))
                (operate-dep-inputtype (. node getC2) 
                    (fn [result_seq] 
                        
                        (clojure.contrib.logging/info (str "DEBUG > update CLIENT input [ " (.. node getC1) " ] > result > " result_seq))

                        (dosync (alter shell conj { :previous result_seq }))
                    ))
                    (clojure.contrib.logging/info (str "Update command > context[" (:tag (:command-context @shell )) 
                             "] > :previous / each_copy[" (:previous @shell)"]" ))
                    
                    ;; this is a generic 'add' 
                    (update-generic db-base-URL db-system-DIR (:previous @shell) (:logged-in-user @shell ) (:command-context @shell ))
            )
        )
        
        (if (not= (. node getRbdepth1) nil)
            (.. node getRbdepth1 (apply this)))
        
        (proxy-super outAUpdateCommand1 node)
        
    )
     
     ;; COMMIT 
    (caseACommitCommand7 [node]     ;; ACommitCommand7 node
        
        (proxy-super inACommitCommand7 node) 
        
        (if (not= (. node getCommit ) nil) 
            (.. node getCommit (applythis)))
        
        (if (not= (. node getLbdepth1) nil) 
            (.. node getLbdepth1 (apply this)))
        
        (if (not= (. node getLbdepth2) nil) 
            (.. node getLbdepth2 (apply this)))
        
        (if (not= (. node getInput1 ) nil) 
            
            (.. node getInput1 (apply this))
            
        )
        
        (if (not= (. node getRbdepth2) nil) 
            (.. node getRbdepth2 (apply this)))
        
        (if (not= (. node getInput2) nil) 
            
            (.. node getInput2 (apply this))
            
        )
        
        (if (not= (. node getRbdepth1) nil) 
            (.. node getRbdepth1 (apply this)))
        
        (proxy-super outACommitCommand7 node)
        
    )
    
    
    
     ;; VARIABLE assignment 
     (caseATwohandexpr [node]   ;; ATwohandexpr node
        
        
        (proxy-super inATwohandexpr node) 
        
        (if (not= (. node getVar ) nil) 
            (.. node getVar (apply this)))
         
        (if (not= (. node getWord) nil) 
            
            (do 
                (.. node getWord (apply this)))
        )
        (if (not= (. node getEquals) nil) 
            (.. node getEquals (apply this)))

        (if (not= (. node getCommand ) nil) 
            (do 
                (.. node getCommand (apply this)) )
        )
        
        ;; the 'previousCommandResult' has already been set 
        ;; get variable name 
        (let [variableName (.. node getWord getText trim)]
            
            (clojure.contrib.logging/info (str "putting variableName into memory[" variableName "] > previous > " (:previous @shell) ) )
            
            ;; setting the variableName to the command result 
            (dosync (alter shell assoc 
                       (keyword variableName) 
                       (:previous @shell) 
                     ))
            
        )
        
        (proxy-super outATwohandexpr node)
        
     ) 

     ;; VARIABLE access 
     (caseAVarCommandInput [node]   ;; AVarCommandInput node
        
        (proxy-super inAVarCommandInput node) 
        
        (if (not= (. node getVarname ) nil) 
            
            (.. node getVarname (apply this))

            ;; remove the '@' sign 
            ;;** if this fails, then the user only put in the '@' 
            (let [variableName (.. node getVarname toString (substring 1) trim) ]
            
                (dosync (alter shell assoc 
                       :previous 
                       ((keyword variableName) @shell) 
                     ))
                
            )
        )
        
        (proxy-super outAVarCommandInput node ) 
        
     )
     
     ;; LOAD command 
     (caseALoadCommand3 [node] 
        (clojure.contrib.logging/info (str "DEBUG > caseALoadCommand3 [" (class (. node getCommandInput)) "]: " node) )
        
        ;; "replicating java calls in the 'DepthFirstAdapter.caseALoadCommand3'"
        
        
        (proxy-super inALoadCommand3 node) 
        
        (if (not= (. node getLoad ) nil) 
           (.. node getLoad (apply this) ) )
        
        (if (not= (. node getLbracket ) nil) 
           (.. node getLbracket (apply this) ) )
         
        (if (not= (. node getCommandInput ) nil) 
           
            (do ;; execute 'if' block 
                  (.. node getCommandInput (apply this) ) 
                  
                  
                    (if (not (contains? @shell :logged-in-user ))    ;; check if there is a 'logged-in-user' 
                    
                    ;;throw an error if no 'logged-in-user' 
                    (clojure.contrib.logging/info "ERROR - NO logged-in-user") 
                    
                    ;; execute LOAD 
                    (operate-dep-inputtype node (fn [result_seq] 
                            
                            (clojure.contrib.logging/info (str "loading... " result_seq))
                            (dosync (alter shell conj 
                                        {   :previous result_seq }))
                        ))

                  )
                  
            )
        )
        
        (if (not= (. node getRbracket ) nil) 
           (.. node getRbracket (apply this) ) )
        
        
        (proxy-super outALoadCommand3 node) 
        
     )
    
    (caseStart [node] 
            
            (clojure.contrib.logging/info (str "DEBUG > caseStart CALLED > shell[" @shell "]"))
            
            (proxy-super inStart node) 
      
      (.. node getPExpr (apply this) )
      (.. node getEOF (apply this) )
      
      (proxy-super outStart node) 
      
    ) 
    
    (caseAAddCommand1 [node]        ;; public void caseAAddCommand1(AAddCommand1 node)
                
                (clojure.contrib.logging/info (str "DEBUG > caseAAddCommand1 [" (class (. node getCommandInput)) "]: " node) )
            
            
        (proxy-super inAAddCommand1 node) 
            
            (if (not= (. node getAdd ) nil) 
               (.. node getAdd (apply this) ) ) 
            
        (if (not= (. node getLbdepth1 ) nil) 
               (.. node getLbdepth1 (apply this) ) ) 
            
            (if (not= (. node getLbdepth2 ) nil) 
               (.. node getLbdepth2 (apply this) ) ) 
            
        (if (not= (. node getCommandInput ) nil) 
             
             (do 
                 
                 ;; any i) 'load' ii) direct XML or iii) variable should be in the shell's :previous 
                   (.. node getCommandInput (apply this) ) 
                   
                   ;; set the :previous result as the :command-context 
                   ;;(debug/debug-repl)
                   (dosync (alter shell conj { :command-context (:previous @shell) } ))
               )
            ) 
            
            (if (not= (. node getRbdepth2 ) nil) 
               (.. node getRbdepth2 (apply this) ) ) 
            
            (clojure.contrib.logging/info "")
            (clojure.contrib.logging/info (str  "shell > before arguments > [" @shell "]"))
                (let [ copy (. node getIlist) ]
                        
                        (doseq [ each_copy copy ] 
                            (do 
                                
                                ;; apply each element in the list 
                                (. each_copy apply this)
                                (operate-dep-inputtype each_copy 
                                            (fn [result_seq] 
                                                
                                                (dosync 
                                                    (alter shell conj 
                                                                    {   :previous result_seq })) 
                                            ))
                                
                                ;; DEBUG 
                                (clojure.contrib.logging/info    (str "Add command > context[" (:tag (:command-context @shell )) 
                                                    "] > users?[" (= (keyword "users") (:tag (:command-context @shell ))) 
                                                    "] > :previous / each_copy[" (:previous @shell)"] > match?[" 
                                                        (and    (= (keyword "users") (:tag (:command-context @shell )))
                                                                    (= (keyword "user") (:tag (:previous @shell )))) "]"))
                                
                                (if (and    (= (keyword "users") (:tag (:command-context @shell )))
                                            (= (keyword "user") (:tag (:previous @shell ))))
                                        
                                        ;; we are adding a user 
                                        (add-user db-base-URL db-system-DIR (:previous @shell))
                                        
                                        ;; this is a generic 'add' 
                                        (add-generic db-base-URL db-system-DIR (:previous @shell) (:previous @shell) (:command-context @shell ))
                                        
                                )
                                
                            )
                        )
                        
                )
        (if (not= (. node getRbdepth1 ) nil) 
               (.. node getRbdepth1 (apply this) ) ) 
            
            
        
        (proxy-super outAAddCommand1 node) 
            
    )
     
    )
)



