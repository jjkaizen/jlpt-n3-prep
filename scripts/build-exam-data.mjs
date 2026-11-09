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

import { N4_SHORT_PASSAGES } from './banks-n4/bank-n4-reading-short.mjs';
import { N4_MEDIUM_PASSAGES, N4_LONG_PASSAGES } from './banks-n4/bank-n4-reading-medium-long.mjs';
import { N4_INFO_RETRIEVAL_PASSAGES, N4_CLOZE_PASSAGES } from './banks-n4/bank-n4-info-and-cloze.mjs';
import {
  N4_SYNONYM_QUESTIONS,
  N4_USAGE_QUESTIONS,
  N4_GRAMMAR_SENTENCE_QUESTIONS,
  N4_STAR_QUESTIONS,
  N4_LISTENING_SETS
} from './banks-n4/bank-n4-special-drills.mjs';

const DATA_TMP = '/tmp/opencode/jlpt-data';
const OUT_DIR = '/home/thickropes/jlpt-n3-prep/src/data';
const PUBLIC_DATA_DIR = '/home/thickropes/jlpt-n3-prep/public/data';
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });

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

// Reusable Vocab Pool Builder (Mondai 1: 102 Qs, Mondai 2: 102 Qs, Mondai 3: 170 Qs)
function generateVocabPools(vocabPoolList) {
  const kCands = vocabPoolList.filter(
    v =>
      /[\u4e00-\u9faf]/.test(v.word) &&
      v.word.length >= 2 &&
      v.reading &&
      v.reading.length >= 2 &&
      Array.isArray(v.examples) &&
      v.examples.some(ex => ex.ja.includes(v.word) && ex.ja.length >= 10 && ex.ja.length <= 55)
  );

  const m1Pool = [];
  const m2Pool = [];
  const used = new Set();

  for (const item of kCands) {
    if (used.has(item.word)) continue;
    const ex = item.examples.find(e => e.ja.includes(item.word) && e.ja.length >= 10 && e.ja.length <= 55);
    if (!ex) continue;

    if (m1Pool.length < 102) {
      used.add(item.word);
      const distractors = makeReadingDistractors(item.reading);
      const ansIdx = m1Pool.length % 4;
      const options = [...distractors];
      options.splice(ansIdx, 0, item.reading);
      m1Pool.push({
        sentence: ex.ja.replace(item.word, `<u>${item.word}</u>`),
        target: item.word,
        reading: item.reading,
        meanings: item.meanings,
        options,
        answer: ansIdx,
        explanation: `「${item.word}」 is read 「${item.reading}」 (${item.meanings.slice(0, 3).join('; ')}). Sentence: "${ex.en}"`
      });
    } else if (m2Pool.length < 102 && /^[\u4e00-\u9faf]{2}$/.test(item.word)) {
      used.add(item.word);
      const distractors = makeKanjiDistractors(item.word);
      const ansIdx = m2Pool.length % 4;
      const options = [...distractors];
      options.splice(ansIdx, 0, item.word);
      m2Pool.push({
        sentence: ex.ja.replace(item.word, `<u>${item.reading}</u>`),
        target: item.reading,
        kanji: item.word,
        meanings: item.meanings,
        options,
        answer: ansIdx,
        explanation: `「${item.reading}」 in this context is written as 「${item.word}」 (${item.meanings.slice(0, 3).join('; ')}). Sentence: "${ex.en}"`
      });
    }
  }

  const ctxCands = vocabPoolList.filter(
    v =>
      !used.has(v.word) &&
      v.word.length >= 2 &&
      Array.isArray(v.examples) &&
      v.examples.some(ex => ex.ja.includes(v.word) && ex.ja.length >= 10 && ex.ja.length <= 58)
  );

  const byPosMap = {};
  for (const v of vocabPoolList) {
    const p = (v.pos && v.pos[0]) || 'n';
    if (!byPosMap[p]) byPosMap[p] = [];
    byPosMap[p].push(v);
  }

  const m3Pool = [];
  for (let i = 0; i < ctxCands.length && m3Pool.length < 170; i++) {
    const item = ctxCands[i];
    const ex = item.examples.find(e => e.ja.includes(item.word) && e.ja.length >= 10 && e.ja.length <= 58);
    if (!ex) continue;
    used.add(item.word);
    const p = (item.pos && item.pos[0]) || 'n';
    const samePosPool = (byPosMap[p] && byPosMap[p].length >= 10 ? byPosMap[p] : vocabPoolList).filter(
      x => x.word !== item.word && x.meanings[0] !== item.meanings[0]
    );
    const distractors = [
      samePosPool[(i * 5 + 3) % samePosPool.length],
      samePosPool[(i * 11 + 17) % samePosPool.length],
      samePosPool[(i * 19 + 31) % samePosPool.length]
    ];
    const ansIdx = m3Pool.length % 4;
    const optionObjs = [...distractors];
    optionObjs.splice(ansIdx, 0, item);

    const optionDetails = optionObjs
      .map((o, idx) => `${idx + 1}. ${o.word}（${o.reading}）= ${o.meanings.slice(0, 2).join(', ')}`)
      .join(' / ');

    m3Pool.push({
      sentence: ex.ja.replace(item.word, '（　　）'),
      options: optionObjs.map(o => o.word),
      optionObjs,
      answer: ansIdx,
      explanation: `Correct: 「${item.word}（${item.reading}）」 (${item.meanings.slice(0, 3).join('; ')}). "${ex.en}" — Options: ${optionDetails}`
    });
  }

  return { m1Pool, m2Pool, m3Pool };
}

const n3VocabPools = generateVocabPools(allVocabByLevel.n3);
const n4VocabPools = generateVocabPools([...allVocabByLevel.n4, ...allVocabByLevel.n5]);
const mondai1Pool = n3VocabPools.m1Pool;
const mondai2Pool = n3VocabPools.m2Pool;
const mondai3Pool = n3VocabPools.m3Pool;

console.log(`Generated N3 Vocab Pools: Mondai1=${mondai1Pool.length}, Mondai2=${mondai2Pool.length}, Mondai3=${mondai3Pool.length}`);
console.log(`Generated N4 Vocab Pools: Mondai1=${n4VocabPools.m1Pool.length}, Mondai2=${n4VocabPools.m2Pool.length}, Mondai3=${n4VocabPools.m3Pool.length}`);

// Build reverse reading -> words lookup and grammar pattern lookup for Process of Elimination (消去法)
const readingToWords = new Map();
for (const lvl of ['n5', 'n4', 'n3', 'n2']) {
  for (const v of allVocabByLevel[lvl]) {
    if (v.reading && v.word !== v.reading) {
      if (!readingToWords.has(v.reading)) readingToWords.set(v.reading, []);
      readingToWords.get(v.reading).push(`${v.word} (${(v.meanings || []).slice(0, 2).join(', ')})`);
    }
  }
}

const grammarPatternNotes = new Map();
for (const lvl of ['n5', 'n4', 'n3', 'n2']) {
  const gPath = path.join(DATA_TMP, `grammar-${lvl}.json`);
  if (fs.existsSync(gPath)) {
    const glist = JSON.parse(fs.readFileSync(gPath, 'utf8'));
    for (const g of glist) {
      const cleanPat = (g.pattern || '')
        .replace(/^.*?\+\s*/, '')
        .replace(/[〜～()（）]/g, '')
        .trim();
      if (cleanPat && cleanPat.length >= 2) {
        grammarPatternNotes.set(cleanPat, `${g.meaning_en} (${g.formation || lvl.toUpperCase()})`);
      }
    }
  }
}

const extraGrammarGlossary = [
  ['おかげで', 'thanks to (positive cause/outcome; cannot be used for bad outcomes)'],
  ['せいで', 'because of / due to (blaming a negative outcome; clashes with positive results)'],
  ['くせに', 'even though / despite (expresses criticism or contempt toward a person)'],
  ['ために', 'in order to (purpose) OR because of (objective cause)'],
  ['うちに', 'while still in that state / before a change happens'],
  ['あいだに', 'during the time span when an event occurs'],
  ['間は', 'throughout the entire period while a state continues'],
  ['最中に', 'right in the middle/height of doing something when an interruption happens'],
  ['たびに', 'every single time X happens (habitual/repeated occurrence)'],
  ['ことになっている', 'it is an established rule, schedule, or official arrangement that...'],
  ['ことにしている', 'I make it a personal habit/resolution to do...'],
  ['ようになっている', 'is designed/structured so that... (system/mechanism)'],
  ['ようにしている', 'trying/making an effort to do... regularly'],
  ['わけではない', 'it does not mean that... / not necessarily all (partial negation)'],
  ['とは限らない', 'is not always true / does not necessarily mean (exception to a generalization)'],
  ['に違いない', 'must be / no doubt that (strong speaker conviction)'],
  ['はずがない', 'cannot possibly be / impossible that (strong negative certainty)'],
  ['しかない', 'have no choice but to do...'],
  ['ことはない', 'there is no need to... (reassurance: 心配することはない)'],
  ['べきだ', 'should / moral or logical obligation'],
  ['っぱなし', 'leaving something undone/open/on improperly'],
  ['ついでに', 'while incidentally doing something else on the way'],
  ['たとたん', 'the very instant/moment an action completed, something unexpected happened'],
  ['かわりに', 'instead of / in exchange for / to make up for'],
  ['代わりに', 'instead of / in exchange for / to make up for'],
  ['にもかかわらず', 'despite / in spite of (formal contrast)'],
  ['に対して', 'in contrast to OR toward/regarding a target'],
  ['に関して', 'regarding / concerning / related to (topic marker)'],
  ['によって', 'by means of / depending on / due to / passive agent'],
  ['にとって', 'from the standpoint of / for someone (evaluation)'],
  ['に比べて', 'compared to'],
  ['したがって', 'therefore / consequently (logical result of previous sentence)'],
  ['それに対して', 'on the other hand / in contrast to that (contrasting two subjects)'],
  ['つまり', 'in other words / to sum up (restating or concluding)'],
  ['ところが', 'however / contrary to expectation (surprising reversal)'],
  ['なぜなら', 'because / the reason is (always pairs with 〜からだ at sentence end)'],
  ['しかも', 'moreover / furthermore (adding a second point in the same direction)'],
  ['そこで', 'so / therefore (taking purposeful action in response to a situation)'],
  ['すると', 'thereupon / and right then (automatic sequence or discovery)'],
  ['ただし', 'however / provided that (adds a condition or exception to the rule)'],
  ['なお', 'furthermore / please note that (adds supplemental administrative info)'],
  ['たとえば', 'for example (introduces a concrete illustration)'],
  ['それとも', 'or else (choosing between alternatives in a question)'],
  ['それでも', 'even so / nevertheless'],
  ['だからといって', 'just because... does not mean that...'],
  ['ば〜ほど', 'the more X, the more Y (proportional change)'],
  ['くらいなら', 'rather than doing X (unacceptable option), I would rather...'],
  ['てたまらない', 'unbearably / extremely (intense spontaneous feeling)'],
  ['ずにはいられない', 'cannot help doing / cannot resist'],
  ['かねない', 'might well happen (risk of a negative outcome)'],
  ['恐れがある', 'there is a danger/fear that (formal warning)']
];
for (const [k, v] of extraGrammarGlossary) {
  grammarPatternNotes.set(k, v);
}

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

// Helper to summarize content words in a Japanese phrase/option for Process of Elimination
function summarizeOptionWords(text, excludeWord = '') {
  const plain = String(text || '').replace(/<\/?u>/g, '');
  if (!plain) return '';
  const direct = lookupEntryWithFallbacks(plain, plain);
  if (direct && direct.m && !direct.m.startsWith('Tap ')) {
    return `${plain}（${direct.r}）= "${direct.m}"`;
  }
  const tokens = tokenizer.tokenize(plain);
  const parts = [];
  const seen = new Set();
  for (const t of tokens) {
    if (t.pos === '記号' || t.pos === '助詞' || t.pos === '助動詞') continue;
    const base = t.basic_form && t.basic_form !== '*' ? t.basic_form : t.surface_form;
    if (base === excludeWord || t.surface_form === excludeWord || seen.has(base)) continue;
    const entry = lookupEntryWithFallbacks(t.surface_form, base);
    if (entry && entry.m && !entry.m.startsWith('Tap ')) {
      seen.add(base);
      parts.push(`${base}（${entry.r}）= "${entry.m.split(';')[0]}"`);
    }
    if (parts.length >= 3) break;
  }
  return parts.join(', ');
}

function findGrammarNote(optText) {
  const clean = String(optText || '').trim();
  if (grammarPatternNotes.has(clean)) return grammarPatternNotes.get(clean);
  for (const [k, v] of grammarPatternNotes.entries()) {
    if (clean.includes(k) || k.includes(clean)) return v;
  }
  const gloss = summarizeOptionWords(clean);
  return gloss || null;
}

function buildOptionReasons(q, meta = {}) {
  return q.options.map((opt, idx) => {
    const isCorrect = idx === q.answer;
    const rightOpt = q.options[q.answer];

    // 1. 問題1 漢字読み (Kanji Reading)
    if (q.mondaiId === 'v-m1') {
      if (isCorrect) {
        return `✓ CORRECT: 「${q.targetWord}」 is read 「${opt}」 (${(meta.meanings || []).slice(0, 3).join('; ')}).`;
      }
      const issues = [];
      if (opt.length !== rightOpt.length) {
        issues.push(
          opt.length > rightOpt.length
            ? `adds an extra vowel/mora（「${opt}」 vs correct 「${rightOpt}」 — long-vowel trap）`
            : `drops a vowel/mora（「${opt}」 vs correct 「${rightOpt}」 — short-vowel trap）`
        );
      }
      if (opt.includes('っ') !== rightOpt.includes('っ')) {
        issues.push(`confuses the geminate double consonant っ（「${opt}」 vs 「${rightOpt}」）`);
      }
      if (issues.length === 0) {
        issues.push(`phonological voicing (濁音/清音) or on'yomi reading trap for 「${q.targetWord}」 (correct reading is 「${rightOpt}」)`);
      }
      const otherMatches = (readingToWords.get(opt) || []).filter(w => !w.startsWith(q.targetWord));
      const homophoneNote = otherMatches.length
        ? ` Note: 「${opt}」 is the reading for ${otherMatches.slice(0, 2).join(' / ')}.`
        : '';
      return `✗ ELIMINATED: ${issues.join('; ')}.${homophoneNote}`;
    }

    // 2. 問題2 表記 (Orthography / Kana -> Kanji)
    if (q.mondaiId === 'v-m2') {
      const kBreakdown = [...opt]
        .map(ch => {
          const ki = kanjiMap.get(ch);
          return ki ? `${ch} (${(ki.meanings || []).slice(0, 2).join('/')})` : ch;
        })
        .join(' + ');
      if (isCorrect) {
        return `✓ CORRECT: 「${q.targetWord}」 is written 「${opt}」 [${kBreakdown}].`;
      }
      const wrongChars = [];
      for (let c = 0; c < opt.length; c++) {
        if (opt[c] !== rightOpt[c]) {
          const wInfo = kanjiMap.get(opt[c]);
          const rInfo = kanjiMap.get(rightOpt[c]);
          wrongChars.push(
            `uses 「${opt[c]}」 (${(wInfo?.meanings || ['different kanji']).slice(0, 2).join('/')}) instead of 「${rightOpt[c]}」 (${(rInfo?.meanings || []).slice(0, 2).join('/')})`
          );
        }
      }
      return `✗ ELIMINATED: Homophone / lookalike kanji trap — ${wrongChars.join(' and ')} [${kBreakdown}].`;
    }

    // 3. 問題3 文脈規定 & 問題4 言い換え類義
    if (q.mondaiId === 'v-m3' || q.mondaiId === 'v-m4') {
      const optObj = meta.optionObjs?.[idx];
      const gloss = optObj
        ? `「${optObj.word}（${optObj.reading}）」 = "${optObj.meanings.slice(0, 3).join('; ')}"`
        : summarizeOptionWords(opt) || `「${opt}」`;
      if (isCorrect) {
        return `✓ CORRECT: ${gloss} — fits the exact meaning required here.`;
      }
      return `✗ ELIMINATED: ${gloss} — does not match the meaning/context of the sentence.`;
    }

    // 4. 問題5 用法 (Word Usage in Context)
    if (q.mondaiId === 'v-m5') {
      const contextGloss = summarizeOptionWords(opt, meta.word);
      if (isCorrect) {
        return `✓ CORRECT USAGE: Uses 「${meta.word}（${meta.reading} = ${meta.meaning}）」 in its natural collocation${
          contextGloss ? ` (${contextGloss})` : ''
        }.`;
      }
      return `✗ ELIMINATED: Unnatural collocation for 「${meta.word}（${meta.meaning}）」 in this clause${
        contextGloss ? ` [Context words: ${contextGloss}]` : ''
      } — violates the usage restriction explained below.`;
    }

    // 5. 文法 問題1 (Sentence Grammar) & 問題3 (Cloze Grammar)
    if (q.mondaiId === 'g-m1' || q.mondaiId === 'g-m3') {
      const gNote = findGrammarNote(opt);
      if (isCorrect) {
        return `✓ CORRECT: 「${opt}」${gNote ? ` (${gNote})` : ''} matches both the grammatical connection and the sentence logic.`;
      }
      return `✗ ELIMINATED: 「${opt}」${
        gNote ? ` means "${gNote}"` : ''
      } — clashes with the sentence's grammar attachment, register, or cause/effect direction.`;
    }

    // 6. 文法 問題2 ★ 文の組み立て (Star Sentence Scramble)
    if (q.mondaiId === 'g-m2') {
      const slotPos = (q.correctOrder || []).indexOf(idx) + 1;
      const orderedText = (q.correctOrder || []).map(i => q.options[i]).join(' → ');
      if (isCorrect) {
        return `✓ CORRECT (Lands in ★ Slot ${q.starPosition}): Full order is [${orderedText}], placing 「${opt}」 squarely in Slot ${q.starPosition}.`;
      }
      return `✗ ELIMINATED (Belongs in Slot ${slotPos}, NOT ★ Slot ${q.starPosition}): In the correct order [${orderedText}], 「${opt}」 must go in position ${slotPos} to satisfy Japanese modifier/particle syntax.`;
    }

    // 7. 読解 (Reading) & 聴解 (Listening)
    const optTerms = summarizeOptionWords(opt);
    const refText = String(q.passageText || '') + ' ' + String(q.passageNotes || '') + ' ' + (q.dialogue || []).map(d => d.text).join(' ');
    const tokens = tokenizer.tokenize(opt).filter(t => t.pos === '名詞' || t.pos === '動詞' || t.pos === '形容詞');
    const matchedKeywords = tokens.filter(t => t.surface_form.length >= 2 && refText.includes(t.surface_form)).map(t => t.surface_form);

    if (isCorrect) {
      return `✓ CORRECT: Accurately paraphrases the main point / condition in the text${
        optTerms ? ` [Key terms: ${optTerms}]` : ''
      }.`;
    }
    const trapLabel =
      matchedKeywords.length > 0
        ? `Keyword-Bait Trap (reuses 「${[...new Set(matchedKeywords)].slice(0, 2).join('・')}」 from the text, but twists the condition/reason/timing)`
        : `Contradicts or is not stated in the passage/dialogue`;
    return `✗ ELIMINATED — ${trapLabel}${optTerms ? ` [Option vocabulary: ${optTerms}]` : ''}.`;
  });
}
const DAYS_COUNT = 34;
const START_DATE = new Date('2026-11-02T00:00:00Z');
const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAYS_JA = ['日', '月', '火', '水', '木', '金', '土'];

function assembleExamsForLevel(cfg) {
  const levelExams = [];

  for (let d = 0; d < DAYS_COUNT; d++) {
    const dateObj = new Date(START_DATE.getTime() + d * 86400000);
    const isoDate = dateObj.toISOString().slice(0, 10);
    const month = dateObj.getUTCMonth() + 1;
    const dayOfMonth = dateObj.getUTCDate();
    const dowEn = WEEKDAYS_EN[dateObj.getUTCDay()];
    const dowJa = WEEKDAYS_JA[dateObj.getUTCDay()];

    // 30-Minute Scaled Paper (20 Questions Total)
    // Section 1: Vocab (7 Qs: 2 m1, 1 m2, 2 m3, 1 m4, 1 m5)
    const m1Items = cfg.m1Pool.slice(d * 2, d * 2 + 2);
    const m2Items = cfg.m2Pool.slice(d, d + 1);
    const m3Items = cfg.m3Pool.slice(d * 2, d * 2 + 2);
    const m4Items = cfg.synonyms.slice(d, d + 1);
    const m5Items = cfg.usages.slice(d, d + 1);

    // Section 2A: Grammar (5 Qs: 3 g1, 1 star, 1 cloze)
    const g1Items = cfg.grammarSentences.slice(d * 3, d * 3 + 3);
    const g2Items = cfg.stars.slice(d, d + 1);
    const clozeItem = cfg.clozes[d];

    // Section 2B: Reading (4 Qs: 1 short, 1 mid/long essay with 2 Qs, 1 info retrieval with 1 Q)
    const shortItem = cfg.shorts[d];
    const useLongToday = d % 2 === 1;
    const essayItem = useLongToday ? cfg.longs[d] : cfg.mediums[d];
    const infoItem = cfg.infos[d];

    // Section 3: Listening (4 Qs from the 7 pre-generated daily audio items: indices 0, 2, 4, 5 -> audio q34, q36, q38, q39)
    const listeningDaySet = cfg.listeningSets[d];
    const selectedListeningIndices = [0, 2, 4, 5];

    let qNum = 1;
    const questions = [];

    // SECTION 1: 文字・語彙 (7 Qs: Q1..Q7)
    for (const item of m1Items) {
      const q = {
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
      };
      q.optionReasons = buildOptionReasons(q, item);
      questions.push(q);
    }
    for (const item of m2Items) {
      const q = {
        qNum: qNum++,
        section: 'vocab',
        mondaiId: 'v-m2',
        mondaiTitle: '問題2　＿＿＿の言葉を漢字で書くとき、最もよいものを、１・２・３・４から一つ選びなさい。',
        prompt: item.sentence,
        targetWord: item.target,
        options: item.options,
        answer: item.answer,
        explanation: item.explanation
      };
      q.optionReasons = buildOptionReasons(q, item);
      questions.push(q);
    }
    for (const item of m3Items) {
      const q = {
        qNum: qNum++,
        section: 'vocab',
        mondaiId: 'v-m3',
        mondaiTitle: '問題3　（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。',
        prompt: item.sentence,
        options: item.options,
        answer: item.answer,
        explanation: item.explanation
      };
      q.optionReasons = buildOptionReasons(q, item);
      questions.push(q);
    }
    for (const item of m4Items) {
      const q = {
        qNum: qNum++,
        section: 'vocab',
        mondaiId: 'v-m4',
        mondaiTitle: '問題4　＿＿＿の言葉に意味が最も近いものを、１・２・３・４から一つ選びなさい。',
        prompt: item.sentence,
        targetWord: item.target,
        options: item.options,
        answer: item.answer,
        explanation: item.explanation
      };
      q.optionReasons = buildOptionReasons(q, item);
      questions.push(q);
    }
    for (const item of m5Items) {
      const q = {
        qNum: qNum++,
        section: 'vocab',
        mondaiId: 'v-m5',
        mondaiTitle: '問題5　次の言葉の使い方として最もよいものを、１・２・３・４から一つ選びなさい。',
        prompt: `【 ${item.word} 】`,
        options: item.options,
        answer: item.answer,
        explanation: item.explanation
      };
      q.optionReasons = buildOptionReasons(q, item);
      questions.push(q);
    }

    // SECTION 2 PART A: 文法 (5 Qs: Q8..Q12)
    for (const item of g1Items) {
      const q = {
        qNum: qNum++,
        section: 'grammar',
        mondaiId: 'g-m1',
        mondaiTitle: '問題1　次の文の（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。',
        prompt: item.sentence,
        options: item.options,
        answer: item.answer,
        explanation: item.explanation
      };
      q.optionReasons = buildOptionReasons(q, item);
      questions.push(q);
    }
    for (const item of g2Items) {
      const q = {
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
      };
      q.optionReasons = buildOptionReasons(q, item);
      questions.push(q);
    }
    // 問題3 文章の文法 (1 Cloze question: Q12)
    {
      const cq0 = clozeItem.questions[0];
      const cq1 = clozeItem.questions[1];
      const cq2 = clozeItem.questions[2];
      const adaptedClozePassage = clozeItem.passage
        .replace('[ 23 ]', '[ 12 ]')
        .replace('[ 24 ]', cq1 ? cq1.options[cq1.answer] : '')
        .replace('[ 25 ]', cq2 ? cq2.options[cq2.answer] : '');
      const q = {
        qNum: qNum++,
        section: 'grammar',
        mondaiId: 'g-m3',
        mondaiTitle: '問題3　次の文章を読んで、文章全体の趣旨を踏まえて、[ 12 ] の中に入る最もよいものを、１・２・３・４から一つ選びなさい。',
        passageGroupId: `${cfg.level}-day-${d + 1}-cloze`,
        passageText: adaptedClozePassage,
        prompt: '[ 12 ] に入る最もよいものを選びなさい。',
        options: cq0.options,
        answer: cq0.answer,
        explanation: cq0.explanation
      };
      q.optionReasons = buildOptionReasons(q, cq0);
      questions.push(q);
    }

    // SECTION 2 PART B: 読解 (4 Qs: Q13..Q16)
    // Q13: 問題4 短文 (1 passage, 1 Q)
    {
      const q = {
        qNum: qNum++,
        section: 'reading',
        mondaiId: 'r-m4',
        mondaiTitle: '問題4　次の文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つ選びなさい。',
        passageGroupId: `${cfg.level}-day-${d + 1}-short-1`,
        passageTitle: shortItem.title || null,
        passageStyle: shortItem.style || 'essay',
        passageText: shortItem.passage,
        prompt: shortItem.question,
        options: shortItem.options,
        answer: shortItem.answer,
        explanation: shortItem.explanation
      };
      q.optionReasons = buildOptionReasons(q, shortItem);
      questions.push(q);
    }

    // Q14 & Q15: 問題5 中文/長文 (1 passage, 2 Qs)
    essayItem.questions.forEach((eq, idx) => {
      const q = {
        qNum: qNum++,
        section: 'reading',
        mondaiId: useLongToday ? 'r-m6' : 'r-m5',
        mondaiTitle: `問題5　次の文章（${useLongToday ? '長文' : '中文'}）を読んで、後の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つ選びなさい。`,
        passageGroupId: `${cfg.level}-day-${d + 1}-essay`,
        passageTitle: idx === 0 ? essayItem.title : null,
        passageText: idx === 0 ? essayItem.passage : null,
        prompt: eq.prompt,
        options: eq.options,
        answer: eq.answer,
        explanation: eq.explanation
      };
      q.optionReasons = buildOptionReasons({ ...q, passageText: essayItem.passage }, eq);
      questions.push(q);
    });

    // Q16: 問題6 情報検索 (1 flyer + table, 1 Q)
    {
      const iq = infoItem.questions[0];
      const q = {
        qNum: qNum++,
        section: 'reading',
        mondaiId: 'r-m7',
        mondaiTitle: '問題6　次の案内やのお知らせを読んで、後の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つ選びなさい。',
        passageGroupId: `${cfg.level}-day-${d + 1}-info`,
        passageTitle: infoItem.title || null,
        passageText: infoItem.intro || null,
        passageTable: infoItem.table || null,
        passageNotes: infoItem.notes || null,
        prompt: iq.prompt,
        options: iq.options,
        answer: iq.answer,
        explanation: iq.explanation
      };
      q.optionReasons = buildOptionReasons({ ...q, passageText: infoItem.intro, passageNotes: infoItem.notes }, iq);
      questions.push(q);
    }

    // SECTION 3: 聴解 (4 Qs: Q17..Q20)
    selectedListeningIndices.forEach(origIdx => {
      const lq = listeningDaySet[origIdx];
      const origAudioQNum = 34 + origIdx;
      const curQNum = qNum++;
      const q = {
        qNum: curQNum,
        section: 'listening',
        mondaiId: `l-${lq.mondai.slice(0, 3)}`,
        mondaiTitle: `聴解 ${lq.mondai}　音声を聞いて、最もよいものを一つ選びなさい。`,
        audioFile: `./${cfg.audioFolder}/d${d + 1}-q${origAudioQNum}.mp3`,
        listeningIntro: lq.intro,
        dialogue: lq.dialogue,
        prompt: lq.question,
        options: lq.options,
        answer: lq.answer,
        explanation: lq.explanation
      };
      q.optionReasons = buildOptionReasons(q, lq);
      questions.push(q);
    });

    levelExams.push({
      level: cfg.level,
      day: d + 1,
      date: isoDate,
      labelEn: `${dowEn}, ${dayOfMonth} Nov 2026`.replace('Nov', month === 11 ? 'Nov' : 'Dec'),
      labelJa: `${month}月${dayOfMonth}日（${dowJa}）`,
      durationSeconds: 1800, // 30 minutes (half hour)
      totalQuestions: questions.length,
      questions
    });
  }

  return levelExams;
}

const examsN3 = assembleExamsForLevel({
  level: 'N3',
  audioFolder: 'audio',
  m1Pool: n3VocabPools.m1Pool,
  m2Pool: n3VocabPools.m2Pool,
  m3Pool: n3VocabPools.m3Pool,
  synonyms: SYNONYM_QUESTIONS,
  usages: USAGE_QUESTIONS,
  grammarSentences: GRAMMAR_SENTENCE_QUESTIONS,
  stars: STAR_QUESTIONS,
  clozes: CLOZE_PASSAGES,
  shorts: SHORT_PASSAGES,
  mediums: MEDIUM_PASSAGES,
  longs: LONG_PASSAGES,
  infos: INFO_RETRIEVAL_PASSAGES,
  listeningSets: LISTENING_SETS
});

const examsN4 = assembleExamsForLevel({
  level: 'N4',
  audioFolder: 'audio-n4',
  m1Pool: n4VocabPools.m1Pool,
  m2Pool: n4VocabPools.m2Pool,
  m3Pool: n4VocabPools.m3Pool,
  synonyms: N4_SYNONYM_QUESTIONS,
  usages: N4_USAGE_QUESTIONS,
  grammarSentences: N4_GRAMMAR_SENTENCE_QUESTIONS,
  stars: N4_STAR_QUESTIONS,
  clozes: N4_CLOZE_PASSAGES,
  shorts: N4_SHORT_PASSAGES,
  mediums: N4_MEDIUM_PASSAGES,
  longs: N4_LONG_PASSAGES,
  infos: N4_INFO_RETRIEVAL_PASSAGES,
  listeningSets: N4_LISTENING_SETS
});

// Build Unlimited Anki-Style Flashcard Decks for N3 and N4
function buildDeckForLevel(level, levelExams, synonymsBank, usagesBank, grammarBank, openJlptVocab) {
  const cards = [];
  const seenWords = new Set();
  let cardSeq = 1;

  const addCard = ({ w, r, m, cat, day, qNum, ja, en, note }) => {
    const cleanW = String(w || '').trim();
    if (!cleanW) return;
    const normKey = cleanW.replace(/^[〜～\s]+/, '');
    const readMeanKey = `${String(r || cleanW).trim()}::${String(m || '').split(';')[0].trim().toLowerCase()}`;
    if (seenWords.has(normKey) || (m && seenWords.has(readMeanKey))) return;
    seenWords.add(normKey);
    if (m) seenWords.add(readMeanKey);
    cards.push({
      id: `${level.toLowerCase()}-c${cardSeq++}`,
      w: cleanW,
      r: r || cleanW,
      m: m || '',
      cat: cat || 'vocab', // 'kanji' | 'adverb_grammar' | 'vocab'
      day: day || null,
      qNum: qNum || null,
      ja: ja || '',
      en: en || '',
      note: note || ''
    });
  };

  // 1. Extract directly from the 34 Daily Exam Papers (so every exam question has a linked card!)
  for (const exam of levelExams) {
    for (const q of exam.questions) {
      if (q.mondaiId === 'v-m1') {
        // Kanji reading
        const rightReading = q.options[q.answer];
        const entry = lexicon.get(q.targetWord);
        addCard({
          w: q.targetWord,
          r: rightReading,
          m: entry?.m || q.explanation,
          cat: 'kanji',
          day: exam.day,
          qNum: q.qNum,
          ja: q.prompt,
          en: q.explanation,
          note: `Trap readings in exam: ${q.options.filter((_, i) => i !== q.answer).join(' / ')}`
        });
      } else if (q.mondaiId === 'v-m2') {
        // Kana -> Kanji
        const rightKanji = q.options[q.answer];
        const entry = lexicon.get(rightKanji);
        const kBreakdown = [...rightKanji]
          .map(ch => {
            const ki = kanjiMap.get(ch);
            return ki ? `${ch} (${(ki.meanings || []).slice(0, 2).join('/')})` : ch;
          })
          .join(' + ');
        addCard({
          w: rightKanji,
          r: q.targetWord,
          m: entry?.m || q.explanation,
          cat: 'kanji',
          day: exam.day,
          qNum: q.qNum,
          ja: q.prompt.replace(`<u>${q.targetWord}</u>`, `<u>${rightKanji}</u>`),
          en: q.explanation,
          note: `Kanji breakdown: ${kBreakdown} · Lookalike traps: ${q.options.filter((_, i) => i !== q.answer).join(' / ')}`
        });
      } else if (q.mondaiId === 'v-m3') {
        // Context vocab
        const rightWord = q.options[q.answer];
        const entry = lexicon.get(rightWord);
        addCard({
          w: rightWord,
          r: entry?.r || rightWord,
          m: entry?.m || q.explanation,
          cat: /^[\u4e00-\u9faf]{2,}$/.test(rightWord) ? 'kanji' : 'vocab',
          day: exam.day,
          qNum: q.qNum,
          ja: q.prompt.replace('（　　）', `<u>${rightWord}</u>`),
          en: q.explanation,
          note: `Day ${exam.day} · Q${q.qNum} Context Vocab`
        });
      } else if (q.mondaiId === 'v-m4') {
        // Synonym
        const rightSyn = q.options[q.answer];
        const entry = lexicon.get(q.targetWord);
        addCard({
          w: q.targetWord,
          r: entry?.r || q.targetWord,
          m: `${entry?.m ? entry.m + ' — ' : ''}Closest synonym: 「${rightSyn}」`,
          cat: 'adverb_grammar',
          day: exam.day,
          qNum: q.qNum,
          ja: q.prompt,
          en: q.explanation,
          note: `JLPT Synonym Match: ${q.targetWord} ＝ ${rightSyn}`
        });
      } else if (q.mondaiId === 'v-m5') {
        // Usage (用法)
        const targetW = q.prompt.replace(/[【】\s]/g, '');
        const entry = lexicon.get(targetW);
        const rightSentence = q.options[q.answer];
        addCard({
          w: targetW,
          r: entry?.r || targetW,
          m: entry?.m || q.explanation,
          cat: 'adverb_grammar',
          day: exam.day,
          qNum: q.qNum,
          ja: rightSentence,
          en: q.explanation,
          note: `用法 (Correct Usage in Context)`
        });
      } else if (q.mondaiId === 'g-m1' || q.mondaiId === 'g-m3') {
        // Grammar
        const rightGram = q.options[q.answer];
        const gNote = findGrammarNote(rightGram);
        addCard({
          w: rightGram,
          r: rightGram,
          m: gNote || q.explanation,
          cat: 'adverb_grammar',
          day: exam.day,
          qNum: q.qNum,
          ja: q.prompt.replace('（　　）', `<u>${rightGram}</u>`).replace('[ 12 ]', `<u>${rightGram}</u>`),
          en: q.explanation,
          note: `Day ${exam.day} · Q${q.qNum} Grammar Pattern`
        });
      }
    }
  }

  // 2. Add remaining curated Usage, Synonym, and Grammar items from our banks
  for (const u of usagesBank) {
    addCard({
      w: u.word,
      r: u.reading,
      m: u.meaning,
      cat: 'adverb_grammar',
      day: null,
      qNum: null,
      ja: u.options[u.answer],
      en: u.explanation,
      note: '用法 (Word Usage Collocation)'
    });
  }

  for (const s of synonymsBank) {
    const entry = lexicon.get(s.target);
    const rightSyn = s.options[s.answer];
    addCard({
      w: s.target,
      r: entry?.r || s.target,
      m: `${entry?.m ? entry.m + ' · ' : ''}Synonym: 「${rightSyn}」`,
      cat: 'adverb_grammar',
      day: null,
      qNum: null,
      ja: s.sentence,
      en: s.explanation,
      note: `言い換え類義: ${s.target} ＝ ${rightSyn}`
    });
  }

  // 3. Add full OpenJLPT vocabulary with verified example sentences so the deck is a complete exam dictionary!
  for (const item of openJlptVocab) {
    const ex = (item.examples || [])[0];
    const isKanjiComp = /^[\u4e00-\u9faf]{2,4}$/.test(item.word);
    const isAdv = (item.pos || []).some(p => p.includes('adv') || p.includes('conj'));
    const cat = isAdv ? 'adverb_grammar' : isKanjiComp ? 'kanji' : 'vocab';
    const kBreakdown = isKanjiComp
      ? [...item.word]
          .map(ch => {
            const ki = kanjiMap.get(ch);
            return ki ? `${ch} (${(ki.meanings || []).slice(0, 2).join('/')})` : ch;
          })
          .join(' + ')
      : '';

    addCard({
      w: item.word,
      r: item.reading || item.word,
      m: (item.meanings || []).slice(0, 4).join('; '),
      cat,
      day: null,
      qNum: null,
      ja: ex ? ex.ja.replace(item.word, `<u>${item.word}</u>`) : `<u>${item.word}</u>`,
      en: ex ? ex.en : '',
      note: kBreakdown ? `Kanji: ${kBreakdown}` : `JLPT ${item.level || level} (${(item.pos || []).join(', ')})`
    });
  }

  return cards;
}

const deckN3 = buildDeckForLevel(
  'N3',
  examsN3,
  SYNONYM_QUESTIONS,
  USAGE_QUESTIONS,
  GRAMMAR_SENTENCE_QUESTIONS,
  allVocabByLevel.n3
);

const deckN4 = buildDeckForLevel(
  'N4',
  examsN4,
  N4_SYNONYM_QUESTIONS,
  N4_USAGE_QUESTIONS,
  N4_GRAMMAR_SENTENCE_QUESTIONS,
  [...allVocabByLevel.n4, ...allVocabByLevel.n5.slice(0, 350)]
);

fs.writeFileSync(path.join(OUT_DIR, 'exams.json'), JSON.stringify(examsN3));
fs.writeFileSync(path.join(OUT_DIR, 'exams-n3.json'), JSON.stringify(examsN3));
fs.writeFileSync(path.join(OUT_DIR, 'exams-n4.json'), JSON.stringify(examsN4));
fs.writeFileSync(path.join(PUBLIC_DATA_DIR, 'exams-n3.json'), JSON.stringify(examsN3));
fs.writeFileSync(path.join(PUBLIC_DATA_DIR, 'exams-n4.json'), JSON.stringify(examsN4));
fs.writeFileSync(path.join(PUBLIC_DATA_DIR, 'deck-n3.json'), JSON.stringify(deckN3));
fs.writeFileSync(path.join(PUBLIC_DATA_DIR, 'deck-n4.json'), JSON.stringify(deckN4));

console.log(`Built N3: ${examsN3.length} daily exams (${examsN3.length * 20} Qs) + ${deckN3.length} Anki flashcards`);
console.log(`Built N4: ${examsN4.length} daily exams (${examsN4.length * 20} Qs) + ${deckN4.length} Anki flashcards`);
