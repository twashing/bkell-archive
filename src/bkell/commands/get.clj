(ns bkell.commands.get

  (:import  [com.mongodb WriteResult WriteConcern DBCursor DBObject CommandResult$CommandFailure MapReduceOutput MapReduceCommand MapReduceCommand$OutputType])
  (:use [bkell.domain :as domain])
  (:require [monger.core :as mg]
            [monger.collection :as mc]
            [monger.operators :as mop]
            [monger.conversion :as cnv]
            [clojure.pprint :as pprint]
            [clojure.core.match :as match]
            [bkell.util :as util]
  )
)


;; get user 
(defn get-user [uname]
  (let  [ uresult (mc/find-one-as-map "users" { :username uname }) ]
    (if (not (nil? uresult))
      (domain/keywordize-tags uresult)
      nil
    )
  )
)
(defn get-group [uname]
  (let  [ gresult (mc/find-one-as-map "groups" { :owner uname }) ]
    (if (not (nil? gresult))
      (domain/keywordize-tags gresult)
      nil
    )
  )
)
(defn get-bookkeeping [uname] 
  (let  [ bresult (mc/find-one-as-map "bookkeeping" { :owner uname }) ]
    (if (not (nil? bresult))
      (domain/keywordize-tags bresult)
      nil
    )
  )
)


;; get currency 
(defn get-currencies [uname] 

  #_(let [m (str "function(){ 
			  if( this.owner == '"uname"' ) { 
			    this.content[0].content.forEach( 
			      function(x) { 
			        emit( this.owner , x ); 
			      }
			    );
			  }
			};")
        r   "function(k,vals) { return { result : vals } ; }"
        result {} #_(map-reduce :bookkeeping m r {:inline 1})]
    
    (vec (map bkell.domain/keywordize-tags 
      (-> result first :value :result)))  ;; dig in and get the currency list 
  )
  (mc/find-maps "currencies")
)
(defn get-currency [uname currency]

  (let [m (str "function(){ 
			  if( this.owner == '"uname"' ) { 
			    this.content[0].content.forEach( 
			        
                    function(x) { 
			          if( x.id == '"currency"' ) { 
			            emit( this.owner , x ); 
			          }
			        }
                );
			  }
			};")
        r   "function(k,vals) { return { result : vals } ; }"
        result {} #_(map-reduce :bookkeeping m r {:inline 1})]

    (if (-> result empty? not)
      #_(-> result first :value bkell.domain/keywordize-tags) ;; dig in and get the currency
      nil
    )
  )
)


;; get account 
(defn get-accounts [uname] 

  (let[ m (str "function(){ 
			  if( (this.content[0].content != null) && (this.owner == '"uname"') ) { 
			    this.content[0].content.forEach( 
			      function(x) { 
			        emit( this.owner , x ); 
			      }
			    );
			  }
			};")
        r   "function(k,vals) { return { result : vals } ; }"
        result (mc/map-reduce "bookkeeping" m r nil MapReduceCommand$OutputType/INLINE {})
        converted (cnv/from-db-object ^DBObject (.results ^MapReduceOutput result) true)
      ]
    
    ; digging into a structure that looks like this: [{:_id nil, :value {:result [{:counterWeight "debit", :name "cash", :type "asset", :id "cash", :tag "account"} {:counterWeight "credit", :name "expense", :type "expense", :id "expense", :tag "account"} {:counterWeight "debit", :name "revenue", :type "revenue", :id "revenue", :tag "account"} {:counterWeight "credit", :name "accounts payable", :type "liability", :id "accounts payable", :tag "account"}]}}]
    (-> converted first :value :result)
    
  )
)
(defn get-account [uname account]

  (let[ m (str "function(){ 
			  if( (this.content[0].content != null) && (this.owner == '"uname"') ) { 
			    this.content[0].content.forEach( 
			        
                    function(x) { 
			          if( x.id == '"account"' ) { 
			            emit( this.owner , x ); 
			          }
			        }
                );
			  }
			};")
        r   "function(k,vals) { return { result : vals } ; }"
        result (mc/map-reduce "bookkeeping" m r nil MapReduceCommand$OutputType/INLINE {})
        converted (cnv/from-db-object ^DBObject (.results ^MapReduceOutput result) true)
      ]
    
    ; digging into a structure that looks like this: {:_id nil, :value {:counterWeight "debit", :name "cash", :type "asset", :id "cash", :tag "account"}}
    (-> converted first :value)
  )
)



;; get entry 
(defn get-entries [uname] 

  (let [  m (str "function(){ 
  			  if( (this.content[1].content[0].content[0].content != null) && (this.owner == '"uname"') ) { 
                  this.content[1].content[0].content[0].content.forEach(
  			      
                    function(x) { 
                      emit( this.owner , x ); 
                    }
                  );
  			  }
  			};" )
          r "function(k,vals) { return { result : vals } ; }"
          result (mc/map-reduce "bookkeeping" m r nil MapReduceCommand$OutputType/INLINE {})
          converted (cnv/from-db-object ^DBObject (.results ^MapReduceOutput result) true)
        ]
    
    (-> converted first :value :result)
  )
)
(defn get-entry [uname entry]

  (let  [ m (str "function(){ 
  			  if( (this.content[1].content[0].content[0].content != null) && (this.owner == '"uname"') ) { 
  			    this.content[1].content[0].content[0].content.forEach(
  			        
                      function(x) { 
  			          if( x.id == '"entry"' ) { 
  			            emit( this.owner , x ); 
  			          }
  			        }
                  );
  			  }
  			};")
          r   "function(k,vals) { return { result : vals } ; }"
          result (mc/map-reduce "bookkeeping" m r nil MapReduceCommand$OutputType/INLINE {})
          converted (cnv/from-db-object ^DBObject (.results ^MapReduceOutput result) true)
        ]
    
    ;; digging into a structure that looks like: [{:_id nil, :value {:date \"03/22/2011\", :content [{:accountid \"cash\", :amount 120.0, :id \"dtS\", :tag \"debit\"} {:accountid \"revenue\", :amount 120.0, :id \"crS\", :tag \"credit\"}], :id \"testid\", :tag \"entry\"}}]"
    (-> converted first :value)
  )
)

(defn getk [tag & etal]
  (match/match [tag]
    [:user] (get-user (first etal))
    [:group] (get-group (first etal))
    [:bookkeeping] (get-bookkeeping (first etal))
    
    [:currencies] (get-currencies (first etal))
    [:currency] (get-currency (first etal) (second etal))
    
    [:accounts] (get-accounts (first etal))
    [:account] (get-account (first etal) (second etal))
    
    [:entries] (get-entries (first etal))
    [:entry] (get-entry (first etal) (second etal))
  )
)



