// Crypto APIs Request in Google Apps Script (GAS).
// By Moosy Research, see more cryptosheets on: https://sites.google.com/view/moosyresearch

function CRA_GetBalances(){
  var CRArequest = {
   "id"         : "CRA",
   "name"       : "Crypto APIs",
   "command"    : 'v1/bc/eth/',
   "apikey"     : "•••••••••",  
   "uri"        : "https://api.cryptoapis.io/",
   "method"     : "GET",
   "payload"    : "•••••••••  xxxxx" // address <space> network
  }
  var response = CRA_PrivateRequest(CRArequest);
  Logger.log( JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) );
}
  
  
function CRA_PrivateRequest(CRArequest) {      
  var params         = {       
        method             : CRArequest.method,      
        muteHttpExceptions : true,
        headers            : {
                               'Content-Type' : 'application/json',
                               'X-API-Key'    : CRArequest.apikey
                             },
      },
  payload = CRArequest.payload.split(' ');
  return  { uri: CRArequest.uri + CRArequest.command + payload[1] + '/address/' + payload[0] , params: params};
}
