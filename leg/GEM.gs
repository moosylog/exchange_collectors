
function GEM_Settings() {  
  var stn = {
   'id'         : 'GEM',
   'name'       : 'Gemini',
   'apikey'     : EXKEY,
   'secret'     : EXSECRET,
   'thirdattrib': '',
   'method'     : 'POST',
   'uri'        : 'https://api.gemini.com',
   'version'    : '',
   'command'    : "/v1/balances",
   'payload'    : ''
  };
  if (typeof ADATTRIB != 'undefined') stn.thirdattrib = ADATTRIB; 
  return stn;
}




function GEM_GetBalances() {
  var stn       = GEM_Settings(),                               // ** Binance settings
      debugpop  = false,                                        // ** Debug popup 
      response  = { data: null, status: true, message:   ""  }, // ** API response
      array     = [],                                           // ** Result array
      r         = 0;                                            // ** Counter for loops
    
  if (ADATTRIB.toLowerCase().indexOf('sandbox') >= 0) stn.uri = 'https://api.sandbox.gemini.com';

  var request = GEM_PrivateRequest(stn) ;
  DebugLog("URL ....",JSON.stringify(request));
  var response = JSON.parse(UrlFetchApp.fetch(request.uri,request.params));
  //DebugLog("Receiving data from "+stn.name, response);
  
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox(stn.name+" Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(response)); }   
  
  try {  Logger.log("Validating datatype "+response[0].currency); } catch(e) {Logger.log(response); Logger.log("no or empty response"); return null;}
  
  for (r in response) {    
    if (Number(response[r].available) * 100000  > 0 ) {
     array.push({
       curcodeEX: response[r].currency, 
       balance: response[r].available
     });   
   }
  }
  DebugLog(stn.name+" GetBalance", JSON.stringify(array)); 
  return array;
}


function GEM_PrivateRequest(stn) {
  function HMACSHA384HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_384, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  function stringToBase64(s) { return (Utilities.base64Encode(s)); }
    
  var pyld = {"request": stn.version+stn.command, "nonce": new Date().getTime() },  // add stn.payload
      params = {
        'method'               : stn.method,
        'muteHttpExceptions'   : true,
        'Content-Type'         : "text/plain",
        'headers': {
          "X-GEMINI-APIKEY"    : stn.apikey,
          "X-GEMINI-PAYLOAD"   : stringToBase64(JSON.stringify(pyld)),
          "X-GEMINI-SIGNATURE" : HMACSHA384HEX(stringToBase64(JSON.stringify(pyld)), stn.secret),
          "Cache-Control"      : "no-cache"
        }
   }
   return  { uri: stn.uri + stn.version + stn.command  , params: params};
}



function GEM_PublicRequest(stn) {
  var pyld = {"request": stn.version+stn.command, "nonce": new Date().getTime() },
      params = {
        'method'               : stn.method,
        'muteHttpExceptions'   : true,
        'Content-Type'         : "text/plain",
        'headers': {
          "Cache-Control"      : "no-cache"
        }
   }
   return  { uri: stn.uri + stn.version + stn.command  , params: params};s  
}
