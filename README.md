# Exchange Collectors

Moosy Research is known for a variety of Cool Cryptocurrency Sheets, like [Cointrexer, CtrXL and BotMon](https://sites.google.com/site/moosyresearch/projects/cryptos).

Most cryptocurrency Exchanges provide powerful API consisting of REST endpoints for transactional operations.
In order to authenticate to an Exchange API requires a valid API Key and a secret are required to access the private endpoints.

Many APIs require a signature during authentication that is calculated based on an algorithm like SHA.
This is a collection of Google App Script (GAS) functions for Signed / Private Requests to request a balance.

These sample code snippets authenticate to the API and will list your balance.


# Available

Exchange   | API| Signature      
---------- | ---| ---------     
[Binance](https://github.com/moosylog/exchange_collectors/blob/master/binance.gs)    | [v3](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md) | HMACSHA256HEX | 
[Bitfinex](https://github.com/moosylog/exchange_collectors/blob/master/bitfinex.gs)   | [v2](https://docs.bitfinex.com/docs/introduction) | HMACSHA384HEX 
[Bitmex](https://github.com/moosylog/exchange_collectors/blob/master/bitmex.gs)     | [v1](https://www.bitmex.com/app/apiOverview) | HMACSHA256HEX 
[Bittrex](https://github.com/moosylog/exchange_collectors/blob/master/bittrex.gs)    | [v3](https://bittrex.github.io/api) | HMACSHA512HEX 
[Huobi Pro](https://github.com/moosylog/exchange_collectors/blob/master/huobi.gs)  | [v1](https://github.com/huobiapi/API_Docs_en) | HMACSHA256B64 
[Poloniex](https://github.com/moosylog/exchange_collectors/blob/master/poloniex.gs)  | [v1](https://docs.poloniex.com) | HMACSHA512HEX 



# Wishlist

Exchange     | Signature
------------ | -------------
Bitpay       | ECDSA  
Paradex      | ECSIGN 



***

moosylog@gmail.com

***

###### Google Sheets GAS Huobi Pro  hmac sha cryptos cryptocurrency cryptocurrencies 
