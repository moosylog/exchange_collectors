
function SMP_GetBalances(){
  var SMPrequest = {
   "id"         : "SMP",
   "name"       : "SimpleFX",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "command"    : "/api/v3/accounts",   
   "uri"        : "https://rest.simplefx.com",
   "method"     : "GET",
   "payload"    : ""
  }, array = [];
  
  if (ADATTRIB.toLowerCase().indexOf('demo') >= 0){
    var response  = {
  "data": [
    {
      "reality": "LIVE",
      "login": 460071,
      "currency": "BIT",
      "leverage": 100,
      "balance": 50000,
      "equity": 50012.24,
      "margin": 20000,
      "freeMargin": 20000,
      "marginLevel": 0
    }
  ],
  "code": 200,
  "message": "string",
  "webRequestId": "string"
}
  } else {

    DebugLog("Fetching from ....",SMPrequest.name);
    var request  = SMP_PrivateRequest(SMPrequest);
    DebugLog("URL ....",JSON.stringify(request));
  /*
    if (request);    
    
    var a = UrlFetchApp.fetch(request.uri,request.params);

    Browser.msgBox("Request:\\n Endpoint:   "+request.uri+"\\nHeader:   "+JSON.stringify(request.params)+"\\n\\nResponse: \\n");
    Browser.msgBox(JSON.stringify(a));
    return false;
    
    Logger.log(a);
var response = JSON.parse(a);
*/
    var response = JSON.parse(UrlFetchApp.fetch(request.uri,request.params));
    //Logger.log(response.data);    
    DebugLog("Receiving data from Coindcx", response);
  }
  // ** end
  
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox(SMPrequest.name+" Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(response)); }   
  try {  Logger.log("Validating datatype "+response.data[0].currency); } catch(e) {Logger.log(response); Logger.log("Probit: no or empty response"); return null;}
  for (r in response.data) {    
   if (Number(response.data[r].balance) * 100000  > 0 && response.data[r].reality != 'DEMO') {
     array.push({
       curcodeEX: response.data[r].currency, 
       balance: response.data[r].balance
     });   
   }
  }
  try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("To Sheet\\n\\n"+JSON.stringify(array)); }   } catch(e) {Logger.log("");}
  DebugLog("To Sheet", array);
  // Logger.log(array);
  return (array);
}



function SMP_PrivateRequest(SMPrequest) {      
  function GetAccessToken(key,secret){
    var params    = {
          method             : 'POST',
          muteHttpExceptions : true,
          payload            : {"clientId": key,"clientSecret": secret}
    };
    
    /*
    var response     = UrlFetchApp.fetch('https://rest.simplefx.com/api/v3/auth/key',params);
    var responseCode = response.getResponseCode();
    var responseBody = response.getContentText();

    if (responseCode === 200) {
       var responseJson = JSON.parse(responseBody)
  
    } else {
      Browser.msgBox(Utilities.formatString("Request access token failed. HTTP code %d: \\n\\n %s", responseCode, responseBody));
      return { data : { token: '!WRONG_FAILED!'} };
    }
    
    Browser.msgBox("Request:\\n Access Token:  /auth/key\\nHeader:   "+JSON.stringify(params)+"\\n\\nResponse: \\n");
    Browser.msgBox(JSON.stringify(response));
    Browser.msgBox(response);
   
    
    
    return (JSON.parse(response));
    */
    return JSON.parse(UrlFetchApp.fetch('https://rest.simplefx.com/api/v3/auth/key',params));
  }

  
//  var a = GetAccessToken(SMPrequest.apikey,SMPrequest.secret);
//  Logger.log(a);
//  return false;
  
  
  
  const params      = {       
          method             : SMPrequest.method,
          muteHttpExceptions : true,
          headers            : {
                                 'Content-Type': 'application/json',
                                 'Authorization': 'Bearer ' + GetAccessToken(SMPrequest.apikey,SMPrequest.secret).data.token
                               },
         };
  var ppar = '';
  if (SMPrequest.payload != '' && SMPrequest.payload[0] != '?') { ppar=CreateURIQueryString(SMPrequest.payload,'?');}
  return  { uri: SMPrequest.uri + SMPrequest.command + ppar, params: params};
}





function SMP_PublicRequest(SMPrequest) {   
  return  { uri: SMPrequest.uri + SMPrequest.command, params: { method: SMPrequest.method, headers: {'Content-Type': 'application/json' } } };
}  

