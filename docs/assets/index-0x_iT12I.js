(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))s(d);new MutationObserver(d=>{for(const u of d)if(u.type==="childList")for(const i of u.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(d){const u={};return d.integrity&&(u.integrity=d.integrity),d.referrerPolicy&&(u.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?u.credentials="include":d.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(d){if(d.ep)return;d.ep=!0;const u=a(d);fetch(d.href,u)}})();const K="jlpt_selected_level",U={N3:"jlpt_n3_daily_state_v1",N4:"jlpt_n4_daily_state_v1"};function ue(){try{const n=(new URLSearchParams(window.location.search).get("level")||"").toUpperCase();if(n==="N3"||n==="N4")return localStorage.setItem(K,n),n;const a=(localStorage.getItem(K)||"").toUpperCase();if(a==="N3"||a==="N4")return a}catch{}return"N3"}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});function oe(t){try{const n=localStorage.getItem(U[t]||U.N3);if(n){const a=JSON.parse(n);if(a&&typeof a=="object"&&a.days)return a}}catch(n){console.warn("Failed to parse saved state:",n)}return{days:{}}}const ee=ue(),e={level:ee,examsByLevel:{},decksByLevel:{},loadingExams:!0,loadingDeck:!1,store:oe(ee),activeTab:"daily",currentExamDay:null,timerPaused:!1,timerInterval:null,showJumpDrawer:!1,openTranscripts:{},playingQuestion:null,activeWordPopup:null,showBackupModal:!1,deckFilter:"all",deckHideMastered:!0,deckQueue:[],deckCursor:0,deckFlipped:!1,deckSessionReviewed:0};function F(){return e.examsByLevel[e.level]||[]}function re(){return e.decksByLevel[e.level]||[]}function Z(){return e.level==="N4"?90:95}async function le(t){if(e.examsByLevel[t]){e.loadingExams=!1;return}e.loadingExams=!0,v();try{const s=await(await fetch(t==="N4"?"./data/exams-n4.json":"./data/exams-n3.json")).json();e.examsByLevel[t]=s}catch(n){console.error("Failed to load exams for",t,n),e.examsByLevel[t]=[]}e.loadingExams=!1,v()}async function te(t){if(e.decksByLevel[t]){e.deckQueue.length||W(!1);return}e.loadingDeck=!0,v();try{const s=await(await fetch(t==="N4"?"./data/deck-n4.json":"./data/deck-n3.json")).json();e.decksByLevel[t]=s}catch(n){console.error("Failed to load deck for",t,n),e.decksByLevel[t]=[]}e.loadingDeck=!1,W(!1),v()}function J(t){var n;return e.store.deck||(e.store.deck={}),((n=e.store.deck[t])==null?void 0:n.status)||"new"}function V(t,n){e.store.deck||(e.store.deck={});const a=e.store.deck[t]||{reps:0};e.store.deck[t]={status:n,reps:(a.reps||0)+1},E()}function G(t){var u,i;if(!t.day||!t.qNum)return!1;const n=(u=e.store.days)==null?void 0:u[t.day];if(!n||n.status!=="completed")return!1;const s=F().find(r=>r.day===t.day),d=s==null?void 0:s.questions.find(r=>r.qNum===t.qNum);return d?((i=n.answers)==null?void 0:i[t.qNum])!==d.answer:!1}function W(t=!1){const n=re();if(!n.length){e.deckQueue=[],e.deckCursor=0,e.deckFlipped=!1;return}let a=n.filter(s=>{const d=J(s.id);return e.deckHideMastered&&d==="mastered"&&e.deckFilter!=="weak"?!1:e.deckFilter==="weak"?d==="struggling"||G(s):e.deckFilter==="kanji"?s.cat==="kanji":e.deckFilter==="adverb_grammar"?s.cat==="adverb_grammar":!0});if(!t)a.sort((s,d)=>{const u=J(s.id),i=J(d.id),r=(l,p)=>p==="struggling"||G(l)?0:p==="new"&&l.day?1:p==="new"?2:p==="reviewing"?3:4;return r(s,u)-r(d,i)});else{a=[...a];for(let s=a.length-1;s>0;s--){const d=Math.floor(Math.random()*(s+1));[a[s],a[d]]=[a[d],a[s]]}}e.deckQueue=a,e.deckCursor=0,e.deckFlipped=!1}function E(){try{const t=U[e.level]||U.N3;localStorage.setItem(t,JSON.stringify(e.store))}catch(t){console.warn("Failed to save state:",t)}}function D(t){if(!e.store.days[t])e.store.days[t]={status:"not_started",answers:{},starSlots:{},remainingSeconds:1800,lastQuestion:1,score:null,completedAt:null};else{const n=e.store.days[t];if(n.remainingSeconds>1800&&(n.remainingSeconds=1800),n.lastQuestion>20&&(n.lastQuestion=1),n.answers)for(const a of Object.keys(n.answers))Number(a)>20&&delete n.answers[a]}return e.store.days[t]}function pe(t,n){let a=0,s=0,d=0,u=0,i=0,r=0,l=0;for(const w of t.questions){const o=n[w.qNum]===w.answer;if(w.section==="vocab"||w.section==="grammar")s++,o&&a++;else if(w.section==="reading"){i++;const j=w.mondaiId==="r-m4"?12:16;o&&(u++,d+=j)}else w.section==="listening"&&(l++,o&&r++)}const p=Math.round(a/Math.max(1,s)*60),m=Math.min(60,Math.round(d)),x=Math.round(r/Math.max(1,l)*60),b=p+m+x,y=e.level==="N4"?b>=90&&p+m>=38&&x>=19:b>=95&&p>=19&&m>=19&&x>=19;return{langScore:p,readScore:m,listenScore:x,totalScore:b,passed:y,langRaw:a,langTotal:s,readRaw:u,readTotal:i,listenRaw:r,listenTotal:l}}function _(t){const n=Math.max(0,Math.floor(t)),a=Math.floor(n/60),s=n%60;return`${String(a).padStart(2,"0")}:${String(s).padStart(2,"0")}`}function f(t=""){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const ae=typeof Intl<"u"&&Intl.Segmenter?new Intl.Segmenter("ja",{granularity:"word"}):null;function X(t){return`https://jpdb.io/search?q=${encodeURIComponent(t)}&lang=english#a`}function se(t){if(!t)return"";if(!ae)return`<a class="jp-word" href="${X(t)}" target="_blank" rel="noopener noreferrer">${f(t)}</a>`;const n=[...ae.segment(t)];let a="";for(const s of n){const d=s.segment;if(!(s.isWordLike&&/[\u3040-\u30ff\u4e00-\u9faf]/.test(d))){a+=f(d);continue}a+=`<a class="jp-word" href="${X(d)}" target="_blank" rel="noopener noreferrer">${f(d)}</a>`}return a}function L(t){return t?String(t).split(/(<u>[\s\S]*?<\/u>)/g).map(a=>{if(a.startsWith("<u>")&&a.endsWith("</u>")){const s=a.slice(3,-4);return`<u>${se(s)}</u>`}return a.split(`
`).map(s=>se(s)).join("<br/>")}).join(""):""}function me(){const t=F();if(!t.length)return 1;for(const n of t)if(D(n.day).status==="in_progress")return n.day;for(const n of t)if(D(n.day).status!=="completed")return n.day;return t.length}let I=null;function ne(){return!document.hidden&&document.hasFocus()}function de(t){let n=0;for(const a of Object.keys(t||{})){const s=Number(a);s>=1&&s<=7?n+=23.3333/7:s>=8&&s<=12?n+=16.6667/5:s>=13&&s<=16?n+=33.3333/4:s>=17&&s<=20&&(n+=26.6667/4)}return Math.min(100,Math.round(n*10)/10)}function ce(t){const n=Math.max(0,1800-t);return n<420?"Target: 語彙 Q1–7 (Finish by 23:00 left / 7m)":n<720?"Target: 文法 Q8–12 (Finish by 18:00 left / 12m)":n<1320?"Target: 読解 Q13–16 (Finish by 08:00 left / 22m)":"Target: 聴解 Q17–20 (Finish by 00:00 / 30m)"}function B(){if(!e.currentExamDay)return;const t=D(e.currentExamDay),n=document.getElementById("live-timer-val"),a=document.getElementById("live-timer-box");n&&(n.textContent=_(t.remainingSeconds)),a&&(e.timerPaused?a.classList.add("paused"):a.classList.remove("paused"));const s=Math.max(0,1800-t.remainingSeconds),d=Math.min(100,s/1800*100),u=de(t.answers),i=document.getElementById("live-time-bar-fill");i&&(i.style.width=`${d.toFixed(1)}%`,d>u+6?i.classList.add("behind"):i.classList.remove("behind"));const r=document.getElementById("live-time-bar-label");r&&(r.textContent=`⏱ ${Math.floor(s/60)}m / 30m`);const l=document.getElementById("live-pace-target-text");l&&(l.textContent=ce(t.remainingSeconds))}function ie(t){z();const n=D(t);n.status!=="completed"&&(n.status==="not_started"&&(n.status="in_progress",E()),e.timerPaused=!ne(),e.timerInterval=setInterval(()=>{if(e.activeTab!=="exam"||!e.currentExamDay)return;if(!ne()){e.timerPaused||(e.timerPaused=!0,E(),B());return}e.timerPaused&&(e.timerPaused=!1,B());const s=D(e.currentExamDay);if(s.status==="completed"){z();return}s.remainingSeconds>0&&(s.remainingSeconds--,B(),s.remainingSeconds%5===0&&E())},1e3))}function z(){e.timerInterval&&(clearInterval(e.timerInterval),e.timerInterval=null),E()}function H(){I&&(I.pause(),I.currentTime=0,I=null),e.playingQuestion=null}document.addEventListener("visibilitychange",()=>{document.hidden?(e.timerPaused=!0,E(),B()):e.activeTab==="exam"&&e.currentExamDay&&(e.timerPaused=!1,B())});window.addEventListener("blur",()=>{e.timerPaused=!0,E(),B()});window.addEventListener("focus",()=>{!document.hidden&&e.activeTab==="exam"&&e.currentExamDay&&(e.timerPaused=!1,B())});window.addEventListener("pagehide",()=>{e.timerPaused=!0,E()});window.addEventListener("beforeunload",()=>{E()});function ve(){return new Promise(t=>{try{const n=window.AudioContext||window.webkitAudioContext;if(!n)return t();const a=new n,s=a.currentTime,d=(u,i,r)=>{const l=a.createOscillator(),p=a.createGain();l.type="sine",l.frequency.setValueAtTime(u,i),p.gain.setValueAtTime(.15,i),p.gain.exponentialRampToValueAtTime(.001,i+r),l.connect(p),p.connect(a.destination),l.start(i),l.stop(i+r)};d(659.25,s,.35),d(523.25,s+.35,.55),setTimeout(()=>{a.close().catch(()=>{}),t()},950)}catch{t()}})}async function fe(t){if(e.playingQuestion===t.qNum){H(),v();return}if(H(),e.playingQuestion=t.qNum,v(),await ve(),e.playingQuestion!==t.qNum)return;const n=t.audioFile||`./audio/d${e.currentExamDay}-q${t.qNum}.mp3`,a=new Audio(n);I=a,a.onended=()=>{e.playingQuestion===t.qNum&&(e.playingQuestion=null,I=null,v())},a.onerror=()=>{e.playingQuestion=null,I=null,e.openTranscripts[t.qNum]=!0,v()};try{await a.play()}catch{e.playingQuestion=null,I=null,e.openTranscripts[t.qNum]=!0,v()}}function ge(){const t=F();if(e.loadingExams||!t.length)return`<div class="hero-banner"><b>Loading JLPT ${e.level} Daily Exam Papers...</b></div>`;const n=Z(),a=me(),s=t.find(b=>b.day===a)||t[0],d=D(s.day),u=Object.keys(d.answers).length;let i=0,r=0,l=0;for(const b of t){const y=D(b.day);y.status==="completed"&&y.score&&(i++,r+=y.score.totalScore,y.score.passed&&l++)}const p=i>0?Math.round(r/i):null;let m="";d.status==="in_progress"?m=`<button class="btn-primary btn-resume" data-action="open-exam" data-day="${s.day}">
      ▶ Resume ${e.level} Day ${s.day} (Q${d.lastQuestion||1} · ${u}/${s.totalQuestions} · ${_(d.remainingSeconds)} left)
    </button>`:m=`<button class="btn-primary" data-action="open-exam" data-day="${s.day}">
      ▶ Start ${e.level} Day ${s.day} Paper (${s.labelEn} · 30 min)
    </button>`;const x=t.map(b=>{const y=D(b.day),w=Object.keys(y.answers).length,A=Math.round(w/b.totalQuestions*100),o=b.day===a;let j='<span class="badge badge-not-started">Not Started · 30:00</span>',M="<span>20 Questions (Vocab 7 · Grammar 5 · Reading 4 · Listening 4)</span>",q=`<button class="btn-primary" data-action="open-exam" data-day="${b.day}">Start 30m Paper</button>`;if(y.status==="in_progress")j=`<span class="badge badge-progress">In Progress · ${w}/${b.totalQuestions} Answered · ${_(y.remainingSeconds)} left</span>`,M=`<span>Paused at Question ${y.lastQuestion||1} — Ready to resume anytime</span>`,q=`<button class="btn-primary btn-resume" data-action="open-exam" data-day="${b.day}">Resume (Q${y.lastQuestion||1}) →</button>`;else if(y.status==="completed"&&y.score){const P=y.score;j=P.passed?`<span class="badge badge-pass">PASS 合格 · ${P.totalScore} / 180</span>`:`<span class="badge badge-fail">SCORE · ${P.totalScore} / 180 (Need ${n})</span>`,M=`<span>言語知識 <b>${P.langScore}/60</b> · 読解 <b>${P.readScore}/60</b> · 聴解 <b>${P.listenScore}/60</b></span>`,q=`
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
                <span class="day-date-title">${f(b.labelEn)}</span>
                <span class="day-date-ja">${f(b.labelJa)}</span>
                ${j}
              </div>
              <div class="day-meta-row">
                ${M}
              </div>
              <div class="day-progress-bar">
                <div class="day-progress-fill ${y.status==="completed"?"done":""}" style="width: ${y.status==="completed"?100:A}%"></div>
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
          <h1 class="hero-title">${e.level} Day ${s.day}: ${f(s.labelEn)}（${f(s.labelJa)}）</h1>
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
          <div class="stat-val">${i} / 34 Days</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">AVERAGE SCORE</div>
          <div class="stat-val">${p!==null?`${p} / 180`:"— / 180"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">PASS RATE (≥${n}/180)</div>
          <div class="stat-val">${i>0?`${l} / ${i} Passed`:"—"}</div>
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
          Official JLPT ${e.level} Test Day · Pass Mark: ${n} / 180 Total
        </div>
      </div>
      <button class="btn-secondary" data-action="switch-tab" data-tab="progress">
        📈 View ${e.level} Score Trend
      </button>
    </div>
  `}function be(){const t=F();if(!t.length)return"";const n=t.find(o=>o.day===e.currentExamDay)||t[0],a=D(n.day),s=a.status==="completed",d=Object.keys(a.answers).length,u=Z();let i=null,r=null;const l={vocab:{title:"第1部：言語知識（文字・語彙）",meta:"目安時間：7分（全7問 · Q1〜Q7）"},grammar:{title:"第2部：言語知識（文法）・読解 【文法】",meta:"目安時間：5分（全5問 · Q8〜Q12）"},reading:{title:"第2部：言語知識（文法）・読解 【読解】",meta:"目安時間：10分（全4問 · Q13〜Q16）"},listening:{title:"第3部：聴解（リスニング）",meta:"目安時間：8分（全4問 · Q17〜Q20）"}};let p="";for(const o of n.questions){if(o.section!==i){i=o.section;const k=l[o.section];p+=`
        <div class="section-divider-banner" id="sec-${o.section}">
          <span>${f(k.title)}</span>
          <span style="font-size:0.78rem; font-weight:600; color:#d4d4d8;">${f(k.meta)}</span>
        </div>
      `}if(o.mondaiId!==r&&(r=o.mondaiId,p+=`
        <div class="mondai-header">
          ${L(o.mondaiTitle)}
        </div>
      `),o.passageText||o.passageTable){const k=o.passageTitle?`<div class="passage-title-bar">${L(o.passageTitle)}</div>`:"",h=o.passageLabel?`<b>${f(o.passageLabel)}</b> `:"",C=(o.passageText||"").split(/\n\n+/).filter(Boolean).map((N,Q)=>`<p class="passage-paragraph">${Q===0?h:""}${L(N)}</p>`).join("");let T="";if(o.passageTable){const N=o.passageTable.headers.map(c=>`<th>${L(c)}</th>`).join(""),Q=o.passageTable.rows.map(c=>`<tr>${c.map(g=>`<td>${L(g)}</td>`).join("")}</tr>`).join("");T=`
          <div class="info-table-wrap">
            <table class="info-table">
              <thead><tr>${N}</tr></thead>
              <tbody>${Q}</tbody>
            </table>
          </div>
        `}const S=o.passageNotes?`<div class="passage-notes">${L(o.passageNotes)}</div>`:"";p+=`
        <div class="reading-passage-box style-${o.passageStyle||"essay"}">
          ${k}
          ${C}
          ${T}
          ${S}
        </div>
      `}let j="";if(o.section==="listening"){const k=e.playingQuestion===o.qNum,h=s||!!e.openTranscripts[o.qNum],C=o.audioFile||`./audio/d${n.day}-q${o.qNum}.mp3`,T=(o.dialogue||[]).map(S=>`
          <div class="dialogue-line">
            <span class="speaker-tag">${S.speaker==="M"?"男 (Male)":"女 (Female)"}</span>
            ${L(S.text)}
          </div>
        `).join("");j=`
        <div class="listening-box">
          <div style="font-size:0.84rem; color:var(--ink-muted); margin-bottom:0.45rem;">
            🎧 <b>状況：</b>${L(o.listeningIntro)}
          </div>
          <div class="listening-controls">
            <button class="btn-audio ${k?"playing":""}" data-action="play-audio" data-qnum="${o.qNum}">
              ${k?"⏹ 音声を停止 (Stop Audio)":"▶ 会話音声を再生 (Play Dialogue MP3)"}
            </button>
            <audio controls preload="none" src="${f(C)}" style="height:32px; max-width:240px;"></audio>
            <button class="btn-secondary" data-action="toggle-script" data-qnum="${o.qNum}">
              ${h?"スクリプトを隠す (Hide Text)":"📖 スクリプトを見る (Show Dialogue Text)"}
            </button>
          </div>
          ${h?`<div class="dialogue-transcript">
                  ${T}
                </div>`:""}
        </div>
      `}let M="";if(o.type==="star"){const k=a.starSlots[o.qNum]||[null,null,null,null],h=[0,1,2,3].map(T=>{const S=T+1===o.starPosition,N=k[T],Q=N!=null?`${N+1}. ${o.options[N]}`:S?"★":`Slot ${T+1}`;return`<span class="star-slot ${S?"is-star":""}" data-action="clear-star-slot" data-qnum="${o.qNum}" data-slot="${T}" title="Tap to clear slot">${f(Q)}</span>`}).join(""),C=o.options.map((T,S)=>`<button class="btn-secondary" style="padding:0.22rem 0.55rem; font-size:0.78rem;" data-action="add-star-frag" data-qnum="${o.qNum}" data-optidx="${S}">+${S+1}: ${f(T)}</button>`).join(" ");M=`
        <div class="star-builder-box">
          <div style="font-size:0.75rem; font-weight:700; color:var(--ink-muted); margin-bottom:0.3rem;">
            ★ Sentence Scramble Helper (Tap fragments below to test order; slot ${o.starPosition} is ★):
          </div>
          <div class="star-slots-row">
            <span>${L(o.prefix)}</span>
            ${h}
            <span>${L(o.suffix)}</span>
          </div>
          <div style="display:flex; gap:0.35rem; flex-wrap:wrap; align-items:center;">
            ${C}
            <button class="btn-secondary" style="padding:0.22rem 0.5rem; font-size:0.72rem;" data-action="reset-star" data-qnum="${o.qNum}">Clear</button>
          </div>
        </div>
      `}const q=a.answers[o.qNum],P=o.options.every(k=>k.length<=16)?"compact-grid":"";!s&&o.hideTargetReading&&o.targetWord;const R=o.options.map((k,h)=>{const C=q===h;let T=C?"selected":"";s&&(h===o.answer?T="graded-correct":C&&h!==o.answer&&(T="graded-wrong"));const S=o.mondaiId==="v-m1"?f(k):L(k,{qNum:o.qNum});return`
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
            ${s?h===o.answer?'<span class="badge badge-pass">✓ 正解</span>':C?'<span class="badge badge-fail">✗ 選択</span>':"":`<button type="button" class="option-select-Action" data-action="select-option" data-qnum="${o.qNum}" data-optidx="${h}">
                    ${C?"✓ Chosen":"Select"}
                  </button>`}
          </div>
        `}).join("");let O="";if(s){const k=q===o.answer,h=o.optionReasons||[],C=o.options.map((T,S)=>{const N=S===o.answer,Q=q===S&&!N,c=N?"elim-correct":Q?"elim-user-wrong":"",g=Q?' <span class="badge badge-fail" style="margin-left:0.35rem;">✗ Your Pick</span>':N&&q===S?' <span class="badge badge-pass" style="margin-left:0.35rem;">✓ Your Pick</span>':"",$=h[S]||(N?"✓ Correct choice.":"✗ Distractor.");return`
            <div class="elimination-item ${c}">
              <div>
                <b>Choice ${S+1}: 「${f(T.replace(/<\/?u>/g,""))}」</b>${g}
              </div>
              <div style="margin-top:0.15rem; color:#27272a;">
                ${f($)}
              </div>
            </div>
          `}).join("");O=`
        <div class="explanation-box ${k?"is-correct":"is-wrong"}">
          <div style="font-size:0.92rem; margin-bottom:0.35rem;">
            <b>${k?`✓ Correct (正解：選択肢 ${o.answer+1})`:q!==void 0?`✗ Incorrect (You picked ${q+1} · Correct Answer: Choice ${o.answer+1})`:`✗ Unanswered (Correct Answer: Choice ${o.answer+1})`}</b>
          </div>
          <div>${f(o.explanation)}</div>
          <div class="elimination-list">
            <div class="elimination-title">🔍 Process of Elimination (消去法 — Why 1–4 Are Right or Wrong):</div>
            ${C}
          </div>
        </div>
      `}p+=`
      <div class="question-block" id="q-block-${o.qNum}">
        ${j}
        <div class="question-prompt-row">
          <span class="q-number-box">${o.qNum}</span>
          <div class="q-prompt-text">
            ${L(o.prompt)}
          </div>
        </div>
        ${M}
        <div class="options-list ${P}">
          ${R}
        </div>
        ${O}
      </div>
    `}let m="";if(e.showJumpDrawer){const o=(j,M,q)=>{let P="";for(let R=M;R<=q;R++){const O=n.questions[R-1],k=a.answers[R];let h=k!==void 0?"answered":"";s&&(h=k===O.answer?"correct":"wrong"),P+=`<button class="q-jump-pill ${h}" data-action="jump-to-q" data-qnum="${R}">${R}</button>`}return`
        <div class="q-jump-section-label">${f(j)}</div>
        <div class="q-jump-grid">${P}</div>
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
    `}let x="";if(s&&a.score){const o=a.score;x=`
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
            <button class="btn-secondary" data-action="reset-day" data-day="${n.day}">Retake Paper</button>
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
    `}const b=de(a.answers),y=Math.max(0,1800-a.remainingSeconds),w=Math.min(100,y/1800*100),A=w>b+6;return`
    <div class="exam-sticky-bar">
      <div class="exam-sticky-top-row">
        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn-secondary" data-action="pause-and-exit" title="Save progress and return to Daily List">
            ← Save & Exit
          </button>
          <span style="font-weight:800; font-size:0.88rem;">${e.level} · Day ${n.day} (${f(n.labelJa)})</span>
          ${s?"":`<span id="live-pace-target-text" style="font-size:0.74rem; font-weight:700; color:var(--accent); background:var(--accent-bg); padding:0.12rem 0.45rem; border-radius:4px;">${f(ce(a.remainingSeconds))}</span>`}
        </div>

        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          ${s?'<span class="badge badge-pass">Graded · Review Mode</span>':`
            <div id="live-timer-box" class="timer-box ${e.timerPaused?"paused":""} ${a.remainingSeconds<300?"urgent":""}" title="Timer automatically pauses when you switch tabs or close the browser">
              <span>⏱</span>
              <span id="live-timer-val">${_(a.remainingSeconds)}</span>
            </div>
          `}
          <button class="btn-secondary" data-action="toggle-jump-drawer">
            📋 ${d}/${n.totalQuestions} Qs
          </button>
          ${s?"":`<button class="btn-primary" style="padding:0.45rem 0.85rem; font-size:0.82rem;" data-action="grade-exam">
                  ✓ Finish & Grade
                </button>`}
        </div>
      </div>

      ${s?"":`
        <div class="dual-pacing-wrap">
          <div class="pacing-row">
            <div class="pacing-label">✓ Questions<br/><b>${d} / ${n.totalQuestions} Done</b></div>
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
              <div id="live-time-bar-fill" class="pacing-fill-time ${A?"behind":""}" style="width:${w.toFixed(1)}%;"></div>
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
    ${x}

    <div class="exam-booklet">
      <div class="booklet-cover-banner">
        <div class="b-series">2026年12月6日対策 · 30分短縮実戦模試（第${n.day}回 / 全34回 · 全20問）</div>
        <div class="b-level">日本語能力試験 ${e.level}（${f(n.labelJa)}）</div>
        <div class="b-meta">
          💡 <b>Tap any Japanese word</b> in the passages, questions, or choices to open it directly in <b>jpdb.io</b>. Tap the numbered circle <b>(1–4)</b> to choose your answer.
        </div>
      </div>

      ${p}

      ${s?"":`
        <div style="margin-top:2rem; padding-top:1.25rem; border-top:2px solid #18181b; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div>
            <b>Answered: ${d} / ${n.totalQuestions} questions</b>
            <div style="font-size:0.8rem; color:var(--ink-muted);">
              Not finished yet? Tap "Save & Pause for Later" to stop now and continue at lunch or this evening.
            </div>
          </div>
          <div style="display:flex; gap:0.6rem; flex-wrap:wrap;">
            <button class="btn-secondary" data-action="pause-and-exit">⏸ Save & Pause for Later</button>
            <button class="btn-primary" data-action="grade-exam">✓ Complete & Grade Day ${n.day} Paper</button>
          </div>
        </div>
      `}
    </div>
  `}function ye(){const t=F();if(e.loadingExams||!t.length)return`<div class="hero-banner"><b>Loading ${e.level} Score Progress...</b></div>`;const n=Z(),a=t.map(c=>({exam:c,state:D(c.day)})).filter(c=>c.state.status==="completed"&&c.state.score),s=a.length,d=s>0?a[s-1].state.score.totalScore:null,u=s>0?Math.max(...a.map(c=>c.state.score.totalScore)):null,i=s>0?Math.round(a.reduce((c,g)=>c+g.state.score.totalScore,0)/s):null,r=760,l=260,p=44,m=24,x=22,b=38,y=r-p-m,w=l-x-b,A=c=>p+(c-1)/33*y,o=(c,g=180)=>x+w-c/g*w,M=[0,60,n,120,180].map(c=>{const g=o(c,180),$=c===n;return`
        <line x1="${p}" y1="${g}" x2="${r-m}" y2="${g}"
          stroke="${$?"#15803d":"#d6d3c9"}"
          stroke-width="${$?"2":"1"}"
          stroke-dasharray="${$?"6,4":"none"}" />
        <text x="${p-8}" y="${g+4}" text-anchor="end" font-size="11" font-weight="${$?"800":"600"}" fill="${$?"#15803d":"#52525b"}">${c}</text>
      `}).join(""),P=[1,5,10,15,20,25,30,34].map(c=>{const g=A(c),$=t[c-1];return`
        <line x1="${g}" y1="${x}" x2="${g}" y2="${x+w}" stroke="#ece9df" stroke-width="1" />
        <text x="${g}" y="${l-12}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#52525b">D${c} (${$.labelJa.replace(/（.*）/,"")})</text>
      `}).join(""),R=a.map(c=>`${A(c.exam.day)},${o(c.state.score.totalScore,180)}`).join(" "),O=a.map(c=>{const g=A(c.exam.day),$=o(c.state.score.totalScore,180),Y=c.state.score.passed;return`
        <circle cx="${g}" cy="${$}" r="5.5" fill="${Y?"#15803d":"#b45309"}" stroke="#ffffff" stroke-width="2" />
        <text x="${g}" y="${$-9}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#18181b">${c.state.score.totalScore}</text>
      `}).join(""),h=[0,19,30,45,60].map(c=>{const g=o(c,60),$=c===19;return`
        <line x1="${p}" y1="${g}" x2="${r-m}" y2="${g}"
          stroke="${$?"#b91c1c":"#d6d3c9"}"
          stroke-width="${$?"1.8":"1"}"
          stroke-dasharray="${$?"5,4":"none"}" />
        <text x="${p-8}" y="${g+4}" text-anchor="end" font-size="11" font-weight="${$?"800":"600"}" fill="${$?"#b91c1c":"#52525b"}">${c}</text>
      `}).join(""),C=a.map(c=>`${A(c.exam.day)},${o(c.state.score.langScore,60)}`).join(" "),T=a.map(c=>`${A(c.exam.day)},${o(c.state.score.readScore,60)}`).join(" "),S=a.map(c=>`${A(c.exam.day)},${o(c.state.score.listenScore,60)}`).join(" "),N=a.map(c=>{const g=A(c.exam.day);return`
        <circle cx="${g}" cy="${o(c.state.score.langScore,60)}" r="4" fill="#1d4ed8" />
        <circle cx="${g}" cy="${o(c.state.score.readScore,60)}" r="4" fill="#b45309" />
        <circle cx="${g}" cy="${o(c.state.score.listenScore,60)}" r="4" fill="#15803d" />
      `}).join(""),Q=a.length===0?`<tr><td colspan="7" style="text-align:center; padding:1.25rem; color:var(--ink-muted);">No completed ${e.level} daily exams yet. Complete Day 1 to see your score plotted here!</td></tr>`:a.slice().reverse().map(({exam:c,state:g})=>{const $=g.score,Y=_(1800-Math.min(1800,g.remainingSeconds||0));return`
              <tr>
                <td><b>${e.level} Day ${c.day}</b> (${f(c.labelJa)})</td>
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
          <div class="stat-val">${s} / 34</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">LATEST SCORE</div>
          <div class="stat-val">${d!==null?`${d} / 180`:"—"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">BEST SCORE</div>
          <div class="stat-val">${u!==null?`${u} / 180`:"—"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">AVERAGE SCORE</div>
          <div class="stat-val">${i!==null?`${i} / 180`:"—"}</div>
        </div>
      </div>
    </div>

    <div class="chart-card">
      <h2 class="chart-title">JLPT ${e.level} Total Scaled Score Over Time (0 – 180 Points)</h2>
      <p class="chart-sub">Green dashed line = <b>${n} / 180 Official JLPT ${e.level} Overall Pass Threshold (合格ライン)</b></p>
      <div class="svg-chart-wrap">
        <svg viewBox="0 0 ${r} ${l}" width="100%" style="min-width:520px; display:block;">
          ${M}
          ${P}
          ${a.length>=2?`<polyline fill="none" stroke="#18181b" stroke-width="3" points="${R}" />`:""}
          ${O}
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
        <svg viewBox="0 0 ${r} ${l}" width="100%" style="min-width:520px; display:block;">
          ${h}
          ${P}
          ${a.length>=2?`
            <polyline fill="none" stroke="#1d4ed8" stroke-width="2.2" points="${C}" />
            <polyline fill="none" stroke="#b45309" stroke-width="2.2" points="${T}" />
            <polyline fill="none" stroke="#15803d" stroke-width="2.2" points="${S}" />
          `:""}
          ${N}
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
            ${Q}
          </tbody>
        </table>
      </div>
    </div>
  `}function $e(){const t=re();if(e.loadingDeck||!t.length)return`<div class="hero-banner"><b>Loading JLPT ${e.level} Unlimited Exam Word Deck...</b></div>`;let n=0,a=0,s=0;for(const r of t){const l=J(r.id);l==="mastered"?n++:l==="struggling"||G(r)?a++:l==="reviewing"&&s++}const d=e.deckQueue,u=d.length>0?d[e.deckCursor%d.length]:null;let i="";if(!u)i=`
      <div class="hero-banner" style="text-align:center; padding:2rem 1.2rem;">
        <h2 style="margin:0 0 0.5rem;">🎉 No cards match this filter right now!</h2>
        <p style="color:var(--ink-muted); font-size:0.9rem; margin:0 0 1rem;">
          ${e.deckFilter==="weak"?'You have no cards marked "Again / Struggling" or missed in completed papers yet. Switch to "All Exam Words" or "Kanji & Readings" to start reviewing!':'All cards in this view are marked Mastered. Uncheck "Hide Mastered" or switch filters to review them again.'}
        </p>
        <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap;">
          <button class="btn-primary" data-action="set-deck-filter" data-filter="all">Show All Exam Words</button>
          <button class="btn-secondary" data-action="toggle-hide-mastered">Show Mastered Cards Too</button>
        </div>
      </div>
    `;else{const r=J(u.id),l=G(u),p=u.day?`${e.level} · Day ${u.day} Paper (Q${u.qNum})`:`JLPT ${e.level} Core Exam Bank`;let m='<span class="badge badge-not-started">New Card</span>';r==="mastered"?m='<span class="badge badge-pass">🟢 Mastered</span>':r==="struggling"||l?m=`<span class="badge badge-fail">🔴 ${l?"Missed in Paper":"Struggling / Again"}</span>`:r==="reviewing"&&(m='<span class="badge badge-progress">🟡 Reviewing</span>');const x=X(u.w);i=`
      <div class="anki-card-stage">
        <div class="anki-card" data-action="flip-anki-card" title="Tap anywhere on card to flip">
          <div>
            <div class="anki-card-top">
              <span style="font-size:0.75rem; font-weight:800; color:var(--ink-muted);">
                Card ${e.deckCursor%d.length+1} of ${d.length} · ${f(p)}
              </span>
              <div style="display:flex; gap:0.35rem; align-items:center;">
                ${m}
              </div>
            </div>

            <div class="anki-word-front">${f(u.w)}</div>

            ${u.ja?`<div class="anki-sentence-front">
                    ${L(u.ja)}
                  </div>`:""}
          </div>

          ${e.deckFlipped?`
            <div class="anki-back-reveal">
              <div class="anki-reading-back">【 ${f(u.r)} 】</div>
              <div class="anki-meaning-back">${f(u.m)}</div>
              ${u.en?`<div class="anki-note-back"><b>Sentence / Context:</b> ${f(u.en)}</div>`:""}
              ${u.note?`<div class="anki-note-back"><b>💡 Exam Trap / Note:</b> ${f(u.note)}</div>`:""}
              <div style="display:flex; justify-content:center; margin-top:0.2rem;">
                <a class="btn-jpdb" href="${x}" target="_blank" rel="noopener noreferrer">
                  🔎 Open "${f(u.w)}" in jpdb.io ↗
                </a>
              </div>
            </div>
          `:`
            <div style="text-align:center; padding-top:0.85rem; border-top:1px dashed var(--border-soft); color:var(--accent); font-weight:800; font-size:0.88rem;">
              👆 Tap Anywhere on Card to Reveal Reading & English (or press Space)
            </div>
          `}
        </div>

        <div class="anki-rating-grid">
          <button type="button" class="btn-anki-rate btn-anki-again" data-action="rate-anki-card" data-rating="again">
            <span>🔴 Again (もう一度)</span>
            <small>Repeat in 6 cards · Flag Weak</small>
          </button>
          <button type="button" class="btn-anki-rate btn-anki-good" data-action="rate-anki-card" data-rating="good">
            <span>🟡 Good (覚えた)</span>
            <small>Next card · Keep in rotation</small>
          </button>
          <button type="button" class="btn-anki-rate btn-anki-easy" data-action="rate-anki-card" data-rating="easy">
            <span>🟢 Easy / Know It</span>
            <small>Mark Mastered · Hide if filtered</small>
          </button>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.85rem; gap:0.5rem; flex-wrap:wrap;">
          <button type="button" class="btn-secondary" data-action="prev-anki-card">← Previous Card</button>
          <span style="font-size:0.78rem; color:var(--ink-muted); font-weight:700;">
            Session Reviewed: ${e.deckSessionReviewed} cards (Unlimited · No Timer)
          </span>
          <button type="button" class="btn-secondary" data-action="next-anki-card">Skip / Next →</button>
        </div>
      </div>
    `}return`
    <div class="hero-banner">
      <div class="hero-top">
        <div>
          <span class="hero-eyebrow">UNLIMITED ANKI-STYLE REVIEW · NO TIMER · NO DAILY LIMIT</span>
          <h1 class="hero-title">JLPT ${e.level} Exam Word & Grammar Deck（全${t.length}語）</h1>
          <p class="hero-desc">
            Flip through all vocabulary, kanji reading traps, synonyms, usage words, and grammar patterns from the 34 ${e.level} exam papers. Tap any word in the example sentence to open <b>jpdb.io</b>.
          </p>
        </div>
        <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
          <button class="btn-secondary" data-action="shuffle-deck">🔀 Shuffle Deck</button>
          <button class="btn-secondary" data-action="toggle-hide-mastered">
            ${e.deckHideMastered?"👁 Hide Mastered: ON":"👁 Hide Mastered: OFF"}
          </button>
        </div>
      </div>

      <div class="hero-stats">
        <div class="stat-pill">
          <div class="stat-label">TOTAL ${e.level} CARDS</div>
          <div class="stat-val">${t.length}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">🔥 WEAK / MISSED</div>
          <div class="stat-val" style="color:var(--fail);">${a}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">🟡 REVIEWING</div>
          <div class="stat-val" style="color:var(--accent);">${s}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">🟢 MASTERED</div>
          <div class="stat-val" style="color:var(--pass);">${n}</div>
        </div>
      </div>
    </div>

    <div class="deck-filter-bar">
      <button type="button" class="deck-filter-pill ${e.deckFilter==="all"?"active":""}" data-action="set-deck-filter" data-filter="all">
        📚 All Exam Words (${t.length})
      </button>
      <button type="button" class="deck-filter-pill ${e.deckFilter==="weak"?"active":""}" data-action="set-deck-filter" data-filter="weak">
        🔥 Weak & Missed in Papers (${a})
      </button>
      <button type="button" class="deck-filter-pill ${e.deckFilter==="kanji"?"active":""}" data-action="set-deck-filter" data-filter="kanji">
        漢字 Kanji Reading & Lookalikes
      </button>
      <button type="button" class="deck-filter-pill ${e.deckFilter==="adverb_grammar"?"active":""}" data-action="set-deck-filter" data-filter="adverb_grammar">
        ✨ Adverbs, Usage & Grammar
      </button>
    </div>

    ${i}
  `}function he(){if(!e.showBackupModal)return"";const t=btoa(unescape(encodeURIComponent(JSON.stringify(e.store))));return`
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
        <textarea id="backup-code-box" rows="3" style="width:100%; font-family:monospace; font-size:0.76rem; padding:0.45rem; border-radius:4px;">${f(t)}</textarea>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn-jpdb" data-action="copy-backup">📋 Copy Backup Code</button>
          <button class="btn-jpdb secondary" data-action="restore-backup">📥 Restore from Code in Box</button>
        </div>
      </div>
    </div>
  `}function v(){const t=document.getElementById("app");if(!t)return;let n="";e.activeTab==="exam"&&e.currentExamDay?n=be():e.activeTab==="deck"?n=$e():e.activeTab==="progress"?n=ye():n=ge(),t.innerHTML=`
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

    <main class="main-container">
      ${n}
    </main>

    ${he()}
  `}document.addEventListener("click",t=>{var d,u;if(t.target.closest(".jp-word")){t.stopPropagation();return}const a=t.target.closest("[data-action]");if(!a)return;const s=a.getAttribute("data-action");if(s==="switch-level"){const i=(a.getAttribute("data-level")||"N3").toUpperCase();if(i===e.level)return;z(),H(),e.level=i;try{localStorage.setItem(K,i);const r=new URL(window.location.href);r.searchParams.set("level",i.toLowerCase()),window.history.replaceState({},"",r.toString())}catch{}e.store=oe(i),e.currentExamDay=null,e.deckQueue=[],e.activeTab==="exam"&&(e.activeTab="daily"),le(i),e.activeTab==="deck"&&te(i);return}if(s==="share-level-link"){const i=e.level==="N3"?"n4":"n3",r=`${window.location.origin}${window.location.pathname}?level=${i}`;(d=navigator.clipboard)==null||d.writeText(r),alert(`Copied direct ${i.toUpperCase()} link to clipboard:
${r}

Send this to your friend—it will open directly on the ${i.toUpperCase()} exam papers with his own independent progress!`);return}if(s==="switch-tab"){const i=a.getAttribute("data-tab");z(),H(),e.activeWordPopup=null,e.activeTab=i,i==="deck"&&te(e.level),window.scrollTo({top:0,behavior:"smooth"}),v();return}if(s==="flip-anki-card"){e.deckFlipped=!e.deckFlipped,v();return}if(s==="rate-anki-card"){const i=a.getAttribute("data-rating"),r=e.deckQueue;if(!r.length)return;const l=e.deckCursor%r.length,p=r[l];if(e.deckSessionReviewed++,i==="again"){V(p.id,"struggling");const m=Math.min(r.length,l+6);r.splice(m,0,p),e.deckCursor=l+1}else i==="good"?(V(p.id,"reviewing"),e.deckCursor=(l+1)%r.length):i==="easy"&&(V(p.id,"mastered"),e.deckHideMastered&&e.deckFilter!=="weak"?(r.splice(l,1),r.length>0&&(e.deckCursor=l%r.length)):e.deckCursor=(l+1)%r.length);e.deckFlipped=!1,v();return}if(s==="set-deck-filter"){e.deckFilter=a.getAttribute("data-filter")||"all",W(!1),v();return}if(s==="toggle-hide-mastered"){e.deckHideMastered=!e.deckHideMastered,W(!1),v();return}if(s==="shuffle-deck"){W(!0),v();return}if(s==="prev-anki-card"){const i=e.deckQueue;if(!i.length)return;e.deckCursor=(e.deckCursor-1+i.length)%i.length,e.deckFlipped=!1,v();return}if(s==="next-anki-card"){const i=e.deckQueue;if(!i.length)return;e.deckCursor=(e.deckCursor+1)%i.length,e.deckFlipped=!1,v();return}if(s==="open-exam"){const i=Number(a.getAttribute("data-day"));e.currentExamDay=i,e.activeTab="exam",e.showJumpDrawer=!1,e.activeWordPopup=null;const r=D(i);ie(i),v(),r.status==="in_progress"&&r.lastQuestion>1?setTimeout(()=>{const l=document.getElementById(`q-block-${r.lastQuestion}`);l&&l.scrollIntoView({behavior:"smooth",block:"center"})},60):window.scrollTo({top:0,behavior:"smooth"});return}if(s==="pause-and-exit"){z(),H(),e.activeWordPopup=null,e.activeTab="daily",window.scrollTo({top:0,behavior:"smooth"}),v();return}if(s==="toggle-jump-drawer"){e.showJumpDrawer=!e.showJumpDrawer,v();return}if(s==="jump-to-q"){const i=Number(a.getAttribute("data-qnum"));e.showJumpDrawer=!1,v();const r=document.getElementById(`q-block-${i}`);r&&r.scrollIntoView({behavior:"smooth",block:"center"});return}if(s==="select-option"){const i=Number(a.getAttribute("data-qnum")),r=Number(a.getAttribute("data-optidx"));if(!e.currentExamDay)return;const l=D(e.currentExamDay);if(l.status==="completed")return;l.answers[i]===r?delete l.answers[i]:l.answers[i]=r,l.lastQuestion=i,l.status="in_progress",e.activeWordPopup=null,E(),v();return}if(s==="add-star-frag"){const i=Number(a.getAttribute("data-qnum")),r=Number(a.getAttribute("data-optidx")),l=D(e.currentExamDay);if(l.status==="completed")return;const p=l.starSlots[i]?[...l.starSlots[i]]:[null,null,null,null],m=p.findIndex(x=>x==null);if(m!==-1&&!p.includes(r)){p[m]=r,l.starSlots[i]=p;const b=F().find(w=>w.day===e.currentExamDay),y=b==null?void 0:b.questions.find(w=>w.qNum===i);y&&p[y.starPosition-1]!==null&&(l.answers[i]=p[y.starPosition-1]),l.lastQuestion=i,E(),v()}return}if(s==="clear-star-slot"){const i=Number(a.getAttribute("data-qnum")),r=Number(a.getAttribute("data-slot")),l=D(e.currentExamDay);if(l.status==="completed"||!l.starSlots[i])return;l.starSlots[i][r]=null,E(),v();return}if(s==="reset-star"){const i=Number(a.getAttribute("data-qnum")),r=D(e.currentExamDay);if(r.status==="completed")return;delete r.starSlots[i],E(),v();return}if(s==="play-audio"){const i=Number(a.getAttribute("data-qnum")),l=F().find(m=>m.day===e.currentExamDay),p=l==null?void 0:l.questions.find(m=>m.qNum===i);p&&fe(p);return}if(s==="toggle-script"){const i=Number(a.getAttribute("data-qnum"));e.openTranscripts[i]=!e.openTranscripts[i],v();return}if(s==="grade-exam"){if(!e.currentExamDay)return;const r=F().find(m=>m.day===e.currentExamDay),l=D(r.day),p=Object.keys(l.answers).length;if(p<r.totalQuestions&&!window.confirm(`You have answered ${p} of ${r.totalQuestions} questions.

If you just want to take a break and continue later today, tap Cancel and use "Save & Exit".

Grade ${e.level} Day ${r.day} paper now?`))return;z(),H(),l.status="completed",l.score=pe(r,l.answers),l.completedAt=new Date().toISOString(),E(),window.scrollTo({top:0,behavior:"smooth"}),v();return}if(s==="reset-day"){const i=Number(a.getAttribute("data-day"));if(!window.confirm(`Reset all answers and timer for ${e.level} Day ${i}?`))return;delete e.store.days[i],E(),e.activeTab==="exam"&&e.currentExamDay===i&&ie(i),v();return}if(s==="toggle-backup-modal"){e.showBackupModal=!e.showBackupModal,v();return}if(s==="copy-backup"){const i=document.getElementById("backup-code-box");i&&(i.select(),(u=navigator.clipboard)==null||u.writeText(i.value),alert("Backup code copied to clipboard!"));return}if(s==="restore-backup"){const i=document.getElementById("backup-code-box");if(!i||!i.value.trim())return;try{const r=JSON.parse(decodeURIComponent(escape(atob(i.value.trim()))));r&&r.days&&(e.store=r,E(),e.showBackupModal=!1,v(),alert("Progress restored successfully!"))}catch{alert("Invalid backup code.")}}});document.addEventListener("keydown",t=>{var n,a,s,d,u;e.activeTab!=="deck"||e.showBackupModal||t.target&&(t.target.tagName==="INPUT"||t.target.tagName==="TEXTAREA")||(t.code==="Space"?(t.preventDefault(),e.deckFlipped=!e.deckFlipped,v()):t.key==="1"?(n=document.querySelector('[data-rating="again"]'))==null||n.click():t.key==="2"?(a=document.querySelector('[data-rating="good"]'))==null||a.click():t.key==="3"?(s=document.querySelector('[data-rating="easy"]'))==null||s.click():t.key==="ArrowRight"?(d=document.querySelector('[data-action="next-anki-card"]'))==null||d.click():t.key==="ArrowLeft"&&((u=document.querySelector('[data-action="prev-anki-card"]'))==null||u.click()))});le(e.level);
