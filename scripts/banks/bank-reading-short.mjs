export const SHORT_PASSAGES = [
  {
    id: "short-1",
    style: "notice",
    title: "【市立図書館からのお知らせ】",
    passage:
      "来週の月曜日（10日）から木曜日（13日）まで、館内の照明工事のため休館いたします。通常、休館中も正面玄関横の返却ポストをご利用いただけますが、今回は玄関周辺の足場組み立て作業に伴い、11日と12日の終日は返却ポストもご使用になれません。この2日間に返却予定の本をお持ちの方は、駅前出張所の返却ボックスをご利用いただくか、14日以降にカウンターへお持ちください。",
    question: "11日と12日に本を返したい人はどうしなければならないか。",
    options: [
      "駅前の返却ボックスに入れるか、14日以降に図書館へ持って行く。",
      "図書館の正面玄関横にある返却ポストに本を入れる。",
      "工事が始まる10日の夕方までに図書館のカウンターへ返す。",
      "休館が明ける13日の朝に図書館の返却ポストへ入れる。"
    ],
    answer: 0,
    explanation:
      "The notice states that on the 11th and 12th the main entrance return post cannot be used due to scaffolding work, so users should either use the station branch return box or bring books to the counter on or after the 14th (Option 0). Option 1 is blocked on those two days, and Options 2 and 3 misstate the dates/rules."
  },
  {
    id: "short-2",
    style: "essay",
    title: null,
    passage:
      "会議や授業の内容を忘れないように、黒板や画面をスマートフォンで撮影する人が増えている。確かに正確で手間もかからないが、写真を撮っただけで安心してしまい、後から見返さないことも多いのではないだろうか。一方、手でノートに書く場合は、すべての言葉を写せないため、自然と大事な点だけを選んで自分の言葉にまとめることになる。記憶に残るのは、記録の正確さよりも、その場で頭を働かせたかどうかだ。",
    question: "筆者がこの文章で一番言いたいことは何か。",
    options: [
      "スマートフォンで撮影した写真は、その日のうちに見返すべきだ。",
      "手で要点をまとめながら書くほうが、頭を使うため記憶に残りやすい。",
      "会議や授業では、一言も漏らさず正確にノートに書き写すことが大切だ。",
      "写真と手書きのノートを両方使えば、大切な内容を絶対に忘れない。"
    ],
    answer: 1,
    explanation:
      "The author argues that writing notes by hand forces you to select key points and use your brain on the spot, which makes the content stick in memory better than merely taking photos (Option 1). Option 0 is advice not given as the main point, Option 2 contradicts the text ('cannot copy every word'), and Option 3 is not mentioned."
  },
  {
    id: "short-3",
    style: "email",
    title: "件名：本日の企画会議の資料について",
    passage:
      "森さん、お疲れ様です。山本です。今、取引先からオフィスへ向かっているのですが、人身事故で電車が止まってしまい、14時からの企画会議に15分ほど遅れそうです。会議自体は予定通り先に始めていてください。ただ、私が配る予定だった資料が共有フォルダの「10月企画」に入っていますので、申し訳ありませんが、会議が始まる前に10部印刷して参加者に配っておいてもらえますか。到着次第すぐ合流します。",
    question: "森さんはこのメールを読んで、まず何をしなければならないか。",
    options: [
      "企画会議の開始時間を15分遅らせるよう参加者に連絡する。",
      "山本さんが取引先から戻るまで会議室の前で待機する。",
      "共有フォルダにある資料を10部印刷して、会議の前に配る。",
      "「10月企画」の資料を修正して、山本さんにメールで送る。"
    ],
    answer: 2,
    explanation:
      "Yamamoto asks Mori to print 10 copies of the file in the '10月企画' shared folder and distribute them to participants before the meeting starts (Option 2). Option 0 contradicts 'start on schedule without waiting', and Options 1 and 3 are not requested."
  },
  {
    id: "short-4",
    style: "letter",
    title: "拝啓　新緑の季節となりましたが、いかがお過ごしでしょうか。",
    passage:
      "高橋先生、ご無沙汰しております。卒業してから早くも3ヶ月が経ち、先月から念願だった駅前のパン屋で働き始めました。最初は早朝の仕込みに慣れず、失敗して落ち込むこともありましたが、学生時代に先生からいただいた「焦らず一つずつ丁寧に取り組めば大丈夫」という言葉を思い出し、ようやく楽しく仕事ができるようになってきました。お近くにお越しの際は、ぜひお店にもお立ち寄りください。敬具",
    question: "この手紙を書いた目的として、最も適切なものはどれか。",
    options: [
      "パン屋の仕事が厳しいため、転職の相談に乗ってほしいと頼むこと。",
      "新しく開店するパン屋のアルバイトを先生に紹介してもらうこと。",
      "早朝の仕事に遅刻してしまった理由を先生に謝ること。",
      "先生に近況を報告し、学生時代の励ましの言葉に感謝を伝えること。"
    ],
    answer: 3,
    explanation:
      "The former student writes to update Professor Takahashi on working at a bakery and express gratitude for the encouraging advice given during school days (Option 3). None of the other options match the positive update in the letter."
  },
  {
    id: "short-5",
    style: "notice",
    title: "【駐輪場シール貼り替えのお願い】",
    passage:
      "当マンションでは、放置自転車の整理のため、来月1日より駐輪場の利用シールを青色から黄色へ変更いたします。現在自転車を停めている方は、今月28日までに1階管理室にて新しい黄色いシールを受け取り、後ろの泥除けなど外から見えやすい場所に貼ってください。来月1日以降、黄色いシールが貼られていない自転車は、以前の青いシールが貼ってあっても撤去の対象となりますのでご注意ください。",
    question: "駐輪場を引き続き利用したい人は、どうしなければならないか。",
    options: [
      "今月28日までに管理室で黄色いシールをもらい、自転車の見えやすい場所に貼る。",
      "来月1日以降に管理室へ行き、青いシールを黄色いシールと交換してもらう。",
      "今月28日までに自転車を駐輪場から別の場所へ一時的に移動させる。",
      "青いシールがよく見えるように、自転車の後ろの泥除けをきれいに拭いておく。"
    ],
    answer: 0,
    explanation:
      "Residents continuing to use the bicycle lot must pick up the new yellow sticker at the 1st-floor management office by the 28th of this month and attach it to a visible spot (Option 0). Option 1 is too late, and Options 2 and 3 misinterpret the instructions."
  },
  {
    id: "short-6",
    style: "essay",
    title: null,
    passage:
      "人間関係でトラブルが起きたとき、早くその場を収めようとして、相手が話し終わらないうちに「すみません」と謝ってしまう人がいる。しかし、謝られた側は「何に怒っているのかまだ伝えていないのに、本当に反省しているのだろうか」と、かえって不満を強めることがある。謝罪の言葉はもちろん大切だが、まずは相手の話を最後まで遮らずに聞き、相手が何を問題に感じているのかを正確に理解することが先決だ。",
    question: "筆者によると、トラブルが起きたときにまずどうすべきか。",
    options: [
      "相手が怒り出す前に、できるだけ早く謝罪の言葉を伝える。",
      "相手の話を最後まで聞いて、相手が何を問題に思っているか理解する。",
      "自分に原因がない場合は、最後まで謝らないように注意する。",
      "その場では何も言わず、翌日になってから手紙やメールで謝る。"
    ],
    answer: 1,
    explanation:
      "The passage emphasizes that before rushing to apologize, you should first listen to the other person to the end without interrupting and understand what they consider the problem (Option 1). Option 0 is the exact mistake criticized in the text."
  },
  {
    id: "short-7",
    style: "email",
    title: "件名：空調設備の点検および清掃のお知らせ",
    passage:
      "社員各位　総務部の佐藤です。今週土曜日（18日）の午前9時から午後3時まで、業者によるオフィス内のエアコン点検とフィルター清掃を実施します。当日、作業員が脚立を使って窓際の天井付近で作業を行うため、窓際の席の人は、金曜日の退社時までに机の上の書類やパソコンをすべて引き出しに片付けておいてください。なお、作業中もオフィスへの出入りは可能ですが、空調は終日停止いたします。",
    question: "窓際の席の社員が金曜日の退社時までにしなければならないことは何か。",
    options: [
      "土曜日にオフィスへ入る予定があるかどうかを総務部に連絡する。",
      "自分の机と椅子をオフィスの廊下へ移動させておく。",
      "机の上に置いてある書類やパソコンを引き出しの中にしまう。",
      "エアコンの電源を切り、窓の鍵が開いているか確認する。"
    ],
    answer: 2,
    explanation:
      "Employees sitting near the windows are asked to put away all documents and PCs from the tops of their desks into drawers before leaving work on Friday (Option 2). Moving desks (Option 1) or reporting Saturday attendance (Option 0) is not requested."
  },
  {
    id: "short-8",
    style: "essay",
    title: null,
    passage:
      "夜なかなか眠れないと悩む人には、朝の散歩を勧めたい。人間の体内時計は24時間より少し長いため、毎朝太陽の光を浴びることでリセットされる仕組みになっている。そして、光を浴びてから約15時間後に眠気をもたらすホルモンが分泌され始める。曇りの日でも、屋外には室内の照明よりずっと強い自然光が届いているため十分効果がある。夜の過ごし方を工夫するだけでなく、まず朝の習慣を見直してみてはどうだろうか。",
    question: "朝の散歩が夜の睡眠に良い影響を与えるのはなぜか。",
    options: [
      "朝からたくさん歩いて体を疲れさせることで、夜ぐっすり眠れるから。",
      "晴れた日に強い紫外線を浴びると、体内の温度が一日中下がるから。",
      "朝の冷たい空気を吸うことで、夜の寝具が温かく感じられるから。",
      "朝の自然光を浴びることで体内時計が整い、夜になると眠気が出るから。"
    ],
    answer: 3,
    explanation:
      "Morning outdoor light resets the body clock and triggers sleep hormone secretion about 15 hours later, even on cloudy days (Option 3). Option 0 focuses on physical exhaustion (not mentioned), and Option 1 falsely limits the effect to sunny UV rays."
  },
  {
    id: "short-9",
    style: "notice",
    title: "【ポイントカード規約変更のご案内】",
    passage:
      "日頃よりスーパーマルシェをご利用いただき、誠にありがとうございます。これまで当店のポイントは「カード発行日から1年間」を有効期限としておりましたが、11月1日より「最後にお買い物をされた日から1年間」に変更いたします。これにより、年に1回以上当店でお買い物をしていただければ、貯まったポイントが失効することはなくなります。なお、カードの作り直しなどの手続きは必要ございません。",
    question: "11月1日からポイントカードの仕組みはどう変わるか。",
    options: [
      "年に1回以上買い物をすれば、ポイントの有効期限が切れなくなる。",
      "11月中にサービスカウンターで新しいカードに交換する必要がある。",
      "カードを作ってから1年が経つと、自動的にポイントがすべて消える。",
      "1回の買い物につき、これまでの2倍のポイントがつくようになる。"
    ],
    answer: 0,
    explanation:
      "From November 1, points remain valid for one year from the last purchase date, meaning points never expire as long as you shop at least once a year (Option 0). Option 1 contradicts 'no replacement procedure needed', and Option 2 describes the old rule."
  },
  {
    id: "short-10",
    style: "letter",
    title: "由美さんへ",
    passage:
      "お元気ですか。今年も庭の木でたくさん梅が採れたので、手作りの梅ジャムを送ります。砂糖を控えめにして煮詰めたので、ヨーグルトやパンによく合うと思います。ただ、市販のものと違って保存料を一切使っていないため、瓶を開ける前なら涼しい場所で1ヶ月ほど持ちますが、一度開けたら必ず冷蔵庫に入れて、1週間以内に食べ切ってくださいね。また感想を聞かせてください。　叔母より",
    question: "この梅ジャムの保存方法について、正しいものはどれか。",
    options: [
      "瓶を開ける前でも必ず冷蔵庫に入れ、1週間以内に食べ切る。",
      "瓶を開けた後は冷蔵庫に入れ、1週間以内に食べ切る。",
      "保存料が入っていないため、届いたその日のうちに全部食べる。",
      "瓶を開けた後も涼しい場所に置けば、1ヶ月間はそのまま食べられる。"
    ],
    answer: 1,
    explanation:
      "The aunt explains that unopened jars last about a month in a cool place, but once opened, they must be kept in the refrigerator and eaten within one week (Option 1). Options 0 and 3 mix up opened and unopened conditions."
  },
  {
    id: "short-11",
    style: "email",
    title: "件名：防災セミナー会場変更のご案内",
    passage:
      "防災セミナーにお申し込みいただいた皆様へ。今週末の15日（日）に市民会館で開催予定の本セミナーですが、希望者が当初の予想を大きく上回ったため、会場を3階の「第2会議室」から1階の「大ホール」へ変更いたします。開始時刻（13時30分）に変更はありません。当日は受付が混雑いたしますので、事前にお送りした参加証メールの画面をご準備の上、開始10分前までにお越しくださいますようお願いいたします。",
    question: "セミナーの参加者が気をつけなければならないことは何か。",
    options: [
      "会場が市民会館から別の建物に変更されたため、場所を確認する。",
      "開始時刻が10分早まったため、13時20分までに3階へ行く。",
      "当日は1階の大ホールへ行き、受付で参加証メールの画面を見せる。",
      "参加人数が増えたため、前日までに電話で再申し込みをする。"
    ],
    answer: 2,
    explanation:
      "The venue moved within the Civic Center from the 3rd floor to the 1st-floor Main Hall, and attendees should have their registration email screen ready at reception (Option 2). The building and start time did not change (Options 0 and 1)."
  },
  {
    id: "short-12",
    style: "essay",
    title: null,
    passage:
      "植物を大切に育てようとして、毎日欠かさず水をやる人がいるが、実はそれが原因で枯らしてしまうことも少なくない。土の中が常に水で満たされていると、根が呼吸できなくなって腐ってしまうからだ。また、少し土が乾く時間を作ることで、根は水を求めて土の奥深くまで伸び、丈夫な株に育つ。植物を育てるには、ただ世話を焼くのではなく、土の表面が乾いているかよく観察して待つことも大切なのである。",
    question: "筆者によると、植物に水をやるときに大切なことは何か。",
    options: [
      "毎日決まった時間に、少しずつ欠かさず水をやり続けること。",
      "根が腐らないように、土の表面がいつも湿っている状態を保つこと。",
      "植物が枯れそうになるまで、1ヶ月以上まったく水をやらないこと。",
      "毎日水をやるのではなく、土が乾いたのを確かめてから水をやること。"
    ],
    answer: 3,
    explanation:
      "The passage explains that watering every day can rot roots; instead, you should observe the soil and wait until the surface dries before watering so roots breathe and grow deep (Option 3)."
  },
  {
    id: "short-13",
    style: "notice",
    title: "【プール利用制限のお知らせ】",
    passage:
      "今月20日（土）から22日（月）までの3日間、当スポーツクラブの25メートルプールにて、子ども水泳教室の進級テストを実施いたします。そのため、各日とも午後3時から午後5時までの間、全6コースのうち4コースをテスト専用とさせていただきます。一般の会員様は残りの2コース（ウォーキング用1コース、遊泳用1コース）のみのご利用となります。混雑が予想されますので、あらかじめご了承ください。",
    question: "20日から22日の午後3時から午後5時の間、一般の会員はどうなるか。",
    options: [
      "25メートルプールのうち、2コースだけ利用することができる。",
      "子ども水泳教室のテストがあるため、プールには一切入れない。",
      "ウォーキング用のコースは使えないが、4コースで泳ぐことができる。",
      "事前に予約をした会員だけが、すべてのコースを利用できる。"
    ],
    answer: 0,
    explanation:
      "During 3:00–5:00 PM on those three days, 4 of the 6 lanes are reserved for kids' tests, leaving general members able to use only the remaining 2 lanes (Option 0)."
  },
  {
    id: "short-14",
    style: "essay",
    title: null,
    passage:
      "仕事帰りの空腹な状態でスーパーへ行くと、つい予定になかったお菓子や惣菜までカゴに入れてしまい、買いすぎて後悔することがよくある。お腹が空いているときは、目に入る食べ物がどれも普段より魅力的に見え、冷静な判断ができなくなるからだ。無駄な出費を減らすには、必要なものをメモしてから店に行くだけでなく、買い物に行く前に飴を一つなめるなどして、強い空腹感を和らげておくと効果的だ。",
    question: "筆者が勧めている、スーパーで買いすぎを防ぐ工夫は何か。",
    options: [
      "仕事帰りに毎日スーパーへ寄り、少しずつ食料品を買うようにする。",
      "必要なものをメモするほか、買い物前に少し何かを口にして空腹を抑える。",
      "お菓子や惣菜の売り場には、午前中のうちに買い物に行くようにする。",
      "予算オーバーを防ぐため、メモを持たずに必要なものだけ思い出して買う。"
    ],
    answer: 1,
    explanation:
      "To avoid impulse buying caused by hunger, the author recommends not only making a shopping list but also easing strong hunger beforehand, such as eating a piece of candy before going into the store (Option 1)."
  },
  {
    id: "short-15",
    style: "email",
    title: "件名：お客様アンケート案の確認のお願い",
    passage:
      "営業部メンバー各位　お疲れ様です、林です。来月から実施する「新商品に関するお客様アンケート」の質問案を作成し、添付ファイルでお送りします。質問数が多すぎると回答率が下がるため、現在の12問から8問程度に絞りたいと考えています。つきましては、削ってもよいと思う質問番号と、追加したい項目があれば、明後日（木曜日）の正午までにこのメールに返信してください。皆さんの意見をもとに金曜日までに完成させます。",
    question: "このメールを受け取った営業部のメンバーは、木曜日の正午までに何をするか。",
    options: [
      "添付されている12問のアンケートをお客様に送って回答を集める。",
      "自分で新しいアンケート用紙を8問作成し、林さんに提出する。",
      "削ってもよい質問番号や追加したい項目があれば、メールで返信する。",
      "金曜日までにアンケートの結果を集計して、会議で発表する。"
    ],
    answer: 2,
    explanation:
      "Hayashi asks team members to reply by noon Thursday with question numbers they think can be cut (to narrow 12 down to ~8) and any items they want added (Option 2)."
  },
  {
    id: "short-16",
    style: "letter",
    title: "定期歯科検診のご案内",
    passage:
      "青木様　いつも「さくら歯科クリニック」をご利用いただきありがとうございます。前回の検診から半年が経ちましたので、歯の健康チェックとクリーニングのご案内をお送りいたしました。青木様のご予約は【11月18日（水）午前10時】にお取りしております。この日時でご都合が悪い場合は、検診日の3日前までにお電話にて変更をお願いいたします。当日は保険証と診察券を忘れずにお持ちください。",
    question: "この案内状を受け取った青木さんがしなければならないことは何か。",
    options: [
      "11月18日の午前10時に行く場合でも、必ず3日前までに電話をする。",
      "検診を受けるかどうかを決め、ハガキに書いてクリニックへ返信する。",
      "11月18日までに新しい保険証と診察券をクリニックへ取りに行く。",
      "予約された日時に行けない場合は、3日前までに電話で変更を連絡する。"
    ],
    answer: 3,
    explanation:
      "An appointment is already booked for Nov 18 at 10 AM; if that date/time is inconvenient, Aoki needs to call to reschedule at least 3 days before the checkup (Option 3)."
  },
  {
    id: "short-17",
    style: "notice",
    title: "【料理教室にご参加の皆様へ】",
    passage:
      "今度の日曜日に開催される「秋の家庭料理教室」にお申し込みいただき、ありがとうございます。材料や調理器具はすべて会場で用意いたしますので、当日はエプロン、手を拭くタオル、筆記用具の3点をお持ちください。また、今回は衛生管理上の理由から、作った料理を会場内で召し上がっていただくのではなく、各自お持ち帰りいただきます。必ずフタがしっかり閉まる保存容器（2〜3個）をご持参ください。",
    question: "今回の料理教室の参加者が特に注意しなければならないことは何か。",
    options: [
      "作った料理を持ち帰るため、フタが閉まる保存容器を持参する。",
      "会場には調理器具がないため、包丁やまな板を自宅から持って行く。",
      "当日は会場で料理を食べるため、お皿とお箸を忘れずに持参する。",
      "材料費が変更になったため、当日の朝までにキャンセルの連絡をする。"
    ],
    answer: 0,
    explanation:
      "Ingredients and cooking tools are provided, and because participants will take the food home rather than eating at the venue for hygiene reasons, they must bring 2–3 tightly sealing containers alongside an apron, towel, and pen (Option 0)."
  },
  {
    id: "short-18",
    style: "essay",
    title: null,
    passage:
      "子どもがテストで良い点を取ったとき、「頭がいいね」と能力をほめるよりも、「毎日コツコツ漢字を練習したのがよかったね」と取り組み方をほめるほうがよいと言われる。能力だけをほめられると、子どもは「失敗したら頭が悪いと思われる」と不安になり、難しい問題への挑戦を避けるようになりがちだからだ。反対に、努力の過程を認められた子どもは、うまくいかないときも工夫を続けようとする力が育つ。",
    question: "子どもの取り組み方や努力の過程をほめると、どうなると述べられているか。",
    options: [
      "簡単な問題ばかり選んで、確実に満点を取ろうとするようになる。",
      "うまくいかないことがあっても、あきらめずに工夫を続けられるようになる。",
      "周りに頭が悪いと思われるのを恐れて、テストを嫌がるようになる。",
      "毎日ほめられないと、自分からは勉強しなくなってしまう。"
    ],
    answer: 1,
    explanation:
      "The passage states that children praised for the process of their effort develop the resilience to keep trying new approaches even when things do not go well (Option 1). Options 0 and 2 describe the negative effects of praising innate ability only."
  },
  {
    id: "short-19",
    style: "email",
    title: "件名：ご注文書籍の入荷状況について",
    passage:
      "川口様　いつも大変お世話になっております。みどり書店の田村です。先日ご注文いただいた『世界の建築写真集』が本日当店に入荷いたしましたが、検品したところ、表紙の角に小さな傷があることが分かりました。出版社に確認したところ、新しい商品を再手配する場合は到着までさらに1週間ほどかかるとのことです。傷の状態を見てから購入を決めたい、あるいは新しいものを待つなど、ご希望をお知らせいただけますでしょうか。",
    question: "書店がこのメールを送った用件は何か。",
    options: [
      "注文された本が絶版になり、取り寄せることができなくなったと伝えるため。",
      "本が予定通り入荷したため、今日中に店へ取りに来てほしいと頼むため。",
      "届いた本の表紙に傷があったため、どう対応すればよいか確認するため。",
      "本の代金が値上がりしたため、注文をキャンセルするかどうか尋ねるため。"
    ],
    answer: 2,
    explanation:
      "The bookstore clerk writes to inform Kawaguchi that the ordered architecture photo book arrived with a small scratch on the cover corner and asks whether Kawaguchi wants to inspect it or wait a week for a replacement copy (Option 2)."
  },
  {
    id: "short-20",
    style: "essay",
    title: null,
    passage:
      "京都などに残る昔ながらの町家は、通りに面した入り口の幅が狭く、奥へ細長く続いているのが特徴だ。そのため、外から見ると家の中は昼間でも暗くて蒸し暑そうに思えるかもしれない。しかし実際には、建物の真ん中に「坪庭」と呼ばれる小さな庭が設けられており、そこから光を取り込むと同時に、風の通り道を作って夏の暑さを和らげている。限られた土地で快適に暮らすための先人の知恵が詰まっているのだ。",
    question: "町家の真ん中に「坪庭」が作られているのはなぜか。",
    options: [
      "通りを歩く人たちに、美しい庭の花を見せて楽しませるため。",
      "入り口の幅を広く見せて、建物全体を大きく見せるため。",
      "冬に外から冷たい風が入ってこないように部屋を塞ぐため。",
      "細長い建物の奥にも光を取り入れ、風が通るようにするため。"
    ],
    answer: 3,
    explanation:
      "The inner courtyard (tsuboniwa) in the middle of a narrow, deep townhouse brings in natural light and creates a breeze pathway to ease summer heat (Option 3)."
  },
  {
    id: "short-21",
    style: "notice",
    title: "【断水およびエレベーター停止のお知らせ】",
    passage:
      "来週火曜日（24日）に、当ビルの貯水槽清掃と電気設備の法定点検を実施いたします。これに伴い、午前10時から正午までは館内すべての水道（トイレを含む）が使用できなくなります。また、午後1時から午後2時まではエレベーターが停止するため、階段をご利用いただくことになります。断水とエレベーター停止の時間帯は重なりませんが、ご不便をおかけいたしますのでご協力をお願いいたします。",
    question: "来週火曜日のビル内の設備利用について、正しいものはどれか。",
    options: [
      "午前10時から正午までは水道が使えず、午後1時から2時まではエレベーターが止まる。",
      "午前10時から午後2時まで、水道とエレベーターの両方がずっと使えなくなる。",
      "午前中はエレベーターが止まるが、トイレの水道は一日中いつも通り使える。",
      "正午から午後1時までの間だけ、ビル内のすべての階段と水道が閉鎖される。"
    ],
    answer: 0,
    explanation:
      "Water supply (including restrooms) is shut off from 10 AM to noon, and the elevator stops from 1 PM to 2 PM (Option 0). The notice explicitly states the two outage windows do not overlap."
  },
  {
    id: "short-22",
    style: "letter",
    title: "健太くん、久しぶり！",
    passage:
      "来月の高校の同窓会の案内、送ってくれてありがとう。幹事を引き受けてくれて本当に助かります。すごく楽しみにしていたんだけど、あいにくその週末から急な大阪出張が入ってしまい、どうしても出席できなくなってしまいました。せっかく声をかけてくれたのにごめんね。来月の中旬以降なら週末も空いているので、よかったら同窓会の写真を見せてもらいながら、近くで食事でもしましょう。また連絡します！　翔太",
    question: "翔太さんがこの手紙で伝えていることは何か。",
    options: [
      "来月の同窓会の幹事を健太さんの代わりに引き受けたいということ。",
      "出張で同窓会には行けないため、来月の中旬以降に健太さんと食事をしたいということ。",
      "同窓会の会場を大阪のレストランに変更してほしいということ。",
      "出張の予定がなくなったので、来月の同窓会に出席できるようになったということ。"
    ],
    answer: 1,
    explanation:
      "Shota apologizes that a sudden business trip to Osaka prevents him from attending next month's high school reunion, and suggests meeting Kenta for a meal from mid-next month onward to see photos (Option 1)."
  },
  {
    id: "short-23",
    style: "email",
    title: "件名：社員食堂のキャッシュレス化について",
    passage:
      "社員各位　福利厚生課よりお知らせします。昼休み時間帯のレジの混雑緩和のため、来月1日より社員食堂での支払いをキャッシュレス決済（社員証ICカードまたは交通系ICカード）のみといたします。これに伴い、食堂入り口にある現金専用の食券販売機は今月末をもって撤去されます。なお、社員証へのチャージ機は食堂前ロビーに2台設置いたしますので、食事の前にお済ませくださいますようお願いいたします。",
    question: "来月1日から社員食堂を利用する際、どうしなければならないか。",
    options: [
      "食堂の入り口にある食券販売機で、現金を使って食券を買う。",
      "毎月1日に福利厚生課へ行き、1ヶ月分の食事代を現金で払う。",
      "社員証のICカードか交通系ICカードを使って代金を支払う。",
      "昼休みの混雑を避けるため、前日までにメニューを予約しておく。"
    ],
    answer: 2,
    explanation:
      "Starting next month, the cafeteria will accept only cashless payments (employee ID IC card or transit IC card), and cash ticket machines will be removed at the end of this month (Option 2)."
  },
  {
    id: "short-24",
    style: "essay",
    title: null,
    passage:
      "インターネットで本を買うと、過去の購入履歴から「あなたへのおすすめ」が次々と表示されて便利だ。しかし、そればかりに頼っていると、自分がすでに興味を持っている分野の本ばかり読むことになり、世界が広がりにくい。たまには実際の書店に足を運び、普段は通らない棚の前をゆっくり歩いてみるといい。思わぬ表紙やタイトルに目を引かれて手に取った一冊が、新しい関心の扉を開いてくれることがある。",
    question: "筆者が実際の書店へ行くことを勧める理由は何か。",
    options: [
      "インターネットで買うよりも、実際の書店のほうが本を安く買えるから。",
      "店員に相談すれば、過去の購入履歴に合った本をすぐ探してくれるから。",
      "すでに興味がある分野の専門書だけを、効率よく集めることができるから。",
      "普段は興味を持たない分野の本と偶然出会い、関心が広がることがあるから。"
    ],
    answer: 3,
    explanation:
      "While online recommendations keep you inside your existing interests, walking past unfamiliar shelves in a physical bookstore lets you stumble upon unexpected books that open up new interests (Option 3)."
  },
  {
    id: "short-25",
    style: "notice",
    title: "【夜間特別開園時のご来園について】",
    passage:
      "11月3日から10日までの期間、当植物園では紅葉のライトアップに伴い、開園時間を午後8時30分まで延長いたします（最終入園は午後8時）。ただし、周辺道路の渋滞防止のため、当園の駐車場は通常通り午後5時に閉鎖となり、夜間はお車でのご来園ができません。午後5時以降にお越しのお客様は、電車および駅からの無料シャトルバスをご利用くださいますようお願いいたします。",
    question: "この期間中、午後5時以降に植物園へ行きたい人はどうしなければならないか。",
    options: [
      "駐車場が閉まっているため、電車や無料シャトルバスを利用して行く。",
      "午後8時までに植物園の駐車場に車を入れて、チケットを買う。",
      "前日までに自動車での来園予約をして、専用の駐車券を受け取る。",
      "午後5時以降は新たに入園できないため、午後5時前に入園しておく。"
    ],
    answer: 0,
    explanation:
      "Although the botanical garden stays open until 8:30 PM (last entry 8:00 PM), the parking lot closes at 5:00 PM as usual, so visitors coming after 5:00 PM must use the train and free shuttle bus (Option 0)."
  },
  {
    id: "short-26",
    style: "essay",
    title: null,
    passage:
      "人間の舌は、食べ物の温度によって味の感じ方が変わるという特徴を持っている。特に塩味は、熱いときほど感じにくく、冷めると強く感じやすい。そのため、煮込み料理やスープを作るときに、ぐつぐつ煮立っている状態で味見をして「ちょうどいい」と思うまで塩を入れると、食卓に出して少し冷めた頃には塩辛くなりすぎてしまう。塩加減を決めるときは、小皿に取って少し冷ましてから味を確かめるのがコツだ。",
    question: "スープなどの塩加減を決めるとき、どうすればよいと述べられているか。",
    options: [
      "鍋がぐつぐつ煮立っているうちに味見をして、塩を多めに入れる。",
      "熱い状態では塩味を感じにくいため、少し冷ましてから味見をする。",
      "冷めると塩味が消えてしまうため、食卓に出す直前に塩を足す。",
      "味見をすると舌が慣れるため、最初から最後まで味見をしないで作る。"
    ],
    answer: 1,
    explanation:
      "Because the tongue perceives saltiness less when food is piping hot and more strongly as it cools, you should let a small sample cool slightly on a dish before tasting to adjust salt (Option 1)."
  },
  {
    id: "short-27",
    style: "email",
    title: "件名：社内システム定期メンテナンスのお知らせ",
    passage:
      "社員各位　情報システム部です。来週日曜日（8日）の午後10時から翌月曜日の午前6時まで、社内サーバーのセキュリティ更新作業を行います。この時間帯は社内メールおよび共有フォルダへのアクセスが一切できません。また、セキュリティ強化のため、月曜日の朝に最初に出社してパソコンを起動した際、新しいパスワードの設定画面が表示されますので、現在のパスワードとは異なる8文字以上の英数字を入力してください。",
    question: "月曜日の朝、社員がパソコンを使うときにしなければならないことは何か。",
    options: [
      "午前6時より前に出社して、社内メールが使えるか確認する。",
      "情報システム部に電話をして、現在のパスワードを伝える。",
      "画面の案内に従って、これまでとは違う新しいパスワードを設定する。",
      "共有フォルダの中にある古いファイルをすべて削除する。"
    ],
    answer: 2,
    explanation:
      "When employees boot up their PCs on Monday morning after the maintenance, a password reset screen will appear and they must set a new alphanumeric password of 8+ characters different from their current one (Option 2)."
  },
  {
    id: "short-28",
    style: "letter",
    title: "松本様　先日は「旅館・翠山荘」にご宿泊いただき、誠にありがとうございました。",
    passage:
      "昨日お電話でご連絡いただきました通り、お部屋の洗面台に忘れられていた銀色の腕時計を、本日宅配便にて発送いたしました。明日の午前中にはご自宅に届くかと存じます。なお、恐縮ではございますが、送料は規定によりお客様のご負担（着払い）とさせていただいておりますので、お受け取りの際に配達員へお支払いください。またのお越しを従業員一同、心よりお待ち申し上げております。",
    question: "この手紙と一緒に送られた腕時計を受け取るとき、松本さんはどうするか。",
    options: [
      "腕時計が届いたら、旅館に銀行振込で宿泊代金を支払う。",
      "明日の午前中に旅館へ行き、フロントで直接腕時計を受け取る。",
      "腕時計が壊れていないか確認し、配達員に腕時計を返却する。",
      "荷物を受け取るときに、配達員に送料を支払う。"
    ],
    answer: 3,
    explanation:
      "The inn shipped the forgotten silver wristwatch by courier with cash-on-delivery shipping (着払い), so Matsumoto needs to pay the shipping fee to the delivery driver upon receipt (Option 3)."
  },
  {
    id: "short-29",
    style: "notice",
    title: "【お忘れ物預かり所の営業時間変更について】",
    passage:
      "北川駅をご利用のお客様へ。来月より、当駅改札横の「お忘れ物預かり所」の営業時間を、これまでの「午前8時〜午後9時」から「午前9時〜午後7時」に変更いたします。また、車内や駅構内で見つかった忘れ物の保管期間はこれまで通り3日間とし、4日目にはすべて中央警察署へ移送いたします。ただし、傘につきましては保管場所の都合上、翌日の夕方に警察署へ移送いたしますので、お早めにお問い合わせください。",
    question: "来月から北川駅で傘を忘れた場合、どうなるか。",
    options: [
      "忘れた翌日の夕方には中央警察署へ移されるため、早めに連絡する必要がある。",
      "3日間は駅の預かり所で保管され、4日目に中央警察署へ移される。",
      "午後9時まで駅の改札横にある預かり所で受け取ることができる。",
      "傘は預かり所では保管されないため、忘れた当日に処分される。"
    ],
    answer: 0,
    explanation:
      "While general lost items are kept for 3 days before going to the police station on day 4, umbrellas are transferred to the Central Police Station the evening of the very next day due to storage space limits (Option 0)."
  },
  {
    id: "short-30",
    style: "essay",
    title: null,
    passage:
      "短いメールへの返信や書類の整理など、5分もあれば終わるような小さな用事を「後でまとめてやろう」と先延ばしにしてしまうことはないだろうか。一つ一つは簡単なことでも、やり残した仕事がいくつも頭の中にあると、「あれもやらなければ」と無意識のうちに気にかかり、脳が疲れてしまう。5分以内でできることは、思いついたその場で片付けてしまうほうが、結果的に気持ちに余裕が生まれ、大きな仕事にも集中できる。",
    question: "筆者が5分以内で終わる小さな用事をすぐに片付けるべきだと言う理由は何か。",
    options: [
      "小さな用事を後回しにすると、やり方をすっかり忘れてしまうから。",
      "やり残したことが頭にあると無意識に気にかかり、脳が疲れてしまうから。",
      "大きな仕事よりも小さな用事のほうが、会社で高く評価されるから。",
      "週末にまとめて片付けるほうが、平日の仕事時間を短縮できるから。"
    ],
    answer: 1,
    explanation:
      "Leaving small tasks undone keeps them nagging at the back of your mind and causes mental fatigue; finishing tasks under 5 minutes immediately frees up mental space to focus on bigger work (Option 1)."
  },
  {
    id: "short-31",
    style: "email",
    title: "件名：梱包資材の納品日変更のお願い",
    passage:
      "三ツ星段ボール株式会社　営業部　原田様　いつもお世話になっております。青葉食品の佐々木です。先日注文いたしました商品の発送用段ボール箱（500枚）ですが、納品日を来週の月曜日（16日）から水曜日（18日）の午後に変更していただけないでしょうか。実は今週予定していた出荷作業が天候不良で遅れており、月曜日の時点では倉庫に空きスペースがない状態です。直前の変更で誠に申し訳ございませんが、ご検討をお願いいたします。",
    question: "佐々木さんが段ボール箱の納品日を遅らせてほしいと頼んでいる理由は何か。",
    options: [
      "段ボール箱の注文数を500枚からさらに増やしたいと考えているから。",
      "水曜日の午後にならないと、代金を支払う準備ができないから。",
      "出荷作業が遅れており、月曜日には倉庫に箱を置く場所がないから。",
      "来週の月曜日は会社が休日で、荷物を受け取る社員がいないから。"
    ],
    answer: 2,
    explanation:
      "Sasaki asks to push the cardboard box delivery from Monday the 16th to Wednesday afternoon the 18th because shipping delays this week have left no open space in the warehouse on Monday (Option 2)."
  },
  {
    id: "short-32",
    style: "essay",
    title: null,
    passage:
      "自宅で飼われている犬や猫に話しかけるとき、人間は言葉の意味が通じているかのように感じる。もちろん、動物が人間の複雑な文法や単語をすべて理解しているわけではない。しかし研究によると、犬や猫は飼い主の声の高さや話す速さ、顔の表情などから、相手が喜んでいるのか怒っているのかを敏感に読み取っているという。たとえ「いい子だね」という言葉でも、怖い顔と低い声で言えば、ほめられているとは感じないのだ。",
    question: "犬や猫に話しかけるときについて、本文の内容と合っているものはどれか。",
    options: [
      "犬や猫は人間の文法を正確に理解しているため、声の調子は関係ない。",
      "どんな表情や声で話しても、「いい子だね」と言えば動物は喜ぶ。",
      "動物には人間の感情がまったく伝わらないため、話しかけても意味がない。",
      "犬や猫は言葉の意味だけでなく、声の調子や表情から飼い主の感情を感じ取る。"
    ],
    answer: 3,
    explanation:
      "Dogs and cats pick up on their owner's pitch, speaking speed, and facial expressions to sense emotion; even praise words won't feel like praise if spoken in a low voice with an angry face (Option 3)."
  },
  {
    id: "short-33",
    style: "notice",
    title: "【小型充電式電池の捨て方について】",
    passage:
      "ハンディファン（携帯用扇風機）やワイヤレスイヤホンなどに使われている小型充電式電池は、強い衝撃が加わると発火する恐れがあり大変危険です。最近、これらが「燃やさないごみ」に混ざって出され、ごみ収集車や処理施設で火事になる事故が相次いでいます。不要になった小型充電式電池は、絶対にごみ集積所には出さず、端子部分にテープを貼った上で、市役所や家電量販店にある黄色の「回収ボックス」へ入れてください。",
    question: "不要になった小型充電式電池は、どのように処分しなければならないか。",
    options: [
      "端子にテープを貼り、市役所や家電量販店にある回収ボックスに入れる。",
      "透明な袋に入れて、燃やさないごみの日にごみ集積所へ出す。",
      "水の中に一晩つけてから、燃やすごみの日に袋に入れて出す。",
      "自分で分解して金属の部分だけを取り出し、資源ごみとして出す。"
    ],
    answer: 0,
    explanation:
      "To prevent fires in garbage trucks and facilities, small rechargeable batteries must never be put at regular trash drop-offs; tape the terminals and place them in yellow recycling boxes at city hall or electronics stores (Option 0)."
  },
  {
    id: "short-34",
    style: "letter",
    title: "陶芸体験教室「土の里」より作品完成のお知らせ",
    passage:
      "先月は当教室の1日陶芸体験にご参加いただき、ありがとうございました。お客様が作られたマグカップが本日無事に焼き上がりましたのでご連絡いたします。とてもきれいな緑色に仕上がっております。明日以降、営業時間内（午前10時〜午後5時、火曜定休）に当教室までお受け取りにお越しください。なお、保管期間は本日より2ヶ月間となっております。遠方などでご来店が難しい場合は、有料にて郵送も承りますのでお電話ください。",
    question: "このハガキを受け取った人が作品を受け取る方法として、正しいものはどれか。",
    options: [
      "火曜日の午前10時から午後5時の間に、教室へ直接取りに行く。",
      "2ヶ月以内に火曜日以外の営業時間内に取りに行くか、電話で有料の郵送を頼む。",
      "今日中に教室へ電話をして、無料で自宅まで送ってもらうよう頼む。",
      "2ヶ月が過ぎてから教室へ行き、緑色のマグカップを受け取る。"
    ],
    answer: 1,
    explanation:
      "The mug is ready and kept for 2 months; the customer can pick it up during open hours (10 AM–5 PM, closed Tuesdays) from tomorrow onward, or call to request paid shipping (Option 1)."
  },
  {
    id: "short-35",
    style: "email",
    title: "件名：田中課長の送別会および記念品について",
    passage:
      "第一営業部の皆様　お疲れ様です。中村です。来月末で大阪支社へ異動される田中課長の送別会を、25日（金）19時より駅前の「和食・さくら」で開催します。会費は記念品代を含めて一人4,500円です。また、送別会には都合がつかず欠席される方も、記念品代として500円を集めさせていただきます。お店の人数確定の都合がありますので、18日（金）までに中村へ出欠を連絡の上、経理の佐藤さんへお金をお渡しください。",
    question: "第一営業部のメンバーが18日までにしなければならないことは何か。",
    options: [
      "中村さんにお金を払い、佐藤さんに送別会の出欠を連絡する。",
      "送別会に欠席する場合は、連絡も記念品代の支払いもしなくてよい。",
      "中村さんに出欠を連絡し、佐藤さんに会費（欠席の人は記念品代）を払う。",
      "18日までに「和食・さくら」へ直接電話をして、自分の席を予約する。"
    ],
    answer: 2,
    explanation:
      "By the 18th, members must tell Nakamura whether they will attend and pay the money (4,500 yen for attendees, or 500 yen for the gift if absent) to Sato in accounting (Option 2). Option 0 swaps the two people's roles."
  },
  {
    id: "short-36",
    style: "essay",
    title: null,
    passage:
      "平日の睡眠不足を取り戻そうとして、日曜日に昼過ぎまで10時間以上寝てしまう人がいる。しかし、そんなに長く寝たのに、月曜日の朝になると普段以上に体が重く感じられることはないだろうか。これは、休日に起きる時間を大きくずらすことで、海外旅行をしたときのような「時差ぼけ」が体の中で起きてしまうためだ。休日に疲れを取りたいなら、起きる時間は平日との差を2時間以内にとどめ、昼間に20分程度の昼寝をするほうがよい。",
    question: "筆者によると、休日に平日の睡眠不足を補うにはどうするのがよいか。",
    options: [
      "日曜日は昼過ぎまで10時間以上眠り、月曜日に備えて体力を蓄える。",
      "土曜日の夜に徹夜をして、日曜日の夕方から月曜日の朝まで眠る。",
      "休日も平日とまったく同じ時間に起き、昼寝は絶対にしないようにする。",
      "起きる時間は平日より2時間以上遅らせず、日中に短い昼寝を取り入れる。"
    ],
    answer: 3,
    explanation:
      "Sleeping past noon on Sunday causes social jet lag; to recover properly, keep wake-up time within 2 hours of your weekday schedule and take a short (~20-minute) nap during the day (Option 3)."
  },
  {
    id: "short-37",
    style: "notice",
    title: "【展示室での写真撮影について】",
    passage:
      "当美術館で開催中の「近代デザイン展」では、第1展示室に限り、個人の記念用としてスマートフォンのカメラや小型カメラでの写真撮影が可能です。ただし、作品保護のためフラッシュの使用や、動画の撮影、三脚・自撮り棒の使用は固くお断りいたします。また、奥の第2展示室は他館からお借りしている貴重な作品が多いため、一切の撮影を禁止しております。ルールを守ってご鑑賞くださいますようお願いいたします。",
    question: "この展覧会での撮影について、認められているのはどれか。",
    options: [
      "第1展示室で、フラッシュを使わずにスマートフォンで写真を撮ること。",
      "第1展示室で、音が出ないように注意してスマートフォンで動画を撮ること。",
      "第2展示室で、フラッシュを使わずに自分の気に入った作品を1枚だけ撮ること。",
      "第1展示室で、他の客の邪魔にならない場所で三脚を使って写真を撮ること。"
    ],
    answer: 0,
    explanation:
      "Still photography with a smartphone or small camera is allowed only in Exhibition Room 1 without flash, video, tripods, or selfie sticks, and all photography is banned in Room 2 (Option 0)."
  },
  {
    id: "short-38",
    style: "essay",
    title: null,
    passage:
      "楽器の演奏や外国語の会話などを身につけようとするとき、週末にまとめて2時間練習するよりも、毎日15分ずつ練習するほうが上達が早いと言われる。週末だけの練習だと、次の週までに感覚を忘れてしまい、思い出すだけで時間の半分を使ってしまうからだ。一方、短い時間でも毎日触れれば、前日の感覚が残っているため少しずつ前に進める。忙しくて時間が取れない日も、5分だけでいいから楽器やテキストに触れる習慣をつけたい。",
    question: "週末にまとめて練習するよりも、毎日少しずつ練習するほうがよいのはなぜか。",
    options: [
      "1週間あたりの練習時間の合計が、週末にまとめてやるより長くなるから。",
      "前の日の感覚を忘れずに続けられるため、少しずつ確実に上達できるから。",
      "毎日15分以上練習すると、疲れてしまって集中力が続かなくなるから。",
      "楽器や外国語は、1日に2時間以上練習してもまったく効果がないから。"
    ],
    answer: 1,
    explanation:
      "Practicing a little every day retains the feel from the previous day so you can steadily progress, whereas once-a-week practice wastes half the time just remembering what you forgot (Option 1)."
  },
  {
    id: "short-39",
    style: "email",
    title: "件名：お預かりしたコートの染み抜きについて",
    passage:
      "井上様　いつも白洋クリーニングをご利用いただきありがとうございます。昨日お預かりいたしました白いウールのコートですが、右袖に古い油性の染みが見つかりました。通常のクリーニングコースでは完全に落とすことが難しく、別料金（800円）の「特殊染み抜き加工」が必要となります。また、この加工を行う場合、お渡し日が予定より2日遅れの来週水曜日となります。加工をご希望されるか、通常の洗浄のみでよいかご返信ください。",
    question: "クリーニング店がこのメールで井上さんに尋ねていることは何か。",
    options: [
      "白いコートの右袖に染みがついた原因に心当たりがあるかどうか。",
      "明日すぐにコートを返却するので、店まで取りに来られるかどうか。",
      "別料金と追加の日数をかけて、特殊な染み抜き加工を行うかどうか。",
      "染みが落ちないため、新しいコートに買い替える予定があるかどうか。"
    ],
    answer: 2,
    explanation:
      "The dry cleaner found an old oil stain on the right sleeve that normal cleaning cannot fully remove, and asks whether Inoue wants the special stain removal treatment (800 yen extra, 2 days later pickup) or standard cleaning only (Option 2)."
  },
  {
    id: "short-40",
    style: "letter",
    title: "謹啓　秋冷の候、皆様にはますますご清栄のこととお慶び申し上げます。",
    passage:
      "さて、私こと、このたび10月1日付で福岡支社へ転勤となり、先日無事に引っ越しを終えました。本社在勤中は、皆様に温かいご指導とご協力をいただき、心より感謝しております。慣れない土地での新生活と新しい業務にまだ緊張する毎日ですが、本社で学んだことを生かして精一杯努めてまいります。福岡へお越しの際は、ぜひご連絡ください。まずは書中をもちまして、御礼かたがたご挨拶申し上げます。敬具",
    question: "この手紙はどのような目的で書かれたものか。",
    options: [
      "福岡支社から本社へ異動になったため、これからよろしくと挨拶するため。",
      "本社を退職して福岡で新しい会社を作ったことを報告するため。",
      "福岡への出張が決まったため、現地の詳しい情報を教えてもらうため。",
      "転勤先での新生活の報告と、本社で世話になったことへのお礼を伝えるため。"
    ],
    answer: 3,
    explanation:
      "The sender reports having moved to the Fukuoka branch office on October 1 and thanks colleagues at headquarters for their warm guidance and support (Option 3)."
  },
  {
    id: "short-41",
    style: "notice",
    title: "【営業時間変更のお知らせ】",
    passage:
      "いつも「ベーカリー麦の穂」をご利用いただきありがとうございます。当店は通常、午前7時から午後7時まで営業しておりますが、来週の月曜日（16日）から金曜日（20日）までの5日間、新商品の製造研修を行うため、閉店時間を2時間繰り上げて「午後5時閉店」とさせていただきます。なお、朝の開店時間（午前7時）に変更はございません。また、21日（土）からは通常通り午後7時まで営業いたします。",
    question: "16日から20日までの5日間、このパン屋はどうなるか。",
    options: [
      "午前7時に開店し、いつもより2時間早い午後5時に閉店する。",
      "製造研修のため、月曜日から金曜日まで5日間ずっと休業する。",
      "開店時間が2時間遅くなり、午前9時から午後7時まで営業する。",
      "新商品が売り切れ次第、午前中でもお店を閉めることになる。"
    ],
    answer: 0,
    explanation:
      "From Monday the 16th through Friday the 20th, the bakery opens at 7 AM as usual but closes 2 hours early at 5 PM for new product training (Option 0)."
  },
  {
    id: "short-42",
    style: "essay",
    title: null,
    passage:
      "ことわざには、「急がば回れ」のように慎重さを勧めるものがある一方で、「善は急げ」のように素早い行動を勧めるものもあり、一見すると反対のことを言っているように思える。しかし、これはことわざが矛盾しているわけではない。人間には、焦って失敗しやすい場面もあれば、迷いすぎて機会を逃しやすい場面もあるため、それぞれの状況に応じた戒めが残されたのだ。大切なのは、今の自分にどちらの言葉が必要かを見極めることである。",
    question: "反対の意味に見えることわざが両方存在することについて、筆者はどう考えているか。",
    options: [
      "昔の人々の考え方が統一されていなかったため、誤って伝わったものだ。",
      "人間が置かれる状況によって、慎重さが必要な時と素早さが必要な時があるからだ。",
      "現代では役に立たないことわざが多いため、どちらか一方に決めるべきだ。",
      "いつでも「急がば回れ」を優先し、「善は急げ」は使わないほうが安全だ。"
    ],
    answer: 1,
    explanation:
      "The author explains that proverbs seem opposite because people sometimes fail by rushing and other times miss opportunities by hesitating; what matters is discerning which lesson fits your current situation (Option 1)."
  },
  {
    id: "short-43",
    style: "email",
    title: "件名：３月分の交通費精算の締め切りについて",
    passage:
      "営業部各位　経理部の吉田です。毎月の営業交通費の精算書は、通常「月末の最終営業日」を提出期限としていますが、今月（3月）は年度末の決算処理が重なるため、締め切りを【3月27日（金）午後5時】に前倒しいたします。27日までに発生した交通費はすべてこの日時までに申請してください。なお、28日から31日までの間に外出予定がある方は、その分だけ4月1日の午前中に別途提出してください。",
    question: "3月分の交通費精算について、営業部の社員はどうしなければならないか。",
    options: [
      "3月31日の午後5時までに、3月分の交通費をすべてまとめて提出する。",
      "28日から31日までの交通費も事前に計算して、27日までにすべて提出する。",
      "27日までの分は27日午後5時までに提出し、28日以降の分は4月1日午前中に提出する。",
      "決算処理が忙しいため、3月分の交通費はすべて4月末にまとめて提出する。"
    ],
    answer: 2,
    explanation:
      "Because of fiscal year-end closing, expenses up to March 27 must be submitted by 5 PM on Friday March 27, while expenses incurred from the 28th to the 31st should be submitted separately on the morning of April 1 (Option 2)."
  },
  {
    id: "short-44",
    style: "essay",
    title: null,
    passage:
      "音楽を聴きながら作業をすると効率が上がると考える人は多いが、実は作業の内容によって効果は大きく異なる。部屋の掃除や食器洗いのような慣れた単純作業では、好きな音楽を流すことで気分が明るくなり、体がリズミカルに動いて早く終わることが多い。しかし、文章を読んだり書いたりする作業のときに歌詞のある音楽を聴くと、耳から入る言葉に脳の注意が奪われ、かえって集中力が落ちてしまう。作業に合わせて音を選ぶ工夫が必要だ。",
    question: "作業中に音楽を聴くことについて、本文の内容と合っているものはどれか。",
    options: [
      "どんな作業であっても、好きな歌詞の音楽を聴けば集中力が高まる。",
      "掃除や食器洗いをするときは、音楽を聴くと手が止まって遅くなる。",
      "文章を書くときは、初めて聴く歌詞の音楽を流すと良い考えが浮かぶ。",
      "単純作業には音楽が向いているが、読み書きの時は歌詞のある音楽は集中を妨げる。"
    ],
    answer: 3,
    explanation:
      "Music boosts mood and pace during routine physical chores like cleaning or washing dishes, whereas music with lyrics competes for verbal attention and lowers concentration when reading or writing (Option 3)."
  },
  {
    id: "short-45",
    style: "notice",
    title: "【ハイキングコース一部通行止めのお知らせ】",
    passage:
      "先日の大雨の影響により、緑山山頂へ続く「渓谷ルート」の途中にある木橋が破損しているのが確認されました。現在、安全確保のため渓谷ルートは全面通行止めとし、橋の修理工事を行っております（11月末完了予定）。この期間に山頂を目指される方は、案内板に従って反対側の「尾根ルート」へ迂回してください。尾根ルートは渓谷ルートより所要時間が20分ほど長くなりますので、お帰りのバスのお時間にご注意ください。",
    question: "11月末までに緑山山頂へ行きたい人は、どうしなければならないか。",
    options: [
      "渓谷ルートは通れないため、20分ほど長くかかる尾根ルートを通る。",
      "木橋の手前まで渓谷ルートを歩き、そこから引き返してバスに乗る。",
      "修理工事が終わる11月末まで、どのルートからも山頂へ登ることはできない。",
      "尾根ルートの橋が壊れているため、安全のために渓谷ルートを通る。"
    ],
    answer: 0,
    explanation:
      "Because the wooden bridge on the valley route is damaged and closed until the end of November, hikers heading to the summit must detour via the ridge route, which takes about 20 minutes longer (Option 0)."
  },
  {
    id: "short-46",
    style: "letter",
    title: "302号室の鈴木様へ",
    passage:
      "いつもお世話になっております。お隣の301号室の小川です。実は来週の月曜日（9日）から水曜日（11日）までの3日間、自宅の浴室のリフォーム工事を行うことになりました。作業時間は各日とも午前9時から午後5時までの予定ですが、特に初日の午前中は古いタイルを剥がす作業があるため、大きな音や振動が出ると業者から聞いております。ご迷惑をおかけして大変申し訳ございませんが、どうぞよろしくお願いいたします。",
    question: "小川さんがこの手紙を書いた目的は何か。",
    options: [
      "鈴木さんの部屋から毎日大きな音がするため、静かにしてほしいと頼むこと。",
      "来週、自宅の浴室工事で大きな音が出るため、前もって隣人に詫びておくこと。",
      "工事の間、302号室の浴室を3日間貸してほしいと鈴木さんに頼むこと。",
      "月曜日の午前中に業者が302号室へ入るため、家にいてほしいと伝えること。"
    ],
    answer: 1,
    explanation:
      "Ogawa in Room 301 writes to neighbor Suzuki in Room 302 to apologize in advance for noise and vibration during bathroom remodeling from Monday through Wednesday next week, especially Monday morning (Option 1)."
  },
  {
    id: "short-47",
    style: "email",
    title: "件名：台風による休講分の振替授業について",
    passage:
      "火曜夜クラス（中級英会話）受講生の皆様へ。先週火曜日（10日）は台風接近のため臨時休講となり、ご迷惑をおかけいたしました。休講分の振替授業を、今月28日（土）の午後2時〜3時30分に実施いたします。担当講師と教室は普段と同じです。なお、28日のご都合が悪い方には、当日の授業を録画した動画を期間限定で配信いたしますので、26日（木）までに事務局へメールでご連絡ください。",
    question: "28日（土）の振替授業に出席できない受講生は、どうすればよいか。",
    options: [
      "来月の火曜日の昼間に、個人レッスンを無料で受ける予約をする。",
      "28日の授業が始まる前までに、担当の講師に直接電話をして断る。",
      "26日までに事務局へメールをして、授業の録画動画を配信してもらう。",
      "台風による休講のため、申請すれば1回分の授業料を返金してもらえる。"
    ],
    answer: 2,
    explanation:
      "Students who cannot attend the Saturday makeup class on the 28th should email the school office by Thursday the 26th to receive access to a recorded video of the lesson (Option 2)."
  },
  {
    id: "short-48",
    style: "essay",
    title: null,
    passage:
      "部屋をきれいに片付けようと思ったとき、最初に収納用の箱や棚を買いに行く人がいるが、これは失敗しやすいやり方だ。箱が増えると、本来なら捨てるべき不要なものまで「せっかく箱があるから」と詰め込んでしまい、結局部屋の物の総量は減らない。それどころか、箱そのものが場所を取って部屋がさらに狭くなることもある。片付けの正しい順番は、まず使っていない物を手放し、残った物の量を確かめてから収納場所を決めることだ。",
    question: "筆者によると、部屋を片付けるときにまず何をすべきか。",
    options: [
      "部屋の広さを測り、大きさがぴったり合う収納用の箱や棚を買ってくる。",
      "部屋にある物をすべて箱の中に隠して、外から見えないようにする。",
      "新しい物を買うのをやめて、今ある箱をすべて捨ててしまう。",
      "収納用品を買う前に、まず使っていない不要な物を整理して減らす。"
    ],
    answer: 3,
    explanation:
      "Buying storage boxes first causes people to keep clutter and lose space; the proper order is to first get rid of unused items and see how much remains before deciding on storage (Option 3)."
  },
  {
    id: "short-49",
    style: "notice",
    title: "【順番予約システム導入のお知らせ】",
    passage:
      "当院では、待合室での長い待ち時間を減らすため、来月よりスマートフォンやパソコンから当日の診察の順番が取れる「オンライン順番予約システム」を導入いたします。ご自宅で番号を取り、自分の番号の5番前になりましたらご来院ください。なお、このシステムは「何時何分」という時間を指定する予約ではありません。呼び出し時に院内にいらっしゃらない場合は順番が後になりますので、余裕をもってお越しください。",
    question: "新しく導入される予約システムについて、正しいものはどれか。",
    options: [
      "自宅で順番の番号を取り、自分の番号が近づいてから病院へ行けばよい。",
      "前日までに「午前10時30分」のように希望する診察時刻を指定できる。",
      "オンラインで番号を取っておけば、自分の番号が過ぎても最優先で診察してもらえる。",
      "来月からは病院の窓口で直接受付をすることができなくなる。"
    ],
    answer: 0,
    explanation:
      "Patients can get a queue number online from home on the day of their visit and come to the clinic when their number is 5 away, reducing waiting room time (Option 0). It is not a specific time-slot reservation (Option 1), and missing your call pushes your turn back (Option 2)."
  },
  {
    id: "short-50",
    style: "essay",
    title: null,
    passage:
      "会話の途中で沈黙が生まれると、「気まずい」「何か話さなければ」と焦ってしまう人が多い。しかし、相手から質問されたり相談を受けたりしたとき、間を置かずにすぐ答えることだけが誠実さではない。少し黙って「ええと、そうですね…」と考える時間があるからこそ、相手は「自分の言葉を真剣に受け止めて考えてくれている」と感じて安心することもある。沈黙を恐れず、言葉を丁寧に選ぶ間を大切にしたい。",
    question: "会話の中で少し黙って考える時間があることについて、筆者はどう述べているか。",
    options: [
      "相手を不安にさせてしまうため、どんな質問にも即座に答えるべきだ。",
      "相手の話を真剣に受け止めて考えていることが伝わり、安心感を与えることもある。",
      "会話が途切れて気まずくなるため、すぐに別の話題に変えたほうがよい。",
      "相手の質問が理解できなかったときにだけ、黙って考えるふりをするのがよい。"
    ],
    answer: 1,
    explanation:
      "Pausing briefly to think before answering a question or consultation can reassure the other person that you are taking their words seriously and choosing your response carefully (Option 1)."
  },
  {
    id: "short-51",
    style: "email",
    title: "件名：貸出用傘の返却のお願い",
    passage:
      "社員各位　総務課の渡辺です。正面玄関に設置している「急な雨の日の貸出用傘（持ち手に緑色のテープが巻いてあるもの）」ですが、本来の20本から現在3本にまで減っており、雨の日に借りられない人が出て困っています。自宅に持ち帰ったままになっている人や、自分のロッカーに入れている人は、今週中に玄関の傘立てへ戻してください。また、個人の置き傘と区別するため、ご自身の傘には必ず名前を書いて保管してください。",
    question: "総務課の渡辺さんが社員に求めていることは何か。",
    options: [
      "自宅にある不要な傘を会社へ持ってきて、総務課に寄付すること。",
      "会社のロッカーに入れてある個人の置き傘を、すべて自宅に持ち帰ること。",
      "借りたままの会社の傘を今週中に返し、個人の傘には名前を書くこと。",
      "雨が降った日は、正面玄関にある傘を使わずに自分で傘を買うこと。"
    ],
    answer: 2,
    explanation:
      "Watanabe asks employees who still have borrowed company umbrellas (marked with green tape on the handle) at home or in their lockers to return them to the entrance stand this week, and to label their own personal umbrellas (Option 2)."
  },
  {
    id: "short-52",
    style: "letter",
    title: "毎度ありがとうございます。信州・高橋果樹園です。",
    passage:
      "今年も冷え込みとともに、りんご（サンふじ）が甘く実る季節となりました。ご注文いただいたりんごを本日発送いたします。今回お送りするりんごを切ると、中心の周りが黄色く透き通っていることがありますが、これは「蜜（みつ）」と呼ばれるもので、傷んでいるわけではありません。太陽の光をたっぷり浴びて完熟した証拠ですので、安心してお召し上がりください。乾燥を防ぐため、ポリ袋に入れて冷蔵庫の野菜室で保存してください。",
    question: "このりんごの中心の周りが黄色く透き通っているとき、どういう状態か。",
    options: [
      "配送中に温度が上がりすぎて、中から傷み始めている状態。",
      "まだ熟しておらず酸っぱいため、数日間置いておく必要がある状態。",
      "冷凍庫に入れて凍らせてしまったため、水分が抜けた状態。",
      "太陽の光を浴びてしっかり熟し、蜜が入っているおいしい状態。"
    ],
    answer: 3,
    explanation:
      "The translucent yellow area around the core is 'mitsu' (honey/nectar), which is not spoilage but proof that the apple ripened fully in plenty of sunlight and is safe and delicious to eat (Option 3)."
  },
  {
    id: "short-53",
    style: "notice",
    title: "【共用廊下への私物放置禁止について】",
    passage:
      "最近、資源ごみの回収日の数日前から、玄関前の共用廊下に潰した段ボール箱や古新聞を置いている住戸が見受けられます。共用廊下は火災や地震が起きた際の大切な避難通路であり、消防法によって物を置くことが厳しく禁じられています。また、強風で飛ばされて通行人のケガにつながる恐れもあります。段ボールや古新聞は、回収日の当日の朝（午前8時まで）に出すよう、それまでは必ず各住戸内で保管してください。",
    question: "段ボール箱や古新聞を出すとき、マンションの住民はどうしなければならないか。",
    options: [
      "回収日の当日の朝まで部屋の中に置いておき、午前8時までに出す。",
      "回収日の前日の夜までに、玄関前の共用廊下の隅にまとめて置いておく。",
      "風で飛ばないように紐で縛れば、いつでも共用廊下に置いておいてよい。",
      "火災を防ぐため、マンションの敷地内では段ボール箱を一切出せない。"
    ],
    answer: 0,
    explanation:
      "Because shared hallways are emergency evacuation routes where placing items is prohibited by fire safety law, residents must keep cardboard and old newspapers inside their units until the morning of collection day (by 8 AM) (Option 0)."
  },
  {
    id: "short-54",
    style: "essay",
    title: null,
    passage:
      "外国語を話すとき、頭の中でまず母語の文を作り、それを単語ごとにそのまま外国語に置き換えようとすると、不自然な表現になりやすい。例えば、日本語では部屋に入るときに「お邪魔します」と言うが、これをそのまま英語に訳しても、英語圏の人が同じ場面で使う自然な挨拶にはならない。言葉を学ぶときは、単語の意味を一対一で覚えるだけでなく、「こういう場面では何と言うか」という状況とセットで覚えることが大切だ。",
    question: "筆者によると、外国語で自然な表現を身につけるにはどうすればよいか。",
    options: [
      "母語の文を頭の中で作り、辞書を使って一語ずつ正確に翻訳する。",
      "単語を一対一で訳すのではなく、その言葉が使われる場面と一緒に覚える。",
      "日本語の「お邪魔します」のような挨拶は、外国語では何も言わないようにする。",
      "文法や場面のことは気にせず、知っている単語だけを並べて話す。"
    ],
    answer: 1,
    explanation:
      "Translating word-for-word from your native language produces unnatural expressions; instead, you should learn expressions paired with the real-life situations in which they are used (Option 1)."
  },
  {
    id: "short-55",
    style: "email",
    title: "件名：明日のプレゼン日程変更のご連絡",
    passage:
      "小野さん、体調はいかがでしょうか。熱が下がらないとのこと、とても心配しています。明日予定されていた東都商事様へのプレゼンですが、先方のご担当者も急な出張が入ったそうで、来週の水曜日（18日）に延期となりました。そのため、小野さんが担当していた資料の最終修正も今週中に急いでやる必要はなくなりました。会社のことは何も気にせず、今はしっかり休んで体を治すことに専念してくださいね。　木村",
    question: "木村さんが小野さんにこのメールを送った主な目的は何か。",
    options: [
      "明日のプレゼンに使う資料を、今日中に自宅からメールで送ってもらうため。",
      "小野さんの代わりに木村さんが明日プレゼンをすることを報告するため。",
      "明日のプレゼンが来週に延期になったと伝え、安心して休んでもらうため。",
      "来週の水曜日は別の会議があるため、プレゼンの担当を外れてもらうため。"
    ],
    answer: 2,
    explanation:
      "Kimura writes to tell Ono (who is out sick with a fever) that tomorrow's client presentation was postponed to next Wednesday, so there is no rush on the slides and Ono can rest without worrying about work (Option 2)."
  },
  {
    id: "short-56",
    style: "essay",
    title: null,
    passage:
      "ひどい肩こりに悩んで、肩を回したり揉んだりしても、しばらくするとまた痛くなるという人は多い。実は、肩こりの原因は肩の筋肉だけにあるとは限らない。長時間のパソコン作業で目を酷使していると、首から肩にかけての神経が緊張し、血流が悪くなって肩が固まってしまうのだ。また、画面を覗き込むような前かがみの姿勢も首に大きな負担をかける。肩をほぐすだけでなく、1時間に1回は遠くを見て目を休め、姿勢を正すことが欠かせない。",
    question: "肩こりを根本的に改善するために、筆者が勧めていることは何か。",
    options: [
      "痛みを感じたら、強い力で長時間ずっと肩の筋肉を揉み続ける。",
      "パソコン作業をするときは、画面に顔を近づけて目を動かさないようにする。",
      "肩を回す運動は逆効果になるため、肩には一切触れないようにする。",
      "肩をほぐすだけでなく、こまめに目を休めたり姿勢を正したりする。"
    ],
    answer: 3,
    explanation:
      "Because eye strain and hunched posture are underlying causes of stiff shoulders, rubbing your shoulders alone isn't enough; you also need to rest your eyes regularly (e.g., looking into the distance hourly) and correct your posture (Option 3)."
  },
  {
    id: "short-57",
    style: "notice",
    title: "【青空フリーマーケット出店者の皆様へ】",
    passage:
      "今度の日曜日（22日）に中央公園で開催されるフリーマーケットの出店受付は、午前8時から8時45分まで公園南口テントにて行います。午前9時以降は安全のため公園内へ手押し車や台車を持ち込むことができませんので、荷物の搬入は必ず8時45分までにお済ませください。なお、小雨の場合は予定通り開催いたしますが、強い雨や強風が予想される場合は、当日の午前6時に公式ホームページにて中止のお知らせを掲載いたします。",
    question: "フリーマーケットの出店者が当日気をつけなければならないことは何か。",
    options: [
      "午前8時から8時45分までの間に受付と荷物の搬入を済ませる。",
      "少しでも雨が降っている場合は自動的に中止になるため、会場へ行かない。",
      "午前9時を過ぎてから公園南口へ行き、台車を使って荷物を運ぶ。",
      "当日の午前6時までに公園へ行き、開催されるかどうかを確認する。"
    ],
    answer: 0,
    explanation:
      "Vendors must complete check-in and load-in between 8:00 and 8:45 AM because carts are not allowed inside the park after 9:00 AM (Option 0). Light rain does not cancel the event (Option 1), and weather cancellation is posted on the website at 6 AM (Option 3)."
  },
  {
    id: "short-58",
    style: "letter",
    title: "月刊『旅と写真』編集部より",
    passage:
      "三浦様　先日は当誌の読者コーナーへ、素晴らしい紅葉の風景写真をご応募いただき誠にありがとうございました。編集部内で選考の結果、三浦様の作品を来月号（12月10日発売）の特集ページに掲載させていただきたく存じます。つきましては、お名前（ペンネーム可）と撮影場所の公表に問題がないかご確認の上、同封の同意書にご記入いただき、11月15日までに返信用封筒にてご返送くださいますようお願いいたします。",
    question: "この手紙を受け取った三浦さんが、写真を雑誌に載せてもらうためにすることは何か。",
    options: [
      "11月15日までに、新しい紅葉の写真をもう一度編集部へ送る。",
      "同封されている同意書に記入し、11月15日までに返送する。",
      "12月10日に発売された雑誌を買って、自分の名前が載っているか確かめる。",
      "撮影した場所の地図を書いて、編集部に直接持って行く。"
    ],
    answer: 1,
    explanation:
      "To have the selected autumn foliage photo published in next month's issue, Miura needs to fill out the enclosed consent form confirming name/location publication and mail it back in the return envelope by November 15 (Option 1)."
  },
  {
    id: "short-59",
    style: "email",
    title: "件名：自転車通勤者の保険加入確認について",
    passage:
      "自転車通勤を登録している社員各位　人事部の加藤です。先月より県の条例が改正され、自転車利用者の損害賠償保険への加入が義務化されました。これに伴い、当社でも自転車通勤を許可する条件として、保険への加入確認を毎年行うことになりました。現在自転車で通勤している方は、保険証券のコピー（またはスマートフォンの契約画面のスクリーンショット）を、今月25日までに人事部宛てに提出してください。",
    question: "自転車で通勤している社員が今月25日までにしなければならないことは何か。",
    options: [
      "自転車での通勤をやめて、電車やバスでの通勤に切り替える届出を出す。",
      "自分の自転車を会社へ持って行き、人事部の点検を受ける。",
      "損害賠償保険に入っていることが分かる書類のコピーや画像を人事部に提出する。",
      "人事部にお金を払って、会社が用意した新しい自転車を購入する。"
    ],
    answer: 2,
    explanation:
      "Following a prefectural ordinance making bicycle liability insurance mandatory, employees who commute by bicycle must submit a copy of their insurance policy or a screenshot of their contract screen to HR by the 25th of this month (Option 2)."
  },
  {
    id: "short-60",
    style: "essay",
    title: null,
    passage:
      "お汁粉やあんこなどの甘い和菓子を作るとき、レシピの最後に「塩をひとつまみ入れる」と書かれているのを見て、不思議に思ったことはないだろうか。甘くしたいのに塩を入れたら、甘さが消えてしまいそうに思える。しかし実際には、ごく少量の塩味を加えることで、舌が対照的な甘みをより強く感じるようになり、砂糖ばかり大量に入れるよりもすっきりとした上品な甘さに仕上がるのだ。スイカに塩をかけるのも同じ理由である。",
    question: "甘い和菓子を作るときに、塩をほんの少し入れるのはなぜか。",
    options: [
      "砂糖の甘さを消して、塩辛い味のお菓子に変えるため。",
      "長期間保存してもお菓子が固くならないようにするため。",
      "砂糖が足りないときに、塩で量を増やしてごまかすため。",
      "少しの塩味と対比させることで、甘みをより引き立たせるため。"
    ],
    answer: 3,
    explanation:
      "Adding a tiny pinch of salt creates flavor contrast on the tongue, making the sweetness stand out more cleanly than adding excessive sugar (Option 3)."
  },
  {
    id: "short-61",
    style: "notice",
    title: "【連泊のお客様へ・客室清掃のご案内】",
    passage:
      "当ホテルでは環境保護の取り組みとして、2泊以上ご滞在のお客様のお部屋につきましては、毎日のシーツ類の交換を控えさせていただいております。滞在中は、タオルの交換、ごみ箱の回収、お水の補充のみを毎日行います。ただし、衛生上4泊ごとに一度はシーツ交換を含む通常の全体清掃を実施いたします。それ以外の日でもシーツ交換をご希望の場合は、午前11時までにベッドの上に青いカードをお置きください。",
    question: "このホテルに2泊か3泊する客が、シーツを替えてほしい場合はどうすればよいか。",
    options: [
      "午前11時までに、ベッドの上に青いカードを置いておく。",
      "何もしなくても、毎日自動的にスタッフがシーツを交換してくれる。",
      "フロントへ古いシーツを自分で持って行き、新しいものと交換してもらう。",
      "4泊以上しない限り、どのような場合でもシーツの交換は頼めない。"
    ],
    answer: 0,
    explanation:
      "For multi-night stays, daily service normally covers only towel replacement, trash collection, and water refill (with full sheet change every 4th night), so if a guest wants sheets changed on another day, they should place the blue card on the bed by 11 AM (Option 0)."
  },
  {
    id: "short-62",
    style: "essay",
    title: null,
    passage:
      "一日の終わりにその日を振り返るとき、多くの人は「今日はあれができなかった」「あんな失敗をしてしまった」と、うまくいかなかったことばかりを思い出しがちだ。反省することも大切だが、毎日欠点ばかり数えていると気持ちが沈み、明日への意欲まで失われてしまう。眠る前や夕食のときには、「今日うまくいったこと」や「嬉しかった小さな出来事」を三つ探してみてはどうだろう。意識して良い面に目を向けることで、心が驚くほど軽くなる。",
    question: "筆者が一日の終わりにすることを勧めているのはどのようなことか。",
    options: [
      "その日に失敗したことをすべて紙に書き出して、深く反省する。",
      "その日にうまくいったことや嬉しかったことを意識して思い出す。",
      "仕事や勉強のことは一切思い出さないようにして、すぐに眠る。",
      "他人の欠点を見つけて、自分のほうが優れていると安心する。"
    ],
    answer: 1,
    explanation:
      "Instead of dwelling only on mistakes and what went wrong at the end of the day, the author recommends consciously looking for three things that went well or small happy moments to lighten your mind (Option 1)."
  },
  {
    id: "short-63",
    style: "email",
    title: "件名：修理ご依頼品の部品在庫について",
    passage:
      "藤井様　先日修理を承りました掃除機（2016年製）についてご報告いたします。故障の原因を調べたところ、モーター内部の部品が破損していることが分かりました。しかし、この機種はメーカーでの部品保有期間（製造終了から6年）が過ぎており、交換用の部品が手に入らないため修理ができません。ご希望に添えず誠に申し訳ございませんが、当店で使える後継機種の20％割引券をご用意いたしましたので、買い替えもご検討いただければ幸いです。",
    question: "このメールによると、藤井さんが依頼した掃除機の修理はどうなったか。",
    options: [
      "メーカーから部品を取り寄せたため、20％引きの料金で修理できる。",
      "故障の原因が分からなかったため、そのままメーカーの工場へ送られた。",
      "交換用の部品がもう手に入らないため、修理することができない。",
      "すでに修理が完了したため、新しい掃除機と一緒に自宅へ届けられる。"
    ],
    answer: 2,
    explanation:
      "Because the vacuum cleaner is from 2016 and past the manufacturer's 6-year parts retention period, the broken motor part is no longer available and the unit cannot be repaired; the shop offers a 20% discount coupon toward a successor model (Option 2)."
  },
  {
    id: "short-64",
    style: "letter",
    title: "吹奏楽部OB・OGの皆様へ",
    passage:
      "秋風の心地よい季節となりましたが、先輩方におかれましてはいかがお過ごしでしょうか。さて、私たち緑ヶ丘高校吹奏楽部は今年で創部30周年を迎え、来月23日（祝）に市民文化会館にて記念定期演奏会を開催することになりました。つきましては、第3部のステージにて、卒業生の皆様と現役部員が一緒に演奏する企画を準備しております。参加ご希望の方は、楽譜を送付いたしますので、今月30日までに同封のハガキをご返送ください。",
    question: "卒業生のうち、演奏会のステージで一緒に演奏したい人はどうすればよいか。",
    options: [
      "来月23日の当日に自分の楽譜を持って、直接市民文化会館へ行く。",
      "今月30日までに学校へ行き、現役の部員たちと練習を始める。",
      "市民文化会館に電話をして、記念演奏会の入場チケットを予約する。",
      "楽譜を送ってもらうため、今月30日までに同封のハガキを返送する。"
    ],
    answer: 3,
    explanation:
      "Alumni who wish to perform together with current band members in Part 3 of the 30th-anniversary concert should return the enclosed postcard by the 30th of this month so sheet music can be mailed to them (Option 3)."
  },
  {
    id: "short-65",
    style: "notice",
    title: "【駅前３番バス乗り場の一時移動のお知らせ】",
    passage:
      "駅前広場の歩道拡張工事に伴い、来週月曜日（6日）の始発便より、約1ヶ月間「3番バス乗り場（市民病院・中央公園方面）」の位置を、現在の場所から50メートル先の郵便局前へ一時的に移動いたします。バスの発車時刻および運行ルートに変更はございません。なお、1番・2番乗り場につきましては現在の場所のままご利用いただけます。お乗り間違いのないよう、お気をつけください。",
    question: "来週月曜日から約1ヶ月間、市民病院方面のバスに乗る人はどうしなければならないか。",
    options: [
      "50メートル先の郵便局前に移動した3番乗り場からバスに乗る。",
      "3番乗り場が使えないため、1番か2番乗り場から出るバスに乗る。",
      "バスの発車時刻が変更になったため、新しい時刻表を駅で確認する。",
      "駅前からはバスに乗れないため、次のバス停まで歩いて行く。"
    ],
    answer: 0,
    explanation:
      "Due to sidewalk expansion work, Bus Stop #3 (for City Hospital and Central Park) is temporarily relocated 50 meters ahead in front of the post office starting with the first bus next Monday, while departure times and routes remain unchanged (Option 0)."
  },
  {
    id: "short-66",
    style: "essay",
    title: null,
    passage:
      "人は「今日1日でできること」を多く見積もりすぎてしまい、反対に「1年間続ければできること」を少なく見積もってしまう傾向があるという。朝に無理な計画を立てて、夜に「今日も半分しか終わらなかった」とがっかりするのはその典型だ。1日で劇的な変化を起こそうと焦る必要はない。たとえ1日1ページの本でも、1年続ければ365ページになる。大切なのは、今日たくさんやることではなく、明日も続けられるペースを守ることだ。",
    question: "筆者がこの文章で最も伝えたいことは何か。",
    options: [
      "毎日できるだけ高い目標を立てて、1日のうちにすべて終わらせるべきだ。",
      "1日で多くのことをやろうと焦るより、毎日少しずつでも続けられるペースが大切だ。",
      "1年間続けても大きな成果は出ないため、短期集中で取り組むほうがよい。",
      "本を読むときは、1日に1ページ以上読まないように制限するべきだ。"
    ],
    answer: 1,
    explanation:
      "People overestimate what they can do in one day and underestimate a year of steady effort; rather than rushing to do too much in a single day, what matters is keeping a sustainable daily pace (Option 1)."
  },
  {
    id: "short-67",
    style: "email",
    title: "件名：金曜日の社用車利用について",
    passage:
      "第二営業部　橋本さん　お疲れ様です、総務の斉藤です。今週金曜日（13日）の社用車（白のプリウス）の予約表を確認したところ、午前9時〜13時が橋本さん、13時30分〜17時が開発部の村田さんの予約になっていました。次の村田さんがすぐに出発して遠方の工場へ向かうため、もし戻られた時点でガソリンの残量が半分以下になっていた場合は、会社指定のスタンドで給油してから駐車場へ戻していただけますでしょうか。よろしくお願いします。",
    question: "橋本さんが金曜日に社用車を使ったあと、どうしなければならないか。",
    options: [
      "ガソリンの残量にかかわらず、必ず満タンにしてから村田さんの自宅へ届ける。",
      "13時までに社用車を返し、午後は開発部の村田さんを乗せて工場まで運転する。",
      "戻ったときにガソリンが半分以下になっていたら、給油してから駐車場に戻す。",
      "金曜日は村田さんが朝から車を使うため、自分の予約を別の日に変更する。"
    ],
    answer: 2,
    explanation:
      "Because Murata from R&D has the car booked right after Hashimoto at 13:30 for a long trip to a factory, Saito asks Hashimoto to refill the tank at the designated gas station before returning the car to the lot if the fuel gauge is at half or below (Option 2)."
  },
  {
    id: "short-68",
    style: "essay",
    title: null,
    passage:
      "日本庭園や美術館の入り口から建物へ向かう通路は、わざとまっすぐではなく、ゆるやかに曲がりくねって作られていることが多い。目的地まで早く行くためなら直線にするほうが便利だが、あえて先が見通せない道にすることで、歩く人は自然と足取りを緩め、足元の苔や木々の揺れる音に意識を向けるようになる。曲がり道には、日常の慌ただしさから気持ちを切り替えさせ、これから見るものを味わう心の準備を整える役割があるのだ。",
    question: "日本庭園や美術館の通路が曲がりくねって作られているのはなぜか。",
    options: [
      "狭い土地を実際よりも広く見せて、多くの客を一度に並ばせるため。",
      "入り口から建物までの距離を短くして、お年寄りでも歩きやすくするため。",
      "訪問者が道に迷うようにして、庭園の中に長く滞在させるため。",
      "歩く速度を自然と落とさせ、周囲の自然を感じながら心を落ち着かせるため。"
    ],
    answer: 3,
    explanation:
      "Winding paths that hide the destination naturally slow visitors' footsteps, draw attention to moss and trees, and help them transition out of daily busyness so their minds are ready to appreciate what awaits (Option 3)."
  }
];
