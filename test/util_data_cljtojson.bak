
(import '(java.io File FileReader))
(require  'clojure.contrib.str-utils2
          'clojure.contrib.duck-streams
          'clojure.contrib.json)

;; get file list from directory - test/etc/data 
(let [fdir (file-seq (File. "test/etc/data"))]
  
  (doseq [each fdir]
    
    (println)
    (println ">>>")
    (println each)
    
    (if (not (. each isDirectory))
      (let [form (load-reader (FileReader. each))]
        
        (println (str "Filename: " (. each getPath)))
        (println (str "Writing out... " (clojure.contrib.str-utils2/replace-first (. each getPath) #"\.clj" ".js")))
        ;;(println form)
        
        (clojure.contrib.duck-streams/spit (clojure.contrib.str-utils2/replace-first (. each getPath) #"\.clj" ".js") ;; write out to javascript file 
          (with-out-str (clojure.contrib.json/pprint-json form)))  ;; transform to javascript 
      )
    )
      
  )
)



