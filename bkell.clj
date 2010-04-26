(import 'com.interrupt.bookkeeping.cc.analysis.DepthFirstAdapter) 
(import 'com.interrupt.bookkeeping.cc.parser.Parser) 
(import 'com.interrupt.bookkeeping.cc.lexer.Lexer) 
(import 'java.io.PushbackReader) 
(import 'java.io.InputStreamReader) 


(defn get-depth-adapter [] 
	
	(proxy [DepthFirstAdapter] [] 
		
		(caseALoginCommand3 [node] 
			(println (format "caseALoginCommand3: %" node))
		)
		(caseAPrintCommand6 [node] 
			(println (format "caseAPrintCommand6: %" node)) 
		)
	)
)

(defn get-parser [] 
	(Parser. (Lexer. (PushbackReader. (InputStreamReader. java.lang.System/in) 1024)))
)

(defn demo-bkell [handler] 
	
		(. (.parse (get-parser))
		  apply handler )
)

(demo-bkell (get-depth-adapter))

