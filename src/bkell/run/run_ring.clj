(ns bkell.run.run-ring
  (:require [noir.server :as server]))

#_(server/load-views "src/bkell/http/views/") 
(server/load-views "src/bkell/http/") 

(defn -main [& m]
  (let [mode (keyword (or (first m) :dev))
        port (Integer. (get (System/getenv) "PORT" "8080"))]
    (server/start port {:mode mode
                        :ns 'bkell})))

