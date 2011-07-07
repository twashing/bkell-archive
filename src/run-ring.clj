(use 'ring.adapter.jetty)
(use 'http.handler)
(run-jetty http.handler/app {:port 3000})

