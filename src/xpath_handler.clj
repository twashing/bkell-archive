
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
  (:require clojure.contrib.logging)
  
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
	;;(def URL-build (ref "")) 
	
	;; pilfered stack ideas and some implementation from: http://programming-puzzler.blogspot.com/2009/04/adts-in-clojure.html 
	(def stack (ref [])) 
	(defn stack-peek [] 
		(peek @stack))
	(defn stack-push [e] 
		(dosync (alter stack conj e)) 
		(clojure.contrib.logging/info (str "PUSH stack [" @stack "]" )))
	(defn stack-pop [] 
		(dosync (alter stack pop)))
	(defn stack-empty? [] 
		(dosync (alter stack empty?)))
	
	
	(defn get-url-midpoint [#^String URL-build] 
		(+ 
			(. URL-build lastIndexOf 				;; get the position of substring
				(:context-parent @xpath-data))		 
			(. (:context-parent @xpath-data) length))	;; plus the char length of the leaf document name
	)
	(defn get-xpath-part-midpoint [] 
			 
			(let [b_index 
					(+ 1 
						(.	(:xpath-string @xpath-data) indexOf 
							(. (:context-parent @xpath-data) substring 
								0 
								(. (:context-parent @xpath-data) indexOf ".")))) ]
			
						(. (:xpath-string @xpath-data) substring 
							(+ 1 (. (:xpath-string @xpath-data) indexOf "/" (+ 1 b_index)))
						)
			)	
	)	
	
	;; get DepthFirstAdapter proxy 
	(defn get-adapter-proxy [] 
		
		(let [URL-build (atom "")] 		;; we're gonna build our eXist URL with this 
		(proxy [DepthFirstAdapter] [] 
			
			;; keep a stack with 
			;;	i. 	AbbrevRoot 
			;;	ii.	Word 
			;;				- keep the last/previous token 
			;; 	iii.	RelativePath 
			;;	iv.	Predicate 
			(caseTAbbrevRootDesc [node] 
				
				(clojure.contrib.logging/info (str "caseTAbbrevRootDesc CALLED \t\t\t\t class[" (. node getClass) "] \t\t\t\t" (. node toString)))
				(stack-push node)
				
			)
			(caseTLetter [node] 
				
				(clojure.contrib.logging/info (str "caseTLetter CALLED \t\t\t\t\t class[" (. node getClass) "] \t\t\t\t\t" (. node toString)))
				(stack-push node)
				
			)
			(caseAPredicatelist [node] 
				
				(proxy-super inAPredicatelist node) 	;; duplicating adapter 'in' call 
		    
				(clojure.contrib.logging/info (str "caseAPredicatelist CALLED \t\t\t\t class[" (. node getClass) "] \t\t\t\t" (. node toString) "\t\t filtered " (filter-xpath-input (. node toString))))
				(doseq [ each_predicate (java.util.ArrayList. (. node getPredicate)) ] 
					(do
						
						(clojure.contrib.logging/info (str "DEBUG > each predicate... " each_predicate " predicate expresion[" (. each_predicate getExpr) 
							"] getExprsingle[" (.. each_predicate getExpr getExprsingle) "] ugghhhh!! [" 	;; this is where = breaks off: getComparisonexpr -here- getComparisonexprPart
								;;(.. each_predicate getExpr getExprsingle getOrexpr getAndexpr getComparisonexpr getComparisonexprPart getRangeexpr) "]" )
								(.. each_predicate getExpr getExprsingle getOrexpr getAndexpr getComparisonexpr getRangeexpr) "]" ))
						
						;; TODO - DON'T traverse children & evaluate... for now 
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
						(clojure.contrib.logging/info (str "DEBUG > predicate-name[" predicate-name "] > predicate-value[" predicate-value "]"))
						
						
						;; (peek, then..) pop 'TLetter' & 'RelativePathexpr' 
						(def top (stack-peek))
						(stack-pop)	;; pop the token 
						(stack-pop)	;; LATER - pop the relativepathpart - we'll have to assume that there's a relative_path_part... for now  
						
						(clojure.contrib.logging/info (str "top of stack["top"] > class["(. top getClass)"] / predicate-value[" predicate-value "] > class["(. predicate-value getClass)"]"))
						(cond 
							(instance? com.interrupt.cc.xpath.node.TAbbrevRootDesc top ) 
								'() 
							
							(instance? com.interrupt.cc.xpath.node.TLetter top ) 
								(do 
									(swap! URL-build str (clojure.contrib.string/replace-str " " "" (. top toString) ) "." predicate-value)
									(swap! URL-build str "/")
								)
							
							;;(instance? com.interrupt.cc.xpath.node.ARootRelativepathexprPartPart  top ) 
							;;	(dosync (alter URL-build str "/"))
							
							(instance? com.interrupt.cc.xpath.node.APredicatelist top ) 
								'() 
						)
						
						;; put in a check to see if we are at the leaf document
						(clojure.contrib.logging/info (str "leaf check [" (. (clojure.contrib.string/trim (. top toString)) equals (:leaf-node @xpath-data)) "] > top[" (clojure.contrib.string/trim (. top toString)) "] > leaf-node[" (:leaf-node @xpath-data) "]") )
						
						(if (. (clojure.contrib.string/trim (. top toString)) equals (:leaf-node @xpath-data))
							
							(do 	;; IF portion here 
								(def thing 
									(. @URL-build substring 	;; get a substring of our long exist URL 
												0 
												(get-url-midpoint @URL-build)
												;;(+
												;;		(. 	URL-build lastIndexOf 				;; get the position of substring
												;;			(:context-parent @xpath-data))		 
												;;		(. (:context-parent @xpath-data) length))	;; plus the char length of the leaf document name 
											))
								
								;; write out context directory 
								(dosync 
									(alter xpath-data conj 
										{	:context-dir thing})
									
									;; write out leaf document 
									(def b_index 	(+	(. 	@URL-build lastIndexOf 
																				(:context-parent @xpath-data))	
																				(. (:context-parent @xpath-data) length))) 
									
									(clojure.contrib.logging/info (str "b_index[" b_index "] > +1[" (+ 1 b_index) "] > :context-parent["(:context-parent @xpath-data)"] > URL-build["
											@URL-build"] > indexOf '/' [" (. @URL-build indexOf "/") "] > FINAL["
											(. @URL-build indexOf "/" (+ 1 b_index))"] > 'if' check["(< (. @URL-build indexOf "/" (+ 1 b_index)) 0 )"]"))
											
											
									(if (> (. @URL-build indexOf "/" (+ 1 b_index)) 0 )
										 
										(let 	[	leaf-doc 
														(. @URL-build substring 
															(+ 1 b_index) 
															(. @URL-build indexOf "/" (+ 1 b_index)))
													] 
											(alter xpath-data conj 			;; if context directory is NOT the same as leaf document 
												{		:leaf-document-name (str leaf-doc "/" leaf-doc)
														;;(. URL-build substring 
														;;	(+ 1 b_index) 
														;;	(. URL-build indexOf "/" (+ 1 b_index)))
												})
										)
										
										(alter xpath-data conj			;; if context directory IS the same as leaf document 
											{		:leaf-document-name 
													(str (:leaf-node @xpath-data) "." predicate-value )
											}
										)
										
									)
								)
								(clojure.contrib.logging/info (str "---> We are at the leaf document[" @xpath-data "]" ))
								)
							
							(dosync (alter xpath-data conj  ;; ELSE, get the child XPath part
								{	:xpath-part	(get-xpath-part-midpoint) })) 
							
						)
					)
				)
				(clojure.contrib.logging/info (str "URL-build[" @URL-build "]"))
				(clojure.contrib.logging/info "")
				(clojure.contrib.logging/info "")
				
				(proxy-super outAPredicatelist node) 	;; duplicating adapter 'out' call 
				
			)
			(caseARootRelativepathexprPartPart [node] 
				
				(clojure.contrib.logging/info (str "caseARootRelativepathexprPartPart CALLED \t\t class[" (. node getClass) "] \t\t\t\t" (. node toString)) )
				(stack-push node) 
				
			)
		)
		)
	) 
	
	
(defmulti xpath_handler   (fn [input handler] 
                          [
                            (if (instance? com.interrupt.bookkeeping.cc.node.AXpathCommandInput input ) 
                              :AXpathCommandInput   ;; com.interrupt.bookkeeping.cc.node.AXpathCommandInput
                              :Node   ;;com.interrupt.bookkeeping.cc.node.Node
                            )
                            :handler 
                          ])
)
(defmethod xpath_handler [:Node :handler] [node handler] 
    
   (try 
      (if (instance? com.interrupt.bookkeeping.cc.node.AXpathCommandInput (. node getCommandInput) )
        (xpath_handler (. node getCommandInput) handler)
        (clojure.contrib.logging/info "EEeee.. xpath_handler not processing")
      )
      (catch Exception e 
        (clojure.contrib.logging/info (str "EEeee.. xpath_handler not processing > Error Message[" (. e getMessage) "]"))) ;; > StackTrace[" (. e printStackTrace) "]"))
   ) 
)
(defmethod xpath_handler [:AXpathCommandInput :handler] [xinput handler] 
  (try  
    (if (instance? com.interrupt.bookkeeping.cc.node.AXpathCommandInput xinput ) 
		
		(do 
		   
		   (clojure.contrib.logging/info (str "xpath_handler > xinput[" (. xinput getClass) "]"))
		   (clojure.contrib.logging/info (str "XPATH input[" (. xinput toString) "]"))
		   
		   ;; 1. filter out <spaces> and ` 
		   (def input-string (filter-xpath-input (. xinput toString)))
		   (clojure.contrib.logging/info (str "input-string \t[" input-string "]"))
		   ;;(clojure.contrib.logging/info "stripped XPath \t[" (clojure.contrib.string/replace-re #"\\[[^\\]]*\\]" "" input-string) "]" )
		   
			 ;; 1.1 
			 (dosync 
			 		
			 		;; put in whole xpath string 
			 		(alter xpath-data conj { :xpath-string input-string } )
			 		
			 		;; for token substring between last / and [ 
			 		(alter xpath-data conj { 
			 				:leaf-node 
			 				(. 	(:xpath-string @xpath-data) substring 
						 			(+ (. (:xpath-string @xpath-data) lastIndexOf "/") 1)
						 			(. (:xpath-string @xpath-data) lastIndexOf "[")) 
			 			})
			 		
			 		;; with token, lookup context directory 
			 		(alter xpath-data conj { :context-parent (working-dir-lookup (:leaf-node @xpath-data)) } )
			 		
			 		(clojure.contrib.logging/info (str "LEAF token > " (:leaf-node @xpath-data)))
			 		(clojure.contrib.logging/info (str "LEAF context parent > " (:context-parent @xpath-data)))
			 )
			 
			 ;; 1.2 build an xpath parser 	 
			 (def tree (.parse (get-pushback-parser input-string))) 
			 
			 ;; 2. token - find i) leaf document to search ii) root & xpath expression to feed to RESTful  exist 
		   (. tree apply (get-adapter-proxy ) )
			 
			 ;; 3. build RESTful call 
		   (def db-query (str "_wrap=no&_query=" 
			    "declare default element namespace '"(namespace-lookup (:leaf-node @xpath-data)) "';" 
			    
			    ;; TODO - check if we need 'and' conditions 
			    ;; "**/<token>[ @option='option_value' [ and @option='option_value' ] ]" 
			    "//"(:leaf-node @xpath-data)"[ @" predicate-name "='" predicate-value "']" 
			    )
			    
		   )
		   
		   
		   (def db-full-PARENT (str db-base-URL "rootDir/" (:context-dir @xpath-data)))
		   
		   ;; 4. make RESTful call  &  5. pass result sequece to handler
		   
				(let [result-hash 
				   		(execute-command 
				   					;;(str db-full-PARENT "/" (:leaf-document-name @xpath-data) (str "?" (url-encode db-query)))
				   					(str db-full-PARENT "/" (:leaf-document-name @xpath-data) (str "?" (url-encode-spaces db-query)))
				   					"GET" 
				   					{"Content-Type" "text/xml"}
				   					nil 
				   		)]
				  
				  (clojure.contrib.logging/info (str "result-hash > " result-hash ))
 					(let [	xml-string 
	 								(clojure.contrib.str-utils/str-join nil 
										(:body-seq result-hash ))   
								]
	 					
	 					(clojure.contrib.logging/info (str "xpath_handler > string > " xml-string ))
	 					(handler 
							(clojure.xml/parse (ByteArrayInputStream. (. xml-string getBytes ) )))
 					)
		   	)
		)
   )
   (catch Exception e (clojure.contrib.logging/info "EEeee.. xpath_hanlder not processing"))
   )
)


