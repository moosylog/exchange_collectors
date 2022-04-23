

//https://api.probit.com/api/exchange/v1/order_history
//https://api.probit.com/api/exchange/v1/order_history
function PRB_Orders(){
  var PRBrequest = {
   "id"         : "PRB",
   "name"       : "Probit",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "command"    : "/order_history",   
   "uri"        : "https://api.probit.com/api/exchange/v1",
   "method"     : "GET",
   "payload"    : {start_time: '2018-01-01T00:00:00.000Z',end_time: '2018-12-31T00:00:00.000Z',limit: '200',market_id: 'BTC-USDT'}
  };
  var request  = PRB_PrivateRequest(PRBrequest);
  Logger.log(request);
  //var response = UrlFetchApp.fetch(request.uri,request.params);
  //Logger.log(response);
  var response = JSON.parse(UrlFetchApp.fetch(request.uri,request.params));
  Logger.log(response);
  
}
  



function PRB_GetBalances(){
  var PRBrequest = {
   "id"         : "PRB",
   "name"       : "Probit",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "command"    : "/balance",   
   "uri"        : "https://api.probit.com/api/exchange/v1",
   "method"     : "GET",
   "payload"    : ""
  }, array = [];
  
  if (ADATTRIB.toLowerCase().indexOf('demo') >= 0){
    var response  = {data: [
      {"currency_id":"XRP","total":"100","available":"0"},
      {"currency_id":"ETH","total":"0.5","available":"0"} ]
    }
  } else {

    DebugLog("Fetching from ....",PRBrequest.name);
    var request  = PRB_PrivateRequest(PRBrequest);
    DebugLog("URL ....",JSON.stringify(request));
    var response = JSON.parse(UrlFetchApp.fetch(request.uri,request.params));
    DebugLog("Receiving data from Coindcx", response);
  }
  // ** end
  
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox("Probit Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(response)); }   
  try {  Logger.log("Validating datatype "+response.data[0].currency_id); } catch(e) {Logger.log(response); Logger.log("Probit: no or empty response"); return null;}
  for (r in response.data) {    
   if (Number(response.data[r].total) * 100000  > 0) {
     array.push({
       curcodeEX: response.data[r].currency_id.toUpperCase(), 
       balance: response.data[r].total
     });   
   }
  }
  try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("To Sheet\\n\\n"+JSON.stringify(array)); }   } catch(e) {Logger.log("");}
  DebugLog("To Sheet", array);
  return (array);
}



function PRB_PrivateRequest(PRBrequest) {      
  function GetAccessToken(key,secret){
    var params    = {
          method: 'POST',
          headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Basic '+Utilities.base64Encode(key+':'+secret),
          },
        payload: JSON.stringify({grant_type: 'client_credentials' } )
    };
    
    return JSON.parse(UrlFetchApp.fetch('https://accounts.probit.com/token',params));
  }

  const params      = {       
          method    : PRBrequest.method,
          headers   : {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer ' + GetAccessToken(PRBrequest.apikey,PRBrequest.secret).access_token
                      },
  };
  
  
  var ppar = '';
  if (PRBrequest.payload != '' && PRBrequest.payload[0] != '?') { ppar=CreateURIQueryString(PRBrequest.payload,'?');}
  return  { uri: PRBrequest.uri + PRBrequest.command + ppar, params: params};
}


function PRB_PublicRequest(PRBrequest) {   
  const params      = {       
          method    : PRBrequest.method,
          headers   : {
                         'Content-Type': 'application/json',
                      },
        }
  return  { uri: PRBrequest.uri + PRBrequest.command, params: params};
}  

