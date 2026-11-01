import fs from 'fs';
import path from 'path';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import * as gtts from 'google-tts-api';

const EXAMS_N4_PATH = '/home/thickropes/jlpt-n3-prep/public/data/exams-n4.json';
const AUDIO_N4_DIR = '/home/thickropes/jlpt-n3-prep/public/audio-n4';
fs.mkdirSync(AUDIO_N4_DIR, { recursive: true });

const examsN4 = JSON.parse(fs.readFileSync(EXAMS_N4_PATH, 'utf8'));

async function synthSegmentEdge(voice, text) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(text);
      const chunks = [];
      for await (const c of audioStream) chunks.push(c);
      const buf = Buffer.concat(chunks);
      if (buf.length > 200) return buf;
    } catch {
      await new Promise(r => setTimeout(r, 400 * (attempt + 1)));
    }
  }
  const b64 = await gtts.getAllAudioBase64(text, { lang: 'ja', slow: false });
  return Buffer.concat(b64.map(x => Buffer.from(x.base64, 'base64')));
}

async function buildQuestionMp3(day, q) {
  const filename = `d${day}-q${q.qNum}.mp3`;
  const outPath = path.join(AUDIO_N4_DIR, filename);
  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 1000) {
    return filename;
  }

  const parts = [];
  if (q.listeningIntro) {
    parts.push(await synthSegmentEdge('ja-JP-NanamiNeural', q.listeningIntro + '。'));
  }
  for (const turn of q.dialogue || []) {
    const voice = turn.speaker === 'M' ? 'ja-JP-KeitaNeural' : 'ja-JP-NanamiNeural';
    parts.push(await synthSegmentEdge(voice, turn.text));
  }
  if (q.prompt && !q.mondaiId?.includes('問題4')) {
    parts.push(await synthSegmentEdge('ja-JP-NanamiNeural', '質問。' + q.prompt));
  }

  const fullBuf = Buffer.concat(parts);
  fs.writeFileSync(outPath, fullBuf);
  return filename;
}

const tasks = [];
for (const exam of examsN4) {
  for (const q of exam.questions) {
    if (q.section === 'listening') {
      tasks.push({ day: exam.day, q });
    }
  }
}

console.log(`Generating ${tasks.length} N4 multi-speaker Japanese listening MP3s...`);
const CONCURRENCY = 6;
let completed = 0;

async function worker() {
  while (tasks.length > 0) {
    const item = tasks.shift();
    if (!item) break;
    await buildQuestionMp3(item.day, item.q);
    completed++;
    if (completed % 20 === 0 || completed === 238) {
      console.log(`N4 Audio Progress: ${completed} / 238 MP3s generated`);
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
console.log('All 238 N4 listening MP3 files generated successfully!');
