(ns spittoon

"Spittoon is functionality to convert (CRUD) calls between 
    1. absolute XML path, to 
    2. a mapped XML path 


MAPPINGS 
/system.main.system/aauthentication.main.aauthentication/groups.aauth.groups/group.* 
/system.main.system/aauthentication.main.aauthentication/users.aauth.users/user.* 
/system.main.system/groups.main.groups/group.* 


CREATE - will create the node in the mapped path 
RETREVE - will retrieve the node from the mapped path 
UPDATE - will update the node at the mapped path 
DELETE - will delete the node from the mapped path 


For some examples, the absolute XML path A) will be mapped to a relative path B) 

A) /system.main.system/aauthentication.main.aauthentication/groups.aauth.groups/group.webkell/user.root
B) /system.main.system/aauthentication.main.aauthentication/groups.aauth.groups/<group.webkell>
        doc & path ->   group.webkell/user.root


A) /system.main.system/aauthentication.main.aauthentication/users.aauth.users/user.root/profileDetails.user.details
B) /system.main.system/aauthentication.main.aauthentication/users.aauth.users/<user.root>
        doc & path ->   user.root/profileDetails.user.details


A) /system.main.system/groups.main.groups/group.webkell/bookkeeping.main.bookkeeping/journals.main.journals/journal.generalledger/entries.main.entries/entry.qwertySTUB
B) /system.main.system/groups.main.groups/<group.webkell>
        doc & path ->   group.webkell/bookkeeping.main.bookkeeping/journals.main.journals/journal.generalledger/entries.main.entries/entry.qwertySTUB

"


)

