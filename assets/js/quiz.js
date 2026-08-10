/* ==========================================================================
   Isla Extra — questionario operativo
   Pagina statica: le risposte restano in locale finche' non vengono inviate.
   ========================================================================== */
(function () {
'use strict';

var Q       = IE_QUIZ;
var STORAGE = 'ie_quiz_v1';
var answers = {};
var step    = 0;                 /* indice di sezione */

/* --------------------------------------------------------------- utils - */
function el(s, r){ return (r||document).querySelector(s); }
function els(s, r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
function esc(s){
  return String(s).replace(/[&<>"]/g, function(c){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c];
  });
}
var CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l5 5L20 6" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function allQuestions(){
  var out = [];
  Q.sections.forEach(function(s){ s.questions.forEach(function(q){ out.push(q); }); });
  return out;
}

/* ------------------------------------------------------------ storage -- */
function load(){
  try {
    var raw = localStorage.getItem(STORAGE);
    if (!raw) return false;
    var d = JSON.parse(raw);
    answers = d.answers || {};
    step    = typeof d.step === 'number' ? d.step : 0;
    return Object.keys(answers).length > 0;
  } catch (e) { return false; }
}

var saveTimer;
function save(){
  try {
    localStorage.setItem(STORAGE, JSON.stringify({ answers: answers, step: step }));
  } catch (e) { /* spazio pieno o modalita' privata: si continua comunque */ }
  var tag = el('#saveTag');
  if (!tag) return;
  tag.hidden = false;
  tag.classList.add('show');
  clearTimeout(saveTimer);
  saveTimer = setTimeout(function(){ tag.classList.remove('show'); }, 1400);
}

/* ------------------------------------------------------------ risposte - */
function isAnswered(q){
  var v = answers[q.id];
  if (v === undefined || v === null) return false;
  if (Array.isArray(v)) return v.length > 0;
  return String(v).trim().length > 0;
}

function answeredCount(){
  return allQuestions().filter(isAnswered).length;
}

function missingIn(section){
  return section.questions.filter(function(q){ return q.required && !isAnswered(q); });
}

/* ------------------------------------------------------------ render --- */
function progress(){
  var bar = el('#progressBar'), fill = el('#progressFill');
  var total = Q.sections.length;
  bar.hidden = false;
  fill.style.width = Math.round((step / total) * 100) + '%';
}

function optionHTML(q, opt, i){
  var v  = answers[q.id];
  var on = q.type === 'multi' ? (Array.isArray(v) && v.indexOf(opt) !== -1) : v === opt;
  var full = q.type === 'multi' && q.max && Array.isArray(v) && v.length >= q.max && !on;
  return '<button type="button" class="o'+(on?' on':'')+(full?' disabled':'')+'" '
       + 'data-q="'+esc(q.id)+'" data-val="'+esc(opt)+'" role="'+(q.type==='multi'?'checkbox':'radio')+'" '
       + 'aria-checked="'+(on?'true':'false')+'">'
       + '<span class="o-box '+(q.type==='multi'?'check':'radio')+'">'+CHECK+'</span>'
       + '<span>'+esc(opt)+'</span></button>';
}

function questionHTML(q){
  var body = '';

  if (q.type === 'single' || q.type === 'multi'){
    body = q.options.map(function(o,i){ return optionHTML(q,o,i); }).join('');
  }
  else if (q.type === 'text'){
    body = '<textarea data-q="'+esc(q.id)+'" placeholder="'+esc(q.placeholder||'')+'">'
         + esc(answers[q.id]||'') + '</textarea>';
  }
  else if (q.type === 'short'){
    body = '<input type="text" data-q="'+esc(q.id)+'" placeholder="'+esc(q.placeholder||'')+'" '
         + 'value="'+esc(answers[q.id]||'')+'">';
  }
  else if (q.type === 'scale'){
    var cur = answers[q.id];
    var btns = '';
    for (var i=1;i<=5;i++){
      btns += '<button type="button" data-q="'+esc(q.id)+'" data-val="'+i+'" '
            + 'class="'+(String(cur)===String(i)?'on':'')+'">'+i+'</button>';
    }
    body = '<div class="scale">'+btns+'</div>'
         + '<div class="scale-labels"><span>'+esc(q.labels[0])+'</span><span>'+esc(q.labels[1])+'</span></div>';
  }

  var opt = !q.required ? '<span class="q-opt">facoltativa</span>' : '';
  var max = (q.type==='multi' && q.max) ? '<span class="q-opt">max '+q.max+'</span>' : '';

  return '<article class="q" id="q-'+esc(q.id)+'">'
       + '<h3 class="q-title">'+esc(q.q)+opt+max+'</h3>'
       + (q.hint ? '<p class="q-hint">'+esc(q.hint)+'</p>' : '')
       + '<div class="q-body">'+body+'</div>'
       + '</article>';
}

function renderSection(){
  var s = Q.sections[step];
  el('#cover').hidden = true;
  el('#done').hidden  = true;
  var stage = el('#stage');
  stage.hidden = false;

  stage.innerHTML =
      '<div class="sec-head">'
    +   '<p class="sec-count">Parte '+(step+1)+' di '+Q.sections.length+'</p>'
    +   '<h2>'+esc(s.title)+'</h2>'
    +   (s.intro ? '<p class="sec-intro">'+esc(s.intro)+'</p>' : '')
    + '</div>'
    + s.questions.map(questionHTML).join('')
    + '<p class="nav-warn" id="warn"></p>'
    + '<div class="nav">'
    +   '<button type="button" class="btn btn-soft" id="prev">'+(step===0?'Indietro':'Indietro')+'</button>'
    +   '<div class="nav-right">'
    +     '<button type="button" class="btn btn-teal" id="next">'
    +       (step === Q.sections.length-1 ? 'Concludi' : 'Avanti')
    +     '</button>'
    +   '</div>'
    + '</div>';

  wire();
  progress();
  window.scrollTo({ top:0, behavior:'smooth' });
}

/* ------------------------------------------------------------- eventi -- */
function wire(){
  els('#stage .o').forEach(function(b){
    b.onclick = function(){
      var qid = b.dataset.q, val = b.dataset.val;
      var q   = allQuestions().filter(function(x){ return x.id === qid; })[0];

      if (q.type === 'multi'){
        var arr = Array.isArray(answers[qid]) ? answers[qid].slice() : [];
        var i   = arr.indexOf(val);
        if (i !== -1) arr.splice(i,1);
        else {
          if (q.max && arr.length >= q.max) return;   /* limite raggiunto */
          arr.push(val);
        }
        answers[qid] = arr;
      } else {
        answers[qid] = val;
      }
      save();
      redrawQuestion(q);
    };
  });

  els('#stage .scale button').forEach(function(b){
    b.onclick = function(){
      answers[b.dataset.q] = b.dataset.val;
      save();
      redrawQuestion(allQuestions().filter(function(x){ return x.id === b.dataset.q; })[0]);
    };
  });

  els('#stage textarea, #stage input[type=text]').forEach(function(f){
    f.oninput = function(){
      answers[f.dataset.q] = f.value;
      var card = el('#q-'+f.dataset.q);
      if (card) card.classList.remove('missing');
      clearTimeout(f._t);
      f._t = setTimeout(save, 500);
    };
  });

  el('#prev').onclick = function(){
    if (step === 0){ showCover(); return; }
    step--; save(); renderSection();
  };
  el('#next').onclick = function(){
    var miss = missingIn(Q.sections[step]);
    if (miss.length){
      var warn = el('#warn');
      warn.textContent = miss.length === 1
        ? 'Manca una risposta qui sopra.'
        : 'Mancano ' + miss.length + ' risposte qui sopra.';
      warn.classList.add('show');
      miss.forEach(function(q){
        var c = el('#q-'+q.id); if (c) c.classList.add('missing');
      });
      var first = el('#q-'+miss[0].id);
      if (first) first.scrollIntoView({behavior:'smooth', block:'center'});
      return;
    }
    if (step === Q.sections.length-1){ showDone(); return; }
    step++; save(); renderSection();
  };
}

/* ridisegna una sola domanda, per non perdere il punto di scorrimento */
function redrawQuestion(q){
  var old = el('#q-'+q.id);
  if (!old) return;
  var tmp = document.createElement('div');
  tmp.innerHTML = questionHTML(q);
  old.replaceWith(tmp.firstChild);
  var warn = el('#warn'); if (warn) warn.classList.remove('show');
  wire();
}

/* --------------------------------------------------------------- fine -- */
function buildText(){
  var lines = ['ISLA EXTRA — RISPOSTE DI FABIO', ''];
  Q.sections.forEach(function(s){
    lines.push('== ' + s.title.toUpperCase() + ' ==');
    s.questions.forEach(function(q){
      var v = answers[q.id];
      if (Array.isArray(v)) v = v.join('; ');
      if (q.type === 'scale' && v) v = v + '/5';
      lines.push('- ' + q.q);
      lines.push('  ' + (v && String(v).trim() ? v : '(nessuna risposta)'));
    });
    lines.push('');
  });
  lines.push('Compilate: ' + answeredCount() + ' su ' + allQuestions().length + ' domande.');
  return lines.join('\n');
}

function buildJSON(){
  var out = { progetto:'isla-extra', versione:1, risposte:{} };
  Q.sections.forEach(function(s){
    s.questions.forEach(function(q){
      out.risposte[q.id] = { domanda:q.q, risposta: answers[q.id] !== undefined ? answers[q.id] : null };
    });
  });
  return JSON.stringify(out, null, 2);
}

function download(name, text, mime){
  var blob = new Blob([text], {type: mime + ';charset=utf-8'});
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
}

function toast(msg){
  var t = el('#toast');
  if (!t){
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(function(){ t.classList.remove('show'); }, 2200);
}

function copyText(text){
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text)
      .then(function(){ toast('Risposte copiate'); })
      .catch(function(){ fallbackCopy(text); });
  } else fallbackCopy(text);
}
function fallbackCopy(text){
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); toast('Risposte copiate'); }
  catch (e){ toast('Copia non riuscita: scarica il file'); }
  ta.remove();
}

function recapHTML(){
  var out = '';
  Q.sections.forEach(function(s){
    out += '<p class="recap-sec">'+esc(s.title)+'</p>';
    s.questions.forEach(function(q){
      var v = answers[q.id];
      if (Array.isArray(v)) v = v.join(' · ');
      if (q.type === 'scale' && v) v = v + '/5';
      var empty = !v || !String(v).trim();
      out += '<div class="recap-q'+(empty?' empty':'')+'"><b>'+esc(q.q)+'</b>'
           + '<span>'+esc(empty ? 'nessuna risposta' : v)+'</span></div>';
    });
  });
  return out;
}

function showDone(){
  el('#stage').hidden = true;
  el('#cover').hidden = true;
  var done = el('#done');
  done.hidden = false;
  el('#progressFill').style.width = '100%';

  var n = answeredCount(), tot = allQuestions().length;

  done.innerHTML =
      '<div class="done-ring">'+CHECK+'</div>'
    + '<h2>Finito, grazie</h2>'
    + '<p>Hai risposto a <b>'+n+'</b> domande su '+tot+'. '
    +   'Ora mandami le risposte con uno di questi pulsanti: con queste impostiamo la costruzione della piattaforma.</p>'
    + '<div class="send-actions">'
    +   '<button type="button" class="btn btn-teal wide" id="waBtn">Invia su WhatsApp</button>'
    +   '<button type="button" class="btn btn-soft" id="copyBtn">Copia tutto</button>'
    +   '<button type="button" class="btn btn-soft" id="txtBtn">Scarica il file</button>'
    + '</div>'
    + '<details class="recap"><summary>Rivedi le tue risposte</summary>'
    +   '<div class="recap-body">'+recapHTML()+'</div></details>'
    + '<div class="nav"><button type="button" class="btn btn-soft" id="backBtn">Torna alle domande</button></div>';

  el('#copyBtn').onclick = function(){ copyText(buildText()); };
  el('#txtBtn').onclick  = function(){
    download('isla-extra-risposte-fabio.txt', buildText(), 'text/plain');
    download('isla-extra-risposte-fabio.json', buildJSON(), 'application/json');
    toast('File scaricati');
  };
  el('#waBtn').onclick = function(){
    /* il testo completo supera il limite di un link: si copia e si apre WhatsApp */
    copyText(buildText());
    setTimeout(function(){
      window.open('https://wa.me/?text=' + encodeURIComponent(
        'Isla Extra — ho compilato le domande operative. Incollo qui sotto le risposte.'), '_blank');
    }, 400);
  };
  el('#backBtn').onclick = function(){ step = Q.sections.length-1; renderSection(); };

  window.scrollTo({ top:0, behavior:'smooth' });
}

/* ------------------------------------------------------------ copertina */
function showCover(){
  el('#stage').hidden = true;
  el('#done').hidden  = true;
  el('#cover').hidden = false;
  el('#progressBar').hidden = true;
  window.scrollTo({ top:0, behavior:'smooth' });
}

function initCover(){
  el('#coverTitle').textContent = Q.meta.title;
  el('#coverSub').textContent   = Q.meta.subtitle;
  el('#coverNote').textContent  = Q.meta.note;

  el('#coverList').innerHTML = Q.sections.map(function(s,i){
    return '<li><b>'+(i+1)+'</b><span>'+esc(s.title)+'</span></li>';
  }).join('')
  + '<li><b></b><span><b>'+allQuestions().length+' domande</b>, circa '+esc(Q.meta.time)+'</span></li>';

  var had = load();
  var resume = el('#resumeBtn');
  if (had){
    resume.hidden = false;
    resume.textContent = 'Riprendi (' + answeredCount() + ' risposte salvate)';
    resume.onclick = function(){ renderSection(); };
    el('#startBtn').textContent = 'Ricomincia da capo';
    el('#startBtn').onclick = function(){
      if (!window.confirm('Vuoi cancellare le risposte salvate e ricominciare?')) return;
      answers = {}; step = 0; save(); renderSection();
    };
  } else {
    el('#startBtn').onclick = function(){ step = 0; renderSection(); };
  }
}

function init(){
  initCover();
  window.addEventListener('beforeunload', function(){ save(); });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
