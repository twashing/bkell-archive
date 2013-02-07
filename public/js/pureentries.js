
entryData = {
  pureentries : [
		
	{"tag":"entry",
	 "id":"entry1",
	 "date":"03\/22\/2011",
	 "content":
	 [{"tag":"debit", "id":"dtS", "amount":120.0, "accountid":"cash"},
	  {"tag":"credit",
	   "id":"crS",
	   "amount":120.0,
	   "accountid":"accounts payable"}]}, 
	
	{"tag":"entry",
	 "id":"entry2",
	 "date":"03\/23\/2011",
	 "content":
	 [{"tag":"debit", "id":"dtS", "amount":120.0, "accountid":"cash"},
	  {"tag":"credit",
	   "id":"crS",
	   "amount":120.0,
	   "accountid":"accounts payable"}]}, 
	
  ]
}

entryDirective = { 
  
  "tbody tr" : { 
    "each<-pureentries" : {
      "a.editentry@href" : function(arg) {
        return "/entries/entry/"+ arg.each.item.id; 
      },
      "td.date" : "each.date", 
      "td.name" : "each.id", 
      "td.balance" : ""
    }
  }

}


