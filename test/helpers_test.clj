(ns helpers-test
	(:use [helpers] :reload-all)
	(:use [clojure.test])
	(:import java.io.ByteArrayInputStream) 
	(:require clojure.contrib.str-utils)
    (:require clojure.contrib.logging)
)


(def configs (load-file "etc/config/config.test.clj"))

(defn test-fixture-db [test]
   
  ;; delete DB content before and after running a test
  (execute-embedded-db (:url-test configs) "DELETE" {} nil) 
  (test)  ;; ** execute the TEST function
  (execute-embedded-db (:url-test configs) "DELETE" {} nil) 
   
)
(use-fixtures :each helpers-test/test-fixture-db )


;; ==============
;;  BEGIN TESTs
;; ==============

(deftest test-execute-embedded-db-1
  
  ;; try GET on an empty DB 
  (let [  result-GET (execute-embedded-db (:url-test-helper configs) "GET" {} nil) ]
    (is (nil? result-GET) "GET result SHOULD be nil") 
  )
  
  ;; PUT, then try to GET 
  (execute-embedded-db (:url-test-helper configs) "PUT" {"Content-Type" "text/xml"} "<testContent/>") 
  (let [  result-GET (execute-embedded-db (:url-test-helper configs) "GET" {} nil) ]
    (is (not (nil? result-GET)) "GET result should NOT be nil")
  )
)

(deftest test-execute-embedded-db-2
  
  ;; PUT, then try to GET 
  (execute-embedded-db (:url-test-helper configs) "PUT" {"Content-Type" "text/xml"} "<testContent/>") 
  (let [  result-GET (execute-embedded-db (:url-test-helper configs) "GET" {} nil) ]
    (is (not (nil? result-GET)) "GET result should NOT be nil")
  )
  
  ;; DELETE, then try to GET 
  (execute-embedded-db (:url-test-helper configs) "DELETE" {} nil) 
  (let [  result-GET (execute-embedded-db (:url-test-helper configs) "GET" {} nil) ]
    (is (nil? result-GET) "GET result should be nil AFTER delete")
  )
)



;; putting these tests on the shelf - needs to have DB running over HTTP
;; test HTTP GET 
#_(deftest test-http-get 
	
	(let [result-GET (execute-http-call 
		(str (:url-test configs) "/thing") 
		"GET"
		{ "Content-Type" "text/xml" } 
		nil)]
		
		(clojure.contrib.logging/info (str "test result [" result-GET "]") )
		(is (not (nil? result-GET)) "GET result should not be nil") 
		(is (. (:msg result-GET ) equals "OK")) 
		(is (. (:code result-GET ) equals 200)) 
		
		(let [ parsed-test (clojure.xml/parse (ByteArrayInputStream. (.getBytes 
			(clojure.contrib.str-utils/str-join nil (:body-seq result-GET ))		;; get the XML string  
			"UTF-8")))] 
			
			(is 	;; test that there is a 'thing' keyword , that can evaluate on a hash 
				(. ((:tag parsed-test) {:thing "result" }) equals 
				"result")
			)
			
		)
	)
)


;; test HTTP PUT 
#_(deftest test-http-put 
	
	;; test good request 
	(let [result-PUT (execute-http-call 
		(str (:url-test configs) "/test/test-good-http-put") 
		"PUT" 
		{	"Content-Type" "text/xml" "Authorization" (str "Basic " (:passwdBase64 configs)) } 
		"<test-good-http-put/>" 
		)]
		
		(clojure.contrib.logging/info (str "test result [" result-PUT "]"))
		(is (not (nil? result-PUT)) "PUT result should not be nil") 
		(is (. (:code result-PUT ) equals 201) "response code SHOULD be 201" )
		(is (. (:msg result-PUT ) equals "Created") "test xml should have been 'Created'" )
	)
	
	;; test bad passwd 
	(let [result-PUT (execute-http-call 
		(str (:url-test configs) "/test/test-bad-passwd") 
		"PUT" 
		{	"Content-Type" "text/xml" "Authorization" "Basic badpasswd" } 
		"<test-bad-passwd/>" 
		)]
		
		(clojure.contrib.logging/info (str "test result [" result-PUT "]"))
		(is (not (nil? result-PUT)) "PUT result should not be nil") 
		(is (. (:code result-PUT ) equals 500) "response code SHOULD be 500" )
		(is (. (:msg result-PUT ) equals "Error") "test PUT should return 'Error'" )
	)
	
	;; test no Authorization	TODO - this should fail 
	#_(let [result-PUT (execute-http-call 
		(str (:url-test configs) "/test/test-no-authorization" ) 
		"PUT" 
		{	"Content-Type" "text/xml" } 
		"<test-no-authorization/>" 
		)]
		
		(clojure.contrib.logging/info "test result [" result-PUT "]")
		(is (not (nil? result-PUT)) "PUT result should not be nil") 
		(is (. (:code result-PUT ) equals 401) "response code SHOULD be 201" )
		(is (. (:msg result-PUT ) equals "Created") "test xml should have been 'Created'" )
	)
	
)

