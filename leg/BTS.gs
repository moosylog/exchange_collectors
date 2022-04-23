function BTS_GetBalances(arg) { 
  var array = [];
  Logger.log(EXKEY);
  Logger.log(EXSECRET);
  Logger.log(ADATTRIB);
  var data = BTS_Request(EXKEY, EXSECRET, ADATTRIB, "Balances");
  if (data === null || data === "") {DebugLog("Bitstamp", "no response"); return (1);} 
  DebugLog("Bitstamp", data); 
      for (var x in data) {
        substring = "_balance";
        if (x.indexOf(substring) !== -1) {
            var balance = parseFloat(data[x]);
            if (balance > 0) {
                data[x].replace(substring, "")
                var asset = x
                if (asset == "bch" + substring) {
                    asset = "BCH"
                }
                if (asset == "btc" + substring) {
                    asset = "BTC"
                }
                if (asset == "xrp" + substring) {
                    asset = "XRP"
                }
                if (asset == "ltc" + substring) {
                    asset = "LTC"
                }
                if (asset == "usd" + substring) {
                    asset = "USD"
                }
                if (asset == "eth" + substring) {
                    asset = "ETH"
                }
                array.push({curcodeEX: asset, balance: balance});
            }
        }
    }
    DebugLog("Bitstamp", array); 
  if (array==null) {return(1);}
  return(array);
}



function BTS_GetMarkets() { return null; }




function BTS_Request(key, secret, customer_id, requestType) {

  var nonce = new Date().getTime().toString();
  
  message = nonce + customer_id + key;
  
  var shaObj = new jsSHA("SHA-256", "BYTES");
  shaObj.setHMACKey(secret, "BYTES");
  shaObj.update(message);
  var signature = shaObj.getHMAC("HEX").toString().toUpperCase();

  
  if (requestType == "Balances"){
    var url = "https://www.bitstamp.net/api/v2/balance/"
    }
  else if (requestType == "Closed Orders"){
    var url = "https://www.bitstamp.net/api/v2/user_transactions/"
  }
  else if (requestType == "Open Orders"){
    var url = "https://www.bitstamp.net/api/v2/open_orders/all/"    
  }
  
  cb = "key=" + key + "&signature=" + signature + "&nonce=" + nonce;
  
  var formData = {
    "key": key,
    "signature": signature,
    "nonce": nonce
  };
  
  var options = {
    "method": "post",
    "muteHttpExceptions": true,
    "payload": formData
  };

  var response = UrlFetchApp.fetch(url, options);
  Logger.log(response);
  var data = JSON.parse(response.getContentText());
  Logger.log(data);
  return data;
}
