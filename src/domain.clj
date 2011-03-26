(ns domain
  (:require [clojure.zip :as zip])
  (:use somnium.congomongo)
)


(defn traverse-tree 
  "Traverse through tree until we find a tag with the given :id, then on 'original' perform 'action' with 'obj'. 
  Right now, the 'criteria-map' only takes 1 key/value pair"
  [original action criteria-map obj]
  { :pre  [ (map? original) 
            (keyword? action) ] } ;; ensure that our root node is a map 
  
  (let [  ky (-> criteria-map keys first) 
          vl (ky criteria-map)]
  (loop [loc (zip/zipper map? #(:content %1) #(assoc %1 :content %2 ) original)]
    
    (if (zip/end? loc)
      (zip/root loc)
      (if (and (= :get action) (= vl (ky (zip/node loc)))) ;; break if this is a :get and have found node 
          (zip/node loc)
          (recur (zip/next
                (cond (= vl (ky (zip/node loc))) ;; going to next, if ky@loc = vl, the do 'action' 
                      (cond
                        (= :insert action)
                          (zip/insert-child loc obj)
                        (= :update action)
                          (zip/edit loc merge obj)
                      )
                      :else loc) ))))
    )
  )
)


;; TODO - memoize 
(defn get-accounts [uname] 
  (:content (traverse-tree (first (fetch "bookkeeping" :where { :owner uname })) ;; original result -> main.account contents from DB 
    :get { :id "main.accounts" } nil))
)
(defn find-linked-account [uname dtct]
  (let [alist (get-accounts uname)] 
          (loop [x dtct y alist ] ;; given main.account list, loop through dt / ct in entrys and see if accountid matches 
            (if (= (:accountid x) (:id (first y)))
              (first y)
              (if (< 1 (count y)) 
                (recur x (rest y)))
            )
          )
  )
)


