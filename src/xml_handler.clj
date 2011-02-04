
(use 'helpers) 

(import 'java.io.ByteArrayInputStream) 
(require 'clojure.xml)
(require 'clojure.contrib.logging)



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
    
            ;;(clojure.contrib.logging/info "xml_handler CALLED[:Node :handler] > AXmlCommandInput instance? > " 
            ;;  (instance? com.interrupt.bookkeeping.cc.node.AXmlCommandInput (. node getCommandInput) ))
   
   (try 
      (if (instance? com.interrupt.bookkeeping.cc.node.AXmlCommandInput (. node getCommandInput) )
        (xml_handler (. node getCommandInput) handler)
        (clojure.contrib.logging/info "EEeee.. xml_hanlder not processing")
      )
      (catch Exception e 
        (clojure.contrib.logging/info "EEeee.. xml_hanlder not processing > Error Message[" (. e getMessage) "]"))   ;; > StackTrace[" (. e printStackTrace) "]"))
   ) 
)

(defmethod xml_handler [:AXmlCommandInput :handler] [xinput handler]
  
   (if (instance? com.interrupt.bookkeeping.cc.node.AXmlCommandInput xinput )
			(do 
			   
			   (clojure.contrib.logging/info "XML input[" xinput "]")
			   (let [xml-string (filterSpacesFromXML (. xinput toString))] 
			   		
			   		(clojure.contrib.logging/info "XML filtered[" xml-string "]")
			   		(handler (clojure.xml/parse (ByteArrayInputStream. (.getBytes xml-string "UTF-8"))))
			   		
			   )
			   
			)
   ) 

)

