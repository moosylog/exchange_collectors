function XXX_PrivateRequest(request) {   MRT_PublicRequest(request) }

function XXX_PublicRequest(request) {    
  if (request.version != undefined) request.version = "";
  if (request.payload != undefined && request.payload != null)
    if (stn.payload[0] != "?")  stn.payload =CreateURIQueryString(stn.payload,"?");
  const params    = {
          'method'              : request.method,  
          'muteHttpExceptions'  : true,
          'headers': {        
            'Content-Type'       : 'application/json',
          } 
        }; 
   return  { uri: request.uri + request.version + request.command , params: params };
}
