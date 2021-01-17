
// ** Code 
function ZHS_Settings() {  
  var stn = {
   'id'         : 'ZHS',
   'name'       : 'ZeroHash',
   'apikey'     : EXKEY, 
   'secret'     : EXSECRET,
   'thirdattrib': ADATTRIB,
   'method'     : 'GET',
   'uri'        : 'https://api.zerohash.com', // sandbox is https://api.cert.zerohash.com
   'version'    : '',                         // not used
   'command'    : "/accounts",                // Doc https://zerohash.com/api/web/#accounts
   'payload'    : ""                          // Payload not used for /accounts
  };
  if (typeof ADATTRIB != 'undefined') stn.thirdattrib = ADATTRIB; 
  return stn;
}


function ZHS_GetBalance() {
  var stn       = ZHS_Settings(),                               // ** Get API settings
      response  = { data: null, status: true, message:   ""  }, // ** API response
      array     = [],                                           // ** Result array
      r         = 0;                                            // ** Counter for loops
    
  var request = ZHS_PrivateRequest(stn) ;
  DebugLog("URL ....",JSON.stringify(request));
  
  var response = UrlFetchApp.fetch(request.uri,request.params);
  DebugLog("Receiving data from "+stn.name, response);
  
  try { var response = JSON.parse(response); } catch(e) {Logger.log("No valid JSON data received"); return false;}
  if (stn.thirdattrib.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox(stn.name+" Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(response)); }   
  try {  Logger.log("Validating datatype "+response.message[0].asset); } catch(e) {Logger.log(response); Logger.log("no or empty response"); return null;}
  
  for (r in response.message) {    
    if (Number(response.message[r].balance) * 100000  > 0 ) {
     array.push({
       curcodeEX: response.message[r].balance, 
       balance: response.message[r].asset
     });   
   }
  }
  DebugLog(stn.name+" GetBalance", JSON.stringify(array)); 
  return array;
}



function ZHS_PrivateRequest(stn) {
  function HMACSHA256B64B(s, secret) { return (Utilities.base64Encode(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256,Utilities.base64Decode(Utilities.base64Encode(s)),Utilities.base64Decode(secret )))); }
  
  if (stn.payload == "" || stn.payload == null) stn.payload == '{}';  
  if (typeof stn.payload  === 'object') var pld = JSON.stringify(stn.payload); else var pld = stn.payload;
  if (stn.payload == "" || stn.payload == null || stn.payload == 'undefined)  { stn.payload == '{}'; pld = '{}' }
      Browser.msgBox(stn.payload +"\\n\\n"+stn.payload.length);
  
  var timestamp = Math.floor(new Date().getTime() / 1000).toString().substring(0, 10),
      payld     = timestamp + stn.method + stn.command + pld, // payload = timestamp + 'GET' + '/accounts' + '{}'
      signature = HMACSHA256B64B(payld, stn.secret),   
      params    = {
        'method'               : stn.method,
        'muteHttpExceptions'   : true,
        'Content-Type'         : "text/plain",
        'headers': {
          "X-SCX-API-KEY"      : stn.apikey,
          "X-SCX-SIGNED"       : signature,
          "X-SCX-TIMESTAMP"    : timestamp,
          "X-SCX-PASSPHRASE"   : stn.thirdattrib,
        }
   }
   
   Logger.log("");
   Logger.log(" signature = "+signature);
   Logger.log(" stn.payload = "+stn.payload);
   Logger.log(" payld = "+payld);
   Logger.log(" pld = "+stn.payload);
   Logger.log(" apikey = "+stn.apikey);
   Logger.log(" secret = "+stn.secret);
   Logger.log(" secret = "+stn.thirdattrib);
   Logger.log("");
  
   
   pld = "";
   if (stn.payload != "" && stn.method === "GET") pld = CreateURIQueryString(stn.payload,"?")     
   if (stn.payload != "" && stn.method === "POST") { params.payload = stn.payload; pld = ""; }
   return  { uri: stn.uri + stn.command + pld, params: params};
}





function ZHS_PublicRequest(stn) {
  try {var para=CreateURIQueryString(stn.payload,'?'); } catch (e) {var para = ""; }   
  var params = {
        'method'               : stn.method,
        'muteHttpExceptions'   : true,
        'Content-Type'         : "text/plain",
        'headers': {
        }
   }
   return  { uri: stn.uri + stn.command + para  , params: params};
}

