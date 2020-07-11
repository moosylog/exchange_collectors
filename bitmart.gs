// BitMart API Private Request in Google Apps Script (GAS). 
// By Moosy Research, check our cryptosheets on: https://sites.google.com/site/moosyresearch/projects/cryptos


function MRT_GetBalances() {  
  const mrtrequest = {
   "id"         : "MRT",
   "name"       : "BitMart",
   "apikey"     : '•••••••••',
   "secret"     : '•••••••••',
   "memo"       : '•••••••••',
   "command"    : "/v1/wallet",   
   "uri"        : "https://api-cloud.bitmart.com/spot",
   "method"     : "GET",
   "payload"    : ""
  }; 

 var response = MRT_PrivateRequest(mrtrequest);
 Logger.log( JSON.parse(UrlFetchApp.fetch(response.uri, response.params)) );
}


function MRT_PrivateRequest(mrtrequest) {    
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }

  const timestamp = (JSON.parse(UrlFetchApp.fetch('https://api-cloud.bitmart.com/system/time').getContentText())).data.server_time,
        params    = {
          'method'              : mrtrequest.method,  
          'muteHttpExceptions'  : true,
          'headers': {        
            'Content-Type'       : 'application/json',
            'X-BM-KEY'           : mrtrequest.apikey,
            'X-BM-SIGN'          : HMACSHA256HEX(timestamp+'#'+mrtrequest.memo+'#'+mrtrequest.payload, mrtrequest.secret),
            'X-BM-TIMESTAMP'     : timestamp
          } 
        }; 
   return  { uri: mrtrequest.uri + mrtrequest.command , params: params };
}

