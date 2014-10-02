(ns bkell.bkell
  (:require [taoensso.timbre :as timbre]
            [clojure.tools.namespace.repl :refer (refresh)]
            [adi.core :as adi]
            [adi.schema :as as]
            [adi.utils :refer [iid ?q]]
            [hara.component :as hco]
            [missing-utils.core :as mu]

            [bkell.config :as config]
            [bkell.component.bkell :as cb]
            [bkell.component.spittoon :as cs]))


;; Bkell Log config
(timbre/set-config! [:shared-appender-config :spit-filename] "logs/bkell.log")
(timbre/set-config! [:appenders :spit :enabled?] true)


;; Bkell State
(def ^{:doc "Bkell's component system map"} system (atom nil))


(def topology {:bkell    [cb/map->Bkell :spittoon]
               :spittoon [cs/map->Spittoon]})

(def config   {:bkell {}
               :spittoon {}})

(defn start []
  (reset! system (hco/start (hco/system topology config))))

(defn stop []
  (hco/stop @system))

(defn reset []
  (stop)
  (refresh :after 'bkell.bkell/start))


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



(comment

  (start)
  (reset)
  ;; retrieve stuff
  (adi/select (-> @system :spittoon :db)
              {:system {:currencies {:id '_}}}
              :view #{:system/currencies})

  (adi/select (-> @system :spittoon :db)
              {:system {:countries {:id '_}}}
              :view #{:system/countries} :hide-ids)

  (adi/select (-> @system :spittoon :db)
              {:system {:groups {:name '_}}}
              :view #{:system/groups} :hide-ids)

  (adi/select (-> @system :spittoon :db)
              {:system {:groups {:name '_}}}
              :view #{:system/currencies :system/countries :system/groups} :hide-ids)

  (adi/select (-> @system :spittoon :db)
              {:system {:groups {:name '_}}}
              :view #{:system/currencies :system/countries :system/groups} :hide-ids)

  (adi/select (-> @system :spittoon :db) :group
              :view #{:group/users})
  (comment ({:db {:id 17592186045432}, :group {:name "webkell",
                                               :users #{{:+ {:db {:id 17592186045431}},
                                                         :email "webkell",
                                                         :firstname "webkell",
                                                         :password "default",
                                                         :lastname "webkell",
                                                         :username "webkell"}}}}))


  (adi/select (-> @system :spittoon :db) :group
              :view {:group/books :follow
                     :books/accounts :follow})
  ({:db {:id 17592186045432},
    :group {:books #{{:+ {:db {:id 17592186045455}},
                      :accounts #{{:+ {:db {:id 17592186045427}},
                                   :name "expense", :counterWeight
                                   :account.counterWeight/debit,
                                   :type :account.type/expense}
                                  {:+ {:db {:id 17592186045430}}, :name "debt",
                                   :counterWeight :account.counterWeight/credit,
                                   :type :account.type/liability}
                                  {:+ {:db {:id 17592186045428}}, :name "revenue",
                                   :counterWeight :account.counterWeight/credit,
                                   :type :account.type/revenue}
                                  {:+ {:db {:id 17592186045429}}, :name "cash",
                                   :counterWeight :account.counterWeight/debit,
                                   :type :account.type/asset}}}}, :name "webkell"}})

  (adi/select (-> @system :spittoon :db) :group
              :view {:group/books :follow
                     :books/journals :follow
                     :journal/entries :follow})
  ({:db {:id 17592186045432},
    :group {:books #{{:+ {:db {:id 17592186045455}},
                      :journals #{{:+ {:db {:id 17592186045426}},
                                   :name "generalledger"}}}},
            :name "webkell"}})


  (adi/insert! (-> @system :spittoon :db)
               {:entry {:currency 17592186045456}})

  (first)
  (adi/select (-> @system :spittoon :db) :currency/id)
  (adi/select (-> @system :spittoon :db) {:currency/id "EUR"})
  (adi/select (-> @system :spittoon :db) {:currency/id '(.startsWith ? "C")})

  ;;{:db {:id 17592186045449}, :currency {:id "EUR", :name "European Euro"}}


  ;;=> ({:db {:id 17592186045432}, :group {:name "webkell"}})

  ;; create in

  ;; update

  ;; retract

  ;; delete


)
