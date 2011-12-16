(use 'http.handler :reload)
(require '(ring.util [serve :as ring]))

(ring/serve-headless http.handler/app)

