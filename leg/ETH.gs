function ETH_GetBalances(){
  
  var balance = [];
  
  if (ADATTRIB.length > 6) { var url = "https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" + ADATTRIB + "&address="+EXSECRET+"&apikey="+EXKEY+"&tag=latest"; } else
  var url = "https://api.etherscan.io/api?module=account&action=balancemulti&address=" + EXSECRET + "&tag=latest&apikey="+EXKEY;
  
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0) Browser.msgBox("Etherscan Connector DEBUG Mode:\\n\\nEther address = "+EXSECRET+"\\napikey = "+EXKEY+"\\n\\n"+url);
  
  var eth_response = UrlFetchApp.fetch(url);
  DebugLog("Etherscan"+eth_response);
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0) Browser.msgBox("Received:\\n\\n"+eth_response);
  
  var eth_results = JSON.parse(eth_response.getContentText()); 
  
  if (ADATTRIB.length > 6) {
    balance.push({ curcodeEX: ADATTRIB,  balance: Number(eth_results.result) / 10 });
    return balance;
  }
  
  
  
  Logger.log(eth_results);
  if (eth_results.result == 'Invalid API Key') Browser.msgBox("ERROR: "+ eth_results.result+"\\n\\nEther address = "+EXSECRET+"\\napikey = "+EXKEY+"\\n\\n"+url);
  
  for (var i = 0; i < eth_results.result.length; i++) {
      var eth_bal = eth_results.result[i].balance;
      eth_balance = 0 + Number(eth_bal);
  }
  
  if (ADATTRIB.toLowerCase().indexOf('erc20') >= 0) 
  { balance.push({ curcodeEX: "ERC20",  balance: Number(eth_balance) }); }  else 
  { balance.push({ curcodeEX: "ETH",  balance: Number(eth_balance) / 1000000000000000000 } ); }
      
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0) Browser.msgBox("To Sheet:\\n\\n"+JSON.stringify(balance));
  DebugLog("To Sheet:"+balance);
  Logger.log( balance );
  if (eth_balance * 10000000  == null ) return false;
  return balance;
}
