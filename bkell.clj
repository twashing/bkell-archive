
(ns com.interrupt.bookkeeping
   (:import com.interrupt.bookkeeping.cc.parser.Parser) 
   (:import com.interrupt.bookkeeping.cc.lexer.Lexer) 
   (:import java.io.PushbackReader) 
   (:import java.io.InputStreamReader) 
   
   (:use clojure.core)
   (:use clj-stacktrace.repl)
   
)

(defn get-parser [] 
	(Parser. (Lexer. (PushbackReader. (InputStreamReader. java.lang.System/in) 1024)))
)

(defn bkell [handler] 
	
	
	(def shell []) 	;; the shell and memory 
	
	(loop [ dfadapter handler ] 	;; loop on input (shell) until 'exit' 
		
		(def tree (.parse (get-parser))) 
		(. tree apply dfadapter )
		
		;; loop unless exit 
		(if (true? true) 
		   (recur dfadapter)
		)
	)
	
)

(use 'depth_adapter)

(bkell (get-depth-adapter))

