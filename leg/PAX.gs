// https://www.gopax.com/API/



function PAX_GetBalances(arg) { 
 
  var array    = [],
      response = "",
      r        = "",
      uri      = 'https://api.gopax.co.kr';
  
  if (ADATTRIB.toLowerCase().indexOf('com') >= 0) uri = 'https://api.gopax.com';
  if (ADATTRIB.toLowerCase().indexOf('demo') >= 0) { 
    response =
    [
      {
        asset: 'DAI',
        avail: 10000000000,
        hold: 5000000,
        pendingWithdrawal: 5000000
      },
      {
        asset: 'KRW',
        avail: 0.64681514,
        hold: 5000000,
        pendingWithdrawal: 5000000
      },
      {
        asset: 'ETH',
        avail: 1.1,
        hold: 0000000,
        pendingWithdrawal: 0000000
      }
    ]
 
 } else { 
   response = PAX_auth('/balances',EXKEY, EXSECRET, uri);
    }
 if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox("Gopax Connector DEBUG Mode:"); Browser.msgBox("Received (Raw balance)\\n\\n"+JSON.stringify(response)); }    
 DebugLog("Raw output:", response);

  
 try {r = response['avail']} catch(e) { Logger.log(response); return(false); }
  for ( r in response ) {   
    if (Number(response[r]['avail']) != 0) array.push({ curcodeEX: response[r]['asset'] ,  balance: Number(response[r]['avail']  ) +  Number(response[r]['hold']) });   
 }
  DebugLog("To Sheet", JSON.stringify(array));
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  Browser.msgBox("Pushed to sheet:\\n\\n"+JSON.stringify(array));     
  return(array);
}
  

function PAX_auth(requestPath, apikey, secret, baseUrl) {
    function HMACSHA512B64enc(s, secret) { return (Utilities.base64Encode(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512,Utilities.base64Decode(Utilities.base64Encode(s)),Utilities.base64Decode(secret )))); }
    
    requestPath = requestPath || '/balances';
    
    var nonce      = new Date().getTime().toFixed(),
        params     = {},
        requestUrl = baseUrl + requestPath,
        message    = nonce + 'GET' + requestPath,
        headers = {
          'API-KEY'  : apikey,
          'Signature':  HMACSHA512B64enc(message, secret)  ,
          'Nonce'    : nonce,  },
        options = {
          'method'             : 'GET',
          'muteHttpExceptions' : true,
          'headers'            : headers,
          'contentType'        : 'application/json'
        },
        response = UrlFetchApp.fetch(requestUrl, options);
    
    if (response.getResponseCode() == 200) {
      return( JSON.parse(response.getContentText()) );
        } else Logger.log( JSON.parse(response.getContentText()) );
}



