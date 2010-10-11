
(use 'helpers) 

(import 'java.io.ByteArrayInputStream) 
(require 'clojure.xml)



(defmulti xml_handler   (fn [input handler] 
                          [
                            (if (instance? com.interrupt.bookkeeping.cc.node.AXmlCommandInput input ) 
                              :AXmlCommandInput   ;; com.interrupt.bookkeeping.cc.node.AXmlCommandInput
                              :Node   ;;com.interrupt.bookkeeping.cc.node.Node
                            )
                            :handler 
                          ])
)



(defmethod xml_handler [:Node :handler] [node handler] 
			
   (if (instance? com.interrupt.bookkeeping.cc.node.AXmlCommandInput (. node getCommandInput) )
      (xml_handler (. node getCommandInput) handler)
      (println "EEeee.. xml_hanlder not processing")
   ) 
)

(defmethod xml_handler [:AXmlCommandInput :handler] [xinput handler]
  
   (if (instance? com.interrupt.bookkeeping.cc.node.AXmlCommandInput xinput )
			(do 
			   
			   (println "XML input[" xinput "]")
			   (let [xml-string (filterSpacesFromXML (. xinput toString))] 
			   		
			   		(println "XML filtered[" xml-string "]")
			   		(handler (clojure.xml/parse (ByteArrayInputStream. (.getBytes xml-string "UTF-8"))))
			   		
			   )
			   
			)
   ) 

)

