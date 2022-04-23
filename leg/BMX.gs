function BMX_GetBalances() {   
  var stn = {
   "id"         : "BMX",
   "name"       : "Bitmex",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "command"    : "user/margin?currency=all",
   "uri"        : "https://www.bitmex.com/api",
   "apiversion" : "/v1/",
   "method"     : "GET",
   "payload"    : ""
  }; 
  
 
  if (ADATTRIB.toLowerCase().indexOf('testnet') >= 0) stn.uri = 'https://testnet.bitmex.com/api';
  
  var response = BMX_PrivateRequest(stn);
  try { response = JSON.parse(UrlFetchApp.fetch(response.uri, response.params).getContentText()); } catch (e) { Logger.log(e);}
  
  DebugLog("Receiving data from "+stn, response);
  
  if (response == null || response == "") {Logger.log("No Data Received from BitMex"); return(null);}
  //if (!array.length) return (null);  
  
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox(stn.name+" Connector DEBUG Mode:"); Browser.msgBox("Received (Raw balance)\\n\\n"+JSON.stringify(response)); }   
  
  var array = [],
      keys  = Object.keys(response);
  for (var s=0;s<keys.length;s++) {  
    if (Number(response[keys[s]].walletBalance) * 10000 > 0 && response[keys[s]].currency.toUpperCase() === "XBT") { 
      array.push({ curcodeEX: "BTC",  balance: response[keys[s]].walletBalance / 100000000 });
    }
  }
  
  DebugLog("To Sheet: ", JSON.stringify(array));
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox("To Sheet:\\n\\n"+JSON.stringify(array)); }   
  
  return(array);
}



function BMX_PublicRequest(stn) {BMX_PrivateRequest(stn)};
function BMX_PrivateRequest(stn) {      
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  var expires   = "", 
      signature = "";
  
  expires     = (new Date().getTime() + 60000).toFixed(9).toString().substring(0, 10);  // 1 min in the future
  
  if ( stn.payload != '' ) stn.payload = CreateURIQueryString(stn.payload,"?"); 
  stn.payld = stn.method+"/api"+stn.apiversion+stn.command+stn.payload+expires;
  signature   = HMACSHA256HEX(stn.payld,stn.secret),
      params  = {
        'method'            : stn.method,
        'muteHttpExceptions': true,
        'headers': {
          'api-key'         : stn.apikey,
          'api-signature'   : signature,
          'api-expires'     : expires,
          'Content-Type'    :'application/json',
          'Accept'          :'application/json' 
        }
     }
  return  { uri: stn.uri+stn.apiversion+stn.command+stn.payload,   params: params};
}

