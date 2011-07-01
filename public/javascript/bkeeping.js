/* bkeeping */

if (!window.console)
{
	var console = {};
	console.log = alert;
}

var PROD_ENV = false;
var BLOCK_PARSE_REGEX = /\$\{(\w+)\}/igm;
// hack for mock data testing:
var _LAST_PARSED_DICT = null;
String.prototype.parse_vars = function(dataDict)
{
	_LAST_PARSED_DICT = dataDict;
	return this.replace(BLOCK_PARSE_REGEX, function(match, param, offset, orig)
	{
		if (!dataDict) { return ""; }
		return (dataDict[param] || (dataDict[param] == 0)) ? (dataDict[param]) : ("");
	});
}

/**
 * The "bind()" function extension from Prototype.js, extracted for general use
 *
 * @author Richard Harrison, http://www.pluggable.co.uk
 * @author Sam Stephenson (Modified from Prototype Javascript framework)
 * @license MIT-style license @see http://www.prototypejs.org/
 */
Function.prototype.bind = function()
{
    var _$A = function(a)
    {
        return Array.prototype.slice.call(a);
    }
    if ((arguments.length < 2) && (typeof arguments[0] == "undefined"))
    {
        return this;
    }
    var __method = this, args = _$A(arguments), object = args.shift();
    return function()
    {
        return __method.apply(object, args.concat(_$A(arguments)));
    }
}

/* settings */
var DEBUG = false;
var MOCK_DATA = false;
var MOCK_DATA_FAILURES_MODE = false;
/* ******** */

/* commands */
var LOGIN_COMMAND = "login (user -username ${username} -password ${password});";
var REGISTER_COMMAND = "var someVariable = add ( " +
				       "(load (`/system[ @id='main.system']`)) " +
        				  "<user xmlns='com/interrupt/bookkeeping/users' id='${username}' username='${username}' password='${password}'>" +
"<allowedActions id='${username}.allowedActions' xmlns='com/interrupt/bookkeeping/cc/bkell/aauth' >" + 
"<command id='command.create' name='create' xmlns='com/interrupt/bookkeeping/cc/bkell/command' />" + 
"<command id='command.add' name='add' xmlns='com/interrupt/bookkeeping/cc/bkell/command' />" + 
"<command id='command.remove' name='remove' xmlns='com/interrupt/bookkeeping/cc/bkell/command' />" + 
"<command id='command.reverse' name='reverse' xmlns='com/interrupt/bookkeeping/cc/bkell/command' />" + 
"<command id='command.find' name='find' xmlns='com/interrupt/bookkeeping/cc/bkell/command' />" + 
"<command id='command.load' name='load' xmlns='com/interrupt/bookkeeping/cc/bkell/command' />" + 
"<command id='command.list' name='list' xmlns='com/interrupt/bookkeeping/cc/bkell/command' />" + 
"<command id='command.print' name='print' xmlns='com/interrupt/bookkeeping/cc/bkell/command' />" + 
"<command id='command.commit' name='commit' xmlns='com/interrupt/bookkeeping/cc/bkell/command' />" + 
"<command id='command.login' name='login' xmlns='com/interrupt/bookkeeping/cc/bkell/command' />" + 
"<command id='command.logout' name='logout' xmlns='com/interrupt/bookkeeping/cc/bkell/command' />" + 
"<command id='command.exit' name='exit' xmlns='com/interrupt/bookkeeping/cc/bkell/command' />" + 
"</allowedActions>" + 
        				    "<profileDetails xmlns='com/interrupt/bookkeeping/users' id='user.details'>" + 
                              "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='firstname' name='first.name' value='${firstname}'/>" + 
                              "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='lastname' name='last.name' value='${lastname}'/>" + 
                			  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='email' name='email' value='${email}'/>" + 
                              "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='country' name='country' value='${country}'/>" + 
                              "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='defaultCurrency' name='defaultCurrency' value='${currency}' />" + 
                            "</profileDetails>" + 
                          "</user> , user -returninput true" + 
    					") ; "; 
var GETPROFILE_COMMAND = "load (`/system[@id='main.system']/aauthentication[@id='main.authentication']/users[@id='aauth.users']/user[@id='${username}']`);";
var UPDATEPROFILE_COMMAND = "var someVariable = update ( " +
						     "(`/system[ @id='main.system']/aauthentication[@id='main.authentication']/users[@id='aauth.users']/user[@id='${username}']/profileDetails[@id='user.details']`) " +
            				   "<profileDetails xmlns='com/interrupt/bookkeeping/users' id='user.details'>" +
                				   "<profileDetail name='first.name' value='${firstname}'/>" +
                				   "<profileDetail name='last.name' value='${lastname}'/>" +
                				   "<profileDetail name='email' value='${email}'/>" +
                				   "<profileDetail name='country' value='${country}'/>" +
            					"</profileDetails>" +
						");commit ((`/system[ @id='main.system']/aauthentication[@id='main.authentication']/users[@id='aauth.users']/user[@id='${username}']/profileDetails[@id='user.details']`) @someVariable);";

var LISTACCOUNTS_COMMAND = "load ( `/system[@id='main.system']/groups[@id=\"main.groups\"]/group[@id=\"${username}.group\"]/bookkeeping[@id='main.bookkeeping']/accounts[@id='main.accounts']`);";
var LISTJOURNALS_COMMAND = "load ( `/system[@id='main.system']/groups[@id=\"main.groups\"]/group[@id=\"${username}.group\"]/bookkeeping[@id='main.bookkeeping']/journals[@id='main.journals']`);";
var LISTENTRIES_COMMAND =  "load ( `/system[@id='main.system']/groups[@id=\"main.groups\"]/group[@id=\"${username}.group\"]/bookkeeping[@id='main.bookkeeping']/journals[ @id='main.journals' ]/journal[@id='${journal}']/entries[@id='main.entries']`);";
var LISTENTRY_COMMAND =  "load ( `/system[@id='main.system']/groups[@id=\"main.groups\"]/group[@id=\"${username}.group\"]/bookkeeping[@id='main.bookkeeping']/journals[ @id='main.journals' ]/journal[@id='${journal}']/entries[@id='main.entries']/entry[@id='${entry}']`);";

var LOADDEFAULTCURRENCY_COMMAND =  "load ( `/system[ @id='main.system' ]/aauthentication[ @id='main.authentication' ]/users[ @id='aauth.users' ]/user[ @id='${username}' ]/profileDetails[ @id='user.details' ]/profileDetail[ @id='defaultCurrency' ] `);";


/**** 
 * 		ACCOUNT Commands 
 */
var ADDACCOUNT_COMMAND = "var addedAccount = add((load(`/system[@id='main.system']/groups[@id='main.groups']/group[@id='${username}.group']/bookkeeping[@id='main.bookkeeping']/accounts[@id='main.accounts']`))" +
		"<account xmlns='com/interrupt/bookkeeping/account' type=\"${type}\" id=\"${id}\" name=\"${name}\" counterWeight=\"${cw}\" currency='CDN' /> );"+ 
		"commit((`/system[@id='main.system']/groups[@id='main.groups']/group[@id='${username}.group']/bookkeeping[@id='main.bookkeeping']/accounts[@id='main.accounts']`) @addedAccount);"; 

var REMOVEACCOUNT_COMMAND = "var removedAccount = remove ((`/system[@id='main.system']/groups[@id='main.groups']/group[@id='${username}.group']/bookkeeping[@id='main.bookkeeping']/accounts[@id='main.accounts']`) account -id ${aid});" +
		"commit((`/system[@id='main.system']/groups[@id='main.groups']/group[@id='${username}.group']/bookkeeping[@id='main.bookkeeping']/accounts[@id='main.accounts']`) @removedAccount);";
var UPDATEACCOUNT_COMMAND = "var updatedAccount = update((`/system[@id='main.system']/groups[@id='main.groups']/group[@id='${username}.group']/bookkeeping[@id='main.bookkeeping']/accounts[@id='main.accounts']/account[@id='${id}']`)" + 
		"<account xmlns=\"com/interrupt/bookkeeping/account\" type=\"${type}\" id=\"${id}\" name=\"${name}\" counterWeight=\"${cw}\"/>);" + 
		"commit( (`/system[@id='main.system']/groups[@id='main.groups']/group[@id='${username}.group']/bookkeeping[@id='main.bookkeeping']/accounts[@id='main.accounts']/account[@id='${id}']`) @updatedAccount);"; 

/**** 
 * 		JOURNAL Commands 
 */
var ADDJOURNAL_COMMAND = "var addedJournal = add((`/system[@id='main.system']/groups[@id=\"main.groups\"]/group[@id=\"${username}\"]/bookkeeping[@id='main.bookkeeping']/journals[@id='main.journals']/journal`)" +
		"<journal:journal id='${jid}' name='${jname}' type='${jtype}' balance='${jbalance}'/>" +
		"commit((`/system[@id='main.system']/groups[@id=\"main.groups\"]/group[@id=\"${username}\"]/bookkeeping[@id='main.bookkeeping']/journals[@id='main.journals']/journal`) @addedJournal);";
var REMOVEJOURNAL_COMMAND = "var removedJournal = remove ((`/system[@id='main.system']/groups[@id=\"main.groups\"]/group[@id=\"${username}\"]/bookkeeping[@id='main.bookkeeping']/journals[@id='main.journals']/journal`) journal -id ${jid});" +
		"commit((`/system[@id='main.system']/groups[@id=\"main.groups\"]/group[@id=\"${username}\"]/bookkeeping[@id='main.bookkeeping']/journals[@id='main.journals']/journal`) @removedJournal);"; 
var UPDATEJOURNAL_COMMAND = "var updatedJournal = update(( load(`/system[@id='main.system']/groups[@id=\"main.groups\"]/group[@id=\"${username}.group\"]/bookkeeping[@id='main.bookkeeping']/journals[@id='main.journals']/journal[@id='${id}']`)) " + 
		"<journal xmlns=\"com/interrupt/bookkeeping/journal\" id='${id}' name='${name}' type='${jtype}' balance='${jbalance}'/> ); " + 
		"commit((`/system[@id='main.system']/groups[@id=\"main.groups\"]/group[@id=\"${username}.group\"]/bookkeeping[@id='main.bookkeeping']/journals[@id='main.journals']/journal[@id='${id}']`) @updatedJournal);"; 


/**** 
 * 	 	ENTRY Commands 
 */
var ADDENTRY_COMMAND = "var addedEntry = add((`/system[@id='main.system']/groups[@id=\"main.groups\"]/group[@id=\"${username}\"]/bookkeeping[@id='main.bookkeeping']/journals[ @id='main.journals' ]/journal[@id='${jid}']/entries[@id='main.entries']`)" +
		"<entry xmlns='com/interrupt/bookkeeping/journal' id='${eid}' entrynum='' state='' journalid='${jid}' date='${date}' currency='${cc}'>" +
			"${debitsANDcredits}" + 
		  "</entry> ); " + 
		"commit((`/system[@id='main.system']/groups[@id=\"main.groups\"]/group[@id=\"${username}.group\"]/bookkeeping[@id='main.bookkeeping']/journals[@id='main.journals' ]/journal[@id='${jid}']/entries[@id='main.entries']`) @addedEntry);";

var REMOVEENTRY_COMMAND = "var removedEntry = remove ((load(`/system[@id='main.system']/groups[@id=\"main.groups\"]/group[@id=\"${username}.group\"]/bookkeeping[@id='main.bookkeeping']/journals[ @id='main.journals' ]/journal[@id='${jid}']/entries[@id='main.entries']`)) entry -id ${eid});" +
		"commit((`/system[@id='main.system']/groups[@id=\"main.groups\"]/group[@id=\"${username}.group\"]/bookkeeping[@id='main.bookkeeping']/journals[ @id='main.journals' ]/journal[@id='${jid}']/entries[@id='main.entries']`) @removedEntry);";

var UPDATEENTRY_COMMAND = "var updatedEntry = update( (load(`/system[@id='main.system']/groups[@id=\"main.groups\"]/group[@id=\"${username}.group\"]/bookkeeping[@id='main.bookkeeping']/journals[ @id='main.journals' ]/journal[@id='${jid}']/entries[@id='main.entries']/entry[@id='${id}']`))" +
		"<entry xmlns=\"com/interrupt/bookkeeping/journal\" id='${id}' entrynum='' state='' journalid='${jid}' date='${date}' currency='${cc}'>" +
			"${debitsANDcredits}" + 
		"</entry> );" + 
		"commit( (`/system[@id='main.system']/groups[@id=\"main.groups\"]/group[@id=\"${username}.group\"]/bookkeeping[@id='main.bookkeeping']/journals[@id='main.journals']/journal[@id='${jid}']/entries[@id='main.entries']/entry[@id='${id}']`) @updatedEntry);"; 


/* ******** */

/* templates */
// acl_rows
var ACCOUNT_ROW = '<div id="${rowid}" class="acl_row row">' +
					'<div class="edit_column left_column"><a href="javascript:bkeeping.editAccount(\'${rowid}\');"><img border="0" src="images/editrow.jpg"/></a></div>' +
					'<div class="name_column left_column" style="margin-left: 10px;" >${aname}</div>' +
					'<div class="category_column left_column" style="margin-left: 40px; margin-right: 20px;" >${category}</div>' +
					// '<div class="balance_column left_column">${balance}</div>' +
					'<div class="delete_column left_column"><a href="javascript:bkeeping.deleteAccount(\'${rowid}\');"><img border="0" src="images/deleterow.jpg"/></a></div>' +
				   '</div>';
// js_rows
var JOURNAL_ROW = '<div id="${rowid}" class="js_row row">' +
					'<div class="edit_column left_column"><a href="javascript:bkeeping.editJournal(\'${rowid}\');"><img border="0" src="images/editrow.jpg"/></a></div>' +
					'<div class="large_name_column left_column"><a onclick="bkeeping.showJournal(\'${rowid}\')">${jname}</a></div>' +
					'<div class="delete_column left_column"><a href="javascript: alert(\'Coming Soon\'); "><img border="0" src="images/deleterow.jpg"/></a></div>' +
				 '</div>';

// j_rows
var ENTRY_ROW = '<div id="${rowid}" class="j_row row">' +
					
					'<div class="edit_column left_column"><a href="javascript:bkeeping.editEntry(\'${rowid}\');"><img border="0" src="images/editrow.jpg"/></a></div>' +
					
					'<div class="date_column left_column" style="margin:0 50px;" >${date}</div>' +
					'<div class="entry_column left_column" style="margin:0 50px;" >${entry}</div>' +
					'<div class="balance_column left_column" style="margin:0 50px;" >${balance}</div>' +
					
					'<div class="delete_column left_column"><a href="javascript:bkeeping.deleteThing(\'entry\', \'${rowid}\');"><img border="0" src="images/deleterow.jpg"/></a></div>' +
				  	
				  '</div>';



var TENTRY_ROW = 	'<div id="jentry_rows" class="j_rows rows">' + 
					
					'	<div class="edit_column left_column"><a href="javascript:bkeeping.addEditEntryPart(\'${rowid}\', \'${eid}\');"><img border="0" src="images/editrow.jpg"/></a></div>' + 
					
					'	<div style="float:left; width: 18%; margin-left: 90px; ">${dname}</div><div style="float:left; width: 20%; ">${damount}</div>' + 
					'	<div style="float:left; width: 20%; ">${cname}</div><div style="float:left; width: 20%; ">${camount}</div>' + 
					
					'	<div class="delete_column left_column"><a href="javascript: alert(\'Coming Soon. Please replace entry\');"><img border="0" src="images/deleterow.jpg"/></a></div>' + 
					
					'</div>'; 
					
					
var AE_ACCOUNT = ["Add/Edit Account", '<table class="formtable">' +
						'<tr>' +
							'<td>' +
								'Name' +
							'</td>' +
							'<td>' +
								'<input type="text" name="account_name" id="account_name" class="data_field" value="${aname}" />' +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td>' +
								'Type' +
							'</td>' +
							'<td>' +
								'<select name="account_type" id="account_type" class="data_field">' +
									'${accounts}'+
								'</select>' +
							'</td>' +
						'</tr>' +
					'</table>'];

var AE_JOURNAL = ["Add/Edit Journal", '<table class="formtable">' +
						'<tr>' +
							'<td>' +
								'Name' +
							'</td>' +
							'<td>' +
								'<input type="text" name="journal_name" id="journal_name" class="data_field" value="${name}" />' +
							'</td>' +
						'</tr>' +
						/*'<tr>' +
							'<td>' +
								'Type' +
							'</td>' +
							'<td>' +
								'<select name="journal_type" id="journal_type" class="data_field">' +
									'<option>default</option>' +
								'</select>' +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td>' +
								'Balance' +
							'</td>' +
							'<td>' +
								'<input type="text" name="journal_balance" id="journal_balance" class="data_field" value="${balance}" />' +
							'</td>' +
						'</tr>' +
						*/
					'</table>']; 

var AE_ENTRY = ["Add/Edit Entry", '<table class="formtable">' + 
						'<input type="hidden" name="entryid" value="${entryid}" />' + 
						'<tr>' +
							'<td>' +
								
								'<span class="smallformtext">Currency:</span>&nbsp;' +
'<select name="entry_cc" id="entry_cc" class="data_field">' +
	'<option value="CDN" ${curr_cdn} >Canadian Dollar</option>' +
	'<option value="USD" ${curr_usd} >US Dollar</option>' +
	'<option value="BP"  ${curr_bp} >British Pound</option>' +
	'<option value="EUR" ${curr_eur} >European Euro</option>' +
	'<option value="JPN" ${curr_jpn} >Japanese Yen</option>' +
'</select>' +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td>' + 
'<span class="smallformtext">Amount:</span>&nbsp;<input type="text" size="6" name="entry_ecamount" id="entry_ecamount" class="data_field" value="${evalue}" >&nbsp;' +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td>' + 
								'<span class="smallformtext">Account:</span>&nbsp;' +
								'<select name="entry_caid" id="entry_caid" class="data_field">' +
									'${accounts}' +
								'</select>' +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td>' + 
								'<span class="smallformtext">Type:</span>&nbsp;' +
'<select name="entry_ctype" id="entry_ctype" class="data_field">' +
	'<option value="debit" ${entry_dtype} >debit</option><option value="credit" ${entry_ctype} >credit</option>' +
'</select>' +
							'</td>' +
						'</tr>' +
					'</table>'];


/* ********* */

var DIALOG_HOLDER = "<div id='bkeeping_dialog' class='dialog'>Dialog default text.</div>";
var _DIALOG_FIRST = true;

// top namespace
var bkeeping = { 
	
	
	// session
	ACTIVE_SESSION: null,
	DEFAULT_CURRENCY: null, 
	ROOT_URL: null, 
	
	
	cache:
	{
		user: null,
		accounts: [],
		journals: [],
		entries: []
	},
	
	/* logging */
	debug: function(message)
	{
		if (DEBUG)
		{
			if (window.console)
			{
				//console.log(message);
			}
			else
			{
				alert(message);
			}
		}
	},

	log: function(message)
	{
		if (window.console)
		{
			//console.log(message);
		}
		else
		{
			// do nothing (yet)
		}
	},

	raise: function(message)
	{
		alert(message);
	},
	/* ******* */
	
	
	
	processLogin: function() { 
				
		bkeeping.login(); 
		$('#loading-msg').animate({ left: 0 }, { duration: 750, easing: 'swing', queue: false }); 
	}, 
	processRegister: function() { 
		
		bkeeping.register(); 
		$('#loading-msg').animate({ left: 0 }, { duration: 750, easing: 'swing', queue: false }); 
	}, 
	
	
			
	modalDialogScreen: function(showhide)
	{
		var m = $("#modal_screen");
		if (showhide == "show")
		{
			m.css('display', 'block');
		}
		else
		{
			m.css('display', 'none');			
		}
	},

	showModalDialog: function()
	{
		bkeeping.modalDialogScreen("show");
		bkeeping.showDialog.apply(this, arguments);
	},

	showDialog: function()
	{
		bkeeping.setDialogContent.apply(this, arguments);
		bkeeping.openDialog();
	},

	setDialogContent: function()
	{
		var args = Array.prototype.slice.call(arguments);
		var content = args.shift();
		if (content instanceof Function)
		{
			$("#bkeeping_dialog").html(content.apply(this, args));
		}
		else
		{
			$("#bkeeping_dialog").html(content);			
		}
	},

	openDialog: function()
	{
		if (_DIALOG_FIRST)
		{
			_DIALOG_FIRST = false;
			$("#bkeeping_dialog").dialog({ close: bkeeping.modalDialogScreen.bind(this, "hide") });
		}
		else
		{
			$("#bkeeping_dialog").dialog("open");
		}
	},

	_a_open: true,
	toggleAccountsOpen: function()
	{
		var newleft = "0px";
		if (bkeeping._a_open)
		{
			bkeeping._a_open = false;
			newleft = "-373px";
		}
		else
		{
			bkeeping._a_open = true;
		}
		
		$("#accounts_ui").animate({ left: newleft }, { duration: 750, easing: "swing", complete: function() {}, queue: false });
		
	},

	_j_open: true,
	toggleJournalsOpen: function()
	{
		var newleft = "436px";
		if (bkeeping._j_open)
		{
			bkeeping._j_open = false;
			newleft = "809px";
		}
		else
		{
			bkeeping._j_open = true;
		}		
		$("#journals_ui").animate({ left: newleft }, { duration: 750, easing: "swing", complete: function() {}, queue: false });
	},

	/* state */
	/* cookie functions: http://techpatterns.com/downloads/javascript_cookies.php */
	setCookie: function(name, value, expires, path, domain, secure)
	{
		// set time, it's in milliseconds
		var today = new Date();
		today.setTime(today.getTime());
		
		// EdA: override this to default to base path instead of "" (easier for simplistic auth systems)
		path = path || "/";

		/*
		    {expires} days
		*/
		if (expires)
		{
			expires = expires * 1000 * 60 * 60 * 24;
		}
		var expires_date = new Date(today.getTime() + (expires));
		document.cookie = name + "=" + escape(value) +
			((expires) ? ";expires=" + expires_date.toGMTString() : "") +
			((path) ? ";path=" + path : "") +
			((domain) ? ";domain=" + domain : "") +
			((secure) ? ";secure" : "" );
	},

	getCookie: function(name)
	{
		// first we'll split this cookie up into name/value pairs
		// note: document.cookie only returns name=value, not the other components
		var a_all_cookies = document.cookie.split(';');
		var a_temp_cookie = '';
		var cookie_name = '';
		var cookie_value = '';
		var b_cookie_found = false; // set boolean t/f default f

		for (var i = 0; i < a_all_cookies.length; i++)
		{
			// now we'll split apart each name=value pair
			a_temp_cookie = a_all_cookies[i].split('=');

			// and trim left/right whitespace while we're at it
			cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

			// if the extracted name matches passed name
			if (cookie_name == name)
			{
				b_cookie_found = true;
				// we need to handle case where cookie has no value but exists (no = sign, that is):
				if (a_temp_cookie.length > 1)
				{
					cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
				}
				// note that in cases where cookie is initialized but no value, null is returned
				return cookie_value;
				break;
			}
			a_temp_cookie = null;
			cookie_name = '';
		}
		if (!b_cookie_found)
		{
			return null;
		}
	},

	deleteCookie: function(name, path, domain)
	{
		if (this.getCookie(name))
		{
			// EdA: override this to default to base path instead of "" (easier for simplistic auth systems)
			path = path || "/";
			document.cookie = name + "=" +
				((path) ? ";path=" + path : "") +
				((domain) ? ";domain=" + domain : "" ) +
				";expires=Thu, 01-Jan-1970 00:00:01 GMT";
		}
	},

	Session: function(sessionId, loggedInUserid, loggedInGroup)
	{
		this.cookieName = "_bk_session_js";
		this.loaded = false;
		this.sessionId = sessionId || null;
		this.loggedInUserid = loggedInUserid || null;
		this.loggedInGroup = loggedInGroup || null;

		this.update = function(sessionId, loggedInUserid, loggedInGroup)
		{
			this.sessionId = sessionId || null;
			this.loggedInUserid = loggedInUserid || null;
			this.loggedInGroup = loggedInGroup || null;
			return this;
		}

		this.clear = function()
		{
			this.loaded = false;
			this.sessionId = null;
			this.loggedInUserid = null;
			this.loggedInGroup = null;
			bkeeping.deleteCookie(this.cookieName);
			return this;
		}

		function saveToSessionCookie()
		{
			bkeeping.setCookie(this.cookieName, this.sessionId + "," + this.loggedInUserid + "," + this.loggedInGroup);
			return this;
		}
		this.save = saveToSessionCookie.bind(this);

		function loadFromSessionCookie()
		{
			var cookievalues = bkeeping.getCookie(this.cookieName);
			if (cookievalues)
			{
				var vals = cookievalues.split(',');
				this.sessionId = vals[0];
				this.loggedInUserid = vals[1];
				this.loggedInGroup = vals[2];
				return true;
			}
			return false;
		}

		if (!this.sessionId)
		{
			// try to load from cookie:
			this.loaded = loadFromSessionCookie.call(this); // true if there was a session cookie, false otherwise
		}

		return this;
	},
	/* ***** */

	/* data objects */
	User: function(root)
	{
		this.root = root;

		this.getProfileDetailsList = function()
		{
			return this.root["children"][0]["profileDetails"]["children"];
		}

		this.getUserid = function()
		{
			return this.root["id"];
		}

		this.getUsername = function()
		{
			return this.root["username"];
		}

		this.getPassword = function()
		{
			return this.root["password"];
		}

		this.getFirstname = function()
		{
			return this.root["children"][0]["profileDetails"]["children"][0]["profileDetail"].value;
		}

		this.getLastname = function()
		{
			return this.root["children"][0]["profileDetails"]["children"][1]["profileDetail"].value;
		}

		this.getEmail = function()
		{
			return this.root["children"][0]["profileDetails"]["children"][2]["profileDetail"].value;
		}

		this.getCountry = function()
		{
			return this.root["children"][0]["profileDetails"]["children"][3]["profileDetail"].value;
		}
	},
	
	UserSession: function(root)
	{
		this.root = root;
		this.getSessionId =  function()
		{
			return this.root["id"];
		}

		this.getGroup = function()
		{
			return this.root["groupid"];
		}

		this.getUser = function()
		{
			return this.root["userid"];
		}

		return this;
	},
	
	DefaultCurrency: function(root)
	{
		this.root = root;
		this.getDefaultCurrency = this.lister.bind(this, "profileDetail", bkeeping.DefaultCurrency);
		this.getDefaultCurrencyRaw = this.rawlister.bind(this); 
	},
	
	lister: function(nodename, _class)
	{	
		if( this.root["children"] != null ) { 
			
			var c = this.root["children"];
			if (c.length > 0)
			{
				var a = new Array();
				for (var i = 0; i < c.length; i++) { 
					
					if( c[i][nodename] != undefined ) { 
						a.push(new _class(c[i][nodename])); 
					}
					else if( c[i]["debit"] != undefined ) { 
						a.push( new bkeeping.Subentry( c[i]["debit"], "debit" ) ); 
					}
					else if( c[i]["credit"] != undefined ) { 
						a.push( new bkeeping.Subentry( c[i]["credit"], "credit" ) ); 
					}
				}
				return a;
			}
		}
	}, 
	
	rawlister: function()
	{
		return this.root["children"];
	},
	
	Lister: function()
	{
		this.lister = bkeeping.lister;
		this.rawlister = bkeeping.rawlister;
	},
	
	AccountList: function(root)
	{
		this.root = root;
		this.getAccounts = this.lister.bind(this, "account", bkeeping.Account);
		this.getAsList = this.getAccounts;
		this.getAccountsRaw = this.rawlister.bind(this);
		this.getAsRawList = this.getAccountsRaw;
	},
	
	Account: function(root)
	{
		this.root = root;

		this.getType = function()
		{
			return this.root['type'];
		}

		this.getId = function()
		{
			return this.root['id'];
		}

		this.getName = function()
		{
			return this.root['name'];
		}

		this.getCounterWeight = function()
		{
			return this.root['counterWeight'];
		},

		this.getBalance = function()
		{
			// XXX balance not in account structure, HELP
			return "xxxhelpxxx";
		}
	},
	
	JournalList: function(root)
	{
		this.root = root;
		this.getJournals = this.lister.bind(this, "journal", bkeeping.Journal);
		this.getAsList = this.getJournals;
		this.getJournalsRaw = this.rawlister.bind(this);
		this.getAsRawList = this.getJournalsRaw;
	},
	
	Journal: function(root)
	{
		this.root = root;

		this.getId = function()
		{
			return this.root["id"];
		}

		this.getName = function()
		{
			return this.root["name"];
		}

		this.getType = function()
		{
			return this.root["type"];
		}

		this.getBalance = function()
		{
			return this.root["balance"];
		}
	},

	EntryList: function(root)
	{
		this.root = root;
		this.getEntries = this.lister.bind(this, "entry", bkeeping.Entry);
		this.getAsRawList = this.rawlister.bind(this);
	},

	Entry: function(root)
	{
		this.root = root;

		this.getId = function()
		{
			return this.root["id"];
		}

		this.getEntrynum = function()
		{
			return this.root["entrynum"];
		}

		this.getState = function()
		{
			return this.root["state"];
		}

		this.getJournalid = function()
		{
			return this.root["journalid"];
		}

		this.getDate = function()
		{
			return this.root["date"];
		}

		this.getCurrency = function()
		{
			return this.root["currency"];
		}

		this.getSubentries = function(type, raw)
		{
			var d = this.root["children"];
			var a = new Array();
			for (var i = 0; i < d.length; i++)
			{
				if (d[i][type])
				{
					if (raw)
					{
						a.push(d[i]);
					}
					else
					{
						a.push(new bkeeping.Subentry(d[i], type));
					}
				}
			}
			return a;
		}

		this.getDebits = function()
		{
			return this.getSubentries("debit");
		}

		this.getCredits = function()
		{
			return this.getSubentries("credit");
		}

		this.getDebitsRaw = function()
		{
			return this.getSubentries("debit", true);
		}

		this.getCreditsRaw = function()
		{
			return this.getSubentries("credit", true);
		}
	},

 	Subentry: function(root, type)
 	{
 		this.root = root;
 		this.type = type;
 		
 		this.getId = function()
 		{
 			return this.root["id"];
 		}
		
 		this.getAmount = function()
 		{
 			return this.root["amount"];
 		}
		
 		this.getEntryid = function()
 		{
 			return this.root["entryid"];
 		}
		
 		this.getAccountid = function()
 		{
 			return this.root["accountid"];
 		}
		
		this.getAccount = function()
 		{
 			return this.root["account"];
 		}
		
 		this.getCurrency = function()
 		{
 			return this.root["currency"];
 		}
 	},
	/* ************ */

	/* commands */
	login: function()
	{
		var u = $("#u").val();
		var p = $("#p").val();
		var ret = new this.LoginCommand(u, p).run(); 
	},

	logout: function()
	{	
		
		var ret = new this.LogoutCommand().run(); 
		
	},

	register: function()
	{
		var username = $("#username").val();
		var password = $("#password").val();
		var firstname = $("#firstname").val();
		var lastname = $("#lastname").val();
		var email = $("#email").val();
		var country = $("#country").val(); 
		var currency = $("#currency").val(); 
		var ret = new this.RegisterCommand(username, password, firstname, lastname, email, country, currency).run();
	},

	editprofile: function()
	{
		var username = $("#username").val();
		var password = $("#password").val();
		var firstname = $("#firstname").val();
		var lastname = $("#lastname").val();
		var email = $("#email").val();
		var country = $("#country").val(); 
		var ret = new this.RegisterCommand(username, password, firstname, lastname, email, country, currency, true).run();		
	},

	deleteThing: function(thingtype, id)
	{
		var goAhead = function(id)
		{
			$('#bkeeping_dialog').dialog("close"); 
			var ret = new this.RemoveCommand(thingtype, function(id) { alert(thingtype + " " + id + " removed"); }.bind(this, id), {'eid': id , 'jid': bkeeping._displayed_journal , 'username': bkeeping.ACTIVE_SESSION.loggedInUserid }).run(); 
		}.bind(this, id); 
		bkeeping.showDialog("Are you sure you want to delete " + thingtype + " with id[" + id + "] ?"); 
		$('#bkeeping_dialog').dialog('option', 'buttons', { "CANCEL": function() { $(this).dialog("close"); }, "DELETE": goAhead }); 
	},

	addedEdited: function(jsonData)
	{
		bkeeping.debug("addedEdited: returned jsonData:");
		bkeeping.debug(jsonData);
		alert('Recored added/edited.  Reloading UI to display updates.');
		var loc = document.location.href;
		if (loc.indexOf('?') != -1)
		{
			loc = loc.substring(0, loc.indexOf('?'));
		}
		if (!DEBUG)
		{
			document.location.href = loc + '?timestamp=' + new Date().getTime();
		}
		
		
		//** closing entry window  
		$("#entry_ui").css("display", "none"); 
		
		
		//** reloading journal window
		bkeeping.showJournal(bkeeping._displayed_journal); 
		
	},
	
	addedEditedJournal: function(jsonData)
	{
		bkeeping.debug("addedEditedJournal: returned jsonData:");
		bkeeping.debug(jsonData);
		alert('Recored added/edited.  Reloading UI to display updates.');
		
		//** reload the current page 
		setTimeout("document.location.href='"+ bkeeping.ROOT_URL +"';", 0); 
		
	},
	
	wrapFormAsObj: function()
	{
		var pars = {};
		var fields = $(".data_field");
		for (var i = 0; i < fields.length; i++)
		{
			var field = fields[i];
			var n = field.id.substring(field.id.lastIndexOf('_') + 1);
			var v = $(field).val();
			bkeeping.debug('wrapFormAsObj: found ' + n + '/' + v);
			pars[n] = v;
		}
		return pars;
	},

	getAccountsAsOptionsList: function(atype)
	{
		// we have to assume they're cached, coz this is a synchronous call
		var html = "";
		var accounts = bkeeping.cache.accounts;
		for (var i = 0; i < accounts.length; i++)
		{
			var id = accounts[i].account.id; 
			var nam = accounts[i].account.name; 
			var type = accounts[i].account.type; 
			if (id)
			{
				if( atype == type ) { 
					html += '<option value="' + id + '" selected="selected" >' + nam + '</option>'; 
				}
				else { 
					html += '<option value="' + id + '">' + nam + '</option>'; 
				}
			}
		}
		return html;
	}, 
	getAccountTypesAsOptionsList: function(atype)
	{
		// we have to assume they're cached, coz this is a synchronous call 
		var html = ""; 
		var thingy = { 	asset: '<option ${selected}>asset</option>', 
						expense: '<option ${selected}>expense</option>', 
						liability: '<option ${selected}>liability</option>', 
						revenue: '<option ${selected}>revenue</option>' 
					 }; 
		
		for( property in thingy ) { 
			
			if ( property == atype ) { 
				
				html += thingy[property].parse_vars( { selected:"selected='selected'" } ); 
			}
			else { 
				
				html += thingy[property].parse_vars(); 
			}
		}
		return html;
	}, 
	
	getCounterWeight: function(type)
	{
		switch (type)
		{
			case "asset":
				return "debit";
			case "expense":
				return "debit";
			case "liability":
				return "credit";
			case "revenue":
				return "credit";
			default:
				return "credit";
		}
	},

	getCurrentDate: function()
	{
		var d = new Date();
		var day = d.getDate();
		var month = d.getMonth() + 1;
		var year = d.getFullYear();
		if (day < 10) { day = '0' + day; }
		if (month < 10) { month = '0' + month; }
		return day + '' + month + '' + year;
	},
	
	getAccountNameForId: function(aid) { 
		
		var accounts = bkeeping.cache.accounts;
		for (var i = 0; i < accounts.length; i++)
		{
			var id = accounts[i].account.id;
			var nam = accounts[i].account.name;
			if (id == aid ) 
			{
				return nam;
			}
		}
		return null; 
		
	}, 
	
	goJournalPart: function(thingtype, id) 
	{
		
		var type = id ? this.EditCommand : this.AddCommand; 
		var pars = this.wrapFormAsObj(); 
		pars["username"] = bkeeping["ACTIVE_SESSION"]["loggedInUserid"]; 
		pars["id"] = id; 
		
		
		$('#bkeeping_dialog').dialog("close"); 
		
		var ret = new type(thingtype, this.addedEditedJournal, pars).run(); 
		
	}, 
	
	goAccountPart: function(thingtype, id) 
	{
		
		var type = id ? this.EditCommand : this.AddCommand; 
		var pars = this.wrapFormAsObj(); 
		pars["username"] = bkeeping["ACTIVE_SESSION"]["loggedInUserid"]; 
		pars["id"] = id; 
		
		
		if( (pars["type"] == "asset") || (pars["type"] == "expense") ) { 	//** if asset or expense - debit 
			pars["cw"] = "debit"; 
		}
		else { 		//** otherwise - credit 
			pars["cw"] = "credit"; 
		}
		
		$('#bkeeping_dialog').dialog("close"); 
		
		
		var ret = new type(thingtype, this.addedEdited, pars).run(); 
	}, 
	
	goJournalEntryPart: function(thingtype, id) 
	{
			
			var type = id ? this.EditCommand : this.AddCommand; 
			var pars = this.wrapFormAsObj(); 
			
			//** put in data mapping
			
			
			//** TODO - i) take ID and update entry or ii) put a new entry with ID of 'new' 
			var entry = null; 
			if( (id != null) && (id.length > 0) ) { 
				
				entry = bkeeping.findEntry(id); 
			}
			else if( bkeeping.findEntry("new") != null ) { 
				
				entry = bkeeping.findEntry("new"); 
			}
			else { 
				
				entry = new bkeeping.Entry(); 
				entry["children"] = []; 
				
				entry["id"] = "new"; 
				entry["currency"] = pars["cc"]; 
				entry["date"] = ""; 
				entry["entrynum"] = null; 
				entry["journalid"] = ""; 
				entry["state"] = null; 
				entry["xmlns"] = "com/interrupt/bookkeeping/journal"; 
				
				//bkeeping.cache.entries[ bkeeping.cache.entries.length ] =
				bkeeping.cache.entries.push( { entry: entry } ); 
				
			}
			
			//** set the entry currency 
			if( pars["cc"] == null ) { 
				if( entry != null ) { 
					pars["cc"] = entry["currency"]; 
				}
			}
			
			var obj = null; 
			if( pars["ctype"] == "debit" ) {
				
				var debit = {	
						account: bkeeping.getAccountNameForId( pars["caid"] ), 
						accountid: pars["caid"], 
						amount: pars["ecamount"], 
						currency: pars["cc"], 
						entryid: "", 
						id: ( id != null ) ? id : "" , 
						xmlns: "com/interrupt/bookkeeping/account" 
				}
				obj = { 
					dname: bkeeping.getAccountNameForId( pars["caid"] ), 
					daid: pars["caid"], 
					damount: pars["ecamount"], 
					cname: "&nbsp;", 
					caid: "&nbsp;", 
					camount: "&nbsp;" 
				} 
				
				entry.children.push( { debit: debit } ); 
				
			}
			else { 
				
				var credit = {	
						account: bkeeping.getAccountNameForId( pars["caid"] ), 
						accountid: pars["caid"], 
						amount: pars["ecamount"], 
						currency: pars["cc"], 
						entryid: "", 
						id: ( id != null ) ? id : "" , 
						xmlns: "com/interrupt/bookkeeping/account" 
				}
				obj = {
					dname: "&nbsp;",
					daid: "&nbsp;",
					damount: "&nbsp;",
					cname: bkeeping.getAccountNameForId( pars["caid"] ),
					caid: pars["caid"],
					camount: pars["ecamount"]
				} 
				
				
				entry.children.push( { credit: credit } ); 
				
			}
			
			
			var entryPart = TENTRY_ROW.parse_vars( obj ); 
			var thing = $("#jentry_rows"); 
			$("#jentry_rows").append( entryPart ); 
			
			$('#bkeeping_dialog').dialog("close"); 
			
			//var ret = new type(thingtype, this.addedEdited, pars).run(); 
			
	}, 
	
	findJournalName: function(jid) { 
		
		var resultName = null; 
		for( var i = 0; i < bkeeping.cache.journals.length; i++ ) { 
			
			var eachJ = bkeeping.cache.journals[i]["journal"]; 
			if( eachJ["id"] == jid ) { 
				
				resultName = eachJ["name"]; 
				break; 
			}
			
		}
		
		return resultName; 
	},
	
	findAccountName: function(aid) { 
		
		var returnName = null; 
		for( var i = 0; i < bkeeping.cache.accounts.length; i++ ) { 
			
			var eachAccount = bkeeping.cache.accounts[i]["account"]; 
			if( eachAccount["id"] == aid ) { 
				
				returnName = eachAccount["name"]; 
				break; 
			}
		}
		
		return returnName; 
		
	}, 
	findAccountType: function(aid) { 
		
		var returnType = null; 
		for( var i = 0; i < bkeeping.cache.accounts.length; i++ ) { 
			
			var eachAccount = bkeeping.cache.accounts[i]["account"]; 
			if( eachAccount["id"] == aid ) { 
				
				returnType = eachAccount["type"]; 
				break; 
			}
		}
		
		return returnType; 
		
	}, 
	findEntry: function(eid) { 
		
		var entry = null; 
		for( var i = 0; i < bkeeping.cache.entries.length; i++ ) { 
			
			var eachEntry = bkeeping.cache.entries[i]["entry"]; 
			if( eachEntry["id"] == eid ) { 
				
				entry = eachEntry; 
				break; 
			}
		}
		
		return entry; 
		
	}, 
	
	addEditJournal: function(thingtype, id, returnHandler) // id is null on adds
	{
		
		// raise correct form
		var x = eval("AE_" + thingtype.toUpperCase());
		var form = x[1]; 
		
		var journalName = bkeeping.findJournalName(id); 
		
		// could be vars: 
		form = form.parse_vars( { 'name': journalName } ); 
		bkeeping.showModalDialog(form); 
		$('#bkeeping_dialog').dialog('option', 'title', x[0]); 
		
		$('#bkeeping_dialog').dialog('option', 'buttons', { "CANCEL": function() { $(this).dialog("close"); }, "SAVE": returnHandler }); 
		
		return true; 
	},
	
	addEditAccount: function(thingtype, id, returnHandler) // id is null on adds
	{
		
		// raise correct form
		var x = eval("AE_" + thingtype.toUpperCase());
		var form = x[1]; 
		
		var accountName = bkeeping.findAccountName(id); 
		var accountType = bkeeping.findAccountType(id); 
		
		// could be vars: 
		form = form.parse_vars( { accounts:bkeeping.getAccountTypesAsOptionsList(accountType), aname: accountName } ); 
		bkeeping.showModalDialog(form); 
		$('#bkeeping_dialog').dialog('option', 'title', x[0]); 
		
		$('#bkeeping_dialog').dialog('option', 'buttons', { "CANCEL": function() { $(this).dialog("close"); }, "SAVE": returnHandler }); 
		
		return true; 
	},
	
	addEditEntry: function(thingtype, id, eid, returnHandler) // id is null on adds
	{
		
		// raise correct form 
		var x = eval("AE_" + thingtype.toUpperCase()); 
		var form = x[1]; 
		var obj = {}; 
		if( (eid != undefined) && (eid != null) ) { 
			obj["entryid"] = eid
		}
		
		var entryF = bkeeping.findEntry(eid); 
		
		// find entry part 
		if( entryF != null ) { 
		
			var entryPartF = null; 
			for( var i=0; i < entryF.children.length; i++ ) { 
				
				var eachC = entryF.children[i]; 
				var thing = null; 
				
				if( eachC["credit"] || eachC["debit"] ) { 
					
					if( eachC["credit"] ) { 
						
						obj["entry_ctype"] = " selected='selected' "; 
						thing = eachC["credit"]; 
					}
					else if( eachC["debit"] ) { 
						
						obj["entry_dtype"] = " selected='selected' "; 
						thing = eachC["debit"]; 
					}
					
					var accountType = bkeeping.findAccountType( thing["accountid"] ); 
					obj["accounts"] = bkeeping.getAccountsAsOptionsList(accountType); 
					obj["evalue"] = thing["amount"]; 
					
					if( thing["currency"] == "CDN" ) { 
						obj["curr_cdn"] = " selected='selected' "; 
					}
					else if( thing["currency"] == "USD" ) { 
						obj["curr_usd"] = " selected='selected' "; 
					}
					else if( thing["currency"] == "BP" ) { 
						obj["curr_bp"] = " selected='selected' "; 
					}
					else if( thing["currency"] == "EUR" ) { 
						obj["curr_eur"] = " selected='selected' "; 
					}
					else if( thing["currency"] == "JPN" ) { 
						obj["curr_jpn"] = " selected='selected' "; 
					}
				
				}
			
			}
		}
		else { 
			
			obj["accounts"] = bkeeping.getAccountsAsOptionsList(null); 
		}
		
		
		// could be vars: 
		form = form.parse_vars( obj ); 
		
		bkeeping.showModalDialog(form); 
		$('#bkeeping_dialog').dialog('option', 'title', x[0]); 
		
		$('#bkeeping_dialog').dialog('option', 'buttons', { "CANCEL": function() { $(this).dialog("close"); }, "SAVE": returnHandler }); 
		
		return true; 
	},
	
	saveEntry: function(id) 
	{
		
		var type = id ? this.EditCommand : this.AddCommand;
		var pars = this.wrapFormAsObj();
		pars['date'] = bkeeping.getCurrentDate();
		pars['id'] = id;
		pars['jid'] = bkeeping._displayed_journal;
		pars['username'] = bkeeping.ACTIVE_SESSION["loggedInUserid"]; 
		
		
		//** TODO [done] 
		//** 1. findEntry 'entryid' or 'new' 
		var entry = null; 
		if( id.length > 0 ) { 
			
			entry = bkeeping.findEntry(id); 
		}
		else { 
			
			entry = bkeeping.findEntry("new"); 
			entry["id"] = ""; 
		}
		
		if( entry != null ) { 
			pars["cc"] = entry["currency"]; 
		}
		
		
		//** 2. ensure balances 
		var dsumDEBIT = 0; 
		var csumDEBIT = 0; 
		
		var dsumCREDIT = 0; 
		var csumCREDIT = 0; 
		
		for( var i = 0; i < entry["children"].length; i++ ) {  //** sum up debits & credits 
			
			
			//** on debit side ( asset / expense )
			//** on credit side ( liability / revenue )
			if( entry["children"][i]["credit"] ) { 
				
				var thing = entry["children"][i]["credit"]; 
				
				// check account type
				var atype = bkeeping.findAccountType( thing["accountid"] ); 
				if( atype == "asset" || atype == "expense" ) { 
					
					csumDEBIT += parseFloat( thing["amount"] ); 
				}
				else if( atype == "liability" || atype == "revenue" ) { 
					
					csumCREDIT += parseFloat( thing["amount"] ); 
				}
				
			}
			else if( entry["children"][i]["debit"] ) { 
				
				var thing = entry["children"][i]["debit"]; 
				
				// check account type
				var atype = bkeeping.findAccountType( thing["accountid"] ); 
				if( atype == "asset" || atype == "expense" ) { 
					
					dsumDEBIT += parseFloat( thing["amount"] ); 
				}
				else if( atype == "liability" || atype == "revenue" ) { 
					
					dsumCREDIT += parseFloat( thing["amount"] ); 
				}
				
			}
			
		}
		
		
		/**
		 * check that debits and credots are balanced 
		 */
		var lhs = csumDEBIT + dsumCREDIT; 
		var rhs = csumCREDIT + dsumDEBIT; 
		if( lhs != rhs ) { 
			
			alert("debit and credits are not equal"); 
			return false; 
		}
		
		
		/**
		 * 
		 * 3. build  debit and credit XML parts 
		 */
		pars['debitsANDcredits'] = "";
		for( var i = 0; i < entry["children"].length; i++ ) {  //** sum up debits & credits 
			
			
			if( entry["children"][i]["credit"] ) { 
				
				var cthing = entry["children"][i]["credit"]; 
				var cthingXML = "<credit xmlns='com/interrupt/bookkeeping/account' id='"+ cthing["id"] +"' amount='"+ 
					cthing["amount"] +"' entryid='"+ cthing["entryid"] +"' accountid='"+ cthing["accountid"] +"' account='"+ 
					cthing["account"] +"' currency='"+ cthing["currency"] +"'/>"; 
				
				pars['debitsANDcredits'] += cthingXML; 
				
			}
			else if( entry["children"][i]["debit"] ) { 
				
				var dthing = entry["children"][i]["debit"]; 
				var dthingXML = "<debit xmlns='com/interrupt/bookkeeping/account' id='"+ dthing["id"] +"' amount='"+ 
					dthing["amount"] +"' entryid='"+ dthing["entryid"] +"' accountid='"+ dthing["accountid"] +"' account='"+ 
					dthing["account"] +"' currency='"+ dthing["currency"] +"'/>"; 
				
				pars['debitsANDcredits'] += dthingXML; 
				
			}
			
		}
		
		
		//** 4. refresh the entries list at the end of 'run'
		var ret = new type("entry", this.addedEdited, pars).run(); 
		
	}, 
	
	addAccount: function()
	{	
		var returnHandler = bkeeping.goAccountPart.bind(this, "account", null); 
		bkeeping.addEditAccount("account", null, returnHandler);
	},
	
	editAccount: function(aid)
	{
		var returnHandler = bkeeping.goAccountPart.bind(this, "account", aid); 
		bkeeping.addEditAccount("account", aid, returnHandler);
	},

	deleteAccount: function()
	{
		
	},

	addJournal: function()
	{	
		var returnHandler = bkeeping.goJournalPart.bind(this, "journal", null); 
		return bkeeping.addEditJournal("journal", null, returnHandler); 
	},
	
	editJournal: function(jid)
	{
		
		var returnHandler = bkeeping.goJournalPart.bind(this, "journal", jid); 
		
		bkeeping.addEditJournal("journal", jid, returnHandler); 
		
		/*var a = new bkeeping.GetCommand("journal", jid, function(journalObj)
		{
			$("#journal_name").val(journalObj.getName());
			//$("#journal_type").val(journalObj.getType());
			//$("#journal_balance").val(journalObj.getBalance());
		}).run();
		*/
		
	}, 

	deleteJournal: function()
	{
		
	},
	
	addEntry: function()
	{
		return bkeeping.showJournalEntry(null); 
	},
	
	addEditEntryPart: function(id, eid)
	{ 
		var returnHandler = bkeeping.goJournalEntryPart.bind(this, "entry", null); 
		bkeeping.addEditEntry("entry", id, eid, returnHandler); 
	}, 
	
	editEntry: function(eid)
	{
		bkeeping.showJournalEntry( eid );
		var a = new bkeeping.GetCommand("entry", eid, function(entryObj)
		{
			$("#entry_caid").val(entryObj.getCaid());
			$("#entry_daid").val(entryObj.getDaid());
			$("#entry_ecamount").val(entryObj.getEcamount());
			$("#entry_edamount").val(entryObj.getEdamount());
			$("#entry_cc").val(entryObj.getCurrency());
		}).run();
	},
	
	deleteEntry: function()
	{
		//var a = new bkeeping.RemoveCommand("entry", callback)... 
		
	},
	
	_displayed_journal: null,
	showJournal: function(id)
	{
		
		//** clear previous content 
		var jrows = document.getElementById( "j_rows" ); 
		jrows["innerHTML"] = ""; 
		
		
		//** show journal UI 
		var journalUI = $("#journal_ui"); 
		journalUI.css("display", "block"); 
		
		
		bkeeping._displayed_journal = id;
		$("#_journal_id").html(id);
		
		new bkeeping.ListCommand("entries", bkeeping.displayEntries, id).run();
	},
	
	showJournalEntry: function(id)
	{
		
		//** clear previous content 
		var erows = document.getElementById( "jentry_rows" ); 
		erows["innerHTML"] = ""; 
		
		
		var eui = $("#entry_ui"); 
		eui.css("display", "block"); 
		
		var eui2 = document.getElementById( "entry_ui" ); 	// trying to put the entryid in the template 
		
		eui2["innerHTML"].parse_vars = String.prototype.parse_vars; 
		eui2["innerHTML"] = eui2["innerHTML"].parse_vars( { entryid: id } ); 
		
		
		$("#_journalentry_id").html(id);
		
		if(id) { 
			new bkeeping.ListCommand("entry", bkeeping.displayEntry, id).run(); 
		}
	},
	
	isAauthFailure: function( jsonData ) { 
		
		var thing = jsonData["logs"]["children"][0]["log"]["children"][0]["logMessages"]["children"][0]["logMessage"]["value"]; 
		if( (thing != undefined) || (thing != null) ) { 
			
			var containS = thing.indexOf("Authenticated"); 
			if( containS > 0 ) { 
				return true; 
			}
			
		}
		return false; 
	}, 
	
	getGenericFailureReason: function(jsonData)
	{
		var r;
		try 
		{
			r = jsonData["logs"]["children"][0]["log"]["children"][0]["logMessages"]["children"][0]["logMessage"]["value"];
		}
		catch (e)
		{
			bkeeping.debug(e);
			r = "Unknown.";
		}
		return r;
	},

	loadProfile: function(data)
	{
		for (var i = 0; i < data.length; i++)
		{
			var o = data[i]["profileDetail"];
			$("#" + o.id).val(o.value);
		}
	},

	GetprofileCommand: function(callback)
	{
		this.callback = callback;

		function isSuccess(jsonData)
		{
			return (jsonData && jsonData["user"]);
		}

		var getFailureReason = bkeeping.getGenericFailureReason;

		function handleResponse(jsonData, textStatus)
		{
			if (isSuccess(jsonData))
			{
				var u = new bkeeping.User(jsonData["user"]);
				setTimeout(callback.bind(this, u.getProfileDetailsList()), 1000);
			}
			else
			{
				var reason = getFailureReason(jsonData);
				alert("Failed to get profile.  Reason: " + reason);
			}
		}
		
		this.run = function()
		{
			bkeeping.send_bkexpr("getprofile", GETPROFILE_COMMAND.parse_vars({username:bkeeping.ACTIVE_SESSION.loggedInUserid}), handleResponse.bind(this));
		}
	},

	RegisterCommand: function(username, password, firstname, lastname, email, country, currency, updating)
	{
		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.country = country; 
		this.currency = currency; 
		this.updating = updating;

		function isSuccess(jsonData)
		{
			return (jsonData && jsonData["user"]);
		}

		var getFailureReason = bkeeping.getGenericFailureReason;

		function handleResponse(jsonData, textStatus)
		{
			 
			// put back the 'Loading...' message 
			$('#loading-msg').animate({ left: -100 }, { duration: 750, easing: 'swing', queue: false }); 
			
			
			// on successful register, user is redirected to the home page and messaged about his ability to login or that his changes were saved
			if (isSuccess(jsonData))
			{
				var flag = "canlogin";
				if (this.updating)
				{
					flag = "changessaved";
				}
				setTimeout("document.location.href='accounts.html';", 0);
			}
			else
			{
				// show a UI for registration failure:
				var reason = getFailureReason(jsonData);
				var verb = "register";
				if (this.updating)
				{
					verb = "save changes"
				}
				alert("Failed to " + verb + ".  Reason: " + reason);
			}
		}

		this.run = function()
		{
			var command = REGISTER_COMMAND;
			var cname = "register";
			if (this.updating)
			{
				command = UPDATEPROFILE_COMMAND;
				cname = "updateprofile";
			} 
			bkeeping.send_bkexpr(cname, command.parse_vars({username: this.username, password: this.password, firstname: this.firstname, lastname: this.lastname, email: this.email, country: this.country, currency: this.currency}), handleResponse.bind(this));
		}
	},
	
	LoginCommand: function(username, password)
	{
		this.username = username;
		this.password = password;
		
		function isSuccess(jsonData)
		{
			return (jsonData && jsonData["userSession"]);
		}
		
		var getFailureReason = bkeeping.getGenericFailureReason;
		
		function handleResponse(jsonData, textStatus)
		{
			
			// put back the 'Loading...' message 
			$('#loading-msg').animate({ left: -100 }, { duration: 750, easing: 'swing', queue: false }); 
			
			
			// on successful login, user is redirected to the accounts page (accounts.html) 
			if (isSuccess(jsonData))
			{
				
				// set the session
				var us = new bkeeping.UserSession(jsonData["userSession"]);
				bkeeping.ACTIVE_SESSION.update(us.getSessionId(), us.getUser(), us.getGroup()).save(); 
				
				// go to the accounts page
				setTimeout("document.location.href='accounts.html';", 2000);
			}
			else
			{
				// show a UI for login failure:
				var reason = getFailureReason(jsonData);
				alert("Failed to login.  Reason: " + reason);
			}
		}

		this.run = function()
		{
			bkeeping.send_bkexpr("login", LOGIN_COMMAND.parse_vars({username: this.username, password: this.password}), handleResponse.bind(this));
		}
	},
	
	LogoutCommand: function()
	{
		
		function isSuccess(jsonData)
		{
			
			return (jsonData && !(jsonData["logs"])); 
		}

		var getFailureReason = bkeeping.getGenericFailureReason;

		function handleResponse(jsonData, textStatus)
		{
			// on successful logout, user is redirected to the home page 
			if (isSuccess(jsonData))
			{
				// go to the accounts page
				bkeeping.ACTIVE_SESSION.clear();
				setTimeout('document.location.href = "'+ bkeeping.ROOT_URL +'";', 2000); 
				
			}
			else
			{
				// show a UI for login failure:
				var reason = getFailureReason(jsonData);
				alert("Failed to logout.  Reason: " + reason);
			}
		}

		this.run = function()
		{
			bkeeping.send_bkexpr("logout", "logout;", handleResponse.bind(this));
		}
	},
	
	
	getEntryBalance: function( entryF ) { 
		
		
		//** 2. ensure balances 
		var dsumDEBIT = 0; 
		var csumDEBIT = 0; 
		
		var dsumCREDIT = 0; 
		var csumCREDIT = 0; 
		
		var entry = entryF["root"]; 
		
		for( var i = 0; i < entry["children"].length; i++ ) {  //** sum up debits & credits 
			
			
			//** on debit side ( asset / expense )
			//** on credit side ( liability / revenue )
			if( entry["children"][i]["credit"] ) { 
				
				var thing = entry["children"][i]["credit"]; 
				
				// check account type
				var atype = bkeeping.findAccountType( thing["accountid"] ); 
				if( atype == "asset" || atype == "expense" ) { 
					
					csumDEBIT += parseFloat( thing["amount"] ); 
				}
				else if( atype == "liability" || atype == "revenue" ) { 
					
					csumCREDIT += parseFloat( thing["amount"] ); 
				}
				
			}
			else if( entry["children"][i]["debit"] ) { 
				
				var thing = entry["children"][i]["debit"]; 
				
				// check account type
				var atype = bkeeping.findAccountType( thing["accountid"] ); 
				if( atype == "asset" || atype == "expense" ) { 
					
					dsumDEBIT += parseFloat( thing["amount"] ); 
				}
				else if( atype == "liability" || atype == "revenue" ) { 
					
					dsumCREDIT += parseFloat( thing["amount"] ); 
				}
				
			}
			
		}
		
		/**
		 * check that debits and credots are balanced 
		 */
		var lhs = csumDEBIT + dsumCREDIT; 
		var rhs = csumCREDIT + dsumDEBIT; 
		if( lhs != rhs ) { 
			
			alert("debit and credits are not equal"); 
			return false; 
		}
		
		return lhs; 
	}, 
	
	displayAccounts: function(accountListObj)
	{
		var as = accountListObj.getAccounts();
		if( as ) { 
			
			var lister = $("#acl_rows");
			var html = ""; 
			for (var i = 0; i < as.length; i++)
			{
				var a = as[i];
				if( a["root"] ) { 
					
					//var obj = { rowid: a.getId(), aname: a.getName(), category: a.getType(), balance: a.getBalance() };
					var obj = { rowid: a.getId(), aname: a.getName(), category: a.getType() };
					html += ACCOUNT_ROW.parse_vars(obj);
				}
			}
			lister.html(html); 
		}
	},

	displayJournals: function(journalListObj)
	{
		var js = journalListObj.getJournals();
		if( js ) { 
			var lister = $("#js_rows");
			var html = ""; 
			for (var i = 0; i < js.length; i++)
			{
				var j = js[i];
				if( j["root"] ) { 
					var obj = { rowid: j.getId(), jname: j.getName() };
					html += JOURNAL_ROW.parse_vars(obj); 
				}
			}
			lister.html(html); 
		}
	},
	
	//** display all the entries in a journal 
	displayEntries: function(entryListObj)
	{
		var es = entryListObj.getEntries();
		var lister = $("#j_rows");
		var html = ""; 
		if(es) { 
			for (var i = 0; i < es.length; i++)
			{
				var e = es[i];
				
				// ??? xxx not sure what data to put here
				//var obj = { rowid: e.getId(), date: (e.getDate() || "<none>"), entry: ("..." + e.getId().substring(e.getId().length - 6) || "<none>"), balance: (e.getBalance() || "0.00") };
				
				if( e["root"] != undefined ) { 
					
					var bal = bkeeping.getEntryBalance( e ); 
					
					var obj = { 
						rowid: e.getId(), 
						date: (e.getDate() || "<none>"), 
						entry: ("..." + e.getId().substring(e.getId().length - 20) || "<none>"), 
						balance: bal 
					};
					
					
					html += ENTRY_ROW.parse_vars(obj); 
				}
				
			}
		}
		lister.html(html);
	},
	
	//** display the debit / credits in a single entry 
	displayEntry: function(entryListObj)
	{
		var es = entryListObj.getEntries();
		var lister = $("#jentry_rows");
		var html = ""; 
		if(es) { 
			for (var i = 0; i < es.length; i++)
			{
				var e = es[i]; 
				
				// ??? xxx not sure what data to put here 
				//var obj = { rowid: e.getId(), date: (e.getDate() || "<none>"), entry: ("..." + e.getId().substring(e.getId().length - 6) || "<none>"), balance: (e.getBalance() || "0.00") };
				
				//var obj = { rowid: e.getId(), date: (e.getDate() || "<none>"), entry: ("..." + e.getId().substring(e.getId().length - 6) || "<none>"), balance: ( "0.00" ) };
				
				var obj = {}; 
				if( e["type"] == "debit" ) { 
					obj = { 
						dname: e.getAccount(), 
						damount: e.getAmount(), 
						cname: "&nbsp;", 
						camount: "&nbsp;" 
					}; 
				}
				else if( e["type"] == "credit" ) { 
					obj = {
						dname: "&nbsp;", 
						damount: "&nbsp;", 
						cname: e.getAccount(), 
						camount: e.getAmount() 
					}; 
				}
				
				obj["rowid"] = e.getId(); 
				obj["eid"] = entryListObj["root"]["id"]; 
				
				html += TENTRY_ROW.parse_vars(obj); 
				
			}
		}
		lister.html(html);
	},
	
	objectIsOfType: function(obj, single_or_plural_type)
	{
		var t = (single_or_plural_type.charAt(single_or_plural_type.length - 1) == 's') ? (single_or_plural_type.substring(0, single_or_plural_type.length - 1)) : single_or_plural_type;
		if (t == 'entrie') { t = "entry"; }
		if (obj && obj[t])
		{
			return true;
		}
		return false;
	},
	
	addToCacheAsList: function(plural_type, listObj)
	{
		var list = listObj.getAsRawList();
		bkeeping.debug('AddToCacheAsList: listing (' + plural_type + '/' + list.length + ')');
		bkeeping.debug(list);
		if (list && (list.length > 0))
		{
			for (var i = 0; i < list.length; i++)
			{
				if (bkeeping.objectIsOfType(list[i], plural_type))
				{
					bkeeping.addToCache(plural_type, null, list[i]);
				}
			}
		}
	},

	addToCache: function(plural_type, id, jsonData)
	{
		var found = false;
		var single_type = (plural_type == 'entries') ? 'entry' : plural_type.substring(0, plural_type.length - 1);
		for (var i = 0; i < bkeeping.cache[plural_type].length; i++)
		{
			var item = bkeeping.cache[plural_type][i];
			bkeeping.debug('addToCache:iterating cache, found item ' + item[single_type].id + '/' + id);
			bkeeping.debug(item);
			if (item && (item[single_type].id == id))
			{
				// item could be changed, so re-add
				found = true;
				bkeeping.cache[plural_type][i] = jsonData;
			}
		}
		if (!found)
		{
			bkeeping.debug('addToCache: pushing jsonData onto cache');
			bkeeping.debug(jsonData);
			bkeeping.cache[plural_type].push(jsonData);
		}
	},

	getFromCache: function(plural_type, id)
	{
		var single_type = (plural_type == 'entries') ? 'entry' : plural_type.substring(0, plural_type.length - 1);
		for (var i = 0; i < bkeeping.cache[plural_type].length; i++)
		{
			var item = bkeeping.cache[plural_type][i];
			bkeeping.debug('getFromCache:iterating cache, found item ' + item[single_type].id + '/' + id);
			bkeeping.debug(item);
			if (item && (item[single_type].id == id))
			{
				return item;
			}
		}
	},

	deleteFromCache: function(single_type, id)
	{
		var plural_type = (single_type == 'entry') ? 'entries' : (single_type + 's');
		for (var i = 0; i < bkeeping.cache[plural_type].length; i++)
		{
			var item = bkeeping.cache[plural_type][i];
			bkeeping.debug('deleteFromCache:iterating cache, found item ' + item[single_type].id + '/' + id);
			bkeeping.debug(item);
			if (item && (item[single_type].id == id))
			{
				delete bkeeping.cache[plural_type][i];
				break;
			}
		}		
	},

	GetCommand: function(calltype, id, callback)
	{
		this.calltype = calltype;
		this.calltype_list = (this.calltype == 'entry') ? 'entries' : (this.calltype + 's');
		this.id = id;
		this.callback = callback;
		this.command = "";
		this.type = "";
		var u = bkeeping.ACTIVE_SESSION.loggedInUserid;
		var g = (u == 'root') ? "webkell" : (u + '.group');
		this.pars = {username: u, group: g, id: this.id};
		switch (this.calltype)
		{
			case "account":
				this.command = GETACCOUNT_COMMAND;
				this.type = bkeeping.Account;
				break;
			case "journal":
				this.command = GETJOURNAL_COMMAND;
				this.type = bkeeping.Journal;
				break;
			case "entry":
				this.command = GETENTRY_COMMAND;
				this.type = bkeeping.Entry;
				this.pars['jid'] = bkeeping._displayed_journal;
				break;
			default:
				alert("Unknown calltype: " + this.calltype);
				break;
		}

		function isSuccess(jsonData)
		{
			return (jsonData && (jsonData[this.calltype]) || jsonData[this.calltype_list]);
		}

		var getFailureReason = bkeeping.getGenericFailureReason;

		function handleResponse(jsonData, textStatus, cached)
		{
			if (isSuccess.call(this, jsonData))
			{
				if (!cached || (cached != 'true'))
				{
					bkeeping.addToCache(this.calltype_list, this.id, jsonData);
				}
				return this.callback(new this.type(jsonData[this.calltype]));
			}
			else
			{
				// show a UI for login failure:
				var reason = getFailureReason(jsonData);
				alert("Failed to get list " + this.calltype + ".  Reason: " + reason);
			}
		}

		this.run = function()
		{
			var item = bkeeping.getFromCache(this.calltype_list, this.id);
			if (item)
			{
				bkeeping.debug('handling call type ' + this.calltype + '/' + this.id + ' from cache');
				handleResponse.call(this, item, 'success', 'true');
			}
			else
			{
				bkeeping.debug('handling call type ' + this.calltype + ' from ajax');
				var t = "get" + this.calltype;
				bkeeping.send_bkexpr(t, this.command.parse_vars(this.pars), handleResponse.bind(this));
			}
		}
	},
	
	
	setDefaultCurrency: function(profileDetailObj)
	{
		
		bkeeping.DEFAULT_CURRENCY = profileDetailObj["root"]["value"]; 
		
	}, 
	
	ListCommand: function(listtype, callback, optJournalid)
	{
		this.listtype = listtype;
		this.callback = callback;
		this.command = "";
		this.type = "";
		this.pars = { username: bkeeping.ACTIVE_SESSION.loggedInUserid }; 
		switch (this.listtype)
		{
			case "accounts":
				this.command = LISTACCOUNTS_COMMAND;
				this.type = bkeeping.AccountList;
				break;
			case "journals":
				this.command = LISTJOURNALS_COMMAND; 
				this.type = bkeeping.JournalList; 
				this.pars["journal"] = optJournalid; 
				break;
			case "entries": 
				this.command = LISTENTRIES_COMMAND; 
				this.type = bkeeping.EntryList; 
				this.pars["journal"] = bkeeping["_displayed_journal"]; 
				break; 
			case "entry": 
				this.command = LISTENTRY_COMMAND; 
				this.type = bkeeping.EntryList; 
				this.pars["journal"] = bkeeping["_displayed_journal"]; 
				this.pars["entry"] = optJournalid; 
				break; 
			default:
				alert("Unknown list: " + this.listtype); 
				break; 
		}
		
		function isSuccess(jsonData)
		{
			return (jsonData && jsonData[this.listtype]);
		}

		var getFailureReason = bkeeping.getGenericFailureReason;
		
		
		function handleResponse(jsonData, textStatus, cached)
		{
			
			if (cached || isSuccess.call(this, jsonData))
			{
				var r;
				if (cached && (cached == 'true'))
				{
					r = new this.type({ "children" : jsonData });
				}
				else
				{
					r = new this.type(jsonData[this.listtype]);
					bkeeping.debug("Add to cache as list in ListCommand: " + this.listtype);
					bkeeping.debug(r);
					bkeeping.addToCacheAsList(this.listtype, r);
				}
				return this.callback(r);
			}
			else if( bkeeping.isAauthFailure(jsonData) ) { 
				
				var msg = jsonData["logs"]["children"][0]["log"]["children"][0]["logMessages"]["children"][0]["logMessage"]["value"]; 
				//alert(msg); 
				
				var rootURL = document.URL.substring( 0, document.URL.lastIndexOf("accounts.html") ); 
				
				setTimeout("document.location.href='"+ rootURL +"';", 0); 
				
			}
			else
			{
				// show a UI for login failure:
				var reason = getFailureReason(jsonData);
				alert("Failed to get list " + this.listtype + ".  Reason: " + reason);
			}
		}

		this.run = function()
		{
			if ( (bkeeping.cache[this.listtype] != undefined) && (bkeeping.cache[this.listtype].length > 0) )
			{
				bkeeping.debug('handling list type ' + this.listtype + ' from CACHE');
				handleResponse.call(this, bkeeping.cache[this.listtype], 'success', 'true');
			}
			else
			{
				bkeeping.debug('handling list type ' + this.listtype + ' from AJAX');
				var t = "list" + this.listtype;
				bkeeping.send_bkexpr(t, this.command.parse_vars(this.pars), handleResponse.bind(this));
			}
		}
		
	}, 
	
	LoadCommand: function(listtype, callback, optJournalid)
	{
		this.listtype = listtype;
		this.callback = callback;
		this.command = "";
		this.type = "";
		this.pars = {username: bkeeping.ACTIVE_SESSION.loggedInUserid};
		switch (this.listtype)
		{
			case "profileDetail":
				this.command = LOADDEFAULTCURRENCY_COMMAND;
				this.type = bkeeping.DefaultCurrency;
				break;
			default:
				alert("Unknown list: " + this.listtype);
				break;
		}

		function isSuccess(jsonData)
		{
			return (jsonData && jsonData[this.listtype]);
		}

		var getFailureReason = bkeeping.getGenericFailureReason;

		function handleResponse(jsonData, textStatus)
		{
			if (isSuccess.call(this, jsonData))
			{
				this.callback(new this.type(jsonData[this.listtype])); 
			}
			else
			{ 
				// show a UI for login failure: 
				var reason = getFailureReason(jsonData);
				alert("Failed to get list " + this.listtype + ".  Reason: " + reason);
			}
		}

		this.run = function()
		{
			var t = "list" + this.listtype;
			bkeeping.send_bkexpr(t, this.command.parse_vars(this.pars), handleResponse.bind(this));
		}
	},
	
	
	/* pars is an object containing the data to be added */
	AddCommand: function(type, callback, pars)
	{
		// pars for account: ${aid} ${atype} ${aname} ${acw} ${username}
		// pars for journal: ${jid} ${jname} ${jtype} ${jbalance} ${username}
		// pars for entry: ${eid} ${cc} ${edid} ${edamount} ${aid} ${ecid} ${ecamount} ${username} ${jid}
		this.type = type;
		this.callback = callback;
		this.command = "";
		this.pars = pars;
		switch (this.type)
		{
			case "account":
				this.command = ADDACCOUNT_COMMAND; 
				
				this.type = "accounts"; 	// special case where what's returned will be an 'accounts' 
				break;
			case "journals":
				this.command = ADDJOURNAL_COMMAND;
				break;
			case "entry":
				this.command = ADDENTRY_COMMAND;
				break;
			default:
				alert("Unknown add: " + this.type);
				break;
		}

		function isSuccess(jsonData)
		{
			
			return (jsonData && ( jsonData["logMessages"] == undefined ) ); 
			
		}

		var getFailureReason = bkeeping.getGenericFailureReason;

		function handleResponse(jsonData, textStatus)
		{
			if (isSuccess.call(this, jsonData))
			{
				return this.callback(jsonData); 
			}
			else if( bkeeping.isAauthFailure(jsonData) ) { 
				
				var msg = jsonData["logs"]["children"][0]["log"]["children"][0]["logMessages"]["children"][0]["logMessage"]["value"]; 
				//alert(msg); 
				
				var rootURL = document.URL.substring( 0, document.URL.lastIndexOf("accounts.html") ); 
				
				setTimeout("document.location.href='"+ rootURL +"';", 0); 
				
			}
			else
			{
				// show a UI for login failure:
				var reason = getFailureReason(jsonData);
				alert("Failed to add " + this.type + ".  Reason: " + reason);
			}
		}

		this.run = function()
		{
			bkeeping.send_bkexpr("add" + this.type, this.command.parse_vars(pars), handleResponse.bind(this));
		}
	},

	RemoveCommand: function(type, callback, pars)
	{
		// pars for account: ${aid}
		// pars for journal: ${jid}
		// pars for entry: ${eid}
		this.type = type;
		this.callback = callback;
		this.command = "";
		switch (this.type)
		{
			case "account":
				this.command = REMOVEACCOUNT_COMMAND;
				break;
			case "journals":
				this.command = REMOVEJOURNAL_COMMAND;
				break;
			case "entry":
				this.command = REMOVEENTRY_COMMAND;
				break;
			default:
				alert("Unknown remove: " + this.type);
				break;
		}

		function isSuccess(jsonData)
		{
			return (jsonData && jsonData[this.type]);
		}

		var getFailureReason = bkeeping.getGenericFailureReason;

		function handleResponse(jsonData, textStatus)
		{
			if (isSuccess.call(this, jsonData))
			{
				return this.callback(jsonData);
			}
			else
			{
				// show a UI for login failure:
				var reason = getFailureReason(jsonData);
				alert("Failed to add " + this.type + ".  Reason: " + reason);
			}
		}

		this.run = function()
		{
			bkeeping.send_bkexpr("remove" + this.type, this.command.parse_vars( pars ), handleResponse.bind(this) );
		}
	},

	/* pars is an object containing the data to be added */
	EditCommand: function(type, callback, pars)
	{
		// pars for account: ${aid} ${atype} ${aname} ${acw} ${username}
		// pars for journal: ${jid} ${jname} ${jtype} ${jbalance} ${username}
		// pars for entry: ${eid} ${cc} ${edid} ${edamount} ${aid} ${ecid} ${ecamount} ${username} ${jid}
		this.type = type;
		this.callback = callback;
		this.command = "";
		this.pars = pars;
		switch (this.type)
		{
			case "account":
				this.command = UPDATEACCOUNT_COMMAND;
				break;
			case "journal":
				this.command = UPDATEJOURNAL_COMMAND;
				break;
			case "entry":
				this.command = UPDATEENTRY_COMMAND;
				break;
			default:
				alert("Unknown edit: " + this.type);
				break;
		}

		function isSuccess(jsonData)
		{
			return (jsonData && ( jsonData["logMessages"] == undefined ) ); 
		}

		var getFailureReason = bkeeping.getGenericFailureReason;

		function handleResponse(jsonData, textStatus)
		{
			if (isSuccess.call(this, jsonData))
			{
				return this.callback(jsonData);
			}
			else if( bkeeping.isAauthFailure(jsonData) ) { 
				
				var msg = jsonData["logs"]["children"][0]["log"]["children"][0]["logMessages"]["children"][0]["logMessage"]["value"]; 
				//alert(msg); 
				
				var rootURL = document.URL.substring( 0, document.URL.lastIndexOf("accounts.html") ); 
				
				setTimeout("document.location.href='"+ rootURL +"';", 0); 
				
			}
			else
			{
				// show a UI for login failure:
				var reason = getFailureReason(jsonData);
				alert("Failed to add " + this.type + ".  Reason: " + reason);
			}
		}

		this.run = function()
		{
			bkeeping.send_bkexpr("edit" + this.type, this.command.parse_vars(pars), handleResponse.bind(this));
		}
	},
	/* ******** */

	/* ajax */
	error: function(xmlHttpRequest, textStatus, errorThrown)
	{
		bkeeping.raise('There was a problem with the server request: ' + textStatus + '/' + errorThrown);
	},

	success: function(data, textStatus)
	{
		bkeeping.log('genericSuccess');
	},

	complete: function(xmlHttRequest, textStatus)
	{
		bkeeping.log('genericComplete');
	},

	// caveat: this function does NOT handle xml with textnodes mixed in with other element children
	xmlRecurse: function(node, context)
	{
		// squeeze the attributes and add to the context
		var attributes = node.attributes;
		if (attributes)
		{
			for (var i = 0; i < attributes.length; i++)
			{
				var n = attributes[i].name;
				var v = attributes[i].nodeValue;
				context[n] = v;
			}
		}
		// recurse:
		var children = node.childNodes;
		if (children)
		{
			if (children.length > 0)
			{
				if ((children.length == 1) && (children[0].nodeType == 3)) // 3 is text node
				{
					context["value"] = children[0].textContent;
				}
				else
				{
					if (!context["children"])
					{
						context["children"] = [];
					}
					for (var j = 0; j < children.length; j++)
					{
						var p = {};
						p[children[j].nodeName] = {};
						context["children"].push(p);
						this.xmlRecurse(children[j], p[children[j].nodeName]);
					}
				}
			}
		}
		return context;
	},

	// caveat: this function does NOT handle xml with textnodes mixed in with other element children
	xmlToJson: function(data, type)
	{
		if (!data)
		{
			return "";
		}
		var xmlDoc;
		var json = {};
		try //Internet Explorer
		{
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = "false";
			xmlDoc.loadXML(data);
		}
		catch(e)
		{
			var parser = new DOMParser();
			//xmlDoc = parser.parseFromString(data, "text/xml");
			xmlDoc = data;
		}

		// convert to json (simplified greatly)
		// we'll take advantage of the fact that all the data being passed around is linked to attributes
		// and thus we'll go ahead and make our json like this:
		// <name1 attr1=val attr2=val...>
		//   <name2 attr3=val attr4=val...>
		//   <name2 attr5=val attr6=val...>
		//   <name3 attr7=val attr8=val...>
		// </name1>
		//
		// becomes this:
		// { 
		//   "name1":
		//   {
		//      "attr1": val,
		//      "attr2": val,
		//      "value": null,  // special value -- the text node child of this ele, exclusive with children
		//      "children":
		//      [
		//         {
		//            "name2":
		//            {
		//               "attr3": val,
		//               "attr4": val
		//            }
		//         },
		//         {
		//            "name2":
		//            {
		//               "attr5": val,
		//               "attr6": val
		//            }
		//         },
		//         {
		//            "name3":
		//            {
		//               "attr7": val,
		//               "attr8": val
		//            }
		//         }
		//      ]
		//   }
		// }
		var root = xmlDoc.firstChild;
		json[root.nodeName] = {};
		//json[root.nodeName] = this.xmlRecurse(root, json[root.nodeName]);
		json[root.nodeName] = bkeeping.xmlRecurse(root, json[root.nodeName]);
		return json;
	},

                                        zzz: function (xhr, ajaxOptions, thrownError) {
                                                        alert(xhr.status);
                                                        alert(thrownError);
                                        }, 
	send_bkexpr: function(bkexprname, expr, callback, optErrorCallback, optCompleteCallback)
	{
		if ( MOCK_DATA == "true" || MOCK_DATA == true )
		{
			var r;
			if (MOCK_DATA_FAILURES_MODE)
			{
				r = MOCK_DATA["failures"][bkexprname];
			}
			else
			{
				r = MOCK_DATA["successes"][bkexprname];
			}
			var response = r.response.parse_vars(_LAST_PARSED_DICT);
			var type = r.type;
			var textStatus = r.textStatus;
			var sanitizedData = this.xmlToJson(response, type);
			callback(sanitizedData, textStatus);
		}
		else
		{
			var url = (PROD_ENV) ? "/webkell" : "/webkell/webkell";
			if (bkexprname == "register")
			{
				url = (PROD_ENV) ? "/authenticate" : "/webkell/authenticate";
			}
			$.ajax(
				{
					success: callback || bkeeping.success,
					error: optErrorCallback || bkeeping.error,
                    complete: optCompleteCallback || bkeeping.complete,
					data: {"bkexpr": expr},
					dataFilter: this.xmlToJson,
					dataType: "xml",
					type: "POST",
					url: url
				}
			);
		}
	},
	/* **** */

	/* initialization */
	displayLoginBlurb: function()
	{
		$("#loggedinnote").css('display', "block");
		var template = $("#loggedinnote").html();
		$("#loggedinnote").html(template.parse_vars({"name": bkeeping.ACTIVE_SESSION.loggedInUserid}));
		try
		{
			$("#loginholder").css("visibility", "hidden");
		}
		catch(e)
		{
			// element not there
		}
	},

	page_loader_init: function()
	{
		if (window.page_loader)
		{
			page_loader(); // defined in e.g. accounts.html, or any other UI page
		}
	},

	page_init: function()
	{
		var path = document.location.href.match(/^http:\/\/[^\/]+\/(.*)$/);
		if (path)
		{
			path = path[1];
			// cut off querystring and hash
			if (path.indexOf("?") > -1)
			{
				path = path.substring(0, path.indexOf("?"));
			}
			if (path.indexOf("#") > -1)
			{
				path = path.substring(0, path.indexOf("#"));
			}
			// if it's under webkell, remove that:
			if (path.indexOf("webkell") == 0)
			{
				path = path.substring(8);
			}
		}
		else
		{
			path = "home";
		}

		if ((path == "") || (path == "/") || (path == "index.html"))
		{
			path = "home";
		}

		switch (path)
		{
			case "home":
				// this is not exactly efficient, but we'll do this til we're on a proper server-side template engine
				var mode = document.location.href.substring(document.location.href.indexOf("mode=") + 5).match(/^(\w+)(.*)$/);
				if (!mode)
				{
					mode = "home";
				}
				else
				{
					mode = mode[1];
				}
				$("#contentbox").load(mode + ".html");
				if (mode == "userprofile")
				{
					var u = new bkeeping.GetprofileCommand(bkeeping.loadProfile).run();
				}
				break;;
			case "accounts.html":
				// do nothing, this UI is generated dynamically
				break;;
			default:
				bkeeping.debug("Not a known page: " + path);
				break;;
		}
		if (bkeeping.ACTIVE_SESSION.loaded)
		{
			bkeeping.displayLoginBlurb();
		}

		var flag = document.location.href.indexOf("flag=");
		if (flag != -1)
		{
			var value = document.location.href.substring(flag);
			if (value.indexOf("canlogin") != -1)
			{
				bkeeping.showDialog("You have registered successfully.  You can now log in.")
			}
			if (value.indexOf("changessaved") != -1)
			{
				bkeeping.showDialog("Your changes have been saved.");
			}
		}
	},

	init: function()
	{
		bkeeping.ACTIVE_SESSION = new bkeeping.Session(); // load from cookie if present
		if (!$("#bkeeping_dialog").length)
		{
			$("body").append(DIALOG_HOLDER);
		}
		//bkeeping.page_init(); // initializations related to the page we're on
		//bkeeping.page_loader_init(); // initializations defined on the page we're on
	},

	unload: function()
	{
		
	}
	/* ************ */
};

/* prototypes */
bkeeping.AccountList.prototype = new bkeeping.Lister(); 
bkeeping.JournalList.prototype = new bkeeping.Lister(); 
bkeeping.EntryList.prototype = new bkeeping.Lister(); 

bkeeping.DefaultCurrency.prototype = new bkeeping.Lister(); 


/* ********** */

$(document).ready(bkeeping.init);
$(window).unload(bkeeping.unload);

var MOCK_DATA =
{
	successes:
	{
		login:
		{
			response: "<userSession xmlns='com/interrupt/bookkeeping/users' id='c4e2e5344b91c6c1-1c82792712270d305b2-7ffd' groupid='${username}' userid='${username}' />",
			type: "xml",
			textStatus: "OK"
		},

		register:
		{
			response: "<user xmlns='com/interrupt/bookkeeping/users' id='${username}' username='${username}' password='${password}' logintimeout='600000' accountLevel='FREE' defaultGroup='webkell' authenticated=''>" +
						"<profileDetails xmlns='com/interrupt/bookkeeping/users' id='user.details'>" +
						  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='firstname' name='first.name' value='${firstname}'/>" +
						  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='lastname' name='last.name' value='${lastname}'/>" +
						  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='email' name='email' value='${email}'/>" +
						  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='country' name='country' value='${country}'/>" +
						"</profileDetails>" +
					  "</user>",
			type: "xml",
			textStatus: "OK"
		},

		getprofile:
		{
			response: "<user xmlns='com/interrupt/bookkeeping/users' id='${username}' username='${username}' password='${password}' logintimeout='600000' accountLevel='FREE' defaultGroup='webkell' authenticated=''>" +
						"<profileDetails xmlns='com/interrupt/bookkeeping/users' id='user.details'>" +
						  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='username' name='user.name' value='ed'/>" +
						  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='password' name='password' value='foo'/>" +
						  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='firstname' name='first.name' value='Eddie'/>" +
						  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='lastname' name='last.name' value='Abrams'/>" +
						  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='email' name='email' value='ed@abra.ms'/>" +
						  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='country' name='country' value='Canada'/>" +
						"</profileDetails>" +
					  "</user>",
			type: "xml",
			textStatus: "OK"
		},

		updateprofile:
		{
			response: "<user xmlns='com/interrupt/bookkeeping/users' id='${username}' username='${username}' password='${password}' logintimeout='600000' accountLevel='FREE' defaultGroup='webkell' authenticated=''>" +
						"<profileDetails xmlns='com/interrupt/bookkeeping/users' id='user.details'>" +
						  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='username' name='user.name' value='${username}'/>" +
						  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='password' name='password' value='${password}'/>" +
						  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='firstname' name='first.name' value='${firstname}'/>" +
						  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='lastname' name='last.name' value='${lastname}'/>" +
						  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='email' name='email' value='${email}'/>" +
						  "<profileDetail xmlns='com/interrupt/bookkeeping/users' id='country' name='country' value='${country}'/>" +
						"</profileDetails>" +
					  "</user>",
			type: "xml",
			textStatus: "OK"
		},

		listaccounts:
		{
			response: "<accounts id='main.accounts'>" +
						"<account id='05' name='bankaccount' type='asset' counterWeight='debit' currency=''/>" +
						"<account id='06' name='creditcard' type='liability' counterWeight='credit' currency=''/>" +
					  "</accounts>",
			type: "xml",
			textStatus: "OK"
		},

		listjournals:
		{
			response: "<journals xmlns:journal='com/interrupt/bookkeeping/journal' id='main.journals'>" +
						"<journal id='generalledger' name='generalledger' type='' balance=''>" +
							"<entries id='main.entries'>" +
								"<entry id='qwertySTUB' entrynum='' state='' journalid='generalledger' date='' currency='CDN'>" +
									"<debit xmlns:account='com/interrupt/bookkeeping/account' id='dtS' amount='120.00' entryid='qwertySTUB' accountid='05' account='' currency='CDN'/>" +
									"<credit xmlns:account='com/interrupt/bookkeeping/account' id='crS' amount='120.00' entryid='qwertySTUB' accountid='06' account='' currency='CDN'/>" +
								"</entry>" +
							"</entries>" +
						"</journal>" +
						"<journal id='otherledger' name='otherledger' type='' balance=''>" +
							"<entries id='main.entries'>" +
								"<entry id='qwertySTUB' entrynum='' state='' journalid='generalledger' date='' currency='CDN'>" +
									"<debit xmlns:account='com/interrupt/bookkeeping/account' id='dtS' amount='120.00' entryid='qwertySTUB' accountid='05' account='' currency='CDN'/>" +
									"<credit xmlns:account='com/interrupt/bookkeeping/account' id='crS' amount='120.00' entryid='qwertySTUB' accountid='06' account='' currency='CDN'/>" +
								"</entry>" +
							"</entries>" +
						"</journal>" +
					"</journals>",
			type: "xml",
			textStatus: "OK"			
		},

		listentries:
		{
			response: "<entries id='main.entries'>" +
						"<entry id='qwertySTUB' entrynum='' state='' journalid='generalledger' date='' currency='CDN'>" +
							"<debit xmlns:account='com/interrupt/bookkeeping/account' id='dtS' amount='120.00' entryid='qwertySTUB' accountid='05' account='' currency='CDN'/>" +
							"<credit xmlns:account='com/interrupt/bookkeeping/account' id='crS' amount='120.00' entryid='qwertySTUB' accountid='06' account='' currency='CDN'/>" +
						"</entry>" +
					  "</entries>",
			type: "xml",
			textStatus: "OK"
		},

		addaccount:
		{
			response: "<account id='${aid}' name='${aname}' type='${atype}' counterWeight='${acn}' currency='${cc}'/>",
			type: "xml",
			textStatus: "OK"
		},

		removeaccount:
		{
			response: "",
			type: "xml",
			textStatus: "OK"
		},

		editaccount:
		{
			response: "<account id='${aid}' name='${aname}' type='${atype}' counterWeight='${acw}' currency='${cc}'/>",
			type: "xml",
			textStatus: "OK"
		},

		addjournal:
		{
			response: "<journal id='${jid}' name='${jname}' type='${jtype}' balance='${jbalance}'>" +
//							"<entries id='main.entries'>" +
//								"<entry id='qwertySTUB' entrynum='' state='' journalid='generalledger' date='' currency='CDN'>" +
//									"<debit xmlns:account='com/interrupt/bookkeeping/account' id='dtS' amount='120.00' entryid='qwertySTUB' accountid='05' account='' currency='CDN'/>" +
//									"<credit xmlns:account='com/interrupt/bookkeeping/account' id='crS' amount='120.00' entryid='qwertySTUB' accountid='06' account='' currency='CDN'/>" +
//								"</entry>" +
//							"</entries>" +
					  "</journal>",
			type: "xml",
			textStatus: "OK"
		},

		removejournal:
		{
			response: "",
			type: "xml",
			textStatus: "OK"
		},

		editjournal:
		{
			response: "<journal id='${jid}' name='${jname}' type='${jtype}' balance='${jbalance}'>" +
//							"<entries id='main.entries'>" +
//								"<entry id='qwertySTUB' entrynum='' state='' journalid='generalledger' date='' currency='CDN'>" +
//									"<debit xmlns:account='com/interrupt/bookkeeping/account' id='dtS' amount='120.00' entryid='qwertySTUB' accountid='05' account='' currency='CDN'/>" +
//									"<credit xmlns:account='com/interrupt/bookkeeping/account' id='crS' amount='120.00' entryid='qwertySTUB' accountid='06' account='' currency='CDN'/>" +
//								"</entry>" +
//							"</entries>" +
					  "</journal>",
			type: "xml",
			textStatus: "OK"
		},

		addentry:
		{
			response: "<entry id='${eid}' entrynum='' state='' journalid='${jid}' date='' currency='${cc}'>" +
							"<debit xmlns:account='com/interrupt/bookkeeping/account' id='${edid}' amount='${edamount}' entryid='${eid}' accountid='${aid}' account='' currency='${cc}'/>" +
							"<credit xmlns:account='com/interrupt/bookkeeping/account' id='${ecid}' amount='${ecamount}' entryid='${eid}' accountid='${aid}' account='' currency='${cc}'/>" +
					  "</entry>",
			type: "xml",
			textStatus: "OK"
		},

		removeentry:
		{
			response: "",
			type: "xml",
			textStatus: "OK"
		},

		editentry:
		{
			response: "<entry id='${eid}' entrynum='' state='' journalid='${jid}' date='' currency='${cc}'>" +
							"<debit xmlns:account='com/interrupt/bookkeeping/account' id='${edid}' amount='${edamount}' entryid='${eid}' accountid='${aid}' account='' currency='${cc}'/>" +
							"<credit xmlns:account='com/interrupt/bookkeeping/account' id='${ecid}' amount='${ecamount}' entryid='${eid}' accountid='${aid}' account='' currency='${cc}'/>" +
					  "</entry>",
			type: "xml",
			textStatus: "OK"
		}
	},
	failures:
	{
		login:
		{
			response: "<logs>" +
						"<log level=''>" +
							"<logMessages>" +
								"<logMessage>Failed to login.</logMessage>" +
							"</logMessages>" +
						"</log>" +
					  "</logs>",
			type: "xml",
			textStatus: "OK"
		},

		register:
		{
			response: "<logs>" +
						"<log level=''>" +
							"<logMessages>" +
								"<logMessage>Failed to register.</logMessage>" +
							"</logMessages>" +
						"</log>" +
					  "</logs>",
			type: "xml",
			textStatus: "OK"
		},

		getprofile:
		{
			response: "<logs>" +
						"<log level=''>" +
							"<logMessages>" +
								"<logMessage>Failed to get user profile.</logMessage>" +
							"</logMessages>" +
						"</log>" +
					  "</logs>",
			type: "xml",
			textStatus: "OK"
		},

		updateprofile:
		{
			response: "<logs>" +
						"<log level=''>" +
							"<logMessages>" +
								"<logMessage>Failed to update user profile.</logMessage>" +
							"</logMessages>" +
						"</log>" +
					  "</logs>",
			type: "xml",
			textStatus: "OK"
		},

		listaccounts:
		{
			response: "<logs>" +
						"<log level=''>" +
							"<logMessages>" +
								"<logMessage>Failed to get accounts list.</logMessage>" +
							"</logMessages>" +
						"</log>" +
					  "</logs>",
			type: "xml",
			textStatus: "OK"			
		},

		listjournals:
		{
			response: "<logs>" +
						"<log level=''>" +
							"<logMessages>" +
								"<logMessage>Failed to get journals list.</logMessage>" +
							"</logMessages>" +
						"</log>" +
					  "</logs>",
			type: "xml",
			textStatus: "OK"			
		},

		listentries:
		{
			response: "<logs>" +
						"<log level=''>" +
							"<logMessages>" +
								"<logMessage>Failed to get entries list.</logMessage>" +
							"</logMessages>" +
						"</log>" +
					  "</logs>",
			type: "xml",
			textStatus: "OK"			
		},

		addaccount:
		{
			response: "<logs>" +
						"<log level=''>" +
							"<logMessages>" +
								"<logMessage>Failed to add account.</logMessage>" +
							"</logMessages>" +
						"</log>" +
					  "</logs>",
			type: "xml",
			textStatus: "OK"
		},

		removeaccount:
		{
			response: "<logs>" +
						"<log level=''>" +
							"<logMessages>" +
								"<logMessage>Failed to remove account.</logMessage>" +
							"</logMessages>" +
						"</log>" +
					  "</logs>",
			type: "xml",
			textStatus: "OK"
		},

		editaccount:
		{
			response: "<logs>" +
						"<log level=''>" +
							"<logMessages>" +
								"<logMessage>Failed to edit account.</logMessage>" +
							"</logMessages>" +
						"</log>" +
					  "</logs>",
			type: "xml",
			textStatus: "OK"
		},

		addjournal:
		{
			response: "<logs>" +
						"<log level=''>" +
							"<logMessages>" +
								"<logMessage>Failed to add journal.</logMessage>" +
							"</logMessages>" +
						"</log>" +
					  "</logs>",
			type: "xml",
			textStatus: "OK"
		},

		removejournal:
		{
			response: "<logs>" +
						"<log level=''>" +
							"<logMessages>" +
								"<logMessage>Failed to remove journal.</logMessage>" +
							"</logMessages>" +
						"</log>" +
					  "</logs>",
			type: "xml",
			textStatus: "OK"
		},

		editjournal:
		{
			response: "<logs>" +
						"<log level=''>" +
							"<logMessages>" +
								"<logMessage>Failed to edit journal.</logMessage>" +
							"</logMessages>" +
						"</log>" +
					  "</logs>",
			type: "xml",
			textStatus: "OK"
		},

		addentry:
		{
			response: "<logs>" +
						"<log level=''>" +
							"<logMessages>" +
								"<logMessage>Failed to add entry.</logMessage>" +
							"</logMessages>" +
						"</log>" +
					  "</logs>",
			type: "xml",
			textStatus: "OK"
		},

		removeentry:
		{
			response: "<logs>" +
						"<log level=''>" +
							"<logMessages>" +
								"<logMessage>Failed to remove entry.</logMessage>" +
							"</logMessages>" +
						"</log>" +
					  "</logs>",
			type: "xml",
			textStatus: "OK"
		},

		editentry:
		{
			response: "<logs>" +
						"<log level=''>" +
							"<logMessages>" +
								"<logMessage>Failed to edit entry.</logMessage>" +
							"</logMessages>" +
						"</log>" +
					  "</logs>",
			type: "xml",
			textStatus: "OK"
		}
	}
};

var _TEST_AC = "<accounts id='main.accounts'>" +
						"<account id='05' name='bankaccount' type='asset' counterWeight='debit' currency=''/>" +
						"<account id='06' name='creditcard' type='liability' counterWeight='credit' currency=''/>" +
					  "</accounts>";
var _TEST_XML = "<bookkeeping xmlns='com/interrupt/bookkeeping' xmlns:account='com/interrupt/bookkeeping/account' xmlns:journal='com/interrupt/bookkeeping/journal' xmlns:currency='com/interrupt/bookkeeping/currency' id='main.bookkeeping'>" +
					"<currency:currencies id='main.currencies' default='CDN'>" +
						"<currency:currency id='CDN' name='Canadian Dollar'/>" +
						"<currency:currency id='USD' name='US Dollar'/>" +
						"<currency:currency id='BP' name='British Pound'/>" +
						"<currency:currency id='EUR' name='Euoropean Euro'/>" +
						"<currency:currency id='JPN' name='Japanese Yen'/>" +
					"</currency:currencies>" +
				    "<accounts xmlns='com/interrupt/bookkeeping/account' id='main.accounts'>" +
					    "<account xmlns='com/interrupt/bookkeeping/account' type='asset' id='' name='' counterWeight='debit'/>" +
					"</accounts>" +
					"<journal:journals id='main.journals'>" +
						"<journal:journal id='generalledger' name='generalledger' type='' balance=''>" +
							"<journal:entries id='main.entries'>" +
								"<journal:entry id='qwertySTUB' entrynum='' state='' journalid='generalledger' date='' currency='CDN'>" +
			  						  "<debit xmlns='com/interrupt/bookkeeping/account' id='dtS' amount='120.00' entryid='qwertySTUB' accountid='05' account='' currency='CDN'/>" +
			  						  "<credit xmlns='com/interrupt/bookkeeping/account' id='crS' amount='120.00' entryid='qwertySTUB' accountid='06' account='' currency='CDN'/>" +
			 					"</journal:entry>" +
							"</journal:entries>" +
						"</journal:journal>" +
					"</journal:journals>" +
				"</bookkeeping>";

