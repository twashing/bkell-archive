TODO - test.check generators for 

CRUD group(s) 

  group 
    - can only have 1 owner 
    - can have many users
    - can have many books 

CRUD user(s) 

  user 
    - belongs to at least 1 group 
    - can belong to many groups 
    - must own at least one group 

CRUD book(s) 

  book
    - 1 book can have many accounts 
    - 1 book should have only 1 journal 

CRUD journal 

  journal
    - each journal can have many entries 

CRUD account(s) 

  account
    - no duplicates

CRUD entry(s) 

  entry 
    - each entry must be balanced 
    - query within date ranges


TODO - build UI

 - session management
 - responsive layout
 - mozilla identity (user management)
 - foundation ui (maybe polymer (polymer-project.org))
     - home screen 
     - landing screen 
 
 - left pane hiding 
 - vertical tabs
 - integrate stripe paywall
         
 - multiple clients 
 - om / handler (crud A & E) 
 - templating 
 - routing 
