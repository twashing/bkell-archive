
(load "bkell")
(require 'bkell)
(require 'somnium.congomongo) 
(somnium.congomongo/mongo! :db "bkell") 

(bkell/init-shell) 
(bkell/-main)

