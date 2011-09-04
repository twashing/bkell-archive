(ns commands

  (:use somnium.congomongo)
  (:require debug)
  (:require domain)
)


;; get user 
(defn get-user [uname]
  
  (first (fetch "users" :where { :username uname }))
  #_(let  [ u (first (fetch "users" :where { :username uname }))]
    
    (traverse-tree 
      u :update { :tag (fn [a] (not (nil? a))) } obj)
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

  (let [m (str "function(){ 
			  if( this.owner == '"uname"' ) { 
			    this.content[0].content.forEach( 
			      function(x) { 
			        emit( this.owner , x ); 
			      }
			    );
			  }
			};")
        r   "function(k,vals) { return { result : vals } ; }"
        result (map-reduce :bookkeeping m r :result-collection)]
    
    (vec (map domain/keywordize-tags 
      (-> result first :value :result)))  ;; dig in and get the currency list 
  )
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
        result (map-reduce :bookkeeping m r :result-collection)]

    (-> result first :value) ;; dig in and get the currency
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
        result (map-reduce :bookkeeping m r :result-collection)]
    
    (vec (map domain/keywordize-tags 
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
        result (map-reduce :bookkeeping m r :result-collection)]
    
    (-> result first :value ) ;; dig in and get the currency
  )
)



;; get entry 
(defn get-entries [uname] 

  (let [m (str "function(){ 
			  if( this.owner == '"uname"' ) { 
                this.content[2].content[0].content[0].content.forEach(
			      
                  function(x) { 
                    emit( this.owner , x ); 
                  }
                );
			  }
			};" )
        r   "function(k,vals) { return { result : vals } ; }"
        result (map-reduce :bookkeeping m r :result-collection)]
    
    (vec (map domain/keywordize-tags 
      (-> result first :value :result)))  ;; dig in and get the currency list 
    
  )
)
(defn get-entry [uname entry]

  (let [m (str "function(){ 
			  if( this.owner == '"uname"' ) { 
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
        result (map-reduce :bookkeeping m r :result-collection)]

    (-> result first :value )  ;; dig in and get the account
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


