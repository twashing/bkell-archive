(ns bkell.bkell
  (:require [taoensso.timbre :as timbre]
            [bkell.config :as config]
            [bkell.component.bkell :as cb]))

;; Mrservice Log config
(timbre/set-config! [:shared-appender-config :spit-filename] "logs/bkell.log")
(timbre/set-config! [:appenders :spit :enabled?] true)


(defn ^{:doc "Initialize the bkeeping system"}
  init
  ([] (init :test))
  ([env-key]

     (let [rconfig (config/get-config-raw)

           mode (:mode rconfig)
           project-config (config/get-project-config mode rconfig)
           loaded-system (fn [x] (cb/component-bkell project-config))]

       (timbre/debug "INIT - project-config[" project-config "]")
       (timbre/debug "INIT - loaded-system[" loaded-system "]")
       (alter-var-root #'env project-config)
       (alter-var-root #'system loaded-system))))


(defn start [])
(defn stop [])
