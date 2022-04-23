function BIN_PrivateRequest(stn){   
  
  // *** WAPI first
  if (stn.command.toLowerCase().indexOf('api/' ) !== -1) {
  try { stn.payload =CreateURIQueryString(stn.payload,"&");   } catch (e) {stn.payload=""; Logger.log("Bin_Priv: Err 1");}
  //Browser.msgBox(stn.payload);
  Logger.log("*"+stn.payload+"* "+stn.payload.length);
  var binapipara = "",
      postdata = binapipara.substr(1)+'&timestamp='+new Date()*1 + stn.payload,
      
      
      signature  = HMACSHA256HEX(postdata,stn.secret),
      //signature = BIN_Signature (secret,timestamp),
      params = {
        method: 'get',
        muteHttpExceptions: true,
        headers: {
            'X-MBX-APIKEY':stn.apikey,}
      };
  return  { uri: "https://api.binance.com/"+stn.command+"?"+postdata+"&signature="+signature , params: params};
  
  } 
 try { stn.payload =CreateURIQueryString(stn.payload,"&");   } catch (e) {stn.payload=""; Logger.log("Bin_Priv: Err 1");}
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
          'Content-Type'    : 'application/x-www-form-urlencoded'
        }
      }
   return  { uri: stn.uri+stn.apiversion+stn.command+stn.payload, params: params};
}
