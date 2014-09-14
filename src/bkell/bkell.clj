(ns bkell.bkell
  (:require [taoensso.timbre :as timbre]
            [clojure.tools.namespace.repl :refer (refresh refresh-all)]
            [com.stuartsierra.component :as component]
            [missing-utils.core :as mu]
            [adi.utils :refer [iid ?q]]

            [bkell.config :as config]
            [bkell.component.bkell :as cb]))

;; Bkell Log config
(timbre/set-config! [:shared-appender-config :spit-filename] "logs/bkell.log")
(timbre/set-config! [:appenders :spit :enabled?] true)

;; Bkell State
(def ^{:doc "Run Mode of the current system (:test :development :production)"} mode)
(def ^{:doc "Configured environment"} env nil)
(def ^{:doc "Bkell's component system map"} system nil)


;; ====
#_(def system nil)

#_(defn init
  "Constructs the current development system."
  []
  (alter-var-root #'system
                  (constantly (new-system))))
;; ====


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


(defn ^{:doc "Start the Bookkeeping Shell"}
  start []
  (if-not system
    (init))
  (alter-var-root #'system component/start))


(defn ^{:doc "Stop the Bookkeeping Shell"}
  stop []
  (alter-var-root #'system
                  (fn [s] (when s (component/stop s)))))

(defn go
  "Initializes the current development system and starts it running."
  []
  (init)
  (start))

(defn ^{:doc "Reset the mrservice system"}
  reset []
  (stop)
  (refresh :after 'bkell.shell/go))

(defn ^{:doc "This help function"}
  help []
  (let [shell-members (mu/fns-in-ns 'bkell.bkell)
        extract-doc-fn (fn [msym]
                         (str msym
                              ": "
                              (:doc (meta (ns-resolve 'bkell.bkell msym)))
                              (with-out-str (newline))))]

    (apply println
           (concat ["Bookkeeping Shell"
                    (with-out-str (newline))
                    (with-out-str (newline))]
                   (map extract-doc-fn shell-members)))))

(defn ^{:doc "Reloads project configuration and libraries"} reload-project [] (reload-project))
