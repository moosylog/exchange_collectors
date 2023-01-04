// Gate.io API v4
// jan 3, 2023
// https://www.gate.io/docs/developers/apiv4/en/#api-signature-string-generation
// Live trading: https://api.gateio.ws/api/v4
// Futures TestNet trading: https://fx-api-testnet.gateio.ws/api/v4
// Futures live trading alternative (futures only): https://fx-api.gateio.ws/api/v4

// all balances in USD
// https://www.gate.io/docs/developers/apiv4/en/#retrieve-user-s-total-balances

// subaccount balances
// https://www.gate.io/docs/developers/apiv4/en/#retrieve-sub-account-balances




function GAT_Settings() {  
 var stn =  {
  'id'         : 'GAT',
  'name'       : 'Gate.IO',
  'apikey'     : EXKEY,                               
  'secret'     : EXSECRET,                            
  'thirdattrib': ADATTRIB,
  'uri'        : 'https://api.gateio.ws',              
  'command'    : '/api/v4/spot/accounts',                  
  'method'     : 'GET',
  'payload'    : '',
  'body'       : '' // need todo JSON.stringify
 };
  if (typeof ADATTRIB != 'undefined') stn.thirdattrib = ADATTRIB.split(" "); 
  return stn;
}


function GAT_GetBalances() {  
  Browser.msgBox("test");
  var stn     = GAT_Settings();
  Browser.msgBox(stn.thirdattrib);
  RETURN 0;
 
  if (stn.thirdattrib.toLowerCase().indexOf('spot') >= 0)   stn.command = "/api/v4/spot/accounts";
  if (stn.thirdattrib.toLowerCase().indexOf('margin') >= 0) stn.command = "/margin/accounts";
  if (stn.thirdattrib.toLowerCase().indexOf('futures') >= 0) stn.command = "/futures/{settle}/accounts";
  
  
  var request = GAT_PrivateRequest(stn);
      console.log("API Request object: ",JSON.stringify(request));
      var response = UrlFetchApp.fetch(request.uri,request.params);

  DebugLog("Receiving data from "+stn.name, response);
  try { var response = JSON.parse(response); } catch(e) {Logger.log("No valid JSON data received"); return false;}
  if (stn.thirdattrib.toLowerCase().indexOf('debug') >= 0)  
     { Browser.msgBox(stn.name+" Connector DEBUG Mode:"); 
       Browser.msgBox(JSON.stringify(response)); 
     }   
  try {  
     Logger.log("Validating datatype "+response.response_data.balance.btc.total); } catch(e) 
       { Logger.log(response); 
         Logger.log("no or empty response"); 
         return null;
       }

  if (stn.thirdattrib.toLowerCase().indexOf('spot') >= 0)  
  {
    var total = 0;
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
  
  if (stn.thirdattrib.toLowerCase().indexOf('margin') >= 0)  
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
       'muteHttpExceptions'    : false,
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




