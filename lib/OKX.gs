var _0x31ff=['msgBox','URL\x20....','HMAC_SHA_256','name','parse','push','stringify','hasOwnProperty','224835sZCFJW','35kUhdTX','2OyBMUs','toLowerCase','apikey','143602KGihjI','currency','command','2009Oftaha','method','1383hwwXrz','undefined','97cuDZwu','www.okex.com','thirdattrib','OKX','1JytpSu','19636IDXvVt','/api/account/v3/wallet','formatDate','No\x20valid\x20JSON\x20data\x20received','balance','GET','yyyy-MM-dd\x27T\x27HH:mm:ss.SSS\x27Z\x27','uri','1175ODhLUq','length','POST','402007liFUaK','Receiving\x20data\x20from\x20','UTC','debug','secret','21QZLsNl','Validating\x20datatype\x20','base64Encode','application/json','indexOf','payload','MacAlgorithm'];var _0x4822=function(_0x4f2c9a,_0x554b1a){_0x4f2c9a=_0x4f2c9a-0x9a;var _0x31fff5=_0x31ff[_0x4f2c9a];return _0x31fff5;};(function(_0x16d8e5,_0x3b4468){var _0x5c10dc=_0x4822;while(!![]){try{var _0x1febe4=parseInt(_0x5c10dc(0xae))*parseInt(_0x5c10dc(0xba))+parseInt(_0x5c10dc(0xa3))+parseInt(_0x5c10dc(0xaf))*parseInt(_0x5c10dc(0xa0))+-parseInt(_0x5c10dc(0xaa))*parseInt(_0x5c10dc(0xb7))+-parseInt(_0x5c10dc(0xbf))*-parseInt(_0x5c10dc(0xa8))+-parseInt(_0x5c10dc(0x9f))*parseInt(_0x5c10dc(0xa6))+-parseInt(_0x5c10dc(0x9e));if(_0x1febe4===_0x3b4468)break;else _0x16d8e5['push'](_0x16d8e5['shift']());}catch(_0xdc6231){_0x16d8e5['push'](_0x16d8e5['shift']());}}}(_0x31ff,0x31fff));function OKX_Settings(){var _0x34693b=_0x4822,_0x402b8a={'id':_0x34693b(0xad),'name':'Okex','apikey':EXKEY,'secret':EXSECRET,'thirdattrib':ADATTRIB,'method':'GET','uri':_0x34693b(0xab),'version':'','command':_0x34693b(0xb0),'payload':''};if(typeof ADATTRIB!=_0x34693b(0xa9))_0x402b8a[_0x34693b(0xac)]=ADATTRIB;return _0x402b8a;}function OKX_GetBalance(){var _0x6205a9=_0x4822,_0x42da7e=OKX_Settings(),_0x4444e1={'data':null,'status':!![],'message':''},_0x147466=[],_0xf5edf3=0x0,_0x8ac2fb=OKX_PrivateRequest(_0x42da7e);DebugLog(_0x6205a9(0xc7),JSON[_0x6205a9(0x9c)](_0x8ac2fb));var _0x4444e1=UrlFetchApp['fetch'](_0x8ac2fb[_0x6205a9(0xb6)],_0x8ac2fb['params']);DebugLog(_0x6205a9(0xbb)+_0x42da7e[_0x6205a9(0xc9)],_0x4444e1);try{var _0x4444e1=JSON[_0x6205a9(0x9a)](_0x4444e1);}catch(_0x221c82){return Logger['log'](_0x6205a9(0xb2)),![];}_0x42da7e[_0x6205a9(0xac)][_0x6205a9(0xa1)]()[_0x6205a9(0xc3)](_0x6205a9(0xbd))>=0x0&&(Browser[_0x6205a9(0xc6)](_0x42da7e[_0x6205a9(0xc9)]+'\x20Connector\x20DEBUG\x20Mode:'),Browser[_0x6205a9(0xc6)](JSON[_0x6205a9(0x9c)](_0x4444e1)));try{Logger['log'](_0x6205a9(0xc0)+_0x4444e1[0x0]['balance']);}catch(_0x5e7beb){return Logger['log'](_0x4444e1),Logger['log']('no\x20or\x20empty\x20response'),null;}for(_0xf5edf3 in _0x4444e1){Number(_0x4444e1[_0xf5edf3][_0x6205a9(0xb3)])*0x186a0>0x0&&_0x147466[_0x6205a9(0x9b)]({'curcodeEX':_0x4444e1[_0xf5edf3][_0x6205a9(0xa4)],'balance':_0x4444e1[_0xf5edf3]['balance']});}return DebugLog(_0x42da7e[_0x6205a9(0xc9)]+'\x20GetBalance',JSON[_0x6205a9(0x9c)](_0x147466)),_0x147466;}function OKX_PrivateRequest(_0x351376){var _0x3feeab=_0x4822;function _0x4c4e35(_0x3ab9ef,_0x192845){var _0x378e0f=_0x4822;return Utilities[_0x378e0f(0xc1)](Utilities['computeHmacSignature'](Utilities[_0x378e0f(0xc5)][_0x378e0f(0xc8)],_0x3ab9ef,_0x192845));}var _0x52f674='';if(_0x351376[_0x3feeab(0x9d)]('payload')===![])_0x351376[_0x3feeab(0xc4)]='';if(_0x351376[_0x3feeab(0xc4)]==''||_0x351376[_0x3feeab(0xc4)]==null)_0x52f674='{}';try{var _0x52f674=JSON[_0x3feeab(0x9c)](_0x351376['payload']);}catch(_0x5040d3){var _0x52f674=_0x351376[_0x3feeab(0xc4)];}if(_0x52f674[_0x3feeab(0xb8)]<0x4)_0x52f674='';var _0x394eb4=Utilities[_0x3feeab(0xb1)](new Date(),_0x3feeab(0xbc),_0x3feeab(0xb5)),_0x65a827=_0x394eb4+_0x351376[_0x3feeab(0xa7)]+_0x351376[_0x3feeab(0xa5)]+_0x52f674;params={'method':_0x351376[_0x3feeab(0xa7)],'muteHttpExceptions':!![],'headers':{'OK-ACCESS-KEY':_0x351376[_0x3feeab(0xa2)],'OK-ACCESS-SIGN':_0x4c4e35(_0x65a827,_0x351376[_0x3feeab(0xbe)]),'OK-ACCESS-TIMESTAMP':_0x394eb4,'OK-ACCESS-PASSPHRASE':_0x351376[_0x3feeab(0xac)],'content-type':_0x3feeab(0xc2),'Accept':'application/json'}},_0x52f674='';if(_0x351376['payload']!=''&&_0x351376[_0x3feeab(0xa7)]===_0x3feeab(0xb4))_0x52f674=CreateURIQueryString(_0x351376[_0x3feeab(0xc4)],'?');return _0x351376['payload']!=''&&_0x351376[_0x3feeab(0xa7)]===_0x3feeab(0xb9)&&(params[_0x3feeab(0xc4)]=_0x351376[_0x3feeab(0xc4)],_0x52f674=''),{'uri':_0x351376[_0x3feeab(0xb6)]+_0x351376['command']+_0x52f674,'params':params};}function OKX_PublicRequest(_0x5bef73){var _0x5b7fbd=_0x4822;try{var _0x209974=CreateURIQueryString(_0x5bef73[_0x5b7fbd(0xc4)],'?');}catch(_0x18bcac){var _0x209974='';}if(_0x209974[_0x5b7fbd(0xb8)]<0x4)_0x209974='';var _0x2fa6c6={'method':_0x5bef73[_0x5b7fbd(0xa7)],'muteHttpExceptions':!![],'Content-Type':'application/json','headers':{'content-type':_0x5b7fbd(0xc2),'Accept':_0x5b7fbd(0xc2)}};return{'uri':_0x5bef73[_0x5b7fbd(0xb6)]+_0x5bef73[_0x5b7fbd(0xa5)]+_0x209974,'params':_0x2fa6c6};}