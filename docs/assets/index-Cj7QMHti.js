(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))t(l);new MutationObserver(l=>{for(const p of l)if(p.type==="childList")for(const s of p.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function n(l){const p={};return l.integrity&&(p.integrity=l.integrity),l.referrerPolicy&&(p.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?p.credentials="include":l.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function t(l){if(l.ep)return;l.ep=!0;const p=n(l);fetch(l.href,p)}})();const X="jlpt_selected_level",U={N3:"jlpt_n3_daily_state_v1",N4:"jlpt_n4_daily_state_v1"};function ue(){try{const i=(new URLSearchParams(window.location.search).get("level")||"").toUpperCase();if(i==="N3"||i==="N4")return localStorage.setItem(X,i),i;const n=(localStorage.getItem(X)||"").toUpperCase();if(n==="N3"||n==="N4")return n}catch{}return"N3"}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});function oe(a){try{const i=localStorage.getItem(U[a]||U.N3);if(i){const n=JSON.parse(i);if(n&&typeof n=="object"&&n.days)return n}}catch(i){console.warn("Failed to parse saved state:",i)}return{days:{}}}const ee=ue(),e={level:ee,examsByLevel:{},decksByLevel:{},loadingExams:!0,loadingDeck:!1,store:oe(ee),activeTab:"daily",currentExamDay:null,timerPaused:!1,timerInterval:null,showJumpDrawer:!1,openTranscripts:{},playingQuestion:null,activeWordPopup:null,showBackupModal:!1,deckFilter:"all",deckHideMastered:!0,deckHideKatakana:!0,deckViewMode:"card",tableMaskReading:!1,tableMaskMeaning:!1,deckQueue:[],deckCursor:0,deckFlipped:!1,deckSessionReviewed:0};function B(){return e.examsByLevel[e.level]||[]}function re(){return e.decksByLevel[e.level]||[]}function Z(){return e.level==="N4"?90:95}async function le(a){if(e.examsByLevel[a]){e.loadingExams=!1;return}e.loadingExams=!0,m();try{const t=await(await fetch(a==="N4"?"./data/exams-n4.json":"./data/exams-n3.json")).json();e.examsByLevel[a]=t}catch(i){console.error("Failed to load exams for",a,i),e.examsByLevel[a]=[]}e.loadingExams=!1,m()}async function te(a){if(e.decksByLevel[a]){e.deckQueue.length||z(!1);return}e.loadingDeck=!0,m();try{const t=await(await fetch(a==="N4"?"./data/deck-n4.json":"./data/deck-n3.json")).json();e.decksByLevel[a]=t}catch(i){console.error("Failed to load deck for",a,i),e.decksByLevel[a]=[]}e.loadingDeck=!1,z(!1),m()}function V(a){var i;return e.store.deck||(e.store.deck={}),((i=e.store.deck[a])==null?void 0:i.status)||"new"}function _(a,i){e.store.deck||(e.store.deck={});const n=e.store.deck[a]||{reps:0};e.store.deck[a]={status:i,reps:(n.reps||0)+1},E()}function G(a){var p,s;if(!a.day||!a.qNum)return!1;const i=(p=e.store.days)==null?void 0:p[a.day];if(!i||i.status!=="completed")return!1;const t=B().find(r=>r.day===a.day),l=t==null?void 0:t.questions.find(r=>r.qNum===a.qNum);return l?((s=i.answers)==null?void 0:s[a.qNum])!==l.answer:!1}function pe(a){return/^[\u30a0-\u30ffー・\s]+$/.test(String(a||"").trim())}function z(a=!1){const i=re();if(!i.length){e.deckQueue=[],e.deckCursor=0,e.deckFlipped=!1;return}const n=new Set;let t=i.filter(l=>{const p=String(l.w||"").replace(/^[〜～\s]+/,"");if(n.has(p)||(n.add(p),e.deckHideKatakana&&pe(l.w)))return!1;const s=V(l.id);return e.deckHideMastered&&s==="mastered"&&e.deckFilter!=="weak"?!1:e.deckFilter==="weak"?s==="struggling"||G(l):e.deckFilter==="kanji"?l.cat==="kanji":e.deckFilter==="adverb_grammar"?l.cat==="adverb_grammar":!0});if(!a)t=[...t].sort((l,p)=>{const s=String(l.r||l.w||"").replace(/^[〜～\s]+/,""),r=String(p.r||p.w||"").replace(/^[〜～\s]+/,""),d=s.localeCompare(r,"ja");return d!==0?d:String(l.w||"").localeCompare(String(p.w||""),"ja")});else{t=[...t];for(let l=t.length-1;l>0;l--){const p=Math.floor(Math.random()*(l+1));[t[l],t[p]]=[t[p],t[l]]}}e.deckQueue=t,e.deckCursor=0,e.deckFlipped=!1}function E(){try{const a=U[e.level]||U.N3;localStorage.setItem(a,JSON.stringify(e.store))}catch(a){console.warn("Failed to save state:",a)}}function N(a){if(!e.store.days[a])e.store.days[a]={status:"not_started",answers:{},starSlots:{},remainingSeconds:1800,lastQuestion:1,score:null,completedAt:null};else{const i=e.store.days[a];if(i.remainingSeconds>1800&&(i.remainingSeconds=1800),i.lastQuestion>20&&(i.lastQuestion=1),i.answers)for(const n of Object.keys(i.answers))Number(n)>20&&delete i.answers[n]}return e.store.days[a]}function me(a,i){let n=0,t=0,l=0,p=0,s=0,r=0,d=0;for(const w of a.questions){const o=i[w.qNum]===w.answer;if(w.section==="vocab"||w.section==="grammar")t++,o&&n++;else if(w.section==="reading"){s++;const j=w.mondaiId==="r-m4"?12:16;o&&(p++,l+=j)}else w.section==="listening"&&(d++,o&&r++)}const u=Math.round(n/Math.max(1,t)*60),v=Math.min(60,Math.round(l)),x=Math.round(r/Math.max(1,d)*60),b=u+v+x,y=e.level==="N4"?b>=90&&u+v>=38&&x>=19:b>=95&&u>=19&&v>=19&&x>=19;return{langScore:u,readScore:v,listenScore:x,totalScore:b,passed:y,langRaw:n,langTotal:t,readRaw:p,readTotal:s,listenRaw:r,listenTotal:d}}function W(a){const i=Math.max(0,Math.floor(a)),n=Math.floor(i/60),t=i%60;return`${String(n).padStart(2,"0")}:${String(t).padStart(2,"0")}`}function g(a=""){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const ae=typeof Intl<"u"&&Intl.Segmenter?new Intl.Segmenter("ja",{granularity:"word"}):null;function K(a){return`https://jpdb.io/search?q=${encodeURIComponent(a)}&lang=english#a`}function se(a){if(!a)return"";if(!ae)return`<a class="jp-word" href="${K(a)}" target="_blank" rel="noopener noreferrer">${g(a)}</a>`;const i=[...ae.segment(a)];let n="";for(const t of i){const l=t.segment;if(!(t.isWordLike&&/[\u3040-\u30ff\u4e00-\u9faf]/.test(l))){n+=g(l);continue}n+=`<a class="jp-word" href="${K(l)}" target="_blank" rel="noopener noreferrer">${g(l)}</a>`}return n}function M(a){return a?String(a).split(/(<u>[\s\S]*?<\/u>)/g).map(n=>{if(n.startsWith("<u>")&&n.endsWith("</u>")){const t=n.slice(3,-4);return`<u>${se(t)}</u>`}return n.split(`
`).map(t=>se(t)).join("<br/>")}).join(""):""}function ge(){const a=B();if(!a.length)return 1;for(const i of a)if(N(i.day).status==="in_progress")return i.day;for(const i of a)if(N(i.day).status!=="completed")return i.day;return a.length}let I=null;function ne(){return!document.hidden&&document.hasFocus()}function de(a){let i=0;for(const n of Object.keys(a||{})){const t=Number(n);t>=1&&t<=7?i+=23.3333/7:t>=8&&t<=12?i+=16.6667/5:t>=13&&t<=16?i+=33.3333/4:t>=17&&t<=20&&(i+=26.6667/4)}return Math.min(100,Math.round(i*10)/10)}function ce(a){const i=Math.max(0,1800-a);return i<420?"Target: 語彙 Q1–7 (Finish by 23:00 left / 7m)":i<720?"Target: 文法 Q8–12 (Finish by 18:00 left / 12m)":i<1320?"Target: 読解 Q13–16 (Finish by 08:00 left / 22m)":"Target: 聴解 Q17–20 (Finish by 00:00 / 30m)"}function F(){if(!e.currentExamDay)return;const a=N(e.currentExamDay),i=document.getElementById("live-timer-val"),n=document.getElementById("live-timer-box");i&&(i.textContent=W(a.remainingSeconds)),n&&(e.timerPaused?n.classList.add("paused"):n.classList.remove("paused"));const t=Math.max(0,1800-a.remainingSeconds),l=Math.min(100,t/1800*100),p=de(a.answers),s=document.getElementById("live-time-bar-fill");s&&(s.style.width=`${l.toFixed(1)}%`,l>p+6?s.classList.add("behind"):s.classList.remove("behind"));const r=document.getElementById("live-time-bar-label");r&&(r.textContent=`⏱ ${Math.floor(t/60)}m / 30m`);const d=document.getElementById("live-pace-target-text");d&&(d.textContent=ce(a.remainingSeconds))}function ie(a){O();const i=N(a);i.status!=="completed"&&(i.status==="not_started"&&(i.status="in_progress",E()),e.timerPaused=!ne(),e.timerInterval=setInterval(()=>{if(e.activeTab!=="exam"||!e.currentExamDay)return;if(!ne()){e.timerPaused||(e.timerPaused=!0,E(),F());return}e.timerPaused&&(e.timerPaused=!1,F());const t=N(e.currentExamDay);if(t.status==="completed"){O();return}t.remainingSeconds>0&&(t.remainingSeconds--,F(),t.remainingSeconds%5===0&&E())},1e3))}function O(){e.timerInterval&&(clearInterval(e.timerInterval),e.timerInterval=null),E()}function J(){I&&(I.pause(),I.currentTime=0,I=null),e.playingQuestion=null}document.addEventListener("visibilitychange",()=>{document.hidden?(e.timerPaused=!0,E(),F()):e.activeTab==="exam"&&e.currentExamDay&&(e.timerPaused=!1,F())});window.addEventListener("blur",()=>{e.timerPaused=!0,E(),F()});window.addEventListener("focus",()=>{!document.hidden&&e.activeTab==="exam"&&e.currentExamDay&&(e.timerPaused=!1,F())});window.addEventListener("pagehide",()=>{e.timerPaused=!0,E()});window.addEventListener("beforeunload",()=>{E()});function ve(){return new Promise(a=>{try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return a();const n=new i,t=n.currentTime,l=(p,s,r)=>{const d=n.createOscillator(),u=n.createGain();d.type="sine",d.frequency.setValueAtTime(p,s),u.gain.setValueAtTime(.15,s),u.gain.exponentialRampToValueAtTime(.001,s+r),d.connect(u),u.connect(n.destination),d.start(s),d.stop(s+r)};l(659.25,t,.35),l(523.25,t+.35,.55),setTimeout(()=>{n.close().catch(()=>{}),a()},950)}catch{a()}})}async function be(a){if(e.playingQuestion===a.qNum){J(),m();return}if(J(),e.playingQuestion=a.qNum,m(),await ve(),e.playingQuestion!==a.qNum)return;const i=a.audioFile||`./audio/d${e.currentExamDay}-q${a.qNum}.mp3`,n=new Audio(i);I=n,n.onended=()=>{e.playingQuestion===a.qNum&&(e.playingQuestion=null,I=null,m())},n.onerror=()=>{e.playingQuestion=null,I=null,e.openTranscripts[a.qNum]=!0,m()};try{await n.play()}catch{e.playingQuestion=null,I=null,e.openTranscripts[a.qNum]=!0,m()}}function fe(){const a=B();if(e.loadingExams||!a.length)return`<div class="hero-banner"><b>Loading JLPT ${e.level} Daily Exam Papers...</b></div>`;const i=Z(),n=ge(),t=a.find(b=>b.day===n)||a[0],l=N(t.day),p=Object.keys(l.answers).length;let s=0,r=0,d=0;for(const b of a){const y=N(b.day);y.status==="completed"&&y.score&&(s++,r+=y.score.totalScore,y.score.passed&&d++)}const u=s>0?Math.round(r/s):null;let v="";l.status==="in_progress"?v=`<button class="btn-primary btn-resume" data-action="open-exam" data-day="${t.day}">
      ▶ Resume ${e.level} Day ${t.day} (Q${l.lastQuestion||1} · ${p}/${t.totalQuestions} · ${W(l.remainingSeconds)} left)
    </button>`:v=`<button class="btn-primary" data-action="open-exam" data-day="${t.day}">
      ▶ Start ${e.level} Day ${t.day} Paper (${t.labelEn} · 30 min)
    </button>`;const x=a.map(b=>{const y=N(b.day),w=Object.keys(y.answers).length,L=Math.round(w/b.totalQuestions*100),o=b.day===n;let j='<span class="badge badge-not-started">Not Started · 30:00</span>',A="<span>20 Questions (Vocab 7 · Grammar 5 · Reading 4 · Listening 4)</span>",q=`<button class="btn-primary" data-action="open-exam" data-day="${b.day}">Start 30m Paper</button>`;if(y.status==="in_progress")j=`<span class="badge badge-progress">In Progress · ${w}/${b.totalQuestions} Answered · ${W(y.remainingSeconds)} left</span>`,A=`<span>Paused at Question ${y.lastQuestion||1} — Ready to resume anytime</span>`,q=`<button class="btn-primary btn-resume" data-action="open-exam" data-day="${b.day}">Resume (Q${y.lastQuestion||1}) →</button>`;else if(y.status==="completed"&&y.score){const P=y.score;j=P.passed?`<span class="badge badge-pass">PASS 合格 · ${P.totalScore} / 180</span>`:`<span class="badge badge-fail">SCORE · ${P.totalScore} / 180 (Need ${i})</span>`,A=`<span>言語知識 <b>${P.langScore}/60</b> · 読解 <b>${P.readScore}/60</b> · 聴解 <b>${P.listenScore}/60</b></span>`,q=`
          <button class="btn-secondary" data-action="open-exam" data-day="${b.day}">Review Paper</button>
          <button class="btn-secondary" data-action="reset-day" data-day="${b.day}" title="Reset and retake this day">Retake</button>
        `}return`
        <div class="day-card ${o?"is-current":""} ${y.status==="completed"?"is-completed":""}">
          <div class="day-left">
            <div class="day-num-box">
              <span class="d-small">${e.level} D</span>
              <span class="d-big">${b.day}</span>
            </div>
            <div class="day-info">
              <div class="day-date-row">
                <span class="day-date-title">${g(b.labelEn)}</span>
                <span class="day-date-ja">${g(b.labelJa)}</span>
                ${j}
              </div>
              <div class="day-meta-row">
                ${A}
              </div>
              <div class="day-progress-bar">
                <div class="day-progress-fill ${y.status==="completed"?"done":""}" style="width: ${y.status==="completed"?100:L}%"></div>
              </div>
            </div>
          </div>
          <div class="day-actions">
            ${q}
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
          ${v}
          <button class="btn-secondary" style="font-size:0.75rem; padding:0.3rem 0.65rem;" data-action="share-level-link">
            🔗 Copy Direct ${e.level==="N3"?"N4 (Friend)":"N3"} Link
          </button>
        </div>
      </div>
      <div class="hero-stats">
        <div class="stat-pill">
          <div class="stat-label">${e.level} DAYS COMPLETED</div>
          <div class="stat-val">${s} / 34 Days</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">AVERAGE SCORE</div>
          <div class="stat-val">${u!==null?`${u} / 180`:"— / 180"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">PASS RATE (≥${i}/180)</div>
          <div class="stat-val">${s>0?`${d} / ${s} Passed`:"—"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">EXAM DAY</div>
          <div class="stat-val">Sun, 6 Dec 2026</div>
        </div>
      </div>
    </div>

    <div class="days-grid">
      ${x}
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
  `}function ye(){const a=B();if(!a.length)return"";const i=a.find(o=>o.day===e.currentExamDay)||a[0],n=N(i.day),t=n.status==="completed",l=Object.keys(n.answers).length,p=Z();let s=null,r=null;const d={vocab:{title:"第1部：言語知識（文字・語彙）",meta:"目安時間：7分（全7問 · Q1〜Q7）"},grammar:{title:"第2部：言語知識（文法）・読解 【文法】",meta:"目安時間：5分（全5問 · Q8〜Q12）"},reading:{title:"第2部：言語知識（文法）・読解 【読解】",meta:"目安時間：10分（全4問 · Q13〜Q16）"},listening:{title:"第3部：聴解（リスニング）",meta:"目安時間：8分（全4問 · Q17〜Q20）"}};let u="";for(const o of i.questions){if(o.section!==s){s=o.section;const k=d[o.section];u+=`
        <div class="section-divider-banner" id="sec-${o.section}">
          <span>${g(k.title)}</span>
          <span style="font-size:0.78rem; font-weight:600; color:#d4d4d8;">${g(k.meta)}</span>
        </div>
      `}if(o.mondaiId!==r&&(r=o.mondaiId,u+=`
        <div class="mondai-header">
          ${M(o.mondaiTitle)}
        </div>
      `),o.passageText||o.passageTable){const k=o.passageTitle?`<div class="passage-title-bar">${M(o.passageTitle)}</div>`:"",h=o.passageLabel?`<b>${g(o.passageLabel)}</b> `:"",C=(o.passageText||"").split(/\n\n+/).filter(Boolean).map((D,R)=>`<p class="passage-paragraph">${R===0?h:""}${M(D)}</p>`).join("");let T="";if(o.passageTable){const D=o.passageTable.headers.map(c=>`<th>${M(c)}</th>`).join(""),R=o.passageTable.rows.map(c=>`<tr>${c.map(f=>`<td>${M(f)}</td>`).join("")}</tr>`).join("");T=`
          <div class="info-table-wrap">
            <table class="info-table">
              <thead><tr>${D}</tr></thead>
              <tbody>${R}</tbody>
            </table>
          </div>
        `}const S=o.passageNotes?`<div class="passage-notes">${M(o.passageNotes)}</div>`:"";u+=`
        <div class="reading-passage-box style-${o.passageStyle||"essay"}">
          ${k}
          ${C}
          ${T}
          ${S}
        </div>
      `}let j="";if(o.section==="listening"){const k=e.playingQuestion===o.qNum,h=t||!!e.openTranscripts[o.qNum],C=o.audioFile||`./audio/d${i.day}-q${o.qNum}.mp3`,T=(o.dialogue||[]).map(S=>`
          <div class="dialogue-line">
            <span class="speaker-tag">${S.speaker==="M"?"男 (Male)":"女 (Female)"}</span>
            ${M(S.text)}
          </div>
        `).join("");j=`
        <div class="listening-box">
          <div style="font-size:0.84rem; color:var(--ink-muted); margin-bottom:0.45rem;">
            🎧 <b>状況：</b>${M(o.listeningIntro)}
          </div>
          <div class="listening-controls">
            <button class="btn-audio ${k?"playing":""}" data-action="play-audio" data-qnum="${o.qNum}">
              ${k?"⏹ 音声を停止 (Stop Audio)":"▶ 会話音声を再生 (Play Dialogue MP3)"}
            </button>
            <audio controls preload="none" src="${g(C)}" style="height:32px; max-width:240px;"></audio>
            <button class="btn-secondary" data-action="toggle-script" data-qnum="${o.qNum}">
              ${h?"スクリプトを隠す (Hide Text)":"📖 スクリプトを見る (Show Dialogue Text)"}
            </button>
          </div>
          ${h?`<div class="dialogue-transcript">
                  ${T}
                </div>`:""}
        </div>
      `}let A="";if(o.type==="star"){const k=n.starSlots[o.qNum]||[null,null,null,null],h=[0,1,2,3].map(T=>{const S=T+1===o.starPosition,D=k[T],R=D!=null?`${D+1}. ${o.options[D]}`:S?"★":`Slot ${T+1}`;return`<span class="star-slot ${S?"is-star":""}" data-action="clear-star-slot" data-qnum="${o.qNum}" data-slot="${T}" title="Tap to clear slot">${g(R)}</span>`}).join(""),C=o.options.map((T,S)=>`<button class="btn-secondary" style="padding:0.22rem 0.55rem; font-size:0.78rem;" data-action="add-star-frag" data-qnum="${o.qNum}" data-optidx="${S}">+${S+1}: ${g(T)}</button>`).join(" ");A=`
        <div class="star-builder-box">
          <div style="font-size:0.75rem; font-weight:700; color:var(--ink-muted); margin-bottom:0.3rem;">
            ★ Sentence Scramble Helper (Tap fragments below to test order; slot ${o.starPosition} is ★):
          </div>
          <div class="star-slots-row">
            <span>${M(o.prefix)}</span>
            ${h}
            <span>${M(o.suffix)}</span>
          </div>
          <div style="display:flex; gap:0.35rem; flex-wrap:wrap; align-items:center;">
            ${C}
            <button class="btn-secondary" style="padding:0.22rem 0.5rem; font-size:0.72rem;" data-action="reset-star" data-qnum="${o.qNum}">Clear</button>
          </div>
        </div>
      `}const q=n.answers[o.qNum],P=o.options.every(k=>k.length<=16)?"compact-grid":"";!t&&o.hideTargetReading&&o.targetWord;const Q=o.options.map((k,h)=>{const C=q===h;let T=C?"selected":"";t&&(h===o.answer?T="graded-correct":C&&h!==o.answer&&(T="graded-wrong"));const S=o.mondaiId==="v-m1"?g(k):M(k,{qNum:o.qNum});return`
          <div class="option-row ${T}">
            <button
              type="button"
              class="option-bubble"
              data-action="select-option"
              data-qnum="${o.qNum}"
              data-optidx="${h}"
              aria-label="Select choice ${h+1}"
            >
              ${h+1}
            </button>
            <div class="option-text">
              ${S}
            </div>
            ${t?h===o.answer?'<span class="badge badge-pass">✓ 正解</span>':C?'<span class="badge badge-fail">✗ 選択</span>':"":`<button type="button" class="option-select-Action" data-action="select-option" data-qnum="${o.qNum}" data-optidx="${h}">
                    ${C?"✓ Chosen":"Select"}
                  </button>`}
          </div>
        `}).join("");let H="";if(t){const k=q===o.answer,h=o.optionReasons||[],C=o.options.map((T,S)=>{const D=S===o.answer,R=q===S&&!D,c=D?"elim-correct":R?"elim-user-wrong":"",f=R?' <span class="badge badge-fail" style="margin-left:0.35rem;">✗ Your Pick</span>':D&&q===S?' <span class="badge badge-pass" style="margin-left:0.35rem;">✓ Your Pick</span>':"",$=h[S]||(D?"✓ Correct choice.":"✗ Distractor.");return`
            <div class="elimination-item ${c}">
              <div>
                <b>Choice ${S+1}: 「${g(T.replace(/<\/?u>/g,""))}」</b>${f}
              </div>
              <div style="margin-top:0.15rem; color:#27272a;">
                ${g($)}
              </div>
            </div>
          `}).join("");H=`
        <div class="explanation-box ${k?"is-correct":"is-wrong"}">
          <div style="font-size:0.92rem; margin-bottom:0.35rem;">
            <b>${k?`✓ Correct (正解：選択肢 ${o.answer+1})`:q!==void 0?`✗ Incorrect (You picked ${q+1} · Correct Answer: Choice ${o.answer+1})`:`✗ Unanswered (Correct Answer: Choice ${o.answer+1})`}</b>
          </div>
          <div>${g(o.explanation)}</div>
          <div class="elimination-list">
            <div class="elimination-title">🔍 Process of Elimination (消去法 — Why 1–4 Are Right or Wrong):</div>
            ${C}
          </div>
        </div>
      `}u+=`
      <div class="question-block" id="q-block-${o.qNum}">
        ${j}
        <div class="question-prompt-row">
          <span class="q-number-box">${o.qNum}</span>
          <div class="q-prompt-text">
            ${M(o.prompt)}
          </div>
        </div>
        ${A}
        <div class="options-list ${P}">
          ${Q}
        </div>
        ${H}
      </div>
    `}let v="";if(e.showJumpDrawer){const o=(j,A,q)=>{let P="";for(let Q=A;Q<=q;Q++){const H=i.questions[Q-1],k=n.answers[Q];let h=k!==void 0?"answered":"";t&&(h=k===H.answer?"correct":"wrong"),P+=`<button class="q-jump-pill ${h}" data-action="jump-to-q" data-qnum="${Q}">${Q}</button>`}return`
        <div class="q-jump-section-label">${g(j)}</div>
        <div class="q-jump-grid">${P}</div>
      `};v=`
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
    `}let x="";if(t&&n.score){const o=n.score;x=`
      <div class="score-report-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div>
            <span class="badge ${o.passed?"badge-pass":"badge-fail"}" style="font-size:0.82rem; padding:0.22rem 0.65rem;">
              ${o.passed?`合格圏 (PASSED · ≥${p}/180)`:`不合格圏 (BELOW ${p}/180 PASS THRESHOLD)`}
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
    `}const b=de(n.answers),y=Math.max(0,1800-n.remainingSeconds),w=Math.min(100,y/1800*100),L=w>b+6;return`
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
              <span id="live-timer-val">${W(n.remainingSeconds)}</span>
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
            <div class="pacing-label">⏱ Time Pace<br/><b id="live-time-bar-label">⏱ ${Math.floor(y/60)}m / 30m</b></div>
            <div class="pacing-track" title="30-Minute Time Pacing with Section Deadlines">
              <div class="pacing-tick" style="left:23.33%;"></div>
              <div class="pacing-tick" style="left:40.00%;"></div>
              <div class="pacing-tick" style="left:73.33%;"></div>
              <div id="live-time-bar-fill" class="pacing-fill-time ${L?"behind":""}" style="width:${w.toFixed(1)}%;"></div>
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

    ${v}
    ${x}

    <div class="exam-booklet">
      <div class="booklet-cover-banner">
        <div class="b-series">2026年12月6日対策 · 30分短縮実戦模試（第${i.day}回 / 全34回 · 全20問）</div>
        <div class="b-level">日本語能力試験 ${e.level}（${g(i.labelJa)}）</div>
        <div class="b-meta">
          💡 <b>Tap any Japanese word</b> in the passages, questions, or choices to open it directly in <b>jpdb.io</b>. Tap the numbered circle <b>(1–4)</b> to choose your answer.
        </div>
      </div>

      ${u}

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
  `}function $e(){const a=B();if(e.loadingExams||!a.length)return`<div class="hero-banner"><b>Loading ${e.level} Score Progress...</b></div>`;const i=Z(),n=a.map(c=>({exam:c,state:N(c.day)})).filter(c=>c.state.status==="completed"&&c.state.score),t=n.length,l=t>0?n[t-1].state.score.totalScore:null,p=t>0?Math.max(...n.map(c=>c.state.score.totalScore)):null,s=t>0?Math.round(n.reduce((c,f)=>c+f.state.score.totalScore,0)/t):null,r=760,d=260,u=44,v=24,x=22,b=38,y=r-u-v,w=d-x-b,L=c=>u+(c-1)/33*y,o=(c,f=180)=>x+w-c/f*w,A=[0,60,i,120,180].map(c=>{const f=o(c,180),$=c===i;return`
        <line x1="${u}" y1="${f}" x2="${r-v}" y2="${f}"
          stroke="${$?"#15803d":"#d6d3c9"}"
          stroke-width="${$?"2":"1"}"
          stroke-dasharray="${$?"6,4":"none"}" />
        <text x="${u-8}" y="${f+4}" text-anchor="end" font-size="11" font-weight="${$?"800":"600"}" fill="${$?"#15803d":"#52525b"}">${c}</text>
      `}).join(""),P=[1,5,10,15,20,25,30,34].map(c=>{const f=L(c),$=a[c-1];return`
        <line x1="${f}" y1="${x}" x2="${f}" y2="${x+w}" stroke="#ece9df" stroke-width="1" />
        <text x="${f}" y="${d-12}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#52525b">D${c} (${$.labelJa.replace(/（.*）/,"")})</text>
      `}).join(""),Q=n.map(c=>`${L(c.exam.day)},${o(c.state.score.totalScore,180)}`).join(" "),H=n.map(c=>{const f=L(c.exam.day),$=o(c.state.score.totalScore,180),Y=c.state.score.passed;return`
        <circle cx="${f}" cy="${$}" r="5.5" fill="${Y?"#15803d":"#b45309"}" stroke="#ffffff" stroke-width="2" />
        <text x="${f}" y="${$-9}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#18181b">${c.state.score.totalScore}</text>
      `}).join(""),h=[0,19,30,45,60].map(c=>{const f=o(c,60),$=c===19;return`
        <line x1="${u}" y1="${f}" x2="${r-v}" y2="${f}"
          stroke="${$?"#b91c1c":"#d6d3c9"}"
          stroke-width="${$?"1.8":"1"}"
          stroke-dasharray="${$?"5,4":"none"}" />
        <text x="${u-8}" y="${f+4}" text-anchor="end" font-size="11" font-weight="${$?"800":"600"}" fill="${$?"#b91c1c":"#52525b"}">${c}</text>
      `}).join(""),C=n.map(c=>`${L(c.exam.day)},${o(c.state.score.langScore,60)}`).join(" "),T=n.map(c=>`${L(c.exam.day)},${o(c.state.score.readScore,60)}`).join(" "),S=n.map(c=>`${L(c.exam.day)},${o(c.state.score.listenScore,60)}`).join(" "),D=n.map(c=>{const f=L(c.exam.day);return`
        <circle cx="${f}" cy="${o(c.state.score.langScore,60)}" r="4" fill="#1d4ed8" />
        <circle cx="${f}" cy="${o(c.state.score.readScore,60)}" r="4" fill="#b45309" />
        <circle cx="${f}" cy="${o(c.state.score.listenScore,60)}" r="4" fill="#15803d" />
      `}).join(""),R=n.length===0?`<tr><td colspan="7" style="text-align:center; padding:1.25rem; color:var(--ink-muted);">No completed ${e.level} daily exams yet. Complete Day 1 to see your score plotted here!</td></tr>`:n.slice().reverse().map(({exam:c,state:f})=>{const $=f.score,Y=W(1800-Math.min(1800,f.remainingSeconds||0));return`
              <tr>
                <td><b>${e.level} Day ${c.day}</b> (${g(c.labelJa)})</td>
                <td><b>${$.totalScore} / 180</b></td>
                <td>${$.langScore} / 60</td>
                <td>${$.readScore} / 60</td>
                <td>${$.listenScore} / 60</td>
                <td>${Y}</td>
                <td>
                  <span class="badge ${$.passed?"badge-pass":"badge-fail"}">${$.passed?"PASS":"FAIL"}</span>
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
          <div class="stat-val">${p!==null?`${p} / 180`:"—"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">AVERAGE SCORE</div>
          <div class="stat-val">${s!==null?`${s} / 180`:"—"}</div>
        </div>
      </div>
    </div>

    <div class="chart-card">
      <h2 class="chart-title">JLPT ${e.level} Total Scaled Score Over Time (0 – 180 Points)</h2>
      <p class="chart-sub">Green dashed line = <b>${i} / 180 Official JLPT ${e.level} Overall Pass Threshold (合格ライン)</b></p>
      <div class="svg-chart-wrap">
        <svg viewBox="0 0 ${r} ${d}" width="100%" style="min-width:520px; display:block;">
          ${A}
          ${P}
          ${n.length>=2?`<polyline fill="none" stroke="#18181b" stroke-width="3" points="${Q}" />`:""}
          ${H}
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
        <svg viewBox="0 0 ${r} ${d}" width="100%" style="min-width:520px; display:block;">
          ${h}
          ${P}
          ${n.length>=2?`
            <polyline fill="none" stroke="#1d4ed8" stroke-width="2.2" points="${C}" />
            <polyline fill="none" stroke="#b45309" stroke-width="2.2" points="${T}" />
            <polyline fill="none" stroke="#15803d" stroke-width="2.2" points="${S}" />
          `:""}
          ${D}
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
  `}function he(){const a=re();if(e.loadingDeck||!a.length)return`<div class="hero-banner"><b>Loading JLPT ${e.level} Unlimited Exam Word Deck...</b></div>`;let i=0,n=0;for(const s of a){const r=V(s.id);r==="mastered"?i++:(r==="struggling"||G(s))&&n++}const t=e.deckQueue,l=t.length>0?t[e.deckCursor%t.length]:null;let p="";if(!l)p=`
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
    `;else if(e.deckViewMode==="table"){const s=t.map(r=>{const d=V(r.id),u=d==="struggling"||G(r),v=d==="mastered"?"row-mastered":u?"row-struggling":"",x=e.tableMaskReading?`<span class="masked-cell" data-action="reveal-masked-cell">${g(r.r)}</span>`:g(r.r),b=e.tableMaskMeaning?`<span class="masked-cell" data-action="reveal-masked-cell">${g(r.m)}</span>`:g(r.m);return`
          <tr class="${v}" id="tbl-row-${r.id}">
            <td class="td-word-cell">
              <a class="jp-word" href="${K(r.w)}" target="_blank" rel="noopener noreferrer">${g(r.w)}</a>
            </td>
            <td class="td-reading-cell">${x}</td>
            <td class="td-meaning-cell">${b}</td>
            <td style="text-align:right; width:86px;">
              <div class="mini-rate-group">
                <button type="button" class="mini-rate-btn ${u?"active":""}" data-action="rate-table-row" data-cid="${r.id}" data-status="struggling" title="Mark Weak / Again">🔴</button>
                <button type="button" class="mini-rate-btn ${d==="reviewing"?"active":""}" data-action="rate-table-row" data-cid="${r.id}" data-status="reviewing" title="Mark Reviewing / Good">🟡</button>
                <button type="button" class="mini-rate-btn ${d==="mastered"?"active":""}" data-action="rate-table-row" data-cid="${r.id}" data-status="mastered" title="Mark Mastered / Easy">🟢</button>
              </div>
            </td>
          </tr>
        `}).join("");p=`
      <div class="deck-table-container">
        <table class="deck-compact-table">
          <thead>
            <tr>
              <th>単語 (${t.length})</th>
              <th style="cursor:pointer;" data-action="toggle-mask-reading" title="Tap to hide/show readings for self-test">
                読み ${e.tableMaskReading?"🙈(Tap)":"👁"}
              </th>
              <th style="cursor:pointer;" data-action="toggle-mask-meaning" title="Tap to hide/show meanings for self-test">
                英語の意味 ${e.tableMaskMeaning?"🙈(Tap)":"👁"}
              </th>
              <th style="text-align:right;">状態</th>
            </tr>
          </thead>
          <tbody>
            ${s}
          </tbody>
        </table>
      </div>
    `}else{const s=V(l.id),r=G(l),d=l.day?`${e.level} · Day ${l.day} Paper (Q${l.qNum})`:`JLPT ${e.level} Core Exam Bank`;let u='<span class="badge badge-not-started">New Card</span>';s==="mastered"?u='<span class="badge badge-pass">🟢 Mastered</span>':s==="struggling"||r?u=`<span class="badge badge-fail">🔴 ${r?"Missed in Paper":"Struggling / Again"}</span>`:s==="reviewing"&&(u='<span class="badge badge-progress">🟡 Reviewing</span>');const v=K(l.w);p=`
      <div class="anki-card" data-action="flip-anki-card" title="Tap anywhere on card to flip">
        <div>
          <div class="anki-card-top">
            <span style="font-size:0.72rem; font-weight:800; color:var(--ink-muted);">
              ${e.deckCursor%t.length+1}/${t.length} · ${g(d)} · 🟢${i} 🔥${n}
            </span>
            <div style="display:flex; gap:0.35rem; align-items:center;">
              ${u}
            </div>
          </div>

          <div class="anki-word-front">${g(l.w)}</div>

          ${l.ja?`<div class="anki-sentence-front">
                  ${M(l.ja)}
                </div>`:""}
        </div>

        ${e.deckFlipped?`
          <div class="anki-back-reveal">
            <div class="anki-reading-back">【 ${g(l.r)} 】</div>
            <div class="anki-meaning-back">${g(l.m)}</div>
            ${l.en?`<div class="anki-note-back"><b>Context:</b> ${g(l.en)}</div>`:""}
            ${l.note?`<div class="anki-note-back"><b>💡 Note:</b> ${g(l.note)}</div>`:""}
            <div style="display:flex; justify-content:center; margin-top:0.1rem;">
              <a class="btn-jpdb" style="padding:0.32rem 0.7rem; font-size:0.78rem;" href="${v}" target="_blank" rel="noopener noreferrer">
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

      ${p}
    </div>
  `}function we(){if(!e.showBackupModal)return"";const a=btoa(unescape(encodeURIComponent(JSON.stringify(e.store))));return`
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
  `}function m(){const a=document.getElementById("app");if(!a)return;let i="";e.activeTab==="exam"&&e.currentExamDay?i=ye():e.activeTab==="deck"?i=he():e.activeTab==="progress"?i=$e():i=fe(),a.innerHTML=`
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

    ${we()}
  `}document.addEventListener("click",a=>{var l,p;if(a.target.closest(".jp-word")){a.stopPropagation();return}const n=a.target.closest("[data-action]");if(!n)return;const t=n.getAttribute("data-action");if(t==="switch-level"){const s=(n.getAttribute("data-level")||"N3").toUpperCase();if(s===e.level)return;O(),J(),e.level=s;try{localStorage.setItem(X,s);const r=new URL(window.location.href);r.searchParams.set("level",s.toLowerCase()),window.history.replaceState({},"",r.toString())}catch{}e.store=oe(s),e.currentExamDay=null,e.deckQueue=[],e.activeTab==="exam"&&(e.activeTab="daily"),le(s),e.activeTab==="deck"&&te(s);return}if(t==="share-level-link"){const s=e.level==="N3"?"n4":"n3",r=`${window.location.origin}${window.location.pathname}?level=${s}`;(l=navigator.clipboard)==null||l.writeText(r),alert(`Copied direct ${s.toUpperCase()} link to clipboard:
${r}

Send this to your friend—it will open directly on the ${s.toUpperCase()} exam papers with his own independent progress!`);return}if(t==="switch-tab"){const s=n.getAttribute("data-tab");O(),J(),e.activeWordPopup=null,e.activeTab=s,s==="deck"&&te(e.level),window.scrollTo({top:0,behavior:"smooth"}),m();return}if(t==="toggle-deck-view-mode"){e.deckViewMode=e.deckViewMode==="card"?"table":"card",m();return}if(t==="toggle-hide-katakana"){e.deckHideKatakana=!e.deckHideKatakana,z(!1),m();return}if(t==="toggle-mask-reading"){e.tableMaskReading=!e.tableMaskReading,m();return}if(t==="toggle-mask-meaning"){e.tableMaskMeaning=!e.tableMaskMeaning,m();return}if(t==="reveal-masked-cell"){n.classList.toggle("revealed");return}if(t==="rate-table-row"){const s=n.getAttribute("data-cid"),r=n.getAttribute("data-status");if(s&&r){_(s,r);const d=document.getElementById(`tbl-row-${s}`);d&&(d.classList.remove("row-struggling","row-mastered"),r==="struggling"&&d.classList.add("row-struggling"),r==="mastered"&&d.classList.add("row-mastered"),d.querySelectorAll(".mini-rate-btn").forEach(u=>{u.classList.toggle("active",u.getAttribute("data-status")===r)}))}return}if(t==="flip-anki-card"){e.deckFlipped=!e.deckFlipped,m();return}if(t==="rate-anki-card"){const s=n.getAttribute("data-rating"),r=e.deckQueue;if(!r.length)return;const d=e.deckCursor%r.length,u=r[d];if(e.deckSessionReviewed++,s==="again"){_(u.id,"struggling"),r.splice(d,1);const v=Math.min(r.length,d+5);r.splice(v,0,u),r.length>0&&(e.deckCursor=d%r.length)}else s==="good"?(_(u.id,"reviewing"),e.deckCursor=(d+1)%r.length):s==="easy"&&(_(u.id,"mastered"),e.deckHideMastered&&e.deckFilter!=="weak"?(r.splice(d,1),r.length>0&&(e.deckCursor=d%r.length)):e.deckCursor=(d+1)%r.length);e.deckFlipped=!1,m();return}if(t==="set-deck-filter"){e.deckFilter=n.getAttribute("data-filter")||"all",z(!1),m();return}if(t==="toggle-hide-mastered"){e.deckHideMastered=!e.deckHideMastered,z(!1),m();return}if(t==="shuffle-deck"){z(!0),m();return}if(t==="prev-anki-card"){const s=e.deckQueue;if(!s.length)return;e.deckCursor=(e.deckCursor-1+s.length)%s.length,e.deckFlipped=!1,m();return}if(t==="next-anki-card"){const s=e.deckQueue;if(!s.length)return;e.deckCursor=(e.deckCursor+1)%s.length,e.deckFlipped=!1,m();return}if(t==="open-exam"){const s=Number(n.getAttribute("data-day"));e.currentExamDay=s,e.activeTab="exam",e.showJumpDrawer=!1,e.activeWordPopup=null;const r=N(s);ie(s),m(),r.status==="in_progress"&&r.lastQuestion>1?setTimeout(()=>{const d=document.getElementById(`q-block-${r.lastQuestion}`);d&&d.scrollIntoView({behavior:"smooth",block:"center"})},60):window.scrollTo({top:0,behavior:"smooth"});return}if(t==="pause-and-exit"){O(),J(),e.activeWordPopup=null,e.activeTab="daily",window.scrollTo({top:0,behavior:"smooth"}),m();return}if(t==="toggle-jump-drawer"){e.showJumpDrawer=!e.showJumpDrawer,m();return}if(t==="jump-to-q"){const s=Number(n.getAttribute("data-qnum"));e.showJumpDrawer=!1,m();const r=document.getElementById(`q-block-${s}`);r&&r.scrollIntoView({behavior:"smooth",block:"center"});return}if(t==="select-option"){const s=Number(n.getAttribute("data-qnum")),r=Number(n.getAttribute("data-optidx"));if(!e.currentExamDay)return;const d=N(e.currentExamDay);if(d.status==="completed")return;d.answers[s]===r?delete d.answers[s]:d.answers[s]=r,d.lastQuestion=s,d.status="in_progress",e.activeWordPopup=null,E(),m();return}if(t==="add-star-frag"){const s=Number(n.getAttribute("data-qnum")),r=Number(n.getAttribute("data-optidx")),d=N(e.currentExamDay);if(d.status==="completed")return;const u=d.starSlots[s]?[...d.starSlots[s]]:[null,null,null,null],v=u.findIndex(x=>x==null);if(v!==-1&&!u.includes(r)){u[v]=r,d.starSlots[s]=u;const b=B().find(w=>w.day===e.currentExamDay),y=b==null?void 0:b.questions.find(w=>w.qNum===s);y&&u[y.starPosition-1]!==null&&(d.answers[s]=u[y.starPosition-1]),d.lastQuestion=s,E(),m()}return}if(t==="clear-star-slot"){const s=Number(n.getAttribute("data-qnum")),r=Number(n.getAttribute("data-slot")),d=N(e.currentExamDay);if(d.status==="completed"||!d.starSlots[s])return;d.starSlots[s][r]=null,E(),m();return}if(t==="reset-star"){const s=Number(n.getAttribute("data-qnum")),r=N(e.currentExamDay);if(r.status==="completed")return;delete r.starSlots[s],E(),m();return}if(t==="play-audio"){const s=Number(n.getAttribute("data-qnum")),d=B().find(v=>v.day===e.currentExamDay),u=d==null?void 0:d.questions.find(v=>v.qNum===s);u&&be(u);return}if(t==="toggle-script"){const s=Number(n.getAttribute("data-qnum"));e.openTranscripts[s]=!e.openTranscripts[s],m();return}if(t==="grade-exam"){if(!e.currentExamDay)return;const r=B().find(v=>v.day===e.currentExamDay),d=N(r.day),u=Object.keys(d.answers).length;if(u<r.totalQuestions&&!window.confirm(`You have answered ${u} of ${r.totalQuestions} questions.

If you just want to take a break and continue later today, tap Cancel and use "Save & Exit".

Grade ${e.level} Day ${r.day} paper now?`))return;O(),J(),d.status="completed",d.score=me(r,d.answers),d.completedAt=new Date().toISOString(),E(),window.scrollTo({top:0,behavior:"smooth"}),m();return}if(t==="reset-day"){const s=Number(n.getAttribute("data-day"));if(!window.confirm(`Reset all answers and timer for ${e.level} Day ${s}?`))return;delete e.store.days[s],E(),e.activeTab==="exam"&&e.currentExamDay===s&&ie(s),m();return}if(t==="toggle-backup-modal"){e.showBackupModal=!e.showBackupModal,m();return}if(t==="copy-backup"){const s=document.getElementById("backup-code-box");s&&(s.select(),(p=navigator.clipboard)==null||p.writeText(s.value),alert("Backup code copied to clipboard!"));return}if(t==="restore-backup"){const s=document.getElementById("backup-code-box");if(!s||!s.value.trim())return;try{const r=JSON.parse(decodeURIComponent(escape(atob(s.value.trim()))));r&&r.days&&(e.store=r,E(),e.showBackupModal=!1,m(),alert("Progress restored successfully!"))}catch{alert("Invalid backup code.")}}});document.addEventListener("keydown",a=>{var i,n,t,l,p;e.activeTab!=="deck"||e.showBackupModal||a.target&&(a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA")||(a.code==="Space"?(a.preventDefault(),e.deckFlipped=!e.deckFlipped,m()):a.key==="1"?(i=document.querySelector('[data-rating="again"]'))==null||i.click():a.key==="2"?(n=document.querySelector('[data-rating="good"]'))==null||n.click():a.key==="3"?(t=document.querySelector('[data-rating="easy"]'))==null||t.click():a.key==="ArrowRight"?(l=document.querySelector('[data-action="next-anki-card"]'))==null||l.click():a.key==="ArrowLeft"&&((p=document.querySelector('[data-action="prev-anki-card"]'))==null||p.click()))});le(e.level);
