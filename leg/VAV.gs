// Bitvavo | API Private Request in Google Apps Script (GAS).
// By Moosy Research, see more cryptosheets on: https://sites.google.com/site/moosyresearch/projects/cryptos



function VAV_GetBalances() {  
  var VAVrequest =  {
  'id'       : 'VAV',
  'name'     : 'Bitvavo',
  'apikey'   : EXKEY,
  'secret'   : EXSECRET,
  'uri'      :'https://api.bitvavo.com',
  'version'  : '/v2',
  "command"  : "/balance",
  'method'   :'GET',
  'payload'  :{}
  };
  
  
  if (ADATTRIB.toLowerCase().indexOf('demo') >= 0){
    var response  = [ {"symbol": "BTC","available": "0.07593193","inOrder": "0.01"},
                      {"symbol": "ETH","available": "1.1","inOrder": "1.74832374"}  ]   
 } else {
    // Browser.msgBox(VAVrequest.name+" Collector is under Development\\n\\nThis collector has not been tested with a live account. Please let me know if your balance is fetched.\\n\\nmoosylog@gmail.com");  
	DebugLog("Fetching from ....",VAVrequest.name);
    var request  = VAV_PrivateRequest(VAVrequest);
    DebugLog("URL ....",request.uri +  CreateURIQueryString(request.params,'?'));
    var response = UrlFetchApp.fetch(request.uri,request.params);
    if (response == "") { DebugLog("No data",VAVrequest.name); return null; }
    DebugLog("Receiving data from "+VAVrequest.name, response);
    response = JSON.parse(response);
  }
  
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox(VAVrequest.name+" Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(response)); }   
  try {  Logger.log(VAVrequest.name+": Validating received data "+response[0].symbol); } catch(e) {Logger.log(response); Logger.log(VAVrequest.name+" : no or empty response"); return null;}
  var array = [];
  for (r in response) {    
    //Logger.log(r.symbol);
    if ((Number(response[r]['available']) + Number(response[r]['inOrder'])) * 100000  > 0) {
      array.push({ curcodeEX: response[r].symbol, balance: Number(response[r]['available']) + Number(response[r]['inOrder']) });                       
    }
  }
  try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("To Sheet\\n\\n"+JSON.stringify(array)); }   } catch(e) {Logger.log("");}
  DebugLog("To Sheet", array);
  Logger.log(array);
  return (array);
}


function VAV_PrivateRequest(VAVrequest) {
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  
  // ** Create Payload - for balances the payload is empty
  var pld="";
  if (VAVrequest.hasOwnProperty('payload') === false) VAVrequest.payload = "";
  if (VAVrequest.payload == "" || VAVrequest.payload == null) pld = '{}';  
  try {pld = JSON.stringify(VAVrequest.payload);} catch(e) {pld = VAVrequest.payload;}
  if (pld.length < 4) pld = ""; 
  
  // ** Test to make sure we have the correc time, we request it from the Bitvavo server
  var time = JSON.parse(UrlFetchApp.fetch("https://api.bitvavo.com/v2/time"));
  var timestamp = time.time.toString(),
   
  //var timestamp  = Math.floor(new Date().getTime()).toString(),   
      message    = timestamp + VAVrequest.method + VAVrequest.version + VAVrequest.command + pld,
      params             = {
       'method'            : VAVrequest.method,
       'muteHttpExceptions': true,
	   'timeout'           : 30000,
       'headers': {
          'Bitvavo-Access-Key'       : VAVrequest.apikey,
          'Bitvavo-Access-Signature' : HMACSHA256HEX(message,VAVrequest.secret),
          'Bitvavo-Access-Timestamp' : timestamp,
          'Bitvavo-Access-Window'    : 10000      
       }
     }
  Logger.log(message);
  Logger.log(timestamp);
  Logger.log("1548172481125 samples timestamp from the docs");
  return  { uri: VAVrequest.uri+VAVrequest.version+VAVrequest.command, params: params};
}
