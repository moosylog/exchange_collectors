
function UPB_GetBalances() {
  var UPBrequest = {
   'id'         : 'UPB',
   'name'       : 'Upbit',
   'apikey'     : EXKEY,
   'secret'     : EXSECRET,
   'command'    : "/v1/accounts",      
   'uri'        : 'https://sg-api.upbit.com',  // or https://id-api.upbit.com
   'method'     : 'GET',
   'payload'    : ''        // <- wallet address
  }; 
     
 var DataAll = "";
 if (ADATTRIB === 'id')  {UPBrequest.uri = 'https://id-api.upbit.com';  DebugLog("Upbit server", UPBrequest.uri);}
 if (ADATTRIB === 'demo') 
      DataAll = [
        { "currency":"ETH", "balance":"1","locked":"0.03","avg_buy_price":"0","avg_buy_price_modified":false,"unit_currency": "SGD", },
        { "currency":"BTC", "balance":"0.1", "locked":"0.0","avg_buy_price":"101000", "avg_buy_price_modified":false,"unit_currency": "SGD",}
      ]
 else
 {
   Logger.log("Fetch"); 
   var response = UPB_PrivateRequest(UPBrequest),
   //DataAll  = JSON.parse(UrlFetchApp.fetch(response.uri, response.params));
   
   DataAll  = UrlFetchApp.fetch(response.uri, response.params);
   if(DataAll.getResponseCode() == 500) { Browser.msgBox(UPBrequest.name+" API responded with:\\n\\nError 500: Internal Server Error\\n\\nTry running CtrXL from a Trigger"); return false; }
   if(DataAll.getResponseCode() != 200) { Browser.msgBox("Oops we received an error from the "+UPBrequest.name+" API:\\n\\n"+DataAll.getResponseCode()+":  "+DataAll.getContentText());  }   
   DataAll  = JSON.parse(DataAll);
   DebugLog("Receiving data from "+UPBrequest.name, JSON.stringify(DataAll));
 }
 try {  Logger.log("Validate if we receive a valid response..."+DataAll[0].currency); } catch(e) {Logger.log(DataAll); Logger.log("Err: no or empty response"); return null;}
 if (DataAll == null || DataAll == '') { Logger.log("Err: no or empty response"); return null;}
 Logger.log( 'OK: Parsing the balance');

 var array = [];
 for (r in DataAll) { 
   if (((Number(DataAll[r].balance) + Number(DataAll[r].locked)) * 10000 ) > 0) {
     array.push({
       curcodeEX: DataAll[r].currency, 
       balance: Number(DataAll[r].balance) + Number(DataAll[r].locked)
     });   
   }
 } 
 Logger.log(array); 
 return (array);
}


  
function UPB_PrivateRequest(UPBrequest) {  

  function encodeJWT(payload, secret) {
    var base64Encode  = function (str) { var encoded = Utilities.base64EncodeWebSafe(str);  return encoded.replace(/=+$/, ''); },
        header        = JSON.stringify({  typ: 'JWT', alg: 'HS256'}),  
        payload       = JSON.stringify({  payload  : payload   }),
        toSign = [base64Encode(header), base64Encode(payload)].join('.');
    return [toSign, base64Encode(Utilities.computeHmacSha256Signature(toSign, secret))].join('.');  
  }
  
  
  function get_uuidv4() { 
    try {
    var t   = JSON.parse(UrlFetchApp.fetch('https://www.uuidtools.com/api/generate/v4')),
        qry = {  'nonce' : t[0],};
    } catch (e) {  var qry = { 'nonce' : UrlFetchApp.fetch("https://www.uuidgenerator.net/api/version4"), }; }
    return qry;
  }
    

  // ** BEGIN PRIVATE REQUEST
  
  const payload  = {
    access_key : UPBrequest.apikey,
    // nonce : {"nonce":"6a8eea19-e7c2-43fd-b8e4-e2efef9d72e3"},
    nonce      : get_uuidv4(),
  },
       params    = {
         'method'            : UPBrequest.method,  
         'muteHttpExceptions': true,
         'payload'           : UPBrequest.qry, 
         'validateHttpsCertificates' : false,
          headers: {
           'Authorization'             : 'Bearer '+encodeJWT(payload, UPBrequest.secret),
           'Content-Type'              : 'application/json',
           'Accept'                    : 'application/json',
          }, 
      };   
 // Logger.log(params.headers.Authorization);
  return  { uri: UPBrequest.uri + UPBrequest.command, params: params};
}

// GAS Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7ImFjY2Vzc19rZXkiOiJ4eHh4eHh4eHh4eHh4eHh4Iiwibm9uY2UiOnsibm9uY2UiOiI2YThlZWExOS1lN2MyLTQzZmQtYjhlNC1lMmVmZWY5ZDcyZTMifX19.f7llt53oVASZ3Lw16VR17ANn74WubUtfgRWtn5Kcl8A
// NODEBearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7ImFjY2Vzc19rZXkiOiJ4eHh4eHh4eHh4eHh4eHh4Iiwibm9uY2UiOnsibm9uY2UiOiI2YThlZWExOS1lN2MyLTQzZmQtYjhlNC1lMmVmZWY5ZDcyZTMifX19.f7llt53oVASZ3Lw16VR17ANn74WubUtfgRWtn5Kcl8A
//     Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7ImFjY2Vzc19rZXkiOiJ4eHh4eHh4eHh4eHh4eHh4Iiwibm9uY2UiOnsibm9uY2UiOiI2YThlZWExOS1lN2MyLTQzZmQtYjhlNC1lMmVmZWY5ZDcyZTMifX19.f7llt53oVASZ3Lw16VR17ANn74WubUtfgRWtn5Kcl8A




