// IDEX API v2 Private Request in Google Apps Script (GAS).
// By Moosy Research, see more cryptosheets on: https://sites.google.com/site/moosyresearch/projects/cryptos



function IDX_GetBalances() {  

  var IDXrequest = {
   'id'         : 'idex2',
   'name'       : 'IDEX',
   'apikey'     : EXKEY,
   'secret'     : EXSECRET,
   'command'    : '/v1/balances',   
 //  'uri'        : 'https://api-sandbox.idex.io',
   'uri'        : 'https://api.idex.io',
   'method'     : 'GET',
   'payload'    : ADATTRIB        // <- wallet address
  }; 
 
   
  
  if (IDXrequest.payload === '' || IDXrequest.payload.length < 1) {
   IDXrequest.payload = '';
   IDXrequest.command = '/v1/wallets';
   var IDX_rr = "";
   try {
   var response = IDX_PrivateRequest(IDXrequest);
     Logger.log("-----------------");
     Logger.log(IDXrequest);
     Logger.log("-----------------");
     Logger.log(response);
       IDX_rr = UrlFetchApp.fetch(response.uri, response.params);
     Logger.log("-----------------");
     Logger.log(IDX_rr);
   } catch (e) { Logger.log("Err: UrlFetch "+IDX_rr); }
   Browser.msgBox("IDEX 2.0 Collector\\nA Wallet address is required in CONFIG as third attribute\\nTrying to fetch Wallets addresses\\n\\n" + IDX_rr );
   return 0;
 }
   
 if (IDXrequest.payload === 'demo') 
      DataAll = [
    {
        "asset": "USDC",
        "quantity": "38192.94678100",
        "availableForTrade": "26710.66678121",
        "locked": "11482.28000000",
        "usdValue": "38188.22"
    },{
        "asset": "ETH",
        "quantity": "3",
        "availableForTrade": "2",
        "locked": "1",
        "usdValue": "3"}
    ]; else
       {
         var IDXresponse = IDX_PrivateRequest(IDXrequest);
         //Browser.msgBox("2a "+IDXresponse.uri);
         //Browser.msgBox("2a "+JSON.stringify(IDXresponse.params));
         DebugLog("IDEX Fetch", IDXresponse.uri);
         var IDXrawdata = UrlFetchApp.fetch(IDXresponse.uri, IDXresponse.params);
         DebugLog("IDEX ResponseCode", IDXrawdata.getResponseCode());
         DebugLog("IDEX getContentText", IDXrawdata.getContentText());
         try {var DataAll  = JSON.parse(IDXrawdata); } catch (e) {var DataAll = IDXrawdata;}
         DebugLog("IDEX Parse", DataAll);
       }
 try {  Logger.log("Validate if we receive a valid response..."+DataAll[0].asset); } catch(e) {Logger.log(DataAll); Logger.log("no or empty response"); return null;}
 
 if (DataAll == null || DataAll == '') { Logger.log("no or empty response"); return null;}
 
 var array = [];
 for (r in DataAll) { 
   // if (DataAll[r].coinType === 'ETH') {DataAll[r].total = 5;  Logger.log(DataAll[r]); }
   if ((DataAll[r].quantity * 10000) > 0) {
     array.push({
       curcodeEX: DataAll[r].asset, 
       balance: DataAll[r].quantity
     });   
   }
 }
 
 Logger.log(array); 
 return (array);
}



function IDX_PrivateRequest(IDXrequest) {      
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  try {
    var t   = JSON.parse(UrlFetchApp.fetch('https://www.uuidtools.com/api/generate/v1')),
        qry = {  'nonce' : t[0],};
  } catch (e) {  var qry = { 'nonce' : UrlFetchApp.fetch("https://www.uuidgenerator.net/api/version1"), }; }
    
  if (IDXrequest.payload != '') qry.wallet = IDXrequest.payload;
  
  //Browser.msgBox(JSON.stringify(qry));

  var payld     = CreateURIQueryString(qry,""),
      signature = HMACSHA256HEX(payld, IDXrequest.secret),
      
      params    = {
       'method'            : IDXrequest.method,  
       'muteHttpExceptions': true,
       'payload'           : IDXrequest.qry, 
       'validateHttpsCertificates' : false,
       headers: {
         'IDEX-API-KEY'              : IDXrequest.apikey,
         'IDEX-HMAC-SIGNATURE'       : signature,
         'Content-Type'              : 'application/json',
         'Accept'                    : 'application/json',
       }, 
  } 
  return  { uri: IDXrequest.uri + IDXrequest.command+"?"+payld, params: params};
}




