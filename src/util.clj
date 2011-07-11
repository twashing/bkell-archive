(ns util )


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


