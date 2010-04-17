
Package com.interrupt.bookkeeping.cc; 


Helpers 
	
	all = [0 .. 127]; 
	
	lowercase = ['a' .. 'z']; 
	uppercase = ['A' .. 'Z']; 
	digit = ['0' .. '9']; 
	hex_digit = [ digit+ [['a' .. 'f'] + ['A' .. 'F']] ]; 
	
	tab = 9;
	cr = 13;
	lf = 10;
	eol = cr lf | cr | lf;	// This takes care of different platforms		
	dash = '-';
	dot = '.';
	forwardslash = '/'; 
	backslash = '\'; 
	asterix = 42; 
	equals_helper = '=';
	colon_helper = ':';
	ats = '@'; 
	underscore = '_'; 
	
	single_quote = '''; 
	double_quote = '"'; 
	
	lsquare_bracket = '['; 
	rsquare_bracket = ']'; 
	
	left_bracket = '('; 
	right_bracket = ')'; 
	
	
	ws = (' ' | tab | eol); 
	
	
	
States
    bkeeping, freetext;		// we need a way to ignore commands in freetext
    
    
Tokens
	
	
	//** VARIABLE 
	{bkeeping} var = 'var'; 
	
	
	//** COMMANDS 
	{bkeeping} create = 'create'; 
	{bkeeping} add	= 'add'; 
	{bkeeping} update = 'update'; 
	{bkeeping} remove = 'remove'; 
	{bkeeping} reverse	= 'reverse'; 
	{bkeeping} find = 'find'; 
	{bkeeping} list = 'list'; 
	
	{bkeeping} print = 'print'; 
	{bkeeping} commit = 'commit'; 
	
	{bkeeping} load = 'load'; 
	{bkeeping} login = 'login'; 
	{bkeeping} logout = 'logout'; 
	{bkeeping} exit = 'exit'; 
	
	{bkeeping} semicolon = ( 59 )?; 
	
	whitespace = (' ' | tab | eol);
	comment_line = forwardslash forwardslash all* eol; 
	comment_block = forwardslash asterix all* asterix forwardslash; 
	
	
	//** COMMAND OPTIONS  
	entry_opt = '-entry' ws+ ( lowercase | uppercase | dash | colon_helper |  ats | underscore | digit | dot )*; 
	entryid_opt = '-entryid' ws+ ( lowercase | uppercase | dash | colon_helper | ats | underscore | digit | dot )*; 
	account_opt = '-account' ws+ ( lowercase | uppercase | dash | colon_helper | ats | underscore | digit | dot )*; 
	accountid_opt = '-accountid' ws+ ( lowercase | uppercase | dash | colon_helper | ats | underscore | digit | dot )*; 
	journal_opt = '-journal' ws+ ( lowercase | uppercase | dash | colon_helper | ats | underscore | digit | dot )*; 
	name_opt = '-name' ws+ ( lowercase | uppercase | dash | colon_helper | ats | underscore | digit | dot )*; 
	type_opt = '-type' ws+ ( lowercase | uppercase | dash | colon_helper | ats | underscore | digit | dot )*; 
	counterweight_opt = '-counterWeight' ws+ lowercase+; 
	amount_opt = '-amount' ws+ digit+'.'digit+; 
	id_opt = '-id' ws+ ( lowercase | uppercase | dash | colon_helper | ats | underscore | digit | dot )*; 
	entrynum_opt = '-entrynum' ws+ digit*; 
	date_opt = '-date' ws+ digit+'/'digit+'/'digit+; 
	file_opt = '-F' ws+ ( lowercase | uppercase | dash | colon_helper | ats | underscore | digit | dot )*; 
	
	group_opt = '-group' ws+ ( lowercase | uppercase | dash | colon_helper | ats | underscore | digit | dot )*; 
	uname_opt = '-username' ws+ ( lowercase | uppercase | dash | colon_helper | ats | underscore | digit | dot )*; 
	passwd_opt = '-password' ws+ ( lowercase | uppercase | dash | colon_helper | ats | underscore | digit | dot )*; 
	groupid_opt = '-groupid' ws+ ( lowercase | uppercase | dash | colon_helper | ats | underscore | digit | dot )*; 
	userid_opt = '-userid' ws+ ( lowercase | uppercase | dash | colon_helper | ats | underscore | digit | dot )*; 
	currency_opt = '-currency' ws+ ( lowercase | uppercase | dash | colon_helper | ats | underscore | digit | dot )*; 
	returninput_opt = '-returninput' ws+ ( lowercase | uppercase | dash | colon_helper | ats | underscore | digit | dot )*; 
	
	
	
	//** COMMAND TOKENS 
	system_tok = 'system'; 
	debit_tok = 'debit'; 
	credit_tok = 'credit'; 
	entry_tok = 'entry'; 
	entries_tok = 'entries'; 
	journal_tok = 'journal'; 
	journals_tok = 'journals'; 
	transaction_tok = 'transaction'; 
	account_tok = 'account'; 
	accounts_tok = 'accounts'; 
	
	user_tok = 'user'; 
	users_tok = 'users'; 
	group_tok = 'group'; 
	groups_tok = 'groups'; 
	
	allowedactions_tok = 'allowedActions';
	command_tok = 'command';
	profiledetails_tok = 'profileDetails';
	profiledetail_tok = 'profileDetail';
	usersession_tok = 'userSession';
	
	
	lparen = '<';
	rparen = '>';
	
	
	listdelimiter = ','; 
	exclamation = 33; 
	question = 63;
	doubledash = dash dash;
	
	
	lbracket = left_bracket; 
	rbracket = right_bracket; 
	//lsbracket = lsquare_bracket; 
	//rsbracket = rsquare_bracket; 
	
	equals = equals_helper; 
	fslash = forwardslash;
	atsign = ats; 
	colon = colon_helper; 
	
	{bkeeping -> freetext, freetext -> bkeeping} quote = ( double_quote | single_quote ); 
	{bkeeping -> freetext, freetext -> bkeeping} backquote = '`'; 
	
	word = ( lowercase | uppercase | dash | underscore | digit | dot )+; 
	
	//xpath_chars = ( ats | forwardslash | colon_helper | left_bracket | right_bracket | lsquare_bracket | rsquare_bracket | equals_helper | double_quote | single_quote ); 
	xpath_chars = ( colon_helper | left_bracket | right_bracket | lsquare_bracket | rsquare_bracket ); 
	
	
	xmlns = 'xmlns'; 
	decl_xml = 'xml';
	decl_dtd = 'DOCTYPE'; 
	eoll = (cr | lf | cr lf)?; 	
	
	
Ignored Tokens 
	
	whitespace, 
	comment_line, 
	comment_block; 
	
	
Productions
	
	
	expr = 	{cmd} command semicolon | 
			{thexpr} twohandexpr semicolon; 
	
	/***************************
	 * VARIABLES
	 * 
	 *	@memory 
	 *	@previous
	 *
	 */
	twohandexpr = var word equals command;		// assigning results to variables 
	varname = atsign word?; 					// put an '@' sign in front of variable name to reference it 
	
	
	/*************************** 
	 *	COMMANDS 
	 *	
	 * 	add			((token.literal) token.literal, ...)
	 * 	update		((token.literal) token.literal, ...)
	 * 	remove		((token.literal) token.literal, ...)
	 * 	
	 * 	reverse		((token.literal) (token.literal) token.literal)
	 * 	
	 * 	
	 * 	find		((token.literal) token -opts)
	 * 	list		((token.literal) token -opts)
	 * 	
	 * 	create		(token -opts) 
	 *	
	 *	load		(token -opts)		<-- DB  
	 * 	commit		(token.literal) 	<-- DB 
	 *	
	 *	print 		(token.literal) 
	 *		
	 * 	login		(token -opts)		<-- DB 
	 * 	logout							<-- DB 
	 *	exit
	 *     
	 *command1 = 	{add} add [lbdepth1]:lbracket [lbdepth2]:lbracket command_input [rbdepth2]:rbracket ilist* [rbdepth1]:rbracket |  	
	 *{remove} remove [lbdepth1]:lbracket [lbdepth2]:lbracket command_input [rbdepth2]:rbracket ilist* [rbdepth1]:rbracket; 
	 */ 
	command =	{c1}	command1 | 
			{c5}	command5 | 
			{c2}	command2 | 
			{c3}	command3 | 
			{c4}	command4 | 
			{c6}	command6 | 
			{c7}	command7; 
	
	
	command1 = 	{add} add [lbdepth1]:lbracket [lbdepth2]:lbracket command_input [rbdepth2]:rbracket ilist* [rbdepth1]:rbracket | 
			{update} update [lbdepth1]:lbracket [lbdepth2]:lbracket [c1]:command_input [rbdepth2]:rbracket [c2]:command_input [rbdepth1]:rbracket | 
			{remove} remove [lbdepth1]:lbracket [lbdepth2]:lbracket command_input [rbdepth2]:rbracket ilist* [rbdepth1]:rbracket; 
	
	command5 =	{reverse} reverse [lbdepth1]:lbracket [lbdepth2]:lbracket [ci1]:command_input [rbdepth2]:rbracket [lbdepth3]:lbracket [ci2]:command_input [rbdepth3]:rbracket [ci3]:command_input [rbdepth1]:rbracket; 
	
	//** input list & delimiter 
	ilist = 	command_input ilistpart*; 
	ilistpart = listdelimiter command_input; 
	
	
	command2 = 	{find} find [lbdepth1]:lbracket [lbdepth2]:lbracket [c1]:command_input [rbdepth2]:rbracket [c2]:command_input [rbdepth1]:rbracket| 
				{list} list [lbdepth1]:lbracket [lbdepth2]:lbracket [c1]:command_input [rbdepth2]:rbracket [c2]:command_input [rbdepth1]:rbracket; 
	
	command3 = 	{load} load lbracket command_input rbracket | 
				{create} create lbracket command_input rbracket | 
				{login} login lbracket command_input rbracket; 
	
	command4 = 	{logout} logout| 
				{exit} exit; 
	
	command6 = {print} print lbracket command_input rbracket; 
	
	command7 = {commit} commit [lbdepth1]:lbracket [lbdepth2]:lbracket [input1]:command_input [rbdepth2]:rbracket [input2]:command_input [rbdepth1]:rbracket; 
	
	
	
	/************************** 
	 * COMMAND INPUT 
	 */ 
	command_input = 	{var}	varname | 
						{xml}	xmlblock | 
						{opts}	input_option | 
						{cmd}	command | 
						{xpath}	xpath; 
	
	
	// token -opts
	input_option =	commandtoken commandoption* ;
	
	
	xpath =		[left]:backquote xpath_part* [right]:backquote; 
		xpath_part =	{wd}		wordetal | 
				{xpc}		xpath_chars | 
				{fslash}	fslash | 
				{quote}		quote | 
				{ats}		atsign | 
				{equals}	equals; 
	
	
	
	/*************************** 
	 * COMMAND OPTIONS 
	 */ 
	commandoption = 	{entry}	entry_opt | 
				{entryid} entryid_opt | 
				{account}	account_opt | 
				{accountid}	accountid_opt | 
				{journal}	journal_opt | 
				{name}	name_opt | 
				{type}	type_opt | 
				{cweight}	counterweight_opt | 
				{amount}	amount_opt | 
				{id}	id_opt | 
				{entrynum}	entrynum_opt | 
				{date}	date_opt | 
				{file}	file_opt | 
				{group}	group_opt | 
				{uname}	uname_opt | 
				{passwd}	passwd_opt |  
				{groupid} groupid_opt | 
				{userid} userid_opt | 
				{currency} currency_opt |  
				{return} returninput_opt; 
	 
	
	
	/*************************** 
	 * XML BLOCKS 
	 */
	xmlblock = xml_decl? fulltag;
	
	fulltag =	{fulltag}	opentag fulltag* wordetal* closetag | 
				{emptytag}	emptytag | 
				{comment} xmlcomment; 
	
	opentag = lparen nsprefix? wordetal attribute* rparen;
	emptytag = lparen nsprefix? wordetal attribute* fslash rparen;
	closetag = lparen fslash nsprefix? wordetal rparen;
	
	
	
	xml_decl =  {xml_schem}	xml_decl_schem | 
				{xml_dtd}	xml_decl_dtd; 
	
	// <?xml version="1.0" encoding="iso8859-1" ?>
	xml_decl_schem = lparen [left]:question wordetal attribute+ [right]:question rparen; 
	
	// <!DOCTYPE greeting SYSTEM "hello.dtd" >
	xml_decl_dtd = lparen exclamation word_dtd+ rparen; 
	word_dtd  = {attrhs}	attributerhs | 
				{word}		word;
	
	
	attribute = nsprefix? attributelhs equals attributerhs;  
	attributelhs = wordetal; 
	attributerhs = 	[left]:quote zzz* [right]:quote; 
	
	nsprefix = wordetal colon; 
	
	xmlcomment = xml_opencomment wordetal* xml_closecomment;  
	
	xml_opencomment = lparen exclamation doubledash;
	xml_closecomment = doubledash rparen; 
	
	
	zzz = 	{one} wordetal | 
			{two} fslash; 
	
	wordetal =	{word}		word | 
				{ats}		atsign | 
				{ctoken}	commandtoken;
	
	
	
	/*************************** 
	 * COMMAND TOKENS 
	 */ 
	commandtoken = 	{system} system_tok | 
					{debit} debit_tok |  
					{credit} credit_tok |  
					{entry} entry_tok | 
					{entries} entries_tok | 
					{journal} journal_tok | 
					{journals} journals_tok | 
					{transaction} transaction_tok |  
					{accounts} accounts_tok | 
					{account} account_tok | 
					{user} user_tok | 
					{users} users_tok | 
					{group} group_tok | 
					{groups} groups_tok | 
					{allowedactions} allowedactions_tok | 
					{command} command_tok | 
					{profiledetails} profiledetails_tok | 
					{profiledetail} profiledetail_tok | 
					{usersession} usersession_tok; 
	
	
	 
	// >>>>>>>>>> TODO 
	
	// 7. include CDATA blocks 
	// <a> <![CDATA[ do something ]]> </a> 
	
	
	
	/** 
	 * 
	 * TEST XMLs
	 */ 
	// <xml>
	// <xml/>
	// <xml> ccc </xml>
	// <xml> lorem ipsum some text </xml>
	// <xml attr1="" attr2="wert" />
	// <xml attr1="" attr2="wert" > </xml>

	// <xml:xml />
	// <xml:xml></xml:xml>
	
	// <xml:xml attr1="" attr2="wert" />
	// <xml:xml attr1="" attr2="wert" ></xml:xml>
	
	// <xml:xml attr1="" attr2="wert" > <a> <b/> </a> lorem ipsum some text </xml:xml>
	// <xml:xml attr1="" attr2="wert" > <a> <!-- this is comments --> <b/> </a> lorem ipsum some text </xml:xml>
	// <xml:xml pre:attr1="" pref:attr2="wert" > <a> <!-- this is comments --> <b/> </a> lorem ipsum some text </xml:xml>
	
	// <?xml version="1.0" encoding="iso8859-1" ?> <xml:xml attr1="" attr2="wert" > <a> <!-- this is comments --> <b/> </a> lorem ipsum some text </xml:xml>
	// <!DOCTYPE greeting SYSTEM "hello.dtd" > <xml:xml attr1="" attr2="wert" > <a> <!-- this is comments --> <b/> </a> lorem ipsum some text </xml:xml>
	
	// <debit xmlns='com/interrupt/bookkeeping/account' id='def' amount='1.50' entryid='e1' accountid='2' /> 
	// <?xml version="1.0" encoding="iso8859-1" ?><credit xmlns='com/interrupt/bookkeeping/account' id='def' amount='1.50' entryid='e1' accountid='2' />  
	
	// <account xmlns='com/interrupt/bookkeeping/account' id='1' name='office equipment' type='asset' counterWeight='debit' ><debit xmlns='com/interrupt/bookkeeping/account' id='' amount='10.00' entryid='' accountid='1' /></account> 
    
    
    /** 
     * 
     * SCRATCH XML 
     */
	// <lebit xmlns='com/interrupt/bookkeeping/account' id='def' amount='1.50' entryid='e1' accountid='2' />  
	// <lebit xmlns='comaccount' id='def' amount='1.50' entryid='e1' accountid='2' /> 
	// <debit xmlns='comaccount' id='def' amount='1.50' entryid='e1' accountid='2' /> 
	// <xml:xml attr1="com/interrupt/bookkeeping/account" attr2="wert" > <a> <b/> </a> lorem ipsum some text </xml:xml>
	// <xml attr1="com/interrupt/bookkeeping/account" attr2="wert" > <a> <b/> </a> lorem ipsum some text </xml>
	// <xml attr1="com/interrupt/bookkeeping/account" attr2="wert" > <a> <b/> </a> </xml>
	
	// <xml attr1="comaccount" attr2="wert" > <a> <b/> </a> </xml>
	// <xml attr1="comaccount" attr2="wert" > <a> <b/> </a> lorem ipsum </xml>
	// <xml attr1="com/interrupt/bookkeeping/account" attr2="wert" > <a> <b/> </a> lorem ipsum </xml>
	
	// <debit attr1="com/interrupt/bookkeeping/account" attr2="wert" > <a> <b/> </a> </debit>
	// <debit attr1="com/interrupt/bookkeeping/account" attr2="wert" > </debit>
    
    
    
    /** 
     * 
     * TEST OPTIONS 
     */
    // -entry journal 
	// -type type -name some 
	// -type type -name some -id qerfb1435c -date 06/24/2003 
	
	//[X] -account "account name" 
	//[X] -journal journal name -entry journal 
	
	// -counterWeight debit 
	// -amount 123.33 
	// -id qerfb1435c 
	// -entrynum 765
	// -date 06/24/2003
	// -F filename
	
	
	// login ( user -username root -password password ); 
	// load ( users -id aauth.users ); 
	
	
	//** create ( debit -id erfg -amount 123.33 ); 
	// create ( <debit xmlns='com/interrupt/bookkeeping/account' id='def' amount='1.50' /> ); 
    
    
    // load ( users -id aauth.users ); 
    // load ( debit -amount 10.00 ); 
    // load ( debit -id abc -amount 10.00 ); 
    // load ( <debit xmlns='com/interrupt/bookkeeping/account' id='def' amount='1.50' /> ); 
    
    
    //** add ((create ( entry -id ez ) ) create ( debit -id dbzz -amount 10.00 ) ); 
	// add ((create ( entry -id ez ) ) load ( debit -id abc -amount 10.00 ) ); 
    
    // add ((create ( entry -id ez -currency CDN ) ) create ( <debit xmlns='com/interrupt/bookkeeping/account' id='def' amount='1.50' currency='CDN' /> ) ); 
    
    
    // remove ( (load ( entry -id e1 )) ); 
    // remove ( (load ( entry -id e1 )) load ( debit -id abc -amount 10.00 ) ); 
    
    
    /* reverse ( ( 
     			<entries xmlns='com/interrupt/bookkeeping/journal' id='' >
     				<entry xmlns='com/interrupt/bookkeeping/journal' id='e1' entrynum='' state='closed' journalid='' date='' >  
						<debit xmlns='com/interrupt/bookkeeping/account' id='abc' amount='10.00' entryid='e1' accountid='1' />  
						<debit xmlns='com/interrupt/bookkeeping/account' id='def' amount='1.50' entryid='e1' accountid='2' />  
						<credit xmlns='com/interrupt/bookkeeping/account' id='ghi' amount='11.50' entryid='e1' accountid='3' />  
					</entry>
				</entries>
      			)
      			( 
 				<entry xmlns='com/interrupt/bookkeeping/journal' id='e1' entrynum='' state='closed' journalid='' date='' >  
					<debit xmlns='com/interrupt/bookkeeping/account' id='abc' amount='10.00' entryid='e1' accountid='1' />  
					<debit xmlns='com/interrupt/bookkeeping/account' id='def' amount='1.50' entryid='e1' accountid='2' />  
					<credit xmlns='com/interrupt/bookkeeping/account' id='ghi' amount='11.50' entryid='e1' accountid='3' />  
				</entry>
      			)
    			<entry xmlns='com/interrupt/bookkeeping/journal' id='ereverse' entrynum='' state='closed' journalid='' date='' >  
					<debit xmlns='com/interrupt/bookkeeping/account' id='reverseabc' amount='11.50' entryid='ereverse' accountid='1' />  
					<credit xmlns='com/interrupt/bookkeeping/account' id='reverseghi' amount='11.50' entryid='ereverse' accountid='3' />  
				</entry>
    );
    */
	// reverse ( (entries -id es1) (entry -id e1) <entry xmlns='com/interrupt/bookkeeping/journal' id='newid' state='closed' > </entry> );
    
    
    // find ( (load ( account -id 2 )) load ( debit -amount 1.50 ) ); 
    
    
    // list ( (load ( entry -id e1 )) load ( debit -entryid e1) ); 
    //** list ( (load ( entry -id e1 )) <debit xmlns='com/interrupt/bookkeeping/account' / > ); 
	// list ( (load ( entry -id e1 )) <debit xmlns='com/interrupt/bookkeeping/account' entryid='e1' / > ); 
    
    
    
    //** VARIABLES
    // var timmy = list ( (load ( entry -id e1 )) <debit xmlns='com/interrupt/bookkeeping/account' / > ); 
    // find ( (load ( entry -id e1 )) @timmy ); 
    
    // print ( @timmy ); 
    
    
    //** COMMITING 
    /*
    add ( (load ( entries -id es1 )) 
     		add ( 
    			(create ( entry -id e2 )) 
    				create (debit -id nsfada -entryid e2 -amount 52.30 -accountid 1 ),
    				create (credit -id efiafd -entryid e2 -amount 52.30 -accountid 3 )
    			)
    		);
    */
    
    // add ( ( create (entries) ) create ( entry ) );
    // add ( ( create (entries) ) create ( entry ), create ( entry ) );
    

	/*
		var tim = add ( 
		                        (create ( entry -id e2 )) 
		                                create (debit -id nsfada -entryid e2 -amount 52.30 -accountid 1 ),
		                                create (credit -id efiafd -entryid e2 -amount 52.30 -accountid 3 )
		                        );
	*/
	// var result = add ( (load ( entries -id es1 )) @tim ); 
	// commit ( @result );
	
    
	
	
	// >>>>>>>>>> DONE 
	// * Tokens cannot use other tokens
	
	// [OK] multiple attributes
	// [OK] include 2 tokens in a production rule
	
	// [OK] include xml comments 
	// <!-- --> 
	
	// [OK] include namespace declarations; namespace usage in tags and attributes	
	//	xmlns='' xmlns:ans='' <ans:tagname att='' />
	
	// [OK] text in open/close tags 
	// <a att='' >
	//	<b/>
	//	some text
	// </a>
	
	
	// [OK] include document declaration ( DTD & schema )
	// <?xml version="1.0" encoding="iso8859-1"  **allow any and all characters between** ?>
	// <!DOCTYPE greeting SYSTEM "hello.dtd" **allow any and all characters between** >
	
	// [OK] implement token & options (this will also be the short form of inputs ) 
	
	// [OK] comments
	
	
	
	
	
