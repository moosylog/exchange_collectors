// bitFlyer API v1 Private Request in Google Apps Script (GAS).
// By Moosy Research, see more cryptosheets on: https://sites.google.com/site/moosyresearch/projects/cryptos

function FLY_GetBalances() {  
  var FLYrequest = {
   'id'         : 'FLY',
   'name'       : 'bitFlyer',
   'apikey'     : '•••••••••',
   'secret'     : '•••••••••',
   'command'    : '/v1/me/getbalance',   
   'uri'        : 'https://api.bitflyer.com',
   'method'     : 'GET',
   'payload'    : ''
  }; 
 var response = FLY_PrivateRequest(FLYrequest);
 Logger.log( JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) ); 
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
         'ACCESS-KEY'        : FLYrequest.apikey,
         'ACCESS-TIMESTAMP'  : timestamp,
         'ACCESS-SIGN'       : sign,
         'Content-Type'      : 'application/json'
       }, 
     } 
     return  { uri: FLYrequest.uri + FLYrequest.command, params: params};
}
