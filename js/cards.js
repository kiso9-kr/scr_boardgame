// Cards Data - 직업카드 & 카오스카드

// =============================================
// JOB CARDS (직업카드) - 10장
// =============================================
// Grade determined by dice: 1-2 = A, 3-4 = B, 5-6 = C
// For "roll the dice to find salary" jobs, grade is determined when landing on payday
// For other jobs, grade is fixed at draw time

const JOB_CARDS = [
  {
    id: 'mc',
    name: 'MC',
    name_ko: 'MC',
    isArtist: true,
    requiresMusicSkill: true,
    diceForSalary: true,
    respectBonus: 0,
    grades: {
      A: { salary: 10, rent: 0 },
      B: { salary: 20, rent: 0 },
      C: { salary: 30, rent: 20 }
    },
    description_en: 'Roll the dice to find salary.',
    description_ko: '주사위를 굴려 급여를 결정하세요.'
  },
  {
    id: 'dj_respect',
    name: 'DJ',
    name_ko: 'DJ',
    isArtist: true,
    diceForSalary: false,
    respectBonus: 1,
    grades: {
      A: { salary: 10, rent: 0 },
      B: { salary: 20, rent: 0 },
      C: { salary: 30, rent: 20 }
    },
    description_en: 'You can get respected +1C at the end.',
    description_ko: '게임 종료 시 존경 +1C를 받을 수 있습니다.'
  },
  {
    id: 'dj_dice',
    name: 'DJ',
    name_ko: 'DJ',
    isArtist: true,
    diceForSalary: true,
    respectBonus: 0,
    grades: {
      A: { salary: 10, rent: 0 },
      B: { salary: 20, rent: 0 },
      C: { salary: 30, rent: 20 }
    },
    description_en: 'Roll the dice to find salary.',
    description_ko: '주사위를 굴려 급여를 결정하세요.'
  },
  {
    id: 'live_musician',
    name: 'LIVE MUSICIAN',
    name_ko: '라이브 뮤지션',
    isArtist: true,
    requiresMusicSkill: true,
    diceForSalary: true,
    respectBonus: 0,
    grades: {
      A: { salary: 10, rent: 50 },
      B: { salary: 20, rent: 50 },
      C: { salary: 30, rent: 50 }
    },
    description_en: 'Roll the dice to find salary.',
    description_ko: '주사위를 굴려 급여를 결정하세요.'
  },
  {
    id: 'radio_boss',
    name: 'RADIO BOSS',
    name_ko: '라디오 보스',
    isArtist: false,
    diceForSalary: false,
    respectBonus: 5,
    grades: {
      A: { salary: 40, rent: 50 },
      B: { salary: 50, rent: 50 },
      C: { salary: 70, rent: 70 }
    },
    description_en: 'You can get respected +5C at the end.',
    description_ko: '게임 종료 시 존경 +5C를 받을 수 있습니다.'
  },
  {
    id: 'label_owner',
    name: 'LABEL OWNER',
    name_ko: '레이블 오너',
    isArtist: false,
    diceForSalary: false,
    respectBonus: 3,
    grades: {
      A: { salary: 30, rent: 50 },
      B: { salary: 50, rent: 50 },
      C: { salary: 250, rent: 150 }
    },
    description_en: 'You can get respected +3C at the end.',
    description_ko: '게임 종료 시 존경 +3C를 받을 수 있습니다.'
  },
  {
    id: 'club_owner',
    name: 'CLUB OWNER',
    name_ko: '클럽 오너',
    isArtist: false,
    diceForSalary: false,
    respectBonus: 4,
    grades: {
      A: { salary: 100, rent: 100 },
      B: { salary: 200, rent: 150 },
      C: { salary: 300, rent: 200 }
    },
    description_en: 'You can get respected +4C at the end.',
    description_ko: '게임 종료 시 존경 +4C를 받을 수 있습니다.'
  },
  {
    id: 'party_promoter',
    name: 'PARTY PROMOTER',
    name_ko: '파티 프로모터',
    isArtist: false,
    diceForSalary: false,
    respectBonus: 0,
    grades: {
      A: { salary: 10, rent: 30 },
      B: { salary: 50, rent: 50 },
      C: { salary: 250, rent: 100 }
    },
    description_en: '',
    description_ko: ''
  },
  {
    id: 'music_producer',
    name: 'MUSIC PRODUCER',
    name_ko: '음악 프로듀서',
    isArtist: true,
    diceForSalary: false,
    respectBonus: 0,
    grades: {
      A: { salary: 10, rent: 30 },
      B: { salary: 50, rent: 50 },
      C: { salary: 250, rent: 100 }
    },
    description_en: '',
    description_ko: ''
  },
  {
    id: 'record_shop_owner',
    name: 'RECORD SHOP OWNER',
    name_ko: '레코드샵 오너',
    isArtist: false,
    diceForSalary: false,
    respectBonus: 2,
    grades: {
      A: { salary: 30, rent: 50 },
      B: { salary: 70, rent: 60 },
      C: { salary: 120, rent: 70 }
    },
    description_en: 'You can get respected +2C at the end.',
    description_ko: '게임 종료 시 존경 +2C를 받을 수 있습니다.'
  }
];

// =============================================
// CHAOS CARDS (카오스카드) - 25장
// =============================================
// type: 'immediate' (즉시 사용) | 'keepable' (보관 가능)

const CHAOS_CARDS = [
  // COMMUNITY COLLAB x3
  {
    id: 'community_collab_1',
    name: 'COMMUNITY COLLAB',
    name_ko: '커뮤니티 콜라보',
    type: 'immediate',
    description_en: 'Choose 1 player to collab with, roll the dice to earn money together. Both earn dice number x10.',
    description_ko: '1명의 플레이어를 선택하여 콜라보하세요. 주사위를 굴려 함께 돈을 벌어요. 둘 다 주사위 숫자 x10을 받습니다.',
    action: 'communityCollab'
  },
  {
    id: 'community_collab_2',
    name: 'COMMUNITY COLLAB',
    name_ko: '커뮤니티 콜라보',
    type: 'immediate',
    description_en: 'Choose 1 player to collab with, roll the dice to earn money together. Both earn dice number x10.',
    description_ko: '1명의 플레이어를 선택하여 콜라보하세요. 주사위를 굴려 함께 돈을 벌어요. 둘 다 주사위 숫자 x10을 받습니다.',
    action: 'communityCollab'
  },
  {
    id: 'community_collab_3',
    name: 'COMMUNITY COLLAB',
    name_ko: '커뮤니티 콜라보',
    type: 'immediate',
    description_en: 'Choose 1 player to collab with, roll the dice to earn money together. Both earn dice number x10.',
    description_ko: '1명의 플레이어를 선택하여 콜라보하세요. 주사위를 굴려 함께 돈을 벌어요. 둘 다 주사위 숫자 x10을 받습니다.',
    action: 'communityCollab'
  },

  // DOUBLE SALARY x2
  {
    id: 'double_salary_1',
    name: 'DOUBLE SALARY',
    name_ko: '더블 월급',
    type: 'keepable',
    description_en: 'You can get double salary on your payday. You can keep it until you use it.',
    description_ko: '월급날에 2배 월급을 받을 수 있습니다. 사용할 때까지 보관할 수 있습니다.',
    action: 'doubleSalary'
  },
  {
    id: 'double_salary_2',
    name: 'DOUBLE SALARY',
    name_ko: '더블 월급',
    type: 'keepable',
    description_en: 'You can get double salary on your payday. You can keep it until you use it.',
    description_ko: '월급날에 2배 월급을 받을 수 있습니다. 사용할 때까지 보관할 수 있습니다.',
    action: 'doubleSalary'
  },

  // LIFE SWAP x2
  {
    id: 'life_swap_1',
    name: 'LIFE SWAP',
    name_ko: '인생 교환',
    type: 'immediate',
    description_en: 'You can swap your life with someone. You got to use right away. You can ignore this card if you\'re happy with your life!',
    description_ko: '다른 플레이어와 인생을 통째로 바꿀 수 있습니다. 즉시 사용해야 합니다. 현재 삶에 만족한다면 무시할 수 있습니다!',
    action: 'lifeSwap'
  },
  {
    id: 'life_swap_2',
    name: 'LIFE SWAP',
    name_ko: '인생 교환',
    type: 'immediate',
    description_en: 'You can swap your life with someone. You got to use right away. You can ignore this card if you\'re happy with your life!',
    description_ko: '다른 플레이어와 인생을 통째로 바꿀 수 있습니다. 즉시 사용해야 합니다. 현재 삶에 만족한다면 무시할 수 있습니다!',
    action: 'lifeSwap'
  },

  // TAX x2
  {
    id: 'tax_1',
    name: 'TAX',
    name_ko: '세금',
    type: 'immediate',
    description_en: 'It is national tax day. Pay -50.',
    description_ko: '국세 납부일입니다. -50을 지불하세요.',
    action: 'tax',
    moneyEffect: -50
  },
  {
    id: 'tax_2',
    name: 'TAX',
    name_ko: '세금',
    type: 'immediate',
    description_en: 'It is national tax day. Pay -50.',
    description_ko: '국세 납부일입니다. -50을 지불하세요.',
    action: 'tax',
    moneyEffect: -50
  },

  // HOISIK x2
  {
    id: 'hoisik_1',
    name: 'HOISIK',
    name_ko: '회식',
    type: 'immediate',
    description_en: 'It\'s team meal time! Roll the dice to find out the bill cost. Pay dice number x10.',
    description_ko: '회식 시간입니다! 주사위를 굴려 비용을 알아보세요. 주사위 숫자 x10을 지불합니다.',
    action: 'hoisik'
  },
  {
    id: 'hoisik_2',
    name: 'HOISIK',
    name_ko: '회식',
    type: 'immediate',
    description_en: 'It\'s team meal time! Roll the dice to find out the bill cost. Pay dice number x10.',
    description_ko: '회식 시간입니다! 주사위를 굴려 비용을 알아보세요. 주사위 숫자 x10을 지불합니다.',
    action: 'hoisik'
  },

  // SHIELD x2
  {
    id: 'shield_1',
    name: 'SHIELD',
    name_ko: '쉴드',
    type: 'keepable',
    description_en: 'You can block any effects in any situation. You can keep it until you use it.',
    description_ko: '어떤 상황에서든 효과를 차단할 수 있습니다. 사용할 때까지 보관할 수 있습니다.',
    action: 'shield'
  },
  {
    id: 'shield_2',
    name: 'SHIELD',
    name_ko: '쉴드',
    type: 'keepable',
    description_en: 'You can block any effects in any situation. You can keep it until you use it.',
    description_ko: '어떤 상황에서든 효과를 차단할 수 있습니다. 사용할 때까지 보관할 수 있습니다.',
    action: 'shield'
  },

  // SPONSORSHIP x3 (different amounts)
  {
    id: 'sponsorship_150',
    name: 'SPONSORSHIP',
    name_ko: '스폰서십',
    type: 'immediate',
    description_en: 'You got brand sponsorship! +150, +5C.',
    description_ko: '브랜드 스폰서십을 받았습니다! +150, +5C.',
    action: 'sponsorship',
    moneyEffect: 150,
    creditEffect: 5
  },
  {
    id: 'sponsorship_100',
    name: 'SPONSORSHIP',
    name_ko: '스폰서십',
    type: 'immediate',
    description_en: 'You got brand sponsorship! +100, +3C.',
    description_ko: '브랜드 스폰서십을 받았습니다! +100, +3C.',
    action: 'sponsorship',
    moneyEffect: 100,
    creditEffect: 3
  },
  {
    id: 'sponsorship_50',
    name: 'SPONSORSHIP',
    name_ko: '스폰서십',
    type: 'immediate',
    description_en: 'You got brand sponsorship! +50, +1C.',
    description_ko: '브랜드 스폰서십을 받았습니다! +50, +1C.',
    action: 'sponsorship',
    moneyEffect: 50,
    creditEffect: 1
  },

  // SCENE DATE x1
  {
    id: 'scene_date',
    name: 'SCENE DATE',
    name_ko: '씬 데이트',
    type: 'immediate',
    description_en: 'You got caught on a secret date with a scene person. Give 10 to each player to make them shut up.',
    description_ko: '씬 사람과의 비밀 데이트가 들켰습니다. 다른 플레이어 모두에게 10씩 주세요.',
    action: 'sceneDate'
  },

  // MERCH COLLAB x1
  {
    id: 'merch_collab',
    name: 'MERCH COLLAB',
    name_ko: '머치 콜라보',
    type: 'immediate',
    description_en: 'You release some viral merch. Roll the dice to find out your sales. Receive dice number x10.',
    description_ko: '바이럴 머치를 출시했습니다. 주사위를 굴려 판매량을 알아보세요. 주사위 숫자 x10을 받습니다.',
    action: 'merchCollab'
  },

  // INVESTMENT x1
  {
    id: 'investment',
    name: 'INVESTMENT',
    name_ko: '투자',
    type: 'immediate',
    description_en: 'An investor has approached you with a funding opportunity. Roll the dice: even number you earn +150, odd number you lose -150. Or pay 50 to walk away.',
    description_ko: '투자자가 펀딩 기회를 제안했습니다. 주사위 굴리기: 짝수 +150, 홀수 -150. 또는 50을 내고 포기할 수 있습니다.',
    action: 'investment'
  },

  // NORAEBAND x1
  {
    id: 'noraeband',
    name: 'NORAEBAND',
    name_ko: '노래방',
    type: 'immediate',
    description_en: 'Sing your favorite song to get +1C from everybody.',
    description_ko: '좋아하는 노래를 불러 모든 플레이어로부터 +1C를 받으세요.',
    action: 'noraeband'
  },

  // DANCE CLUB x1
  {
    id: 'dance_club',
    name: 'DANCE CLUB',
    name_ko: '댄스 클럽',
    type: 'immediate',
    description_en: 'Dance! You can get +30 from everybody.',
    description_ko: '춤을 추세요! 모든 플레이어로부터 +30을 받을 수 있습니다.',
    action: 'danceClub'
  },

  // MONEY DISPUTE x1
  {
    id: 'money_dispute',
    name: 'MONEY DISPUTE',
    name_ko: '돈 분쟁',
    type: 'immediate',
    description_en: 'You can have +100 from player you choose.',
    description_ko: '선택한 플레이어로부터 +100을 받을 수 있습니다.',
    action: 'moneyDispute'
  },

  // GOT CANCELED x1
  {
    id: 'got_canceled',
    name: 'GOT CANCELED',
    name_ko: '캔슬 당했다',
    type: 'immediate',
    description_en: 'You got canceled on insta. Pick a new job, -2C.',
    description_ko: '인스타에서 캔슬 당했습니다. 새 직업을 뽑으세요, -2C.',
    action: 'gotCanceled',
    creditEffect: -2
  },

  // NEW EVENT x1
  {
    id: 'new_event',
    name: 'NEW EVENT',
    name_ko: '새 이벤트',
    type: 'immediate',
    description_en: 'You created a new popular event concept! +50, +2C.',
    description_ko: '새로운 인기 이벤트 컨셉을 만들었습니다! +50, +2C.',
    action: 'newEvent',
    moneyEffect: 50,
    creditEffect: 2
  },

  // DONATION x1
  {
    id: 'donation',
    name: 'DONATION',
    name_ko: '기부',
    type: 'immediate',
    description_en: 'You donate 100 to music organization for disadvantaged students. -100, +2C.',
    description_ko: '소외 학생을 위한 음악 단체에 100을 기부했습니다. -100, +2C.',
    action: 'donation',
    moneyEffect: -100,
    creditEffect: 2
  }
];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function createChaosDeck() {
  return shuffleArray([...CHAOS_CARDS]);
}

function createJobDeck() {
  return shuffleArray([...JOB_CARDS]);
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function getJobGrade(diceValue) {
  if (diceValue <= 2) return 'A';
  if (diceValue <= 4) return 'B';
  return 'C';
}
