(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))n(d);new MutationObserver(d=>{for(const p of d)if(p.type==="childList")for(const i of p.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(d){const p={};return d.integrity&&(p.integrity=d.integrity),d.referrerPolicy&&(p.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?p.credentials="include":d.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function n(d){if(d.ep)return;d.ep=!0;const p=a(d);fetch(d.href,p)}})();const G="jlpt_selected_level",_={N3:"jlpt_n3_daily_state_v1",N4:"jlpt_n4_daily_state_v1"};function oe(){try{const s=(new URLSearchParams(window.location.search).get("level")||"").toUpperCase();if(s==="N3"||s==="N4")return localStorage.setItem(G,s),s;const a=(localStorage.getItem(G)||"").toUpperCase();if(a==="N3"||a==="N4")return a}catch{}return"N3"}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});function te(o){try{const s=localStorage.getItem(_[o]||_.N3);if(s){const a=JSON.parse(s);if(a&&typeof a=="object"&&a.days)return a}}catch(s){console.warn("Failed to parse saved state:",s)}return{days:{}}}const V=oe(),e={level:V,examsByLevel:{},loadingExams:!0,store:te(V),activeTab:"daily",currentExamDay:null,timerPaused:!1,timerInterval:null,showJumpDrawer:!1,openTranscripts:{},playingQuestion:null,activeWordPopup:null,showBackupModal:!1};function B(){return e.examsByLevel[e.level]||[]}function U(){return e.level==="N4"?90:95}async function ae(o){if(e.examsByLevel[o]){e.loadingExams=!1;return}e.loadingExams=!0,x();try{const n=await(await fetch(o==="N4"?"./data/exams-n4.json":"./data/exams-n3.json")).json();e.examsByLevel[o]=n}catch(s){console.error("Failed to load exams for",o,s),e.examsByLevel[o]=[]}e.loadingExams=!1,x()}function N(){try{const o=_[e.level]||_.N3;localStorage.setItem(o,JSON.stringify(e.store))}catch(o){console.warn("Failed to save state:",o)}}function E(o){if(!e.store.days[o])e.store.days[o]={status:"not_started",answers:{},starSlots:{},remainingSeconds:1800,lastQuestion:1,score:null,completedAt:null};else{const s=e.store.days[o];if(s.remainingSeconds>1800&&(s.remainingSeconds=1800),s.lastQuestion>20&&(s.lastQuestion=1),s.answers)for(const a of Object.keys(s.answers))Number(a)>20&&delete s.answers[a]}return e.store.days[o]}function ie(o,s){let a=0,n=0,d=0,p=0,i=0,r=0,c=0;for(const h of o.questions){const t=s[h.qNum]===h.answer;if(h.section==="vocab"||h.section==="grammar")n++,t&&a++;else if(h.section==="reading"){i++;const j=h.mondaiId==="r-m4"?12:16;t&&(p++,d+=j)}else h.section==="listening"&&(c++,t&&r++)}const u=Math.round(a/Math.max(1,n)*60),g=Math.min(60,Math.round(d)),k=Math.round(r/Math.max(1,c)*60),v=u+g+k,b=e.level==="N4"?v>=90&&u+g>=38&&k>=19:v>=95&&u>=19&&g>=19&&k>=19;return{langScore:u,readScore:g,listenScore:k,totalScore:v,passed:b,langRaw:a,langTotal:n,readRaw:p,readTotal:i,listenRaw:r,listenTotal:c}}function F(o){const s=Math.max(0,Math.floor(o)),a=Math.floor(s/60),n=s%60;return`${String(a).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function y(o=""){return String(o).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const Y=typeof Intl<"u"&&Intl.Segmenter?new Intl.Segmenter("ja",{granularity:"word"}):null;function X(o){return`https://jpdb.io/search?q=${encodeURIComponent(o)}&lang=english#a`}function K(o){if(!o)return"";if(!Y)return`<a class="jp-word" href="${X(o)}" target="_blank" rel="noopener noreferrer">${y(o)}</a>`;const s=[...Y.segment(o)];let a="";for(const n of s){const d=n.segment;if(!(n.isWordLike&&/[\u3040-\u30ff\u4e00-\u9faf]/.test(d))){a+=y(d);continue}a+=`<a class="jp-word" href="${X(d)}" target="_blank" rel="noopener noreferrer">${y(d)}</a>`}return a}function A(o){return o?String(o).split(/(<u>[\s\S]*?<\/u>)/g).map(a=>{if(a.startsWith("<u>")&&a.endsWith("</u>")){const n=a.slice(3,-4);return`<u>${K(n)}</u>`}return a.split(`
`).map(n=>K(n)).join("<br/>")}).join(""):""}function re(){const o=B();if(!o.length)return 1;for(const s of o)if(E(s.day).status==="in_progress")return s.day;for(const s of o)if(E(s.day).status!=="completed")return s.day;return o.length}let I=null;function Z(){return!document.hidden&&document.hasFocus()}function se(o){let s=0;for(const a of Object.keys(o||{})){const n=Number(a);n>=1&&n<=7?s+=23.3333/7:n>=8&&n<=12?s+=16.6667/5:n>=13&&n<=16?s+=33.3333/4:n>=17&&n<=20&&(s+=26.6667/4)}return Math.min(100,Math.round(s*10)/10)}function ne(o){const s=Math.max(0,1800-o);return s<420?"Target: 語彙 Q1–7 (Finish by 23:00 left / 7m)":s<720?"Target: 文法 Q8–12 (Finish by 18:00 left / 12m)":s<1320?"Target: 読解 Q13–16 (Finish by 08:00 left / 22m)":"Target: 聴解 Q17–20 (Finish by 00:00 / 30m)"}function z(){if(!e.currentExamDay)return;const o=E(e.currentExamDay),s=document.getElementById("live-timer-val"),a=document.getElementById("live-timer-box");s&&(s.textContent=F(o.remainingSeconds)),a&&(e.timerPaused?a.classList.add("paused"):a.classList.remove("paused"));const n=Math.max(0,1800-o.remainingSeconds),d=Math.min(100,n/1800*100),p=se(o.answers),i=document.getElementById("live-time-bar-fill");i&&(i.style.width=`${d.toFixed(1)}%`,d>p+6?i.classList.add("behind"):i.classList.remove("behind"));const r=document.getElementById("live-time-bar-label");r&&(r.textContent=`⏱ ${Math.floor(n/60)}m / 30m`);const c=document.getElementById("live-pace-target-text");c&&(c.textContent=ne(o.remainingSeconds))}function ee(o){J();const s=E(o);s.status!=="completed"&&(s.status==="not_started"&&(s.status="in_progress",N()),e.timerPaused=!Z(),e.timerInterval=setInterval(()=>{if(e.activeTab!=="exam"||!e.currentExamDay)return;if(!Z()){e.timerPaused||(e.timerPaused=!0,N(),z());return}e.timerPaused&&(e.timerPaused=!1,z());const n=E(e.currentExamDay);if(n.status==="completed"){J();return}n.remainingSeconds>0&&(n.remainingSeconds--,z(),n.remainingSeconds%5===0&&N())},1e3))}function J(){e.timerInterval&&(clearInterval(e.timerInterval),e.timerInterval=null),N()}function H(){I&&(I.pause(),I.currentTime=0,I=null),e.playingQuestion=null}document.addEventListener("visibilitychange",()=>{document.hidden?(e.timerPaused=!0,N(),z()):e.activeTab==="exam"&&e.currentExamDay&&(e.timerPaused=!1,z())});window.addEventListener("blur",()=>{e.timerPaused=!0,N(),z()});window.addEventListener("focus",()=>{!document.hidden&&e.activeTab==="exam"&&e.currentExamDay&&(e.timerPaused=!1,z())});window.addEventListener("pagehide",()=>{e.timerPaused=!0,N()});window.addEventListener("beforeunload",()=>{N()});function le(){return new Promise(o=>{try{const s=window.AudioContext||window.webkitAudioContext;if(!s)return o();const a=new s,n=a.currentTime,d=(p,i,r)=>{const c=a.createOscillator(),u=a.createGain();c.type="sine",c.frequency.setValueAtTime(p,i),u.gain.setValueAtTime(.15,i),u.gain.exponentialRampToValueAtTime(.001,i+r),c.connect(u),u.connect(a.destination),c.start(i),c.stop(i+r)};d(659.25,n,.35),d(523.25,n+.35,.55),setTimeout(()=>{a.close().catch(()=>{}),o()},950)}catch{o()}})}async function ce(o){if(e.playingQuestion===o.qNum){H(),x();return}if(H(),e.playingQuestion=o.qNum,x(),await le(),e.playingQuestion!==o.qNum)return;const s=o.audioFile||`./audio/d${e.currentExamDay}-q${o.qNum}.mp3`,a=new Audio(s);I=a,a.onended=()=>{e.playingQuestion===o.qNum&&(e.playingQuestion=null,I=null,x())},a.onerror=()=>{e.playingQuestion=null,I=null,e.openTranscripts[o.qNum]=!0,x()};try{await a.play()}catch{e.playingQuestion=null,I=null,e.openTranscripts[o.qNum]=!0,x()}}function de(){const o=B();if(e.loadingExams||!o.length)return`<div class="hero-banner"><b>Loading JLPT ${e.level} Daily Exam Papers...</b></div>`;const s=U(),a=re(),n=o.find(v=>v.day===a)||o[0],d=E(n.day),p=Object.keys(d.answers).length;let i=0,r=0,c=0;for(const v of o){const b=E(v.day);b.status==="completed"&&b.score&&(i++,r+=b.score.totalScore,b.score.passed&&c++)}const u=i>0?Math.round(r/i):null;let g="";d.status==="in_progress"?g=`<button class="btn-primary btn-resume" data-action="open-exam" data-day="${n.day}">
      ▶ Resume ${e.level} Day ${n.day} (Q${d.lastQuestion||1} · ${p}/${n.totalQuestions} · ${F(d.remainingSeconds)} left)
    </button>`:g=`<button class="btn-primary" data-action="open-exam" data-day="${n.day}">
      ▶ Start ${e.level} Day ${n.day} Paper (${n.labelEn} · 30 min)
    </button>`;const k=o.map(v=>{const b=E(v.day),h=Object.keys(b.answers).length,C=Math.round(h/v.totalQuestions*100),t=v.day===a;let j='<span class="badge badge-not-started">Not Started · 30:00</span>',Q="<span>20 Questions (Vocab 7 · Grammar 5 · Reading 4 · Listening 4)</span>",L=`<button class="btn-primary" data-action="open-exam" data-day="${v.day}">Start 30m Paper</button>`;if(b.status==="in_progress")j=`<span class="badge badge-progress">In Progress · ${h}/${v.totalQuestions} Answered · ${F(b.remainingSeconds)} left</span>`,Q=`<span>Paused at Question ${b.lastQuestion||1} — Ready to resume anytime</span>`,L=`<button class="btn-primary btn-resume" data-action="open-exam" data-day="${v.day}">Resume (Q${b.lastQuestion||1}) →</button>`;else if(b.status==="completed"&&b.score){const D=b.score;j=D.passed?`<span class="badge badge-pass">PASS 合格 · ${D.totalScore} / 180</span>`:`<span class="badge badge-fail">SCORE · ${D.totalScore} / 180 (Need ${s})</span>`,Q=`<span>言語知識 <b>${D.langScore}/60</b> · 読解 <b>${D.readScore}/60</b> · 聴解 <b>${D.listenScore}/60</b></span>`,L=`
          <button class="btn-secondary" data-action="open-exam" data-day="${v.day}">Review Paper</button>
          <button class="btn-secondary" data-action="reset-day" data-day="${v.day}" title="Reset and retake this day">Retake</button>
        `}return`
        <div class="day-card ${t?"is-current":""} ${b.status==="completed"?"is-completed":""}">
          <div class="day-left">
            <div class="day-num-box">
              <span class="d-small">${e.level} D</span>
              <span class="d-big">${v.day}</span>
            </div>
            <div class="day-info">
              <div class="day-date-row">
                <span class="day-date-title">${y(v.labelEn)}</span>
                <span class="day-date-ja">${y(v.labelJa)}</span>
                ${j}
              </div>
              <div class="day-meta-row">
                ${Q}
              </div>
              <div class="day-progress-bar">
                <div class="day-progress-fill ${b.status==="completed"?"done":""}" style="width: ${b.status==="completed"?100:C}%"></div>
              </div>
            </div>
          </div>
          <div class="day-actions">
            ${L}
          </div>
        </div>
      `}).join("");return`
    <div class="hero-banner">
      <div class="hero-top">
        <div>
          <span class="hero-eyebrow">NEXT UP · 30-MINUTE SCALED JLPT ${e.level} EXAM</span>
          <h1 class="hero-title">${e.level} Day ${n.day}: ${y(n.labelEn)}（${y(n.labelJa)}）</h1>
          <p class="hero-desc">
            20 exam-style questions in 30 minutes. Start and stop whenever you want—timer auto-pauses when you leave the tab. Tap any Japanese word to open it in <b>jpdb.io</b>.
          </p>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.45rem; align-items:flex-end;">
          ${g}
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
          <div class="stat-label">PASS RATE (≥${s}/180)</div>
          <div class="stat-val">${i>0?`${c} / ${i} Passed`:"—"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">EXAM DAY</div>
          <div class="stat-val">Sun, 6 Dec 2026</div>
        </div>
      </div>
    </div>

    <div class="days-grid">
      ${k}
    </div>

    <div class="exam-day-milestone">
      <div>
        <div style="font-size:0.75rem; font-weight:800; color:#fcd34d; letter-spacing:0.06em;">DAY 35 · TARGET EXAM DAY</div>
        <div style="font-size:1.2rem; font-weight:900; font-family:var(--font-serif);">Sunday, 6 December 2026（12月6日・日曜日）</div>
        <div style="font-size:0.84rem; color:#d4d4d8; margin-top:0.15rem;">
          Official JLPT ${e.level} Test Day · Pass Mark: ${s} / 180 Total
        </div>
      </div>
      <button class="btn-secondary" data-action="switch-tab" data-tab="progress">
        📈 View ${e.level} Score Trend
      </button>
    </div>
  `}function ue(){const o=B();if(!o.length)return"";const s=o.find(t=>t.day===e.currentExamDay)||o[0],a=E(s.day),n=a.status==="completed",d=Object.keys(a.answers).length,p=U();let i=null,r=null;const c={vocab:{title:"第1部：言語知識（文字・語彙）",meta:"目安時間：7分（全7問 · Q1〜Q7）"},grammar:{title:"第2部：言語知識（文法）・読解 【文法】",meta:"目安時間：5分（全5問 · Q8〜Q12）"},reading:{title:"第2部：言語知識（文法）・読解 【読解】",meta:"目安時間：10分（全4問 · Q13〜Q16）"},listening:{title:"第3部：聴解（リスニング）",meta:"目安時間：8分（全4問 · Q17〜Q20）"}};let u="";for(const t of s.questions){if(t.section!==i){i=t.section;const w=c[t.section];u+=`
        <div class="section-divider-banner" id="sec-${t.section}">
          <span>${y(w.title)}</span>
          <span style="font-size:0.78rem; font-weight:600; color:#d4d4d8;">${y(w.meta)}</span>
        </div>
      `}if(t.mondaiId!==r&&(r=t.mondaiId,u+=`
        <div class="mondai-header">
          ${A(t.mondaiTitle)}
        </div>
      `),t.passageText||t.passageTable){const w=t.passageTitle?`<div class="passage-title-bar">${A(t.passageTitle)}</div>`:"",$=t.passageLabel?`<b>${y(t.passageLabel)}</b> `:"",q=(t.passageText||"").split(/\n\n+/).filter(Boolean).map((P,M)=>`<p class="passage-paragraph">${M===0?$:""}${A(P)}</p>`).join("");let T="";if(t.passageTable){const P=t.passageTable.headers.map(l=>`<th>${A(l)}</th>`).join(""),M=t.passageTable.rows.map(l=>`<tr>${l.map(m=>`<td>${A(m)}</td>`).join("")}</tr>`).join("");T=`
          <div class="info-table-wrap">
            <table class="info-table">
              <thead><tr>${P}</tr></thead>
              <tbody>${M}</tbody>
            </table>
          </div>
        `}const S=t.passageNotes?`<div class="passage-notes">${A(t.passageNotes)}</div>`:"";u+=`
        <div class="reading-passage-box style-${t.passageStyle||"essay"}">
          ${w}
          ${q}
          ${T}
          ${S}
        </div>
      `}let j="";if(t.section==="listening"){const w=e.playingQuestion===t.qNum,$=n||!!e.openTranscripts[t.qNum],q=t.audioFile||`./audio/d${s.day}-q${t.qNum}.mp3`,T=(t.dialogue||[]).map(S=>`
          <div class="dialogue-line">
            <span class="speaker-tag">${S.speaker==="M"?"男 (Male)":"女 (Female)"}</span>
            ${A(S.text)}
          </div>
        `).join("");j=`
        <div class="listening-box">
          <div style="font-size:0.84rem; color:var(--ink-muted); margin-bottom:0.45rem;">
            🎧 <b>状況：</b>${A(t.listeningIntro)}
          </div>
          <div class="listening-controls">
            <button class="btn-audio ${w?"playing":""}" data-action="play-audio" data-qnum="${t.qNum}">
              ${w?"⏹ 音声を停止 (Stop Audio)":"▶ 会話音声を再生 (Play Dialogue MP3)"}
            </button>
            <audio controls preload="none" src="${y(q)}" style="height:32px; max-width:240px;"></audio>
            <button class="btn-secondary" data-action="toggle-script" data-qnum="${t.qNum}">
              ${$?"スクリプトを隠す (Hide Text)":"📖 スクリプトを見る (Show Dialogue Text)"}
            </button>
          </div>
          ${$?`<div class="dialogue-transcript">
                  ${T}
                </div>`:""}
        </div>
      `}let Q="";if(t.type==="star"){const w=a.starSlots[t.qNum]||[null,null,null,null],$=[0,1,2,3].map(T=>{const S=T+1===t.starPosition,P=w[T],M=P!=null?`${P+1}. ${t.options[P]}`:S?"★":`Slot ${T+1}`;return`<span class="star-slot ${S?"is-star":""}" data-action="clear-star-slot" data-qnum="${t.qNum}" data-slot="${T}" title="Tap to clear slot">${y(M)}</span>`}).join(""),q=t.options.map((T,S)=>`<button class="btn-secondary" style="padding:0.22rem 0.55rem; font-size:0.78rem;" data-action="add-star-frag" data-qnum="${t.qNum}" data-optidx="${S}">+${S+1}: ${y(T)}</button>`).join(" ");Q=`
        <div class="star-builder-box">
          <div style="font-size:0.75rem; font-weight:700; color:var(--ink-muted); margin-bottom:0.3rem;">
            ★ Sentence Scramble Helper (Tap fragments below to test order; slot ${t.starPosition} is ★):
          </div>
          <div class="star-slots-row">
            <span>${A(t.prefix)}</span>
            ${$}
            <span>${A(t.suffix)}</span>
          </div>
          <div style="display:flex; gap:0.35rem; flex-wrap:wrap; align-items:center;">
            ${q}
            <button class="btn-secondary" style="padding:0.22rem 0.5rem; font-size:0.72rem;" data-action="reset-star" data-qnum="${t.qNum}">Clear</button>
          </div>
        </div>
      `}const L=a.answers[t.qNum],D=t.options.every(w=>w.length<=16)?"compact-grid":"";!n&&t.hideTargetReading&&t.targetWord;const R=t.options.map((w,$)=>{const q=L===$;let T=q?"selected":"";n&&($===t.answer?T="graded-correct":q&&$!==t.answer&&(T="graded-wrong"));const S=t.mondaiId==="v-m1"?y(w):A(w,{qNum:t.qNum});return`
          <div class="option-row ${T}">
            <button
              type="button"
              class="option-bubble"
              data-action="select-option"
              data-qnum="${t.qNum}"
              data-optidx="${$}"
              aria-label="Select choice ${$+1}"
            >
              ${$+1}
            </button>
            <div class="option-text">
              ${S}
            </div>
            ${n?$===t.answer?'<span class="badge badge-pass">✓ 正解</span>':q?'<span class="badge badge-fail">✗ 選択</span>':"":`<button type="button" class="option-select-Action" data-action="select-option" data-qnum="${t.qNum}" data-optidx="${$}">
                    ${q?"✓ Chosen":"Select"}
                  </button>`}
          </div>
        `}).join("");let O="";if(n){const w=L===t.answer,$=t.optionReasons||[],q=t.options.map((T,S)=>{const P=S===t.answer,M=L===S&&!P,l=P?"elim-correct":M?"elim-user-wrong":"",m=M?' <span class="badge badge-fail" style="margin-left:0.35rem;">✗ Your Pick</span>':P&&L===S?' <span class="badge badge-pass" style="margin-left:0.35rem;">✓ Your Pick</span>':"",f=$[S]||(P?"✓ Correct choice.":"✗ Distractor.");return`
            <div class="elimination-item ${l}">
              <div>
                <b>Choice ${S+1}: 「${y(T.replace(/<\/?u>/g,""))}」</b>${m}
              </div>
              <div style="margin-top:0.15rem; color:#27272a;">
                ${y(f)}
              </div>
            </div>
          `}).join("");O=`
        <div class="explanation-box ${w?"is-correct":"is-wrong"}">
          <div style="font-size:0.92rem; margin-bottom:0.35rem;">
            <b>${w?`✓ Correct (正解：選択肢 ${t.answer+1})`:L!==void 0?`✗ Incorrect (You picked ${L+1} · Correct Answer: Choice ${t.answer+1})`:`✗ Unanswered (Correct Answer: Choice ${t.answer+1})`}</b>
          </div>
          <div>${y(t.explanation)}</div>
          <div class="elimination-list">
            <div class="elimination-title">🔍 Process of Elimination (消去法 — Why 1–4 Are Right or Wrong):</div>
            ${q}
          </div>
        </div>
      `}u+=`
      <div class="question-block" id="q-block-${t.qNum}">
        ${j}
        <div class="question-prompt-row">
          <span class="q-number-box">${t.qNum}</span>
          <div class="q-prompt-text">
            ${A(t.prompt)}
          </div>
        </div>
        ${Q}
        <div class="options-list ${D}">
          ${R}
        </div>
        ${O}
      </div>
    `}let g="";if(e.showJumpDrawer){const t=(j,Q,L)=>{let D="";for(let R=Q;R<=L;R++){const O=s.questions[R-1],w=a.answers[R];let $=w!==void 0?"answered":"";n&&($=w===O.answer?"correct":"wrong"),D+=`<button class="q-jump-pill ${$}" data-action="jump-to-q" data-qnum="${R}">${R}</button>`}return`
        <div class="q-jump-section-label">${y(j)}</div>
        <div class="q-jump-grid">${D}</div>
      `};g=`
      <div class="q-jump-drawer">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
          <b style="font-size:0.86rem;">Question Navigator (Tap to Jump · Progress Saved Automatically)</b>
          <button class="btn-secondary" style="padding:0.2rem 0.55rem;" data-action="toggle-jump-drawer">Close ✕</button>
        </div>
        ${t("第1部：文字・語彙 (Vocabulary · Q1–Q7 · ~7m)",1,7)}
        ${t("第2部：文法 (Grammar · Q8–Q12 · ~5m)",8,12)}
        ${t("第2部：読解 (Reading · Q13–Q16 · ~10m)",13,16)}
        ${t("第3部：聴解 (Listening · Q17–Q20 · ~8m)",17,20)}
      </div>
    `}let k="";if(n&&a.score){const t=a.score;k=`
      <div class="score-report-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div>
            <span class="badge ${t.passed?"badge-pass":"badge-fail"}" style="font-size:0.82rem; padding:0.22rem 0.65rem;">
              ${t.passed?`合格圏 (PASSED · ≥${p}/180)`:`不合格圏 (BELOW ${p}/180 PASS THRESHOLD)`}
            </span>
            <h2 style="margin:0.35rem 0 0; font-family:var(--font-serif); font-size:1.5rem;">
              JLPT ${e.level} 総合得点：${t.totalScore} / 180 点
            </h2>
          </div>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn-secondary" data-action="switch-tab" data-tab="progress">📈 View Score Graph</button>
            <button class="btn-secondary" data-action="reset-day" data-day="${s.day}">Retake Paper</button>
          </div>
        </div>
        <div class="score-sections-grid">
          <div class="score-sec-box">
            <div style="font-size:0.74rem; color:var(--ink-muted); font-weight:700;">言語知識（文字・語彙・文法）</div>
            <div style="font-size:1.25rem; font-weight:900;">${t.langScore} / 60 点</div>
            <div style="font-size:0.76rem; color:${t.langScore>=19?"var(--pass)":"var(--fail)"};">
              Raw: ${t.langRaw}/${t.langTotal} (${t.langScore>=19?"✓ 基準点19点以上":"✗ 基準点19点未満"})
            </div>
          </div>
          <div class="score-sec-box">
            <div style="font-size:0.74rem; color:var(--ink-muted); font-weight:700;">読解（Reading Comprehension）</div>
            <div style="font-size:1.25rem; font-weight:900;">${t.readScore} / 60 点</div>
            <div style="font-size:0.76rem; color:${t.readScore>=19?"var(--pass)":"var(--fail)"};">
              Raw: ${t.readRaw}/${t.readTotal} (${t.readScore>=19?"✓ 基準点19点以上":"✗ 基準点19点未満"})
            </div>
          </div>
          <div class="score-sec-box">
            <div style="font-size:0.74rem; color:var(--ink-muted); font-weight:700;">聴解（Listening）</div>
            <div style="font-size:1.25rem; font-weight:900;">${t.listenScore} / 60 点</div>
            <div style="font-size:0.76rem; color:${t.listenScore>=19?"var(--pass)":"var(--fail)"};">
              Raw: ${t.listenRaw}/${t.listenTotal} (${t.listenScore>=19?"✓ 基準点19点以上":"✗ 基準点19点未満"})
            </div>
          </div>
        </div>
      </div>
    `}const v=se(a.answers),b=Math.max(0,1800-a.remainingSeconds),h=Math.min(100,b/1800*100),C=h>v+6;return`
    <div class="exam-sticky-bar">
      <div class="exam-sticky-top-row">
        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn-secondary" data-action="pause-and-exit" title="Save progress and return to Daily List">
            ← Save & Exit
          </button>
          <span style="font-weight:800; font-size:0.88rem;">${e.level} · Day ${s.day} (${y(s.labelJa)})</span>
          ${n?"":`<span id="live-pace-target-text" style="font-size:0.74rem; font-weight:700; color:var(--accent); background:var(--accent-bg); padding:0.12rem 0.45rem; border-radius:4px;">${y(ne(a.remainingSeconds))}</span>`}
        </div>

        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          ${n?'<span class="badge badge-pass">Graded · Review Mode</span>':`
            <div id="live-timer-box" class="timer-box ${e.timerPaused?"paused":""} ${a.remainingSeconds<300?"urgent":""}" title="Timer automatically pauses when you switch tabs or close the browser">
              <span>⏱</span>
              <span id="live-timer-val">${F(a.remainingSeconds)}</span>
            </div>
          `}
          <button class="btn-secondary" data-action="toggle-jump-drawer">
            📋 ${d}/${s.totalQuestions} Qs
          </button>
          ${n?"":`<button class="btn-primary" style="padding:0.45rem 0.85rem; font-size:0.82rem;" data-action="grade-exam">
                  ✓ Finish & Grade
                </button>`}
        </div>
      </div>

      ${n?"":`
        <div class="dual-pacing-wrap">
          <div class="pacing-row">
            <div class="pacing-label">✓ Questions<br/><b>${d} / ${s.totalQuestions} Done</b></div>
            <div class="pacing-track" title="Your Question Progress aligned with section time weights">
              <div class="pacing-tick" style="left:23.33%;"></div>
              <div class="pacing-tick" style="left:40.00%;"></div>
              <div class="pacing-tick" style="left:73.33%;"></div>
              <div class="pacing-fill-questions" style="width:${v}%;"></div>
            </div>
          </div>

          <div class="pacing-row">
            <div class="pacing-label">⏱ Time Pace<br/><b id="live-time-bar-label">⏱ ${Math.floor(b/60)}m / 30m</b></div>
            <div class="pacing-track" title="30-Minute Time Pacing with Section Deadlines">
              <div class="pacing-tick" style="left:23.33%;"></div>
              <div class="pacing-tick" style="left:40.00%;"></div>
              <div class="pacing-tick" style="left:73.33%;"></div>
              <div id="live-time-bar-fill" class="pacing-fill-time ${C?"behind":""}" style="width:${h.toFixed(1)}%;"></div>
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

    ${g}
    ${k}

    <div class="exam-booklet">
      <div class="booklet-cover-banner">
        <div class="b-series">2026年12月6日対策 · 30分短縮実戦模試（第${s.day}回 / 全34回 · 全20問）</div>
        <div class="b-level">日本語能力試験 ${e.level}（${y(s.labelJa)}）</div>
        <div class="b-meta">
          💡 <b>Tap any Japanese word</b> in the passages, questions, or choices to open it directly in <b>jpdb.io</b>. Tap the numbered circle <b>(1–4)</b> to choose your answer.
        </div>
      </div>

      ${u}

      ${n?"":`
        <div style="margin-top:2rem; padding-top:1.25rem; border-top:2px solid #18181b; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div>
            <b>Answered: ${d} / ${s.totalQuestions} questions</b>
            <div style="font-size:0.8rem; color:var(--ink-muted);">
              Not finished yet? Tap "Save & Pause for Later" to stop now and continue at lunch or this evening.
            </div>
          </div>
          <div style="display:flex; gap:0.6rem; flex-wrap:wrap;">
            <button class="btn-secondary" data-action="pause-and-exit">⏸ Save & Pause for Later</button>
            <button class="btn-primary" data-action="grade-exam">✓ Complete & Grade Day ${s.day} Paper</button>
          </div>
        </div>
      `}
    </div>
  `}function pe(){const o=B();if(e.loadingExams||!o.length)return`<div class="hero-banner"><b>Loading ${e.level} Score Progress...</b></div>`;const s=U(),a=o.map(l=>({exam:l,state:E(l.day)})).filter(l=>l.state.status==="completed"&&l.state.score),n=a.length,d=n>0?a[n-1].state.score.totalScore:null,p=n>0?Math.max(...a.map(l=>l.state.score.totalScore)):null,i=n>0?Math.round(a.reduce((l,m)=>l+m.state.score.totalScore,0)/n):null,r=760,c=260,u=44,g=24,k=22,v=38,b=r-u-g,h=c-k-v,C=l=>u+(l-1)/33*b,t=(l,m=180)=>k+h-l/m*h,Q=[0,60,s,120,180].map(l=>{const m=t(l,180),f=l===s;return`
        <line x1="${u}" y1="${m}" x2="${r-g}" y2="${m}"
          stroke="${f?"#15803d":"#d6d3c9"}"
          stroke-width="${f?"2":"1"}"
          stroke-dasharray="${f?"6,4":"none"}" />
        <text x="${u-8}" y="${m+4}" text-anchor="end" font-size="11" font-weight="${f?"800":"600"}" fill="${f?"#15803d":"#52525b"}">${l}</text>
      `}).join(""),D=[1,5,10,15,20,25,30,34].map(l=>{const m=C(l),f=o[l-1];return`
        <line x1="${m}" y1="${k}" x2="${m}" y2="${k+h}" stroke="#ece9df" stroke-width="1" />
        <text x="${m}" y="${c-12}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#52525b">D${l} (${f.labelJa.replace(/（.*）/,"")})</text>
      `}).join(""),R=a.map(l=>`${C(l.exam.day)},${t(l.state.score.totalScore,180)}`).join(" "),O=a.map(l=>{const m=C(l.exam.day),f=t(l.state.score.totalScore,180),W=l.state.score.passed;return`
        <circle cx="${m}" cy="${f}" r="5.5" fill="${W?"#15803d":"#b45309"}" stroke="#ffffff" stroke-width="2" />
        <text x="${m}" y="${f-9}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#18181b">${l.state.score.totalScore}</text>
      `}).join(""),$=[0,19,30,45,60].map(l=>{const m=t(l,60),f=l===19;return`
        <line x1="${u}" y1="${m}" x2="${r-g}" y2="${m}"
          stroke="${f?"#b91c1c":"#d6d3c9"}"
          stroke-width="${f?"1.8":"1"}"
          stroke-dasharray="${f?"5,4":"none"}" />
        <text x="${u-8}" y="${m+4}" text-anchor="end" font-size="11" font-weight="${f?"800":"600"}" fill="${f?"#b91c1c":"#52525b"}">${l}</text>
      `}).join(""),q=a.map(l=>`${C(l.exam.day)},${t(l.state.score.langScore,60)}`).join(" "),T=a.map(l=>`${C(l.exam.day)},${t(l.state.score.readScore,60)}`).join(" "),S=a.map(l=>`${C(l.exam.day)},${t(l.state.score.listenScore,60)}`).join(" "),P=a.map(l=>{const m=C(l.exam.day);return`
        <circle cx="${m}" cy="${t(l.state.score.langScore,60)}" r="4" fill="#1d4ed8" />
        <circle cx="${m}" cy="${t(l.state.score.readScore,60)}" r="4" fill="#b45309" />
        <circle cx="${m}" cy="${t(l.state.score.listenScore,60)}" r="4" fill="#15803d" />
      `}).join(""),M=a.length===0?`<tr><td colspan="7" style="text-align:center; padding:1.25rem; color:var(--ink-muted);">No completed ${e.level} daily exams yet. Complete Day 1 to see your score plotted here!</td></tr>`:a.slice().reverse().map(({exam:l,state:m})=>{const f=m.score,W=F(1800-Math.min(1800,m.remainingSeconds||0));return`
              <tr>
                <td><b>${e.level} Day ${l.day}</b> (${y(l.labelJa)})</td>
                <td><b>${f.totalScore} / 180</b></td>
                <td>${f.langScore} / 60</td>
                <td>${f.readScore} / 60</td>
                <td>${f.listenScore} / 60</td>
                <td>${W}</td>
                <td>
                  <span class="badge ${f.passed?"badge-pass":"badge-fail"}">${f.passed?"PASS":"FAIL"}</span>
                  <button class="btn-secondary" style="padding:0.2rem 0.5rem; margin-left:0.35rem; font-size:0.74rem;" data-action="open-exam" data-day="${l.day}">Review</button>
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
          <div class="stat-val">${n} / 34</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">LATEST SCORE</div>
          <div class="stat-val">${d!==null?`${d} / 180`:"—"}</div>
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
      <p class="chart-sub">Green dashed line = <b>${s} / 180 Official JLPT ${e.level} Overall Pass Threshold (合格ライン)</b></p>
      <div class="svg-chart-wrap">
        <svg viewBox="0 0 ${r} ${c}" width="100%" style="min-width:520px; display:block;">
          ${Q}
          ${D}
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
        <svg viewBox="0 0 ${r} ${c}" width="100%" style="min-width:520px; display:block;">
          ${$}
          ${D}
          ${a.length>=2?`
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
            ${M}
          </tbody>
        </table>
      </div>
    </div>
  `}function me(){if(!e.showBackupModal)return"";const o=btoa(unescape(encodeURIComponent(JSON.stringify(e.store))));return`
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
        <textarea id="backup-code-box" rows="3" style="width:100%; font-family:monospace; font-size:0.76rem; padding:0.45rem; border-radius:4px;">${y(o)}</textarea>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn-jpdb" data-action="copy-backup">📋 Copy Backup Code</button>
          <button class="btn-jpdb secondary" data-action="restore-backup">📥 Restore from Code in Box</button>
        </div>
      </div>
    </div>
  `}function x(){const o=document.getElementById("app");if(!o)return;let s="";e.activeTab==="exam"&&e.currentExamDay?s=ue():e.activeTab==="progress"?s=pe():s=de(),o.innerHTML=`
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
            📅 ${e.level} Papers (Nov 2–Dec 6)
          </button>
          <button class="nav-tab ${e.activeTab==="progress"?"active":""}" data-action="switch-tab" data-tab="progress">
            📈 ${e.level} Score Progress
          </button>
        </nav>
      </div>
    </header>

    <main class="main-container">
      ${s}
    </main>

    ${me()}
  `}document.addEventListener("click",o=>{var d,p;if(o.target.closest(".jp-word")){o.stopPropagation();return}const a=o.target.closest("[data-action]");if(!a)return;const n=a.getAttribute("data-action");if(n==="switch-level"){const i=(a.getAttribute("data-level")||"N3").toUpperCase();if(i===e.level)return;J(),H(),e.level=i;try{localStorage.setItem(G,i);const r=new URL(window.location.href);r.searchParams.set("level",i.toLowerCase()),window.history.replaceState({},"",r.toString())}catch{}e.store=te(i),e.currentExamDay=null,e.activeTab="daily",ae(i);return}if(n==="share-level-link"){const i=e.level==="N3"?"n4":"n3",r=`${window.location.origin}${window.location.pathname}?level=${i}`;(d=navigator.clipboard)==null||d.writeText(r),alert(`Copied direct ${i.toUpperCase()} link to clipboard:
${r}

Send this to your friend—it will open directly on the ${i.toUpperCase()} exam papers with his own independent progress!`);return}if(n==="switch-tab"){const i=a.getAttribute("data-tab");J(),H(),e.activeWordPopup=null,e.activeTab=i,window.scrollTo({top:0,behavior:"smooth"}),x();return}if(n==="open-exam"){const i=Number(a.getAttribute("data-day"));e.currentExamDay=i,e.activeTab="exam",e.showJumpDrawer=!1,e.activeWordPopup=null;const r=E(i);ee(i),x(),r.status==="in_progress"&&r.lastQuestion>1?setTimeout(()=>{const c=document.getElementById(`q-block-${r.lastQuestion}`);c&&c.scrollIntoView({behavior:"smooth",block:"center"})},60):window.scrollTo({top:0,behavior:"smooth"});return}if(n==="pause-and-exit"){J(),H(),e.activeWordPopup=null,e.activeTab="daily",window.scrollTo({top:0,behavior:"smooth"}),x();return}if(n==="toggle-jump-drawer"){e.showJumpDrawer=!e.showJumpDrawer,x();return}if(n==="jump-to-q"){const i=Number(a.getAttribute("data-qnum"));e.showJumpDrawer=!1,x();const r=document.getElementById(`q-block-${i}`);r&&r.scrollIntoView({behavior:"smooth",block:"center"});return}if(n==="select-option"){const i=Number(a.getAttribute("data-qnum")),r=Number(a.getAttribute("data-optidx"));if(!e.currentExamDay)return;const c=E(e.currentExamDay);if(c.status==="completed")return;c.answers[i]===r?delete c.answers[i]:c.answers[i]=r,c.lastQuestion=i,c.status="in_progress",e.activeWordPopup=null,N(),x();return}if(n==="add-star-frag"){const i=Number(a.getAttribute("data-qnum")),r=Number(a.getAttribute("data-optidx")),c=E(e.currentExamDay);if(c.status==="completed")return;const u=c.starSlots[i]?[...c.starSlots[i]]:[null,null,null,null],g=u.findIndex(k=>k==null);if(g!==-1&&!u.includes(r)){u[g]=r,c.starSlots[i]=u;const v=B().find(h=>h.day===e.currentExamDay),b=v==null?void 0:v.questions.find(h=>h.qNum===i);b&&u[b.starPosition-1]!==null&&(c.answers[i]=u[b.starPosition-1]),c.lastQuestion=i,N(),x()}return}if(n==="clear-star-slot"){const i=Number(a.getAttribute("data-qnum")),r=Number(a.getAttribute("data-slot")),c=E(e.currentExamDay);if(c.status==="completed"||!c.starSlots[i])return;c.starSlots[i][r]=null,N(),x();return}if(n==="reset-star"){const i=Number(a.getAttribute("data-qnum")),r=E(e.currentExamDay);if(r.status==="completed")return;delete r.starSlots[i],N(),x();return}if(n==="play-audio"){const i=Number(a.getAttribute("data-qnum")),c=B().find(g=>g.day===e.currentExamDay),u=c==null?void 0:c.questions.find(g=>g.qNum===i);u&&ce(u);return}if(n==="toggle-script"){const i=Number(a.getAttribute("data-qnum"));e.openTranscripts[i]=!e.openTranscripts[i],x();return}if(n==="grade-exam"){if(!e.currentExamDay)return;const r=B().find(g=>g.day===e.currentExamDay),c=E(r.day),u=Object.keys(c.answers).length;if(u<r.totalQuestions&&!window.confirm(`You have answered ${u} of ${r.totalQuestions} questions.

If you just want to take a break and continue later today, tap Cancel and use "Save & Exit".

Grade ${e.level} Day ${r.day} paper now?`))return;J(),H(),c.status="completed",c.score=ie(r,c.answers),c.completedAt=new Date().toISOString(),N(),window.scrollTo({top:0,behavior:"smooth"}),x();return}if(n==="reset-day"){const i=Number(a.getAttribute("data-day"));if(!window.confirm(`Reset all answers and timer for ${e.level} Day ${i}?`))return;delete e.store.days[i],N(),e.activeTab==="exam"&&e.currentExamDay===i&&ee(i),x();return}if(n==="toggle-backup-modal"){e.showBackupModal=!e.showBackupModal,x();return}if(n==="copy-backup"){const i=document.getElementById("backup-code-box");i&&(i.select(),(p=navigator.clipboard)==null||p.writeText(i.value),alert("Backup code copied to clipboard!"));return}if(n==="restore-backup"){const i=document.getElementById("backup-code-box");if(!i||!i.value.trim())return;try{const r=JSON.parse(decodeURIComponent(escape(atob(i.value.trim()))));r&&r.days&&(e.store=r,N(),e.showBackupModal=!1,x(),alert("Progress restored successfully!"))}catch{alert("Invalid backup code.")}}});ae(e.level);
