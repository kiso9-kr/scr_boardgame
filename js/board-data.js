// Board Data - 이태원게임 보드 칸 정의
// Each square: { id, type, text_ko, text_en, effect, flavor_ko, flavor_en }
// Types: start, money, credit, chaos, payday, rent, food, bills, rest, shortcut, checkpoint, moveTo, dice_event

const BOARD_DATA = {
  // =============================================
  // START
  // =============================================
  start: {
    id: 'start',
    type: 'start',
    text_ko: '시작',
    text_en: 'START',
    flavor_ko: '직업 선택\n게임판에서 가장 중요하고 첫 번째로 방문하는 곳으로, 직업 카드를 뽑아 게임에서 플레이할 캐릭터를 선택합니다. 각 직업은 급여, 월세, 그리고 최종 보상 옵션이 다릅니다.\n\nartist는 +50, +1C로 시작하고 music industry는 +150, +2C로 시작합니다.\n참고: 아티스트의 길을 선택하고 음악 스킬을 성공적으로 마스터한 사람만 musical 관련 직업과 혜택을 누릴 수 있습니다.',
    flavor_en: 'Choose Your Job\nThe most important and first stop on the board — draw a job card to choose the character you will play. Each job has different salary, rent, and end-game reward options.\n\nArtist starts with +50 money, +1C. Music Industry starts with +150 money, +2C.\nNote: Only those who chose the Artist path and successfully mastered musical skills can access music-related jobs and benefits.',
    effect: {}
  },

  // =============================================
  // ARTIST PATH: START → Checkpoint(i) (8 squares)
  // =============================================
  artist_1: {
    id: 'artist_1', type: 'money',
    text_ko: '파트타임 잡을 구했다 +10', text_en: 'You take a part-time job +10',
    effect: { money: 10 }
  },
  artist_2: {
    id: 'artist_2', type: 'money',
    text_ko: 'DJ 레슨비 지불 -20', text_en: 'Pay for DJ lesson -20',
    effect: { money: -20 }
  },
  artist_3: {
    id: 'artist_3', type: 'money',
    text_ko: '음악 채널 구독 -10', text_en: 'Subscribe music channel -10',
    effect: { money: -10 }
  },
  artist_4: {
    id: 'artist_4', type: 'credit',
    text_ko: '좋은 멘토를 만났다 +1C', text_en: 'You found good mentor +1C',
    effect: { credit: 1 },
    special: 'fanfare'
  },
  artist_5: {
    id: 'artist_5', type: 'shortcut',
    text_ko: '아티스트를 포기했다 (화살표를 따라가세요)', text_en: 'You gave up being an artist (follow the arrow)',
    effect: { moveTo: 'checkpoint_i' },
    special: 'giveUpArtist'
  },
  artist_6: {
    id: 'artist_6', type: 'credit',
    text_ko: '인스타 팔로워 2배 증가 +1C', text_en: 'You doubled followers on insta +1C',
    effect: { credit: 1 }
  },
  artist_7: {
    id: 'artist_7', type: 'credit',
    text_ko: '음악 스킬 마스터! (직업 선택 칸에서 musical 직업을 선택할 수 있습니다)', text_en: 'Mastered music skill! (You can get musical job at the choose job block)',
    effect: {},
    special: 'masterMusic'
  },
  artist_8: {
    id: 'artist_8', type: 'food',
    text_ko: '케밥 -10', text_en: 'Kebab -10',
    effect: { money: -10 },
    flavor_ko: '먹고 살아야죠! 보드를 돌아다니며 이태원의 맛있는 음식을 즐겨보세요. 하지만 명심하세요.\n맛있는 음식은 공짜가 아닙니다!',
    flavor_en: 'You gotta eat! Enjoy the delicious food of Itaewon as you travel the board. But remember:\nDelicious food is not free!'
  },

  // =============================================
  // MUSIC INDUSTRY PATH: START → Checkpoint(i) (5 squares)
  // =============================================
  industry_1: {
    id: 'industry_1', type: 'money',
    text_ko: '친구가 돈을 빌려줬다 +50', text_en: 'Friends lend some money +50',
    effect: { money: 50 }
  },
  industry_2: {
    id: 'industry_2', type: 'chaos',
    text_ko: '카오스 카드', text_en: 'Chaos Card',
    effect: { chaos: 1 }
  },
  industry_3: {
    id: 'industry_3', type: 'money',
    text_ko: '중고 장비 구입 -50', text_en: 'Bought second hand equipment -50',
    effect: { money: -50 }
  },
  industry_4: {
    id: 'industry_4', type: 'moveTo',
    text_ko: '직장을 그만뒀다 (1칸 전진)', text_en: 'Quit day job (1 step forward)',
    effect: { forward: 1 }
  },
  industry_5: {
    id: 'industry_5', type: 'chaos',
    text_ko: '카오스 카드', text_en: 'Chaos Card',
    effect: { chaos: 1 }
  },

  // =============================================
  // CHECKPOINT (i): Choose Job
  // =============================================
  checkpoint_i: {
    id: 'checkpoint_i', type: 'checkpoint',
    text_ko: 'STOP! 직업을 선택하세요. (음악 직업은 음악 스킬 필요)', text_en: 'STOP! Choose job. (Musical job needs music skill)',
    effect: {},
    special: 'chooseJob'
  },

  // =============================================
  // COMMON PATH: Checkpoint(i) → Checkpoint(ii) (18 squares)
  // =============================================
  common1_1: {
    id: 'common1_1', type: 'rest',
    text_ko: '쉬어가세요. 당신은 해냈어요!', text_en: 'Take a rest. You earned it!',
    effect: { rest: true }
  },
  common1_2: {
    id: 'common1_2', type: 'payday',
    text_ko: '월급날 (A)', text_en: 'Pay Day (A)',
    effect: { payday: 'A' },
    flavor_ko: '이태원에서 돈 없이는 살아남을 수 없죠!\n\'월급날\' 칸에 도착하면 직업 카드에 표시된 A, B, C 등급에 따라 월급을 받으세요.',
    flavor_en: 'You can\'t survive in Itaewon without money!\nWhen you land on a \'Pay Day\' square, receive salary according to grade A, B, or C on your job card.'
  },
  common1_3: {
    id: 'common1_3', type: 'chaos',
    text_ko: '카오스 카드', text_en: 'Chaos Card',
    effect: { chaos: 1, excludeActions: ['gotCanceled'] }
  },
  common1_4: {
    id: 'common1_4', type: 'shortcut',
    text_ko: '이태원 사우나 계단 지름길 (화살표를 따라가세요)', text_en: 'Itaewon sauna steps short cut (follow the arrow)',
    effect: { moveTo: 'common1_9' }
  },
  common1_5: {
    id: 'common1_5', type: 'money',
    text_ko: '스타트업 센터 지원금 +100', text_en: 'Start up centre grant +100',
    effect: { money: 100 }
  },
  common1_6: {
    id: 'common1_6', type: 'food',
    text_ko: '야고 만두 -20', text_en: 'Yago mandoo -20',
    effect: { money: -20 },
    flavor_ko: '먹고 살아야죠! 보드를 돌아다니며 이태원의 맛있는 음식을 즐겨보세요. 하지만 명심하세요.\n맛있는 음식은 공짜가 아닙니다!',
    flavor_en: 'You gotta eat! Enjoy the delicious food of Itaewon as you travel the board. But remember:\nDelicious food is not free!'
  },
  common1_7: {
    id: 'common1_7', type: 'credit',
    text_ko: '새로운 공간을 찾았다 +1C', text_en: 'Found your new space +1C',
    effect: { credit: 1 }
  },
  common1_8: {
    id: 'common1_8', type: 'money',
    text_ko: '게스트 리스트에 없다 -20 -1C', text_en: 'Not on the guest list -20 -1C',
    effect: { money: -20, credit: -1 }
  },
  common1_9: {
    id: 'common1_9', type: 'rest',
    text_ko: '계단에서 넘어졌다 -30 (쉬어가세요)', text_en: 'You fell down the steps -30 (take a rest)',
    effect: { money: -30, rest: true }
  },
  common1_10: {
    id: 'common1_10', type: 'credit',
    text_ko: '이태원 글로벌 페스티벌 +1C', text_en: 'Itaewon global festival +1C',
    effect: { credit: 1 }
  },
  common1_11: {
    id: 'common1_11', type: 'payday',
    text_ko: '월급날 (A)', text_en: 'Pay Day (A)',
    effect: { payday: 'A' },
    flavor_ko: '이태원에서 돈 없이는 살아남을 수 없죠!\n\'월급날\' 칸에 도착하면 직업 카드에 표시된 A, B, C 등급에 따라 월급을 받으세요.',
    flavor_en: 'You can\'t survive in Itaewon without money!\nWhen you land on a \'Pay Day\' square, receive salary according to grade A, B, or C on your job card.'
  },
  common1_12: {
    id: 'common1_12', type: 'shortcut',
    text_ko: '런칭 파티 +30 +1C (화살표를 따라가세요)', text_en: 'Launching party +30 +1C (follow the arrow)',
    effect: { money: 30, credit: 1, moveTo: 'common1_17' }
  },
  common1_13: {
    id: 'common1_13', type: 'chaos',
    text_ko: '카오스 카드 x2', text_en: 'Chaos Card x2',
    effect: { chaos: 2 }
  },
  common1_14: {
    id: 'common1_14', type: 'credit',
    text_ko: '잡지 인터뷰 +3C', text_en: 'Interview in the magazine +3C',
    effect: { credit: 3 }
  },
  common1_15: {
    id: 'common1_15', type: 'rent',
    text_ko: '월세 (A)', text_en: 'Rent (A)',
    effect: { rent: 'A' },
    flavor_ko: '자신의 땅을 소유하고 있지 않다면 월세를 내야 합니다. 솔직히 말해서 음악계에 종사하는 사람이라면 땅을 소유하고 있을 가능성은 거의 없죠!\n\'월세\'칸에 도착하면 직업 카드에 표시된 A, B, C 등급에 따라 월세를 내세요.',
    flavor_en: 'If you don\'t own your own land, you have to pay rent. Let\'s be honest — if you\'re in the music industry, you probably don\'t own land!\nWhen you land on a \'Rent\' square, pay rent according to grade A, B, or C on your job card.'
  },
  common1_16: {
    id: 'common1_16', type: 'credit',
    text_ko: '소셜 미디어 드라마 -2C', text_en: 'Social media drama -2C',
    effect: { credit: -2 }
  },
  common1_17: {
    id: 'common1_17', type: 'rest',
    text_ko: '소음 민원 (쉬어가세요)', text_en: 'Noise complains (take a rest)',
    effect: { rest: true }
  },
  common1_18: {
    id: 'common1_18', type: 'money',
    text_ko: '로컬 크루 콜라보 +20 +1C', text_en: 'Local crew collab +20 +1C',
    effect: { money: 20, credit: 1 }
  },

  // =============================================
  // CHECKPOINT (ii): Path split again
  // =============================================
  checkpoint_ii: {
    id: 'checkpoint_ii', type: 'checkpoint',
    text_ko: '분기점', text_en: 'Path Split',
    effect: {},
    special: 'pathSplit2'
  },

  // =============================================
  // ARTIST PATH 2: Checkpoint(ii) → Checkpoint(a) (10 squares)
  // =============================================
  artist2_1: {
    id: 'artist2_1', type: 'chaos',
    text_ko: '카오스 카드', text_en: 'Chaos Card',
    effect: { chaos: 1 }
  },
  artist2_2: {
    id: 'artist2_2', type: 'payday',
    text_ko: '월급날 (B)', text_en: 'Pay Day (B)',
    effect: { payday: 'B' },
    flavor_ko: '이태원에서 돈 없이는 살아남을 수 없죠!\n\'월급날\' 칸에 도착하면 직업 카드에 표시된 A, B, C 등급에 따라 월급을 받으세요.',
    flavor_en: 'You can\'t survive in Itaewon without money!\nWhen you land on a \'Pay Day\' square, receive salary according to grade A, B, or C on your job card.'
  },
  artist2_3: {
    id: 'artist2_3', type: 'money',
    text_ko: '스튜디오 이사 -50', text_en: 'Move studio -50',
    effect: { money: -50 }
  },
  artist2_4: {
    id: 'artist2_4', type: 'credit',
    text_ko: '팔로워 2만 달성 +1C', text_en: 'Hit 20k followers +1C',
    effect: { credit: 1 }
  },
  artist2_5: {
    id: 'artist2_5', type: 'rest',
    text_ko: '스튜디오 누수 (쉬어가세요)', text_en: 'Studio is leaking (take a rest)',
    effect: { rest: true }
  },
  artist2_6: {
    id: 'artist2_6', type: 'credit',
    text_ko: '스티커 범빙 +1C', text_en: 'Sticker bombing +1C',
    effect: { credit: 1 }
  },
  artist2_7: {
    id: 'artist2_7', type: 'dice_event',
    text_ko: '좋아하지만 아무도 모르는 아티스트와 파티를 열다 (주사위: 짝수 +100, 홀수 -100)', text_en: 'You make a party with artist you love but no one knows (dice: even +100, odd -100)',
    effect: { diceEvent: 'evenOdd', evenMoney: 100, oddMoney: -100 }
  },
  artist2_8: {
    id: 'artist2_8', type: 'rent',
    text_ko: '월세 (B)', text_en: 'Rent (B)',
    effect: { rent: 'B' },
    flavor_ko: '자신의 땅을 소유하고 있지 않다면 월세를 내야 합니다. 솔직히 말해서 음악계에 종사하는 사람이라면 땅을 소유하고 있을 가능성은 거의 없죠!\n\'월세\'칸에 도착하면 직업 카드에 표시된 A, B, C 등급에 따라 월세를 내세요.',
    flavor_en: 'If you don\'t own your own land, you have to pay rent. Let\'s be honest — if you\'re in the music industry, you probably don\'t own land!\nWhen you land on a \'Rent\' square, pay rent according to grade A, B, or C on your job card.'
  },
  artist2_9: {
    id: 'artist2_9', type: 'chaos',
    text_ko: '카오스 카드 x2', text_en: 'Chaos Card x2',
    effect: { chaos: 2 }
  },
  artist2_10: {
    id: 'artist2_10', type: 'money',
    text_ko: '올림픽에서 공연했다 +70 +2C', text_en: 'You did a gig at the Olympics +70 +2C',
    effect: { money: 70, credit: 2 }
  },

  // =============================================
  // CHECKPOINT (a): Credit fork for artist
  // =============================================
  checkpoint_a: {
    id: 'checkpoint_a', type: 'checkpoint',
    text_ko: '10C 이상 / 10C 미만', text_en: 'Over 10C / Under 10C',
    effect: {},
    special: 'creditFork',
    flavor_ko: '이 칸에서는 크레딧이 충분하면 더 쉬운 지름길을 이용해 복잡한 구간을 건너뛸 수 있습니다.\n돈을 사용하여 크레딧을 얻을 수 있습니다. 100원 = 1C입니다.',
    flavor_en: 'If you have enough credits, you can take an easier shortcut to skip the complex section.\nYou can use money to get credits. 100 money = 1C.'
  },

  // =============================================
  // ARTIST OVER 10C PATH: Checkpoint(a) → Checkpoint(iii) (4 squares)
  // =============================================
  artist_over_1: {
    id: 'artist_over_1', type: 'payday',
    text_ko: '월급날 (B)', text_en: 'Pay Day (B)',
    effect: { payday: 'B' },
    flavor_ko: '이태원에서 돈 없이는 살아남을 수 없죠!\n\'월급날\' 칸에 도착하면 직업 카드에 표시된 A, B, C 등급에 따라 월급을 받으세요.',
    flavor_en: 'You can\'t survive in Itaewon without money!\nWhen you land on a \'Pay Day\' square, receive salary according to grade A, B, or C on your job card.'
  },
  artist_over_2: {
    id: 'artist_over_2', type: 'credit',
    text_ko: '국제 페스티벌 초대 +3C', text_en: 'Invited to play international festival +3C',
    effect: { credit: 3 }
  },
  artist_over_3: {
    id: 'artist_over_3', type: 'chaos',
    text_ko: '카오스 카드', text_en: 'Chaos Card',
    effect: { chaos: 1 }
  },
  artist_over_4: {
    id: 'artist_over_4', type: 'rest',
    text_ko: 'USB를 잃어버렸다 (쉬어가세요)', text_en: 'Lost USB (take a rest)',
    effect: { rest: true }
  },

  // =============================================
  // ARTIST UNDER 10C PATH: Checkpoint(a) → Checkpoint(iii) (9 squares)
  // =============================================
  artist_under_1: {
    id: 'artist_under_1', type: 'chaos',
    text_ko: '카오스 카드', text_en: 'Chaos Card',
    effect: { chaos: 1 }
  },
  artist_under_2: {
    id: 'artist_under_2', type: 'money',
    text_ko: '랜덤 생일 공연 +20', text_en: 'Random birthday gig +20',
    effect: { money: 20 }
  },
  artist_under_3: {
    id: 'artist_under_3', type: 'money',
    text_ko: '강남 치즈 공연 +50 -2C', text_en: 'Gangnam cheesy gig +50 -2C',
    effect: { money: 50, credit: -2 }
  },
  artist_under_4: {
    id: 'artist_under_4', type: 'payday',
    text_ko: '월급날 (B)', text_en: 'Pay Day (B)',
    effect: { payday: 'B' },
    flavor_ko: '이태원에서 돈 없이는 살아남을 수 없죠!\n\'월급날\' 칸에 도착하면 직업 카드에 표시된 A, B, C 등급에 따라 월급을 받으세요.',
    flavor_en: 'You can\'t survive in Itaewon without money!\nWhen you land on a \'Pay Day\' square, receive salary according to grade A, B, or C on your job card.'
  },
  artist_under_5: {
    id: 'artist_under_5', type: 'credit',
    text_ko: '행사에서 너무 취했다 -3C', text_en: 'Too drunk at the event -3C',
    effect: { credit: -3 }
  },
  artist_under_6: {
    id: 'artist_under_6', type: 'chaos',
    text_ko: '카오스 카드', text_en: 'Chaos Card',
    effect: { chaos: 1 }
  },
  artist_under_7: {
    id: 'artist_under_7', type: 'money',
    text_ko: '자기 행사에서 다쳤다 -50', text_en: 'You got injured at your own event -50',
    effect: { money: -50 }
  },
  artist_under_8: {
    id: 'artist_under_8', type: 'rent',
    text_ko: '월세 (B)', text_en: 'Rent (B)',
    effect: { rent: 'B' },
    flavor_ko: '자신의 땅을 소유하고 있지 않다면 월세를 내야 합니다. 솔직히 말해서 음악계에 종사하는 사람이라면 땅을 소유하고 있을 가능성은 거의 없죠!\n\'월세\'칸에 도착하면 직업 카드에 표시된 A, B, C 등급에 따라 월세를 내세요.',
    flavor_en: 'If you don\'t own your own land, you have to pay rent. Let\'s be honest — if you\'re in the music industry, you probably don\'t own land!\nWhen you land on a \'Rent\' square, pay rent according to grade A, B, or C on your job card.'
  },
  artist_under_9: {
    id: 'artist_under_9', type: 'money',
    text_ko: '소음 민원으로 파티 중단 -50', text_en: 'Noise complain party shut down -50',
    effect: { money: -50 }
  },

  // =============================================
  // MUSIC INDUSTRY PATH 2: Checkpoint(ii) → Checkpoint(b) (6 squares)
  // =============================================
  industry2_1: {
    id: 'industry2_1', type: 'food',
    text_ko: '한돈이 회식 -50', text_en: 'Handoni hoisik -50',
    effect: { money: -50 },
    flavor_ko: '먹고 살아야죠! 보드를 돌아다니며 이태원의 맛있는 음식을 즐겨보세요. 하지만 명심하세요.\n맛있는 음식은 공짜가 아닙니다!',
    flavor_en: 'You gotta eat! Enjoy the delicious food of Itaewon as you travel the board. But remember:\nDelicious food is not free!'
  },
  industry2_2: {
    id: 'industry2_2', type: 'chaos',
    text_ko: '카오스 카드', text_en: 'Chaos Card',
    effect: { chaos: 1 }
  },
  industry2_3: {
    id: 'industry2_3', type: 'money',
    text_ko: '오른쪽 사람에게 30 주기', text_en: 'Give 30 to person on your right side',
    effect: { giveRight: 30 }
  },
  industry2_4: {
    id: 'industry2_4', type: 'rent',
    text_ko: '월세 (B)', text_en: 'Rent (B)',
    effect: { rent: 'B' },
    flavor_ko: '자신의 땅을 소유하고 있지 않다면 월세를 내야 합니다. 솔직히 말해서 음악계에 종사하는 사람이라면 땅을 소유하고 있을 가능성은 거의 없죠!\n\'월세\'칸에 도착하면 직업 카드에 표시된 A, B, C 등급에 따라 월세를 내세요.',
    flavor_en: 'If you don\'t own your own land, you have to pay rent. Let\'s be honest — if you\'re in the music industry, you probably don\'t own land!\nWhen you land on a \'Rent\' square, pay rent according to grade A, B, or C on your job card.'
  },
  industry2_5: {
    id: 'industry2_5', type: 'money',
    text_ko: '페스티벌 서브 스테이지 +50 +1C', text_en: 'Festival sub stage +50 +1C',
    effect: { money: 50, credit: 1 }
  },
  industry2_6: {
    id: 'industry2_6', type: 'payday',
    text_ko: '월급날 (B)', text_en: 'Pay Day (B)',
    effect: { payday: 'B' },
    flavor_ko: '이태원에서 돈 없이는 살아남을 수 없죠!\n\'월급날\' 칸에 도착하면 직업 카드에 표시된 A, B, C 등급에 따라 월급을 받으세요.',
    flavor_en: 'You can\'t survive in Itaewon without money!\nWhen you land on a \'Pay Day\' square, receive salary according to grade A, B, or C on your job card.'
  },

  // =============================================
  // CHECKPOINT (b): Weather dice
  // =============================================
  checkpoint_b: {
    id: 'checkpoint_b', type: 'checkpoint',
    text_ko: 'STOP! 야외 행사가 있습니다. 주사위를 던져 날씨를 선택하세요.', text_en: 'STOP! You have outdoor events. Roll the dice and choose the weather.',
    effect: {},
    special: 'weatherDice'
  },

  // =============================================
  // GOOD WEATHER PATH: Checkpoint(b) → Checkpoint(iii) (5 squares)
  // =============================================
  good_weather_1: {
    id: 'good_weather_1', type: 'chaos',
    text_ko: '카오스 카드', text_en: 'Chaos Card',
    effect: { chaos: 1 }
  },
  good_weather_2: {
    id: 'good_weather_2', type: 'money',
    text_ko: '인스타에서 바이럴 +50 +1C', text_en: 'Your place goes viral on insta +50 +1C',
    effect: { money: 50, credit: 1 }
  },
  good_weather_3: {
    id: 'good_weather_3', type: 'money',
    text_ko: '티켓 매진 +100', text_en: 'Tickets sold out +100',
    effect: { money: 100 }
  },
  good_weather_4: {
    id: 'good_weather_4', type: 'chaos',
    text_ko: '카오스 카드 x2', text_en: 'Chaos Card x2',
    effect: { chaos: 2 }
  },
  good_weather_5: {
    id: 'good_weather_5', type: 'payday',
    text_ko: '월급날 (B)', text_en: 'Pay Day (B)',
    effect: { payday: 'B' },
    flavor_ko: '이태원에서 돈 없이는 살아남을 수 없죠!\n\'월급날\' 칸에 도착하면 직업 카드에 표시된 A, B, C 등급에 따라 월급을 받으세요.',
    flavor_en: 'You can\'t survive in Itaewon without money!\nWhen you land on a \'Pay Day\' square, receive salary according to grade A, B, or C on your job card.'
  },

  // =============================================
  // BAD WEATHER PATH: Checkpoint(b) → good_weather_4 (10 squares)
  // =============================================
  bad_weather_1: {
    id: 'bad_weather_1', type: 'credit',
    text_ko: '소셜 미디어 드라마 -3C', text_en: 'Social media drama -3C',
    effect: { credit: -3 }
  },
  bad_weather_2: {
    id: 'bad_weather_2', type: 'credit',
    text_ko: '비 때문에 사람들이 더 춤을 췄다 +1C', text_en: 'Rain made people dance more +1C',
    effect: { credit: 1 }
  },
  bad_weather_3: {
    id: 'bad_weather_3', type: 'rest',
    text_ko: '화장실이 고장났다 (쉬어가세요)', text_en: 'Toilet is broken (take a rest)',
    effect: { rest: true }
  },
  bad_weather_4: {
    id: 'bad_weather_4', type: 'chaos',
    text_ko: '카오스 카드', text_en: 'Chaos Card',
    effect: { chaos: 1 }
  },
  bad_weather_5: {
    id: 'bad_weather_5', type: 'bills',
    text_ko: '공과금 -30', text_en: 'Bills -30',
    effect: { money: -30 },
    flavor_ko: '전기세, 관리비, 수도세 등등 - 이태원에서 살아가는 또 다른 슬픈 현실입니다!\n공과금 칸에 도착하면 표시된 금액을 지불하세요.',
    flavor_en: 'Electricity, maintenance, water bills — another sad reality of living in Itaewon!\nWhen you land on a Bills square, pay the displayed amount.'
  },
  bad_weather_6: {
    id: 'bad_weather_6', type: 'rest',
    text_ko: '감전됐다 (쉬어가세요)', text_en: 'You got electric shock (take a rest)',
    effect: { rest: true }
  },
  bad_weather_7: {
    id: 'bad_weather_7', type: 'money',
    text_ko: '장비 수리비 -50', text_en: 'Equipment repairing fee -50',
    effect: { money: -50 }
  },
  bad_weather_8: {
    id: 'bad_weather_8', type: 'rent',
    text_ko: '월세 (B)', text_en: 'Rent (B)',
    effect: { rent: 'B' },
    flavor_ko: '자신의 땅을 소유하고 있지 않다면 월세를 내야 합니다. 솔직히 말해서 음악계에 종사하는 사람이라면 땅을 소유하고 있을 가능성은 거의 없죠!\n\'월세\'칸에 도착하면 직업 카드에 표시된 A, B, C 등급에 따라 월세를 내세요.',
    flavor_en: 'If you don\'t own your own land, you have to pay rent. Let\'s be honest — if you\'re in the music industry, you probably don\'t own land!\nWhen you land on a \'Rent\' square, pay rent according to grade A, B, or C on your job card.'
  },
  bad_weather_9: {
    id: 'bad_weather_9', type: 'money',
    text_ko: '헤드라이너가 안 왔다 -100 -3C', text_en: 'Headliner didn\'t show up -100 -3C',
    effect: { money: -100, credit: -3 }
  },
  bad_weather_10: {
    id: 'bad_weather_10', type: 'food',
    text_ko: '케밥 -30', text_en: 'Kebab -30',
    effect: { money: -30 },
    flavor_ko: '먹고 살아야죠! 보드를 돌아다니며 이태원의 맛있는 음식을 즐겨보세요. 하지만 명심하세요.\n맛있는 음식은 공짜가 아닙니다!',
    flavor_en: 'You gotta eat! Enjoy the delicious food of Itaewon as you travel the board. But remember:\nDelicious food is not free!'
  },

  // =============================================
  // CHECKPOINT (iii): COVID
  // =============================================
  checkpoint_iii: {
    id: 'checkpoint_iii', type: 'checkpoint',
    text_ko: 'STOP! 코로나 9시 통금. 짝수: +100, 홀수: -100', text_en: 'STOP! COVID 9pm curfew. Even: +100, Odd: -100',
    effect: { diceEvent: 'evenOdd', evenMoney: 100, oddMoney: -100 },
    special: 'covid',
    flavor_ko: '2019년부터 2022년까지는 코로나19 팬데믹 기간으로 이태원의 밤 문화에 큰 영향을 미쳤습니다. 어떤 사람들은 혜택을 보았고, 어떤 사람들은 큰 손실을 입었습니다. 지시를 잘 따르고 운에 맡겨보세요!',
    flavor_en: 'From 2019 to 2022, the COVID-19 pandemic greatly affected Itaewon\'s nightlife. Some benefited, others suffered great losses. Follow the instructions and leave it to luck!'
  },

  // =============================================
  // COVID COMMON PATH: Checkpoint(iii) → Checkpoint(iv) (7 squares)
  // =============================================
  covid_1: {
    id: 'covid_1', type: 'rest',
    text_ko: '경찰에 잡혔다 (쉬어가세요)', text_en: 'Caught by police (take a rest)',
    effect: { rest: true }
  },
  covid_2: {
    id: 'covid_2', type: 'money',
    text_ko: '공연이 없다 -50', text_en: 'No gigs -50',
    effect: { money: -50 }
  },
  covid_3: {
    id: 'covid_3', type: 'chaos',
    text_ko: '카오스 카드 x2', text_en: 'Chaos Card x2',
    effect: { chaos: 2 }
  },
  covid_4: {
    id: 'covid_4', type: 'rent',
    text_ko: '월세 (B)', text_en: 'Rent (B)',
    effect: { rent: 'B' },
    flavor_ko: '자신의 땅을 소유하고 있지 않다면 월세를 내야 합니다.',
    flavor_en: 'If you don\'t own your own land, you have to pay rent.'
  },
  covid_5: {
    id: 'covid_5', type: 'money',
    text_ko: 'DJ 레슨 수입 증가 +50', text_en: 'Increased DJ lessons +50',
    effect: { money: 50 }
  },
  covid_6: {
    id: 'covid_6', type: 'credit',
    text_ko: '어려운 지역 사업체 팝업 도움 +2C', text_en: 'Help struggling local business with pop-up +2C',
    effect: { credit: 2 }
  },
  covid_7: {
    id: 'covid_7', type: 'bills',
    text_ko: '공과금 -30', text_en: 'Bills -30',
    effect: { money: -30 },
    flavor_ko: '전기세, 관리비, 수도세 등등 - 이태원에서 살아가는 또 다른 슬픈 현실입니다!\n공과금 칸에 도착하면 표시된 금액을 지불하세요.',
    flavor_en: 'Electricity, maintenance, water bills — another sad reality of living in Itaewon!\nWhen you land on a Bills square, pay the displayed amount.'
  },

  // =============================================
  // CHECKPOINT (iv): End of COVID
  // =============================================
  checkpoint_iv: {
    id: 'checkpoint_iv', type: 'checkpoint',
    text_ko: 'STOP! 코로나 종료. 모두가 승리! 짝수: +100, 홀수: +50', text_en: 'STOP! End of COVID. Everybody wins! Even: +100, Odd: +50',
    effect: { diceEvent: 'covidEnd', evenMoney: 100, oddMoney: 50 },
    special: 'covidEnd'
  },

  // =============================================
  // FINAL PATH: Checkpoint(iv) → GOAL (35 squares)
  // =============================================
  final_1: {
    id: 'final_1', type: 'payday',
    text_ko: '월급날 (C)', text_en: 'Pay Day (C)',
    effect: { payday: 'C' },
    flavor_ko: '이태원에서 돈 없이는 살아남을 수 없죠!',
    flavor_en: 'You can\'t survive in Itaewon without money!'
  },
  final_2: {
    id: 'final_2', type: 'chaos',
    text_ko: '카오스 카드', text_en: 'Chaos Card',
    effect: { chaos: 1 }
  },
  final_3: {
    id: 'final_3', type: 'money',
    text_ko: '이태원이 다시 바빠졌다 +50', text_en: 'Itaewon is busy again +50',
    effect: { money: 50 }
  },
  final_4: {
    id: 'final_4', type: 'rent',
    text_ko: '월세 (C)', text_en: 'Rent (C)',
    effect: { rent: 'C' },
    flavor_ko: '월세를 내야 합니다!',
    flavor_en: 'Pay your rent!'
  },
  final_5: {
    id: 'final_5', type: 'bills',
    text_ko: '공과금 -50', text_en: 'Bills -50',
    effect: { money: -50 },
    flavor_ko: '전기세, 관리비, 수도세 등등!',
    flavor_en: 'Electricity, maintenance, water bills!'
  },
  final_6: {
    id: 'final_6', type: 'chaos',
    text_ko: '카오스 카드', text_en: 'Chaos Card',
    effect: { chaos: 1 }
  },
  final_7: {
    id: 'final_7', type: 'money',
    text_ko: '국제 플랫폼과 파티 +50 +1C', text_en: 'Host party with international platform +50 +1C',
    effect: { money: 50, credit: 1 }
  },
  final_8: {
    id: 'final_8', type: 'payday',
    text_ko: '월급날 (C)', text_en: 'Pay Day (C)',
    effect: { payday: 'C' }
  },
  final_9: {
    id: 'final_9', type: 'food',
    text_ko: '감자탕과 소주 -50', text_en: 'Gamjatang and soju -50',
    effect: { money: -50 },
    flavor_ko: '먹고 살아야죠!',
    flavor_en: 'You gotta eat!'
  },
  final_10: {
    id: 'final_10', type: 'chaos',
    text_ko: '카오스 카드', text_en: 'Chaos Card',
    effect: { chaos: 1 }
  },
  final_11: {
    id: 'final_11', type: 'rest',
    text_ko: 'DJ가 덱에 음료를 쏟았다 -50 (쉬어가세요)', text_en: 'DJ spill drink on the deck -50 (take a rest)',
    effect: { money: -50, rest: true }
  },
  final_12: {
    id: 'final_12', type: 'rent',
    text_ko: '월세 (C)', text_en: 'Rent (C)',
    effect: { rent: 'C' }
  },
  final_13: {
    id: 'final_13', type: 'bills',
    text_ko: '공과금 -50', text_en: 'Bills -50',
    effect: { money: -50 }
  },
  final_14: {
    id: 'final_14', type: 'rest',
    text_ko: '박스에 뛰어들어 다쳤다 (쉬어가세요)', text_en: 'You jumped into the boxes and got injured (take a rest)',
    effect: { rest: true }
  },
  final_15: {
    id: 'final_15', type: 'money',
    text_ko: 'EP 발매 -70 +1C', text_en: 'Launched EP -70 +1C',
    effect: { money: -70, credit: 1 }
  },
  final_16: {
    id: 'final_16', type: 'chaos',
    text_ko: '카오스 카드 x2', text_en: 'Chaos Card x2',
    effect: { chaos: 2 }
  },
  final_17: {
    id: 'final_17', type: 'credit',
    text_ko: '국제 페스티벌에서 K-Bass 쇼케이스 +1C', text_en: 'Showcase K-Bass at the international festival +1C',
    effect: { credit: 1 }
  },
  final_18: {
    id: 'final_18', type: 'money',
    text_ko: '새 iMac 구매 -100', text_en: 'Bought new iMac -100',
    effect: { money: -100 }
  },
  final_19: {
    id: 'final_19', type: 'payday',
    text_ko: '월급날 (C)', text_en: 'Pay Day (C)',
    effect: { payday: 'C' }
  },
  final_20: {
    id: 'final_20', type: 'shortcut',
    text_ko: '국제 음악 컨퍼런스 초대 +2C (화살표를 따라가세요)', text_en: 'Invited international music conference +2C (follow the arrows)',
    effect: { credit: 2, moveTo: 'final_25' }
  },
  final_21: {
    id: 'final_21', type: 'chaos',
    text_ko: '카오스 카드', text_en: 'Chaos Card',
    effect: { chaos: 1 }
  },
  final_22: {
    id: 'final_22', type: 'bills',
    text_ko: '공과금 -50', text_en: 'Bills -50',
    effect: { money: -50 }
  },
  final_23: {
    id: 'final_23', type: 'credit',
    text_ko: '음악상 수상 +3C', text_en: 'Win music award +3C',
    effect: { credit: 3 }
  },
  final_24: {
    id: 'final_24', type: 'rent',
    text_ko: '월세 (C)', text_en: 'Rent (C)',
    effect: { rent: 'C' }
  },
  final_25: {
    id: 'final_25', type: 'money',
    text_ko: '모두에게 테킬라를 샀다 -100', text_en: 'You bought tequila for everybody -100',
    effect: { money: -100 }
  },
  final_26: {
    id: 'final_26', type: 'money',
    text_ko: '왼쪽 사람에게 50 주기', text_en: 'Give 50 to person on your left side',
    effect: { giveLeft: 50 }
  },
  final_27: {
    id: 'final_27', type: 'food',
    text_ko: '닭꼬치 -20', text_en: 'Dak-kkochi -20',
    effect: { money: -20 },
    flavor_ko: '먹고 살아야죠!',
    flavor_en: 'You gotta eat!'
  },
  final_28: {
    id: 'final_28', type: 'chaos',
    text_ko: '카오스 카드 x2', text_en: 'Chaos Card x2',
    effect: { chaos: 2 }
  },
  final_29: {
    id: 'final_29', type: 'money',
    text_ko: '소음 민원으로 파티 중단 -50 -1C', text_en: 'Noise complain party shut down -50 -1C',
    effect: { money: -50, credit: -1 }
  },
  final_30: {
    id: 'final_30', type: 'payday',
    text_ko: '월급날 (C)', text_en: 'Pay Day (C)',
    effect: { payday: 'C' }
  },
  final_31: {
    id: 'final_31', type: 'food',
    text_ko: '7AM 버거 -20', text_en: '7am burger -20',
    effect: { money: -20 }
  },
  final_32: {
    id: 'final_32', type: 'money',
    text_ko: '그래미 수상자와 콜라보 +100 +1C', text_en: 'Collab with Grammy winner +100 +1C',
    effect: { money: 100, credit: 1 }
  },
  final_33: {
    id: 'final_33', type: 'chaos',
    text_ko: '카오스 카드', text_en: 'Chaos Card',
    effect: { chaos: 1 }
  },
  final_34: {
    id: 'final_34', type: 'food',
    text_ko: '케밥 -20', text_en: 'Kebab -20',
    effect: { money: -20 }
  },
  final_35: {
    id: 'final_35', type: 'rent',
    text_ko: '월세 (C)', text_en: 'Rent (C)',
    effect: { rent: 'C' }
  },

  // =============================================
  // GOAL
  // =============================================
  goal: {
    id: 'goal', type: 'goal',
    text_ko: 'GOAL!', text_en: 'GOAL!',
    effect: {},
    special: 'goal'
  }
};

// Path definitions - ordered arrays of square IDs for each route segment
const PATHS = {
  artist_start: ['artist_1', 'artist_2', 'artist_3', 'artist_4', 'artist_5', 'artist_6', 'artist_7', 'artist_8'],
  industry_start: ['industry_1', 'industry_2', 'industry_3', 'industry_4', 'industry_5'],
  common1: ['common1_1', 'common1_2', 'common1_3', 'common1_4', 'common1_5', 'common1_6', 'common1_7', 'common1_8', 'common1_9', 'common1_10', 'common1_11', 'common1_12', 'common1_13', 'common1_14', 'common1_15', 'common1_16', 'common1_17', 'common1_18'],
  artist2: ['artist2_1', 'artist2_2', 'artist2_3', 'artist2_4', 'artist2_5', 'artist2_6', 'artist2_7', 'artist2_8', 'artist2_9', 'artist2_10'],
  artist_over: ['artist_over_1', 'artist_over_2', 'artist_over_3', 'artist_over_4'],
  artist_under: ['artist_under_1', 'artist_under_2', 'artist_under_3', 'artist_under_4', 'artist_under_5', 'artist_under_6', 'artist_under_7', 'artist_under_8', 'artist_under_9'],
  industry2: ['industry2_1', 'industry2_2', 'industry2_3', 'industry2_4', 'industry2_5', 'industry2_6'],
  good_weather: ['good_weather_1', 'good_weather_2', 'good_weather_3', 'good_weather_4', 'good_weather_5'],
  bad_weather: ['bad_weather_1', 'bad_weather_2', 'bad_weather_3', 'bad_weather_4', 'bad_weather_5', 'bad_weather_6', 'bad_weather_7', 'bad_weather_8', 'bad_weather_9', 'bad_weather_10'],
  covid: ['covid_1', 'covid_2', 'covid_3', 'covid_4', 'covid_5', 'covid_6', 'covid_7'],
  final: ['final_1', 'final_2', 'final_3', 'final_4', 'final_5', 'final_6', 'final_7', 'final_8', 'final_9', 'final_10', 'final_11', 'final_12', 'final_13', 'final_14', 'final_15', 'final_16', 'final_17', 'final_18', 'final_19', 'final_20', 'final_21', 'final_22', 'final_23', 'final_24', 'final_25', 'final_26', 'final_27', 'final_28', 'final_29', 'final_30', 'final_31', 'final_32', 'final_33', 'final_34', 'final_35']
};

// Build complete path for a player based on their choices
function buildPlayerPath(pathChoice, pathChoice2, creditForkChoice, weatherChoice) {
  let path = ['start'];

  // Phase 1: Start to Checkpoint(i)
  if (pathChoice === 'artist') {
    path = path.concat(PATHS.artist_start);
  } else {
    path = path.concat(PATHS.industry_start);
  }

  path.push('checkpoint_i');

  // Phase 2: Common path to Checkpoint(ii)
  path = path.concat(PATHS.common1);
  path.push('checkpoint_ii');

  // Phase 3: Checkpoint(ii) to Checkpoint(iii)
  if (pathChoice2 === 'artist') {
    path = path.concat(PATHS.artist2);
    path.push('checkpoint_a');

    if (creditForkChoice === 'over') {
      path = path.concat(PATHS.artist_over);
    } else {
      path = path.concat(PATHS.artist_under);
    }
  } else {
    path = path.concat(PATHS.industry2);
    path.push('checkpoint_b');

    if (weatherChoice === 'good') {
      path = path.concat(PATHS.good_weather);
    } else {
      // Bad weather connects to good_weather_4 after 10 squares
      path = path.concat(PATHS.bad_weather);
      path.push('good_weather_4');
      path.push('good_weather_5');
    }
  }

  path.push('checkpoint_iii');

  // Phase 4: COVID path
  path = path.concat(PATHS.covid);
  path.push('checkpoint_iv');

  // Phase 5: Final path to goal
  path = path.concat(PATHS.final);
  path.push('goal');

  return path;
}

function getSquare(id) {
  return BOARD_DATA[id];
}
