// HUOBI is an issue
// Think it will check IP address and blacklists IP addresses - only a few work ;-(


function HUO_GetBalances() {

  var stn = {
   'id'         : 'HUO',
   'name'       : 'Huobi',
   'apikey'     :  EXKEY,
   'secret'     :  EXSECRET,
   'thirdattrib':  ADATTRIB,
   'command'    : '/v1/subuser/aggregate-balance',
   'method'     : 'GET',
   'uri'        : 'api.huobi.pro',
   'payload'    : ''
  };

  if (stn.thirdattrib == "") {
    stn.command = '/v1/account/accounts';
    var response = HUO_PrivateRequest(stn);
    response = JSON.parse(UrlFetchApp.fetch(response.uri, response.params));  
    try { var huoid = response.data[0].id.toString(); } catch (e) { Logger.log("ERROR: AccountID - no response."); Logger.log(response); Logger.log("Err #1: Huobi did not respond or blocked us, try again");  return false;}
  } else { var huoid = stn.thirdattrib; }
  Logger.log(response);
  
  if (response.status != "ok") return false;
  stn.command = '/v1/account/accounts/'+huoid+'/balance';
  Logger.log("Huobi fetch account id = "+huoid );
  Logger.log("Huobi command    = "+stn.command  );
  response = HUO_PrivateRequest(stn);
  response = JSON.parse(UrlFetchApp.fetch(response.uri, response.params));  
  
  try { var s= response.data } catch (e) { Logger.log(response); throw(response.err-msg); return (false);}
  if (response.data === null) { Logger.log("ERROR: Huobi line 35"); Logger.log(response); Logger.log("Err #2: Huobi did not respond or blocked us, try again"); return false;} 
  
   
  var array = [];
  
  for (var x in response.data.list){
    //Logger.log(response.data.list[x].currency.toUpperCase());
    if (response.data.list[x].type !='frozen' && response.data.list[x].balance * 10000 > 0) {
      array.push({ curcodeEX: response.data.list[x].currency.toUpperCase(),  balance: response.data.list[x].balance });
    }
  }
  Logger.log(array);
  return(array);
}




function HUO_PrivateRequest(stn) {
  function HMACSHA256B64(s, secret) { return (Utilities.base64Encode(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret))); }
  function SortObj(obj) {return Object.keys(obj).sort().reduce(function (result, key) {result[key] = obj[key];return result;}, {});}
  
  const timestamp     = encodeURIComponent(Utilities.formatDate(new Date(), "UTC", 'yyyy-MM-dd\'T\'HH:mm:ss'));
   
  if (stn.hasOwnProperty('payload')  === false || stn.payload == "")   stn.payload  = {}; 
  stn.payload.Timestamp        = timestamp;
  stn.payload.AccessKeyId      = stn.apikey;
  stn.payload.SignatureMethod  = 'HmacSHA256';
  stn.payload.SignatureVersion = '2';
  
  var payload   = SortObj(stn.payload);  
      payload   = Object.keys(payload ).map(function(key) {return key + '=' + payload[key];}).join('&');
      
  var signature = HMACSHA256B64( stn.method.toUpperCase()+"\n"+stn.uri+"\n"+stn.command+"\n"+payload, stn.secret),
      params    = { 
          'method'            : stn.method,
          'muteHttpExceptions': true,
          'headers': { 
            'Content-Type'      : 'application/json',
            }
          };
  return  { uri: stn.uri+stn.command+"?"+payload+"&Signature="+signature , params: params};
}

function HUO_PublicRequest(stn) {
  params    = { 
          'method'            : stn.method,
          'muteHttpExceptions': true,
          'headers': { 
            'Content-Type'      : 'application/json',
            }
          },
   payload = "";
   
   if (stn.payload != "")  payload = CreateURIQueryString(stn.payload,"?");  
   
   return  { uri: stn.uri+stn.command+payload, params: params};
}