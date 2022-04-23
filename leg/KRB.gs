// todo 16 nov 2020
// Futures bug fix - zit nog een bug in !!!!
// All ther private functions toevoegen

// TODO - FUTURES HEEFT EEN HEEL ANDERE HEADER !!!!   - FIEXEN !!!

// IMPORTANT !!!! 'KRK' en 'BIN' market zijn hardcoded !!!  // dit zorgt ervoor dat DASH ASH wordt!!
// Hij werkt alleen als je de server versie update???

function KRB_Settings() {  
  
  var KRBrequest = {
   'id'         : 'KRB',
   'name'       : 'Kraken',
   'apikey'     : EXKEY,
   'secret'     : EXSECRET,
   'thirdattrib': ADATTRIB,
   'command'    : '',
   'uri'        : 'https://api.kraken.com',
   'method'     : 'post',
   'payload'    : ''
  }
  return KRBrequest;
}



function KRB_GetBalances() {
 var KRBrequest         =  KRB_Settings(),
     array              =  [],
     response           =  '';
  
  
  // Let op met , en ; hierboven
  function GetKRBBal(){ 
    DebugLog("Fetching from "+KRBrequest.name+" "+parse.toUpperCase(),KRBrequest.name+" ");
    var request  = KRB_PrivateRequest(KRBrequest);
    DebugLog("URL ....",request.uri +  CreateURIQueryString(request.params,'?'));
    var response = UrlFetchApp.fetch(request.uri,request.params);
    if (response == "") { DebugLog("No data",KRBrequest.name); return null; }
    DebugLog("Receiving data from "+KRBrequest.name, response);
    if (KRBrequest.thirdattrib.toLowerCase().indexOf('debug') >= 0)    { Browser.msgBox(KRBrequest.name+" Connector DEBUG Mode for "+parse.toUpperCase()); Browser.msgBox("Received (Raw balance)\\n\\n"+response); }   
    response = JSON.parse(response);
    return response;  
  }
  
  
  var parse = 'spot';
  Logger.log("Running :"+KRBrequest.name);
  if (KRBrequest.thirdattrib.toLowerCase().indexOf('futures') >= 0)  parse = 'futures';
  
  switch(parse) {
  case 'spot':
    KRBrequest.command = '/0/private/Balance';
    response = GetKRBBal();
        Logger.log(response);
     // return null;
    for ( name in response['result'] ) {
      if (parseFloat(Math.abs( response['result'][name] )) * 100000  > 0)  {
        array.push({
          curcodeEX : KRB_NormalKRBcode(name), 
          balance   : parseFloat(response['result'][name])
        }); }
    }
    Logger.log(array);
    break;
  case 'futures':    
    KRBrequest.uri     = 'https://futures.kraken.com/derivatives';
    KRBrequest.command = '/api/v3/accounts';
    KRBrequest.payload = '';
    
    response = GetKRBBal();
      
    var dataAll = response.accounts;
for (r in dataAll) {
      if (dataAll[r].auxiliary != undefined) {
        if(parseFloat(dataAll[r].auxiliary.pv) > 0){
          trim = r;
          try {
            if (r[2] == '_') trim = r.substring(3);
            if (trim.substr(trim.length - 3) == 'usd')  trim = trim.slice(0, -3).toUpperCase();
  //          if (trim == 'XBT') trim = 'BTC';
          } catch (e) {Logger.log("Err: KRB trim function 1");}
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

  
  try { if (KRBrequest.thirdattrib.indexOf('debug') >= 0) { Browser.msgBox("To Sheet: \\n\\n"+JSON.stringify(array)); }   } catch(e) {Logger.log("");}
  DebugLog("To Sheet", array);
  return (array);
}


function KRB_PrivateRequest(stn) {      
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
 return  { uri: 'https://api.kraken.com' + stn.command, params: params};
}















function KRB_PublicRequest(stn) {      
  var params = {
    'method'            : stn.method,
    'muteHttpExceptions': true
  }
 if (stn.payload != null ) stn.payload=CreateURIQueryString(stn.payload,"?");
 
 return  { uri: stn.uri + stn.command + stn.payload, params: params};
}


// function KRB_Ticker_Test(){  Logger.log( KRB_Ticker('ALGOUSD') ); }
// *** Ticker returns the last price
function KRB_Ticker(fullticker){
  var json  = JSON.parse(UrlFetchApp.fetch('https://api.kraken.com/0/public/Ticker?pair='+fullticker));
  if (json.result != null) { return [[json.result[fullticker].c[0],json.result[fullticker].a[0],json.result[fullticker].c[0]]] }
  return [[0,0,0]];
}


// *** Markets
function KRB_GetMarkets(){
  var array   = [],
      cname   = '',
      dataAll = JSON.parse(UrlFetchApp.fetch('https://api.kraken.com/0/public/AssetPairs'));
  for (r in dataAll.result) {
    cname = CMC_name(dataAll.result[r]['altname'].slice(0,-3));
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
  Logger.log(array);
  return (array);
}


function KRB_NormalKRBcode(mcode){
  if (MRKDATA.length < 2 || MRKDATA === null) { Logger.log("MRKDATA is empty - please run from server?"); DebugLog("Error: MRKDATA is empty!","why? - ctrxl core");  return mcode; }
  
  //if (MRKDATA == undefined || MRKDATA.length < 2 ) {Browser.msgBox("MRKDATA is not empty"); return mcode; }
  try {
  for (var r=0;r<MRKDATA.length;r++)
  {
    // Logger.log("->"+MRKDATA[r][2]+"   "+MRKDATA[r][3]+"   "+MRKDATA[r][4]+"    "+MRKDATA[r][5]);
    var found=false;
    if (MRKDATA[r][5] == mcode)  { 
      if (MRKDATA[r][3] == "XBT") {return("BTC"); }
      return(MRKDATA[r][3]); var found=true; break; } 
  }  
  if (found = false) { if (MRKDATA[r][4] == mcode)  {  if (MRKDATA[r][2] == "XBT") {return("BTC"); } return(MRKDATA[r][2]); var found=true;   } }   
  if (mcode.slice( 1 ) == "XBT") { return("BTC"); }
  Logger.log(mcode + " -> " + mcode.slice( 1 ));
  return(mcode.slice( 1 )); 
  } catch (e) { return mcode };
}
