
function FLY_GetBalances() {  
  var FLYrequest = {
   "id"         : "FLY",
   "name"       : "bitFlyer",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "command"    : "/v1/me/getbalance",   
   "uri"        : "https://api.bitflyer.com",
   "method"     : "GET",
   "payload"    : ""
  }; 
 
 var array    = [],
     response = FLY_PrivateRequest(FLYrequest),
     dataAll  = JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) ;
 
  for (r in dataAll) { 
    array.push({
      curcodeEX: dataAll[r].currency_code, 
      balance: dataAll[r].amount
    });   
  }
  Logger.log(dataAll);
  Logger.log("*****************");
  Logger.log(array);
  return (array);
}



function FLY_PrivateRequest(FLYrequest) {      
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  var timestamp = Date.now().toString(),
      payld     = timestamp + FLYrequest.method +FLYrequest.command+FLYrequest.payload, 
      sign      = HMACSHA256HEX(payld, FLYrequest.secret),
      
      params    = {
       'method'            : FLYrequest.method,  
       'muteHttpExceptions': true,
       'payload'           : FLYrequest.payload, 
       headers: {
         'ACCESS-KEY'       : FLYrequest.apikey,
         'ACCESS-TIMESTAMP' : timestamp,
         'ACCESS-SIGN'      : sign,
         'Content-Type'     : 'application/json'
       }, 
     } 
     return  { uri: FLYrequest.uri + FLYrequest.command, params: params};
}


function FLY_PublicRequest(FLYrequest) {   
      params    = {
       'method'            : FLYrequest.method,  
       'muteHttpExceptions': true,
       'payload'           : FLYrequest.payload, 
       headers: {
         'Content-Type'     : 'application/json'
       }, 
     } 
     return  { uri: FLYrequest.uri + FLYrequest.command, params: params};
}