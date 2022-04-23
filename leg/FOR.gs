function FOR_GetBalances() {  

  const FORrequest = {
   "id"         : "FOR",
   "name"       : "Bitforex",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "thirdattrib": ADATTRIB,
   "command"    : "/api/v1/fund/allAccount",   
   "uri"        : "https://api.bitforex.com",
   "method"     : "POST",
   "payload"    : ""
  }; 
 var response = FOR_PrivateRequest(FORrequest);
 var DataAll = JSON.parse(UrlFetchApp.fetch(response.uri, response.params));
 
 try {  Logger.log(DataAll.data.currency); } catch(e) {Logger.log(DataAll); Logger.log("no or empty response"); return null;}
 
 
 DataAll =  DataAll.data
 // {data=[{frozen=0.0, fix=0.0, currency=btc, active=0.0}

 if (DataAll == null || DataAll == '') { Logger.log("no or empty response"); return null;}
 
 var array = [];
 for (r in DataAll) { 
   // if (DataAll[r].coinType === 'ETH') {DataAll[r].total = 5;  Logger.log(DataAll[r]); }
   if ((DataAll[r].active * 10000) > 0) {
     array.push({
       curcodeEX: DataAll[r].currency, 
       balance: DataAll[r].active
     });   
   }
 }
 
 Logger.log(array); 
 return (array);
}




function FOR_PrivateRequest(FORrequest) {    
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  function SortObj(obj) {return Object.keys(obj).sort().reduce(function (result, key) {result[key] = obj[key];return result;}, {});}

  const timestamp = new Date().getTime().toString();
  
  if (FORrequest.hasOwnProperty('payload')  === false || FORrequest.payload == "")   FORrequest.payload  = {}; 
  FORrequest.payload.nonce     = timestamp;
  FORrequest.payload.accessKey = FORrequest.apikey;
  FORrequest.payload           = SortObj(FORrequest.payload);  
  FORrequest.payload           = CreateURIQueryString(FORrequest.payload,"?");  
  
  const payload   = FORrequest.command + FORrequest.payload,
        signature = HMACSHA256HEX(payload,FORrequest.secret),
      
        params    = {
          'method'              : FORrequest.method,  
          'muteHttpExceptions'  : true,
          'headers': {
            'Content-Type'         : 'application/json',
          } 
        }; 
   return  { uri: FORrequest.uri + payload + "&signData="+signature, params: params };
}


function FOR_PublicRequest(FORrequest) {    
  const params    = {
          'method'              : FORrequest.method,  
          'muteHttpExceptions'  : true,
          'headers': {
            'Content-Type'         : 'application/json',
          } 
        }; 
   var payload = "";
   if (FORrequest.payload != "")  payload = CreateURIQueryString(FORrequest.payload,"?");  
   return  { uri: FORrequest.uri + FORrequest.command + payload, params: params };
}



