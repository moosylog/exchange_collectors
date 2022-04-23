// BitPANDA
// https://developers.bitpanda.com/docs/web-api/#/wallets-get



function PAN_GetBalances(arg) { 
  
  var array    = [],
      response = "";
      r        = "";
      total    = 0;
  
   params = {
    'method'   : 'get',
    //'timeout'  :  30000,
    'headers'  : {  
      'X-API-KEY'    : EXKEY,    
    },
  };
 
 if (ADATTRIB != 'demo') {
   try {
    response = JSON.parse(UrlFetchApp.fetch("https://api.bitpanda.com/v1/wallets", params ).getContentText()); 
    } catch (e) { Logger.log(e); return(false); }
  }
  else {
   
  response = {
    "data": [
        {
            "type": "wallet",
            "attributes": {
                "cryptocoin_id": "1",
                "cryptocoin_symbol": "BTC",
                "balance": "1.00000000",
                "is_default": true,
                "name": "First wallet",
                "pending_transactions_count": 0,
                "deleted": false
            },
            "id": "3d6f9780-1d62-11e8-b0cd-415b226545f3"
        },
        {
            "type": "wallet",
            "attributes": {
                "cryptocoin_id": "1",
                "cryptocoin_symbol": "ETH",
                "balance": "2.00000000",
                "is_default": false,
                "name": "Second wallet",
                "pending_transactions_count": 0,
                "deleted": true
            },
            "id": "a0e6a9d0-214d-11e8-888b-3bd3418b24c9"
        }
    ]
  }
  
  }
  
  
  
  try {r = response.data} catch(e) { Logger.log(response); return(false); }
  try {r = response.data[0].attributes.cryptocoin_symbol} catch(e) { Logger.log(response); return(false); }
  
  for (r in response.data) {
    //Logger.log(response.data[r].attributes.cryptocoin_symbol);
    //Logger.log(response.data[r].attributes.balance);
    response.data[r].attributes.balance = Number(response.data[r].attributes.balance);
    if (response.data[r].attributes.balance > null)
      array.push({ curcodeEX: response.data[r].attributes.cryptocoin_symbol,  balance: response.data[r].attributes.balance });
   }  
   
  Logger.log(array); 
  return array;
}

