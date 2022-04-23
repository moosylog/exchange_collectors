// coindcx
// Encryption: HMAC-SHA256 
// https://docs.btcturk.com/#authentication


function DCX_GetBalances() {  

  var DCXrequest = {
   "id"         : "DCX",
   "name"       : "Coindcx",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "command"    : "/exchange/v1/users/balances",   
   "uri"        : "https://api.coindcx.com",
   "method"     : "POST",
   "payload"    : ""
  }; 
 
 var array    = [],
     DataAll  = '',
     response;
  
  
 if (ADATTRIB.indexOf('demo') >= 0) 
   DataAll = [ { "currency": "BTC","balance": 0.12,"locked_balance": 0.001 }, { "currency": "ETH","balance": 1.167,"locked_balance": 0.1 }     ]
 else
 { 
    Logger.log("Fetch");  
    response = DCX_PrivateRequest(DCXrequest);
    Logger.log(response);
    
    DataAll  = UrlFetchApp.fetch(response.uri, response.params);
    if(DataAll.getResponseCode() == 500) { Browser.msgBox("Coindcx API responded with:\\n\\nError 500: Internal Server Error\\n\\nTry running CtrXL from a Trigger"); return false; }
    if(DataAll.getResponseCode() != 200) { Browser.msgBox("Oops\\nWe received the following error from the Coindcx API:\\n\\n"+DataAll.getResponseCode()+":  "+DataAll.getContentText()); return false; }
    //Logger.log(
    DataAll  = JSON.parse(DataAll);
    DebugLog("Receiving data from Coindcx", JSON.stringify(DataAll));
 }
 if (ADATTRIB.indexOf('debug') >= 0)  { Browser.msgBox(DCXrequest.name+" Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(DataAll)); }    
 try {  Logger.log("Validate if we receive a valid response..."+DataAll[0].currency); } catch(e) {Logger.log(DataAll); Logger.log("no or empty response"); return null;}
 Logger.log( DataAll[0].currency);
 if (DataAll == null || DataAll == '') { Logger.log("no or empty response"); return null;}
 Logger.log("Parsing Balance ...");
      
  for (r in DataAll) {    
   if ((DataAll[r].balance + DataAll[r].locked_balance) * 100000  > 0) {
     array.push({
       curcodeEX: DataAll[r].currency, 
       balance: DataAll[r].balance + DataAll[r].locked_balance 
     });   
   }
 }
 try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("To Sheet\\n\\n"+JSON.stringify(array)); }   } catch(e) {Logger.log("");}
 return (array);
}
  
  

function DCX_PrivateRequest(DCXrequest) {      
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }        
  
  //payload const payload = new Buffer(JSON.stringify(body)).toString();
  const body      = { 
        'timestamp': Math.floor(new Date().getTime()).toString()  },
        payload   = JSON.stringify(body),
        params    = {
         'method'            : DCXrequest.method,  
         'muteHttpExceptions': true,
          'payload' : payload,
         'headers': {
            'X-AUTH-APIKEY'    : DCXrequest.apikey,
            'X-AUTH-SIGNATURE' : HMACSHA256HEX(payload,DCXrequest.secret),
            'Content-Type'     : 'application/json'    },    }  
  return  { uri: DCXrequest.uri + DCXrequest.command, params: params};
}

