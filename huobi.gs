// Huobi Pro API v1 Private Request in Google Apps Script (GAS). 
// By Moosy Research, see more cryptosheets on: https://sites.google.com/site/moosyresearch/projects/cryptos


function HUO_GetBalance() {  
  var huorequest =  {
  'apikey'   : '•••••••••',
  'secret'   : '•••••••••',
  'uri'      :'api.huobi.pro',
  'command'  :'/v1/subuser/aggregate-balance',
  'method'   :'get',
  'payload'  :''
  };

 var response = HUO_PrivateRequest(huorequest);
 Logger.log( JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) );
}



function HUO_PrivateRequest(huorequest) {
  function HMACSHA256B64(s, secret) { return (Utilities.base64Encode(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret))); }
  
  var nonce   = encodeURIComponent(Utilities.formatDate(new Date(), "GMT", 'yyyy-MM-dd\'T\'HH:mm:ss')),
      payload = huorequest.method.toUpperCase()+"\n"+huorequest.uri+"\n"+huorequest.command+"\nAccessKeyId="+huorequest.apikey+"&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp="+nonce;
  
     params = { 
      'method'            : huorequest.method,
      'muteHttpExceptions': true,
      'Content-Type'      : 'application/x-www-form-urlencoded',
      'headers': {  }
      },
  
     request = {
      'SignatureMethod'   : 'HmacSHA256',
      'SignatureVersion'  : '2',
      'Signature'         : HMACSHA256B64( payload, huorequest.secret),
      'AccessKeyId'       : huorequest.apikey,
      'Timestamp'         : nonce,
      },
            
  request = huorequest.uri+huorequest.command+"?"+Object.keys(request).map(function(key) {return key + '=' + request[key];}).join('&');
  return  { uri: request , params: params};
}
