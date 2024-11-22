
function MRT_GetBalances() {
  // Replace these with your actual API credentials
  const API_KEY = 'YOUR_API_KEY';
  const API_SECRET = 'YOUR_API_SECRET';
  const MEMO = 'YOUR_MEMO'; // Optional, can be empty string

  // API endpoint
  const endpoint = '/account/v1/wallet';
  const baseUrl = 'https://api-cloud.bitmart.com';
  const url = baseUrl + endpoint;

  // Timestamp for signature
  const timestamp = Date.now().toString();

  // Create signature string
  const signString = timestamp + '#' + MEMO + '#' + API_KEY;

  // Create HMAC-SHA256 signature
  const signature = Utilities.computeHmacSha256Signature(signString, API_SECRET);
  const signatureHex = signature.map(byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');

  // Set up headers
  const headers = {
    'X-BM-KEY': API_KEY,
    'X-BM-SIGN': signatureHex,
    'X-BM-TIMESTAMP': timestamp,
    'X-BM-MEMO': MEMO,
    'Content-Type': 'application/json'
  };

  // Make request
  try {
    const options = {
      'method': 'get',
      'headers': headers,
      'muteHttpExceptions': true
    };

    const response = UrlFetchApp.fetch(url, options);
    const responseData = JSON.parse(response.getContentText());

    // Log the response for debugging
    Logger.log('API Response:', responseData);

    // Improved error handling
    if (response.getResponseCode() !== 200) {
      throw new Error(`HTTP Error: ${response.getResponseCode()} - ${responseData.message || 'Unknown error'}`);
    }

    if (responseData.code !== 1000) {
      throw new Error(`API Error: ${responseData.message} (Code: ${responseData.code})`);
    }

    // Parse and format wallet data
    const walletData = responseData.data.wallet || [];
    const nonZeroBalances = walletData.filter(item =>
      parseFloat(item.available) > 0 || parseFloat(item.frozen) > 0
    );

    if (nonZeroBalances.length === 0) {
      Logger.log('No non-zero balances found');
      return [];
    }

    // Format the data into the desired structure
    const balanceArray = nonZeroBalances.map(item => ({
      curcodeEX: item.currency,
      balance: parseFloat(item.available)
    }));

    Logger.log('Formatted Balance Data:', balanceArray);
    return balanceArray;

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    throw error;
  }
}

function MRT_PublicRequest(MRTrequest) {
  return {
    uri: MRTrequest.uri + MRTrequest.command,
    params: {
      method: MRTrequest.method,
      muteHttpExceptions: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  };
}

function MRT_PrivateRequest(MRTrequest) {
  function HMACSHA256HEX(s, secret) {
    return ToHex(Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, s, secret)).toString();
  }

  function ToHex(s) {
    return s.map(byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
  }

  const timestamp = Date.now().toString();
  const signString = timestamp + '#' + MRTrequest.thirdattrib + '#' + MRTrequest.payload;

  return {
    uri: MRTrequest.uri + MRTrequest.command,
    params: {
      method: MRTrequest.method,
      muteHttpExceptions: true,
      headers: {
        'Content-Type': 'application/json',
        'X-BM-KEY': MRTrequest.apikey,
        'X-BM-SIGN': HMACSHA256HEX(signString, MRTrequest.secret),
        'X-BM-TIMESTAMP': timestamp,
        'X-BM-MEMO': MRTrequest.thirdattrib
      }
    }
  };
}
