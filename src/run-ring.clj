(use 'http.handler :reload)
(require '(ring.util [serve :as ring]))
(ring/serve-headless http.handler/app)

#_(use 'ring.adapter.jetty)
#_(use 'http.handler)
#_(run-jetty http.handler/app {:port 3000}) 

