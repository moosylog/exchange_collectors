// Kraken API Private Request in Google Apps Script (GAS).
// By Moosy Research, see more cryptosheets on: https://sites.google.com/site/moosyresearch/projects/cryptos

function KRK_GetBalances() {
  var stn = {
   'apikey'     : '•••••••••',
   'secret'     : '•••••••••',
   'command'    : '/0/private/Balance',
   'uri'        : 'https://api.kraken.com',
   'method'     : 'POST',
   'payload'    : ''
  }; 
  
 var response = KRK_PrivateRequest1(stn);
 Logger.log( JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) );
}


function KRK_PrivateRequest1(stn) {      
  var nonce      = new Date () * 1000,
      payload    = 'nonce=' + nonce + '&' + stn.payload,
      api_sha256 = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, nonce + payload),
      sigstring  = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, Utilities.newBlob(stn.command).getBytes().concat(api_sha256), Utilities.base64Decode(stn.secret)),
      signature  = Utilities.base64Encode(sigstring),
      params = {
        'method'  : stn.method, 
        'payload' : payload, 
        'headers' : {
          'API-Key'  :  stn.apikey, 
          'API-Sign' :  signature
        }
 }
 return  { uri: 'https://api.kraken.com' + stn.command, params: params};
}

