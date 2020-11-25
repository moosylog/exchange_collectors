function STD_PrivateRequest(request) {   MRT_PublicRequest(request) }

function STD_PublicRequest(request) {    
  if (request.version != undefined) request.version = "";
  if (request.payload != undefined && request.payload != null)
    if (request.payload[0] != "?")  request.payload =CreateURIQueryString(request.payload,"?");
  const params    = {
          'method'              : request.method,  
          'muteHttpExceptions'  : true,
          'headers': {        
            'Content-Type'       : 'application/json',
          } 
        }; 
   return  { uri: request.uri + request.version + request.command + request.payload, params: params };
}
