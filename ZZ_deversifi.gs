
// DeversiFi API Private Request in Google Apps Script (GAS).
// D R A F T   -  NO WORKING CODE 


// WHICH API TO USE?
// https://docs.deversifi.com/docs#postV1TradingRGetbalance
// https://github.com/DeversiFi/api-documentation/blob/master/trading/js/GetBalance.js
//
// or is it 
// https://github.com/DeversiFi/copper-api


function DSF_GetBalances(){
  var DSFrequest = {
   "id"         : "DSF",
   "name"       : "DeversiFi",
   "apikey"     : '•••••••••',
   "secret"     : '•••••••••',
   "command"    : "/balances",  
   "uri"        : "https://api.deversifi.com",
   "method"     : "GET",
   "payload"    : ""
  }
  var response = DSF_PrivateRequest(DELrequest);
  Logger.log( JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) );
}
  
  
function DEL_PrivateRequest(DSFrequest) {      
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  var timestamp      = Math.floor(new Date().getTime() / 1000).toString().substring(0, 10), // needs 16 digits
      signature_data = timestamp + DSFrequest.method + DELrequest.command + '' + '', 
      params         = {       
        method             : DSFrequest.method,      
        muteHttpExceptions : true,
        headers            : {
                               'Authorization'    : DSFrequest.apikey,                     
                               'X-Timestamp'      : timestamp,
                               'X-Signature'      : HMACSHA256HEX(signature_data, DSFrequest.secret),
                               'Content-Type'     : 'application/json'
                             },
        payload             : {
                               "token": "ETH",
                               "nonce": 1577836800000,
                               "signature": "0x1234abcd"
        }
      
      };

  return  { uri: DSFrequest.uri + DSFrequest.command  , params: params};
}
  
