(ns commands
	
  (:require clojure.contrib.logging)
  (:require clojure.string)
  (:require clojure.pprint)
  (:require [clojure.zip :as zip])
  (:require helpers)
  (:require domain)
  
  (:use somnium.congomongo)
  ;;(:use debug)
)


(defn add-user [user] 
  
  ;; check that there is not a duplicate user 
  (if (not (= (:username user) 
              (:username (first (fetch "users" :where { :username (:username user) })))))
    (do 
      (insert! :users (assoc user :password (helpers/md5-sum (:password user)))) ;; insert the user, after MD5 encrypting the password 
      (let [gr (load-file "etc/data/default.group.clj")]  ;; insert the associated group
        (insert! :groups (assoc gr :name (:username user) :owner (:username user))))
      (let [bk (load-file "etc/data/default.bookkeeping.clj")]  ;; insert the associated bookkeeping
        (insert! :bookkeeping (assoc bk :owner (:username user))))
    )
    { :tag "error" :msg "There is a duplicate user" }
  )
)



(defn add-currency [uname currency default]
  
  { :pre  [ (not (nil? uname)) 
            (not (clojure.string/blank? (:name currency)))
            (not (clojure.string/blank? (:id currency)))
            (= 0 (count (fetch "bookkeeping" :where { "content.content.id" (:id currency) }))) ;; ensure no duplicates 
          ] }
  
  ;; creating a zipper function. Good reference points are: 
  ;;  1. http://tech.puredanger.com/2010/10/22/zippers-with-records-in-clojure 
  ;;  2. http://tech.puredanger.com/2010/10/23/pattern-matching-and-tree-mutation
  (let  [ ru (fetch-one "bookkeeping" :where { :owner uname })
          alist [ [:insert {:id "main.currencies"} currency] 
                  (if default [:update {:id "main.currencies"} { :default (:id currency)}]) ] ;; give 'update' vector if we want to set as default currency
        ]
    
    (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object 
      (reduce (fn [a b] (apply domain/traverse-tree    ;; before calling update!, iterate through action list and apply on tree
                          (into [a] b)))        ;; give a vector of args to apply fn 'traverse-tree'
                        ru (filter #(not (nil? %1)) alist)))  ;; filter out nils from action list 
  )
)

(defn add-account 
  " 1. account types are: asset, liability, expense, revenue
    2. each account has a given counter weight
   
    type='asset'       counterWeight='debit'
    type='expense'     counterWeight='debit'
    type='liability'   counterWeight='credit'
    type='revenue'     counterWeight='credit'
  "
  [uname account] 
  
  { :pre  [ (not (nil? uname))
            (not (nil? account))
            (not (clojure.string/blank? (:name account)))
            (not (clojure.string/blank? (:id account)))
            (not (nil? (:type account)))
            (not (nil? (:counterWeight account)))
            (= 0 (count (fetch "bookkeeping" :where { "content.content.id" (:id account) }))) ;; ensure no duplicates 
          ] }
  
  (let  [ ru (fetch-one "bookkeeping" :where { :owner uname }) ]
    
    (update! :bookkeeping { :_id (:_id ru) }  ;; passing in had w/ ObjecId, NOT original object
      (domain/traverse-tree ru :insert { :id "main.accounts" } account))
  )
)


(defn add-entry [uname entry]
  
  { :pre  [ (not (nil? uname))
            (not (nil? entry))
            (not (clojure.string/blank? (:id entry)))
            (not (clojure.string/blank? (:date entry)))
            
            ;; ASSERT that accounts correspond with existing accounts
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
            
            ;; ASSERT that entry is balanced 
            ;; :lhs -> dt/dt == ct/ct
            ;; :rhs -> dt/cr == ct/dt 
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
            ]
  }
  
  (let  [ ru (fetch-one "bookkeeping" :where { :owner uname }) ]
    
    (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
      (domain/traverse-tree ru :insert { :id "main.entries" } entry))
  )

)



