import fs from 'fs';
import path from 'path';

const OUT_PATH = '/home/thickropes/jlpt-n3-prep/src/data/jpdb-kanji-keywords.json';
const existing = fs.existsSync(OUT_PATH)
  ? JSON.parse(fs.readFileSync(OUT_PATH, 'utf8'))
  : {};

const d3 = JSON.parse(fs.readFileSync('/home/thickropes/jlpt-n3-prep/public/data/deck-n3.json', 'utf8'));
const d4 = JSON.parse(fs.readFileSync('/home/thickropes/jlpt-n3-prep/public/data/deck-n4.json', 'utf8'));

const allChars = new Set();
for (const c of [...d3, ...d4]) {
  for (const ch of c.w) {
    if (/[\u4e00-\u9faf]/.test(ch)) allChars.add(ch);
  }
}

const todo = [...allChars].filter(ch => !existing[ch]);
console.log(`Total unique Kanji: ${allChars.size}, remaining to fetch from jpdb.io: ${todo.length}`);

function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<[^>]+>/g, '')
    .trim();
}

async function fetchKeyword(ch) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`https://jpdb.io/kanji/${encodeURIComponent(ch)}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 14)' }
      });
      if (res.status === 429) {
        await new Promise(r => setTimeout(r, 1500 * (attempt + 1)));
        continue;
      }
      const html = await res.text();
      const m = html.match(/<h6[^>]*>Keyword<\/h6>\s*<div[^>]*>([\s\S]*?)<\/div>/i);
      if (m && m[1]) {
        return decodeEntities(m[1]);
      }
    } catch {
      await new Promise(r => setTimeout(r, 600 * (attempt + 1)));
    }
  }
  return null;
}

const CONCURRENCY = 12;
let done = 0;

async function worker() {
  while (todo.length > 0) {
    const ch = todo.shift();
    if (!ch) break;
    const kw = await fetchKeyword(ch);
    if (kw) {
      existing[ch] = kw;
    }
    done++;
    if (done % 100 === 0 || todo.length === 0) {
      fs.writeFileSync(OUT_PATH, JSON.stringify(existing, null, 2));
      console.log(`Fetched ${done} Kanji keywords from jpdb.io (saved ${Object.keys(existing).length})`);
    }
    await new Promise(r => setTimeout(r, 40));
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
fs.writeFileSync(OUT_PATH, JSON.stringify(existing, null, 2));
console.log(`Finished! Total jpdb.io Kanji keywords saved: ${Object.keys(existing).length}`);
