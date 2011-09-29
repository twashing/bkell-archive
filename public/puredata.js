
pd = {
  puredata : [
	
	{"tag":"account",
	 "type":"asset",
	 "id":"cash",
	 "name":"cash",
	 "counterWeight":"debit"} , 
	
	{"tag":"account",
	 "type":"liability",
	 "id":"accounts payable",
	 "name":"accounts payable",
	 "counterWeight":"debit"} , 
	
	{"tag":"account",
	 "type":"revenue",
	 "id":"revenue",
	 "name":"revenue",
	 "counterWeight":"debit"} , 
	
	{"tag":"account",
	 "type":"expense",
	 "id":"expense",
	 "name":"expense",
	 "counterWeight":"debit"}
	
  ]
}

directive = { 
  
  "tbody tr" : { 
    "each<-puredata" : {
      "td.name" : "each.name", 
      "td.type" : "each.type", 
      "td.weight" : "each.counterWeight"
    }
  }

}

