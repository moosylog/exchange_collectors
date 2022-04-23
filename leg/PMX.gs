
function PMX_GetBalances(){

  var PMXrequest = {
   "id"         : "PMX",
   "name"       : "Phemex",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "command"    : "/spot/wallets",
   "uri"        : "https://api.phemex.com/v1",
   "method"     : "get",
   "payload"    : {"currency" :"BTC"}
  }, array = [];
  
  
  
  //todo
  if (ADATTRIB.toLowerCase().indexOf('demo') >= 0){
    var response  = {
    "code": 0,
        "msg": "",
        "data": {
            "account": {
                "accountId": 0,
                "currency": "BTC",
                "accountBalanceEv": 0,
                "totalUsedBalanceEv": 0
            },
        }
    }
      
  } else {
    
    

    // spot BTC  /spot/wallets 
    // swap BTC  /accounts/accountPositions
    if (ADATTRIB.toLowerCase().indexOf('swap') >= 0) PMXrequest.command = "/accounts/accountPositions"
    if (ADATTRIB.toLowerCase().indexOf('spot') >= 0) PMXrequest.command = "/spot/wallets"
    if (ADATTRIB.toLowerCase().indexOf('usd') >= 0) PMXrequest.payload.currency = "USD";
    if (ADATTRIB.toLowerCase().indexOf('usdt') >= 0) PMXrequest.payload.currency = "USDT";
    if (ADATTRIB.toLowerCase().indexOf('eth') >= 0) PMXrequest.payload.currency = "ETH";
                         
    DebugLog("Fetching from ....",PMXrequest.name);
    var request  = PMX_PrivateRequest(PMXrequest);
    DebugLog("URL ....",JSON.stringify(request));
    var response = JSON.parse(UrlFetchApp.fetch(request.uri,request.params));
    DebugLog("Receiving data from Phemex", response);
	try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("To Sheet\\n\\n"+JSON.stringify(response)); }   } catch(e) {Logger.log("");}
  }
  // ** end
  
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox("Phemex Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(response)); }   
  try {  Logger.log("Validating datatype "+response.data); } catch(e) {Logger.log(response); Logger.log("Phemex: no or empty response"); return null;}
  //for (r in response.data.account) {    
    //Logger.log( response.data);
    
  if (ADATTRIB.toLowerCase().indexOf('swap') >= 0) { array.push({ curcodeEX: response.data.account.currency, balance: response.data.account.accountBalanceEv});}                       
    // SPOT {msg=, code=0, data=[{lockedTradingBalanceEv=0, lockedWithdrawEv=0, lastUpdateTimeNs=1.60451729573861632E18, balanceEv=0, currency=BTC, walletVid=0}]}
    else { array.push({ curcodeEX: response.data[0].currency, balance: response.data[0].balanceEv});}                       
    
  //}
  try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("To Sheet\\n\\n"+JSON.stringify(array)); }   } catch(e) {Logger.log("");}
  DebugLog("To Sheet", array);
  return (array);
}



function PMX_PrivateRequest(PMXrequest) {      
  function HMACSHA256HEX(s, secret)    { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }        
  
  var expiry      = (new Date().getTime()+ 60000).toString(), 
      payload     = ""; // required
  if (PMXrequest.payload != "") {payload = PMXrequest.command + CreateURIQueryString(PMXrequest.payload,'') + expiry} else {payload = PMXrequest.command + expiry};
      
  var signature   = HMACSHA256HEX(payload,PMXrequest.secret),   
      params      = {       
        method    : PMXrequest.method,
        headers   : {
                      'Content-Type'               : 'application/json',
                      'x-phemex-request-signature' : signature,           
                      'x-phemex-request-expiry'    : expiry,             
                      'x-phemex-access-token'      : PMXrequest.apikey,
                    }
      };
  return  { uri: PMXrequest.uri + PMXrequest.command + CreateURIQueryString(PMXrequest.payload,'?') , params: params};
}

function PMX_PublicRequest(PMXrequest) {   
  const params      = {       
          method    : PMXrequest.method,
          headers   : {
                         'Content-Type': 'application/json',
                      },
        }
  return  { uri: PMXrequest.uri + PMXrequest.command,  params: params};
} 


