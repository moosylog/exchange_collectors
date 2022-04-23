// Luno


function LUN_GetBalances(arg) { 
 
  var array    = [],
      response = "";
      r        = "";
      total    = 0;
  
  if (ADATTRIB === 'demo')  
  { response =
  {
  "balance": [
    {
      "account_id": "1224342323",
      "asset": "XBT",
      "balance": "1.012423",
      "reserved": "0.01",
      "unconfirmed": "0.421",
      "name": "XBT Account"
    },
    {
      "account_id": "2997473",
      "asset": "ZAR",
      "balance": "1000.00",
      "reserved": "0.00",
      "unconfirmed": "0.00",
      "name": "ZAR Account"
    }
  ]
}
 
 } else { response = LUN_auth('balance', EXKEY, EXSECRET); }




 try {r = response['balance']} catch(e) { Logger.log(response); return(false); }
 

 for ( r in response['balance'] ) {   
    if (response['balance'][r]['asset'] === 'XBT') response['balance'][r]['asset'] = 'BTC';
    if (Number(response['balance'][r]) != 0) array.push({ curcodeEX: response['balance'][r]['asset'] ,  balance: Number(response['balance'][r]['balance']) });   
 }
  Logger.log("ttps://api.mybitx.com/api/1/balance");
  Logger.log(array);
  return(array);
}



/*
https://bit2c.co.il/home/api?language=en-US#generate keyparam1=val1&param2=val2
*/
function LUN_auth(command, key, secret) {   
  var params = {headers: {Authorization: "Basic " + Utilities.base64Encode(key + ":" + secret)}};
  /*
  Logger.log("----------");
  Logger.log(JSON.parse(UrlFetchApp.fetch("https://api.mybitx.com/api/1/balance", params ).getContentText()));
  Logger.log("----------");
  */
  return(JSON.parse(UrlFetchApp.fetch("https://api.mybitx.com/api/1/balance", params ).getContentText()));
      
}

