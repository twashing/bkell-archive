(ns bkell.core
  (:require [clojure.browser.repl :as repl]))

(enable-console-print!)
(println "bkell.core UP")

(repl/connect "http://172.28.128.5:41936/432/repl/start")
;;(repl/connect "http://<host>:<port>/432/repl/start")
