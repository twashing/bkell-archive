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
  (let  [ ru (fetch-one "bookkeeping" :where { :owner uname }) ]
    
    (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object 
      (domain/modify-currency                       ;; update the currency if existing  
          ru
          :insert
          currency 
          default))
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
            (domain/account-for-entry? uname entry)
            
            
            ;; ASSERT that entry is balanced 
            ;; :lhs -> dt/dt == ct/ct
            ;; :rhs -> dt/cr == ct/dt 
            (domain/entry-balanced? uname entry)
            ]
  }
  
  (let  [ ru (fetch-one "bookkeeping" :where { :owner uname }) ]
    
    (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
      (domain/traverse-tree ru :insert { :id "main.entries" } entry))
  )

)



