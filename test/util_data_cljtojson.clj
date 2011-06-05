
(import '(java.io File FileReader))

;; get file list from directory - test/etc/data 
(let [fdir (file-seq (File. "test/etc/data"))]
  
  (doseq [each fdir]
    
    (println)
    (println ">>>")
    (println each)
    
    (if (not (. each isDirectory))
      (let [forms (load-reader (FileReader. each))]
        
        (println forms)
      )
    )
      
  )
)



