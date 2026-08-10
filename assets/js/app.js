/* ==========================================================================
   Isla Extra — demo
   Il matching lavora davvero sui dati: orari reali, zone limitrofe,
   affidabilita' aggregata. Nessun risultato precotto.
   ========================================================================== */
(function () {
'use strict';

var D = IE_DATA;
var lang = 'es';
var T = IE_I18N[lang];

/* ---------------------------------------------------------------- utils - */
function t(k){ return (T && T[k]) || IE_I18N.es[k] || k; }
function el(s, r){ return (r||document).querySelector(s); }
function els(s, r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
function fmt(s, m){ return s.replace(/\{(\w+)\}/g, function(_,k){ return m[k]!==undefined?m[k]:''; }); }
function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c];}); }
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
function rint(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }

function zoneName(id){ var z=D.ZONES.filter(function(x){return x.id===id;})[0]; return z?z.name:id; }
function roleName(id){ var r=D.ROLES.filter(function(x){return x.id===id;})[0]; return r?t(r.key):id; }
function company(id){ return D.COMPANIES.filter(function(x){return x.id===id;})[0]; }
function skillName(id){ return t('sk_'+id); }

var AV=['#B35F3D','#8C4530','#023A6B','#2F6B4F','#6E675C','#7A3B57','#3E5A2E','#8A4A1F'];
function avatarColor(id){ var n=0; for(var i=0;i<id.length;i++) n=(n*31+id.charCodeAt(i))>>>0; return AV[n%AV.length]; }
function initials(n){ var p=n.trim().split(/\s+/); return (p[0][0]+(p[1]?p[1][0]:'')).toUpperCase(); }

/* -------------------------------------------------------------- orari --- */
function toHM(min){
  var m=((min%1440)+1440)%1440;
  return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');
}
function parseHM(str){
  var m=String(str).match(/^(\d{1,2})[:.]?(\d{2})?$/);
  if(!m) return null;
  var h=+m[1], mm=m[2]?+m[2]:0;
  if(h>23||mm>59) return null;
  return h*60+mm;
}
function span(a,b){ return b<=a ? b+1440 : b; }        /* fine oltre mezzanotte */
function durH(a,b){ return ((span(a,b)-a)/60); }

/* ---------------------------------------------------------------- icone - */
var ICON = {
  tray:'<path d="M4 13h16M6 13a6 6 0 0112 0M12 7V4M9 20h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  glass:'<path d="M5 4h14l-6 8v6M9 21h6M13 18v3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  pan:'<path d="M3 12h13a5 5 0 01-5 5H8a5 5 0 01-5-5zM16 12l5-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  knife:'<path d="M4 20L20 4M14 4h6v6M9 15l4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  plate:'<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  bell:'<path d="M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6M10 19a2 2 0 004 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  spray:'<path d="M7 8h6v13H7zM10 8V4h4M16 6h3M16 9h3M16 12h3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  leaf:'<path d="M4 20c0-9 6-14 16-14 0 10-5 15-13 15-1.5 0-3-.4-3-1zM7 17c2-4 5-6 9-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  wrench:'<path d="M15 5a4 4 0 105 5l-9 9a2.8 2.8 0 01-4-4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  check:'<path d="M4 12l5 5L20 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
  shield:'<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" fill="currentColor"/>',
  clock:'<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  user:'<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  link:'<path d="M9 15l6-6M11 6l1.5-1.5a4.2 4.2 0 016 6L17 12M13 18l-1.5 1.5a4.2 4.2 0 01-6-6L7 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  info:'<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v5M12 7.6v.1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  bag:'<path d="M4 8h16v12H4zM9 8V6a3 3 0 016 0v2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  bed:'<path d="M3 18v-7h18v7M3 18v2M21 18v2M3 11V7M7 11V9a2 2 0 012-2h3a2 2 0 012 2v2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  key:'<circle cx="8" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 12h9M18 12v4M21 12v3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  drop:'<path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  wave:'<path d="M3 10c2.5 0 2.5 3 5 3s2.5-3 5-3 2.5 3 5 3 2.5-3 5-3M3 16c2.5 0 2.5 3 5 3s2.5-3 5-3 2.5 3 5 3 2.5-3 5-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  anchor:'<circle cx="12" cy="5" r="2.4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v13M5 13a7 7 0 0014 0M8 11H5M19 11h-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  rope:'<path d="M6 3c4 3-4 6 0 9s-4 6 0 9M18 3c-4 3 4 6 0 9s4 6 0 9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 11a7 7 0 0014 0M12 18v3M9 21h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  star:'<path d="M12 3l2.6 5.6 6 .8-4.3 4.2 1 6L12 16.8 6.7 19.6l1-6L3.4 9.4l6-.8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  shieldline:'<path d="M12 3l8 3.5V12c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V6.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  sound:'<path d="M4 9v6h4l5 4V5L8 9H4zM17 8a6 6 0 010 8M20 5a10 10 0 010 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  run:'<circle cx="15" cy="4.5" r="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 21l3-5 3-3-1-5-4 3-2 4M14 13l3 3 1 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  box:'<path d="M3 8l9-4 9 4v9l-9 4-9-4zM3 8l9 4 9-4M12 12v9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  van:'<path d="M2 16V7h11v9M13 10h4l4 4v2h-3M2 16h3M10 16h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7" cy="17.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="17.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  bike:'<circle cx="6" cy="17" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="17" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6 17l4-8h5l3 8M9 9h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  shelf:'<path d="M4 4v16M20 4v16M4 9h16M4 15h16M4 4h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  up:'<path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'
};
function svg(n,s){ return '<svg viewBox="0 0 24 24" width="'+(s||16)+'" height="'+(s||16)+'" aria-hidden="true">'+(ICON[n]||'')+'</svg>'; }

/* tariffe orarie reali indicate da Fabio; il compenso si mostra
   come totale del turno, che e' come ragionano i locali */
var RATE={ camarero:15, barman:15, cocinero:17, ayudante:13, friegaplatos:12.5,
  recepcion:14, limpieza:13, housekeeping:13, conserje:15,
  electricista:22, fontanero:22, jardinero:22, mantenimiento:18, piscinero:20,
  patron:28, marinero:16, azafata_barco:15, limpieza_barco:14,
  pr:16, azafata:15, seguridad:17, tecnico:20, runner:13, montaje:14,
  chofer:18, rider:13, mozo:13, almacen:14 };
function rateFor(role){ return RATE[role]||14; }
function payTotal(role,a,b){ return Math.round(rateFor(role)*durH(a,b)); }

/* --------------------------------------------------------------- date --- */
function localeTag(){ return lang==='es'?'es-ES':(lang==='it'?'it-IT':'en-GB'); }
var DOW_REF = new Date(2024,0,7);
function dowShort(d){ var x=new Date(DOW_REF); x.setDate(x.getDate()+d);
  return x.toLocaleDateString(localeTag(),{weekday:'short'}).replace('.',''); }
function dayLong(d){ return new Date(d).toLocaleDateString(localeTag(),{weekday:'long'}); }
function dayNum(d){ return new Date(d).toLocaleDateString(localeTag(),{day:'numeric',month:'short'}); }
function addDays(n){ var d=new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()+n); return d; }

/* ======================================================================== */
/*  MOTORE DI MATCHING                                                      */
/* ======================================================================== */
var TRUST = { verified:1, proven:2, certified:3 };

function zoneFit(w,zone){
  if(!zone) return 2;
  if(w.zones.indexOf(zone)!==-1) return 2;
  var near=D.NEAR[zone]||[];
  for(var i=0;i<near.length;i++) if(w.zones.indexOf(near[i])!==-1) return 1;
  return 0;
}
/* il worker copre il turno se la sua finestra contiene tutto l'intervallo */
function coversShift(w,dow,start,end){
  var a=w.avail[dow];
  if(!a) return false;
  return a[0]<=start && a[1]>=span(start,end);
}
function matchWorkers(q){
  return D.WORKERS.filter(function(w){
    if(q.role && w.roles.indexOf(q.role)===-1) return false;
    if(zoneFit(w,q.zone)===0) return false;
    if(q.dow!==null && q.start!==null && q.end!==null && !coversShift(w,q.dow,q.start,q.end)) return false;
    if(q.langMin){ var lv=w.langs[q.langMin]; if(!lv||['A1','A2'].indexOf(lv)!==-1) return false; }
    if(q.trust && TRUST[w.trust]<TRUST[q.trust]) return false;
    if(q.minJobs && w.jobs<q.minJobs) return false;
    return true;
  }).sort(function(a,b){
    var z=zoneFit(b,q.zone)-zoneFit(a,q.zone); if(z) return z;
    var d=TRUST[b.trust]-TRUST[a.trust]; if(d) return d;
    return b.score-a.score;
  });
}

/* ======================================================================== */
/*  FEED                                                                    */
/* ======================================================================== */
var feedEl, feedItems=[];
function buildFeedEvent(mins){
  var tpl=pick(D.FEED_TEMPLATES), w=pick(D.WORKERS), c=pick(D.COMPANIES);
  if(tpl.type==='certify' && w.trust!=='certified')
    w=pick(D.WORKERS.filter(function(x){return x.trust==='certified';}));
  return { type:tpl.type, key:tpl.key, worker:w.name, comp:c.name, role:pick(w.roles),
           zone: tpl.type==='avail'?pick(w.zones):c.zone, score:w.score, mins:mins };
}
function feedText(it){
  return fmt(t(it.key),{ worker:'<b>'+esc(it.worker)+'</b>', company:'<b>'+esc(it.comp)+'</b>',
    role:esc(roleName(it.role)).toLowerCase(), zone:'<b>'+esc(zoneName(it.zone))+'</b>', score:it.score });
}
function agoLabel(m){
  if(m<1) return t('feed_ago_now');
  if(m<60) return fmt(t('feed_ago_min'),{n:m});
  return fmt(t('feed_ago_h'),{n:Math.floor(m/60)});
}
var FEED_ICON={checkin:'check',match:'link',post:'bag',join:'user',certify:'shield',rating:'up',avail:'clock'};
function renderFeed(){
  feedEl.innerHTML=feedItems.map(function(it,i){
    return '<li'+(i===0&&it.fresh?' class="is-new"':'')+'>'
      +'<span class="fi">'+svg(FEED_ICON[it.type],14)+'</span>'
      +'<span class="f-body"><span class="f-txt">'+feedText(it)+'</span>'
      +'<span class="f-time">'+agoLabel(it.mins)+'</span></span></li>';
  }).join('');
}
function seedFeed(){ feedItems=[]; var m=0;
  for(var i=0;i<7;i++){ m+=rint(2,14); feedItems.push(buildFeedEvent(m)); } renderFeed(); }
function pushFeed(){
  feedItems.forEach(function(it){ it.fresh=false; it.mins+=rint(1,3); });
  var e=buildFeedEvent(0); e.fresh=true; feedItems.unshift(e);
  if(feedItems.length>8) feedItems.pop();
  renderFeed(); bump('statMatch');
}

/* -------------------------------------------------------- contatori ----- */
var counters={};
function countUp(id,target){
  var n=document.getElementById(id); if(!n) return;
  counters[id]=target; var t0=null;
  function step(ts){ if(!t0) t0=ts; var p=Math.min((ts-t0)/900,1);
    n.textContent=Math.round(target*(1-Math.pow(1-p,3)));
    if(p<1) requestAnimationFrame(step); }
  requestAnimationFrame(step);
}
function bump(id){ var n=document.getElementById(id); if(!n) return;
  counters[id]=(counters[id]||0)+1; n.textContent=counters[id]; }
function availableNowCount(){
  var now=new Date(), dow=now.getDay(), m=now.getHours()*60+now.getMinutes();
  var n=D.WORKERS.filter(function(w){ var a=w.avail[dow];
    return a && ((m>=a[0]&&m<=a[1]) || (m+1440<=a[1])); }).length;
  return Math.max(n,5)*3+rint(0,8);
}

/* ======================================================================== */
/*  PANNELLO AZIENDA                                                        */
/* ======================================================================== */
var Q, step, activeCompany;

/* durate reali secondo Fabio: 5-8 ore, e in alta stagione quasi sempre
   a cavallo della mezzanotte */
var QUICK=[[1200,1560],[1170,1500],[1350,1710],[1080,1440],[600,1080],[480,960]];

function resetQuery(){
  Q={ role:null, dayOffset:null, dow:null, start:null, end:null, zone:null,
      langMin:null, trust:null, minJobs:null };
  step=1;
}
function renderCompany(){
  el('#coWho').textContent=activeCompany.name+' · '+zoneName(activeCompany.zone);
  el('#coStage').innerHTML='<div class="stage">'+wizardHTML()+'</div>';
  wireWizard();
}
function wizardHTML(){
  var body = step===1?stepRole() : step===2?stepWhen() : step===3?stepWhere() : stepReq();
  var dots=''; for(var i=1;i<=4;i++) dots+='<i class="'+(i<=step?'on':'')+'"></i>';
  var canNext=(step===1&&Q.role)||(step===2&&Q.dayOffset!==null&&Q.start!==null&&Q.end!==null)
            ||(step===3&&Q.zone)||step===4;
  return '<div class="wiz-top"><div class="wiz-steps">'+dots+'</div>'
    +'<span class="wiz-count">'+t('wiz_step')+' '+step+' '+t('wiz_of')+' 4</span></div>'
    + body + previewHTML()
    + '<div class="wiz-nav">'
    + (step>1?'<button type="button" class="btn btn-soft" id="wizBack">'+t('wiz_back')+'</button>':'<span></span>')
    + (step<4
        ? '<button type="button" class="btn btn-primary" id="wizNext"'+(canNext?'':' disabled')+'>'+t('wiz_next')+'</button>'
        : '<button type="button" class="btn btn-terra" id="wizGo">'+t('wiz_publish')+'</button>')
    + '</div>';
}
function stepRole(){
  var out='<div class="wiz-q">'+t('wiz_q1')+'</div><div class="wiz-hint">'+t('wiz_q1_hint')+'</div>';
  D.SECTORS.forEach(function(s){
    out+='<div class="sec-label">'+t(s.key)+'</div><div class="opt-grid">';
    D.ROLES.filter(function(r){return r.sector===s.id;}).forEach(function(r){
      out+='<button type="button" class="opt'+(Q.role===r.id?' on':'')+'" data-role="'+r.id+'">'
        +'<span class="opt-ico">'+svg(r.icon)+'</span><span>'+t(r.key)+'</span></button>';
    });
    out+='</div>';
  });
  return out;
}
function stepWhen(){
  var out='<div class="wiz-q">'+t('wiz_q2')+'</div><div class="wiz-hint">'+t('wiz_q2_hint')+'</div>';
  out+='<div class="opt-grid">';
  for(var i=0;i<6;i++){
    var d=addDays(i);
    var lab=i===0?t('wiz_today'):(i===1?t('wiz_tomorrow'):dayLong(d));
    out+='<button type="button" class="opt'+(Q.dayOffset===i?' on':'')+'" data-day="'+i+'">'
      +'<span><span style="text-transform:capitalize">'+esc(lab)+'</span>'
      +'<span class="opt-sub">'+esc(dayNum(d))+'</span></span></button>';
  }
  out+='</div>';

  var s=Q.start===null?1200:Q.start, e=Q.end===null?1560:Q.end;
  var cross=span(s,e)>1440;
  out+='<div class="sec-label">'+t('wiz_from')+' / '+t('wiz_to')+'</div>'
    +'<div class="time-row">'
    +  '<div class="time-field"><label>'+t('wiz_from')+'</label>'
    +    '<input type="text" id="tStart" value="'+toHM(s)+'" inputmode="numeric" maxlength="5"></div>'
    +  '<span class="time-sep">—</span>'
    +  '<div class="time-field"><label>'+t('wiz_to')+'</label>'
    +    '<input type="text" id="tEnd" value="'+toHM(e)+'" inputmode="numeric" maxlength="5"></div>'
    +  '<span class="time-dur">'+t('wiz_duration')+' <b>'+durH(s,e).toFixed(1).replace('.0','')+' '+t('wiz_hours')+'</b>'
    +    (cross?'<br><span class="muted">'+t('wiz_crosses')+'</span>':'')+'</span>'
    +'</div>'
    +'<div class="sec-label">'+t('wiz_quick')+'</div><div class="time-quick">'
    + QUICK.map(function(q){
        return '<button type="button" data-q="'+q[0]+'-'+q[1]+'">'+toHM(q[0])+'–'+toHM(q[1])+'</button>';
      }).join('')
    +'</div>';
  return out;
}
function stepWhere(){
  var out='<div class="wiz-q">'+t('wiz_q3')+'</div><div class="wiz-hint">'+t('wiz_q3_hint')+'</div><div class="chips">';
  D.ZONES.forEach(function(z){
    out+='<button type="button" class="chip'+(Q.zone===z.id?' on':'')+'" data-zone="'+z.id+'">'+esc(z.name)+'</button>';
  });
  return out+'</div>';
}
function stepReq(){
  var out='<div class="wiz-q">'+t('wiz_q4')+'</div><div class="wiz-hint">'+t('wiz_q4_hint')+'</div>';
  out+='<div class="sec-label">'+t('wiz_lang')+'</div><div class="chips">'
    +'<button type="button" class="chip'+(!Q.langMin?' on':'')+'" data-lang="">'+t('wiz_lang_any')+'</button>'
    +'<button type="button" class="chip'+(Q.langMin==='en'?' on':'')+'" data-lang="en">English</button>'
    +'<button type="button" class="chip'+(Q.langMin==='it'?' on':'')+'" data-lang="it">Italiano</button></div>';
  out+='<div class="sec-label">'+t('wiz_trust')+'</div><div class="chips">'
    +'<button type="button" class="chip'+(!Q.trust?' on':'')+'" data-trust="">'+t('wiz_trust_any')+'</button>'
    +'<button type="button" class="chip'+(Q.trust==='proven'?' on':'')+'" data-trust="proven">'+t('wiz_trust_proven')+'</button>'
    +'<button type="button" class="chip'+(Q.trust==='certified'?' on':'')+'" data-trust="certified">'+t('wiz_trust_certified')+'</button></div>';
  out+='<div class="sec-label">'+t('wiz_exp')+'</div><div class="chips">'
    +'<button type="button" class="chip'+(!Q.minJobs?' on':'')+'" data-jobs="">'+t('wiz_exp_any')+'</button>'
    +'<button type="button" class="chip'+(Q.minJobs===10?' on':'')+'" data-jobs="10">10+</button>'
    +'<button type="button" class="chip'+(Q.minJobs===25?' on':'')+'" data-jobs="25">25+</button></div>';
  return out;
}

/* anteprima: e' il pezzo che deve far venire voglia di iscriversi */
function previewHTML(){
  if(step===1 && !Q.role) return '';
  var list=matchWorkers(Q), n=list.length;
  var cert=list.filter(function(w){return w.trust==='certified';}).length;
  var exact=Q.zone?list.filter(function(w){return zoneFit(w,Q.zone)===2;}).length:n;
  var similar=list.filter(function(w){
    var c=company(w.lastJob); return c && activeCompany && c.type===activeCompany.type; }).length;

  var breakdown='';
  if(n>0){
    var parts=[];
    if(cert)    parts.push('<b>'+cert+'</b> '+t('prev_break_certified'));
    if(Q.zone)  parts.push('<b>'+exact+'</b> '+t('prev_break_zone'));
    if(similar) parts.push('<b>'+similar+'</b> '+t('prev_break_repeat'));
    if(parts.length) breakdown='<div class="counter-break">'+parts.map(function(p){return '<span>'+p+'</span>';}).join('')+'</div>';
  }
  return '<div class="counter'+(n===0?' zero':'')+'">'
    +'<span class="counter-n">'+n+'</span>'
    +'<span class="counter-body"><span class="counter-txt">'
    +   (n===0?t('prev_zero'):(n===1?t('prev_one'):t('prev_title')))+'</span>'
    +'<span class="counter-hint">'+(n===0?t('prev_hint_zero'):t('prev_hint'))+'</span>'
    + breakdown +'</span></div>';
}

function wireWizard(){
  var st=el('#coStage');
  els('[data-role]',st).forEach(function(b){ b.onclick=function(){ Q.role=b.dataset.role; renderCompany(); }; });
  els('[data-day]',st).forEach(function(b){ b.onclick=function(){
    Q.dayOffset=+b.dataset.day; Q.dow=addDays(Q.dayOffset).getDay();
    if(Q.start===null){ Q.start=1200; Q.end=1560; }
    renderCompany(); }; });
  els('[data-zone]',st).forEach(function(b){ b.onclick=function(){ Q.zone=b.dataset.zone; renderCompany(); }; });
  els('[data-lang]',st).forEach(function(b){ b.onclick=function(){ Q.langMin=b.dataset.lang||null; renderCompany(); }; });
  els('[data-trust]',st).forEach(function(b){ b.onclick=function(){ Q.trust=b.dataset.trust||null; renderCompany(); }; });
  els('[data-jobs]',st).forEach(function(b){ b.onclick=function(){ Q.minJobs=b.dataset.jobs?+b.dataset.jobs:null; renderCompany(); }; });
  els('[data-q]',st).forEach(function(b){ b.onclick=function(){
    var p=b.dataset.q.split('-'); Q.start=+p[0]; Q.end=+p[1];
    if(Q.dayOffset===null){ Q.dayOffset=0; Q.dow=addDays(0).getDay(); }
    renderCompany(); }; });

  ['#tStart','#tEnd'].forEach(function(sel){
    var f=el(sel,st); if(!f) return;
    f.onchange=function(){
      var v=parseHM(f.value);
      if(v===null){ f.value=toHM(sel==='#tStart'?Q.start:Q.end); return; }
      if(sel==='#tStart') Q.start=v; else Q.end=v;
      if(Q.dayOffset===null){ Q.dayOffset=0; Q.dow=addDays(0).getDay(); }
      renderCompany();
    };
  });

  var b=el('#wizBack',st), n=el('#wizNext',st), g=el('#wizGo',st);
  if(b) b.onclick=function(){ step--; renderCompany(); };
  if(n) n.onclick=function(){ step++; renderCompany(); };
  if(g) g.onclick=runSearch;
}

/* -------------------------------------------------------- ricerca ------- */
function runSearch(){
  var st=el('#coStage');
  var keys=['search_step1','search_step2','search_step3','search_step4'];
  st.innerHTML='<div class="stage"><div class="searching">'
    +'<img class="hourglass" src="assets/img/clessidra.png" alt="" width="56" height="56">'
    +'<h3>'+t('search_title')+'</h3><ul class="steps">'
    + keys.map(function(k){ return '<li><span class="tick">'+svg('check',11)+'</span><span>'+t(k)+'</span></li>'; }).join('')
    +'</ul></div></div>';
  var lis=els('.steps li',st);
  lis.forEach(function(li,i){ setTimeout(function(){ li.classList.add('on'); },350+i*420); });
  setTimeout(showResults,350+lis.length*420+400);
}
function searchWithFallback(){
  function relaxed(keys){ var q={}; for(var k in Q) q[k]=Q[k]; keys.forEach(function(k){ q[k]=null; }); return matchWorkers(q); }
  var exact=matchWorkers(Q); if(exact.length) return {list:exact,widened:null};
  var a=relaxed(['start','end']);            if(a.length) return {list:a,widened:'wide_slot'};
  var b=relaxed(['start','end','dow']);      if(b.length) return {list:b,widened:'wide_day'};
  var c=relaxed(['start','end','dow','zone']); if(c.length) return {list:c,widened:'wide_zone'};
  return {list:[],widened:'none'};
}
function isNew(w){ return w.jobs===0; }
function trustBadge(w){
  if(isNew(w)) return '<span class="trust trust--verified">'+t('w_new')+'</span>';
  return '<span class="trust trust--'+w.trust+'">'+svg('shield',11)+t('w_trust_'+w.trust)+'</span>';
}
function skillTag(s){
  var cls=s.status==='confirmed'?' skill--confirmed':(s.status==='doubt'?' skill--doubt':'');
  return '<span class="skill'+cls+'" title="'+esc(t('w_'+s.status))+'">'
    +(s.status==='confirmed'?svg('check',10):'')+esc(skillName(s.id))+'</span>';
}
function workerCard(w,origin){
  var langs=Object.keys(w.langs).map(function(k){return k.toUpperCase()+' '+w.langs[k];}).join(' · ');
  return '<article class="wcard"><div class="wcard-top">'
    +'<span class="avatar" style="background:'+avatarColor(w.id)+'">'+initials(w.name)+'</span>'
    +'<div class="wcard-id"><div class="wcard-name"><b>'+esc(w.name)+'</b>'+trustBadge(w)
    +'<span class="origin'+(origin==='engine'?' origin--engine':'')+'">'
    + t(origin==='engine'?'results_proposed':'results_applied')+'</span></div>'
    +'<div class="wcard-role">'+esc(w.roles.map(roleName).join(' · '))+'</div></div>'
    +'<div class="wcard-score"><b>'+w.score+'</b><span>'+t('w_score')+'</span></div></div>'
    +'<div class="wmeta"><span><b>'+w.jobs+'</b> '+t('w_jobs')+'</span>'
    +'<span><b>'+w.attendance+'%</b> '+t('w_attendance')+'</span><span>'+esc(langs)+'</span></div>'
    +'<div class="wmeta">'+w.skills.map(skillTag).join('')+'</div>'
    +'<div class="wcard-act"><button type="button" class="btn btn-terra" data-choose="'+w.id+'">'+t('results_choose')+'</button></div>'
    +'</article>';
}
function showResults(){
  var res=searchWithFallback(), st=el('#coStage');
  if(!res.list.length){
    st.innerHTML='<div class="stage"><div class="match-box">'
      +'<div class="match-ring">'+svg('user',28)+'</div>'
      +'<h3>'+t('human_title')+'</h3><p>'+t('human_text')+'</p>'
      +'<div class="note" style="max-width:44ch;margin:1.2rem auto 0;text-align:left">'
      + svg('info',15)+'<span>'+t('human_note')+'</span></div>'
      +'<div style="margin-top:1.4rem"><button type="button" class="btn btn-soft" id="again">'+t('match_again')+'</button></div>'
      +'</div></div>';
    el('#again').onclick=function(){ resetQuery(); renderCompany(); };
    return;
  }
  var shown=res.list;   /* Fabio: mostrarli tutti */
  var banner=res.widened
    ? '<div class="note" style="margin:0 0 1.2rem">'+svg('info',15)
      +'<span><b>'+t('wide_tag')+'.</b> '+t(res.widened)+'</span></div>' : '';
  st.innerHTML='<div class="stage">'+banner
    +'<div class="res-head"><h3>'+t('results_title')+'</h3><p>'+t('results_sub')+'</p></div>'
    +'<div class="cards">'+shown.map(function(w,i){ return workerCard(w,i%4===3?'applied':'engine'); }).join('')+'</div></div>';
  els('[data-choose]',st).forEach(function(b){ b.onclick=function(){ showMatch(b.dataset.choose); }; });
}
function showMatch(wid){
  var w=D.WORKERS.filter(function(x){return x.id===wid;})[0];
  var phone='+34 6'+rint(10,99)+' '+rint(100,999)+' '+rint(100,999);
  el('#coStage').innerHTML='<div class="stage"><div class="match-box">'
    +'<div class="match-ring">'+svg('check',28)+'</div>'
    +'<h3>'+t('match_title')+'</h3><p>'+t('match_sub')+'</p>'
    +'<div class="contact"><span>'+t('match_phone')+'</span>'+esc(w.name)+' · '+phone+'</div>'
    +'<div style="margin-top:1.5rem"><button type="button" class="btn btn-soft" id="again">'+t('match_again')+'</button></div>'
    +'</div></div>';
  el('#again').onclick=function(){ resetQuery(); renderCompany(); };
  bump('statMatch');
}

/* ======================================================================== */
/*  PANNELLO LAVORATORE                                                     */
/* ======================================================================== */
var ME, myAvail, myOff, propState;

function initWorker(){
  ME=D.WORKERS.filter(function(w){return w.id==='w1';})[0];
  myAvail={}; Object.keys(ME.avail).forEach(function(k){ myAvail[k]=ME.avail[k].slice(); });
  myOff={}; propState=null;
}
function renderWorker(){
  el('#wkWho').textContent=ME.name+' · '+ME.roles.map(roleName).join(' · ');
  el('#wkStage').innerHTML='<div class="stage"><div class="wk-grid">'
    +'<div class="wk-col-l">'+profileBlock()+calendarBlock()+'</div>'
    +'<div class="wk-col-r">'+offersBlock()+proposalBlock()+'</div>'
    +'</div></div>';
  wireWorker();
}
function profileBlock(){
  var langs=Object.keys(ME.langs).map(function(k){return k.toUpperCase()+' '+ME.langs[k];}).join(' · ');
  var last=company(ME.lastJob);
  return '<div class="block"><div class="block-h"><h3>'+t('wk_profile')+'</h3></div>'
    +'<div class="prof-top"><span class="avatar" style="background:'+avatarColor(ME.id)+'">'+initials(ME.name)+'</span>'
    +'<div><div class="prof-name">'+esc(ME.name)+'</div>'
    +'<div class="prof-role">'+esc(ME.roles.map(roleName).join(' · '))+'</div></div></div>'
    +'<div style="margin-bottom:.9rem">'+trustBadge(ME)
    +'<div class="block-hint" style="margin:.4rem 0 0">'+t('w_trust_'+ME.trust+'_d')+'</div></div>'
    +'<div class="prof-stats">'
    +'<div class="pstat"><b>'+ME.jobs+'</b><span>'+t('w_jobs')+'</span></div>'
    +'<div class="pstat"><b>'+ME.attendance+'%</b><span>'+t('w_attendance')+'</span></div>'
    +'<div class="pstat"><b>&middot;</b><span>'+t('w_score_hidden')+'</span></div></div>'
    +'<div class="block-hint" style="margin:-.4rem 0 .9rem">'+t('w_score_hidden_d')+'</div>'
    +'<div class="sec-label" style="margin-top:0">'+t('w_langs')+'</div>'
    +'<div style="font-size:.88rem;color:var(--tinta-2)">'+esc(langs)+'</div>'
    +'<div class="sec-label">'+t('w_skills')+'</div>'
    +'<div class="wmeta" style="border:0;padding:0;margin:0">'+ME.skills.map(skillTag).join('')+'</div>'
    +'<div class="sec-label">'+t('w_worked_at')+'</div>'
    +'<div style="font-size:.88rem;color:var(--tinta-2)">'+esc(last.name)+' · '+esc(zoneName(last.zone))+'</div>'
    +'</div>';
}
function calendarBlock(){
  var order=[1,2,3,4,5,6,0], rows='';
  order.forEach(function(dow){
    var a=myAvail[dow];
    if(!a) return;
    var off=myOff[dow]===true;
    rows+='<div class="cal-row'+(off?' off':'')+'" data-dow="'+dow+'">'
      +'<span class="cal-day">'+esc(dowShort(dow))+'</span>'
      +'<span class="cal-time"><input type="text" data-t="s" data-dow="'+dow+'" value="'+toHM(a[0])+'" maxlength="5" inputmode="numeric">'
      +'<span>—</span><input type="text" data-t="e" data-dow="'+dow+'" value="'+toHM(a[1])+'" maxlength="5" inputmode="numeric"></span>'
      +'<button type="button" class="toggle'+(off?'':' on')+'" role="switch" aria-checked="'+(!off)+'"></button>'
      +'</div>';
  });
  return '<div class="block"><div class="block-h"><h3>'+t('wk_calendar')+'</h3>'
    +'<span class="saved" id="savedTag">'+svg('check',11)+t('wk_saved')+'</span></div>'
    +'<div class="block-hint">'+t('wk_calendar_hint')+'</div>'
    +'<div class="cal">'+rows+'</div></div>';
}
/* offerte reali: solo quelle che combaciano con orario, zona e ruolo */
function myOffers(){
  var out=[];
  for(var i=0;i<7 && out.length<4;i++){
    var date=addDays(i), dow=date.getDay(), a=myAvail[dow];
    if(!a || myOff[dow]) continue;
    var co=D.COMPANIES.filter(function(c){ return ME.zones.indexOf(c.zone)!==-1; });
    if(!co.length) continue;
    var c=co[(i+out.length)%co.length];
    var start=a[0]+ (i%2?30:0);
    var end=Math.min(a[1], start+ (i%3===0?240:300));
    var role=ME.roles[i%ME.roles.length];
    out.push({ co:c, date:date, dow:dow, start:start, end:end, role:role,
               rate:rateFor(role), total:payTotal(role,start,end) });
  }
  return out;
}
function offersBlock(){
  var list=myOffers();
  var rows=list.map(function(o){
    return '<div class="offer">'
      +'<span class="offer-when"><b>'+esc(dayNum(o.date).split(' ')[0])+'</b>'
      +'<span>'+esc(dowShort(o.dow))+'</span></span>'
      +'<span class="offer-body"><span class="offer-role">'+esc(roleName(o.role))+'</span>'
      +'<span class="offer-meta">'+esc(o.co.name)+' · '+esc(zoneName(o.co.zone))+' · '
      + toHM(o.start)+'–'+toHM(o.end)
      + ' · <b>'+o.co.rating.toFixed(1)+'</b> '+t('wk_company_score')+'</span></span>'
      +'<span class="offer-pay"><b>'+o.total+' €</b><span>'+durH(o.start,o.end).toFixed(1).replace('.0','')
      + t('wk_hours')+' · '+o.rate+' €/'+t('wk_hours')+'</span></span>'
      +'</div>';
  }).join('');
  return '<div class="block"><div class="block-h"><h3>'+t('wk_offers')+'</h3></div>'
    +'<div class="block-hint">'+t('wk_offers_hint')+'</div>'
    +'<div class="offers">'+(rows||'')+'</div></div>';
}
function proposalBlock(){
  var co=company('c1'), when=addDays(2);
  if(propState==='accepted')
    return '<div class="block"><div class="note note--ok">'+svg('check',15)+'<span>'+t('wk_accepted')+'</span></div></div>';
  if(propState==='declined')
    return '<div class="block"><div class="note">'+svg('info',15)
      +'<span><b>'+t('wk_declined')+'</b> '+t('wk_no_penalty')+'</span></div></div>';
  return '<div class="block"><div class="prop">'
    +'<span class="prop-tag">'+svg('bag',11)+t('wk_proposals')+'</span>'
    +'<h4>'+roleName('camarero')+'</h4>'
    +'<div class="prop-co">'+esc(co.name)+' · '+esc(zoneName(co.zone))+'</div>'
    +'<div class="prop-rows">'
    +'<div class="prop-row"><i>'+t('wk_when')+'</i><b style="text-transform:capitalize">'+esc(dayLong(when))+'</b>'
    +'<small>'+toHM(1200)+'–'+toHM(1560)+'</small></div>'
    +'<div class="prop-row"><i>'+t('wk_where')+'</i><b>'+esc(zoneName(co.zone))+'</b></div>'
    +'<div class="prop-row"><i>'+t('wk_pay')+'</i><b>'+payTotal('camarero',1200,1560)+' €</b>'
    +'<small>6'+t('wk_hours')+' · '+rateFor('camarero')+' €/'+t('wk_hours')+' · '+t('wk_pay_note')+'</small></div></div>'
    +'<div class="prop-act">'
    +'<button type="button" class="btn btn-terra" id="propYes">'+t('wk_accept')+'</button>'
    +'<button type="button" class="btn btn-soft" id="propNo">'+t('wk_decline')+'</button></div>'
    +'<div class="note">'+svg('info',15)+'<span>'+t('wk_no_penalty')+'</span></div>'
    +'</div></div>';
}
function flashSaved(){
  var tag=el('#savedTag'); if(!tag) return;
  tag.classList.add('show'); setTimeout(function(){ tag.classList.remove('show'); },1200);
}
function wireWorker(){
  els('#wkStage .toggle').forEach(function(b){
    b.onclick=function(){ var dow=b.closest('.cal-row').dataset.dow;
      myOff[dow]=!myOff[dow]; renderWorker(); flashSaved(); };
  });
  els('#wkStage .cal-time input').forEach(function(f){
    f.onchange=function(){
      var v=parseHM(f.value), dow=f.dataset.dow;
      if(v===null){ renderWorker(); return; }
      if(f.dataset.t==='s') myAvail[dow][0]=v; else myAvail[dow][1]=span(myAvail[dow][0],v);
      renderWorker(); flashSaved();
    };
  });
  var y=el('#propYes'), n=el('#propNo');
  if(y) y.onclick=function(){ propState='accepted'; renderWorker(); };
  if(n) n.onclick=function(){ propState='declined'; renderWorker(); };
}

/* ======================================================================== */
/*  SHELL                                                                   */
/* ======================================================================== */
var currentSide='company';
function openDemo(side){
  currentSide=side;
  el('#demo').hidden=false;
  el('#panelCompany').hidden=side!=='company';
  el('#panelWorker').hidden=side==='company';
  el('#demoSwitch').firstElementChild.textContent=
    side==='company'?t('demo_switch_worker'):t('demo_switch_company');
  if(side==='company'){ resetQuery(); renderCompany(); } else { renderWorker(); }
  el('#demo').scrollIntoView({behavior:'smooth',block:'start'});
}
function applyLang(code){
  lang=code; T=IE_I18N[code];
  document.documentElement.lang=code;
  els('[data-i18n]').forEach(function(n){
    var v=t(n.dataset.i18n);
    if(/<(br|em|b|strong)\b/i.test(v)) n.innerHTML=v; else n.textContent=v;
  });
  els('.lang-btn').forEach(function(b){ b.classList.toggle('is-on',b.dataset.lang===code); });
  if(feedItems.length) renderFeed();
  if(!el('#demo').hidden){
    el('#demoSwitch').firstElementChild.textContent=
      currentSide==='company'?t('demo_switch_worker'):t('demo_switch_company');
    if(currentSide==='company') renderCompany(); else renderWorker();
  }
}
/* nastro delle zone: i nomi veri delle isole, separati dal fiore */
function initTicker(){
  var tk=el('#ticker'); if(!tk) return;
  var half=D.ZONES.map(function(z){
    return '<span>'+esc(z.name)+'</span>'
      +'<img src="assets/img/flor.png" alt="" width="15" height="15">';
  }).join('');
  tk.innerHTML=half+half;
}

/* le sezioni compaiono quando entrano nello schermo */
function initReveal(){
  var nodes=els('.rv');
  if(!('IntersectionObserver' in window)){ nodes.forEach(function(n){n.classList.add('in');}); return; }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  },{threshold:.15});
  nodes.forEach(function(n){ io.observe(n); });
}

function init(){
  feedEl=el('#feed');
  initTicker();
  initReveal();
  applyLang('es');
  seedFeed();
  countUp('statAvail',availableNowCount());
  countUp('statComp',D.COMPANIES.length*9+rint(0,12));
  countUp('statMatch',rint(58,94));
  countUp('statAvg',rint(7,14));
  setInterval(pushFeed,4600);

  els('.lang-btn').forEach(function(b){ b.onclick=function(){ applyLang(b.dataset.lang); }; });
  els('[data-open]').forEach(function(b){ b.onclick=function(){
    if(b.dataset.open==='company') activeCompany=company('c1'); else initWorker();
    openDemo(b.dataset.open); }; });
  el('#demoClose').onclick=function(){
    el('#demo').hidden=true; el('#doors').scrollIntoView({behavior:'smooth',block:'center'}); };
  el('#demoSwitch').onclick=function(){
    if(currentSide==='company'){ initWorker(); openDemo('worker'); }
    else { activeCompany=company('c1'); openDemo('company'); } };
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
else init();

})();
