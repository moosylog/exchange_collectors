// MEXC API
// april 22, 2022
// https://MEXdevelop.github.io/apidocs/#all-orders



function MEX_GetBalances() {  
 var stn =  {
  'id'         : 'MEX',
  'name'       : 'MEXC',
  'apikey'     : EXKEY,                               
  'secret'     : EXSECRET,                            
  'thirdattrib': ADATTRIB,
  'uri'        : 'https://api.mexc.com',              
  'command'    : '/api/v3/account',                    // https://MEXdevelop.github.io/apidocs/#all-orders
  'method'     : 'GET',
  'payload'    : '',
  'body'      : '' 
  };
  if (typeof ADATTRIB != 'undefined') stn.thirdattrib = ADATTRIB; 

  
  var request = MEX_PrivateRequest(stn);

 DebugLog("URL ....",JSON.stringify(request));
  
  var response = UrlFetchApp.fetch(request.uri,request.params);
  DebugLog("Receiving data from "+stn.name, response);
  
  
  if (stn.thirdattrib.toLowerCase().indexOf('demo') >= 0){
  response = {
    "makerCommission": 20,
    "takerCommission": 20,
    "buyerCommission": 0,
    "sellerCommission": 0,
    "canTrade": true,
    "canWithdraw": true,
    "canDeposit": true,
    "updateTime": null,
    "accountType": "SPOT",
    "balances": [{
        "asset": "ETH",
        "free": "0.11",
        "locked": "0.02"
    }, {
        "asset": "XRP",
        "free": "1",
        "locked": "2"
    }],
    "permissions": ["SPOT"]
}
  } else {
      try { var response = JSON.parse(response); } catch(e) {Logger.log("No valid JSON data received"); return false;}
  }
  
    
  if (stn.thirdattrib.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox(stn.name+" Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(response)); }   
  try {  Logger.log("Validating datatype "+response.balances); } catch(e) { Logger.log(response); Logger.log("no or empty response"); return null;}
  var array = [];
  var num = 0;
  Logger.log("******************************");  
  for (r in response.balances){
    response.balances[r].asset;
    num = Number(response.balances[r].free) + Number(response.balances[r].locked);
    if (num * 100000 > 0)  {
      Logger.log("push "+num);
      array.push({
         curcodeEX: response.balances[r].asset,
         balance:   num
      });   }
    //Logger.log(r+" "+response.response_data.balance[r].total);
  }
  DebugLog(stn.name+" GetBalance", JSON.stringify(array)); 
  if (stn.thirdattrib.toLowerCase().indexOf('debug') >= 0)  {  Browser.msgBox(JSON.stringify(array)); }   
  DebugLog(array);
  return array;
}

function DebugLog(a) {
 Logger.log(a); 
}

function MEX_PrivateRequest(stn) {      
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  var timestamp = new Date().getTime().toString(),  
      payld     = 'recvWindow=5000&timestamp=&'+timestamp,
      sign      = HMACSHA256HEX(payld,stn.secret),
      payld     = payld + "&signature="+sign
      params    = {
       'method'            : stn.method,  
       'muteHttpExceptions': true,
       'headers': {
         'X-MEXC-APIKEY'   : stn.apikey,        
         'timestamp'       : timestamp,
         'sign'            : sign,
         'Content-Type'    :'application/json',
       },
       //'payload'         : bybrequest.command
   } 
   payld = stn.command+"?"+payld+"&sign="+sign;
   return  { uri: stn.uri + payld,   params: params};
}
