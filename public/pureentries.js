
pd = {
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

directive = { 
  
  "tbody tr" : { 
    "each<-pureentries" : {
      "td.date" : "each.date", 
      "td.name" : "each.id", 
      "td.balance" : ""
    }
  }

}


