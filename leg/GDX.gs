
function GDX_GetBalances() {
   
  var stn = {
   'id'          : 'GDX',
   'name'        : 'Coinbase Pro',
   'apikey'      : EXKEY,
   'secret'      : EXSECRET,
   'thirdattrib' : ADATTRIB,
   'command'     : '/accounts',
   'apiversion'  : '',
   'method'      : 'GET',
   'uri'         : 'https://api.pro.coinbase.com',
   'payload'     : ''
  };
  
  var response  = { data: null, status: true, message:   ""  },
      DataAll   = '',
      array     = [],
      dbg       = false,
      response  = '';
 
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0) { 
      dbg = true;  
      var payload     = stn.thirdattrib.split(' '); 
      stn.adattrib    = payload[0].trim(); 
      stn.thirdattrib = payload[0].trim(); 
  }
  
  response  = GDX_PrivateRequest(stn);
  
  try { response = UrlFetchApp.fetch(response.uri, response.params); }  catch(e)  { DebugLog("Coinbase Pro (GDX) API Fetch Error:",e);  return false; }
  try { DataAll = JSON.parse(response.getContentText()); } catch(e) { DebugLog("Coinbase Pro (GDX) API DataAll.parse Error:",response); return false; }
  DebugLog("Receiving data from "+stn, DataAll);
  if (dbg == true)  { Browser.msgBox(stn.name+" Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(DataAll)); }   
  if (!DataAll.length) { DebugLog("Coinbase Pro (GDX) API return null",DataAll); return false; }
  //if (DataAll === null || DataAll[0].balance === undefined ) { DebugLog("Coinbase Pro (GDX) API return null",DataAll); return false; }
  for (i = 0; i < DataAll.length; i++) { 
    if (Number([DataAll[i].balance]*100000000) > 0) array.push( { curcodeEX: DataAll[i].currency, balance:Number(DataAll[i].balance) });    
  }
  if (dbg == true)  Browser.msgBox("To Sheet:\\n\\n"+JSON.stringify(array));   
  DebugLog("To Sheet: ", JSON.stringify(array));
 return(array); 
}
 
 


function GDX_PublicRequest(stn) { 
  var params = { 
        'method'            : stn.method,
        'muteHttpExceptions': true,
        'headers': {
          'Content-Type': 'application/json' }
        };
  return  { uri: stn.uri+stn.command, params: params};
}


function GDX_PrivateRequest(stn) {
  function HMACSHA256B64enc(s, secret) { return (Utilities.base64Encode(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256,Utilities.base64Decode(Utilities.base64Encode(s)),Utilities.base64Decode(secret )))); }

  try { if (stn["adattrib"] === undefined ) stn.adattrib = stn.thirdattrib; } catch(e) { Logger.log("GDX_Priv: Err 1");}  // compatible with ReX
  if ( stn.payload != "" ) stn.payload = JSON.stringify(stn.payload); 

  var nonce  = Math.floor(new Date().getTime()/1000).toString(),
      params = { 
        'method'            : stn.method,
        'muteHttpExceptions': true,
        'headers': {
          'CB-ACCESS-KEY'       : stn.apikey, 
          'CB-ACCESS-SIGN'      : HMACSHA256B64enc(nonce + stn.method + stn.command + stn.payload, stn.secret ), 
          'CB-ACCESS-TIMESTAMP' : nonce, 
          'CB-ACCESS-PASSPHRASE': stn.adattrib,
          'Content-Type'        : 'application/json'
        }
      };
  
  if ( stn.payload != "" ) stn.payload = CreateURIQueryString(JSON.parse(stn.payload),"?");
  return  { uri: stn.uri+stn.command+stn.payload, params: params};
}
