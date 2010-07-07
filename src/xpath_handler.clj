
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
  
  (:use helpers) 
  
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
	
	;; the XPath string that the proxy / adapter will use to figure out context directory & XPath expression 
	;; (def XPATH-string (ref ""))
	(def xpath-data (ref {})) 
	
	;; we're gonna build our eXist URL with this 
	(def URL-build (ref "")) 
	
	;; pilfered stack ideas and some implementation from: http://programming-puzzler.blogspot.com/2009/04/adts-in-clojure.html 
	(def stack (ref [])) 
	(defn stack-peek [] 
		(peek (deref stack)))
	(defn stack-push [e] 
		(dosync (alter stack conj e)) 
		(println "PUSH stack [" (deref stack) "]" ))
	(defn stack-pop [] 
		(dosync (alter stack pop)))
	(defn stack-empty? [] 
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
			(caseTAbbrevRootDesc [node] 
				
				(println "caseTAbbrevRootDesc CALLED \t\t\t\t class[" (. node getClass) "] \t\t\t\t" (. node toString))
				(stack-push node)
				
			)
			(caseTLetter [node] 
				
				(println "caseTLetter CALLED \t\t\t\t\t class[" (. node getClass) "] \t\t\t\t\t" (. node toString))
				(stack-push node)
				
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
						
						;; LATER - DON'T traverse children & evaluate... for now 
						;;(. each_predicate apply this)
						
						
						;; ** here we are assuming there's only one predicate in the list 
						(def predicate-name 
								(clojure.contrib.string/replace-str "@" "" 
									(clojure.contrib.string/replace-str " " "" 
										(.. each_predicate getExpr getExprsingle getOrexpr getAndexpr getComparisonexpr getRangeexpr toString)))) 
						(def predicate-value 
								(clojure.contrib.string/replace-str "'" "" 
									(clojure.contrib.string/replace-str " " "" 
										(.. each_predicate getExpr getExprsingle getOrexpr getAndexpr getComparisonexpr getComparisonexprPart getRangeexpr toString))))
						(println "DEBUG > predicate-name[" predicate-name "] > predicate-value[" predicate-value "]")
						
						
						;; (peek, then..) pop 'TLetter' & 'RelativePathexpr' 
						(def top (stack-peek))
						
						;; put in a check to see if we are at the leaf document
						(println "leaf check [" (. (clojure.contrib.string/trim (. top toString)) equals (:leaf-node (deref xpath-data))) "] > top[" (clojure.contrib.string/trim (. top toString)) "] > leaf-node[" (:leaf-node (deref xpath-data)) "]") 
						(if (. (clojure.contrib.string/trim (. top toString)) equals (:leaf-node (deref xpath-data)))
							
							(println "---> We are at the leaf document " ) 
							;; TODO - write out context directory 
							;; TODO - write out leaf document 
							;; TODO - begin writing out XPath expression 
							
						)
						
						(stack-pop)	;; pop the token 
						(stack-pop)	;; LATER - pop the relativepathpart - we'll have to assume that there's a relative_path_part... for now  
						
						(println "top of stack["top"] > class["(. top getClass)"]")
						(cond 
							(instance? com.interrupt.cc.xpath.node.TAbbrevRootDesc top ) 
								'() 
							
							(instance? com.interrupt.cc.xpath.node.TLetter top ) 
								(dosync 
									(alter URL-build str (clojure.contrib.string/replace-str " " "" (. top toString) ) "." predicate-value)
									(alter URL-build str "/"))
							
							;;(instance? com.interrupt.cc.xpath.node.ARootRelativepathexprPartPart  top ) 
							;;	(dosync (alter URL-build str "/"))
							
							(instance? com.interrupt.cc.xpath.node.APredicatelist top ) 
								'() 
						)
					)
				)
				(println "URL-build[" (deref URL-build) "]")
				(println)
				(println)
				
				
				;;* at the end of processing the XPath 
				;;	- capture leaf document 
				;;	- build XPath expr to feed to RESTful exist 
				
				
				(proxy-super outAPredicatelist node) 	;; duplicating adapter 'out' call 
				
			)
			(caseARootRelativepathexprPartPart [node] 
				
				(println "caseARootRelativepathexprPartPart CALLED \t\t class[" (. node getClass) "] \t\t\t\t" (. node toString)) 
				(stack-push node) 
				
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
		   
			 ;; 1.1 
			 (dosync 
			 		
			 		;; put in whole xpath string 
			 		(alter xpath-data conj { :xpath-string input-string } )
			 		
			 		;; for token substring between last / and [ 
			 		(alter xpath-data conj { 
			 				:leaf-node 
			 				(. 	(:xpath-string (deref xpath-data)) substring 
						 			(+ (. (:xpath-string (deref xpath-data)) lastIndexOf "/") 1)
						 			(. (:xpath-string (deref xpath-data)) lastIndexOf "[")) 
			 			})
			 		
			 		;; with token, lookup context directory 
			 		(alter xpath-data conj { :context-dir (working-dir-lookup (:leaf-node (deref xpath-data))) } )
			 		
			 		(println "LEAF token > " (:leaf-node (deref xpath-data)))
			 		(println "LEAF context directory > " (:context-dir (deref xpath-data)))
			 )
			 
			 ;; 1.2 build an xpath parser 	 
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



