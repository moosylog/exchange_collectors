# Moosy Research Exchange Collectors

Most cryptocurrency Exchanges provide powerful API consisting of REST endpoints for transactional operations.
In order to authenticate to an Exchange API requires a valid API Key and a secret are required to access the private endpoints.

Many APIs require a signature during authentication that is calculated based on an algorithm like SHA.
This is a collection of Google App Script (GAS) functions for Signed / Private Requests to request a balance.

These sample code snippets to list balances
Authenticate to the API 
Returns a Balance entry for each currency for which there is either a balance or an address.

# Available

Exchange   | API| Signature
---------- | -------------
Binance    | v3 | HMACSHA256HEX
Bitfinex   | V2 | HMACSHA384HEX
Bitmex     | v1 | HMACSHA256HEX
Bittrex    | v3 | HMACSHA512HEX
Huobi Pro  | v1 | HMACSHA256B64

# Wishlist

Exchange     | Signature
------------ | -------------
Bitpay       | ECDSA  
Paradex      | ECSIGN 



***

[Moosy Research Cool Cryptocurrency Sheets](https://sites.google.com/site/moosyresearch/projects/cryptos)

moosylog@gmail.com
***

###### Google Sheets GAS Huobi Pro  hmac sha cryptos cryptocurrency cryptocurrencies 
