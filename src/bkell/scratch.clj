(ns bkell.scratch
  (:require [bkell.spittoon :refer :all]
            [bkell.init :as init]
            [bkell.domain.books :as books]
            [bkell.domain.accounts :as accounts]
            [bkell.domain.journals :as journals]))


#_(defn refresh []

  (database-delete url)
  (database-create url)
  (alter-var-root conn (fn [inp] (database-connect url)))
  (database-schema-create conn)


  (init/init-default conn)


  (def gresults (init/init-default-group conn))


  ;; create accounts
  (def aresults (accounts/create-default-accounts conn))


  ;; create journal(s)
  (def jresults (journals/create-journal conn "generalledger"))


  ;; create books
  (def bresults (books/create-books conn group-ref aresults jresults))

)
