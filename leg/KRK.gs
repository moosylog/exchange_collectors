
function KRK_Settings() {  
  var KRKrequest = {
   'id'         : 'KRK',
   'name'       : 'Kraken',
   'apikey'     : EXKEY,
   'secret'     : EXSECRET,
   'thirdattrib': '',
   'command'    : '',
   'uri'        : 'https://api.kraken.com',
   'method'     : 'post',
   'payload'    : ''
  }
  try { if (ADATTRIB != undefined) KRKrequest.thirdattrib = ADATTRIB; } catch(e) { Logger.log("");}
  return KRKrequest;
}




function KRK_GetBalances() {
  function DebugLog(a,b){Logger.log(a);Logger.log(b);}

  var KRKrequest        =  KRK_Settings(),
     array              =  [],
     response           =  '',
     dataAll            =  '',
     parse              = 'spot';
  
  
  // Let op met , en ; hierboven
  function GetKRKBal(){ 
    DebugLog("Fetching from "+KRKrequest.name+" "+parse.toUpperCase(),KRKrequest.name+" ");
    var request  = KRK_PrivateRequest(KRKrequest);
    DebugLog("URL ....",request.uri +  CreateURIQueryString(request.params,'?'));
    var response = UrlFetchApp.fetch(request.uri,request.params);
    DebugLog("Receiving data from "+KRKrequest.name, response);
    if (response == "") { DebugLog("No data",KRKrequest.name); return null; }
    DebugLog("Receiving data from "+KRKrequest.name, response);
    if (KRKrequest.thirdattrib.toLowerCase().indexOf('debug') >= 0)    { Browser.msgBox(KRKrequest.name+" Connector DEBUG Mode for "+parse.toUpperCase()); Browser.msgBox("Received (Raw balance)\\n\\n"+response); }   
    response = JSON.parse(response);
    return response;  
  }
  
  
  
  Logger.log("Running :"+KRKrequest.name);
  if (KRKrequest.thirdattrib.toLowerCase().indexOf('futures') >= 0)  parse = 'futures';
  
  switch(parse) {
  
  // *** SPOT BALANCE
  case 'spot':
    KRKrequest.command = '/0/private/Balance';
    response = GetKRKBal();       
    for ( name in response['result'] ) {
      if (parseFloat(Math.abs( response['result'][name] )) * 100000  > 0)  {
        array.push({
          curcodeEX : KRK_NormalKRKcode(name), 
          balance   : parseFloat(response['result'][name])
        }); }
    }
    Logger.log(array);
    break;
  
  // *** FUTURES BALANCE    
  case 'futures':    
    KRKrequest.uri     = 'https://futures.kraken.com/derivatives';
    KRKrequest.command = '/api/v3/accounts';
    KRKrequest.payload = '';
    KRKrequest.method  = 'GET';
    response = GetKRKBal();
    dataAll = response.accounts;
    for (r in dataAll) {
      if (dataAll[r].auxiliary != undefined) {
        if(parseFloat(dataAll[r].auxiliary.pv) > 0){
          trim = r;
          try {
            if (r[2] == '_') trim = r.substring(3);
            if (trim.substr(trim.length - 3) == 'usd')  trim = trim.slice(0, -3).toUpperCase();
			if (trim.slice(-2) == '.S') trim = trim.slice(0, -2);
			
          } catch (e) {Logger.log("Err: KRK trim function 1");}
          array.push({
            curcodeEX: trim, 
            balance:dataAll[r].auxiliary.pv
          });
        }
      }  // if dataAll[r]
    } // for loop 
    break;
  default:
    // code block
  }
  try { if (KRKrequest.thirdattrib.indexOf('debug') >= 0) { Browser.msgBox("To Sheet: \\n\\n"+JSON.stringify(array)); }   } catch(e) {Logger.log("");}
  DebugLog("To Sheet", array);
  return (array);
}


// ** PRIVATE REQUEST BROKER 
function KRK_PrivateRequest(stn) {      
  if(stn.uri.indexOf('derivatives') !== -1 )   
  { 
    if (stn.command == '') { stn.command = stn.uri.slice(38); stn.uri = stn.uri.slice(0,38) }
    return KRK_PrivateRequest_Futr(stn);
  } else 
  return KRK_PrivateRequest_Spot(stn);
}


function KRK_PrivateRequest_Spot(stn) {      
  //Logger.log('KRK_PrivateRequest_Spot','');
  if (stn.payload == "") stn.payload =  {'type':0};
  try { stn.payload = CreateURIQueryString(stn.payload,"&") } catch (e) {Logger.log("")};
  try { if (stn.payload[0] == "?")  stn.payload = stn.payload.replace('?', '&'); } catch(e)  { Logger.log("");}
  var nonce      = new Date () * 1000,
      payload    = 'nonce=' + nonce + '&' + stn.payload,
      api_sha256 = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, nonce + payload),
      sigstring  = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, Utilities.newBlob(stn.command).getBytes().concat(api_sha256), Utilities.base64Decode(stn.secret)),
      signature  = Utilities.base64Encode(sigstring),
      params = {
        'method'            : stn.method, 
        'muteHttpExceptions': true,
        'payload'           : payload, 
        'headers'           : {
          'API-Key'           :  stn.apikey, 
          'API-Sign'          :  signature
        }
  }
 return  { uri: stn.uri + stn.command, params: params};
}


function KRK_PrivateRequest_Futr(stn) {   
  Logger.log('KRK_PrivateRequest_Futr','');
  if (stn.payload != '') {
    try { stn.payload = CreateURIQueryString(stn.payload,"") } catch (e) {Logger.log("")};
    try { if (stn.payload[0] == "?")  stn.payload = stn.payload.replace('?', '&'); } catch(e)  { Logger.log("");}
  }
  if (stn.payload.length < 3) stn.payload = ""; 
   
  var nonce      = new Date().getTime().toString(),
      payload    = stn.payload+ nonce+ stn.command,
      api_sha256 = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, payload),
      sigstring  = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, Utilities.newBlob("").getBytes().concat(api_sha256), Utilities.base64Decode(stn.secret)),
      signature  = Utilities.base64Encode(sigstring),
      params = {
        'method'            : stn.method,
        'muteHttpExceptions': true,
        'Accept': 'application/json',
          'headers': {
            'apiKey'  : stn.apikey,
            'nonce'   : nonce,
            'authent' : signature,
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


// function KRK_Ticker_Test(){  Logger.log( KRK_Ticker('ALGOUSD') ); }
// *** Ticker returns the last price
function KRK_Ticker(fullticker){
  var json  = JSON.parse(UrlFetchApp.fetch('https://api.kraken.com/0/public/Ticker?pair='+fullticker));
  if (json.result != null) { return [[json.result[fullticker].c[0],json.result[fullticker].a[0],json.result[fullticker].c[0]]] }
  return [[0,0,0]];
}


// *** Markets
function KRK_GetMarkets(){
  var array   = [],
      cname   = '',
      dataAll = JSON.parse(UrlFetchApp.fetch('https://api.kraken.com/0/public/AssetPairs'));
  for (r in dataAll.result) {
    cname = CMC_name(dataAll.result[r]['altname'].slice(0,-3));
    if (cname == "") cname = dataAll.result[r]['altname'].slice(0,-3);
    array.push([
      dataAll.result[r]['altname'], 
      dataAll.result[r]['base']+dataAll.result[r]['quote'],  
      dataAll.result[r]['altname'].slice(-3), 
      dataAll.result[r]['altname'].slice(0,-3),
      dataAll.result[r]['quote'],
      dataAll.result[r]['base'], 
      cname
    ]);
  }
  return (array);
}


function KRK_NormalKRKcode(mcode){
  var MRKDATA= KRK_GetMarkets();
  if (MRKDATA.length < 2 || MRKDATA === null) { Logger.log("MRKDATA is empty - please run from host"); DebugLog("Error: MRKDATA is empty!","why? - ctrxl core");  return mcode; }
  try {
  for (var r=0;r<MRKDATA.length;r++)
  {
    var found=false;
    if (MRKDATA[r][5] == mcode)  { 
      if (MRKDATA[r][3] == "XBT") {return("BTC"); }
      return(MRKDATA[r][3]); var found=true; break; } 
  }  
  if (found = false) { if (MRKDATA[r][4] == mcode)  {  if (MRKDATA[r][2] == "XBT") {return("BTC"); } return(MRKDATA[r][2]); var found=true;   } }   
  if (mcode.slice( 1 ) == "XBT") { return("BTC"); }
  if (mcode.slice(-2) == '.S') mcode = mcode.slice(0, -2);  // added 17 march 2021
  Lsogger.log(mcode + " -> " + mcode.slice( 1 ));
  return(mcode.slice( 1 )); 
  } catch (e) { return mcode };
}



// *** Order History
// returns [1.timestamp],[2.sell/buy], [3.currency_code], [4.market_code], [5.quantity],[6.price per unit], [7. fee], [8.fee currency], [9.special (order nr)]
function KRK_Getorderhistory() {
  var KRKrequest        =  KRK_Settings();
  KRKrequest.command    =  '/0/private/ClosedOrders';
  
  var request  = KRK_PrivateRequest(KRKrequest);
  var response = UrlFetchApp.fetch(request.uri,request.params);
  if (response == "") { DebugLog("No data",KRKrequest.name); return null; }
  DebugLog("Receiving data from "+KRKrequest.name, response);
  if (KRKrequest.thirdattrib.toLowerCase().indexOf('debug') >= 0)    { Browser.msgBox(KRKrequest.name+" Connector DEBUG Mode for "+parse.toUpperCase()); Browser.msgBox("Received (Raw balance)\\n\\n"+response); }   
  var dataAll = JSON.parse(response);
  var array   = [];
  
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
  var KRKrequest        =  KRK_Settings();
  KRKrequest.command    =  '/0/private/Ledgers';
  KRKrequest.payload    =  {'type':'deposit'};
  
  var request  = KRK_PrivateRequest(KRKrequest);
  var response = UrlFetchApp.fetch(request.uri,request.params);
  if (response == "") { DebugLog("No data",KRKrequest.name); return null; }
  DebugLog("Receiving data from "+KRKrequest.name, response);
  if (KRKrequest.thirdattrib.toLowerCase().indexOf('debug') >= 0)    { Browser.msgBox(KRKrequest.name+" Connector DEBUG Mode for "+parse.toUpperCase()); Browser.msgBox("Received (Raw balance)\\n\\n"+response); }   
  var dataAll = JSON.parse(response);
  var array   = [];
  
  if (dataAll == null) return(null); 
  if(dataAll.result.ledger == undefined ) { DebugLog("KRK_Getdeposithistory", "Empty"); return(null); } else {DebugLog("KRK_Getdeposithistory", dataAll.result.ledger);}
  for (s in dataAll.result.ledger) {
    //Logger.log(dataAll.result.ledger[r]['type'] );
    if (dataAll.result.ledger[s]['type'] == "deposit")
    {
      array.push([   
      new Date(dataAll.result.ledger[s]['time']* 1000),
      KRK_NormalKRKcode(dataAll.result.ledger[s]['asset']), 
      dataAll.result.ledger[s]['amount'], 
      ToFiat(KRK_NormalKRKcode(dataAll.result.ledger[s]['asset']), dataAll.result.ledger[s]['amount']),
      dataAll.result.ledger[s]['refid'], 
      "",
      ]); 
    }  
  }
  return(array);
}

        
        
        
function KRK_Getwithdrawhistory() { 
  var KRKrequest        =  KRK_Settings();
  KRKrequest.command    =  '/0/private/Ledgers';
  KRKrequest.payload    =  {'type':'withdrawal'};
  
  var request  = KRK_PrivateRequest(KRKrequest);
  var response = UrlFetchApp.fetch(request.uri,request.params);
  if (response == "") { DebugLog("No data",KRKrequest.name); return null; }
  DebugLog("Receiving data from "+KRKrequest.name, response);
  if (KRKrequest.thirdattrib.toLowerCase().indexOf('debug') >= 0)    { Browser.msgBox(KRKrequest.name+" Connector DEBUG Mode for "+parse.toUpperCase()); Browser.msgBox("Received (Raw balance)\\n\\n"+response); }   
  var dataAll = JSON.parse(response);        
        
  var array   = [];
  
  if (dataAll == null) return(null);
  if (dataAll.result.ledger == undefined) { DebugLog("KRK_Getwithdrawhistory", "Empty"); return(null); } else {DebugLog("KRK_Getwithdrawhistory", dataAll.result.ledger);}
  for (s in dataAll.result.ledger) {
    if (dataAll.result.ledger[s]['type'] == "withdrawal")
    {
    array.push([   
      new Date(dataAll.result.ledger[s]['time']* 1000),
      KRK_NormalKRKcode(dataAll.result.ledger[s]['asset']), 
      dataAll.result.ledger[s]['amount'], 
      ToFiat(KRK_NormalKRKcode(dataAll.result.ledger[s]['asset']), dataAll.result.ledger[s]['amount']),
      dataAll.result.ledger[s]['refid'], 
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

