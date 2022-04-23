function STD_PrivateRequest(STDrequest) { STD_PublicRequest(STDrequest); }
function STD_PublicRequest(STDrequest) {

      if ( STDrequest.payload != '' ) STDrequest.payload = CreateURIQueryString(STDrequest.payload,"?");
      
      return  { uri: STDrequest.uri+STDrequest.command+STDrequest.payload};
}
