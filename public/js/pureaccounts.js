
accountsData = {
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
	 "counterWeight":"credit"} , 
	
	{"tag":"account",
	 "type":"revenue",
	 "id":"revenue",
	 "name":"revenue",
	 "counterWeight":"debit"} , 
	
	{"tag":"account",
	 "type":"expense",
	 "id":"expense",
	 "name":"expense",
	 "counterWeight":"credit"}
  ]
}

accountsDirective = { 
  
  "tbody tr" : { 
    "each<-puredata" : {
      "a.editaccount@href" : function(arg) {
        return "/accounts/account/"+ arg.each.item.id; 
      },
      "td.name" : "each.name", 
      "td.type" : "each.type", 
      "td.weight" : "each.counterWeight"
    }
  }

}

