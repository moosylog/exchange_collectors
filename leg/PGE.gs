// BitPANDA Global
// https://developers.bitpanda.com/docs/web-api/#/wallets-get



function PGE_GetBalances(arg) { 
  
  
  var array    = [],
      response = "";
      r        = "";
      total    = 0;
  
  
   params = {
    'method'   : 'get',
    'timeout'  :  30000,
    'headers'  : {  
      'Authorization' : "Bearer "+EXKEY, 
      
    },
  };
 
 if (ADATTRIB != 'demo') {
   try {
    Logger.log("no demo");
    response = JSON.parse(UrlFetchApp.fetch("https://api.exchange.bitpanda.com/public/v1/account/balances", params ).getContentText()); 
    } catch (e) { Logger.log(e); return(false); }
  }
  else {
   
  response = {
  "account_id": "e4eaaaf2-d142-11e1-b3e4-080027620cdd",
  "balances": [
    {
      "account_id": "e4eaaaf2-d142-11e1-b3e4-080027620cdd",
      "currency_code": "BTC",
      "chhange": "0.50000000",
      "available": "5.0",
      "locked": "1.1234567",
      "sequence": 5,
      "time": "2019-04-01T13:39:17.155Z"
    },
    {
      "account_id": "e4eaaaf2-d142-11e1-b3e4-080027620cdd",
      "currency_code": "ETH",
      "change": "0.50000000",
      "available": "10.0",
      "locked": "1.1234567",
      "sequence": 5,
      "time": "2019-04-01T13:39:17.155Z"
    }
  ]
  }
  
  }
  
  
  
  try {r = response.balances} catch(e) { Logger.log(response.balances); return(false); }
  try {r = response.balances[0].currency_code} catch(e) { Logger.log(response.balances); return(false); }
  
  for (r in response.balances) {
    Logger.log(response.balances[r].currency_code);
    
    response.balances[r].available = Number(response.balances[r].available) + Number(response.balances[r].locked);
    if (response.balances[r].available > null)
      array.push({ curcodeEX: response.balances[r].currency_code,  balance: response.balances[r].available });
   }  
   
  Logger.log(array); 
  return array;
}

