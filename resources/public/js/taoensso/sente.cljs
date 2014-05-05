(ns taoensso.sente
  "Channel sockets. Otherwise known as The Shiz.

      Protocol  | client>server | client>server + ack/reply | server>user[1] push
    * WebSockets:       ✓              [2]                          ✓  ; [3]
    * Ajax:            [4]              ✓                          [5] ; [3]

    [1] ALL of a user's connected clients (browser tabs, devices, etc.).
        Note that user > session > client > connection for consistency over time
        + multiple devices.
    [2] Emulate with cb-uuid wrapping.
    [3] By uid only (=> logged-in users only).
    [4] Emulate with dummy-cb wrapping.
    [5] Emulate with long-polling against uid (=> logged-in users only).

  Abbreviations:
    * chsk  - channel socket.
    * hk-ch - Http-kit Channel.
    * uid   - User id. An application-specified identifier unique to each user
              and sessionized under `:uid` key to enable server>user push.
              May have semantic meaning (e.g. username, email address), or not
              (e.g. random uuid) - app's discresion.
    * cb    - callback.
    * tout  - timeout.
    * ws    - WebSocket/s.

  Special messages (implementation detail):
    * cb replies: :chsk/closed, :chsk/timeout, :chsk/error.
    * client-side events:
        [:chsk/handshake <#{:ws :ajax}>],
        [:chsk/ping      <#{:ws :ajax}>], ; Though no :ajax ping
        [:chsk/state [<#{:open :first-open :closed}> <#{:ws :ajax}]],
        [:chsk/recv  <[buffered-evs]>]. ; server>user push

    * server-side events:
       [:chsk/bad-edn <edn>],
       [:chsk/bad-event <chsk-event>].

    * event wrappers: {:chsk/clj <clj> :chsk/dummy-cb? true} (for [2]),
                      {:chsk/clj <clj> :chsk/cb-uuid <uuid>} (for [4]).

  Notable implementation details:
    * Edn is used as a flexible+convenient transfer format, but can be seen as
      an implementation detail. Users may apply additional string encoding (e.g.
      JSON) at will. (This would incur a cost, but it'd be negligable compared
      to even the fastest network transfer times).
    * No server>client (with/without cb) mechanism is provided since:
      - server>user is what people actually want 90% of the time, and is a
        preferable design pattern in general IMO.
      - server>client could be (somewhat inefficiently) simulated with server>user.
    * core.async is used liberally where brute-force core.async allows for
      significant implementation simplifications. We lean on core.async's strong
      efficiency here.

  General-use notes:
    * Single HTTP req+session persists over entire chsk session but cannot
      modify sessions! Use standard a/sync HTTP Ring req/resp for logins, etc.
    * Easy to wrap standard HTTP Ring resps for transport over chsks. Prefer
      this approach to modifying handlers (better portability)."
  {:author "Peter Taoussanis"}

       
                                    
                                                                         
                                                                 
                                              
                                                   
                                                 
                                                  

        
  (:require [clojure.string  :as str]
            [cljs.core.async :as async :refer (<! >! put! chan)]
            [cljs.reader     :as edn]
            [taoensso.encore :as encore :refer (format)])

        
  (:require-macros [cljs.core.async.macros :as asyncm :refer (go go-loop)]))

;;;; Shared (client+server)

(defn- chan? [x]
                                                                         
         (instance? cljs.core.async.impl.channels.ManyToManyChannel    x))

(defn- validate-event-form [x]
  (cond
    (not (vector? x))        :wrong-type
    (not (#{1 2} (count x))) :wrong-length
    :else (let [[ev-id _] x]
            (cond (not (keyword? ev-id))  :wrong-id-type
                  (not (namespace ev-id)) :unnamespaced-id
                  :else nil))))

(defn event? "Valid [ev-id ?ev-data] form?" [x] (nil? (validate-event-form x)))

(defn assert-event [x]
  (when-let [?err (validate-event-form x)]
    (let [err-fmt
          (str
           (case ?err
             :wrong-type   "Malformed event (wrong type)."
             :wrong-length "Malformed event (wrong length)."
             (:wrong-id-type :unnamespaced-id)
             "Malformed event (`ev-id` should be a namespaced keyword)."
             :else "Malformed event (unknown error).")
           " Event should be of `[ev-id ?ev-data]` form: %s")]
      (throw (ex-info (format err-fmt (str x)) {:malformed-event x})))))

(defn cb-success? [cb-reply] ;; Cb reply need _not_ be `event` form!
  (not (#{:chsk/closed :chsk/timeout :chsk/error} cb-reply)))

                                                                            
                         
                            
                                                

(defn- unwrap-edn-msg-with-?cb->clj "edn -> [clj ?cb-uuid]"
  [edn]
  (let [msg                                  
                        (edn/read-string edn)
        ?cb-uuid (and (map? msg) (:chsk/cb-uuid msg))
        clj      (if-not ?cb-uuid msg (:chsk/clj msg))]
    [clj ?cb-uuid]))

;;;; Server

     
                
                                                                  
     
                               
                                                                    
                                                                    
                                                                                 
                             
                            
                                                        

     
                         
                                                                     
               
                                                                   
                              
                                                                       
                   
                                       
                                             
                                                                          
                                                                             
                                                      

                                                                         
                            
                                                             

     
                                    
                                                                       
                               
                                           
                                             

     
                                      
                                                                             
                                            
                                                                        
                                                                        
                                                         
                                                          
                                                              
                                   
                                                            
                                                                     
                                               
                                                                        
                                               
                                                                              
                                                 
                                                                         
                                                                            
                                           
                                            
                                     
                                                                       
                                                                         
                                               
                                                       
                                                     
                                
                             
                            
                                                 
                                          
                                                                                  
                                                                            
                        
                                                           
                                                                             
                                                       
                                          
                                                                                  
                                                                
                                                                 
                                                  

     
                          
                                                                            
                                      
                                                                              
                                                                       
                                                          
                                                                                  
                                                                                  
                                                                                  

          
                                                
                                                                      
                                          
                            
                            

                                                                     
                                                                             
                                                                             
                                                               
                                                                       
                                                       
                                  
                                 
                                                                              
                                           
                                           

                                    
                                                     
                                                                                         
                         
                                                           
                                                                                           

                    
                      
                                
                                       
                        
                                                                                   
                                                                                       

                                                   
                 
                                
                                       
                                  
                                                                    
                                                                    
                                                         
                                                             
                                                                             
                                                                             
                                                                                   

                     
                                    
                                         
                                                            
                                                        
                        
                               
                                                                                        
                                      
                          
                       
                                                                      
                                                                         
                                                                            
                                                      
                                                  
                                              
                                                                                
                                                                              
                                                                                
                                                                             
                                                      
                                                     
                                                                  
                                 
                                                                      
                                                      
                                                                      
                                                             

                                 
              
                                                   

                                     
                                        
                                       

                                                                                    
                                                            
                                      
                                           
                                                                        

              
                            
                                      
                                                        
                            
                                                  
                                                         
                                              
                                                         

                                                             
                                                                    
                                                          
                                                                               
                                                                   
                                                                                  
                                     
                                                                                    
                                          

           

                                                                              
                   
                                            
                                                                
                                                               
                                                                

                                      
                                                                                   
                                                                             
                                
                        
                        
                                 
                                                      
                                                                       
                                                   
                                                 
                                                        

                          
                                                                
                                                                

                                                             
                   
                                            
                                        
                                                            
                                                                              
                                                                  
                                        

                                            
                                        
                                            
                                                                               
                                                  
                                       
                                               

                                     
                
                                                            
                                                                           
                        
                                                                                    
                                        

                                         
                              
                                                                               
                                             
                                     
                                                               
                                                                              
                                                                         
                                                                            
                                                          
                                                                   

                                                                    
                                       
                             
                            
                                                  
                                                   
                                                                
                                           
                                                
                                                   
                                                
                                                                     

                                                                                    
                                                              
                                                   
                                       

                                                                    
                                       
                             
                                                                  
                                                                                

                                                           
                        
                                                                        
                                               
                                         
                                                           
                                                                           
                                                             
                                                                  
                                                   
                                                                             
                                                               
                                                                     
                                                       
                                                                          
                                                                               
                                                     
                                                       
                                                            
                                                            
                                                           
                                           
                                                                

;;;; Client

      
(defn- assert-send-args [x ?timeout-ms ?cb]
  (assert-event x)
  (assert (or (and (nil? ?timeout-ms) (nil? ?cb))
              (and (encore/nneg-int? ?timeout-ms)))
          (format "cb requires a timeout; timeout-ms should be a +ive integer: %s"
           ?timeout-ms))
  (assert (or (nil? ?cb) (ifn? ?cb) (chan? ?cb))
          (format "cb should be nil, an ifn, or a channel: %s" (type ?cb))))

      
(defn- pull-unused-cb-fn! [cbs-waiting cb-uuid]
  (when cb-uuid
    (first (swap! cbs-waiting
             (fn [[_ m]] (if-let [f (m cb-uuid)]
                          [f (dissoc m cb-uuid)]
                          [nil m]))))))

      
(defn- wrap-clj->edn-msg-with-?cb "clj -> [edn ?cb-uuid]"
  [cbs-waiting clj ?timeout-ms ?cb-fn]
  (let [?cb-uuid (when ?cb-fn (encore/uuid-str))
        msg      (if-not ?cb-uuid clj {:chsk/clj clj :chsk/cb-uuid ?cb-uuid})
        ;; Note that if pr-str throws, it'll throw before swap!ing cbs-waiting:
        edn     (pr-str msg)]
    (when ?cb-uuid
      (swap! cbs-waiting
             (fn [[_ m]] [nil (assoc m ?cb-uuid ?cb-fn)]))
      (when ?timeout-ms
        (go (<! (async/timeout ?timeout-ms))
            (when-let [cb-fn* (pull-unused-cb-fn! cbs-waiting ?cb-uuid)]
              (cb-fn* :chsk/timeout)))))
    [edn ?cb-uuid]))

      
(defprotocol IChSocket
  (chsk-type  [chsk] "Returns e/o #{:ws :ajax}.")
  (chsk-open? [chsk] "Returns true iff given channel socket connection seems open.")
  (chsk-send! [chsk ev] [chsk ev ?timeout-ms ?cb]
    "Sends `[ev-id ?ev-data :as event]` over channel socket connection and returns
     true iff send seems successful.")
  (chsk-make! [chsk opts] "Creates and returns a new channel socket connection,
                           or nil on failure."))

      
(defn- reset-chsk-state! [{:keys [chs open?] :as chsk} now-open?]
  (when (not= @open? now-open?)
    (reset! open? now-open?)
    (let [new-state (if now-open? :open :closed)]
      ;; (encore/debugf "Chsk state change: %s" new-state)
      (put! (:state chs) new-state)
      new-state)))

       ;; Experimental, undocumented:
(defn- wrap-cb-chan-as-fn [?cb ev]
  (if (or (nil? ?cb) (ifn? ?cb)) ?cb
    (do (assert (chan? ?cb))
        (assert-event ev)
        (let [[ev-id _] ev
              cb-ch ?cb]
          (fn [reply]
            (put! cb-ch [(keyword (str (encore/fq-name ev-id) ".cb"))
                         reply]))))))

      
(defn- receive-buffered-evs!
  [ch-recv clj] {:pre [(vector? clj)]}
  (let [buffered-evs clj]
    (doseq [ev buffered-evs]
      (assert-event ev)
      (put! ch-recv ev))))

       ;; Handles reconnects, keep-alives, callbacks:
(defrecord ChWebSocket [url chs open? socket-atom kalive-timer kalive-due?
                        cbs-waiting ; [dissoc'd-fn {<uuid> <fn> ...}]
                        ]
  IChSocket
  (chsk-type  [_] :ws)
  (chsk-open? [_] @open?)
  (chsk-send! [chsk ev] (chsk-send! chsk ev nil nil))
  (chsk-send! [chsk ev ?timeout-ms ?cb]
    ;; (encore/debugf "Chsk send: (%s) %s" (if ?cb "cb" "no cb") ev)
    (assert-send-args ev ?timeout-ms ?cb)
    (let [?cb-fn (wrap-cb-chan-as-fn ?cb ev)]
      (if-not @open? ; Definitely closed
        (do (encore/warnf "Chsk send against closed chsk.")
            (when ?cb-fn (?cb-fn :chsk/closed)))
        (let [[edn ?cb-uuid] (wrap-clj->edn-msg-with-?cb
                              cbs-waiting ev ?timeout-ms ?cb-fn)]
          (try
            (.send @socket-atom edn)
            (reset! kalive-due? false)
            :apparent-success
            (catch js/Error e
              (encore/errorf "Chsk send %s" e)
              (when ?cb-uuid
                (let [cb-fn* (or (pull-unused-cb-fn! cbs-waiting ?cb-uuid)
                                 ?cb-fn)]
                  (cb-fn* :chsk/error)))
              false))))))

  (chsk-make! [chsk {:keys [kalive-ms]}]
    (when-let [WebSocket (or (aget js/window "WebSocket")
                             (aget js/window "MozWebSocket"))]
      ((fn connect! [nattempt]
         (let [retry!
               (fn []
                 (let [nattempt* (inc nattempt)]
                   (.clearInterval js/window @kalive-timer)
                   (encore/warnf "Chsk is closed: will try reconnect (%s)."
                                 nattempt*)
                   (encore/set-exp-backoff-timeout!
                    (partial connect! nattempt*) nattempt*)))]

           (if-let [socket (try (WebSocket. url)
                                (catch js/Error e
                                  (encore/errorf "WebSocket js/Error: %s" e)
                                  false))]
             (->>
              (doto socket
                (aset "onerror"
                  (fn [ws-ev] (encore/errorf "WebSocket error: %s" ws-ev)))
                (aset "onmessage" ; Nb receives both push & cb evs!
                  (fn [ws-ev]
                    (let [edn (aget ws-ev "data")
                          ;; Nb may or may NOT satisfy `event?` since we also
                          ;; receive cb replies here!:
                          [clj ?cb-uuid] (unwrap-edn-msg-with-?cb->clj edn)]
                      ;; (assert-event clj) ;; NO!
                      (if (= clj [:chsk/handshake :ws])
                        (reset-chsk-state! chsk true)
                        (if ?cb-uuid
                          (if-let [cb-fn (pull-unused-cb-fn! cbs-waiting ?cb-uuid)]
                            (cb-fn clj)
                            (encore/warnf "Cb reply w/o local cb-fn: %s" clj))
                          (let [buffered-evs clj]
                            (receive-buffered-evs! (:recv chs) buffered-evs)))))))
                (aset "onopen"
                  (fn [_ws-ev]
                    (reset! kalive-timer
                      (.setInterval js/window
                        (fn []
                          (when @kalive-due? ; Don't ping unnecessarily
                            (chsk-send! chsk [:chsk/ping :ws]))
                          (reset! kalive-due? true))
                        kalive-ms))
                    ;; (reset-chsk-state! chsk true) ; NO, handshake better!
                    ))
                (aset "onclose" ; Fires repeatedly when server is down
                  (fn [_ws-ev] (retry!))))

            (reset! socket-atom))

             ;; Couldn't even get a socket:
             (retry!))))
       0)
      chsk)))

      
(defrecord ChAjaxSocket [url chs open? ajax-client-uuid
                         csrf-token has-uid?]
  IChSocket
  (chsk-type  [_] :ajax)
  (chsk-open? [chsk] @open?)
  (chsk-send! [chsk ev] (chsk-send! chsk ev nil nil))
  (chsk-send! [chsk ev ?timeout-ms ?cb]
    ;; (encore/debugf "Chsk send: (%s) %s" (if ?cb "cb" "no cb") ev)
    (assert-send-args ev ?timeout-ms ?cb)
    (let [?cb-fn (wrap-cb-chan-as-fn ?cb ev)]
      (if-not (or @open? (= ev [:chsk/handshake :ajax]))
        ;; Definitely closed
        (do (encore/warnf "Chsk send against closed chsk.")
            (when ?cb-fn (?cb-fn :chsk/closed)))
        (do
          (encore/ajax-lite url
           {:method :post :timeout ?timeout-ms
            :resp-type :text ; Prefer to do our own edn reading
            :params
            (let [dummy-cb? (not ?cb-fn)
                  msg       (if-not dummy-cb? ev {:chsk/clj       ev
                                                  :chsk/dummy-cb? true})
                  edn       (pr-str msg)]
              {:_ (encore/now-udt) ; Force uncached resp
               :edn edn :csrf-token csrf-token})}

           (fn ajax-cb [{:keys [content error]}]
             (if error
               (if (= error :timeout)
                 (when ?cb-fn (?cb-fn :chsk/timeout))
                 (do (reset-chsk-state! chsk false)
                     (when ?cb-fn (?cb-fn :chsk/error))))

               (let [resp-edn content
                     resp-clj (edn/read-string resp-edn)]
                 (if ?cb-fn (?cb-fn resp-clj)
                   (when (not= resp-clj :chsk/dummy-200)
                     (encore/warnf "Cb reply w/o local cb-fn: %s" resp-clj)))
                 (reset-chsk-state! chsk true)))))

          :apparent-success))))

  (chsk-make! [chsk {:keys [timeout]}]
    ;; As currently implemented (i.e. without server-side broadcast features),
    ;; there's no point in creating an Ajax poller if we're not logged in since
    ;; there'd be no way for the server to identify us when sending non-request
    ;; messages.
    (if-not has-uid?
      (reset-chsk-state! chsk true) ; Must still mark as open to enable sends
      ((fn async-poll-for-update! [nattempt]

         (let [retry!
               (fn []
                 (let [nattempt* (inc nattempt)]
                   (encore/warnf
                    "Chsk is closed: will try reconnect (%s)."
                    nattempt*)
                   (encore/set-exp-backoff-timeout!
                    (partial async-poll-for-update! nattempt*)
                    nattempt*)))

               ajax-req! ; Just for Pace wrapping below
               (fn []
                 (encore/ajax-lite url
                  {:method :get :timeout timeout
                   :resp-type :text ; Prefer to do our own edn reading
                   :params {:_ (encore/now-udt) ; Force uncached resp
                            :ajax-client-uuid ajax-client-uuid}}
                  (fn ajax-cb [{:keys [content error]}]
                    (if error
                      (if (= error :timeout)
                        (async-poll-for-update! 0)
                        (do (reset-chsk-state! chsk false)
                            (retry!)))

                      ;; The Ajax long-poller is used only for events, never cbs:
                      (let [edn          content
                            buffered-evs (edn/read-string edn)]
                        (receive-buffered-evs! (:recv chs) buffered-evs)
                        (reset-chsk-state! chsk true)
                        (async-poll-for-update! 0))))))]

           (if-let [pace (aget js/window "Pace")]
             ;; Assumes relevant extern is defined for :advanced mode compilation:
             (.ignore pace ajax-req!) ; Pace.js shouldn't trigger for long-polling
             (ajax-req!)))

         (when-not @open?
           ;; (encore/debugf "Attempting chsk Ajax handshake")
           ;; Try handshake to confirm working conn (will enable sends):
           (chsk-send! chsk [:chsk/handshake :ajax])))
       0))
    chsk))

      
(defn- chsk-url [path & [websocket?]]
  (let [{:keys [protocol host pathname]} (encore/get-window-location)]
    (str (if-not websocket? protocol (if (= protocol "https:") "wss:" "ws:"))
         "//" host (or path pathname))))

      
(defn make-channel-socket!
  "Returns `{:keys [chsk ch-recv send-fn]}` for a new ChWebSocket or ChAjaxSocket that
  provides an ISocket interface:
  * An efficient, convenient, high-performance client/server message API.
  * Both callback and channel (routing) style bidirectional support.
  * Encapsulation of all low-level nastiness like capability fallback,
    reconnects, keep-alives, error logging, etc.

  Note that the *same* URL is used for: WebSockets, POSTs, GETs. Server-side
  routes should be configured accordingly."
  [url &
   & [{:keys [csrf-token has-uid?
              type recv-buf-or-n ws-kalive-ms lp-timeout]
       :or   {type          :auto
              recv-buf-or-n (async/sliding-buffer 2048) ; Mostly for buffered-evs
              ws-kalive-ms  38000
              lp-timeout    38000}}
      _deprecated-more-opts]]

  (when (not (nil? _deprecated-more-opts))
    (encore/warnf
     "`make-channel-socket!` fn signature CHANGED with Sente v0.10.0."))

  (when (str/blank? csrf-token)
    (encore/warnf "No csrf-token provided"))

  (let [;; Want _separate_ buffers for state+recv even if we're later merging
        chs {:state    (chan (async/sliding-buffer 1))
             :recv     (chan recv-buf-or-n)
             :internal (chan recv-buf-or-n)}

        chsk
        (or
         (and (not= type :ajax)
              (chsk-make!
               (ChWebSocket. (chsk-url url :ws)
                chs (atom false) (atom nil) (atom nil) (atom true)
                (atom [nil {}]))
               {:kalive-ms ws-kalive-ms}))

         (and (not= type :ws)
              (let [;; Unchanging over multiple long-poll (re)connects:
                    ajax-client-uuid (encore/uuid-str)]
                (chsk-make!
                 (ChAjaxSocket. (chsk-url url) chs (atom false)
                   ajax-client-uuid csrf-token has-uid?)
                 {:timeout lp-timeout}))))

        type* (chsk-type chsk) ; Actual reified type
        ever-opened? (atom false)
        state*       (fn [clj] (if (or (not= clj :open) @ever-opened?) clj
                                  (do (reset! ever-opened? true) :first-open)))]

    (when chsk
      {:chsk chsk
       :send-fn (partial chsk-send! chsk)
       :ch-recv
       (async/merge
        [(->> (:internal chs) (async/map< (fn [ev] {:pre [(event? ev)]} ev)))
         (->> (:state chs) (async/map< (fn [clj] [:chsk/state [(state* clj) type*]])))
         (->> (:recv  chs) (async/map< (fn [ev]  [:chsk/recv  ev])))])})))

;;;; Routers

     
                                                    
                       
               
                               
            
                                                 
                                             
                                
                    
                                                           
                                                           
                                    
                                                                                          
                            
                                                                 
                 
                                          

      
(defn start-chsk-router-loop! [event-handler ch]
  (let [ctrl-ch (chan)]
    (go-loop []
      (let [[v p] (async/alts! [ch ctrl-ch])]
        (if (identical? p ctrl-ch) ::stop
          (let [[id data :as event] v]
            ;; Provide ch to handler to allow event injection back into loop:
            (event-handler event ch)  ; Allow errors to throw
            (recur)))))
    (fn stop! [] (async/close! ctrl-ch))))

;;;;;;;;;;;; This file autogenerated from src/taoensso/sente.cljx
