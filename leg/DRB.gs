

function DRB_GetBalances() {
  
  var stn = {
   "id"         : "DRB",
   "name"       : "Deribit",
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "command"    : "private/account",
   "uri"        : "https://deribit.com/api",
   "apiversion" : "/v2/",
   "method"     : "GET",
   "payload"    : {'currency':'BTC','extended':'true'}
  }; 
 


  var array    = [],
      attrib   = "";

  var response = DRB_PrivateRequest(stn);
      Logger.log("******** Deribit - request BTC *****************");
      Logger.log(response);
      Logger.log("************************************************");
  try { response = JSON.parse(UrlFetchApp.fetch(response.uri, response.params).getContentText());  } catch (e) { Logger.log(e);}
      Logger.log(response);
      Logger.log("************************************************");
    
    if (response == null) {return(null);}
    try { var s = response.result; } catch (e) {throw("Error: Check script timezone"); return (false);}
  
  
  if (ADATTRIB === '' || ADATTRIB === null ) attrib  = 'response.result.balance'; else  {attrib = eval('response.result.'+ ADATTRIB); }
  if (attrib === '' || attrib === 0 ) attrib  = 'response.result.balance';
  
  try { attrib = eval(attrib); } catch (e) { Logger.log(""); }
  //Logger.log(ADATTRIB+'='+attrib);

  if (attrib  * 10000 > 0) { array.push({ curcodeEX: "BTC",  balance: Number(attrib) }); }
  
 
  
  
  // ETH
  stn.payload =   {'currency':'ETH','extended':'true'};
  var response = DRB_PrivateRequest(stn);
      Logger.log("******** Deribit - request ETH *****************");
      Logger.log(response);
      Logger.log("************************************************");
  try { response = JSON.parse(UrlFetchApp.fetch(response.uri, response.params).getContentText());  } catch (e) { Logger.log(e);}
      Logger.log(response);
      Logger.log("************************************************");
    
    if (response == null) {return(null);}
    try { var s = response.result; } catch (e) {throw("Error: Check script timezone"); return (false);}
  
  
  if (ADATTRIB === '' || ADATTRIB === null ) attrib  = 'response.result.balance'; else  {attrib = eval('response.result.'+ ADATTRIB); }
  if (attrib === '' || attrib === 0 ) attrib  = 'response.result.balance';
  
  try { attrib = eval(attrib); } catch (e) { Logger.log(""); }
  //Logger.log(ADATTRIB+'='+attrib);

  if (attrib  * 10000 > 0) { array.push({ curcodeEX: "ETH",  balance: Number(attrib) }); }
  
  
  
  
  Logger.log("Deribit => sheet:");
  Logger.log(array);
  return(array);
}





function DRB_PrivateRequest(DRBrequest) {
  Logger.log("Insite Deribit:");
  function DRB_GetToken(DRBrequest) { 
    var payload = {
        'client_id'     : DRBrequest.apikey,
        'client_secret' : DRBrequest.secret,
        'grant_type'    : 'client_credentials'  },
    params = {
        'method'               : DRBrequest.method,
        'muteHttpExceptions'   : true,
        'headers': {    
          'Content-Type'       : 'application/json'  }
    };
    var qs = CreateURIQueryString(payload,"?");
    return (JSON.parse(UrlFetchApp.fetch(DRBrequest.uri+DRBrequest.apiversion+"public/auth"+qs, params) ) );
  }

  var response = DRB_GetToken(DRBrequest),  //response.result.access_token   response.result.refresh_token   response.result.scope
      params = {
        'method'               : DRBrequest.method,
        'muteHttpExceptions'   : true,
        'headers': {    
          'Content-Type'  : 'application/json',
          'Authorization' : 'Bearer '+response.result.access_token
         }
      };
      if ( DRBrequest.payload != '' ) DRBrequest.payload = CreateURIQueryString(DRBrequest.payload,"?");
      return  { uri: DRBrequest.uri+DRBrequest.apiversion+DRBrequest.command+DRBrequest.payload, params: params};
}



function DRB_PublicRequest(DRBrequest) {
  var params = {
        'method'               : DRBrequest.method,
        'muteHttpExceptions'   : true,
        'headers': {    
          'Content-Type'  : 'application/json',
         }
      };
      if ( DRBrequest.payload != '' ) DRBrequest.payload = CreateURIQueryString(DRBrequest.payload,"?");
      return  { uri: DRBrequest.uri+DRBrequest.apiversion+DRBrequest.command+DRBrequest.payload, params: params};
}
