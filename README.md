## Abstract
The _**bkell**_ project is a Clojure implementation of 'Bookkeeping'. _**bkell**_ provides a Shell and API for maintaining balanced records for business transactions.


##Tooling

If you haven't already, you'll need to install these tools:


**git** _http://git-scm.com_

**leiningen** _https://github.com/technomancy/leiningen_

**compass** _http://compass-style.org_
  * install the compass plugins found in the below config file
  * compass configuration is already in _bkell/public/config.rb_
  * from _bkell/public/_ , execute `compass watch`

**guard** _https://github.com/guard/guard_
  * with plugins for HAML _https://github.com/manufaktor/guard-haml_ and Coffeescript _https://github.com/guard/guard-coffeescript_
  * guard configuration is already in _bkell/public/Guardfile_
  * from _bkell/public/_ , execute with `guard`


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
  => (require 'bkell.run.run-bkell)
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
  => (bkell.run.run-ring/main)
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


## License

Copyright © 2014 Interrupt Software Inc.

Distributed under the Eclipse Public License either version 1.0 or (at
your option) any later version.

