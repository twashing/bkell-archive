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
    - cannot update fields of another user

CRUD book(s) 

  book
    - 1 book can have many accounts 
    - 1 book should have only 1 journal 
    - only a group's users (incl. owner) can CRUD this data

CRUD journal 

  journal
    - each journal can have many entries 
    - only a group's users (incl. owner) can CRUD this data

CRUD account(s) 

  account
    - no duplicates
    - only a group's users (incl. owner) can CRUD this data

CRUD entry(s) 

  entry 
    - each entry must be balanced 
    - query within date ranges
    - only a group's users (incl. owner) can CRUD this data


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


- add date field to entry 
- make counterWeight a field of accountType (not separate)
