// OKEX API Private Request Example by Moosy Research
// REST endpoints Authentication HMACSHA384HEX
// https://www.okex.com/docs/en/
// Google Apps Script GAS

function OKX_GetBalance() {  
  var okxrequest =  {
  'apikey'   : '•••••••••',
  'secret'   : '•••••••••',
  'adattrib' : '•••••••••',  // Passphrase
  'uri'      : 'https://www.okex.com',
  'version'  : '/v3/',
  'command'  : '/api/account/v3/wallet',
  'method'   : 'GET',
  'payload'  : ''
  };

 var response = OKX_PrivateRequest(okxrequest);
 Logger.log( JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) );
}


function OKX_PrivateRequest(okxrequest) {
  function HMACSHA256B64(s, secret) { return (Utilities.base64Encode(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret))); }
  
  var timestamp = Utilities.formatDate(new Date(), 'GMT -1', 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\''),
      params = {
        'method'               : okxrequest.method,
        'muteHttpExceptions'   : true,
        'headers': {
          'OK-ACCESS-KEY'       : okxrequest.apikey,
          'OK-ACCESS-SIGN'      : HMACSHA256B64(timestamp + okxrequest.method + okxrequest.command, okxrequest.secret),
          'OK-ACCESS-TIMESTAMP' : timestamp,
          'OK-ACCESS-PASSPHRASE': okxrequest.adattrib,
          'Accept'              : 'application/json',
          'Content-Type'        : 'application/json'
        }
      }
  return  { uri: okxrequest.uri + okxrequest.command  , params: params};
}
