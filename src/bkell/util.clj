(ns bkell.util
  (:require [swank.core]
            [swank.core.connection])
)


;; Inspired by Shantanu Kumar's util functions - https://bitbucket.org/kumarshantanu/clj-miscutil/src/acfb97c662d9/src/main/clj/org/bituf/clj_miscutil.clj
(defn illegal-arg
  "Throw IllegalArgumentException with specified arguments. Use this when you
   encounter bad/invalid parameters."
  [reason] 
    (throw (IllegalArgumentException. reason )))


(defmacro verify-arg
  "Like assert, except for the following differences:
  1. does not check for *assert* flag
  2. throws IllegalArgumentException"
  [arg reason]
  `(if ~arg 
      true
     (illegal-arg '~reason)))

;;(verify-arg false "fubar")


;; doing this to avoid a 'Cyclic load dependency' Exception 
(defn get-bkell[]
  (->> "shell" symbol (ns-resolve (symbol "bkell") ))
)


(defn generate-error-response [ msg ]
  (merge { :tag :error } { :message msg }))
(defn generate-error-responses [ & msgs ]
  { :tag :errors 
    :content  (reduce #(conj %1 (generate-error-response %2))
                [] msgs)
  }
)

(defn wrap-error [err status]
  
  (let [stat (if (-> status nil? not) status 400)]
    { :status stat :headers { "Content-Type" "application/json" } :body err })
)
(defn wrap-error-msg [msg status]
  (wrap-error (generate-error-response msg) status))

(def swank-con swank.core.connection/*current-connection*)
(defmacro break []
  `(binding [swank.core.connection/*current-connection* swank-con]
     (swank.core/break)))
