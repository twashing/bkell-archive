(ns bkell.stripe
  (:require [clj-stripe.util :as util]
      [clj-stripe.common :as common]
      [clj-stripe.plans :as plans]
      [clj-stripe.coupons :as coupons]
      [clj-stripe.charges :as charges]
      [clj-stripe.cards :as cards]
      [clj-stripe.subscriptions :as subscriptions]
      [clj-stripe.customers :as customers]
      [clj-stripe.invoices :as invoices]
      [clj-stripe.invoiceitems :as invoiceitems]
      [bkell.bkell :as bkell]))

(def secret-key (-> (:mode @bkell/shell) (@bkell/shell) :secret-key))

(def plans {:basic "basic" :productivity "productivity" :enterprise "enterprise"})


;; Initial Setup for creating plans with stripe. A trial plan is not
;; included as a user will need to provide card details inorder to
;; register with any of the plans.
(defn setup-plans []
  (common/with-token secret-key
    ;(common/execute (plans/create-plan "plan1" (common/money-quantity 0 "usd") (plans/monthly) "Trial"))
    (common/execute (plans/create-plan (:basic plans) (common/money-quantity 9 "usd") (plans/monthly) "Basic"))
    (common/execute (plans/create-plan (:productivity plans) (common/money-quantity 20 "usd") (plans/monthly) "Productivity"))
    (common/execute (plans/create-plan (:enterprise plans) (common/money-quantity 50 "usd") (plans/monthly) "Enterprise"))))

;; Setup a new customer with a specific plan. This will not be used for a
;; setting up the customer with a trial plan.
;; Returns a customer id uniquely identifying the customer.
(defn create-customer [card-token customer-email plan]
  (common/with-token secret-key
    (common/execute (customers/create-customer (common/card card-token)
                                               (customers/email customer-email) (common/plan plan)))))

;; Get the plan to which the cutomer is subscribed.
(defn get-plan [customer-id]
  (common/with-token secret-key
    (common/execute (invoices/get-upcoming-invoice (common/customer customer-id)))))

;;Change the plan for a given customer
(defn change-plan [customer-id plan]
  (common/with-token secret-key
    (common/execute (subscriptions/subscribe-customer (common/plan plan) (common/customer customer-id) (subscriptions/do-not-prorate)))))

;; Unsubscribe an customer
(defn unsubscribe [customer-id]
  (common/with-token secret-key
    (common/execute (subscriptions/unsubscribe-customer (common/customer customer-id) (subscriptions/immediately)))))


;; Delete a customer
(defn delete-customer [customer-id]
  (common/with-token secret-key
    (common/execute (customers/delete-customer customer-id))))









