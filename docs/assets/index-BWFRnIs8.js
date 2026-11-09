(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))t(l);new MutationObserver(l=>{for(const p of l)if(p.type==="childList")for(const n of p.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function a(l){const p={};return l.integrity&&(p.integrity=l.integrity),l.referrerPolicy&&(p.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?p.credentials="include":l.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function t(l){if(l.ep)return;l.ep=!0;const p=a(l);fetch(l.href,p)}})();const X="jlpt_selected_level",U={N3:"jlpt_n3_daily_state_v1",N4:"jlpt_n4_daily_state_v1"};function ue(){try{const i=(new URLSearchParams(window.location.search).get("level")||"").toUpperCase();if(i==="N3"||i==="N4")return localStorage.setItem(X,i),i;const a=(localStorage.getItem(X)||"").toUpperCase();if(a==="N3"||a==="N4")return a}catch{}return"N3"}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});function oe(s){try{const i=localStorage.getItem(U[s]||U.N3);if(i){const a=JSON.parse(i);if(a&&typeof a=="object"&&a.days)return a}}catch(i){console.warn("Failed to parse saved state:",i)}return{days:{}}}const ee=ue(),e={level:ee,examsByLevel:{},decksByLevel:{},loadingExams:!0,loadingDeck:!1,store:oe(ee),activeTab:"daily",currentExamDay:null,timerPaused:!1,timerInterval:null,showJumpDrawer:!1,openTranscripts:{},playingQuestion:null,activeWordPopup:null,showBackupModal:!1,deckFilter:"all",deckHideMastered:!0,deckHideKatakana:!0,deckViewMode:"card",tableMaskReading:!1,tableMaskMeaning:!1,deckQueue:[],deckCursor:0,deckFlipped:!1,deckSessionReviewed:0};function I(){return e.examsByLevel[e.level]||[]}function re(){return e.decksByLevel[e.level]||[]}function Z(){return e.level==="N4"?90:95}async function le(s){if(e.examsByLevel[s]){e.loadingExams=!1;return}e.loadingExams=!0,m();try{const t=await(await fetch(s==="N4"?"./data/exams-n4.json":"./data/exams-n3.json")).json();e.examsByLevel[s]=t}catch(i){console.error("Failed to load exams for",s,i),e.examsByLevel[s]=[]}e.loadingExams=!1,m()}async function te(s){if(e.decksByLevel[s]){e.deckQueue.length||z(!1);return}e.loadingDeck=!0,m();try{const t=await(await fetch(s==="N4"?"./data/deck-n4.json":"./data/deck-n3.json")).json();e.decksByLevel[s]=t}catch(i){console.error("Failed to load deck for",s,i),e.decksByLevel[s]=[]}e.loadingDeck=!1,z(!1),m()}function W(s){var i;return e.store.deck||(e.store.deck={}),((i=e.store.deck[s])==null?void 0:i.status)||"new"}function G(s,i){e.store.deck||(e.store.deck={});const a=e.store.deck[s]||{reps:0};e.store.deck[s]={status:i,reps:(a.reps||0)+1},E()}function _(s){var p,n;if(!s.day||!s.qNum)return!1;const i=(p=e.store.days)==null?void 0:p[s.day];if(!i||i.status!=="completed")return!1;const t=I().find(r=>r.day===s.day),l=t==null?void 0:t.questions.find(r=>r.qNum===s.qNum);return l?((n=i.answers)==null?void 0:n[s.qNum])!==l.answer:!1}function pe(s){return/^[\u30a0-\u30ffー・\s]+$/.test(String(s||"").trim())}function z(s=!1){const i=re();if(!i.length){e.deckQueue=[],e.deckCursor=0,e.deckFlipped=!1;return}let a=i.filter(t=>{if(e.deckHideKatakana&&pe(t.w))return!1;const l=W(t.id);return e.deckHideMastered&&l==="mastered"&&e.deckFilter!=="weak"?!1:e.deckFilter==="weak"?l==="struggling"||_(t):e.deckFilter==="kanji"?t.cat==="kanji":e.deckFilter==="adverb_grammar"?t.cat==="adverb_grammar":!0});if(!s)a.sort((t,l)=>{const p=W(t.id),n=W(l.id),r=(d,c)=>c==="struggling"||_(d)?0:c==="new"&&d.day?1:c==="new"?2:c==="reviewing"?3:4;return r(t,p)-r(l,n)});else{a=[...a];for(let t=a.length-1;t>0;t--){const l=Math.floor(Math.random()*(t+1));[a[t],a[l]]=[a[l],a[t]]}}e.deckQueue=a,e.deckCursor=0,e.deckFlipped=!1}function E(){try{const s=U[e.level]||U.N3;localStorage.setItem(s,JSON.stringify(e.store))}catch(s){console.warn("Failed to save state:",s)}}function N(s){if(!e.store.days[s])e.store.days[s]={status:"not_started",answers:{},starSlots:{},remainingSeconds:1800,lastQuestion:1,score:null,completedAt:null};else{const i=e.store.days[s];if(i.remainingSeconds>1800&&(i.remainingSeconds=1800),i.lastQuestion>20&&(i.lastQuestion=1),i.answers)for(const a of Object.keys(i.answers))Number(a)>20&&delete i.answers[a]}return e.store.days[s]}function me(s,i){let a=0,t=0,l=0,p=0,n=0,r=0,d=0;for(const w of s.questions){const o=i[w.qNum]===w.answer;if(w.section==="vocab"||w.section==="grammar")t++,o&&a++;else if(w.section==="reading"){n++;const A=w.mondaiId==="r-m4"?12:16;o&&(p++,l+=A)}else w.section==="listening"&&(d++,o&&r++)}const c=Math.round(a/Math.max(1,t)*60),v=Math.min(60,Math.round(l)),x=Math.round(r/Math.max(1,d)*60),b=c+v+x,y=e.level==="N4"?b>=90&&c+v>=38&&x>=19:b>=95&&c>=19&&v>=19&&x>=19;return{langScore:c,readScore:v,listenScore:x,totalScore:b,passed:y,langRaw:a,langTotal:t,readRaw:p,readTotal:n,listenRaw:r,listenTotal:d}}function V(s){const i=Math.max(0,Math.floor(s)),a=Math.floor(i/60),t=i%60;return`${String(a).padStart(2,"0")}:${String(t).padStart(2,"0")}`}function g(s=""){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const ae=typeof Intl<"u"&&Intl.Segmenter?new Intl.Segmenter("ja",{granularity:"word"}):null;function K(s){return`https://jpdb.io/search?q=${encodeURIComponent(s)}&lang=english#a`}function se(s){if(!s)return"";if(!ae)return`<a class="jp-word" href="${K(s)}" target="_blank" rel="noopener noreferrer">${g(s)}</a>`;const i=[...ae.segment(s)];let a="";for(const t of i){const l=t.segment;if(!(t.isWordLike&&/[\u3040-\u30ff\u4e00-\u9faf]/.test(l))){a+=g(l);continue}a+=`<a class="jp-word" href="${K(l)}" target="_blank" rel="noopener noreferrer">${g(l)}</a>`}return a}function M(s){return s?String(s).split(/(<u>[\s\S]*?<\/u>)/g).map(a=>{if(a.startsWith("<u>")&&a.endsWith("</u>")){const t=a.slice(3,-4);return`<u>${se(t)}</u>`}return a.split(`
`).map(t=>se(t)).join("<br/>")}).join(""):""}function ge(){const s=I();if(!s.length)return 1;for(const i of s)if(N(i.day).status==="in_progress")return i.day;for(const i of s)if(N(i.day).status!=="completed")return i.day;return s.length}let B=null;function ne(){return!document.hidden&&document.hasFocus()}function de(s){let i=0;for(const a of Object.keys(s||{})){const t=Number(a);t>=1&&t<=7?i+=23.3333/7:t>=8&&t<=12?i+=16.6667/5:t>=13&&t<=16?i+=33.3333/4:t>=17&&t<=20&&(i+=26.6667/4)}return Math.min(100,Math.round(i*10)/10)}function ce(s){const i=Math.max(0,1800-s);return i<420?"Target: 語彙 Q1–7 (Finish by 23:00 left / 7m)":i<720?"Target: 文法 Q8–12 (Finish by 18:00 left / 12m)":i<1320?"Target: 読解 Q13–16 (Finish by 08:00 left / 22m)":"Target: 聴解 Q17–20 (Finish by 00:00 / 30m)"}function F(){if(!e.currentExamDay)return;const s=N(e.currentExamDay),i=document.getElementById("live-timer-val"),a=document.getElementById("live-timer-box");i&&(i.textContent=V(s.remainingSeconds)),a&&(e.timerPaused?a.classList.add("paused"):a.classList.remove("paused"));const t=Math.max(0,1800-s.remainingSeconds),l=Math.min(100,t/1800*100),p=de(s.answers),n=document.getElementById("live-time-bar-fill");n&&(n.style.width=`${l.toFixed(1)}%`,l>p+6?n.classList.add("behind"):n.classList.remove("behind"));const r=document.getElementById("live-time-bar-label");r&&(r.textContent=`⏱ ${Math.floor(t/60)}m / 30m`);const d=document.getElementById("live-pace-target-text");d&&(d.textContent=ce(s.remainingSeconds))}function ie(s){O();const i=N(s);i.status!=="completed"&&(i.status==="not_started"&&(i.status="in_progress",E()),e.timerPaused=!ne(),e.timerInterval=setInterval(()=>{if(e.activeTab!=="exam"||!e.currentExamDay)return;if(!ne()){e.timerPaused||(e.timerPaused=!0,E(),F());return}e.timerPaused&&(e.timerPaused=!1,F());const t=N(e.currentExamDay);if(t.status==="completed"){O();return}t.remainingSeconds>0&&(t.remainingSeconds--,F(),t.remainingSeconds%5===0&&E())},1e3))}function O(){e.timerInterval&&(clearInterval(e.timerInterval),e.timerInterval=null),E()}function J(){B&&(B.pause(),B.currentTime=0,B=null),e.playingQuestion=null}document.addEventListener("visibilitychange",()=>{document.hidden?(e.timerPaused=!0,E(),F()):e.activeTab==="exam"&&e.currentExamDay&&(e.timerPaused=!1,F())});window.addEventListener("blur",()=>{e.timerPaused=!0,E(),F()});window.addEventListener("focus",()=>{!document.hidden&&e.activeTab==="exam"&&e.currentExamDay&&(e.timerPaused=!1,F())});window.addEventListener("pagehide",()=>{e.timerPaused=!0,E()});window.addEventListener("beforeunload",()=>{E()});function ve(){return new Promise(s=>{try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return s();const a=new i,t=a.currentTime,l=(p,n,r)=>{const d=a.createOscillator(),c=a.createGain();d.type="sine",d.frequency.setValueAtTime(p,n),c.gain.setValueAtTime(.15,n),c.gain.exponentialRampToValueAtTime(.001,n+r),d.connect(c),c.connect(a.destination),d.start(n),d.stop(n+r)};l(659.25,t,.35),l(523.25,t+.35,.55),setTimeout(()=>{a.close().catch(()=>{}),s()},950)}catch{s()}})}async function be(s){if(e.playingQuestion===s.qNum){J(),m();return}if(J(),e.playingQuestion=s.qNum,m(),await ve(),e.playingQuestion!==s.qNum)return;const i=s.audioFile||`./audio/d${e.currentExamDay}-q${s.qNum}.mp3`,a=new Audio(i);B=a,a.onended=()=>{e.playingQuestion===s.qNum&&(e.playingQuestion=null,B=null,m())},a.onerror=()=>{e.playingQuestion=null,B=null,e.openTranscripts[s.qNum]=!0,m()};try{await a.play()}catch{e.playingQuestion=null,B=null,e.openTranscripts[s.qNum]=!0,m()}}function fe(){const s=I();if(e.loadingExams||!s.length)return`<div class="hero-banner"><b>Loading JLPT ${e.level} Daily Exam Papers...</b></div>`;const i=Z(),a=ge(),t=s.find(b=>b.day===a)||s[0],l=N(t.day),p=Object.keys(l.answers).length;let n=0,r=0,d=0;for(const b of s){const y=N(b.day);y.status==="completed"&&y.score&&(n++,r+=y.score.totalScore,y.score.passed&&d++)}const c=n>0?Math.round(r/n):null;let v="";l.status==="in_progress"?v=`<button class="btn-primary btn-resume" data-action="open-exam" data-day="${t.day}">
      ▶ Resume ${e.level} Day ${t.day} (Q${l.lastQuestion||1} · ${p}/${t.totalQuestions} · ${V(l.remainingSeconds)} left)
    </button>`:v=`<button class="btn-primary" data-action="open-exam" data-day="${t.day}">
      ▶ Start ${e.level} Day ${t.day} Paper (${t.labelEn} · 30 min)
    </button>`;const x=s.map(b=>{const y=N(b.day),w=Object.keys(y.answers).length,L=Math.round(w/b.totalQuestions*100),o=b.day===a;let A='<span class="badge badge-not-started">Not Started · 30:00</span>',j="<span>20 Questions (Vocab 7 · Grammar 5 · Reading 4 · Listening 4)</span>",C=`<button class="btn-primary" data-action="open-exam" data-day="${b.day}">Start 30m Paper</button>`;if(y.status==="in_progress")A=`<span class="badge badge-progress">In Progress · ${w}/${b.totalQuestions} Answered · ${V(y.remainingSeconds)} left</span>`,j=`<span>Paused at Question ${y.lastQuestion||1} — Ready to resume anytime</span>`,C=`<button class="btn-primary btn-resume" data-action="open-exam" data-day="${b.day}">Resume (Q${y.lastQuestion||1}) →</button>`;else if(y.status==="completed"&&y.score){const P=y.score;A=P.passed?`<span class="badge badge-pass">PASS 合格 · ${P.totalScore} / 180</span>`:`<span class="badge badge-fail">SCORE · ${P.totalScore} / 180 (Need ${i})</span>`,j=`<span>言語知識 <b>${P.langScore}/60</b> · 読解 <b>${P.readScore}/60</b> · 聴解 <b>${P.listenScore}/60</b></span>`,C=`
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
                ${A}
              </div>
              <div class="day-meta-row">
                ${j}
              </div>
              <div class="day-progress-bar">
                <div class="day-progress-fill ${y.status==="completed"?"done":""}" style="width: ${y.status==="completed"?100:L}%"></div>
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
          <div class="stat-val">${n} / 34 Days</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">AVERAGE SCORE</div>
          <div class="stat-val">${c!==null?`${c} / 180`:"— / 180"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">PASS RATE (≥${i}/180)</div>
          <div class="stat-val">${n>0?`${d} / ${n} Passed`:"—"}</div>
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
  `}function ye(){const s=I();if(!s.length)return"";const i=s.find(o=>o.day===e.currentExamDay)||s[0],a=N(i.day),t=a.status==="completed",l=Object.keys(a.answers).length,p=Z();let n=null,r=null;const d={vocab:{title:"第1部：言語知識（文字・語彙）",meta:"目安時間：7分（全7問 · Q1〜Q7）"},grammar:{title:"第2部：言語知識（文法）・読解 【文法】",meta:"目安時間：5分（全5問 · Q8〜Q12）"},reading:{title:"第2部：言語知識（文法）・読解 【読解】",meta:"目安時間：10分（全4問 · Q13〜Q16）"},listening:{title:"第3部：聴解（リスニング）",meta:"目安時間：8分（全4問 · Q17〜Q20）"}};let c="";for(const o of i.questions){if(o.section!==n){n=o.section;const k=d[o.section];c+=`
        <div class="section-divider-banner" id="sec-${o.section}">
          <span>${g(k.title)}</span>
          <span style="font-size:0.78rem; font-weight:600; color:#d4d4d8;">${g(k.meta)}</span>
        </div>
      `}if(o.mondaiId!==r&&(r=o.mondaiId,c+=`
        <div class="mondai-header">
          ${M(o.mondaiTitle)}
        </div>
      `),o.passageText||o.passageTable){const k=o.passageTitle?`<div class="passage-title-bar">${M(o.passageTitle)}</div>`:"",h=o.passageLabel?`<b>${g(o.passageLabel)}</b> `:"",q=(o.passageText||"").split(/\n\n+/).filter(Boolean).map((D,R)=>`<p class="passage-paragraph">${R===0?h:""}${M(D)}</p>`).join("");let T="";if(o.passageTable){const D=o.passageTable.headers.map(u=>`<th>${M(u)}</th>`).join(""),R=o.passageTable.rows.map(u=>`<tr>${u.map(f=>`<td>${M(f)}</td>`).join("")}</tr>`).join("");T=`
          <div class="info-table-wrap">
            <table class="info-table">
              <thead><tr>${D}</tr></thead>
              <tbody>${R}</tbody>
            </table>
          </div>
        `}const S=o.passageNotes?`<div class="passage-notes">${M(o.passageNotes)}</div>`:"";c+=`
        <div class="reading-passage-box style-${o.passageStyle||"essay"}">
          ${k}
          ${q}
          ${T}
          ${S}
        </div>
      `}let A="";if(o.section==="listening"){const k=e.playingQuestion===o.qNum,h=t||!!e.openTranscripts[o.qNum],q=o.audioFile||`./audio/d${i.day}-q${o.qNum}.mp3`,T=(o.dialogue||[]).map(S=>`
          <div class="dialogue-line">
            <span class="speaker-tag">${S.speaker==="M"?"男 (Male)":"女 (Female)"}</span>
            ${M(S.text)}
          </div>
        `).join("");A=`
        <div class="listening-box">
          <div style="font-size:0.84rem; color:var(--ink-muted); margin-bottom:0.45rem;">
            🎧 <b>状況：</b>${M(o.listeningIntro)}
          </div>
          <div class="listening-controls">
            <button class="btn-audio ${k?"playing":""}" data-action="play-audio" data-qnum="${o.qNum}">
              ${k?"⏹ 音声を停止 (Stop Audio)":"▶ 会話音声を再生 (Play Dialogue MP3)"}
            </button>
            <audio controls preload="none" src="${g(q)}" style="height:32px; max-width:240px;"></audio>
            <button class="btn-secondary" data-action="toggle-script" data-qnum="${o.qNum}">
              ${h?"スクリプトを隠す (Hide Text)":"📖 スクリプトを見る (Show Dialogue Text)"}
            </button>
          </div>
          ${h?`<div class="dialogue-transcript">
                  ${T}
                </div>`:""}
        </div>
      `}let j="";if(o.type==="star"){const k=a.starSlots[o.qNum]||[null,null,null,null],h=[0,1,2,3].map(T=>{const S=T+1===o.starPosition,D=k[T],R=D!=null?`${D+1}. ${o.options[D]}`:S?"★":`Slot ${T+1}`;return`<span class="star-slot ${S?"is-star":""}" data-action="clear-star-slot" data-qnum="${o.qNum}" data-slot="${T}" title="Tap to clear slot">${g(R)}</span>`}).join(""),q=o.options.map((T,S)=>`<button class="btn-secondary" style="padding:0.22rem 0.55rem; font-size:0.78rem;" data-action="add-star-frag" data-qnum="${o.qNum}" data-optidx="${S}">+${S+1}: ${g(T)}</button>`).join(" ");j=`
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
            ${q}
            <button class="btn-secondary" style="padding:0.22rem 0.5rem; font-size:0.72rem;" data-action="reset-star" data-qnum="${o.qNum}">Clear</button>
          </div>
        </div>
      `}const C=a.answers[o.qNum],P=o.options.every(k=>k.length<=16)?"compact-grid":"";!t&&o.hideTargetReading&&o.targetWord;const Q=o.options.map((k,h)=>{const q=C===h;let T=q?"selected":"";t&&(h===o.answer?T="graded-correct":q&&h!==o.answer&&(T="graded-wrong"));const S=o.mondaiId==="v-m1"?g(k):M(k,{qNum:o.qNum});return`
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
            ${t?h===o.answer?'<span class="badge badge-pass">✓ 正解</span>':q?'<span class="badge badge-fail">✗ 選択</span>':"":`<button type="button" class="option-select-Action" data-action="select-option" data-qnum="${o.qNum}" data-optidx="${h}">
                    ${q?"✓ Chosen":"Select"}
                  </button>`}
          </div>
        `}).join("");let H="";if(t){const k=C===o.answer,h=o.optionReasons||[],q=o.options.map((T,S)=>{const D=S===o.answer,R=C===S&&!D,u=D?"elim-correct":R?"elim-user-wrong":"",f=R?' <span class="badge badge-fail" style="margin-left:0.35rem;">✗ Your Pick</span>':D&&C===S?' <span class="badge badge-pass" style="margin-left:0.35rem;">✓ Your Pick</span>':"",$=h[S]||(D?"✓ Correct choice.":"✗ Distractor.");return`
            <div class="elimination-item ${u}">
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
            <b>${k?`✓ Correct (正解：選択肢 ${o.answer+1})`:C!==void 0?`✗ Incorrect (You picked ${C+1} · Correct Answer: Choice ${o.answer+1})`:`✗ Unanswered (Correct Answer: Choice ${o.answer+1})`}</b>
          </div>
          <div>${g(o.explanation)}</div>
          <div class="elimination-list">
            <div class="elimination-title">🔍 Process of Elimination (消去法 — Why 1–4 Are Right or Wrong):</div>
            ${q}
          </div>
        </div>
      `}c+=`
      <div class="question-block" id="q-block-${o.qNum}">
        ${A}
        <div class="question-prompt-row">
          <span class="q-number-box">${o.qNum}</span>
          <div class="q-prompt-text">
            ${M(o.prompt)}
          </div>
        </div>
        ${j}
        <div class="options-list ${P}">
          ${Q}
        </div>
        ${H}
      </div>
    `}let v="";if(e.showJumpDrawer){const o=(A,j,C)=>{let P="";for(let Q=j;Q<=C;Q++){const H=i.questions[Q-1],k=a.answers[Q];let h=k!==void 0?"answered":"";t&&(h=k===H.answer?"correct":"wrong"),P+=`<button class="q-jump-pill ${h}" data-action="jump-to-q" data-qnum="${Q}">${Q}</button>`}return`
        <div class="q-jump-section-label">${g(A)}</div>
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
    `}let x="";if(t&&a.score){const o=a.score;x=`
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
    `}const b=de(a.answers),y=Math.max(0,1800-a.remainingSeconds),w=Math.min(100,y/1800*100),L=w>b+6;return`
    <div class="exam-sticky-bar">
      <div class="exam-sticky-top-row">
        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn-secondary" data-action="pause-and-exit" title="Save progress and return to Daily List">
            ← Save & Exit
          </button>
          <span style="font-weight:800; font-size:0.88rem;">${e.level} · Day ${i.day} (${g(i.labelJa)})</span>
          ${t?"":`<span id="live-pace-target-text" style="font-size:0.74rem; font-weight:700; color:var(--accent); background:var(--accent-bg); padding:0.12rem 0.45rem; border-radius:4px;">${g(ce(a.remainingSeconds))}</span>`}
        </div>

        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          ${t?'<span class="badge badge-pass">Graded · Review Mode</span>':`
            <div id="live-timer-box" class="timer-box ${e.timerPaused?"paused":""} ${a.remainingSeconds<300?"urgent":""}" title="Timer automatically pauses when you switch tabs or close the browser">
              <span>⏱</span>
              <span id="live-timer-val">${V(a.remainingSeconds)}</span>
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

      ${c}

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
  `}function $e(){const s=I();if(e.loadingExams||!s.length)return`<div class="hero-banner"><b>Loading ${e.level} Score Progress...</b></div>`;const i=Z(),a=s.map(u=>({exam:u,state:N(u.day)})).filter(u=>u.state.status==="completed"&&u.state.score),t=a.length,l=t>0?a[t-1].state.score.totalScore:null,p=t>0?Math.max(...a.map(u=>u.state.score.totalScore)):null,n=t>0?Math.round(a.reduce((u,f)=>u+f.state.score.totalScore,0)/t):null,r=760,d=260,c=44,v=24,x=22,b=38,y=r-c-v,w=d-x-b,L=u=>c+(u-1)/33*y,o=(u,f=180)=>x+w-u/f*w,j=[0,60,i,120,180].map(u=>{const f=o(u,180),$=u===i;return`
        <line x1="${c}" y1="${f}" x2="${r-v}" y2="${f}"
          stroke="${$?"#15803d":"#d6d3c9"}"
          stroke-width="${$?"2":"1"}"
          stroke-dasharray="${$?"6,4":"none"}" />
        <text x="${c-8}" y="${f+4}" text-anchor="end" font-size="11" font-weight="${$?"800":"600"}" fill="${$?"#15803d":"#52525b"}">${u}</text>
      `}).join(""),P=[1,5,10,15,20,25,30,34].map(u=>{const f=L(u),$=s[u-1];return`
        <line x1="${f}" y1="${x}" x2="${f}" y2="${x+w}" stroke="#ece9df" stroke-width="1" />
        <text x="${f}" y="${d-12}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#52525b">D${u} (${$.labelJa.replace(/（.*）/,"")})</text>
      `}).join(""),Q=a.map(u=>`${L(u.exam.day)},${o(u.state.score.totalScore,180)}`).join(" "),H=a.map(u=>{const f=L(u.exam.day),$=o(u.state.score.totalScore,180),Y=u.state.score.passed;return`
        <circle cx="${f}" cy="${$}" r="5.5" fill="${Y?"#15803d":"#b45309"}" stroke="#ffffff" stroke-width="2" />
        <text x="${f}" y="${$-9}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#18181b">${u.state.score.totalScore}</text>
      `}).join(""),h=[0,19,30,45,60].map(u=>{const f=o(u,60),$=u===19;return`
        <line x1="${c}" y1="${f}" x2="${r-v}" y2="${f}"
          stroke="${$?"#b91c1c":"#d6d3c9"}"
          stroke-width="${$?"1.8":"1"}"
          stroke-dasharray="${$?"5,4":"none"}" />
        <text x="${c-8}" y="${f+4}" text-anchor="end" font-size="11" font-weight="${$?"800":"600"}" fill="${$?"#b91c1c":"#52525b"}">${u}</text>
      `}).join(""),q=a.map(u=>`${L(u.exam.day)},${o(u.state.score.langScore,60)}`).join(" "),T=a.map(u=>`${L(u.exam.day)},${o(u.state.score.readScore,60)}`).join(" "),S=a.map(u=>`${L(u.exam.day)},${o(u.state.score.listenScore,60)}`).join(" "),D=a.map(u=>{const f=L(u.exam.day);return`
        <circle cx="${f}" cy="${o(u.state.score.langScore,60)}" r="4" fill="#1d4ed8" />
        <circle cx="${f}" cy="${o(u.state.score.readScore,60)}" r="4" fill="#b45309" />
        <circle cx="${f}" cy="${o(u.state.score.listenScore,60)}" r="4" fill="#15803d" />
      `}).join(""),R=a.length===0?`<tr><td colspan="7" style="text-align:center; padding:1.25rem; color:var(--ink-muted);">No completed ${e.level} daily exams yet. Complete Day 1 to see your score plotted here!</td></tr>`:a.slice().reverse().map(({exam:u,state:f})=>{const $=f.score,Y=V(1800-Math.min(1800,f.remainingSeconds||0));return`
              <tr>
                <td><b>${e.level} Day ${u.day}</b> (${g(u.labelJa)})</td>
                <td><b>${$.totalScore} / 180</b></td>
                <td>${$.langScore} / 60</td>
                <td>${$.readScore} / 60</td>
                <td>${$.listenScore} / 60</td>
                <td>${Y}</td>
                <td>
                  <span class="badge ${$.passed?"badge-pass":"badge-fail"}">${$.passed?"PASS":"FAIL"}</span>
                  <button class="btn-secondary" style="padding:0.2rem 0.5rem; margin-left:0.35rem; font-size:0.74rem;" data-action="open-exam" data-day="${u.day}">Review</button>
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
          <div class="stat-val">${n!==null?`${n} / 180`:"—"}</div>
        </div>
      </div>
    </div>

    <div class="chart-card">
      <h2 class="chart-title">JLPT ${e.level} Total Scaled Score Over Time (0 – 180 Points)</h2>
      <p class="chart-sub">Green dashed line = <b>${i} / 180 Official JLPT ${e.level} Overall Pass Threshold (合格ライン)</b></p>
      <div class="svg-chart-wrap">
        <svg viewBox="0 0 ${r} ${d}" width="100%" style="min-width:520px; display:block;">
          ${j}
          ${P}
          ${a.length>=2?`<polyline fill="none" stroke="#18181b" stroke-width="3" points="${Q}" />`:""}
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
          ${a.length>=2?`
            <polyline fill="none" stroke="#1d4ed8" stroke-width="2.2" points="${q}" />
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
  `}function he(){const s=re();if(e.loadingDeck||!s.length)return`<div class="hero-banner"><b>Loading JLPT ${e.level} Unlimited Exam Word Deck...</b></div>`;let i=0,a=0;for(const n of s){const r=W(n.id);r==="mastered"?i++:(r==="struggling"||_(n))&&a++}const t=e.deckQueue,l=t.length>0?t[e.deckCursor%t.length]:null;let p="";if(!l)p=`
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
    `;else if(e.deckViewMode==="table"){const n=t.map(r=>{const d=W(r.id),c=d==="struggling"||_(r),v=d==="mastered"?"row-mastered":c?"row-struggling":"",x=e.tableMaskReading?`<span class="masked-cell" data-action="reveal-masked-cell">${g(r.r)}</span>`:g(r.r),b=e.tableMaskMeaning?`<span class="masked-cell" data-action="reveal-masked-cell">${g(r.m)}</span>`:g(r.m);return`
          <tr class="${v}" id="tbl-row-${r.id}">
            <td class="td-word-cell">
              <a class="jp-word" href="${K(r.w)}" target="_blank" rel="noopener noreferrer">${g(r.w)}</a>
            </td>
            <td class="td-reading-cell">${x}</td>
            <td class="td-meaning-cell">${b}</td>
            <td style="text-align:right; width:86px;">
              <div class="mini-rate-group">
                <button type="button" class="mini-rate-btn ${c?"active":""}" data-action="rate-table-row" data-cid="${r.id}" data-status="struggling" title="Mark Weak / Again">🔴</button>
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
            ${n}
          </tbody>
        </table>
      </div>
    `}else{const n=W(l.id),r=_(l),d=l.day?`${e.level} · Day ${l.day} Paper (Q${l.qNum})`:`JLPT ${e.level} Core Exam Bank`;let c='<span class="badge badge-not-started">New Card</span>';n==="mastered"?c='<span class="badge badge-pass">🟢 Mastered</span>':n==="struggling"||r?c=`<span class="badge badge-fail">🔴 ${r?"Missed in Paper":"Struggling / Again"}</span>`:n==="reviewing"&&(c='<span class="badge badge-progress">🟡 Reviewing</span>');const v=K(l.w);p=`
      <div class="anki-card" data-action="flip-anki-card" title="Tap anywhere on card to flip">
        <div>
          <div class="anki-card-top">
            <span style="font-size:0.72rem; font-weight:800; color:var(--ink-muted);">
              ${e.deckCursor%t.length+1}/${t.length} · ${g(d)} · 🟢${i} 🔥${a}
            </span>
            <div style="display:flex; gap:0.35rem; align-items:center;">
              ${c}
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
          🔥 Weak (${a})
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
  `}function we(){if(!e.showBackupModal)return"";const s=btoa(unescape(encodeURIComponent(JSON.stringify(e.store))));return`
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
        <textarea id="backup-code-box" rows="3" style="width:100%; font-family:monospace; font-size:0.76rem; padding:0.45rem; border-radius:4px;">${g(s)}</textarea>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn-jpdb" data-action="copy-backup">📋 Copy Backup Code</button>
          <button class="btn-jpdb secondary" data-action="restore-backup">📥 Restore from Code in Box</button>
        </div>
      </div>
    </div>
  `}function m(){const s=document.getElementById("app");if(!s)return;let i="";e.activeTab==="exam"&&e.currentExamDay?i=ye():e.activeTab==="deck"?i=he():e.activeTab==="progress"?i=$e():i=fe(),s.innerHTML=`
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
  `}document.addEventListener("click",s=>{var l,p;if(s.target.closest(".jp-word")){s.stopPropagation();return}const a=s.target.closest("[data-action]");if(!a)return;const t=a.getAttribute("data-action");if(t==="switch-level"){const n=(a.getAttribute("data-level")||"N3").toUpperCase();if(n===e.level)return;O(),J(),e.level=n;try{localStorage.setItem(X,n);const r=new URL(window.location.href);r.searchParams.set("level",n.toLowerCase()),window.history.replaceState({},"",r.toString())}catch{}e.store=oe(n),e.currentExamDay=null,e.deckQueue=[],e.activeTab==="exam"&&(e.activeTab="daily"),le(n),e.activeTab==="deck"&&te(n);return}if(t==="share-level-link"){const n=e.level==="N3"?"n4":"n3",r=`${window.location.origin}${window.location.pathname}?level=${n}`;(l=navigator.clipboard)==null||l.writeText(r),alert(`Copied direct ${n.toUpperCase()} link to clipboard:
${r}

Send this to your friend—it will open directly on the ${n.toUpperCase()} exam papers with his own independent progress!`);return}if(t==="switch-tab"){const n=a.getAttribute("data-tab");O(),J(),e.activeWordPopup=null,e.activeTab=n,n==="deck"&&te(e.level),window.scrollTo({top:0,behavior:"smooth"}),m();return}if(t==="toggle-deck-view-mode"){e.deckViewMode=e.deckViewMode==="card"?"table":"card",m();return}if(t==="toggle-hide-katakana"){e.deckHideKatakana=!e.deckHideKatakana,z(!1),m();return}if(t==="toggle-mask-reading"){e.tableMaskReading=!e.tableMaskReading,m();return}if(t==="toggle-mask-meaning"){e.tableMaskMeaning=!e.tableMaskMeaning,m();return}if(t==="reveal-masked-cell"){a.classList.toggle("revealed");return}if(t==="rate-table-row"){const n=a.getAttribute("data-cid"),r=a.getAttribute("data-status");if(n&&r){G(n,r);const d=document.getElementById(`tbl-row-${n}`);d&&(d.classList.remove("row-struggling","row-mastered"),r==="struggling"&&d.classList.add("row-struggling"),r==="mastered"&&d.classList.add("row-mastered"),d.querySelectorAll(".mini-rate-btn").forEach(c=>{c.classList.toggle("active",c.getAttribute("data-status")===r)}))}return}if(t==="flip-anki-card"){e.deckFlipped=!e.deckFlipped,m();return}if(t==="rate-anki-card"){const n=a.getAttribute("data-rating"),r=e.deckQueue;if(!r.length)return;const d=e.deckCursor%r.length,c=r[d];if(e.deckSessionReviewed++,n==="again"){G(c.id,"struggling");const v=Math.min(r.length,d+6);r.splice(v,0,c),e.deckCursor=d+1}else n==="good"?(G(c.id,"reviewing"),e.deckCursor=(d+1)%r.length):n==="easy"&&(G(c.id,"mastered"),e.deckHideMastered&&e.deckFilter!=="weak"?(r.splice(d,1),r.length>0&&(e.deckCursor=d%r.length)):e.deckCursor=(d+1)%r.length);e.deckFlipped=!1,m();return}if(t==="set-deck-filter"){e.deckFilter=a.getAttribute("data-filter")||"all",z(!1),m();return}if(t==="toggle-hide-mastered"){e.deckHideMastered=!e.deckHideMastered,z(!1),m();return}if(t==="shuffle-deck"){z(!0),m();return}if(t==="prev-anki-card"){const n=e.deckQueue;if(!n.length)return;e.deckCursor=(e.deckCursor-1+n.length)%n.length,e.deckFlipped=!1,m();return}if(t==="next-anki-card"){const n=e.deckQueue;if(!n.length)return;e.deckCursor=(e.deckCursor+1)%n.length,e.deckFlipped=!1,m();return}if(t==="open-exam"){const n=Number(a.getAttribute("data-day"));e.currentExamDay=n,e.activeTab="exam",e.showJumpDrawer=!1,e.activeWordPopup=null;const r=N(n);ie(n),m(),r.status==="in_progress"&&r.lastQuestion>1?setTimeout(()=>{const d=document.getElementById(`q-block-${r.lastQuestion}`);d&&d.scrollIntoView({behavior:"smooth",block:"center"})},60):window.scrollTo({top:0,behavior:"smooth"});return}if(t==="pause-and-exit"){O(),J(),e.activeWordPopup=null,e.activeTab="daily",window.scrollTo({top:0,behavior:"smooth"}),m();return}if(t==="toggle-jump-drawer"){e.showJumpDrawer=!e.showJumpDrawer,m();return}if(t==="jump-to-q"){const n=Number(a.getAttribute("data-qnum"));e.showJumpDrawer=!1,m();const r=document.getElementById(`q-block-${n}`);r&&r.scrollIntoView({behavior:"smooth",block:"center"});return}if(t==="select-option"){const n=Number(a.getAttribute("data-qnum")),r=Number(a.getAttribute("data-optidx"));if(!e.currentExamDay)return;const d=N(e.currentExamDay);if(d.status==="completed")return;d.answers[n]===r?delete d.answers[n]:d.answers[n]=r,d.lastQuestion=n,d.status="in_progress",e.activeWordPopup=null,E(),m();return}if(t==="add-star-frag"){const n=Number(a.getAttribute("data-qnum")),r=Number(a.getAttribute("data-optidx")),d=N(e.currentExamDay);if(d.status==="completed")return;const c=d.starSlots[n]?[...d.starSlots[n]]:[null,null,null,null],v=c.findIndex(x=>x==null);if(v!==-1&&!c.includes(r)){c[v]=r,d.starSlots[n]=c;const b=I().find(w=>w.day===e.currentExamDay),y=b==null?void 0:b.questions.find(w=>w.qNum===n);y&&c[y.starPosition-1]!==null&&(d.answers[n]=c[y.starPosition-1]),d.lastQuestion=n,E(),m()}return}if(t==="clear-star-slot"){const n=Number(a.getAttribute("data-qnum")),r=Number(a.getAttribute("data-slot")),d=N(e.currentExamDay);if(d.status==="completed"||!d.starSlots[n])return;d.starSlots[n][r]=null,E(),m();return}if(t==="reset-star"){const n=Number(a.getAttribute("data-qnum")),r=N(e.currentExamDay);if(r.status==="completed")return;delete r.starSlots[n],E(),m();return}if(t==="play-audio"){const n=Number(a.getAttribute("data-qnum")),d=I().find(v=>v.day===e.currentExamDay),c=d==null?void 0:d.questions.find(v=>v.qNum===n);c&&be(c);return}if(t==="toggle-script"){const n=Number(a.getAttribute("data-qnum"));e.openTranscripts[n]=!e.openTranscripts[n],m();return}if(t==="grade-exam"){if(!e.currentExamDay)return;const r=I().find(v=>v.day===e.currentExamDay),d=N(r.day),c=Object.keys(d.answers).length;if(c<r.totalQuestions&&!window.confirm(`You have answered ${c} of ${r.totalQuestions} questions.

If you just want to take a break and continue later today, tap Cancel and use "Save & Exit".

Grade ${e.level} Day ${r.day} paper now?`))return;O(),J(),d.status="completed",d.score=me(r,d.answers),d.completedAt=new Date().toISOString(),E(),window.scrollTo({top:0,behavior:"smooth"}),m();return}if(t==="reset-day"){const n=Number(a.getAttribute("data-day"));if(!window.confirm(`Reset all answers and timer for ${e.level} Day ${n}?`))return;delete e.store.days[n],E(),e.activeTab==="exam"&&e.currentExamDay===n&&ie(n),m();return}if(t==="toggle-backup-modal"){e.showBackupModal=!e.showBackupModal,m();return}if(t==="copy-backup"){const n=document.getElementById("backup-code-box");n&&(n.select(),(p=navigator.clipboard)==null||p.writeText(n.value),alert("Backup code copied to clipboard!"));return}if(t==="restore-backup"){const n=document.getElementById("backup-code-box");if(!n||!n.value.trim())return;try{const r=JSON.parse(decodeURIComponent(escape(atob(n.value.trim()))));r&&r.days&&(e.store=r,E(),e.showBackupModal=!1,m(),alert("Progress restored successfully!"))}catch{alert("Invalid backup code.")}}});document.addEventListener("keydown",s=>{var i,a,t,l,p;e.activeTab!=="deck"||e.showBackupModal||s.target&&(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA")||(s.code==="Space"?(s.preventDefault(),e.deckFlipped=!e.deckFlipped,m()):s.key==="1"?(i=document.querySelector('[data-rating="again"]'))==null||i.click():s.key==="2"?(a=document.querySelector('[data-rating="good"]'))==null||a.click():s.key==="3"?(t=document.querySelector('[data-rating="easy"]'))==null||t.click():s.key==="ArrowRight"?(l=document.querySelector('[data-action="next-anki-card"]'))==null||l.click():s.key==="ArrowLeft"&&((p=document.querySelector('[data-action="prev-anki-card"]'))==null||p.click()))});le(e.level);
