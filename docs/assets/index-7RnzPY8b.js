(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))t(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const p of u.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&t(p)}).observe(document,{childList:!0,subtree:!0});function n(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerPolicy&&(u.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?u.credentials="include":l.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function t(l){if(l.ep)return;l.ep=!0;const u=n(l);fetch(l.href,u)}})();const X="jlpt_selected_level",W={N3:"jlpt_n3_daily_state_v1",N4:"jlpt_n4_daily_state_v1"};function ue(){try{const i=(new URLSearchParams(window.location.search).get("level")||"").toUpperCase();if(i==="N3"||i==="N4")return localStorage.setItem(X,i),i;const n=(localStorage.getItem(X)||"").toUpperCase();if(n==="N3"||n==="N4")return n}catch{}return"N3"}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});function oe(a){try{const i=localStorage.getItem(W[a]||W.N3);if(i){const n=JSON.parse(i);if(n&&typeof n=="object"&&n.days)return n}}catch(i){console.warn("Failed to parse saved state:",i)}return{days:{}}}const ee=ue(),e={level:ee,examsByLevel:{},decksByLevel:{},loadingExams:!0,loadingDeck:!1,store:oe(ee),activeTab:"daily",currentExamDay:null,timerPaused:!1,timerInterval:null,showJumpDrawer:!1,openTranscripts:{},playingQuestion:null,activeWordPopup:null,showBackupModal:!1,deckFilter:"all",deckHideMastered:!1,deckHideKatakana:!0,deckViewMode:"card",tableMaskReading:!1,tableMaskMeaning:!1,deckQueue:[],deckCursor:0,deckFlipped:!1,deckSessionReviewed:0};function B(){return e.examsByLevel[e.level]||[]}function re(){return e.decksByLevel[e.level]||[]}function Z(){return e.level==="N4"?90:95}async function le(a){if(e.examsByLevel[a]){e.loadingExams=!1;return}e.loadingExams=!0,v();try{const t=await(await fetch(a==="N4"?"./data/exams-n4.json":"./data/exams-n3.json")).json();e.examsByLevel[a]=t}catch(i){console.error("Failed to load exams for",a,i),e.examsByLevel[a]=[]}e.loadingExams=!1,v()}async function te(a){if(e.decksByLevel[a]){e.deckQueue.length||F(!1);return}e.loadingDeck=!0,v();try{const t=await(await fetch(a==="N4"?"./data/deck-n4.json":"./data/deck-n3.json")).json();e.decksByLevel[a]=t}catch(i){console.error("Failed to load deck for",a,i),e.decksByLevel[a]=[]}e.loadingDeck=!1,F(!1),v()}function _(a){var i,n,t;if(e.store.deck||(e.store.deck={}),a&&typeof a=="object"){const l=String(a.w||"").trim();return((i=e.store.deck[l])==null?void 0:i.status)||((n=e.store.deck[a.id])==null?void 0:n.status)||"new"}return((t=e.store.deck[a])==null?void 0:t.status)||"new"}function G(a,i){e.store.deck||(e.store.deck={});const n=a&&typeof a=="object"?String(a.w||"").trim():String(a||"").trim(),t=e.store.deck[n]||{reps:0};e.store.deck[n]={status:i,reps:(t.reps||0)+1},a&&typeof a=="object"&&a.id&&(e.store.deck[a.id]=e.store.deck[n]),D()}function K(a){var u,p;if(!a.day||!a.qNum)return!1;const i=(u=e.store.days)==null?void 0:u[a.day];if(!i||i.status!=="completed")return!1;const t=B().find(s=>s.day===a.day),l=t==null?void 0:t.questions.find(s=>s.qNum===a.qNum);return l?((p=i.answers)==null?void 0:p[a.qNum])!==l.answer:!1}function pe(a){return/[\u30a0-\u30ff]/.test(String(a||""))}function F(a=!1){const i=re();if(!i.length){e.deckQueue=[],e.deckCursor=0,e.deckFlipped=!1;return}const n=new Set;let t=i.filter(l=>{const u=String(l.w||"").replace(/^[〜～\s]+/,"").trim();if(!u||!/[\u4e00-\u9faf]/.test(u)||e.deckHideKatakana&&pe(u)||n.has(u))return!1;n.add(u);const p=_(l);return e.deckHideMastered&&p==="mastered"&&e.deckFilter!=="weak"&&e.deckViewMode!=="table"?!1:e.deckFilter==="weak"?p==="struggling"||K(l):e.deckFilter==="kanji"?l.cat==="kanji":e.deckFilter==="adverb_grammar"?l.cat==="adverb_grammar":!0});if(!a)t=[...t].sort((l,u)=>{const p=String(l.w||"").replace(/^[^\u4e00-\u9faf]+/,""),s=String(u.w||"").replace(/^[^\u4e00-\u9faf]+/,""),r=p.localeCompare(s,"ja");return r!==0?r:String(l.w||"").localeCompare(String(u.w||""),"ja")});else{t=[...t];for(let l=t.length-1;l>0;l--){const u=Math.floor(Math.random()*(l+1));[t[l],t[u]]=[t[u],t[l]]}}e.deckQueue=t,e.deckCursor=0,e.deckFlipped=!1}function D(){try{const a=W[e.level]||W.N3;localStorage.setItem(a,JSON.stringify(e.store))}catch(a){console.warn("Failed to save state:",a)}}function N(a){if(!e.store.days[a])e.store.days[a]={status:"not_started",answers:{},starSlots:{},remainingSeconds:1800,lastQuestion:1,score:null,completedAt:null};else{const i=e.store.days[a];if(i.remainingSeconds>1800&&(i.remainingSeconds=1800),i.lastQuestion>20&&(i.lastQuestion=1),i.answers)for(const n of Object.keys(i.answers))Number(n)>20&&delete i.answers[n]}return e.store.days[a]}function me(a,i){let n=0,t=0,l=0,u=0,p=0,s=0,r=0;for(const h of a.questions){const o=i[h.qNum]===h.answer;if(h.section==="vocab"||h.section==="grammar")t++,o&&n++;else if(h.section==="reading"){p++;const M=h.mondaiId==="r-m4"?12:16;o&&(u++,l+=M)}else h.section==="listening"&&(r++,o&&s++)}const d=Math.round(n/Math.max(1,t)*60),m=Math.min(60,Math.round(l)),$=Math.round(s/Math.max(1,r)*60),b=d+m+$,f=e.level==="N4"?b>=90&&d+m>=38&&$>=19:b>=95&&d>=19&&m>=19&&$>=19;return{langScore:d,readScore:m,listenScore:$,totalScore:b,passed:f,langRaw:n,langTotal:t,readRaw:u,readTotal:p,listenRaw:s,listenTotal:r}}function V(a){const i=Math.max(0,Math.floor(a)),n=Math.floor(i/60),t=i%60;return`${String(n).padStart(2,"0")}:${String(t).padStart(2,"0")}`}function g(a=""){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const ae=typeof Intl<"u"&&Intl.Segmenter?new Intl.Segmenter("ja",{granularity:"word"}):null;function U(a){return`https://jpdb.io/search?q=${encodeURIComponent(a)}&lang=english#a`}function se(a){if(!a)return"";if(!ae)return`<a class="jp-word" href="${U(a)}" target="_blank" rel="noopener noreferrer">${g(a)}</a>`;const i=[...ae.segment(a)];let n="";for(const t of i){const l=t.segment;if(!(t.isWordLike&&/[\u3040-\u30ff\u4e00-\u9faf]/.test(l))){n+=g(l);continue}n+=`<a class="jp-word" href="${U(l)}" target="_blank" rel="noopener noreferrer">${g(l)}</a>`}return n}function L(a){return a?String(a).split(/(<u>[\s\S]*?<\/u>)/g).map(n=>{if(n.startsWith("<u>")&&n.endsWith("</u>")){const t=n.slice(3,-4);return`<u>${se(t)}</u>`}return n.split(`
`).map(t=>se(t)).join("<br/>")}).join(""):""}function ge(){const a=B();if(!a.length)return 1;for(const i of a)if(N(i.day).status==="in_progress")return i.day;for(const i of a)if(N(i.day).status!=="completed")return i.day;return a.length}let I=null;function ne(){return!document.hidden&&document.hasFocus()}function de(a){let i=0;for(const n of Object.keys(a||{})){const t=Number(n);t>=1&&t<=7?i+=23.3333/7:t>=8&&t<=12?i+=16.6667/5:t>=13&&t<=16?i+=33.3333/4:t>=17&&t<=20&&(i+=26.6667/4)}return Math.min(100,Math.round(i*10)/10)}function ce(a){const i=Math.max(0,1800-a);return i<420?"Target: 語彙 Q1–7 (Finish by 23:00 left / 7m)":i<720?"Target: 文法 Q8–12 (Finish by 18:00 left / 12m)":i<1320?"Target: 読解 Q13–16 (Finish by 08:00 left / 22m)":"Target: 聴解 Q17–20 (Finish by 00:00 / 30m)"}function H(){if(!e.currentExamDay)return;const a=N(e.currentExamDay),i=document.getElementById("live-timer-val"),n=document.getElementById("live-timer-box");i&&(i.textContent=V(a.remainingSeconds)),n&&(e.timerPaused?n.classList.add("paused"):n.classList.remove("paused"));const t=Math.max(0,1800-a.remainingSeconds),l=Math.min(100,t/1800*100),u=de(a.answers),p=document.getElementById("live-time-bar-fill");p&&(p.style.width=`${l.toFixed(1)}%`,l>u+6?p.classList.add("behind"):p.classList.remove("behind"));const s=document.getElementById("live-time-bar-label");s&&(s.textContent=`⏱ ${Math.floor(t/60)}m / 30m`);const r=document.getElementById("live-pace-target-text");r&&(r.textContent=ce(a.remainingSeconds))}function ie(a){J();const i=N(a);i.status!=="completed"&&(i.status==="not_started"&&(i.status="in_progress",D()),e.timerPaused=!ne(),e.timerInterval=setInterval(()=>{if(e.activeTab!=="exam"||!e.currentExamDay)return;if(!ne()){e.timerPaused||(e.timerPaused=!0,D(),H());return}e.timerPaused&&(e.timerPaused=!1,H());const t=N(e.currentExamDay);if(t.status==="completed"){J();return}t.remainingSeconds>0&&(t.remainingSeconds--,H(),t.remainingSeconds%5===0&&D())},1e3))}function J(){e.timerInterval&&(clearInterval(e.timerInterval),e.timerInterval=null),D()}function O(){I&&(I.pause(),I.currentTime=0,I=null),e.playingQuestion=null}document.addEventListener("visibilitychange",()=>{document.hidden?(e.timerPaused=!0,D(),H()):e.activeTab==="exam"&&e.currentExamDay&&(e.timerPaused=!1,H())});window.addEventListener("blur",()=>{e.timerPaused=!0,D(),H()});window.addEventListener("focus",()=>{!document.hidden&&e.activeTab==="exam"&&e.currentExamDay&&(e.timerPaused=!1,H())});window.addEventListener("pagehide",()=>{e.timerPaused=!0,D()});window.addEventListener("beforeunload",()=>{D()});function ve(){return new Promise(a=>{try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return a();const n=new i,t=n.currentTime,l=(u,p,s)=>{const r=n.createOscillator(),d=n.createGain();r.type="sine",r.frequency.setValueAtTime(u,p),d.gain.setValueAtTime(.15,p),d.gain.exponentialRampToValueAtTime(.001,p+s),r.connect(d),d.connect(n.destination),r.start(p),r.stop(p+s)};l(659.25,t,.35),l(523.25,t+.35,.55),setTimeout(()=>{n.close().catch(()=>{}),a()},950)}catch{a()}})}async function be(a){if(e.playingQuestion===a.qNum){O(),v();return}if(O(),e.playingQuestion=a.qNum,v(),await ve(),e.playingQuestion!==a.qNum)return;const i=a.audioFile||`./audio/d${e.currentExamDay}-q${a.qNum}.mp3`,n=new Audio(i);I=n,n.onended=()=>{e.playingQuestion===a.qNum&&(e.playingQuestion=null,I=null,v())},n.onerror=()=>{e.playingQuestion=null,I=null,e.openTranscripts[a.qNum]=!0,v()};try{await n.play()}catch{e.playingQuestion=null,I=null,e.openTranscripts[a.qNum]=!0,v()}}function fe(){const a=B();if(e.loadingExams||!a.length)return`<div class="hero-banner"><b>Loading JLPT ${e.level} Daily Exam Papers...</b></div>`;const i=Z(),n=ge(),t=a.find(b=>b.day===n)||a[0],l=N(t.day),u=Object.keys(l.answers).length;let p=0,s=0,r=0;for(const b of a){const f=N(b.day);f.status==="completed"&&f.score&&(p++,s+=f.score.totalScore,f.score.passed&&r++)}const d=p>0?Math.round(s/p):null;let m="";l.status==="in_progress"?m=`<button class="btn-primary btn-resume" data-action="open-exam" data-day="${t.day}">
      ▶ Resume ${e.level} Day ${t.day} (Q${l.lastQuestion||1} · ${u}/${t.totalQuestions} · ${V(l.remainingSeconds)} left)
    </button>`:m=`<button class="btn-primary" data-action="open-exam" data-day="${t.day}">
      ▶ Start ${e.level} Day ${t.day} Paper (${t.labelEn} · 30 min)
    </button>`;const $=a.map(b=>{const f=N(b.day),h=Object.keys(f.answers).length,E=Math.round(h/b.totalQuestions*100),o=b.day===n;let M='<span class="badge badge-not-started">Not Started · 30:00</span>',A="<span>20 Questions (Vocab 7 · Grammar 5 · Reading 4 · Listening 4)</span>",j=`<button class="btn-primary" data-action="open-exam" data-day="${b.day}">Start 30m Paper</button>`;if(f.status==="in_progress")M=`<span class="badge badge-progress">In Progress · ${h}/${b.totalQuestions} Answered · ${V(f.remainingSeconds)} left</span>`,A=`<span>Paused at Question ${f.lastQuestion||1} — Ready to resume anytime</span>`,j=`<button class="btn-primary btn-resume" data-action="open-exam" data-day="${b.day}">Resume (Q${f.lastQuestion||1}) →</button>`;else if(f.status==="completed"&&f.score){const C=f.score;M=C.passed?`<span class="badge badge-pass">PASS 合格 · ${C.totalScore} / 180</span>`:`<span class="badge badge-fail">SCORE · ${C.totalScore} / 180 (Need ${i})</span>`,A=`<span>言語知識 <b>${C.langScore}/60</b> · 読解 <b>${C.readScore}/60</b> · 聴解 <b>${C.listenScore}/60</b></span>`,j=`
          <button class="btn-secondary" data-action="open-exam" data-day="${b.day}">Review Paper</button>
          <button class="btn-secondary" data-action="reset-day" data-day="${b.day}" title="Reset and retake this day">Retake</button>
        `}return`
        <div class="day-card ${o?"is-current":""} ${f.status==="completed"?"is-completed":""}">
          <div class="day-left">
            <div class="day-num-box">
              <span class="d-small">${e.level} D</span>
              <span class="d-big">${b.day}</span>
            </div>
            <div class="day-info">
              <div class="day-date-row">
                <span class="day-date-title">${g(b.labelEn)}</span>
                <span class="day-date-ja">${g(b.labelJa)}</span>
                ${M}
              </div>
              <div class="day-meta-row">
                ${A}
              </div>
              <div class="day-progress-bar">
                <div class="day-progress-fill ${f.status==="completed"?"done":""}" style="width: ${f.status==="completed"?100:E}%"></div>
              </div>
            </div>
          </div>
          <div class="day-actions">
            ${j}
          </div>
        </div>
      `}).join("");return`
    <div class="hero-banner">
      <div class="hero-top">
        <div>
          <span class="hero-eyebrow">NEXT UP · 30-MINUTE SCALED JLPT ${e.level} EXAM</span>
          <h1 class="hero-title">${e.level} Day ${t.day}: ${g(t.labelEn)}（${g(t.labelJa)}）</h1>
          <p class="hero-desc">
            20 exam-style questions in 30 minutes. Start and stop whenever you want—timer auto-pauses when you leave the tab. Tap any Japanese word to open it in <b>jpdb.io</b>.
          </p>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.45rem; align-items:flex-end;">
          ${m}
          <button class="btn-secondary" style="font-size:0.75rem; padding:0.3rem 0.65rem;" data-action="share-level-link">
            🔗 Copy Direct ${e.level==="N3"?"N4 (Friend)":"N3"} Link
          </button>
        </div>
      </div>
      <div class="hero-stats">
        <div class="stat-pill">
          <div class="stat-label">${e.level} DAYS COMPLETED</div>
          <div class="stat-val">${p} / 34 Days</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">AVERAGE SCORE</div>
          <div class="stat-val">${d!==null?`${d} / 180`:"— / 180"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">PASS RATE (≥${i}/180)</div>
          <div class="stat-val">${p>0?`${r} / ${p} Passed`:"—"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">EXAM DAY</div>
          <div class="stat-val">Sun, 6 Dec 2026</div>
        </div>
      </div>
    </div>

    <div class="days-grid">
      ${$}
    </div>

    <div class="exam-day-milestone">
      <div>
        <div style="font-size:0.75rem; font-weight:800; color:#fcd34d; letter-spacing:0.06em;">DAY 35 · TARGET EXAM DAY</div>
        <div style="font-size:1.2rem; font-weight:900; font-family:var(--font-serif);">Sunday, 6 December 2026（12月6日・日曜日）</div>
        <div style="font-size:0.84rem; color:#d4d4d8; margin-top:0.15rem;">
          Official JLPT ${e.level} Test Day · Pass Mark: ${i} / 180 Total
        </div>
      </div>
      <button class="btn-secondary" data-action="switch-tab" data-tab="progress">
        📈 View ${e.level} Score Trend
      </button>
    </div>
  `}function ye(){const a=B();if(!a.length)return"";const i=a.find(o=>o.day===e.currentExamDay)||a[0],n=N(i.day),t=n.status==="completed",l=Object.keys(n.answers).length,u=Z();let p=null,s=null;const r={vocab:{title:"第1部：言語知識（文字・語彙）",meta:"目安時間：7分（全7問 · Q1〜Q7）"},grammar:{title:"第2部：言語知識（文法）・読解 【文法】",meta:"目安時間：5分（全5問 · Q8〜Q12）"},reading:{title:"第2部：言語知識（文法）・読解 【読解】",meta:"目安時間：10分（全4問 · Q13〜Q16）"},listening:{title:"第3部：聴解（リスニング）",meta:"目安時間：8分（全4問 · Q17〜Q20）"}};let d="";for(const o of i.questions){if(o.section!==p){p=o.section;const x=r[o.section];d+=`
        <div class="section-divider-banner" id="sec-${o.section}">
          <span>${g(x.title)}</span>
          <span style="font-size:0.78rem; font-weight:600; color:#d4d4d8;">${g(x.meta)}</span>
        </div>
      `}if(o.mondaiId!==s&&(s=o.mondaiId,d+=`
        <div class="mondai-header">
          ${L(o.mondaiTitle)}
        </div>
      `),o.passageText||o.passageTable){const x=o.passageTitle?`<div class="passage-title-bar">${L(o.passageTitle)}</div>`:"",k=o.passageLabel?`<b>${g(o.passageLabel)}</b> `:"",q=(o.passageText||"").split(/\n\n+/).filter(Boolean).map((P,R)=>`<p class="passage-paragraph">${R===0?k:""}${L(P)}</p>`).join("");let T="";if(o.passageTable){const P=o.passageTable.headers.map(c=>`<th>${L(c)}</th>`).join(""),R=o.passageTable.rows.map(c=>`<tr>${c.map(y=>`<td>${L(y)}</td>`).join("")}</tr>`).join("");T=`
          <div class="info-table-wrap">
            <table class="info-table">
              <thead><tr>${P}</tr></thead>
              <tbody>${R}</tbody>
            </table>
          </div>
        `}const S=o.passageNotes?`<div class="passage-notes">${L(o.passageNotes)}</div>`:"";d+=`
        <div class="reading-passage-box style-${o.passageStyle||"essay"}">
          ${x}
          ${q}
          ${T}
          ${S}
        </div>
      `}let M="";if(o.section==="listening"){const x=e.playingQuestion===o.qNum,k=t||!!e.openTranscripts[o.qNum],q=o.audioFile||`./audio/d${i.day}-q${o.qNum}.mp3`,T=(o.dialogue||[]).map(S=>`
          <div class="dialogue-line">
            <span class="speaker-tag">${S.speaker==="M"?"男 (Male)":"女 (Female)"}</span>
            ${L(S.text)}
          </div>
        `).join("");M=`
        <div class="listening-box">
          <div style="font-size:0.84rem; color:var(--ink-muted); margin-bottom:0.45rem;">
            🎧 <b>状況：</b>${L(o.listeningIntro)}
          </div>
          <div class="listening-controls">
            <button class="btn-audio ${x?"playing":""}" data-action="play-audio" data-qnum="${o.qNum}">
              ${x?"⏹ 音声を停止 (Stop Audio)":"▶ 会話音声を再生 (Play Dialogue MP3)"}
            </button>
            <audio controls preload="none" src="${g(q)}" style="height:32px; max-width:240px;"></audio>
            <button class="btn-secondary" data-action="toggle-script" data-qnum="${o.qNum}">
              ${k?"スクリプトを隠す (Hide Text)":"📖 スクリプトを見る (Show Dialogue Text)"}
            </button>
          </div>
          ${k?`<div class="dialogue-transcript">
                  ${T}
                </div>`:""}
        </div>
      `}let A="";if(o.type==="star"){const x=n.starSlots[o.qNum]||[null,null,null,null],k=[0,1,2,3].map(T=>{const S=T+1===o.starPosition,P=x[T],R=P!=null?`${P+1}. ${o.options[P]}`:S?"★":`Slot ${T+1}`;return`<span class="star-slot ${S?"is-star":""}" data-action="clear-star-slot" data-qnum="${o.qNum}" data-slot="${T}" title="Tap to clear slot">${g(R)}</span>`}).join(""),q=o.options.map((T,S)=>`<button class="btn-secondary" style="padding:0.22rem 0.55rem; font-size:0.78rem;" data-action="add-star-frag" data-qnum="${o.qNum}" data-optidx="${S}">+${S+1}: ${g(T)}</button>`).join(" ");A=`
        <div class="star-builder-box">
          <div style="font-size:0.75rem; font-weight:700; color:var(--ink-muted); margin-bottom:0.3rem;">
            ★ Sentence Scramble Helper (Tap fragments below to test order; slot ${o.starPosition} is ★):
          </div>
          <div class="star-slots-row">
            <span>${L(o.prefix)}</span>
            ${k}
            <span>${L(o.suffix)}</span>
          </div>
          <div style="display:flex; gap:0.35rem; flex-wrap:wrap; align-items:center;">
            ${q}
            <button class="btn-secondary" style="padding:0.22rem 0.5rem; font-size:0.72rem;" data-action="reset-star" data-qnum="${o.qNum}">Clear</button>
          </div>
        </div>
      `}const j=n.answers[o.qNum],C=o.options.every(x=>x.length<=16)?"compact-grid":"";!t&&o.hideTargetReading&&o.targetWord;const Q=o.options.map((x,k)=>{const q=j===k;let T=q?"selected":"";t&&(k===o.answer?T="graded-correct":q&&k!==o.answer&&(T="graded-wrong"));const S=o.mondaiId==="v-m1"?g(x):L(x,{qNum:o.qNum});return`
          <div class="option-row ${T}">
            <button
              type="button"
              class="option-bubble"
              data-action="select-option"
              data-qnum="${o.qNum}"
              data-optidx="${k}"
              aria-label="Select choice ${k+1}"
            >
              ${k+1}
            </button>
            <div class="option-text">
              ${S}
            </div>
            ${t?k===o.answer?'<span class="badge badge-pass">✓ 正解</span>':q?'<span class="badge badge-fail">✗ 選択</span>':"":`<button type="button" class="option-select-Action" data-action="select-option" data-qnum="${o.qNum}" data-optidx="${k}">
                    ${q?"✓ Chosen":"Select"}
                  </button>`}
          </div>
        `}).join("");let z="";if(t){const x=j===o.answer,k=o.optionReasons||[],q=o.options.map((T,S)=>{const P=S===o.answer,R=j===S&&!P,c=P?"elim-correct":R?"elim-user-wrong":"",y=R?' <span class="badge badge-fail" style="margin-left:0.35rem;">✗ Your Pick</span>':P&&j===S?' <span class="badge badge-pass" style="margin-left:0.35rem;">✓ Your Pick</span>':"",w=k[S]||(P?"✓ Correct choice.":"✗ Distractor.");return`
            <div class="elimination-item ${c}">
              <div>
                <b>Choice ${S+1}: 「${g(T.replace(/<\/?u>/g,""))}」</b>${y}
              </div>
              <div style="margin-top:0.15rem; color:#27272a;">
                ${g(w)}
              </div>
            </div>
          `}).join("");z=`
        <div class="explanation-box ${x?"is-correct":"is-wrong"}">
          <div style="font-size:0.92rem; margin-bottom:0.35rem;">
            <b>${x?`✓ Correct (正解：選択肢 ${o.answer+1})`:j!==void 0?`✗ Incorrect (You picked ${j+1} · Correct Answer: Choice ${o.answer+1})`:`✗ Unanswered (Correct Answer: Choice ${o.answer+1})`}</b>
          </div>
          <div>${g(o.explanation)}</div>
          <div class="elimination-list">
            <div class="elimination-title">🔍 Process of Elimination (消去法 — Why 1–4 Are Right or Wrong):</div>
            ${q}
          </div>
        </div>
      `}d+=`
      <div class="question-block" id="q-block-${o.qNum}">
        ${M}
        <div class="question-prompt-row">
          <span class="q-number-box">${o.qNum}</span>
          <div class="q-prompt-text">
            ${L(o.prompt)}
          </div>
        </div>
        ${A}
        <div class="options-list ${C}">
          ${Q}
        </div>
        ${z}
      </div>
    `}let m="";if(e.showJumpDrawer){const o=(M,A,j)=>{let C="";for(let Q=A;Q<=j;Q++){const z=i.questions[Q-1],x=n.answers[Q];let k=x!==void 0?"answered":"";t&&(k=x===z.answer?"correct":"wrong"),C+=`<button class="q-jump-pill ${k}" data-action="jump-to-q" data-qnum="${Q}">${Q}</button>`}return`
        <div class="q-jump-section-label">${g(M)}</div>
        <div class="q-jump-grid">${C}</div>
      `};m=`
      <div class="q-jump-drawer">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
          <b style="font-size:0.86rem;">Question Navigator (Tap to Jump · Progress Saved Automatically)</b>
          <button class="btn-secondary" style="padding:0.2rem 0.55rem;" data-action="toggle-jump-drawer">Close ✕</button>
        </div>
        ${o("第1部：文字・語彙 (Vocabulary · Q1–Q7 · ~7m)",1,7)}
        ${o("第2部：文法 (Grammar · Q8–Q12 · ~5m)",8,12)}
        ${o("第2部：読解 (Reading · Q13–Q16 · ~10m)",13,16)}
        ${o("第3部：聴解 (Listening · Q17–Q20 · ~8m)",17,20)}
      </div>
    `}let $="";if(t&&n.score){const o=n.score;$=`
      <div class="score-report-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div>
            <span class="badge ${o.passed?"badge-pass":"badge-fail"}" style="font-size:0.82rem; padding:0.22rem 0.65rem;">
              ${o.passed?`合格圏 (PASSED · ≥${u}/180)`:`不合格圏 (BELOW ${u}/180 PASS THRESHOLD)`}
            </span>
            <h2 style="margin:0.35rem 0 0; font-family:var(--font-serif); font-size:1.5rem;">
              JLPT ${e.level} 総合得点：${o.totalScore} / 180 点
            </h2>
          </div>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn-secondary" data-action="switch-tab" data-tab="progress">📈 View Score Graph</button>
            <button class="btn-secondary" data-action="reset-day" data-day="${i.day}">Retake Paper</button>
          </div>
        </div>
        <div class="score-sections-grid">
          <div class="score-sec-box">
            <div style="font-size:0.74rem; color:var(--ink-muted); font-weight:700;">言語知識（文字・語彙・文法）</div>
            <div style="font-size:1.25rem; font-weight:900;">${o.langScore} / 60 点</div>
            <div style="font-size:0.76rem; color:${o.langScore>=19?"var(--pass)":"var(--fail)"};">
              Raw: ${o.langRaw}/${o.langTotal} (${o.langScore>=19?"✓ 基準点19点以上":"✗ 基準点19点未満"})
            </div>
          </div>
          <div class="score-sec-box">
            <div style="font-size:0.74rem; color:var(--ink-muted); font-weight:700;">読解（Reading Comprehension）</div>
            <div style="font-size:1.25rem; font-weight:900;">${o.readScore} / 60 点</div>
            <div style="font-size:0.76rem; color:${o.readScore>=19?"var(--pass)":"var(--fail)"};">
              Raw: ${o.readRaw}/${o.readTotal} (${o.readScore>=19?"✓ 基準点19点以上":"✗ 基準点19点未満"})
            </div>
          </div>
          <div class="score-sec-box">
            <div style="font-size:0.74rem; color:var(--ink-muted); font-weight:700;">聴解（Listening）</div>
            <div style="font-size:1.25rem; font-weight:900;">${o.listenScore} / 60 点</div>
            <div style="font-size:0.76rem; color:${o.listenScore>=19?"var(--pass)":"var(--fail)"};">
              Raw: ${o.listenRaw}/${o.listenTotal} (${o.listenScore>=19?"✓ 基準点19点以上":"✗ 基準点19点未満"})
            </div>
          </div>
        </div>
      </div>
    `}const b=de(n.answers),f=Math.max(0,1800-n.remainingSeconds),h=Math.min(100,f/1800*100),E=h>b+6;return`
    <div class="exam-sticky-bar">
      <div class="exam-sticky-top-row">
        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn-secondary" data-action="pause-and-exit" title="Save progress and return to Daily List">
            ← Save & Exit
          </button>
          <span style="font-weight:800; font-size:0.88rem;">${e.level} · Day ${i.day} (${g(i.labelJa)})</span>
          ${t?"":`<span id="live-pace-target-text" style="font-size:0.74rem; font-weight:700; color:var(--accent); background:var(--accent-bg); padding:0.12rem 0.45rem; border-radius:4px;">${g(ce(n.remainingSeconds))}</span>`}
        </div>

        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          ${t?'<span class="badge badge-pass">Graded · Review Mode</span>':`
            <div id="live-timer-box" class="timer-box ${e.timerPaused?"paused":""} ${n.remainingSeconds<300?"urgent":""}" title="Timer automatically pauses when you switch tabs or close the browser">
              <span>⏱</span>
              <span id="live-timer-val">${V(n.remainingSeconds)}</span>
            </div>
          `}
          <button class="btn-secondary" data-action="toggle-jump-drawer">
            📋 ${l}/${i.totalQuestions} Qs
          </button>
          ${t?"":`<button class="btn-primary" style="padding:0.45rem 0.85rem; font-size:0.82rem;" data-action="grade-exam">
                  ✓ Finish & Grade
                </button>`}
        </div>
      </div>

      ${t?"":`
        <div class="dual-pacing-wrap">
          <div class="pacing-row">
            <div class="pacing-label">✓ Questions<br/><b>${l} / ${i.totalQuestions} Done</b></div>
            <div class="pacing-track" title="Your Question Progress aligned with section time weights">
              <div class="pacing-tick" style="left:23.33%;"></div>
              <div class="pacing-tick" style="left:40.00%;"></div>
              <div class="pacing-tick" style="left:73.33%;"></div>
              <div class="pacing-fill-questions" style="width:${b}%;"></div>
            </div>
          </div>

          <div class="pacing-row">
            <div class="pacing-label">⏱ Time Pace<br/><b id="live-time-bar-label">⏱ ${Math.floor(f/60)}m / 30m</b></div>
            <div class="pacing-track" title="30-Minute Time Pacing with Section Deadlines">
              <div class="pacing-tick" style="left:23.33%;"></div>
              <div class="pacing-tick" style="left:40.00%;"></div>
              <div class="pacing-tick" style="left:73.33%;"></div>
              <div id="live-time-bar-fill" class="pacing-fill-time ${E?"behind":""}" style="width:${h.toFixed(1)}%;"></div>
            </div>
          </div>

          <div class="pacing-zones-legend">
            <div class="pacing-zone-item" style="width:23.33%;">語彙 Q1–7 · <b>by 7m</b> (23:00 left)</div>
            <div class="pacing-zone-item" style="width:16.67%;">文法 Q8–12 · <b>by 12m</b> (18:00)</div>
            <div class="pacing-zone-item" style="width:33.33%;">読解 Q13–16 · <b>by 22m</b> (08:00 left)</div>
            <div class="pacing-zone-item" style="width:26.67%;">聴解 Q17–20 · <b>by 30m</b> (00:00)</div>
          </div>
        </div>
      `}
    </div>

    ${m}
    ${$}

    <div class="exam-booklet">
      <div class="booklet-cover-banner">
        <div class="b-series">2026年12月6日対策 · 30分短縮実戦模試（第${i.day}回 / 全34回 · 全20問）</div>
        <div class="b-level">日本語能力試験 ${e.level}（${g(i.labelJa)}）</div>
        <div class="b-meta">
          💡 <b>Tap any Japanese word</b> in the passages, questions, or choices to open it directly in <b>jpdb.io</b>. Tap the numbered circle <b>(1–4)</b> to choose your answer.
        </div>
      </div>

      ${d}

      ${t?"":`
        <div style="margin-top:2rem; padding-top:1.25rem; border-top:2px solid #18181b; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div>
            <b>Answered: ${l} / ${i.totalQuestions} questions</b>
            <div style="font-size:0.8rem; color:var(--ink-muted);">
              Not finished yet? Tap "Save & Pause for Later" to stop now and continue at lunch or this evening.
            </div>
          </div>
          <div style="display:flex; gap:0.6rem; flex-wrap:wrap;">
            <button class="btn-secondary" data-action="pause-and-exit">⏸ Save & Pause for Later</button>
            <button class="btn-primary" data-action="grade-exam">✓ Complete & Grade Day ${i.day} Paper</button>
          </div>
        </div>
      `}
    </div>
  `}function $e(){const a=B();if(e.loadingExams||!a.length)return`<div class="hero-banner"><b>Loading ${e.level} Score Progress...</b></div>`;const i=Z(),n=a.map(c=>({exam:c,state:N(c.day)})).filter(c=>c.state.status==="completed"&&c.state.score),t=n.length,l=t>0?n[t-1].state.score.totalScore:null,u=t>0?Math.max(...n.map(c=>c.state.score.totalScore)):null,p=t>0?Math.round(n.reduce((c,y)=>c+y.state.score.totalScore,0)/t):null,s=760,r=260,d=44,m=24,$=22,b=38,f=s-d-m,h=r-$-b,E=c=>d+(c-1)/33*f,o=(c,y=180)=>$+h-c/y*h,A=[0,60,i,120,180].map(c=>{const y=o(c,180),w=c===i;return`
        <line x1="${d}" y1="${y}" x2="${s-m}" y2="${y}"
          stroke="${w?"#15803d":"#d6d3c9"}"
          stroke-width="${w?"2":"1"}"
          stroke-dasharray="${w?"6,4":"none"}" />
        <text x="${d-8}" y="${y+4}" text-anchor="end" font-size="11" font-weight="${w?"800":"600"}" fill="${w?"#15803d":"#52525b"}">${c}</text>
      `}).join(""),C=[1,5,10,15,20,25,30,34].map(c=>{const y=E(c),w=a[c-1];return`
        <line x1="${y}" y1="${$}" x2="${y}" y2="${$+h}" stroke="#ece9df" stroke-width="1" />
        <text x="${y}" y="${r-12}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#52525b">D${c} (${w.labelJa.replace(/（.*）/,"")})</text>
      `}).join(""),Q=n.map(c=>`${E(c.exam.day)},${o(c.state.score.totalScore,180)}`).join(" "),z=n.map(c=>{const y=E(c.exam.day),w=o(c.state.score.totalScore,180),Y=c.state.score.passed;return`
        <circle cx="${y}" cy="${w}" r="5.5" fill="${Y?"#15803d":"#b45309"}" stroke="#ffffff" stroke-width="2" />
        <text x="${y}" y="${w-9}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#18181b">${c.state.score.totalScore}</text>
      `}).join(""),k=[0,19,30,45,60].map(c=>{const y=o(c,60),w=c===19;return`
        <line x1="${d}" y1="${y}" x2="${s-m}" y2="${y}"
          stroke="${w?"#b91c1c":"#d6d3c9"}"
          stroke-width="${w?"1.8":"1"}"
          stroke-dasharray="${w?"5,4":"none"}" />
        <text x="${d-8}" y="${y+4}" text-anchor="end" font-size="11" font-weight="${w?"800":"600"}" fill="${w?"#b91c1c":"#52525b"}">${c}</text>
      `}).join(""),q=n.map(c=>`${E(c.exam.day)},${o(c.state.score.langScore,60)}`).join(" "),T=n.map(c=>`${E(c.exam.day)},${o(c.state.score.readScore,60)}`).join(" "),S=n.map(c=>`${E(c.exam.day)},${o(c.state.score.listenScore,60)}`).join(" "),P=n.map(c=>{const y=E(c.exam.day);return`
        <circle cx="${y}" cy="${o(c.state.score.langScore,60)}" r="4" fill="#1d4ed8" />
        <circle cx="${y}" cy="${o(c.state.score.readScore,60)}" r="4" fill="#b45309" />
        <circle cx="${y}" cy="${o(c.state.score.listenScore,60)}" r="4" fill="#15803d" />
      `}).join(""),R=n.length===0?`<tr><td colspan="7" style="text-align:center; padding:1.25rem; color:var(--ink-muted);">No completed ${e.level} daily exams yet. Complete Day 1 to see your score plotted here!</td></tr>`:n.slice().reverse().map(({exam:c,state:y})=>{const w=y.score,Y=V(1800-Math.min(1800,y.remainingSeconds||0));return`
              <tr>
                <td><b>${e.level} Day ${c.day}</b> (${g(c.labelJa)})</td>
                <td><b>${w.totalScore} / 180</b></td>
                <td>${w.langScore} / 60</td>
                <td>${w.readScore} / 60</td>
                <td>${w.listenScore} / 60</td>
                <td>${Y}</td>
                <td>
                  <span class="badge ${w.passed?"badge-pass":"badge-fail"}">${w.passed?"PASS":"FAIL"}</span>
                  <button class="btn-secondary" style="padding:0.2rem 0.5rem; margin-left:0.35rem; font-size:0.74rem;" data-action="open-exam" data-day="${c.day}">Review</button>
                </td>
              </tr>
            `}).join("");return`
    <div class="hero-banner">
      <div class="hero-top">
        <div>
          <span class="hero-eyebrow">${e.level} SCORE TRAJECTORY · NOV 2 – DEC 6</span>
          <h1 class="hero-title">JLPT ${e.level} Daily Score Progress（成績推移）</h1>
          <p class="hero-desc">
            Track your ${e.level} scaled score out of 180 across all 34 daily papers leading up to the exam on Sunday, 6 December.
          </p>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <button class="btn-secondary" data-action="toggle-backup-modal">💾 Backup / Restore ${e.level}</button>
        </div>
      </div>
      <div class="hero-stats">
        <div class="stat-pill">
          <div class="stat-label">${e.level} COMPLETED</div>
          <div class="stat-val">${t} / 34</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">LATEST SCORE</div>
          <div class="stat-val">${l!==null?`${l} / 180`:"—"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">BEST SCORE</div>
          <div class="stat-val">${u!==null?`${u} / 180`:"—"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">AVERAGE SCORE</div>
          <div class="stat-val">${p!==null?`${p} / 180`:"—"}</div>
        </div>
      </div>
    </div>

    <div class="chart-card">
      <h2 class="chart-title">JLPT ${e.level} Total Scaled Score Over Time (0 – 180 Points)</h2>
      <p class="chart-sub">Green dashed line = <b>${i} / 180 Official JLPT ${e.level} Overall Pass Threshold (合格ライン)</b></p>
      <div class="svg-chart-wrap">
        <svg viewBox="0 0 ${s} ${r}" width="100%" style="min-width:520px; display:block;">
          ${A}
          ${C}
          ${n.length>=2?`<polyline fill="none" stroke="#18181b" stroke-width="3" points="${Q}" />`:""}
          ${z}
        </svg>
      </div>
    </div>

    <div class="chart-card">
      <h2 class="chart-title">Sectional Scores Over Time (0 – 60 Points per Section)</h2>
      <p class="chart-sub">
        <span style="color:#1d4ed8; font-weight:800;">● 言語知識 (Vocab/Grammar)</span> &nbsp;·&nbsp;
        <span style="color:#b45309; font-weight:800;">● 読解 (Reading)</span> &nbsp;·&nbsp;
        <span style="color:#15803d; font-weight:800;">● 聴解 (Listening)</span> &nbsp;·&nbsp;
        <span style="color:#b91c1c; font-weight:700;">--- 19 pt Minimum Sectional Floor</span>
      </p>
      <div class="svg-chart-wrap">
        <svg viewBox="0 0 ${s} ${r}" width="100%" style="min-width:520px; display:block;">
          ${k}
          ${C}
          ${n.length>=2?`
            <polyline fill="none" stroke="#1d4ed8" stroke-width="2.2" points="${q}" />
            <polyline fill="none" stroke="#b45309" stroke-width="2.2" points="${T}" />
            <polyline fill="none" stroke="#15803d" stroke-width="2.2" points="${S}" />
          `:""}
          ${P}
        </svg>
      </div>
    </div>

    <div class="chart-card">
      <h2 class="chart-title">Completed ${e.level} Daily Papers Log</h2>
      <div style="overflow-x:auto; margin-top:0.65rem;">
        <table class="history-table">
          <thead>
            <tr>
              <th>Day & Date</th>
              <th>Total (/180)</th>
              <th>言語知識 (/60)</th>
              <th>読解 (/60)</th>
              <th>聴解 (/60)</th>
              <th>Time Spent</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            ${R}
          </tbody>
        </table>
      </div>
    </div>
  `}function we(){const a=re();if(e.loadingDeck||!a.length)return`<div class="hero-banner"><b>Loading JLPT ${e.level} Unlimited Exam Word Deck...</b></div>`;let i=0,n=0;for(const p of a){const s=_(p);s==="mastered"?i++:(s==="struggling"||K(p))&&n++}const t=e.deckQueue,l=t.length>0?t[e.deckCursor%t.length]:null;let u="";if(!l)u=`
      <div class="hero-banner" style="text-align:center; padding:1.5rem 1rem;">
        <h2 style="margin:0 0 0.5rem;">🎉 No cards match this filter right now!</h2>
        <p style="color:var(--ink-muted); font-size:0.86rem; margin:0 0 1rem;">
          ${e.deckFilter==="weak"?'You have no cards marked "Again / Struggling" or missed in completed papers yet. Switch to "All" or "Kanji" to start reviewing!':'All cards in this view are filtered out. Try toggling "Hide Mastered" or "Hide Katakana".'}
        </p>
        <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap;">
          <button class="btn-primary" data-action="set-deck-filter" data-filter="all">Show All Exam Words</button>
          <button class="btn-secondary" data-action="toggle-hide-mastered">Toggle Hide Mastered</button>
        </div>
      </div>
    `;else if(e.deckViewMode==="table"){const p=t.map(s=>{const r=_(s),d=r==="struggling"||K(s);return`
          <tr class="${r==="mastered"?"row-mastered":d?"row-struggling":r==="reviewing"?"row-reviewing":""}" id="tbl-row-${s.id}">
            <td class="cell-word">
              <div class="td-word-stack">
                <span class="td-word-kanji">
                  <a class="jp-word" href="${U(s.w)}" target="_blank" rel="noopener noreferrer">${g(s.w)}</a>
                </span>
                <span class="td-word-faint-hira" data-action="reveal-masked-cell" title="Tap to darken reading">${g(s.r)}</span>
              </div>
            </td>
            <td class="cell-rate">
              <div class="mini-rate-group">
                <button type="button" class="mini-rate-btn ${d?"active":""}" data-action="rate-table-row" data-cid="${s.id}" data-word="${g(s.w)}" data-status="struggling" title="Red · Weak">🔴</button>
                <button type="button" class="mini-rate-btn ${r==="reviewing"?"active":""}" data-action="rate-table-row" data-cid="${s.id}" data-word="${g(s.w)}" data-status="reviewing" title="Amber · Good">🟡</button>
                <button type="button" class="mini-rate-btn ${r==="mastered"?"active":""}" data-action="rate-table-row" data-cid="${s.id}" data-word="${g(s.w)}" data-status="mastered" title="Green · Mastered">🟢</button>
              </div>
            </td>
            <td class="cell-kparts td-kparts-cell">${g(s.km||"—")}</td>
            <td class="cell-meaning td-meaning-cell">${g(s.m)}</td>
          </tr>
        `}).join("");u=`
      <div class="deck-table-container">
        <table class="deck-compact-table">
          <thead>
            <tr>
              <th class="col-word">漢字 (${t.length}) · <span style="opacity:0.65; font-weight:600;">Swipe ➔ for Meaning</span></th>
              <th class="col-rate">🔴 🟡 🟢</th>
              <th class="col-kparts">漢字のパーツ (Kanji Parts)</th>
              <th class="col-meaning">英語の意味 (Definition)</th>
            </tr>
          </thead>
          <tbody>
            ${p}
          </tbody>
        </table>
      </div>
    `}else{const p=_(l),s=K(l),r=l.day?`${e.level} · Day ${l.day} Paper (Q${l.qNum})`:`JLPT ${e.level} Core Exam Bank`;let d='<span class="badge badge-not-started">New Card</span>';p==="mastered"?d='<span class="badge badge-pass">🟢 Mastered</span>':p==="struggling"||s?d=`<span class="badge badge-fail">🔴 ${s?"Missed in Paper":"Struggling / Again"}</span>`:p==="reviewing"&&(d='<span class="badge badge-progress">🟡 Reviewing</span>');const m=U(l.w);u=`
      <div class="anki-card" data-action="flip-anki-card" title="Tap anywhere on card to flip">
        <div>
          <div class="anki-card-top">
            <span style="font-size:0.72rem; font-weight:800; color:var(--ink-muted);">
              ${e.deckCursor%t.length+1}/${t.length} · ${g(r)} · 🟢${i} 🔥${n}
            </span>
            <div style="display:flex; gap:0.35rem; align-items:center;">
              ${d}
            </div>
          </div>

          <div class="anki-word-front">${g(l.w)}</div>

          ${l.ja?`<div class="anki-sentence-front">
                  ${L(l.ja)}
                </div>`:""}
        </div>

        ${e.deckFlipped?`
          <div class="anki-back-reveal">
            <div class="anki-reading-back">【 ${g(l.r)} 】</div>
            <div class="anki-meaning-back">${g(l.m)}</div>
            ${l.en?`<div class="anki-note-back"><b>Context:</b> ${g(l.en)}</div>`:""}
            ${l.note?`<div class="anki-note-back"><b>💡 Note:</b> ${g(l.note)}</div>`:""}
            <div style="display:flex; justify-content:center; margin-top:0.1rem;">
              <a class="btn-jpdb" style="padding:0.32rem 0.7rem; font-size:0.78rem;" href="${m}" target="_blank" rel="noopener noreferrer">
                🔎 Open "${g(l.w)}" in jpdb.io ↗
              </a>
            </div>
          </div>
        `:`
          <div style="text-align:center; padding-top:0.55rem; border-top:1px dashed var(--border-soft); color:var(--accent); font-weight:800; font-size:0.84rem;">
            👆 Tap Card to Reveal Reading & English
          </div>
        `}
      </div>

      <div class="anki-controls-dock">
        <div class="anki-rating-grid">
          <button type="button" class="btn-anki-rate btn-anki-again" data-action="rate-anki-card" data-rating="again">
            <span>🔴 Again</span>
            <small>Repeat soon</small>
          </button>
          <button type="button" class="btn-anki-rate btn-anki-good" data-action="rate-anki-card" data-rating="good">
            <span>🟡 Good</span>
            <small>Keep in deck</small>
          </button>
          <button type="button" class="btn-anki-rate btn-anki-easy" data-action="rate-anki-card" data-rating="easy">
            <span>🟢 Easy</span>
            <small>Mastered</small>
          </button>
        </div>

        <div class="anki-nav-grid">
          <button type="button" class="btn-anki-rate btn-anki-nav" data-action="prev-anki-card">
            <span>⬅ Back (前へ)</span>
            <small>Previous card</small>
          </button>
          <button type="button" class="btn-anki-rate btn-anki-nav" data-action="next-anki-card">
            <span>Skip (次へ) ➡</span>
            <small>Next card</small>
          </button>
        </div>
      </div>
    `}return`
    <div class="deck-viewport">
      <div class="deck-filter-bar">
        <button type="button" class="deck-filter-pill ${e.deckViewMode==="table"?"active":""}" data-action="toggle-deck-view-mode">
          ${e.deckViewMode==="table"?"🃏 Switch to Card View":"📋 Compact Table View"}
        </button>
        <button type="button" class="deck-filter-pill ${e.deckFilter==="all"?"active":""}" data-action="set-deck-filter" data-filter="all">
          📚 All (${t.length})
        </button>
        <button type="button" class="deck-filter-pill ${e.deckFilter==="weak"?"active":""}" data-action="set-deck-filter" data-filter="weak">
          🔥 Weak (${n})
        </button>
        <button type="button" class="deck-filter-pill ${e.deckFilter==="kanji"?"active":""}" data-action="set-deck-filter" data-filter="kanji">
          漢字 Kanji
        </button>
        <button type="button" class="deck-filter-pill ${e.deckFilter==="adverb_grammar"?"active":""}" data-action="set-deck-filter" data-filter="adverb_grammar">
          ✨ Grammar/Adv
        </button>
        <button type="button" class="deck-filter-pill ${e.deckHideKatakana?"active":""}" data-action="toggle-hide-katakana">
          ${e.deckHideKatakana?"ア No Katakana: ON":"ア Katakana: Shown"}
        </button>
        <button type="button" class="deck-filter-pill ${e.deckHideMastered?"active":""}" data-action="toggle-hide-mastered">
          ${e.deckHideMastered?"👁 Hide Mastered":"👁 Show All"}
        </button>
        <button type="button" class="deck-filter-pill" data-action="shuffle-deck">
          🔀 Shuffle
        </button>
      </div>

      ${u}
    </div>
  `}function he(){if(!e.showBackupModal)return"";const a=btoa(unescape(encodeURIComponent(JSON.stringify(e.store))));return`
    <div class="word-popup-backdrop" data-action="toggle-backup-modal"></div>
    <div class="word-popup-sheet" style="border-top-color:#15803d;">
      <div class="word-popup-inner">
        <div class="word-popup-top">
          <b>💾 Backup or Restore Your ${e.level} Progress</b>
          <button class="word-close-btn" data-action="toggle-backup-modal">Close ✕</button>
        </div>
        <div style="font-size:0.82rem; color:#d4d4d8;">
          Your ${e.level} answers and scores are saved automatically in this browser. Copy the backup code below if you want to move your progress to another phone/browser.
        </div>
        <textarea id="backup-code-box" rows="3" style="width:100%; font-family:monospace; font-size:0.76rem; padding:0.45rem; border-radius:4px;">${g(a)}</textarea>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn-jpdb" data-action="copy-backup">📋 Copy Backup Code</button>
          <button class="btn-jpdb secondary" data-action="restore-backup">📥 Restore from Code in Box</button>
        </div>
      </div>
    </div>
  `}function v(){const a=document.getElementById("app");if(!a)return;let i="";e.activeTab==="exam"&&e.currentExamDay?i=ye():e.activeTab==="deck"?i=we():e.activeTab==="progress"?i=$e():i=fe(),a.innerHTML=`
    <header class="app-header">
      <div class="header-inner">
        <div class="brand-group">
          <div class="level-switcher" role="group" aria-label="Select JLPT Level">
            <button type="button" class="level-btn ${e.level==="N3"?"active":""}" data-action="switch-level" data-level="N3">N3</button>
            <button type="button" class="level-btn ${e.level==="N4"?"active":""}" data-action="switch-level" data-level="N4">N4</button>
          </div>
          <div style="cursor:pointer;" data-action="switch-tab" data-tab="daily">
            <div class="brand-title">JLPT ${e.level} · 30-Min Daily Exam</div>
            <div class="brand-sub">Mon 2 Nov – Sun 6 Dec 2026 · Tap any word for jpdb.io</div>
          </div>
        </div>
        <nav class="nav-tabs">
          <button class="nav-tab ${e.activeTab==="daily"||e.activeTab==="exam"?"active":""}" data-action="switch-tab" data-tab="daily">
            📅 ${e.level} Papers
          </button>
          <button class="nav-tab ${e.activeTab==="deck"?"active":""}" data-action="switch-tab" data-tab="deck">
            🃏 Word Deck
          </button>
          <button class="nav-tab ${e.activeTab==="progress"?"active":""}" data-action="switch-tab" data-tab="progress">
            📈 Scores
          </button>
        </nav>
      </div>
    </header>

    <main class="main-container ${e.activeTab==="deck"?"is-deck-tab":""}">
      ${i}
    </main>

    ${he()}
  `}document.addEventListener("click",a=>{var l,u,p;if(a.target.closest(".jp-word")){a.stopPropagation();return}const n=a.target.closest("[data-action]");if(!n)return;const t=n.getAttribute("data-action");if(t==="switch-level"){const s=(n.getAttribute("data-level")||"N3").toUpperCase();if(s===e.level)return;J(),O(),e.level=s;try{localStorage.setItem(X,s);const r=new URL(window.location.href);r.searchParams.set("level",s.toLowerCase()),window.history.replaceState({},"",r.toString())}catch{}e.store=oe(s),e.currentExamDay=null,e.deckQueue=[],e.activeTab==="exam"&&(e.activeTab="daily"),le(s),e.activeTab==="deck"&&te(s);return}if(t==="share-level-link"){const s=e.level==="N3"?"n4":"n3",r=`${window.location.origin}${window.location.pathname}?level=${s}`;(l=navigator.clipboard)==null||l.writeText(r),alert(`Copied direct ${s.toUpperCase()} link to clipboard:
${r}

Send this to your friend—it will open directly on the ${s.toUpperCase()} exam papers with his own independent progress!`);return}if(t==="switch-tab"){const s=n.getAttribute("data-tab");J(),O(),e.activeWordPopup=null,e.activeTab=s,s==="deck"&&te(e.level),window.scrollTo({top:0,behavior:"smooth"}),v();return}if(t==="toggle-deck-view-mode"){const s=(u=e.deckQueue[e.deckCursor%Math.max(1,e.deckQueue.length)])==null?void 0:u.w;if(e.deckViewMode=e.deckViewMode==="card"?"table":"card",F(!1),s&&e.deckQueue.length){const r=e.deckQueue.findIndex(d=>d.w===s);r!==-1&&(e.deckCursor=r)}v();return}if(t==="toggle-hide-katakana"){e.deckHideKatakana=!e.deckHideKatakana,F(!1),v();return}if(t==="toggle-mask-reading"){e.tableMaskReading=!e.tableMaskReading,v();return}if(t==="toggle-mask-meaning"){e.tableMaskMeaning=!e.tableMaskMeaning,v();return}if(t==="reveal-masked-cell"){n.classList.toggle("revealed");return}if(t==="rate-table-row"){const s=n.getAttribute("data-cid"),r=n.getAttribute("data-word"),d=n.getAttribute("data-status");if(s&&d){const m={id:s,w:r||s},b=_(m)===d?"new":d;G(m,b);const f=document.getElementById(`tbl-row-${s}`);f&&(f.classList.remove("row-struggling","row-reviewing","row-mastered"),b==="struggling"?f.classList.add("row-struggling"):b==="reviewing"?f.classList.add("row-reviewing"):b==="mastered"&&f.classList.add("row-mastered"),f.querySelectorAll(".mini-rate-btn").forEach(h=>{h.classList.toggle("active",h.getAttribute("data-status")===b)}))}return}if(t==="flip-anki-card"){e.deckFlipped=!e.deckFlipped,v();return}if(t==="rate-anki-card"){const s=n.getAttribute("data-rating"),r=e.deckQueue;if(!r.length)return;const d=e.deckCursor%r.length,m=r[d];if(e.deckSessionReviewed++,s==="again"){G(m,"struggling"),r.splice(d,1);const $=Math.min(r.length,d+5);r.splice($,0,m),r.length>0&&(e.deckCursor=d%r.length)}else s==="good"?(G(m,"reviewing"),e.deckCursor=(d+1)%r.length):s==="easy"&&(G(m,"mastered"),e.deckHideMastered&&e.deckFilter!=="weak"?(r.splice(d,1),r.length>0&&(e.deckCursor=d%r.length)):e.deckCursor=(d+1)%r.length);e.deckFlipped=!1,v();return}if(t==="set-deck-filter"){e.deckFilter=n.getAttribute("data-filter")||"all",F(!1),v();return}if(t==="toggle-hide-mastered"){e.deckHideMastered=!e.deckHideMastered,F(!1),v();return}if(t==="shuffle-deck"){F(!0),v();return}if(t==="prev-anki-card"){const s=e.deckQueue;if(!s.length)return;e.deckCursor=(e.deckCursor-1+s.length)%s.length,e.deckFlipped=!1,v();return}if(t==="next-anki-card"){const s=e.deckQueue;if(!s.length)return;e.deckCursor=(e.deckCursor+1)%s.length,e.deckFlipped=!1,v();return}if(t==="open-exam"){const s=Number(n.getAttribute("data-day"));e.currentExamDay=s,e.activeTab="exam",e.showJumpDrawer=!1,e.activeWordPopup=null;const r=N(s);ie(s),v(),r.status==="in_progress"&&r.lastQuestion>1?setTimeout(()=>{const d=document.getElementById(`q-block-${r.lastQuestion}`);d&&d.scrollIntoView({behavior:"smooth",block:"center"})},60):window.scrollTo({top:0,behavior:"smooth"});return}if(t==="pause-and-exit"){J(),O(),e.activeWordPopup=null,e.activeTab="daily",window.scrollTo({top:0,behavior:"smooth"}),v();return}if(t==="toggle-jump-drawer"){e.showJumpDrawer=!e.showJumpDrawer,v();return}if(t==="jump-to-q"){const s=Number(n.getAttribute("data-qnum"));e.showJumpDrawer=!1,v();const r=document.getElementById(`q-block-${s}`);r&&r.scrollIntoView({behavior:"smooth",block:"center"});return}if(t==="select-option"){const s=Number(n.getAttribute("data-qnum")),r=Number(n.getAttribute("data-optidx"));if(!e.currentExamDay)return;const d=N(e.currentExamDay);if(d.status==="completed")return;d.answers[s]===r?delete d.answers[s]:d.answers[s]=r,d.lastQuestion=s,d.status="in_progress",e.activeWordPopup=null,D(),v();return}if(t==="add-star-frag"){const s=Number(n.getAttribute("data-qnum")),r=Number(n.getAttribute("data-optidx")),d=N(e.currentExamDay);if(d.status==="completed")return;const m=d.starSlots[s]?[...d.starSlots[s]]:[null,null,null,null],$=m.findIndex(b=>b==null);if($!==-1&&!m.includes(r)){m[$]=r,d.starSlots[s]=m;const f=B().find(E=>E.day===e.currentExamDay),h=f==null?void 0:f.questions.find(E=>E.qNum===s);h&&m[h.starPosition-1]!==null&&(d.answers[s]=m[h.starPosition-1]),d.lastQuestion=s,D(),v()}return}if(t==="clear-star-slot"){const s=Number(n.getAttribute("data-qnum")),r=Number(n.getAttribute("data-slot")),d=N(e.currentExamDay);if(d.status==="completed"||!d.starSlots[s])return;d.starSlots[s][r]=null,D(),v();return}if(t==="reset-star"){const s=Number(n.getAttribute("data-qnum")),r=N(e.currentExamDay);if(r.status==="completed")return;delete r.starSlots[s],D(),v();return}if(t==="play-audio"){const s=Number(n.getAttribute("data-qnum")),d=B().find($=>$.day===e.currentExamDay),m=d==null?void 0:d.questions.find($=>$.qNum===s);m&&be(m);return}if(t==="toggle-script"){const s=Number(n.getAttribute("data-qnum"));e.openTranscripts[s]=!e.openTranscripts[s],v();return}if(t==="grade-exam"){if(!e.currentExamDay)return;const r=B().find($=>$.day===e.currentExamDay),d=N(r.day),m=Object.keys(d.answers).length;if(m<r.totalQuestions&&!window.confirm(`You have answered ${m} of ${r.totalQuestions} questions.

If you just want to take a break and continue later today, tap Cancel and use "Save & Exit".

Grade ${e.level} Day ${r.day} paper now?`))return;J(),O(),d.status="completed",d.score=me(r,d.answers),d.completedAt=new Date().toISOString(),D(),window.scrollTo({top:0,behavior:"smooth"}),v();return}if(t==="reset-day"){const s=Number(n.getAttribute("data-day"));if(!window.confirm(`Reset all answers and timer for ${e.level} Day ${s}?`))return;delete e.store.days[s],D(),e.activeTab==="exam"&&e.currentExamDay===s&&ie(s),v();return}if(t==="toggle-backup-modal"){e.showBackupModal=!e.showBackupModal,v();return}if(t==="copy-backup"){const s=document.getElementById("backup-code-box");s&&(s.select(),(p=navigator.clipboard)==null||p.writeText(s.value),alert("Backup code copied to clipboard!"));return}if(t==="restore-backup"){const s=document.getElementById("backup-code-box");if(!s||!s.value.trim())return;try{const r=JSON.parse(decodeURIComponent(escape(atob(s.value.trim()))));r&&r.days&&(e.store=r,D(),e.showBackupModal=!1,v(),alert("Progress restored successfully!"))}catch{alert("Invalid backup code.")}}});document.addEventListener("keydown",a=>{var i,n,t,l,u;e.activeTab!=="deck"||e.showBackupModal||a.target&&(a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA")||(a.code==="Space"?(a.preventDefault(),e.deckFlipped=!e.deckFlipped,v()):a.key==="1"?(i=document.querySelector('[data-rating="again"]'))==null||i.click():a.key==="2"?(n=document.querySelector('[data-rating="good"]'))==null||n.click():a.key==="3"?(t=document.querySelector('[data-rating="easy"]'))==null||t.click():a.key==="ArrowRight"?(l=document.querySelector('[data-action="next-anki-card"]'))==null||l.click():a.key==="ArrowLeft"&&((u=document.querySelector('[data-action="prev-anki-card"]'))==null||u.click()))});le(e.level);
