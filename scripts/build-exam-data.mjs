import fs from 'fs';
import path from 'path';
import kuromoji from 'kuromoji';

import { SHORT_PASSAGES } from './banks/bank-reading-short.mjs';
import { MEDIUM_PASSAGES, LONG_PASSAGES } from './banks/bank-reading-medium-long.mjs';
import { INFO_RETRIEVAL_PASSAGES, CLOZE_PASSAGES } from './banks/bank-info-and-cloze.mjs';
import {
  SYNONYM_QUESTIONS,
  USAGE_QUESTIONS,
  STAR_QUESTIONS,
  LISTENING_SETS
} from './banks/bank-special-drills.mjs';
import { GRAMMAR_SENTENCE_QUESTIONS } from './banks/bank-grammar-sentences.mjs';

const DATA_TMP = '/tmp/opencode/jlpt-data';
const OUT_DIR = '/home/thickropes/jlpt-n3-prep/src/data';
fs.mkdirSync(OUT_DIR, { recursive: true });

// Helper: Katakana -> Hiragana
function kataToHira(str = '') {
  return str.replace(/[\u30a1-\u30f6]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}

// 1. Load OpenJLPT Vocab & Kanji + JMdict words.json
console.log('Loading OpenJLPT & JMdict dictionaries...');
const lexicon = new Map(); // word -> { w, r, m, l, pos }
const allVocabByLevel = {};

for (const lvl of ['n5', 'n4', 'n3', 'n2', 'n1']) {
  const list = JSON.parse(fs.readFileSync(path.join(DATA_TMP, `vocab-${lvl}.json`), 'utf8'));
  allVocabByLevel[lvl] = list;
  for (const item of list) {
    const entry = {
      w: item.word,
      r: item.reading || item.word,
      m: (item.meanings || []).slice(0, 4).join('; '),
      l: item.level || lvl.toUpperCase(),
      pos: (item.pos || [])[0] || 'n'
    };
    if (!lexicon.has(item.word)) {
      lexicon.set(item.word, entry);
    }
    if (item.reading && !lexicon.has(item.reading)) {
      lexicon.set(item.reading, entry);
    }
  }
}

const kanjiMap = new Map(); // char -> kanji info
const allKanjiN3N4 = [];
for (const lvl of ['n5', 'n4', 'n3', 'n2', 'n1']) {
  const klist = JSON.parse(fs.readFileSync(path.join(DATA_TMP, `kanji-${lvl}.json`), 'utf8'));
  for (const k of klist) {
    kanjiMap.set(k.character, k);
    if (lvl === 'n3' || lvl === 'n4') {
      allKanjiN3N4.push(k);
    }
    if (!lexicon.has(k.character)) {
      const readings = [
        ...(k.kunyomi || []).map(x => x.replace(/\..*$/, '')),
        ...(k.onyomi || []).map(kataToHira)
      ];
      lexicon.set(k.character, {
        w: k.character,
        r: readings[0] || '',
        m: (k.meanings || []).slice(0, 4).join('; '),
        l: k.level || lvl.toUpperCase(),
        pos: 'kanji'
      });
    }
  }
}

// Load JMdict words.json
const jmdictRaw = JSON.parse(fs.readFileSync(path.join(DATA_TMP, 'words.json'), 'utf8')).words || [];
for (const entry of jmdictRaw) {
  const glosses = [];
  const posList = [];
  for (const s of entry.sense || []) {
    posList.push(...(s.partOfSpeech || []));
    for (const g of s.gloss || []) {
      if (g.lang === 'eng' && g.text) glosses.push(g.text);
    }
  }
  if (!glosses.length) continue;
  const meaning = glosses.slice(0, 4).join('; ');
  const kanas = (entry.kana || []).map(k => k.text);
  const reading = kanas[0] || '';
  const jlpt = entry.jlpt_waller ? String(entry.jlpt_waller).replace(/^N?/, 'N') : '';
  const pos = posList[0] || 'n';

  for (const k of entry.kanji || []) {
    if (!lexicon.has(k.text)) {
      lexicon.set(k.text, { w: k.text, r: reading, m: meaning, l: jlpt, pos });
    }
  }
  for (const kana of kanas) {
    if (!lexicon.has(kana)) {
      lexicon.set(kana, { w: (entry.kanji?.[0]?.text || kana), r: reading, m: meaning, l: jlpt, pos });
    }
  }
}

// Add common functional/grammar words & particles so even tapping particles gives helpful info
const coreFunctional = [
  ['は', 'は', 'topic marker particle', 'N5', 'prt'],
  ['が', 'が', 'subject marker particle; but', 'N5', 'prt'],
  ['を', 'を', 'direct object marker particle', 'N5', 'prt'],
  ['に', 'に', 'at; in; to; for (location/time/target particle)', 'N5', 'prt'],
  ['で', 'で', 'at; in; by means of (particle)', 'N5', 'prt'],
  ['と', 'と', 'with; and; quotation particle; if/when', 'N5', 'prt'],
  ['も', 'も', 'also; too; even', 'N5', 'prt'],
  ['の', 'の', 'possessive/nominalizing particle (of; \'s)', 'N5', 'prt'],
  ['へ', 'へ', 'toward; to (direction particle)', 'N5', 'prt'],
  ['から', 'から', 'from; since; because', 'N5', 'prt'],
  ['まで', 'まで', 'until; up to; as far as; even', 'N5', 'prt'],
  ['より', 'より', 'than; rather than; from', 'N5', 'prt'],
  ['や', 'や', 'and (non-exhaustive list particle)', 'N5', 'prt'],
  ['か', 'か', 'question particle; or; whether', 'N5', 'prt'],
  ['ね', 'ね', 'right?; isn\'t it? (sentence-ending particle)', 'N5', 'prt'],
  ['よ', 'よ', 'you know; I tell you (emphasis particle)', 'N5', 'prt'],
  ['ので', 'ので', 'because; since (reason conjunction)', 'N4', 'conj'],
  ['のに', 'のに', 'although; despite; even though; in order to', 'N4', 'conj'],
  ['て', 'て', 'te-form connector (and; by doing)', 'N5', 'prt'],
  ['た', 'た', 'past / completed action auxiliary', 'N5', 'aux'],
  ['ない', 'ない', 'not; non-existent (negative auxiliary)', 'N5', 'aux'],
  ['ます', 'ます', 'polite verb auxiliary', 'N5', 'aux'],
  ['です', 'です', 'is; am; are (polite copula)', 'N5', 'aux'],
  ['だ', 'だ', 'is; be (plain copula)', 'N5', 'aux'],
  ['である', 'である', 'to be (formal written copula)', 'N3', 'exp'],
  ['という', 'という', 'called; named; that says', 'N4', 'exp'],
  ['について', 'について', 'about; concerning; regarding', 'N4', 'exp'],
  ['によって', 'によって', 'by means of; due to; depending on; according to', 'N3', 'exp'],
  ['にとって', 'にとって', 'for; to; from the standpoint of', 'N3', 'exp'],
  ['に対して', 'にたいして', 'toward; in contrast to; regarding', 'N3', 'exp'],
  ['に関して', 'にかんして', 'regarding; concerning; related to', 'N3', 'exp'],
  ['に比べて', 'にくらべて', 'compared to; in comparison with', 'N3', 'exp'],
  ['のおかげで', 'のおかげで', 'thanks to; owing to', 'N3', 'exp'],
  ['のせいで', 'のせいで', 'because of; due to (negative outcome)', 'N3', 'exp'],
  ['ために', 'ために', 'for the sake of; in order to; because of', 'N4', 'exp'],
  ['ように', 'ように', 'so that; in order to; like', 'N4', 'exp'],
  ['ようになる', 'ようになる', 'to come to be that; to reach the point where', 'N4', 'exp'],
  ['ことにする', 'ことにする', 'to decide to', 'N4', 'exp'],
  ['ことになる', 'ことになる', 'to be decided that; to turn out that', 'N4', 'exp'],
  ['なければならない', 'なければならない', 'must; have to', 'N4', 'exp'],
  ['かもしれない', 'かもしれない', 'might; perhaps; may be', 'N4', 'exp'],
  ['に違いない', 'にちがいない', 'must be; no doubt that', 'N3', 'exp'],
  ['にちがいない', 'にちがいない', 'must be; no doubt that', 'N3', 'exp'],
  ['とは限らない', 'とはかぎらない', 'not necessarily so; is not always true', 'N3', 'exp'],
  ['わけではない', 'わけではない', 'it does not mean that; it is not the case that', 'N3', 'exp'],
  ['しかない', 'しかない', 'have no choice but to; nothing but', 'N3', 'exp'],
  ['ばかり', 'ばかり', 'only; nothing but; just finished doing', 'N4', 'prt'],
  ['くらい', 'くらい', 'approximately; about; to the extent that', 'N4', 'prt'],
  ['ぐらい', 'ぐらい', 'approximately; about; to the extent that', 'N4', 'prt'],
  ['ほど', 'ほど', 'degree; extent; the more... the more', 'N4', 'prt'],
  ['まま', 'まま', 'as it is; leaving unchanged', 'N4', 'n'],
  ['うち', 'うち', 'while; before; among; inside', 'N4', 'n'],
  ['たび', 'たび', 'each time; every time (〜たびに)', 'N3', 'n'],
  ['ついでに', 'ついでに', 'while one is at it; on the way', 'N3', 'adv'],
  ['最中', 'さいちゅう', 'in the middle of; right at the height of', 'N3', 'n'],
  ['とたん', 'とたん', 'just as; the moment that (〜たとたん)', 'N3', 'n'],
  ['かわりに', 'かわりに', 'instead of; in exchange for', 'N3', 'exp'],
  ['代わりに', 'かわりに', 'instead of; in exchange for', 'N3', 'exp'],
  ['にもかかわらず', 'にもかかわらず', 'despite; in spite of; nevertheless', 'N2', 'exp'],
  ['したがって', 'したがって', 'therefore; consequently; in accordance with', 'N3', 'conj'],
  ['つまり', 'つまり', 'in other words; that is to say; in short', 'N3', 'conj'],
  ['ところが', 'ところが', 'however; on the contrary; even so', 'N3', 'conj'],
  ['しかも', 'しかも', 'moreover; furthermore; what is more', 'N3', 'conj'],
  ['すると', 'すると', 'thereupon; and then; if so', 'N4', 'conj'],
  ['そこで', 'そこで', 'so; accordingly; therefore', 'N3', 'conj'],
  ['なぜなら', 'なぜなら', 'because; the reason is', 'N3', 'conj'],
  ['ただし', 'ただし', 'however; provided that (exception clause)', 'N3', 'conj'],
  ['なお', 'なお', 'furthermore; in addition; note that', 'N3', 'conj'],
  ['および', 'および', 'and; as well as (formal)', 'N3', 'conj'],
  ['れる', 'れる', 'passive / potential / honorific auxiliary verb', 'N4', 'aux-v'],
  ['られる', 'られる', 'passive / potential / honorific auxiliary verb', 'N4', 'aux-v'],
  ['せる', 'せる', 'causative auxiliary verb (to make/let someone do)', 'N4', 'aux-v'],
  ['させる', 'させる', 'causative auxiliary verb (to make/let someone do)', 'N4', 'aux-v'],
  ['くださる', 'くださる', 'to give; please do for me (honorific)', 'N4', 'v5r'],
  ['ください', 'ください', 'please (do for me)', 'N5', 'exp'],
  ['いただく', 'いただく', 'to receive; to have someone do (humble)', 'N4', 'v5k'],
  ['いたす', 'いたす', 'to do (humble polite form of する)', 'N4', 'v5s'],
  ['いたします', 'いたします', 'to do (humble polite form of します)', 'N4', 'exp'],
  ['おる', 'おる', 'to be; to be doing (humble/written form of いる)', 'N3', 'v5r'],
  ['おります', 'おります', 'to be; to be doing (humble polite form of います)', 'N3', 'exp'],
  ['ござる', 'ござる', 'to be; to exist (polite → ございます)', 'N4', 'v5r'],
  ['ございます', 'ございます', 'to be; to exist (polite form of あります)', 'N4', 'exp'],
  ['いらっしゃる', 'いらっしゃる', 'to be; to go; to come (honorific)', 'N4', 'v5r'],
  ['おっしゃる', 'おっしゃる', 'to say; to speak (honorific)', 'N4', 'v5r'],
  ['ご覧', 'ごらん', 'looking; seeing; trying (honorific → ご覧になる)', 'N4', 'n'],
  ['伴う', 'ともなう', 'to accompany; to entail; to go hand in hand with', 'N3', 'v5u'],
  ['伴い', 'ともない', 'accompanying; along with; due to (from 伴う)', 'N3', 'v5u'],
  ['もらえる', 'もらえる', 'can receive; can get someone to do (potential of もらう)', 'N4', 'v1'],
  ['かしこまる', 'かしこまる', 'certainly!; understood! (humble: かしこまりました)', 'N3', 'v5r'],
  ['たしかに', 'たしかに', 'certainly; surely; indeed', 'N3', 'adv'],
  ['こうした', 'こうした', 'such; like this', 'N3', 'adj-pn'],
  ['ごめんね', 'ごめんね', 'sorry (casual)', 'N5', 'exp'],
  ['ごちそうさま', 'ごちそうさま', 'thank you for the meal', 'N5', 'exp'],
  ['ごちそうさまでした', 'ごちそうさまでした', 'thank you for the meal (polite)', 'N5', 'exp'],
  ['しっくり', 'しっくり', 'fittingly; naturally; clicking into place', 'N2', 'adv'],
  ['づくり', 'づくり', 'making; crafting; building (suffix, e.g. 町づくり)', 'N3', 'suf'],
  ['べし', 'べし', 'should; must (→ べきだ)', 'N3', 'aux'],
  ['べき', 'べき', 'should; ought to (〜べきだ)', 'N3', 'aux'],
  ['べきだ', 'べきだ', 'should; ought to do', 'N3', 'exp'],
  ['っけ', 'っけ', 'wasn\'t it?; what was it again? (recollection particle)', 'N3', 'prt'],
  ['フォルダ', 'フォルダ', 'folder (computer/file)', 'N3', 'n'],
  ['スマートフォン', 'スマートフォン', 'smartphone', 'N4', 'n'],
  ['おもしろそう', 'おもしろそう', 'looks interesting; sounds fun', 'N4', 'adj-na']
];
for (const [w, r, m, l, pos] of coreFunctional) {
  lexicon.set(w, { w, r, m, l, pos });
}

console.log(`Lexicon ready with ${lexicon.size} entries.`);

// 2. Generate 102 Kanji Reading (問題1), 102 Orthography (問題2), and 170 Context Vocab (問題3) questions
const vocabN3 = allVocabByLevel.n3;

// Phonological distractor generator for 問題1 (漢字読み)
function makeReadingDistractors(reading) {
  const candidates = new Set();

  // 1. Long/short vowel flips (おう <-> お, う drop/add, きょう <-> きょ)
  if (reading.includes('う')) {
    candidates.add(reading.replace(/([おこそとのほもよろごぞどぼぽ])う/, '$1'));
    candidates.add(reading.replace(/([きしちにひみりぎじびぴ][ょゅ])う/, '$1'));
  }
  candidates.add(reading.replace(/([おこそとのほもよろごぞどぼぽ])(?!う)/, '$1う'));
  candidates.add(reading.replace(/([きしちにひみりぎじびぴ][ょゅ])(?!う)/, '$1う'));

  // 2. Voicing / Rendaku flips (濁音 <-> 清音)
  const dakutenPairs = [
    ['ك', ''], ['か', 'が'], ['き', 'ぎ'], ['く', 'ぐ'], ['け', 'げ'], ['こ', 'ご'],
    ['さ', 'ざ'], ['し', 'じ'], ['す', 'ず'], ['せ', 'ぜ'], ['そ', 'ぞ'],
    ['た', 'だ'], ['ち', 'ぢ'], ['つ', 'づ'], ['て', 'で'], ['と', 'ど'],
    ['は', 'ば'], ['ひ', 'び'], ['ふ', 'ぶ'], ['へ', 'べ'], ['ほ', 'ぼ'],
    ['ば', 'ぱ'], ['び', 'ぴ'], ['ぶ', 'ぷ'], ['べ', 'ぺ'], ['ぼ', 'ぽ'],
    ['しゃ', 'じゃ'], ['しゅ', 'じゅ'], ['しょ', 'じょ'],
    ['ちゃ', 'ぢゃ'], ['ちゅ', 'ぢゅ'], ['ちょ', 'ぢょ'],
    ['ひゃ', 'びゃ'], ['ひゅ', 'びゅ'], ['ひょ', 'びょ']
  ];
  for (const [a, b] of dakutenPairs) {
    if (!b) continue;
    if (reading.includes(a)) candidates.add(reading.replace(a, b));
    if (reading.includes(b)) candidates.add(reading.replace(b, a));
  }

  // 3. Geminate っ (促音) or ん (撥音) toggle
  if (reading.includes('っ')) {
    candidates.add(reading.replace('っ', ''));
    candidates.add(reading.replace('っ', 'つ'));
  } else if (reading.length >= 3) {
    candidates.add(reading[0] + 'っ' + reading.slice(1));
  }
  if (reading.includes('ん')) {
    candidates.add(reading.replace('ん', ''));
  }

  // 4. e <-> i or o <-> a vowel shift on first kanji
  if (reading.includes('せ')) candidates.add(reading.replace('せ', 'し'));
  if (reading.includes('し')) candidates.add(reading.replace('し', 'せ'));
  if (reading.includes('со')) candidates.add(reading.replace('そ', 'さ'));

  candidates.delete(reading);
  const valid = [...candidates].filter(c => c && c.length >= 2 && c !== reading);

  // Pad if needed with subtle variations
  const fallbacks = [
    reading + 'う',
    reading.slice(0, -1) + 'い',
    reading.slice(0, -1) + 'ん',
    reading[0] + 'う' + reading.slice(1)
  ];
  for (const f of fallbacks) {
    if (valid.length >= 3) break;
    if (f !== reading && !valid.includes(f)) valid.push(f);
  }
  return valid.slice(0, 3);
}

// Kanji orthography distractor generator for 問題2 (表記)
function makeKanjiDistractors(word) {
  const chars = [...word];
  const candidates = new Set();

  // Find kanji with matching on'yomi or similar strokes/grade
  for (let idx = 0; idx < chars.length; idx++) {
    const ch = chars[idx];
    const kInfo = kanjiMap.get(ch);
    const sameOnyomi = allKanjiN3N4.filter(
      k => k.character !== ch && k.onyomi && kInfo?.onyomi && k.onyomi.some(o => kInfo.onyomi.includes(o))
    );
    const pool = sameOnyomi.length >= 3 ? sameOnyomi : allKanjiN3N4.filter(k => k.character !== ch);
    for (let i = 0; i < Math.min(pool.length, 6); i++) {
      const replacement = pool[(idx * 7 + i * 13 + word.charCodeAt(0)) % pool.length].character;
      const copy = [...chars];
      copy[idx] = replacement;
      const cand = copy.join('');
      if (cand !== word) candidates.add(cand);
    }
  }
  return [...candidates].slice(0, 3);
}

// Filter clean multi-kanji N3 words with example sentences
const kanjiCandidates = vocabN3.filter(
  v =>
    /^[\u4e00-\u9faf]{2,4}$/.test(v.word) &&
    v.reading &&
    v.reading.length >= 3 &&
    Array.isArray(v.examples) &&
    v.examples.some(ex => ex.ja.includes(v.word) && ex.ja.length >= 14 && ex.ja.length <= 52)
);

// Select 102 for 問題1 (漢字読み) and 102 different ones for 問題2 (表記)
const mondai1Pool = [];
const mondai2Pool = [];
const usedWords = new Set();

for (const item of kanjiCandidates) {
  if (usedWords.has(item.word)) continue;
  const ex = item.examples.find(e => e.ja.includes(item.word) && e.ja.length >= 14 && e.ja.length <= 52);
  if (!ex) continue;

  if (mondai1Pool.length < 102) {
    usedWords.add(item.word);
    const distractors = makeReadingDistractors(item.reading);
    const ansIdx = mondai1Pool.length % 4;
    const options = [...distractors];
    options.splice(ansIdx, 0, item.reading);
    mondai1Pool.push({
      sentence: ex.ja.replace(item.word, `<u>${item.word}</u>`),
      target: item.word,
      reading: item.reading,
      options,
      answer: ansIdx,
      explanation: `「${item.word}」 is read 「${item.reading}」 (${item.meanings.slice(0, 3).join('; ')}). Sentence: "${ex.en}"`
    });
  } else if (mondai2Pool.length < 102 && /^[\u4e00-\u9faf]{2}$/.test(item.word)) {
    usedWords.add(item.word);
    const distractors = makeKanjiDistractors(item.word);
    const ansIdx = mondai2Pool.length % 4;
    const options = [...distractors];
    options.splice(ansIdx, 0, item.word);
    mondai2Pool.push({
      sentence: ex.ja.replace(item.word, `<u>${item.reading}</u>`),
      target: item.reading,
      kanji: item.word,
      options,
      answer: ansIdx,
      explanation: `「${item.reading}」 in this context is written as 「${item.word}」 (${item.meanings.slice(0, 3).join('; ')}). Sentence: "${ex.en}"`
    });
  }
}

// Select 170 for 問題3 (文脈規定 — Context Vocabulary)
const contextCandidates = vocabN3.filter(
  v =>
    !usedWords.has(v.word) &&
    v.word.length >= 2 &&
    Array.isArray(v.examples) &&
    v.examples.some(ex => ex.ja.includes(v.word) && ex.ja.length >= 16 && ex.ja.length <= 55)
);

const byPos = {};
for (const v of vocabN3) {
  const p = (v.pos && v.pos[0]) || 'n';
  if (!byPos[p]) byPos[p] = [];
  byPos[p].push(v);
}

const mondai3Pool = [];
for (let i = 0; i < contextCandidates.length && mondai3Pool.length < 170; i++) {
  const item = contextCandidates[i];
  const ex = item.examples.find(e => e.ja.includes(item.word) && e.ja.length >= 16 && e.ja.length <= 55);
  if (!ex) continue;
  usedWords.add(item.word);
  const p = (item.pos && item.pos[0]) || 'n';
  const samePosPool = (byPos[p] && byPos[p].length >= 10 ? byPos[p] : vocabN3).filter(
    x => x.word !== item.word && x.meanings[0] !== item.meanings[0]
  );
  const distractors = [
    samePosPool[(i * 5 + 3) % samePosPool.length],
    samePosPool[(i * 11 + 17) % samePosPool.length],
    samePosPool[(i * 19 + 31) % samePosPool.length]
  ];
  const ansIdx = mondai3Pool.length % 4;
  const optionObjs = [...distractors];
  optionObjs.splice(ansIdx, 0, item);

  const optionDetails = optionObjs
    .map((o, idx) => `${idx + 1}. ${o.word}（${o.reading}）= ${o.meanings.slice(0, 2).join(', ')}`)
    .join(' / ');

  mondai3Pool.push({
    sentence: ex.ja.replace(item.word, '（　　）'),
    options: optionObjs.map(o => o.word),
    answer: ansIdx,
    explanation: `Correct: 「${item.word}（${item.reading}）」 (${item.meanings.slice(0, 3).join('; ')}). "${ex.en}" — Options: ${optionDetails}`
  });
}

console.log(`Generated Vocab Pools: Mondai1=${mondai1Pool.length}, Mondai2=${mondai2Pool.length}, Mondai3=${mondai3Pool.length}`);

// 3. Build Kuromoji Tokenizer to pre-tokenize and index every word used across all 34 exams!
console.log('Initializing Kuromoji morphological analyzer...');
const tokenizer = await new Promise((resolve, reject) => {
  kuromoji
    .builder({ dicPath: '/home/thickropes/jlpt-n3-prep/node_modules/kuromoji/dict' })
    .build((err, tk) => (err ? reject(err) : resolve(tk)));
});

const usedDictionary = {}; // key -> { w, r, m, l, pos }
const intlSegmenter = new Intl.Segmenter('ja', { granularity: 'word' });

function lookupEntryWithFallbacks(surface, basic) {
  let entry = lexicon.get(surface) || (basic && basic !== '*' ? lexicon.get(basic) : null);

  // Strip polite prefix お / ご if present (e.g. ご利用 -> 利用, お持ち -> 持ち/持つ)
  if (!entry && /^[おご御].+/.test(surface) && surface.length >= 2) {
    const stripped = surface.slice(1);
    const sub = lexicon.get(stripped);
    if (sub) {
      const prefixRead = surface[0] === 'ご' ? 'ご' : 'お';
      entry = {
        w: surface,
        r: prefixRead + sub.r,
        m: `(polite) ${sub.m}`,
        l: sub.l || 'N3',
        pos: sub.pos
      };
    }
  }

  // If basic ends with する, try stripping する
  if (!entry && basic && basic.endsWith('する') && basic.length > 2) {
    const stem = basic.slice(0, -2);
    entry = lexicon.get(stem);
  }

  // Try matching verb/adj stem by adding u-endings if surface is a bare stem (like 伴 -> 伴う, くだ -> くださる)
  if (!entry && surface.length >= 1) {
    for (const suf of ['う', 'く', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る', 'ぐ', 'い', 'さる']) {
      const cand = surface + suf;
      if (lexicon.has(cand)) {
        entry = lexicon.get(cand);
        break;
      }
    }
  }

  return entry;
}

function registerWordInBundle(surface, basic, kataReading, posMajor) {
  const cleanSurface = surface.trim();
  if (!cleanSurface || /^[0-9０-９a-zA-Z]+$/.test(cleanSurface)) return;
  const hiraReading = kataToHira(kataReading || cleanSurface);

  let entry = lookupEntryWithFallbacks(cleanSurface, basic);

  // If single kanji or compound not found, compose meaning from constituent kanji
  if (!entry && /[\u4e00-\u9faf]/.test(cleanSurface)) {
    const kChars = [...cleanSurface].filter(c => kanjiMap.has(c));
    if (kChars.length > 0) {
      const kMeanings = kChars
        .map(c => `${c} (${(kanjiMap.get(c).meanings || []).slice(0, 2).join(', ')})`)
        .join(' + ');
      const kLevel = kanjiMap.get(kChars[0])?.level || 'N3';
      entry = {
        w: basic && basic !== '*' ? basic : cleanSurface,
        r: hiraReading,
        m: kMeanings,
        l: kLevel,
        pos: posMajor
      };
    }
  }

  if (entry) {
    // Only overwrite if previous entry was a fallback without a real meaning
    const existing = usedDictionary[cleanSurface];
    if (!existing || existing.m.startsWith('Tap ')) {
      usedDictionary[cleanSurface] = {
        w: entry.w || (basic && basic !== '*' ? basic : cleanSurface),
        r: entry.r || hiraReading,
        m: entry.m,
        l: entry.l || '',
        p: entry.pos || posMajor
      };
    }
    if (basic && basic !== '*' && !usedDictionary[basic]) {
      const baseEntry = lexicon.get(basic) || entry;
      usedDictionary[basic] = {
        w: baseEntry.w || basic,
        r: baseEntry.r || hiraReading,
        m: baseEntry.m,
        l: baseEntry.l || '',
        p: baseEntry.pos || posMajor
      };
    }
  } else if (/[\u3040-\u30ff\u4e00-\u9faf]/.test(cleanSurface) && !usedDictionary[cleanSurface]) {
    usedDictionary[cleanSurface] = {
      w: basic && basic !== '*' ? basic : cleanSurface,
      r: hiraReading,
      m: 'Tap "Open in jpdb.io" for full breakdown',
      l: '',
      p: posMajor
    };
  }
}

function indexText(text) {
  if (!text || typeof text !== 'string') return;
  const plain = text.replace(/<\/?u>/g, ' ');
  const tokens = tokenizer.tokenize(plain);

  // Track character offsets of kuromoji tokens
  let offset = 0;
  const kSpans = tokens.map(t => {
    const start = offset;
    const end = start + t.surface_form.length;
    offset = end;
    return { ...t, start, end };
  });

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.pos === '記号') continue;
    registerWordInBundle(t.surface_form, t.basic_form, t.reading, t.pos);

    if (i + 1 < tokens.length && tokens[i + 1].pos !== '記号') {
      const twoSurf = t.surface_form + tokens[i + 1].surface_form;
      const twoBase = t.surface_form + (tokens[i + 1].basic_form !== '*' ? tokens[i + 1].basic_form : tokens[i + 1].surface_form);
      const twoRead = (t.reading || t.surface_form) + (tokens[i + 1].reading || tokens[i + 1].surface_form);
      if (lexicon.has(twoSurf) || lexicon.has(twoBase) || /^[おご御]/.test(t.surface_form)) {
        registerWordInBundle(twoSurf, lexicon.has(twoSurf) ? twoSurf : twoBase, twoRead, t.pos);
      }
      if ((t.pos === '動詞' || t.pos === '形容詞') && (tokens[i + 1].pos === '助動詞' || tokens[i + 1].pos_detail_1 === '接続助詞')) {
        registerWordInBundle(twoSurf, t.basic_form, twoRead, t.pos);
      }
    }
    if (i + 2 < tokens.length && tokens[i + 1].pos !== '記号' && tokens[i + 2].pos !== '記号') {
      const threeSurf = t.surface_form + tokens[i + 1].surface_form + tokens[i + 2].surface_form;
      const threeRead = (t.reading || '') + (tokens[i + 1].reading || '') + (tokens[i + 2].reading || '');
      if (lexicon.has(threeSurf)) {
        registerWordInBundle(threeSurf, threeSurf, threeRead, t.pos);
      }
    }
  }

  // Also index every Intl.Segmenter word segment using overlapping kuromoji token(s)
  for (const seg of intlSegmenter.segment(plain)) {
    if (!seg.isWordLike) continue;
    const sStart = seg.index;
    const sEnd = sStart + seg.segment.length;
    const overlapping = kSpans.filter(k => k.start < sEnd && k.end > sStart);
    const primary = overlapping.find(k => k.pos !== '接頭詞' && k.pos !== '記号') || overlapping[0];
    const combinedRead = overlapping.map(k => k.reading || k.surface_form).join('');
    registerWordInBundle(
      seg.segment,
      primary?.basic_form || seg.segment,
      combinedRead || primary?.reading || seg.segment,
      primary?.pos || 'n'
    );
  }
}

// 4. Assemble the 34 Daily 1-Hour Scaled JLPT N3 Papers (Mon Nov 2, 2026 -> Sat Dec 5, 2026)
const DAYS_COUNT = 34;
const START_DATE = new Date('2026-11-02T00:00:00Z');
const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAYS_JA = ['日', '月', '火', '水', '木', '金', '土'];

const exams = [];

for (let d = 0; d < DAYS_COUNT; d++) {
  const dateObj = new Date(START_DATE.getTime() + d * 86400000);
  const isoDate = dateObj.toISOString().slice(0, 10); // YYYY-MM-DD
  const month = dateObj.getUTCMonth() + 1;
  const dayOfMonth = dateObj.getUTCDate();
  const dowEn = WEEKDAYS_EN[dateObj.getUTCDay()];
  const dowJa = WEEKDAYS_JA[dateObj.getUTCDay()];

  const m1Items = mondai1Pool.slice(d * 3, d * 3 + 3);
  const m2Items = mondai2Pool.slice(d * 3, d * 3 + 3);
  const m3Items = mondai3Pool.slice(d * 5, d * 5 + 5);
  const m4Items = SYNONYM_QUESTIONS.slice(d * 2, d * 2 + 2);
  const m5Items = USAGE_QUESTIONS.slice(d * 2, d * 2 + 2);

  const g1Items = GRAMMAR_SENTENCE_QUESTIONS.slice(d * 5, d * 5 + 5);
  const g2Items = STAR_QUESTIONS.slice(d * 2, d * 2 + 2);
  const clozeItem = CLOZE_PASSAGES[d];

  const shortItems = SHORT_PASSAGES.slice(d * 2, d * 2 + 2);
  const midItem = MEDIUM_PASSAGES[d];
  const longItem = LONG_PASSAGES[d];
  const infoItem = INFO_RETRIEVAL_PASSAGES[d];

  const listeningItems = LISTENING_SETS[d];

  let qNum = 1;
  const questions = [];

  // SECTION 1: 文字・語彙 (15 Qs: Q1..Q15)
  for (const item of m1Items) {
    questions.push({
      qNum: qNum++,
      section: 'vocab',
      mondaiId: 'v-m1',
      mondaiTitle: '問題1　＿＿＿の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。',
      prompt: item.sentence,
      targetWord: item.target,
      hideTargetReading: true,
      options: item.options,
      answer: item.answer,
      explanation: item.explanation
    });
  }
  for (const item of m2Items) {
    questions.push({
      qNum: qNum++,
      section: 'vocab',
      mondaiId: 'v-m2',
      mondaiTitle: '問題2　＿＿＿の言葉を漢字で書くとき、最もよいものを、１・２・３・４から一つ選びなさい。',
      prompt: item.sentence,
      targetWord: item.target,
      options: item.options,
      answer: item.answer,
      explanation: item.explanation
    });
  }
  for (const item of m3Items) {
    questions.push({
      qNum: qNum++,
      section: 'vocab',
      mondaiId: 'v-m3',
      mondaiTitle: '問題3　（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。',
      prompt: item.sentence,
      options: item.options,
      answer: item.answer,
      explanation: item.explanation
    });
  }
  for (const item of m4Items) {
    questions.push({
      qNum: qNum++,
      section: 'vocab',
      mondaiId: 'v-m4',
      mondaiTitle: '問題4　＿＿＿の言葉に意味が最も近いものを、１・２・３・４から一つ選びなさい。',
      prompt: item.sentence,
      targetWord: item.target,
      options: item.options,
      answer: item.answer,
      explanation: item.explanation
    });
  }
  for (const item of m5Items) {
    questions.push({
      qNum: qNum++,
      section: 'vocab',
      mondaiId: 'v-m5',
      mondaiTitle: '問題5　次の言葉の使い方として最もよいものを、１・２・３・４から一つ選びなさい。',
      prompt: `【 ${item.word} 】`,
      options: item.options,
      answer: item.answer,
      explanation: item.explanation
    });
  }

  // SECTION 2 PART A: 文法 (10 Qs: Q16..Q25)
  for (const item of g1Items) {
    questions.push({
      qNum: qNum++,
      section: 'grammar',
      mondaiId: 'g-m1',
      mondaiTitle: '問題1　次の文の（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。',
      prompt: item.sentence,
      options: item.options,
      answer: item.answer,
      explanation: item.explanation
    });
  }
  for (const item of g2Items) {
    questions.push({
      qNum: qNum++,
      section: 'grammar',
      mondaiId: 'g-m2',
      mondaiTitle: '問題2　次の文の ＿＿ に入る最もよいものを、１・２・３・４から一つ選びなさい。',
      type: 'star',
      prefix: item.prefix,
      suffix: item.suffix,
      starPosition: item.starPosition,
      correctOrder: item.correctOrder,
      prompt: `${item.prefix} ${[1, 2, 3, 4].map(pos => (pos === item.starPosition ? '＿★＿' : '＿＿')).join(' ')} ${item.suffix}`,
      options: item.options,
      answer: item.answer,
      explanation: item.explanation
    });
  }
  // 問題3 文章の文法 (Cloze passage: Q23, Q24, Q25)
  clozeItem.questions.forEach((cq, idx) => {
    questions.push({
      qNum: qNum++,
      section: 'grammar',
      mondaiId: 'g-m3',
      mondaiTitle: '問題3　次の文章を読んで、文章全体の趣旨を踏まえて、[ 23 ] から [ 25 ] の中に入る最もよいものを、１・２・３・４から一つ選びなさい。',
      passageGroupId: `day-${d + 1}-cloze`,
      passageText: idx === 0 ? clozeItem.passage : null,
      prompt: `${cq.blank} に入る最もよいものを選びなさい。`,
      options: cq.options,
      answer: cq.answer,
      explanation: cq.explanation
    });
  });

  // SECTION 2 PART B: 読解 (8 Qs: Q26..Q33)
  // 問題4 短文 (2 passages: Q26, Q27)
  shortItems.forEach((sp, idx) => {
    questions.push({
      qNum: qNum++,
      section: 'reading',
      mondaiId: 'r-m4',
      mondaiTitle: '問題4　次の（1）・（2）の文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つ選びなさい。',
      passageGroupId: `day-${d + 1}-short-${idx + 1}`,
      passageLabel: `（${idx + 1}）`,
      passageTitle: sp.title || null,
      passageStyle: sp.style || 'essay',
      passageText: sp.passage,
      prompt: sp.question,
      options: sp.options,
      answer: sp.answer,
      explanation: sp.explanation
    });
  });

  // 問題5 中文 (1 passage, 2 Qs: Q28, Q29)
  midItem.questions.forEach((mq, idx) => {
    questions.push({
      qNum: qNum++,
      section: 'reading',
      mondaiId: 'r-m5',
      mondaiTitle: '問題5　次の文章を読んで、後の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つ選びなさい。',
      passageGroupId: `day-${d + 1}-mid`,
      passageTitle: idx === 0 ? midItem.title : null,
      passageText: idx === 0 ? midItem.passage : null,
      prompt: mq.prompt,
      options: mq.options,
      answer: mq.answer,
      explanation: mq.explanation
    });
  });

  // 問題6 長文 (1 passage, 2 Qs: Q30, Q31)
  longItem.questions.forEach((lq, idx) => {
    questions.push({
      qNum: qNum++,
      section: 'reading',
      mondaiId: 'r-m6',
      mondaiTitle: '問題6　次の文章を読んで、後の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つ選びなさい。',
      passageGroupId: `day-${d + 1}-long`,
      passageTitle: idx === 0 ? longItem.title : null,
      passageText: idx === 0 ? longItem.passage : null,
      prompt: lq.prompt,
      options: lq.options,
      answer: lq.answer,
      explanation: lq.explanation
    });
  });

  // 問題7 情報検索 (1 flyer + table, 2 Qs: Q32, Q33)
  infoItem.questions.forEach((iq, idx) => {
    questions.push({
      qNum: qNum++,
      section: 'reading',
      mondaiId: 'r-m7',
      mondaiTitle: '問題7　右のページは、案内やのお知らせです。これを読んで、後の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つ選びなさい。',
      passageGroupId: `day-${d + 1}-info`,
      passageTitle: idx === 0 ? infoItem.title : null,
      passageText: idx === 0 ? infoItem.intro : null,
      passageTable: idx === 0 ? infoItem.table : null,
      passageNotes: idx === 0 ? infoItem.notes : null,
      prompt: iq.prompt,
      options: iq.options,
      answer: iq.answer,
      explanation: iq.explanation
    });
  });

  // SECTION 3: 聴解 (7 Qs: Q34..Q40)
  listeningItems.forEach(lq => {
    questions.push({
      qNum: qNum++,
      section: 'listening',
      mondaiId: `l-${lq.mondai.slice(0, 3)}`,
      mondaiTitle: `聴解 ${lq.mondai}　音声を聞いて、最もよいものを一つ選びなさい。`,
      listeningIntro: lq.intro,
      dialogue: lq.dialogue,
      prompt: lq.question,
      options: lq.options,
      answer: lq.answer,
      explanation: lq.explanation
    });
  });

  // Index all text in this day's exam for our offline dictionary bundle
  for (const q of questions) {
    indexText(q.mondaiTitle);
    indexText(q.passageTitle);
    indexText(q.passageText);
    indexText(q.passageNotes);
    if (q.passageTable) {
      q.passageTable.headers.forEach(indexText);
      q.passageTable.rows.forEach(r => r.forEach(indexText));
    }
    indexText(q.listeningIntro);
    if (q.dialogue) q.dialogue.forEach(line => indexText(line.text));
    indexText(q.prompt);
    q.options.forEach(indexText);
  }

  exams.push({
    day: d + 1,
    date: isoDate,
    labelEn: `${dowEn}, ${dayOfMonth} Nov 2026`.replace('Nov', month === 11 ? 'Nov' : 'Dec'),
    labelJa: `${month}月${dayOfMonth}日（${dowJa}）`,
    durationSeconds: 3600, // 60 minutes (1 hour)
    totalQuestions: questions.length,
    questions
  });
}

// Also ensure all N3 & N4 vocab words are included in usedDictionary for complete coverage
for (const lvl of ['n3', 'n4', 'n5']) {
  for (const v of allVocabByLevel[lvl]) {
    if (!usedDictionary[v.word]) {
      usedDictionary[v.word] = {
        w: v.word,
        r: v.reading || v.word,
        m: (v.meanings || []).slice(0, 4).join('; '),
        l: v.level || lvl.toUpperCase(),
        p: (v.pos || [])[0] || 'n'
      };
    }
  }
}

fs.writeFileSync(path.join(OUT_DIR, 'exams.json'), JSON.stringify(exams));
fs.writeFileSync(path.join(OUT_DIR, 'dictionary.json'), JSON.stringify(usedDictionary));

console.log(`Built ${exams.length} daily exams (${exams[0].totalQuestions} Qs/day = ${exams.length * exams[0].totalQuestions} total Qs).`);
console.log(`Built offline dictionary bundle with ${Object.keys(usedDictionary).length} indexed Japanese words/tokens.`);
