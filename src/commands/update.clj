(require 'clojure.contrib.string)
(use 'helpers) 
(require 'bkell) 
(require 'clojure.contrib.logging)


(defn update-generic [db-base-URL db-system-DIR working-ITEM command-context]
		
		
		;; ... TODO - logic to build XQuery to use to insert 
		
		;; PUT to eXist 
		(clojure.contrib.logging/info "UPDATing [" working-ITEM "] / XML[" (with-out-str (clojure.xml/emit working-ITEM)) "]" )
		(let [result (execute-command 		
				(url-encode-newlines (url-encode-spaces (str db-base-URL db-system-DIR (working-dir-lookup :bookkeeping)
												"/" "group." (:id (:attrs (:logged-in-user @bkell/shell))) ".group"
												"/" "group." (:id (:attrs (:logged-in-user @bkell/shell))) ".group"
												;;"/bookkeeping.main.bookkeeping/bookkeeping.main.bookkeeping" 
												"?_wrap=no&_query="
												"declare default element namespace '"
                                                    (namespace-lookup (clojure.contrib.string/as-str (:tag working-ITEM)))"';"
                                                "update replace //"(clojure.contrib.string/as-str (:tag command-context))
		                                            "[@id='" (:id (:attrs command-context)) "']"
	                                                " with " (strip-xml-header (with-out-str (clojure.xml/emit working-ITEM)))
																					)))
												"GET" 
												{	"Content-Type" "text/xml" 
													"Connection" "Keep-Alive"
													"Authorization" "Basic YWRtaW46" }
												nil
		)]
		(clojure.contrib.logging/info "result[" result "]")
		)
)

