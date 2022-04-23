

function VNX_GetBalances(){

  var VNXrequest = {
   "id"         : "VNX",
   "name"       : "Vinex",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "command"    : "/api/v2/balances",
   "uri"        : "https://api.vinex.network",
   "method"     : "GET",
   "payload"    : ""
  }, array = [];
  
  if (ADATTRIB.toLowerCase().indexOf('demo') >= 0){
    var response  = {
  "status": 200,
  "data": [
    {
      "asset": "BTC",
      "free": 9.695,
      "locked": 0,
      "loanAvailableBalance": 0,
      "loanReservedBalance": 0,
      "loanLentBalance": 0,
      "loanCollateralBalance": 0
    },
    {
      "asset": "ETH",
      "free": 72.147,
      "locked": 0.152,
      "loanAvailableBalance": 0,
      "loanReservedBalance": 0,
      "loanLentBalance": 0,
      "loanCollateralBalance": 0
    }
  ]
}
    
  } else {
    //Browser.msgBox(VNXrequest.name+" is under development");
    DebugLog("Fetching from ....",VNXrequest.name);
    var request  = VNX_PrivateRequest(VNXrequest);
    DebugLog("URL ....",request.uri +  CreateURIQueryString(request.params,'?'));
    var response = UrlFetchApp.fetch(request.uri,request.params);
    if (response == "") { DebugLog("No data",VNXrequest.name); return null; }
    DebugLog("Receiving data from "+VNXrequest.name, response);
    response = JSON.parse(response);
  }
  
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox(VNXrequest.name+" Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(response)); }   
  try {  Logger.log(VNXrequest.name+": Validating received data "+response.data[0].asset); } catch(e) {Logger.log(response); Logger.log(VNXrequest.name+" : no or empty response"); return null;}
  
  for (r in response.data) {    
    Logger.log( response.data);
    if (Number(Math.abs( response.data[r].free )) * 100000  > 0) {
      array.push({ curcodeEX: response.data[r].asset, balance: Number(response.data[r].free) + Number(response.data[r].locked) });                       
    }
  }
  try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("To Sheet\\n\\n"+JSON.stringify(array)); }   } catch(e) {Logger.log("");}
  DebugLog("To Sheet", array);
  return (array);
}



function VNX_PrivateRequest(VNXrequest) {      
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  var payload        = '',
      method         = VNXrequest.method,
      timestamp      = new Date().getTime().toString().substring(0,10),
      path           = VNXrequest.command,
      query_string   = '',
      signature_data = method + timestamp + path + query_string + payload
  
                    
  //if (VNXrequest.payload != "") {payload = "/api"+VNXrequest.command+nonce + CreateURIQueryString(VNXrequest.payload,'?') };
      
  var signature   = HMACSHA256HEX(signature_data, VNXrequest.secret),   
      params      = {       
        method             : VNXrequest.method,      
        muteHttpExceptions : true,
        headers            : {
                               'api-key'               : VNXrequest.apikey,                     
                               'time_stamp'            : timestamp,
                               'signature'             : signature,
                               'User-Agent'            : 'rest-client',
                               'Content-Type'          : 'application/json'
                             },
        payload : ''
      };

  
  
  // if (VNXrequest.payload != "")  return  { uri: VNXrequest.uri + VNXrequest.command + CreateURIQueryString(VNXrequest.payload,'?'), params: params};
  //return  { uri: VNXrequest.uri + VNXrequest.command , params: params};
  return  { uri: VNXrequest.uri + VNXrequest.command +"?time_stamp="+timestamp  , params: params};
}

/*
function VNX_PublicRequest(VNXrequest) {   
  const params      = {       
          method    : VNXrequest.method,
          headers   : {
                         'Content-Type': 'application/json',
                      },
        }
 
  return  { uri: VNXrequest.uri + VNXrequest.command,  params: params};
} 
*/

