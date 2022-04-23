
//var KUCbaseUrl    ='https://openapi-sandbox.kucoin.com';
var KUCbaseUrl    ='https://openapi-v2.kucoin.com';



function KUC_GetBalances() {
  var array   = [],
      dataAll = KUC_PrivateRequest('/api/v1/accounts');

  // data=[{balance=1000, available=1000, holds=0, currency=KCS, id=5c6dd55d641c38b, type=main}
  DebugLog("KUC_GetBalances", dataAll);
  if (dataAll === null) { ToastMessage(EXKEY+" ERROR", "KUC_GetBalances: No response from KuCoin server"); return(null); }
  for (var r in dataAll.data) {
    if(parseFloat(dataAll.data[r].balance) > 0){
      array.push({
        curcodeEX: dataAll.data[r].currency,
        balance: dataAll.data[r].balance
      });
    }
  } 
  return(array);
}


function KUC_Getorderhistory() { 
  var array   = [];
  var dataAll = KUC_PrivateRequest("order/dealt");
  DebugLog("KUC_Getorderhistory", dataAll);

  if (dataAll.success == "false") { Browser.msgBox("error");}
  if (dataAll["success"] == "false") { Browser.msgBox("error");}
  if (dataAll === null) { return(null); }
  
  // https://kucoinapidocs.docs.apiary.io/#reference/0/trading/list-dealt-orders(merged)
  // https://api.kucoin.com/v1/order/dealt
  for(var r in dataAll.data.datas){ 
    array.push({
      date:      new Date(dataAll.data.datas[r].createdAt * 1000), 
      type:      CapFirstLetter(dataAll.data.datas[r].direction),  // not sure if this is the correct attribute (direction or dealDirection)
      ncur:      dataAll.data.datas[r].coinType,
      nmarket:   dataAll.data.datas[r].coinTypePair,
      quantity:  dataAll.data.datas[r].amount,
      unitprice: dataAll.data.datas[r].dealPrice,
      fee:       dataAll.data.datas[r].fee,
      nfeecur:   "BTC",
      ordernr:   ""
    });
  }
  return(array);  
}


function KUC_PrivateRequest(endpoint) {
  var nonce = '' + Date.parse(new Date()),
      body         = "",
      strForSign   = nonce + 'GET' +  endpoint + body,
  
      digest = Utilities.computeHmacSha256Signature(strForSign, EXSECRET, Utilities.Charset.UTF_8),
      hexstr = Utilities.base64Encode(digest),
  
      options = {
        'headers' : {
          'KC-API-KEY'        : EXKEY,
          'KC-API-SIGN'       : hexstr,
          'KC-API-TIMESTAMP'  : nonce,
          'KC-API-PASSPHRASE' : ADATTRIB
    }
  }
  return(Fetch(KUCbaseUrl + endpoint, options));
}


