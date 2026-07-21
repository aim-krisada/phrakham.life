;(function(global){'use strict'
const D_VOICE='puck'
const D_AUDIO_BASE='/audio/'
const D_SEG='.tts-seg'
const D_SKIP='section.footnotes, .footnotes'
const D_ACTIVE='tts-active'
const D_VERATTR='data-tts-ver'
const RATE_MIN=0.4
const RATE_MAX=2
const SCROLL_YIELD_MS=3500
function pathKey(){let p=(typeof location!=='undefined'?location.pathname:'')||''
p=p.replace(/^\/+/,'').replace(/\.html?$/i,'')
if(!p||p.endsWith('/'))return''
return p}
function fmtTime(sec){if(!isFinite(sec)||sec<0)sec=0
const m=Math.floor(sec/60)
const s=Math.floor(sec%60)
return m+':'+String(s).padStart(2,'0')}
function isSelectionCollapsed(){try{const s=typeof window!=='undefined'&&window.getSelection&&window.getSelection()
return!s||s.isCollapsed||String(s).length===0}catch{return true}}
function thaiTime(sec){if(!isFinite(sec)||sec<0)sec=0
const m=Math.floor(sec/60)
const s=Math.floor(sec%60)
return(m?m+' นาที ':'')+s+' วินาที'}
function createAudio(opts){opts=opts||{}
const root=opts.root
const onState=opts.onState
const AUDIO_BASE=opts.audioBase||D_AUDIO_BASE
const VOICE=opts.voice||D_VOICE
const SEG_SEL=opts.segSelector||D_SEG
const SKIP_SEL=opts.skipSelector===undefined?D_SKIP:opts.skipSelector
const ACTIVE=opts.activeClass||D_ACTIVE
const VER_ATTR=opts.verAttr||D_VERATTR
const MEDIA=opts.media||{}
const DL_PREFIX=opts.downloadPrefix||'phrakham-life'
const articleKey=typeof opts.key==='function'?opts.key:opts.key?function(){return opts.key}:pathKey
const state={status:'idle',index:0,total:0,time:0,duration:0,ready:false}
let el=null
let side=null
let segs=[]
let cur=-1
let ready=false
let rate=typeof opts.rate==='number'?opts.rate:0.8
let lastManualScroll=0
let onSegClick=null
let onUserScroll=null
let raf=0
let seqMode=false
let seq=[]
let qi=0
let seqManifest=null
let seqVerseSel=null
let seqManifestUrl=null
const SEQ_KEY_ATTR='data-vk'
let sizeBytes=0
function emit(){state.total=seqMode?seq.length:side?side.segs.length:0
state.time=el?el.currentTime||0:0
state.duration=el&&isFinite(el.duration)?el.duration:side?side.duration||0:0
state.ready=ready
if(typeof onState==='function')onState({...state})}
function setStatus(s){state.status=s;emit()}
function clearHL(){if(!root)return
root.querySelectorAll('.'+ACTIVE).forEach((e)=>e.classList.remove(ACTIVE))
cur=-1}
function scrollTo(seg){if(Date.now()-lastManualScroll<SCROLL_YIELD_MS)return
let smooth=true
try{smooth=!window.matchMedia('(prefers-reduced-motion: reduce)').matches}catch{}
try{seg.scrollIntoView({block:'nearest',behavior:smooth?'smooth':'auto'})}catch{seg.scrollIntoView()}}
function segAt(t){const a=side?side.segs:[]
if(!a.length)return-1
let lo=0,hi=a.length-1,best=0
while(lo<=hi){const mid=(lo+hi)>>1
if(a[mid].t<=t){best=mid;lo=mid+1}else hi=mid-1}
return best}
function syncHighlight(){if(seqMode)return
if(!ready||!el)return
if(state.status==='idle')return
const i=segAt(el.currentTime||0)
if(i===cur)return
cur=i
const seg=segs[i]
if(root)root.querySelectorAll(SEG_SEL+'.'+ACTIVE).forEach((e)=>e.classList.remove(ACTIVE))
if(seg){seg.classList.add(ACTIVE)
if(state.status==='playing')scrollTo(seg)}
state.index=i+1
emit()}
function startRaf(){if(raf||typeof requestAnimationFrame!=='function')return
const tick=()=>{if(!el||el.paused){raf=0;return}
syncHighlight()
raf=requestAnimationFrame(tick)}
raf=requestAnimationFrame(tick)}
function stopRaf(){if(raf){cancelAnimationFrame(raf);raf=0}}
function onVisible(){if(document.visibilityState==='visible'&&el&&!el.paused){syncHighlight();startRaf()}}
function mediaSetup(){const ms=typeof navigator!=='undefined'?navigator.mediaSession:null
if(!ms)return
try{const el0=document.querySelector(MEDIA.titleFrom||'h1.title, h1')
const title=MEDIA.title||(el0&&el0.textContent.trim())||document.title||'บทความ'
if(window.MediaMetadata){ms.metadata=new window.MediaMetadata({title,artist:MEDIA.artist||'พระคำ.ชีวิต',album:MEDIA.album||'บทความศึกษาพระคำ',artwork:MEDIA.artwork||[{src:'/assets/icons/icon-512.png',sizes:'512x512',type:'image/png'}],})}}catch{}
const set=(action,fn)=>{try{ms.setActionHandler(action,fn)}catch{}}
set('play',()=>{play()})
set('pause',()=>{pause()})
set('stop',()=>{stop()})
set('seekbackward',(d)=>nudge(-((d&&d.seekOffset)||10)))
set('seekforward',(d)=>nudge((d&&d.seekOffset)||10))
set('seekto',(d)=>{if(d&&typeof d.seekTime==='number')seekTime(d.seekTime,d.fastSeek)})
set('previoustrack',()=>{if(seqMode)seqPlay(qi-1);else seekSeg(Math.max(0,segAt(el.currentTime)-1))})
set('nexttrack',()=>{if(seqMode)seqPlay(qi+1);else seekSeg(segAt(el.currentTime)+1)})}
function mediaPos(){const ms=typeof navigator!=='undefined'?navigator.mediaSession:null
if(!ms||!ms.setPositionState||!el||!isFinite(el.duration))return
try{ms.setPositionState({duration:el.duration,position:Math.min(el.currentTime||0,el.duration),playbackRate:el.playbackRate||1,})}catch{}}
function mediaState(s){try{if(navigator.mediaSession)navigator.mediaSession.playbackState=s}catch{}}
async function load(){const key=articleKey()
if(!key||typeof fetch!=='function')return false
const base=AUDIO_BASE+key+'.'+VOICE
let json=null
try{const res=await fetch(base+'.json',{cache:'no-cache'})
if(!res.ok)return false
json=await res.json()}catch{return false}
if(!json||json.v!==1||!Array.isArray(json.segs)||!json.segs.length)return false
if(!json.audio)return false
side=json
refreshSegs()
if(!(await verify())){side=null;return false}
el=new Audio()
el.preload='metadata'
el.src=new URL(side.audio,new URL(base+'.json',location.href)).href
el.playbackRate=rate
try{el.preservesPitch=true}catch{}
el.addEventListener('timeupdate',()=>{syncHighlight();emit()})
el.addEventListener('seeking',syncHighlight)
el.addEventListener('seeked',()=>{syncHighlight();mediaPos()})
el.addEventListener('ratechange',mediaPos)
el.addEventListener('loadedmetadata',()=>{mediaPos();emit()})
el.addEventListener('play',()=>{setStatus('playing');mediaState('playing');mediaPos();startRaf()})
el.addEventListener('pause',()=>{stopRaf()
if(state.status!=='idle')setStatus('paused')
mediaState(state.status==='idle'?'none':'paused')})
el.addEventListener('ended',()=>{stopRaf();finish()})
document.addEventListener('visibilitychange',onVisible)
el.addEventListener('error',()=>{ready=false;clearHL();setStatus('idle')})
ready=true
fetch(el.src,{method:'HEAD'}).then((r)=>{const n=+r.headers.get('content-length')
if(n>0)sizeBytes=n}).catch(()=>{})
state.duration=side.duration||0
mediaSetup()
onSegClick=(e)=>{if(!ready||state.status==='idle')return
if(e.target.closest('a, button, [role="button"]'))return
if(!isSelectionCollapsed())return
const seg=e.target.closest(SEG_SEL)
if(!seg)return
const i=segs.indexOf(seg)
if(i>=0)seekSeg(i)}
if(root)root.addEventListener('click',onSegClick)
onUserScroll=()=>{lastManualScroll=Date.now()}
window.addEventListener('wheel',onUserScroll,{passive:true})
window.addEventListener('touchmove',onUserScroll,{passive:true})
emit()
return true}
const STRIP=opts.stripSelector||'[aria-hidden="true"],[hidden],.pk-verse,.pk-mapmk'
async function sha256Hex16(text){const subtle=(typeof crypto!=='undefined'&&crypto.subtle)||null
if(!subtle)return null
const buf=await subtle.digest('SHA-256',new TextEncoder().encode(text))
return[...new Uint8Array(buf)].map((b)=>b.toString(16).padStart(2,'0')).join('').slice(0,16)}
function domText(seg){const c=seg.cloneNode(true)
c.querySelectorAll(STRIP).forEach((n)=>n.remove())
return c.textContent.replace(/\s+/g,' ').trim()}
async function verify(){if(!side)return false
if(segs.length!==side.segs.length)return false
for(const s of side.segs)if(typeof s.t!=='number'||s.t<0)return false
const withHash=side.segs.filter((s)=>s.domHash)
if(!withHash.length)return true
for(let i=0;i<segs.length;i++){const want=side.segs[i].domHash
if(!want)continue
const got=await sha256Hex16(domText(segs[i]))
if(got===null)return true
if('sha256:'+got!==want)return false}
return true}
function refreshSegs(){const all=root?[...root.querySelectorAll(SEG_SEL)]:[]
const ver=(side&&side.version)||'tcv'
segs=all.filter((s)=>{if(SKIP_SEL&&s.closest(SKIP_SEL))return false
if(s.hasAttribute('hidden')||s.getAttribute('aria-hidden')==='true')return false
if(s.closest('[hidden],[aria-hidden="true"]'))return false
const v=s.getAttribute(VER_ATTR)
return!v||v===ver})}
function play(){if(!ready||!el)return
const p=el.play()
if(p&&p.catch)p.catch(()=>{})}
function pause(){if(ready&&el)el.pause()}
function toggle(){if(!ready||!el)return
if(seqMode&&state.status==='idle'){seqPlay(qi);return}
if(el.paused)play();else pause()}
function stop(){if(!ready||!el)return
el.pause()
try{el.currentTime=0}catch{}
clearHL()
state.index=0
if(seqMode){qi=0;try{el.src=seq.length?seq[0].url:''}catch{}}
setStatus('idle')
mediaState('none')}
function finish(){clearHL()
state.index=0
try{el.currentTime=0}catch{}
setStatus('idle')
mediaState('none')}
function replay(){if(!ready||!el)return
if(seqMode){try{el.currentTime=0}catch{};if(state.status!=='idle')play();return}
if(!side)return
const i=segAt(el.currentTime||0)
seekSeg(i)}
function seekTime(t,fast){if(!ready||!el)return
const d=isFinite(el.duration)?el.duration:side?side.duration:0
const v=Math.max(0,Math.min(t,d||0))
try{if(fast&&el.fastSeek)el.fastSeek(v);else el.currentTime=v}catch{}
syncHighlight()
mediaPos()}
function nudge(sec){if(el)seekTime((el.currentTime||0)+sec)}
function seekFraction(f){const d=el&&isFinite(el.duration)?el.duration:side?side.duration:0
seekTime(Math.max(0,Math.min(1,f))*d)}
function seekSeg(i){if(seqMode){seqPlay(i|0);return}
if(!side)return
const n=side.segs.length
const k=Math.max(0,Math.min(i|0,n-1))
seekTime(side.segs[k].t)}
function setRate(n){rate=Math.max(RATE_MIN,Math.min(RATE_MAX,+n||1))
if(el)el.playbackRate=rate}
function refresh(){if(seqMode)return
if(!side)return
refreshSegs()
if(segs.length!==side.segs.length){fail();return}
emit()
verify().then((ok)=>{if(!ok)fail()})}
function fail(){if(el)el.pause()
mediaState('none')
ready=false
clearHL()
state.index=0
setStatus('idle')
emit()}
function seqDomText(el){const c=el.cloneNode(true)
c.querySelectorAll(STRIP+',.sym').forEach((n)=>n.remove())
return c.textContent.replace(/\s+/g,' ').trim()}
async function collectSeq(man){const dir=(man.dir||'audio/verses').replace(/^\/+/,'').replace(/\/+$/,'')
const els=root?[...root.querySelectorAll(seqVerseSel)]:[]
const kept=[]
for(const vEl of els){const vk=vEl.getAttribute(SEQ_KEY_ATTR)
if(!vk)continue
const m=man.verses&&man.verses[vk]
if(!m||!m.file)continue
if(m.domHash){const got=await sha256Hex16(seqDomText(vEl))
if(got!==null&&'sha256:'+got!==m.domHash)continue}
kept.push({vk,ref:m.ref||vk,el:vEl,dur:m.d||0,domHash:m.domHash,url:new URL('/'+dir+'/'+m.file,location.href).href,})}
return kept}
function setSeqMedia(it){const ms=typeof navigator!=='undefined'?navigator.mediaSession:null
if(!ms||!window.MediaMetadata)return
try{ms.metadata=new window.MediaMetadata({title:it.ref,artist:MEDIA.artist||'พระคำ.ชีวิต',album:MEDIA.album||'พระคริสตธรรมคัมภีร์ · เสียงอ่าน',artwork:MEDIA.artwork||[{src:'/assets/icons/icon-512.png',sizes:'512x512',type:'image/png'}],})}catch{}}
function seqHighlight(idx){if(root)root.querySelectorAll('.'+ACTIVE).forEach((e)=>e.classList.remove(ACTIVE))
const it=seq[idx]
if(it&&it.el){it.el.classList.add(ACTIVE)
if(state.status!=='idle')scrollTo(it.el)}}
function seqPlay(idx){if(!seqMode||!el||!seq.length)return
qi=Math.max(0,Math.min(idx|0,seq.length-1))
const it=seq[qi]
el.src=it.url
seqHighlight(qi)
setSeqMedia(it)
state.index=qi+1
const p=el.play()
if(p&&p.catch)p.catch(()=>{})
emit()}
function seqNext(){if(!seqMode)return
if(qi+1<seq.length){seqPlay(qi+1);return}
clearHL()
qi=0
state.index=0
try{el.currentTime=0;el.src=seq.length?seq[0].url:''}catch{}
setStatus('idle')
mediaState('none')}
async function loadSequence(o){o=o||{}
seqVerseSel=o.verseSelector||seqVerseSel||'.pk-vseg'
seqManifestUrl=o.manifestUrl||seqManifestUrl||(AUDIO_BASE+'verses.puck.json')
if(typeof fetch!=='function')return false
if(!seqManifest){try{const res=await fetch(seqManifestUrl,{cache:'no-cache'})
if(!res.ok)return false
seqManifest=await res.json()}catch{return false}}
if(!seqManifest||!seqManifest.verses)return false
const kept=await collectSeq(seqManifest)
if(!kept.length){if(seqMode){if(el)el.pause();clearHL();state.index=0;ready=false;seqMode=false;setStatus('idle')}
return false}
const wasPlaying=seqMode&&state.status!=='idle'
seq=kept
qi=0
seqMode=true
state.kind='sequence'
if(!el){el=new Audio()
el.preload='metadata'
try{el.preservesPitch=true}catch{}
el.addEventListener('timeupdate',emit)
el.addEventListener('play',()=>{setStatus('playing');mediaState('playing');mediaPos()})
el.addEventListener('pause',()=>{if(state.status!=='idle')setStatus('paused')
mediaState(state.status==='idle'?'none':'paused')})
el.addEventListener('ended',seqNext)
el.addEventListener('error',()=>{if(seqMode&&state.status!=='idle')seqNext()})
el.addEventListener('loadedmetadata',()=>{mediaPos();emit()})
onSegClick=(e)=>{if(state.status==='idle')return
if(e.target.closest('a, button, [role="button"]'))return
if(!isSelectionCollapsed())return
const vEl=e.target.closest(seqVerseSel)
if(!vEl)return
const idx=seq.findIndex((x)=>x.el===vEl)
if(idx>=0)seqPlay(idx)}
if(root)root.addEventListener('click',onSegClick)
onUserScroll=()=>{lastManualScroll=Date.now()}
window.addEventListener('wheel',onUserScroll,{passive:true})
window.addEventListener('touchmove',onUserScroll,{passive:true})
mediaSetup()}
el.playbackRate=rate
ready=true
if(wasPlaying){el.pause();clearHL();setStatus('idle')}
el.src=seq[0].url
emit()
return true}
function destroy(){stopRaf()
document.removeEventListener('visibilitychange',onVisible)
if(root&&onSegClick)root.removeEventListener('click',onSegClick)
if(onUserScroll){window.removeEventListener('wheel',onUserScroll)
window.removeEventListener('touchmove',onUserScroll)}
if(el){el.pause();el.removeAttribute('src');el.load()}
const ms=typeof navigator!=='undefined'?navigator.mediaSession:null
if(ms)for(const a of['play','pause','stop','seekbackward','seekforward','seekto','previoustrack','nexttrack']){try{ms.setActionHandler(a,null)}catch{}}
clearHL()
ready=false
el=null}
return{load,loadSequence,toggle,play,pause,stop,replay,setRate,seekFraction,seekTime,nudge,seekSeg,refresh,destroy,get ready(){return ready},get state(){return{...state}},get duration(){return el&&isFinite(el.duration)?el.duration:side?side.duration||0:0},get currentTime(){return el?el.currentTime||0:0},get downloadUrl(){return el?el.src:''},get sizeMB(){return sizeBytes?(sizeBytes/1e6).toFixed(1):''},get downloadName(){const raw=(articleKey().split('/').pop()||'').toLowerCase()
const slug=raw.replace(/[^a-z0-9-]+/g,'-').replace(/^-+|-+$/g,'')
return`${DL_PREFIX}-${slug || 'audio'}.mp3`},get sidecar(){return side},}}
var api={createAudio:createAudio,fmtTime:fmtTime,thaiTime:thaiTime}
if(typeof module!=='undefined'&&module.exports)module.exports=api
global.PKAudio=api})(typeof window!=='undefined'?window:this)