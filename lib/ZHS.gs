var _0x2384=['thirdattrib','debug','GET','substring','fetch','name','ZeroHash','stringify','19xnIVaZ','toLowerCase','toString','407254JTFwJm','apikey','text/plain','base64Encode','asset','balance','msgBox','log','23258yZctUM','20079IwCHaO','hasOwnProperty','message','floor','uri','getTime','parse','\x20GetBalance','length','17EMJWZY','base64Decode','239585tGNhEG','payload','18253NGRpBA','HMAC_SHA_256','undefined','MacAlgorithm','https://api.zerohash.com','method','indexOf','params','142453yQCvxx','169275KGKgFZ','no\x20or\x20empty\x20response','3unzfhH'];var _0x42fe=function(_0x403c7b,_0xf03c59){_0x403c7b=_0x403c7b-0x76;var _0x23846b=_0x2384[_0x403c7b];return _0x23846b;};(function(_0x1e4783,_0x40b731){var _0x2d5bdd=_0x42fe;while(!![]){try{var _0x3ca472=-parseInt(_0x2d5bdd(0x81))*-parseInt(_0x2d5bdd(0x8d))+parseInt(_0x2d5bdd(0x96))*-parseInt(_0x2d5bdd(0x9a))+-parseInt(_0x2d5bdd(0x98))*-parseInt(_0x2d5bdd(0x78))+-parseInt(_0x2d5bdd(0x8c))+-parseInt(_0x2d5bdd(0x84))+parseInt(_0x2d5bdd(0x76))+-parseInt(_0x2d5bdd(0xa2));if(_0x3ca472===_0x40b731)break;else _0x1e4783['push'](_0x1e4783['shift']());}catch(_0x50aaef){_0x1e4783['push'](_0x1e4783['shift']());}}}(_0x2384,0x5e4d9));function ZHS_Settings(){var _0x4f1c5c=_0x42fe,_0x26cbfa={'id':'ZHS','name':_0x4f1c5c(0x7f),'apikey':EXKEY,'secret':EXSECRET,'thirdattrib':ADATTRIB,'method':_0x4f1c5c(0x7b),'uri':_0x4f1c5c(0x9e),'version':'','command':'/accounts','payload':''};if(typeof ADATTRIB!=_0x4f1c5c(0x9c))_0x26cbfa[_0x4f1c5c(0x79)]=ADATTRIB;return _0x26cbfa;}function ZHS_GetBalances(){var _0x2d4d54=_0x42fe,_0x2b173d=ZHS_Settings(),_0x22e62b={'data':null,'status':!![],'message':''},_0x29fae3=[],_0xdd076f=0x0,_0x209f68=ZHS_PrivateRequest(_0x2b173d);DebugLog('URL\x20....',JSON[_0x2d4d54(0x80)](_0x209f68));var _0x22e62b=UrlFetchApp[_0x2d4d54(0x7d)](_0x209f68[_0x2d4d54(0x91)],_0x209f68[_0x2d4d54(0xa1)]);DebugLog('Receiving\x20data\x20from\x20'+_0x2b173d[_0x2d4d54(0x7e)],_0x22e62b);try{var _0x22e62b=JSON[_0x2d4d54(0x93)](_0x22e62b);}catch(_0x2952a5){return Logger[_0x2d4d54(0x8b)]('No\x20valid\x20JSON\x20data\x20received'),![];}_0x2b173d['thirdattrib'][_0x2d4d54(0x82)]()[_0x2d4d54(0xa0)](_0x2d4d54(0x7a))>=0x0&&(Browser[_0x2d4d54(0x8a)](_0x2b173d[_0x2d4d54(0x7e)]+'\x20Connector\x20DEBUG\x20Mode:'),Browser[_0x2d4d54(0x8a)](JSON[_0x2d4d54(0x80)](_0x22e62b)));try{Logger[_0x2d4d54(0x8b)]('Validating\x20datatype\x20'+_0x22e62b[_0x2d4d54(0x8f)][0x0][_0x2d4d54(0x88)]);}catch(_0x2baf0c){return Logger[_0x2d4d54(0x8b)](_0x22e62b),Logger[_0x2d4d54(0x8b)](_0x2d4d54(0x77)),null;}for(_0xdd076f in _0x22e62b['message']){Number(_0x22e62b[_0x2d4d54(0x8f)][_0xdd076f][_0x2d4d54(0x89)])*0x186a0>0x0&&_0x29fae3['push']({'curcodeEX':_0x22e62b[_0x2d4d54(0x8f)][_0xdd076f][_0x2d4d54(0x88)],'balance':_0x22e62b[_0x2d4d54(0x8f)][_0xdd076f][_0x2d4d54(0x89)]});}return DebugLog(_0x2b173d[_0x2d4d54(0x7e)]+_0x2d4d54(0x94),JSON['stringify'](_0x29fae3)),_0x29fae3;}function ZHS_PrivateRequest(_0x204a64){var _0x3ac4de=_0x42fe;function _0x23002c(_0x1d87e6,_0x358719){var _0x1c1edb=_0x42fe;return Utilities[_0x1c1edb(0x87)](Utilities['computeHmacSignature'](Utilities[_0x1c1edb(0x9d)][_0x1c1edb(0x9b)],Utilities[_0x1c1edb(0x97)](Utilities[_0x1c1edb(0x87)](_0x1d87e6)),Utilities[_0x1c1edb(0x97)](_0x358719)));}var _0x42c1c9='';if(_0x204a64[_0x3ac4de(0x8e)](_0x3ac4de(0x99))===![])_0x204a64['payload']='';if(_0x204a64['payload']==''||_0x204a64[_0x3ac4de(0x99)]==null)_0x42c1c9='{}';try{var _0x42c1c9=JSON[_0x3ac4de(0x80)](_0x204a64[_0x3ac4de(0x99)]);}catch(_0x169e14){var _0x42c1c9=_0x204a64[_0x3ac4de(0x99)];}if(_0x42c1c9[_0x3ac4de(0x95)]<0x3)_0x42c1c9='{}';var _0x1ad5e4=Math[_0x3ac4de(0x90)](new Date()[_0x3ac4de(0x92)]()/0x3e8)[_0x3ac4de(0x83)]()[_0x3ac4de(0x7c)](0x0,0xa),_0x57b197=_0x1ad5e4+_0x204a64[_0x3ac4de(0x9f)]+_0x204a64['command']+_0x42c1c9,_0x4ef751=_0x23002c(_0x57b197,_0x204a64['secret']),_0x41f07f={'method':_0x204a64[_0x3ac4de(0x9f)],'muteHttpExceptions':!![],'Content-Type':'text/plain','headers':{'X-SCX-API-KEY':_0x204a64[_0x3ac4de(0x85)],'X-SCX-SIGNED':_0x4ef751,'X-SCX-TIMESTAMP':_0x1ad5e4,'X-SCX-PASSPHRASE':_0x204a64['thirdattrib']}};_0x42c1c9='';if(_0x204a64[_0x3ac4de(0x99)]!=''&&_0x204a64[_0x3ac4de(0x9f)]===_0x3ac4de(0x7b))_0x42c1c9=CreateURIQueryString(_0x204a64[_0x3ac4de(0x99)],'?');return _0x204a64[_0x3ac4de(0x99)]!=''&&_0x204a64['method']==='POST'&&(_0x41f07f[_0x3ac4de(0x99)]=_0x204a64[_0x3ac4de(0x99)],_0x42c1c9=''),{'uri':_0x204a64[_0x3ac4de(0x91)]+_0x204a64['command']+_0x42c1c9,'params':_0x41f07f};}function ZHS_PublicRequest(_0x4abf4c){var _0x8a1f87=_0x42fe;try{var _0x3f6498=CreateURIQueryString(_0x4abf4c[_0x8a1f87(0x99)],'?');}catch(_0x3218b5){var _0x3f6498='';}var _0x104179={'method':_0x4abf4c[_0x8a1f87(0x9f)],'muteHttpExceptions':!![],'Content-Type':_0x8a1f87(0x86),'headers':{}};return{'uri':_0x4abf4c[_0x8a1f87(0x91)]+_0x4abf4c['command']+_0x3f6498,'params':_0x104179};}