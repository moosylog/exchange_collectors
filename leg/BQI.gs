function BQI_GetBalances(){
  var apikey          = EXKEY,     // * Future
      secret          = EXSECRET,  // * Future
      e_address       = ADATTRIB,
      array           = [],
      params          = {       
          method             :  'POST',
          headers            :   {'Content-Type': 'application/json'},          
         };
 e_address       = '0xbf52f2ab39e26e0951d2a02b49b7702abe30406a'; 
 url_orcamentos = 'https://graphql.bitquery.io?query={ethereum{address(address:{is:"'+e_address+'"}){balances{currency{symbol}value}}}}'
  var url = encodeURI(url_orcamentos)
  var response = UrlFetchApp.fetch(url,params);
  var dataAll = JSON.parse(response); 
  var dat = dataAll.data.ethereum.address[0].balances;
  Logger.log(dat);
  
  for (r in dat) {    
   //Logger.log(dataAll.data.ethereum);
     array.push({
       curcodeEX: dat[r].currency.symbol, 
       balance: dat[r].value
     });   
   
  }
  Logger.log("*********************");
  Logger.log(array);
  return array;
 // ** Menu, View Logs to see the output
}