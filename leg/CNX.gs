function CNX_GetBalances() {  
  var CNXrequest =  {
  'name'     : 'Coinex',
  'apikey'   : EXKEY,
  'secret'   : EXSECRET,  
  'uri'      :'https://api.coinex.com/v1',
  'version'  : '',
  'command'  :'/balance/info',
  'method'   :'GET',
  'payload'  : {}
  };

  if (ADATTRIB.toLowerCase().indexOf('demo') >= 0) {
    var response  = {
      "code": 0,
      "data": {
        "BCH": {                     
          "available": "13.60109",   
          "frozen": "0.00000"        
         },
        "BTC": {                     
          "available": "32590.16",   
          "frozen": "7000.00"        
         },
        "ETH": {                     
          "available": "5.06000",    
          "frozen": "0.00000"        
        }
    },
    "message": "Ok"
   }
  }
   
  else {

    DebugLog("Fetching from ....",CNXrequest.name);
    var request  = CNX_PrivateRequest(CNXrequest);
    DebugLog("URL ....",JSON.stringify(request));
    var response = JSON.parse(UrlFetchApp.fetch(request.uri,request.params));
    DebugLog("Receiving data from "+CNXrequest.name, response);
    if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox(CNXrequest.name+" Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(response)); }   
  }
  try {  Logger.log("Validating datatype "+response.data[0]); } catch(e) {Logger.log(response); Logger.log("no or empty response"); return null;}
  var array = [];
  for (r in response.data) {    
    //Logger.log(r);
    //Logger.log(response.data[r].available);
    if (Number(response.data[r].available) * 100000  > 0 ) {
     array.push({
       curcodeEX: r, 
       balance: response.data[r].available
     });   
   }
  }
  try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("To Sheet\\n\\n"+JSON.stringify(array)); }   } catch(e) {Logger.log("");}
  DebugLog("To Sheet", array);
  // Logger.log(array);
  return (array);
}
  




function CNX_PrivateRequest(cnxrequest){
  function SortObj(obj) {return Object.keys(obj).sort().reduce(function (result, key) {result[key] = obj[key];return result;}, {});}
  function MD5HEX(message){     
    var signature = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5,message),
        signatureStr = '';
      for (i = 0; i < signature.length; i++) {
        var byte = signature[i];
        if (byte < 0)
          byte += 256;
        var byteStr = byte.toString(16);
        if (byteStr.length == 1) byteStr = '0'+byteStr;
        signatureStr += byteStr;
      }   
    return signatureStr;
  }
  
  if (cnxrequest.hasOwnProperty('payload')  === false) stn.payload  = {};
  if (cnxrequest.payload == "" || cnxrequest.payload == null) stn.payload  = {}
  
  cnxrequest.payload.tonce     = new Date().getTime().toString();
  cnxrequest.payload.access_id = cnxrequest.apikey;
  
  
  var payload        = CreateURIQueryString(SortObj(cnxrequest.payload),""),
      signature_data =  payload+"&secret_key="+cnxrequest.secret,
      params  = {
          'method'            : cnxrequest.method,
          'muteHttpExceptions': true,
          'contentType'       : 'application/json',
          'headers': {
            'authorization'   : MD5HEX(signature_data).toUpperCase(),
            'User-Agent'      : 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',
           },
      };
  //Logger.log("***************");
  //Logger.log("signstr "+signature_data);
  //Logger.log("***************");
  return  { uri: cnxrequest.uri + cnxrequest.command + "?"+payload, params: params};
}



