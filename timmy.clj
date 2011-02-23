(ns timmy )

(defn run-me []
  
  (let [cl (. Class forName "org.exist.xmldb.DatabaseImpl")]
    
    (let [database (. cl newInstance)]
      
      (. database setProperty "create-database" "true")
      (. org.xmldb.api.DatabaseManager registerDatabase database)
      
      (let [col (. org.xmldb.api.DatabaseManager getCollection "xmldb:exist:///db" "admin" "")]
        
        (let [resource (. col createResource "tim" "XMLResource")]
          
          (. resource setContent "<fubar/>")
          (. col storeResource resource)
          
        )
        (let [resources (seq (. col listResources))]
          (println (str "resources: " (class resources) " <==> " (. resources toString))) 

          (doseq [each resources]
            (println (str "result: " each)))
        )
        
        (let [dmanager (. col getService "DatabaseInstanceManager" "1.0")]
          (. dmanager shutdown))
      )
      
      ;;(.  deregisterDatabase database)
    )
  )
)


(defn f1 [] "f2")

;;(run-me)
;;(println "Here 16")



