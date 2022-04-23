function aby( n){
 num = Number(n)
 var myString = "1";
 for (i = 0; i < num; i++) {
  myString += "0";
}
 return Number(myString);
}


function ETS_GetBalances() {
 
  var label = ADATTRIB;
  if (label == null || label == "" || label == "passphrase") label = "eTokens";
  
  var ss       = SpreadsheetApp.getActiveSpreadsheet(),
      sheet    = ss.getSheetByName(label),
      array    = [];
      contract = null;
      m1       = null;

    
  Logger.log("ETS_GetBalances");
  Logger.log("API KEY="+EXKEY);
  Logger.log("ETH ADDR="+EXSECRET);
  Logger.log("SHEETNAME="+label);
  Logger.log("SHEET="+sheet);
  
  //if (ss.getSheetByName(mysheet ) == null){
   if (!sheet) { 
     try { ss.insertSheet(label);  } catch (e) { Browser.msgBox("Error: can not create "+label); return(1);}
     Browser.msgBox("Etherscan for Token Balances: "+label+"\\n\\nA sheet is created for you to enter your holdings.\\n\\nCol A = Token Contract Address\\nCol B = CMC Symbol\\nCol C = Decimal seperator (optional)\\nCol D = Cache Time To Live in Seconds\\n\\nAPI key="+EXKEY+"\\nETH ADDR="+EXSECRET);
       
     sheet    = ss.getSheetByName(label);
     sheet.setTabColor("#f3f332");
     sheet.deleteColumns(5, sheet.getMaxColumns()-5); 
     sheet.deleteRows(4, sheet.getMaxRows()-10); 
     sheet.setColumnWidth(1, 320);
	 sheet.setColumnWidth(3, 48);
     sheet.setColumnWidth(4, 48);
     sheet.setColumnWidth(5, 560);
     
     var range = sheet.getRange("A1:E4");
     range.setValues([ ["Token Contract Address", "CMC Symbol", "TTL","Decimal","Note"],
	 ["0x9a642d6b3368ddc662CA244bAdf32cDA716005BC","QTUM",600,8,"Sample 1 - remove/edit if you don't have QTUM. Cache TTL 600 seconds (10 min)"],
	 ["0xc66ea802717bfb9833400264dd12c2bceaa34a6d","BAT",21600,12,"Sample 2 - remove/edit if you don't have Basic Attention Tokens. Cache is max 6 uur"],
	 ["0xd26114cd6EE289AccF82350c8d8487fedB8A0C07","OMG",1500,16,"Sample 3 - remove/edit if you don't have OMNIGO. Cache is 25 min. MAKE THIS YOUR OWN ASSET LIST!!!"]]);
     
     var range = sheet.getRange("A2:E10");
     range.setFontColor('#434343');
     range.setFontFamily('Lato');
     range.setFontSize(9);
     range.setFontStyle("normal");

     range = sheet.getRange("A1:E1");
     range.setFontColor('#ffffff');
     range.setBackground('#434343');  
     range = sheet.getRange("A1:D10");
     range.setHorizontalAlignment("right");
     return(null);
  }
  
  
  var bal = 0, result = "", response = "",
      dataAll = sheet.getRange("A2:D").getValues();
  for (m1 in dataAll){
    if (dataAll[m1][0] === "" || dataAll[m1][1] === "") { Logger.log("break "+m1); break; }
   contract = dataAll[m1][0];
   Logger.log("https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" + contract + "&address="+EXSECRET+"&apikey="+EXKEY+"&tag=latest");
   result = CachFetch("https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" + contract + "&address="+EXSECRET+"&apikey="+EXKEY+"&tag=latest",dataAll[m1][1]+EXSECRET,dataAll[m1][2]);
   if (result.status == false) { Browser.msgBox("Eherscan error #1 on contract: "+contract+"\\n\\n"+result); return null; }   
    
   try {
     if (JSON.stringify(result.data).indexOf('invalid') >= 0)  { Browser.msgBox("Eherscan error #2 on contract: "+contract+"\\n\\n"+result); return null; }   
      } catch(e) {Logger.log("Error: in dataSet"); }
   
   Logger.log(result.data);
   
   var dv = 1000000000000000000;
   if (dataAll[m1][3] != "") dv=aby(dataAll[m1][3]);
    
    
   bal = Number(result.data.result) / dv;
   Logger.log(dataAll[m1][1].toUpperCase()+"   "+bal);
   if (bal == 0) 
   { 
     bal = Number(result.data.result);
     Logger.log(dataAll[m1][1].toUpperCase()+"   "+bal);
   }
   if (dataAll[m1][0] != "" && bal != "") array.push({ curcodeEX: dataAll[m1][1].toUpperCase(), balance: bal});   
   if (dataAll[m1][0] === "") break;
  }
  DebugLog(label,array);
  if (array === null) {return(1);}
  return(array);


  function CachFetch(url, cacheid,ttl){
    //return UrlFetchApp.fetch("https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" + contract + "&address="+EXSECRET+"&apikey="+EXKEY+"&tag=latest");
    var response   = { data: null, status: true, message: ""},
        cache = CacheService.getUserCache();
    
    if (ttl == "" || ttl == null) ttl = 0;
    if (ttl > 0){
      //Browser.msgBox(ttl);
      response.data = JSON.parse(cache.get(cacheid));
      if (response.data != null) { response.message = "cached"; Logger.log("cached"); return (response); }
    } else { Logger.log("clear cache:"+cacheid); cache.remove(cacheid); }
    try {response.data = UrlFetchApp.fetch(url); var code = response.data.getResponseCode(); response.data = JSON.parse(response.data.getContentText());}
    catch(e) { response.status = false;  response.message = e; response.data = null; }
    
    /*
    if (response.data != null) {
      if(response.data.msg != undefined) {response.status = false; response.message = "Error: "+response.data.code +": "+response.data.msg + "  ResponseCode=" + code;}
      } else { response.status = false; response.message = "Error: No response from Binance API"; }
    */
    if (response.status === true && ttl >0) cache.put(cacheid, JSON.stringify(response.data), ttl); // cache for 240 seconds 4 min
    return response;
  }

}  