

function NOM_GetBalances(){
  // function DebugLog(a,b){Logger.log('****'+a+'****'); Logger.log(b);}
  //Browser.msgBox("Work in Progress\\nPlease contact moosylog@gmail.com");

  var NOMrequest = {
   "id"         : "NOM",
   "name"       : "Nominex",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "command"    : "/api/rest/v1/private/wallets",
   "uri"        : "https://nominex.io",
   "method"     : "get",
   "payload"    : ""
  }, array = [];
  
  if (ADATTRIB.toLowerCase().indexOf('demo') >= 0){
    var response  = [{"currency":"ZEC","type":"PRIZE","balance":-1.00000000,"balanceAvailable":0.00000000,"balanceInUsdt":0.00000000,"balanceLocked":0.00000000},
                     {"currency":"ETH","type":"PRIZE","balance":2.00000000,"balanceAvailable":0.00000000,"balanceInUsdt":0.00000000,"balanceLocked":0.00000000}];
      
  } else {
    DebugLog("Fetching from ....",NOMrequest.name);
    var request  = NOM_PrivateRequest(NOMrequest);
    DebugLog("URL ....",request.uri +  CreateURIQueryString(request.params,'?'));
    var response = UrlFetchApp.fetch(request.uri,request.params);
    if (response == "") { DebugLog("No data",NOMrequest.name); return null; }
    DebugLog("Receiving data from "+NOMrequest.name, response);
    response = JSON.parse(response);
  }
  
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox(NOMrequest.name+" Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(response)); }   
  try {  Logger.log(NOMrequest.name+": Validating received data "+response[0].currency); } catch(e) {Logger.log(response); Logger.log(NOMrequest.name+" : no or empty response"); return null;}
  
  for (r in response) {    
    //Logger.log( response[r].currency);
    if (Number(Math.abs( response[r].balance )) * 100000  > 0) {
      array.push({ curcodeEX: response[r].currency, balance: response[r].balance});                       
    }
  }
  try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("To Sheet\\n\\n"+JSON.stringify(array)); }   } catch(e) {Logger.log("");}
  DebugLog("To Sheet", array);
  return (array);
}



function NOM_PrivateRequest(NOMrequest) {      
  function HMACSHA384HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_384, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  var nonce       = new Date().getTime().toString(), 
      payload     = '/api' + NOMrequest.command + nonce + '' ;
                    
  if (NOMrequest.payload != "") {payload = "/api"+NOMrequest.command+nonce + CreateURIQueryString(NOMrequest.payload,'?') };
      
  var signature   = HMACSHA384HEX(payload,NOMrequest.secret),   
      params      = {       
        method    : NOMrequest.method,
        headers   : {
                      'Content-Type'          : 'application/json',
                      'Accept'                : '*/*',
                      'nominex-nonce'         : nonce,
                      'nominex-apikey'        : NOMrequest.apikey,
                      'nominex-signature'     : signature.toUpperCase()
                    }
      };
  if (NOMrequest.payload != "")  return  { uri: NOMrequest.uri + NOMrequest.command + CreateURIQueryString(NOMrequest.payload,'?'), params: params};
  return  { uri: NOMrequest.uri + NOMrequest.command  , params: params};
}

function NOM_PublicRequest(NOMrequest) {   
  const params      = {       
          method    : NOMrequest.method,
          headers   : {
                         'Content-Type': 'application/json',
                      },
        }
  return  { uri: NOMrequest.uri + NOMrequest.command,  params: params};
} 


