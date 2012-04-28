(ns bkell.commands.get

  (:use somnium.congomongo)
  (:require bkell.domain)
)


;; get user 
(defn get-user [uname]
  
  (let [result (first (fetch "users" :where { :username uname }))]
    
    (if (-> result empty? not)
      (bkell.domain/keywordize-tags result)
      nil
    )
  )
)
(defn get-group [uname]
  (first (fetch "groups" :where { :owner uname }))
)
(defn get-bookkeeping [uname] 
  (first (fetch "bookkeeping" :where { :owner uname }))
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
        result (map-reduce :bookkeeping m r {:inline 1})]
    
    (vec (map bkell.domain/keywordize-tags 
      (-> result first :value :result)))  ;; dig in and get the currency list 
  )
  (fetch "currencies")
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
        result (map-reduce :bookkeeping m r {:inline 1})]

    (if (-> result empty? not)
      (-> result first :value bkell.domain/keywordize-tags) ;; dig in and get the currency
      nil
    )
  )
)


;; get account 
(defn get-accounts [uname] 

  (let [m (str "function(){ 
			  if( (this.content[1].content != null) && (this.owner == '"uname"') ) { 
			    this.content[1].content.forEach( 
			      function(x) { 
			        emit( this.owner , x ); 
			      }
			    );
			  }
			};")
        r   "function(k,vals) { return { result : vals } ; }"
        result (map-reduce :bookkeeping m r {:inline 1})]
    
    ;;(println (str "get-accounts > result[" (first result) "]"))
    (vec (map bkell.domain/keywordize-tags 
      (-> result first :value :result)))  ;; dig in and get the currency list 
    
  )
)
(defn get-account [uname account]

  (let [m (str "function(){ 
			  if( (this.content[1].content != null) && (this.owner == '"uname"') ) { 
			    this.content[1].content.forEach( 
			        
                    function(x) { 
			          if( x.id == '"account"' ) { 
			            emit( this.owner , x ); 
			          }
			        }
                );
			  }
			};")
        r   "function(k,vals) { return { result : vals } ; }"
        result (map-reduce :bookkeeping m r {:inline 1})]
    
    (if (-> result empty? not)
      (-> result first :value bkell.domain/keywordize-tags) ;; dig in and get the currency
      nil
    )
  )
)



;; get entry 
(defn get-entries [uname] 

  (let [m (str "function(){ 
			  if( (this.content[2].content[0].content[0].content != null) && (this.owner == '"uname"') ) { 
                this.content[2].content[0].content[0].content.forEach(
			      
                  function(x) { 
                    emit( this.owner , x ); 
                  }
                );
			  }
			};" )
        r   "function(k,vals) { return { result : vals } ; }"
        result (map-reduce :bookkeeping m r {:inline 1})]
    
    (vec (map bkell.domain/keywordize-tags 
      (-> result first :value :result)))  ;; dig in and get the currency list 
    
  )
)
(defn get-entry [uname entry]

  (let [m (str "function(){ 
			  if( (this.content[2].content[0].content[0].content != null) && (this.owner == '"uname"') ) { 
			    this.content[2].content[0].content[0].content.forEach(
			        
                    function(x) { 
			          if( x.id == '"entry"' ) { 
			            emit( this.owner , x ); 
			          }
			        }
                );
			  }
			};")
        r   "function(k,vals) { return { result : vals } ; }"
        result (map-reduce :bookkeeping m r {:inline 1})]

    (if (-> result empty? not)
      (-> result first :value bkell.domain/keywordize-tags)  ;; dig in and get the account
      nil
    )
  )
)



(defmulti get (fn [tagk & etal] tagk))

(defmethod get :user [tagk & etal] (get-user (first etal)))
(defmethod get :group [tagk & etal] (get-group (first etal)))
(defmethod get :bookkeeping [tagk & etal] (get-bookkeeping (first etal)))

(defmethod get :currencies [tagk & etal] (get-currencies (first etal)))
(defmethod get :currency [tagk & etal] (get-currency (first etal) (second etal)))  ;; arguments are: 'uname' 'currency' 

(defmethod get :accounts [tagk & etal] (get-accounts (first etal)))
(defmethod get :account [tagk & etal] (get-account (first etal) (second etal)))  ;; arguments are: 'uname' 'account' 

(defmethod get :entries [tagk & etal] (get-entries (first etal)))
(defmethod get :entry [tagk & etal] (get-entry (first etal) (second etal)))  ;; arguments are: 'uname' 'entry' 


