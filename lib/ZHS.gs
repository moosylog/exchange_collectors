var _0x3cfb=['parse','151091soDJOX','indexOf','method','debug','22FkrlUW','message','/accounts','HMAC_SHA_256','length','getTime','uri','69618iCcynG','1124508TUnoSE','stringify','name','asset','POST','command','Validating\x20datatype\x20','log','MacAlgorithm','computeHmacSignature','\x20Connector\x20DEBUG\x20Mode:','text/plain','1fzPeRY','Receiving\x20data\x20from\x20','323599IvYTuF','msgBox','GET','ZeroHash','hasOwnProperty','toString','balance','94wpMOvC','ZHS','https://api.zerohash.com','floor','1221784fkSTeZ','1NHgPWr','299889SJTHBe','push','payload','2150cdXTbt','\x20GetBalance','base64Encode','base64Decode','thirdattrib'];var _0x1056=function(_0x16deaf,_0x5f4625){_0x16deaf=_0x16deaf-0xd1;var _0x3cfbe5=_0x3cfb[_0x16deaf];return _0x3cfbe5;};(function(_0x17d9ca,_0x4afe26){var _0x11e5d0=_0x1056;while(!![]){try{var _0x44a828=-parseInt(_0x11e5d0(0xfd))+-parseInt(_0x11e5d0(0xe8))+-parseInt(_0x11e5d0(0xfc))*-parseInt(_0x11e5d0(0xe7))+-parseInt(_0x11e5d0(0xe6))+-parseInt(_0x11e5d0(0xe2))*-parseInt(_0x11e5d0(0xeb))+-parseInt(_0x11e5d0(0xd9))*parseInt(_0x11e5d0(0xdb))+-parseInt(_0x11e5d0(0xf5))*-parseInt(_0x11e5d0(0xf1));if(_0x44a828===_0x4afe26)break;else _0x17d9ca['push'](_0x17d9ca['shift']());}catch(_0x24305e){_0x17d9ca['push'](_0x17d9ca['shift']());}}}(_0x3cfb,0x98d14));function ZHS_Settings(){var _0xfa4ba=_0x1056,_0x5eacbc={'id':_0xfa4ba(0xe3),'name':_0xfa4ba(0xde),'apikey':EXKEY,'secret':EXSECRET,'thirdattrib':ADATTRIB,'method':_0xfa4ba(0xdd),'uri':_0xfa4ba(0xe4),'version':'','command':_0xfa4ba(0xf7),'payload':''};if(typeof ADATTRIB!='undefined')_0x5eacbc['thirdattrib']=ADATTRIB;return _0x5eacbc;}function ZHS_GetBalances(){var _0x1e935d=_0x1056,_0x327353=ZHS_Settings(),_0x219c3c={'data':null,'status':!![],'message':''},_0x168ab6=[],_0x412be7=0x0,_0x5e1ade=ZHS_PrivateRequest(_0x327353);DebugLog('URL\x20....',JSON['stringify'](_0x5e1ade));var _0x219c3c=UrlFetchApp['fetch'](_0x5e1ade[_0x1e935d(0xfb)],_0x5e1ade['params']);DebugLog(_0x1e935d(0xda)+_0x327353['name'],_0x219c3c);try{var _0x219c3c=JSON[_0x1e935d(0xf0)](_0x219c3c);}catch(_0x2a8490){return Logger[_0x1e935d(0xd4)]('No\x20valid\x20JSON\x20data\x20received'),![];}_0x327353[_0x1e935d(0xef)]['toLowerCase']()[_0x1e935d(0xf2)](_0x1e935d(0xf4))>=0x0&&(Browser[_0x1e935d(0xdc)](_0x327353[_0x1e935d(0xff)]+_0x1e935d(0xd7)),Browser['msgBox'](JSON[_0x1e935d(0xfe)](_0x219c3c)));try{Logger[_0x1e935d(0xd4)](_0x1e935d(0xd3)+_0x219c3c[_0x1e935d(0xf6)][0x0][_0x1e935d(0x100)]);}catch(_0x2b7f10){return Logger[_0x1e935d(0xd4)](_0x219c3c),Logger[_0x1e935d(0xd4)]('no\x20or\x20empty\x20response'),null;}for(_0x412be7 in _0x219c3c[_0x1e935d(0xf6)]){Number(_0x219c3c[_0x1e935d(0xf6)][_0x412be7][_0x1e935d(0xe1)])*0x186a0>0x0&&_0x168ab6[_0x1e935d(0xe9)]({'curcodeEX':_0x219c3c[_0x1e935d(0xf6)][_0x412be7]['balance'],'balance':_0x219c3c[_0x1e935d(0xf6)][_0x412be7][_0x1e935d(0x100)]});}return DebugLog(_0x327353['name']+_0x1e935d(0xec),JSON[_0x1e935d(0xfe)](_0x168ab6)),_0x168ab6;}function ZHS_PrivateRequest(_0x5c43e9){var _0x2b1a58=_0x1056;function _0x301638(_0x3642a0,_0x3973fd){var _0x106460=_0x1056;return Utilities[_0x106460(0xed)](Utilities[_0x106460(0xd6)](Utilities[_0x106460(0xd5)][_0x106460(0xf8)],Utilities[_0x106460(0xee)](Utilities[_0x106460(0xed)](_0x3642a0)),Utilities[_0x106460(0xee)](_0x3973fd)));}var _0x25c995='';if(_0x5c43e9[_0x2b1a58(0xdf)](_0x2b1a58(0xea))===![])_0x5c43e9[_0x2b1a58(0xea)]='';if(_0x5c43e9[_0x2b1a58(0xea)]==''||_0x5c43e9[_0x2b1a58(0xea)]==null)_0x25c995='{}';try{var _0x25c995=JSON['stringify'](_0x5c43e9['payload']);}catch(_0x1fa798){var _0x25c995=_0x5c43e9[_0x2b1a58(0xea)];}if(_0x25c995[_0x2b1a58(0xf9)]<0x3)_0x25c995='{}';var _0x185bdc=Math[_0x2b1a58(0xe5)](new Date()[_0x2b1a58(0xfa)]()/0x3e8)[_0x2b1a58(0xe0)]()['substring'](0x0,0xa),_0x4f863a=_0x185bdc+_0x5c43e9[_0x2b1a58(0xf3)]+_0x5c43e9[_0x2b1a58(0xd2)]+_0x25c995,_0x5e278e=_0x301638(_0x4f863a,_0x5c43e9['secret']),_0x5f35d5={'method':_0x5c43e9[_0x2b1a58(0xf3)],'muteHttpExceptions':!![],'Content-Type':_0x2b1a58(0xd8),'headers':{'X-SCX-API-KEY':_0x5c43e9['apikey'],'X-SCX-SIGNED':_0x5e278e,'X-SCX-TIMESTAMP':_0x185bdc,'X-SCX-PASSPHRASE':_0x5c43e9[_0x2b1a58(0xef)]}};_0x25c995='';if(_0x5c43e9[_0x2b1a58(0xea)]!=''&&_0x5c43e9[_0x2b1a58(0xf3)]===_0x2b1a58(0xdd))_0x25c995=CreateURIQueryString(_0x5c43e9[_0x2b1a58(0xea)],'?');return _0x5c43e9[_0x2b1a58(0xea)]!=''&&_0x5c43e9[_0x2b1a58(0xf3)]===_0x2b1a58(0xd1)&&(_0x5f35d5[_0x2b1a58(0xea)]=_0x5c43e9[_0x2b1a58(0xea)],_0x25c995=''),{'uri':_0x5c43e9[_0x2b1a58(0xfb)]+_0x5c43e9[_0x2b1a58(0xd2)]+_0x25c995,'params':_0x5f35d5};}function ZHS_PublicRequest(_0x343599){var _0x36da60=_0x1056;try{var _0x1537c4=CreateURIQueryString(_0x343599[_0x36da60(0xea)],'?');}catch(_0x3112a9){var _0x1537c4='';}var _0x376134={'method':_0x343599[_0x36da60(0xf3)],'muteHttpExceptions':!![],'Content-Type':_0x36da60(0xd8),'headers':{}};return{'uri':_0x343599['uri']+_0x343599[_0x36da60(0xd2)]+_0x1537c4,'params':_0x376134};}
