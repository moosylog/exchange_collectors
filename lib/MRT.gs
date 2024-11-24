function MRT_Settings() {
  return {
    id: 'MRT',
    name: 'BitMart',
    apikey: EXKEY,
    secret: EXSECRET,
    command: '/spot/v1/wallet',
    uri: 'https://api-cloud.bitmart.com',
    method: 'GET',
    payload: '',
    thirdattrib: ADATTRIB
  };
}

function MRT_GetBalance() {
  const stn = MRT_Settings();
  const response = { data: null, status: true, message: "" };
  const array = [];

  Logger.log("Starting ");
  const request = MRT_PrivateRequest(stn);
  Logger.log("URL ....", JSON.stringify(request));

  const responseObj = UrlFetchApp.fetch(request.uri, request.params);

  try {
    const response1 = JSON.parse(responseObj.getContentText());
   // if (stn.thirdattrib.toLowerCase().indexOf('debug') >= 0) {
      Browser.msgBox(stn.name + " Connector DEBUG Mode:");
      Browser.msgBox(JSON.stringify(response1));
   // }
  } catch (e) {
    Logger.log("No valid JSON data received");
    return false;
  }


    Logger.log(response1);
    Logger.log("no or empty response");
    return null;


  Logger.log(stn.name + " GetBalance", JSON.stringify(array));
  return array;
}

function MRT_PrivateRequest(MRTrequest) {
  function HMACSHA256BASE64(s, secret) {
    const signatureBytes = Utilities.computeHmacSha256Signature(s, secret);
    return Utilities.base64Encode(signatureBytes); // Convert to Base64
  }

  const timestamp = Date.now().toString();
  // Build the message string without template literals
  const message = timestamp + "#" + MRTrequest.thirdattrib + "#" + MRTrequest.apikey;

  // Build request parameters
  return {
    uri: MRTrequest.uri + MRTrequest.command,
    params: {
      method: MRTrequest.method,
      muteHttpExceptions: true,
      headers: {
        'Content-Type': 'application/json',
        'X-BM-KEY': MRTrequest.apikey,
        'X-BM-SIGN': HMACSHA256BASE64(message, MRTrequest.secret),
        'X-BM-TIMESTAMP': timestamp,
        'X-BM-MEMO': MRTrequest.thirdattrib // Include memo if provided
      }
    }
  };
}
