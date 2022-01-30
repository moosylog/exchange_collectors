// THIS IS NOT WORKING CODE AND ONLY THE SIGNATURE
// BECAUSE OF THE ZERO BYTE IN THE PAYLOAD, THIS WILL ONLY WORK WITH CRYPOJS
// MAKE SURE YOU INCLUDE CRYPTOJS IN YOUR SCRIPT

function run_me(){
  var tt = {  
    apikey         : "4ebd366d-76f4-4400-a3b6-e51515d054d6",
    secret         : "fd8a1652-728b-42fe-82b8-f623e56da8850750f5bf-ce66-4ca7-8b84-93651abc723b",
    time           : "1543597115712",
    nonce          : "9675d0f8-1325-484b-9594-c9d6d3268890",
    organizationId : "da41b3bc-3d0b-4226-b7ea-aee73f94a518",
    rmethod        : "GET",
    rpath          : "/main/api/v2/hashpower/orderBook",
    rquery         : "algorithm=X16R&page=0&size=100",
    rbody          : ""
  };
  //Logger.log( " ** Sample Signature ** ");
  //Logger.log( " ** This code should output:  21e6a16f6eb34ac476d59f969f548b47fffe3fea318d9c99e77fc710d2fed798 ");
  //Logger.log( " ** Based on the example on: https://www.nicehash.com/docs/ ");
  //Logger.log( " ");
  //Logger.log( " OUTPUT:");
  Logger.log( NicehashSign (tt) );
}


function NicehashSign(my) {
  var payload = my.apikey + '\0' + my.time+ '\0' + my.nonce + '\0'+ '\0'+ my.organizationId + '\0'+ '\0'+ my.rmethod + '\0'+my.rpath+ '\0'+my.rquery;
  
  var signature = "";
  var wanted_result = "21e6a16f6eb34ac476d59f969f548b47fffe3fea318d9c99e77fc710d2fed798";
  var temp = "";
 
 
  // OPTION 1 - Utilities.computeHmacSha256Signature
  signature =  ToHex ( Utilities.computeHmacSha256Signature(payload, my.secret, Utilities.Charset.UTF_8) );
  if (signature === wanted_result) Logger.log("OPTION 1 = OK" );
  
  // OPTION 2 - HMACSHA256HEX
  signature = ToHex ( Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, payload, my.secret), Utilities.Charset.UTF8 );
  if (signature === wanted_result) Logger.log("OPTION 2 = OK" );
    
  
  // OPTION 6 - CryptoJS
  var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, my.secret); 
  temp = hmac.update(payload);
  signature = hmac.finalize().toString(CryptoJS.enc.Hex);
  if (signature === wanted_result) Logger.log("OPTION 3 = OK (cryptojs)" );
  
  return signature;
}
