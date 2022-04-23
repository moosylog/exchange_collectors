// CREX24 API  Private Request in Google Apps Script (GAS).
// By Moosy Research, see more cryptosheets on: https://sites.google.com/site/moosyresearch/projects/cryptos


function C24_GetBalances() {  
  
  var C24request = {
   'id'         : 'C24',
   'name'       : 'Crex24',
   'apikey'     : EXKEY,
   'secret'     : EXSECRET,
   'command'    : "/v2/account/balance",      
   'uri'        : 'https://api.crex24.com',
   'method'     : 'GET',
   'payload'    : ''        // <- wallet address
  }; 
     
   
 if (ADATTRIB === 'demo') 
      DataAll = [ {"currency": "ETH","available": 0.0979,  "reserved": 0.0  },
                  {"currency": "BCD", "available": 12.43897,"reserved": 0.0 },
                  {"currency": "BCH", "available": 1.3394,  "reserved": 1.4013 },]; 
 else
 {
   Logger.log("Fetch"); 
   var response = C24_PrivateRequest(C24request),
   DataAll  = JSON.parse(UrlFetchApp.fetch(response.uri, response.params));
 }
 try {  Logger.log("Validate if we receive a valid response..."+DataAll[0].currency); } catch(e) {Logger.log(DataAll); Logger.log("no or empty response"); return null;}
 Logger.log( DataAll[0].currency);
 if (DataAll == null || DataAll == '') { Logger.log("no or empty response"); return null;}
 

 var array = [];
 for (r in DataAll) { 
   if (((DataAll[r].available + DataAll[r].reserved) * 10000 ) > 0) {
     array.push({
       curcodeEX: DataAll[r].currency, 
       balance: DataAll[r].available + DataAll[r].reserved
     });   
   }
 }
 
 Logger.log(array); 
 return (array);
}



function C24_PrivateRequest(C24request) {      
  const nonce     = Math.floor(new Date().getTime()).toString();
        payload   = C24request.command + nonce;  
        signature = Utilities.base64Encode(Utilities.computeHmacSignature(
                    Utilities.MacAlgorithm.HMAC_SHA_512,
                    Utilities.base64Decode(Utilities.base64Encode(payload)),
                    Utilities.base64Decode(C24request.secret )   )),
          
        params    = {
          'method'            : C24request.method,  
          'muteHttpExceptions': true,
          headers: {
            'X-CREX24-API-KEY'   : C24request.apikey,
            'X-CREX24-API-NONCE' : nonce,
            'X-CREX24-API-SIGN'  : signature,
            'Content-Type'       : 'application/json'
          }, 
        } 
  return  { uri: C24request.uri + C24request.command, params: params};
}

