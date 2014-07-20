(ns bkell.component.browserrepl
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]

            [bkell.http.handler :as handler]))


(defn create-repl-env [host]
  (reset! cemerick.austin.repls/browser-repl-env (cemerick.austin/repl-env :host host)) )

(defrecord BrowserRepl [env]
  component/Lifecycle

  (start [component]

    (timbre/trace "BrowserRepl.start CALLED / env[" (keys env) "] / component[" (keys component) "]")

    (if-not (:repl-env component)
      (assoc component :repl-env (create-repl-env (:host env)))
      component))

  (stop [component]

    (timbre/trace "BrowserRepl.stop CALLED")
    (dissoc component :repl-env)))


(defn component-browserrepl [env]
    (map->BrowserRepl {:env env}))
