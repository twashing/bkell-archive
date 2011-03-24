(ns commands

  (:use somnium.congomongo)
  (:require debug)
)


;; get user 
(defn get-user [uname]
  (fetch "users" :where { :username uname })
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
        result (map-reduce :bookkeeping m r :out :result-collection)]
    
    (-> result first :value :result first :result)  ;; dig in and get the currency list 
    
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
        result (map-reduce :bookkeeping m r :out :result-collection)]

    (-> result first :value :result first) ;; dig in and get the currency
  )
)


;; get account 
(defn get-accounts [uname] 

  (let [m (str "function(){ 
			  if( this.owner == '"uname"' ) { 
			    this.content[1].content.forEach( 
			      function(x) { 
			        emit( this.owner , x ); 
			      }
			    );
			  }
			};")
        r   "function(k,vals) { return { result : vals } ; }"
        result (map-reduce :bookkeeping m r :out :result-collection)]
    
    (-> result first :value :result first :result)  ;; dig in and get the currency list 
    
  )
)
(defn get-account [uname account]

  (let [m (str "function(){ 
			  if( this.owner == '"uname"' ) { 
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
        result (map-reduce :bookkeeping m r :out :result-collection)]

    (-> result first :value :result first) ;; dig in and get the currency
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
        result (map-reduce :bookkeeping m r :out :result-collection)]
    
    (-> result first :value :result first :result) ;; dig in and get the account list 
    
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
        result (map-reduce :bookkeeping m r :out :result-collection)]

    (-> result first :value :result first)  ;; dig in and get the account
  )
)



