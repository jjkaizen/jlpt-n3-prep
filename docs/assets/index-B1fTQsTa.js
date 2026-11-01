(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))i(d);new MutationObserver(d=>{for(const v of d)if(v.type==="childList")for(const s of v.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(d){const v={};return d.integrity&&(v.integrity=d.integrity),d.referrerPolicy&&(v.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?v.credentials="include":d.crossOrigin==="anonymous"?v.credentials="omit":v.credentials="same-origin",v}function i(d){if(d.ep)return;d.ep=!0;const v=a(d);fetch(d.href,v)}})();const F="jlpt_selected_level",H={N3:"jlpt_n3_daily_state_v1",N4:"jlpt_n4_daily_state_v1"};function se(){try{const o=(new URLSearchParams(window.location.search).get("level")||"").toUpperCase();if(o==="N3"||o==="N4")return localStorage.setItem(F,o),o;const a=(localStorage.getItem(F)||"").toUpperCase();if(a==="N3"||a==="N4")return a}catch{}return"N3"}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});function ee(n){try{const o=localStorage.getItem(H[n]||H.N3);if(o){const a=JSON.parse(o);if(a&&typeof a=="object"&&a.days)return a}}catch(o){console.warn("Failed to parse saved state:",o)}return{days:{}}}const U=se(),e={level:U,examsByLevel:{},loadingExams:!0,store:ee(U),activeTab:"daily",currentExamDay:null,timerPaused:!1,timerInterval:null,showJumpDrawer:!1,openTranscripts:{},playingQuestion:null,activeWordPopup:null,showBackupModal:!1};function I(){return e.examsByLevel[e.level]||[]}function G(){return e.level==="N4"?90:95}async function te(n){if(e.examsByLevel[n]){e.loadingExams=!1;return}e.loadingExams=!0,x();try{const i=await(await fetch(n==="N4"?"./data/exams-n4.json":"./data/exams-n3.json")).json();e.examsByLevel[n]=i}catch(o){console.error("Failed to load exams for",n,o),e.examsByLevel[n]=[]}e.loadingExams=!1,x()}function q(){try{const n=H[e.level]||H.N3;localStorage.setItem(n,JSON.stringify(e.store))}catch(n){console.warn("Failed to save state:",n)}}function N(n){if(!e.store.days[n])e.store.days[n]={status:"not_started",answers:{},starSlots:{},remainingSeconds:1800,lastQuestion:1,score:null,completedAt:null};else{const o=e.store.days[n];if(o.remainingSeconds>1800&&(o.remainingSeconds=1800),o.lastQuestion>20&&(o.lastQuestion=1),o.answers)for(const a of Object.keys(o.answers))Number(a)>20&&delete o.answers[a]}return e.store.days[n]}function ne(n,o){let a=0,i=0,d=0,v=0,s=0,r=0,c=0;for(const g of n.questions){const w=o[g.qNum]===g.answer;if(g.section==="vocab"||g.section==="grammar")i++,w&&a++;else if(g.section==="reading"){s++;const D=g.mondaiId==="r-m4"?12:16;w&&(v++,d+=D)}else g.section==="listening"&&(c++,w&&r++)}const u=Math.round(a/Math.max(1,i)*60),b=Math.min(60,Math.round(d)),E=Math.round(r/Math.max(1,c)*60),t=u+b+E,m=e.level==="N4"?t>=90&&u+b>=38&&E>=19:t>=95&&u>=19&&b>=19&&E>=19;return{langScore:u,readScore:b,listenScore:E,totalScore:t,passed:m,langRaw:a,langTotal:i,readRaw:v,readTotal:s,listenRaw:r,listenTotal:c}}function J(n){const o=Math.max(0,Math.floor(n)),a=Math.floor(o/60),i=o%60;return`${String(a).padStart(2,"0")}:${String(i).padStart(2,"0")}`}function h(n=""){return String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const V=typeof Intl<"u"&&Intl.Segmenter?new Intl.Segmenter("ja",{granularity:"word"}):null;function Y(n){return`https://jpdb.io/search?q=${encodeURIComponent(n)}&lang=english#a`}function X(n){if(!n)return"";if(!V)return`<a class="jp-word" href="${Y(n)}" target="_blank" rel="noopener noreferrer">${h(n)}</a>`;const o=[...V.segment(n)];let a="";for(const i of o){const d=i.segment;if(!(i.isWordLike&&/[\u3040-\u30ff\u4e00-\u9faf]/.test(d))){a+=h(d);continue}a+=`<a class="jp-word" href="${Y(d)}" target="_blank" rel="noopener noreferrer">${h(d)}</a>`}return a}function A(n){return n?String(n).split(/(<u>[\s\S]*?<\/u>)/g).map(a=>{if(a.startsWith("<u>")&&a.endsWith("</u>")){const i=a.slice(3,-4);return`<u>${X(i)}</u>`}return a.split(`
`).map(i=>X(i)).join("<br/>")}).join(""):""}function oe(){const n=I();if(!n.length)return 1;for(const o of n)if(N(o.day).status==="in_progress")return o.day;for(const o of n)if(N(o.day).status!=="completed")return o.day;return n.length}let R=null;function K(){return!document.hidden&&document.hasFocus()}function M(){if(!e.currentExamDay)return;const n=N(e.currentExamDay),o=document.getElementById("live-timer-val"),a=document.getElementById("live-timer-box");o&&(o.textContent=J(n.remainingSeconds)),a&&(e.timerPaused?a.classList.add("paused"):a.classList.remove("paused"))}function Z(n){B();const o=N(n);o.status!=="completed"&&(o.status==="not_started"&&(o.status="in_progress",q()),e.timerPaused=!K(),e.timerInterval=setInterval(()=>{if(e.activeTab!=="exam"||!e.currentExamDay)return;if(!K()){e.timerPaused||(e.timerPaused=!0,q(),M());return}e.timerPaused&&(e.timerPaused=!1,M());const i=N(e.currentExamDay);if(i.status==="completed"){B();return}i.remainingSeconds>0&&(i.remainingSeconds--,M(),i.remainingSeconds%5===0&&q())},1e3))}function B(){e.timerInterval&&(clearInterval(e.timerInterval),e.timerInterval=null),q()}function O(){R&&(R.pause(),R.currentTime=0,R=null),e.playingQuestion=null}document.addEventListener("visibilitychange",()=>{document.hidden?(e.timerPaused=!0,q(),M()):e.activeTab==="exam"&&e.currentExamDay&&(e.timerPaused=!1,M())});window.addEventListener("blur",()=>{e.timerPaused=!0,q(),M()});window.addEventListener("focus",()=>{!document.hidden&&e.activeTab==="exam"&&e.currentExamDay&&(e.timerPaused=!1,M())});window.addEventListener("pagehide",()=>{e.timerPaused=!0,q()});window.addEventListener("beforeunload",()=>{q()});function ie(){return new Promise(n=>{try{const o=window.AudioContext||window.webkitAudioContext;if(!o)return n();const a=new o,i=a.currentTime,d=(v,s,r)=>{const c=a.createOscillator(),u=a.createGain();c.type="sine",c.frequency.setValueAtTime(v,s),u.gain.setValueAtTime(.15,s),u.gain.exponentialRampToValueAtTime(.001,s+r),c.connect(u),u.connect(a.destination),c.start(s),c.stop(s+r)};d(659.25,i,.35),d(523.25,i+.35,.55),setTimeout(()=>{a.close().catch(()=>{}),n()},950)}catch{n()}})}async function re(n){if(e.playingQuestion===n.qNum){O(),x();return}if(O(),e.playingQuestion=n.qNum,x(),await ie(),e.playingQuestion!==n.qNum)return;const o=n.audioFile||`./audio/d${e.currentExamDay}-q${n.qNum}.mp3`,a=new Audio(o);R=a,a.onended=()=>{e.playingQuestion===n.qNum&&(e.playingQuestion=null,R=null,x())},a.onerror=()=>{e.playingQuestion=null,R=null,e.openTranscripts[n.qNum]=!0,x()};try{await a.play()}catch{e.playingQuestion=null,R=null,e.openTranscripts[n.qNum]=!0,x()}}function le(){const n=I();if(e.loadingExams||!n.length)return`<div class="hero-banner"><b>Loading JLPT ${e.level} Daily Exam Papers...</b></div>`;const o=G(),a=oe(),i=n.find(t=>t.day===a)||n[0],d=N(i.day),v=Object.keys(d.answers).length;let s=0,r=0,c=0;for(const t of n){const m=N(t.day);m.status==="completed"&&m.score&&(s++,r+=m.score.totalScore,m.score.passed&&c++)}const u=s>0?Math.round(r/s):null;let b="";d.status==="in_progress"?b=`<button class="btn-primary btn-resume" data-action="open-exam" data-day="${i.day}">
      ▶ Resume ${e.level} Day ${i.day} (Q${d.lastQuestion||1} · ${v}/${i.totalQuestions} · ${J(d.remainingSeconds)} left)
    </button>`:b=`<button class="btn-primary" data-action="open-exam" data-day="${i.day}">
      ▶ Start ${e.level} Day ${i.day} Paper (${i.labelEn} · 30 min)
    </button>`;const E=n.map(t=>{const m=N(t.day),g=Object.keys(m.answers).length,S=Math.round(g/t.totalQuestions*100),w=t.day===a;let D='<span class="badge badge-not-started">Not Started · 30:00</span>',j="<span>20 Questions (Vocab 7 · Grammar 5 · Reading 4 · Listening 4)</span>",f=`<button class="btn-primary" data-action="open-exam" data-day="${t.day}">Start 30m Paper</button>`;if(m.status==="in_progress")D=`<span class="badge badge-progress">In Progress · ${g}/${t.totalQuestions} Answered · ${J(m.remainingSeconds)} left</span>`,j=`<span>Paused at Question ${m.lastQuestion||1} — Ready to resume anytime</span>`,f=`<button class="btn-primary btn-resume" data-action="open-exam" data-day="${t.day}">Resume (Q${m.lastQuestion||1}) →</button>`;else if(m.status==="completed"&&m.score){const p=m.score;D=p.passed?`<span class="badge badge-pass">PASS 合格 · ${p.totalScore} / 180</span>`:`<span class="badge badge-fail">SCORE · ${p.totalScore} / 180 (Need ${o})</span>`,j=`<span>言語知識 <b>${p.langScore}/60</b> · 読解 <b>${p.readScore}/60</b> · 聴解 <b>${p.listenScore}/60</b></span>`,f=`
          <button class="btn-secondary" data-action="open-exam" data-day="${t.day}">Review Paper</button>
          <button class="btn-secondary" data-action="reset-day" data-day="${t.day}" title="Reset and retake this day">Retake</button>
        `}return`
        <div class="day-card ${w?"is-current":""} ${m.status==="completed"?"is-completed":""}">
          <div class="day-left">
            <div class="day-num-box">
              <span class="d-small">${e.level} D</span>
              <span class="d-big">${t.day}</span>
            </div>
            <div class="day-info">
              <div class="day-date-row">
                <span class="day-date-title">${h(t.labelEn)}</span>
                <span class="day-date-ja">${h(t.labelJa)}</span>
                ${D}
              </div>
              <div class="day-meta-row">
                ${j}
              </div>
              <div class="day-progress-bar">
                <div class="day-progress-fill ${m.status==="completed"?"done":""}" style="width: ${m.status==="completed"?100:S}%"></div>
              </div>
            </div>
          </div>
          <div class="day-actions">
            ${f}
          </div>
        </div>
      `}).join("");return`
    <div class="hero-banner">
      <div class="hero-top">
        <div>
          <span class="hero-eyebrow">NEXT UP · 30-MINUTE SCALED JLPT ${e.level} EXAM</span>
          <h1 class="hero-title">${e.level} Day ${i.day}: ${h(i.labelEn)}（${h(i.labelJa)}）</h1>
          <p class="hero-desc">
            20 exam-style questions in 30 minutes. Start and stop whenever you want—timer auto-pauses when you leave the tab. Tap any Japanese word to open it in <b>jpdb.io</b>.
          </p>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.45rem; align-items:flex-end;">
          ${b}
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
          <div class="stat-label">PASS RATE (≥${o}/180)</div>
          <div class="stat-val">${s>0?`${c} / ${s} Passed`:"—"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">EXAM DAY</div>
          <div class="stat-val">Sun, 6 Dec 2026</div>
        </div>
      </div>
    </div>

    <div class="days-grid">
      ${E}
    </div>

    <div class="exam-day-milestone">
      <div>
        <div style="font-size:0.75rem; font-weight:800; color:#fcd34d; letter-spacing:0.06em;">DAY 35 · TARGET EXAM DAY</div>
        <div style="font-size:1.2rem; font-weight:900; font-family:var(--font-serif);">Sunday, 6 December 2026（12月6日・日曜日）</div>
        <div style="font-size:0.84rem; color:#d4d4d8; margin-top:0.15rem;">
          Official JLPT ${e.level} Test Day · Pass Mark: ${o} / 180 Total
        </div>
      </div>
      <button class="btn-secondary" data-action="switch-tab" data-tab="progress">
        📈 View ${e.level} Score Trend
      </button>
    </div>
  `}function ce(){const n=I();if(!n.length)return"";const o=n.find(t=>t.day===e.currentExamDay)||n[0],a=N(o.day),i=a.status==="completed",d=Object.keys(a.answers).length,v=G();let s=null,r=null;const c={vocab:{title:"第1部：言語知識（文字・語彙）",meta:"目安時間：7分（全7問 · Q1〜Q7）"},grammar:{title:"第2部：言語知識（文法）・読解 【文法】",meta:"目安時間：5分（全5問 · Q8〜Q12）"},reading:{title:"第2部：言語知識（文法）・読解 【読解】",meta:"目安時間：10分（全4問 · Q13〜Q16）"},listening:{title:"第3部：聴解（リスニング）",meta:"目安時間：8分（全4問 · Q17〜Q20）"}};let u="";for(const t of o.questions){if(t.section!==s){s=t.section;const f=c[t.section];u+=`
        <div class="section-divider-banner" id="sec-${t.section}">
          <span>${h(f.title)}</span>
          <span style="font-size:0.78rem; font-weight:600; color:#d4d4d8;">${h(f.meta)}</span>
        </div>
      `}if(t.mondaiId!==r&&(r=t.mondaiId,u+=`
        <div class="mondai-header">
          ${A(t.mondaiTitle)}
        </div>
      `),t.passageText||t.passageTable){const f=t.passageTitle?`<div class="passage-title-bar">${A(t.passageTitle)}</div>`:"",p=t.passageLabel?`<b>${h(t.passageLabel)}</b> `:"",L=(t.passageText||"").split(/\n\n+/).filter(Boolean).map((P,C)=>`<p class="passage-paragraph">${C===0?p:""}${A(P)}</p>`).join("");let T="";if(t.passageTable){const P=t.passageTable.headers.map(Q=>`<th>${A(Q)}</th>`).join(""),C=t.passageTable.rows.map(Q=>`<tr>${Q.map(z=>`<td>${A(z)}</td>`).join("")}</tr>`).join("");T=`
          <div class="info-table-wrap">
            <table class="info-table">
              <thead><tr>${P}</tr></thead>
              <tbody>${C}</tbody>
            </table>
          </div>
        `}const k=t.passageNotes?`<div class="passage-notes">${A(t.passageNotes)}</div>`:"";u+=`
        <div class="reading-passage-box style-${t.passageStyle||"essay"}">
          ${f}
          ${L}
          ${T}
          ${k}
        </div>
      `}let m="";if(t.section==="listening"){const f=e.playingQuestion===t.qNum,p=i||!!e.openTranscripts[t.qNum],L=t.audioFile||`./audio/d${o.day}-q${t.qNum}.mp3`,T=(t.dialogue||[]).map(k=>`
          <div class="dialogue-line">
            <span class="speaker-tag">${k.speaker==="M"?"男 (Male)":"女 (Female)"}</span>
            ${A(k.text)}
          </div>
        `).join("");m=`
        <div class="listening-box">
          <div style="font-size:0.84rem; color:var(--ink-muted); margin-bottom:0.45rem;">
            🎧 <b>状況：</b>${A(t.listeningIntro)}
          </div>
          <div class="listening-controls">
            <button class="btn-audio ${f?"playing":""}" data-action="play-audio" data-qnum="${t.qNum}">
              ${f?"⏹ 音声を停止 (Stop Audio)":"▶ 会話音声を再生 (Play Dialogue MP3)"}
            </button>
            <audio controls preload="none" src="${h(L)}" style="height:32px; max-width:240px;"></audio>
            <button class="btn-secondary" data-action="toggle-script" data-qnum="${t.qNum}">
              ${p?"スクリプトを隠す (Hide Text)":"📖 スクリプトを見る (Show Dialogue Text)"}
            </button>
          </div>
          ${p?`<div class="dialogue-transcript">
                  ${T}
                </div>`:""}
        </div>
      `}let g="";if(t.type==="star"){const f=a.starSlots[t.qNum]||[null,null,null,null],p=[0,1,2,3].map(T=>{const k=T+1===t.starPosition,P=f[T],C=P!=null?`${P+1}. ${t.options[P]}`:k?"★":`Slot ${T+1}`;return`<span class="star-slot ${k?"is-star":""}" data-action="clear-star-slot" data-qnum="${t.qNum}" data-slot="${T}" title="Tap to clear slot">${h(C)}</span>`}).join(""),L=t.options.map((T,k)=>`<button class="btn-secondary" style="padding:0.22rem 0.55rem; font-size:0.78rem;" data-action="add-star-frag" data-qnum="${t.qNum}" data-optidx="${k}">+${k+1}: ${h(T)}</button>`).join(" ");g=`
        <div class="star-builder-box">
          <div style="font-size:0.75rem; font-weight:700; color:var(--ink-muted); margin-bottom:0.3rem;">
            ★ Sentence Scramble Helper (Tap fragments below to test order; slot ${t.starPosition} is ★):
          </div>
          <div class="star-slots-row">
            <span>${A(t.prefix)}</span>
            ${p}
            <span>${A(t.suffix)}</span>
          </div>
          <div style="display:flex; gap:0.35rem; flex-wrap:wrap; align-items:center;">
            ${L}
            <button class="btn-secondary" style="padding:0.22rem 0.5rem; font-size:0.72rem;" data-action="reset-star" data-qnum="${t.qNum}">Clear</button>
          </div>
        </div>
      `}const S=a.answers[t.qNum],w=t.options.every(f=>f.length<=16)?"compact-grid":"";!i&&t.hideTargetReading&&t.targetWord;const D=t.options.map((f,p)=>{const L=S===p;let T=L?"selected":"";i&&(p===t.answer?T="graded-correct":L&&p!==t.answer&&(T="graded-wrong"));const k=t.mondaiId==="v-m1"?h(f):A(f,{qNum:t.qNum});return`
          <div class="option-row ${T}">
            <button
              type="button"
              class="option-bubble"
              data-action="select-option"
              data-qnum="${t.qNum}"
              data-optidx="${p}"
              aria-label="Select choice ${p+1}"
            >
              ${p+1}
            </button>
            <div class="option-text">
              ${k}
            </div>
            ${i?p===t.answer?'<span class="badge badge-pass">✓ 正解</span>':L?'<span class="badge badge-fail">✗ 選択</span>':"":`<button type="button" class="option-select-Action" data-action="select-option" data-qnum="${t.qNum}" data-optidx="${p}">
                    ${L?"✓ Chosen":"Select"}
                  </button>`}
          </div>
        `}).join("");let j="";if(i){const f=S===t.answer,p=t.optionReasons||[],L=t.options.map((T,k)=>{const P=k===t.answer,C=S===k&&!P,Q=P?"elim-correct":C?"elim-user-wrong":"",z=C?' <span class="badge badge-fail" style="margin-left:0.35rem;">✗ Your Pick</span>':P&&S===k?' <span class="badge badge-pass" style="margin-left:0.35rem;">✓ Your Pick</span>':"",_=p[k]||(P?"✓ Correct choice.":"✗ Distractor.");return`
            <div class="elimination-item ${Q}">
              <div>
                <b>Choice ${k+1}: 「${h(T.replace(/<\/?u>/g,""))}」</b>${z}
              </div>
              <div style="margin-top:0.15rem; color:#27272a;">
                ${h(_)}
              </div>
            </div>
          `}).join("");j=`
        <div class="explanation-box ${f?"is-correct":"is-wrong"}">
          <div style="font-size:0.92rem; margin-bottom:0.35rem;">
            <b>${f?`✓ Correct (正解：選択肢 ${t.answer+1})`:S!==void 0?`✗ Incorrect (You picked ${S+1} · Correct Answer: Choice ${t.answer+1})`:`✗ Unanswered (Correct Answer: Choice ${t.answer+1})`}</b>
          </div>
          <div>${h(t.explanation)}</div>
          <div class="elimination-list">
            <div class="elimination-title">🔍 Process of Elimination (消去法 — Why 1–4 Are Right or Wrong):</div>
            ${L}
          </div>
        </div>
      `}u+=`
      <div class="question-block" id="q-block-${t.qNum}">
        ${m}
        <div class="question-prompt-row">
          <span class="q-number-box">${t.qNum}</span>
          <div class="q-prompt-text">
            ${A(t.prompt)}
          </div>
        </div>
        ${g}
        <div class="options-list ${w}">
          ${D}
        </div>
        ${j}
      </div>
    `}let b="";if(e.showJumpDrawer){const t=(m,g,S)=>{let w="";for(let D=g;D<=S;D++){const j=o.questions[D-1],f=a.answers[D];let p=f!==void 0?"answered":"";i&&(p=f===j.answer?"correct":"wrong"),w+=`<button class="q-jump-pill ${p}" data-action="jump-to-q" data-qnum="${D}">${D}</button>`}return`
        <div class="q-jump-section-label">${h(m)}</div>
        <div class="q-jump-grid">${w}</div>
      `};b=`
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
    `}let E="";if(i&&a.score){const t=a.score;E=`
      <div class="score-report-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div>
            <span class="badge ${t.passed?"badge-pass":"badge-fail"}" style="font-size:0.82rem; padding:0.22rem 0.65rem;">
              ${t.passed?`合格圏 (PASSED · ≥${v}/180)`:`不合格圏 (BELOW ${v}/180 PASS THRESHOLD)`}
            </span>
            <h2 style="margin:0.35rem 0 0; font-family:var(--font-serif); font-size:1.5rem;">
              JLPT ${e.level} 総合得点：${t.totalScore} / 180 点
            </h2>
          </div>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn-secondary" data-action="switch-tab" data-tab="progress">📈 View Score Graph</button>
            <button class="btn-secondary" data-action="reset-day" data-day="${o.day}">Retake Paper</button>
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
    `}return`
    <div class="exam-sticky-bar">
      <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
        <button class="btn-secondary" data-action="pause-and-exit" title="Save progress and return to Daily List">
          ← Save & Exit
        </button>
        <span style="font-weight:800; font-size:0.88rem;">${e.level} · Day ${o.day} (${h(o.labelJa)})</span>
      </div>

      <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
        ${i?'<span class="badge badge-pass">Graded · Review Mode</span>':`
          <div id="live-timer-box" class="timer-box ${e.timerPaused?"paused":""} ${a.remainingSeconds<300?"urgent":""}" title="Timer automatically pauses when you switch tabs or close the browser">
            <span>⏱</span>
            <span id="live-timer-val">${J(a.remainingSeconds)}</span>
          </div>
        `}
        <button class="btn-secondary" data-action="toggle-jump-drawer">
          📋 ${d}/${o.totalQuestions} Qs
        </button>
        ${i?"":`<button class="btn-primary" style="padding:0.45rem 0.85rem; font-size:0.82rem;" data-action="grade-exam">
                ✓ Finish & Grade
              </button>`}
      </div>
    </div>

    ${b}
    ${E}

    <div class="exam-booklet">
      <div class="booklet-cover-banner">
        <div class="b-series">2026年12月6日対策 · 30分短縮実戦模試（第${o.day}回 / 全34回 · 全20問）</div>
        <div class="b-level">日本語能力試験 ${e.level}（${h(o.labelJa)}）</div>
        <div class="b-meta">
          💡 <b>Tap any Japanese word</b> in the passages, questions, or choices to open it directly in <b>jpdb.io</b>. Tap the numbered circle <b>(1–4)</b> to choose your answer.
        </div>
      </div>

      ${u}

      ${i?"":`
        <div style="margin-top:2rem; padding-top:1.25rem; border-top:2px solid #18181b; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div>
            <b>Answered: ${d} / ${o.totalQuestions} questions</b>
            <div style="font-size:0.8rem; color:var(--ink-muted);">
              Not finished yet? Tap "Save & Pause for Later" to stop now and continue at lunch or this evening.
            </div>
          </div>
          <div style="display:flex; gap:0.6rem; flex-wrap:wrap;">
            <button class="btn-secondary" data-action="pause-and-exit">⏸ Save & Pause for Later</button>
            <button class="btn-primary" data-action="grade-exam">✓ Complete & Grade Day ${o.day} Paper</button>
          </div>
        </div>
      `}
    </div>
  `}function de(){const n=I();if(e.loadingExams||!n.length)return`<div class="hero-banner"><b>Loading ${e.level} Score Progress...</b></div>`;const o=G(),a=n.map(l=>({exam:l,state:N(l.day)})).filter(l=>l.state.status==="completed"&&l.state.score),i=a.length,d=i>0?a[i-1].state.score.totalScore:null,v=i>0?Math.max(...a.map(l=>l.state.score.totalScore)):null,s=i>0?Math.round(a.reduce((l,y)=>l+y.state.score.totalScore,0)/i):null,r=760,c=260,u=44,b=24,E=22,t=38,m=r-u-b,g=c-E-t,S=l=>u+(l-1)/33*m,w=(l,y=180)=>E+g-l/y*g,j=[0,60,o,120,180].map(l=>{const y=w(l,180),$=l===o;return`
        <line x1="${u}" y1="${y}" x2="${r-b}" y2="${y}"
          stroke="${$?"#15803d":"#d6d3c9"}"
          stroke-width="${$?"2":"1"}"
          stroke-dasharray="${$?"6,4":"none"}" />
        <text x="${u-8}" y="${y+4}" text-anchor="end" font-size="11" font-weight="${$?"800":"600"}" fill="${$?"#15803d":"#52525b"}">${l}</text>
      `}).join(""),p=[1,5,10,15,20,25,30,34].map(l=>{const y=S(l),$=n[l-1];return`
        <line x1="${y}" y1="${E}" x2="${y}" y2="${E+g}" stroke="#ece9df" stroke-width="1" />
        <text x="${y}" y="${c-12}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#52525b">D${l} (${$.labelJa.replace(/（.*）/,"")})</text>
      `}).join(""),L=a.map(l=>`${S(l.exam.day)},${w(l.state.score.totalScore,180)}`).join(" "),T=a.map(l=>{const y=S(l.exam.day),$=w(l.state.score.totalScore,180),W=l.state.score.passed;return`
        <circle cx="${y}" cy="${$}" r="5.5" fill="${W?"#15803d":"#b45309"}" stroke="#ffffff" stroke-width="2" />
        <text x="${y}" y="${$-9}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#18181b">${l.state.score.totalScore}</text>
      `}).join(""),P=[0,19,30,45,60].map(l=>{const y=w(l,60),$=l===19;return`
        <line x1="${u}" y1="${y}" x2="${r-b}" y2="${y}"
          stroke="${$?"#b91c1c":"#d6d3c9"}"
          stroke-width="${$?"1.8":"1"}"
          stroke-dasharray="${$?"5,4":"none"}" />
        <text x="${u-8}" y="${y+4}" text-anchor="end" font-size="11" font-weight="${$?"800":"600"}" fill="${$?"#b91c1c":"#52525b"}">${l}</text>
      `}).join(""),C=a.map(l=>`${S(l.exam.day)},${w(l.state.score.langScore,60)}`).join(" "),Q=a.map(l=>`${S(l.exam.day)},${w(l.state.score.readScore,60)}`).join(" "),z=a.map(l=>`${S(l.exam.day)},${w(l.state.score.listenScore,60)}`).join(" "),_=a.map(l=>{const y=S(l.exam.day);return`
        <circle cx="${y}" cy="${w(l.state.score.langScore,60)}" r="4" fill="#1d4ed8" />
        <circle cx="${y}" cy="${w(l.state.score.readScore,60)}" r="4" fill="#b45309" />
        <circle cx="${y}" cy="${w(l.state.score.listenScore,60)}" r="4" fill="#15803d" />
      `}).join(""),ae=a.length===0?`<tr><td colspan="7" style="text-align:center; padding:1.25rem; color:var(--ink-muted);">No completed ${e.level} daily exams yet. Complete Day 1 to see your score plotted here!</td></tr>`:a.slice().reverse().map(({exam:l,state:y})=>{const $=y.score,W=J(1800-Math.min(1800,y.remainingSeconds||0));return`
              <tr>
                <td><b>${e.level} Day ${l.day}</b> (${h(l.labelJa)})</td>
                <td><b>${$.totalScore} / 180</b></td>
                <td>${$.langScore} / 60</td>
                <td>${$.readScore} / 60</td>
                <td>${$.listenScore} / 60</td>
                <td>${W}</td>
                <td>
                  <span class="badge ${$.passed?"badge-pass":"badge-fail"}">${$.passed?"PASS":"FAIL"}</span>
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
          <div class="stat-val">${i} / 34</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">LATEST SCORE</div>
          <div class="stat-val">${d!==null?`${d} / 180`:"—"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">BEST SCORE</div>
          <div class="stat-val">${v!==null?`${v} / 180`:"—"}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">AVERAGE SCORE</div>
          <div class="stat-val">${s!==null?`${s} / 180`:"—"}</div>
        </div>
      </div>
    </div>

    <div class="chart-card">
      <h2 class="chart-title">JLPT ${e.level} Total Scaled Score Over Time (0 – 180 Points)</h2>
      <p class="chart-sub">Green dashed line = <b>${o} / 180 Official JLPT ${e.level} Overall Pass Threshold (合格ライン)</b></p>
      <div class="svg-chart-wrap">
        <svg viewBox="0 0 ${r} ${c}" width="100%" style="min-width:520px; display:block;">
          ${j}
          ${p}
          ${a.length>=2?`<polyline fill="none" stroke="#18181b" stroke-width="3" points="${L}" />`:""}
          ${T}
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
          ${P}
          ${p}
          ${a.length>=2?`
            <polyline fill="none" stroke="#1d4ed8" stroke-width="2.2" points="${C}" />
            <polyline fill="none" stroke="#b45309" stroke-width="2.2" points="${Q}" />
            <polyline fill="none" stroke="#15803d" stroke-width="2.2" points="${z}" />
          `:""}
          ${_}
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
            ${ae}
          </tbody>
        </table>
      </div>
    </div>
  `}function ue(){if(!e.showBackupModal)return"";const n=btoa(unescape(encodeURIComponent(JSON.stringify(e.store))));return`
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
        <textarea id="backup-code-box" rows="3" style="width:100%; font-family:monospace; font-size:0.76rem; padding:0.45rem; border-radius:4px;">${h(n)}</textarea>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn-jpdb" data-action="copy-backup">📋 Copy Backup Code</button>
          <button class="btn-jpdb secondary" data-action="restore-backup">📥 Restore from Code in Box</button>
        </div>
      </div>
    </div>
  `}function x(){const n=document.getElementById("app");if(!n)return;let o="";e.activeTab==="exam"&&e.currentExamDay?o=ce():e.activeTab==="progress"?o=de():o=le(),n.innerHTML=`
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
      ${o}
    </main>

    ${ue()}
  `}document.addEventListener("click",n=>{var d,v;if(n.target.closest(".jp-word")){n.stopPropagation();return}const a=n.target.closest("[data-action]");if(!a)return;const i=a.getAttribute("data-action");if(i==="switch-level"){const s=(a.getAttribute("data-level")||"N3").toUpperCase();if(s===e.level)return;B(),O(),e.level=s;try{localStorage.setItem(F,s);const r=new URL(window.location.href);r.searchParams.set("level",s.toLowerCase()),window.history.replaceState({},"",r.toString())}catch{}e.store=ee(s),e.currentExamDay=null,e.activeTab="daily",te(s);return}if(i==="share-level-link"){const s=e.level==="N3"?"n4":"n3",r=`${window.location.origin}${window.location.pathname}?level=${s}`;(d=navigator.clipboard)==null||d.writeText(r),alert(`Copied direct ${s.toUpperCase()} link to clipboard:
${r}

Send this to your friend—it will open directly on the ${s.toUpperCase()} exam papers with his own independent progress!`);return}if(i==="switch-tab"){const s=a.getAttribute("data-tab");B(),O(),e.activeWordPopup=null,e.activeTab=s,window.scrollTo({top:0,behavior:"smooth"}),x();return}if(i==="open-exam"){const s=Number(a.getAttribute("data-day"));e.currentExamDay=s,e.activeTab="exam",e.showJumpDrawer=!1,e.activeWordPopup=null;const r=N(s);Z(s),x(),r.status==="in_progress"&&r.lastQuestion>1?setTimeout(()=>{const c=document.getElementById(`q-block-${r.lastQuestion}`);c&&c.scrollIntoView({behavior:"smooth",block:"center"})},60):window.scrollTo({top:0,behavior:"smooth"});return}if(i==="pause-and-exit"){B(),O(),e.activeWordPopup=null,e.activeTab="daily",window.scrollTo({top:0,behavior:"smooth"}),x();return}if(i==="toggle-jump-drawer"){e.showJumpDrawer=!e.showJumpDrawer,x();return}if(i==="jump-to-q"){const s=Number(a.getAttribute("data-qnum"));e.showJumpDrawer=!1,x();const r=document.getElementById(`q-block-${s}`);r&&r.scrollIntoView({behavior:"smooth",block:"center"});return}if(i==="select-option"){const s=Number(a.getAttribute("data-qnum")),r=Number(a.getAttribute("data-optidx"));if(!e.currentExamDay)return;const c=N(e.currentExamDay);if(c.status==="completed")return;c.answers[s]===r?delete c.answers[s]:c.answers[s]=r,c.lastQuestion=s,c.status="in_progress",e.activeWordPopup=null,q(),x();return}if(i==="add-star-frag"){const s=Number(a.getAttribute("data-qnum")),r=Number(a.getAttribute("data-optidx")),c=N(e.currentExamDay);if(c.status==="completed")return;const u=c.starSlots[s]?[...c.starSlots[s]]:[null,null,null,null],b=u.findIndex(E=>E==null);if(b!==-1&&!u.includes(r)){u[b]=r,c.starSlots[s]=u;const t=I().find(g=>g.day===e.currentExamDay),m=t==null?void 0:t.questions.find(g=>g.qNum===s);m&&u[m.starPosition-1]!==null&&(c.answers[s]=u[m.starPosition-1]),c.lastQuestion=s,q(),x()}return}if(i==="clear-star-slot"){const s=Number(a.getAttribute("data-qnum")),r=Number(a.getAttribute("data-slot")),c=N(e.currentExamDay);if(c.status==="completed"||!c.starSlots[s])return;c.starSlots[s][r]=null,q(),x();return}if(i==="reset-star"){const s=Number(a.getAttribute("data-qnum")),r=N(e.currentExamDay);if(r.status==="completed")return;delete r.starSlots[s],q(),x();return}if(i==="play-audio"){const s=Number(a.getAttribute("data-qnum")),c=I().find(b=>b.day===e.currentExamDay),u=c==null?void 0:c.questions.find(b=>b.qNum===s);u&&re(u);return}if(i==="toggle-script"){const s=Number(a.getAttribute("data-qnum"));e.openTranscripts[s]=!e.openTranscripts[s],x();return}if(i==="grade-exam"){if(!e.currentExamDay)return;const r=I().find(b=>b.day===e.currentExamDay),c=N(r.day),u=Object.keys(c.answers).length;if(u<r.totalQuestions&&!window.confirm(`You have answered ${u} of ${r.totalQuestions} questions.

If you just want to take a break and continue later today, tap Cancel and use "Save & Exit".

Grade ${e.level} Day ${r.day} paper now?`))return;B(),O(),c.status="completed",c.score=ne(r,c.answers),c.completedAt=new Date().toISOString(),q(),window.scrollTo({top:0,behavior:"smooth"}),x();return}if(i==="reset-day"){const s=Number(a.getAttribute("data-day"));if(!window.confirm(`Reset all answers and timer for ${e.level} Day ${s}?`))return;delete e.store.days[s],q(),e.activeTab==="exam"&&e.currentExamDay===s&&Z(s),x();return}if(i==="toggle-backup-modal"){e.showBackupModal=!e.showBackupModal,x();return}if(i==="copy-backup"){const s=document.getElementById("backup-code-box");s&&(s.select(),(v=navigator.clipboard)==null||v.writeText(s.value),alert("Backup code copied to clipboard!"));return}if(i==="restore-backup"){const s=document.getElementById("backup-code-box");if(!s||!s.value.trim())return;try{const r=JSON.parse(decodeURIComponent(escape(atob(s.value.trim()))));r&&r.days&&(e.store=r,q(),e.showBackupModal=!1,x(),alert("Progress restored successfully!"))}catch{alert("Invalid backup code.")}}});te(e.level);
