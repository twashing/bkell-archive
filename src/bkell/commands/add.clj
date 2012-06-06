(ns bkell.commands.add
  
  (require  [clojure.string]
            [clojure.pprint]
            [clojure.zip :as zip]
            [bkell.domain]
            [bkell.util]
            [bkell.commands.get :as getk]
            [monger.core :as mg]
            [monger.collection :as mc]
            [monger.operators :as mop]
  )
)


(defn add-user [user] 
  
  { :pre  [ (bkell.util/verify-arg 
              (not (= (:username user) ;; check that there is not a duplicate user 
                      (:username (mc/find-one-as-map "users" { :username (:username user) }))))
              "This is a duplicate User"
            )
          ] }
  
  (let [gr (load-file "etc/data/default.group.clj")]  ;; insert the associated group
    (mc/insert "groups" (assoc gr :name (:username user) :owner (:username user))))
  (let [bk (load-file "etc/data/default.bookkeeping.clj")]  ;; insert the associated bookkeeping
    (mc/insert "bookkeeping" (assoc bk :owner (:username user))))
  (let [uuser (assoc user :password (bkell.domain/md5-sum (:password user)))]
    
    (mc/insert "users" uuser) ;; insert the user, after MD5 encrypting the password 
    
    ;; return the passed in user
    uuser
  )
  
)


(defn add-currency [currency uname default]
  
  { :pre  [ (not (nil? uname)) 
            (not (clojure.string/blank? (:name currency)))
            (not (clojure.string/blank? (:id currency)))
            (= 0 0 #_(count (fetch "bookkeeping" :where { "content.content.id" (:id currency) :owner uname }))) ;; ensure no duplicates 
          ] }
  
  ;; creating a zipper function. Good reference points are: 
  ;;  1. http://tech.puredanger.com/2010/10/22/zippers-with-records-in-clojure 
  ;;  2. http://tech.puredanger.com/2010/10/23/pattern-matching-and-tree-mutation
  (let  [ ru {} #_(fetch-one "bookkeeping" :where { :owner uname }) ]
    
    ;;(debug/debug-repl)
    (if-let [result     ;; result will be a 'com.mongodb.WriteResult'
      {} #_(update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object 
        (bkell.domain/modify-currency                       ;; update the currency if existing  
          ru
          :insert
          currency 
          default))]
      
      (if (-> result .getLastError .ok)
        currency
        (bkell.util/generate-error-response (.getErrorMessage result)))
    )
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
  [account uname] 
  
  { :pre  [ (not (nil? uname))
            (not (nil? account))
            (not (clojure.string/blank? (:name account)))
            (not (clojure.string/blank? (:id account)))
            (not (nil? (:type account)))
            (not (nil? (:counterWeight account)))
            (nil? (mc/find-one-as-map "bookkeeping" { "content.content.name" (:name account) "content.content.id" (:id account) :owner uname })) ;; ensure no duplicates 
          ] }
  
  (mc/update "bookkeeping" { :owner uname "content.id" "main.accounts"} { mop/$push { :content.$.content account } } )
)


(defn add-entry [entry uname]
  
  { :pre  [ (not (nil? uname))
            (not (nil? entry))
            (not (clojure.string/blank? (:id entry)))
            (not (clojure.string/blank? (:date entry)))
            
            ;; ASSERT that accounts correspond with existing accounts
            (bkell.domain/account-for-entry? uname entry (getk/get-accounts uname))
            
            
            ;; ASSERT that entry is balanced 
            ;; :lhs -> dt/dt == ct/ct
            ;; :rhs -> dt/cr == ct/dt 
            (bkell.domain/entry-balanced? uname entry (getk/get-accounts uname))
          ] }
  
  (mc/update "bookkeeping" { :owner uname "content.content.content.id" "main.entries"} { mop/$push { :content.$.content.0.content.0.content entry } } )
  
)


(defmulti add (fn [obj & etal] (:tag obj)))
(defmethod add :user [user] (add-user user))
(defmethod add :currency [currency & etal] (add-currency currency (first etal) (second etal)))   ;; input arguments are: currency uname default
(defmethod add :account [account & etal] (add-account account (first etal)))  ;; input arguments are: account uname 
(defmethod add :entry [entry & etal] (add-entry entry (first etal)))  ;; input arguments are: entry uname 


