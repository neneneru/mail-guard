'use strict';const M=globalThis.MCG,$=id=>document.getElementById(id);let settings={...M.defaults,enabled:false,showInfo:false};
function paint(){M.setLocale(settings.language);M.translatePage();$('toggle').checked=settings.enabled;$('status').textContent=M.t(settings.enabled?'active':'paused');$('dot').classList.toggle('off',!settings.enabled);}
async function refresh(){let settingsFailed=false;try{const s=await chrome.runtime.sendMessage({type:'GET_SETTINGS'});if(!s?.ok)throw new Error('Read failed');settings=s.settings;}catch{settingsFailed=true;}paint();$('toggle').disabled=settingsFailed;$('messages').replaceChildren();$('message').textContent='';if(settingsFailed){$('message').textContent=M.t('settingsError');return;}if(!settings.enabled){$('message').textContent=M.t('paused');return;}
 try{const [tab]=await chrome.tabs.query({active:true,currentWindow:true});if(!tab?.id||!tab.url?.startsWith('https://mail.google.com/')){$('message').textContent=M.t('noGmail');return;}
  const r=await chrome.tabs.sendMessage(tab.id,{type:'GET_STATE'},{frameId:0});if(!r?.ok||!r.messages?.length){$('message').textContent=M.t('noMessages');return;}
  $('message').textContent=M.t('messages',{n:r.messages.length});for(const row of r.messages){const d=M.el('details','',{class:'message'});const summary=M.el('summary');summary.append(document.createTextNode(row.index+' · '),M.el('span',M.resultLabel(row.result),{class:'badge level-'+row.result.level}));d.append(summary);M.appendReasons(d,row.result);$('messages').append(d);}
 }catch{$('message').textContent=M.t('noMessages');}}
$('options').addEventListener('click',()=>chrome.runtime.openOptionsPage());$('refresh').addEventListener('click',refresh);
$('toggle').addEventListener('change',async()=>{try{const r=await chrome.runtime.sendMessage({type:'SET_SETTINGS',settings:{...settings,enabled:$('toggle').checked}});if(!r?.ok)throw new Error('Save failed');settings=r.settings;await refresh();}catch{paint();$('message').textContent=M.t('settingsError');}});
refresh();
window.addEventListener('pagehide',()=>$('messages').replaceChildren());
