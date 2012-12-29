
## Abstract
The _**bkell**_ project is a Clojure implementation of 'Bookkeeping'. _**bkell**_ provides a Shell and API for maintaining balanced records for business transactions. 


##Tooling 

If you haven't already, you'll need to install these tools:


**git** [http://git-scm.com]

**leiningen** [https://github.com/technomancy/leiningen]

**compass** [http://compass-style.org]
  compass configuration is already in _bkell/public/config.rb_
  from _bkell/public/_ , execute `compass watch`

**guard** [https://github.com/guard/guard]
  with plugins for HAML [github.com/manufaktor/guard-haml] and Coffeescript [github.com/guard/guard-coffeescript] 
  guard configuration is already in _bkell/public/Guardfile_
  from _bkell/public/_ , execute with `guard` 


## Download
```
$ git clone 'https://github.com/twashing/bkell.git' 
```

## Database 

_**bkell**_ requires a MongoDB to be installed, minimum version (db version v2.0.5).

Start MongoDB with command 
````
$ sudo mongod --dbpath /data/db
```

Initialize (populate) database. _This is only needed when first installing the app_
````
$ lein repl
  => (require '[init.database :as db])
  => (db/setup)
````


## Run

Run the shell 
````
$ lein repl
  => (require 'bkell.run.run-bkell)
````

Run the webapp
````
$ lein repl
  => (require 'bkell.run.run-ring)
  => (bkell.run.run-ring/-main)
````

Then in your browser, go to _localhost:8080_


## Tests
````
lein test - runs all tests
lein test <namespace/mytest> - runs a particular test
````

## Bkell Usage 
````
bkell=> (add { :tag :user :username "twashing" :password "password"})
{:username "twashing", :password "5f4dcc3b5aa765d61d8327deb882cf99", :tag :user, :_id #<ObjectId 4ed71101d36d156209ab8c83>}
bkell=> 
bkell=> 
bkell=> (login {:username "twashing", :password "5f4dcc3b5aa765d61d8327deb882cf99", :tag :user})
{:previous {:username "twashing", :password "<...>", :tag :user}, :logged-in-user {:username "twashing", :password "5f4dcc3b5aa765d61d8327deb882cf99", :tag :user}, :active true}
bkell=>
````



