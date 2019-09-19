// Poloniex API Private Request Example by Moosy Research
// REST endpoints Authentication  HMACSHA512HEX
// https://docs.poloniex.com/
// Google Apps Script GAS

function POL_GetBalance() {  
  var POLrequest =  {
  'apikey'   : '•••••••••',
  'secret'   : '•••••••••',
  'uri'      :'https://poloniex.com/tradingApi',
  'version'  : '',
  'command'  : '',
  'method'   :'POST',
  'payload'  : 'command=returnCompleteBalances&account=all'
  };

 var response = POL_PrivateRequest(POLrequest);
 Logger.log( JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) );
}


function POL_PrivateRequest(polrequest) {
  function HMACSHA512HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  var nonce   = 1495932972127042 + new Date().getTime(); 
  polrequest.payload = polrequest.payload + "&nonce="+nonce;
        params    = {
         'method'            : polrequest.method,
         'muteHttpExceptions': true,
         'headers': {
           'key'             : polrequest.apikey,
           'sign'            : HMACSHA512HEX( polrequest.payload, polrequest.apisecret)
        },
        "payload": polrequest.payload,
      }
    return  { uri: polrequest.uri  , params: params};
  }
