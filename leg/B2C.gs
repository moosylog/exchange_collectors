// bit2c.co.il


function B2C_GetBalances(arg) { 

  var array    = [],
      response = "";
      r        = "";
  
  if (ADATTRIB.toLowerCase().indexOf('demo') >= 0) {
  response =
  {
	"AVAILABLE_NIS": 68299.5000000000000000,
	"NIS": 100000.00000000,
	"AVAILABLE_BTC": 24.2409524700000000,
	"BTC": 24.33095247,
	"Fees": {
		"BtcNis": {
			"FeeMaker": 0.50,
			"FeeTaker": 0.50
		},
		"LtcNis": {
			"FeeMaker": 0.50,
			"FeeTaker": 0.50
		},

	}
   }
  } else {
   Logger.log("bit2c -> B2C_GetBalances:");
   response = B2C_auth('/Account/Balance', EXKEY, EXSECRET);
  }
 DebugLog("Raw output:", response);
 if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  { Browser.msgBox("Bit2C Connector DEBUG Mode:"); Browser.msgBox("Received (Raw balance)\\n\\n"+JSON.stringify(response)); }    
 try {r = response.Fees} catch(e) { Logger.log(response); return(false); }
 
 for (r in response) {
   if ( [r][0].substring(0, 9) === 'AVAILABLE' && Number(response[r])* 10000 > 0 ) {  
     array.push({ curcodeEX: [r][0].slice(10, [r][0].length),  balance: Number(response[r]) });}
 }
  
  DebugLog("To Sheet", JSON.stringify(array));
  if (ADATTRIB.toLowerCase().indexOf('debug') >= 0)  Browser.msgBox("Pushed to sheet:\\n\\n"+JSON.stringify(array));     
  return(array);
}



/*
https://bit2c.co.il/home/api?language=en-US#generate keyparam1=val1&param2=val2
*/
function B2C_auth(command, key, secret) {
  function HMACSHA512B64(s, secret) { return (Utilities.base64Encode(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, s, secret))); }
  
  var nonce   =  parseInt(((new Date()).getTime() - 1389729146519)/250,10),
      query   =  "nonce="+nonce,
      params  = {
        'method'             : 'get',
        'muteHttpExceptions' : true,
        'headers'            : {  
            'Content-Type'   : 'application/x-www-form-urlencoded',
            'Key'            : key,
            'Sign'           : HMACSHA512B64(query,secret.toUpperCase())
    }
  };
  return(JSON.parse(UrlFetchApp.fetch("https://www.bit2c.co.il/"+command+"?"+query, params).getContentText()));
}

