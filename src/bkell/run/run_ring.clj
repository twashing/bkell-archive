(ns bkell.run.run-ring
  (:require [noir.server :as server]))

(server/load-views "src/bkell/http/") 

(defn -main [& m]
  (let[ mode (keyword (or (first m) :dev))
        config (load-file "etc/config/config.clj")
        host-port (or (-> config mode :host-port)
                      (get (System/getenv) "PORT" "8080"))
      ]
    (server/start (Integer. host-port) {  :mode mode
                                          :ns 'bkell  })))

