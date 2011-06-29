(ns domain
  
  (:require [clojure.zip :as zip])
  (:use somnium.congomongo)
  (:require bkell)
  
  (:import
   (java.security NoSuchAlgorithmException MessageDigest)
   (java.math BigInteger)
   (org.bson.types.ObjectId))
    
  ;;(:require debug)
)

#_(bkell/init-shell)
#_(defn authenticated? [uname]

  { :pre  [(not (nil? (@bkell/shell :logged-in-user)))]
  }
  (= uname (@bkell/shell :logged-in-user))
)

(defn md5-sum
  "Compute the hex MD5 sum of a string. Pilfered from 'http://www.holygoat.co.uk/blog/entry/2009-03-26-1'"
  [#^String str]
  (let [alg (doto (MessageDigest/getInstance "MD5")
              (.reset)
              (.update (.getBytes str)))]
    (try
      (.toString (new BigInteger 1 (.digest alg)) 16)
      (catch NoSuchAlgorithmException e
        (throw (new RuntimeException e))))))

(defn bsonid-to-id
  "Traverse tree and turn A) org.bson.types.ObjectId into B) String
  A) :_id #<ObjectId 4e0b3417d36df61fd82a5bd7>
  B) :_id \"4e0b3417d36df61fd82a5bd7\""
  [tree]
  { :pre  [ (map? tree) ] } 
  
  (loop [loc (zip/zipper map? #(:content %1) #(assoc %1 :content (into [] %2)) tree)] ;; for '(into [] %2)', putting :content list into a vector
    
    ;;(debug/debug-repl)
    (if (zip/end? loc)
      (zip/root loc)
      (if (contains? (zip/node loc) :_id) 
          (recur  (zip/next
                    (zip/edit loc merge 
                      { :_id
                        (.toString (get (zip/node loc) :_id)) ;; gets the org.bson.types.ObjectId, and extract ID String
                      }
                      )))
          (recur (zip/next loc))
      )
    )
  )
)
(defn id-to-bsonid
  "Traverse tree and turn B) String into A) org.bson.types.ObjectId 
  A) :_id #<ObjectId 4e0b3417d36df61fd82a5bd7>
  B) :_id \"4e0b3417d36df61fd82a5bd7\""
  [tree]
  { :pre  [ (map? tree) ] } 
  
  (loop [loc (zip/zipper map? #(:content %1) #(assoc %1 :content (into [] %2)) tree)] ;; for '(into [] %2)', putting :content list into a vector
    
    ;;(debug/debug-repl)
    (if (zip/end? loc)
      (zip/root loc)
      (if (contains? (zip/node loc) :_id) 
          (recur  (zip/next
                    (zip/edit loc merge 
                      { :_id
                        (org.bson.types.ObjectId. (get (zip/node loc) :_id)) ;; get the String and construct an org.bson.types.ObjectId
                      }
                      )))
          (recur (zip/next loc))
      )
    )
  )
)


(defn keywordize-tags
  "Traverse tree and turn A) into B) 
  A) { :tag \"user\" }
  B) { :tag :user }"
  [tree]
  { :pre  [ (map? tree) ] } 
  
  (loop [loc (zip/zipper map? #(:content %1) #(assoc %1 :content (into [] %2)) tree)] ;; for '(into [] %2)', putting :content list into a vector
    
    ;;(debug/debug-repl)
    (if (zip/end? loc)
      (zip/root loc)
      (if (contains? (zip/node loc) :tag) 
          (recur  (zip/next
                    (zip/edit loc merge 
                      { :tag 
                        (keyword (get (zip/node loc) :tag)) ;; gets the value and makes it a keyword 
                      }
                      )))
          (recur (zip/next loc))
      )
    )
  )
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
                        (= :remove action)
                          (zip/remove loc)
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
(defn modify-currency [context action currency default]
  
  
  ;; creating a zipper function. Good reference points are: 
  ;;  1. http://tech.puredanger.com/2010/10/22/zippers-with-records-in-clojure 
  ;;  2. http://tech.puredanger.com/2010/10/23/pattern-matching-and-tree-mutation
  (let  [ alist [ [action 
                          {:id (if  (= :update action)  ;; if :update, set the action target to currency node, 
                                    (:id currency)      ;; main.currencies otherwise 
                                    "main.currencies")} currency] 
                  (if default [:update {:id "main.currencies"} { :default (:id currency)}]) ] ;; give 'update' vector if we want to set as default currency
        ]
    
      (reduce (fn [a b] 
                (apply domain/traverse-tree    ;; before calling update!, iterate through action list and apply on tree
                  (into [a] b)))        ;; give a vector of args to apply fn 'traverse-tree'
              context 
              (filter #(not (nil? %1)) alist) ;; filter out nils from action list 
      ) 
  )
)

(defn account-for-entry? [uname entry] 

  (empty? (let [ alist (domain/get-accounts uname)]
            (filter (fn [a] (loop [x a y alist ] ;; given main.account list, loop through dt / ct in entrys and see if accountid matches 
                  (if (= (:accountid x) (:id (first y)))
                    false
                    (if (< 1 (count y)) 
                      (recur x (rest y))
                      true                ;; entry added to filter if there was no accountid(s) that matched its reference
                    )
                  )
                )
              )
              (:content entry)
            )
  ))
            
)

(defn entry-balanced? 
  " Entry balance criteria is: 
    
    :lhs -> dt/dt == ct/ct
    :rhs -> dt/cr == ct/dt "
  [uname entry] 

  (let [result  (reduce (fn [a b] 
                          (let [acct (domain/find-linked-account uname b)]
                          (if (or (and (= "debit" (:counterWeight acct)) (= :debit (keyword (:tag b))) ) 
                                  (and (= "credit" (:counterWeight acct)) (= :credit (keyword (:tag b)))))
                            (merge a { :lhs (+ (:lhs a) (:amount b)) } )     ;; increase :lhs if debit(ing) a debit account OR credit(ing) a credit account 
                            (merge a { :rhs (+ (:rhs a) (:amount b)) } ))))
                  { :lhs 0.0 :rhs 0.0 }   ;; beginning tally 
                  (:content entry))]       ;; list of debits and credits 

    (= (:lhs result) (:rhs result))
  )
)


