// Gemini API Private Request in Google Apps Script (GAS).
// By Moosy Research, see more cryptosheets on: https://sites.google.com/view/moosyresearch

function GEM_GetBalance() {  
  var gemrequest =  {
  'apikey'   : '•••••••••',
  'secret'   : '•••••••••',
  'uri'      : 'https://api.sandbox.gemini.com', // use https://api.gemini.com for prod. env
  'version'  : '/v1/',
  'command'  : 'balances',
  'method'   : 'post',
  'payload'  : ''
  };

 var response = GEM_PrivateRequest(gemrequest);
 Logger.log( JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) );
}


function GEM_PrivateRequest(gemrequest) {
  function HMACSHA384HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_384, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  function stringToBase64(s) { return (Utilities.base64Encode(s)); }
  
  gemrequest.payload = {"request": gemrequest.version+gemrequest.command, "nonce": new Date().getTime() };
  var params = {
    'method'               : gemrequest.method,
    'muteHttpExceptions'   : true,
    'Content-Type'         : "text/plain",
    'headers': {
      "X-GEMINI-APIKEY"    : gemrequest.apikey,
      "X-GEMINI-PAYLOAD"   : stringToBase64(JSON.stringify(gemrequest.payload)),
      "X-GEMINI-SIGNATURE" : HMACSHA384HEX(stringToBase64(JSON.stringify(gemrequest.payload)), gemrequest.secret),
      "Cache-Control"      : "no-cache"
     }
  }
  return  { uri: gemrequest.uri + gemrequest.version + gemrequest.command  , params: params};
}
