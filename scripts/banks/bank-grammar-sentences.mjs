export const GRAMMAR_SENTENCE_QUESTIONS = [
  // Day 1 (1–5)
  {
    sentence: "昨日の夜、窓を開けた（　　）寝てしまったので、風邪をひいてしまった。",
    options: ["まま", "ばかり", "きり", "ところ"],
    answer: 0,
    pattern: "〜たまま",
    explanation: "「〜たまま」 means 'leaving a state unchanged after doing X'. Sentence: 'Because I fell asleep leaving the window open last night, I caught a cold.' 「ばかり」 means 'just did', 「きり」 implies nothing happened since, and 「ところ」 means 'just did'."
  },
  {
    sentence: "先生が丁寧に教えてくださった（　　）、無事に試験に合格することができました。",
    options: ["せいで", "おかげで", "くせに", "わりに"],
    answer: 1,
    pattern: "〜おかげで",
    explanation: "「〜おかげで」 expresses gratitude for a positive outcome ('thanks to'). Sentence: 'Thanks to the teacher kindly teaching me, I was able to pass the exam safely.' 「せいで」 is for negative results, 「くせに」 is critical ('despite'), and 「わりに」 means 'considering'."
  },
  {
    sentence: "後ろの席の人にもよく聞こえる（　　）、もう少し大きい声で話してください。",
    options: ["ために", "ことに", "ように", "そうに"],
    answer: 2,
    pattern: "〜ように（目的）",
    explanation: "「〜ように」 is used for purpose when the verb is a potential form or non-volitional state (聞こえる). Sentence: 'Please speak a bit louder so that people in the back seats can hear well too.' 「ために」 requires a volitional verb with the same subject."
  },
  {
    sentence: "この映画は子ども（　　）に作られたものだが、大人が見ても十分感動する。",
    options: ["向き", "まま", "がち", "向け"],
    answer: 3,
    pattern: "〜向け",
    explanation: "「〜向け」 means 'intended for / targeted at' and pairs with verbs of creation like 作られた. Sentence: 'This movie was made for children, but even adults are deeply moved when they watch it.' 「向き」 describes natural suitability rather than deliberate production."
  },
  {
    sentence: "玄関のドアを開けた（　　）、強い風が吹き込んできて帽子が飛ばされた。",
    options: ["とたん", "さいちゅう", "ついでに", "うちに"],
    answer: 0,
    pattern: "〜たとたん（に）",
    explanation: "「〜たとたん」 means 'the very moment X happened, Y unexpectedly occurred'. Sentence: 'The moment I opened the front door, a strong wind blew in and my hat was blown away.' 「さいちゅう」 means 'in the middle of', 「ついでに」 means 'while at it', and 「うちに」 means 'while'."
  },

  // Day 2 (6–10)
  {
    sentence: "健康の（　　）、毎朝３０分ジョギングをすることにした。",
    options: ["ように", "ために", "おかげで", "せいで"],
    answer: 1,
    pattern: "〜ために（目的）",
    explanation: "「名詞＋のために」 expresses 'for the sake of / for the purpose of'. Sentence: 'For my health, I decided to jog for 30 minutes every morning.' 「ように」 cannot follow `名詞＋の` for purpose, and 「おかげで」/「せいで」 express cause rather than purpose."
  },
  {
    sentence: "うちの息子は休みの日になると、勉強もしないでゲーム（　　）している。",
    options: ["だらけ", "きり", "ばかり", "だけ"],
    answer: 2,
    pattern: "〜ばかり",
    explanation: "「名詞＋ばかり」 or 「〜てばかりいる」 expresses 'doing nothing but X' with a critical nuance. Sentence: 'On holidays, my son does nothing but play games without studying.' 「だらけ」 means 'covered in', 「きり」 means 'only/since', and 「だけ」 lacks the repetitive complaint nuance."
  },
  {
    sentence: "台風で電車が全部止まってしまったので、歩いて帰る（　　）。",
    options: ["ことはない", "はずがない", "わけがない", "ほかない"],
    answer: 3,
    pattern: "〜（より）ほかない",
    explanation: "「〜ほかない」 means 'have no choice but to do X'. Sentence: 'Because all the trains stopped due to the typhoon, I have no choice but to walk home.' 「ことはない」 means 'no need to', and 「はずがない」/「わけがない」 mean 'impossible that'."
  },
  {
    sentence: "このレストランは値段の（　　）料理の量が多くて、味もとてもいい。",
    options: ["わりに", "くせに", "せいで", "ために"],
    answer: 0,
    pattern: "〜わりに（は）",
    explanation: "「〜わりに」 means 'considering X / relative to the standard of X'. Sentence: 'For its price, this restaurant has large portions and tastes great.' 「くせに」 is used to criticize a person, while 「せいで」 and 「ために」 express cause."
  },
  {
    sentence: "彼は全部知っている（　　）、何も知らないふりをして黙っていた。",
    options: ["ために", "くせに", "おかげで", "につれて"],
    answer: 1,
    pattern: "〜くせに",
    explanation: "「〜くせに」 means 'even though / despite' with a strong tone of criticism toward someone's behavior. Sentence: 'Even though he knew everything, he pretended to know nothing and stayed silent.' 「ために」 and 「おかげで」 express cause, and 「につれて」 means 'as X progresses'."
  },

  // Day 3 (11–15)
  {
    sentence: "スープが温かいうちに召し上がってください。冷めない（　　）どうぞ。",
    options: ["あいだに", "さいちゅうに", "うちに", "たびに"],
    answer: 2,
    pattern: "〜うちに",
    explanation: "「〜ないうちに」 means 'before a state changes / while the current state holds'. Sentence: 'Please enjoy the soup while it is warm. Please have it before it gets cold.' 「あいだに」 and 「さいちゅうに」 do not pair with `冷めない` to mean 'before it cools'."
  },
  {
    sentence: "私が留守の（　　）、宅配便の人が荷物を持ってきてくれたらしい。",
    options: ["うちに", "ながら", "たびに", "あいだに"],
    answer: 3,
    pattern: "〜あいだに",
    explanation: "「〜あいだに」 marks a time span during which a specific event occurred ('while I was away'). Sentence: 'Apparently the delivery person brought a package while I was out.' 「ながら」 requires the same subject, 「うちに」 implies acting before a state changes, and 「たびに」 means 'every time'."
  },
  {
    sentence: "会議の（　　）に突然携帯電話が鳴ってしまい、とても恥ずかしかった。",
    options: ["最中", "あいだ", "うち", "たび"],
    answer: 0,
    pattern: "〜最中に",
    explanation: "「〜最中に」 means 'right in the middle of (an activity at its peak)', often followed by an unexpected interruption. Sentence: 'Right in the middle of the meeting, my cell phone suddenly rang, and I was very embarrassed.'"
  },
  {
    sentence: "このアルバムの写真を見る（　　）、高校時代の楽しい思い出がよみがえる。",
    options: ["うちに", "たびに", "さいちゅうに", "とたんに"],
    answer: 1,
    pattern: "〜たびに",
    explanation: "「〜たびに」 means 'every time / whenever X happens'. Sentence: 'Every time I look at the photos in this album, happy memories from high school come back to me.' 「うちに」 means 'while', 「さいちゅうに」 means 'in the middle of', and 「とたんに」 takes the past tense."
  },
  {
    sentence: "甘いものが嫌いな（　　）けど、今はダイエット中なので食べないようにしている。",
    options: ["はずがない", "にちがいない", "わけではない", "わけがない"],
    answer: 2,
    pattern: "〜わけではない",
    explanation: "「〜わけではない」 partially denies an assumption ('it is not the case that...'). Sentence: 'It is not that I dislike sweet things, but since I am on a diet right now, I try not to eat them.' 「はずがない」 and 「わけがない」 mean 'impossible', and 「にちがいない」 means 'must be'."
  },

  // Day 4 (16–20)
  {
    sentence: "高価なものが必ずしも品質がいい（　　）。",
    options: ["わけがない", "にちがいない", "きまりだ", "とは限らない"],
    answer: 3,
    pattern: "〜とは限らない",
    explanation: "「〜とは限らない」 means 'not necessarily / not always true', often paired with 必ずしも. Sentence: 'Expensive things are not necessarily of good quality.' 「わけがない」 is a total denial ('no way'), and 「にちがいない」 means 'must be'."
  },
  {
    sentence: "あの真面目な田中さんが、大切な約束を忘れる（　　）。何か事情があるのだろう。",
    options: ["わけがない", "わけではない", "とは限らない", "きらいがある"],
    answer: 0,
    pattern: "〜わけがない",
    explanation: "「〜わけがない」 expresses strong denial ('there is no way that...'). Sentence: 'There is no way that serious Mr. Tanaka would forget an important promise. There must be some circumstances.' 「わけではない」 means 'not necessarily', which is too weak here."
  },
  {
    sentence: "朝から何も食べていないのだから、お腹が空いている（　　）。",
    options: ["わけがない", "にちがいない", "わけではない", "とは限らない"],
    answer: 1,
    pattern: "〜にちがいない",
    explanation: "「〜にちがいない」 expresses strong certainty ('must be / no doubt'). Sentence: 'Since he hasn't eaten anything since morning, he must be hungry.' The other options are negative or partial denials."
  },
  {
    sentence: "この法律により、来月から自転車に乗るときもヘルメットをかぶる（　　）。",
    options: ["ことにしている", "ようにしている", "ことになっている", "ようになっている"],
    answer: 2,
    pattern: "〜ことになっている",
    explanation: "「〜ことになっている」 expresses an official rule, law, or scheduled arrangement ('it is the rule that'). Sentence: 'Under this law, starting next month, one is required to wear a helmet when riding a bicycle.' 「ことにしている」 and 「ようにしている」 describe personal habits."
  },
  {
    sentence: "健康を維持するために、毎日野菜をたくさん食べる（　　）。",
    options: ["ことになっている", "ようになっている", "ことになった", "ようにしている"],
    answer: 3,
    pattern: "〜ようにしている",
    explanation: "「〜ようにしている」 expresses a conscious ongoing effort or habit ('make a point of doing'). Sentence: 'To maintain my health, I make a point of eating plenty of vegetables every day.' 「ことになっている」 is for external rules, and 「ようになっている」 describes how a mechanism works."
  },

  // Day 5 (21–25)
  {
    sentence: "このストーブは、倒れると自動的に火が消える（　　）。",
    options: ["ようになっている", "ようにしている", "ことにしている", "ことになっている"],
    answer: 0,
    pattern: "〜ようになっている",
    explanation: "「〜ようになっている」 describes the structure or mechanism of a device ('is designed so that'). Sentence: 'This heater is designed so that the fire goes out automatically if it tips over.' 「ことになっている」 is for social rules/schedules, not mechanical design."
  },
  {
    sentence: "来月から大阪の支店へ転勤する（　　）ので、引っ越しの準備をしている。",
    options: ["ことにした", "ことになった", "ようにした", "ようになった"],
    answer: 1,
    pattern: "〜ことになった",
    explanation: "「〜ことになった」 indicates that something has been decided by an external party or organization ('it has been decided that'). Sentence: 'It has been decided that I will transfer to the Osaka branch next month, so I am preparing to move.' 「ことにした」 is a personal decision."
  },
  {
    sentence: "毎日練習を続けた結果、ようやく３キロ泳げる（　　）。",
    options: ["ことにした", "ことになった", "ようになった", "ようにした"],
    answer: 2,
    pattern: "〜ようになった",
    explanation: "「〜ようになった」 expresses a gradual change in ability or state ('came to be able to'). Sentence: 'As a result of continuing daily practice, I finally became able to swim 3 kilometers.' Potential verbs like 泳げる take ようになった, not ことになった."
  },
  {
    sentence: "子どものころ、母によく嫌いなニンジンを（　　）。",
    options: ["食べられた", "食べるようになった", "食べていただいた", "食べさせられた"],
    answer: 3,
    pattern: "使役受身形（〜させられる）",
    explanation: "Causative-passive 「食べさせられた」 means 'was made/forced to eat'. Sentence: 'When I was a child, I was often made by my mother to eat carrots, which I disliked.' 「食べられた」 is passive/potential ('was eaten / could eat')."
  },
  {
    sentence: "電車の事故で、寒いホームで１時間も（　　）すっかり体が冷えてしまった。",
    options: ["待たされて", "待たせて", "待たれて", "待っておいて"],
    answer: 0,
    pattern: "使役受身形（〜される）",
    explanation: "For godan verbs, causative-passive contracts to 「〜される」: 待つ → 待たされる ('be made to wait'). Sentence: 'Due to a train accident, I was made to wait on the cold platform for a whole hour and my body got completely chilled.'"
  },

  // Day 6 (26–30)
  {
    sentence: "満員電車の中で隣の人に足を（　　）、とても痛かった。",
    options: ["踏まされて", "踏まれて", "踏ませて", "踏んであげて"],
    answer: 1,
    pattern: "受身形（〜れる・〜られる）",
    explanation: "Direct/suffering passive 「踏まれて」 ('had my foot stepped on') is used when someone performs an action on the speaker's body/possession. Sentence: 'In the crowded train, my foot was stepped on by the person next to me, and it really hurt.' 「踏まされて」 would mean 'was forced to step on'."
  },
  {
    sentence: "部長は来週の月曜日から金曜日まで、海外へ出張（　　）そうです。",
    options: ["いたす", "まいる", "なさる", "うかがう"],
    answer: 2,
    pattern: "尊敬語（〜なさる）",
    explanation: "「なさる」 is the honorific (尊敬語) equivalent of する, used to elevate the actions of a superior (部長). Sentence: 'I hear the department manager will go on a business trip abroad from Monday to Friday next week.' 「いたす」, 「まいる」, and 「うかがう」 are humble forms (謙譲語)."
  },
  {
    sentence: "先生のお荷物は、私が駅までお持ち（　　）。",
    options: ["なさいます", "になります", "くださいます", "いたします"],
    answer: 3,
    pattern: "謙譲語（お〜いたす）",
    explanation: "「お＋ますstem＋いたします」 is the humble form (謙譲語) used for the speaker's own action toward a respected person. Sentence: 'I will carry your luggage to the station, Professor.' The other options are honorific forms used for someone else's action."
  },
  {
    sentence: "「田中先生は今どちらに（　　）か。」「図書館におられますよ。」",
    options: ["いらっしゃいます", "まいります", "うかがいます", "おります"],
    answer: 0,
    pattern: "尊敬語（いらっしゃる）",
    explanation: "「いらっしゃる」 is the honorific (尊敬語) verb for いる/行く/来る. Sentence: '\"Where is Professor Tanaka right now?\" \"He is in the library.\"' 「まいります」, 「うかがいます」, and 「おります」 are humble forms."
  },
  {
    sentence: "先ほど先生が（　　）とおり、来週のテストは範囲がとても広いです。",
    options: ["申した", "おっしゃった", "申し上げた", "うかがった"],
    answer: 1,
    pattern: "尊敬語（おっしゃる）",
    explanation: "「おっしゃる」 is the honorific (尊敬語) verb for 言う. Sentence: 'Just as the teacher said earlier, next week's test covers a very wide range.' 「申した」 and 「申し上げた」 are humble forms for 'say', and 「うかがった」 is humble for 'ask/hear/visit'."
  },

  // Day 7 (31–35)
  {
    sentence: "先生がお書きになった本を（　　）、大変勉強になりました。",
    options: ["ご覧になって", "お目にかかって", "拝見して", "召し上がって"],
    answer: 2,
    pattern: "謙譲語（拝見する）",
    explanation: "「拝見する」 is the humble (謙譲語) verb for 見る/読む when viewing something belonging to or created by a respected person. Sentence: 'I read the book you wrote, Professor, and learned a great deal.' 「ご覧になって」 is honorific for 見る, 「お目にかかって」 is humble for 会う, and 「召し上がって」 is honorific for 食べる."
  },
  {
    sentence: "明日の午後、御社に（　　）よろしいでしょうか。",
    options: ["いらっしゃっても", "ご覧になっても", "おっしゃっても", "うかがっても"],
    answer: 3,
    pattern: "謙譲語（うかがう）",
    explanation: "「うかがう」 is the humble (謙譲語) verb for 行く/訪ねる/聞く. Sentence: 'Would it be all right if I visited your company tomorrow afternoon?' The other three options are honorific verbs that cannot be used for the speaker's own action."
  },
  {
    sentence: "外は地面が濡れているから、夜中に雨が降った（　　）。",
    options: ["ようだ", "そうだ", "らしいだ", "ぷりだ"],
    answer: 0,
    pattern: "〜ようだ（推量）",
    explanation: "「〜ようだ」 expresses an inference based on visual evidence ('it seems that'). Sentence: 'Because the ground outside is wet, it seems it rained during the night.' 「降ったそうだ」 is hearsay ('I heard it rained'), not direct visual inference, and 「らしいだ」 is ungrammatical."
  },
  {
    sentence: "天気予報によると、明日は一日中強い風が吹く（　　）。",
    options: ["ようだ", "そうだ", "みたいだ", "っぽい"],
    answer: 1,
    pattern: "〜そうだ（伝聞）",
    explanation: "Paired with 「〜によると」, 「普通形＋そうだ」 expresses hearsay ('I heard that / according to'). Sentence: 'According to the weather forecast, strong winds will blow all day tomorrow.' 「ようだ」 and 「みたいだ」 express personal conjecture rather than direct report."
  },
  {
    sentence: "そのかばん、本物の革（　　）見えるけど、実は合成皮革なんだよ。",
    options: ["ように", "そうに", "みたいに", "らしく"],
    answer: 2,
    pattern: "〜みたいに",
    explanation: "「名詞＋みたいに」 means 'like X' without needing の. Sentence: 'That bag looks like real leather, but it's actually synthetic leather.' 「ように」 would require `革のように`, 「そうに」 attaches to verb/adj stems, and 「らしく」 means 'befitting of' (actually being X)."
  },

  // Day 8 (36–40)
  {
    sentence: "今日は春（　　）ポカポカと暖かい一日になりそうです。",
    options: ["みたいに", "ように", "そうな", "らしい"],
    answer: 3,
    pattern: "〜らしい（典型）",
    explanation: "「名詞＋らしい」 means 'typical of / befitting' when X is actually that thing (here, it actually is spring). Sentence: 'Today looks like it will be a warm, sunny day typical of spring.' 「みたいに」 and 「ように」 compare two different things."
  },
  {
    sentence: "来週の旅行の（　　）、今のうちにホテルを予約しておこう。",
    options: ["ために", "ように", "せいに", "おかげに"],
    answer: 0,
    pattern: "〜ために",
    explanation: "「名詞＋のために」 means 'for the purpose of'. Sentence: 'Let's book the hotel now for next week's trip.' 「ように」 does not attach to `名詞＋の` to express purpose."
  },
  {
    sentence: "明日は会議があるから、資料を人数分コピーして（　　）ください。",
    options: ["あって", "おいて", "しまって", "みて"],
    answer: 1,
    pattern: "〜ておく",
    explanation: "「〜ておく」 means 'do something in advance as preparation'. Sentence: 'Since there is a meeting tomorrow, please copy enough handouts for everyone in advance.' 「てある」 is an intransitive state construction and does not take `〜てあってください`."
  },
  {
    sentence: "テーブルの上に、冷たい麦茶が用意して（　　）から、自由に飲んでくださいね。",
    options: ["います", "おきます", "あります", "しまいます"],
    answer: 2,
    pattern: "〜てある",
    explanation: "「他動詞＋てある」 describes a resulting state that was intentionally prepared ('has been prepared'). Sentence: 'Cold barley tea has been prepared on the table, so please drink freely.' Notice the object is marked by が."
  },
  {
    sentence: "ダイエット中なのに、おいしそうだったのでケーキを全部食べて（　　）。",
    options: ["おいた", "あった", "みた", "しまった"],
    answer: 3,
    pattern: "〜てしまう",
    explanation: "「〜てしまう」 expresses completion with regret ('ended up doing'). Sentence: 'Even though I'm on a diet, the cake looked so delicious that I ended up eating all of it.' 「おいた」 is preparation, 「あった」 is state, and 「みた」 is 'tried doing'."
  },

  // Day 9 (41–45)
  {
    sentence: "サイズが合うかどうかわからないので、一度この靴を履いて（　　）もいいですか。",
    options: ["みて", "おいて", "あって", "しまって"],
    answer: 0,
    pattern: "〜てみる",
    explanation: "「〜てみる」 means 'try doing X to see how it is'. Sentence: 'Since I don't know whether the size fits, may I try putting on these shoes once?' 「おいて」 is preparation, 「あって」 is state, and 「しまって」 is completion/regret."
  },
  {
    sentence: "少子化が進んで、これからますます子どもの数が減って（　　）だろう。",
    options: ["くる", "いく", "ある", "おく"],
    answer: 1,
    pattern: "〜ていく",
    explanation: "「〜ていく」 expresses a change continuing from the present into the future ('will continue to decrease'). Sentence: 'With the declining birthrate advancing, the number of children will likely continue to decrease more and more from now on.' 「てくる」 describes change from the past up to now."
  },
  {
    sentence: "３月に入ってから、少しずつ日差しが暖かくなって（　　）。",
    options: ["いった", "おいた", "きた", "あった"],
    answer: 2,
    pattern: "〜てくる",
    explanation: "「〜てくる」 describes a gradual change from the past up to the present ('has come to be / has gotten'). Sentence: 'Since entering March, the sunlight has gradually gotten warmer.' 「いった」 looks away from the present."
  },
  {
    sentence: "スマートフォンの画面を見（　　）歩くのは、大変危険なのでやめましょう。",
    options: ["あいだに", "うちに", "とたんに", "ながら"],
    answer: 3,
    pattern: "〜ながら",
    explanation: "「動詞ますstem＋ながら」 describes two simultaneous actions performed by the same subject ('walk while looking'). Sentence: 'Walking while looking at your smartphone screen is very dangerous, so let's stop doing it.'"
  },
  {
    sentence: "さっき昼ご飯を食べた（　　）なのに、もうお腹が空いてきた。",
    options: ["ばかり", "ところ", "最中", "あと"],
    answer: 0,
    pattern: "〜たばかり",
    explanation: "「〜たばかり」 expresses subjective recency ('just did') and commonly pairs with なのに. Sentence: 'Even though I just ate lunch a little while ago, I'm already getting hungry.' 「たところ」 denotes an exact clock moment and rarely precedes `なのに、もう〜` after some time has passed."
  },

  // Day 10 (46–50)
  {
    sentence: "「今どこですか。」「すみません、たった今、駅に着いた（　　）です。」",
    options: ["ばかり", "ところ", "まま", "きり"],
    answer: 1,
    pattern: "〜たところ",
    explanation: "「〜たところ」 expresses that an action was completed right this very moment (paired with たった今). Sentence: '\"Where are you now?\" \"Sorry, I have just arrived at the station right now.\"' 「まま」 and 「きり」 indicate an unchanged state."
  },
  {
    sentence: "「もしもし、今お時間よろしいですか。」「すみません、ちょうど今から出かける（　　）なんです。」",
    options: ["ばかり", "さいちゅう", "ところ", "とたん"],
    answer: 2,
    pattern: "〜るところ",
    explanation: "「辞書形＋ところ」 means 'just about to do X' (paired with ちょうど今から). Sentence: '\"Hello, do you have time now?\" \"I'm sorry, I am just about to head out right now.\"' 「ばかり」 and 「とたん」 follow the た-form, and 「さいちゅう」 means 'in the middle of'."
  },
  {
    sentence: "せっかく遠くから訪ねてきてくれた（　　）、留守にしていて会えなかった。",
    options: ["から", "ので", "ために", "のに"],
    answer: 3,
    pattern: "〜のに",
    explanation: "「〜のに」 expresses contrast with regret or disappointment ('even though'). Sentence: 'Even though he kindly came all the way from far away to visit me, I was out and couldn't meet him.' The other choices express cause/reason."
  },
  {
    sentence: "机の上に読み（　　）の雑誌が何冊も置いてある。",
    options: ["かけ", "っぱなし", "きり", "ぎみ"],
    answer: 0,
    pattern: "〜かけ（の）",
    explanation: "「ますstem＋かけの＋名詞」 means 'half-done / unfinished X'. Sentence: 'Several half-read magazines are left on the desk.' 「っぱなし」 means 'left in a state', 「きり」 means 'only', and 「ぎみ」 means 'slightly tending toward'."
  },
  {
    sentence: "彼は何か言い（　　）、急に口を閉じて部屋を出て行った。",
    options: ["きって", "かけて", "つづけて", "ぬいて"],
    answer: 1,
    pattern: "〜かける",
    explanation: "「ますstem＋かける」 means 'start to do X / be about to do X (and then stop)'. Sentence: 'He started to say something, then suddenly closed his mouth and left the room.' 「きって」 and 「ぬいて」 mean 'do completely', and 「つづけて」 means 'continue'."
  },

  // Day 11 (51–55)
  {
    sentence: "昨日は引っ越しの手伝いで重い荷物を運んだので、動けない（　　）疲れた。",
    options: ["ばかり", "ながら", "ほど", "さえ"],
    answer: 2,
    pattern: "〜ほど（程度）",
    explanation: "「〜ほど」 expresses extreme degree ('to the extent that'). Sentence: 'Yesterday I carried heavy luggage helping with the move, so I was so tired I couldn't move.' 「ばかり」 is 'only', 「ながら」 is 'while', and 「さえ」 is 'even'."
  },
  {
    sentence: "今年の冬は暖冬と言われていて、去年（　　）寒くない。",
    options: ["より", "くらい", "だけ", "ほど"],
    answer: 3,
    pattern: "〜ほど〜ない",
    explanation: "「AはBほど〜ない」 means 'A is not as ~ as B'. Sentence: 'This winter is said to be mild, and it is not as cold as last year.' 「より」 is generally used in affirmative comparisons (`去年より寒くない` is less standard than `去年ほど寒くない`)."
  },
  {
    sentence: "遅れるなら、せめて電話で連絡する（　　）はできたはずだ。",
    options: ["くらい", "ほど", "ばかり", "だらけ"],
    answer: 0,
    pattern: "〜くらい（最低限）",
    explanation: "「〜くらい」 can express a minimal expectation ('at least X'). Sentence: 'If you were going to be late, you could have at least contacted me by phone.' 「ほど」 marks high degree rather than a minimum baseline."
  },
  {
    sentence: "隣室の人が夜遅くまでギターを弾いている（　　）が聞こえて、眠れなかった。",
    options: ["こと", "の", "もの", "ところ"],
    answer: 1,
    pattern: "〜の（名詞化）",
    explanation: "Before perception verbs like 聞こえる and 見える, the nominalizer 「の」 is required instead of 「こと」. Sentence: 'I heard the person in the next room playing the guitar until late at night and couldn't sleep.'"
  },
  {
    sentence: "明日のパーティーに参加する（　　）、今日中に返事をしてください。",
    options: ["か何か", "かだれか", "かどうか", "かなにか"],
    answer: 2,
    pattern: "〜かどうか",
    explanation: "「〜かどうか」 embeds a yes/no question ('whether or not'). Sentence: 'Please reply by the end of today as to whether or not you will attend tomorrow's party.'"
  },

  // Day 12 (56–60)
  {
    sentence: "日本の伝統文化（　　）もっと深く知りたいと思い、この本を買いました。",
    options: ["にとって", "によって", "として", "について"],
    answer: 3,
    pattern: "〜について",
    explanation: "「〜について」 means 'about / regarding' a topic of study or inquiry. Sentence: 'Wanting to know more deeply about traditional Japanese culture, I bought this book.' 「にとって」 is 'from the standpoint of', 「によって」 is 'by means of', and 「として」 is 'as'."
  },
  {
    sentence: "一人暮らしの私（　　）、近所にある２４時間営業のスーパーはとても便利だ。",
    options: ["にとって", "について", "に対して", "によって"],
    answer: 0,
    pattern: "〜にとって",
    explanation: "「〜にとって」 marks the standpoint from which an evaluation (とても便利だ) is made ('for me'). Sentence: 'For me living alone, the 24-hour supermarket in the neighborhood is very convenient.'"
  },
  {
    sentence: "働くことに対する考え方は、国や文化、また個人（　　）大きく異なる。",
    options: ["にとって", "によって", "について", "として"],
    answer: 1,
    pattern: "〜によって（多様）",
    explanation: "「〜によって」 with verbs like 異なる or 違う means 'depending on'. Sentence: 'Attitudes toward working differ greatly depending on the country, culture, and individual.'"
  },
  {
    sentence: "この歴史的な建物は、１００年前に有名な建築家（　　）設計された。",
    options: ["にとって", "について", "によって", "に対して"],
    answer: 2,
    pattern: "〜によって（受身の動作主）",
    explanation: "In passive sentences describing creations, inventions, or discoveries, 「〜によって」 marks the agent ('by'). Sentence: 'This historic building was designed 100 years ago by a famous architect.'"
  },
  {
    sentence: "自分が悪かったのだから、素直に彼に謝る（　　）。",
    options: ["わけだ", "はずだ", "ものか", "べきだ"],
    answer: 3,
    pattern: "〜べきだ",
    explanation: "「〜べきだ」 expresses moral or social obligation ('should / ought to'). Sentence: 'Since you were in the wrong, you should honestly apologize to him.' 「わけだ」 is 'that's why', 「はずだ」 is 'expected to', and 「ものか」 is 'never'."
  },

  // Day 13 (61–65)
  {
    sentence: "熱があるなら、無理をして会社に行かない（　　）ですよ。",
    options: ["ほうがいい", "べきだ", "ことだ", "ものだ"],
    answer: 0,
    pattern: "〜ないほうがいい",
    explanation: "「〜ないほうがいい」 gives practical advice ('had better not'). Sentence: 'If you have a fever, you had better not push yourself and go to work.' Note that 「べきだ」 attaches to affirmative dictionary form or takes `べきではない`."
  },
  {
    sentence: "もう８時だ。急いで準備し（　　）、遅刻してしまう。",
    options: ["なくても", "なくちゃ", "ないうちに", "ないまま"],
    answer: 1,
    pattern: "〜なくちゃ・〜なきゃ",
    explanation: "「〜なくちゃ」 is the casual contraction of 「〜なくては（いけない）」 meaning 'if I don't / must'. Sentence: 'It's already 8 o'clock. If I don't get ready in a hurry, I'll be late.'"
  },
  {
    sentence: "こんなに雨が強く降るなら、傘を持ってくれば（　　）。",
    options: ["いい", "よい", "よかった", "よかったら"],
    answer: 2,
    pattern: "〜ばよかった",
    explanation: "「〜ばよかった」 expresses regret over a past counterfactual ('I should have done X'). Sentence: 'If it was going to rain this hard, I should have brought an umbrella.'"
  },
  {
    sentence: "この歌は聞けば（　　）ほど、歌詞の深い意味がわかって好きになる。",
    options: ["聞いて", "聞いた", "聞き", "聞く"],
    answer: 3,
    pattern: "〜ば〜ほど",
    explanation: "「〜ば〜ほど」 ('the more X, the more Y') repeats the verb in ば-form followed by dictionary form + ほど (聞けば聞くほど). Sentence: 'The more you listen to this song, the more you understand the deep meaning of the lyrics and come to like it.'"
  },
  {
    sentence: "彼は朝ご飯も食べ（　　）、慌てて家を飛び出して行った。",
    options: ["ずに", "ないに", "ずで", "なくて"],
    answer: 0,
    pattern: "〜ずに",
    explanation: "「〜ずに」 means 'without doing X' (more formal than 〜ないで). Sentence: 'He rushed out of the house without even eating breakfast.' 「ないに」 and 「ずで」 are ungrammatical, and 「なくて」 expresses cause."
  },

  // Day 14 (66–70)
  {
    sentence: "彼は誰にも相談（　　）、一人で会社を辞めることを決めてしまった。",
    options: ["しずに", "せずに", "さずに", "しないに"],
    answer: 1,
    pattern: "〜せずに",
    explanation: "The irregular verb する becomes 「せずに」 (not しずに) in the 〜ずに pattern ('without consulting'). Sentence: 'Without consulting anyone, he decided on his own to quit the company.'"
  },
  {
    sentence: "妹はテレビで見た新しいおもちゃをとても欲し（　　）いる。",
    options: ["たいで", "そうに", "がって", "らしくて"],
    answer: 2,
    pattern: "〜がる・〜がっている",
    explanation: "For a third person's desire or emotion, the suffix 「〜がる（〜がっている）」 attaches to the stem of 欲しい or 〜たい. Sentence: 'My younger sister really wants the new toy she saw on TV.'"
  },
  {
    sentence: "あんなに優しかった彼女が、挨拶（　　）してくれなくなった。",
    options: ["こそ", "ばかり", "だけ", "さえ"],
    answer: 3,
    pattern: "〜さえ",
    explanation: "「〜さえ」 means 'even' (giving an extreme/minimal example). Sentence: 'She, who used to be so kind, won't even greet me anymore.' 「こそ」 is positive emphasis, and 「ばかり」/「だけ」 mean 'only'."
  },
  {
    sentence: "あなたに健康でいてほしい。体（　　）丈夫なら、ほかに何もいらない。",
    options: ["さえ", "こそ", "ばかり", "だけ"],
    answer: 0,
    pattern: "〜さえ〜ば（なら）",
    explanation: "「〜さえ〜ば／なら」 expresses the sole sufficient condition ('as long as / if only'). Sentence: 'I want you to stay healthy. As long as your body is strong, I don't need anything else.'"
  },
  {
    sentence: "去年はあと一歩で不合格だったから、今年（　　）絶対に試験に合格したい。",
    options: ["さえ", "こそ", "すら", "ばかり"],
    answer: 1,
    pattern: "〜こそ",
    explanation: "「〜こそ」 strongly singles out a noun with determination ('this year for sure'). Sentence: 'Last year I failed by just a hair, so this year for sure I definitely want to pass the exam.'"
  },

  // Day 15 (71–75)
  {
    sentence: "明日のスケジュールがわかり（　　）、すぐにお電話でご連絡いたします。",
    options: ["とたん", "うちに", "次第", "たび"],
    answer: 2,
    pattern: "〜次第（すぐに）",
    explanation: "「動詞ますstem＋次第」 is a formal expression meaning 'as soon as'. Sentence: 'As soon as tomorrow's schedule is known, I will contact you right away by phone.' 「とたん」 requires た-form and cannot be followed by a volitional action."
  },
  {
    sentence: "明日のバーベキューをやるかどうかは、今夜の天気予報（　　）だ。",
    options: ["とたん", "いらい", "かぎり", "次第"],
    answer: 3,
    pattern: "〜次第だ（〜による）",
    explanation: "「名詞＋次第だ」 means 'depends on X'. Sentence: 'Whether or not we hold tomorrow's barbecue depends on tonight's weather forecast.'"
  },
  {
    sentence: "自分の目で確かめない（　　）、そのうわさを信じることはできない。",
    options: ["かぎり", "うちに", "あいだに", "さいちゅうに"],
    answer: 0,
    pattern: "〜ない限り",
    explanation: "「〜ない限り」 means 'unless / as long as X does not happen'. Sentence: 'Unless I confirm it with my own eyes, I cannot believe that rumor.'"
  },
  {
    sentence: "私の知っている（　　）では、彼がこのプロジェクトの責任者のはずです。",
    options: ["うち", "かぎり", "たび", "とたん"],
    answer: 1,
    pattern: "〜限り（範囲）",
    explanation: "「〜限り（では）」 with verbs of knowledge/perception (知っている、見る、聞く) means 'to the extent that / as far as'. Sentence: 'As far as I know, he is supposed to be the person in charge of this project.'"
  },
  {
    sentence: "久しぶりに掃除をしたら、ベッドの下がほこり（　　）になっていた。",
    options: ["ばかり", "ぎみ", "だらけ", "きり"],
    answer: 2,
    pattern: "〜だらけ",
    explanation: "「名詞＋だらけ」 means 'covered with / full of' something undesirable (like dust, mud, or mistakes). Sentence: 'When I cleaned for the first time in a while, the space under the bed was covered in dust.'"
  },

  // Day 16 (76–80)
  {
    sentence: "さっき名前を聞いたのに忘れてしまったが、思い出せないと恥ずかしいので覚えている（　　）をした。",
    options: ["まま", "よう", "ぎみ", "ふり"],
    answer: 3,
    pattern: "〜ふりをする",
    explanation: "「〜ふりをする」 means 'pretend to'. Sentence: 'I forgot their name even though I just heard it, but since it would be embarrassing not to remember, I pretended that I remembered.'"
  },
  {
    sentence: "彼はアメリカに１０年も住んでいたそうだ。だから英語があんなに上手な（　　）だ。",
    options: ["わけ", "はず", "べき", "もの"],
    answer: 0,
    pattern: "〜わけだ（納得）",
    explanation: "「〜わけだ」 expresses a logical realization ('no wonder / so that's why'). Sentence: 'I heard he lived in America for 10 years. No wonder his English is so good.'"
  },
  {
    sentence: "相手の住所も電話番号もわからないのでは、連絡のし（　　）。",
    options: ["わけがない", "ようがない", "はずがない", "ことはない"],
    answer: 1,
    pattern: "〜ようがない",
    explanation: "「動詞ますstem＋ようがない」 (or `〜のしようがない`) means 'there is no way/method to do X'. Sentence: 'If I don't know the other person's address or phone number, there is no way to contact them.'"
  },
  {
    sentence: "弟はいつもテレビをつけ（　　）にして、自分の部屋へ行ってしまう。",
    options: ["かけ", "きり", "っぱなし", "ぎみ"],
    answer: 2,
    pattern: "〜っぱなし",
    explanation: "「ますstem＋っぱなし」 describes leaving something in an improper state due to carelessness ('leaving the TV on'). Sentence: 'My younger brother always leaves the TV on and goes to his own room.'"
  },
  {
    sentence: "たとえ冗談（　　）、言っていいことと悪いことがある。",
    options: ["につれて", "にそって", "にかけても", "にしても"],
    answer: 3,
    pattern: "〜にしても",
    explanation: "「〜にしても」 means 'even if / even granting that'. Sentence: 'Even if it was a joke, there are things you can and cannot say.'"
  },

  // Day 17 (81–85)
  {
    sentence: "「このカレー、辛すぎて食べられない？」「ううん、少し辛いけど、食べられない（　　）よ。」",
    options: ["ことはない", "はずはない", "わけがない", "ようがない"],
    answer: 0,
    pattern: "〜ないことはない",
    explanation: "Double negative 「〜ないことはない」 softens an affirmative statement ('it's not that I can't eat it / I can manage to eat it'). Sentence: '\"Is this curry too spicy to eat?\" \"No, it's a little spicy, but it's not that I can't eat it.\"'"
  },
  {
    sentence: "５年前に大学を卒業して（　　）、彼とは一度も会っていない。",
    options: ["とたん", "以来", "さいちゅう", "ついでに"],
    answer: 1,
    pattern: "〜て以来",
    explanation: "「〜て以来」 means 'ever since doing X', marking the starting point of a continuous state up to the present. Sentence: 'Ever since graduating from university five years ago, I haven't met him even once.'"
  },
  {
    sentence: "この店の店員は、どんなお客さん（　　）もいつも丁寧な態度で接している。",
    options: ["について", "にとって", "に対して", "によって"],
    answer: 2,
    pattern: "〜に対して（対象）",
    explanation: "「〜に対して」 marks the target toward whom an attitude or behavior is directed ('toward any customer'). Sentence: 'The staff at this shop always treat any customer with a polite attitude.'"
  },
  {
    sentence: "今年は日本海側で雪が多いの（　　）、太平洋側では晴れの日が続いている。",
    options: ["について", "にとって", "によって", "に対して"],
    answer: 3,
    pattern: "〜のに対して（対比）",
    explanation: "「節＋のに対して」 contrasts two clauses ('whereas / in contrast to'). Sentence: 'Whereas there is a lot of snow on the Sea of Japan side this year, sunny days continue on the Pacific side.'"
  },
  {
    sentence: "今回の事件（　　）何か新しい情報をお持ちの方は、警察までご連絡ください。",
    options: ["に関して", "にとって", "にそって", "につれて"],
    answer: 0,
    pattern: "〜に関して",
    explanation: "「〜に関して」 is the formal equivalent of 「〜について」 ('regarding / concerning'). Sentence: 'Anyone who has new information regarding this incident, please contact the police.'"
  },

  // Day 18 (86–90)
  {
    sentence: "本日は病気で休んでいる社長（　　）、副社長の私がご挨拶申し上げます。",
    options: ["にとって", "にかわって", "につれて", "によって"],
    answer: 1,
    pattern: "〜にかわって",
    explanation: "「〜にかわって」 means 'on behalf of / in place of'. Sentence: 'Today, on behalf of the president who is out sick, I, the vice president, will give the greeting.'"
  },
  {
    sentence: "京都は日本の古い都（　　）、世界中の多くの観光客に知られている。",
    options: ["にとって", "について", "として", "に対して"],
    answer: 2,
    pattern: "〜として",
    explanation: "「〜として」 marks role, status, or identity ('as'). Sentence: 'Kyoto is known to many tourists around the world as Japan's ancient capital.'"
  },
  {
    sentence: "次回の国際会議は、来月ジュネーブ（　　）開催される予定だ。",
    options: ["につれて", "にとって", "にそって", "において"],
    answer: 3,
    pattern: "〜において",
    explanation: "「〜において」 is a formal written expression meaning 'in / at (a location or domain)'. Sentence: 'The next international conference is scheduled to be held in Geneva next month.'"
  },
  {
    sentence: "この服のデザインはとてもかわいくて、若い女性（　　）だと思う。",
    options: ["向き", "向け", "がち", "ぎみ"],
    answer: 0,
    pattern: "〜向き",
    explanation: "「〜向き」 expresses natural suitability ('well-suited for') and can end a predicate (`若い女性向きだ`). Sentence: 'The design of these clothes is very cute, and I think it is well-suited for young women.'"
  },
  {
    sentence: "台風が近づく（　　）、だんだん雨や風が強くなってきた。",
    options: ["にそって", "につれて", "によって", "について"],
    answer: 1,
    pattern: "〜につれて",
    explanation: "「〜につれて」 expresses proportional parallel change ('as X happens, Y also changes'). Sentence: 'As the typhoon approached, the rain and wind gradually grew stronger.'"
  },

  // Day 19 (91–95)
  {
    sentence: "経済が発展する（　　）、人々の生活も少しずつ豊かになっていった。",
    options: ["について", "にとって", "とともに", "にそって"],
    answer: 2,
    pattern: "〜とともに",
    explanation: "「〜とともに」 means 'along with / as X happens' for simultaneous change. Sentence: 'As the economy developed, people's lives gradually became more prosperous as well.'"
  },
  {
    sentence: "誰にも邪魔されずに、久しぶりに夫婦二人（　　）でゆっくり食事を楽しんだ。",
    options: ["ばかり", "だらけ", "ぎみ", "きり"],
    answer: 3,
    pattern: "〜きり（限定）",
    explanation: "「二人きり」 means 'just the two of us (and no one else)'. Sentence: 'Without being disturbed by anyone, my spouse and I enjoyed a leisurely meal just the two of us for the first time in a while.'"
  },
  {
    sentence: "彼は先週「ちょっと出かけてくる」と言って部屋を出た（　　）、まだ戻ってこない。",
    options: ["きり", "ばかり", "とたん", "さいちゅう"],
    answer: 0,
    pattern: "〜たきり",
    explanation: "「〜たきり」 with a negative continuation indicates that nothing has changed since a single past action. Sentence: 'He left the room last week saying \"I'm stepping out for a bit,\" and hasn't come back since.'"
  },
  {
    sentence: "今回の試合は絶対に勝てると期待していた（　　）、負けたときのショックは大きかった。",
    options: ["わりに", "だけに", "くせに", "ついでに"],
    answer: 1,
    pattern: "〜だけに",
    explanation: "「〜だけに」 means 'precisely because X, the consequence Y is all the greater'. Sentence: 'Precisely because I had expected we would definitely win this match, the shock when we lost was huge.'"
  },
  {
    sentence: "この旅館は宿泊料が高い（　　）、料理もサービスも最高だった。",
    options: ["くせに", "わりに", "だけあって", "ばかりに"],
    answer: 2,
    pattern: "〜だけあって",
    explanation: "「〜だけあって」 praises something as living up to expectations ('as one would expect from X'). Sentence: 'As one would expect from its high room rate, both the food and service at this inn were top-notch.'"
  },

  // Day 20 (96–100)
  {
    sentence: "うっかり本当のことを言ってしまった（　　）、彼女を怒らせてしまった。",
    options: ["おかげで", "だけあって", "わりに", "ばかりに"],
    answer: 3,
    pattern: "〜ばかりに",
    explanation: "「〜ばかりに」 means 'merely/just because X happened, an regrettable result Y followed'. Sentence: 'Just because I carelessly told the truth, I ended up making her angry.'"
  },
  {
    sentence: "彼は英語（　　）、フランス語やスペイン語まで流暢に話すことができる。",
    options: ["ばかりか", "どころか", "ばかりに", "だけに"],
    answer: 0,
    pattern: "〜ばかりか",
    explanation: "「〜ばかりか」 means 'not only X, but also Y' (additive). Sentence: 'He can speak fluently not only English, but even French and Spanish.' 「どころか」 is contrastive ('far from X')."
  },
  {
    sentence: "今日の天気は涼しい（　　）、むしろ寒いくらいだから上着を持っていったほうがいい。",
    options: ["といえば", "というより", "といっても", "といったら"],
    answer: 1,
    pattern: "〜というより",
    explanation: "「Aというより（むしろ）B」 refines a description ('rather than A, it is more like B'). Sentence: 'Today's weather is cold rather than cool, so you had better bring a jacket.'"
  },
  {
    sentence: "冬の果物（　　）、やっぱりこたつで食べるみかんが一番最初に思い浮かぶ。",
    options: ["というより", "といっても", "といえば", "といった"],
    answer: 2,
    pattern: "〜といえば",
    explanation: "「〜といえば」 means 'speaking of / when it comes to X'. Sentence: 'When it comes to winter fruits, mandarin oranges eaten at a kotatsu are what come to mind first.'"
  },
  {
    sentence: "先週から一人暮らしを始めた（　　）、実家のすぐ近くのマンションなんです。",
    options: ["といえば", "というより", "といった", "といっても"],
    answer: 3,
    pattern: "〜といっても",
    explanation: "「〜といっても」 qualifies a previous statement ('although I say X, the reality is more modest'). Sentence: 'Although I say I started living alone last week, it's an apartment right near my parents' house.'"
  },

  // Day 21 (101–105)
  {
    sentence: "京都や奈良（　　）歴史のある街には、毎年海外から多くの観光客が訪れる。",
    options: ["といった", "といえば", "といっても", "というより"],
    answer: 0,
    pattern: "〜といった",
    explanation: "「AやBといった＋名詞」 lists representative examples modifying a category noun ('historic cities such as Kyoto and Nara'). Sentence: 'Many tourists from abroad visit historic cities such as Kyoto and Nara every year.'"
  },
  {
    sentence: "最近、父は年のせいか少し忘れ（　　）なったと自分で言っている。",
    options: ["らしく", "っぽく", "そうに", "ぎみに"],
    answer: 1,
    pattern: "〜っぽい",
    explanation: "「動詞ますstem＋っぽい」 forms an i-adjective meaning 'prone to / tending to' (忘れっぽい = forgetful). Sentence: 'Recently, my father says himself that he has become somewhat forgetful, perhaps because of his age.'"
  },
  {
    sentence: "窓の外を眺めながら、彼女は何か言いた（　　）な表情をしていた。",
    options: ["っぽい", "らしい", "げ", "ぎみ"],
    answer: 2,
    pattern: "〜げ",
    explanation: "「〜たい→〜たげ」 means 'looking as if wanting to' (言いたげな表情 = a look as if wanting to say something). Sentence: 'While gazing out the window, she had an expression as if she wanted to say something.'"
  },
  {
    sentence: "風邪は治る（　　）、熱が上がってますますひどくなってしまった。",
    options: ["ばかりか", "だけでなく", "わりに", "どころか"],
    answer: 3,
    pattern: "〜どころか",
    explanation: "「〜どころか」 means 'far from X, on the contrary Y' (strong reversal of expectation). Sentence: 'Far from getting better, my cold got even worse as my fever went up.' 「ばかりか」 and 「だけでなく」 are additive ('not only')."
  },
  {
    sentence: "明日は大事な試験があるから、今夜はテレビを見る（　　）。",
    options: ["どころではない", "わけではない", "とは限らない", "ことはない"],
    answer: 0,
    pattern: "〜どころではない",
    explanation: "「〜どころではない」 means 'this is no time for X / cannot afford to do X due to urgent circumstances'. Sentence: 'Because I have an important exam tomorrow, tonight is no time to be watching TV.'"
  },

  // Day 22 (106–110)
  {
    sentence: "インターネットは便利な（　　）、個人情報が漏れる危険性もある。",
    options: ["一方だ", "一方で", "につれて", "にしたがって"],
    answer: 1,
    pattern: "〜一方で",
    explanation: "「〜一方で」 contrasts two sides or qualities of a topic ('on the one hand X, on the other hand Y'). Sentence: 'While the internet is convenient, on the other hand there is also the danger of personal information leaking.'"
  },
  {
    sentence: "最近、運動不足のせいで体重が増える（　　）だから、ジムに通い始めた。",
    options: ["一方で", "ついでに", "一方だ", "ばかりに"],
    answer: 2,
    pattern: "〜一方だ",
    explanation: "「辞書形＋一方だ」 means 'keeps changing in one direction' (増える一方だ = keeps increasing). Sentence: 'Recently my weight has only kept increasing due to lack of exercise, so I started going to the gym.'"
  },
  {
    sentence: "契約書の内容をよく確認した（　　）、署名と捺印をお願いします。",
    options: ["上に", "うちに", "さいちゅうに", "上で"],
    answer: 3,
    pattern: "〜上で",
    explanation: "「〜た上で」 means 'after doing X as a necessary prerequisite'. Sentence: 'After carefully confirming the contents of the contract, please sign and seal it.' 「上に」 means 'in addition to'."
  },
  {
    sentence: "このアパートは駅から近い（　　）、家賃も安いので学生にとても人気がある。",
    options: ["上に", "上で", "うちに", "わりに"],
    answer: 0,
    pattern: "〜上に",
    explanation: "「〜上に」 is an additive expression meaning 'not only / in addition to X, also Y'. Sentence: 'In addition to being close to the station, this apartment also has cheap rent, so it is very popular with students.'"
  },
  {
    sentence: "海外で一人で暮らしている息子のことが、心配で（　　）。",
    options: ["いられない", "たまらない", "かぎらない", "ちがいない"],
    answer: 1,
    pattern: "〜てたまらない",
    explanation: "「〜て／でたまらない」 expresses an unbearable or overwhelming feeling ('unbearably worried'). Sentence: 'I am unbearably worried about my son who lives alone abroad.'"
  },

  // Day 23 (111–115)
  {
    sentence: "久しぶりに故郷の母の声を聞いたら、懐かしくて（　　）。",
    options: ["いられなかった", "かぎらなかった", "ならなかった", "ちがいなかった"],
    answer: 2,
    pattern: "〜てならない",
    explanation: "「〜てならない」 means 'cannot help feeling X' (an emotion arises naturally and strongly). Sentence: 'When I heard my mother's voice from my hometown for the first time in a while, I couldn't help feeling nostalgic.'"
  },
  {
    sentence: "「田中さんはいらっしゃいますか。」「申し訳ございません。田中はただいま会議（　　）です。」",
    options: ["間", "うち", "たび", "中"],
    answer: 3,
    pattern: "〜中（ちゅう）",
    explanation: "「名詞＋中（ちゅう）」 means 'currently in the middle of an activity' (会議中 = in a meeting). Sentence: '\"Is Mr. Tanaka there?\" \"I'm very sorry. Tanaka is currently in a meeting.\"'"
  },
  {
    sentence: "ここ数日、夜遅くまで残業が続いたので、少し疲れ（　　）だ。",
    options: ["ぎみ", "っぽい", "がち", "だらけ"],
    answer: 0,
    pattern: "〜気味（ぎみ）",
    explanation: "「ますstem／名詞＋気味」 means 'feeling a slight touch of X' (疲れ気味 = slightly tired). Sentence: 'Because overtime until late at night has continued for the past few days, I am feeling a bit tired.'"
  },
  {
    sentence: "どんなに難しくても、最後まであきらめずに挑戦し（　　）ことが大切だ。",
    options: ["かける", "つづける", "だす", "なおす"],
    answer: 1,
    pattern: "〜続ける",
    explanation: "「ますstem＋続ける」 means 'continue doing X'. Sentence: 'No matter how difficult it is, it is important to keep challenging yourself until the end without giving up.'"
  },
  {
    sentence: "作文に間違いが多かったので、もう一度最初から書き（　　）ことにした。",
    options: ["つづける", "かける", "なおす", "だす"],
    answer: 2,
    pattern: "〜直す",
    explanation: "「ますstem＋直す」 means 'do X over again to correct/improve it' (書き直す = rewrite). Sentence: 'Because there were many mistakes in my essay, I decided to rewrite it from the beginning once more.'"
  },

  // Day 24 (116–120)
  {
    sentence: "困ったときはお互いに助け（　　）のが、本当の友達というものだ。",
    options: ["だす", "こむ", "なおす", "あう"],
    answer: 3,
    pattern: "〜合う",
    explanation: "「ますstem＋合う」 expresses reciprocal action ('do X to/with each other'; 助け合う = help each other). Sentence: 'Helping each other when in trouble is what true friends are about.'"
  },
  {
    sentence: "空が急に暗くなったと思ったら、大粒の雨が降り（　　）。",
    options: ["だした", "かけた", "なおした", "あった"],
    answer: 0,
    pattern: "〜出す",
    explanation: "「ますstem＋出す」 means 'suddenly start doing X' (降り出した = suddenly started raining). Sentence: 'Just as I thought the sky had suddenly grown dark, large drops of rain started falling.'"
  },
  {
    sentence: "彼女は何か悩みがあるようで、さっきからずっと一人で考え（　　）いる。",
    options: ["だして", "こんで", "なおして", "かけて"],
    answer: 1,
    pattern: "〜込む",
    explanation: "「ますstem＋込む」 expresses doing an action deeply or thoroughly (考え込む = be lost in deep thought). Sentence: 'She seems to have some worries, and has been lost in deep thought alone for a while now.'"
  },
  {
    sentence: "「あれ、来週のテストって何曜日だ（　　）？」「水曜日だよ。」",
    options: ["かな", "かしら", "っけ", "もの"],
    answer: 2,
    pattern: "〜っけ",
    explanation: "「〜っけ」 is used in casual speech when trying to recall information one previously knew ('what day was it again?'). Sentence: '\"Wait, what day of the week was next week's test again?\" \"It's Wednesday.\"'"
  },
  {
    sentence: "「どうして昨日パーティーに来なかったの？」「だって、風邪で熱があった（　　）。」",
    options: ["わけだ", "はずだ", "ことだ", "んだもの"],
    answer: 3,
    pattern: "〜もの・〜んだもの",
    explanation: "「〜（んだ）もの／もん」 gives a personal excuse or emotional justification, often paired with だって. Sentence: '\"Why didn't you come to the party yesterday?\" \"Because I had a fever from a cold!\"'"
  },

  // Day 25 (121–125)
  {
    sentence: "夕べは辞書を使わ（　　）、英語のニュース記事を最後まで読んでみた。",
    options: ["ないで", "なくて", "ないうちに", "ないまま"],
    answer: 0,
    pattern: "〜ないで",
    explanation: "「〜ないで」 means 'without doing X'. Sentence: 'Last night, I tried reading an English news article to the end without using a dictionary.' 「なくて」 expresses cause, not accompanying manner."
  },
  {
    sentence: "語学が上達したければ、恥ずかしがらずに毎日少しずつでも話す（　　）。",
    options: ["ものだ", "ことだ", "わけだ", "はずだ"],
    answer: 1,
    pattern: "〜ことだ（忠告）",
    explanation: "「辞書形／ない形＋ことだ」 gives firm advice on what is most important ('the best thing is to do X'). Sentence: 'If you want to improve at a language, the important thing is to speak even a little every day without being shy.'"
  },
  {
    sentence: "医者に聞いてみたら、幸い軽い症状だったので手術はしなくていいとのことだった。（　　）、入院の必要もないそうだ。",
    options: ["悲しいことに", "困ったことに", "嬉しいことに", "残念なことに"],
    answer: 2,
    pattern: "〜ことに（感情）",
    explanation: "「感情形容詞＋ことに」 at the start of a sentence expresses the speaker's emotional reaction ('Happily / To my delight'). Sentence: 'When I asked the doctor, fortunately the symptoms were mild so surgery wasn't needed. Happily, I hear hospitalization isn't needed either.'"
  },
  {
    sentence: "あんな失礼な人に頭を下げる（　　）、この仕事を辞めたほうがましだ。",
    options: ["ほどなら", "ばかりなら", "だけなら", "くらいなら"],
    answer: 3,
    pattern: "〜くらいなら",
    explanation: "「〜くらいなら」 expresses strong aversion ('rather than doing X, Y would be preferable'). Sentence: 'Rather than bowing my head to such a rude person, it would be better to quit this job.'"
  },
  {
    sentence: "今夜から明日の朝（　　）、広い範囲で強い雨が降る見込みです。",
    options: ["にかけて", "につれて", "にそって", "にわたって"],
    answer: 0,
    pattern: "〜から〜にかけて",
    explanation: "「AからBにかけて」 describes an approximate span of time or space ('from tonight through tomorrow morning'). Sentence: 'From tonight through tomorrow morning, heavy rain is expected over a wide area.'"
  },

  // Day 26 (126–130)
  {
    sentence: "この図書館は月曜日（　　）は、毎日朝９時から夜８時まで開いています。",
    options: ["ほか", "以外", "あまり", "かぎり"],
    answer: 1,
    pattern: "〜以外",
    explanation: "「名詞＋以外」 means 'other than / except for'. Sentence: 'Except for Mondays, this library is open every day from 9 a.m. to 8 p.m.'"
  },
  {
    sentence: "この通りには、１０メートル（　　）に街灯が立っているので夜でも明るい。",
    options: ["たび", "ぶり", "おき", "まま"],
    answer: 2,
    pattern: "〜おきに",
    explanation: "「数量＋おきに」 means 'at intervals of X'. Sentence: 'On this street, streetlights stand at 10-meter intervals, so it is bright even at night.'"
  },
  {
    sentence: "オリンピックは４年（　　）に一度、世界各地の都市で開催される。",
    options: ["たび", "おき", "ぶり", "ごと"],
    answer: 3,
    pattern: "〜ごとに",
    explanation: "「数量＋ごとに」 means 'every X units' (４年ごとに = every 4 years; whereas ４年おきに technically means skipping 4 years). Sentence: 'The Olympics are held once every four years in cities around the world.'"
  },
  {
    sentence: "今日は母の体調が悪いので、母の（　　）私が晩ご飯を作った。",
    options: ["代わりに", "おかげで", "ために", "せいで"],
    answer: 0,
    pattern: "〜代わりに（代理）",
    explanation: "「名詞＋の代わりに」 means 'in place of / instead of'. Sentence: 'Because my mother isn't feeling well today, I cooked dinner in her place.'"
  },
  {
    sentence: "日曜日に出勤する（　　）、来週の火曜日に休みをもらうことになっている。",
    options: ["ついでに", "代わりに", "おかげで", "ばかりに"],
    answer: 1,
    pattern: "〜代わりに（交換）",
    explanation: "「動詞普通形＋代わりに」 can also mean 'in exchange for / to compensate for'. Sentence: 'In exchange for going to work on Sunday, I am scheduled to get Tuesday off next week.'"
  },

  // Day 27 (131–135)
  {
    sentence: "まだ病気なんだし、医者にも止められている（　　）、今日はおとなしく寝ていなさい。",
    options: ["ものか", "わけだ", "んだから", "どころか"],
    answer: 2,
    pattern: "〜んだから",
    explanation: "「〜んだから」 emphasizes an obvious reason known to the listener to justify advice or a command. Sentence: 'You're still sick, and since the doctor told you not to, stay quietly in bed today.'"
  },
  {
    sentence: "過ぎたことをいつまでも後悔しても（　　）から、前を向いて頑張ろう。",
    options: ["ちがいない", "かぎらない", "たまらない", "しょうがない"],
    answer: 3,
    pattern: "〜てもしょうがない・しかたがない",
    explanation: "「〜てもしょうがない（しかたがない）」 means 'there is no use in doing X / it can't be helped'. Sentence: 'There's no use regretting the past forever, so let's look forward and do our best.'"
  },
  {
    sentence: "新しいスマートフォンが発売されたので、どんな機能があるのか気になって（　　）。",
    options: ["しかたがない", "ちがいない", "かぎらない", "ほかない"],
    answer: 0,
    pattern: "〜てしかたがない・しょうがない",
    explanation: "「〜てしかたがない（しょうがない）」 means 'cannot help feeling X / unbearably X'. Sentence: 'A new smartphone went on sale, so I can't help being curious about what features it has.'"
  },
  {
    sentence: "あんな難しい試験、全然勉強していない私に合格でき（　　）よ。",
    options: ["ようがない", "っこない", "ほかない", "わけにはいかない"],
    answer: 1,
    pattern: "〜っこない",
    explanation: "「動詞ますstem＋っこない」 is a casual emphatic denial ('there's no chance I can X'). Sentence: 'There's no way I could pass such a difficult exam when I haven't studied at all.'"
  },
  {
    sentence: "あんなに元気だった彼が急に入院した（　　）、とても信じられない。",
    options: ["なんか", "ばかり", "なんて", "だらけ"],
    answer: 2,
    pattern: "〜なんて（驚き）",
    explanation: "「節＋なんて」 expresses surprise or disbelief at a statement ('that X happened'). Sentence: 'I can hardly believe that he, who was so energetic, was suddenly hospitalized.'"
  },

  // Day 28 (136–140)
  {
    sentence: "「田中さんはゴルフが上手ですね。」「いいえ、私（　　）まだまだ初心者ですよ。」",
    options: ["こそ", "さえ", "ばかり", "なんか"],
    answer: 3,
    pattern: "〜なんか",
    explanation: "「〜なんか」 is used in casual speech for humble self-deprecation ('someone like me'). Sentence: '\"Mr. Tanaka, you're good at golf.\" \"No, someone like me is still a beginner.\"'"
  },
  {
    sentence: "高校の同窓会に行き、１０年（　　）に懐かしい友人たちと再会した。",
    options: ["ぶり", "おき", "ごと", "たび"],
    answer: 0,
    pattern: "〜ぶり（に）",
    explanation: "「期間＋ぶり（に）」 means 'for the first time in X (period)'. Sentence: 'I went to my high school reunion and reunited with old friends for the first time in 10 years.'"
  },
  {
    sentence: "親友が困っているのだから、助けない（　　）。",
    options: ["ことはない", "わけにはいかない", "はずがない", "とは限らない"],
    answer: 1,
    pattern: "〜ないわけにはいかない",
    explanation: "「〜ないわけにはいかない」 means 'cannot not do X / morally or socially obligated to do X'. Sentence: 'Since my best friend is in trouble, I cannot refuse to help them.'"
  },
  {
    sentence: "明日は朝から大切な面接があるので、今夜は絶対に夜更かしする（　　）。",
    options: ["ことはない", "とは限らない", "わけにはいかない", "にちがいない"],
    answer: 2,
    pattern: "〜わけにはいかない",
    explanation: "「辞書形＋わけにはいかない」 means 'cannot afford to do X due to social/practical circumstances'. Sentence: 'Because I have an important interview first thing tomorrow morning, I cannot afford to stay up late tonight.'"
  },
  {
    sentence: "銀行へ行った（　　）、近くの郵便局に寄って切手を買ってきた。",
    options: ["とたんに", "さいちゅうに", "かわりに", "ついでに"],
    answer: 3,
    pattern: "〜ついでに",
    explanation: "「〜ついでに」 means 'while doing X / taking the opportunity of X'. Sentence: 'While I went to the bank, I stopped by the nearby post office and bought stamps.'"
  },

  // Day 29 (141–145)
  {
    sentence: "日本には、富士山（　　）美しい山がたくさんあります。",
    options: ["をはじめ", "について", "にとって", "にそって"],
    answer: 0,
    pattern: "〜をはじめ",
    explanation: "「名詞＋をはじめ（として）」 introduces a representative primary example ('starting with / including'). Sentence: 'In Japan, there are many beautiful mountains, starting with Mt. Fuji.'"
  },
  {
    sentence: "親のありがたみは、自分が親になって（　　）わかるものだ。",
    options: ["ばかり", "こそ", "さえ", "きり"],
    answer: 1,
    pattern: "〜てこそ",
    explanation: "「〜てこそ」 emphasizes a necessary precondition ('only by doing X does Y happen'). Sentence: 'A parent's kindness is something you truly understand only when you become a parent yourself.'"
  },
  {
    sentence: "この野菜は栄養が豊富な（　　）、値段も手ごろで家計に優しい。",
    options: ["どころか", "ばかりに", "ばかりでなく", "かわりに"],
    answer: 2,
    pattern: "〜ばかりでなく",
    explanation: "「〜ばかりでなく」 is a formal expression meaning 'not only X, but also Y'. Sentence: 'Not only is this vegetable rich in nutrients, its price is also reasonable and budget-friendly.'"
  },
  {
    sentence: "この映画は日本（　　）、アジアの多くの国々でも大ヒットした。",
    options: ["どころか", "ばかりに", "にかぎって", "だけでなく"],
    answer: 3,
    pattern: "〜だけでなく",
    explanation: "「〜だけでなく」 means 'not only X, but also Y'. Sentence: 'This movie was a big hit not only in Japan, but also in many countries across Asia.'"
  },
  {
    sentence: "こんなに毎日遅くまで働いていたら、体を壊す（　　）。",
    options: ["に決まっている", "わけではない", "とは限らない", "ことはない"],
    answer: 0,
    pattern: "〜に決まっている",
    explanation: "「〜に決まっている」 expresses strong conviction that something is obvious ('bound to / definitely'). Sentence: 'If you work this late every day, you're bound to ruin your health.'"
  },

  // Day 30 (146–150)
  {
    sentence: "予約しておいたおかげで、長い列に並ば（　　）済んだ。",
    options: ["ないで", "ずに", "なくて", "ないに"],
    answer: 1,
    pattern: "〜ずに済む",
    explanation: "「〜ずに済む」 means 'manage/get by without having to do X' with a sense of relief. Sentence: 'Thanks to having made a reservation in advance, we got by without having to stand in a long line.'"
  },
  {
    sentence: "兄が外で遊ぶのが好きなの（　　）、弟は家で静かに本を読むのが好きだ。",
    options: ["にとって", "について", "に比べて", "によって"],
    answer: 2,
    pattern: "〜に比べて",
    explanation: "「〜に比べて」 means 'compared to'. Sentence: 'Compared to my older brother who likes playing outside, my younger brother likes reading books quietly at home.'"
  },
  {
    sentence: "病気になって（　　）、健康のありがたさに気がついた。",
    options: ["とたん", "以来", "さいちゅう", "初めて"],
    answer: 3,
    pattern: "〜て初めて",
    explanation: "「〜て初めて」 means 'only after doing X (did I realize Y for the first time)'. Sentence: 'It was only after falling ill that I realized how precious health is.'"
  },
  {
    sentence: "来年は、この学校が創立されてからちょうど１００年目に（　　）。",
    options: ["あたる", "かかわる", "たいする", "よる"],
    answer: 0,
    pattern: "〜にあたる",
    explanation: "「名詞＋にあたる」 means 'correspond to / fall on (an anniversary or equivalent)'. Sentence: 'Next year marks (corresponds to) the 100th year since this school was founded.'"
  },
  {
    sentence: "（　　）周りの人に反対されても、自分の夢をあきらめるつもりはない。",
    options: ["もし", "たとえ", "いくら", "まるで"],
    answer: 1,
    pattern: "たとえ〜ても",
    explanation: "「たとえ〜ても」 means 'even if (hypothetical extreme)'. Sentence: 'Even if people around me oppose me, I have no intention of giving up on my dream.' 「もし」 pairs with たら/ば, 「いくら」 pairs with ても for degree, and 「まるで」 pairs with ようだ."
  },

  // Day 31 (151–155)
  {
    sentence: "「お父さん、この問題がわからないよ。」「ヒントをあげるから、もう一度自分で考えて（　　）。」",
    options: ["みなさい", "ごらん", "ください", "くれ"],
    answer: 1,
    pattern: "〜てごらん",
    explanation: "「〜てごらん」 is a warm, parental/teacher suggestion meaning 'try doing X'. Sentence: '\"Dad, I don't understand this problem.\" \"I'll give you a hint, so try thinking about it yourself one more time.\"'"
  },
  {
    sentence: "人の悪口をそんなに簡単に言う（　　）。",
    options: ["ものだ", "ことだ", "ものではない", "ことはない"],
    answer: 2,
    pattern: "〜ものではない",
    explanation: "「〜ものではない」 expresses a moral/social prohibition ('one shouldn't do X'). Sentence: 'You shouldn't speak ill of others so lightly.' 「ことはない」 means 'no need to'."
  },
  {
    sentence: "子どものころは、夏休みになると毎日近くの川で泳いだ（　　）。",
    options: ["ことだ", "わけだ", "はずだ", "ものだ"],
    answer: 3,
    pattern: "〜たものだ（回想）",
    explanation: "「Vた＋ものだ」 expresses nostalgia about a past habit ('used to do'). Sentence: 'When I was a child, I used to swim in the nearby river every day during summer vacation.'"
  },
  {
    sentence: "どこかで彼に会ったことがあるような（　　）が、どうしても思い出せない。",
    options: ["気がする", "気になる", "気がある", "気をつける"],
    answer: 0,
    pattern: "〜気がする",
    explanation: "「〜（ような）気がする」 means 'have a feeling/hunch that'. Sentence: 'I have a feeling I've met him somewhere before, but I just can't remember.' 「気になる」 means 'be on one's mind'."
  },
  {
    sentence: "ひどい雨（　　）、楽しみにしていたサッカーの試合が中止になってしまった。",
    options: ["のおかげで", "のせいで", "のわりに", "のくせに"],
    answer: 1,
    pattern: "〜せいで",
    explanation: "「〜せいで」 attributes a negative outcome to a cause ('because of the heavy rain'). Sentence: 'Because of the terrible rain, the soccer match I had been looking forward to was canceled.'"
  },

  // Day 32 (156–160)
  {
    sentence: "あの店のラーメンは、スープが濃厚でとてもおいしい（　　）評判だ。",
    options: ["と", "に", "もっぱら", "という"],
    answer: 3,
    pattern: "〜という評判だ",
    explanation: "「普通形＋という＋名詞（評判／うわさ／話）」 connects a clause to a noun of report ('has a reputation that'). Sentence: 'That shop's ramen has a reputation for having a rich and very delicious soup.'"
  },
  {
    sentence: "彼はまだ２０代前半なのに、まるでベテラン社員（　　）落ち着いて仕事をしている。",
    options: ["みたいに", "そうに", "らしく", "っぽく"],
    answer: 0,
    pattern: "まるで〜みたいに・ように",
    explanation: "Paired with 「まるで」, 「名詞＋みたいに（／のように）」 expresses a simile ('just like a veteran employee'). Sentence: 'Even though he is still in his early twenties, he works calmly just like a veteran employee.'"
  },
  {
    sentence: "「来週の飲み会、山田さんも来るかな。」「さあ、彼は最近忙しい（　　）から、来られないかもしれないよ。」",
    options: ["そうだ", "らしい", "ぷりだ", "がちだ"],
    answer: 1,
    pattern: "〜らしい（伝聞・推量）",
    explanation: "「〜らしいから」 expresses reliable secondhand inference ('apparently he is busy lately, so...'). Sentence: '\"I wonder if Yamada will come to next week's party.\" \"Well, apparently he's busy lately, so he might not be able to come.\"' Note that hearsay 「そうだ」 rarely precedes 「から」 directly."
  },
  {
    sentence: "この薬は食後に飲む（　　）と説明書に書いてあります。",
    options: ["ために", "ことに", "ように", "そうに"],
    answer: 2,
    pattern: "〜ように（指示・伝達）",
    explanation: "「〜ように（と）書いてある／言われた」 reports an indirect instruction or command ('it is written to take this medicine after meals'). Sentence: 'It is written in the instructions to take this medicine after meals.'"
  },
  {
    sentence: "皆さまのご健康とご多幸を心よりお祈りして（　　）。",
    options: ["いらっしゃいます", "なさいます", "おります", "くださいます"],
    answer: 2,
    pattern: "謙譲語・丁重語（〜ております）",
    explanation: "「〜ております」 is the humble/formal polite form of 「〜ています」, used for the speaker's own action. Sentence: 'I sincerely pray for everyone's health and happiness.' The other options are honorific forms."
  },

  // Day 33 (161–165)
  {
    sentence: "この川（　　）まっすぐ歩いていくと、右手に大きな公園が見えてきます。",
    options: ["によって", "にとって", "にそって", "につれて"],
    answer: 2,
    pattern: "〜に沿って",
    explanation: "「名詞＋に沿って」 means 'along (a river, road, or plan)'. Sentence: 'If you walk straight along this river, a large park will come into view on your right.'"
  },
  {
    sentence: "この小説は、実際に起きた事件（　　）書かれたそうだ。",
    options: ["にとって", "につれて", "にそって", "にもとづいて"],
    answer: 3,
    pattern: "〜にもとづいて",
    explanation: "「名詞＋にもとづいて」 means 'based on (facts, data, or an actual event)'. Sentence: 'I heard this novel was written based on an incident that actually happened.'"
  },
  {
    sentence: "地球温暖化の問題は、今や世界（　　）で議論されている。",
    options: ["じゅう", "ちゅう", "おき", "ぶり"],
    answer: 0,
    pattern: "〜中（じゅう）",
    explanation: "「場所・期間＋中（じゅう）」 means 'all over / throughout' (世界中 = all over the world). Sentence: 'The issue of global warming is now being discussed all over the world.'"
  },
  {
    sentence: "冬になると風邪をひき（　　）なので、手洗いやうがいを徹底している。",
    options: ["っぱなし", "がち", "かけ", "きり"],
    answer: 1,
    pattern: "〜がち",
    explanation: "「動詞ますstem／名詞＋がち」 means 'prone to / tending to (something negative)' (風邪をひきがち = prone to catching colds). Sentence: 'Because I tend to catch colds in winter, I thoroughly wash my hands and gargle.'"
  },
  {
    sentence: "あんなに一生懸命練習した（　　）、一回戦で負けてしまって本当に悔しい。",
    options: ["おかげで", "ために", "にもかかわらず", "にしたがって"],
    answer: 2,
    pattern: "〜にもかかわらず",
    explanation: "「〜にもかかわらず」 means 'despite / in spite of'. Sentence: 'Despite having practiced so hard, I lost in the first round and feel truly frustrated.'"
  },

  // Day 34 (166–170)
  {
    sentence: "来週のキャンプに参加する人は、金曜日までに参加費を払う（　　）。",
    options: ["もの", "わけ", "はず", "こと"],
    answer: 3,
    pattern: "〜こと（規則・命令）",
    explanation: "Sentence-final 「辞書形／ない形＋こと」 is used in written notices and rules to state a requirement ('must pay'). Sentence: 'Those participating in next week's camp must pay the participation fee by Friday.'"
  },
  {
    sentence: "急に引っ越すことになり、家具を全部買い替え（　　）なった。",
    options: ["ざるを得なく", "ないわけにはいかなく", "っこなく", "ようがなく"],
    answer: 0,
    pattern: "〜ざるを得ない",
    explanation: "「〜ざるを得ない」 (adverbial `〜ざるを得なくなった`) means 'have no choice but to / cannot help doing'. Sentence: 'It was suddenly decided that I would move, and I had no choice but to replace all my furniture.'"
  },
  {
    sentence: "この地域では、駅前の新しいショッピングモール（　　）街の再開発が進められている。",
    options: ["をはじめ", "を中心に", "にかけて", "につれて"],
    answer: 1,
    pattern: "〜を中心に",
    explanation: "「名詞＋を中心に」 means 'centered on / focusing around'. Sentence: 'In this area, urban redevelopment is progressing centered around the new shopping mall in front of the station.'"
  },
  {
    sentence: "ボランティア活動（　　）、いろいろな世代の人と知り合うことができた。",
    options: ["にそって", "につれて", "を通じて", "にかけて"],
    answer: 2,
    pattern: "〜を通じて・〜を通して",
    explanation: "「名詞＋を通じて（／を通して）」 means 'through (an activity or medium)'. Sentence: 'Through volunteer activities, I was able to get to know people of various generations.'"
  },
  {
    sentence: "あの小説家の作品は、若いころから晩年（　　）多くの読者に愛され続けた。",
    options: ["につれて", "にそって", "によって", "にわたって"],
    answer: 3,
    pattern: "〜にわたって",
    explanation: "「〜にわたって」 means 'spanning over / throughout (a long period or wide area)'. Sentence: 'That novelist's works continued to be loved by many readers from his youth right through his later years.'"
  }
];
