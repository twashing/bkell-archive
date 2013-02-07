{:tag :system,
 :attrs
 {:xmlns "com/interrupt/bookkeeping",
  :xmlns:users "com/interrupt/bookkeeping/users",
  :xmlns:bkell "com/interrupt/bookkeeping/cc/bkell",
  :xmlns:command "com/interrupt/bookkeeping/cc/bkell/command",
  :xmlns:interpret "com/interrupt/bookkeeping/interpret",
  :xmlns:aauth "com/interrupt/bookkeeping/cc/bkell/aauth",
  :id "main.system"},
 :content
 [{:tag :aauth:aauthentication,
   :attrs {:id "main.authentication", :sessiontimeout "6000"},
   :content
   [{:tag :users:groups,
     :attrs {:id "aauth.groups"},
     :content
     [{:tag :users:group,
       :attrs {:id "webkell", :name "Webkell", :owner "root"},
       :content
       [{:tag :users:user, :attrs {:id "root"}, :content nil}]}]}
    {:tag :users:users,
     :attrs {:id "aauth.users"},
     :content
     [{:tag :users:user,
       :attrs
       {:id "root",
        :username "root",
        :password "password",
        :logintimeout "600000",
        :accountLevel "FREE",
        :defaultGroup "webkell",
        :authenticated ""},
       :content
       [{:tag :users:userSession,
         :attrs {:id "", :groupid "", :userid ""},
         :content
         [{:tag :aauth:aauthentication, :attrs nil, :content nil}]}
        {:tag :aauth:allowedActions,
         :attrs {:id "root.allowedActions"},
         :content
         [{:tag :command:command,
           :attrs {:id "command.create", :name "create"},
           :content nil}
          {:tag :command:command,
           :attrs {:id "command.add", :name "add"},
           :content nil}
          {:tag :command:command,
           :attrs {:id "command.remove", :name "remove"},
           :content nil}
          {:tag :command:command,
           :attrs {:id "command.reverse", :name "reverse"},
           :content nil}
          {:tag :command:command,
           :attrs {:id "command.find", :name "find"},
           :content nil}
          {:tag :command:command,
           :attrs {:id "command.load", :name "load"},
           :content nil}
          {:tag :command:command,
           :attrs {:id "command.list", :name "list"},
           :content nil}
          {:tag :command:command,
           :attrs {:id "command.print", :name "print"},
           :content nil}
          {:tag :command:command,
           :attrs {:id "command.commit", :name "commit"},
           :content nil}
          {:tag :command:command,
           :attrs {:id "command.login", :name "login"},
           :content nil}
          {:tag :command:command,
           :attrs {:id "command.logout", :name "logout"},
           :content nil}
          {:tag :command:command,
           :attrs {:id "command.exit", :name "exit"},
           :content nil}]}
        {:tag :users:profileDetails,
         :attrs {:id "user.details"},
         :content
         [{:tag :users:profileDetail,
           :attrs {:id "first.name", :name "first.name", :value ""},
           :content nil}
          {:tag :users:profileDetail,
           :attrs {:id "last.name", :name "last.name", :value ""},
           :content nil}
          {:tag :users:profileDetail,
           :attrs {:id "name", :name "email", :value ""},
           :content nil}
          {:tag :users:profileDetail,
           :attrs {:id "country", :name "country", :value ""},
           :content nil}]}]}]}]}]}
