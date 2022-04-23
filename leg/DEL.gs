function DEL_GetBalances(){

  function DebugLog(a,b){Logger.log('****'+a+'****'); Logger.log(b);}
  //Browser.msgBox("Work in Progress\\nPlease contact moosylog@gmail.com");

  var DELrequest = {
   "id"         : "DEL",
   "name"       : "DeltaExchange",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "command"    : "/v2/wallet/balances",  
   "uri"        : "https://api.delta.exchange",
   "method"     : "GET",
   "payload"    : ""
  }, array = [];
  
  
  if (ADATTRIB.toLowerCase().indexOf('demo') >= 0){
    var response  = {
  "success": true,
  "result": [
    {
      "balance": "1.11",
      "order_margin": "string",
      "position_margin": "string",
      "commission": "string",
      "available_balance": "2",
      "asset": {
        "id": 1,
        "symbol": "string",
        "precision": 0
      }
    },
    {
      "balance": "0.021",  // available + locked
      "order_margin": "string",
      "position_margin": "string",
      "commission": "string",
      "available_balance": "1",
      "asset": {
        "id": 2,
        "symbol": "string",
        "precision": 0
      }
    },
	{
      "balance": "203",  // available + locked
      "order_margin": "string",
      "position_margin": "string",
      "commission": "string",
      "available_balance": "1",
      "asset": {
        "id": 4,
        "symbol": "string",
        "precision": 0
      }
    }
  ]
}
    
  } else {
    DebugLog("Fetching from ....",DELrequest.name);
    var request  = DEL_PrivateRequest(DELrequest);
    DebugLog("URL ....",request.uri +  CreateURIQueryString(request.params,'?'));
    var response = UrlFetchApp.fetch(request.uri,request.params);
    Logger.log( response );
    if (response == "") { DebugLog("No data",DELrequest.name); return null; }
    DebugLog("Receiving data from "+DELrequest.name, response);
    response = JSON.parse(response);
  }
  
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox(DELrequest.name+" Connector DEBUG Mode:"); Browser.msgBox("Received (Raw balance)\\n\\n"+JSON.stringify(response)); }   
  //try {  Logger.log(DELrequest.name+": Validating received data "+response[0].currency); } catch(e) {Logger.log(response); Logger.log(DELrequest.name+" : no or empty response"); return null;}
  
  for (r in response.result) {    
    //Logger.log("ok");
    //Logger.log( response.result[0]);
    if (Number(Math.abs( response.result[r].balance )) * 100000  > 0) {
      array.push({ curcodeEX: response.result[r].asset.id, balance: response.result[r].balance});                       
    }
  }
  try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("Lookup Symbols for the following assets:\\n\\n"+JSON.stringify(array)); }   } catch(e) {Logger.log("");}
  
  // ** Lookup assets
  DELrequest.command = "/v2/assets";
  var request  = DEL_PrivateRequest(DELrequest);
  var response = UrlFetchApp.fetch(request.uri,request.params);
  response = JSON.parse(response);
  for (s in array) {     
    for (r in response.result) {  
      if ( array[s].curcodeEX == Number(response.result[r].id) ) array[s].curcodeEX = response.result[r].symbol;
    }
  }
  try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("To Sheet: \\n\\n"+JSON.stringify(array)); }   } catch(e) {Logger.log("");}
  DebugLog("To Sheet", array);
  return (array);
}



function DEL_PrivateRequest(DELrequest) {      
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  var payload        = '',
      method         = DELrequest.method,
      timestamp      = Math.floor(new Date().getTime() / 1000).toString().substring(0, 10),
      path           = DELrequest.command,
      query_string   = '',
      signature_data = method + timestamp + path + query_string + payload;

  
  if (DELrequest.payload != "") {payload = "/api"+DELrequest.command+nonce + CreateURIQueryString(DELrequest.payload,'?') };
  
  var signature   = HMACSHA256HEX(signature_data, DELrequest.secret),   
      params      = {       
        method             : DELrequest.method,      
        muteHttpExceptions : true,
        headers            : {
                               'api-key'               : DELrequest.apikey,                     
                               'timestamp'             : timestamp,
                               'signature'             : signature,
                               'User-Agent'            : 'rest-client',
                               'Content-Type'          : 'application/json'
                             },
        //payload : signature_data
      };

  
  if (DELrequest.payload != "")  return  { uri: DELrequest.uri + DELrequest.command + CreateURIQueryString(DELrequest.payload,'?'), params: params};
  return  { uri: DELrequest.uri + DELrequest.command  , params: params};
}

