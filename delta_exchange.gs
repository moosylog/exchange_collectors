
// Delta Exchange API Private Request in Google Apps Script (GAS).
// By Moosy Research, see more cryptosheets on: https://sites.google.com/site/moosyresearch/projects/cryptos

function DEL_GetBalances(){

  var DELrequest = {
   "id"         : "DEL",
   "name"       : "DeltaExchange",
   "apikey"     : '•••••••••',
   "secret"     : '•••••••••',
   "command"    : "/v2/wallet/balances",  
   "uri"        : "https://api.delta.exchange",
   "method"     : "GET",
   "payload"    : ""
  }
  
  var response = DEL_PrivateRequest(DELrequest);
  Logger.log( JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) );
}
  
  
function DEL_PrivateRequest(DELrequest) {      
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  var timestamp      = Math.floor(new Date().getTime() / 1000).toString().substring(0, 10),
      signature_data = DELrequest.method + timestamp + DELrequest.command + '' + '',
      params      = {       
        method             : DELrequest.method,      
        muteHttpExceptions : true,
        headers            : {
                               'api-key'               : DELrequest.apikey,                     
                               'timestamp'             : timestamp,
                               'signature'             : HMACSHA256HEX(signature_data, DELrequest.secret),
                               'User-Agent'            : 'rest-client',
                               'Content-Type'          : 'application/json'
                             },
      
      };

  return  { uri: DELrequest.uri + DELrequest.command  , params: params};
}
  
