(ns spittoon-test

	(:use [clojure.test])
    (:require spittoon.spittoon)
)


(def map-list (:spittoon-mappings (load-file "etc/config/config.test.clj")))


(deftest test-mapping
  
  ;; test mapping lookup 
  (let [  result 
          (spittoon/get-mapping 
            "/system.main.system/aauthentication.main.aauthentication/groups.aauth.groups/group.webkell/user.root"
            map-list)]
    
    (is (not (nil? result)))
    (is (= 2 (count result)))

    (is (= "/system.main.system/aauthentication.main.aauthentication/groups.aauth.groups/group.webkell"
            (nth result 0)))
    (is (= "group.webkell/user.root" (nth result 1)))
    
  )
)


(deftest test-create 
  
  #_(spittoon/create exist-path xpath xdoc)
  
  ;; test create of a root document 
  
  ;; test create an element within a document
  
  ;; ERROR test create within an empty document 
  
  ;; ERROR test create over an existing document 
  
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




