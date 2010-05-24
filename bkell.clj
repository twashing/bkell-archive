
(ns com.interrupt.bookkeeping
   (:import com.interrupt.bookkeeping.cc.parser.Parser) 
   (:import com.interrupt.bookkeeping.cc.lexer.Lexer) 
   (:import java.io.PushbackReader) 
   (:import java.io.InputStreamReader) 
   
   (:use clojure.core)
   (:use depth_adapter)
   
)

(defn get-parser [] 
	(Parser. (Lexer. (PushbackReader. (InputStreamReader. java.lang.System/in) 1024)))
)

(defn demo-bkell [handler] 
	
	;; loop on input (shell) until 'exit' 
	(loop [ dfadapter handler ] 
		
		(def tree (.parse (get-parser))) 
		(. tree apply dfadapter )
		
		;; loop unless exit 
		(if (true? true) 
		   (recur dfadapter)
		)
	)
	
)

(demo-bkell (get-depth-adapter))

