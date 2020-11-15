# Exchange Collectors


![Moosy Research](https://sites.google.com/site/moosyresearch/_/rsrc/1511269486745/projects/cryptos/doc/logo.png)

Moosy Research is recognized for it's high quality cryptocurrency sheets, [Cointrexer, BotMon and ReX](https://sites.google.com/site/moosyresearch/projects/cryptos).

Most cryptocurrency Exchanges provide powerful API consisting of REST endpoints for transactional operations.
In order to authenticate to an Exchange API requires a valid API Key and a secret are required to access the private endpoints.

Many APIs require a signature during authentication that is calculated based on an algorithm like SHA.
On this page, you find a collection of Google App Script (GAS) functions for Signed / Private Requests to several exchanges.

These sample code snippets authenticate to the API and will list your balance in the built-in Logger.

Please **★ Star** on the top of this page if you like this page and you want to motivate me to publish more.

To explore some of these APIs from Google Script, you can try [ReX](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/rex). It's an interactive API explorer in Sheets that allows you to see the request and the response data. **ReX** is great for **educational purposes**; the script log will show details on complete HTTP/REST request and response. To view the log from Google Sheets select: Tools, Script Editor, View, Logs  

Enjoy,

Moosy

<sub>Your donation is highly appreciated => ETH 0x4a15c8a7aeb99ae02c0a4fae53a34ae34aa9b438 </sub>


# Exchanges

Symbol   | Exchange | Code   | API| Signature      
---------| -------- |------- | ---| ---------     
BBX | Bibox | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
BIN | Binance | [binance.gs](https://github.com/moosylog/exchange_collectors/blob/master/binance.gs)    | [v3](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md) | HMACSHA256HEX | 
B2C | Bit2C | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
BFX |Bitfinex | [bitfinex.gs](https://github.com/moosylog/exchange_collectors/blob/master/bitfinex.gs)   | [v2](https://docs.bitfinex.com/docs/introduction) | HMACSHA384HEX 
FLY |Bitflyer | [bitflyer.gs](https://github.com/moosylog/exchange_collectors/blob/master/bitflyer.gs)   | [v1](https://lightning.bitflyer.com/docs?lang=en) | HMACSHA256HEX 
MRT |Bitmart | [bitmart.gs](https://github.com/moosylog/exchange_collectors/blob/master/bitmart.gs)     | [v1](https://developer-pro.bitmart.com/en/part1/start/overview.html) | HMACSHA256HEX 
BMX |Bitmex | [bitmex.gs](https://github.com/moosylog/exchange_collectors/blob/master/bitmex.gs)     | [v1](https://www.bitmex.com/app/apiOverview) | HMACSHA256HEX 
PAM | Bitpanda | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
PGE | Bitpanda GE | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
BSN | Bitpanda | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
BTX |Bitsane | [bittrex.gs](https://github.com/moosylog/exchange_collectors/blob/master/bittrex.gs)    | [v3](https://bittrex.github.io/api) | HMACSHA512HEX 
BSO | Bitso | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
xxx | ByteTrade | [Todo](https://docs.byte-trade.com/#get-account-balance)  | [v2](https://docs.byte-trade.com) | HMACSHA256HEX | 
KEX | BKex | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
BTS | Bitstamp | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
VAV | Bitvavo | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
BTK | BtcTurk | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
BYB |Bybit | [bybit.gs](https://github.com/moosylog/exchange_collectors/blob/master/bybit.gs)    | [v1](https://github.com/bybit-exchange/bybit-official-api-docs) | HMACSHA256HEX 
CEX |Cex.io | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
ALL |Coinall | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
CNB |Coinbase | [coinbase.gs](https://github.com/moosylog/exchange_collectors/blob/master/coinbase.gs)    | [v2](https://developers.coinbase.com/) | HMACSHA256HEX 
GDX |Coinbase Pro | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
DCX |CoinDCX | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
xxx |CoinONE | [Todo](https://doc.coinone.co.kr/)  | [v2](https://doc.coinone.co.kr/#tag/Account-V2) | HMACSHA512HEX | 
C24 |Crex24 | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
CRA |Crypto APIs | [cryptoapis.gs](https://github.com/moosylog/exchange_collectors/blob/master/cryptoapis.gs)    | [v1](https://docs.cryptoapis.io/) | none 
CUR |Currency | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
DEL |Delta-Exchange | [delta_exchange.gs](https://github.com/moosylog/exchange_collectors/blob/master/delta_exchange.gs)    | [v2](https://docs.delta.exchange/) | HMACSHA256HEX 
DRB |Deribit | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
xxx |DeversiFi | [Todo](https://github.com/DeversiFi/api-documentation/blob/master/trading/js/GetBalance.js)  | [v1](https://docs.deversifi.com/docs#postV1TradingRGetbalance) | ? | 
xxx |eToro | [Todo](https://doc.coinone.co.kr/)  | [?]() | none | 
xxx |eToroX | [ReX works](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/exchanges#TOC-eToroX)  | [v2](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/exchanges#TOC-eToroX) | RSA | 
FOR |Forex | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
FTX |FTX | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
GAT |Gate.io | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
GEM |Gemini | [gemini.gs](https://github.com/moosylog/exchange_collectors/blob/master/gemini.gs)  | [v1](https://docs.gemini.com/rest-api/) | HMACSHA384HEX 
HIT |BitBTC | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
HUB |Huobi Pro | [huobi.gs](https://github.com/moosylog/exchange_collectors/blob/master/huobi.gs)  | [v1](https://github.com/huobiapi/API_Docs_en) | HMACSHA256B64 
IDX |Idex | [idex.gs](https://github.com/moosylog/exchange_collectors/blob/master/idex.gs)  | [v2](https://docs.idex.io) | HMACSHA256HEX
IND |Indodax | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
KRK |Kraken | [kraken.gs](https://github.com/moosylog/exchange_collectors/blob/master/kraken.gs)  | [v1](https://www.kraken.com/features/api#private-user-data) | HMACSHA512++
KUC |Kucoin | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
Liq |Liquid | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
LUN |Luno | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
MXC |MXC | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
NOM |Nominex | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
OKX |Okex | [okex.gs](https://github.com/moosylog/exchange_collectors/blob/master/okex.gs)  | [v3](https://www.okex.com/docs/en/) | HMACSHA256B64 
PAX |Gopax | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
PMX |Phemex | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
POL |Poloniex | [poloniex.gs](https://github.com/moosylog/exchange_collectors/blob/master/poloniex.gs)  | [v1](https://docs.poloniex.com) | HMACSHA512HEX 
PRB |Probit | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
xxx |Redot | [Todo:](https://api.redot.com/v1/private/Accounts)  | [v1](https://docs.redot.com/?shell#message-structure) | [Fin FIX API](https://globitex.com/api/) | 
xxx |Ukex | [Todo:](https://api.redot.com/v1/private/Accounts)  | [v?](https://www.ukex.com/en-us/article/api) | HMACSHA512??? | 
UPB |Upbit | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
VNX |Vinex Network | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
YBT |Yobit | [See Cointrexer](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/ctrxl)  | [x]() | x | 
***
feedback or requests: moosylog@gmail.com

If you don't tell me, how can I know?
***

###### hmac sha cryptos cryptocurrency cryptocurrencies exchange sign sigature signing private request authentication authenticate google sheets google script

*** All CtrxL Connectors: Bibox Binance Bit2C Bitfinex bitFlyer BitForex BitMart BitMEX Bitpanda Bitpanda Global Exchange Bitsane Bitstamp Bittrex Bitso BKEX BtcTurk Bybit CEX.IO CoinAll Coinbase Coinbase Pro / GDAX CoinDCX Crex24 Cryptopia Currency.com Deribit Etherscan.io FTX Gate.IO Gemini Gopax HitBTC Huobi IDEX 2 Indodax Kraken Kucoin Liquid Luno (formerly BitX) MXC OKEx Poloniex Upbit ***



