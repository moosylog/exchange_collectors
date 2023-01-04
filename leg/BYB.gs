function BYB_GetBalances() {
  
  
 var cur = ADATTRIB.split("#");
 var curpara = false;
  try {
    if (cur[1] != undefined) { cur = cur[1].toUpperCase().trim(); curpara = true;  }
  } catch(e) { Logger.log("Err #1: BYB");  }
 
  var BYBrequest = {
   'id'         : 'BYB',
   'name'       : 'Bybit',
   'apikey'     : EXKEY,
   'secret'     : EXSECRET,
   'command'    : '/spot/v3/private/account',
   'uri'        : 'https://api.bybit.com',  
   'method'     : 'GET',
   'payload'    : '' 
  }; 
  
  if (ADATTRIB.toLowerCase().indexOf('testnet') >= 0)  BYBrequest.uri = 'api-testnet.bybit.com';
  
  var request = '', response = '', array = [];
  DebugLog("Fetching from ....",BYBrequest.name);
  request  = BYB_PrivateRequest(BYBrequest);
  DebugLog("URL:",request.uri);
  response = UrlFetchApp.fetch(request.uri,request.params);
  
  DebugLog("Receiving data from "+BYBrequest.name, response);
  if (response == "") { DebugLog("No data",BYBrequest.name); return null; }
  response = JSON.parse(response);
  
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox(BYBrequest.name+" Connector DEBUG Mode:"); Browser.msgBox("Received (Raw balance)\\n\\n"+JSON.stringify(response)); }   
  try {  Logger.log(BYBrequest.name+": Validating received data "+response.result.balances[0]); } catch(e) {Logger.log(response); Logger.log(BYBrequest.name+" : no or empty response"); return null;}
  
  
  if (curpara === true)  {
    array.push({ curcodeEX: cur, balance: response.result[cur].balances});   
  } else 
  {
    for (r in response.result.balances) {   
      if (Number(Math.abs( response.result.balances[r].total )) * 100000  > 0) array.push({ curcodeEX: response.result.balances[r].coinid, balance: response.result.balances[r].total});                       
    }
  }
  
  try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("To Sheet: \\n\\n"+JSON.stringify(array)); }   } catch(e) {Logger.log("");}
  DebugLog("To Sheet", array);
  return (array);
}


function BYB_PrivateRequest(BYBrequest) {      
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  var payld = '';
  if (BYBrequest.payload != '') payld = 'api_key='+BYBrequest.apikey+CreateURIQueryString(BYBrequest.payload,"&")+'&timestamp='+timestamp; 
  
  
  var timestamp = new Date().getTime().toString(),  
      message   = 'api_key='+BYBrequest.apikey+payld+'&timestamp='+timestamp,
      sign      = HMACSHA256HEX(message,BYBrequest.secret),
      params    = {
       'method'            : BYBrequest.method,  
       'muteHttpExceptions': true,
       'headers': {
         'Content-Type'    :'application/json',
       },
   } 
   return  { uri: BYBrequest.uri + BYBrequest.command +"?"+message+"&sign="+sign,   params: params};
}
