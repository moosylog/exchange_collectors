function MCD_Settings() {  
 var stn =  {
  'id'         : 'MCD',
  'name'       : 'mercadobitcoin',
  'apikey'     : EXKEY, 
  'secret'     : EXSECRET,
  'thirdattrib': ADATTRIB,
  'uri'        : 'https://www.mercadobitcoin.net',
  'command'    : 'get_account_info',
  'method'     : 'POST',
  'payload'    : ''
  };
  if (typeof ADATTRIB != 'undefined') stn.thirdattrib = ADATTRIB; 
  return stn;
}



function MCD_GetBalances() {  
  var stn     = MCD_Settings(),    
      request = MCD_PrivateRequest(stn);
  
  DebugLog("URL ....",JSON.stringify(request));
  
  var response = UrlFetchApp.fetch(request.uri,request.params);
  DebugLog("Receiving data from "+stn.name, response);
  
  try { var response = JSON.parse(response); } catch(e) {Logger.log("No valid JSON data received"); return false;}
  if (stn.thirdattrib.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox(stn.name+" Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(response)); }   
  try {  Logger.log("Validating datatype "+response.response_data.balance.btc.total); } catch(e) { Logger.log(response); Logger.log("no or empty response"); return null;}
  var array = [];
  var u = "";
  Logger.log("******************************");  
  for (r in response.response_data.balance){
    if (Number(response.response_data.balance[r].total) * 100000 > 0)  {
      u = r;
      u = u.toUpperCase();
      array.push({
         curcodeEX: u,
         balance: response.response_data.balance[r].total
      });   }
    //Logger.log(r+" "+response.response_data.balance[r].total);
  }
  DebugLog(stn.name+" GetBalance", JSON.stringify(array)); 
  if (stn.thirdattrib.toLowerCase().indexOf('debug') >= 0)  {  Browser.msgBox(JSON.stringify(array)); }   
  return array;
}


function MCD_PrivateRequest(stn) {      
  function HMACSHA512HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  var nonce        = Math.round(new Date().getTime() / 1000).toString(),            
      params       = {
        'method'            : stn.method,
        'muteHttpExceptions': true,
        'headers': {
          'Content-Type'    : 'application/x-www-form-urlencoded',
          'TAPI-ID'         : stn.apikey,
          'TAPI-MAC'        : HMACSHA512HEX('/tapi/v3/?tapi_method='+stn.command+'&tapi_nonce='+nonce, stn.secret),
        },
        'payload' : 'tapi_method='+stn.command+'&tapi_nonce='+nonce
     }
  return  { uri: "https://www.mercadobitcoin.net/tapi/v3/", params: params};
}
