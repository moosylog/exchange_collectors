
function CUR_GetBalances(EXKEY, EXSECRET) {
  
  var stn = {
   "id"       : "CUR",
   "name"     : "currency_com",
   "apikey"   : HashExkey(EXKEY,"decode"),
   "secret"   : HashExkey(EXSECRET,"decode"),
   "command"  : "account",
   "apiversion" : "/v1/",
   "method"   : "get",
//   "uri"       : "https://test-public-api.backend.currency.com/api",
   "uri"       : "https://api-adapter.backend.currency.com/api",
   "payload"   : ""
  };

  var response  = { data: null, status: true, message:   ""  },
      account   = "",
      array     = [];
 
 var response = CUR_PrivateRequest(stn);
    
  try { response = JSON.parse(UrlFetchApp.fetch(response.uri, response.params ).getContentText());  } catch (e) { Logger.log(e + "   " + response);}
  Logger.log("* received from api *");
  Logger.log(response); 
  try {r = response.balances[0]} catch(e) { Logger.log("Warn: empty response:"); return(false); }
 
 for (r in response.balances) {
    total = Number(response.balances[r].free);
    if (response.balances[r].locked != null) { total = total  + Number(response.balances[r].locked) } 
     if ((total * 1000) > 0) array.push({ curcodeEX: response.balances[r].asset,  balance: total });
   //Logger.log(r+" "+total);
 }
  Logger.log("*****************");
  Logger.log(array);
  return(array);
}
 
 


function CUR_PublicRequest(stn) { 
  if (stn.hasOwnProperty('payload')  === true) stn.payload  = CreateURIQueryString(stn.payload,"?");
  var params = { 
        'method'            : stn.method,
        'muteHttpExceptions': true,
       // 'Content-Type'    :'application/json',
        'headers': { 
          }
        };
  return  { uri: stn.uri+stn.apiversion+stn.command+stn.payload , params: params};
} 

function CUR_PrivateRequest(stn) {
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  try { stn.payload = CreateURIQueryString(stn.payload,"&");   } catch (e) {stn.payload=""; Logger.log("CUR_Priv: Err 1");}
  try { if (stn.payload[0] === "?" || stn.payload[0] === "&" )  stn.payload = stn.payload.substr(1); } catch(e)  { Logger.log("CUR_Priv: Err 2");}
  var payload = "";
  params = { 
        'method'            : stn.method,
        'muteHttpExceptions': true,
        'Content-Type'      :'application/x-www-form-urlencoded',
        'headers': { 
           'X-MBX-APIKEY'    : stn.apikey,
          },
       // 'payload'           : '',
        };
  
  
  if (typeof stn.payload == 'object') stn.payload = CreateURIQueryString(stn.payload);
  
  payload =  "timestamp="+new Date().getTime().toString();  
  if (stn.payload != "") payload = payload +"&"+stn.payload;

  payload=payload+"&signature="+HMACSHA256HEX( payload, stn.secret);
  
  return  { uri: stn.uri+stn.apiversion+stn.command+"?"+payload , params: params};
}

