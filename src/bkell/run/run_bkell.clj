(ns bkell.run)

(load "bkell")
(require 'bkell)
#_(require 'somnium.congomongo) 
#_(somnium.congomongo/mongo! :db "bkell") 

(bkell/init-shell) 
(bkell/-main)

