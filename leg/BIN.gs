// 26 feb
//  var binapipara = "&recvWindow=60000";


var BINbaseUrl     ='https://api.binance.com/api/';
var BINapiVersion  ='v3/';

// *** Binance Nonce, compatible with Cointrexer
function BINnonce(){ return(new Date()*1); }

/**
 * Binance (BIN) functions - All Binance related functions
 *
*/

// https://api.binance.com/api/v1/ticker/price?symbol=LUNA_USDT
function BIN_Ticker_test(){
Logger.log(BIN_Ticker("LUNAUSDT"));
}
function BIN_Ticker(ticker){
  var array = BIN_GetMarkets();
  
  if (array != null) 
    for (r in array)  
      if (array[r][0]== ticker) {
        Logger.log(array[r][0]+"  "+array[r][2])
        return([[ array[r][2], array[r][2], array[r][2]]]);;
      }
        return([[ 0, 0, 0]]);;
  
}


 
function BIN_GetMarkets(){
  function wrap(t){return new EnhancedCache(t)}function EnhancedCache(t){var r=t;function u(t,n){if(null!==t){var e=typeof t;if(e!==n)throw new Error(Utilities.formatString("Value type mismatch. Expected: %s, Actual: %s",n,e))}}function o(t){if("string"!=typeof t)throw new Error("Key must be a string value")}function l(t,n,e,r){o(t);var i={value:n,type:e,ttl:r,time:(new Date).getTime()};!function(t,n){var e=n.value;if(null!==e&&"string"==typeof e&&63536<e.length){Logger.log("Splitting string value of length: "+e.length);var r=[];do{var i="$$$"+t+r.length,u=e.substring(0,63536);e=e.substring(63536),r.push(i),a(i,u,n.ttl)}while(0<e.length);n.value=void 0,n.keys=r}}(t,i),a(t,JSON.stringify(i),r)}function a(t,n,e){e?r.put(t,n,e):r.put(t,n)}function s(t){return r.get(t)}function i(t){return r.remove(t)}function f(t){o(t);var n=s(t);return null===n?null:JSON.parse(n)}function c(t,n){var e=f(t);if(null===e)return null;if(n!==e.type)throw new Error(Utilities.formatString("Value type mismatch. Expected: %s, Actual: %s",n,e.type));return function(t){if(t.keys){for(var n="",e=0;e<t.keys.length;e++){var r=t.keys[e],i=s(r);n+=i}t.value=n,t.keys=void 0}}(e),e.value}this.put=function(t,n,e){this.putString(t,n,e)},this.get=function(t){return this.getString(t)},this.remove=function(t){var n=f(t);if(n.keys)for(var e=0;e<n.keys.length;e++){i(n.keys[e])}i(t)},this.putString=function(t,n,e){var r="string";u(n,r),l(t,n,r,e)},this.getString=function(t){return c(t,"string")},this.putNumber=function(t,n,e){var r="number";u(n,r),l(t,n,r,e)},this.getNumber=function(t){return c(t,"number")},this.putBoolean=function(t,n,e){var r="boolean";u(n,r),l(t,n,r,e)},this.getBoolean=function(t){return c(t,"boolean")},this.putObject=function(t,n,e,r){r=r||JSON.stringify;var i="object";u(n,i),l(t,null===n?null:r(n),i,e)},this.getObject=function(t,n){n=n||JSON.parse;var e=c(t,"object");return null===e?null:n(e)},this.getLastUpdated=function(t){var n=f(t);return null===n?null:new Date(n.time)}}

  var cache     = wrap(CacheService.getScriptCache())
  //var cache = CacheService.getScriptCache();
  var cached = cache.getObject("binmarkets");
  if (cached != null) {
    Logger.log("cached");
    return cached;
  }
  
  var array      = [];
  Logger.log("fetch");
  try {
    var dataAll    = JSON.parse(UrlFetchApp.fetch("https://api.binance.com/api/v3/ticker/price" ).getContentText());  
	} catch (e) {return null;}
  
  if (dataAll == null) return(null);
  for (r in dataAll) { array.push([dataAll[r]['symbol'],dataAll[r]['symbol'],dataAll[r]['price'],"","","",""]); }
  cache.putObject("binmarkets", array, 120); // seconds
  return (array);
}



function BIN_GetBalances(){ 
  
  var stn = {
   'id'         : 'BIN',
   'name'       : 'Binance',
   'apikey'     : EXKEY,
   'secret'     : EXSECRET,
   'command'    : 'account',
   'apiversion' : '/v3/',
   'method'     : 'GET',
   'uri'        : 'https://api.binance.com/api',
   'payload'    : ''
  };
  
  EXCHANGE = 'BIN';
  
  Logger.log("BIN_GetBalances => Making connection with Binance API");

  try {
  if (ADATTRIB != ''){
    if (ADATTRIB.indexOf('future') >= 0)  { stn.command = 'fapi/v2/account'; stn.uri = 'https://fapi.binance.com/'; Logger.log("BIN_GetBalances (future) => Switch to "+ stn.command );  }  
	if (ADATTRIB.indexOf('futures') >= 0) { stn.command = 'fapi/v2/account'; stn.uri = 'https://fapi.binance.com/'; Logger.log("BIN_GetBalances (future) => Switch to "+ stn.command );  }  
	
    if (ADATTRIB.indexOf('futures usdt account') >= 0) { stn.command = 'fapi/v2/account'; stn.uri = 'https://fapi.binance.com/'; Logger.log("BIN_GetBalances (future) => Switch to "+ stn.command );  }  
    if (ADATTRIB.indexOf('futures usdt balance') >= 0) { stn.command = 'fapi/v2/balance'; stn.uri = 'https://fapi.binance.com/'; Logger.log("BIN_GetBalances (future) => Switch to "+ stn.command );  }  
    
    if (ADATTRIB.indexOf('futures coin account') >= 0) { stn.command = 'dapi/v1/account'; stn.uri = 'https://fapi.binance.com/'; Logger.log("BIN_GetBalances (future) => Switch to "+ stn.command );  }  
    if (ADATTRIB.indexOf('futures coin balance') >= 0) { stn.command = 'dapi/v1/balance'; stn.uri = 'https://fapi.binance.com/'; Logger.log("BIN_GetBalances (future) => Switch to "+ stn.command );  }  
    
    if (ADATTRIB.indexOf('vanilla account') >= 0)      { stn.command = 'vapi/v1/account'; stn.uri = 'https://vapi.binance.com/'; Logger.log("BIN_GetBalances (vanilla) => Switch to "+ stn.command );  }  
    
    
    if (ADATTRIB.indexOf('margin') >= 0) { stn.command = 'sapi/v1/margin/account';  Logger.log("BIN_GetBalances (margin) => Switch to "+ stn.command ); }   
	if (ADATTRIB.indexOf('margin isolated') >= 0) { stn.command = 'sapi/v1/margin/isolated/account';  Logger.log("BIN_GetBalances (margin) => Switch to "+ stn.command ); }   //Isolated 
	
	if (ADATTRIB.indexOf('lending') >= 0) {stn.command = 'sapi/v1/lending/union/account'; }
	
	if (ADATTRIB.toLowerCase().indexOf('us') >= 0) { var BINbaseUrl     ='https://api.binance.us/api'; stn.uri='https://api.binance.us/api'; Logger.log("US switch detected - URL is now :"+ stn.uri); }
    if (ADATTRIB.toLowerCase().indexOf('je') >= 0) { var BINbaseUrl     ='https://api.binance.je/api'; stn.uri='https://api.binance.je/api'; Logger.log("JE switch detected - URL is now :"+ stn.uri); }
  }
   if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox("Binance Connector DEBUG Mode:"); Browser.msgBox(JSON.stringify(stn)); }   
  } catch (e) {Logger.log("");}

  var response  = { data: null, status: true, message:   ""  },
      account   = "",
      array     = [];
  
  Logger.log("BIN_GetBalances => Exec BIN_PrivateRequest");
  var response = BIN_PrivateRequest(stn);
  Logger.log(response);
  
  try { response = JSON.parse(UrlFetchApp.fetch(response.uri, response.params ).getContentText());  } catch (e) { Logger.log(e + "   " + response);}
  
  try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("RAW API OUTPUT\\n\\n"+JSON.stringify(response)); }   } catch(e) {Logger.log("");}

  
  switch(stn.command) {
  // ** Future Account USDT
  // ** https://binance-docs.github.io/apidocs/futures/en/#futures-account-balance-v2-user_data
  case 'fapi/v2/account':
    // try {r = response.assets[0]['asset']} catch(e) { Logger.log("Warn: Future - empty response from :"+stn.command); return(false); }
    for (r in response.assets) {  
      // if(Number(response.assets[r]['Walletbalance']) * 10000 > 0){  // no NEGATIVE NUMBERS !!!
        array.push({
          curcodeEX: response.assets[r]['asset'], 
          balance: Number(response.assets[r]['walletBalance'])
        });   
     // }
    }
    break;
  case 'fapi/v2/balance':
    for (r in response) {  
        array.push({
          curcodeEX: response[r]['asset'], 
          balance: Number(response[r]['crossWalletBalance'])
        });   
     // }
    }
    break;
    
  // ** Future Account COIN
  // ** https://binance-docs.github.io/apidocs/futures/en/#futures-account-balance-v2-user_data
  case 'dapi/v1/account':
    // try {r = response.assets[0]['asset']} catch(e) { Logger.log("Warn: Future - empty response from :"+stn.command); return(false); }
    for (r in response.assets) {  
      // if(Number(response.assets[r]['Walletbalance']) * 10000 > 0){  // no NEGATIVE NUMBERS !!!
        array.push({
          curcodeEX: response.assets[r]['asset'], 
          balance: Number(response.assets[r]['walletBalance'])
        });   
     // }
    }
    break;
  case 'dapi/v1/balance':
    for (r in response) {  
        array.push({
          curcodeEX: response[r]['asset'], 
          balance: Number(response[r]['crossWalletBalance'])
        });   
     // }
    }
    break;
  case 'vapi/v1/account': //vanilla
    for (r in response.data) {  
        array.push({
          curcodeEX: response.data[r]['currency'], 
          balance: Number(response.data[r]['equity'])
        });   
     // }
    }
    break;
      

	
  // ** Margin Account 
  // ** https://binance-docs.github.io/apidocs/spot/en/#get-force-liquidation-record-user_data
  case 'sapi/v1/margin/account':
    // try { Logger.log(response.userAssets[0]['asset']); } catch(e) { Logger.log("Warn: Margin - empty response from :"+stn.command); return(false); }
    for (r in response.userAssets) {  
	    if (Math.abs(Number(response.userAssets[r]['netAsset']) * 10000) >0){
          array.push({
            curcodeEX: response.userAssets[r]['asset'], 
	        balance: Number(response.userAssets[r]['netAsset'])
          });   
        }
    }
    break;
  
  // ** Margin Account Isolated
  // ** https://binance-docs.github.io/apidocs/spot/en/#get-isolated-margin-transfer-history-user_data
  case 'sapi/v1/margin/isolated/account':
      try { Logger.log(response.assets[0].baseAsset.asset); } catch(e) { Logger.log("Warn: Margin Isolated baseAsset - empty response from :"+stn.command); return false; }
        for (r in response.assets) {  
          Logger.log("quoteAsset  :"+response.assets[r].quoteAsset.asset);
          Logger.log("baseAsset  :"+response.assets[r].baseAsset.asset);

          if (Math.abs(Number(response.assets[r].baseAsset.netAsset) * 10000) >0){
            array.push({
              curcodeEX: response.assets[r].baseAsset.asset, 
	          balance: Number(response.assets[r].baseAsset.netAsset)
            });   
           }  // math
          
           if (Math.abs(Number(response.assets[r].quoteAsset.netAsset) * 10000) >0){
            array.push({
              curcodeEX: response.assets[r].quoteAsset.asset, 
	          balance: Number(response.assets[r].quoteAsset.netAsset)
            });   
          }  // math
        } // for loop
    break;
  
  case 'sapi/v1/lending/union/account':  // ** Lending Account  EARN??
	Browser.msgBox("Not sure what data to pick from this\\n\\n"+JSON.stringify(response));
    for (r in response.assets) {  
      if (Math.abs(Number(response.assets[r].baseAsset.netAsset) * 10000) >0){
        array.push({curcodeEX: response.assets[r].baseAsset.asset,balance: Number(response.assets[r].baseAsset.netAsset)});   
      } 
      if (Math.abs(Number(response.assets[r].quoteAsset.netAsset) * 10000) >0){
         array.push({curcodeEX: response.assets[r].quoteAsset.asset,balance: Number(response.assets[r].quoteAsset.netAsset)});   
      } 
    } 
    break;
	
  default:
    // ** Spot
    try {r = response.balances[0]} catch(e) { Logger.log("Warn: Spot - empty response:"); return(false); }
    for (r in response.balances) {  
      var total = Number(response.balances[r]['free'])+Number(response.balances[r]['locked']);
      if(total * 10000 > 0){
        array.push({
          curcodeEX: response.balances[r]['asset'], 
          balance: total
        });   
      }
    }
  } // ** end switchj
  
  try { if (ADATTRIB.indexOf('debug') >= 0) { Browser.msgBox("To Sheet\\n\\n"+JSON.stringify(array)); }   } catch(e) {Logger.log("");}
  DebugLog("Binance GetBalance", array); 
  return(array);
}


function BIN_Getorderhistory(settings) { 
  var array   = [];
  //var dataAll = Fetch(BINbaseUrl+"v1/ticker/allPrices");
  //if (dataAll == null) return(null);
  var symbol  = [];

  Logger.log("@@@");
  Logger.log(settings);
  
  if (settings.symbols == null) {symbol=MRKDATA;} else {
    for (r in settings.symbols) { 
      symbol.push([settings.symbols[r]+"BTC"]); 
      symbol.push([settings.symbols[r]+"ETH"]);  
      symbol.push([settings.symbols[r]+"BNB"]);  
      symbol.push([settings.symbols[r]+"PAX"]);  
      symbol.push([settings.symbols[r]+"ABC"]);  
      symbol.push([settings.symbols[r]+"USD"]);  
      symbol.push([settings.symbols[r]+"USDC"]);  
      symbol.push([settings.symbols[r]+"USDT"]);  
    } 
  }
  var result = null;
  for (var x in symbol) {
      var validpair  = false;
      // ** Validate if currency pair is valid
      for (var r=0;r<MRKDATA.length;r++) { if (symbol[x] == MRKDATA[r][1]) {validpair=true; break;} }
      
      if (validpair == true) { 
        if (DEBUG == "ON") { ToastMessage(symbol[x], "fetching orders for pair ..");    }
        result = BIN_Auth("myTrades","&symbol="+symbol[x]);  
           
      if (result == null  ) { return (null); }
      //Browser.msgBox(result);

      for (r in result) {    
        if (result[r]!=null && result[r]!="" ) {
          symbol[x] = symbol[x].toString();
          if (symbol[x].slice(-3) == "SDT") {var _mrkt = symbol[x].slice(-4); var _cur = symbol[x].substring(0, symbol[x].length-4); } else {var _mrkt = symbol[x].slice(-3);var  _cur = symbol[x].substring(0, symbol[x].length-3); }
          if(result[r]['isBuyer'].toString()=="true") {var _type = "Buy";} else {  var _type = "Sell"; }
          //if (filter == symbol[x] || filter == "" ) { 
          {
     //     if (DEBUG == "ON") { DebugLog(symbol[x], result);  }
            array.push({
              date:      new Date(result[r]['time']),
              type:      _type, 
              ncur:      _cur,
              nmarket:   _mrkt, 
              quantity:  Number(result[r]['qty']), 
              unitprice: Number(result[r]['price']),
              fee:       result[r]['commission'], 
              nfeecur:   result[r]['commissionAsset'],
              ordernr:   result[r]['orderId']
            });
          }
         }
       }
     }
  }
  DebugLog("BIN_Getorderhistory", array);
  //sorts by the 2nd element in a row
  Logger.log(array);
  array.sort(function(a, b){ return b[0] - a[0]; });
  return(array); 
}


function BIN_Getdeposithistory() { 
  var binapipara = "&recvWindow=60000";
//  var binapipara = "";
  var options = {
    method: 'get',
    headers: {
            'X-MBX-APIKEY':EXKEY
             }
  };   
  // Binance WAPI uses a slightly different authentication
  var timestamp = binapipara.substr(1)+'&timestamp='+BINnonce();
  var signature = BIN_Signature (EXSECRET,timestamp); 
  if (signature == null) {return(1);}
  var parameter = "https://api.binance.com/wapi/v3/depositHistory.html?"+timestamp+"&signature="+signature;   
  var array = Fetch(parameter, options);
  
  // ** Make sure we have correct data from Binance, a bit dirty but we don't want any errors
  if (array == null) {return(null);}
  try { Logger.log("verify: "+array.depositList[0]['asset'])} catch (e) { DebugLog("BIN_Getdeposithistory", "Empty or error"); return(null); }
  //if(array.depositList == undefined ) { DebugLog("BIN_Getdeposithistory", "Empty"); return(null); } else {DebugLog("BIN_Getdeposithistory", array);}
  //if(array.depositList[0]['asset'] == undefined ) { DebugLog("BIN_Getdeposithistory", "Empty"); return(null); } else {DebugLog("BIN_Getdeposithistory", array);}
  DebugLog("BIN_Getdeposithistory", array);
  
  var rows = [];
  for (r in array.depositList) {    
    if (array.depositList[r]['amount']!=0){ 
    rows.push([
    new Date(array.depositList[r]['insertTime']), 
      array.depositList[r]['asset'], 
      array.depositList[r]['amount'], 
      ToFiat(array.depositList[r]['asset'], 
      array.depositList[r]['amount']), 
      array.depositList[r]['txId'] ,
      array.depositList[r]['address']]);}  
  }
  return(rows);  
}

            
function BIN_Getwithdrawhistory() { 
  var binapipara = "&recvWindow=60000";
//  var binapipara = "";
  var options = {
    method: 'get',
    headers: {
            'X-MBX-APIKEY':EXKEY
             }
  };   
  // Binance WAPI uses a slightly different authentication
  var timestamp = binapipara.substr(1)+'&timestamp='+BINnonce();
  var signature = BIN_Signature (EXSECRET,timestamp); 
  var parameter = "https://api.binance.com/wapi/v3/withdrawHistory.html?"+timestamp+"&signature="+signature; 
  var array = Fetch(parameter, options);
  //DebugLog("BIN_Getwithdrawalhistory", array);
  
  // ** Make sure we have correct data from Binance, a bit dirty but we don't want any errors
  if (array == null) {return(null);}
  try { Logger.log("verify: "+array.withdrawList[0]['asset'])} catch (e) { DebugLog("BIN_Getwithdrawalhistory", "Empty or error"); return(null); }
  //if(array.withdrawList == undefined ) { DebugLog("BIN_Getwithdrawalhistory", "Empty"); return(null); } else {DebugLog("BIN_Getwithdrawalhistory", array);}
  //if(array.withdrawList[0]['asset'] == undefined ) { DebugLog("BIN_Getwithdrawalhistory", "Empty"); return(null); } else {DebugLog("BIN_Getwithdrawalhistory", array);}
  
  DebugLog("BIN_Getwithdrawalhistory", array);

  var rows = [];
  for (r in array.withdrawList) {    
    if (array.withdrawList[r]['amount']!=0){ 
    rows.push([
    new Date(array.withdrawList[r]['successTime']), 
      array.withdrawList[r]['asset'], 
      array.withdrawList[r]['amount'], 
      ToFiat(array.withdrawList[r]['asset'], 
      array.withdrawList[r]['amount']), 
      array.withdrawList[r]['txId'] ,
      array.withdrawList[r]['address']]);}  
  }
  return(rows);  
}



function BIN_Import(settings) { 
  var array   = [];
  var dataAll = GetCSVSheet(settings); 
  DebugLog("BIN_GetBalances", dataAll);
  var c       = 0;
  if (dataAll==null) {return(null);}
  if (dataAll[1]['Fee Coin'] == null ) {Browser.msgBox("Error: Is this a Binance file? Can not find [Fee Coin]"); return(null);}
  if (dataAll[1]['Date'] == null ) {Browser.msgBox("Error: If this a real [binance.csv] make sure cell A1 has the label 'Date'"); return(null);}
  for (r in dataAll) {   
    if (dataAll[r]['Market'].substr(dataAll[r]['Market'].length -4) == "USDT" ) {c = 4; /*Logger.log("OK, hij is 4"); */} else {c = 3;}
    array.push({
      date:      new Date(dataAll[r]['Date'].split('-').join('/')),
      type:      CapFirstLetter(dataAll[r]['Type']),
      ncur:      dataAll[r]['Market'].substr(0, dataAll[r]['Market'].length -c),
      nmarket:   dataAll[r]['Market'].substr(dataAll[r]['Market'].length -c),
      quantity:  dataAll[r]['Amount'],
      unitprice: dataAll[r]['Price'],
      fee:       dataAll[r]['Fee'],
      nfeecur:   dataAll[r]['Fee Coin'],  
      ordernr:   ""
    });
  }
  return(array);
}




function BIN_Signature (EXSECRET, parameter) {
    function BIN_stringSignature(signature) {
      var BIN_stringSignature = "";
      for (i = 0; i < signature.length; i++) {
        var byte = signature[i];
        if (byte < 0)
         byte += 256;
         var byteStr = byte.toString(16);
        if (byteStr.length == 1) byteStr = '0'+byteStr;
        BIN_stringSignature += byteStr;
      }
      return BIN_stringSignature.toString();
    }

    try {var sha256obj = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, parameter, EXSECRET);}
    catch (e) {  DebugLog("BIN_Signature", e); return(null); }
    return(BIN_stringSignature(sha256obj));
  }



function BIN_Auth(command,payload){
   var binapipara = "&recvWindow=60000";
//  var binapipara = "";
  var nonce     = BINnonce();
  var postdata  = "timestamp=" + nonce + payload + binapipara;
 // var postdata  = "timestamp=" + nonce + payload;
  var signature = BIN_Signature (EXSECRET,postdata); 
  var url = BINbaseUrl+BINapiVersion + command;
  var options    = {
    method: 'get',
    headers: {
      'X-MBX-APIKEY': EXKEY,
    }    
  }
  postdata       = postdata+"&signature="+signature;
  try {var dataAll = BINPrivFetch(url+"?"+postdata, options);}
  catch (e) { DebugLog("BIN_Auth Failed: ", e); return(null);}
  return(dataAll);
}


// ** Generic Fetch with error handling
function BINPrivFetch(uri,params){
  if (params!=null){ 
    try {var response = UrlFetchApp.fetch(uri, params);}
    catch(e) {
      if (VERBOSE == "NO" ) { 
        Browser.msgBox("Binance API error:\\n\\n"+e); DebugLog("BINFetch "+uri+params, e); } return(null); 
      }
  } else {
      try {var response = UrlFetchApp.fetch(uri);}
      catch(e) {
        if (VERBOSE == "NO" ) { Browser.msgBox(e); DebugLog("BINFetch "+uri+params, e);} return(null); }
    }
 return(JSON.parse(response.getContentText()));
}



// **  NEW REX


function BIN_PrivateRequest(stn){   
  function HMACSHA256HEX(s, secret) { return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString(); }
  function ToHex(s) { return s.map(function(byte) { return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('');  }
  
  // *** WAPI FAPI or SAPI in command
  if (stn.command.toLowerCase().indexOf('api/' ) !== -1) {
  Logger.log("-------- wapi/sapi or other api string in command detected ----------");
  try { stn.payload =CreateURIQueryString(stn.payload,"&");   } catch (e) {stn.payload=""; Logger.log("Bin_Priv: Err 1");}
  try { if (stn.payload[0] === "?")  stn.payload = stn.payload.replace('?', '&'); } catch(e)  { Logger.log("Bin_Priv: Err 2");}
  
  var binapipara = "",
      nonce = new Date()*1,
      postdata = 'timestamp='+nonce + stn.payload,
      signature  = HMACSHA256HEX(postdata,stn.secret),
      
      params = {
        'method'            : stn.method,
        'muteHttpExceptions': true,
        'headers': {
            'Content-Type'      : 'application/x-www-form-urlencoded',
            'X-MBX-APIKEY'      : stn.apikey,
         },
      };
  //if (ADATTRIB.indexOf('future') >= 0)  
  try { 
    var u='https://api.binance.com/';
    if (stn.command.indexOf("fapi") >= 0)  u='https://fapi.binance.com/';
    if (stn.command.indexOf("dapi") >= 0)  u='https://dapi.binance.com/';
  } catch(e)  { Logger.log("Bin_Priv: check FAPI / DAPI");}
  Logger.log('=> Created the following url:');
  Logger.log(u+stn.command+"?"+postdata+"&signature="+signature);
  Logger.log('-----------------------------');
  return  { uri: u+stn.command+"?"+postdata+"&signature="+signature , params: params};
  } 
  
 try { stn.payload =CreateURIQueryString(stn.payload,"&");   } catch (e) {stn.payload=""; Logger.log("Bin_Priv: Err 1");}
 try { if (stn.payload[0] === "?")  stn.payload = stn.payload.replace('?', '&'); } catch(e)  { Logger.log("Bin_Priv: Err 2");}
 //Logger.log("*"+stn.payload+"* "+stn.payload.length);
 
  var postdata   = "timestamp="+ new Date()*1 + stn.payload + "",
      signature  = HMACSHA256HEX(postdata,stn.secret),
      params     = {
        'method'            : stn.method,
        'muteHttpExceptions': true,
        'headers': {
          'Content-Type'    : 'application/x-www-form-urlencoded',
          'X-MBX-APIKEY'    : stn.apikey,
        },    
      };
  postdata = postdata+"&signature="+signature;  
  return  { uri: stn.uri+stn.apiversion+stn.command+"?"+postdata, params: params};
}


function BIN_PublicRequest(stn){  
 if (stn.hasOwnProperty('payload')  === true) stn.payload  = CreateURIQueryString(stn.payload,"?");
      params     = {
        'method'            : stn.method,
        'muteHttpExceptions': true,
        'headers': {
          'User-Agent': 'Mozilla/4.0 (compatible; Node Binance API)',
          'Content-Type'    : 'application/x-www-form-urlencoded',
          'X-MBX-APIKEY'    : HashExkey(stn.apikey,"decode"),
        }
      }
   return  { uri: stn.uri+stn.apiversion+stn.command+stn.payload, params: params};
}


