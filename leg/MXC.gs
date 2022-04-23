function MXC_GetBalances() {  

  const MXCrequest = {
   "id"         : "MXC",
   "name"       : "MXC",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "thirdattrib": ADATTRIB,
   "command"    : "/open/api/v2/account/info",   
   "uri"        : "https://www.mxc.ceo",
   "method"     : "GET",
   "payload"    : ""
  }; 
 
  if (MXCrequest.thirdattrib == "demo")  {
  var DataAll = {
    "code": 200,
    "data": {
        "BTC": {
            "frozen": "0",
            "available": "140"
        },
        "ETH": {
            "frozen": "8471.296525048",
            "available": "483280.9653659222035"
        },
        "USDT": {
            "frozen": "0",
            "available": "27.3629"
        },
        "MX": {
            "frozen": "30.9863",
            "available": "450.0137"
        }
    }
 }
 } else 
 {
   var response = MXC_PrivateRequest(MXCrequest) 
   var DataAll = UrlFetchApp.fetch(response.uri, response.params);
 }
 try {  Logger.log(DataAll.data); } catch(e) {Logger.log(DataAll); Logger.log("no or empty response"); return null;}
 DataAll =  DataAll.data
 if (DataAll == null || DataAll == '') { Logger.log("no or empty response"); return null;}
 
 var array = [];
 for (r in DataAll) { 
     Logger.log(DataAll[r]);
     array.push({
       curcodeEX: r, 
       balance: DataAll[r].available
     });   
   
 }
 Logger.log(array); 
 return (array);
}




function MXC_PrivateRequest(MXCrequest) {    
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  function HMACSHA256B64(s, secret) { return (Utilities.base64Encode(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret))); }
  function SortObj(obj) {return Object.keys(obj).sort().reduce(function (result, key) {result[key] = obj[key];return result;}, {});
  }
  const timestamp = new Date().getTime().toString().slice(0, 10);
 
  if (MXCrequest.hasOwnProperty('payload')  === false || MXCrequest.payload == "")   MXCrequest.payload  = {}; 
  MXCrequest.payload.req_time = timestamp;
  MXCrequest.payload.api_key   = MXCrequest.apikey;
  MXCrequest.payload          = SortObj(MXCrequest.payload);  
  MXCrequest.payload          = CreateURIQueryString(MXCrequest.payload,"");  
  
  //const payload   = MXCrequest.method+'\n'+MXCrequest.command+'\n'+ 'api_key='+MXCrequest.apikey + "&req_time="+timestamp,  // + argument need tobe sorted - payload not used!!! 
  const payload   = MXCrequest.method+'\n'+MXCrequest.command+'\n'+ MXCrequest.payload,
        signature = HMACSHA256HEX(payload,MXCrequest.secret),
        request   = MXCrequest.command+'?'+ MXCrequest.payload + "&sign="+signature,
      
        params    = {
          'method'              : MXCrequest.method,  
          'muteHttpExceptions'  : true,
          'headers': {
            'Content-Type'         : 'application/json',
          } 
        }; 
   return  { uri: MXCrequest.uri+request, params: params };
}


function MXC_PublicRequest(MXCrequest) {    
  if (MXCrequest.hasOwnProperty('payload')  === true) MXCrequest.payload  = CreateURIQueryString(MXCrequest.payload,"?");
  const params    = {
          'method'              : MXCrequest.method,  
          'muteHttpExceptions'  : true,
          'headers': {
            'Content-Type'         : 'application/json',
          } 
        }; 
   return  { uri: MXCrequest.uri + MXCrequest.command + MXCrequest.payload, params: params };
}




