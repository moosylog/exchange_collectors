var _0x2c9a=['\x2f\x61\x70\x69\x2f\x61\x63\x63\x6f\x75\x6e\x74\x2f\x76\x33\x2f\x77\x61\x6c\x6c\x65\x74','\x62\x61\x6c\x61\x6e\x63\x65','\x66\x72\x6f\x7a\x65\x6e','\x70\x75\x73\x68','\x63\x75\x72\x72\x65\x6e\x63\x79','\x6c\x6f\x67','\x77\x77\x77\x2e\x6f\x6b\x65\x78\x2e\x63\x6f\x6d','\x79\x79\x79\x79\x2d\x4d\x4d\x2d\x64\x64\x27\x54\x27\x48\x48\x3a\x6d\x6d\x3a\x73\x73\x2e\x53\x53\x53\x27\x5a\x27','\x47\x45\x54','\x63\x6f\x6d\x70\x75\x74\x65\x48\x6d\x61\x63\x53\x69\x67\x6e\x61\x74\x75\x72\x65','\x4d\x61\x63\x41\x6c\x67\x6f\x72\x69\x74\x68\x6d','\x48\x4d\x41\x43\x5f\x53\x48\x41\x5f\x32\x35\x36','\x62\x61\x73\x65\x36\x34\x45\x6e\x63\x6f\x64\x65','\x68\x74\x74\x70\x73\x3a\x2f\x2f','\x67\x65\x74','\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x6a\x73\x6f\x6e','\x70\x61\x72\x73\x65','\x67\x65\x74\x43\x6f\x6e\x74\x65\x6e\x74\x54\x65\x78\x74'];var _0xa2c9=function(_0x56b5c3,_0x318fd5){_0x56b5c3=_0x56b5c3-0x0;var _0x281ff1=_0x2c9a[_0x56b5c3];return _0x281ff1;};function OKX_GetBalances(_0x391f5f){var _0x2bbb36=[],_0x2f1246=OKX_auth(_0xa2c9('0x0'),EXKEY);if(_0x2f1246==null)return![];try{var _0x4fa072=_0x2f1246[0x1][_0xa2c9('0x1')];}catch(_0x3b6604){Logger['\x6c\x6f\x67'](_0x2f1246);return![];}for(var _0x3d3854 in _0x2f1246){if(_0x2f1246[_0x3d3854]['\x74\x79\x70\x65']!=_0xa2c9('0x2')&&_0x2f1246[_0x3d3854][_0xa2c9('0x1')]*0x2710>0x0){_0x2bbb36[_0xa2c9('0x3')]({'\x63\x75\x72\x63\x6f\x64\x65\x45\x58':_0x2f1246[_0x3d3854][_0xa2c9('0x4')],'\x62\x61\x6c\x61\x6e\x63\x65':_0x2f1246[_0x3d3854][_0xa2c9('0x1')]});}}Logger[_0xa2c9('0x5')](_0x2bbb36);return _0x2bbb36;}function OKX_GetMarkets(){return null;}function OKX_auth(_0x45c620,_0x32d562,_0x12cc9e,_0x2fbafb){var _0x2f4703=_0xa2c9('0x6'),_0x3a59df=Utilities['\x66\x6f\x72\x6d\x61\x74\x44\x61\x74\x65'](new Date(),'\x47\x4d\x54\x20\x2d\x31',_0xa2c9('0x7'));payload='',_0x30cbc2='',request='';_0x45c620=_0x45c620['\x72\x65\x70\x6c\x61\x63\x65'](/.*\/\/[^\/]*/,'');payload=_0x3a59df+_0xa2c9('0x8')+_0x45c620;signature=Utilities[_0xa2c9('0x9')](Utilities[_0xa2c9('0xa')][_0xa2c9('0xb')],payload,EXSECRET);signature=Utilities[_0xa2c9('0xc')](signature);request=_0xa2c9('0xd')+_0x2f4703+_0x45c620;var _0x30cbc2={'\x6d\x65\x74\x68\x6f\x64':_0xa2c9('0xe'),'\x68\x65\x61\x64\x65\x72\x73':{'\x4f\x4b\x2d\x41\x43\x43\x45\x53\x53\x2d\x4b\x45\x59':EXKEY,'\x4f\x4b\x2d\x41\x43\x43\x45\x53\x53\x2d\x53\x49\x47\x4e':signature,'\x4f\x4b\x2d\x41\x43\x43\x45\x53\x53\x2d\x54\x49\x4d\x45\x53\x54\x41\x4d\x50':_0x3a59df,'\x4f\x4b\x2d\x41\x43\x43\x45\x53\x53\x2d\x50\x41\x53\x53\x50\x48\x52\x41\x53\x45':ADATTRIB,'\x41\x63\x63\x65\x70\x74':_0xa2c9('0xf'),'\x43\x6f\x6e\x74\x65\x6e\x74\x2d\x54\x79\x70\x65':_0xa2c9('0xf')}};return JSON[_0xa2c9('0x10')](UrlFetchApp['\x66\x65\x74\x63\x68'](request,_0x30cbc2)[_0xa2c9('0x11')]());}