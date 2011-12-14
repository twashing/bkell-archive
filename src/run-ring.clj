(use 'http.handler :reload)
(use 'ring.util.serve)

(serve http.handler/app)
