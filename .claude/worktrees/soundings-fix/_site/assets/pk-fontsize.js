(function(global){var DEFAULT_STEPS=[0.85,1,1.15,1.30,1.50,1.75,2.0];function readNumber(key){try{var s=localStorage.getItem(key);return s==null?null:(parseFloat(s)||null);}catch(e){return null;}}
function write(target,cssVar,scale){if(target&&target.style)target.style.setProperty(cssVar,String(scale));}
function create(opts){opts=opts||{};var steps=(opts.steps&&opts.steps.length)?opts.steps.slice():DEFAULT_STEPS.slice();var key=opts.storageKey||'pk-fs';var cssVar=opts.cssVar||'--pk-fs';var target=opts.target||(global.document&&global.document.documentElement)||null;var persist=opts.persist!==false;var listeners=[];function clamp(i){return i<0?0:(i>=steps.length?steps.length-1:i);}
function nearest(v){var bi=0,bd=Infinity;for(var i=0;i<steps.length;i++){var d=Math.abs(steps[i]-v);if(d<bd){bd=d;bi=i;}}
return bi;}
var stored=readNumber(key);var idx=stored!=null?nearest(stored):nearest(1);function scale(){return steps[idx];}
function pct(){return Math.round(steps[idx]*100);}
function emit(){for(var i=0;i<listeners.length;i++){try{listeners[i](scale(),pct());}catch(e){}}}
function apply(save){write(target,cssVar,scale());if(save&&persist){try{localStorage.setItem(key,String(scale()));}catch(e){}}
emit();return scale();}
function setIdx(i,save){idx=clamp(i);return apply(save);}
var ctrl={scale:scale,pct:pct,steps:function(){return steps.slice();},canDec:function(){return idx>0;},canInc:function(){return idx<steps.length-1;},inc:function(){return setIdx(idx+1,true);},dec:function(){return setIdx(idx-1,true);},reset:function(){return setIdx(nearest(1),true);},setScale:function(f){return setIdx(nearest(f),true);},apply:function(){return apply(false);},onChange:function(fn){if(typeof fn!=='function')return function(){};listeners.push(fn);return function(){var k=listeners.indexOf(fn);if(k>=0)listeners.splice(k,1);};}};apply(false);return ctrl;}
function applyStored(opts){opts=opts||{};var key=opts.storageKey||'pk-fs';var cssVar=opts.cssVar||'--pk-fs';var target=opts.target||(global.document&&global.document.documentElement)||null;var v=readNumber(key);if(v!=null)write(target,cssVar,v);return v;}
var api={create:create,applyStored:applyStored,DEFAULT_STEPS:DEFAULT_STEPS};if(typeof module!=='undefined'&&module.exports)module.exports=api;global.PKFontSize=api;})(typeof window!=='undefined'?window:this);