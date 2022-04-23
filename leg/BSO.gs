
function BSO_GetBalances() {  

  var BSOrequest = {
   "id"         : "BSO",
   "name"       : "Bitso",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "command"    : "/v3/balance/",   
   // "uri"        : "https://api-dev.bitso.com",
   "uri"        : "https://api.bitso.com",
   "method"     : "GET",
   "payload"    : ""
  }; 
 
 var array    = [],
     DataAll  = '',
     response;
  
  
 if (ADATTRIB === 'demo') 
   DataAll = 
   {
    "success": true,
    "payload": {
        "balances": [{
            "currency": "mxn",
            "total": "100.1234",
            "locked": "25.1234",
            "available": "75.0000"
        }, {
            "currency": "btc",
            "total": "4.12345678",
            "locked": "25.00000000",
            "available": "75.12345678"
        }, {
            "currency": "eth",
            "total": "50.1234",
            "locked": "40.1234",
            "available": "10.0000"
        }]
    }
  }
  else
 { 
    DebugLog("Fetching from ....",BSOrequest.name);
    response = BSO_PrivateRequest(BSOrequest);
    Logger.log(response);
    
    DataAll  = UrlFetchApp.fetch(response.uri, response.params);
    if(DataAll.getResponseCode() == 500) { Browser.msgBox(BSOrequest.name+" API responded with:\\n\\nError 500: Internal Server Error\\n\\nTry running CtrXL from a Trigger"); return false; }
    if(DataAll.getResponseCode() != 200) { Browser.msgBox("Oops we received an error from the "+BSOrequest.name+" API:\\n\\n"+DataAll.getResponseCode()+":  "+DataAll.getContentText());  }   
    DataAll  = JSON.parse(DataAll);
    DebugLog("Receiving data from "+BSOrequest.name, JSON.stringify(DataAll));
 }
 try {  Logger.log("Validating datatype "+DataAll.payload.balances[0].currency); } catch(e) {Logger.log(DataAll); Logger.log("no or empty response"); return null;}
 Logger.log( DataAll.payload.balances[0].currency);
 if (DataAll == null || DataAll == '') { Logger.log("no or empty response"); return null;}
 Logger.log("Parsing "+BSOrequest.name+" Balances");
  
 for (r in DataAll.payload.balances) {    
   if (Number(DataAll.payload.balances[r].total) * 100000  > 0) {
     array.push({
       curcodeEX: DataAll.payload.balances[r].currency.toUpperCase(), 
       balance: DataAll.payload.balances[r].total
     });   
   }
 }
 Logger.log(array);
 return (array);
}
  
  

function BSO_PrivateRequest(BSOrequest) {      
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }        
  
  const nonce       = Math.floor(new Date().getTime()).toString(), 
        payload     = nonce+BSOrequest.method+BSOrequest.command,
        signature   = HMACSHA256HEX(payload,BSOrequest.secret),
        auth_header = "Bitso "+BSOrequest.apikey+":" +nonce+":"+signature,
        params    = {
         'method'            : BSOrequest.method,  
         'muteHttpExceptions': true,
       //  'payload'           : payload,
         'headers': {
            'Authorization'    : auth_header,
            'Content-Type'     : 'application/json'    },    }  
  return  { uri: BSOrequest.uri + BSOrequest.command, params: params};
}

