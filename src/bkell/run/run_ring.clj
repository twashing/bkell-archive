(ns bkell.run.run-ring
  (:require [noir.server :as server]
            [bkell.bjell :as bjell]
            [bkell.bkell :as bkell]
  ))


(server/load-views "src/bkell/http/") 

(defn -main [& m]
  (let[ config (load-file "etc/config/config.clj")
        mode (keyword (get (System/getenv) "MODE" "dev"))
        host-port (or (-> config mode :host-port)
                      (get (System/getenv) "PORT" "8080"))
      ]
    
    
    (println (str "Initializing shell with mode: " mode))
    
    ;; ====
    ;; Initialize the shell incl. DB connection 
    (bjell/init-shell mode)
    
    
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

