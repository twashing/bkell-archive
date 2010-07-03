
(ns xpath_handler
  
  (:import com.interrupt.cc.xpath.lexer.Lexer) 
	(:import com.interrupt.cc.xpath.lexer.LexerException) 
	(:import com.interrupt.cc.xpath.node.Node) 
	(:import com.interrupt.cc.xpath.node.Start) 
	(:import com.interrupt.cc.xpath.parser.Parser) 
	(:import com.interrupt.cc.xpath.parser.ParserException) 
  (:import com.interrupt.cc.xpath.analysis.DepthFirstAdapter) 
  (:import com.interrupt.bob.processor.cc.DepthFirstVisitor)
  
  (:import java.io.InputStreamReader)
  (:import java.io.PushbackReader) 
  (:import java.io.ByteArrayInputStream) 
  
)
				
				;; remove the SableCC added <spaces> and ` 
				(defn filter-xpath-input [input-string]
						(clojure.contrib.string/replace-str " " "" 
					   	(clojure.contrib.string/replace-str "`" "" input-string))
				)
				
				;; build the XPath parser  
				(defn get-pushback-parser [xpath-string] 
					(Parser. (Lexer. (PushbackReader. (InputStreamReader. 
																							(ByteArrayInputStream. (. xpath-string getBytes))) 
																							1024)))
				)
				
				;; get DepthFirstAdapter proxy 
				(defn get-adapter-proxy [] 
					
					(proxy [DepthFirstAdapter] [] 
						
					
						(defaultCase [node]
							
							;; (println "[case] Node["+ node +"] \t\t\t\t class[" (. node getClass) "] \t\t\t\t" (. node toString))
							
							;; used an exception throw to find out AbbrevRoot call 
							(comment 
							(use 'clj-stacktrace.repl)
							(try
							 (throw (Exception. "foobar")
							 (catch Exception e
							   (clj-stacktrace.repl/pst e))))
		   				)
						)
						
						;; these case functions aren't quite used as far as I can see 
						(caseTAbbrevRoot [node]
							;;(println "caseTAbbrevRoot CALLED \t\t\t\t class[" (. node getClass) "] \t\t\t\t" (. node toString))
						)
						(caseTAbbrevAttrib [node]
							;;(println "caseTAbbrevAttrib CALLED \t\t\t\t class[" (. node getClass) "] \t\t\t\t" (. node toString))
						)
						(caseAPredicate [node]
							;;(println "caseAPredicate CALLED \t\t\t\t class[" (. node getClass) "] \t\t\t\t" (. node toString))
						)
						
						
						
						(caseTAbbrevRootDesc [node] 
							(println "caseTAbbrevRootDesc CALLED \t\t\t\t class[" (. node getClass) "] \t\t\t\t" (. node toString))
						)
						(caseTLetter [node]
							(println "caseTLetter CALLED \t\t\t\t\t class[" (. node getClass) "] \t\t\t\t\t" (. node toString))
						)
						(caseAPredicatelist [node]
							(println "caseAPredicatelist CALLED \t\t\t\t class[" (. node getClass) "] \t\t\t\t" (. node toString))
						)
						(caseARootRelativepathexprPartPart [node] 
							(println "caseARootRelativepathexprPartPart CALLED \t\t class[" (. node getClass) "] \t\t\t\t" (. node toString))
						)
						
					)
				) 
				
				
	       (defn xpath_handler [node handler] 
		     (if (instance? com.interrupt.bookkeeping.cc.node.AXpathCommandInput (. node getCommandInput) )
					
					(do 
					   
					   (println "xpath_handler > node[" (.. node getClass) "] > getLoad[" (.. node getLoad getText) "]")
					   (println "XPATH input[" (.. node getCommandInput toString) "]")
					   
					   ;; 1. filter out <spaces> and ` 
					   (def input-string (filter-xpath-input (.. node getCommandInput toString)))
					   (println "input-string[" input-string "]")
					   
					   
						 ;; 1.1 build an xpath parser 	 
						 (def tree (.parse (get-pushback-parser input-string))) 
						 (. tree apply (get-adapter-proxy ) )
						 
						 
						 ;; 2. token - find i) leaf document to search ii) root & xpath expression to feed to RESTful  exist 
					   	
					   ;; 3. build RESTful call 
					   
					   
					   ;; 4. make RESTful call
					   
					   
					   ;; 5. pass result sequece to handler 
					   
					   
					   ;; extract the context 
					   (let [ result_seq []]
					      
					      ;; operate with handler
					      (handler result_seq)
					   )
					)
		     )
		  )



