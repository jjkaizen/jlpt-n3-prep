export const INFO_RETRIEVAL_PASSAGES = [
  {
    id: "info-1",
    title: "さくら市民体育館 スポーツ教室のご案内",
    intro: "春期（4月〜6月）のスポーツ教室の受講生を募集します。すべてのコースは週1回（月4回）です。健康づくりのために、ぜひご参加ください。",
    table: {
      headers: ["コース名", "曜日・時間", "対象", "料金（月謝）"],
      rows: [
        ["A リラックスヨガ", "水曜 10:00〜11:30", "18歳以上（初心者可）", "4,000円"],
        ["B 夜間バドミントン", "水曜 19:00〜20:30", "18歳以上（経験者のみ）", "4,500円"],
        ["C はじめての卓球", "土曜 10:00〜11:30", "小学生〜大人（初心者可）", "3,500円"],
        ["D エアロビクス", "土曜 14:00〜15:30", "18歳以上（初心者可）", "4,000円"],
        ["E シニア健康体操", "金曜 10:00〜11:30", "60歳以上", "3,000円"]
      ]
    },
    notes: "※初めて当体育館の教室に申し込む方は、月謝とは別に入会金1,000円が必要です。ただし、さくら市内在住・在勤の方は入会金が無料になります。\n※Bコースはラケットをご持参ください。Cコースはラケットの無料貸し出しがあります。",
    questions: [
      {
        prompt: "さくら市内に住んでいるリンさん（28歳・会社員）は、水曜日の夜か土曜日の午前に通える初心者向けのクラスを探している。初めて申し込む場合、最初の月に支払う金額はいくらか。",
        options: ["3,500円", "4,500円", "5,000円", "5,500円"],
        answer: 0,
        explanation: "Lin wants Wednesday night or Saturday morning and is a beginner. B (Wednesday night) is for experienced players only (経験者のみ), so she must choose C (Saturday 10:00-11:30, 3,500 yen). Since she lives in Sakura City, the 1,000-yen registration fee is waived, making the first month's total 3,500 yen."
      },
      {
        prompt: "隣の市に住み、隣の市で働いている佐藤さん（65歳）は、平日の午前に行われる教室に初めて申し込みたいと考えている。選ぶことができるコースと、最初の月に支払う金額の組み合わせとして正しいものはどれか。",
        options: [
          "AまたはE（どちらも4,000円）",
          "A（5,000円）またはE（4,000円）",
          "Eのみ（3,000円）",
          "Eのみ（4,000円）"
        ],
        answer: 1,
        explanation: "Sato is 65 and wants a weekday morning class. Both A (Wed 10:00, 18+) and E (Fri 10:00, 60+) meet his conditions. Because he neither lives nor works in Sakura City and is a first-time applicant, he must add the 1,000-yen registration fee to the monthly tuition: A costs 4,000 + 1,000 = 5,000 yen, and E costs 3,000 + 1,000 = 4,000 yen."
      }
    ]
  },
  {
    id: "info-2",
    title: "緑川市立図書館 5月のイベント・講座のお知らせ",
    intro: "緑川市立図書館では、5月に以下のイベントを開催します。参加をご希望の方は、申込方法をご確認のうえお手続きください。",
    table: {
      headers: ["イベント名", "開催日時", "対象・定員", "参加費・申込方法"],
      rows: [
        ["① 絵本の読み聞かせ会", "5月10日（土）14:00〜15:00", "幼児〜小学生（定員なし）", "無料・申込不要（当日直接会場へ）"],
        ["② 古文書（こもんじょ）入門講座", "5月14日（水）10:30〜12:00", "高校生以上（先着20名）", "資料代300円・電話または窓口で要予約"],
        ["③ 手作り製本ワークショップ", "5月18日（日）13:30〜16:00", "小学生以上（先着15名）", "材料費500円・窓口でのみ要予約"],
        ["④ 地元作家による講演会", "5月25日（日）14:00〜15:30", "どなたでも（先着50名）", "無料・電話またはホームページで要予約"]
      ]
    },
    notes: "※予約が必要なイベントの受付期間は、4月20日（日）9:00から開催日の3日前までです（定員になり次第締め切ります）。\n※③は小学3年生以下のお子様が参加する場合、保護者の同伴（同伴者は無料・予約不要）が必要です。",
    questions: [
      {
        prompt: "大学生のキムさんは、日曜日の午後に開催されるイベントに1人で参加したいと思い、5月1日に図書館のホームページから予約することにした。キムさんが予約できるイベントはどれか。",
        options: ["①と④", "③のみ", "④のみ", "③と④"],
        answer: 2,
        explanation: "Sunday afternoon events are ③ and ④ (① is Saturday, ② is Wednesday). Kim wants to reserve via the website (ホームページ). ③ can only be reserved at the counter (窓口でのみ要予約), whereas ④ accepts phone or website reservations. Thus, only ④ can be reserved this way."
      },
      {
        prompt: "田中さんは小学2年生の娘に「③ 手作り製本ワークショップ」を体験させたいと考えている。田中さんがしなければならないことはどれか。",
        options: [
          "5月15日までに電話で予約し、当日娘と一緒に行く。",
          "5月15日までに図書館の窓口で娘の分を予約し、当日500円を払って娘に付き添う。",
          "5月15日までに図書館の窓口で2人分予約し、当日1,000円を払う。",
          "予約は必要ないので、5月18日に娘と一緒に直接会場へ行く。"
        ],
        answer: 1,
        explanation: "Event ③ requires reservation at the library counter (窓口でのみ) at least 3 days before May 18 (by May 15). Because the daughter is a 2nd grader (3rd grade or below), a guardian must accompany her, and the accompanying guardian is free and does not need a reservation. The material fee is 500 yen."
      }
    ]
  },
  {
    id: "info-3",
    title: "あおば美術館 特別展「日本の近代風景画」チケットのご案内",
    intro: "開館時間：9:30〜17:30（金曜・土曜は20:00まで開館／入館は閉館の30分前まで）\n休館日：毎週月曜日（月曜日が祝日の場合は開館し、翌火曜日が休館）",
    table: {
      headers: ["区分", "当日券", "前売り券", "夜間割引券（金・土の17:00以降）"],
      rows: [
        ["一般", "1,600円", "1,400円", "1,200円"],
        ["大学生・高校生", "1,000円", "800円", "700円"],
        ["中学生以下", "無料", "—", "—"],
        ["シニア（65歳以上）", "1,200円", "1,000円", "1,000円"]
      ]
    },
    notes: "※大学生・高校生・シニアの方は、入館時に学生証または年齢が確認できる身分証明書をご提示ください。\n※20名以上の団体は、当日券の料金から1人につき200円引きになります（他の割引との併用はできません）。\n※特別展のチケットで常設展もご覧いただけます。",
    questions: [
      {
        prompt: "会社員の森さん（35歳）は、高校生の息子と中学2年生の娘を連れて、土曜日の17時30分に美術館に着いた。前売り券は持っていない。3人が入館するために支払う合計金額はいくらか。",
        options: ["1,900円", "2,200円", "2,600円", "3,000円"],
        answer: 0,
        explanation: "They arrive on Saturday at 17:30, so the evening discount (夜間割引券, valid Fri/Sat after 17:00) applies. Mori (General) pays 1,200 yen, the high school son pays 700 yen, and the junior high daughter is free. Total = 1,200 + 700 + 0 = 1,900 yen."
      },
      {
        prompt: "この美術館の利用について、案内と合っているものはどれか。",
        options: [
          "金曜日の19時40分に行けば、夜間割引券で入館できる。",
          "65歳以上の人が前売り券を買う場合、当日券より400円安くなる。",
          "一般25名のグループが火曜日の昼に当日券で入館する場合、1人1,400円になる。",
          "特別展を見る人は、常設展を見るために別料金を払う必要がある。"
        ],
        answer: 2,
        explanation: "A group of 20 or more gets 200 yen off the same-day ticket price (1,600 - 200 = 1,400 yen). Option 1 is wrong because admission ends 30 minutes before closing (19:30 on Fridays). Option 2 is wrong because senior advance tickets are 200 yen cheaper (1,000 vs 1,200). Option 4 is wrong because the special exhibition ticket includes the permanent exhibition."
      }
    ]
  },
  {
    id: "info-4",
    title: "ひまわり歯科クリニック 診療時間・担当医のご案内",
    intro: "当院は予約優先制です。初診の方・急患の方は随時受け付けておりますが、お電話でご予約いただくと待ち時間が少なくなります。\n【休診日】木曜日・日曜日・祝日",
    table: {
      headers: ["時間帯", "月", "火", "水", "金", "土"],
      rows: [
        ["午前（9:30〜13:00）", "院長・佐藤", "院長・高橋", "佐藤・高橋", "院長・佐藤", "院長・高橋"],
        ["午後（14:30〜18:00）", "院長・佐藤", "院長・高橋", "佐藤", "院長・高橋", "院長（17:00まで）"],
        ["夜間（18:00〜20:00）", "佐藤", "—", "高橋", "佐藤", "—"]
      ]
    },
    notes: "※院長：一般歯科・インプラント担当／佐藤医師：一般歯科・小児歯科担当／高橋医師：一般歯科・矯正歯科担当\n※矯正歯科の相談（無料）は、高橋医師の担当時間帯のみ受け付けています（要電話予約）。\n※初診の方は、各診療終了時刻の30分前までに受付をお済ませください。",
    questions: [
      {
        prompt: "会社員の山本さんは、歯並びの矯正について相談したいと思っており、平日の18時以降か土曜日の午後に初めて受診したいと考えている。山本さんが予約できる曜日はどれか。",
        options: ["火曜日または土曜日", "水曜日のみ", "水曜日または金曜日", "水曜日または土曜日"],
        answer: 1,
        explanation: "Orthodontic consultation (矯正歯科) requires Dr. Takahashi. On weekday evenings (18:00-20:00), Dr. Takahashi is only on duty on Wednesday (Monday and Friday nights are Dr. Sato, Tuesday has no night hours). On Saturday afternoon, only the Director (院長) is on duty. Therefore, only Wednesday evening works."
      },
      {
        prompt: "5歳の子どもに虫歯が見つかったため、母親の鈴木さんは小児歯科の先生に診てもらいたいと考えている。初めてこのクリニックに行く場合、受診できる日時はどれか。",
        options: [
          "火曜日の11時00分",
          "木曜日の10時00分",
          "金曜日の19時45分",
          "水曜日の15時00分"
        ],
        answer: 3,
        explanation: "Pediatric dentistry (小児歯科) is handled by Dr. Sato. On Tuesday morning, Dr. Sato is not on duty. Thursday is closed. On Friday at 19:45, first-time patients must check in at least 30 minutes before closing (by 19:30). On Wednesday at 15:00, Dr. Sato is on duty (14:30-18:00), so that works."
      }
    ]
  },
  {
    id: "info-5",
    title: "みなとカルチャーセンター 1日料理教室のご案内",
    intro: "来月開催される1日体験料理教室の参加者を募集しています。エプロンと手拭きタオルをご持参ください。",
    table: {
      headers: ["講座名", "開催日・時間", "難易度", "受講料（材料費込み）"],
      rows: [
        ["① 基本の和食（だし巻き卵と煮物）", "6月7日（土）10:30〜13:00", "★☆☆（初心者向け）", "3,500円"],
        ["② 本格スパイスカレー", "6月8日（日）11:00〜13:30", "★★☆（中級者向け）", "4,000円"],
        ["③ 季節のフルーツタルト", "6月14日（土）14:00〜17:00", "★★★（上級者向け）", "4,800円"],
        ["④ 親子で作る手作りピザ", "6月15日（日）10:30〜13:00", "★☆☆（初心者向け）", "1組 4,500円（親1名＋子1名）"]
      ]
    },
    notes: "※ペア割引：①〜③の講座に2名以上でお申し込みの場合、1名につき受講料が500円引きになります。\n※④の講座にお子様を追加する場合は、1名につき1,500円が加算されます（対象は5歳〜小学生）。\n※キャンセルは開催日の3日前まで無料ですが、2日前からは材料費として受講料の50％をいただきます。",
    questions: [
      {
        prompt: "料理初心者の大学生マリアさんは、友人と2人で土曜日の講座に参加したいと考えている。2人合わせた受講料はいくらになるか。",
        options: ["6,000円", "7,000円", "8,600円", "9,600円"],
        answer: 0,
        explanation: "Maria is a beginner and wants a Saturday class, which matches ① 基本の和食 (Saturday, beginner, 3,500 yen per person). Since two people are applying together for a course in ①–③, the pair discount reduces each person's fee by 500 yen (3,000 yen each). Total for two = 6,000 yen."
      },
      {
        prompt: "高橋さんは、8歳と6歳の2人の子どもを連れて「④ 親子で作る手作りピザ」に参加する予定である。3人で参加する場合の合計料金はいくらか。",
        options: ["4,500円", "5,500円", "6,000円", "7,500円"],
        answer: 2,
        explanation: "Course ④ costs 4,500 yen for 1 parent + 1 child. Adding a second child (ages 5 to elementary school) adds 1,500 yen. Thus, 4,500 + 1,500 = 6,000 yen."
      }
    ]
  },
  {
    id: "info-6",
    title: "青空レンタサイクル ご利用案内",
    intro: "駅前ポートおよび公園前ポートで自転車の貸し出しを行っています。観光や買い物にぜひご利用ください。\n【営業時間】8:00〜19:00（年中無休）",
    table: {
      headers: ["車種", "4時間まで", "1日プラン（営業時間内）", "延長料金（30分ごと）"],
      rows: [
        ["普通自転車（大人用）", "600円", "1,000円", "150円"],
        ["電動アシスト自転車", "1,000円", "1,800円", "250円"],
        ["クロスバイク（スポーツ車）", "1,200円", "2,000円", "300円"],
        ["子ども用自転車", "400円", "700円", "100円"]
      ]
    },
    notes: "※借りたポートとは別のポートに返却する「乗り捨てサービス」は、1台につき追加料金300円でご利用いただけます（子ども用自転車は乗り捨て不可）。\n※ヘルメットは無料で貸し出しています（子どもは着用必須）。\n※料金は前払いです。「4時間まで」で借りて4時間を超えた場合は、返却時に延長料金をお支払いいただきます。",
    questions: [
      {
        prompt: "パクさんは駅前ポートで電動アシスト自転車を「4時間まで」のプランで9時00分に借り、公園前ポートに14時00分に返却した。パクさんが支払う合計金額（前払い分と返却時精算分の合計）はいくらか。",
        options: ["1,500円", "1,550円", "1,800円", "2,100円"],
        answer: 2,
        explanation: "Pak rented an electric-assist bicycle at 9:00 under the 'up to 4 hours' plan (1,000 yen upfront) and returned it at 14:00 (5 hours total = 1 hour overtime). Two 30-minute extensions cost 250 × 2 = 500 yen. Returning it to a different port adds the 300-yen drop-off fee. Total = 1,000 + 500 + 300 = 1,800 yen."
      },
      {
        prompt: "このレンタサイクルの利用について、正しいものはどれか。",
        options: [
          "大人用と子ども用の自転車を駅前ポートで借りて、両方とも公園前ポートに返却することができる。",
          "普通自転車を6時間利用する場合、「4時間まで」で借りて延長料金を払うより、「1日プラン」で借りたほうが安い。",
          "ヘルメットを借りる場合は、大人も子どもも追加料金が必要である。",
          "1日プランを申し込めば、19時を過ぎても追加料金なしで翌日返却できる。"
        ],
        answer: 1,
        explanation: "For a regular bicycle used for 6 hours: the 'up to 4 hours' plan (600 yen) + 2 hours (four 30-min blocks × 150 = 600 yen) costs 1,200 yen, whereas the 1-day plan costs 1,000 yen, so the 1-day plan is cheaper. Option 1 is wrong because children's bikes cannot use the one-way drop-off service."
      }
    ]
  },
  {
    id: "info-7",
    title: "みどり市 粗大（そだい）ごみの出し方と手数料",
    intro: "一辺の長さが50cm以上の家具や家電製品は「粗大ごみ」となります。処分する際は、事前に「粗大ごみ受付センター」へ電話またはインターネットで申し込んでください。",
    table: {
      headers: ["品目例", "サイズ区分", "収集手数料（自宅前回収）", "直接持ち込み手数料"],
      rows: [
        ["椅子・掃除機・扇風機", "小（50cm以上〜100cm未満）", "400円", "200円"],
        ["自転車・電子レンジ・こたつ", "中（100cm以上〜150cm未満）", "800円", "400円"],
        ["本棚・学習机・ソファ（1人用）", "大（150cm以上〜200cm未満）", "1,200円", "600円"],
        ["ベッド・大型タンス・ソファ（2人以上用）", "特大（200cm以上）", "2,000円", "1,000円"]
      ]
    },
    notes: "※自宅前回収をご希望の方は、コンビニ等で手数料分の「粗大ごみ処理券（シール）」を購入し、収集日の朝8時までに品物に貼って出してください。\n※清掃工場へ車で「直接持ち込み」をする場合は、処理券を買わずに、当日工場の窓口で現金でお支払いください（1回の持ち込みは5点まで）。\n※テレビ・冷蔵庫・洗濯機・エアコン・パソコンは市では収集できません。",
    questions: [
      {
        prompt: "引っ越しをする渡辺さんは、自転車（1台）と1人用ソファ（1つ）と洗濯機（1台）を処分したい。市の「自宅前回収」を利用する場合、市に回収してもらえる品目と、コンビニで買う処理券の合計金額はどれか。",
        options: [
          "自転車と1人用ソファと洗濯機（合計3,200円）",
          "自転車と1人用ソファ（合計2,000円）",
          "自転車と1人用ソファ（合計1,000円）",
          "1人用ソファのみ（1,200円）"
        ],
        answer: 1,
        explanation: "Washing machines (洗濯機) cannot be collected by the city (see notes). The city will collect the bicycle (Medium: 800 yen for curbside pickup) and the 1-person sofa (Large: 1,200 yen for curbside pickup). Total sticker cost = 800 + 1,200 = 2,000 yen."
      },
      {
        prompt: "車で清掃工場へ「直接持ち込み」をする場合の方法として、案内と合っているものはどれか。",
        options: [
          "予約をせずに、直接清掃工場へごみを持っていけばよい。",
          "事前にコンビニで粗大ごみ処理券を買って貼っておく必要がある。",
          "手数料は自宅前回収の半額になり、当日工場の窓口で現金で支払う。",
          "1度に何点でも持ち込むことができる。"
        ],
        answer: 2,
        explanation: "Direct drop-off fees are half the curbside pickup fees (200/400/600/1,000 vs 400/800/1,200/2,000), and you pay in cash at the facility counter on the day without buying stickers. Prior application is still required for all bulky waste, and drop-off is limited to 5 items per trip."
      }
    ]
  },
  {
    id: "info-8",
    title: "富士観光 秋の日帰りバスツアーのご案内",
    intro: "全コース中央駅西口バスターミナル出発！添乗員が同行するので安心です。最少催行人数は各コース15名です。",
    table: {
      headers: ["コース名", "出発・帰着時間", "昼食", "旅行代金（大人1名）"],
      rows: [
        ["A ぶどう狩り食べ放題とワイナリー見学", "8:30発〜17:30着", "バーベキュー付き", "8,500円"],
        ["B 紅葉の渓谷ハイキング（約8km歩行）", "7:30発〜18:30着", "各自持参（弁当なし）", "6,800円"],
        ["C 古都の寺社めぐりと抹茶体験", "9:00発〜18:00着", "老舗旅館の和食御膳", "9,800円"],
        ["D 海鮮市場でお買い物と絶景温泉", "8:00発〜17:00着", "海鮮丼付き", "9,000円"]
      ]
    },
    notes: "※小学生は大人代金の2,000円引き、幼児（3歳〜未就学児）は座席代として一律3,000円（昼食なし）となります。\n※早割特典：出発日の14日前までにお申し込みの方は、大人・小学生ともに1名につき500円引きになります。\n※Bコースは山道を歩きますので、登山靴または履き慣れた運動靴でご参加ください。",
    questions: [
      {
        prompt: "夫婦（大人2名）と小学4年生の息子の3人で、昼食が付いていて、朝8時30分以降に出発するコースに参加したい。出発日の20日前に申し込む場合、3人分の合計代金が最も安いコースを選ぶといくらになるか。",
        options: ["21,000円", "22,000円", "23,500円", "25,900円"],
        answer: 1,
        explanation: "Courses departing at or after 8:30 with lunch included are A (8:30, 8,500 yen) and C (9:00, 9,800 yen). The cheaper one is A. For 2 adults + 1 elementary school child: Adults = 8,500 × 2 = 17,000 yen; Elementary child = 8,500 - 2,000 = 6,500 yen. Subtotal = 23,500 yen. Applying 20 days before qualifies for the 14-day early discount of 500 yen off per adult/elementary child (500 × 3 = 1,500 yen off). Total = 23,500 - 1,500 = 22,000 yen."
      },
      {
        prompt: "大人1名と4歳の子ども1名で、出発の5日前に「D 海鮮市場でお買い物と絶景温泉」に申し込む場合、合計代金はいくらか。",
        options: ["11,000円", "11,500円", "12,000円", "16,000円"],
        answer: 2,
        explanation: "Applying 5 days before does not qualify for the early discount (requires 14 days prior). Course D adult price is 9,000 yen, and a 4-year-old preschooler (幼児) pays a flat 3,000 yen. Total = 9,000 + 3,000 = 12,000 yen."
      }
    ]
  },
  {
    id: "info-9",
    title: "さくらホテル ご宿泊のお客様へのご案内",
    intro: "ご宿泊いただき誠にありがとうございます。館内施設のご利用時間および追加サービスについては以下の通りです。",
    table: {
      headers: ["サービス・施設", "場所", "利用時間", "料金・備考"],
      rows: [
        ["朝食バイキング", "1階 レストラン", "6:30〜9:30（最終入店 9:00）", "1,500円（前日21時までの予約で1,200円）"],
        ["展望大浴場", "10階", "15:00〜24:00／翌6:00〜9:00", "無料（部屋のタオルをご持参ください）"],
        ["コインランドリー", "3階", "24時間", "洗濯機 1回300円／乾燥機 30分100円"],
        ["レイトチェックアウト", "フロント受付", "通常10:00 → 最大13:00まで", "1室1時間につき1,000円"]
      ]
    },
    notes: "※朝食付きの宿泊プランでお申し込みのお客様は、チェックイン時にお渡しした「朝食券」をレストラン入り口でご提示ください。\n※レイトチェックアウトをご希望の場合は、当日の朝9時までにフロントへお申し出ください（満室の場合はお断りすることがあります）。",
    questions: [
      {
        prompt: "素泊まり（食事なし）プランで1室に宿泊しているチョウさんは、前日の20時にフロントで翌朝の朝食を申し込み、同時にチェックアウト時間を12時までに延長したいと伝えた。チョウさんが追加で支払う合計金額はいくらか。",
        options: ["2,200円", "2,500円", "3,200円", "3,500円"],
        answer: 2,
        explanation: "Reserving breakfast before 21:00 the night before costs 1,200 yen. Extending checkout from the standard 10:00 to 12:00 is 2 hours at 1,000 yen per hour = 2,000 yen. Total additional charge = 1,200 + 2,000 = 3,200 yen."
      },
      {
        prompt: "ホテルの施設利用について、案内と合っているものはどれか。",
        options: [
          "朝9時15分に1階のレストランへ行けば、朝食バイキングを利用できる。",
          "10階の展望大浴場にはタオルが置いてあるので、部屋から持っていく必要はない。",
          "夜中の1時でも3階のコインランドリーで洗濯をすることができる。",
          "チェックアウトの延長は、10時のチェックアウト時刻ちょうどに申し出ればよい。"
        ],
        answer: 2,
        explanation: "The coin laundry on the 3rd floor is open 24 hours, so it can be used at 1:00 a.m. Option 1 is wrong because last entry for breakfast is 9:00. Option 2 is wrong because guests must bring towels from their room. Option 4 is wrong because late checkout must be requested by 9:00 a.m."
      }
    ]
  },
  {
    id: "info-10",
    title: "若葉日本語学校 夏期短期集中コースのご案内",
    intro: "7月開講の4週間短期集中コースの受講生を募集します。目的に合わせてクラスをお選びいただけます。",
    table: {
      headers: ["クラス名", "レベル目安", "授業時間（月〜金）", "受講料（4週間）"],
      rows: [
        ["日常会話コース", "初級（N4〜N5程度）", "9:15〜12:30", "55,000円"],
        ["総合日本語コース", "中級（N3程度）", "9:15〜12:30", "60,000円"],
        ["ビジネス日本語コース", "上級（N2以上）", "13:30〜16:45", "68,000円"],
        ["JLPT対策夜間コース", "N3クラス／N2クラス", "18:30〜20:30（火・木のみ）", "32,000円"]
      ]
    },
    notes: "※上記受講料のほかに、全コース共通で教材費3,000円が必要です。\n※当校の過去のコースを受講したことがある方（リピーター）は、受講料が10％割引になります（教材費は割引対象外）。\n※2つのコースを同時に受講する場合は、合計金額から5,000円引きになります（リピーター割引との併用可）。",
    questions: [
      {
        prompt: "現在N3レベルのアリさんは、初めてこの学校に申し込む。平日の午前のクラスと、火・木の夜間のクラスの両方を受講したいと考えている。教材費を含めて支払う合計金額はいくらか。",
        options: ["90,000円", "93,000円", "95,000円", "98,000円"],
        answer: 1,
        explanation: "Ali is N3 level and wants both the weekday morning class (総合日本語コース: 60,000 yen) and the Tue/Thu night class (JLPT対策夜間コース: 32,000 yen). Tuition subtotal = 92,000 yen. Taking two courses simultaneously gives a 5,000-yen discount (87,000 yen). Since each course requires the 3,000-yen textbook fee (3,000 × 2 = 6,000 yen), total = 87,000 + 6,000 = 93,000 yen."
      },
      {
        prompt: "昨年この学校の総合日本語コースを受講したスミスさんは、今回「ビジネス日本語コース」だけを申し込むことにした。教材費を含めて支払う金額はいくらか。",
        options: ["61,200円", "63,900円", "64,200円", "71,000円"],
        answer: 2,
        explanation: "Smith is a returning student (リピーター), so the 68,000-yen tuition for the Business Japanese course gets a 10% discount: 68,000 × 0.9 = 61,200 yen. Adding the 3,000-yen textbook fee (not discounted) gives 61,200 + 3,000 = 64,200 yen."
      }
    ]
  },
  {
    id: "info-11",
    title: "東山動物園 入園料・年間パスポートのご案内",
    intro: "開園時間：9:00〜16:30（入園は16:00まで）\n休園日：毎週水曜日",
    table: {
      headers: ["区分", "1日入園券", "年間パスポート", "団体料金（30名以上）"],
      rows: [
        ["大人（18歳〜64歳）", "800円", "3,000円", "640円"],
        ["シニア（65歳以上）", "400円", "1,500円", "320円"],
        ["高校生", "500円", "2,000円", "400円"],
        ["中学生以下", "無料", "—", "無料"]
      ]
    },
    notes: "※年間パスポートは購入日から1年間、何回でも入園できます。また、園内のレストランや売店で提示すると会計が5％引きになります。\n※毎月第3日曜日は「家族ふれあいの日」として、中学生以下の子どもと同伴する保護者は、子ども1人につき大人2人まで入園料が半額になります。\n※駐車場料金：普通車1日600円（年間パスポートをお持ちの方は1回300円）。",
    questions: [
      {
        prompt: "第3日曜日に、父（40歳）、母（38歳）、祖父（68歳）、高校生の長男、小学生の次男の5人で1台の普通車に乗って動物園へ行く。誰も年間パスポートを持っていない場合、入園料と駐車場料金の合計はいくらか。",
        options: ["1,900円", "2,300円", "2,700円", "3,100円"],
        answer: 1,
        explanation: "On the 3rd Sunday, having one elementary school child (中学生以下) allows up to 2 accompanying adults to get half-price admission: Father (400 yen) + Mother (400 yen). Grandfather (Senior: 400 yen), High school son (500 yen), Elementary son (0 yen). Parking for a regular car is 600 yen. Total = 400 + 400 + 400 + 500 + 0 + 600 = 2,300 yen."
      },
      {
        prompt: "32歳の会社員が1人で普通車に乗って動物園に行く場合、1年間に最低何回行けば、毎回「1日入園券」と通常の駐車場料金を払うより「年間パスポート」を買ったほうが安くなるか（家族ふれあいの日は利用しないものとする）。",
        options: ["3回", "4回", "5回", "6回"],
        answer: 0,
        explanation: "Without the annual pass, each visit with a car costs 800 (ticket) + 600 (parking) = 1,400 yen. For 3 visits, that is 4,200 yen. With the annual pass (3,000 yen), parking is 300 yen per visit, so 3 visits cost 3,000 + (300 × 3) = 3,900 yen, which is already cheaper than 4,200 yen!"
      }
    ]
  },
  {
    id: "info-12",
    title: "宅配クリーニング「クリーン便」料金のご案内",
    intro: "ご自宅まで衣類を集荷・配達する便利な宅配クリーニングです。専用のバッグに衣類を入れてお渡しください。",
    table: {
      headers: ["パック名", "点数上限", "通常料金", "会員料金（年会費1,000円）"],
      rows: [
        ["5点パック", "5点まで", "5,500円", "4,800円"],
        ["10点パック", "10点まで", "9,000円", "7,800円"],
        ["15点パック", "15点まで", "12,000円", "10,500円"],
        ["布団丸洗いパック", "2枚まで", "9,800円", "8,500円"]
      ]
    },
    notes: "※送料は往復無料です。ただし、北海道・沖縄・離島は別途1,500円かかります。\n※冬物コート・ダウンジャケットも含め、どの衣類でもパック料金は同じです（皮革製品・着物は取扱不可）。\n※最大8か月間の「衣類保管サービス」をご利用の場合は、1パックにつき追加で1,200円かかります（会員は保管サービス無料）。",
    questions: [
      {
        prompt: "東京在住の非会員である吉田さんは、冬物コートを含む衣類10点を出し、春まで「衣類保管サービス」も利用したいと考えている。今回初めて利用する場合、会員に入会して利用するのと、非会員のまま利用するのとでは、どちらがいくら安いか。",
        options: [
          "非会員のまま利用するほうが200円安い。",
          "会員に入会して利用するほうが1,200円安い。",
          "会員に入会して利用するほうが1,400円安い。",
          "どちらも同じ金額になる。"
        ],
        answer: 2,
        explanation: "Non-member cost for 10-item pack + storage = 9,000 + 1,200 = 10,200 yen. If Yoshida joins as a member (1,000 yen annual fee), the 10-item pack costs 7,800 yen and storage is free for members: 1,000 + 7,800 + 0 = 8,800 yen. Thus, joining as a member is 10,200 - 8,800 = 1,400 yen cheaper."
      },
      {
        prompt: "この宅配クリーニングのサービス内容として、正しいものはどれか。",
        options: [
          "ダウンジャケットを入れる場合は、追加料金がかかる。",
          "シルクの着物も5点パックに入れてクリーニングに出すことができる。",
          "北海道から非会員が5点パック（保管なし）を利用する場合、合計7,000円かかる。",
          "布団3枚をまとめて「布団丸洗いパック」1つで出すことができる。"
        ],
        answer: 2,
        explanation: "A non-member in Hokkaido using the 5-item pack without storage pays 5,500 yen + 1,500 yen shipping = 7,000 yen. Down jackets do not cost extra, kimonos are not accepted, and the futon pack is up to 2 futons."
      }
    ]
  },
  {
    id: "info-13",
    title: "あおぞら市民プール 夏期短期水泳教室の募集",
    intro: "夏休み期間中（7月22日〜7月26日の連続5日間）の短期水泳教室です。最終日に泳力テストを行います。",
    table: {
      headers: ["クラス", "時間", "対象・泳力条件", "参加費（5日間）"],
      rows: [
        ["A 水慣れクラス", "9:00〜10:00", "4歳〜小学2年生（水に顔をつけられない子）", "5,000円"],
        ["B クロール初級", "10:15〜11:15", "小学生（けのび・バタ足ができる子）", "5,500円"],
        ["C クロール・背泳ぎ", "11:30〜12:30", "小学生〜中学生（クロールで15m以上泳げる子）", "6,000円"],
        ["D 大人リフレッシュ水泳", "13:30〜14:30", "18歳以上（泳力は問いません）", "6,500円"]
      ]
    },
    notes: "※当プールの指定水泳帽（500円）をお持ちでないお子様（A〜Cクラス）は、受付時にご購入ください（Dクラスは手持ちの水泳帽で参加可能）。\n※兄弟・姉妹で同時に申し込む場合、2人目から参加費が1,000円引きになります。\n※受付開始は7月1日（火）10:00から。窓口またはインターネットで先着順に受け付けます。",
    questions: [
      {
        prompt: "木村さんは、クロールで20m泳げる小学5年生の長男と、水に顔をつけられない5歳の次男の2人を水泳教室に申し込むことにした。2人とも指定水泳帽を持っていない場合、支払う合計金額はいくらか。",
        options: ["10,000円", "10,500円", "11,000円", "12,000円"],
        answer: 2,
        explanation: "The 5th-grade son who can swim 20m crawl joins C (6,000 yen), and the 5-year-old joins A (5,000 yen). With the sibling discount, the second child gets 1,000 yen off tuition (6,000 + 5,000 - 1,000 = 10,000 yen). Both need the designated swim cap (500 × 2 = 1,000 yen). Total = 11,000 yen."
      },
      {
        prompt: "この水泳教室について、案内と合っているものはどれか。",
        options: [
          "バタ足ができる小学1年生は、Aクラスしか申し込めない。",
          "Dクラスに参加する大人も、必ず指定水泳帽（500円）を買わなければならない。",
          "Cクラスは高校生でも申し込むことができる。",
          "7月26日には泳力テストが行われる。"
        ],
        answer: 3,
        explanation: "The course runs for 5 consecutive days from July 22 to July 26, and the swim test is held on the final day (July 26). Option 1 is wrong because a 1st grader who can flutter kick qualifies for B. Option 2 is wrong because adults in D can use their own swim cap. Option 3 is wrong because C is for elementary and junior high school students."
      }
    ]
  },
  {
    id: "info-14",
    title: "駅前コワーキングスペース「ワークベース」料金表",
    intro: "Wi-Fi・電源完備！フリードリンク付きの快適なワークスペースです。リモートワークや資格試験の勉強にご利用ください。\n【営業時間】平日 8:00〜22:00／土日祝 9:00〜20:00",
    table: {
      headers: ["プラン名", "利用可能日時", "月額料金（または都度料金）", "会議室利用"],
      rows: [
        ["フルタイム会員", "全営業日・全時間帯", "月額 14,000円", "月4時間まで無料"],
        ["ナイト＆ホリデー会員", "平日17:00以降・土日祝終日", "月額 8,000円", "1時間 1,000円"],
        ["平日デイタイム会員", "平日 8:00〜18:00", "月額 9,500円", "1時間 1,000円"],
        ["ドロップイン（一時利用）", "営業時間内いつでも", "1時間 500円（1日最大 2,000円）", "利用不可"]
      ]
    },
    notes: "※月額会員になる場合は、初月のみカード発行手数料1,500円が必要です（ドロップインは不要）。\n※専用ロッカーをご希望の月額会員は、月額1,200円で追加契約できます。\n※モニターの貸し出しは全プラン無料ですが、複合機での印刷は白黒1枚10円、カラー1枚30円です。",
    questions: [
      {
        prompt: "会社員の井上さんは、資格試験の勉強のために平日の仕事終わり（18時30分〜21時30分）と日曜日に利用したいと考えている。また、参考書を置いておくために専用ロッカーも借りたい。月額会員になる場合、最初の月に支払う金額はいくらか。",
        options: ["9,200円", "9,500円", "10,700円", "16,700円"],
        answer: 2,
        explanation: "Inoue wants weekday evenings (after 17:00) and Sundays, which matches the Night & Holiday membership (8,000 yen/month). Adding the dedicated locker (1,200 yen/month) and the first-month card issuance fee (1,500 yen) gives 8,000 + 1,200 + 1,500 = 10,700 yen."
      },
      {
        prompt: "フリーランスの加藤さんは、会員登録をせずに「ドロップイン」で火曜日の10時から16時まで6時間利用し、カラーで10枚印刷した。支払う金額はいくらか。",
        options: ["2,000円", "2,300円", "3,000円", "3,300円"],
        answer: 1,
        explanation: "Drop-in is 500 yen/hour, so 6 hours would be 3,000 yen, but it is capped at the daily maximum of 2,000 yen. Plus 10 pages of color printing at 30 yen/page = 300 yen. Total = 2,000 + 300 = 2,300 yen."
      }
    ]
  },
  {
    id: "info-15",
    title: "劇団スターライト 秋公演『時計台の秘密』チケット予約のご案内",
    intro: "公演期間：10月10日（金）〜10月13日（月・祝） 会場：市民文化ホール",
    table: {
      headers: ["座席種別", "前売り料金", "当日料金", "学生割引（要学生証）"],
      rows: [
        ["SS席（1階前方・特典パンフレット付）", "7,500円", "8,000円", "割引なし"],
        ["S席（1階中〜後方）", "6,000円", "6,500円", "4,500円"],
        ["A席（2階席）", "4,500円", "5,000円", "3,000円"],
        ["U-18シート（2階後方・18歳以下限定）", "2,000円（前売りのみ）", "販売なし", "—"]
      ]
    },
    notes: "※未就学児（小学校入学前のお子様）の入場はご遠慮いただいております。\n※初日（10月10日）の公演に限り、SS席を除くすべての前売り券が上記料金（学生割引を含む）からさらに500円引きになります。\n※インターネットで前売り券を購入する場合、チケット1枚につきシステム利用料200円がかかります（劇場窓口での購入は手数料無料）。",
    questions: [
      {
        prompt: "大学生の川口さんは、友人の大学生と2人で初日（10月10日）のS席をインターネットで前売り予約することにした。システム利用料を含めて、2人分で支払う合計金額はいくらか。",
        options: ["8,000円", "8,400円", "9,000円", "9,400円"],
        answer: 1,
        explanation: "For university students, S-seat student price is 4,500 yen. Because it is the opening day (Oct 10), advance tickets excluding SS get an additional 500-yen discount (4,500 - 500 = 4,000 yen per ticket). Buying online adds a 200-yen system fee per ticket (4,200 yen each). For 2 people, 4,200 × 2 = 8,400 yen."
      },
      {
        prompt: "この公演のチケットについて、正しいものはどれか。",
        options: [
          "17歳の高校生は、公演当日に劇場窓口へ行けば「U-18シート」を2,000円で買える。",
          "5歳の子どもと一緒に2階席で観劇することができる。",
          "10月10日のSS席を劇場窓口で前売り購入する場合、料金は7,000円になる。",
          "大人が10月12日のA席を劇場窓口で前売り購入する場合、料金は4,500円である。"
        ],
        answer: 3,
        explanation: "An adult buying an advance A-seat ticket for Oct 12 at the theater counter pays 4,500 yen (no system fee, not opening day). Option 1 is wrong because U-18 is advance-only. Option 2 is wrong because preschoolers cannot enter. Option 3 is wrong because SS seats are excluded from the opening-day discount."
      }
    ]
  },
  {
    id: "info-16",
    title: "たけだ写真館 記念撮影プランのご案内",
    intro: "七五三・成人式・卒業式・家族写真など、大切な記念日の撮影を承ります（完全予約制）。",
    table: {
      headers: ["プラン名", "基本撮影料（平日）", "セット内容", "衣装レンタル"],
      rows: [
        ["シンプルプラン", "8,000円", "六つ切り台紙写真 1枚", "なし（私服・持ち込み衣装のみ）"],
        ["スタンダードプラン", "15,000円", "六つ切り台紙写真 2枚＋データ5カット", "和装または洋装 1着無料"],
        ["プレミアムプラン", "28,000円", "特製アルバム（10ページ）＋全データ", "和装・洋装 各1着無料（着付け・ヘアメイク付）"],
        ["証明写真プラン", "3,000円", "証明写真4枚＋データ1カット", "なし"]
      ]
    },
    notes: "※土日祝日の撮影は、上記基本撮影料に3,000円が加算されます（証明写真プランは土日祝日も同額）。\n※スタンダードプランで和装をお選びの場合、着付け・ヘアメイク代として別途4,000円が必要です（洋装の場合は無料）。\n※焼き増し（写真の追加プリント）は、六つ切り1枚につき3,500円です。",
    questions: [
      {
        prompt: "林さんは娘の卒業記念に、日曜日に「スタンダードプラン」で和装（着物）を借りて撮影し、祖父母へのプレゼント用に六つ切り写真を1枚追加プリントしたいと考えている。支払う合計金額はいくらか。",
        options: ["21,500円", "22,500円", "25,500円", "28,000円"],
        answer: 2,
        explanation: "Standard plan weekday base price is 15,000 yen. Shooting on Sunday adds 3,000 yen. Choosing Japanese attire (和装) in the Standard plan adds 4,000 yen for dressing/hair/makeup. One extra print costs 3,500 yen. Total = 15,000 + 3,000 + 4,000 + 3,500 = 25,500 yen."
      },
      {
        prompt: "就職活動用の証明写真を土曜日に撮影したい大学生が支払う金額はいくらか。",
        options: ["3,000円", "6,000円", "8,000円", "11,000円"],
        answer: 0,
        explanation: "The ID photo plan (証明写真プラン) is 3,000 yen, and the notes state that weekend/holiday surcharges do not apply to the ID photo plan."
      }
    ]
  },
  {
    id: "info-17",
    title: "かりん音楽教室 レッスンコースのご案内",
    intro: "初心者から経験者まで、一人ひとりのペースに合わせて丁寧に指導します。まずは無料体験レッスンにお越しください！",
    table: {
      headers: ["コース", "レッスン形態", "時間・回数", "月謝（初級）"],
      rows: [
        ["ピアノコース", "個人レッスン", "1回30分・月3回", "8,500円"],
        ["バイオリンコース", "個人レッスン", "1回45分・月2回", "9,000円"],
        ["アコースティックギター", "グループ（2〜4名）", "1回60分・月3回", "7,000円"],
        ["フルートコース", "個人レッスン", "1回45分・月2回", "8,800円"]
      ]
    },
    notes: "※全コースとも、入会時に入会金5,000円と施設管理費（毎月500円）が必要です。ただし、無料体験レッスンの当日に入会手続きをされた方は、入会金が半額になります。\n※楽器をお持ちでない方には、教室内のレッスン時に限り無料で楽器をお貸しします（自宅へ持ち帰るレンタルは月額2,000円）。",
    questions: [
      {
        prompt: "会社員の岡田さんは、無料体験レッスンを受けたその日に「バイオリンコース」に入会し、自宅練習用に楽器の持ち帰りレンタルも申し込んだ。最初の月に支払う合計金額（入会金・月謝・施設管理費・楽器レンタル代）はいくらか。",
        options: ["12,000円", "14,000円", "14,500円", "16,500円"],
        answer: 1,
        explanation: "Joining on the day of the free trial halves the 5,000-yen enrollment fee to 2,500 yen. Violin monthly tuition is 9,000 yen, monthly facility fee is 500 yen, and take-home instrument rental is 2,000 yen/month. Total = 2,500 + 9,000 + 500 + 2,000 = 14,000 yen."
      },
      {
        prompt: "この音楽教室について、案内と合っているものはどれか。",
        options: [
          "すべてのコースが1対1の個人レッスンである。",
          "レッスン中だけ教室の楽器を使う場合でも、毎月2,000円かかる。",
          "ピアノコースは1か月の合計レッスン時間が90分である。",
          "施設管理費500円は、入会した最初の月だけ支払えばよい。"
        ],
        answer: 2,
        explanation: "The piano course is 30 minutes × 3 times a month = 90 minutes total per month. Option 1 is wrong because guitar is a group lesson. Option 2 is wrong because using an instrument only during lessons at the school is free. Option 4 is wrong because the 500-yen facility fee is charged every month (毎月500円)."
      }
    ]
  },
  {
    id: "info-18",
    title: "ふるさと果樹園 フルーツ狩り体験のご案内",
    intro: "季節ごとの新鮮な果物を園内で60分間食べ放題でお楽しみいただけます（お持ち帰りは別料金・量り売り）。\n【開園時間】9:00〜16:00（最終受付 15:00）※雨天でもハウス内で体験可能です。",
    table: {
      headers: ["果物の種類", "開催時期", "大人（中学生以上）", "小学生／幼児（3歳以上）"],
      rows: [
        ["いちご狩り", "1月〜5月中旬", "2,000円", "1,500円／1,000円"],
        ["さくらんぼ狩り", "6月上旬〜7月中旬", "2,500円", "1,800円／1,200円"],
        ["もも狩り", "7月下旬〜8月下旬", "1,800円", "1,300円／800円"],
        ["りんご狩り", "9月中旬〜11月下旬", "1,200円", "800円／500円"]
      ]
    },
    notes: "※さくらんぼ狩りのみ完全予約制（前日17時までにホームページまたは電話で予約）です。その他の果物は予約不要ですが、10名以上のグループは事前にご連絡ください。\n※ホームページにある「WEB割引クーポン」を受付で提示すると、1グループ全員の体験料が1人につき100円引きになります（3歳未満は無料のため対象外）。",
    questions: [
      {
        prompt: "8月10日に、両親（大人2名）、小学3年生の姉、4歳の弟、1歳の妹の家族5人でフルーツ狩りに行き、受付で「WEB割引クーポン」を提示した。支払う合計金額はいくらか。",
        options: ["5,300円", "5,400円", "5,700円", "6,600円"],
        answer: 0,
        explanation: "August 10 falls in the peach-picking period (もも狩り: late July to late August). Base prices: 2 adults (1,800 × 2 = 3,600), 1 elementary student (1,300), 1 four-year-old (800), and the 1-year-old is free. Subtotal = 5,700 yen. The web coupon gives 100 yen off for each of the 4 paying members (400 yen off). Total = 5,700 - 400 = 5,300 yen."
      },
      {
        prompt: "この果樹園の利用について、正しいものはどれか。",
        options: [
          "6月にさくらんぼ狩りをする場合は、人数にかかわらず前日17時までに予約が必要である。",
          "園内で摘んだ果物は、体験料のなかで1袋まで家に持ち帰ることができる。",
          "雨が降った日は果樹園が休園になるため、体験できない。",
          "10月に大人5人でりんご狩りに行く場合も、必ず事前連絡が必要である。"
        ],
        answer: 0,
        explanation: "Cherry picking (さくらんぼ狩り) requires a reservation by 17:00 the day before regardless of group size. Take-home fruit costs extra by weight, rainy days are still open inside greenhouses, and apple picking only requires prior notice for groups of 10 or more."
      }
    ]
  },
  {
    id: "info-19",
    title: "かもめフェリー（本土港〜みどり島港）運賃のご案内",
    intro: "所要時間：約50分（1日6往復運航）\n※車両を載せる場合は、出航の30分前までに乗船手続きをお済ませください。",
    table: {
      headers: ["区分", "片道運賃", "往復運賃（7日間有効）", "備考"],
      rows: [
        ["旅客：大人（中学生以上）", "1,200円", "2,200円", "小学生は半額"],
        ["乗用車（全長4m未満）", "3,800円", "7,000円", "運転手1名分の旅客運賃を含む"],
        ["乗用車（全長4m以上5m未満）", "4,800円", "9,000円", "運転手1名分の旅客運賃を含む"],
        ["自転車・原付バイク", "600円", "1,100円", "旅客運賃は含まれません"]
      ]
    },
    notes: "※未就学児（小学生未満）は、大人1名につき2名まで無料です（3人目からは小学生運賃が必要）。\n※1等客室（指定席）をご利用の場合は、旅客運賃に加えて1名片道500円（大人・小学生同額）が必要です。",
    questions: [
      {
        prompt: "夫、妻、小学5年生の娘の3人で、全長4.5mの乗用車1台に乗って島へ1泊2日の旅行に行く（往復とも一般客室を利用）。往復のフェリー代は合計いくらか。",
        options: ["11,200円", "12,300円", "13,400円", "14,500円"],
        answer: 1,
        explanation: "The car is 4.5m (4m to under 5m), so the round-trip vehicle fare is 9,000 yen, which already includes the round-trip fare for 1 driver (adult). The remaining passengers are the wife (adult round-trip: 2,200 yen) and the elementary school daughter (half of 2,200 = 1,100 yen). Total = 9,000 + 2,200 + 1,100 = 12,300 yen."
      },
      {
        prompt: "大学生の原田さんは、自転車をフェリーに載せて日帰りで島へ行き、帰りの便だけ「1等客室」を利用することにした。支払う合計金額はいくらか。",
        options: ["3,300円", "3,800円", "4,300円", "4,400円"],
        answer: 1,
        explanation: "Bicycle fares do not include passenger fares. Adult round-trip fare (2,200 yen) + bicycle round-trip fare (1,100 yen) + first-class cabin for the return leg only (500 yen) = 3,800 yen."
      }
    ]
  },
  {
    id: "info-20",
    title: "光（ひかり）モバイル 新料金プランのご案内",
    intro: "スマートフォンの使い方やデータ通信量に合わせて、4つのプランからお選びいただけます。",
    table: {
      headers: ["プラン名", "月間データ容量", "基本月額料金", "国内通話料"],
      rows: [
        ["ライトプラン", "3GBまで", "1,500円", "30秒につき20円"],
        ["ベーシックプラン", "15GBまで", "2,800円", "1回5分以内の通話無料"],
        ["たっぷりプラン", "50GBまで", "4,200円", "1回10分以内の通話無料"],
        ["無制限プラン", "無制限", "5,500円", "国内通話かけ放題（無料）"]
      ]
    },
    notes: "※家族割引：同一住所のご家族が2回線以上契約される場合、各回線の基本月額料金から毎月500円引きになります（ライトプランは割引対象外）。\n※自宅のインターネット「光ホームネット」とセットで契約すると、全プランとも1回線につき毎月300円引きになります（家族割引との併用可）。\n※24時間いつでも国内通話がかけ放題になるオプションは、月額1,000円で追加できます（無制限プランには標準で付いています）。",
    questions: [
      {
        prompt: "夫婦2人で同じ住所で契約し、自宅では「光ホームネット」を利用している。夫は毎月30GBほどデータを使うため「たっぷりプラン」、妻は毎月2GBしか使わないため「ライトプラン」を選ぶことにした。2人分の1か月の基本料金の合計はいくらか。",
        options: ["4,400円", "4,600円", "4,900円", "5,100円"],
        answer: 1,
        explanation: "Husband chooses たっぷりプラン (4,200 yen). Because there are 2 family lines, he gets the 500-yen family discount, plus 300 yen off for the home internet bundle: 4,200 - 500 - 300 = 3,400 yen. Wife chooses ライトプラン (1,500 yen), which is excluded from the family discount, but gets the 300-yen home internet discount (全プランとも): 1,500 - 300 = 1,200 yen. Total = 3,400 + 1,200 = 4,600 yen."
      },
      {
        prompt: "1人暮らしで「光ホームネット」を利用していない個人事業主の谷口さんは、毎月10GBほどデータ通信を使い、仕事で1回30分以上の長電話を毎日するため、通話かけ放題を付けたい。谷口さんにとって最も安くなるプランの組み合わせと月額料金はどれか。",
        options: [
          "ベーシックプラン＋かけ放題オプション（3,800円）",
          "たっぷりプラン＋かけ放題オプション（5,200円）",
          "無制限プラン（5,500円）",
          "ライトプラン＋かけ放題オプション（2,500円）"
        ],
        answer: 0,
        explanation: "Taniguchi uses about 10GB per month, so Lite (3GB) is insufficient; Basic (15GB, 2,800 yen) covers 10GB. Adding the 24-hour unlimited domestic call option (1,000 yen/month) brings the total to 3,800 yen, which is much cheaper than Unlimited (5,500 yen)."
      }
    ]
  },
  {
    id: "info-21",
    title: "中央公民館 貸し会議室・ホールのご利用案内",
    intro: "地域のサークル活動、会議、講演会などにご利用いただけます（営利目的での利用は通常の2倍の料金となります）。",
    table: {
      headers: ["施設名", "定員", "午前（9:00〜12:00）", "午後（13:00〜17:00）", "夜間（18:00〜21:00）"],
      rows: [
        ["第1会議室", "16名", "1,200円", "1,600円", "1,500円"],
        ["第2会議室", "36名", "2,000円", "2,800円", "2,500円"],
        ["和室（茶道設備あり）", "20名", "1,500円", "2,000円", "1,800円"],
        ["多目的ホール", "120名", "5,000円", "7,000円", "6,500円"]
      ]
    },
    notes: "※プロジェクター・スクリーンセットは1区分につき500円、マイクセットは1区分につき300円で貸し出します（多目的ホールはマイクセット無料）。\n※午前と午後、または午後と夜間を連続して借りる場合は、間の1時間（12:00〜13:00、17:00〜18:00）も追加料金なしでそのまま室内をご利用いただけます。\n※準備と片付けの時間も利用時間に含まれます。",
    questions: [
      {
        prompt: "地域の読書サークル（非営利・25名）が、土曜日の午後（13:00〜17:00）に会議室を借り、プロジェクター・スクリーンセットを使用したい。支払う合計金額はいくらか。",
        options: ["2,100円", "2,500円", "3,300円", "6,600円"],
        answer: 2,
        explanation: "For 25 people, Room 1 (capacity 16) is too small, so they need Room 2 (capacity 36), which costs 2,800 yen for the afternoon slot. Adding the projector/screen set (500 yen) gives 2,800 + 500 = 3,300 yen."
      },
      {
        prompt: "ある企業が新商品の説明会（営利目的・80名）を「多目的ホール」で午前の部に行い、マイクセットを使用する。支払う合計金額はいくらか。",
        options: ["5,000円", "5,300円", "10,000円", "10,600円"],
        answer: 2,
        explanation: "Commercial use (営利目的) costs double the normal room rate: Multipurpose Hall morning slot is 5,000 × 2 = 10,000 yen. The microphone set is free for the Multipurpose Hall. Total = 10,000 yen."
      }
    ]
  },
  {
    id: "info-22",
    title: "わんにゃんペットホテル ご利用料金のご案内",
    intro: "ご旅行や出張の際、大切なペットをスタッフ一同真心を込めてお預かりいたします（1日2回の散歩・食事付き）。\n【受付時間】9:00〜19:00（時間外の受け渡しは不可）",
    table: {
      headers: ["ペットの種類・サイズ", "1泊2日（24時間以内）", "時間延長（1時間ごと）", "日帰り預かり（最大8時間）"],
      rows: [
        ["猫・小動物（うさぎ等）", "3,500円", "300円", "2,500円"],
        ["小型犬（5kg未満）", "4,200円", "400円", "3,000円"],
        ["中型犬（5kg以上15kg未満）", "5,200円", "500円", "3,800円"],
        ["大型犬（15kg以上）", "6,800円", "700円", "5,000円"]
      ]
    },
    notes: "※1年以内に接種したワクチン証明書をご持参ください（証明書がない場合はお預かりできません）。\n※普段食べている特別なフードをご希望の場合は、日数分を小分けにしてご持参ください。\n※同じ飼い主様が2匹以上同時にお預けになる場合、2匹目以降の「1泊2日」基本料金が20％引きになります（時間延長および日帰り預かりは割引対象外）。",
    questions: [
      {
        prompt: "島田さんは、体重8kgの犬1匹を土曜日の10時00分に預け、翌日曜日の13時00分に迎えに行く予定である。支払う合計金額はいくらか。",
        options: ["5,200円", "6,200円", "6,700円", "8,400円"],
        answer: 2,
        explanation: "An 8kg dog falls under Medium dog (5kg to under 15kg: 5,200 yen for up to 24 hours). From Saturday 10:00 to Sunday 13:00 is 27 hours, which is 3 hours past 24 hours. Three hours of extension at 500 yen/hour = 1,500 yen. Total = 5,200 + 1,500 = 6,700 yen."
      },
      {
        prompt: "2匹の猫を飼っている野村さんが、土曜日の11時から日曜日の11時まで（24時間）2匹同時に預ける場合、合計金額はいくらか。",
        options: ["5,600円", "6,300円", "6,500円", "7,000円"],
        answer: 1,
        explanation: "One cat for 1 night (24 hours) is 3,500 yen. The second pet gets a 20% discount on the 1-night base fee: 3,500 × 0.8 = 2,800 yen. Total = 3,500 + 2,800 = 6,300 yen."
      }
    ]
  },
  {
    id: "info-23",
    title: "湯けむり温泉「花の湯」入館料のご案内",
    intro: "源泉かけ流しの露天風呂とサウナで日頃の疲れを癒やしてください。\n【営業時間】10:00〜23:00（最終入館 22:00）",
    table: {
      headers: ["プラン", "平日料金", "土日祝料金", "含まれるもの"],
      rows: [
        ["大人入浴のみ（中学生以上）", "850円", "1,000円", "入浴・サウナ"],
        ["大人手ぶらセット", "1,300円", "1,450円", "入浴・サウナ＋貸しタオル・館内着・岩盤浴"],
        ["小学生（入浴のみ）", "400円", "500円", "入浴のみ（岩盤浴は利用不可）"],
        ["幼児（3歳〜未就学児）", "200円", "200円", "入浴のみ"]
      ]
    },
    notes: "※2歳以下のお子様は無料です。\n※「入浴のみ」の方がタオルを購入される場合はフェイスタオル200円、バスタオルレンタルは300円です。\n※毎週水曜日は「レディースデー」として、女性のお客様は「大人手ぶらセット」が1,000円でご利用いただけます（祝日の場合は除く）。",
    questions: [
      {
        prompt: "祝日ではない水曜日に、中村さん（35歳・女性）と夫（37歳）、小学2年生の息子の3人で「花の湯」へ行く。中村さんと夫は岩盤浴も利用するため「大人手ぶらセット」にし、息子の分は自宅からタオルを持参して「小学生（入浴のみ）」にする。3人分の合計金額はいくらか。",
        options: ["2,400円", "2,700円", "2,850円", "3,000円"],
        answer: 1,
        explanation: "On a non-holiday Wednesday (Ladies' Day), Mrs. Nakamura gets the 'Adult Hands-Free Set' for 1,000 yen. Her husband pays the normal weekday price for the set (1,300 yen). Their elementary school son pays the weekday rate of 400 yen (bringing his own towel). Total = 1,000 + 1,300 + 400 = 2,700 yen."
      },
      {
        prompt: "日曜日に大学生の男性が1人でタオルを持たずに行き、岩盤浴は利用せずに入浴とサウナだけ楽しみ、フェイスタオル1枚を購入しバスタオル1枚をレンタルする場合、支払う合計金額はいくらか。",
        options: ["1,350円", "1,450円", "1,500円", "1,650円"],
        answer: 2,
        explanation: "On Sunday, 'Adult bath only' is 1,000 yen. Buying a face towel (200 yen) and renting a bath towel (300 yen) totals 1,000 + 200 + 300 = 1,500 yen."
      }
    ]
  },
  {
    id: "info-24",
    title: "すずらん百貨店 お買い上げ品配送サービスのご案内",
    intro: "地下1階および各階の配送カウンターにて、お買い上げいただいた商品の全国配送を承ります。",
    table: {
      headers: ["配送地域", "通常便（常温）", "クール便（冷蔵・冷凍）", "お届け日数目安"],
      rows: [
        ["市内・県内", "500円", "800円", "翌日"],
        ["関東・中部・近畿", "700円", "1,000円", "翌日"],
        ["東北・中国・四国・九州", "900円", "1,200円", "翌々日"],
        ["北海道・沖縄", "1,400円", "1,700円", "3日後"]
      ]
    },
    notes: "※1か所のお届け先につき、お買い上げ合計金額が5,000円以上（税込）の場合は、「通常便」の送料が無料になります（北海道・沖縄は半額になります）。\n※クール便をご利用の場合は、5,000円以上お買い上げの場合でもクール料金分の300円のみご負担いただきます（北海道・沖縄は通常便半額＋300円）。\n※当日16時までに受付を完了した荷物が当日発送となります（16時以降は翌日発送）。",
    questions: [
      {
        prompt: "関東に住む親戚に6,000円分の冷蔵ハムセット（クール便）を送り、県内の友人に3,500円分のお菓子（常温・通常便）を送りたい。配送カウンターで支払う送料の合計はいくらか。",
        options: ["500円", "800円", "1,000円", "1,500円"],
        answer: 1,
        explanation: "For the refrigerated ham set (6,000 yen, ≥5,000 yen) to Kanto via Cool Delivery, the base shipping is waived and only the 300-yen cool surcharge applies. For the sweets (3,500 yen, <5,000 yen) within the prefecture via regular delivery, normal shipping of 500 yen applies. Total shipping = 300 + 500 = 800 yen."
      },
      {
        prompt: "北海道の実家に8,000円分の果物（常温・通常便）を送るため、月曜日の17時に配送カウンターで手続きをした。送料といつ届くかの組み合わせとして正しいものはどれか。",
        options: [
          "送料700円・木曜日に届く",
          "送料700円・金曜日に届く",
          "送料無料・木曜日に届く",
          "送料1,000円・金曜日に届く"
        ],
        answer: 1,
        explanation: "Because the purchase is ≥5,000 yen, regular shipping to Hokkaido (1,400 yen) is half price = 700 yen. Because the order was placed at 17:00 on Monday (after the 16:00 cutoff), it ships on Tuesday and arrives 3 days later, on Friday."
      }
    ]
  },
  {
    id: "info-25",
    title: "あおぞら市国際交流協会 ボランティア募集のご案内",
    intro: "在住外国人の方々を支援するボランティアを募集しています。関心のある分野でご協力ください。",
    table: {
      headers: ["活動内容", "活動日時", "応募条件", "交通費支給"],
      rows: [
        ["① 日本語教室サポーター", "毎週日曜 10:00〜12:00", "18歳以上（外国語力は不要・月2回以上参加できる方）", "1回一律 500円"],
        ["② 医療・行政窓口通訳", "平日 9:00〜17:00（依頼がある時）", "20歳以上（対象言語で日常会話以上の通訳ができる方）", "1回一律 1,000円＋謝礼"],
        ["③ 多文化交流フェスタ運営", "11月3日（祝）8:30〜16:30", "高校生以上（事前説明会10月26日への参加必須）", "昼食支給（交通費なし）"],
        ["④ 広報誌の翻訳スタッフ", "在宅作業（月1回程度）", "英語・中国語・ベトナム語のいずれかに翻訳できる方", "なし（図書カード進呈）"]
      ]
    },
    notes: "※①と②に登録される方は、初回活動前に当協会のボランティア登録研修（2時間・無料）を受けていただきます。\n※高校生が③に応募する場合は、保護者の同意書が必要です。",
    questions: [
      {
        prompt: "会社員の松本さん（29歳）は、平日は仕事があるため休日に地域で活動したいと考えている。外国語は話せないが、10月26日は旅行の予定があって参加できない。松本さんが応募できる活動はどれか。",
        options: ["①のみ", "③のみ", "①と③", "①と④"],
        answer: 0,
        explanation: "Matsumoto works on weekdays, cannot speak a foreign language, and cannot attend the Oct 26 briefing required for ③. Only ① (Sundays, 18+, no foreign language required) matches all conditions."
      },
      {
        prompt: "ボランティアの応募条件や待遇について、案内と合っているものはどれか。",
        options: [
          "①は毎週必ず休まずに参加しなければならない。",
          "②は事前研修を受ける必要がない。",
          "高校生が保護者の同意書を出して10月26日の説明会に出席すれば、③に参加できる。",
          "④は協会の事務所に通って作業をしなければならない。"
        ],
        answer: 2,
        explanation: "High school students can join ③ if they submit a parental consent form and attend the mandatory briefing on Oct 26. Option 1 is wrong (at least twice a month is fine), Option 2 is wrong (① and ② require training), and Option 4 is wrong (④ is work-from-home)."
      }
    ]
  },
  {
    id: "info-26",
    title: "あさひ進学塾 夏期講習のご案内（中学生対象）",
    intro: "1学期の総復習と2学期の予習で成績アップを目指しましょう！1教科から受講可能です。\n【期間】8月1日〜8月12日（日曜日は休講・全10日間）",
    table: {
      headers: ["講座名", "時間（毎日80分）", "対象学年", "受講料（1講座・テキスト代込）"],
      rows: [
        ["基礎英語マスター", "9:00〜10:20", "中1・中2", "14,000円"],
        ["数学苦手克服講座", "10:35〜11:55", "中1・中2", "14,000円"],
        ["受験英語長文読解", "13:30〜14:50", "中3", "18,000円"],
        ["受験数学応用演習", "15:05〜16:25", "中3", "18,000円"],
        ["理科・社会集中特訓", "16:40〜18:00", "中2・中3", "15,000円"]
      ]
    },
    notes: "※複数講座割引：2講座受講する場合は合計金額から3,000円引き、3講座以上受講する場合は合計金額から6,000円引きになります。\n※普段あさひ進学塾に通っていない方（外部生）は、夏期登録料として別途2,000円が必要です。ただし、塾生の紹介で申し込む場合は夏期登録料が無料になります。",
    questions: [
      {
        prompt: "現在この塾に通っていない中学2年生の翔太くんは、塾生の友人の紹介で「基礎英語マスター」「数学苦手克服講座」「理科・社会集中特訓」の3講座を申し込むことにした。支払う合計金額はいくらか。",
        options: ["37,000円", "39,000円", "40,000円", "43,000円"],
        answer: 0,
        explanation: "The three courses for a 2nd-year student cost 14,000 + 14,000 + 15,000 = 43,000 yen. Taking 3 or more courses gives a 6,000-yen discount (43,000 - 6,000 = 37,000 yen). Because he was referred by a current student, the 2,000-yen external registration fee is waived. Total = 37,000 yen."
      },
      {
        prompt: "外部生の中学3年生が、紹介なしで「受験英語長文読解」と「受験数学応用演習」の2講座を申し込む場合、支払う合計金額はいくらか。",
        options: ["33,000円", "35,000円", "36,000円", "38,000円"],
        answer: 1,
        explanation: "Two 3rd-year courses cost 18,000 + 18,000 = 36,000 yen. The 2-course discount subtracts 3,000 yen (33,000 yen). As an unreferred external student, the 2,000-yen registration fee applies: 33,000 + 2,000 = 35,000 yen."
      }
    ]
  },
  {
    id: "info-27",
    title: "森のキャンプ場 宿泊施設・レンタル品のご案内",
    intro: "豊かな自然の中でキャンプを楽しめます。チェックインは14:00〜17:00、チェックアウトは翌10:00です。",
    table: {
      headers: ["宿泊サイト・施設", "定員", "1泊基本料金（1区画・1棟）", "特徴・設備"],
      rows: [
        ["フリーテントサイト", "5名まで", "3,000円", "車の乗り入れ不可・テント持参またはレンタル"],
        ["オートキャンプサイト", "6名まで", "5,000円", "車1台横付け可・AC電源付き"],
        ["木造バンガロー", "4名まで", "9,000円", "エアコン・照明あり（寝具はなし）"],
        ["デラックスコテージ", "6名まで", "18,000円", "ベッド・キッチン・バス・トイレ完備"]
      ]
    },
    notes: "※上記基本料金のほかに、施設管理費として大人（中学生以上）1名につき500円、小学生1名につき300円が必要です（未就学児は無料）。\n※レンタル品（1泊）：4人用テント 3,500円／寝袋（1個）800円／バーベキューコンロセット（炭・網付き）2,500円。\n※ゴミはすべてお持ち帰りいただくか、受付で指定ゴミ袋（1セット300円）をご購入のうえ所定の場所にお出しください。",
    questions: [
      {
        prompt: "大学生4人のグループが「木造バンガロー」に1泊し、全員分の寝袋（4個）とバーベキューコンロセット（1つ）をレンタルする。支払う合計金額はいくらか（ゴミは持ち帰るものとする）。",
        options: ["14,700円", "16,200円", "16,700円", "17,000円"],
        answer: 2,
        explanation: "Wooden bungalow base fee is 9,000 yen. Facility fee for 4 adults (university students) = 500 × 4 = 2,000 yen. Rentals: 4 sleeping bags (800 × 4 = 3,200 yen) + 1 BBQ set (2,500 yen) = 5,700 yen. Total = 9,000 + 2,000 + 5,700 = 16,700 yen."
      },
      {
        prompt: "このキャンプ場の利用について、正しいものはどれか。",
        options: [
          "フリーテントサイトでも、テントのすぐ横に車を停めることができる。",
          "木造バンガローには布団やベッドが備え付けられている。",
          "デラックスコテージに大人4名と小学生2名で1泊する場合、施設管理費を含めた合計は20,600円である。",
          "チェックインは夜の19時まで受け付けている。"
        ],
        answer: 2,
        explanation: "Deluxe cottage (18,000 yen) + 4 adults (500 × 4 = 2,000 yen) + 2 elementary students (300 × 2 = 600 yen) = 20,600 yen. Free tent sites do not allow vehicle entry, wooden bungalows have no bedding, and check-in ends at 17:00."
      }
    ]
  },
  {
    id: "info-28",
    title: "橘（たちばな）総合病院 健康診断・人間ドックのご案内",
    intro: "病気の早期発見・予防のために、年1回の受診をおすすめします（すべて事前予約制）。",
    table: {
      headers: ["コース名", "受付時間（月〜土）", "主な検査内容", "料金"],
      rows: [
        ["A 定期健康診断コース", "8:30〜10:30／13:30〜15:00", "身体測定・血液・尿・胸部X線・心電図", "8,800円"],
        ["B 生活習慣病健診コース", "8:30〜10:00（午前のみ）", "Aの内容＋腹部超音波＋胃部X線（バリウム）", "18,000円"],
        ["C 日帰り人間ドック", "8:30〜9:30（午前のみ）", "Bの内容＋眼底・肺機能・医師面談（昼食券付）", "36,000円"],
        ["D 脳ドック専門コース", "13:30〜15:30（午後のみ）", "頭部MRI・MRA・頸動脈超音波", "25,000円"]
      ]
    },
    notes: "※Bコース・Cコースを受診される方は、前日の21時以降、食事をしないでください（水・お茶は当日朝6時まで可）。胃部X線を「胃カメラ（内視鏡）」に変更する場合は、追加料金3,000円がかかります。\n※橘市の国民健康保険に加入している40歳以上の方は、市の補助によりCコースが半額になります（胃カメラへの変更代など追加オプションは補助対象外）。",
    questions: [
      {
        prompt: "橘市の国民健康保険に加入している50歳の自営業・山口さんは、「C 日帰り人間ドック」を申し込み、胃の検査を「胃カメラ」に変更することにした。山口さんが病院に支払う金額はいくらか。",
        options: ["18,000円", "19,500円", "21,000円", "39,000円"],
        answer: 2,
        explanation: "Because Yamaguchi is 50 (≥40) and enrolled in Tachibana City National Health Insurance, Course C (36,000 yen) is subsidized by half to 18,000 yen. Changing the stomach X-ray to an endoscope (胃カメラ) costs an extra 3,000 yen (not covered by the subsidy). Total = 18,000 + 3,000 = 21,000 yen."
      },
      {
        prompt: "各コースの受診ルールについて、案内と合っているものはどれか。",
        options: [
          "Bコースは午後の時間帯にも受診することができる。",
          "Cコースを受診する人は、前日の20時に夕食を食べ、当日の朝5時に水を飲んでもよい。",
          "Aコースの代わりに、午後からCコースとDコースを同じ日に両方受診することができる。",
          "どのコースも予約なしで当日直接病院へ行けば受診できる。"
        ],
        answer: 1,
        explanation: "For Course C, patients must not eat after 21:00 the night before (so dinner at 20:00 is fine) and may drink water or tea until 6:00 a.m. on the day (so water at 5:00 a.m. is fine). All courses require reservations, and B and C are morning-only."
      }
    ]
  },
  {
    id: "info-29",
    title: "サイクルショップ「スピード」自転車修理・点検料金表",
    intro: "パンク修理から全体点検まで、経験豊富なスタッフが迅速に対応いたします。\n【営業時間】10:00〜19:00（定休日：水曜日）",
    table: {
      headers: ["作業内容", "作業時間目安", "当店購入車（会員）", "他店購入車（一般）"],
      rows: [
        ["パンク修理（1か所）", "約15分", "800円", "1,200円"],
        ["タイヤ・チューブ交換（1輪）", "約30分", "3,000円（部品代込）", "3,800円（部品代込）"],
        ["ブレーキワイヤー交換（1本）", "約20分", "1,500円（部品代込）", "2,000円（部品代込）"],
        ["総合安全点検（注油・調整込）", "約30分", "無料（年2回まで）", "1,500円"]
      ]
    },
    notes: "※パンクの穴が2か所以上ある場合は、1か所増えるごとに＋300円（会員・一般共通）となります。\n※自宅や外出先までスタッフが集荷に伺う「出張引き取り修理」は、修理代金に加えて出張費1,000円（当店から半径3km以内）がかかります。ただし、修理代金の合計が3,500円以上の場合は出張費が半額になります。",
    questions: [
      {
        prompt: "他店で自転車を購入した松本さんは、ショップから2km離れた自宅で前輪の「タイヤ・チューブ交換（1輪）」と「ブレーキワイヤー交換（1本）」を依頼するため、「出張引き取り修理」を頼んだ。支払う合計金額はいくらか。",
        options: ["5,800円", "6,300円", "6,800円", "7,300円"],
        answer: 1,
        explanation: "Because the bike was bought at another store (一般), tire/tube replacement for 1 wheel is 3,800 yen and brake wire replacement for 1 cable is 2,000 yen. Repair subtotal = 5,800 yen. Since the repair total is ≥3,500 yen and within 3km, the 1,000-yen pickup fee is halved to 500 yen. Total = 5,800 + 500 = 6,300 yen."
      },
      {
        prompt: "この店で自転車を購入した会員の高校生が、店に直接自転車を持ち込み、パンク修理（穴が2か所）と今年1回目の「総合安全点検」を受けた。支払う合計金額はいくらか。",
        options: ["800円", "1,100円", "1,600円", "2,600円"],
        answer: 1,
        explanation: "For a member (当店購入車), fixing 1 puncture is 800 yen, plus 300 yen for the second puncture = 1,100 yen. The comprehensive safety check is free up to twice a year for members. Total = 1,100 yen."
      }
    ]
  },
  {
    id: "info-30",
    title: "飛騨（ひだ）伝統工芸館 1日体験工房のご案内",
    intro: "職人の指導のもと、日本の伝統工芸品づくりを体験できます。旅の思い出にぜひどうぞ！",
    table: {
      headers: ["体験コース", "開始時間", "所要時間", "体験料", "作品のお渡し"],
      rows: [
        ["① ろくろ陶芸体験（湯のみ・茶碗）", "10:00／14:00", "約90分", "3,200円", "約1か月後に郵送（送料別）"],
        ["② 藍染め（あいぞめ）ハンカチ作り", "10:30／13:30／15:30", "約45分", "1,800円", "当日そのまま持ち帰り可"],
        ["③ 和紙のランプシェード作り", "11:00／14:30", "約60分", "2,600円", "当日そのまま持ち帰り可"],
        ["④ 漆（うるし）塗り箸の絵付け", "随時受付（9:30〜16:00）", "約40分", "1,500円", "乾かして翌日渡し、または郵送"]
      ]
    },
    notes: "※①と④の作品を郵送する場合の送料は、全国一律：①は1個につき900円、④は1膳につき300円です。\n※②は染料が服につくことがありますので、汚れてもよい服装でご参加ください（エプロンは無料貸出）。\n※当工芸館の展示室入館券（大人500円）をお持ちの方は、体験料が1コースにつき200円引きになります。",
    questions: [
      {
        prompt: "日帰り旅行中の大学生トムさんは、13時00分に工芸館に着き、まず展示室を見学した（入館券500円を購入）。その後、15時00分には工芸館を出発して帰りの電車に乗りたいと考えており、作った作品をその日のうちに持ち帰りたい。トムさんが体験できるコースと、展示室入館券を含めて工芸館で支払う合計金額はどれか。",
        options: [
          "②（合計2,100円）",
          "③（合計2,900円）",
          "②（合計2,300円）または④（合計1,800円）",
          "①（合計4,400円）"
        ],
        answer: 0,
        explanation: "Tom wants to finish by 15:00 and take the work home the same day. ① and ④ cannot be taken home the same day. ③ starts at 14:30 and takes 60 minutes (finishing at 15:30, too late for his 15:00 departure). ② starts at 13:30 and takes 45 minutes (finishing around 14:15) and can be taken home the same day. Total cost: 500 (admission ticket) + 1,800 (course ②) - 200 (ticket holder discount) = 2,100 yen."
      },
      {
        prompt: "展示室を見学せずに「① ろくろ陶芸体験」だけに参加し、完成した作品を自宅へ送ってもらう場合、支払う合計金額はいくらか。",
        options: ["3,200円", "3,900円", "4,100円", "4,600円"],
        answer: 2,
        explanation: "Without the exhibition ticket, Course ① costs 3,200 yen, plus nationwide shipping of 900 yen per piece = 4,100 yen."
      }
    ]
  },
  {
    id: "info-31",
    title: "フィットネスクラブ「アクティブ」会員プランのご案内",
    intro: "トレーニングジム・スタジオ・温水プール・大浴場を完備した総合スポーツクラブです（休館日：毎週木曜日）。",
    table: {
      headers: ["会員種別", "利用可能日時", "利用できる施設", "月会費"],
      rows: [
        ["マスター会員", "全営業日 7:00〜23:00", "全施設（ジム・スタジオ・プール・浴場）", "11,000円"],
        ["ジム＆スパ会員", "全営業日 7:00〜23:00", "ジム・大浴場のみ（プール・スタジオ不可）", "7,800円"],
        ["アフタヌーン会員", "平日 12:00〜17:00", "全施設", "6,800円"],
        ["アンダー25会員", "全営業日 7:00〜23:00（25歳以下限定）", "全施設", "8,000円"]
      ]
    },
    notes: "※春の入会キャンペーン（4月末まで）：通常5,500円の事務手数料が0円！さらに、6か月以上の継続を条件に、1か月目の月会費が半額になります。\n※水素水飲み放題オプションは月額1,000円（初月無料）で追加できます。\n※室内用シューズを必ずご持参ください（レンタルシューズは1回300円）。",
    questions: [
      {
        prompt: "30歳の会社員・斎藤さんは、4月のキャンペーン期間中に1年間通う予定で入会する。平日の夜と週末にトレーニングジムと大浴場だけを利用したいと考えており、水素水飲み放題オプションも付けた。1か月目と2か月目に支払う金額の組み合わせとして正しいものはどれか。",
        options: [
          "1か月目：3,900円 ／ 2か月目：8,800円",
          "1か月目：4,900円 ／ 2か月目：8,800円",
          "1か月目：5,500円 ／ 2か月目：12,000円",
          "1か月目：9,400円 ／ 2か月目：8,800円"
        ],
        answer: 0,
        explanation: "Saito is 30 and only wants the gym and bath on weekday nights and weekends, so 'Gym & Spa Member' (7,800 yen/month) fits. Under the spring campaign (staying ≥6 months), the 5,500-yen admin fee is 0 yen, the first month's membership fee is half price (3,900 yen), and the hydrogen water option (1,000 yen/month) is free for the first month. Thus Month 1 = 3,900 yen, and Month 2 = 7,800 + 1,000 = 8,800 yen."
      },
      {
        prompt: "22歳の大学生がプールもスタジオもすべての施設を土曜・日曜や平日の夜に利用したい場合、最も安い会員種別はどれか。",
        options: [
          "マスター会員",
          "ジム＆スパ会員",
          "アフタヌーン会員",
          "アンダー25会員"
        ],
        answer: 3,
        explanation: "A 22-year-old qualifies for the Under-25 membership (8,000 yen/month), which gives access to all facilities during all operating hours and is cheaper than Master (11,000 yen)."
      }
    ]
  },
  {
    id: "info-32",
    title: "引っ越しサービス「らくちん便」単身パック料金表",
    intro: "1人暮らしのお引っ越しに最適な定額パックです（同一都道府県内・移動距離30km以内の基本料金）。",
    table: {
      headers: ["プラン名", "トラックサイズ・目安", "平日基本料金", "土日祝割増", "ダンボール無料提供"],
      rows: [
        ["ミニパック", "軽トラック（大型家具・家電なし）", "15,000円", "＋3,000円", "10箱まで"],
        ["シングルS", "1.5t車（荷物少なめの1R・1K）", "24,000円", "＋5,000円", "15箱まで"],
        ["シングルM", "2tショート車（標準的な1K・1DK）", "32,000円", "＋6,000円", "20箱まで"],
        ["シングルL", "2tロング車（荷物多めの1DK・1LDK）", "42,000円", "＋8,000円", "30箱まで"]
      ]
    },
    notes: "※作業開始時間を会社にお任せいただく「フリー便（午後〜夕方のいずれか）」をお選びいただくと、基本料金から4,000円引きになります（午前指定便は割引なし）。\n※エアコンの取り外し・取り付け工事をご希望の場合は、1台につき別途12,000円がかかります。\n※3月20日〜4月10日の繁忙期は、全プランとも基本料金に10,000円が加算されます。",
    questions: [
      {
        prompt: "5月18日（日）に同じ市内で1Kの部屋へ引っ越す予定の大学生・三浦さんは、冷蔵庫や洗濯機などの大型家電があるため「シングルS」を選び、時間を「フリー便」にした。エアコン工事は頼まない場合、支払う合計金額はいくらか。",
        options: ["20,000円", "24,000円", "25,000円", "29,000円"],
        answer: 2,
        explanation: "May 18 is outside the busy season (March 20–April 10). Single S base price is 24,000 yen, plus 5,000 yen for Sunday, minus 4,000 yen for choosing the flexible 'Free Time Slot' (フリー便): 24,000 + 5,000 - 4,000 = 25,000 yen."
      },
      {
        prompt: "3月25日（火・平日）に「シングルM」の午前指定便で引っ越しをし、エアコン1台の取り外し・取り付け工事も依頼する場合、支払う合計金額はいくらか。",
        options: ["44,000円", "50,000円", "54,000円", "60,000円"],
        answer: 2,
        explanation: "March 25 is a weekday during the peak season (March 20–April 10). Single M weekday base is 32,000 yen + 10,000 yen peak surcharge + 12,000 yen AC installation (no Free Slot discount since morning was specified) = 54,000 yen."
      }
    ]
  },
  {
    id: "info-33",
    title: "海風（うみかぜ）マリンスポーツ スクール＆レンタル案内",
    intro: "透明度の高い青い海でマリンスポーツを体験してみませんか？温水シャワー・更衣室・ロッカーは無料でご利用いただけます。",
    table: {
      headers: ["メニュー", "開始時間", "対象年齢", "体験スクール（120分・機材込）", "機材レンタルのみ（120分）"],
      rows: [
        ["サーフィン", "9:00／13:00", "小学4年生以上", "6,000円", "3,000円"],
        ["SUP（サップ）", "9:30／13:30", "小学1年生以上", "5,500円", "2,800円"],
        ["シーカヤック（2人乗り）", "10:00／14:00", "4歳以上（小学生以下は大人と同乗）", "1組2名 9,000円", "1艇 4,000円"],
        ["シュノーケリング", "10:30／14:30", "6歳以上", "4,500円", "1,500円"]
      ]
    },
    notes: "※体験スクールにはインストラクターの指導料と保険料が含まれています。「機材レンタルのみ」は経験者限定で、別途保険料（1人300円）が必要です。\n※ウェットスーツのレンタルは、体験スクールの方は無料、「機材レンタルのみ」の方は1着1,000円です。\n※前日までにインターネットで予約し、事前カード決済をされた方は、体験スクールが1名（シーカヤックは1組）につき500円引きになります。",
    questions: [
      {
        prompt: "サーフィン経験者の兄と、初心者の妹（2人とも大学生）が一緒に海へ行く。兄はサーフィンの「機材レンタルのみ」に加えてウェットスーツを借り、妹はサーフィンの「体験スクール」を3日前にインターネットで事前カード決済して予約した。2人が支払う金額の合計はいくらか。",
        options: ["9,500円", "9,800円", "10,000円", "10,300円"],
        answer: 1,
        explanation: "Brother (rental only): 3,000 (board) + 300 (insurance) + 1,000 (wetsuit) = 4,300 yen. Sister (school, reserved & prepaid online): 6,000 - 500 (online prepayment discount, wetsuit included) = 5,500 yen. Total = 4,300 + 5,500 = 9,800 yen."
      },
      {
        prompt: "5歳の子どもと父親の2人で一緒に体験できるメニューとして、正しいものはどれか。",
        options: [
          "SUPまたはシュノーケリング",
          "シーカヤックのみ",
          "シーカヤックまたはシュノーケリング",
          "すべてのメニューが体験できない"
        ],
        answer: 1,
        explanation: "For a 5-year-old: Surfing is 4th grade+, SUP is 1st grade+, Snorkeling is 6+, and Sea Kayak is 4+ (riding with an adult). Thus, only Sea Kayak is available."
      }
    ]
  },
  {
    id: "info-34",
    title: "和食レストラン「松風（まつかぜ）」ご宴会・パーティープランのご案内",
    intro: "歓送迎会や同窓会、ご家族のお祝い事にぜひご利用ください。全プラン4名様より承ります（3日前までに要予約）。",
    table: {
      headers: ["コース名", "品数・主な料理", "お料理のみ（1名）", "2時間飲み放題付き（1名）"],
      rows: [
        ["梅（うめ）コース", "全7品（季節の天ぷら・焼き魚など）", "3,500円", "5,000円"],
        ["竹（たけ）コース", "全8品（お刺身盛り合わせ・和牛ステーキなど）", "4,800円", "6,300円"],
        ["松（まつ）コース", "全9品（伊勢海老・黒毛和牛しゃぶしゃぶなど）", "6,500円", "8,000円"],
        ["昼懐石（ひるかいせき）", "全7品（11:30〜14:30開始限定・食後の抹茶付）", "3,200円", "4,500円"]
      ]
    },
    notes: "※「2時間飲み放題」はグループ全員でのご注文となります。ただし、20歳未満の方およびお車を運転される方は、ソフトドリンク飲み放題（料理代＋800円）に変更可能です。\n※個室をご希望の場合は、1室につき個室料2,000円をいただきますが、10名様以上でご予約の場合は個室料が無料になります。\n※日〜木曜日（祝前日を除く）の17時以降に開始する宴会は、幹事様1名分の料理代金（飲み放題代は除く）が無料になる特典があります（8名様以上のグループ限定）。",
    questions: [
      {
        prompt: "会社の部署6名（全員20歳以上・うち1名は車を運転する）で、金曜日の19時から個室を借りて「竹コース」の2時間飲み放題付きを予約した。支払う合計金額はいくらか。",
        options: ["37,100円", "39,100円", "39,800円", "41,100円"],
        answer: 1,
        explanation: "Five adults take the Bamboo course with regular all-you-can-drink: 6,300 × 5 = 31,500 yen. One driver changes to the soft-drink plan (4,800 food + 800 soft drinks = 5,600 yen). Because the group has 6 people (<10), the 2,000-yen private room fee applies (and Friday has no organizer discount). Total = 31,500 + 5,600 + 2,000 = 39,100 yen."
      },
      {
        prompt: "水曜日（祝前日ではない）の18時30分から、大学のサークルのOB会10名（全員20歳以上・車の運転なし）で個室を借りて「梅コース（2時間飲み放題付き）」を利用する。幹事特典を使った場合、10名分の合計金額はいくらか。",
        options: ["45,000円", "46,500円", "48,500円", "50,000円"],
        answer: 1,
        explanation: "10 people taking Plum course with all-you-can-drink normally costs 5,000 × 10 = 50,000 yen. With 10 people, the private room fee is free. Because it is a Wednesday evening with ≥8 people, one organizer's food fee (3,500 yen, excluding the 1,500-yen drink portion) is free. Total = 50,000 - 3,500 = 46,500 yen."
      }
    ]
  }
];

export const CLOZE_PASSAGES = [
  {
    id: "cloze-1",
    passage: "私が日本に来て驚いたことの一つは、電車の時間の正確さだ。私の国の電車は10分や15分遅れるのが普通で、誰も気にしない。[ 23 ]、日本の電車は1分遅れただけでも「遅れて申し訳ありません」という放送が流れる。最初は「たった1分なのに、なぜそんなに謝るのだろう」と不思議に思っていた。しかし、自分も日本でアルバイトを始めて、毎日電車を乗り継ぐようになってから、その理由が[ 24 ]。1本の電車が数分遅れるだけで、次の電車に乗れず、遅刻してしまう人が大勢出るから[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["それに対して", "したがって", "つまり", "たとえば"],
        answer: 0,
        explanation: "'それに対して' (In contrast to that) contrasts the narrator's home country, where 10-15 minute delays are normal, with Japan, where even a 1-minute delay prompts an apology."
      },
      {
        blank: "[ 24 ]",
        options: ["わかっておいた", "わかってきた", "わかりつつある", "わかるはずだった"],
        answer: 1,
        explanation: "'わかってきた' (came to understand gradually over time) expresses a change in realization after starting a part-time job and transferring trains daily in Japan."
      },
      {
        blank: "[ 25 ]",
        options: ["なのか", "なのだ", "にちがいない", "ようとしている"],
        answer: 1,
        explanation: "'〜からだ / 〜からなのだ' provides the explanatory conclusion for why even a slight delay matters so much."
      }
    ]
  },
  {
    id: "cloze-2",
    passage: "先日、友人に誘われて初めて山登りに行った。登る前は「標高の低い山だから、普段運動していなくても簡単に登れる[ 23 ]」と軽く考えていた。[ 24 ]、実際に登り始めてみると、最初から急な坂道が続いて、30分も経たないうちに息が苦しくなってしまった。私が立ち止まって休んでいると、後ろから歩いてきた年配の女性が「ゆっくり自分のペースで歩けば大丈夫ですよ」と声をかけ、レモン味のあめを一つ[ 25 ]。その優しさに元気をもらい、最後まであきらめずに頂上まで登りきることができた。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["べきだ", "わけがない", "はずだ", "おそれがある"],
        answer: 2,
        explanation: "'はずだ' expresses a confident expectation based on a reason ('Since it is a low mountain, I should easily be able to climb it')."
      },
      {
        blank: "[ 24 ]",
        options: ["すると", "ところが", "なぜなら", "さらに"],
        answer: 1,
        explanation: "'ところが' (However / Contrary to expectation) introduces a reality that contradicted the speaker's optimistic assumption."
      },
      {
        blank: "[ 25 ]",
        options: ["あげた", "もらった", "いただいた", "くれた"],
        answer: 3,
        explanation: "The subject of the clause is '年配の女性が' (the elderly woman), who gave candy to the narrator ('私'). Thus 'くれた' is required."
      }
    ]
  },
  {
    id: "cloze-3",
    passage: "最近、現金を使わずにスマートフォンやカードで買い物をする人が増えている。私も先月からスマートフォンの決済アプリを[ 23 ]。最初は操作が難しそうだと思っていたが、使ってみると財布から小銭を出す手間がなく、とても便利だ。[ 24 ]、いつ、どこで、いくら使ったかが画面に自動で記録されるため、家計の管理もしやすい。しかし、便利な反面、お金を使っているという感覚が薄れ、つい買いすぎてしまう[ 25 ]。これからもうまく工夫して使っていきたい。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["使いおわった", "使いはじめた", "使ってある", "使わせていた"],
        answer: 1,
        explanation: "'使いはじめた' (started using) fits '先月から' (since last month) and sets up the initial impression versus actual experience."
      },
      {
        blank: "[ 24 ]",
        options: ["または", "それとも", "ところが", "しかも"],
        answer: 3,
        explanation: "'しかも' (Moreover / What's more) adds another positive feature (automatic spending tracking) on top of not having to take out coins."
      },
      {
        blank: "[ 25 ]",
        options: ["はずだ", "べきだ", "おそれがある", "ことにしている"],
        answer: 2,
        explanation: "'〜おそれがある' (there is a risk/danger of...) fits the negative downside of overspending without realizing it."
      }
    ]
  },
  {
    id: "cloze-4",
    passage: "私の趣味は料理だが、以前はレシピの本に書いてある通りに作らないと不安で仕方がなかった。「砂糖大さじ1、醤油小さじ2」と書いてあれば、必ず計量スプーンで正確に計っていた[ 23 ]。しかし、実家の母が台所で料理をする姿を見ていると、ほとんど目分量で調味料を入れている。それなのに、母が作る料理はいつもとてもおいしい。[ 24 ]母に理由を聞いてみると、「毎回少しずつ野菜の甘みや水分が違うから、途中で味見をして調整することが大切なんだよ」と笑顔で[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["らしい", "みたいだ", "のだ", "べきだった"],
        answer: 2,
        explanation: "'〜ていたのだ' explains the specific concrete detail of the narrator's past habit ('I always measured it precisely with a measuring spoon')."
      },
      {
        blank: "[ 24 ]",
        options: ["そこで", "なぜなら", "つまり", "それに対して"],
        answer: 0,
        explanation: "'そこで' (So / Therefore, taking action based on that situation) connects noticing the mother's delicious cooking to asking her why."
      },
      {
        blank: "[ 25 ]",
        options: ["教えてあげた", "教えてくれた", "教えてもらった", "教えていただいた"],
        answer: 1,
        explanation: "Since '母に' marks the person asked and the subject responding to the narrator is the mother, '教えてくれた' fits naturally."
      }
    ]
  },
  {
    id: "cloze-5",
    passage: "よく「朝ごはんをしっかり食べないと、午前中に勉強や仕事の力が出ない」と言われる。確かに、長い睡眠のあとで脳や体を動かすには、エネルギーの補給が欠かせない。[ 23 ]、夜遅くに食事をして翌朝おなかが空いていないのに、無理にたくさん食べるのはかえって胃や腸に負担をかけてしまうそうだ。[ 24 ]、大切なのは「とにかく朝たくさん食べること」ではなく、前の晩の食事の時間や量を整えて、朝起きたときに自然と「おなかが空いた」と感じられる生活リズムを作ること[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["したがって", "しかし", "なぜなら", "たとえば"],
        answer: 1,
        explanation: "'しかし' (However) introduces a counter-perspective to the general saying that you must eat a big breakfast."
      },
      {
        blank: "[ 24 ]",
        options: ["すると", "ところが", "つまり", "それとも"],
        answer: 2,
        explanation: "'つまり' (In other words / To sum up) introduces the main conclusion drawn from the preceding discussion."
      },
      {
        blank: "[ 25 ]",
        options: ["べきだった", "最中だ", "かけている", "なのだ"],
        answer: 3,
        explanation: "'〜ことなのだ' emphasizes the writer's conclusion ('what is important is creating a lifestyle rhythm...')."
      }
    ]
  },
  {
    id: "cloze-6",
    passage: "田中部長へ\nお忙しいところ恐れ入ります。来週月曜日の午後2時から予定されていた「新商品企画会議」の件でご連絡いたします。先ほど、当日使用する第1会議室のエアコンが故障し、修理が火曜日までかかってしまうことがわかりました。[ 23 ]、会議の場所を3階の第2会議室に変更させていただきたく存じます。なお、時間の変更はございません。参加者の皆様には、私からメールで場所の変更を[ 24 ]です。直前の変更でご迷惑をおかけしますが、どうぞよろしく[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["それに対して", "したがって", "ところが", "たとえば"],
        answer: 1,
        explanation: "'したがって' (Therefore / Consequently) connects the broken air conditioner in Room 1 to the decision to move the meeting to Room 2."
      },
      {
        blank: "[ 24 ]",
        options: ["伝えてあるところ", "伝えたはず", "伝えておくつもり", "伝えっぱなし"],
        answer: 2,
        explanation: "'〜ておくつもりです' (I intend to inform them in advance as preparation) fits business communication reporting an upcoming action."
      },
      {
        blank: "[ 25 ]",
        options: ["お願いいたします", "おっしゃいます", "ご覧になります", "いただきます"],
        answer: 0,
        explanation: "'どうぞよろしくお願いいたします' is the standard polite closing formula in Japanese business emails."
      }
    ]
  },
  {
    id: "cloze-7",
    passage: "私の部屋には大きな本棚が二つあるが、どちらも本でいっぱいになってしまった。新しい本を買っても入れる場所がないため、机の上や床に[ 23 ]になっている。母からは「読まない本は古本屋に売るか、誰かにあげるかしなさい」と何度も注意された。[ 24 ]、休日にいざ本を整理しようとして手に取ると、それを読んだときの思い出が次々によみがえってきて、どうしても捨てられなくなってしまう。結局、昨日も片付けるどころか、昔のお気に入りの小説を夜中まで夢中で[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["置きかけ", "置きがち", "置きっぱなし", "置くべき"],
        answer: 2,
        explanation: "'置きっぱなしになっている' (left sitting out as they are) describes books left piled on the desk and floor."
      },
      {
        blank: "[ 24 ]",
        options: ["なぜなら", "ところが", "したがって", "つまり"],
        answer: 1,
        explanation: "'ところが' (However / Even so) contrasts the intention to tidy up after the mother's warning with the inability to throw anything away."
      },
      {
        blank: "[ 25 ]",
        options: ["読んでおいた", "読みつつある", "読むことにしている", "読んでしまった"],
        answer: 3,
        explanation: "'読んでしまった' (ended up reading / regrettably read all the way till midnight instead of cleaning) expresses an unintended outcome."
      }
    ]
  },
  {
    id: "cloze-8",
    passage: "子どもの頃、私はピーマンやニンジンなどの野菜が大嫌いだった。細かく切ってカレーやハンバーグに混ぜても、見つけて残してしまうほどだった。[ 23 ]ある夏の日、祖父の家の畑で真っ赤に実ったトマトとピーマンを自分の手で収穫する機会があった。祖父が「採れたてはおいしいぞ」と言って、その場で水で洗って[ 24 ]ピーマンをかじってみると、苦みがほとんどなく、驚くほど甘かった。それ以来、私は少しずつ野菜が[ 25 ]、今ではサラダが一番好きな料理になった。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["だから", "つまり", "しかし", "しかも"],
        answer: 2,
        explanation: "'しかし' (However) marks the turning point from hating vegetables to the summer experience at the grandfather's farm."
      },
      {
        blank: "[ 24 ]",
        options: ["あげた", "くれた", "もらった", "やった"],
        answer: 1,
        explanation: "The grandfather ('祖父が') washed the pepper and gave it to the narrator, so '洗ってくれた' is grammatically required."
      },
      {
        blank: "[ 25 ]",
        options: ["食べられるようになり", "食べることにし", "食べようとしており", "食べられるはずであり"],
        answer: 0,
        explanation: "'食べられるようになり' (came to be able to eat) expresses acquiring the ability/habit of eating vegetables over time."
      }
    ]
  },
  {
    id: "cloze-9",
    passage: "インターネットで買い物をするとき、実際にその商品を買った人の「口コミ」や評価を参考にする人は多いだろう。私も服や家電を買う前には必ずチェックするようにしている。[ 23 ]、口コミの評価が高いからといって、自分にとっても良い商品だ[ 24 ]。先日、星が5つ並んでいる人気の枕を買ってみたのだが、私には高さが合わず、首が痛くなってしまった。人の感想はあくまで一つの目安として考え、特に体に関わるものは実際に店で試してから[ 25 ]だと反省した。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["したがって", "なぜなら", "もっとも", "すると"],
        answer: 2,
        explanation: "'もっとも' (However / That said) adds a caveat or qualification to the preceding statement about checking online reviews."
      },
      {
        blank: "[ 24 ]",
        options: ["にちがいない", "とは限らない", "ざるを得ない", "に決まっている"],
        answer: 1,
        explanation: "'〜からといって、〜とは限らない' (just because X does not necessarily mean Y) is a core N3 pattern."
      },
      {
        blank: "[ 25 ]",
        options: ["買うはず", "買いがち", "買いかけ", "買うべき"],
        answer: 3,
        explanation: "'買うべきだ' (one should buy after trying it out in person) expresses the lesson learned from the experience."
      }
    ]
  },
  {
    id: "cloze-10",
    passage: "私の住んでいる町では、昨年から図書館の隣に「世代間交流カフェ」が作られた。ここでは、地域のお年寄りが地域の子どもたちに折り紙や昔の遊びを教えたり、逆に高校生や大学生がお年寄りにスマートフォンの使い方を[ 23 ]している。現代の社会では、核家族化が進み、同じ世代の人としか話さない人が増え[ 24 ]。[ 25 ]、このような場所でお互いの得意なことを生かして助け合うことは、地域全体のつながりを強くするためにとても素晴らしい取り組みだと思う。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["教わったり", "教えたり", "教えられたり", "教えさせたり"],
        answer: 1,
        explanation: "'教えたりしている' parallels the earlier '折り紙や昔の遊びを教えたり' ('seniors teach origami..., or conversely students teach smartphone usage...')."
      },
      {
        blank: "[ 24 ]",
        options: ["かけだ", "っぱなしだ", "がちだ", "っこない"],
        answer: 2,
        explanation: "'増えがちだ' (tends to increase / people tend to only talk with their own generation) expresses an undesirable tendency."
      },
      {
        blank: "[ 25 ]",
        options: ["だからこそ", "それに対して", "ところが", "それとも"],
        answer: 0,
        explanation: "'だからこそ' (Precisely for that reason) highlights why intergenerational exchange is so valuable given the lack of cross-generational contact."
      }
    ]
  },
  {
    id: "cloze-11",
    passage: "語学の勉強を続けていると、誰でも「毎日勉強しているのに、ちっとも上達していない」と落ち込む時期がある。しかし、言語の力は階段のように少しずつ一定の割合で伸びるのではなく、しばらく平らな状態が続いたあとで、ある日突然ぐんと伸びるもの[ 23 ]。最初は知らない単語や文法ばかりで頭の中が混乱するが、あきらめずに[ 24 ]と、ある瞬間から急に点と点がつながって理解できるようになる。[ 25 ]、すぐに結果が出なくても、自分を信じてコツコツ努力を続けることが大切だ。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["べきだ", "おそれがある", "つもりだ", "なのだ"],
        answer: 3,
        explanation: "'〜ものなのだ' explains the general nature or truth about how language proficiency develops."
      },
      {
        blank: "[ 24 ]",
        options: ["つづけておく", "つづけている", "つづけてある", "つづけようとした"],
        answer: 1,
        explanation: "'あきらめずにつづけていると' (when you keep continuing without giving up) expresses an ongoing habitual effort leading to a breakthrough."
      },
      {
        blank: "[ 25 ]",
        options: ["ところが", "したがって", "それに対して", "なぜなら"],
        answer: 1,
        explanation: "'したがって' (Therefore) draws the encouraging conclusion from how language learning works."
      }
    ]
  },
  {
    id: "cloze-12",
    passage: "先日、仕事で大きなミスをしてしまい、ひどく落ち込んで家に帰った。夕食を作る気力もなく、ソファに座ってため息をついていると、小学2年生の息子が「お母さん、これあげる」と言って、小さな折り紙のメダルを私の首に[ 23 ]。そこには「いつもおしごとがんばってくれてありがとう」と丁寧に書いてあった。息子は私が元気がないことに気づいて、なんとか励まそうと[ 24 ]のだ。[ 25 ]、胸がいっぱいになり、明日からもまた前を向いて頑張ろうという気持ちになれた。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["かけてあげた", "かけてくれた", "かけてもらった", "かけさせた"],
        answer: 1,
        explanation: "The son ('息子が') is the subject performing the kind action of putting the medal around the narrator's neck, so 'かけてくれた' is used."
      },
      {
        blank: "[ 24 ]",
        options: ["してあげた", "してもらった", "してくれた", "してあった"],
        answer: 2,
        explanation: "'励まそうとしてくれたのだ' (he tried to cheer me up out of kindness) combines volitional + とする + てくれる."
      },
      {
        blank: "[ 25 ]",
        options: ["すると", "それに対して", "なぜなら", "もっとも"],
        answer: 0,
        explanation: "'すると' (Then / Upon that) describes the emotional reaction that immediately followed reading the son's message."
      }
    ]
  },
  {
    id: "cloze-13",
    passage: "地球温暖化を防ぐために、エアコンの設定温度を控えめにしたり、マイバッグを持ち歩いたりする人が増えている。一人ひとりができることは小さい[ 23 ]。「自分が一人ぐらいレジ袋を断ったところで、環境は何も変わらないだろう」と考える人もいる。しかし、もし1億人が毎日1枚ずつレジ袋を減らせば、1年で365億枚ものプラスチックごみが減る[ 24 ]。[ 25 ]、大切なのは「自分一人くらい」ではなく「まず自分から」という意識を持つことではないだろうか。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["にちがいない", "はずがない", "かもしれない", "べきではない"],
        answer: 2,
        explanation: "'小さいかもしれない' (what each person can do may be small) concedes a point before arguing that collective action adds up."
      },
      {
        blank: "[ 24 ]",
        options: ["つもりだ", "わけだ", "ところだ", "ばかりだ"],
        answer: 1,
        explanation: "'減るわけだ' (it logically follows / calculates out that 36.5 billion bags would be reduced) expresses a logical/mathematical consequence."
      },
      {
        blank: "[ 25 ]",
        options: ["ところが", "すると", "なぜなら", "つまり"],
        answer: 3,
        explanation: "'つまり' (In short / In other words) summarizes the author's main message."
      }
    ]
  },
  {
    id: "cloze-14",
    passage: "私の父はとても無口な人で、普段は自分の気持ちをあまり言葉にしない。私が大学への進学で実家を離れる日も、母は駅のホームで涙を流して「体に気をつけてね」と何度も手を振ってくれた。[ 23 ]、父は少し離れた場所で黙って立っているだけだった。しかし、電車が動き出して私が鞄を開けると、中に父の字で書かれた手紙と新しい万年筆が[ 24 ]。手紙には「困ったらいつでも帰ってきなさい」と短く書かれていた。父は恥ずかしくて直接言えなかったから、こっそり鞄に入れてくれた[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["それに対して", "したがって", "なぜなら", "たとえば"],
        answer: 0,
        explanation: "'それに対して' (In contrast) contrasts the mother crying and waving with the father standing silently at a distance."
      },
      {
        blank: "[ 24 ]",
        options: ["入れておいた", "入っていた", "入れようとしていた", "入るはずだった"],
        answer: 1,
        explanation: "'入っていた' describes the state discovered when the narrator opened the bag: a letter and fountain pen were inside."
      },
      {
        blank: "[ 25 ]",
        options: ["わけがない", "べきである", "にちがいない", "おそれがある"],
        answer: 2,
        explanation: "'にちがいない' (must have / no doubt) expresses the narrator's warm conviction about why the father secretly put the letter in the bag."
      }
    ]
  },
  {
    id: "cloze-15",
    passage: "新しい靴を買うとき、午前中に試着して買うと失敗することがあるそうだ。[ 23 ]、人間の足は朝起きてから歩いたり立ったりしているうちに、血液や水分が下がって少しずつむくみ、夕方になると朝より0.5センチほど大きくなることがあるからだ。そのため、朝ぴったりのサイズを選んだつもりでも、夕方に履くと「きつくて足が痛い」と[ 24 ]。[ 25 ]、自分の足に本当に合った靴を選びたいなら、足が一番大きくなる夕方以降に靴屋へ行くのが良いと言われている。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["ところが", "なぜなら", "それに対して", "すると"],
        answer: 1,
        explanation: "'なぜなら' (Because / The reason is) pairs with '〜からだ' at the end of the sentence to explain why buying shoes in the morning can fail."
      },
      {
        blank: "[ 24 ]",
        options: ["なりかけだ", "なったままだ", "なるべきだ", "なりがちだ"],
        answer: 3,
        explanation: "'なりがちだ' (tends to become / is prone to resulting in) describes the common problem of shoes feeling too tight by evening."
      },
      {
        blank: "[ 25 ]",
        options: ["したがって", "しかし", "たとえば", "または"],
        answer: 0,
        explanation: "'したがって' (Therefore) introduces the practical advice based on the physiological explanation."
      }
    ]
  },
  {
    id: "cloze-16",
    passage: "先日、図書館で借りた本を電車の中で読んでいたら、急に雨が降りだした。私は傘を持っていなかったため、駅から家まで走って帰る[ 23 ]。そのとき、本は鞄の中に入れてあったのだが、鞄のファスナーが少し開いていたせいで、本の端が雨で濡れてシワになってしまった。すぐ乾かして図書館へ持っていき、事情を話して謝ると、係の人は「正直に言ってくださってありがとうございます。私たちが修理しますから大丈夫ですよ」と優しく[ 24 ]。これからは借りた本をビニール袋に入れてから鞄に[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["はずだった", "ことはなかった", "しかなかった", "わけではなかった"],
        answer: 2,
        explanation: "'走るしかなかった' (had no choice but to run) fits not having an umbrella when it suddenly started raining."
      },
      {
        blank: "[ 24 ]",
        options: ["言ってくれた", "言ってあげた", "言ってもらった", "言わせた"],
        answer: 0,
        explanation: "The library staff ('係の人は') spoke kindly to the narrator, so '言ってくれた' is used."
      },
      {
        blank: "[ 25 ]",
        options: ["しまっておいた", "しまうことにしよう", "しまってある", "しまうはずだ"],
        answer: 1,
        explanation: "'しまうことにしよう' (I will make it a rule to put borrowed books in a plastic bag before putting them in my bag) expresses a resolution for the future."
      }
    ]
  },
  {
    id: "cloze-17",
    passage: "多くの人は「集中力があるから勉強や仕事が長く続けられる」と考えている。しかし、脳科学の専門家によると、実はその逆で、「とりあえずやり始めるから脳が刺激されて集中力が生まれる」のだそうだ。[ 23 ]、「やる気が出たら勉強しよう」と思って机の前で待っていても、いつまでたってもやる気は出てこない。まず1問だけ問題を解くとか、1ページだけ本を読むといった小さな行動を起こすことで、脳が少しずつ[ 24 ]。[ 25 ]、何かを始めるハードルをできるだけ低くすることが、集中への近道なのだ。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["たとえば", "つまり", "それに対して", "ところが"],
        answer: 1,
        explanation: "'つまり' (In other words) rephrases the expert's claim into a concrete implication: waiting for motivation before starting won't work."
      },
      {
        blank: "[ 24 ]",
        options: ["働きおわるのだ", "働いてあるのだ", "働きはじめるのだ", "働くべきなのだ"],
        answer: 2,
        explanation: "'働きはじめるのだ' (the brain gradually starts working) explains the effect of taking a small initial action."
      },
      {
        blank: "[ 25 ]",
        options: ["それなのに", "それとも", "なぜなら", "このように"],
        answer: 3,
        explanation: "'このように' (In this way / Thus) wraps up the explanation and states the final takeaway."
      }
    ]
  },
  {
    id: "cloze-18",
    passage: "日本のスーパーに行くと、きゅうりやトマトの横に、形が少し曲がっていたり大きさが不ぞろいだったりする野菜が「訳あり品」として安く売られていることがある。以前は、見た目がきれいな野菜ばかりがお店に並び、形が悪いものは味が同じでも捨てられてしまうことが多かった。[ 23 ]最近では、食品ロスを減らそうという意識が高まり、形が悪くても安いほうがいいと考える消費者が[ 24 ]。生産者にとっても無駄が減り、買う側も家計が助かるのだから、これは双方にとって良い変化だ[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["しかし", "したがって", "なぜなら", "すなわち"],
        answer: 0,
        explanation: "'しかし' (However) contrasts past practices ('以前は...') with recent trends ('最近では...')."
      },
      {
        blank: "[ 24 ]",
        options: ["増えおわった", "増えつつある", "増えっぱなしだ", "増えるはずがない"],
        answer: 1,
        explanation: "'増えつつある' (is in the process of increasing / is steadily growing) is a standard N3 written expression for ongoing social trends."
      },
      {
        blank: "[ 25 ]",
        options: ["とは限らない", "ざるを得ない", "と言えるだろう", "に決まっている"],
        answer: 2,
        explanation: "'と言えるだろう' (one could say that...) is an essay-style concluding modality."
      }
    ]
  },
  {
    id: "cloze-19",
    passage: "私は昔から人前で話すのが苦手で、会議や授業で発表する順番が近づくと、心臓がドキドキして手が震えていた。[ 23 ]あるとき、スピーチが得意な先輩に相談してみると、先輩は「緊張するのは、『うまく話してよく見られたい』と自分のことばかり考えているからだよ」と教えてくれた。[ 24 ]、「どうすれば聞いている人に内容がわかりやすく伝わるか」という相手のことだけを考えるようにすれば、不思議と緊張が和らぐというのだ。それ以来、私は先輩の言葉を思い出して、聞く人の顔を見ながら[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["なぜなら", "つまり", "そこで", "それに対して"],
        answer: 2,
        explanation: "'そこで' (So / Consequently) connects the narrator's struggle with public speaking to the action of consulting a senior."
      },
      {
        blank: "[ 24 ]",
        options: ["たとえば", "反対に", "すると", "ところが"],
        answer: 1,
        explanation: "'反対に' (Conversely / On the other hand) contrasts thinking only about oneself with focusing on the listener."
      },
      {
        blank: "[ 25 ]",
        options: ["話すことになった", "話したばかりだ", "話すおそれがある", "話すようにしている"],
        answer: 3,
        explanation: "'話すようにしている' (I make a conscious effort to speak while looking at the listeners' faces) expresses an ongoing habit."
      }
    ]
  },
  {
    id: "cloze-20",
    passage: "スマートフォンの地図アプリは非常に便利で、初めて行く場所でも迷わずにたどり着くことができる。しかし、私はあえて休日の散歩では地図アプリを見ずに、自分の感覚だけで知らない道を歩いてみることがある。[ 23 ]、思いがけず素敵な小さなパン屋を見つけたり、静かで美しい神社に出会ったりすることがあるからだ。画面ばかり見て最短距離で目的地へ向かっていると、周りの景色や季節の移り変わりに[ 24 ]。たまには遠回りをして「道に迷うこと」を楽しむ余裕も、忙しい現代人には必要[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["なぜなら", "ところが", "したがって", "それに対して"],
        answer: 0,
        explanation: "'なぜなら' (Because) pairs with '〜からだ' at the end of the sentence to explain why the narrator walks without a map app."
      },
      {
        blank: "[ 24 ]",
        options: ["気づきやすい", "気づくべきだ", "気づきにくい", "気づきかけている"],
        answer: 2,
        explanation: "'気づきにくい' (hard to notice) explains that staring at a screen on the shortest route makes it difficult to notice surrounding scenery."
      },
      {
        blank: "[ 25 ]",
        options: ["なはずがない", "なのではないだろうか", "なわけにはいかない", "なつもりだ"],
        answer: 1,
        explanation: "'〜なのではないだろうか' (isn't it necessary...?) is a classic N3 essay-closing rhetorical question."
      }
    ]
  },
  {
    id: "cloze-21",
    passage: "先月、10年間乗っていた自転車が壊れてしまったため、思い切って電動アシスト自転車に買い替えた。私の家の近くは坂道が多く、以前はスーパーで重い野菜や牛乳を買った帰り道、自転車を降りて押して歩かなければならなかった。[ 23 ]、新しい自転車にしてからは、どんなに急な坂道でも座ったまま楽に上ることができる。最初は「普通の自転車より値段がずっと高いから、もったいないかな」と[ 24 ]が、今では買い物に行くのがすっかり楽しくなり、もっと早く買っておけばよかったと[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["したがって", "つまり", "なぜなら", "ところが"],
        answer: 3,
        explanation: "'ところが' (However / By contrast) highlights the dramatic positive change after switching to the electric-assist bicycle."
      },
      {
        blank: "[ 24 ]",
        options: ["迷っていた", "迷っておいた", "迷ってあった", "迷わせる"],
        answer: 0,
        explanation: "'迷っていた' (I was hesitating/wondering at first) describes the narrator's past state of mind before buying."
      },
      {
        blank: "[ 25 ]",
        options: ["思うべきだ", "思っているくらいだ", "思うおそれがある", "思うはずがない"],
        answer: 1,
        explanation: "'思っているくらいだ' (I even feel to the extent that I wish I had bought it sooner) emphasizes the high degree of satisfaction."
      }
    ]
  },
  {
    id: "cloze-22",
    passage: "日本には「おすそわけ」という習慣がある。旅行のお土産や、親戚からたくさん届いた果物などを、近所の人に少しずつ分けてあげることだ。私が今のマンションに引っ越してきたばかりの頃、隣の部屋の奥さんが「実家からりんごがたくさん送られてきたから」と言って、真っ赤なりんごを3つ[ 23 ]。都会のマンションでは隣にどんな人が住んでいるのかさえ知らないことが多いと聞いていたので、私はとても驚くと同時に、温かい気持ちになった。[ 24 ]私も先月、故郷のお菓子を隣の奥さんに[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["持ってきてあげた", "持ってきてもらった", "持ってきてくれた", "持っていかせた"],
        answer: 2,
        explanation: "The neighbor ('隣の部屋の奥さんが') brought apples to the narrator, so '持ってきてくれた' is required."
      },
      {
        blank: "[ 24 ]",
        options: ["そこで", "ところが", "それに対して", "なぜなら"],
        answer: 0,
        explanation: "'そこで' (So / Motivated by that) connects receiving the neighbor's kindness to the narrator reciprocating last month."
      },
      {
        blank: "[ 25 ]",
        options: ["届けてくれた", "届けてもらった", "届けてくださった", "届けてあげた"],
        answer: 3,
        explanation: "Here the narrator ('私も') is the giver performing the action for the neighbor, so '届けてあげた' fits."
      }
    ]
  },
  {
    id: "cloze-23",
    passage: "読書には、小説のように物語を楽しむ読み方と、ビジネス書のように必要な知識を得るための読み方がある。小説を読むときは、最初から順番に一行ずつ丁寧に読んでいくのが普通だ。[ 23 ]、知識を得るための本は、必ずしも最初のページから最後まで全部読む[ 24 ]。まず目次を見て、自分が今知りたいことや悩んでいることに関係のある章だけを選んで読むだけでも十分な効果がある。「全部読まなければならない」と思うと負担になり、途中で[ 25 ]から、目的に応じて読み方を変えるといい。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["したがって", "それに対して", "すなわち", "なぜなら"],
        answer: 1,
        explanation: "'それに対して' (In contrast) contrasts how people read novels versus how they read informational/business books."
      },
      {
        blank: "[ 24 ]",
        options: ["ことはない", "にちがいない", "はずがない", "しかない"],
        answer: 0,
        explanation: "'〜ことはない' (there is no need to...) matches '必ずしも〜全部読むことはない' ('you do not necessarily need to read every page from start to finish')."
      },
      {
        blank: "[ 25 ]",
        options: ["やめようとしている", "やめてある", "やめてしまいがちだ", "やめるべきだ"],
        answer: 2,
        explanation: "'やめてしまいがちだ' (tends to end up quitting halfway) explains why feeling forced to read cover-to-cover is counterproductive."
      }
    ]
  },
  {
    id: "cloze-24",
    passage: "人間関係でストレスをためないためには、「自分の考えと相手の考えは違って当たり前だ」と思うことが大切だ。私たちはつい、親しい友人や家族に対して「言わなくても自分の気持ちをわかってくれる[ 23 ]」と期待してしまう。[ 24 ]、相手が自分の思った通りの反応をしてくれないと、「どうしてわかってくれないのか」と腹を立ててしまうのだ。しかし、どんなに仲が良くても、育った環境も経験も違う別の人間である。[ 25 ]、大切なことほど言葉にして丁寧に伝える努力を忘れてはならない。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["べきだ", "わけがない", "ことはない", "はずだ"],
        answer: 3,
        explanation: "'わかってくれるはずだ' (they ought to / surely will understand how I feel without me saying it) expresses an assumption held toward close friends or family."
      },
      {
        blank: "[ 24 ]",
        options: ["そのため", "ところが", "それに対して", "たとえば"],
        answer: 0,
        explanation: "'そのため' (For that reason / Because of that expectation) explains why people get angry when others don't react as expected."
      },
      {
        blank: "[ 25 ]",
        options: ["すると", "したがって", "なぜなら", "または"],
        answer: 1,
        explanation: "'したがって' (Therefore) leads to the final conclusion that we must make the effort to put important things into words."
      }
    ]
  },
  {
    id: "cloze-25",
    passage: "私の趣味は古い喫茶店めぐりだ。最近のおしゃれなカフェも素敵だが、何十年も前から営業している喫茶店には特別な魅力がある。[ 23 ]、使い込まれて少し色の変わった木のテーブルや、落ち着いた照明、そして店主が一杯ずつ丁寧に入れてくれるコーヒーの香りだ。先日訪れた店では、80歳近いマスターが「若い人が来てくれるとうれしいね」と笑顔で話しかけてくれ、おまけに小さなチョコレートまで[ 24 ]。こうした温かい触れ合いがあるからこそ、私は古い喫茶店に[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["しかし", "したがって", "たとえば", "それに対して"],
        answer: 2,
        explanation: "'たとえば' (For example) introduces specific examples of the special charm of old coffee shops (wooden tables, lighting, coffee aroma)."
      },
      {
        blank: "[ 24 ]",
        options: ["さしあげた", "いただいた", "まいった", "くださった"],
        answer: 3,
        explanation: "The master ('マスターが') is the subject giving the chocolate to the narrator, so the honorific giving verb 'くださった' is appropriate."
      },
      {
        blank: "[ 25 ]",
        options: ["通いつづけているのだ", "通いおわったのだ", "通うはずだったのだ", "通わせていたのだ"],
        answer: 0,
        explanation: "'通いつづけているのだ' (that is why I keep visiting old coffee shops) wraps up the essay by linking the reason ('からこそ') to the ongoing habit."
      }
    ]
  },
  {
    id: "cloze-26",
    passage: "毎年夏になると、熱中症で病院に運ばれる人のニュースをよく耳にする。多くの人は「喉が渇いてから水を飲めばいい」と考えているが、実は「喉が渇いた」と感じたときには、すでに体の中の水分がかなり[ 23 ]そうだ。[ 24 ]、高齢者や小さな子どもは喉の渇きそのものを感じにくいため、周囲の人が気づかないうちに重症化してしまうことも少なくない。したがって、暑い季節には喉が渇いていなくても、1時間にコップ1杯程度の水をこまめに[ 25 ]が重要である。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["失わせておく", "失われてしまっている", "失われようとしている", "失われるべきだ"],
        answer: 1,
        explanation: "'すでに〜失われてしまっているそうだ' (it is said that a considerable amount of water has already been lost by the time you feel thirsty) matches 'すでに'."
      },
      {
        blank: "[ 24 ]",
        options: ["ところが", "つまり", "さらに", "それに対して"],
        answer: 2,
        explanation: "'さらに' (Furthermore) adds another critical risk factor regarding the elderly and young children."
      },
      {
        blank: "[ 25 ]",
        options: ["飲むようにすること", "飲んだばかりのこと", "飲むはずのこと", "飲みかけのこと"],
        answer: 0,
        explanation: "'飲むようにすること' (making a habit/effort to drink water frequently) fits '〜が重要である'."
      }
    ]
  },
  {
    id: "cloze-27",
    passage: "私は朝が弱く、目覚まし時計を3つセットしてもなかなか起きられなかった。夜遅くまでスマートフォンを見てしまい、寝るのがいつも午前2時過ぎになっていた[ 23 ]。しかし先月、大切な試験の日に寝坊しそうになり、「このままではいけない」と強く反省した。[ 24 ]、夜11時以降はスマートフォンを寝室に持ち込まず、リビングの充電器に置いておくというルールを作った。最初は少し寂しかったが、1週間ほどすると夜11時半には自然に眠くなり、今では朝6時にすっきり目が覚める[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["ためか", "のに", "ばかりか", "からだ"],
        answer: 3,
        explanation: "'〜からだ' explains the reason why the narrator couldn't wake up even with three alarm clocks."
      },
      {
        blank: "[ 24 ]",
        options: ["そこで", "ところが", "なぜなら", "それに対して"],
        answer: 0,
        explanation: "'そこで' (So / Taking action to solve that problem) introduces the new rule of leaving the smartphone in the living room."
      },
      {
        blank: "[ 25 ]",
        options: ["ことにした", "ようになった", "はずだった", "ところだった"],
        answer: 1,
        explanation: "'目が覚めるようになった' (came to be able to wake up refreshed at 6 a.m.) describes a change in state/ability."
      }
    ]
  },
  {
    id: "cloze-28",
    passage: "日本語には「雨降って地固まる」ということわざがある。雨が降ると地面の土はいったん柔らかくなってぬかるむが、雨がやんで乾くと、前よりもずっと固く引き締まった地面になる。[ 23 ]、人間関係においても、一度けんかやトラブルが起きてお互いの本音をぶつけ合ったあとは、かえって前よりも深い信頼関係が生まれるという意味だ。先日、私も同じチームの同僚と仕事の進め方で激しく言い合いになったが、お互いに考えを[ 24 ]おかげで、今では以前よりずっと協力しやすくなった。まさにこのことわざの通りだ[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["ところが", "それに対して", "つまり", "なぜなら"],
        answer: 2,
        explanation: "'つまり' (In other words) explains the figurative meaning of the proverb after describing the literal image of rain and soil."
      },
      {
        blank: "[ 24 ]",
        options: ["話し合った", "話し合おうとした", "話し合いかけていた", "話し合うはずの"],
        answer: 0,
        explanation: "'話し合ったおかげで' (thanks to having discussed our thoughts with each other) explains the positive outcome."
      },
      {
        blank: "[ 25 ]",
        options: ["と決まっている", "とは限らない", "ざるを得ない", "と感じている"],
        answer: 3,
        explanation: "'まさにこのことわざの通りだと感じている' (I feel it is truly just as this proverb says) concludes the personal reflection."
      }
    ]
  },
  {
    id: "cloze-29",
    passage: "先日、デパートのエレベーターに乗ったときのことだ。ベビーカーを押した母親が乗ろうとしたが、中はかなり混雑していた。母親が「次のエレベーターを待ちます」と言って後ろに下がろうとしたとき、奥に乗っていたスーツ姿の男性が「どうぞ、乗ってください」と言って、自分が一度外に出て場所を[ 23 ]。すると、周りにいた人たちも少しずつ体を寄せてスペースを作り、結局その男性も無事に乗り込むことができた。たった一人の小さな親切が、その場にいた全員の心を温かく[ 24 ]。[ 25 ]、私も困っている人を見かけたら、すぐに行動できる人になりたいと思った。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["空けてもらったのだ", "空けてあげたのだ", "空けさせたのだ", "空けられたのだ"],
        answer: 1,
        explanation: "The man in the suit stepped out to make room for the mother with the stroller ('空けてあげたのだ')."
      },
      {
        blank: "[ 24 ]",
        options: ["してあげた", "してもらった", "してくれた", "してあった"],
        answer: 2,
        explanation: "One person's small kindness warmed the hearts of everyone present (including the narrator), so '温かくしてくれた' is used."
      },
      {
        blank: "[ 25 ]",
        options: ["それを見て", "それに対して", "なぜなら", "ところが"],
        answer: 0,
        explanation: "'それを見て' (Seeing that) connects witnessing the scene in the elevator to the narrator's own aspiration."
      }
    ]
  },
  {
    id: "cloze-30",
    passage: "冷凍食品といえば、昔は「料理をする時間がないときに仕方なく食べるもの」というイメージが強かった。[ 23 ]、最近の冷凍技術の進歩には目を見張るものがある。収穫したばかりの野菜や、作りたての料理を急速に冷凍することで、栄養や風味をそのまま閉じ込めることができるようになった[ 24 ]。そのため、今では一流レストランのシェフが監修したパスタや、専門店と変わらない味のラーメンまで冷凍食品として売られている。忙しい日の助けになるだけでなく、自宅で手軽に本格的な味を楽しめる時代になった[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["したがって", "つまり", "なぜなら", "しかし"],
        answer: 3,
        explanation: "'しかし' (However) contrasts the old negative image of frozen food with recent remarkable technological advances."
      },
      {
        blank: "[ 24 ]",
        options: ["のだ", "べきだ", "おそれがある", "つもりだ"],
        answer: 0,
        explanation: "'〜ようになったのだ' provides the background explanation for why frozen food quality has improved so dramatically."
      },
      {
        blank: "[ 25 ]",
        options: ["はずがない", "わけだ", "ことはない", "っぱなしだ"],
        answer: 1,
        explanation: "'〜時代になったわけだ' (thus we have entered an era where...) summarizes the natural conclusion of the passage."
      }
    ]
  },
  {
    id: "cloze-31",
    passage: "来月、同じ部署で3年間一緒に働いた佐藤さんが、大阪の支店へ転勤する[ 23 ]。佐藤さんは私が新入社員として配属されたときからの指導係で、仕事のやり方から取引先へのマナーまで、いつも辛抱強く丁寧に[ 24 ]。私が大きな失敗をして落ち込んでいるときも、決して怒らずに「次はどうすればうまくいくか一緒に考えよう」と励ましてくださった。[ 25 ]、感謝の気持ちを込めて、部署のみんなで佐藤さんが好きなお酒とメッセージアルバムを贈る準備を進めている。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["ことにした", "ようにしている", "ことになった", "ばかりだった"],
        answer: 2,
        explanation: "'転勤することになった' (it has been decided that Sato-san will be transferred) is used for organizational decisions."
      },
      {
        blank: "[ 24 ]",
        options: ["教えてさしあげた", "教えてくださった", "教えていただいた", "教えてまいった"],
        answer: 1,
        explanation: "Sato-san ('佐藤さんは') is the subject who kindly taught the narrator, matching the respectful '励ましてくださった' in the next sentence."
      },
      {
        blank: "[ 25 ]",
        options: ["そこで", "ところが", "それに対して", "なぜなら"],
        answer: 0,
        explanation: "'そこで' (So / Therefore) connects gratitude for Sato-san's mentorship with preparing a farewell gift."
      }
    ]
  },
  {
    id: "cloze-32",
    passage: "植物を育てるのが好きな友人に勧められて、今年の春からベランダでミニトマトを育てている。最初は「毎日水をやるだけだから簡単だろう」と思っていた。[ 23 ]、実際に育ててみると、水をやりすぎると根が腐ってしまうし、葉が茂りすぎると実に栄養が行かなくなるため、余分な芽を摘み取らなければならないことを知った。友人に相談しながら世話を続けた結果、今朝ついに最初の実が真っ赤に[ 24 ]のを見つけた。自分の手で育てたトマトがどんな味がするのか、明日の朝食べるのが今から楽しみで[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["したがって", "つまり", "ところが", "なぜなら"],
        answer: 2,
        explanation: "'ところが' (However / Contrary to expectation) contrasts thinking it would be easy with discovering how much care it actually takes."
      },
      {
        blank: "[ 24 ]",
        options: ["なっておく", "なってある", "なるべき", "なっている"],
        answer: 3,
        explanation: "'真っ赤になっているのを見つけた' (found that the first fruit had turned bright red) expresses the resulting state."
      },
      {
        blank: "[ 25 ]",
        options: ["たまらない", "ちがいない", "かぎらない", "いられない"],
        answer: 0,
        explanation: "'楽しみでたまらない' (cannot wait / am overwhelmingly excited) is a fixed N3 expression for intense feeling."
      }
    ]
  },
  {
    id: "cloze-33",
    passage: "私たちは普段、失敗することを恐れて、経験したことのない新しい挑戦を避けて[ 23 ]。確かに、慣れていることだけをやっているほうが安全で、恥ずかしい思いもしなくて済むだろう。[ 24 ]、失敗を恐れて何もしなければ、今の自分から成長することはできない。大切なのは、失敗しないことではなく、失敗したときに「なぜうまくいかなかったのか」を考えて次に生かすことだ。若いときにたくさん失敗した人ほど、将来大きな成功を収めることができる[ 25 ]。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["しまいかけだ", "しまいがちだ", "しまったばかりだ", "しまうはずがない"],
        answer: 1,
        explanation: "'避けてしまいがちだ' (tend to avoid new challenges out of fear of failure) expresses a common human tendency."
      },
      {
        blank: "[ 24 ]",
        options: ["したがって", "なぜなら", "しかし", "すなわち"],
        answer: 2,
        explanation: "'しかし' (However) pivots from conceding that staying in one's comfort zone is safe to arguing that doing nothing prevents growth."
      },
      {
        blank: "[ 25 ]",
        options: ["わけにはいかない", "おそれがある", "ことにしている", "のではないだろうか"],
        answer: 3,
        explanation: "'〜のではないだろうか' persuasively states the author's view at the end of the essay."
      }
    ]
  },
  {
    id: "cloze-34",
    passage: "引っ越しの荷造りをしていると、何年も使っていない服や雑貨が次から次へと出てくる。「いつか使うかもしれない」と思って押し入れの奥に大切に[ 23 ]のだが、結局その「いつか」は一度も来なかった。時代とともに自分の好みも変わり、今の生活スタイル自体が大きく[ 24 ]からだ。[ 25 ]今回の引っ越しを良い機会だと考え、思い切って1年以上一度も使っていないものはリサイクルショップに持っていくか処分して、新しい部屋ではすっきりと気持ちよく暮らすことにした。",
    questions: [
      {
        blank: "[ 23 ]",
        options: ["しまっておいた", "しまおうとした", "しまいおわった", "しまわれかけた"],
        answer: 0,
        explanation: "'しまっておいたのだが' (I had put them away in the back of the closet for future use, thinking I might use them someday) uses '〜ておく' for preparation."
      },
      {
        blank: "[ 24 ]",
        options: ["変わるべきだ", "変わろうとしている", "変わったつもりだ", "変わるはずがない"],
        answer: 1,
        explanation: "'変わろうとしているからだ' (because my lifestyle itself is about to / in the process of changing significantly) uses the volitional + としている form to describe an imminent/ongoing transition."
      },
      {
        blank: "[ 25 ]",
        options: ["ところが", "それに対して", "なぜなら", "そこで"],
        answer: 3,
        explanation: "'そこで' (So / Taking this opportunity) connects the realization to the decision to declutter for the move."
      }
    ]
  }
];
