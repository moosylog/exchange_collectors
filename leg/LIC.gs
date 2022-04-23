
function LIC_PublicRequest(stn) {LIC_PrivateRequest(stn)};
function LIC_PrivateRequest(stn) {     
  for(var k in settingsobj) Logger.log(k+'='+settingsobj[k]);  
  Browser.msgBox(JSON.stringify(stn));
}
  
function LIC_GetBalances(){

  if (ADATTRIB.toLowerCase().indexOf('keys') >= 0)  { Browser.msgBox("apikey: " +HashExkey(EXKEY,"decode")+"\\n\\nsecret: "+HashExkey(EXSECRET,"decode") ); return false;}

  var lic = GetLicObject();
  if (ADATTRIB.toLowerCase().indexOf('json') >= 0)  { Browser.msgBox(JSON.stringify(lic)); return false; }

  if (lic.data.mode.toUpperCase() === "LICENSED") { Browser.msgBox("YOU ARE LICENSED\\n\\n"+lic.data.lickey); } else
  { Browser.msgBox(lic.data.mode.toUpperCase()+'\\n\\n'+'date_start_eva: '+lic.data.date_start_eva+'\\n\\n'+'date_end_eva: '+lic.data.date_end_eva+'\\n\\n'+'dleft: '+lic.data.dleft+'\\n\\n');  }


  if (Browser.msgBox('Do you want to reset the license object and manual enter it again (Yes/No)?', Browser.Buttons.YES_NO) == 'no') return false; 
  var lic = GetLicObject('delete');

  LicValidateTrigger();
  var lic = GetLicObject();
  if (lic.data.mode.toUpperCase() === "LICENSED") { Browser.msgBox("YOU ARE LICENSED\\n\\n"+lic.data.lickey); } else
  { Browser.msgBox(lic.data.mode.toUpperCase()+'\\n\\n'+'date_start_eva: '+lic.data.date_start_eva+'\\n\\n'+'date_end_eva: '+lic.data.date_end_eva+'\\n\\n'+'dleft: '+lic.data.dleft+'\\n\\n');  }

  Browser.msgBox("Don't worry about the CONFIG tab. It will get updated (randomly) within a few cycles");

}