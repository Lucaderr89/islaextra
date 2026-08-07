/* ==========================================================================
   Isla Extra — demo app
   Todo el matching funciona de verdad sobre el dataset de demo.
   ========================================================================== */
(function () {
'use strict';

var D = IE_DATA;
var lang = 'es';
var T = IE_I18N[lang];

/* ---------------------------------------------------------------- utils - */
function t(k){ return (T && T[k]) || (IE_I18N.es[k]) || k; }
function el(sel, root){ return (root||document).querySelector(sel); }
function els(sel, root){ return Array.prototype.slice.call((root||document).querySelectorAll(sel)); }
function fmt(str, map){ return str.replace(/\{(\w+)\}/g, function(_,k){ return map[k]!==undefined ? map[k] : ''; }); }
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]; }); }
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
function rint(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }

function zoneName(id){ var z=D.ZONES.filter(function(x){return x.id===id;})[0]; return z?z.name:id; }
function roleName(id){ var r=D.ROLES.filter(function(x){return x.id===id;})[0]; return r?t(r.key):id; }
function company(id){ return D.COMPANIES.filter(function(x){return x.id===id;})[0]; }
function skillName(id){ return t('sk_'+id); }

var AV_COLORS = ['#0b7d70','#2b7f96','#5b64c4','#c9761d','#3d8a4d','#c9553f','#7a5bbd','#0f8ba3'];
function avatarColor(id){
  var n=0; for(var i=0;i<id.length;i++){ n=(n*31+id.charCodeAt(i))>>>0; }
  return AV_COLORS[n % AV_COLORS.length];
}
function initials(name){
  var p=name.trim().split(/\s+/);
  return (p[0][0] + (p[1]?p[1][0]:'')).toUpperCase();
}

/* ------------------------------------------------------------- iconos --- */
var ICON = {
  tray:  '<path d="M4 13h16M6 13a6 6 0 0112 0M12 7V4M9 20h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  glass: '<path d="M5 4h14l-6 8v6M9 21h6M13 18v3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  pan:   '<path d="M3 12h13a0 0 0 010 0 5 5 0 01-5 5H8a5 5 0 01-5-5zM16 12l5-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  knife: '<path d="M4 20L20 4M14 4h6v6M9 15l4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  plate: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/>',
  bell:  '<path d="M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6M10 19a2 2 0 004 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  spray: '<path d="M7 8h6v13H7zM10 8V4h4M16 6h3M16 9h3M16 12h3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  bolt:  '<path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  leaf:  '<path d="M4 20c0-9 6-14 16-14 0 10-5 15-13 15-1.5 0-3-.4-3-1zM7 17c2-4 5-6 9-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  wrench:'<path d="M15 5a4 4 0 105 5l-9 9a2.8 2.8 0 01-4-4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  check: '<path d="M4 12l5 5L20 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
  shield:'<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" fill="currentColor"/>',
  star:  '<path d="M12 2l3 6.5 7 .9-5 4.9 1.2 7L12 18l-6.2 3.3L7 14.3 2 9.4l7-.9z" fill="currentColor"/>',
  clock: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  pin:   '<path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/>',
  user:  '<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  link:  '<path d="M9 15l6-6M11 6l1.5-1.5a4.2 4.2 0 016 6L17 12M13 18l-1.5 1.5a4.2 4.2 0 01-6-6L7 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  info:  '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 11v5M12 7.6v.1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  bag:   '<path d="M4 8h16v12H4zM9 8V6a3 3 0 016 0v2" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'
};
function svg(name, size){
  return '<svg viewBox="0 0 24 24" width="'+(size||16)+'" height="'+(size||16)+'" aria-hidden="true">'+(ICON[name]||'')+'</svg>';
}

/* ---------------------------------------------------------- fechas ------ */
function localeTag(){ return lang==='es' ? 'es-ES' : (lang==='it' ? 'it-IT' : 'en-GB'); }
/* domingo 7 de enero de 2024 — referencia fija para nombrar los dias */
var DOW_REF = new Date(2024, 0, 7);
function dowShort(dow){
  var d = new Date(DOW_REF); d.setDate(d.getDate() + dow);
  return d.toLocaleDateString(localeTag(), {weekday:'short'}).replace('.','');
}
function dayLong(d){ return new Date(d).toLocaleDateString(localeTag(), {weekday:'long'}); }
function dayNum(d){ return new Date(d).toLocaleDateString(localeTag(), {day:'numeric', month:'short'}); }
function addDays(n){ var d=new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()+n); return d; }

/* ======================================================================== */
/*  MOTOR DE MATCHING — funciona sobre los datos reales del dataset         */
/* ======================================================================== */
var TRUST_RANK = { verified:1, proven:2, certified:3 };

/* 2 = trabaja en la zona pedida, 1 = zona limitrofe, 0 = no llega */
function zoneFit(w, zone){
  if (!zone) return 2;
  if (w.zones.indexOf(zone) !== -1) return 2;
  var near = D.NEAR[zone] || [];
  for (var i=0;i<near.length;i++){
    if (w.zones.indexOf(near[i]) !== -1) return 1;
  }
  return 0;
}

function matchWorkers(q){
  return D.WORKERS.filter(function(w){
    if (q.role && w.roles.indexOf(q.role) === -1) return false;
    if (zoneFit(w, q.zone) === 0) return false;
    if (q.dow !== null && q.slot){
      var day = w.avail[q.dow];
      if (!day || day.indexOf(q.slot) === -1) return false;
    }
    if (q.langMin){
      var lv = w.langs[q.langMin];
      if (!lv || ['A1','A2'].indexOf(lv) !== -1) return false;
    }
    if (q.trust && TRUST_RANK[w.trust] < TRUST_RANK[q.trust]) return false;
    if (q.minJobs && w.jobs < q.minJobs) return false;
    return true;
  }).sort(function(a,b){
    /* zona exacta antes que limitrofe, luego confianza, luego puntuacion */
    var z = zoneFit(b, q.zone) - zoneFit(a, q.zone);
    if (z !== 0) return z;
    var d = TRUST_RANK[b.trust] - TRUST_RANK[a.trust];
    return d !== 0 ? d : b.score - a.score;
  });
}

/* ======================================================================== */
/*  FEED EN DIRECTO                                                         */
/* ======================================================================== */
var feedEl, feedItems = [];

function buildFeedEvent(minsAgo){
  var tpl = pick(D.FEED_TEMPLATES);
  var w   = pick(D.WORKERS);
  var c   = pick(D.COMPANIES);
  if (tpl.type === 'certify' && w.trust !== 'certified'){
    w = pick(D.WORKERS.filter(function(x){ return x.trust === 'certified'; }));
  }
  /* se guardan los datos crudos: el texto se traduce al pintar */
  return {
    type:  tpl.type,
    key:   tpl.key,
    worker:w.name,
    comp:  c.name,
    role:  pick(w.roles),
    zone:  tpl.type === 'avail' ? pick(w.zones) : c.zone,
    stars: rint(4,5)+'/5',
    mins:  minsAgo
  };
}

function feedText(it){
  return fmt(t(it.key), {
    worker:  '<b>'+esc(it.worker)+'</b>',
    company: '<b>'+esc(it.comp)+'</b>',
    role:    esc(roleName(it.role)).toLowerCase(),
    zone:    '<b>'+esc(zoneName(it.zone))+'</b>',
    stars:   it.stars
  });
}

function agoLabel(m){
  if (m < 1)  return t('feed_ago_now');
  if (m < 60) return fmt(t('feed_ago_min'), {n:m});
  return fmt(t('feed_ago_h'), {n:Math.floor(m/60)});
}

var FEED_ICON = { checkin:'check', match:'link', post:'bag', join:'user', certify:'shield', rating:'star', avail:'clock' };

function renderFeed(){
  feedEl.innerHTML = feedItems.map(function(it, i){
    return '<li'+(i===0 && it.fresh ? ' class="is-new"' : '')+'>'
      + '<span class="fi fi--'+it.type+'">'+svg(FEED_ICON[it.type],15)+'</span>'
      + '<span class="f-body"><span class="f-txt">'+feedText(it)+'</span>'
      + '<span class="f-time">'+agoLabel(it.mins)+'</span></span></li>';
  }).join('');
}

function seedFeed(){
  feedItems = [];
  var m = 0;
  for (var i=0;i<7;i++){ m += rint(2,14); feedItems.push(buildFeedEvent(m)); }
  renderFeed();
}

function pushFeed(){
  feedItems.forEach(function(it){ it.fresh=false; it.mins += rint(1,3); });
  var ev = buildFeedEvent(0); ev.fresh = true;
  feedItems.unshift(ev);
  if (feedItems.length > 8) feedItems.pop();
  renderFeed();
  bump('statMatch');
}

/* ======================================================================== */
/*  CONTADORES                                                              */
/* ======================================================================== */
var counters = {};
function countUp(id, target){
  var node = document.getElementById(id);
  if (!node) return;
  counters[id] = target;
  var from = 0, dur = 900, t0 = null;
  function step(ts){
    if (!t0) t0 = ts;
    var p = Math.min((ts - t0)/dur, 1);
    node.textContent = Math.round(from + (target-from) * (1 - Math.pow(1-p,3)));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function bump(id){
  var node = document.getElementById(id);
  if (!node) return;
  counters[id] = (counters[id]||0) + 1;
  node.textContent = counters[id];
}

function availableNowCount(){
  var now = new Date(), dow = now.getDay(), h = now.getHours();
  var slot = h < 15 ? 'm' : (h < 20 ? 'a' : 'e');
  var n = D.WORKERS.filter(function(w){
    var d = w.avail[dow]; return d && d.indexOf(slot) !== -1;
  }).length;
  return Math.max(n, 6) * 3 + rint(0,9);   /* escala para simular un pool mayor */
}

/* ======================================================================== */
/*  PANEL NEGOCIO — wizard                                                  */
/* ======================================================================== */
var Q, step, activeCompany;

function resetQuery(){
  Q = { role:null, dayOffset:null, slot:null, zone:null, langMin:null, trust:null, minJobs:null, dow:null };
  step = 1;
}

function renderCompany(){
  el('#coWho').textContent = activeCompany.name + ' — ' + zoneName(activeCompany.zone);
  var stage = el('#coStage');
  stage.innerHTML = '<div class="stage">' + wizardHTML() + '</div>';
  wireWizard();
}

function wizardHTML(){
  var body = '';
  if (step === 1) body = stepRole();
  if (step === 2) body = stepWhen();
  if (step === 3) body = stepWhere();
  if (step === 4) body = stepReq();

  var dots = '';
  for (var i=1;i<=4;i++) dots += '<i class="'+(i<=step?'on':'')+'"></i>';

  var canNext = (step===1 && Q.role) || (step===2 && Q.dayOffset!==null && Q.slot) ||
                (step===3 && Q.zone) || step===4;

  return ''
  + '<div class="wiz-top">'
  +   '<div class="wiz-steps">'+dots+'</div>'
  +   '<span class="wiz-count">'+t('wiz_step')+' '+step+' '+t('wiz_of')+' 4</span>'
  + '</div>'
  + body
  + counterHTML()
  + '<div class="wiz-nav">'
  +   (step>1 ? '<button type="button" class="btn btn-soft" id="wizBack">'+t('wiz_back')+'</button>' : '<span></span>')
  +   (step<4
        ? '<button type="button" class="btn btn-primary" id="wizNext"'+(canNext?'':' disabled')+'>'+t('wiz_next')+'</button>'
        : '<button type="button" class="btn btn-teal" id="wizGo">'+t('wiz_publish')+'</button>')
  + '</div>';
}

function stepRole(){
  var out = '<div class="wiz-q">'+t('wiz_q1')+'</div><div class="wiz-hint"></div>';
  D.SECTORS.forEach(function(s){
    out += '<div class="sec-label">'+t(s.key)+'</div><div class="opt-grid">';
    D.ROLES.filter(function(r){ return r.sector===s.id; }).forEach(function(r){
      out += '<button type="button" class="opt'+(Q.role===r.id?' on':'')+'" data-role="'+r.id+'">'
           +   '<span class="opt-ico">'+svg(r.icon)+'</span><span>'+t(r.key)+'</span></button>';
    });
    out += '</div>';
  });
  return out;
}

function stepWhen(){
  var out = '<div class="wiz-q">'+t('wiz_q2')+'</div><div class="wiz-hint"></div>';
  out += '<div class="opt-grid">';
  for (var i=0;i<6;i++){
    var d = addDays(i);
    var label = i===0 ? t('wiz_today') : (i===1 ? t('wiz_tomorrow') : dayLong(d));
    out += '<button type="button" class="opt'+(Q.dayOffset===i?' on':'')+'" data-day="'+i+'">'
         +   '<span><span style="text-transform:capitalize">'+esc(label)+'</span>'
         +   '<span class="opt-sub">'+esc(dayNum(d))+'</span></span></button>';
  }
  out += '</div><div class="sec-label">&nbsp;</div><div class="opt-grid">';
  [['m','wiz_morning','wiz_m_hours'],['a','wiz_afternoon','wiz_a_hours'],['e','wiz_evening','wiz_e_hours']]
  .forEach(function(s){
    out += '<button type="button" class="opt'+(Q.slot===s[0]?' on':'')+'" data-slot="'+s[0]+'">'
         +   '<span class="opt-ico">'+svg('clock')+'</span>'
         +   '<span>'+t(s[1])+'<span class="opt-sub">'+t(s[2])+'</span></span></button>';
  });
  return out + '</div>';
}

function stepWhere(){
  var out = '<div class="wiz-q">'+t('wiz_q3')+'</div><div class="wiz-hint"></div><div class="chips">';
  D.ZONES.forEach(function(z){
    out += '<button type="button" class="chip'+(Q.zone===z.id?' on':'')+'" data-zone="'+z.id+'">'+esc(z.name)+'</button>';
  });
  return out + '</div>';
}

function stepReq(){
  var out = '<div class="wiz-q">'+t('wiz_q4')+'</div><div class="wiz-hint">'+t('wiz_q4_hint')+'</div>';

  out += '<div class="sec-label">'+t('wiz_lang')+'</div><div class="chips">'
       + '<button type="button" class="chip'+(!Q.langMin?' on':'')+'" data-lang="">'+t('wiz_lang_any')+'</button>'
       + '<button type="button" class="chip'+(Q.langMin==='en'?' on':'')+'" data-lang="en">English</button>'
       + '<button type="button" class="chip'+(Q.langMin==='it'?' on':'')+'" data-lang="it">Italiano</button>'
       + '</div>';

  out += '<div class="sec-label">'+t('wiz_trust')+'</div><div class="chips">'
       + '<button type="button" class="chip'+(!Q.trust?' on':'')+'" data-trust="">'+t('wiz_trust_any')+'</button>'
       + '<button type="button" class="chip'+(Q.trust==='proven'?' on':'')+'" data-trust="proven">'+t('wiz_trust_proven')+'</button>'
       + '<button type="button" class="chip'+(Q.trust==='certified'?' on':'')+'" data-trust="certified">'+t('wiz_trust_certified')+'</button>'
       + '</div>';

  out += '<div class="sec-label">'+t('wiz_exp')+'</div><div class="chips">'
       + '<button type="button" class="chip'+(!Q.minJobs?' on':'')+'" data-jobs="">'+t('wiz_exp_any')+'</button>'
       + '<button type="button" class="chip'+(Q.minJobs===10?' on':'')+'" data-jobs="10">10+</button>'
       + '<button type="button" class="chip'+(Q.minJobs===25?' on':'')+'" data-jobs="25">25+</button>'
       + '</div>';
  return out;
}

function counterHTML(){
  if (step === 1 && !Q.role) return '';
  var n = matchWorkers(Q).length;
  return '<div class="counter'+(n===0?' zero':'')+'">'
       +   '<span class="counter-n">'+n+'</span>'
       +   '<span class="counter-txt">'+(n===0 ? t('wiz_counter_zero') : t('wiz_counter'))
       +     '<span class="counter-hint">'+(n===0||step===4 ? t('wiz_counter_hint') : '')+'</span>'
       +   '</span></div>';
}

function wireWizard(){
  var stage = el('#coStage');

  els('[data-role]', stage).forEach(function(b){
    b.onclick = function(){ Q.role = b.dataset.role; renderCompany(); };
  });
  els('[data-day]', stage).forEach(function(b){
    b.onclick = function(){
      Q.dayOffset = +b.dataset.day;
      Q.dow = addDays(Q.dayOffset).getDay();
      renderCompany();
    };
  });
  els('[data-slot]', stage).forEach(function(b){
    b.onclick = function(){ Q.slot = b.dataset.slot; renderCompany(); };
  });
  els('[data-zone]', stage).forEach(function(b){
    b.onclick = function(){ Q.zone = b.dataset.zone; renderCompany(); };
  });
  els('[data-lang]', stage).forEach(function(b){
    b.onclick = function(){ Q.langMin = b.dataset.lang || null; renderCompany(); };
  });
  els('[data-trust]', stage).forEach(function(b){
    b.onclick = function(){ Q.trust = b.dataset.trust || null; renderCompany(); };
  });
  els('[data-jobs]', stage).forEach(function(b){
    b.onclick = function(){ Q.minJobs = b.dataset.jobs ? +b.dataset.jobs : null; renderCompany(); };
  });

  var back = el('#wizBack', stage), next = el('#wizNext', stage), go = el('#wizGo', stage);
  if (back) back.onclick = function(){ step--; renderCompany(); };
  if (next) next.onclick = function(){ step++; renderCompany(); };
  if (go)   go.onclick   = function(){ runSearch(); };
}

/* ------------------------------------------------------- buscando ------- */
function runSearch(){
  var stage = el('#coStage');
  var keys = ['search_step1','search_step2','search_step3','search_step4'];
  stage.innerHTML = '<div class="stage"><div class="searching">'
    + '<div class="radar"></div><h3>'+t('search_title')+'</h3>'
    + '<ul class="steps">' + keys.map(function(k){
        return '<li><span class="tick">'+svg('check',11)+'</span><span>'+t(k)+'</span></li>';
      }).join('') + '</ul></div></div>';

  var lis = els('.steps li', stage);
  lis.forEach(function(li,i){ setTimeout(function(){ li.classList.add('on'); }, 380 + i*430); });
  setTimeout(showResults, 380 + lis.length*430 + 420);
}

/* ------------------------------------------------------- resultados ----- */
function trustBadge(w){
  return '<span class="trust trust--'+w.trust+'">'+svg('shield',11)+t('w_trust_'+w.trust)+'</span>';
}

function skillTag(s){
  var cls = s.status==='confirmed' ? ' skill--confirmed' : (s.status==='doubt' ? ' skill--doubt' : '');
  var ico = s.status==='confirmed' ? svg('check',10) : '';
  var ttl = t('w_'+s.status);
  return '<span class="skill'+cls+'" title="'+esc(ttl)+'">'+ico+esc(skillName(s.id))+'</span>';
}

function workerCard(w, origin){
  var langs = Object.keys(w.langs).map(function(k){ return k.toUpperCase()+' '+w.langs[k]; }).join(' · ');
  return '<article class="wcard">'
    + '<div class="wcard-top">'
    +   '<span class="avatar" style="background:'+avatarColor(w.id)+'">'+initials(w.name)+'</span>'
    +   '<div class="wcard-id">'
    +     '<div class="wcard-name"><b>'+esc(w.name)+'</b>'+trustBadge(w)
    +       '<span class="origin origin--'+origin+'">'+t(origin==='engine'?'results_proposed':'results_applied')+'</span></div>'
    +     '<div class="wcard-role">'+esc(w.roles.map(roleName).join(' · '))+'</div>'
    +   '</div>'
    +   '<div class="wcard-score"><b>'+w.score+'</b><span>'+t('w_score')+'</span></div>'
    + '</div>'
    + '<div class="wmeta">'
    +   '<span><b>'+w.jobs+'</b> '+t('w_jobs')+'</span>'
    +   '<span><b>'+w.attendance+'%</b> '+t('w_attendance')+'</span>'
    +   '<span>'+esc(langs)+'</span>'
    + '</div>'
    + '<div class="wmeta">'+w.skills.map(skillTag).join('')+'</div>'
    + '<div class="wcard-act"><button type="button" class="btn btn-teal" data-choose="'+w.id+'">'+t('results_choose')+'</button></div>'
    + '</article>';
}

/* Ensanchado progresivo: primero exacto, luego se relaja un criterio cada vez.
   Si nada funciona, la peticion pasa a la persona de la isla.               */
function searchWithFallback(){
  function relaxed(over){
    var q = {}; for (var k in Q) q[k] = Q[k];
    over.forEach(function(k){ q[k] = null; });
    return matchWorkers(q);
  }
  var exact = matchWorkers(Q);
  if (exact.length) return { list:exact, widened:null };

  var bySlot = relaxed(['slot']);
  if (bySlot.length) return { list:bySlot, widened:'wide_slot' };

  var byDay = relaxed(['slot','dow']);
  if (byDay.length) return { list:byDay, widened:'wide_day' };

  var byZone = relaxed(['slot','dow','zone']);
  if (byZone.length) return { list:byZone, widened:'wide_zone' };

  return { list:[], widened:'none' };
}

function showResults(){
  var res   = searchWithFallback();
  var stage = el('#coStage');

  /* nadie, ni ensanchando: lo coge Fabio */
  if (!res.list.length){
    stage.innerHTML = '<div class="stage"><div class="match-box">'
      + '<div class="match-ring" style="background:#feefdb;color:#a8631a">'+svg('user',30)+'</div>'
      + '<h3>'+t('human_title')+'</h3><p>'+t('human_text')+'</p>'
      + '<div class="note" style="max-width:44ch;margin:1.1rem auto 0;text-align:left">'
      +   svg('info',15)+'<span>'+t('human_note')+'</span></div>'
      + '<div style="margin-top:1.3rem"><button type="button" class="btn btn-soft" id="again">'+t('match_again')+'</button></div>'
      + '</div></div>';
    el('#again').onclick = function(){ resetQuery(); renderCompany(); };
    return;
  }

  var shown  = res.list.slice(0, 4);
  var banner = res.widened
    ? '<div class="note" style="margin:0 0 1rem">'+svg('info',15)
      + '<span><b>'+t('wide_tag')+'.</b> '+t(res.widened)+'</span></div>'
    : '';

  stage.innerHTML = '<div class="stage">'
    + banner
    + '<div class="res-head"><h3>'+t('results_title')+'</h3><p>'+t('results_sub')+'</p></div>'
    + '<div class="cards">'
    +   shown.map(function(w,i){ return workerCard(w, i<3 ? 'engine' : 'applied'); }).join('')
    + '</div></div>';

  els('[data-choose]', stage).forEach(function(b){
    b.onclick = function(){ showMatch(b.dataset.choose); };
  });
}

function showMatch(wid){
  var w = D.WORKERS.filter(function(x){return x.id===wid;})[0];
  var phone = '+34 6' + rint(10,99) + ' ' + rint(100,999) + ' ' + rint(100,999);
  el('#coStage').innerHTML = '<div class="stage"><div class="match-box">'
    + '<div class="match-ring">'+svg('check',30)+'</div>'
    + '<h3>'+t('match_title')+'</h3><p>'+t('match_sub')+'</p>'
    + '<div class="contact"><span>'+t('match_phone')+'</span> '+esc(w.name)+' · '+phone+'</div>'
    + '<div style="margin-top:1.3rem"><button type="button" class="btn btn-soft" id="again">'+t('match_again')+'</button></div>'
    + '</div></div>';
  el('#again').onclick = function(){ resetQuery(); renderCompany(); };
  bump('statMatch');
}

/* ======================================================================== */
/*  PANEL TRABAJADOR                                                        */
/* ======================================================================== */
var ME, myAvail, myExceptions, propState;

function initWorker(){
  ME = D.WORKERS.filter(function(w){ return w.id === 'w1'; })[0];
  myAvail = {};
  Object.keys(ME.avail).forEach(function(k){ myAvail[k] = ME.avail[k].slice(); });
  myExceptions = {};
  propState = null;
}

function renderWorker(){
  el('#wkWho').textContent = ME.name + ' — ' + ME.roles.map(roleName).join(' · ');
  el('#wkStage').innerHTML = '<div class="stage"><div class="wk-grid">'
    + '<div>' + profileBlock() + '</div>'
    + '<div>' + calendarBlock() + proposalBlock() + '</div>'
    + '</div></div>';
  wireWorker();
}

function profileBlock(){
  var langs = Object.keys(ME.langs).map(function(k){ return k.toUpperCase()+' '+ME.langs[k]; }).join(' · ');
  var last  = company(ME.lastJob);
  return '<div class="block">'
    + '<div class="block-h"><h3>'+t('wk_profile')+'</h3></div>'
    + '<div class="prof-top">'
    +   '<span class="avatar" style="background:'+avatarColor(ME.id)+'">'+initials(ME.name)+'</span>'
    +   '<div><div class="prof-name">'+esc(ME.name)+'</div>'
    +   '<div class="prof-role">'+esc(ME.roles.map(roleName).join(' · '))+'</div></div>'
    + '</div>'
    + '<div style="margin-bottom:.8rem">'+trustBadge(ME)
    +   '<div class="block-hint" style="margin:.45rem 0 0">'+t('w_trust_'+ME.trust+'_d')+'</div></div>'
    + '<div class="prof-stats">'
    +   '<div class="pstat"><b>'+ME.score+'</b><span>'+t('w_score')+'</span></div>'
    +   '<div class="pstat"><b>'+ME.jobs+'</b><span>'+t('w_jobs')+'</span></div>'
    +   '<div class="pstat"><b>'+ME.attendance+'%</b><span>'+t('w_attendance')+'</span></div>'
    + '</div>'
    + '<div class="sec-label">'+t('w_langs')+'</div>'
    + '<div style="font-size:.88rem;color:var(--ink-2)">'+esc(langs)+'</div>'
    + '<div class="sec-label">'+t('w_skills')+'</div>'
    + '<div class="wmeta" style="border:0;padding:0;margin:0">'+ME.skills.map(skillTag).join('')+'</div>'
    + '<div class="sec-label">'+t('w_worked_at')+'</div>'
    + '<div style="font-size:.88rem;color:var(--ink-2)">'+esc(last.name)+' · '+esc(zoneName(last.zone))+'</div>'
    + '</div>';
}

function calendarBlock(){
  var slots = [['m','wiz_morning'],['a','wiz_afternoon'],['e','wiz_evening']];
  var order = [1,2,3,4,5,6,0];
  var head = '<tr><th></th>' + order.map(function(dow){
    return '<th>'+esc(dowShort(dow))+'</th>';
  }).join('') + '</tr>';
  var rows = slots.map(function(s){
    var r = '<tr><td class="cal-row-label">'+t(s[1]).slice(0,3)+'</td>';
    order.forEach(function(dow){
      var on = myAvail[dow] && myAvail[dow].indexOf(s[0]) !== -1;
      r += '<td><button type="button" class="slot'+(on?' on':'')+'" data-dow="'+dow+'" data-slot="'+s[0]+'" aria-pressed="'+(!!on)+'">'+svg('check',14)+'</button></td>';
    });
    return r + '</tr>';
  }).join('');

  var exc = '';
  for (var i=0;i<7;i++){
    var date = addDays(i), key = 'd'+i;
    var dow  = date.getDay();
    var hasAvail = myAvail[dow] && myAvail[dow].length;
    if (!hasAvail) continue;
    var off = myExceptions[key] === true;
    exc += '<div class="exc-row'+(off?' off':'')+'" data-exc="'+key+'">'
        +   '<span class="exc-date"><b>'+esc(i===0?t('wiz_today'):(i===1?t('wiz_tomorrow'):dayLong(date)))+'</b>'
        +     '<span>'+esc(dayNum(date))+' · '+esc(myAvail[dow].map(function(s){
                return t(s==='m'?'wiz_m_hours':(s==='a'?'wiz_a_hours':'wiz_e_hours'));
              }).join(', '))+'</span></span>'
        +   '<span class="exc-state">'+(off?t('wk_busy'):t('wk_free'))+'</span>'
        +   '<button type="button" class="toggle'+(off?'':' on')+'" role="switch" aria-checked="'+(!off)+'"></button>'
        + '</div>';
  }

  return '<div class="block" style="margin-bottom:1rem">'
    + '<div class="block-h"><h3>'+t('wk_calendar')+'</h3>'
    +   '<span class="saved" id="savedTag">'+svg('check',12)+t('wk_saved')+'</span></div>'
    + '<div class="block-hint">'+t('wk_calendar_hint')+'</div>'
    + '<div class="sec-label" style="margin-top:0">'+t('wk_recurring')+'</div>'
    + '<table class="cal"><thead>'+head+'</thead><tbody>'+rows+'</tbody></table>'
    + '<div class="sec-label">'+t('wk_exceptions')+'</div>'
    + '<div class="block-hint" style="margin-bottom:.6rem">'+t('wk_exceptions_hint')+'</div>'
    + '<div class="exc">'+exc+'</div>'
    + '</div>';
}

function proposalBlock(){
  var co = company('c1');
  var when = addDays(2);
  if (propState === 'accepted'){
    return '<div class="block"><div class="block-h"><h3>'+t('wk_proposals')+'</h3></div>'
      + '<div class="note note--ok">'+svg('check',15)+'<span>'+t('wk_accepted')+'</span></div></div>';
  }
  if (propState === 'declined'){
    return '<div class="block"><div class="block-h"><h3>'+t('wk_proposals')+'</h3></div>'
      + '<div class="note">'+svg('info',15)+'<span><b>'+t('wk_declined')+'</b> '+t('wk_no_penalty')+'</span></div></div>';
  }
  return '<div class="block"><div class="block-h"><h3>'+t('wk_proposals')+'</h3></div>'
    + '<div class="prop">'
    +   '<span class="prop-tag">'+svg('bag',11)+t('wk_proposal_new')+'</span>'
    +   '<h4>'+roleName('camarero')+'</h4>'
    +   '<div class="prop-co">'+esc(co.name)+' · '+esc(zoneName(co.zone))+'</div>'
    +   '<div class="prop-rows">'
    +     '<div class="prop-row"><i>'+t('wk_when')+'</i><b style="text-transform:capitalize">'+esc(dayLong(when))+' '+esc(dayNum(when))+'</b><small>· '+t('wiz_e_hours')+'</small></div>'
    +     '<div class="prop-row"><i>'+t('wk_where')+'</i><b>'+esc(zoneName(co.zone))+'</b></div>'
    +     '<div class="prop-row"><i>'+t('wk_pay')+'</i><b>4 '+t('wk_hours')+' · 14 €/'+t('wk_hours')+'</b><small>· '+t('wk_pay_note')+'</small></div>'
    +   '</div>'
    +   '<div class="prop-act">'
    +     '<button type="button" class="btn btn-teal" id="propYes">'+t('wk_accept')+'</button>'
    +     '<button type="button" class="btn btn-soft" id="propNo">'+t('wk_decline')+'</button>'
    +   '</div>'
    +   '<div class="note">'+svg('info',15)+'<span>'+t('wk_no_penalty')+'</span></div>'
    + '</div></div>';
}

function flashSaved(){
  var tag = el('#savedTag');
  if (!tag) return;
  tag.classList.add('show');
  setTimeout(function(){ tag.classList.remove('show'); }, 1200);
}

function wireWorker(){
  els('.slot').forEach(function(b){
    b.onclick = function(){
      var dow = b.dataset.dow, s = b.dataset.slot;
      myAvail[dow] = myAvail[dow] || [];
      var i = myAvail[dow].indexOf(s);
      if (i === -1) myAvail[dow].push(s); else myAvail[dow].splice(i,1);
      renderWorker();
      flashSaved();
    };
  });
  els('[data-exc]').forEach(function(row){
    var tg = el('.toggle', row);
    tg.onclick = function(){
      var k = row.dataset.exc;
      myExceptions[k] = !myExceptions[k];
      renderWorker();
      flashSaved();
    };
  });
  var y = el('#propYes'), n = el('#propNo');
  if (y) y.onclick = function(){ propState='accepted'; renderWorker(); };
  if (n) n.onclick = function(){ propState='declined'; renderWorker(); };
}

/* ======================================================================== */
/*  SHELL                                                                   */
/* ======================================================================== */
var currentSide = 'company';

function openDemo(side){
  currentSide = side;
  el('#demo').hidden = false;
  el('#panelCompany').hidden = side !== 'company';
  el('#panelWorker').hidden  = side === 'company';
  el('#demoSwitch').firstElementChild.textContent =
    side === 'company' ? t('demo_switch_worker') : t('demo_switch_company');
  if (side === 'company'){ resetQuery(); renderCompany(); } else { renderWorker(); }
  el('#demo').scrollIntoView({behavior:'smooth', block:'start'});
}

function applyLang(code){
  lang = code; T = IE_I18N[code];
  document.documentElement.lang = code;
  els('[data-i18n]').forEach(function(n){ n.textContent = t(n.dataset.i18n); });
  els('.lang-btn').forEach(function(b){ b.classList.toggle('is-on', b.dataset.lang === code); });
  renderFeed();
  if (!el('#demo').hidden){
    el('#demoSwitch').firstElementChild.textContent =
      currentSide === 'company' ? t('demo_switch_worker') : t('demo_switch_company');
    if (currentSide === 'company') renderCompany(); else renderWorker();
  }
}

function init(){
  feedEl = el('#feed');

  applyLang('es');
  seedFeed();

  countUp('statAvail', availableNowCount());
  countUp('statComp',  D.COMPANIES.length * 9 + rint(0,12));
  countUp('statMatch', rint(58,94));
  countUp('statAvg',   rint(7,14));

  setInterval(pushFeed, 4200);

  els('.lang-btn').forEach(function(b){
    b.onclick = function(){ applyLang(b.dataset.lang); };
  });
  els('[data-open]').forEach(function(b){
    b.onclick = function(){
      if (b.dataset.open === 'company') activeCompany = company('c1');
      else initWorker();
      openDemo(b.dataset.open);
    };
  });
  el('#demoClose').onclick = function(){
    el('#demo').hidden = true;
    el('#doors').scrollIntoView({behavior:'smooth', block:'center'});
  };
  el('#demoSwitch').onclick = function(){
    if (currentSide === 'company'){ initWorker(); openDemo('worker'); }
    else { activeCompany = company('c1'); openDemo('company'); }
  };
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
