(ns spittoon-test

	(:use [clojure.test])
    (:require spittoon.spittoon)
)


(def map-list (:spittoon-mappings (load-file "etc/config/config.test.clj")))


(deftest test-create
  
  ;; test mapping lookup 
  (let [  result 
          (spittoon/get-mapping 
            "/system.main.system/aauthentication.main.aauthentication/groups.aauth.groups/group.webkell/user.root"
            map-list)]
    
    (is (not (nil? result)))
    (is (= 2 (count result)))
    
  )
  
)

