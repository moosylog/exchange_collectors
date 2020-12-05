// Coinbase API v2 Private Request in Google Apps Script (GAS).
// By Moosy Research, see more cryptosheets on: https://sites.google.com/view/moosyresearch

function CNB_GetBalances() {    
  var CNBrequest = {
   'id'         : 'CNB',
   'name'       : 'Coinbase',  
   'apikey'     : '•••••••••',
   'secret'     : '•••••••••',
   'command'    : '/v2/accounts',   
   'uri'        : 'https://api.coinbase.com',
   'method'     : 'GET',
   'payload'    : ''
  }; 
 
  var response = CNB_PrivateRequest(CNBrequest);
  Logger.log( JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) );
}



function CNB_PrivateRequest(CNBrequest) {    
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }

  var timestamp = Math.floor((new Date().getTime()/1000)).toString(),   
      payload   = timestamp + CNBrequest.method + CNBrequest.command + CNBrequest.payload,
      signature = HMACSHA256HEX(payload,CNBrequest.secret),
      params    = {
        'method'               : CNBrequest.method,  
        'muteHttpExceptions'   : true,     
        'headers': {        
          'Content-Type'         : 'application/json',
          'CB-ACCESS-SIGN'       : signature,
          'CB-ACCESS-TIMESTAMP'  : timestamp,
          'CB-ACCESS-KEY'        : CNBrequest.apikey,
          'CB-VERSION'           : '2020-04-18'
        } 
      }; 
  return  { uri: CNBrequest.uri + CNBrequest.command , params: params };
}





