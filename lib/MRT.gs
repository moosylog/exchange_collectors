// Bitmart - MRT
// HMAC-SHA256 
// url = "https://openapi.bitmart.com/v2/wallet"



function MRT_GetBalances() {  

  const MRTrequest = {
   "id"         : "MRT",
   "name"       : "MRT",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "thirdattrib": ADATTRIB,
   "command"    : "/v1/wallet",   
   "uri"        : "https://api-cloud.bitmart.com/spot",
   "method"     : "GET",
   "payload"    : ""
  }; 


  if (ADATTRIB != 'demo') {

  var response = MRT_PrivateRequest(MRTrequest),
      dataAll  = JSON.parse(UrlFetchApp.fetch(response.uri, response.params).getContentText());
      Logger.log(dataAll);
} else 
{
  var dataAll = {
    "code": 1000,
    "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",
    "message": "OK",
    "data": {
      "wallet": [
         { "id": "BTC","available": "0.01","name": "Bitcoin","frozen": "0.000000", },
         { "id": "ETH","available": "1.1","name": "Ether","frozen": "0.1", },
         { "id": "LTC","available": "0.5","name": "Ether","frozen": "0.0", },
       ]
    }
   }
 }
  var array = [];
 try {  Logger.log("Bitmart test valid data = "+dataAll.data.wallet); } catch(e) {Logger.log("no or empty response from Bitmart"); Logger.log(dataAll); return null;}
 for (r in dataAll.data.wallet) { 
   //Logger.log(dataAll.data.wallet[r].id);
   try { 
   if ((Number(dataAll.data.wallet[r].available) * 10000) > 0) {
     array.push({
       curcodeEX: dataAll.data.wallet[r].id, 
       balance: Number(dataAll.data.wallet[r].available)
     });   
   } 
   } catch (e) { Logger.log("Err: 12 MRT"); Logger.log(dataAll); }
 }
 DebugLog("Bitmart", array);
 
 if (ADATTRIB == 'debug') Browser.msgBox(JSON.stringify(array));
 return array;
}




function MRT_PublicRequest(MRTrequest) {   
       params    = {
          'method'              : MRTrequest.method,  
          'muteHttpExceptions'  : true,
          'headers': {        
            'Content-Type'       : 'application/json',
          } 
        }; 
   return  { uri: MRTrequest.uri + MRTrequest.command , params: params };
}




function MRT_PrivateRequest(MRTrequest) {    
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }

  const timestamp = (JSON.parse(UrlFetchApp.fetch('https://openapi.bitmart.com/v2/time').getContentText())).server_time,
        params    = {
          'method'              : MRTrequest.method,  
          'muteHttpExceptions'  : true,
          'headers': {        
            'Content-Type'       : 'application/json',
            'X-BM-KEY'           : MRTrequest.apikey,
            'X-BM-SIGN'          : HMACSHA256HEX(timestamp+'#'+MRTrequest.thirdattrib+'#'+MRTrequest.payload, MRTrequest.secret),
            'X-BM-TIMESTAMP'     : timestamp
          } 
        }; 
   return  { uri: MRTrequest.uri + MRTrequest.command , params: params };
}

