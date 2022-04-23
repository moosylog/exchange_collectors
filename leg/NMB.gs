// ** Code 
function NMB_Settings() {  
  var stn = {
   'id'         : 'NMB',
   'name'       : 'Namebase',
   'apikey'     : EXKEY, 
   'secret'     : EXSECRET,
   'thirdattrib': ADATTRIB,
   'method'     : 'GET',
   'uri'        : 'https://www.namebase.io',   
   'version'    : '',               
   'command'    : "/api/v0/account", 
   'payload'    : ""                        
  };
  if (typeof ADATTRIB != 'undefined') stn.thirdattrib = ADATTRIB; 
  return stn;
}


function NMB_GetBalances() {
  var stn       = NMB_Settings(),                               // ** Get API settings
      response  = { data: null, status: true, message:   ""  }, // ** API response
      array     = [],                                           // ** Result array
      r         = 0,                                            // ** Counter for loops
      l         = 0;
  var request = NMB_PrivateRequest(stn) ;
  DebugLog("URL ....",JSON.stringify(request));
  
  var response = UrlFetchApp.fetch(request.uri,request.params);
  DebugLog("Receiving data from "+stn.name, response);
  
  try { var response = JSON.parse(response); } catch(e) {Logger.log("No valid JSON data received"); return false;}
  if (stn.thirdattrib.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox(stn.name+" Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(response)); }   
  try {  Logger.log("Validating datatype "+response.balances[0].asset); } catch(e) { Logger.log(response); Logger.log("no or empty response"); return null;}
  
  for (r in response.balances) {    
   Logger.log(response.balances[r]);
    //response.balances[0].unlocked = 4;
    l =Number(response.balances[r].unlocked) + Number(response.balances[r].lockedInOrders)  ;
    if ((l * 100000)  > 0)
      array.push({
       curcodeEX: response.balances[r].asset, 
       balance: l
     });   
  }
  
  DebugLog(stn.name+" GetBalance", JSON.stringify(array)); 
  if (stn.thirdattrib.toLowerCase().indexOf('debug') >= 0)  {  Browser.msgBox(JSON.stringify(array)); }   
  return array;
}



function NMB_PrivateRequest(stn) {
  var aut = Utilities.base64Encode(stn.apikey+":"+stn.secret),
      timestamp   =  new Date().getTime().toString(),
      params    = {
        'method'               : stn.method,
        'muteHttpExceptions'   : true,
        'headers': {
          "Authorization"        : 'Basic '+ aut,
          'content-type'         : 'application/json',
          'Accept'               : 'application/json',
        } // All request bodies should have content type application/json and must be valid JSON
   }
   return  { uri: stn.uri + stn.command +"?timestamp="+timestamp+"&receiveWindow=5000", params: params};
}





