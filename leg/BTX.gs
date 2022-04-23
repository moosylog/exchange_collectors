// 15 nov 2020

function BTX_Settings() {  
  var stn =  {
  "exchange" :"Bittrex",
   "apikey"   : EXKEY,
   "secret"   : EXSECRET,
   "uri"      :"https://api.bittrex.com",
   "version"  :"/v3",
   "method"   :"GET",
   "payload"  :""
  };
  return stn;
}


// ** PUBLIC FUNCTIONS

function BTX_Ticker_Test(){ Logger.log(BTX_Ticker('LTC-BTC'))};
function BTX_Ticker(market){
  var stn         =  BTX_Settings();
      stn.command = "/markets/"+market+"/ticker";
  var dataAll     = BTX_PublicFetch(stn); 
  if (dataAll != null) return ([[Number(dataAll.bidRate), Number(dataAll.askRate), Number(dataAll.lastTradeRate)]]); 
  return ([[0,0,0,]]); 
}

function BTX_GetMarkets() {
  var stn         =  BTX_Settings();
      stn.command = "/markets";
  var array       = [];
  var dataAll     = BTX_PublicFetch(stn);
  if (dataAll == null) return(null);  
  for (r in dataAll) {array.push([dataAll[r]['baseCurrencySymbol']+dataAll[r]['quoteCurrencySymbol'],dataAll[r]['symbol']]); }
  //Logger.log(array);  
  return (array);  
}


function BTX_PublicRequest(btxrequest) {   
 params       = {
    'method'            : btxrequest.method,
    'muteHttpExceptions': true,
    'headers': {
      'Content-Type'    :'application/json',
      'Accept'          :'application/json' 
    },
    //'payload' :  btxrequest.payload,
  }
  return  { uri: btxrequest.uri + btxrequest.version + btxrequest.command, params: params};
}

function BTX_PublicFetch(stn) {
  var response = BTX_PublicRequest(stn);
  try { return ( JSON.parse(UrlFetchApp.fetch(response.uri,response.params ))); } catch (e) {DebugLog("BTX_PublicFetch", e); return null;}; 
}







// ** PRIVATE FUNCTIONS

function BTX_GetBalances() {  
 var stn     =  BTX_Settings();
 stn.command = "/balances";
  
 var array   = [],
      dataAll = BTX_PrivateFetch(stn); 
 try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("Raw data received from API:\\n\\n"+JSON.stringify(dataAll)); }   } catch(e) {Logger.log("");}
 DebugLog("Bittrex: Received from API", dataAll); 
 for (var r in dataAll) { 
    if(parseFloat(dataAll[r]['total']*10000) > 0){
      array.push({ curcodeEX: dataAll[r]['currencySymbol'], balance:dataAll[r]['total'] });  } 
  }
  DebugLog("Bittrex: Pushed to Sheet", array); 
  try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("Pushed to Sheet:\\n\\n"+JSON.stringify(array)); }   } catch(e) {Logger.log("");}
  return(array);
}



function BTX_Getorderhistory(settings) { 
  var stn     =  BTX_Settings();
  stn.command = "/orders/closed";

  var array   = [],
      dataAll = BTX_PrivateFetch(stn); 
  
  
  try {
  if(dataAll[0]['direction'] == undefined || dataAll === null) { DebugLog("BTX_Getorderhistory", "Empty"); return(null); } else {DebugLog("BTX_Getorderhistory", dataAll);}
  } catch (e) { DebugLog("BTX_Getorderhistory", "Empty"); return(null); }
  
  for (r in dataAll) { 
    if (dataAll[r]['direction']=="BUY") {dataAll[r]['direction']="Buy";}
    if (dataAll[r]['direction']=="SELL") {dataAll[r]['direction']="Sell";}
    Logger.log("*******************");
	Logger.log(dataAll[r]);
	array.push({
      date:      new Date(dataAll[r]['closedAt'].substring(0, dataAll[r]['closedAt'].lastIndexOf("."))),
      type:      dataAll[r]['direction'],
      nmarket:   dataAll[r]['marketSymbol'].substring(dataAll[r]['marketSymbol'].indexOf("-")+1, dataAll[r]['marketSymbol'].length), 
      ncur:      dataAll[r]['marketSymbol'].substring(dataAll[r]['marketSymbol'].indexOf("-"), 0),
      quantity:  dataAll[r]['fillQuantity'],
      unitprice: Number(dataAll[r]['proceeds']) / Number(dataAll[r]['fillQuantity']),
      fee:       Number(dataAll[r]['commission']),
      nfeecur:   dataAll[r]['marketSymbol'].substring(dataAll[r]['marketSymbol'].indexOf("-")+1, dataAll[r]['marketSymbol'].length),
      ordernr:   ""
    });
  }
  Logger.log(array);
  return(array);  
}



 

function BTX_Getdeposithistory(settings) { 
  var stn     =  BTX_Settings();
  stn.command = "/deposits/closed";
  
  var array = [],
      dataAll = BTX_PrivateFetch(stn); 
  
  try {
  if(dataAll[0]['LastUpdated'] == undefined || dataAll === null) { DebugLog("BTX_Getdeposithistory", "Empty"); return(null); } else {DebugLog("BTX_Getdeposithistory", dataAll);}
  } catch (e) { DebugLog("BTX_Getdeposithistory", "Empty"); return(null); }
  for (r in dataAll) {
  array.push([   
    dataAll[r]['LastUpdated'].replace("T", " "),
    dataAll[r]['Currency'], 
    dataAll[r]['Amount'], 
    ToFiat(dataAll[r]['Currency'], dataAll[r]['Amount']),
    dataAll[r]['TxId'], 
    dataAll[r]['CryptoAddress'],
  ]); 
  }
  return (array);
}

function BTX_Getwithdrawhistory(settings) { 
 var stn     =  BTX_Settings();
  stn.command = "/withdrawals/closed";
  
  var array = [],
      dataAll = BTX_PrivateFetch(stn); 
//Logger.log(dataAll);
//return null;
//  var array = [];
//  var dataAll = BTX_PrivateFetch("account/getwithdrawalhistory","");

  try {
    if(dataAll[0]['completedAt'] == undefined || dataAll === null)  { DebugLog("BTX_Getwithdrawhistory", "Empty"); return(null); } else {DebugLog("BTX_Getwithdrawhistory", dataAll);}
  } catch (e)  { DebugLog("BTX_Getwithdrawhistory", "Empty"); return(null); }
  
  for (r in dataAll) {
  array.push([   
    dataAll[r]['completedAt'].replace("T", " "),
    dataAll[r]['currencySymbol'], 
    dataAll[r]['quantity'], 
    ToFiat(dataAll[r]['currencySymbol'], dataAll[r]['quantity']),
    dataAll[r]['txId'], 
    dataAll[r]['cryptoAddress'],
  ]); 
  }
  Logger.log(array);
  return (array); 
}



function BTX_PrivateFetch(stn) {
  var response = BTX_PrivateRequest(stn);
  try { return ( JSON.parse(UrlFetchApp.fetch(response.uri,response.params ))); } catch (e) {DebugLog("BTX_PrivateFetch", e); return null;}; 
}


function BTX_PrivateRequest(stn) {      
  function SHA512HEX(s)             { return ToHex(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_512, s)).toString(); }  
  function HMACSHA512HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  var nonce    = new Date().getTime().toString();
  if ( stn.payload != null)  JSON.stringify(stn.payload);
  contentHash  = SHA512HEX(stn.payload),
  params       = {
    'method'            : stn.method,
    'muteHttpExceptions': true,
    'headers': {
      'Api-Key'         : stn.apikey,
      'Api-Timestamp'   : nonce,
      'Api-Content-Hash': contentHash,
      'Api-Signature'   : HMACSHA512HEX(nonce + stn.uri + stn.version + stn.command + stn.method + contentHash, stn.secret),
      'Content-Type'    :'application/json',
      'Accept'          :'application/json' 
    },
    'payload' :  stn.payload,
  }
  return  { uri: stn.uri + stn.version + stn.command, params: params};
}



function BTX_Import(settings) { 
  var array     = [];
  var dataAll   = GetCSVSheet(settings); 
  DebugLog("BTX_Import", dataAll);
  if (dataAll==null) {return(null);}
  if (dataAll[1]['CommissionPaid'] == null ) {Browser.msgBox("Error: Is this a Bittrex file? Can not find [CommissionPaid]"); return(null);}
  for (r in dataAll) { 
    if (dataAll[r]['Type'].toUpperCase()=="LIMIT_BUY")  {dataAll[r]['Type']="Buy";}
    if (dataAll[r]['Type'].toUpperCase()=="LIMIT_SELL") {dataAll[r]['Type']="Sell";}
    array.push({
      date:      dataAll[r]['Closed'],
      type:      dataAll[r]['Type'],
      ncur:      dataAll[r]['Exchange'].substring(dataAll[r]['Exchange'].indexOf("-")+1, dataAll[r]['Exchange'].length), 
      nmarket:   dataAll[r]['Exchange'].substring(dataAll[r]['Exchange'].indexOf("-"), 0),
      quantity:  dataAll[r]['Quantity'],
      unitprice: dataAll[r]['Limit'],
      fee:       dataAll[r]['CommissionPaid'],
      nfeecur:   "BTC",
      ordernr:   ""
    });
  }
  return(array);
}

