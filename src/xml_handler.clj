
(use 'helpers) 
(require 'clojure.contrib.logging)

(import 'java.io.ByteArrayInputStream) 
(require 'clojure.xml)
(require 'debug)


#_(defmulti xml_handler   (fn [input handler] 
                          [
                            (if (instance? com.interrupt.bookkeeping.cc.node.AXmlCommandInput input ) 
                              :AXmlCommandInput   ;; com.interrupt.bookkeeping.cc.node.AXmlCommandInput
                              :Node   ;;com.interrupt.bookkeeping.cc.node.Node
                            )
                            :handler 
                          ])
)



#_(defmethod xml_handler [:Node :handler] [node handler] 
    
            ;;(clojure.contrib.logging/info "xml_handler CALLED[:Node :handler] > AXmlCommandInput instance? > " 
            ;;  (instance? com.interrupt.bookkeeping.cc.node.AXmlCommandInput (. node getCommandInput) ))
   
   (try 
      (if (instance? com.interrupt.bookkeeping.cc.node.AXmlCommandInput (. node getCommandInput) )
        (xml_handler (. node getCommandInput) handler)
        (clojure.contrib.logging/info (str "EEeee.. xml_hanlder not processing"))
      )
      (catch Exception e 
        (clojure.contrib.logging/info (str "EEeee.. xml_hanlder not processing > Error Message[" (. e getMessage) "]")))   ;; > StackTrace[" (. e printStackTrace) "]"))
   ) 
)

#_(defmethod xml_handler [:AXmlCommandInput :handler] [xinput handler]
  
   (if (instance? com.interrupt.bookkeeping.cc.node.AXmlCommandInput xinput )
            (do 
               
               (clojure.contrib.logging/info (str "XML input[" xinput "]"))
               (let [xml-string (filterSpacesFromXML (. xinput toString))] 
                    
                    (clojure.contrib.logging/info (str "XML filtered[" xml-string "]"))
                    (handler (clojure.xml/parse (ByteArrayInputStream. (.getBytes xml-string "UTF-8"))))
                    
               )
               
            )
   ) 

)

(defn xml_handler [xinput handler]
  
   (if (instance? com.interrupt.bookkeeping.cc.node.AXmlCommandInput xinput ) 
       (clojure.contrib.logging/warn (str "XML input[" xinput "]"))
       (let [xml-string (filterSpacesFromXML (. xinput toString))] 
            
            ;;(debug/debug-repl)
            (clojure.contrib.logging/warn (str "XML filtered[" xml-string "]"))
            (handler (clojure.xml/parse (ByteArrayInputStream. (.getBytes xml-string "UTF-8"))))
            
       )
   )
   
)

