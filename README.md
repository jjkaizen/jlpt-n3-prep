# JLPT N3 · 1-Hour Daily Exam Trainer (Nov 2 – Dec 6, 2026)

A distraction-free, offline-capable web application built for **JLPT N3 preparation** leading up to **Sunday, 6 December 2026**.

## Features

1. **34 Daily 1-Hour Scaled N3 Exam Papers (`Mon 2 Nov` – `Sat 5 Dec`)**
   - Scaled from the official 140-minute JLPT N3 down to **60 minutes (40 questions/day)** in authentic proportions:
     - **Section 1: `言語知識（文字・語彙）` Vocabulary (15 Qs · ~15m)** — `漢字読み`, `表記`, `文脈規定`, `言い換え類義`, `用法`
     - **Section 2: `言語知識（文法）・読解` Grammar & Reading (18 Qs · ~30m)** — `文法形式`, `★ 文の組み立て`, `文章の文法`, `短文 (×2)`, `中文`, `長文`, `情報検索`
     - **Section 3: `聴解` Listening (7 Qs · ~15m)** — `課題理解`, `ポイント理解`, `概要理解`, `発話表現`, `即時応答` (with built-in dialogue audio + toggleable scripts)
2. **Start, Pause & Resume Anytime Throughout the Day**
   - Do 15–20 minutes in the morning, 20 minutes at lunch, and 20 minutes in the evening.
   - Every answer choice and your remaining timer save automatically to `localStorage`.
3. **1-Tap Word Lookup + Direct `jpdb.io` Integration**
   - Tap any Japanese word in any passage, question prompt, table, or answer choice to view its **Furigana reading**, **English definition**, **JLPT level**, and a 1-tap **`Open in jpdb.io ↗`** button.
4. **Score Progress Tracker (`0–180` Official Scaled Score)**
   - Grades each completed daily paper out of **180 points** (`60` Vocab/Grammar + `60` Reading + `60` Listening, with the **95-point overall pass line** and **19-point sectional minimums**).
   - Tracks your score trajectory day-by-day up to **December 6**.

## Local Development

```bash
npm install
npm run build:data   # Rebuild the 34 daily exams & offline dictionary bundle
npm run dev          # Start local dev server
npm run build        # Build static production bundle into ./docs for GitHub Pages
```
