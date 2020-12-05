
// Bybit | Bybit.com Crypto Exchange | Lightning Fast Matching Engine‎ API Private Request in Google Apps Script (GAS).
// By Moosy Research, check our cryptosheets on: https://sites.google.com/view/moosyresearch

function BYB_GetBalance() {  
  var bybrequest = {
   "id"         : "BYB",
   "name"       : "Bybit",
   "apikey"     : '•••••••••',
   "secret"     : '•••••••••',
   "command"    : "/open-api/wallet/fund/records",
 //  "uri"        : "https://api.bybit.com",
   "uri"        : "api-testnet.bybit.com",
   "apiversion" : "/v1/",
   "method"     : "get",
   "payload"    : ""
  }; 

 var response = BYB_PrivateRequest(bybrequest);
 Logger.log( JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) );
}


function BYB_PrivateRequest(bybrequest) {      
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  var timestamp = new Date().getTime().toString(),  
      payld     = 'api_key='+bybrequest.apikey+CreateURIQueryString(bybrequest.payload,"&")+'&timestamp='+timestamp,
      sign      = HMACSHA256HEX(payld,bybrequest.secret),
      params    = {
       'method'            : bybrequest.method,  
       'muteHttpExceptions': true,
       'headers': {
         'api-key'         : bybrequest.apikey,
         'timestamp'       : timestamp,
         'sign'            : sign,
         'Content-Type'    :'application/json',
       },
       //'payload'         : bybrequest.command
   } 
   payld = bybrequest.command+"?"+payld+"&sign="+sign;
   return  { uri: bybrequest.uri + payld,   params: params};
}
