'use strict';
const M=globalThis.MCG,$=id=>document.getElementById(id);let settings={...M.defaults,enabled:false,showInfo:false},worker=null,deadline=0,revision=0,currentResult=null,savedKey='',scanStatusKey='',savedTimer=0,sampleValue=null;
function sync(){M.setLocale(settings.language);M.translatePage();document.title='MailContext Guard · '+M.t('options');updateFileName();$('saved').textContent=savedKey?M.t(savedKey):'';$('scanStatus').textContent=scanStatusKey?M.t(scanStatusKey):'';const options=[['auto',M.t('auto')],...Object.entries(M.languageNames)];$('language').replaceChildren(...options.map(([v,t])=>M.el('option',t,{value:v})));$('language').value=settings.language;$('enabled').checked=settings.enabled;$('showInfo').checked=settings.showInfo;$('activeLine').hidden=false;$('activeText').textContent=M.t(settings.enabled?'active':'paused');$('activeLine').querySelector('.dot').classList.toggle('off',!settings.enabled);if(currentResult)M.renderResult(currentResult,$('results'));}
async function save(next){const r=await chrome.runtime.sendMessage({type:'SET_SETTINGS',settings:next});if(!r?.ok)throw new Error('Save failed');settings=r.settings;sync();setSaved('saved');}
$('save').addEventListener('click',()=>save({...settings,language:$('language').value,enabled:$('enabled').checked,showInfo:$('showInfo').checked}).catch(()=>setSaved('settingsError')));
$('language').addEventListener('change',()=>{const enabled=$('enabled').checked,showInfo=$('showInfo').checked,pristineSample=sampleValue!==null&&$('raw').value===sampleValue;if(pristineSample)invalidateInput();settings.language=$('language').value;sync();if(pristineSample)loadSample();$('enabled').checked=enabled;$('showInfo').checked=showInfo;});
$('reset').addEventListener('click',async()=>{if(confirm(M.t('resetConfirm'))){invalidateInput();$('raw').value='';$('file').value='';currentResult=null;$('results').replaceChildren();try{await save({...M.defaults});}catch{setSaved('settingsError');}}});
function stop(){revision++;worker?.terminate();worker=null;clearTimeout(deadline);$('analyze').disabled=false;}
function setSaved(key){savedKey=key;clearTimeout(savedTimer);$('saved').textContent=key?M.t(key):'';if(key==='saved')savedTimer=setTimeout(()=>{savedKey='';$('saved').textContent='';},2000);}
function setScanStatus(key){scanStatusKey=key;$('scanStatus').textContent=key?M.t(key):'';}
function updateFileName(){const file=$('file').files[0];$('fileName').textContent=file?M.t('fileSelected',{name:M.clean(file.name||'')}):M.t('fileNone');}
$('chooseFile').addEventListener('click',()=>$('file').click());
function invalidateInput(){stop();sampleValue=null;currentResult=null;$('results').replaceChildren();setScanStatus('');}
$('clear').addEventListener('click',()=>{invalidateInput();$('raw').value='';$('file').value='';$('results').replaceChildren();setScanStatus('');currentResult=null;updateFileName();});
function loadSample(){invalidateInput();$('file').value='';const escape=text=>text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');$('raw').value=sampleValue='From: Google <no-reply@accounts.google.com>\r\nSubject: '+M.t('sampleSubject').replace(/[\r\n]/g,' ')+'\r\nContent-Type: text/html; charset=utf-8\r\n\r\n<p>'+escape(M.t('sampleBody'))+' <a href="https://accounts.google.com@training.invalid/">https://accounts.google.com</a></p>';updateFileName();}
$('sample').addEventListener('click',loadSample);
$('file').addEventListener('change',()=>{invalidateInput();if($('file').files.length)$('raw').value='';updateFileName();});
$('raw').addEventListener('input',()=>{invalidateInput();$('file').value='';updateFileName();});
$('analyze').addEventListener('click',async()=>{
 stop();const rev=revision;$('analyze').disabled=true;setScanStatus('scanning');$('results').replaceChildren();currentResult=null;
 try{let input;const file=$('file').files[0];if(file){if(file.size>M.LIMIT.raw)throw new Error('Size');input=new Uint8Array(await file.arrayBuffer());}else{input=$('raw').value;if(!input.trim()||new TextEncoder().encode(input).byteLength>M.LIMIT.raw)throw new Error('Size');}
  if(rev!==revision)return;worker=new Worker('scan-worker.js');
  const fail=()=>{if(rev!==revision)return;stop();setScanStatus('error');};deadline=setTimeout(fail,5000);
  worker.onerror=fail;worker.onmessage=event=>{if(rev!==revision)return;const data=event.data;if(!data?.ok){fail();return;}currentResult=data.result;M.renderResult(currentResult,$('results'));setScanStatus('');stop();};
  worker.postMessage({input});
 }catch{if(rev!==revision)return;stop();setScanStatus('error');}
});
window.addEventListener('pagehide',()=>{stop();clearTimeout(savedTimer);sampleValue=null;$('raw').value='';$('file').value='';currentResult=null;$('results').replaceChildren();});
chrome.runtime.sendMessage({type:'GET_SETTINGS'}).then(r=>{if(!r?.ok)throw new Error('Read failed');settings=r.settings;sync();}).catch(()=>{sync();setSaved('settingsError');});
