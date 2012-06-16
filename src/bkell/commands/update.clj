(ns bkell.commands.update
  (:require 
    [clojure.string]
    [bkell.commands.get :as getk]
    [bkell.commands.add :as addk]
    [bkell.domain :as domain]
    [bkell.util]
    [monger.core :as mg]
    [monger.collection :as mc]
    [monger.operators :as mop]
    [clojure.core.match :as match]
    [clojure.pprint :as pprint]
  )
)


;; update user 
(defn update-user [user]

  ;; assert that user exists
  { :pre  [ (not (nil? (mc/find-one-as-map "users" { :username (:username user) })))
          ] }
   
  (mc/update "users" { :username (:username user) :tag "user" } { mop/$set user } )
)


;; update currency 
#_(defn update-currency [currency uname default]
  
  { :pre  [ (not (nil? uname)) 
            (not (clojure.string/blank? (:name currency)))
            (not (clojure.string/blank? (:id currency)))
          ] }
  (let [ru {} #_(fetch-one "bookkeeping" :where { :owner uname })
        rc (getk/get-currency uname (:id currency))]
    
    (if rc 
      {} #_(update! :bookkeeping { :_id (:_id ru) }  ;; passing in hash w/ ObjecId, NOT original object 
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
  
  #_(mc/update "bookkeeping"  { :owner uname 
                              "content.content.tag" "account"
                              "content.content.id" (:id account) }
                            { mop/$set { :content.$.content.id account } } )
  (mc/update "bookkeeping"  { :owner uname 
                              "fubar" { "$elemMatch" { "content.content.tag" "account" "content.content.id" (:id account) } } 
                            }
                            { mop/$set { "fubar.$" account } } )
  
  account
)


;; update entry 
(defn update-entry [entry uname]
  
  { :pre  [ (not (nil? uname))
            (not (nil? entry))
            (not (clojure.string/blank? (:id entry)))
            (not (clojure.string/blank? (:date entry)))
            
            ;; ASSERT that accounts correspond with existing accounts
            (domain/account-for-entry? uname entry (getk/get-accounts uname))
            
            
            ;; ASSERT that entry is balanced 
            ;; :lhs -> dt/dt == ct/ct
            ;; :rhs -> dt/cr == ct/dt 
            (domain/entry-balanced? uname entry (getk/get-accounts uname))
          ]
  }
  
  (mc/update "bookkeeping"  { :owner uname 
                              "content.content.content.content.tag" "entry"
                              "content.content.content.content.id" (:id entry) }
                            { mop/$set { :content.$.content.content.content entry } } )
  entry
)

(defn update [obj & etal]
  (let [a (:tag obj)]
    (match/match [a]
      [ :user ] (update-user obj)
      [ :account ] (update-account obj (first etal))
      [ :entry ] (update-entry obj (first etal))
    )
  )
)




