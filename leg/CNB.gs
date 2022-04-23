// Coinbase


function CNB_GetBalances() {  

  const CNBrequest = {
   "id"         : "CNB",
   "name"       : "Coinbase",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "thirdattrib": ADATTRIB,
   "command"    : "/v2/accounts?limit=100",   
   "uri"        : "https://api.coinbase.com",
   "method"     : "GET",
   "payload"    : ""
  }; 
 
  // Logger.log('************ Coinbase Collector **********');
  var response = CNB_PrivateRequest(CNBrequest),
      dataAll  = JSON.parse(UrlFetchApp.fetch(response.uri, response.params));

  if (ADATTRIB == 'debug') Browser.msgBox(JSON.stringify(dataAll));
  

  try {  Logger.log("Coinbase test valid data = "+dataAll.data[0].balance.currency); } catch(e) {Logger.log("no or empty response from Coinbase"); Logger.log(dataAll); return null;}
 var array = [];
 for (r in dataAll.data) { 
  //Logger.log(dataAll.data[r].balance.currency);
   try { 
   if ((Number(dataAll.data[r].balance.amount) * 1000000) > 0) {
     array.push({
       curcodeEX: dataAll.data[r].balance.currency, 
       balance: Number(dataAll.data[r].balance.amount)
     });   
   } 
   } catch (e) { Logger.log("Err: 12 cnb"); Logger.log(dataAll); }
 }
 DebugLog("Coinbase", array);
 
 if (ADATTRIB == 'debug') Browser.msgBox(JSON.stringify(array));
 return array;
}




function CNB_PublicRequest(CNBrequest) {   
       params    = {
          'method'              : CNBrequest.method,  
          'muteHttpExceptions'  : true,
     
          'headers': {        
            'Content-Type'       : 'application/json',
            'CB-VERSION'         : '2020-04-18'
          } 
        }; 
   return  { uri: CNBrequest.uri + CNBrequest.command , params: params };
}



function CNB_PrivateRequest(CNBrequest) {    
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }

  const timestamp = Math.floor((new Date().getTime()/1000)).toString(),   
        payload   = timestamp + CNBrequest.method + CNBrequest.command + CNBrequest.payload,
        signature = HMACSHA256HEX(payload,CNBrequest.secret),
      
        params    = {
          'method'              : CNBrequest.method,  
          'muteHttpExceptions'  : true,
     
          'headers': {        
            'Content-Type'       : 'application/json',
            'CB-ACCESS-SIGN'     : signature,
            'CB-ACCESS-TIMESTAMP': timestamp,
            'CB-ACCESS-KEY'      : CNBrequest.apikey,
            'CB-VERSION'         : '2020-04-18'
          } 
        }; 

   return  { uri: CNBrequest.uri + CNBrequest.command , params: params };
}




