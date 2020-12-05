
// IDEX.IO v2 | The World’s Most Advanced Cryptocurrency Exchange |‎ API Private Request in Google Apps Script (GAS).
// By Moosy Research, check our cryptosheets on: https://sites.google.com/view/moosyresearch

function IDX_GetBalances() {  
  var IDXrequest = {
   'id'         : 'IDX',
   'name'       : 'IDEX2',
   'apikey'     : '•••••••••',
   'secret'     : '•••••••••',
   'command'    : '/v1/balances',   
 //  'uri'        : 'https://api-sandbox.idex.io',
   'uri'        : 'https://api.idex.io',
   'method'     : 'GET',
   'payload'    : ''   // * required idex walletID
  }; 
 
  var response = IDX_PrivateRequest(bybrequest);
  Logger.log( JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) );
}



function IDX_PrivateRequest(IDXrequest) {      
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  var qry = { 'nonce' : UrlFetchApp.fetch("https://www.uuidgenerator.net/api/version1"), }; 
  if (IDXrequest.payload != '') qry.wallet = IDXrequest.payload;
  
  var payld     = CreateURIQueryString(qry,""),
      signature = HMACSHA256HEX(payld, IDXrequest.secret),
      params    = {
       'method'                    : IDXrequest.method,  
       'muteHttpExceptions'        : true,
       'validateHttpsCertificates' : false,
       headers: {
         'IDEX-API-KEY'              : IDXrequest.apikey,
         'IDEX-HMAC-SIGNATURE'       : signature,
         'Content-Type'              : 'application/json',
         'Accept'                    : 'application/json',
       }, 
  } 
  return  { uri: IDXrequest.uri + IDXrequest.command+"?"+payld, params: params};
}




