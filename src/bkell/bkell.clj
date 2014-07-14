(ns bkell.bkell
  (:require [taoensso.timbre :as timbre]))

;; Mrservice Log config
(timbre/set-config! [:shared-appender-config :spit-filename] "logs/bkell.log")
(timbre/set-config! [:appenders :spit :enabled?] true)

(defn init [env-key])

(defn start [])
(defn stop [])
