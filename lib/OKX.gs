// not tested


// ** Code 
function OKX_Settings() {  
  var stn = {
   'id'         : 'OKX',
   'name'       : 'Okex',
   'apikey'     : EXKEY, 
   'secret'     : EXSECRET,
   'thirdattrib': ADATTRIB,
   'method'     : 'GET',
   'uri'        : 'www.okex.com',   
   'version'    : '',               
   'command'    : "/api/account/v3/wallet", 
   'payload'    : ""                        
  };
  if (typeof ADATTRIB != 'undefined') stn.thirdattrib = ADATTRIB; 
  return stn;
}


function OKX_GetBalance() {
  var stn       = OKX_Settings(),                               // ** Get API settings
      response  = { data: null, status: true, message:   ""  }, // ** API response
      array     = [],                                           // ** Result array
      r         = 0;                                            // ** Counter for loops
    
  var request = OKX_PrivateRequest(stn) ;
  DebugLog("URL ....",JSON.stringify(request));
  
  var response = UrlFetchApp.fetch(request.uri,request.params);
  DebugLog("Receiving data from "+stn.name, response);
  
  try { var response = JSON.parse(response); } catch(e) {Logger.log("No valid JSON data received"); return false;}
  if (stn.thirdattrib.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox(stn.name+" Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(response)); }   
  try {  Logger.log("Validating datatype "+response[0].balance); } catch(e) {Logger.log(response); Logger.log("no or empty response"); return null;}
  
  for (r in response) {    
    if (Number(response[r].balance) * 100000  > 0 ) {
     array.push({
       curcodeEX: response[r].currency, 
       balance: response[r].balance
     });   
   }
  }
  DebugLog(stn.name+" GetBalance", JSON.stringify(array)); 
  return array;
}



function OKX_PrivateRequest(stn) {
  function HMACSHA256B64(s, secret) { return (Utilities.base64Encode(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret))); }
  
  var pld="";
  if (stn.hasOwnProperty('payload') === false) stn.payload = "";
  if (stn.payload == "" || stn.payload == null) pld = '{}';  
  try {var pld = JSON.stringify(stn.payload);} catch(e) {var pld = stn.payload;}
  if (pld.length < 4) pld = ""; 

  var timestamp = Utilities.formatDate(new Date(), "UTC", 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\''),
      payld     = timestamp + stn.method + stn.command + pld; // payload = timestamp + 'GET' + '/accounts' + '{}'
      params    = {
        'method'               : stn.method,
        'muteHttpExceptions'   : true,
        'headers': {
          "OK-ACCESS-KEY"        : stn.apikey,                         // The APIKey as a String.
          "OK-ACCESS-SIGN"       : HMACSHA256B64(payld, stn.secret),   // The Base64-encoded signature (see Signing Messages subsection for details).
          "OK-ACCESS-TIMESTAMP"  : timestamp,                          // The timestamp of your request
          "OK-ACCESS-PASSPHRASE" : stn.thirdattrib,                    // The passphrase you specified when creating the APIKey.
          'content-type'         : 'application/json',
          'Accept'               : 'application/json',
        } // All request bodies should have content type application/json and must be valid JSON
   }
   pld = "";
   if (stn.payload != "" && stn.method === "GET") pld = CreateURIQueryString(stn.payload,"?")     
   if (stn.payload != "" && stn.method === "POST") { params.payload = stn.payload; pld = ""; }
   return  { uri: stn.uri + stn.command + pld, params: params};
}





function OKX_PublicRequest(stn) {
  try {var pld=CreateURIQueryString(stn.payload,'?'); } catch (e) {var pld = ""; }   
  if (pld.length < 4) pld = ""; 
  var params = {
        'method'               : stn.method,
        'muteHttpExceptions'   : true,
        'Content-Type'         : "application/json",
        'headers': {
          'content-type'         : 'application/json',
          'Accept'               : 'application/json',
        }
   }
   return  { uri: stn.uri + stn.command + pld  , params: params};
}




