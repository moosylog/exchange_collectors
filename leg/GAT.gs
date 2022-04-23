function GAT_GetBalances(arg) { 

  var array    = [],
      response = "";
      r        = "";
      total    = 0;
  
  if (EXKEY === 'test')  
  { response =
   {
        "result": "true",
        "available": {
            "BTC": "1000",
            "ETH": "968.8",
            "ETC": "0",
            },
        "locked": {
            "ETH": "1"
            }
    }
 } else { response = GAT_auth('/api2/1/private/balances', EXKEY, EXSECRET); }
 Logger.log(response);
 try {r = response.available} catch(e) { Logger.log(response); return(false); }
 
 for (r in response.available) {
    total = Number(response.available[r]);
    if (response.locked[r] != null) { total = total  + Number(response.locked[r]) } 
    array.push({ curcodeEX: r,  balance: total });
   //Logger.log(r+" "+total);
 }
  Logger.log("https://api.gateio.co/api2/1/private/balances:");
  Logger.log(array);
  return(array);
}



/*
https://bit2c.co.il/home/api?language=en-US#generate keyparam1=val1&param2=val2
*/
function GAT_auth(command, key, secret) {
 
 var params = "";
 var sign = Utilities.computeHmacSignature (Utilities.MacAlgorithm.HMAC_SHA_512, params, secret);
 var signature = sign.map ( function ( e ) { return ( "0" + (e & 0xFF ) .toString ( 16 )). slice ( -2 )}). join ( "" );

 Logger.log("-> "+signature);
       
  params = {
    'method'   : 'post',
    'headers'  : {  
      'Content-Type'   : 'application/x-www-form-urlencoded',
      'KEY'    : key,
      'SIGN'   : signature,
    },
  };
  return(JSON.parse(UrlFetchApp.fetch("https://api.gateio.co/api2/1/private/balances", params ).getContentText()));
      
}

