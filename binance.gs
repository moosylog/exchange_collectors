// Binance API v3 Private Request in Google Apps Script (GAS).
// By Moosy Research, see more cryptosheets on: https://sites.google.com/site/moosyresearch/projects/cryptos

function BIN_GetBalance() {  
  var binrequest =  {
  'apikey'   : '•••••••••',
  'secret'   : '•••••••••',
  'uri'      :'https://api.binance.com/api/v3/',
  'command'  :'account',
  'method'   :'get',
  'payload'  :''
  };

 var response = BIN_PrivateRequest(binrequest);
 Logger.log( JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) );
}


function BIN_PrivateRequest(binrequest) {      
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
 
  var postdata   = "timestamp="+ new Date()*1 + binrequest.payload + "",
      signature  = HMACSHA256HEX(postdata,binrequest.secret),
      params     = {
        'method'            : binrequest.method,
        'muteHttpExceptions': true,
        'headers': {
          'Content-Type'    : 'application/x-www-form-urlencoded',
          'X-MBX-APIKEY'    : binrequest.apikey,
        },    
      };
  postdata = postdata+"&signature="+signature;  
  return  { uri: binrequest.uri+binrequest.command+"?"+postdata, params: params};
}




