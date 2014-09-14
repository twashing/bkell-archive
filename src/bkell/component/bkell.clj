(ns bkell.component.bkell
  (:require [com.stuartsierra.component :as component]
            [taoensso.timbre :as timbre]

            [bkell.component.browserrepl :as cb]
            [bkell.component.httphandler :as ch]
            [bkell.component.webrunner :as cw]
            [bkell.component.spittoon :as cs]))


(def system-components [:spittoon] #_[:browserrepl :httphandler :webrunner])

(defrecord Bkell [env]
  component/Lifecycle

  (start [this]

    (timbre/trace "Bkell.start CALLED > system[" this "] / env[" env "]")
    (component/start-system this system-components))

  (stop [this]

    (timbre/trace "Bkell.stop CALLED")
    (component/stop-system this system-components)))

(defn component-bkell [env]

  (component/system-map :bkell :fubar)

  #_(component/system-map
   #_:browserrepl #_(component/using
                 (cb/component-browserrepl env)
                 {})
   #_:httphandler #_(component/using
                 (ch/component-httphandler env)
                 {:browserrepl :browserrepl})
   #_:webrunner #_(component/using
               (cw/component-webrunner env)
               {:httphandler :httphandler})
   :spittoon (component/using
              (cs/component-spittoon env)
              {})
   :bkell (component/using
           (map->Bkell {:env env})
           {:spittoon :spittoon}
           #_{:browserrepl :browserrepl
              :httphandler :httphandler
              :webrunner :webrunner})))
