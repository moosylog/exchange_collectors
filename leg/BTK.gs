// BbtTurk
// Encryption: HMAC-SHA256 
// https://docs.btcturk.com/#authentication


function BTK_GetBalances() {  

  var BTKrequest = {
   "id"         : "BTK",
   "name"       : "BbtTurk",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "command"    : "/api/v1/users/balances",   
   // "uri"        : "https://api-dev.btcturk.com",
   "uri"        : "https://api.btcturk.com",
   "method"     : "GET",
   "payload"    : ""
  }; 
 
 var array    = [],
     DataAll  = '',
     response;
  
  
 if (ADATTRIB === 'demo') 
   DataAll = {
  "data": [
    {
      "asset": "TRY",
      "assetname": "Türk Lirası",
      "balance": "103158.9412490031968651",
      "locked": "1023.5699999896000000",
      "free": "102135.3712490135968651"
    },
    {
      "asset": "BTC",
      "assetname": "Bitcoin",
      "balance": "0.296027",
      "locked": "0.0010000000000000",
      "free": "29.6017353000000000"
    },
	{
      "asset": "ETH",
      "assetname": "Bitcoin",
      "balance": "1.696027",
      "locked": "0.0010000000000000",
      "free": "29.6017353000000000"
    }
  ],
  "success": true,
  "message": null,
  "code": 0
 }
 else
 { 
    Logger.log("Fetch");  
    response = BTK_PrivateRequest(BTKrequest);
    DataAll  = JSON.parse(UrlFetchApp.fetch(response.uri, response.params));
 }
 //Logger.log(DataAll);
  
  
 try {  Logger.log("Validate if we receive a valid response..."+DataAll.data[0].currency); } catch(e) {Logger.log(DataAll); Logger.log("no or empty response"); return null;}
 Logger.log( DataAll.data[0].currency);
 if (DataAll == null || DataAll == '') { Logger.log("no or empty response"); return null;}
 Logger.log("Parsing Balance ...");
      
  for (r in DataAll.data) {    
   if (DataAll.data[r].balance * 10000  > 0) {
     array.push({
       curcodeEX: DataAll.data[r].asset, 
       balance: DataAll.data[r].balance 
     });   
   }
 }
 
 Logger.log(array); 
 return (array);
}
  
  

function BTK_PrivateRequest(BTKrequest) {      
  function HMACSHA256B64enc(s, secret) { return (Utilities.base64Encode(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256,Utilities.base64Decode(Utilities.base64Encode(s)),Utilities.base64Decode(secret )))); }
          
  var nonce     = Math.floor(new Date().getTime()).toString(),  
      payload   = BTKrequest.apikey + nonce,
      params    = {
        'method'            : BTKrequest.method,  
        'muteHttpExceptions': true,
        headers: {
         'X-PCK'            : BTKrequest.apikey,
         'X-Stamp'          : nonce,
         'X-Signature'      : HMACSHA256B64enc(payload,BTKrequest.secret),
         'Content-Type'     : 'application/json'
        }, 
     } 
  return  { uri: BTKrequest.uri + BTKrequest.command, params: params};
}

