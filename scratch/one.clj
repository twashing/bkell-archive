
(require 'clojure.contrib.http.agent)

(let  [zzz 
	 ;; (clojure.contrib.http.agent/result (clojure.contrib.http.agent/http-agent "http://google.com" :method "GET" ) )]
	 (clojure.contrib.http.agent/result (clojure.contrib.http.agent/http-agent "http://cnet.com" :method "GET" ) )]

      (. System/out println zzz)
	 
)


