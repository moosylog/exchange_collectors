// Gate.io API v4
// jan 3, 2023

function GAT_Settings() {  
 var stn =  {
  'id'         : 'GAT',
  'name'       : 'Gate.IO',
  'apikey'     : EXKEY,                               
  'secret'     : EXSECRET,                            
  'thirdattrib': '',
  'third'      : false,
  'uri'        : 'https://api.gateio.ws',              
  'command'    : '/api/v4/spot/accounts',                  
  'method'     : 'GET',
  'payload'    : '',
  'body'       : '' // need todo JSON.stringify
 };
 if (typeof ADATTRIB != 'undefined') {  
   stn.thirdattrib = ADATTRIB.toLowerCase();
   stn.thirdobj = ADATTRIB.split(" "); 
   stn.third = true; 
 }
 return stn;
}

function GAT_GetBalances() {  
  var stn     = GAT_Settings(),
      debug   = false;
  
 
  if (stn.third == false) stn.thirdattrib = 'spot';  // ** third attribute is empty we set default value
 
  if (stn.thirdattrib.indexOf('debug') >= 0) debug = true;
 
  if (stn.thirdattrib.indexOf('spot') >= 0)    stn.command = "/api/v4/spot/accounts";
  if (stn.thirdattrib.indexOf('margin') >= 0)  stn.command = "/margin/accounts";
  if (stn.thirdattrib.indexOf('futures') >= 0) stn.command = "/futures/{settle}/accounts";
 
 


  if (stn.thirdattrib.indexOf('demo') >= 0)   {
    var response = 	[{"currency":"RARI","available":"0.9363116","locked":"0"},{"currency":"ERN","available":"0.096","locked":"0"},{"currency":"MATIC","available":"3.147","locked":"0"},{"currency":"ALPA","available":"1.441","locked":"0"},{"currency":"VRA","available":"133.351","locked":"0"},{"currency":"IOTX","available":"25.641","locked":"0"},{"currency":"TFUEL","available":"5.141","locked":"0"},{"currency":"CHR","available":"3.926","locked":"0"},{"currency":"DASH","available":"0.005","locked":"0"},{"currency":"MTV","available":"1810.06","locked":"0"},{"currency":"CHZ","available":"3.101","locked":"0"},{"currency":"BLANKV2","available":"3.227","locked":"0"},{"currency":"MBL","available":"193.986","locked":"0"},{"currency":"BKC","available":"4555.808","locked":"0"},{"currency":"AERGO","available":"3.703","locked":"0"},{"currency":"OMI","available":"1112.236","locked":"0"},{"currency":"CONV","available":"29.918","locked":"0"},{"currency":"CNNS","available":"237.079","locked":"0"},{"currency":"BLANK","available":"3.227","locked":"0"},{"currency":"DAO","available":"6.0587648","locked":"0"},{"currency":"SKL","available":"2.699","locked":"0"},{"currency":"ANC","available":"0.556","locked":"0"},{"currency":"DEGO","available":"0.1341","locked":"0"},{"currency":"BNB","available":"0.00047795","locked":"0"},{"currency":"ETH","available":"0.000000280828","locked":"0"},{"currency":"POINT","available":"1.02889717447","locked":"0"},{"currency":"ICX","available":"1.001","locked":"0"}];
  }
   else
   {
     var request = GAT_PrivateRequest(stn);
        console.log("API Request object: ",JSON.stringify(request));
     var response = UrlFetchApp.fetch(request.uri,request.params);
   }
   DebugLog("Receiving data from "+stn.name, response);
   try { var response = JSON.parse(response); } catch(e) {Logger.log("JSON.parse error: No valid JSON data received"); }
   
    if (debug == true )  
     { Browser.msgBox(stn.name+" Connector DEBUG Mode:"); 
       Browser.msgBox(JSON.stringify(response)); 
       // Browser.msgBox("First element: "+ response[0].currency + " " + Number(response[0].available) + Number(response[0].locked));
       DebugLog("DEBUG MODE ON");
     }   
  try {  
     Logger.log("Validating datatype "+response[0].currency); } catch(e) 
       { Logger.log(response[0].currency); 
         Logger.log("no or empty response"); 
         return null;
       }

  var array = [];
 if (stn.command.indexOf("/api/v4/spot/accounts") >= 0)   
  {
    var total = 0;
   Browser.msgBox("SPOT LOOP?\\n\\n");
    for (r in response) {    
      total = Number(response[r].available) + Number(response[r].locked);
      if (total * 100000  > 0 ) {
        array.push({
        curcodeEX: response[r].currency, 
        balance: total
        });   
      }
    }
  }
  
  if (stn.thirdattrib.indexOf('margin') >= 0)  
  {
    var total = 0;
    Browser.msgBox("WHAT TO PULL FROM THIS?\\n\\n"+ response);
    return 0;
    for (r in response) {    
      total = Number(response[r].available) + Number(response[r].locked);
      if (total * 100000  > 0 ) {
        array.push({
        curcodeEX: response[r].currency, 
        balance: total
        });   
      }
    }
  }
  
 
 Browser.msgBox(JSON.stringify(array));
  DebugLog(stn.name+" GetBalance", JSON.stringify(array)); 
  return array;

  console.log("OUTPUT TEST SCRIPT:")
  console.log(JSON.parse(response));
  return 0;
} 



/*
function GAT_GetServerTime(uri){
   var response = JSON.parse(UrlFetchApp.fetch(uri+"/api/v4/spot/time"));
   console.log("Gate.IO Servertime = "+response.server_time)
   return response.server_time;
}
*/

function GAT_PrivateRequest(stn) {      
  function HMACSHA512HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, s, secret)).toString(); }
  function SHA512HEX(s)             { return ToHex(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_512, s)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  var timestamp = (Date.now() / 1000).toString(),
      payld     = "GET" + "\n" +  
                  stn.command + "\n" + 
                  stn.payload + "\n" +                    
                  SHA512HEX(stn.body) + "\n" +
                  timestamp,
      sign      = HMACSHA512HEX(payld,stn.secret),   
      params    = {
       'method'                : stn.method,  
       'muteHttpExceptions'    : true,
       'headers': {
         'TIMESTAMP'       : timestamp,
         'KEY'             : stn.apikey,
         'SIGN'            : sign,
         'Content-Type'    :'application/json',
         'Accept'          :'application/json'
       },
       //'payload'         : bybrequest.command
   } 
   return  { uri: stn.uri + stn.command,   params: params};
}


  
