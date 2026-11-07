(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))t(l);new MutationObserver(l=>{for(const p of l)if(p.type==="childList")for(const i of p.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function s(l){const p={};return l.integrity&&(p.integrity=l.integrity),l.referrerPolicy&&(p.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?p.credentials="include":l.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function t(l){if(l.ep)return;l.ep=!0;const p=s(l);fetch(l.href,p)}})();const K="jlpt_selected_level",U={N3:"jlpt_n3_daily_state_v1",N4:"jlpt_n4_daily_state_v1"};function ue(){try{const n=(new URLSearchParams(window.location.search).get("level")||"").toUpperCase();if(n==="N3"||n==="N4")return localStorage.setItem(K,n),n;const s=(localStorage.getItem(K)||"").toUpperCase();if(s==="N3"||s==="N4")return s}catch{}return"N3"}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});function oe(a){try{const n=localStorage.getItem(U[a]||U.N3);if(n){const s=JSON.parse(n);if(s&&typeof s=="object"&&s.days)return s}}catch(n){console.warn("Failed to parse saved state:",n)}return{days:{}}}const ee=ue(),e={level:ee,examsByLevel:{},decksByLevel:{},loadingExams:!0,loadingDeck:!1,store:oe(ee),activeTab:"daily",currentExamDay:null,timerPaused:!1,timerInterval:null,showJumpDrawer:!1,openTranscripts:{},playingQuestion:null,activeWordPopup:null,showBackupModal:!1,deckFilter:"all",deckHideMastered:!0,deckQueue:[],deckCursor:0,deckFlipped:!1,deckSessionReviewed:0};function I(){return e.examsByLevel[e.level]||[]}function re(){return e.decksByLevel[e.level]||[]}function Z(){return e.level==="N4"?90:95}async function le(a){if(e.examsByLevel[a]){e.loadingExams=!1;return}e.loadingExams=!0,m();try{const t=await(await fetch(a==="N4"?"./data/exams-n4.json":"./data/exams-n3.json")).json();e.examsByLevel[a]=t}catch(n){console.error("Failed to load exams for",a,n),e.examsByLevel[a]=[]}e.loadingExams=!1,m()}async function te(a){if(e.decksByLevel[a]){e.deckQueue.length||W(!1);return}e.loadingDeck=!0,m();try{const t=await(await fetch(a==="N4"?"./data/deck-n4.json":"./data/deck-n3.json")).json();e.decksByLevel[a]=t}catch(n){console.error("Failed to load deck for",a,n),e.decksByLevel[a]=[]}e.loadingDeck=!1,W(!1),m()}function J(a){var n;return e.store.deck||(e.store.deck={}),((n=e.store.deck[a])==null?void 0:n.status)||"new"}function V(a,n){e.store.deck||(e.store.deck={});const s=e.store.deck[a]||{reps:0};e.store.deck[a]={status:n,reps:(s.reps||0)+1},E()}function G(a){var p,i;if(!a.day||!a.qNum)return!1;const n=(p=e.store.days)==null?void 0:p[a.day];if(!n||n.status!=="completed")return!1;const t=I().find(r=>r.day===a.day),l=t==null?void 0:t.questions.find(r=>r.qNum===a.qNum);return l?((i=n.answers)==null?void 0:i[a.qNum])!==l.answer:!1}function W(a=!1){const n=re();if(!n.length){e.deckQueue=[],e.deckCursor=0,e.deckFlipped=!1;return}let s=n.filter(t=>{const l=J(t.id);return e.deckHideMastered&&l==="mastered"&&e.deckFilter!=="weak"?!1:e.deckFilter==="weak"?l==="struggling"||G(t):e.deckFilter==="kanji"?t.cat==="kanji":e.deckFilter==="adverb_grammar"?t.cat==="adverb_grammar":!0});if(!a)s.sort((t,l)=>{const p=J(t.id),i=J(l.id),r=(d,u)=>u==="struggling"||G(d)?0:u==="new"&&d.day?1:u==="new"?2:u==="reviewing"?3:4;return r(t,p)-r(l,i)});else{s=[...s];for(let t=s.length-1;t>0;t--){const l=Math.floor(Math.random()*(t+1));[s[t],s[l]]=[s[l],s[t]]}}e.deckQueue=s,e.deckCursor=0,e.deckFlipped=!1}function E(){try{const a=U[e.level]||U.N3;localStorage.setItem(a,JSON.stringify(e.store))}catch(a){console.warn("Failed to save state:",a)}}function D(a){if(!e.store.days[a])e.store.days[a]={status:"not_started",answers:{},starSlots:{},remainingSeconds:1800,lastQuestion:1,score:null,completedAt:null};else{const n=e.store.days[a];if(n.remainingSeconds>1800&&(n.remainingSeconds=1800),n.lastQuestion>20&&(n.lastQuestion=1),n.answers)for(const s of Object.keys(n.answers))Number(s)>20&&delete n.answers[s]}return e.store.days[a]}function pe(a,n){let s=0,t=0,l=0,p=0,i=0,r=0,d=0;for(const w of a.questions){const o=n[w.qNum]===w.answer;if(w.section==="vocab"||w.section==="grammar")t++,o&&s++;else if(w.section==="reading"){i++;const A=w.mondaiId==="r-m4"?12:16;o&&(p++,l+=A)}else w.section==="listening"&&(d++,o&&r++)}const u=Math.round(s/Math.max(1,t)*60),f=Math.min(60,Math.round(l)),T=Math.round(r/Math.max(1,d)*60),g=u+f+T,y=e.level==="N4"?g>=90&&u+f>=38&&T>=19:g>=95&&u>=19&&f>=19&&T>=19;return{langScore:u,readScore:f,listenScore:T,totalScore:g,passed:y,langRaw:s,langTotal:t,readRaw:p,readTotal:i,listenRaw:r,listenTotal:d}}function _(a){const n=Math.max(0,Math.floor(a)),s=Math.floor(n/60),t=n%60;return`${String(s).padStart(2,"0")}:${String(t).padStart(2,"0")}`}function v(a=""){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const ae=typeof Intl<"u"&&Intl.Segmenter?new Intl.Segmenter("ja",{granularity:"word"}):null;function X(a){return`https://jpdb.io/search?q=${encodeURIComponent(a)}&lang=english#a`}function se(a){if(!a)return"";if(!ae)return`<a class="jp-word" href="${X(a)}" target="_blank" rel="noopener noreferrer">${v(a)}</a>`;const n=[...ae.segment(a)];let s="";for(const t of n){const l=t.segment;if(!(t.isWordLike&&/[\u3040-\u30ff\u4e00-\u9faf]/.test(l))){s+=v(l);continue}s+=`<a class="jp-word" href="${X(l)}" target="_blank" rel="noopener noreferrer">${v(l)}</a>`}return s}function L(a){return a?String(a).split(/(<u>[\s\S]*?<\/u>)/g).map(s=>{if(s.startsWith("<u>")&&s.endsWith("</u>")){const t=s.slice(3,-4);return`<u>${se(t)}</u>`}return s.split(`
`).map(t=>se(t)).join("<br/>")}).join(""):""}function me(){const a=I();if(!a.length)return 1;for(const n of a)if(D(n.day).status==="in_progress")return n.day;for(const n of a)if(D(n.day).status!=="completed")return n.day;return a.length}let B=null;function ne(){return!document.hidden&&document.hasFocus()}function de(a){let n=0;for(const s of Object.keys(a||{})){const t=Number(s);t>=1&&t<=7?n+=23.3333/7:t>=8&&t<=12?n+=16.6667/5:t>=13&&t<=16?n+=33.3333/4:t>=17&&t<=20&&(n+=26.6667/4)}return Math.min(100,Math.round(n*10)/10)}function ce(a){const n=Math.max(0,1800-a);return n<420?"Target: 語彙 Q1–7 (Finish by 23:00 left / 7m)":n<720?"Target: 文法 Q8–12 (Finish by 18:00 left / 12m)":n<1320?"Target: 読解 Q13–16 (Finish by 08:00 left / 22m)":"Target: 聴解 Q17–20 (Finish by 00:00 / 30m)"}function F(){if(!e.currentExamDay)return;const a=D(e.currentExamDay),n=document.getElementById("live-timer-val"),s=document.getElementById("live-timer-box");n&&(n.textContent=_(a.remainingSeconds)),s&&(e.timerPaused?s.classList.add("paused"):s.classList.remove("paused"));const t=Math.max(0,1800-a.remainingSeconds),l=Math.min(100,t/1800*100),p=de(a.answers),i=document.getElementById("live-time-bar-fill");i&&(i.style.width=`${l.toFixed(1)}%`,l>p+6?i.classList.add("behind"):i.classList.remove("behind"));const r=document.getElementById("live-time-bar-label");r&&(r.textContent=`⏱ ${Math.floor(t/60)}m / 30m`);const d=document.getElementById("live-pace-target-text");d&&(d.textContent=ce(a.remainingSeconds))}function ie(a){O();const n=D(a);n.status!=="completed"&&(n.status==="not_started"&&(n.status="in_progress",E()),e.timerPaused=!ne(),e.timerInterval=setInterval(()=>{if(e.activeTab!=="exam"||!e.currentExamDay)return;if(!ne()){e.timerPaused||(e.timerPaused=!0,E(),F());return}e.timerPaused&&(e.timerPaused=!1,F());const t=D(e.currentExamDay);if(t.status==="completed"){O();return}t.remainingSeconds>0&&(t.remainingSeconds--,F(),t.remainingSeconds%5===0&&E())},1e3))}function O(){e.timerInterval&&(clearInterval(e.timerInterval),e.timerInterval=null),E()}function H(){B&&(B.pause(),B.currentTime=0,B=null),e.playingQuestion=null}document.addEventListener("visibilitychange",()=>{document.hidden?(e.timerPaused=!0,E(),F()):e.activeTab==="exam"&&e.currentExamDay&&(e.timerPaused=!1,F())});window.addEventListener("blur",()=>{e.timerPaused=!0,E(),F()});window.addEventListener("focus",()=>{!document.hidden&&e.activeTab==="exam"&&e.currentExamDay&&(e.timerPaused=!1,F())});window.addEventListener("pagehide",()=>{e.timerPaused=!0,E()});window.addEventListener("beforeunload",()=>{E()});function ve(){return new Promise(a=>{try{const n=window.AudioContext||window.webkitAudioContext;if(!n)return a();const s=new n,t=s.currentTime,l=(p,i,r)=>{const d=s.createOscillator(),u=s.createGain();d.type="sine",d.frequency.setValueAtTime(p,i),u.gain.setValueAtTime(.15,i),u.gain.exponentialRampToValueAtTime(.001,i+r),d.connect(u),u.connect(s.destination),d.start(i),d.stop(i+r)};l(659.25,t,.35),l(523.25,t+.35,.55),setTimeout(()=>{s.close().catch(()=>{}),a()},950)}catch{a()}})}async function fe(a){if(e.playingQuestion===a.qNum){H(),m();return}if(H(),e.playingQuestion=a.qNum,m(),await ve(),e.playingQuestion!==a.qNum)return;const n=a.audioFile||`./audio/d${e.currentExamDay}-q${a.qNum}.mp3`,s=new Audio(n);B=s,s.onended=()=>{e.playingQuestion===a.qNum&&(e.playingQuestion=null,B=null,m())},s.onerror=()=>{e.playingQuestion=null,B=null,e.openTranscripts[a.qNum]=!0,m()};try{await s.play()}catch{e.playingQuestion=null,B=null,e.openTranscripts[a.qNum]=!0,m()}}function be(){const a=I();if(e.loadingExams||!a.length)return`<div class="hero-banner"><b>Loading JLPT ${e.level} Daily Exam Papers...</b></div>`;const n=Z(),s=me(),t=a.find(g=>g.day===s)||a[0],l=D(t.day),p=Object.keys(l.answers).length;let i=0,r=0,d=0;for(const g of a){const y=D(g.day);y.status==="completed"&&y.score&&(i++,r+=y.score.totalScore,y.score.passed&&d++)}const u=i>0?Math.round(r/i):null;let f="";l.status==="in_progress"?f=`<button class="btn-primary btn-resume" data-action="open-exam" data-day="${t.day}">
      ▶ Resume ${e.level} Day ${t.day} (Q${l.lastQuestion||1} · ${p}/${t.totalQuestions} · ${_(l.remainingSeconds)} left)
    </button>`:f=`<button class="btn-primary" data-action="open-exam" data-day="${t.day}">
      ▶ Start ${e.level} Day ${t.day} Paper (${t.labelEn} · 30 min)
    </button>`;const T=a.map(g=>{const y=D(g.day),w=Object.keys(y.answers).length,j=Math.round(w/g.totalQuestions*100),o=g.day===s;let A='<span class="badge badge-not-started">Not Started · 30:00</span>',Q="<span>20 Questions (Vocab 7 · Grammar 5 · Reading 4 · Listening 4)</span>",C=`<button class="btn-primary" data-action="open-exam" data-day="${g.day}">Start 30m Paper</button>`;if(y.status==="in_progress")A=`<span class="badge badge-progress">In Progress · ${w}/${g.totalQuestions} Answered · ${_(y.remainingSeconds)} left</span>`,Q=`<span>Paused at Question ${y.lastQuestion||1} — Ready to resume anytime</span>`,C=`<button class="btn-primary btn-resume" data-action="open-exam" data-day="${g.day}">Resume (Q${y.lastQuestion||1}) →</button>`;else if(y.status==="completed"&&y.score){const P=y.score;A=P.passed?`<span class="badge badge-pass">PASS 合格 · ${P.totalScore} / 180</span>`:`<span class="badge badge-fail">SCORE · ${P.totalScore} / 180 (Need ${n})</span>`,Q=`<span>言語知識 <b>${P.langScore}/60</b> · 読解 <b>${P.readScore}/60</b> · 聴解 <b>${P.listenScore}/60</b></span>`,C=`
          <button class="btn-secondary" data-action="open-exam" data-day="${g.day}">Review Paper</button>
          <button class="btn-secondary" data-action="reset-day" data-day="${g.day}" title="Reset and retake this day">Retake</button>
        `}return`
        <div class="day-card ${o?"is-current":""} ${y.status==="completed"?"is-completed":""}">
          <div class="day-left">
            <div class="day-num-box">
              <span class="d-small">${e.level} D</span>
              <span class="d-big">${g.day}</span>
            </div>
            <div class="day-info">
              <div class="day-date-row">
                <span class="day-date-title">${v(g.labelEn)}</span>
                <span class="day-date-ja">${v(g.labelJa)}</span>
                ${A}
              </div>
              <div class="day-meta-row">
                ${Q}
              </div>
              <div class="day-progress-bar">
                <div class="day-progress-fill ${y.status==="completed"?"done":""}" style="width: ${y.status==="completed"?100:j}%"></div>
              </div>
            </div>
          </div>
          <div class="day-actions">
            ${C}
          </div>
        </div>
      `}).join("");return`
    <div class="hero-banner">
      <div class="hero-top">
        <div>
          <span class="hero-eyebrow">NEXT UP · 30-MINUTE SCALED JLPT ${e.level} EXAM</span>
          <h1 class="hero-title">${e.level} Day ${t.day}: ${v(t.labelEn)}（${v(t.labelJa)}）</h1>
          <p class="hero-desc">
            20 exam-style questions in 30 minutes. Start and stop whenever you want—timer auto-pauses when you leave the tab. Tap any Japanese word to open it in <b>jpdb.io</b>.
          </p>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.45rem; align-items:flex-end;">
          ${f}
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
          <div class="stat-val">${u!==null?`${u} / 180`:"— / 180"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">PASS RATE (≥${n}/180)</div>
          <div class="stat-val">${i>0?`${d} / ${i} Passed`:"—"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">EXAM DAY</div>
          <div class="stat-val">Sun, 6 Dec 2026</div>
        </div>
      </div>
    </div>

    <div class="days-grid">
      ${T}
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
  `}function ge(){const a=I();if(!a.length)return"";const n=a.find(o=>o.day===e.currentExamDay)||a[0],s=D(n.day),t=s.status==="completed",l=Object.keys(s.answers).length,p=Z();let i=null,r=null;const d={vocab:{title:"第1部：言語知識（文字・語彙）",meta:"目安時間：7分（全7問 · Q1〜Q7）"},grammar:{title:"第2部：言語知識（文法）・読解 【文法】",meta:"目安時間：5分（全5問 · Q8〜Q12）"},reading:{title:"第2部：言語知識（文法）・読解 【読解】",meta:"目安時間：10分（全4問 · Q13〜Q16）"},listening:{title:"第3部：聴解（リスニング）",meta:"目安時間：8分（全4問 · Q17〜Q20）"}};let u="";for(const o of n.questions){if(o.section!==i){i=o.section;const k=d[o.section];u+=`
        <div class="section-divider-banner" id="sec-${o.section}">
          <span>${v(k.title)}</span>
          <span style="font-size:0.78rem; font-weight:600; color:#d4d4d8;">${v(k.meta)}</span>
        </div>
      `}if(o.mondaiId!==r&&(r=o.mondaiId,u+=`
        <div class="mondai-header">
          ${L(o.mondaiTitle)}
        </div>
      `),o.passageText||o.passageTable){const k=o.passageTitle?`<div class="passage-title-bar">${L(o.passageTitle)}</div>`:"",h=o.passageLabel?`<b>${v(o.passageLabel)}</b> `:"",q=(o.passageText||"").split(/\n\n+/).filter(Boolean).map((N,R)=>`<p class="passage-paragraph">${R===0?h:""}${L(N)}</p>`).join("");let S="";if(o.passageTable){const N=o.passageTable.headers.map(c=>`<th>${L(c)}</th>`).join(""),R=o.passageTable.rows.map(c=>`<tr>${c.map(b=>`<td>${L(b)}</td>`).join("")}</tr>`).join("");S=`
          <div class="info-table-wrap">
            <table class="info-table">
              <thead><tr>${N}</tr></thead>
              <tbody>${R}</tbody>
            </table>
          </div>
        `}const x=o.passageNotes?`<div class="passage-notes">${L(o.passageNotes)}</div>`:"";u+=`
        <div class="reading-passage-box style-${o.passageStyle||"essay"}">
          ${k}
          ${q}
          ${S}
          ${x}
        </div>
      `}let A="";if(o.section==="listening"){const k=e.playingQuestion===o.qNum,h=t||!!e.openTranscripts[o.qNum],q=o.audioFile||`./audio/d${n.day}-q${o.qNum}.mp3`,S=(o.dialogue||[]).map(x=>`
          <div class="dialogue-line">
            <span class="speaker-tag">${x.speaker==="M"?"男 (Male)":"女 (Female)"}</span>
            ${L(x.text)}
          </div>
        `).join("");A=`
        <div class="listening-box">
          <div style="font-size:0.84rem; color:var(--ink-muted); margin-bottom:0.45rem;">
            🎧 <b>状況：</b>${L(o.listeningIntro)}
          </div>
          <div class="listening-controls">
            <button class="btn-audio ${k?"playing":""}" data-action="play-audio" data-qnum="${o.qNum}">
              ${k?"⏹ 音声を停止 (Stop Audio)":"▶ 会話音声を再生 (Play Dialogue MP3)"}
            </button>
            <audio controls preload="none" src="${v(q)}" style="height:32px; max-width:240px;"></audio>
            <button class="btn-secondary" data-action="toggle-script" data-qnum="${o.qNum}">
              ${h?"スクリプトを隠す (Hide Text)":"📖 スクリプトを見る (Show Dialogue Text)"}
            </button>
          </div>
          ${h?`<div class="dialogue-transcript">
                  ${S}
                </div>`:""}
        </div>
      `}let Q="";if(o.type==="star"){const k=s.starSlots[o.qNum]||[null,null,null,null],h=[0,1,2,3].map(S=>{const x=S+1===o.starPosition,N=k[S],R=N!=null?`${N+1}. ${o.options[N]}`:x?"★":`Slot ${S+1}`;return`<span class="star-slot ${x?"is-star":""}" data-action="clear-star-slot" data-qnum="${o.qNum}" data-slot="${S}" title="Tap to clear slot">${v(R)}</span>`}).join(""),q=o.options.map((S,x)=>`<button class="btn-secondary" style="padding:0.22rem 0.55rem; font-size:0.78rem;" data-action="add-star-frag" data-qnum="${o.qNum}" data-optidx="${x}">+${x+1}: ${v(S)}</button>`).join(" ");Q=`
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
            ${q}
            <button class="btn-secondary" style="padding:0.22rem 0.5rem; font-size:0.72rem;" data-action="reset-star" data-qnum="${o.qNum}">Clear</button>
          </div>
        </div>
      `}const C=s.answers[o.qNum],P=o.options.every(k=>k.length<=16)?"compact-grid":"";!t&&o.hideTargetReading&&o.targetWord;const M=o.options.map((k,h)=>{const q=C===h;let S=q?"selected":"";t&&(h===o.answer?S="graded-correct":q&&h!==o.answer&&(S="graded-wrong"));const x=o.mondaiId==="v-m1"?v(k):L(k,{qNum:o.qNum});return`
          <div class="option-row ${S}">
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
              ${x}
            </div>
            ${t?h===o.answer?'<span class="badge badge-pass">✓ 正解</span>':q?'<span class="badge badge-fail">✗ 選択</span>':"":`<button type="button" class="option-select-Action" data-action="select-option" data-qnum="${o.qNum}" data-optidx="${h}">
                    ${q?"✓ Chosen":"Select"}
                  </button>`}
          </div>
        `}).join("");let z="";if(t){const k=C===o.answer,h=o.optionReasons||[],q=o.options.map((S,x)=>{const N=x===o.answer,R=C===x&&!N,c=N?"elim-correct":R?"elim-user-wrong":"",b=R?' <span class="badge badge-fail" style="margin-left:0.35rem;">✗ Your Pick</span>':N&&C===x?' <span class="badge badge-pass" style="margin-left:0.35rem;">✓ Your Pick</span>':"",$=h[x]||(N?"✓ Correct choice.":"✗ Distractor.");return`
            <div class="elimination-item ${c}">
              <div>
                <b>Choice ${x+1}: 「${v(S.replace(/<\/?u>/g,""))}」</b>${b}
              </div>
              <div style="margin-top:0.15rem; color:#27272a;">
                ${v($)}
              </div>
            </div>
          `}).join("");z=`
        <div class="explanation-box ${k?"is-correct":"is-wrong"}">
          <div style="font-size:0.92rem; margin-bottom:0.35rem;">
            <b>${k?`✓ Correct (正解：選択肢 ${o.answer+1})`:C!==void 0?`✗ Incorrect (You picked ${C+1} · Correct Answer: Choice ${o.answer+1})`:`✗ Unanswered (Correct Answer: Choice ${o.answer+1})`}</b>
          </div>
          <div>${v(o.explanation)}</div>
          <div class="elimination-list">
            <div class="elimination-title">🔍 Process of Elimination (消去法 — Why 1–4 Are Right or Wrong):</div>
            ${q}
          </div>
        </div>
      `}u+=`
      <div class="question-block" id="q-block-${o.qNum}">
        ${A}
        <div class="question-prompt-row">
          <span class="q-number-box">${o.qNum}</span>
          <div class="q-prompt-text">
            ${L(o.prompt)}
          </div>
        </div>
        ${Q}
        <div class="options-list ${P}">
          ${M}
        </div>
        ${z}
      </div>
    `}let f="";if(e.showJumpDrawer){const o=(A,Q,C)=>{let P="";for(let M=Q;M<=C;M++){const z=n.questions[M-1],k=s.answers[M];let h=k!==void 0?"answered":"";t&&(h=k===z.answer?"correct":"wrong"),P+=`<button class="q-jump-pill ${h}" data-action="jump-to-q" data-qnum="${M}">${M}</button>`}return`
        <div class="q-jump-section-label">${v(A)}</div>
        <div class="q-jump-grid">${P}</div>
      `};f=`
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
    `}let T="";if(t&&s.score){const o=s.score;T=`
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
    `}const g=de(s.answers),y=Math.max(0,1800-s.remainingSeconds),w=Math.min(100,y/1800*100),j=w>g+6;return`
    <div class="exam-sticky-bar">
      <div class="exam-sticky-top-row">
        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn-secondary" data-action="pause-and-exit" title="Save progress and return to Daily List">
            ← Save & Exit
          </button>
          <span style="font-weight:800; font-size:0.88rem;">${e.level} · Day ${n.day} (${v(n.labelJa)})</span>
          ${t?"":`<span id="live-pace-target-text" style="font-size:0.74rem; font-weight:700; color:var(--accent); background:var(--accent-bg); padding:0.12rem 0.45rem; border-radius:4px;">${v(ce(s.remainingSeconds))}</span>`}
        </div>

        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          ${t?'<span class="badge badge-pass">Graded · Review Mode</span>':`
            <div id="live-timer-box" class="timer-box ${e.timerPaused?"paused":""} ${s.remainingSeconds<300?"urgent":""}" title="Timer automatically pauses when you switch tabs or close the browser">
              <span>⏱</span>
              <span id="live-timer-val">${_(s.remainingSeconds)}</span>
            </div>
          `}
          <button class="btn-secondary" data-action="toggle-jump-drawer">
            📋 ${l}/${n.totalQuestions} Qs
          </button>
          ${t?"":`<button class="btn-primary" style="padding:0.45rem 0.85rem; font-size:0.82rem;" data-action="grade-exam">
                  ✓ Finish & Grade
                </button>`}
        </div>
      </div>

      ${t?"":`
        <div class="dual-pacing-wrap">
          <div class="pacing-row">
            <div class="pacing-label">✓ Questions<br/><b>${l} / ${n.totalQuestions} Done</b></div>
            <div class="pacing-track" title="Your Question Progress aligned with section time weights">
              <div class="pacing-tick" style="left:23.33%;"></div>
              <div class="pacing-tick" style="left:40.00%;"></div>
              <div class="pacing-tick" style="left:73.33%;"></div>
              <div class="pacing-fill-questions" style="width:${g}%;"></div>
            </div>
          </div>

          <div class="pacing-row">
            <div class="pacing-label">⏱ Time Pace<br/><b id="live-time-bar-label">⏱ ${Math.floor(y/60)}m / 30m</b></div>
            <div class="pacing-track" title="30-Minute Time Pacing with Section Deadlines">
              <div class="pacing-tick" style="left:23.33%;"></div>
              <div class="pacing-tick" style="left:40.00%;"></div>
              <div class="pacing-tick" style="left:73.33%;"></div>
              <div id="live-time-bar-fill" class="pacing-fill-time ${j?"behind":""}" style="width:${w.toFixed(1)}%;"></div>
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

    ${f}
    ${T}

    <div class="exam-booklet">
      <div class="booklet-cover-banner">
        <div class="b-series">2026年12月6日対策 · 30分短縮実戦模試（第${n.day}回 / 全34回 · 全20問）</div>
        <div class="b-level">日本語能力試験 ${e.level}（${v(n.labelJa)}）</div>
        <div class="b-meta">
          💡 <b>Tap any Japanese word</b> in the passages, questions, or choices to open it directly in <b>jpdb.io</b>. Tap the numbered circle <b>(1–4)</b> to choose your answer.
        </div>
      </div>

      ${u}

      ${t?"":`
        <div style="margin-top:2rem; padding-top:1.25rem; border-top:2px solid #18181b; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div>
            <b>Answered: ${l} / ${n.totalQuestions} questions</b>
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
  `}function ye(){const a=I();if(e.loadingExams||!a.length)return`<div class="hero-banner"><b>Loading ${e.level} Score Progress...</b></div>`;const n=Z(),s=a.map(c=>({exam:c,state:D(c.day)})).filter(c=>c.state.status==="completed"&&c.state.score),t=s.length,l=t>0?s[t-1].state.score.totalScore:null,p=t>0?Math.max(...s.map(c=>c.state.score.totalScore)):null,i=t>0?Math.round(s.reduce((c,b)=>c+b.state.score.totalScore,0)/t):null,r=760,d=260,u=44,f=24,T=22,g=38,y=r-u-f,w=d-T-g,j=c=>u+(c-1)/33*y,o=(c,b=180)=>T+w-c/b*w,Q=[0,60,n,120,180].map(c=>{const b=o(c,180),$=c===n;return`
        <line x1="${u}" y1="${b}" x2="${r-f}" y2="${b}"
          stroke="${$?"#15803d":"#d6d3c9"}"
          stroke-width="${$?"2":"1"}"
          stroke-dasharray="${$?"6,4":"none"}" />
        <text x="${u-8}" y="${b+4}" text-anchor="end" font-size="11" font-weight="${$?"800":"600"}" fill="${$?"#15803d":"#52525b"}">${c}</text>
      `}).join(""),P=[1,5,10,15,20,25,30,34].map(c=>{const b=j(c),$=a[c-1];return`
        <line x1="${b}" y1="${T}" x2="${b}" y2="${T+w}" stroke="#ece9df" stroke-width="1" />
        <text x="${b}" y="${d-12}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#52525b">D${c} (${$.labelJa.replace(/（.*）/,"")})</text>
      `}).join(""),M=s.map(c=>`${j(c.exam.day)},${o(c.state.score.totalScore,180)}`).join(" "),z=s.map(c=>{const b=j(c.exam.day),$=o(c.state.score.totalScore,180),Y=c.state.score.passed;return`
        <circle cx="${b}" cy="${$}" r="5.5" fill="${Y?"#15803d":"#b45309"}" stroke="#ffffff" stroke-width="2" />
        <text x="${b}" y="${$-9}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#18181b">${c.state.score.totalScore}</text>
      `}).join(""),h=[0,19,30,45,60].map(c=>{const b=o(c,60),$=c===19;return`
        <line x1="${u}" y1="${b}" x2="${r-f}" y2="${b}"
          stroke="${$?"#b91c1c":"#d6d3c9"}"
          stroke-width="${$?"1.8":"1"}"
          stroke-dasharray="${$?"5,4":"none"}" />
        <text x="${u-8}" y="${b+4}" text-anchor="end" font-size="11" font-weight="${$?"800":"600"}" fill="${$?"#b91c1c":"#52525b"}">${c}</text>
      `}).join(""),q=s.map(c=>`${j(c.exam.day)},${o(c.state.score.langScore,60)}`).join(" "),S=s.map(c=>`${j(c.exam.day)},${o(c.state.score.readScore,60)}`).join(" "),x=s.map(c=>`${j(c.exam.day)},${o(c.state.score.listenScore,60)}`).join(" "),N=s.map(c=>{const b=j(c.exam.day);return`
        <circle cx="${b}" cy="${o(c.state.score.langScore,60)}" r="4" fill="#1d4ed8" />
        <circle cx="${b}" cy="${o(c.state.score.readScore,60)}" r="4" fill="#b45309" />
        <circle cx="${b}" cy="${o(c.state.score.listenScore,60)}" r="4" fill="#15803d" />
      `}).join(""),R=s.length===0?`<tr><td colspan="7" style="text-align:center; padding:1.25rem; color:var(--ink-muted);">No completed ${e.level} daily exams yet. Complete Day 1 to see your score plotted here!</td></tr>`:s.slice().reverse().map(({exam:c,state:b})=>{const $=b.score,Y=_(1800-Math.min(1800,b.remainingSeconds||0));return`
              <tr>
                <td><b>${e.level} Day ${c.day}</b> (${v(c.labelJa)})</td>
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
          <div class="stat-val">${i!==null?`${i} / 180`:"—"}</div>
        </div>
      </div>
    </div>

    <div class="chart-card">
      <h2 class="chart-title">JLPT ${e.level} Total Scaled Score Over Time (0 – 180 Points)</h2>
      <p class="chart-sub">Green dashed line = <b>${n} / 180 Official JLPT ${e.level} Overall Pass Threshold (合格ライン)</b></p>
      <div class="svg-chart-wrap">
        <svg viewBox="0 0 ${r} ${d}" width="100%" style="min-width:520px; display:block;">
          ${Q}
          ${P}
          ${s.length>=2?`<polyline fill="none" stroke="#18181b" stroke-width="3" points="${M}" />`:""}
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
        <svg viewBox="0 0 ${r} ${d}" width="100%" style="min-width:520px; display:block;">
          ${h}
          ${P}
          ${s.length>=2?`
            <polyline fill="none" stroke="#1d4ed8" stroke-width="2.2" points="${q}" />
            <polyline fill="none" stroke="#b45309" stroke-width="2.2" points="${S}" />
            <polyline fill="none" stroke="#15803d" stroke-width="2.2" points="${x}" />
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
            ${R}
          </tbody>
        </table>
      </div>
    </div>
  `}function $e(){const a=re();if(e.loadingDeck||!a.length)return`<div class="hero-banner"><b>Loading JLPT ${e.level} Unlimited Exam Word Deck...</b></div>`;let n=0,s=0;for(const i of a){const r=J(i.id);r==="mastered"?n++:(r==="struggling"||G(i))&&s++}const t=e.deckQueue,l=t.length>0?t[e.deckCursor%t.length]:null;let p="";if(!l)p=`
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
    `;else{const i=J(l.id),r=G(l),d=l.day?`${e.level} · Day ${l.day} Paper (Q${l.qNum})`:`JLPT ${e.level} Core Exam Bank`;let u='<span class="badge badge-not-started">New Card</span>';i==="mastered"?u='<span class="badge badge-pass">🟢 Mastered</span>':i==="struggling"||r?u=`<span class="badge badge-fail">🔴 ${r?"Missed in Paper":"Struggling / Again"}</span>`:i==="reviewing"&&(u='<span class="badge badge-progress">🟡 Reviewing</span>');const f=X(l.w);p=`
      <div class="anki-card" data-action="flip-anki-card" title="Tap anywhere on card to flip">
        <div>
          <div class="anki-card-top">
            <span style="font-size:0.72rem; font-weight:800; color:var(--ink-muted);">
              ${e.deckCursor%t.length+1}/${t.length} · ${v(d)} · 🟢${n} 🔥${s}
            </span>
            <div style="display:flex; gap:0.35rem; align-items:center;">
              ${u}
            </div>
          </div>

          <div class="anki-word-front">${v(l.w)}</div>

          ${l.ja?`<div class="anki-sentence-front">
                  ${L(l.ja)}
                </div>`:""}
        </div>

        ${e.deckFlipped?`
          <div class="anki-back-reveal">
            <div class="anki-reading-back">【 ${v(l.r)} 】</div>
            <div class="anki-meaning-back">${v(l.m)}</div>
            ${l.en?`<div class="anki-note-back"><b>Context:</b> ${v(l.en)}</div>`:""}
            ${l.note?`<div class="anki-note-back"><b>💡 Note:</b> ${v(l.note)}</div>`:""}
            <div style="display:flex; justify-content:center; margin-top:0.1rem;">
              <a class="btn-jpdb" style="padding:0.32rem 0.7rem; font-size:0.78rem;" href="${f}" target="_blank" rel="noopener noreferrer">
                🔎 Open "${v(l.w)}" in jpdb.io ↗
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
        <button type="button" class="deck-filter-pill ${e.deckFilter==="all"?"active":""}" data-action="set-deck-filter" data-filter="all">
          📚 All (${a.length})
        </button>
        <button type="button" class="deck-filter-pill ${e.deckFilter==="weak"?"active":""}" data-action="set-deck-filter" data-filter="weak">
          🔥 Weak (${s})
        </button>
        <button type="button" class="deck-filter-pill ${e.deckFilter==="kanji"?"active":""}" data-action="set-deck-filter" data-filter="kanji">
          漢字 Kanji
        </button>
        <button type="button" class="deck-filter-pill ${e.deckFilter==="adverb_grammar"?"active":""}" data-action="set-deck-filter" data-filter="adverb_grammar">
          ✨ Grammar/Adv
        </button>
        <button type="button" class="deck-filter-pill" data-action="shuffle-deck">
          🔀 Shuffle
        </button>
        <button type="button" class="deck-filter-pill ${e.deckHideMastered?"active":""}" data-action="toggle-hide-mastered">
          ${e.deckHideMastered?"👁 Hide Mastered":"👁 Show All"}
        </button>
      </div>

      ${p}
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
        <textarea id="backup-code-box" rows="3" style="width:100%; font-family:monospace; font-size:0.76rem; padding:0.45rem; border-radius:4px;">${v(a)}</textarea>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn-jpdb" data-action="copy-backup">📋 Copy Backup Code</button>
          <button class="btn-jpdb secondary" data-action="restore-backup">📥 Restore from Code in Box</button>
        </div>
      </div>
    </div>
  `}function m(){const a=document.getElementById("app");if(!a)return;let n="";e.activeTab==="exam"&&e.currentExamDay?n=ge():e.activeTab==="deck"?n=$e():e.activeTab==="progress"?n=ye():n=be(),a.innerHTML=`
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
      ${n}
    </main>

    ${he()}
  `}document.addEventListener("click",a=>{var l,p;if(a.target.closest(".jp-word")){a.stopPropagation();return}const s=a.target.closest("[data-action]");if(!s)return;const t=s.getAttribute("data-action");if(t==="switch-level"){const i=(s.getAttribute("data-level")||"N3").toUpperCase();if(i===e.level)return;O(),H(),e.level=i;try{localStorage.setItem(K,i);const r=new URL(window.location.href);r.searchParams.set("level",i.toLowerCase()),window.history.replaceState({},"",r.toString())}catch{}e.store=oe(i),e.currentExamDay=null,e.deckQueue=[],e.activeTab==="exam"&&(e.activeTab="daily"),le(i),e.activeTab==="deck"&&te(i);return}if(t==="share-level-link"){const i=e.level==="N3"?"n4":"n3",r=`${window.location.origin}${window.location.pathname}?level=${i}`;(l=navigator.clipboard)==null||l.writeText(r),alert(`Copied direct ${i.toUpperCase()} link to clipboard:
${r}

Send this to your friend—it will open directly on the ${i.toUpperCase()} exam papers with his own independent progress!`);return}if(t==="switch-tab"){const i=s.getAttribute("data-tab");O(),H(),e.activeWordPopup=null,e.activeTab=i,i==="deck"&&te(e.level),window.scrollTo({top:0,behavior:"smooth"}),m();return}if(t==="flip-anki-card"){e.deckFlipped=!e.deckFlipped,m();return}if(t==="rate-anki-card"){const i=s.getAttribute("data-rating"),r=e.deckQueue;if(!r.length)return;const d=e.deckCursor%r.length,u=r[d];if(e.deckSessionReviewed++,i==="again"){V(u.id,"struggling");const f=Math.min(r.length,d+6);r.splice(f,0,u),e.deckCursor=d+1}else i==="good"?(V(u.id,"reviewing"),e.deckCursor=(d+1)%r.length):i==="easy"&&(V(u.id,"mastered"),e.deckHideMastered&&e.deckFilter!=="weak"?(r.splice(d,1),r.length>0&&(e.deckCursor=d%r.length)):e.deckCursor=(d+1)%r.length);e.deckFlipped=!1,m();return}if(t==="set-deck-filter"){e.deckFilter=s.getAttribute("data-filter")||"all",W(!1),m();return}if(t==="toggle-hide-mastered"){e.deckHideMastered=!e.deckHideMastered,W(!1),m();return}if(t==="shuffle-deck"){W(!0),m();return}if(t==="prev-anki-card"){const i=e.deckQueue;if(!i.length)return;e.deckCursor=(e.deckCursor-1+i.length)%i.length,e.deckFlipped=!1,m();return}if(t==="next-anki-card"){const i=e.deckQueue;if(!i.length)return;e.deckCursor=(e.deckCursor+1)%i.length,e.deckFlipped=!1,m();return}if(t==="open-exam"){const i=Number(s.getAttribute("data-day"));e.currentExamDay=i,e.activeTab="exam",e.showJumpDrawer=!1,e.activeWordPopup=null;const r=D(i);ie(i),m(),r.status==="in_progress"&&r.lastQuestion>1?setTimeout(()=>{const d=document.getElementById(`q-block-${r.lastQuestion}`);d&&d.scrollIntoView({behavior:"smooth",block:"center"})},60):window.scrollTo({top:0,behavior:"smooth"});return}if(t==="pause-and-exit"){O(),H(),e.activeWordPopup=null,e.activeTab="daily",window.scrollTo({top:0,behavior:"smooth"}),m();return}if(t==="toggle-jump-drawer"){e.showJumpDrawer=!e.showJumpDrawer,m();return}if(t==="jump-to-q"){const i=Number(s.getAttribute("data-qnum"));e.showJumpDrawer=!1,m();const r=document.getElementById(`q-block-${i}`);r&&r.scrollIntoView({behavior:"smooth",block:"center"});return}if(t==="select-option"){const i=Number(s.getAttribute("data-qnum")),r=Number(s.getAttribute("data-optidx"));if(!e.currentExamDay)return;const d=D(e.currentExamDay);if(d.status==="completed")return;d.answers[i]===r?delete d.answers[i]:d.answers[i]=r,d.lastQuestion=i,d.status="in_progress",e.activeWordPopup=null,E(),m();return}if(t==="add-star-frag"){const i=Number(s.getAttribute("data-qnum")),r=Number(s.getAttribute("data-optidx")),d=D(e.currentExamDay);if(d.status==="completed")return;const u=d.starSlots[i]?[...d.starSlots[i]]:[null,null,null,null],f=u.findIndex(T=>T==null);if(f!==-1&&!u.includes(r)){u[f]=r,d.starSlots[i]=u;const g=I().find(w=>w.day===e.currentExamDay),y=g==null?void 0:g.questions.find(w=>w.qNum===i);y&&u[y.starPosition-1]!==null&&(d.answers[i]=u[y.starPosition-1]),d.lastQuestion=i,E(),m()}return}if(t==="clear-star-slot"){const i=Number(s.getAttribute("data-qnum")),r=Number(s.getAttribute("data-slot")),d=D(e.currentExamDay);if(d.status==="completed"||!d.starSlots[i])return;d.starSlots[i][r]=null,E(),m();return}if(t==="reset-star"){const i=Number(s.getAttribute("data-qnum")),r=D(e.currentExamDay);if(r.status==="completed")return;delete r.starSlots[i],E(),m();return}if(t==="play-audio"){const i=Number(s.getAttribute("data-qnum")),d=I().find(f=>f.day===e.currentExamDay),u=d==null?void 0:d.questions.find(f=>f.qNum===i);u&&fe(u);return}if(t==="toggle-script"){const i=Number(s.getAttribute("data-qnum"));e.openTranscripts[i]=!e.openTranscripts[i],m();return}if(t==="grade-exam"){if(!e.currentExamDay)return;const r=I().find(f=>f.day===e.currentExamDay),d=D(r.day),u=Object.keys(d.answers).length;if(u<r.totalQuestions&&!window.confirm(`You have answered ${u} of ${r.totalQuestions} questions.

If you just want to take a break and continue later today, tap Cancel and use "Save & Exit".

Grade ${e.level} Day ${r.day} paper now?`))return;O(),H(),d.status="completed",d.score=pe(r,d.answers),d.completedAt=new Date().toISOString(),E(),window.scrollTo({top:0,behavior:"smooth"}),m();return}if(t==="reset-day"){const i=Number(s.getAttribute("data-day"));if(!window.confirm(`Reset all answers and timer for ${e.level} Day ${i}?`))return;delete e.store.days[i],E(),e.activeTab==="exam"&&e.currentExamDay===i&&ie(i),m();return}if(t==="toggle-backup-modal"){e.showBackupModal=!e.showBackupModal,m();return}if(t==="copy-backup"){const i=document.getElementById("backup-code-box");i&&(i.select(),(p=navigator.clipboard)==null||p.writeText(i.value),alert("Backup code copied to clipboard!"));return}if(t==="restore-backup"){const i=document.getElementById("backup-code-box");if(!i||!i.value.trim())return;try{const r=JSON.parse(decodeURIComponent(escape(atob(i.value.trim()))));r&&r.days&&(e.store=r,E(),e.showBackupModal=!1,m(),alert("Progress restored successfully!"))}catch{alert("Invalid backup code.")}}});document.addEventListener("keydown",a=>{var n,s,t,l,p;e.activeTab!=="deck"||e.showBackupModal||a.target&&(a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA")||(a.code==="Space"?(a.preventDefault(),e.deckFlipped=!e.deckFlipped,m()):a.key==="1"?(n=document.querySelector('[data-rating="again"]'))==null||n.click():a.key==="2"?(s=document.querySelector('[data-rating="good"]'))==null||s.click():a.key==="3"?(t=document.querySelector('[data-rating="easy"]'))==null||t.click():a.key==="ArrowRight"?(l=document.querySelector('[data-action="next-anki-card"]'))==null||l.click():a.key==="ArrowLeft"&&((p=document.querySelector('[data-action="prev-anki-card"]'))==null||p.click()))});le(e.level);
