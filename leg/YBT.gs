
function YBT_GetBalances(){

  var YBTrequest = {
   "id"         : "YBT",
   "name"       : "Yobi",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "command"    : "getInfo",
   "uri"        : "https://yobit.net/tapi/",
   "method"     : "POST",
   "payload"    : ""
  }, array = [];
  
  if (ADATTRIB.toLowerCase().indexOf('demo') >= 0){
    var response  = {
	"success":1,
	"return":{
		"funds":{
			"ltc":22,
			"nvc":423.998,
			"ppc":10,
		},
		"funds_incl_orders":{
			"ltc":32,
			"nvc":523.998,
			"ppc":20,
		},		
		"rights":{
			"info":1,
			"trade":0,
			"withdraw":0
		},
		"transaction_count":0,
		"open_orders":1,
		"server_time":1418654530
	}
  }   
 } else {
    //Browser.msgBox(YBTrequest.name+" is under development");
    DebugLog("Fetching from ....",YBTrequest.name);
    var request  = YBT_PrivateRequest(YBTrequest);
    DebugLog("URL ....",request.uri +  CreateURIQueryString(request.params,'?'));
    var response = UrlFetchApp.fetch(request.uri,request.params);
    if (response == "") { DebugLog("No data",YBTrequest.name); return null; }
    DebugLog("Receiving data from "+YBTrequest.name, response);
    response = JSON.parse(response);
  }
  
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox(YBTrequest.name+" Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(response)); }   
  try {  Logger.log(YBTrequest.name+": Validating received data "+response['return'].funds_incl_orders); } catch(e) {Logger.log(response); Logger.log(YBTrequest.name+" : no or empty response"); return null;}
  
  for (r in response['return'].funds_incl_orders) {    
    if (Number(Math.abs( response['return'].funds_incl_orders[r] )) * 100000  > 0) {
      array.push({ curcodeEX: r.toUpperCase(), balance: response['return'].funds_incl_orders[r] });                       
    }
  }
  try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("To Sheet\\n\\n"+JSON.stringify(array)); }   } catch(e) {Logger.log("");}
  DebugLog("To Sheet", array);
  return (array);
}



function YBT_PrivateRequest(YBTrequest) {      
  function HMACSHA512HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  function getnonce(key){
    var keySeed  = parseInt(key.substring(0,5), 16);
    var dateSeed = parseInt(new Date().getTime() / 1000);
    return (dateSeed + keySeed)
  }
     
  var nonce          = getnonce(YBTrequest.apikey).toString(); 
      signature_data = "method=getInfo&nonce="+nonce;
      signature      = HMACSHA512HEX(signature_data, YBTrequest.secret),
      params         = {       
        method             : YBTrequest.method,    
        timeout            : 20000,
        muteHttpExceptions : true,
        headers            : {
                               'key'              : YBTrequest.apikey,                     
                               'sign'             : signature,
                               'Content-Type'     : 'application/x-www-form-urlencoded'
                             },
        payload            : signature_data
      };

  return  { uri: YBTrequest.uri   , params: params};
}



function YBT_PublicRequest(YBTrequest) {   
  const params      = {       
          method    : YBTrequest.method,
          headers   : {
                         'Content-Type': 'application/json',
                      },
        }
 
  return  { uri: YBTrequest.uri + YBTrequest.command,  params: params};
}
