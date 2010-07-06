
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
  (:import java.util.ArrayList)
  
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
				
				
				;; pilfered stack ideas and some implementation from: http://programming-puzzler.blogspot.com/2009/04/adts-in-clojure.html
				(def stack (ref [])) 
				
				(defn stack-push [e] 
					(dosync (alter stack conj e)) 
					(println "PUSH stack [" (deref stack) "]" )
					(println))
				
				(defn stack-peek [] 
					(dosync (alter stack first)))
				
				(defn stack-pop [] 
					;;(rest stack)
					;;(dosync (alter stack conj e))
				)
				
				(defn stack-empty? [] 
					;; (empty? stack)
					(dosync (alter stack empty?)))
				
				
				;; get DepthFirstAdapter proxy 
				(defn get-adapter-proxy [] 
					
					(proxy [DepthFirstAdapter] [] 
						
						
						;; keep a stack with 
						;;	i. 	AbbrevRoot 
						;;	ii.	Word 
						;;				- keep the last/previous token 
						;; 	iii.	RelativePath 
						;;	iv.	Predicate 
						
						
						(defaultCase [node]
							
							(println "\n\n[case] Node["+ node +"] \t\t\t\t class[" (. node getClass) "] \t\t\t\t" (. node toString))
							
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
							(stack-push (clojure.contrib.string/replace-str " " "" (. node toString)))
							
						)
						(caseTLetter [node]
							
							(println "caseTLetter CALLED \t\t\t\t\t class[" (. node getClass) "] \t\t\t\t\t" (. node toString))
							(stack-push (clojure.contrib.string/replace-str " " "" (. node toString)))
							
						)
						(caseAPredicatelist [node]
							
							(proxy-super inAPredicatelist node) 	;; duplicating adapter 'in' call 
					    
							(println "caseAPredicatelist CALLED \t\t\t\t class[" (. node getClass) "] \t\t\t\t" (. node toString) "\t\t filtered " (filter-xpath-input (. node toString)))
							(doseq [ each_predicate (java.util.ArrayList. (. node getPredicate)) ] 
								(do
									
									(println "DEBUG > each predicate... " each_predicate " predicate expresion[" (. each_predicate getExpr) 
												"] getExprsingle[" (.. each_predicate getExpr getExprsingle) "] ugghhhh!! [" 	;; this is where = breaks off: getComparisonexpr -here- getComparisonexprPart
														;;(.. each_predicate getExpr getExprsingle getOrexpr getAndexpr getComparisonexpr getComparisonexprPart getRangeexpr) "]" )
														(.. each_predicate getExpr getExprsingle getOrexpr getAndexpr getComparisonexpr getRangeexpr) "]" )
									
									(. each_predicate apply this)
									
									(stack-push node)
									
									;; ** here we are assuming there's only one predicate in the list 
									(def predicate-name 
											(clojure.contrib.string/replace-str "@" "" 
												(clojure.contrib.string/replace-str " " "" 
													(.. each_predicate getExpr getExprsingle getOrexpr getAndexpr getComparisonexpr getRangeexpr toString)))
									)
									(def predicate-value 
											(clojure.contrib.string/replace-str "'" "" 
												(clojure.contrib.string/replace-str " " "" 
													(.. each_predicate getExpr getExprsingle getOrexpr getAndexpr getComparisonexpr getComparisonexprPart getRangeexpr toString)))
									)
									
									(println "DEBUG > predicate-name[" predicate-name "] > predicate-value[" predicate-value "]")
								)
							)
							(println)
							
							;;* at the end of processing the XPath 
							;;	- capture leaf document 
							;;	- build XPath expr to feed to RESTful exist 
							
							
							
							(proxy-super outAPredicatelist node) 	;; duplicating adapter 'out' call 
							
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
					   (println "input-string \t[" input-string "]")
					   (println "stripped XPath \t[" (clojure.contrib.string/replace-re #"\\[[^\\]]*\\]" "" input-string) "]" )
					   
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



