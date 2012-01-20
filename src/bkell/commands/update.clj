(ns bkell.commands.update
  (:use somnium.congomongo)
  (:require 
    [clojure.string]
    [bkell.commands.get :as getk]
    [bkell.commands.add :as addk]
    [bkell.domain :as domain]
    [bkell.util])
)



;; update user 
(defn update-user [user]
  
  { :pre  [ (not (nil? (first (fetch "users" :where { :username (:username user) })))) ;; assert that user exists
          ] }
   
  (let [ru  (first (fetch "users" :where { :username (:username user) }))]
    (if-let [ result ;; result will be a 'com.mongodb.WriteResult' 
              (update!  :users { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
                user)]
      (if (-> result .getLastError .ok)
        user
        (bkell.util/generate-error-response (.getErrorMessage result)))
    )
  )
)


;; update currency 
(defn update-currency [currency uname default]
  
  { :pre  [ (not (nil? uname)) 
            (not (clojure.string/blank? (:name currency)))
            (not (clojure.string/blank? (:id currency)))
          ] }
  (let [ru (fetch-one "bookkeeping" :where { :owner uname })
        rc (getk/get-currency uname (:id currency))]
    
    (if rc 
      (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object 
        (domain/modify-currency                       ;; update the currency if existing  
          ru
          :update
          currency 
          default))
      (addk/add-currency currency uname default)  ;; insert the currency otherwise 
    )
  )
)


;; CAN'T update accounts, only destroy and re-add them 
(defn update-account [account uname]
  
  { :pre  [ (not (nil? uname)) 
            (not (clojure.string/blank? (:id account)))
            (not (clojure.string/blank? (:name account)))
            (not (nil? (:type account)))
            (not (nil? (:counterWeight account)))
          ] }
  (let [ru (fetch-one "bookkeeping" :where { :owner uname })
        ra (getk/get-account uname (:id account))]
    
    (if ra 
      (if-let [result (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
                        (domain/traverse-tree ru :update { :id (:id account) } account))]
        (if (-> result .getLastError .ok)
          account
          (bkell.util/generate-error-response (.getErrorMessage result)))
      )
      (addk/add account uname)
    )
  )
)


;; update entry 
(defn update-entry [entry uname]
  
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
  
  (let [ru (fetch-one "bookkeeping" :where { :owner uname })
        re (getk/get-entry uname (:id entry))]
    
    (if re 
      (if-let [result 
                (update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object
                  (domain/traverse-tree ru :update { :id (:id entry) } entry))]
        
        (if (-> result .getLastError .ok)
          entry
          (bkell.util/generate-error-response (.getErrorMessage result)))
      )
      (addk/add-entry entry uname)  ;; insert the entry otherwise 
    )
  )
  
)


(defmulti update (fn [obj & etal] (:tag obj)))
(defmethod update :user [user & etal] (update-user user))
(defmethod update :currency [currency & etal] (update-currency currency (first etal) (second etal)))   ;; input arguments are: currency uname default
(defmethod update :account [account & etal] (update-account account (first etal)))  ;; input arguments are: account uname 
(defmethod update :entry [entry & etal] (update-entry entry (first etal)))  ;; input arguments are: entry uname 


