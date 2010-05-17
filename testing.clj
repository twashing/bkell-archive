
;; performance stuff
(set! *warn-on-reflection* true)


(use 'clojure.xml)    ;; use XML library
(def flareXML (parse "etc/xml/bookkeeping.system.xml"))   ;; load XML from file

(. System/out println (str "parsed XML [" (.getClass flareXML) "] [" flareXML "]") )
;;(. System/out println (str "raw XML [" (emit flareXML) "]") )

(require 'clojure.contrib.http.agent)   ;; use HTTP client library
(require 'clojure.contrib.io)


;; connect to a eXist server ; push the XML object out 
(clojure.contrib.http.agent/result  (clojure.contrib.http.agent/http-agent "http://localhost:8080/exist/rest/thing" 
				       :method "PUT" 
				       :header {"Content-Type" "text/xml"} 
				       :body (with-out-str (emit flareXML))  
				       ;; :handler (fn [agnt]   (with-open [w (clojure.contrib.io/writer "/tmp/out")]    (clojure.contrib.io/copy (clojure.contrib.http.agent/stream agnt) w)))
				    ) 
)


