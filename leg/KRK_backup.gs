var KRKbaseUrl    ='https://api.kraken.com';


// *** Kraken Nonce, compatible with Cointrexer
function KRKnonce(){ return(new Date () * 1000); }




// *** Ticker returns the last price
function KRK_Ticker(fullticker){
  
//  var json  = LoadTick3(KRKbaseUrl+"/0/public/Ticker?pair="+fullticker, "KRK"+fullticker);
  var json  = Fetch(KRKbaseUrl+"/0/public/Ticker?pair="+fullticker);

  if (json == null) { 
    Logger.log('Error: '+KRKbaseUrl+"/0/public/Ticker?pair="+fullticker); 
    Logger.log('Check this API url - this coule be end of lifeon my 2020');
    return null; 
  }
  if (json.result != null) { return [[json.result[fullticker].c[0],json.result[fullticker].a[0],json.result[fullticker].c[0]]] }
  return(null);
}



// *** Markets
function KRK_GetMarkets(){
  var array   = [];
  var dataAll = Fetch(KRKbaseUrl+"/0/public/AssetPairs"); 
  for (r in dataAll.result) {
    var code = dataAll.result[r]['base']+dataAll.result[r]['quote'];
    array.push([
      dataAll.result[r]['altname'], 
      code,  
      dataAll.result[r]['altname'].slice(-3), 
      dataAll.result[r]['altname'].slice(0,-3),
      dataAll.result[r]['quote'],
      dataAll.result[r]['base'], 
      CMC_name(dataAll.result[r]['altname'].slice(0,-3))
    ]);
  }
  return (array);
}

function KRK_NormalKRKcode(mcode){
  try {
  for (var r=0;r<MRKDATA.length;r++)
  {
    found=false;
    if (MRKDATA[r][5] == mcode)  { 
      if (MRKDATA[r][3] == "XBT") {return("BTC"); }
      return(MRKDATA[r][3]); var found=true; break; } 
  }  
  if (found=false) { if (MRKDATA[r][4] == mcode)  {  if (MRKDATA[r][2] == "XBT") {return("BTC"); } return(MRKDATA[r][2]); var found=true;   } }   
  if (mcode.slice( 1 ) == "XBT") { return("BTC"); }
  return(mcode.slice( 1 )); } catch (e) { return mcode };
}


// *** Balances
// returns [1.currency_code],[2.quantity]
/*
function KRK_GetBalances () {
  var array   = [];
  var dataAll = KRK_AuthRequest("/0/private/Balance")
  DebugLog("KRK_GetBalances", dataAll);
  //if (dataAll["error"]=="EAPI:Invalid key"){ if (VERBOSE == "NO" ) {Browser.msgBox("KRAKEN API ERROR: \n"+dataAll["error"]);} DebugLog("KRK_GetBalances", dataAll["error"]); return (null); }
  if (dataAll==null) {return (null);}
  for (r in dataAll.result) {
  if(parseFloat(dataAll.result[r]) > 0){
      array.push({
        curcodeEX: KRK_NormalKRKcode(r), 
        balance:dataAll.result[r]
      });
    }
  }
  return(array);
}
*/

// *** Order History
// returns [1.timestamp],[2.sell/buy], [3.currency_code], [4.market_code], [5.quantity],[6.price per unit], [7. fee], [8.fee currency], [9.special (order nr)]
function KRK_Getorderhistory() {
  var array   = [];
  var dataAll = KRK_AuthRequest("/0/private/ClosedOrders")
  DebugLog("KRK_Getorderhistory", dataAll);
  // try { Logger.log(dataAll.result['closed']); }  catch (e)   { return(null);  }
  if (dataAll.result['closed'] == undefined )   { return(null);  }
  for (r in dataAll.result['closed']) {
    if (dataAll.result['closed'][r]['status'] == "closed" ) {
       array.push({
         date:      new Date(dataAll.result['closed'][r]['opentm']* 1000),
         //type:      dataAll.result['closed'][r]['descr']['type'][0].toUpperCase() + dataAll.result['closed'][r]['descr']['type'].substring(1),
         type:      CapFirstLetter(dataAll.result['closed'][r]['descr']['type']),
         ncur:      dataAll.result['closed'][r]['descr']['pair'].slice(0, -3),
         nmarket:   dataAll.result['closed'][r]['descr']['pair'].substr(dataAll.result['closed'][r]['descr']['pair'].length - 3),
         quantity:  dataAll.result['closed'][r]['vol'],
         unitprice: Number(dataAll.result['closed'][r]['price']),
         fee:       dataAll.result['closed'][r]['fee'],
         nfeecur:   dataAll.result['closed'][r]['descr']['pair'].substr(dataAll.result['closed'][r]['descr']['pair'].length - 3),
         ordernr:   ""
       });
     }
  }    
  return(array);  
}
 
 

// *** Deposit History
// returns [1.timestamp],[2.currency_code], [3.quantity],[4.TxId], [5. CryptoAddress]
function KRK_Getdeposithistory() { 
  var array   = [];
  var dataAll = KRK_AuthRequest("/0/private/Ledgers",{'type':'deposit'})
  if (dataAll == null) return(null); 
  if(dataAll.result.ledger == undefined ) { DebugLog("KRK_Getdeposithistory", "Empty"); return(null); } else {DebugLog("KRK_Getdeposithistory", dataAll.result.ledger);}
  for (r in dataAll.result.ledger) {
    if (dataAll.result.ledger[r]['type'] == "deposit")
    {
    array.push([   
      new Date(dataAll.result.ledger[r]['time']* 1000),
      KRK_NormalKRKcode(dataAll.result.ledger[r]['asset']), 
      dataAll.result.ledger[r]['amount'], 
      ToFiat(KRK_NormalKRKcode(dataAll.result.ledger[r]['asset']), dataAll.result.ledger[r]['amount']),
      dataAll.result.ledger[r]['refid'], 
      "",
      ]); 
    }  
  }
  return(array);
}




function KRK_Getwithdrawhistory() { 
  var array   = [];
  var dataAll = KRK_AuthRequest("/0/private/Ledgers",{'type':'withdrawal'})
  if (dataAll == null) return(null);
  if (dataAll.result.ledger == undefined) { DebugLog("KRK_Getwithdrawhistory", "Empty"); return(null); } else {DebugLog("KRK_Getwithdrawhistory", dataAll.result.ledger);}
  for (r in dataAll.result.ledger) {
    if (dataAll.result.ledger[r]['type'] == "withdrawal")
    {
    array.push([   
      new Date(dataAll.result.ledger[r]['time']* 1000),
      KRK_NormalKRKcode(dataAll.result.ledger[r]['asset']), 
      dataAll.result.ledger[r]['amount'], 
      ToFiat(KRK_NormalKRKcode(dataAll.result.ledger[r]['asset']), dataAll.result.ledger[r]['amount']),
      dataAll.result.ledger[r]['refid'], 
      "",
      ]); 
    }  
  }
  return(array);
}


function KRK_Import(settings) { 
  function krkstrip(mcode, para) {  
    var response = "";
    for (var r=0;r<MRKDATA.length;r++)
    {
      if (MRKDATA[r][1] == mcode || (MRKDATA[r][4]+MRKDATA[r][5]) == mcode)  {
        if (para=="market") { response=MRKDATA[r][2]; break;} else { response=MRKDATA[r][3]; break; }
      }  
    }
  if (response == "") 
  {
   for (var r=0;r<MRKDATA.length;r++)
    {
      var temp = MRKDATA[r][5]+MRKDATA[r][2];
      if (temp == mcode)  {
        if (para=="market") { response=MRKDATA[r][2]; break;} else { response=MRKDATA[r][3]; break; }
      }  
    }
  }
  if (response == "") {return(mcode);}
  return(response);
  }
  var array   = [];
  var dataAll = GetCSVSheet(settings); 
  DebugLog("KRK_Import", dataAll);
  if (dataAll==null) {return(null);}
  if (dataAll[1]['pair'] == null ) {Browser.msgBox("Error: Is this a Kraken file? Can not find [pair]"); return(null);}
  for (r in dataAll) { 
    array.push({
      date:      dataAll[r]['time'],
      type:      CapFirstLetter(dataAll[r]['type']),
      ncur:      krkstrip(dataAll[r]['pair'],"currency"),
      nmarket:   krkstrip(dataAll[r]['pair'],"market"),
      quantity:  Number(dataAll[r]['vol']),
      unitprice: Number(dataAll[r]['price']),
      fee:       Number(dataAll[r]['fee']),
      nfeecur:   krkstrip(dataAll[r]['pair'],"market"),
      ordernr:   ""
    });
  }
  return(array);
}


// *** Generic private function
// returns [1.timestamp],[2.currency_code], [3.quantity],[4.TxId], [5. CryptoAddress]

function KRK_Signature (path, postdata, nonce) {
  try {
  var sha256obj = new jsSHA ("SHA-256", "BYTES");
  sha256obj.update (nonce + postdata);
  var hash_digest = sha256obj.getHash ("BYTES");
  var sha512obj = new jsSHA ("SHA-512", "BYTES");
  sha512obj.setHMACKey (EXSECRET, "B64");
  sha512obj.update (path);
  sha512obj.update (hash_digest);
  } catch(e) { return (null); }
  return sha512obj.getHMAC ("B64");
}


function KRK_AuthRequest(command, payload ){
  var nonce     = KRKnonce();
  if (payload == null) { var payload   = {'type':0}; }
  var postdata  = "nonce=" + nonce + "&type="+payload['type'];
  var signature = KRK_Signature (command, postdata, nonce);
  if (signature == null) { return(null); }
  var url = KRKbaseUrl + command;
  var options = {
    method: 'post',
    headers: {
      'API-Key': EXKEY,
      'API-Sign': signature
    },
    payload: postdata
  }
  var dataAll=Fetch (url, options );
  if (dataAll.error != undefined && dataAll.error != "[]" &&  dataAll.error != "") 
  { 
    if (VERBOSE == "NO" ) { Browser.msgBox(dataAll.error); DebugLog("KRK_Getwithdrawhistory", dataAll.error); return(null); } 
  }
  return(dataAll);
}






function KRK_GetBalances() {
  
  var stn = {
   //"apikey"     : HashExkey(EXKEY,"decode"),
   //"secret"     : HashExkey(EXSECRET,"decode"),
   "apikey"     : EXKEY,
   "secret"     : EXSECRET,
   "thirdattrib": ADATTRIB,
   "command"    : "/0/private/Balance",
   "uri"        : "https://api.kraken.com",
   "apiversion" : "",
   "method"     : "GET",
   "payload"    : ""
  }; 
  
  
  if (ADATTRIB == undefined) var ADATTRIB = 'blank';
  Logger.log("ADATTRIB="+ADATTRIB);
  if (ADATTRIB == 'futures') {
    Logger.log("Futures");
    stn.uri     = 'https://futures.kraken.com/derivatives';
    stn.command = '/api/v3/accounts';
    stn.payload = '';
  } else { Logger.log("Spot"); }
  
  var response = KRK_PrivateRequest(stn),
      dataAll  = UrlFetchApp.fetch(response.uri, response.params),
      array    = [],
      trim     = '';
  
  dataAll = JSON.parse(dataAll);
  
  
  // check if it if fututures
  if(stn.uri.indexOf('https://futures.kraken.com/derivatives') !== -1 )   
  { 
   dataAll = dataAll.accounts;
   // Logger.log(dataAll.accounts);
    for (r in dataAll) {
      if (dataAll[r].auxiliary != undefined) {
        if(parseFloat(dataAll[r].auxiliary.pv) > 0){
          trim = r;
          try {
            if (r[2] == '_') trim = r.substring(3);
            if (trim.substr(trim.length - 3) == 'usd')  trim = trim.slice(0, -3).toUpperCase();
  //          if (trim == 'XBT') trim = 'BTC';
          } catch (e) {Logger.log("Err: KRK trim function 1");}
          array.push({
            curcodeEX: trim, 
            balance:dataAll[r].auxiliary.pv
          });
        }
      }  // if dataAll[r]
    
    }  // for r
  Logger.log("Return from KRK ->");
  Logger.log(array);
  return(array);
  } else
  
  
  {
    Logger.log("KRK_GetBalances", dataAll);
    //if (dataAll["error"]=="EAPI:Invalid key"){ if (VERBOSE == "NO" ) {Browser.msgBox("KRAKEN API ERROR: \n"+dataAll["error"]);} DebugLog("KRK_GetBalances", dataAll["error"]); return (null); }
    if (dataAll==null) {return (null);}
    for (r in dataAll.result) {
      if(parseFloat(dataAll.result[r]) > 0){
        array.push({
          curcodeEX: KRK_NormalKRKcode(r), 
          balance:dataAll.result[r]
        });
      }
    }  // for r
  }
  Logger.log(array);
  return(array);  
}




function KRK_PrivateRequest(stn) {      
  if(stn.uri.indexOf('https://futures.kraken.com/derivatives') !== -1 )   
  { 
    if (stn.command == '') { stn.command = stn.uri.slice(38); stn.uri = stn.uri.slice(0,38) }
    return KRK_PrivateRequest2(stn);
  } else 
  return KRK_PrivateRequest1(stn);
}



// ** NORMAL / LEGACY Private Request
function KRK_PrivateRequest1(stn) {      

  function KRK_Signature (path, postdata, nonce, secret) {
    try {
      var sha256obj = new jsSHA ("SHA-256", "BYTES");
      sha256obj.update (nonce + postdata)
      var hash_digest = sha256obj.getHash ("BYTES"),
          sha512obj = new jsSHA ("SHA-512", "BYTES");
      sha512obj.setHMACKey (secret, "B64");
      sha512obj.update (path);
      sha512obj.update (hash_digest);
    } catch(e) { return (null); }
    return sha512obj.getHMAC ("B64");
  }
   
  // ** Load Hashes and possible other libs 
  var elibs = {   hashes:  "https://sites.google.com/site/moosyresearch/projects/cryptos/botmon/script34/hashes.gs" }
  try {
    Object.keys(elibs).forEach(function(library) {
      newFunc =   eval(UrlFetchApp.fetch(elibs[library]).getContentText());  
      eval('var ' + library + ' = ' + newFunc);  
    }); } catch(e) { Logger.log("ERROR: "+e); return (null); }

  if (stn.payload == "") { stn.payload   = {'type':0}; }
  try { stn.payload = CreateURIQueryString(stn.payload,"&") } catch (e) {Logger.log("")};
  try { if (stn.payload[0] == "?")  stn.payload = stn.payload.replace('?', '&'); } catch(e)  { Logger.log("");}
  
  var nonce     = new Date () * 1000,
      postdata  = "nonce=" + nonce +stn.payload,
      signature = KRK_Signature (stn.command, postdata, nonce, stn.secret);      
  
  // if (signature == null) { return(null); }
  var params = {
    'method'            : stn.method,
    'muteHttpExceptions': true,
    'headers': {
      'API-Key': stn.apikey,
      'API-Sign': signature,
      //'Content-Type'      :'application/json',  ** Don't enable these
      //'Accept'            :'application/json'   ** Don't enable these
    },
    payload: postdata
  }
  
 return  { uri: stn.uri + stn.command, params: params};
}




// ** New Futures Private Request
function KRK_PrivateRequest2(stn) {      
  // ** Load Hashes Libs
  var elibs = {   hashes:  "https://sites.google.com/site/moosyresearch/projects/cryptos/botmon/script34/hashes.gs" };  try { Object.keys(elibs).forEach(function(library) { newFunc =   eval(UrlFetchApp.fetch(elibs[library]).getContentText());   eval('var ' + library + ' = ' + newFunc);   }); } catch(e) { Logger.log("ERROR: "+e); return (null); }
   
  // https://support.kraken.com/hc/en-us/categories/360001806372-Futures-API
  function KRK_Signature(postData, nonce, endpointPath, secret) {
    try {
      var message = postData + nonce + endpointPath,              // 1 Concatenate postData + nonce + endpointPath
          sha256obj = new jsSHA ("SHA-256", "BYTES");
      sha256obj.update (message)
      var hash_digest = sha256obj.getHash ("BYTES"),              // 2 Hash the result of step 1 with the SHA-256 algorithm
          sha512obj = new jsSHA ("SHA-512", "BYTES");
      sha512obj.setHMACKey (secret, "B64");                       // 3 Base64-decode your api_secret
      sha512obj.update (hash_digest);                             // 4 Use the result of step 3 to hash the result of the step 2 with the HMAC-SHA-512 algorithm
    
    } catch(e) { return (null); }
    return sha512obj.getHMAC ("B64");                             // 5 Base64-encode the result of step 4
  }
  
  
  if (stn.payload != '') {
    try { stn.payload = CreateURIQueryString(stn.payload,"") } catch (e) {Logger.log("")};
    try { if (stn.payload[0] == "?")  stn.payload = stn.payload.replace('?', '&'); } catch(e)  { Logger.log("");}
  }
  if (stn.payload.length < 3) stn.payload = ""; 
  var nonce   = new Date().getTime().toString(),
      authent = KRK_Signature (stn.payload, nonce, stn.command, stn.secret),
      params = {
        'method'            : stn.method,
        'muteHttpExceptions': true,
        'Accept': 'application/json',
          'headers': {
            'apiKey'  : stn.apikey,
            'nonce'   : nonce,
            'authent' : authent,
          },
      };
  if (stn.payload != '')  stn.command = stn.command+'?'+ stn.payload;
  return  { uri: stn.uri + stn.command, params: params};
}



function KRK_PublicRequest(stn) {      
  var params = {
    'method'            : stn.method,
    'muteHttpExceptions': true
  }
 if (stn.payload != null ) stn.payload=CreateURIQueryString(stn.payload,"?");
 
 return  { uri: stn.uri + stn.command + stn.payload, params: params};
}
