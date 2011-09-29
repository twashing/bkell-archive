
pd = {
	"tag":"entry",
	 "id":"entry1",
	 "date":"03\/22\/2011",
	 "content":
	 [{"tag":"debit", "id":"dtS", "amount":120.0, "accountid":"cash"},
	  {"tag":"credit",
	   "id":"crS",
	   "amount":120.0,
	   "accountid":"accounts payable"}] 
}

function determineAccountDtCt(arg, weight) { return _determineCommon(arg, weight, "accountid"); }
function determineAmountDtCt(arg, weight) { return _determineCommon(arg, weight, "amount"); }
function _determineCommon(arg, weight, attribute) { 
  
  if(arg["tag"] == weight) { 
    return arg[attribute]
  }
  return "&nbsp;";
}
directive = { 
  
  "tbody tr" : { 
    "each<-content" : {
      "td.debitAccount" : function(arg) { 
        return determineAccountDtCt(this, "debit"); 
      },
      "td.debitAmount" : function(arg) { 
        return determineAmountDtCt(this, "debit"); 
      },
      "td.creditAccount" : function(arg) { 
        return determineAccountDtCt(this, "credit"); 
      },
      "td.creditAmount" : function(arg) { 
        return determineAmountDtCt(this, "credit"); 
      }
    }
  }
}


