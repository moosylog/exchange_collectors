// OKX API
// april 25, 2022
// https://www.okx.com/docs-v5/en/#rest-api-authentication


function OKX_Settings() {  
 var stn =  {
  'id'         : 'OKX',
  'name'       : 'OKXC',
  'apikey'     : EXKEY,                               
  'secret'     : EXSECRET,                            
  'thirdattrib': ADATTRIB,
  'uri'        : 'https://okx.com',              
  'command'    : '/api/v5/account/balance',                    // https://OKXdevelop.github.io/apidocs/#all-orders
  'method'     : 'GET',
  'payload'    : '',
  'body'      : '' 
  };
  if (typeof ADATTRIB != 'undefined') stn.thirdattrib = ADATTRIB.split(" "); 
  return stn;
}



function OKX_GetBalances() {  
  var stn     = OKX_Settings();
  var debug = false;
  if (stn.thirdattrib[1] == 'debug' || stn.thirdattrib[2] == 'debug') debug = true;
  if (stn.thirdattrib[0] == 'demo' || stn.thirdattrib[1] == 'demo'){
  response = {
    "code": "0",
    "data": [
        {
            "adjEq": "10679688.0460531643092577",
            "details": [
                {
                    "availBal": "",
                    "availEq": "9930359.9998",
                    "cashBal": "9930359.9998",
                    "ccy": "USDT",
                    "crossLiab": "0",
                    "disEq": "9439737.0772999514",
                    "eq": "9930359.9998",
                    "eqUsd": "9933041.196999946",
                    "frozenBal": "0",
                    "interest": "0",
                    "isoEq": "0",
                    "isoLiab": "0",
                    "isoUpl":"0",
                    "liab": "0",
                    "maxLoan": "10000",
                    "mgnRatio": "",
                    "notionalLever": "",
                    "ordFrozen": "0",
                    "twap": "0",
                    "uTime": "1620722938250",
                    "upl": "0",
                    "uplLiab": "0",
                    "stgyEq":"0"
                },
                {
                    "availBal": "",
                    "availEq": "33.6799714158199414",
                    "cashBal": "33.2009985",
                    "ccy": "BTC",
                    "crossLiab": "0",
                    "disEq": "1239950.9687532129092577",
                    "eq": "33.771820625136023",
                    "eqUsd": "1239950.9687532129092577",
                    "frozenBal": "0.0918492093160816",
                    "interest": "0",
                    "isoEq": "0",
                    "isoLiab": "0",
                    "isoUpl":"0",
                    "liab": "0",
                    "maxLoan": "1453.92289531493594",
                    "mgnRatio": "",
                    "notionalLever": "",
                    "ordFrozen": "0",
                    "twap": "0",
                    "uTime": "1620722938250",
                    "upl": "0.570822125136023",
                    "uplLiab": "0",
                    "stgyEq":"0"
                }
            ],
            "imr": "3372.2942371050594217",
            "isoEq": "0",
            "mgnRatio": "70375.35408747017",
            "mmr": "134.8917694842024",
            "notionalUsd": "33722.9423710505978888",
            "ordFroz": "0",
            "totalEq": "11172992.1657531589092577",
            "uTime": "1623392334718"
        }
    ],
    "msg": ""
}
  } else {
      var request = OKX_PrivateRequest(stn);
      DebugLog("URL ....",JSON.stringify(request));
      var response = UrlFetchApp.fetch(request.uri,request.params);
      Logger.log(JSON.parse(response));
      DebugLog("Receiving data from "+stn.name, response);
      try { var response = JSON.parse(response); } catch(e) {Logger.log("No valid JSON data received"); return false;}
  }
  
    
  if (debug == true) { Browser.msgBox(stn.name+" Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(response)); }   
  try {  Logger.log("Validating datatype "+response.data.details); } catch(e) { Logger.log(response); Logger.log("no or empty response"); return null;}
  var array = [];
  var num = 0;
  Logger.log(response.data[0].details);
  Logger.log("******************************");  
  for (r in response.data[0].details){
    if (response.data[0].details[r].cashBal * 100000 > 0)  {
      Logger.log("push "+num);
      array.push({
         curcodeEX: response.data[0].details[r].ccy,
         balance:   response.data[0].details[r].cashBal
      });   }
    //Logger.log(r+" "+response.response_data.balance[r].total);
  }
  DebugLog(stn.name+" GetBalance", JSON.stringify(array)); 
  if (stn.thirdattrib.toLowerCase().indexOf('debug') >= 0)  {  Browser.msgBox(JSON.stringify(array)); }   
  DebugLog(array);
  return array;
}



function OKX_PrivateRequest(stn) {      
  function HMACSHA256B64(s, secret) { return (Utilities.base64Encode(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret))); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
 
  var timestamp = Utilities.formatDate(new Date(), "UTC", 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
      payld     = timestamp + stn.method + stn.command,
      sign      = HMACSHA256B64(payld,stn.secret),
      params    = {
       'method'                : stn.method,  
       'muteHttpExceptions'    : true,
       'headers': {
         'OK-ACCESS-KEY'       : stn.apikey,     
         'OK-ACCESS-SIGN'      : sign,
         'OK-ACCESS-TIMESTAMP' : timestamp,
         'OK-ACCESS-PASSPHRASE': stn.thirdattrib,
         'Content-Type'    :'application/json',
       },
       //'payload'         : bybrequest.command
   } 
   return  { uri: stn.uri + stn.command,   params: params};
}
