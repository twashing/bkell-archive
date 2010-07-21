
(use 'helpers) 

(import 'java.io.ByteArrayInputStream) 
(require 'clojure.xml)

(defn xml_handler [node handler] 
   (if (instance? com.interrupt.bookkeeping.cc.node.AXmlCommandInput (. node getCommandInput) )
			(do 
			   
			   (println "XML input[" (.. node getCommandInput toString) "]")
			   (let [xml-string (filterSpacesFromXML (.. node getCommandInput toString))] 
			   		
			   		(println "XML filtered[" xml-string "]")
			   		(handler (clojure.xml/parse (ByteArrayInputStream. (.getBytes xml-string "UTF-8"))))
			   		
			   )
			   
			)
   ) 
)

