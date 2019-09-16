// Huobi Pro API Private Request Example by Moosy Research
// REST endpoints Authentication HMACSHA256
// https://github.com/huobiapi/API_Docs_en
// Google Apps Script GAS

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
  
  var stamp = encodeURIComponent(Utilities.formatDate(new Date(), "GMT", 'yyyy-MM-dd\'T\'HH:mm:ss')),
      payload   = huorequest.method.toUpperCase()+"\n"+huorequest.uri+"\n"+huorequest.command+"\nAccessKeyId="+huorequest.apikey+"&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp="+stamp;
  
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
      'Timestamp'         : stamp,
      },
            
  t = Object.keys(request).map(function(key) {return key + '=' + request[key];}).join('&');
  request = huorequest.uri+huorequest.command+"?"+t;
  return  { uri: request , params: params};
}

