# Exchange Collectors


![Moosy Research](https://sites.google.com/site/moosyresearch/_/rsrc/1511269486745/projects/cryptos/doc/logo.png)

Moosy Research is recognized for it's high quality cryptocurrency sheets, [Cointrexer, BotMon and ReX](https://sites.google.com/site/moosyresearch/projects/cryptos).

Most cryptocurrency Exchanges provide powerful API consisting of REST endpoints for transactional operations.
In order to authenticate to an Exchange API requires a valid API Key and a secret are required to access the private endpoints.

Many APIs require a signature during authentication that is calculated based on an algorithm like SHA.
On this page, you find a collection of Google App Script (GAS) functions for Signed / Private Requests to several exchanges.

These sample code snippets authenticate to the API and will list your balance in the built-in Logger.

Please **★ Star** on the top of this page if you like this page and you want to motivate me to publish more.

To explore some of these APIs from Google Script, you can try [ReX](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/rex). It's an interactive API explorer in Sheets that allows you to see the request and the response data. **ReX** is great for **educational purposes**; the script log will show details on complete HTTP/REST request and response.

Donations: ETH 0x4a15c8a7aeb99ae02c0a4fae53a34ae34aa9b438 


# Available

Symbol   | Exchange | Code   | API| Signature      
---------| -------- |------- | ---| ---------     
BIN | Binance | [binance.gs](https://github.com/moosylog/exchange_collectors/blob/master/binance.gs)    | [v3](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md) | HMACSHA256HEX | 
BFX |Bitfinex | [bitfinex.gs](https://github.com/moosylog/exchange_collectors/blob/master/bitfinex.gs)   | [v2](https://docs.bitfinex.com/docs/introduction) | HMACSHA384HEX 
FLY |Bitflyer | [bitflyer.gs](https://github.com/moosylog/exchange_collectors/blob/master/bitflyer.gs)   | [v1](https://lightning.bitflyer.com/docs?lang=en) | HMACSHA256HEX 
MRT |Bitmart | [bitmart.gs](https://github.com/moosylog/exchange_collectors/blob/master/bitmart.gs)     | [v1](https://developer-pro.bitmart.com/en/part1/start/overview.html) | HMACSHA256HEX 
BMX |Bitmex | [bitmex.gs](https://github.com/moosylog/exchange_collectors/blob/master/bitmex.gs)     | [v1](https://www.bitmex.com/app/apiOverview) | HMACSHA256HEX 
BTX |Bittrex | [bittrex.gs](https://github.com/moosylog/exchange_collectors/blob/master/bittrex.gs)    | [v3](https://bittrex.github.io/api) | HMACSHA512HEX 
BYB |Bybit | [bybit.gs](https://github.com/moosylog/exchange_collectors/blob/master/bybit.gs)    | [v1](https://github.com/bybit-exchange/bybit-official-api-docs) | HMACSHA256HEX 
CNB |Coinbase | [coinbase.gs](https://github.com/moosylog/exchange_collectors/blob/master/coinbase.gs)    | [v2](https://developers.coinbase.com/) | HMACSHA256HEX 
GEM |Gemini | [gemini.gs](https://github.com/moosylog/exchange_collectors/blob/master/gemini.gs)  | [v1](https://docs.gemini.com/rest-api/) | HMACSHA384HEX 
HUB |Huobi Pro | [huobi.gs](https://github.com/moosylog/exchange_collectors/blob/master/huobi.gs)  | [v1](https://github.com/huobiapi/API_Docs_en) | HMACSHA256B64 
OKX |Okex | [okex.gs](https://github.com/moosylog/exchange_collectors/blob/master/okex.gs)  | [v3](https://www.okex.com/docs/en/) | HMACSHA256B64 
POL |Poloniex | [poloniex.gs](https://github.com/moosylog/exchange_collectors/blob/master/poloniex.gs)  | [v1](https://docs.poloniex.com) | HMACSHA512HEX 

***
feedback: moosylog@gmail.com

If you don't tell me, how can I know?
***

###### hmac sha cryptos cryptocurrency cryptocurrencies exchange sign sigature signing private request authentication authenticate google sheets google script
