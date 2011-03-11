(ns spittoon-test

	(:use [clojure.test])
    (:require spittoon.spittoon)
    
    ;;(:require debug)
)


(defn map-list []
  (:spittoon-mappings (load-file "test/etc/config/config.clj")))


(deftest test-mapping
  
  ;; test mapping lookup 
  (let [  result 
          (spittoon/get-mapping 
            "/system.main.system/aauthentication.main.aauthentication/groups.aauth.groups/group.webkell/user.root"
            (map-list))]
    
    (is (not (nil? result)))
    (is (= 2 (count result)))

    (is (= "/system.main.system/aauthentication.main.aauthentication/groups.aauth.groups/group.webkell"
            (nth result 0)))
    (is (= "group.webkell/user.root" (nth result 1)))
    
  )
)


(deftest test-create 
  
  (spittoon/reconfigure "test/etc/config/config.clj")
  
  ;; test create of a root document 
  (let  [pl (spittoon/get-mapping "/system.main.system/aauthentication.main.aauthentication/groups.aauth.groups/group.webkell" (map-list))]
    (let  [ exist-path (nth pl 0)
            xpath (spittoon/xpath-from-epath (nth pl 1))
            xdoc (slurp "test/etc/xml/group.xml" ) ] 
      (let [result (spittoon/create exist-path xpath xdoc)]
        
        (is (not (nil? result)))
        (is (= 201 (:status result))) ;; HTTP 201 means a resource was created 
      )
    )
  )
  
  ;; test create an element within a document
  (let  [ p1 (spittoon/get-mapping "/system.main.system/aauthentication.main.aauthentication/groups.aauth.groups/group.stub" (map-list))
          p2 (spittoon/get-mapping "/system.main.system/aauthentication.main.aauthentication/groups.aauth.groups/group.stub/user.stub" (map-list))
        ]
    (let  [ exist-path (nth p1 0)
            xpath (spittoon/xpath-from-epath (nth p1 1))
            xdoc (slurp "test/etc/xml/stubu-one.xml" ) ] 
      (let [result (spittoon/create exist-path xpath xdoc)]
        
        (is (not (nil? result)))
        ;;(is (= 201 (:status result))) ;; HTTP 201 means a resource was created 
      )
    )
    (let  [ exist-path (nth p2 0)
            xpath (spittoon/xpath-from-epath (nth p2 1))
            xdoc (slurp "test/etc/xml/stubu-two.xml" ) ] 
      (let [result (spittoon/create exist-path xpath xdoc)]
        
        (is (not (nil? result)))
        ;;(is (= 201 (:status result))) ;; check the document was created within the existing 'stub-one' 
      )
    )
  )
  
  ;; ERROR test create within an empty document 
  
  ;; ERROR test create over an existing document 


  ;; ** Special case: exist path is abouve a particular mapping 
  
)

#_(deftest test-retrieve 
  
  (spittoon/retrieve exist-path xpath) 
  
  ;; test retrieve of existing document 
  
  ;; test retrieve of xpath within an existing document 
  
  ;; ERROR test retrieve of nil document 
  
)

#_(deftest test-update 
  
  (spittoon/update exist-path xpath xdoc) 
  
  ;; test update of a root document 
  
  ;; test update an element within a document
  
  ;; ERROR test update within an empty document 
  
)

#_(deftest test-delete 
  
  (spittoon/delete exist-path xpath) 
  
  ;; test delete of a root document 
  
  ;; test delete of an element within a document 
  
  ;; ERROR test delete of a nil document 
  
)




