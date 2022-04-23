function TOX_PrivateRequest(TOXrequest) {      
  const timestamp    = new Date().getTime().toString(),            // Timestamp - Number of milliseconds since epoch of the moment the signature was created (example: 1567334955567)
        nonce        = Utilities.getUuid(),                        // Random number cannot repeat
        payload      = nonce + timestamp,                          // The payload the user signs is a concatenation of the nonce and milliseconds since epoch. |  example: const payload = `${nonce}${timestamp}`;
        signature    = Utilities.base64Encode(Utilities.computeRsaSha256Signature(payload,TOXrequest.secret)),
      
        params    = {
          'method'              : TOXrequest.method,  
          'muteHttpExceptions'  : true,
          'headers': {
            'user-agent'          : 'Moosy',
            'ex-access-nonce'     : nonce,
            'ex-access-key'       : TOXrequest.apikey,
            'ex-access-timestamp' : timestamp,
            'ex-access-sign'      : signature   
            } 
        }; 
        
   return  { uri: TOXrequest.thirdattrib + TOXrequest.command + "?correlationId="+nonce, params: params };
}


function TOX_PublicRequest(TOXrequest) {   
     params    = {
          'method'              : TOXrequest.method,  
          'muteHttpExceptions'  : true,
          'headers': {
            'user-agent'          : 'Moosy',
            } 
        }; 

return  { uri: TOXrequest.thirdattrib + TOXrequest.command + "?correlationId="+nonce, params: params };
}
