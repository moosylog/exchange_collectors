var _0x285e=['1SixTxg','log','1Tnozny','PMX','HMAC_SHA_256','debug','accountBalanceEv','getTime','6662VDMCJz','BTC','secret','name','stringify','msgBox','1sOpaPv','swap','toString','Receiving\x20data\x20from\x20Phemex','Validating\x20datatype\x20','1231759RmGals','command','account','USD','balanceEv','1666043rWWkEN','/accounts/accountPositions','983437jfmMZI','14983sAtcQM','data','usd','2286rlWZrU','application/json','https://api.phemex.com/v1','indexOf','8TAhsic','ETH','parse','currency','toLowerCase','Phemex','uri','USDT','usdt','params','payload','To\x20Sheet\x5cn\x5cn','Phemex\x20Connector\x20DEBUG\x20Mode:','To\x20Sheet','/spot/wallets','eth','URL\x20....','spot','907344GwFyJm','push'];var _0x2d76=function(_0x5db368,_0x2a054d){_0x5db368=_0x5db368-0x12d;var _0x285eb0=_0x285e[_0x5db368];return _0x285eb0;};(function(_0x4b4735,_0x1cad3e){var _0x47e50e=_0x2d76;while(!![]){try{var _0x5766d6=-parseInt(_0x47e50e(0x15e))+-parseInt(_0x47e50e(0x162))*-parseInt(_0x47e50e(0x132))+-parseInt(_0x47e50e(0x144))+-parseInt(_0x47e50e(0x145))*parseInt(_0x47e50e(0x14c))+-parseInt(_0x47e50e(0x138))*-parseInt(_0x47e50e(0x142))+-parseInt(_0x47e50e(0x13d))*-parseInt(_0x47e50e(0x160))+-parseInt(_0x47e50e(0x148));if(_0x5766d6===_0x1cad3e)break;else _0x4b4735['push'](_0x4b4735['shift']());}catch(_0x152c2a){_0x4b4735['push'](_0x4b4735['shift']());}}}(_0x285e,0xd9a8d));function PMX_GetBalances(){var _0x36a1de=_0x2d76,_0x8a605b={'id':_0x36a1de(0x12d),'name':_0x36a1de(0x151),'apikey':EXKEY,'secret':EXSECRET,'command':_0x36a1de(0x15a),'uri':_0x36a1de(0x14a),'method':'get','payload':{'currency':_0x36a1de(0x133)}},_0x40aa2d=[];if(ADATTRIB['toLowerCase']()[_0x36a1de(0x14b)]('demo')>=0x0)var _0x1597d8={'code':0x0,'msg':'','data':{'account':{'accountId':0x0,'currency':_0x36a1de(0x133),'accountBalanceEv':0x0,'totalUsedBalanceEv':0x0}}};else{if(ADATTRIB['toLowerCase']()[_0x36a1de(0x14b)](_0x36a1de(0x139))>=0x0)_0x8a605b[_0x36a1de(0x13e)]=_0x36a1de(0x143);if(ADATTRIB[_0x36a1de(0x150)]()[_0x36a1de(0x14b)](_0x36a1de(0x15d))>=0x0)_0x8a605b['command']=_0x36a1de(0x15a);if(ADATTRIB[_0x36a1de(0x150)]()[_0x36a1de(0x14b)](_0x36a1de(0x147))>=0x0)_0x8a605b[_0x36a1de(0x156)]['currency']=_0x36a1de(0x140);if(ADATTRIB['toLowerCase']()['indexOf'](_0x36a1de(0x154))>=0x0)_0x8a605b[_0x36a1de(0x156)][_0x36a1de(0x14f)]=_0x36a1de(0x153);if(ADATTRIB[_0x36a1de(0x150)]()[_0x36a1de(0x14b)](_0x36a1de(0x15b))>=0x0)_0x8a605b[_0x36a1de(0x156)][_0x36a1de(0x14f)]=_0x36a1de(0x14d);DebugLog('Fetching\x20from\x20....',_0x8a605b[_0x36a1de(0x135)]);var _0x238530=PMX_PrivateRequest(_0x8a605b);DebugLog(_0x36a1de(0x15c),JSON[_0x36a1de(0x136)](_0x238530));var _0x1597d8=JSON[_0x36a1de(0x14e)](UrlFetchApp['fetch'](_0x238530['uri'],_0x238530[_0x36a1de(0x155)]));DebugLog(_0x36a1de(0x13b),_0x1597d8);try{ADATTRIB[_0x36a1de(0x14b)](_0x36a1de(0x12f))>=0x0&&Browser[_0x36a1de(0x137)](_0x36a1de(0x157)+JSON['stringify'](_0x1597d8));}catch(_0x5898dc){Logger['log']('');}}ADATTRIB[_0x36a1de(0x150)]()[_0x36a1de(0x14b)](_0x36a1de(0x12f))>=0x0&&(Browser['msgBox'](_0x36a1de(0x158)),Browser[_0x36a1de(0x137)](JSON[_0x36a1de(0x136)](_0x1597d8)));try{Logger[_0x36a1de(0x161)](_0x36a1de(0x13c)+_0x1597d8[_0x36a1de(0x146)]);}catch(_0x536822){return Logger[_0x36a1de(0x161)](_0x1597d8),Logger[_0x36a1de(0x161)]('Phemex:\x20no\x20or\x20empty\x20response'),null;}ADATTRIB[_0x36a1de(0x150)]()['indexOf']('swap')>=0x0?_0x40aa2d[_0x36a1de(0x15f)]({'curcodeEX':_0x1597d8['data'][_0x36a1de(0x13f)][_0x36a1de(0x14f)],'balance':_0x1597d8[_0x36a1de(0x146)]['account'][_0x36a1de(0x130)]}):_0x40aa2d[_0x36a1de(0x15f)]({'curcodeEX':_0x1597d8[_0x36a1de(0x146)][0x0][_0x36a1de(0x14f)],'balance':_0x1597d8[_0x36a1de(0x146)][0x0][_0x36a1de(0x141)]});try{ADATTRIB['indexOf'](_0x36a1de(0x12f))>=0x0&&Browser[_0x36a1de(0x137)]('To\x20Sheet\x5cn\x5cn'+JSON[_0x36a1de(0x136)](_0x40aa2d));}catch(_0x440d1d){Logger[_0x36a1de(0x161)]('');}return DebugLog(_0x36a1de(0x159),_0x40aa2d),_0x40aa2d;}function PMX_PrivateRequest(_0x23b264){var _0x1d1ece=_0x2d76;function _0x207a25(_0x14f6ea,_0x1faf7c){var _0x191bef=_0x2d76;return _0x27d387(Utilities['computeHmacSignature'](Utilities['MacAlgorithm'][_0x191bef(0x12e)],_0x14f6ea,_0x1faf7c))[_0x191bef(0x13a)]();}function _0x27d387(_0x545972){return _0x545972['map'](function(_0x4ce267){return('0'+(_0x4ce267&0xff)['toString'](0x10))['slice'](-0x2);})['join']('');}var _0x40632c=(new Date()[_0x1d1ece(0x131)]()+0xea60)[_0x1d1ece(0x13a)](),_0x240db6='';_0x23b264[_0x1d1ece(0x156)]!=''?_0x240db6=_0x23b264[_0x1d1ece(0x13e)]+CreateURIQueryString(_0x23b264['payload'],'')+_0x40632c:_0x240db6=_0x23b264[_0x1d1ece(0x13e)]+_0x40632c;;var _0x1caf81=_0x207a25(_0x240db6,_0x23b264[_0x1d1ece(0x134)]),_0x91014e={'method':_0x23b264['method'],'headers':{'Content-Type':_0x1d1ece(0x149),'x-phemex-request-signature':_0x1caf81,'x-phemex-request-expiry':_0x40632c,'x-phemex-access-token':_0x23b264['apikey']}};return{'uri':_0x23b264[_0x1d1ece(0x152)]+_0x23b264[_0x1d1ece(0x13e)]+CreateURIQueryString(_0x23b264['payload'],'?'),'params':_0x91014e};}function PMX_PublicRequest(_0x1d4c97){var _0x48410e=_0x2d76;const _0x30cc97={'method':_0x1d4c97['method'],'headers':{'Content-Type':'application/json'}};return{'uri':_0x1d4c97[_0x48410e(0x152)]+_0x1d4c97[_0x48410e(0x13e)],'params':_0x30cc97};}