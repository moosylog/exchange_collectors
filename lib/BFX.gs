var BFXapiVersion ='/v1/';
var BFXbaseUrl    ='https://api.bitfinex.com';

// *** Bitfinex Nonce, compatible with Cointrexer
function BFXnonce(){ return(new Date().getTime().toString()); }


/**
 * Bitfinex (BFX) functions - All Bitfinex related functions
 *
*/
function BFX_Ticker(ticker){
  var array = [];
  var dataAll = LoadTick3(BFXbaseUrl+BFXapiVersion+"pubticker/"+ticker,"BFX"+ticker);
  if (dataAll == null) return(null);
  return([[dataAll['bid'], dataAll['ask'], dataAll['last_price']]]);
}


function BFX_GetMarkets(){
  var dataAll = Fetch(BFXbaseUrl+BFXapiVersion+"symbols");
  if (dataAll == null) return(null);
  var array = [];
  for (r in dataAll) {
    array.push([dataAll[r].toUpperCase()]); 
  }
  return(array); 
}


function BFX_GetMarketSummary(pairone,pairtwo,update) {
  var action = "pubticker"
  var options = {
    "muteHttpExceptions" : true
  };
  var response = Fetch(BFXbaseUrl + BFXapiVersion + action + "/" + pairone + pairtwo, options);
  if (response == null) return(null);
  if (isNaN(parseFloat(response.last_price))) {return null}
  if (!isNaN(parseFloat(response.last_price))) {return parseFloat(response.last_price).toFixed(8);}
};


function BFX_GetBalances(currency,callback){
  function sortByCol(arr, colIndex){
    arr.sort(sortFunction)
    function sortFunction(a, b) {
        a = a[colIndex]
        b = b[colIndex]
        return (a === b) ? 0 : (a < b) ? -1 : 1 }
  }
  function SortandSum(source){
    sortByCol(source,0);
    var last;
    var folded = source.reduce(function(prev,curr){
    if (last) {
        if (last[0] === curr[0] ) {
            last[1] += curr[1];
            return prev;
        }
    }
    last = curr;
    prev.push(curr);
    return prev;
    },[]);
    return(folded);
  }
  var payload = {};
  payload.action = "balances";
  var response = BFX_Auth(payload)
  DebugLog("BFX_GetBalances", response);
  //Logger.log("response"+response);
  if (response == null) {return(null);}
  if (response[0]['currency'] == undefined) {DebugLog("BFX_GetBalances", "zero response"); return(null);}
  var array = [];
  for (var r in response) {
    array.push([response[r]['currency'].toUpperCase(), Number(response[r]['amount'])]);
  } 
  var response = SortandSum(array);
  var array = [];
  Logger.log("response"+response);
  for (var r in response) {
    array.push({
      curcodeEX: response[r][0], 
      balance: Number(response[r][1])
    });
  }
  Logger.log("array"+array);
  return(array);
}
    
/*
function BFX_MarginInfos(currency,callback){
  var payload = {};
  payload.action = "margin_infos";
  var response = BFX_Auth(payload)
  DebugLog("BFX_MarginInfos", response);
  try {Logger.log(response[0]['currency']);}
  catch (e) { Logger.log("BFX_MarginInfos -> zero response"); return(null); }
  if (response == null) {return(null);}
  var array = [];
  for (var r in response) {
    array.push([
      response[r]['margin_balance'], 
      response[r]['unrealized_pl'],
      response[r]['unrealized_swap'],
      response[r]['net_value'],
      response[r]['required_margin'],
      response[r]['unrealized_pl'],
      )]);
  } 
  var response = SortandSum(array);
  var array = [];
  for (var r in response) {
    array.push({
      curcodeEX: response[r][0], 
      balance: Number(response[r][1])
    });
  }
  return(array);
}
*/


function BFX_Getorderhistory(currency,callback){
  function convertToDate(julian) {
    var DAY = 86400000;
    var UNIX_EPOCH_JULIAN_DATE = 2440587.5;
    return new Date((Number(julian) - UNIX_EPOCH_JULIAN_DATE) * DAY);
  }
  var payload = {};
  var array   = [];
  payload.action = "orders/hist";
  var dataAll = BFX_Auth(payload);
  if (dataAll==null || dataAll=="") return(null);
  DebugLog("BFX_Getorderhistory", dataAll);
  try {Logger.log(dataAll[0]['symbol']);}
  catch (e)
  {
    if (VERBOSE == "NO" ) { Browser.msgBox("Bitfinex API did not give us any data.\\n\\nThere is a max. of 1 request per minute\\n\\nSee the documentation for more details." );}  
    return(null);
  }
  for (r in dataAll) {
      array.push({
      date:      new Date(dataAll[r]['timestamp']* 1000), 
      type:      CapFirstLetter(dataAll[r]['side']),
      ncur:      dataAll[r]['symbol'].slice(0,-3).toUpperCase(),
      nmarket:   dataAll[r]['symbol'].slice(-3).toUpperCase(), 
      quantity:  dataAll[r]['executed_amount'],
      unitprice: dataAll[r]['avg_execution_price'],
      fee:       0,
      nfeecur:   "BTC",
      ordernr:   ""
    });
  } 
  return(array);
}


function BFX_Movements(settings, para) { 
  var array   = []; 
  for (a in settings.symbols )
  {  
    var payload = {currency: settings.symbols[a]};
    payload.action = "history/movements";
    var dataAll = BFX_Auth(payload);
    if (dataAll === null) return(0);
    DebugLog("BFX_Get"+para+"history "+settings.symbols[a], dataAll);
    for (r in dataAll) {
      //type=DEPOSIT, status=COMPLETED
      if (dataAll[r]['type'] == para.toUpperCase() && dataAll[r]['status'] == 'COMPLETED') {
      array.push([   
        new Date(dataAll[r]['timestamp']* 1000),
        dataAll[r]['currency'], 
        dataAll[r]['amount'], 
        ToFiat(dataAll[r]['currency'], dataAll[r]['amount']),
        dataAll[r]['txid'], 
        dataAll[r]['address'],
      ]);
      }
    }
  } 
  return (array);
}





function BFX_Getdeposithistory(settings)  {  return(BFX_Movements(settings,"deposit"));   }

function BFX_Getwithdrawhistory(settings) {  return(BFX_Movements(settings,"withdraw")); }


function BFX_Import(settings) { 
  var dataAll   = GetCSVSheet(settings); 
  if (dataAll==null) {return(null);}
  DebugLog("BFX_Import", dataAll);
  var hulp = "";
  if (dataAll[1]['FeeCurrency'] == null ) {Browser.msgBox("Error: Is this a Bitfinex file? Can not find [FeeCurrency]"); return(null);}
  var array     = [];
  for (r in dataAll) { 
    if (dataAll[r]['Amount']<0) {hulp="Sell"; dataAll[r]['Amount'] = Math.abs(dataAll[r]['Amount'])} else {hulp="Buy";}
    array.push({
      date:      dataAll[r]['Date'],
      type:      hulp,
      ncur:      dataAll[r]['Pair'].substring(dataAll[r]['Pair'].indexOf("/"), 0),
      nmarket:   dataAll[r]['Pair'].substring(dataAll[r]['Pair'].indexOf("/")+1, dataAll[r]['Pair'].length), 
      quantity:  dataAll[r]['Amount'],
      unitprice: dataAll[r]['Price'],
      fee:       Math.abs(dataAll[r]['Fee']),
      nfeecur:   dataAll[r]['FeeCurrency'],
      ordernr:   ""
    });
  }
  return(array);
}


function BFX_Auth(payload,callback){
  if(EXKEY !=  '') {
  payload["request"] = BFXapiVersion + payload.action;
  payload["nonce"] = new Date().getTime().toString();
  delete payload["action"];
  var signature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_384, Utilities.base64Encode(JSON.stringify(payload)), EXSECRET);
  var signature = signature.map(function(byte) {return ('0' + (byte & 0xFF).toString(16)).slice(-2);}).join('')
  var headers = {
    "X-BFX-APIKEY": EXKEY,
    "X-BFX-PAYLOAD": Utilities.base64Encode(JSON.stringify(payload)),
    'X-BFX-SIGNATURE': signature
  }
  var options = {
    "muteHttpExceptions" : true,
    "headers": headers,
    "payload": JSON.stringify(payload)
  };
    //return(Fetch(BFXbaseUrl + payload["request"], options));
    try {var dataAll = Fetch(BFXbaseUrl + payload["request"], options);}
    catch (e) { DebugLog("BFX_Auth", e); return(null);}
    return(dataAll);
  }
  
};




// ** new



function BFX_PrivateRequest(bfxrequest){
  if (bfxrequest.payload == "") bfxrequest.payload = {};
  var nonce   =  new Date().getTime().toString(),
      payload = '/api'+bfxrequest.apiversion+bfxrequest.command+nonce+ JSON.stringify(bfxrequest.payload),
      params  = {
          'method'            : bfxrequest.method,
          'muteHttpExceptions': true,
          'contentType'       : 'application/json',
          'headers': {
            'bfx-nonce'       : nonce,
            'bfx-apikey'      : bfxrequest.apikey,
            'bfx-signature'   : HMACSHA384HEX(payload, bfxrequest.secret) ,
           },
         'payload'           : JSON.stringify(bfxrequest.payload)
      };
  return  { uri: bfxrequest.uri + bfxrequest.apiversion + bfxrequest.command, params: params};
}

function BFX_PublicRequest(bfxrequest){
      params  = {
          'method'            : bfxrequest.method,
          'muteHttpExceptions': true,
          'contentType'       : 'application/json'
          }
  return  { uri: bfxrequest.uri + bfxrequest.apiversion + bfxrequest.command+CreateURIQueryString(bfxrequest.payload,"?"), params: params};
}
