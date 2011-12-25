
## Abstract
The bkell project is a Clojure implementation of 'Bookkeeping'. 'Bookkeeping' provides a Shell and API for maintaining balanced records for business transactions. 


## Download
```
git clone 'https://github.com/twashing/bkell.git' 
```

## Database 
bkell requires a MongoDB to be installed

## Run
````
$ lein repl
user=> 
user=> (load "run-bkell")
````

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

