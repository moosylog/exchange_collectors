// Bittrex API v3 Private Request in Google Apps Script (GAS).
// By Moosy Research, see more cryptosheets on: https://sites.google.com/view/moosyresearch

function BTX_GetBalance() {  
  var btxrequest =  {
  'apikey'   : '•••••••••',
  'secret'   : '•••••••••',
  'uri'      :'https://api.bittrex.com/v3',
  'command'  :'/balances',
  'method'   :'GET',
  'payload'  :''
  };

 var response = BTX_PrivateRequest(btxrequest);
 Logger.log( JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) );
}


function BTX_PrivateRequest(btxrequest) {      
  function SHA512HEX(s) { return ToHex(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_512, s)).toString(); }
  function HMACSHA512HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  var nonce    = new Date().getTime().toString();
  if ( btxrequest.payload != null)  JSON.stringify(btxrequest.payload);
  contentHash  = SHA512HEX(btxrequest.payload), // Populate this header with a SHA512 hash of the request contents, Hex-encoded.Populate this header with a SHA512 hash of the request contents, Hex-encoded.
  params       = {
    'method'            : btxrequest.method,
    'muteHttpExceptions': true,
    'headers': {
      'Api-Key'         : btxrequest.apikey,
      'Api-Timestamp'   : nonce,
      'Api-Content-Hash': contentHash,
      'Api-Signature'   : HMACSHA512HEX(nonce + btxrequest.uri + btxrequest.command + btxrequest.method + contentHash, btxrequest.secret), //Hex-encode a HmacSHA512, using your API secret as the signing secret. 
      'Content-Type'    :'application/json',
      'Accept'          :'application/json' 
    },
    'payload' :  btxrequest.payload,
  }
  return  { uri: btxrequest.uri+ btxrequest.command, params: params};
}

