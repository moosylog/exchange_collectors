function OAN_PrivateRequest(request) {   OAN_PublicRequest(request) }

function OAN_PublicRequest(request) {    
  Browser.msgBox(JSON.stringify(request));
  if (request.version != undefined) request.version = "";
  if (request.payload != undefined && request.payload != null)
    if (request.payload[0] != "?")  request.payload =CreateURIQueryString(request.payload,"?");
  const params    = {
          'method'              : request.method,  
          'muteHttpExceptions'  : true,
          'headers': {        
            'Content-Type'       : 'application/json',
            'Authorization': 'Bearer ' + request.apikey
          } 
        }; 
   return  { uri: request.uri + request.version + request.command + request.payload, params: params };
}
