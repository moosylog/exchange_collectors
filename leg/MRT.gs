function MRT_GetBalances() {  
  const MRTrequest = {
    "id"         : "MRT",
    "name"       : "Bitmart",
    "apikey"     : EXKEY,
    "secret"     : EXSECRET,
    "thirdattrib": ADATTRIB,
    "command"    : "/spot/v1/wallet",   
    "uri"        : "https://api-cloud.bitmart.com",
    "method"     : "GET",
    "payload"    : ""
  }; 

  var dataAll;
  if (ADATTRIB.toLowerCase() !== 'demo') {
    var response = MRT_PrivateRequest(MRTrequest);
    try {
      dataAll = JSON.parse(UrlFetchApp.fetch(response.uri, response.params).getContentText());
      Logger.log(dataAll);
    } catch (e) {
      Logger.log("HTTP Error from Bitmart: " + e.message);
      return null;
    }
  } else {
    dataAll = {
      "code": 1000,
      "trace": "886fb6ae-456b-4654-b4e0-d681ac05cea1",
      "message": "OK",
      "data": {
        "wallet": [
          { "id": "BTC", "available": "0.01", "name": "Bitcoin", "frozen": "0.000000" },
          { "id": "ETH", "available": "1.1", "name": "Ethereum", "frozen": "0.1" },
          { "id": "LTC", "available": "0.5", "name": "Litecoin", "frozen": "0.0" }
        ]
      }
    };
  }

  var array = [];
  try {  
    Logger.log("Bitmart test valid data = " + JSON.stringify(dataAll.data.wallet)); 
  } catch(e) { 
    Logger.log("No or empty response from Bitmart"); 
    Logger.log(dataAll); 
    return null;
  }

  for (var r in dataAll.data.wallet) { 
    try { 
      if ((Number(dataAll.data.wallet[r].available) * 10000) > 0) {
        array.push({
          curcodeEX: dataAll.data.wallet[r].id, 
          balance: Number(dataAll.data.wallet[r].available)
        });   
      } 
    } catch (e) { 
      Logger.log("Err: 12 MRT - Parsing wallet data"); 
      Logger.log(dataAll); 
    }
  }

  DebugLog("Bitmart", array);
  if (ADATTRIB.toLowerCase() === 'debug') {
    Browser.msgBox(JSON.stringify(array));
  }

  return array;
}

function MRT_PublicRequest(MRTrequest) {   
  var params = {
    'method'              : MRTrequest.method,  
    'muteHttpExceptions'  : true,
    'headers': {        
      'Content-Type'       : 'application/json'
    } 
  }; 
  return { uri: MRTrequest.uri + MRTrequest.command, params: params };
}

function MRT_PrivateRequest(MRTrequest) {    
  function HMACSHA256HEX(s, secret) { 
    return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); 
  }
  function ToHex(s) { 
    return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  
  }

  // Use client-side timestamp (Unix ms)
  const timestamp = new Date().getTime().toString(),
        memo = MRTrequest.thirdattrib || 'default_memo', // Fallback if thirdattrib is empty
        sign = HMACSHA256HEX(timestamp + '#' + memo + '#' + MRTrequest.payload, MRTrequest.secret),
        params = {
          'method'              : MRTrequest.method,  
          'muteHttpExceptions'  : true,
          'headers': {        
            'Content-Type'       : 'application/json',
            'X-BM-KEY'           : MRTrequest.apikey,
            'X-BM-SIGN'          : sign,
            'X-BM-TIMESTAMP'     : timestamp
          } 
        }; 
  return { uri: MRTrequest.uri + MRTrequest.command, params: params };
}
