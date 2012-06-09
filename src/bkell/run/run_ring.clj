(ns bkell.run.run-ring
  (:require [noir.server :as server]
            [bkell.bjell :as bjell]
            [bkell.bkell :as bkell]
  ))


(server/load-views "src/bkell/http/") 

(defn -main [& m]
  (let[ mode (keyword (or (first m) :dev))
        config (load-file "etc/config/config.clj")
        host-port (or (-> config mode :host-port)
                      (get (System/getenv) "PORT" "8080"))
      ]
    
    ;; ====
    ;; Initialize the shell incl. DB connection 
    (bjell/init-shell)
    
    
    ;; ==== 
    ;; Setting the mode in the shell 
    (dosync 
      (alter bkell/shell conj { :mode mode })
      (alter bkell/shell conj config)
    )
    
    (println (str "Bkell: " @bkell/shell))
    
    ;; ====
    ;; Startup the Noir server (wraps Jetty)
    (server/start (Integer. host-port) {  :mode mode :ns 'bkell  })
    
  ))

