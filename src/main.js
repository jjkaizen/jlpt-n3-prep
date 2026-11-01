import './styles.css';
import examsData from './data/exams.json';

const STORAGE_KEY = 'jlpt_n3_daily_state_v1';

// Register Service Worker for offline PWA support on GrapheneOS
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

// Load or initialize persistent state
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && parsed.days) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to parse saved state:', e);
  }
  return { days: {} };
}

const appState = {
  store: loadState(),
  activeTab: 'daily', // 'daily' | 'progress' | 'exam'
  currentExamDay: null, // 1..34
  timerPaused: false,
  timerInterval: null,
  showJumpDrawer: false,
  openTranscripts: {}, // { [qNum]: boolean }
  playingQuestion: null, // qNum
  activeWordPopup: null, // { surface, base, reading, meaning, level, pos, hideReading, revealedReading, optionContext }
  showBackupModal: false
};

function saveStore() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.store));
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
}

function getDayState(dayNum) {
  if (!appState.store.days[dayNum]) {
    appState.store.days[dayNum] = {
      status: 'not_started', // 'not_started' | 'in_progress' | 'completed'
      answers: {}, // { [qNum]: 0..3 }
      starSlots: {}, // { [qNum]: [optIdx, ...] }
      remainingSeconds: 3600,
      lastQuestion: 1,
      score: null,
      completedAt: null
    };
  }
  return appState.store.days[dayNum];
}

// Calculate official-style JLPT N3 scaled score (/180)
function computeExamScore(exam, answers) {
  // Section 1: 言語知識 (Vocab Q1..15 + Grammar Q16..25 = 25 Qs) -> 60 pts
  let langRaw = 0;
  let langTotal = 0;
  // Section 2: 読解 (Q26..33 = 8 Qs weighted to 60 pts)
  let readWeighted = 0;
  let readRaw = 0;
  let readTotal = 0;
  // Section 3: 聴解 (Q34..40 = 7 Qs) -> 60 pts
  let listenRaw = 0;
  let listenTotal = 0;

  for (const q of exam.questions) {
    const picked = answers[q.qNum];
    const isCorrect = picked === q.answer;

    if (q.section === 'vocab' || q.section === 'grammar') {
      langTotal++;
      if (isCorrect) langRaw++;
    } else if (q.section === 'reading') {
      readTotal++;
      const weight =
        q.mondaiId === 'r-m4' ? 6 : q.mondaiId === 'r-m5' ? 7 : q.mondaiId === 'r-m6' ? 9 : 8;
      if (isCorrect) {
        readRaw++;
        readWeighted += weight;
      }
    } else if (q.section === 'listening') {
      listenTotal++;
      if (isCorrect) listenRaw++;
    }
  }

  const langScore = Math.round((langRaw / Math.max(1, langTotal)) * 60);
  const readScore = Math.min(60, Math.round(readWeighted));
  const listenScore = Math.round((listenRaw / Math.max(1, listenTotal)) * 60);
  const totalScore = langScore + readScore + listenScore;
  const passed = totalScore >= 95 && langScore >= 19 && readScore >= 19 && listenScore >= 19;

  return {
    langScore,
    readScore,
    listenScore,
    totalScore,
    passed,
    langRaw,
    langTotal,
    readRaw,
    readTotal,
    listenRaw,
    listenTotal
  };
}

// Format seconds as MM:SS
function formatTime(sec) {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
}

// Escape HTML
function esc(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Japanese Word Segmentation -> Direct 1-Tap jpdb.io Link
const segmenter =
  typeof Intl !== 'undefined' && Intl.Segmenter
    ? new Intl.Segmenter('ja', { granularity: 'word' })
    : null;

function jpdbUrl(word) {
  return `https://jpdb.io/search?q=${encodeURIComponent(word)}&lang=english#a`;
}

function tokenizePlainSegment(text) {
  if (!text) return '';
  if (!segmenter) {
    return `<a class="jp-word" href="${jpdbUrl(text)}" target="_blank" rel="noopener noreferrer">${esc(
      text
    )}</a>`;
  }
  const rawSegs = [...segmenter.segment(text)];
  let html = '';

  for (const s of rawSegs) {
    const segText = s.segment;
    const isJapaneseWord =
      s.isWordLike && /[\u3040-\u30ff\u4e00-\u9faf]/.test(segText);

    if (!isJapaneseWord) {
      html += esc(segText);
      continue;
    }

    html += `<a class="jp-word" href="${jpdbUrl(
      segText
    )}" target="_blank" rel="noopener noreferrer">${esc(segText)}</a>`;
  }
  return html;
}

// Tokenize text that may contain <u>...</u> underline tags or newlines
function renderClickableJapanese(text) {
  if (!text) return '';
  const parts = String(text).split(/(<u>[\s\S]*?<\/u>)/g);
  return parts
    .map(part => {
      if (part.startsWith('<u>') && part.endsWith('</u>')) {
        const inner = part.slice(3, -4);
        return `<u>${tokenizePlainSegment(inner)}</u>`;
      }
      return part
        .split('\n')
        .map(line => tokenizePlainSegment(line))
        .join('<br/>');
    })
    .join('');
}

// Determine which day is the "Recommended / Current Day"
function getRecommendedDayNum() {
  // 1. Any day currently in_progress
  for (const exam of examsData) {
    const st = getDayState(exam.day);
    if (st.status === 'in_progress') return exam.day;
  }
  // 2. First uncompleted day
  for (const exam of examsData) {
    const st = getDayState(exam.day);
    if (st.status !== 'completed') return exam.day;
  }
  return examsData.length;
}

// Timer Management (100% Automatic: pauses when leaving tab/app or closing browser, resumes on return)
let currentAudioEl = null;

function isTabActivelyFocused() {
  return !document.hidden && document.hasFocus();
}

function updateTimerBadgeDom() {
  if (!appState.currentExamDay) return;
  const cur = getDayState(appState.currentExamDay);
  const timerEl = document.getElementById('live-timer-val');
  const boxEl = document.getElementById('live-timer-box');
  if (timerEl) {
    timerEl.textContent = formatTime(cur.remainingSeconds);
  }
  if (boxEl) {
    if (appState.timerPaused) {
      boxEl.classList.add('paused');
    } else {
      boxEl.classList.remove('paused');
    }
  }
}

function startExamTimer(dayNum) {
  stopExamTimer();
  const st = getDayState(dayNum);
  if (st.status === 'completed') return;
  if (st.status === 'not_started') {
    st.status = 'in_progress';
    saveStore();
  }
  appState.timerPaused = !isTabActivelyFocused();
  appState.timerInterval = setInterval(() => {
    if (appState.activeTab !== 'exam' || !appState.currentExamDay) return;
    const activeNow = isTabActivelyFocused();
    if (!activeNow) {
      if (!appState.timerPaused) {
        appState.timerPaused = true;
        saveStore();
        updateTimerBadgeDom();
      }
      return;
    }
    if (appState.timerPaused) {
      appState.timerPaused = false;
      updateTimerBadgeDom();
    }
    const cur = getDayState(appState.currentExamDay);
    if (cur.status === 'completed') {
      stopExamTimer();
      return;
    }
    if (cur.remainingSeconds > 0) {
      cur.remainingSeconds--;
      updateTimerBadgeDom();
      if (cur.remainingSeconds % 5 === 0) {
        saveStore();
      }
    }
  }, 1000);
}

function stopExamTimer() {
  if (appState.timerInterval) {
    clearInterval(appState.timerInterval);
    appState.timerInterval = null;
  }
  saveStore();
}

function stopAllAudio() {
  if (currentAudioEl) {
    currentAudioEl.pause();
    currentAudioEl.currentTime = 0;
    currentAudioEl = null;
  }
  appState.playingQuestion = null;
}

// Automatically pause & save timer immediately when switching tabs (e.g. jpdb.io), locking phone, or closing browser
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    appState.timerPaused = true;
    saveStore();
    updateTimerBadgeDom();
  } else if (appState.activeTab === 'exam' && appState.currentExamDay) {
    appState.timerPaused = false;
    updateTimerBadgeDom();
  }
});

window.addEventListener('blur', () => {
  appState.timerPaused = true;
  saveStore();
  updateTimerBadgeDom();
});

window.addEventListener('focus', () => {
  if (!document.hidden && appState.activeTab === 'exam' && appState.currentExamDay) {
    appState.timerPaused = false;
    updateTimerBadgeDom();
  }
});

window.addEventListener('pagehide', () => {
  appState.timerPaused = true;
  saveStore();
});

window.addEventListener('beforeunload', () => {
  saveStore();
});

// Web Audio Chime + Pre-generated MP3 Dialogue Player
function playExamChime() {
  return new Promise(resolve => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return resolve();
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const playTone = (freq, start, dur) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + dur);
      };
      playTone(659.25, now, 0.35); // E5
      playTone(523.25, now + 0.35, 0.55); // C5
      setTimeout(() => {
        ctx.close().catch(() => {});
        resolve();
      }, 950);
    } catch {
      resolve();
    }
  });
}

async function togglePlayListeningQuestion(q) {
  if (appState.playingQuestion === q.qNum) {
    stopAllAudio();
    renderApp();
    return;
  }

  stopAllAudio();
  appState.playingQuestion = q.qNum;
  renderApp();

  await playExamChime();
  if (appState.playingQuestion !== q.qNum) return;

  const audioSrc = q.audioFile || `./audio/d${appState.currentExamDay}-q${q.qNum}.mp3`;
  const audio = new Audio(audioSrc);
  currentAudioEl = audio;

  audio.onended = () => {
    if (appState.playingQuestion === q.qNum) {
      appState.playingQuestion = null;
      currentAudioEl = null;
      renderApp();
    }
  };

  audio.onerror = () => {
    appState.playingQuestion = null;
    currentAudioEl = null;
    appState.openTranscripts[q.qNum] = true;
    renderApp();
  };

  try {
    await audio.play();
  } catch {
    appState.playingQuestion = null;
    currentAudioEl = null;
    appState.openTranscripts[q.qNum] = true;
    renderApp();
  }
}

// Render Screen 1: Daily Exam List (Nov 2 -> Dec 6)
function renderDailyListScreen() {
  const recDayNum = getRecommendedDayNum();
  const recExam = examsData.find(e => e.day === recDayNum) || examsData[0];
  const recState = getDayState(recExam.day);
  const recAnsweredCount = Object.keys(recState.answers).length;

  let completedCount = 0;
  let totalScoreSum = 0;
  let passCount = 0;

  for (const ex of examsData) {
    const st = getDayState(ex.day);
    if (st.status === 'completed' && st.score) {
      completedCount++;
      totalScoreSum += st.score.totalScore;
      if (st.score.passed) passCount++;
    }
  }
  const avgScore = completedCount > 0 ? Math.round(totalScoreSum / completedCount) : null;

  let heroActionBtn = '';
  if (recState.status === 'in_progress') {
    heroActionBtn = `<button class="btn-primary btn-resume" data-action="open-exam" data-day="${recExam.day}">
      ▶ Resume Day ${recExam.day} (Q${recState.lastQuestion || 1} · ${recAnsweredCount}/${recExam.totalQuestions} · ${formatTime(recState.remainingSeconds)} left)
    </button>`;
  } else {
    heroActionBtn = `<button class="btn-primary" data-action="open-exam" data-day="${recExam.day}">
      ▶ Start Day ${recExam.day} Paper (${recExam.labelEn} · 60 min)
    </button>`;
  }

  const daysCardsHtml = examsData
    .map(exam => {
      const st = getDayState(exam.day);
      const answeredCount = Object.keys(st.answers).length;
      const pct = Math.round((answeredCount / exam.totalQuestions) * 100);
      const isCurrent = exam.day === recDayNum;

      let badgeHtml = `<span class="badge badge-not-started">Not Started · 60:00</span>`;
      let scoreSummaryHtml = `<span>40 Questions (Vocab 15 · Grammar 10 · Reading 8 · Listening 7)</span>`;
      let actionButtonsHtml = `<button class="btn-primary" data-action="open-exam" data-day="${exam.day}">Start 1h Paper</button>`;

      if (st.status === 'in_progress') {
        badgeHtml = `<span class="badge badge-progress">In Progress · ${answeredCount}/${exam.totalQuestions} Answered · ${formatTime(
          st.remainingSeconds
        )} left</span>`;
        scoreSummaryHtml = `<span>Paused at Question ${st.lastQuestion || 1} — Ready to resume anytime</span>`;
        actionButtonsHtml = `<button class="btn-primary btn-resume" data-action="open-exam" data-day="${exam.day}">Resume (Q${
          st.lastQuestion || 1
        }) →</button>`;
      } else if (st.status === 'completed' && st.score) {
        const sc = st.score;
        badgeHtml = sc.passed
          ? `<span class="badge badge-pass">PASS 合格 · ${sc.totalScore} / 180</span>`
          : `<span class="badge badge-fail">SCORE · ${sc.totalScore} / 180 (Need 95)</span>`;
        scoreSummaryHtml = `<span>言語知識 <b>${sc.langScore}/60</b> · 読解 <b>${sc.readScore}/60</b> · 聴解 <b>${sc.listenScore}/60</b></span>`;
        actionButtonsHtml = `
          <button class="btn-secondary" data-action="open-exam" data-day="${exam.day}">Review Paper</button>
          <button class="btn-secondary" data-action="reset-day" data-day="${exam.day}" title="Reset and retake this day">Retake</button>
        `;
      }

      return `
        <div class="day-card ${isCurrent ? 'is-current' : ''} ${
          st.status === 'completed' ? 'is-completed' : ''
        }">
          <div class="day-left">
            <div class="day-num-box">
              <span class="d-small">Day</span>
              <span class="d-big">${exam.day}</span>
            </div>
            <div class="day-info">
              <div class="day-date-row">
                <span class="day-date-title">${esc(exam.labelEn)}</span>
                <span class="day-date-ja">${esc(exam.labelJa)}</span>
                ${badgeHtml}
              </div>
              <div class="day-meta-row">
                ${scoreSummaryHtml}
              </div>
              <div class="day-progress-bar">
                <div class="day-progress-fill ${
                  st.status === 'completed' ? 'done' : ''
                }" style="width: ${st.status === 'completed' ? 100 : pct}%"></div>
              </div>
            </div>
          </div>
          <div class="day-actions">
            ${actionButtonsHtml}
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div class="hero-banner">
      <div class="hero-top">
        <div>
          <span class="hero-eyebrow">NEXT UP · 1-HOUR SCALED N3 EXAM</span>
          <h1 class="hero-title">Day ${recExam.day}: ${esc(recExam.labelEn)}（${esc(recExam.labelJa)}）</h1>
          <p class="hero-desc">
            Start and stop whenever you want (morning, lunch, evening). Tap any Japanese word in any question or reading passage for instant English + <b>jpdb.io</b> lookup.
          </p>
        </div>
        <div>
          ${heroActionBtn}
        </div>
      </div>
      <div class="hero-stats">
        <div class="stat-pill">
          <div class="stat-label">DAYS COMPLETED</div>
          <div class="stat-val">${completedCount} / 34 Days</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">AVERAGE SCORE</div>
          <div class="stat-val">${avgScore !== null ? `${avgScore} / 180` : '— / 180'}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">PASS RATE (≥95/180)</div>
          <div class="stat-val">${completedCount > 0 ? `${passCount} / ${completedCount} Passed` : '—'}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">EXAM DAY</div>
          <div class="stat-val">Sun, 6 Dec 2026</div>
        </div>
      </div>
    </div>

    <div class="days-grid">
      ${daysCardsHtml}
    </div>

    <div class="exam-day-milestone">
      <div>
        <div style="font-size:0.75rem; font-weight:800; color:#fcd34d; letter-spacing:0.06em;">DAY 35 · TARGET EXAM DAY</div>
        <div style="font-size:1.2rem; font-weight:900; font-family:var(--font-serif);">Sunday, 6 December 2026（12月6日・日曜日）</div>
        <div style="font-size:0.84rem; color:#d4d4d8; margin-top:0.15rem;">
          Official JLPT N3 Test Day · Pass Mark: 95 / 180 Total (and ≥ 19 / 60 in each section)
        </div>
      </div>
      <button class="btn-secondary" data-action="switch-tab" data-tab="progress">
        📈 View Score Trend
      </button>
    </div>
  `;
}

// Render Screen 2: Authentic JLPT N3 Exam Paper View
function renderExamPaperScreen() {
  const exam = examsData.find(e => e.day === appState.currentExamDay) || examsData[0];
  const st = getDayState(exam.day);
  const isCompleted = st.status === 'completed';
  const answeredCount = Object.keys(st.answers).length;

  // Group questions by Section & Mondai
  let lastSection = null;
  let lastMondaiId = null;

  const sectionHeaders = {
    vocab: {
      title: '第1部：言語知識（文字・語彙）',
      meta: '目安時間：15分（全15問 · Q1〜Q15）'
    },
    grammar: {
      title: '第2部：言語知識（文法）・読解 【文法】',
      meta: '目安時間：10分（全10問 · Q16〜Q25）'
    },
    reading: {
      title: '第2部：言語知識（文法）・読解 【読解】',
      meta: '目安時間：20分（全8問 · Q26〜Q33）'
    },
    listening: {
      title: '第3部：聴解（リスニング）',
      meta: '目安時間：15分（全7問 · Q34〜Q40）'
    }
  };

  let questionsHtml = '';

  for (const q of exam.questions) {
    if (q.section !== lastSection) {
      lastSection = q.section;
      const sh = sectionHeaders[q.section];
      questionsHtml += `
        <div class="section-divider-banner" id="sec-${q.section}">
          <span>${esc(sh.title)}</span>
          <span style="font-size:0.78rem; font-weight:600; color:#d4d4d8;">${esc(sh.meta)}</span>
        </div>
      `;
    }

    if (q.mondaiId !== lastMondaiId) {
      lastMondaiId = q.mondaiId;
      questionsHtml += `
        <div class="mondai-header">
          ${renderClickableJapanese(q.mondaiTitle)}
        </div>
      `;
    }

    // Render shared or individual reading/cloze passage if present
    if (q.passageText || q.passageTable) {
      const titleBar = q.passageTitle
        ? `<div class="passage-title-bar">${renderClickableJapanese(q.passageTitle)}</div>`
        : '';
      const labelPrefix = q.passageLabel ? `<b>${esc(q.passageLabel)}</b> ` : '';
      const paragraphs = (q.passageText || '')
        .split(/\n\n+/)
        .filter(Boolean)
        .map(
          (p, idx) =>
            `<p class="passage-paragraph">${idx === 0 ? labelPrefix : ''}${renderClickableJapanese(
              p
            )}</p>`
        )
        .join('');

      let tableHtml = '';
      if (q.passageTable) {
        const ths = q.passageTable.headers
          .map(h => `<th>${renderClickableJapanese(h)}</th>`)
          .join('');
        const trs = q.passageTable.rows
          .map(
            row =>
              `<tr>${row.map(cell => `<td>${renderClickableJapanese(cell)}</td>`).join('')}</tr>`
          )
          .join('');
        tableHtml = `
          <div class="info-table-wrap">
            <table class="info-table">
              <thead><tr>${ths}</tr></thead>
              <tbody>${trs}</tbody>
            </table>
          </div>
        `;
      }

      const notesHtml = q.passageNotes
        ? `<div class="passage-notes">${renderClickableJapanese(q.passageNotes)}</div>`
        : '';

      questionsHtml += `
        <div class="reading-passage-box style-${q.passageStyle || 'essay'}">
          ${titleBar}
          ${paragraphs}
          ${tableHtml}
          ${notesHtml}
        </div>
      `;
    }

    // Listening Audio Box (Real Pre-Generated Japanese Neural MP3 Audio)
    let listeningBoxHtml = '';
    if (q.section === 'listening') {
      const isPlaying = appState.playingQuestion === q.qNum;
      const showScript = isCompleted || !!appState.openTranscripts[q.qNum];
      const audioSrc = q.audioFile || `./audio/d${exam.day}-q${q.qNum}.mp3`;
      const dialogueRows = (q.dialogue || [])
        .map(
          line => `
          <div class="dialogue-line">
            <span class="speaker-tag">${line.speaker === 'M' ? '男 (Male)' : '女 (Female)'}</span>
            ${renderClickableJapanese(line.text)}
          </div>
        `
        )
        .join('');

      listeningBoxHtml = `
        <div class="listening-box">
          <div style="font-size:0.84rem; color:var(--ink-muted); margin-bottom:0.45rem;">
            🎧 <b>状況：</b>${renderClickableJapanese(q.listeningIntro)}
          </div>
          <div class="listening-controls">
            <button class="btn-audio ${isPlaying ? 'playing' : ''}" data-action="play-audio" data-qnum="${
              q.qNum
            }">
              ${isPlaying ? '⏹ 音声を停止 (Stop Audio)' : '▶ 会話音声を再生 (Play Dialogue MP3)'}
            </button>
            <audio controls preload="none" src="${esc(audioSrc)}" style="height:32px; max-width:240px;"></audio>
            <button class="btn-secondary" data-action="toggle-script" data-qnum="${q.qNum}">
              ${showScript ? 'スクリプトを隠す (Hide Text)' : '📖 スクリプトを見る (Show Dialogue Text)'}
            </button>
          </div>
          ${
            showScript
              ? `<div class="dialogue-transcript">
                  ${dialogueRows}
                </div>`
              : ''
          }
        </div>
      `;
    }

    // Star (★) Interactive Sentence Scramble Slot Helper
    let starBuilderHtml = '';
    if (q.type === 'star') {
      const currentSlots = st.starSlots[q.qNum] || [null, null, null, null];
      const slotBoxes = [0, 1, 2, 3]
        .map(slotIdx => {
          const isStar = slotIdx + 1 === q.starPosition;
          const optIdx = currentSlots[slotIdx];
          const label =
            optIdx !== null && optIdx !== undefined
              ? `${optIdx + 1}. ${q.options[optIdx]}`
              : isStar
              ? '★'
              : `Slot ${slotIdx + 1}`;
          return `<span class="star-slot ${isStar ? 'is-star' : ''}" data-action="clear-star-slot" data-qnum="${
            q.qNum
          }" data-slot="${slotIdx}" title="Tap to clear slot">${esc(label)}</span>`;
        })
        .join('');

      const fragButtons = q.options
        .map(
          (opt, idx) =>
            `<button class="btn-secondary" style="padding:0.22rem 0.55rem; font-size:0.78rem;" data-action="add-star-frag" data-qnum="${
              q.qNum
            }" data-optidx="${idx}">+${idx + 1}: ${esc(opt)}</button>`
        )
        .join(' ');

      starBuilderHtml = `
        <div class="star-builder-box">
          <div style="font-size:0.75rem; font-weight:700; color:var(--ink-muted); margin-bottom:0.3rem;">
            ★ Sentence Scramble Helper (Tap fragments below to test order; slot ${q.starPosition} is ★):
          </div>
          <div class="star-slots-row">
            <span>${renderClickableJapanese(q.prefix)}</span>
            ${slotBoxes}
            <span>${renderClickableJapanese(q.suffix)}</span>
          </div>
          <div style="display:flex; gap:0.35rem; flex-wrap:wrap; align-items:center;">
            ${fragButtons}
            <button class="btn-secondary" style="padding:0.22rem 0.5rem; font-size:0.72rem;" data-action="reset-star" data-qnum="${
              q.qNum
            }">Clear</button>
          </div>
        </div>
      `;
    }

    const picked = st.answers[q.qNum];
    const compactGrid = q.options.every(o => o.length <= 16) ? 'compact-grid' : '';
    const hideReadingTarget = !isCompleted && q.hideTargetReading ? q.targetWord : null;

    const optionsHtml = q.options
      .map((optText, idx) => {
        const isSelected = picked === idx;
        let rowClass = isSelected ? 'selected' : '';
        if (isCompleted) {
          if (idx === q.answer) rowClass = 'graded-correct';
          else if (isSelected && idx !== q.answer) rowClass = 'graded-wrong';
        }

        // For 問題1 (Kanji Reading), options are hiragana readings of the target kanji; keep them clean
        const optionContentHtml =
          q.mondaiId === 'v-m1'
            ? esc(optText)
            : renderClickableJapanese(optText, { qNum: q.qNum, optionIdx: idx });

        return `
          <div class="option-row ${rowClass}">
            <button
              type="button"
              class="option-bubble"
              data-action="select-option"
              data-qnum="${q.qNum}"
              data-optidx="${idx}"
              aria-label="Select choice ${idx + 1}"
            >
              ${idx + 1}
            </button>
            <div class="option-text">
              ${optionContentHtml}
            </div>
            ${
              !isCompleted
                ? `<button type="button" class="option-select-Action" data-action="select-option" data-qnum="${q.qNum}" data-optidx="${idx}">
                    ${isSelected ? '✓ Chosen' : 'Select'}
                  </button>`
                : idx === q.answer
                ? `<span class="badge badge-pass">✓ 正解</span>`
                : isSelected
                ? `<span class="badge badge-fail">✗ 選択</span>`
                : ''
            }
          </div>
        `;
      })
      .join('');

    let explanationHtml = '';
    if (isCompleted) {
      const isRight = picked === q.answer;
      const reasons = q.optionReasons || [];
      const eliminationRows = q.options
        .map((optText, idx) => {
          const isAns = idx === q.answer;
          const isUserWrong = picked === idx && !isAns;
          const itemClass = isAns ? 'elim-correct' : isUserWrong ? 'elim-user-wrong' : '';
          const userTag = isUserWrong
            ? ` <span class="badge badge-fail" style="margin-left:0.35rem;">✗ Your Pick</span>`
            : isAns && picked === idx
            ? ` <span class="badge badge-pass" style="margin-left:0.35rem;">✓ Your Pick</span>`
            : '';
          const reasonText = reasons[idx] || (isAns ? '✓ Correct choice.' : '✗ Distractor.');
          return `
            <div class="elimination-item ${itemClass}">
              <div>
                <b>Choice ${idx + 1}: 「${esc(optText.replace(/<\/?u>/g, ''))}」</b>${userTag}
              </div>
              <div style="margin-top:0.15rem; color:#27272a;">
                ${esc(reasonText)}
              </div>
            </div>
          `;
        })
        .join('');

      explanationHtml = `
        <div class="explanation-box ${isRight ? 'is-correct' : 'is-wrong'}">
          <div style="font-size:0.92rem; margin-bottom:0.35rem;">
            <b>${
              isRight
                ? `✓ Correct (正解：選択肢 ${q.answer + 1})`
                : picked !== undefined
                ? `✗ Incorrect (You picked ${picked + 1} · Correct Answer: Choice ${q.answer + 1})`
                : `✗ Unanswered (Correct Answer: Choice ${q.answer + 1})`
            }</b>
          </div>
          <div>${esc(q.explanation)}</div>
          <div class="elimination-list">
            <div class="elimination-title">🔍 Process of Elimination (消去法 — Why 1–4 Are Right or Wrong):</div>
            ${eliminationRows}
          </div>
        </div>
      `;
    }

    questionsHtml += `
      <div class="question-block" id="q-block-${q.qNum}">
        ${listeningBoxHtml}
        <div class="question-prompt-row">
          <span class="q-number-box">${q.qNum}</span>
          <div class="q-prompt-text">
            ${renderClickableJapanese(q.prompt, { hideReadingFor: hideReadingTarget })}
          </div>
        </div>
        ${starBuilderHtml}
        <div class="options-list ${compactGrid}">
          ${optionsHtml}
        </div>
        ${explanationHtml}
      </div>
    `;
  }

  // Question Jump Drawer HTML
  let jumpDrawerHtml = '';
  if (appState.showJumpDrawer) {
    const renderJumpRange = (label, startQ, endQ) => {
      let pills = '';
      for (let n = startQ; n <= endQ; n++) {
        const qObj = exam.questions[n - 1];
        const picked = st.answers[n];
        let cls = picked !== undefined ? 'answered' : '';
        if (isCompleted) {
          cls = picked === qObj.answer ? 'correct' : 'wrong';
        }
        pills += `<button class="q-jump-pill ${cls}" data-action="jump-to-q" data-qnum="${n}">${n}</button>`;
      }
      return `
        <div class="q-jump-section-label">${esc(label)}</div>
        <div class="q-jump-grid">${pills}</div>
      `;
    };

    jumpDrawerHtml = `
      <div class="q-jump-drawer">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
          <b style="font-size:0.86rem;">Question Navigator (Tap to Jump · Progress Saved Automatically)</b>
          <button class="btn-secondary" style="padding:0.2rem 0.55rem;" data-action="toggle-jump-drawer">Close ✕</button>
        </div>
        ${renderJumpRange('第1部：文字・語彙 (Vocabulary · Q1–Q15 · ~15m)', 1, 15)}
        ${renderJumpRange('第2部：文法 (Grammar · Q16–Q25 · ~10m)', 16, 25)}
        ${renderJumpRange('第2部：読解 (Reading · Q26–Q33 · ~20m)', 26, 33)}
        ${renderJumpRange('第3部：聴解 (Listening · Q34–Q40 · ~15m)', 34, 40)}
      </div>
    `;
  }

  // Score Report Banner if Completed
  let scoreReportHtml = '';
  if (isCompleted && st.score) {
    const sc = st.score;
    scoreReportHtml = `
      <div class="score-report-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div>
            <span class="badge ${sc.passed ? 'badge-pass' : 'badge-fail'}" style="font-size:0.82rem; padding:0.22rem 0.65rem;">
              ${sc.passed ? '合格圏 (PASSED · ≥95/180 & All Sections ≥19)' : '不合格圏 (BELOW PASS THRESHOLD)'}
            </span>
            <h2 style="margin:0.35rem 0 0; font-family:var(--font-serif); font-size:1.5rem;">
              総合得点：${sc.totalScore} / 180 点
            </h2>
          </div>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn-secondary" data-action="switch-tab" data-tab="progress">📈 View Score Graph</button>
            <button class="btn-secondary" data-action="reset-day" data-day="${exam.day}">Retake Paper</button>
          </div>
        </div>
        <div class="score-sections-grid">
          <div class="score-sec-box">
            <div style="font-size:0.74rem; color:var(--ink-muted); font-weight:700;">言語知識（文字・語彙・文法）</div>
            <div style="font-size:1.25rem; font-weight:900;">${sc.langScore} / 60 点</div>
            <div style="font-size:0.76rem; color:${sc.langScore >= 19 ? 'var(--pass)' : 'var(--fail)'};">
              Raw: ${sc.langRaw}/${sc.langTotal} (${sc.langScore >= 19 ? '✓ 基準点19点以上' : '✗ 基準点19点未満'})
            </div>
          </div>
          <div class="score-sec-box">
            <div style="font-size:0.74rem; color:var(--ink-muted); font-weight:700;">読解（Reading Comprehension）</div>
            <div style="font-size:1.25rem; font-weight:900;">${sc.readScore} / 60 点</div>
            <div style="font-size:0.76rem; color:${sc.readScore >= 19 ? 'var(--pass)' : 'var(--fail)'};">
              Raw: ${sc.readRaw}/${sc.readTotal} (${sc.readScore >= 19 ? '✓ 基準点19点以上' : '✗ 基準点19点未満'})
            </div>
          </div>
          <div class="score-sec-box">
            <div style="font-size:0.74rem; color:var(--ink-muted); font-weight:700;">聴解（Listening）</div>
            <div style="font-size:1.25rem; font-weight:900;">${sc.listenScore} / 60 点</div>
            <div style="font-size:0.76rem; color:${sc.listenScore >= 19 ? 'var(--pass)' : 'var(--fail)'};">
              Raw: ${sc.listenRaw}/${sc.listenTotal} (${sc.listenScore >= 19 ? '✓ 基準点19点以上' : '✗ 基準点19点未満'})
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="exam-sticky-bar">
      <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
        <button class="btn-secondary" data-action="pause-and-exit" title="Save progress and return to Daily List">
          ← Save & Exit
        </button>
        <span style="font-weight:800; font-size:0.88rem;">Day ${exam.day} (${esc(exam.labelJa)})</span>
      </div>

      <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
        ${
          !isCompleted
            ? `
          <div id="live-timer-box" class="timer-box ${appState.timerPaused ? 'paused' : ''} ${
                st.remainingSeconds < 300 ? 'urgent' : ''
              }" title="Timer automatically pauses when you switch tabs or close the browser">
            <span>⏱</span>
            <span id="live-timer-val">${formatTime(st.remainingSeconds)}</span>
          </div>
        `
            : `<span class="badge badge-pass">Graded · Review Mode</span>`
        }
        <button class="btn-secondary" data-action="toggle-jump-drawer">
          📋 ${answeredCount}/${exam.totalQuestions} Qs
        </button>
        ${
          !isCompleted
            ? `<button class="btn-primary" style="padding:0.45rem 0.85rem; font-size:0.82rem;" data-action="grade-exam">
                ✓ Finish & Grade
              </button>`
            : ''
        }
      </div>
    </div>

    ${jumpDrawerHtml}
    ${scoreReportHtml}

    <div class="exam-booklet">
      <div class="booklet-cover-banner">
        <div class="b-series">2026年12月6日対策 · 1時間短縮実戦模試（第${exam.day}回 / 全34回）</div>
        <div class="b-level">日本語能力試験 N3（${esc(exam.labelJa)}）</div>
        <div class="b-meta">
          💡 <b>Tap any Japanese word</b> in the passages, questions, or choices to see its English meaning & open it in <b>jpdb.io</b>. Tap the numbered circle <b>(1–4)</b> to choose your answer.
        </div>
      </div>

      ${questionsHtml}

      ${
        !isCompleted
          ? `
        <div style="margin-top:2rem; padding-top:1.25rem; border-top:2px solid #18181b; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div>
            <b>Answered: ${answeredCount} / ${exam.totalQuestions} questions</b>
            <div style="font-size:0.8rem; color:var(--ink-muted);">
              Not finished yet? Tap "Save & Pause for Later" to stop now and continue at lunch or this evening.
            </div>
          </div>
          <div style="display:flex; gap:0.6rem; flex-wrap:wrap;">
            <button class="btn-secondary" data-action="pause-and-exit">⏸ Save & Pause for Later</button>
            <button class="btn-primary" data-action="grade-exam">✓ Complete & Grade Day ${exam.day} Paper</button>
          </div>
        </div>
      `
          : ''
      }
    </div>
  `;
}

// Render Screen 3: Score Progress Tracker (Nov 2 -> Dec 6)
function renderScoreProgressScreen() {
  const completedExams = examsData
    .map(ex => ({ exam: ex, state: getDayState(ex.day) }))
    .filter(x => x.state.status === 'completed' && x.state.score);

  const count = completedExams.length;
  const latest = count > 0 ? completedExams[count - 1].state.score.totalScore : null;
  const best =
    count > 0 ? Math.max(...completedExams.map(x => x.state.score.totalScore)) : null;
  const avg =
    count > 0
      ? Math.round(
          completedExams.reduce((acc, x) => acc + x.state.score.totalScore, 0) / count
        )
      : null;

  // Build SVG Total Score Chart (0..180 across 34 days)
  const W = 760;
  const H = 260;
  const padL = 44;
  const padR = 24;
  const padT = 22;
  const padB = 38;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const xForDay = day => padL + ((day - 1) / 33) * plotW;
  const yForScore = (score, maxVal = 180) => padT + plotH - (score / maxVal) * plotH;

  // Grid lines for Total Score (0, 60, 95 Pass, 120, 180)
  const yTicks = [0, 60, 95, 120, 180];
  const gridLinesHtml = yTicks
    .map(val => {
      const y = yForScore(val, 180);
      const isPassLine = val === 95;
      return `
        <line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}"
          stroke="${isPassLine ? '#15803d' : '#d6d3c9'}"
          stroke-width="${isPassLine ? '2' : '1'}"
          stroke-dasharray="${isPassLine ? '6,4' : 'none'}" />
        <text x="${padL - 8}" y="${y + 4}" text-anchor="end" font-size="11" font-weight="${
        isPassLine ? '800' : '600'
      }" fill="${isPassLine ? '#15803d' : '#52525b'}">${val}</text>
      `;
    })
    .join('');

  // X-axis day ticks
  const xTickDays = [1, 5, 10, 15, 20, 25, 30, 34];
  const xTicksHtml = xTickDays
    .map(d => {
      const x = xForDay(d);
      const ex = examsData[d - 1];
      return `
        <line x1="${x}" y1="${padT}" x2="${x}" y2="${padT + plotH}" stroke="#ece9df" stroke-width="1" />
        <text x="${x}" y="${H - 12}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#52525b">D${d} (${ex.labelJa.replace(
        /（.*）/,
        ''
      )})</text>
      `;
    })
    .join('');

  // Polyline & circles for completed days
  const pointsStr = completedExams
    .map(x => `${xForDay(x.exam.day)},${yForScore(x.state.score.totalScore, 180)}`)
    .join(' ');

  const circlesHtml = completedExams
    .map(x => {
      const cx = xForDay(x.exam.day);
      const cy = yForScore(x.state.score.totalScore, 180);
      const passed = x.state.score.passed;
      return `
        <circle cx="${cx}" cy="${cy}" r="5.5" fill="${
        passed ? '#15803d' : '#b45309'
      }" stroke="#ffffff" stroke-width="2" />
        <text x="${cx}" y="${cy - 9}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#18181b">${
        x.state.score.totalScore
      }</text>
      `;
    })
    .join('');

  // Build SVG Sectional Chart (0..60 across 34 days)
  const ySecTicks = [0, 19, 30, 45, 60];
  const secGridHtml = ySecTicks
    .map(val => {
      const y = yForScore(val, 60);
      const isFloor = val === 19;
      return `
        <line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}"
          stroke="${isFloor ? '#b91c1c' : '#d6d3c9'}"
          stroke-width="${isFloor ? '1.8' : '1'}"
          stroke-dasharray="${isFloor ? '5,4' : 'none'}" />
        <text x="${padL - 8}" y="${y + 4}" text-anchor="end" font-size="11" font-weight="${
        isFloor ? '800' : '600'
      }" fill="${isFloor ? '#b91c1c' : '#52525b'}">${val}</text>
      `;
    })
    .join('');

  const langPoints = completedExams
    .map(x => `${xForDay(x.exam.day)},${yForScore(x.state.score.langScore, 60)}`)
    .join(' ');
  const readPoints = completedExams
    .map(x => `${xForDay(x.exam.day)},${yForScore(x.state.score.readScore, 60)}`)
    .join(' ');
  const listenPoints = completedExams
    .map(x => `${xForDay(x.exam.day)},${yForScore(x.state.score.listenScore, 60)}`)
    .join(' ');

  const secDotsHtml = completedExams
    .map(x => {
      const cx = xForDay(x.exam.day);
      return `
        <circle cx="${cx}" cy="${yForScore(x.state.score.langScore, 60)}" r="4" fill="#1d4ed8" />
        <circle cx="${cx}" cy="${yForScore(x.state.score.readScore, 60)}" r="4" fill="#b45309" />
        <circle cx="${cx}" cy="${yForScore(x.state.score.listenScore, 60)}" r="4" fill="#15803d" />
      `;
    })
    .join('');

  const historyRowsHtml =
    completedExams.length === 0
      ? `<tr><td colspan="7" style="text-align:center; padding:1.25rem; color:var(--ink-muted);">No completed daily exams yet. Complete Day 1 to see your score plotted here!</td></tr>`
      : completedExams
          .slice()
          .reverse()
          .map(({ exam, state }) => {
            const sc = state.score;
            const timeSpent = formatTime(3600 - (state.remainingSeconds || 0));
            return `
              <tr>
                <td><b>Day ${exam.day}</b> (${esc(exam.labelJa)})</td>
                <td><b>${sc.totalScore} / 180</b></td>
                <td>${sc.langScore} / 60</td>
                <td>${sc.readScore} / 60</td>
                <td>${sc.listenScore} / 60</td>
                <td>${timeSpent}</td>
                <td>
                  <span class="badge ${sc.passed ? 'badge-pass' : 'badge-fail'}">${
              sc.passed ? 'PASS' : 'FAIL'
            }</span>
                  <button class="btn-secondary" style="padding:0.2rem 0.5rem; margin-left:0.35rem; font-size:0.74rem;" data-action="open-exam" data-day="${
                    exam.day
                  }">Review</button>
                </td>
              </tr>
            `;
          })
          .join('');

  return `
    <div class="hero-banner">
      <div class="hero-top">
        <div>
          <span class="hero-eyebrow">SCORE TRAJECTORY · NOV 2 – DEC 6</span>
          <h1 class="hero-title">JLPT N3 Daily Score Progress（成績推移）</h1>
          <p class="hero-desc">
            Track your scaled score out of 180 across all 34 daily papers leading up to the exam on Sunday, 6 December.
          </p>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <button class="btn-secondary" data-action="toggle-backup-modal">💾 Backup / Restore Progress</button>
        </div>
      </div>
      <div class="hero-stats">
        <div class="stat-pill">
          <div class="stat-label">COMPLETED PAPERS</div>
          <div class="stat-val">${count} / 34</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">LATEST SCORE</div>
          <div class="stat-val">${latest !== null ? `${latest} / 180` : '—'}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">BEST SCORE</div>
          <div class="stat-val">${best !== null ? `${best} / 180` : '—'}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">AVERAGE SCORE</div>
          <div class="stat-val">${avg !== null ? `${avg} / 180` : '—'}</div>
        </div>
      </div>
    </div>

    <div class="chart-card">
      <h2 class="chart-title">Total Scaled Score Over Time (0 – 180 Points)</h2>
      <p class="chart-sub">Green dashed line = <b>95 / 180 Official JLPT N3 Overall Pass Threshold (合格ライン)</b></p>
      <div class="svg-chart-wrap">
        <svg viewBox="0 0 ${W} ${H}" width="100%" style="min-width:520px; display:block;">
          ${gridLinesHtml}
          ${xTicksHtml}
          ${
            completedExams.length >= 2
              ? `<polyline fill="none" stroke="#18181b" stroke-width="3" points="${pointsStr}" />`
              : ''
          }
          ${circlesHtml}
        </svg>
      </div>
    </div>

    <div class="chart-card">
      <h2 class="chart-title">Sectional Scores Over Time (0 – 60 Points per Section)</h2>
      <p class="chart-sub">
        <span style="color:#1d4ed8; font-weight:800;">● 言語知識 (Vocab/Grammar)</span> &nbsp;·&nbsp;
        <span style="color:#b45309; font-weight:800;">● 読解 (Reading)</span> &nbsp;·&nbsp;
        <span style="color:#15803d; font-weight:800;">● 聴解 (Listening)</span> &nbsp;·&nbsp;
        <span style="color:#b91c1c; font-weight:700;">--- 19 pt Minimum Sectional Pass Line</span>
      </p>
      <div class="svg-chart-wrap">
        <svg viewBox="0 0 ${W} ${H}" width="100%" style="min-width:520px; display:block;">
          ${secGridHtml}
          ${xTicksHtml}
          ${
            completedExams.length >= 2
              ? `
            <polyline fill="none" stroke="#1d4ed8" stroke-width="2.2" points="${langPoints}" />
            <polyline fill="none" stroke="#b45309" stroke-width="2.2" points="${readPoints}" />
            <polyline fill="none" stroke="#15803d" stroke-width="2.2" points="${listenPoints}" />
          `
              : ''
          }
          ${secDotsHtml}
        </svg>
      </div>
    </div>

    <div class="chart-card">
      <h2 class="chart-title">Completed Daily Papers Log</h2>
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
            ${historyRowsHtml}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Render Bottom Word Lookup + jpdb.io Sheet
function renderWordPopup() {
  const p = appState.activeWordPopup;
  if (!p) return '';

  const jpdbBaseUrl = `https://jpdb.io/search?q=${encodeURIComponent(p.w || p.surface)}&lang=english#a`;
  const jpdbSurfaceUrl = `https://jpdb.io/search?q=${encodeURIComponent(p.surface)}&lang=english#a`;
  const showDualLinks = p.w && p.w !== p.surface;

  let readingDisplay = `【${esc(p.r || p.surface)}】`;
  if (p.hideReading && !p.revealedReading) {
    readingDisplay = `<button class="btn-secondary" style="padding:0.12rem 0.5rem; font-size:0.74rem;" data-action="reveal-target-reading">👁 Show Reading (漢字読み Target)</button>`;
  }

  return `
    <div class="word-popup-backdrop" data-action="close-word-popup"></div>
    <div class="word-popup-sheet" role="dialog" aria-label="Word Lookup">
      <div class="word-popup-inner">
        <div class="word-popup-top">
          <div class="word-head-group">
            <span class="word-kanji">${esc(p.w || p.surface)}</span>
            ${
              showDualLinks
                ? `<span style="font-size:0.82rem; color:#a1a1aa;">(in text: ${esc(p.surface)})</span>`
                : ''
            }
            <span class="word-reading">${readingDisplay}</span>
            ${p.l ? `<span class="word-level-tag">${esc(p.l)}</span>` : ''}
            ${p.p ? `<span class="word-level-tag" style="color:#d4d4d8;">${esc(p.p)}</span>` : ''}
          </div>
          <button class="word-close-btn" data-action="close-word-popup">Close ✕</button>
        </div>

        <div class="word-meaning-text">
          🇬🇧 <b>English:</b> ${esc(p.m)}
        </div>

        <div class="word-actions-row">
          <a class="btn-jpdb" href="${jpdbBaseUrl}" target="_blank" rel="noopener noreferrer">
            🔎 Open "${esc(p.w || p.surface)}" in jpdb.io ↗
          </a>
          ${
            showDualLinks
              ? `<a class="btn-jpdb secondary" href="${jpdbSurfaceUrl}" target="_blank" rel="noopener noreferrer">
                  jpdb ("${esc(p.surface)}") ↗
                </a>`
              : ''
          }
          ${
            p.optionContext
              ? `<button class="btn-secondary" style="margin-left:auto;" data-action="select-option" data-qnum="${
                  p.optionContext.qNum
                }" data-optidx="${p.optionContext.optIdx}">
                  ✓ Choose Option ${p.optionContext.optIdx + 1}
                </button>`
              : ''
          }
        </div>
      </div>
    </div>
  `;
}

// Render Backup / Restore Modal
function renderBackupModal() {
  if (!appState.showBackupModal) return '';
  const code = btoa(unescape(encodeURIComponent(JSON.stringify(appState.store))));
  return `
    <div class="word-popup-backdrop" data-action="toggle-backup-modal"></div>
    <div class="word-popup-sheet" style="border-top-color:#15803d;">
      <div class="word-popup-inner">
        <div class="word-popup-top">
          <b>💾 Backup or Restore Your Daily Progress</b>
          <button class="word-close-btn" data-action="toggle-backup-modal">Close ✕</button>
        </div>
        <div style="font-size:0.82rem; color:#d4d4d8;">
          Your answers and scores are saved automatically in this browser. Copy the backup code below if you want to move your progress to another phone/browser.
        </div>
        <textarea id="backup-code-box" rows="3" style="width:100%; font-family:monospace; font-size:0.76rem; padding:0.45rem; border-radius:4px;">${esc(
          code
        )}</textarea>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn-jpdb" data-action="copy-backup">📋 Copy Backup Code</button>
          <button class="btn-jpdb secondary" data-action="restore-backup">📥 Restore from Code in Box</button>
        </div>
      </div>
    </div>
  `;
}

// Main Render Function
function renderApp() {
  const root = document.getElementById('app');
  if (!root) return;

  let mainContent = '';
  if (appState.activeTab === 'exam' && appState.currentExamDay) {
    mainContent = renderExamPaperScreen();
  } else if (appState.activeTab === 'progress') {
    mainContent = renderScoreProgressScreen();
  } else {
    mainContent = renderDailyListScreen();
  }

  root.innerHTML = `
    <header class="app-header">
      <div class="header-inner">
        <div class="brand-group" style="cursor:pointer;" data-action="switch-tab" data-tab="daily">
          <span class="brand-badge">N3</span>
          <div>
            <div class="brand-title">JLPT N3 · 1-Hour Daily Exam</div>
            <div class="brand-sub">Mon 2 Nov – Sun 6 Dec 2026 · Tap any word for English & jpdb.io</div>
          </div>
        </div>
        <nav class="nav-tabs">
          <button class="nav-tab ${
            appState.activeTab === 'daily' || appState.activeTab === 'exam' ? 'active' : ''
          }" data-action="switch-tab" data-tab="daily">
            📅 Daily Papers (Nov 2–Dec 6)
          </button>
          <button class="nav-tab ${
            appState.activeTab === 'progress' ? 'active' : ''
          }" data-action="switch-tab" data-tab="progress">
            📈 Score Progress
          </button>
        </nav>
      </div>
    </header>

    <main class="main-container">
      ${mainContent}
    </main>

    ${renderWordPopup()}
    ${renderBackupModal()}
  `;
}

// Global Event Delegation
document.addEventListener('click', event => {
  // 1. If a Japanese word link (.jp-word) was clicked, let the native <a href="https://jpdb.io/..." target="_blank"> open directly!
  const wordEl = event.target.closest('.jp-word');
  if (wordEl) {
    event.stopPropagation();
    return;
  }

  // 2. Check data-action buttons
  const actionEl = event.target.closest('[data-action]');
  if (!actionEl) return;

  const action = actionEl.getAttribute('data-action');

  if (action === 'switch-tab') {
    const tab = actionEl.getAttribute('data-tab');
    stopExamTimer();
    stopAllAudio();
    appState.activeWordPopup = null;
    appState.activeTab = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
    return;
  }

  if (action === 'open-exam') {
    const dayNum = Number(actionEl.getAttribute('data-day'));
    appState.currentExamDay = dayNum;
    appState.activeTab = 'exam';
    appState.showJumpDrawer = false;
    appState.activeWordPopup = null;
    const st = getDayState(dayNum);
    startExamTimer(dayNum);
    renderApp();

    if (st.status === 'in_progress' && st.lastQuestion > 1) {
      setTimeout(() => {
        const qEl = document.getElementById(`q-block-${st.lastQuestion}`);
        if (qEl) qEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }

  if (action === 'pause-and-exit') {
    stopExamTimer();
    stopAllAudio();
    appState.activeWordPopup = null;
    appState.activeTab = 'daily';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
    return;
  }

  if (action === 'toggle-pause') {
    appState.timerPaused = !appState.timerPaused;
    saveStore();
    renderApp();
    return;
  }

  if (action === 'toggle-jump-drawer') {
    appState.showJumpDrawer = !appState.showJumpDrawer;
    renderApp();
    return;
  }

  if (action === 'jump-to-q') {
    const qNum = Number(actionEl.getAttribute('data-qnum'));
    appState.showJumpDrawer = false;
    renderApp();
    const el = document.getElementById(`q-block-${qNum}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  if (action === 'select-option') {
    const qNum = Number(actionEl.getAttribute('data-qnum'));
    const optIdx = Number(actionEl.getAttribute('data-optidx'));
    if (!appState.currentExamDay) return;
    const st = getDayState(appState.currentExamDay);
    if (st.status === 'completed') return;

    if (st.answers[qNum] === optIdx) {
      delete st.answers[qNum];
    } else {
      st.answers[qNum] = optIdx;
    }
    st.lastQuestion = qNum;
    st.status = 'in_progress';
    appState.activeWordPopup = null;
    saveStore();
    renderApp();
    return;
  }

  if (action === 'add-star-frag') {
    const qNum = Number(actionEl.getAttribute('data-qnum'));
    const optIdx = Number(actionEl.getAttribute('data-optidx'));
    const st = getDayState(appState.currentExamDay);
    if (st.status === 'completed') return;
    const slots = st.starSlots[qNum] ? [...st.starSlots[qNum]] : [null, null, null, null];
    const emptyIdx = slots.findIndex(x => x === null || x === undefined);
    if (emptyIdx !== -1 && !slots.includes(optIdx)) {
      slots[emptyIdx] = optIdx;
      st.starSlots[qNum] = slots;
      // If all 4 slots filled or star slot filled, auto-select the option in the star position!
      const exam = examsData.find(e => e.day === appState.currentExamDay);
      const qObj = exam?.questions.find(q => q.qNum === qNum);
      if (qObj && slots[qObj.starPosition - 1] !== null) {
        st.answers[qNum] = slots[qObj.starPosition - 1];
      }
      st.lastQuestion = qNum;
      saveStore();
      renderApp();
    }
    return;
  }

  if (action === 'clear-star-slot') {
    const qNum = Number(actionEl.getAttribute('data-qnum'));
    const slotIdx = Number(actionEl.getAttribute('data-slot'));
    const st = getDayState(appState.currentExamDay);
    if (st.status === 'completed' || !st.starSlots[qNum]) return;
    st.starSlots[qNum][slotIdx] = null;
    saveStore();
    renderApp();
    return;
  }

  if (action === 'reset-star') {
    const qNum = Number(actionEl.getAttribute('data-qnum'));
    const st = getDayState(appState.currentExamDay);
    if (st.status === 'completed') return;
    delete st.starSlots[qNum];
    saveStore();
    renderApp();
    return;
  }

  if (action === 'play-audio') {
    const qNum = Number(actionEl.getAttribute('data-qnum'));
    const exam = examsData.find(e => e.day === appState.currentExamDay);
    const q = exam?.questions.find(x => x.qNum === qNum);
    if (q) togglePlayListeningQuestion(q);
    return;
  }

  if (action === 'toggle-script') {
    const qNum = Number(actionEl.getAttribute('data-qnum'));
    appState.openTranscripts[qNum] = !appState.openTranscripts[qNum];
    renderApp();
    return;
  }

  if (action === 'grade-exam') {
    if (!appState.currentExamDay) return;
    const exam = examsData.find(e => e.day === appState.currentExamDay);
    const st = getDayState(exam.day);
    const answeredCount = Object.keys(st.answers).length;
    if (answeredCount < exam.totalQuestions) {
      const ok = window.confirm(
        `You have answered ${answeredCount} of ${exam.totalQuestions} questions.\n\nIf you just want to take a break and continue later today, tap Cancel and use "Save & Exit".\n\nGrade Day ${exam.day} paper now?`
      );
      if (!ok) return;
    }
    stopExamTimer();
    stopAllAudio();
    st.status = 'completed';
    st.score = computeExamScore(exam, st.answers);
    st.completedAt = new Date().toISOString();
    saveStore();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
    return;
  }

  if (action === 'reset-day') {
    const dayNum = Number(actionEl.getAttribute('data-day'));
    const ok = window.confirm(`Reset all answers and timer for Day ${dayNum}?`);
    if (!ok) return;
    delete appState.store.days[dayNum];
    saveStore();
    if (appState.activeTab === 'exam' && appState.currentExamDay === dayNum) {
      startExamTimer(dayNum);
    }
    renderApp();
    return;
  }

  if (action === 'toggle-backup-modal') {
    appState.showBackupModal = !appState.showBackupModal;
    renderApp();
    return;
  }

  if (action === 'copy-backup') {
    const box = document.getElementById('backup-code-box');
    if (box) {
      box.select();
      navigator.clipboard?.writeText(box.value);
      alert('Backup code copied to clipboard!');
    }
    return;
  }

  if (action === 'restore-backup') {
    const box = document.getElementById('backup-code-box');
    if (!box || !box.value.trim()) return;
    try {
      const decoded = JSON.parse(decodeURIComponent(escape(atob(box.value.trim()))));
      if (decoded && decoded.days) {
        appState.store = decoded;
        saveStore();
        appState.showBackupModal = false;
        renderApp();
        alert('Progress restored successfully!');
      }
    } catch {
      alert('Invalid backup code.');
    }
  }
});

// Initial Render
renderApp();
