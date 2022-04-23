function ALL_GetBalances() {  

  const ALLrequest = {
   "id"         : "ALL",
   "name"       : "Coinall",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "thirdattrib": ADATTRIB,
   "command"    : "/api/account/v3/wallet",   
   "uri"        : "https://www.coinall.com",
   "method"     : "GET",
   "payload"    : ""
  }; 
 
 var response = ALL_PrivateRequest(ALLrequest);
 var dataAll = JSON.parse(UrlFetchApp.fetch(response.uri, response.params));
 
 if (ADATTRIB === 'demo')  {
   var dataAll =    [{
        "available":37.11827078,
        "balance":37.11827078,
        "currency":"EOS",
        "hold":0
    },
    {
        "available":0,
        "balance":0,
        "currency":"XMR",
        "hold":0
    }];
 }
 if (dataAll == null || dataAll == '') { Logger.log("no or empty response"); return null;}
 
 var array = [];
 for (r in dataAll) { 
   array.push({
     curcodeEX: dataAll[r].currency, 
     balance: dataAll[r].balance
   });   
 }
 
 Logger.log(array); 
 return (array);
}




function ALL_PrivateRequest(ALLrequest) {    
  function HMACSHA256B64(s, secret) { return (Utilities.base64Encode(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret))); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }

  const timestamp = Utilities.formatDate(new Date(), 'Etc/GMT', 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\''),
        payload   = timestamp + ALLrequest.method + ALLrequest.command,
        signature = HMACSHA256B64(payload,ALLrequest.secret),
      
        params    = {
          'method'              : ALLrequest.method,  
          'muteHttpExceptions'  : true,
          'headers': {
            
            'Content-Type'         : 'application/json',
            'OK-ACCESS-KEY'        : ALLrequest.apikey,
            'OK-ACCESS-SIGN'       : signature,   
            'OK-ACCESS-TIMESTAMP'  : timestamp,
            'OK-ACCESS-PASSPHRASE' : ALLrequest.thirdattrib,
            } 
        }; 

   return  { uri: ALLrequest.uri + ALLrequest.command , params: params };
}


function ALL_PublicRequest(ALLrequest) {  
        params    = {
          'method'              : ALLrequest.method,  
          'muteHttpExceptions'  : true,
          'headers': {
            
            'Content-Type'         : 'application/json',
            } 
        }; 

   return  { uri: ALLrequest.uri + ALLrequest.command , params: params };

}


