# Cryptocurrency Exchange Collectors


![Moosy Research](https://sites.google.com/site/moosyresearch/_/rsrc/1511269486745/projects/cryptos/doc/logo.png)

Moosy Research is the leader in Google Sheets based cryptocurrency sheets. Our mission is to build and support the best cryptocurrency spreadsheets that help investors to manage their assets. If you are looking for a cool sheet, have a look at [Cointrexer, BotMon and ReX](https://sites.google.com/view/moosyresearch).

To access a users private data on an exchange, API authentication is required.
Most exchanges require API authentication based on a public/private key pair and a cryptographic signature such as Secure Hash Algorithms (SHA) combined with hash-based message authentication code (HMAC). The challenge however is that all exchanges do their authentication slidely different and use different attributes in the http header for the authentication and/or signing of the request.
Moosy Research created 50+ exchange specific collectors to authenticate and todo these private requests for [our own cyptosheets](https://sites.google.com/view/moosyresearch). A selection of our collectors is open source and published below.


**Howto use these code examples:**

- Scroll down and copy one of the .gs files into your [Google Apps Script ide](https://script.google.com/intro) 

- Disable the V8 runtime if you have any issues with this code !!!

- Pop-in your API keys and select run from the menu.

- The result can be viewed from the Apps Script built-in Logger 

Please **★ Star** on the top of this page if you like this page and you want to motivate me to publish more.

To explore these lovely APIs from Google Sheets you can use our [ReX Tools](https://sites.google.com/view/moosyresearch). ReX Explorer is a Sheet and Script that allows you to see the request and the response data. **ReX Explorer** is great for **educational purposes**; the script log will show details on complete HTTP/REST request and response. To view the log from Google Sheets select: Tools, Script Editor, View, Logs. **ReX Builder** is tool for you to create your own cryptosheet. 


Enjoy,

Moosy

<sub>Your donation is highly appreciated => ETH 0x4a15c8a7aeb99ae02c0a4fae53a34ae34aa9b438 </sub>


# Exchanges

| Exchange | Id   | OSS                                                          | CtrXL | ReXB | API                                                          | Signature                                |
| ------ | ---- | ------------------------------------------------------------ | ---- | ------------------------------------------------------------ | ---------------------------------------- | ------ |
| Bibox          | BBX  | cointrexer | ✓ |  | [ ]()                                                        | HMACMD5                                  |
| Binance        | BIN  | [binance.gs](https://github.com/moosylog/exchange_collectors/blob/master/binance.gs) | ✓ | ✓ | [v3](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md) | HMACSHA256HEX                            |
| Bit2C          | B2C  | cointrexer | ✓ |  | [ ]()                                                        | HMACSHA512B64                            |
| BitGo          | xxx  | not possible |      |      | [v2](https://app.bitgo.com/docs/#operation/v2.wallet.get)    | impossible / IP chk |
| Bitfinex       | BFX  | [bitfinex.gs](https://github.com/moosylog/exchange_collectors/blob/master/bitfinex.gs) | ✓ | ✓ | [v2](https://docs.bitfinex.com/docs/introduction)            | HMACSHA384HEX                            |
| Bitflyer       | FLY  | [bitflyer.gs](https://github.com/moosylog/exchange_collectors/blob/master/bitflyer.gs) | ✓ |  | [v1](https://lightning.bitflyer.com/docs?lang=en)            | HMACSHA256HEX                            |
| Bitforex | FOR | cointrexer & rex | ✓ | ✓ |  | HMACSHA256HEX |
| Bitget         |     | todo |      |      | [v1](https://bitgetlimited.github.io/apidoc/en/swap/#the-signature) | HMACSHA256B64                            |
| Bitmart        | MRT  | [bitmart.gs](https://github.com/moosylog/exchange_collectors/blob/master/bitmart.gs) | ✓ | ✓ | [v1](https://developer-pro.bitmart.com/en/part1/start/overview.html) | HMACSHA256HEX                            |
| Bitmex         | BMX  | [bitmex.gs](https://github.com/moosylog/exchange_collectors/blob/master/bitmex.gs) | ✓ | ✓ | [v1](https://www.bitmex.com/app/apiOverview)                 | HMACSHA256HEX                            |
| Bitpanda       | PAN  | cointrexer | ✓ |  |                                             |                                          |
| Bitpanda GE    | PGE  | cointrexer | ✓ |  |                                             |                                          |
| Bitsane        | BSN  | cointrexer | ✓ |  |                                                         | HMACSHA384HEX                            |
| Bittrex        | BTX  | [bittrex.gs](https://github.com/moosylog/exchange_collectors/blob/master/bittrex.gs) | ✓ | ✓ | [v3](https://bittrex.github.io/api)                          | HMACSHA512HEX                            |
| Bitso          | BSO  | cointrexer | ✓ |  | [ ]()                                                        | HMACSHA256HEX                            |
| ByteTrade      |     | todo |      |      | [v2](https://docs.byte-trade.com)                            | HMACSHA256HEX                            |
| BKex           | KEX  | cointrexer & rex | ✓ | ✓ | [ ]()                                                        | HMACSHA256HEX                            |
| Bitstamp       | BTS  | cointrexer | ✓ |  | [ ]()                                                        | HMACSHA256HEX                            |
| Bitvavo        | VAV  | cointrexer | ✓ |  | [ ]()                                                        | HMACSHA256HEX                            |
| Bitmax |  | todo |  | | [v1](https://bitmax-exchange.github.io/bitmax-pro-api/#authenticate-a-restful-request) | HMACSHA256B64 |
| Bitz           |     | todo |      |      | [v2](https://apidocv2.bitz.ai/en/#signature-authentication) | HMACSHA256B64                            |
| BtcTurk        | BTK  | cointrexer | ✓ |  | [ ]()                                                        | HMACSHA256B64enc                         |
| BTSE           |     | [todo](https://www.btse.com/apiexplorer/spot/#generating-api-key) |      |      | [v3](https://github.com/btsecom/api-sample/blob/master/python/spot/btseauth_spot.py) | HMACSHA384HEX                            |
| Bybit          | BYB  | [bybit.gs](https://github.com/moosylog/exchange_collectors/blob/master/bybit.gs) | ✓ | ✓ | [v1](https://github.com/bybit-exchange/bybit-official-api-docs) | HMACSHA256HEX                            |
| Cex.io         | CEX  | cointrexer | ✓ |  | [ ]()                                            |                                          |
| Coinall        | ALL  | cointrexer | ✓ |  | [ ]()                                            |                                          |
| Coinbase       | CNB  | [coinbase.gs](https://github.com/moosylog/exchange_collectors/blob/master/coinbase.gs) | ✓ |  | [v2](https://developers.coinbase.com/)                       | HMACSHA256HEX                            |
| Coinbase Pro   | GD   | cointrexer & rex | ✓ | ✓ | [ ]()                                            |                                          |
| CoinDCX        | DCX  | cointrexer | ✓ |  | [ ]()                                            |                                          |
| CoinEx         | CNX  | cointrexer | ✓ |  | [ ]()                                            |                                          |
| CoinONE        |     | [todo](https://doc.coinone.co.kr/)                          |      |      | [v2](https://doc.coinone.co.kr/#tag/Account-V2)              | HMACSHA512HEX                            |
| Coinsbit |  | todo | | | [v1](https://www.notion.so/API-COINSBIT-WS-API-COINSBIT-cf1044cff30646d49a0bab0e28f27a87) | HMACSHA512 |
| CoinTiger |  | todo | | | [v2](https://github.com/cointiger/api-docs-en/wiki/Trading-API-Sign-Rules) | HMACSHA512HEX |
| Crex24         | C24  | cointrexer | ✓ |  | [ ]()                                                        | HMACSHA256B64                            |
| Crypto APIs    | CRA  | [cryptoapis.gs](https://github.com/moosylog/exchange_collectors/blob/master/cryptoapis.gs) | ✓ |  | [v1](https://docs.cryptoapis.io/)                            | none                                     |
| Currency com   | CUR  | cointrexer & rex | ✓ | ✓ | [ ]()                                            |                                          |
| DCX            | DCX  | cointrexer | ✓ |  | [ ]()                                                        | HMACSHA256HEX                            |
| Delta-Exchange | DEL  | [delta_exchange.gs](https://github.com/moosylog/exchange_collectors/blob/master/delta_exchange.gs) | ✓ | ✓ | [v2](https://docs.delta.exchange/)                           | HMACSHA256HEX                            |
| Deribit        | DRB  | cointrexer & rex | ✓ | ✓ |                                             | Barrier Token |
| DeversiFi      |     | [Todo](https://github.com/DeversiFi/api-documentation/blob/master/trading/js/GetBalance.js) |     |     | [v1](https://docs.deversifi.com/docs#postV1TradingRGetbalance) | ?                                        |
| eToro          | TOR | rex |     | ✓   | [?]()                                                        | not sure latest version          |
| eToroX         | TOX | rex |     | ✓   | [v2](https://sites.google.com/site/moosyresearch/projects/cryptos/doc/exchanges#TOC-eToroX) | not sure latest version               |
| Forex          |   | bitforex?  is it the same                                           | .    |     |                                             |                                          |
| FTX            | FTX  | cointrexer & rex | ✓ | ✓ | [ ]()                                            |                                          |
| Gate.io        | GAT  | cointrexer | ✓ |  | [ ]()                                            |                                          |
| Gemini         | GEM  | [gemini.gs](https://github.com/moosylog/exchange_collectors/blob/master/gemini.gs) | ✓ | ✓ | [v1](https://docs.gemini.com/rest-api/)                      | HMACSHA384HEX                            |
| Globitex       | .    | [todo](https://globitex.com/api/#restAuthentication)         |      |      | [v?](https://globitex.com/api/#restAuthentication)           | HMACSHA512HEX                            |
| BitBTC         | HIT  | cointrexer | ✓ |  | [ ]()                                            |                                          |
| Hotbit |  | todo |  | | ? | ? |
| Huobi Pro      | HUB  | [huobi.gs](https://github.com/moosylog/exchange_collectors/blob/master/huobi.gs) |      |      | [v1](https://github.com/huobiapi/API_Docs_en)                | HMACSHA256B64                            |
| Idex           | IDX  | [idex.gs](https://github.com/moosylog/exchange_collectors/blob/master/idex.gs) | ✓ |  | [v2](https://docs.idex.io)                                   | HMACSHA256HEX                            |
| Indodax        | IND  | cointrexer | ✓ |  |                                             |                                          |
| Kraken         | KRK  | [kraken.gs](https://github.com/moosylog/exchange_collectors/blob/master/kraken.gs) | ✓ | ✓ | [v1](https://www.kraken.com/features/api#private-user-data)  | HMACSHA512++                             |
| Kucoin         | KUC  | cointrexer | ✓ |  |                                             |                                          |
| Liquid         | Liq  | cointrexer | ✓ |  |                                             |                                          |
| Luno           | LUN  | cointrexer | ✓ |  |                                                         | none                                     |
| MXC            | MXC  | cointrexer & rex | ✓ | ✓ |                                             | HMACSHA256HEX |
| Namebase       | NMB  | cointrexer | ✓ | ✓ |                                             |                                          |
| Nominex        | NOM  | cointrexer | ✓ |  |                                             |                                          |
| Okex           | OKX  | [okex.gs](https://github.com/moosylog/exchange_collectors/blob/master/okex.gs) | ✓     | ✓     | [v3](https://www.okex.com/docs/en/)                          | HMACSHA256B64                            |
| OkCoin         | OKC  | cointrexer & rex | ✓ | ✓ | [v3](https://www.okcoin.com/docs/en/)                        | HMACSHA256B64                            |
| OANDA          | OAN  | [oanda.gs](https://github.com/moosylog/exchange_collectors/blob/master/oanda.gs) | ✓ | ✓ (-) | [v2](http://developer.oanda.com/rest-live-v20/account-ep/)   | Barrier Token                            |
| Gopax          | PAX  | cointrexer | ✓ |  |                                             |                                          |
| Paribu |  | todo |  | | | ?? |
| Phemex         | PMX  | cointrexer & rex | ✓ | ✓ |                                             |                                          |
| Poloniex       | POL  | [poloniex.gs](https://github.com/moosylog/exchange_collectors/blob/master/poloniex.gs) | ✓ |  | [v1](https://docs.poloniex.com)                              | HMACSHA512HEX                            |
| Probit         | PRB  | cointrexer & rex | ✓ | ✓ |                                             |                                          |
| SimpleFX       | SMP  | cointrexer & rex | ✓ | ✓ |                                             | Barrier Token |
| Redot          |     | is it possible? |      |      | [v1](https://docs.redot.com/?shell#message-structure)        | [Fin FIX API](https://globitex.com/api/) |
| Ukex           |     | todo |      |      | [v?](https://www.ukex.com/en-us/article/api)                 | HMACSHA512???                            |
| Upbit          | UPB  | cointrexer | ✓ |  |                                             |                                          |
| Vinex Network  | VNX  | cointrexer | ✓ |  |                                             |                                          |
| VccExchange |  | todo |  | | [v3](https://vcc.exchange/api/#authentication) | HMACSHA256HEX |
| Yobit          | YBT  | cointrexer | ✓ |  |                                             |                                          |
| Zerohash       | ZHS  | cointrexer & rex | ✓ | ✓ | [v1](https://zerohash.com/api/web/)                          | HMACSHA256B64                            |


***
feedback or requests: moosylog@gmail.com

If you don't tell me, how can I know?
***

###### hmac sha cryptos cryptocurrency cryptocurrencies exchange sign sigature signing private request authentication authenticate google sheets google script javascript gas Google Sheets automatic creation with Google Apps Script (GAS) for managing a cryptocurrency tracking spreadsheet Google Sheets script editor code for managing a cryptocurrency tracking spreadsheet

*** Moosy Research: Cool Cryptocurrency Sheets ***
Because nothing is as flexible and easy to work with as a spreadsheet!



