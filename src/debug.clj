;; Slightly enhanced version of Alex Osborne's debug-repl (http://gist.github.com/252421)
;; Typing () quits the debug REPL, making it possible to continue without terminating the
;; input stream by typing Ctrl-D.

;; Inspired by George Jahad's version: http://georgejahad.com/clojure/debug-repl.html

(ns debug
  [:require clojure.main])

(defmacro local-bindings
  "Produces a map of the names of local bindings to their values."
  []
  (let [symbols (map key @clojure.lang.Compiler/LOCAL_ENV)]
    (zipmap (map (fn [sym] `(quote ~sym)) symbols) symbols)))

(declare *locals*)
(defn eval-with-locals
  "Evals a form with given locals.  The locals should be a map of symbols to
  values."
  [locals form]
  (binding [*locals* locals]
    (eval
     `(let ~(vec (mapcat #(list % `(*locals* '~%)) (keys locals)))
        ~form))))

(defn dr-read
  [request-prompt request-exit]
  (let [input (clojure.main/repl-read request-prompt request-exit)]
    (if (= input '())
      request-exit
      input)))

(defmacro debug-repl
  "Starts a REPL with the local bindings available."
  []
  `(clojure.main/repl
    :prompt #(print "dr => ")
    :eval (partial eval-with-locals (local-bindings))
    :read dr-read))

(comment
  ;;
  ;; Some examples
  ;;

  (let [c 1
        locals (local-bindings)
        d 2]
    locals)
  ;; => {fn__5310 #<user$eval__5309 user$eval__5309@1a65a18>, c 1}

  (let [c 1
        d 2]
    (defn a [b c]
      (debug-repl)
      d))
  (a "foo" "bar")
  ;; dr => c
  ;; "bar"
  ;; dr => d
  ;; 2
  ;; dr => *locals*
  ;; {fn__20 #<user$eval__19 user$eval__19@955cd5>,
  ;;  c "bar",
  ;;  d 2,
  ;;  fn__22 #<user$eval__19$a__21 user$eval__19$a__21@59fb21>,
  ;;  b "foo"}
  )

