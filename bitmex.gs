// BitMEX | Bitcoin Mercantile Exchange API Private Request Example by Moosy Research
// REST endpoints Authentication HMACSHA256HEX
// https://www.bitmex.com/app/restAPI
// Google Apps Script GAS

function BMX_GetBalance() {  
  var bmxrequest =  {
  'apikey'   : '•••••••••',
  'secret'   : '•••••••••',
  'uri'      :'https://testnet.bitmex.com/api',
  'version'  : "/v1/",
  "command"  : "user/margin?currency=all",
  'method'   :'GET',
  'payload'  :''
  };

 var response = BMX_PrivateRequest(bmxrequest);
 Logger.log( JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) );
}



function BMX_PrivateRequest(bmxrequest) {
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  var nonce          = (new Date().getTime() + 60000).toFixed(9).toString().substring(0, 10);   
  bmxrequest.payload = bmxrequest.method+"/api"+bmxrequest.version+bmxrequest.command+nonce;
  params             = {
    'method'            : bmxrequest.method,
    'muteHttpExceptions': true,
    'headers': {
      'api-key'         : bmxrequest.apikey,
      'api-signature'   : HMACSHA256HEX(bmxrequest.payload,bmxrequest.secret),
      'api-nonce'       : nonce,
      'Content-Type'    :'application/json',
      'Accept'          :'application/json' 
    }
  }
  return  { uri: bmxrequest.uri+bmxrequest.version+bmxrequest.command, params: params};
}

