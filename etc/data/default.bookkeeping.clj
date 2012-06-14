{ :tag :bookkeeping
  :id "main-bookkeeping"
  :owner "" 
  :content
    [
  { :tag :accounts 
    :id "main.accounts" 
    :content 
    [{
       :counterWeight "debit"
       :name "cash"
       :type "asset"
       :id "cash"
       :tag "account"
     }
     {
       :counterWeight "credit"
       :name "expense"
       :type "expense"
       :id "expense"
       :tag "account"
     }
     {
       :counterWeight "debit"
       :name "revenue"
       :type "revenue"
       :id "revenue"
       :tag "account"
     }
     {
       :counterWeight "credit"
       :name "accounts payable"
       :type "liability"
       :id "accounts payable"
       :tag "account"
     }
    ]}
  {:tag :journals
   :id "main.journals"
   :content
   [{:tag :journal
     :id "generalledger"
     :name "generalledger"
     :type ""
     :balance ""
     :content
     [{:tag :entries
       :id "main.entries"
       :content []}]}]}]}
