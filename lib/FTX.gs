function FTX_GetBalances() {   
  
  var FTXrequest = {
   "id"         : "FTX",
   "name"       : "FTX Exchange",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "thirdattrib": "",
   "command"    : "/wallet/all_balances",    // ** show all 
   "uri"        : "https://ftx.com/api",
   "method"     : "GET",
   "payload"    : ""
  }; 

 
 Logger.log('FTX_GetBalances()');
 if (typeof ADATTRIB != 'undefined') FTXrequest.thirdattrib = ADATTRIB; 
  
 Logger.log("ATA="+ADATTRIB);
 if (ADATTRIB.toLowerCase().indexOf('demo') >= 0) {
   Logger.log("Demo data");
   var response = 
   {
     "success": true,
     "result": {
       "main": [
        {"coin": "USDTBEAR","free": 2320.2,"total": 2340.2 },
        {"coin": "BTC","free": 2.0,"total": 3.2}],
    "nino": [
      {
        "coin": "USD",
        "free": 2000.0,
        "total": 2200.0 }]
    }
  } 
  } else 
    
  {  
    DebugLog("Fetching from ....",FTXrequest.name);
    var request  = FTX_PrivateRequest(FTXrequest);
    DebugLog("URL ....",JSON.stringify(request));
    var response = JSON.parse(UrlFetchApp.fetch(request.uri,request.params));
    DebugLog("Receiving data from "+FTXrequest.name, response);
    if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox(FTXrequest.name+" Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(response)); }   
  }
  
  
  try {  var pnt =response.result.main; } catch(e) {Logger.log(response); Logger.log("no or empty response:"+UrlFetchApp.fetch(request.uri,request.params)); return null;}
  
  if (ADATTRIB == '' || ADATTRIB == 'demo') var pnt = response.result.main; 
  else {
    try { 
      ADATTRIB = ADATTRIB.replace(" demo", ""); 
      ADATTRIB = ADATTRIB.replace(" debug", ""); 
      Logger.log("ADATTRIB = "+ADATTRIB);
      eval('var pnt = response.result["'+ADATTRIB+'"];');  } catch(e) { Logger.log(""); }
  }  
   
  
  var array = [];
  for (r in pnt) { 
    array.push({
      curcodeEX: pnt[r].coin, 
      balance: pnt[r].total
    });   
  }
  Logger.log("=>");
  Logger.log(array);
  return (array);
}



function FTX_PrivateRequest(FTXrequest) {      
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  if (FTXrequest.hasOwnProperty('payload') === false) FTXrequest.payload = "";
  
  Browser.msgBox(FTXrequest.payload);
  Browser.msgBox(JSON.stringify(FTXrequest.payload));
  
  // ** compatability with older code, no /api in command
  var val=FTXrequest.command;
  if (FTXrequest.command.toLowerCase().indexOf('/api') < 0) val='/api'+FTXrequest.command;
  
  var pld=FTXrequest.payload;
  if (FTXrequest.payload != "" && FTXrequest.method === "GET") pld = CreateURIQueryString(JSON.parse(FTXrequest.payload),"?")  
    
  var timestamp = new Date().getTime().toString(),  
//      payld     = timestamp + FTXrequest.method +val+FTXrequest.payload,    // not sure, needs testing    
      payld     = timestamp + FTXrequest.method + val + pld,    // not sure, needs testing    
      
      sign      = HMACSHA256HEX(payld, FTXrequest.secret ),
      params    = {
       'method'            : FTXrequest.method,  
       'muteHttpExceptions': true,
       'headers': {
         'content-type'    : 'application/json',
         'Accept'          : 'application/json',
         'FTX-TS'          : timestamp, 
         'FTX-KEY'         : FTXrequest.apikey,
         'FTX-SIGN'        : sign
        }, // ** end headers
      }; // ** end params
   try {
     FTXrequest.thirdattrib = FTXrequest.thirdattrib.replace(" debug", ""); 
     if (FTXrequest.payload != "" && FTXrequest.method === "POST") { params.payload = FTXrequest.payload; pld = ""; }
     if (FTXrequest.thirdattrib != "" && FTXrequest.thirdattrib.length > 1) params.headers['FTX-SUBACCOUNT']=encodeURIComponent(FTXrequest.thirdattrib);
   } catch (e) { Logger.log("Err: FTX_PrivateRequest - thirdattrib missing?")}
       
  
  return  { uri: FTXrequest.uri + FTXrequest.command + pld, params: params};
  
}


function FTX_PublicRequest(FTXrequest) {  
  if (FTXrequest.hasOwnProperty('payload') === false) FTXrequest.payload = "";
  try {
     if (FTXrequest.payload != "") FTXrequest.payload = CreateURIQueryString(JSON.parse(FTXrequest.payload),"?")
   } catch (e) { Logger.log("Err: FTX_PublicRequest - error in FTX payload")}

  var params    = {
       'method'            : FTXrequest.method,  
       'muteHttpExceptions': true,
       'headers': {
         'content-type'    : 'application/json',
         'Accept'          : 'application/json',
        }, // ** end headers
      } // ** end params
 return  { uri: FTXrequest.uri + FTXrequest.command + FTXrequest.payload, params: params};
}
