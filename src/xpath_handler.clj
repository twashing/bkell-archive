
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
  
  (:require clojure.xml)
  
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
	
	
	(defn get-url-midpoint [] 
		(+ 
			(. 	(deref URL-build) lastIndexOf 				;; get the position of substring
				(:context-parent (deref xpath-data)))		 
			(. (:context-parent (deref xpath-data)) length))	;; plus the char length of the leaf document name
	)
	(defn get-xpath-part-midpoint [] 
			 
			(let [b_index 
					(+ 1 
						(.	(:xpath-string (deref xpath-data)) indexOf 
							(. (:context-parent (deref xpath-data)) substring 
								0 
								(. (:context-parent (deref xpath-data)) indexOf ".")))) ]
			
						(. (:xpath-string (deref xpath-data)) substring 
							(+ 1 (. (:xpath-string (deref xpath-data)) indexOf "/" (+ 1 b_index)))
						)
			)	
	)	
	
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
						
						
						;; ** here we are assuming there's only one predicate in the list - getting the 'name' and 'value' 
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
						
						;; put in a check to see if we are at the leaf document
						(println "leaf check [" (. (clojure.contrib.string/trim (. top toString)) equals (:leaf-node (deref xpath-data))) "] > top[" (clojure.contrib.string/trim (. top toString)) "] > leaf-node[" (:leaf-node (deref xpath-data)) "]") 
						
						(if (. (clojure.contrib.string/trim (. top toString)) equals (:leaf-node (deref xpath-data)))
							
							(do 	;; IF portion here 
								(def thing 
									(. (deref URL-build) substring 	;; get a substring of our long exist URL 
												0 
												(get-url-midpoint)
												;;(+
												;;		(. 	(deref URL-build) lastIndexOf 				;; get the position of substring
												;;			(:context-parent (deref xpath-data)))		 
												;;		(. (:context-parent (deref xpath-data)) length))	;; plus the char length of the leaf document name 
											))
								
								;; write out context directory 
								(dosync 
									(alter xpath-data conj 
										{	:context-dir thing})
									
									;; write out leaf document 
									(def b_index 	(+	(. 	(deref URL-build) lastIndexOf 
																				(:context-parent (deref xpath-data)))	
																				(. (:context-parent (deref xpath-data)) length))) 
									
									(println "b_index[" b_index "] > +1[" (+ 1 b_index) "] > :context-parent["(:context-parent (deref xpath-data))"] > URL-build["
											(deref URL-build)"] > indexOf '/' [" (. (deref URL-build) indexOf "/") "] > FINAL["
											(. (deref URL-build) indexOf "/" (+ 1 b_index))"] > 'if' check["(< (. (deref URL-build) indexOf "/" (+ 1 b_index)) 0 )"]")
											
											
									(if (> (. (deref URL-build) indexOf "/" (+ 1 b_index)) 0 )
										 
										(let 	[	leaf-doc 
														(. (deref URL-build) substring 
															(+ 1 b_index) 
															(. (deref URL-build) indexOf "/" (+ 1 b_index)))
													] 
											(alter xpath-data conj 			;; if context directory is NOT the same as leaf document 
												{		:leaf-document-name (str leaf-doc "/" leaf-doc)
														;;(. (deref URL-build) substring 
														;;	(+ 1 b_index) 
														;;	(. (deref URL-build) indexOf "/" (+ 1 b_index)))
												})
										)
										
										(alter xpath-data conj			;; if context directory IS the same as leaf document 
											{		:leaf-document-name 
													(str (:leaf-node (deref xpath-data)) "." predicate-value )
											}
										)
										
									)
								)
								(println "---> We are at the leaf document[" (deref xpath-data) "]" )
								)
							
							(dosync (alter xpath-data conj  ;; ELSE, get the child XPath part
								{	:xpath-part	(get-xpath-part-midpoint) })) 
							
						)
					)
				)
				(println "URL-build[" (deref URL-build) "]")
				(println)
				(println)
				
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
		   ;;(println "stripped XPath \t[" (clojure.contrib.string/replace-re #"\\[[^\\]]*\\]" "" input-string) "]" )
		   
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
			 		(alter xpath-data conj { :context-parent (working-dir-lookup (:leaf-node (deref xpath-data))) } )
			 		
			 		(println "LEAF token > " (:leaf-node (deref xpath-data)))
			 		(println "LEAF context parent > " (:context-parent (deref xpath-data)))
			 )
			 
			 ;; 1.2 build an xpath parser 	 
			 (def tree (.parse (get-pushback-parser input-string))) 
			 
			 ;; 2. token - find i) leaf document to search ii) root & xpath expression to feed to RESTful  exist 
		   (. tree apply (get-adapter-proxy ) )
			 
			 ;; 3. build RESTful call 
		   (def db-query (str "_wrap=no&_query=" 
			    "declare default element namespace '"(namespace-lookup (:leaf-node (deref xpath-data))) "';" 
			    
			    ;; TODO - check if we need 'and' conditions 
			    ;; "**/<token>[ @option='option_value' [ and @option='option_value' ] ]" 
			    "//"(:leaf-node (deref xpath-data))"[ @" predicate-name "='" predicate-value "']" 
			    )
			    
		   )
		   
		   
		   (def db-full-PARENT (str db-base-URL "rootDir/" (:context-dir (deref xpath-data))))
		   
		   ;; 4. make RESTful call  &  5. pass result sequece to handler
		   
				(let [result-hash 
				   		(execute-http-call 
				   					;;(str db-full-PARENT "/" (:leaf-document-name (deref xpath-data)) (str "?" (url-encode db-query)))
				   					(str db-full-PARENT "/" (:leaf-document-name (deref xpath-data)) (str "?" db-query))
				   					"GET" 
				   					{"Content-Type" "text/xml"}
				   					nil 
				   		)] 
 					(let [	xml-string 
	 								(clojure.contrib.str-utils/str-join nil 
										(:body-seq result-hash ))   
								]
	 					
	 					(println "xpath_handler > string > " xml-string )
	 					(handler 
							(clojure.xml/parse (ByteArrayInputStream. (. xml-string getBytes ) )))
 					)
		   	)
		)
   )
)


 

