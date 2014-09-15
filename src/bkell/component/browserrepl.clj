(ns bkell.component.browserrepl
  (:require [hara.component :as hco]
            [taoensso.timbre :as timbre]
            [cemerick.austin.repls]
            [bkell.http.handler :as handler]))


(defn create-repl-env [host]
  (reset! cemerick.austin.repls/browser-repl-env (cemerick.austin/repl-env :host host)) )

(defrecord BrowserRepl [env]
  hco/IComponent

  (-start [br]

    (timbre/debug "BrowserRepl.start CALLED > br[" br "]")
    (if-not (:repl-env br)
      (assoc br :repl-env (create-repl-env (:host env)))
      br))

  (-stop [br]

    (timbre/trace "BrowserRepl.stop CALLED")
    (dissoc br :repl-env)))
