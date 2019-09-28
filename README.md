# Exchange Collectors


![Moosy Research](https://sites.google.com/site/moosyresearch/_/rsrc/1511269486745/projects/cryptos/doc/logo.png)
Moosy Research cryptocurrency sheet, like [Cointrexer, CtrXL and BotMon](https://sites.google.com/site/moosyresearch/projects/cryptos) use Exchange Collectors to fetch data from Exchanges.

Most cryptocurrency Exchanges provide powerful API consisting of REST endpoints for transactional operations.
In order to authenticate to an Exchange API requires a valid API Key and a secret are required to access the private endpoints.

Many APIs require a signature during authentication that is calculated based on an algorithm like SHA.
This is a collection of Google App Script (GAS) functions for Signed / Private Requests to request a balance.

These sample code snippets authenticate to the API and will list your balance.


# Available

Symbol   | Exchange | Code   | API| Signature      
---------| -------- |------- | ---| ---------     
BIN | Binance | [binance.gs](https://github.com/moosylog/exchange_collectors/blob/master/binance.gs)    | [v3](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md) | HMACSHA256HEX | 
BFX |Bitfinex | [bitfinex.gs](https://github.com/moosylog/exchange_collectors/blob/master/bitfinex.gs)   | [v2](https://docs.bitfinex.com/docs/introduction) | HMACSHA384HEX 
BMX |Bitmex | [bitmex.gs](https://github.com/moosylog/exchange_collectors/blob/master/bitmex.gs)     | [v1](https://www.bitmex.com/app/apiOverview) | HMACSHA256HEX 
BTX |Bittrex | [bittrex.gs](https://github.com/moosylog/exchange_collectors/blob/master/bittrex.gs)    | [v3](https://bittrex.github.io/api) | HMACSHA512HEX 
HUB |Huobi Pro | [huobi.gs](https://github.com/moosylog/exchange_collectors/blob/master/huobi.gs)  | [v1](https://github.com/huobiapi/API_Docs_en) | HMACSHA256B64 
POL |Poloniex | [poloniex.gs](https://github.com/moosylog/exchange_collectors/blob/master/poloniex.gs)  | [--](https://docs.poloniex.com) | HMACSHA512HEX 



# Wishlist

Exchange     | Signature
------------ | -------------
Bitpay       | ECDSA  [secp256k1](https://github.com/cryptocoinjs/secp256k1-node/)
 ..          | Elliptic Curve Digital Signature Algorithm (ECDSA) 
Paradex      | ECSIGN ethereumjs with utils.ecsign



***

moosylog@gmail.com

***

###### index: hmac sha cryptos cryptocurrency cryptocurrencies sign sample jwt 
