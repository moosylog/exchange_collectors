function BYB_GetBalances() {
  var cur = ADATTRIB.split("#");
  var curpara = false;
  try {
    if (cur[1] != undefined) { 
      cur = cur[1].toUpperCase().trim(); 
      curpara = true;  
    }
  } catch(e) { 
    Logger.log("Err #1: BYB");  
  }
 
  var BYBrequest = {
    'id'         : 'BYB',
    'name'       : 'Bybit',
    'apikey'     : EXKEY,
    'secret'     : EXSECRET,
    'command'    : '/v5/spot/account/balances',
    'uri'        : 'https://api.bybit.com',  
    'method'     : 'GET',
    'payload'    : '' 
  }; 
  
  // Use demo/testnet URI if specified
  if (ADATTRIB.toLowerCase().indexOf('testnet') >= 0 || ADATTRIB.toLowerCase().indexOf('demo') >= 0) {
    BYBrequest.uri = 'https://api-demo.bybit.com';
  }
  
  var request = '', response = '', array = [];
  
  // Mock response for demo mode
  if (ADATTRIB.toLowerCase().indexOf('demo') >= 0) { 
    response = {
      "retCode": 0,
      "retMsg": "OK",
      "result": {
        "balances": [
          {
            "coin": "BTC",
            "total": "0.20378018343",
            "free": "0.20378018343",
            "locked": "0"
          },
          {
            "coin": "ETH",
            "total": "0.03560386",
            "free": "0.03560386",
            "locked": "0"
          },
          {
            "coin": "LTC",
            "total": "0.999",
            "free": "0.999",
            "locked": "0"
          }
        ]
      },
      "retExtInfo": {},
      "time": 1659346887407
    };
  } else { 
    DebugLog("Fetching from ....", BYBrequest.name);
    request = BYB_PrivateRequest(BYBrequest);
    DebugLog("URL:", request.uri);
    response = UrlFetchApp.fetch(request.uri, request.params);
 
    DebugLog("Receiving data from "+BYBrequest.name, response);
    if (response == "") { 
      DebugLog("No data", BYBrequest.name); 
      return null; 
    }
    response = JSON.parse(response);
  } 
  
  // Debug mode output
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0) { 
    Browser.msgBox(BYBrequest.name+" Connector DEBUG Mode:");
    Browser.msgBox("Received (Raw balance)\\n\\n"+JSON.stringify(response)); 
  }   
  
  // Validate response
  try {  
    Logger.log(BYBrequest.name+": Validating received data "+response.result.balances[0]); 
  } catch(e) { 
    Logger.log(response); 
    Logger.log(BYBrequest.name+" : no or empty response"); 
    return null;
  }
  
  // Parse balances
  for (var r in response.result.balances) {   
    // https://bybit-exchange.github.io/docs/v5/spot/balance
    if (Number(Math.abs(response.result.balances[r].total)) * 100000 > 0) {
      array.push({ 
        curcodeEX: response.result.balances[r].coin, 
        balance: Number(response.result.balances[r].total)
      });                       
    }
  }
  
  // Debug output to sheet
  try { 
    if (ADATTRIB.toLowerCase().indexOf('debug') >= 0) { 
      Browser.msgBox("To Sheet: \\n\\n"+JSON.stringify(array)); 
    }   
  } catch(e) { 
    Logger.log(""); 
  }
  
  DebugLog("To Sheet", array);
  return array;
}

function BYB_PrivateRequest(BYBrequest) {      
  function HMACSHA256HEX(s, secret) { 
    return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); 
  }
  function ToHex(s) { 
    return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  
  }
  
  var timestamp = new Date().getTime().toString(),  
      recvWindow = '5000', // Default receive window (ms)
      queryString = 'api_key=' + BYBrequest.apikey + '&recv_window=' + recvWindow + '&timestamp=' + timestamp,
      sign = HMACSHA256HEX(queryString, BYBrequest.secret),
      params = {
        'method'            : BYBrequest.method,  
        'muteHttpExceptions': true,
        'headers': {
          'Content-Type'    : 'application/json',
          'X-BAPI-API-KEY'  : BYBrequest.apikey,
          'X-BAPI-SIGN'     : sign,
          'X-BAPI-TIMESTAMP': timestamp,
          'X-BAPI-RECV-WINDOW': recvWindow,
          'X-BAPI-API-VERSION': '5.0.0'
        }
      };
  
  return { uri: BYBrequest.uri + BYBrequest.command + "?" + queryString + "&sign=" + sign, params: params };
}
