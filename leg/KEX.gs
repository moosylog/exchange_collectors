
function KEX_GetBalances() {  

  const KEXrequest = {
   "id"         : "BKEX",
   "name"       : "BKEX",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "thirdattrib": ADATTRIB,
   "command"    : "/v1/u/wallet/balance",   
   "uri"        : "https://api.bkex.com",
   "method"     : "GET",
   "payload"    : ""
  }; 
 var response = KEX_PrivateRequest(KEXrequest);
 var dataALL = JSON.parse(UrlFetchApp.fetch(response.uri, response.params));
 
 
 try {  Logger.log(dataALL.data.WALLET); } catch(e) {Logger.log(dataAll); Logger.log("no or empty response"); return null;}
 
 
 dataALL =  dataALL.data.WALLET;
 //Logger.log(dataALL);

 if (dataALL == null || dataALL == '') { Logger.log("no or empty response"); return null;}
 
 var array = [];
 for (r in dataALL) { 
   // if (dataALL[r].coinType === 'ETH') {dataALL[r].total = 5;  Logger.log(dataALL[r]); }
   if ((dataALL[r].total * 10000) > 0) {
     array.push({
       curcodeEX: dataALL[r].coinType, 
       balance: dataALL[r].total
     });   
   }
 }
 
 Logger.log(array); 
 return (array);
}




function KEX_PrivateRequest(KEXrequest) {    
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }

  //const timestamp = Utilities.formatDate(new Date(), 'Etc/GMT', 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\''),
  //      payload   = timestamp + KEXrequest.method + KEXrequest.command,
  
  const signature = HMACSHA256HEX(KEXrequest.payload,KEXrequest.secret),
      
        params    = {
          'method'              : KEXrequest.method,  
          'muteHttpExceptions'  : true,
          'headers': {
            
            'Content-Type'         : 'application/json',
            'X_ACCESS_KEY'         : KEXrequest.apikey,
            'X_SIGNATURE'          : signature,   
            } 
        }; 

   return  { uri: KEXrequest.uri + KEXrequest.command , params: params };
}




