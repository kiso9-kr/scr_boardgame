// Internationalization - 한글/영어 번역
let currentLanguage = 'ko';

const TRANSLATIONS = {
  // =============================================
  // INTRO SCREEN
  // =============================================
  intro_title: {
    ko: '이태원게임',
    en: 'ITAEWON GAME'
  },
  intro_text: {
    ko: `<strong class="intro-text-header">'이태원게임'의 소중한 주인이 되신 것을 진심으로 축하드립니다!</strong>이 게임은 서울 커뮤니티 라디오가 한국 언더그라운드 음악 문화 속에서 10년간 쌓아온 실제 경험을 바탕으로 손수 제작한, 최대 5인까지 즐길 수 있는 재미있는 보드게임입니다.
이 게임을 통해 여러분은 2016년부터 이태원에서 음악인으로서 성장해 온 우리의 경험을 스토리텔링 방식으로 다시 체험하게 됩니다.
저희가 이 게임을 만들고 (그리고 경험하며!) 느꼈던 즐거움을 여러분도 함께 느끼시길 바랍니다.`,
    en: `<strong class="intro-text-header">Congratulations on becoming the proud owner of 'The Itaewon Game'!</strong>This game is a fun board game for up to 5 players, handcrafted by Seoul Community Radio based on 10 years of real experience in Korea's underground music culture.
Through this game, you will re-experience our journey of growing as musicians in Itaewon since 2016 in a storytelling format.
We hope you enjoy the same fun we had making (and experiencing!) this game.`
  },
  select_language: {
    ko: '언어 선택',
    en: 'Select Language'
  },
  select_players: {
    ko: '플레이어 수 선택',
    en: 'Select Number of Players'
  },
  players_suffix: {
    ko: '명',
    en: ' Players'
  },
  start_game: {
    ko: '게임 시작',
    en: 'Start Game'
  },

  // =============================================
  // PATH SELECTION
  // =============================================
  choose_path: {
    ko: '진로를 선택하세요',
    en: 'Choose Your Path'
  },
  choose_path_subtitle: {
    ko: '아티스트의 길을 선택했을 때, 게임 중간에 musical 스킬을 획득하지 못하면\n직업 선택에 제한이 생깁니다.',
    en: 'If you choose the Artist path but don\'t acquire musical skills during the game,\nyour job choices will be limited.'
  },
  artist_path: {
    ko: '아티스트 길',
    en: 'Artist Path'
  },
  artist_path_desc: {
    ko: '50원과 1크레딧으로 시작\n올바른 방향으로 나아가면 음악 기술을 마스터하고 아티스트 직업을 얻을 수 있습니다.',
    en: 'Start with 50 money and 1 credit\nIf you go in the right direction, you can master music skills and get an artist job.'
  },
  industry_path: {
    ko: '음악 산업 길',
    en: 'Music Industry Path'
  },
  industry_path_desc: {
    ko: '150원과 2크레딧으로 시작',
    en: 'Start with 150 money and 2 credits'
  },
  player_label: {
    ko: '플레이어',
    en: 'Player'
  },
  confirm_path: {
    ko: '선택 완료',
    en: 'Confirm'
  },

  // =============================================
  // HOW TO PLAY CARDS
  // =============================================
  how_to_play: {
    ko: '게임 방법',
    en: 'How to Play'
  },
  card1_text: {
    ko: `1. 플레이어는 시계 방향으로 차례대로 주사위를 굴립니다.
2. 차례가 되면 주사위를 굴려 나온 숫자만큼 이태원 거리와 골목길을 따라 이동하세요.
- 각 칸에서는 <strong>돈 또는 크레딧</strong>을 잃거나 얻게 되는 일들이 발생합니다.
- 어떤 칸에서는 휴식을 취하거나, 다음 행동을 생각하거나, 인생을 바꿀 수도 있는 <mark>카오스 카드</mark>를 뽑을 수도 있습니다.`,
    en: `1. Players take turns rolling the dice clockwise.
2. On your turn, roll the dice and move along the streets and alleys of Itaewon by the number shown.
- At each square, you may gain or lose <strong>money or community credits</strong>.
- At some squares, you can rest, think about your next move, or draw a life-changing <mark>chaos card</mark>.`
  },
  view_chaos_info: {
    ko: '카오스 카드 설명 보기',
    en: 'View Chaos Card Info'
  },
  chaos_info_text: {
    ko: `<strong class="intro-text-header">Chaos Card</strong>이태원에서의 삶은 언제나 놀라움으로 가득합니다!
카오스 카드는 세계에서 가장 빠르게 변화하는 음악의 중심지 중 하나인 이태원에서 성공하기 위한 예측 불가능한 여정을 상징합니다! 카오스 카드가 나오면 운에 따라 지시를 따르세요!
특정 카오스 카드에는 특별한 규칙이 있습니다. 아래에서 추가적인 안내가 필요한 몇 가지 카드를 확인하세요.

<strong class="intro-text-header">댄스 카드 / 노래 카드</strong>이 카드는 플레이어의 용기를 요구합니다! 플레이어가 너무 수줍어하거나 어떤 이유로든 노래나 춤을 추고 싶지 않다면 참여하지 않을 수 있지만, 이 경우 돈이나 크레딧을 받지 못합니다.

<strong class="intro-text-header">X10 주사위 굴리기 카오스 카드</strong>이 카드는 다양하며 스폰서십, 다른 플레이어와의 협업, 커뮤니티 기부, 아이템 구매 등과 관련될 수 있습니다. 'X10'이라는 문구가 보이면 주사위를 굴려 나온 숫자에 10을 곱하세요.
(예: 주사위 3이 나오면 30을 획득).

<strong class="intro-text-header">취소 카드</strong>이 카드는 직업을 바꿔야 한다는 의미입니다! 현재 직업을 버리고 새로운 직업 카드를 뽑으세요. 아티스트 경로를 통해 음악 기술을 마스터했다면 아티스트 직업을 유지할 수 있습니다.

<strong class="intro-text-header">인생 교환 카드</strong>가장 강력한 카드 중 하나입니다! 이 카드를 사용하면 보드 위의 모든 플레이어와 직업, 돈, 크레딧을 포함한 삶을 통째로 바꿀 수 있습니다. 현재 삶에 만족한다면 이 카드를 무시해도 됩니다!`,
    en: `<strong class="intro-text-header">Chaos Card</strong>Life in Itaewon is always full of surprises!
Chaos cards represent the unpredictable journey to success in Itaewon, one of the world's fastest-changing music hubs! When a chaos card comes up, follow the instructions based on your luck!
Some chaos cards have special rules. Check below for cards that need additional guidance.

<strong class="intro-text-header">Dance Card / Singing Card</strong>These cards require courage! If a player is too shy or doesn't want to sing or dance for any reason, they can skip — but they won't receive money or credits.

<strong class="intro-text-header">X10 Dice Roll Chaos Cards</strong>These cards are varied and can relate to sponsorships, collaborations with other players, community donations, item purchases, etc. When you see 'X10', roll the dice and multiply the number by 10.
(e.g., if you roll a 3, you earn 30).

<strong class="intro-text-header">Cancel Card</strong>This means you have to change jobs! Discard your current job and draw a new job card. If you mastered music skills through the artist path, you can keep your artist job.

<strong class="intro-text-header">Life Swap Card</strong>One of the most powerful cards! This card lets you swap your entire life — job, money, credits — with any player on the board. If you're happy with your life, you can ignore this card!`
  },
  card2_text: {
    ko: `<strong class="intro-text-header">커뮤니티 크레딧 vs 돈</strong>전자 음악 커뮤니티에서는 돈과 커뮤니티 크레딧/커뮤니티 가치 모두 중요하지만, <strong>궁극적으로 음악은 돈을 버는 것만이 전부는 아닙니다.</strong> 따라서 <u>게임이 끝나면 돈을 크레딧으로</u> 바꿔야 합니다!`,
    en: `<strong class="intro-text-header">Community Credits vs Money</strong>In the electronic music community, both money and community credits/community value are important, but <strong>ultimately music isn't all about making money.</strong> Therefore, <u>at the end of the game, you must convert money into</u> credits!`
  },
  card3_text: {
    ko: `게임 종료 시 크레딧 전환 공식은 다음과 같습니다.
<mark>돈 100 = 크레딧 1</mark>
참고: 남은 돈은 반올림하지 않습니다.

모든 플레이어가 보드 끝에 도달하면 <strong>크레딧이 가장 많은 플레이어</strong>가 승리합니다!`,
    en: `The credit conversion formula at the end of the game is:
<mark>100 Money = 1 Credit</mark>
Note: Remaining money is not rounded up.

When all players reach the end of the board, <strong>the player with the most credits</strong> wins!`
  },
  card4_text: {
    ko: `게임판은 이태원의 동네와 거리를 축소해 놓은 듯한 모습입니다.
지금은 사라진 자유분방한 분위기의 우사단로에서 시작하여 경리단과 녹사평 같은 주택가를 지나, 상징적인 이태원 중심가의 불빛 아래에서 여정을 마무리하게 됩니다.
저희처럼, 그리고 이 게임 커뮤니티의 많은 사람들처럼, <strong>여러분도 처음에는 보잘것없는 시작을 하겠지만, 큰 포부는 위대한 성취를 가져올 수 있습니다.</strong> <u><em>다만 인생에는 예상치 못한 일들이 기다리고 있으니 조심하세요!</em></u>`,
    en: `The board looks like a miniature version of Itaewon's neighborhoods and streets.
Starting from the now-gone free-spirited Usadan-ro, passing through residential areas like Gyeongridan and Noksapyeong, and ending your journey under the iconic lights of central Itaewon.
Like us, and like many people in this game's community, <strong>you'll start from humble beginnings, but great ambitions can lead to great achievements.</strong> <u><em>Just be careful — life has unexpected things waiting for you!</em></u>`
  },
  card5_text: {
    ko: `<strong class="intro-text-header">Out of Money</strong>돈이 없나요? 은행 대출을 받으세요! 빚을 갚거나 물건을 살 돈이 부족하다면 크레딧을 사용하여 자금을 확보해야 합니다.
<span class="text-center">대출 비율은 다음과 같습니다.</span><span class="text-center"><mark>1C = 100</mark></span>
크레딧이 없지만 돈을 빌려야 하는 경우, 바로 대출을 받을 수 있습니다.
게임 종료 시, 빌린 금액과 대출 건당 50의 수수료를 모두 상환해야 합니다.`,
    en: `<strong class="intro-text-header">Out of Money</strong>No money? Take a bank loan! If you don't have enough money to pay debts or buy things, you need to use credits to secure funds.
<span class="text-center">The loan rate is:</span><span class="text-center"><mark>1C = 100</mark></span>
If you have no credits but need to borrow money, you can take a loan immediately.
At the end of the game, you must repay the borrowed amount plus a 50 fee per loan.`
  },
  card6_text: {
    ko: `<strong class="intro-text-header">Reaching the Goal, End of the Game</strong>게임을 가장 먼저 완료한 세 명의 플레이어에게는 다음과 같은 보너스가 지급됩니다.
<strong class="intro-text-header">1위: 300</strong><strong class="intro-text-header">2위: 200</strong><strong class="intro-text-header">3위: 100</strong>
모든 플레이어가 게임을 완료하면, 모든 돈과 크레딧을 합산하고 100 = 1C 공식을 사용하여 돈을 크레딧으로 변환합니다.
'게임 종료 시 존경을 얻을 수 있는' 직업을 가진 플레이어는 직업 카드에 명시된 크레딧을 추가합니다.
모든 대출금도 이때 상환해야 합니다.

게임 종료 시 <strong><mark>가장 많은 크레딧</mark></strong>을 보유한 플레이어가 이태원 두목이 됩니다! 축하합니다!`,
    en: `<strong class="intro-text-header">Reaching the Goal, End of the Game</strong>The first three players to complete the game receive the following bonuses:
1st: 300
2nd: 200
3rd: 100
When all players complete the game, add up all money and credits, and convert money to credits using the 100 = 1C formula.
Players with jobs that 'can get respected at the end' add the credits stated on their job card.
All loans must also be repaid at this time.
The player with the <strong><mark>most credits</mark></strong> at the end becomes the Boss of Itaewon! Congratulations!`
  },
  next_card: {
    ko: '다음',
    en: 'Next'
  },
  prev_card: {
    ko: '이전',
    en: 'Previous'
  },
  close: {
    ko: '닫기',
    en: 'Close'
  },
  lets_play: {
    ko: '<strong>게임 시작!</strong>',
    en: "<strong>Let's Play!</strong>"
  },

  // =============================================
  // GAME SCREEN
  // =============================================
  roll_dice: {
    ko: '주사위 굴리기',
    en: 'Roll Dice'
  },
  take_loan: {
    ko: '대출받기',
    en: 'Take Loan'
  },
  end_turn: {
    ko: '턴 종료',
    en: 'End Turn'
  },
  money_label: {
    ko: '돈',
    en: 'Money'
  },
  credit_label: {
    ko: '크레딧',
    en: 'Credits'
  },
  job_label: {
    ko: '직업',
    en: 'Job'
  },
  grade_label: {
    ko: '등급',
    en: 'Grade'
  },
  loans_label: {
    ko: '대출',
    en: 'Loans'
  },
  held_cards_label: {
    ko: '보유 카드',
    en: 'Held Cards'
  },
  current_turn: {
    ko: '의 차례',
    en: "'s Turn"
  },
  use_shield: {
    ko: '쉴드 사용',
    en: 'Use Shield'
  },
  use_double_salary: {
    ko: '더블 월급 사용',
    en: 'Use Double Salary'
  },
  skip: {
    ko: '건너뛰기',
    en: 'Skip'
  },
  accept: {
    ko: '수락',
    en: 'Accept'
  },
  decline: {
    ko: '거절',
    en: 'Decline'
  },
  choose_player: {
    ko: '플레이어를 선택하세요',
    en: 'Choose a player'
  },
  choose_job: {
    ko: '직업을 선택하세요',
    en: 'Choose a job'
  },
  draw_job: {
    ko: '직업 카드 뽑기',
    en: 'Draw Job Card'
  },
  rest_turn: {
    ko: '쉬어가는 중... 다음 턴에 플레이할 수 있습니다',
    en: 'Resting... You can play on your next turn'
  },
  loan_confirm: {
    ko: '대출을 받으시겠습니까?\n1C = 100원\n(크레딧이 없으면 바로 대출 가능, 게임 종료 시 원금 + 건당 50 수수료)',
    en: 'Do you want to take a loan?\n1C = 100 money\n(If no credits, you can loan directly. At game end: principal + 50 fee per loan)'
  },
  loan_amount: {
    ko: '대출 금액',
    en: 'Loan Amount'
  },
  pay_with_credit: {
    ko: '크레딧으로 지불 (1C = 100원)',
    en: 'Pay with credit (1C = 100 money)'
  },
  loan_direct: {
    ko: '직접 대출 (게임 종료 시 상환 + 수수료 50)',
    en: 'Direct loan (Repay at game end + 50 fee)'
  },

  // =============================================
  // GAME END
  // =============================================
  game_over: {
    ko: '게임 종료!',
    en: 'Game Over!'
  },
  final_scores: {
    ko: '최종 점수',
    en: 'Final Scores'
  },
  winner: {
    ko: '이태원 두목',
    en: 'Boss of Itaewon'
  },
  finish_bonus: {
    ko: '도착 보너스',
    en: 'Finish Bonus'
  },
  respect_bonus: {
    ko: '존경 보너스',
    en: 'Respect Bonus'
  },
  money_to_credit: {
    ko: '돈 → 크레딧',
    en: 'Money → Credits'
  },
  loan_repay: {
    ko: '대출 상환',
    en: 'Loan Repayment'
  },
  total_credits: {
    ko: '총 크레딧',
    en: 'Total Credits'
  },
  play_again: {
    ko: '다시 하기',
    en: 'Play Again'
  },
  congratulations: {
    ko: '축하합니다!',
    en: 'Congratulations!'
  },

  // =============================================
  // MISC
  // =============================================
  walk_away: {
    ko: '50 내고 포기',
    en: 'Pay 50 to walk away'
  },
  roll_investment: {
    ko: '주사위 굴리기 (짝수: +150, 홀수: -150)',
    en: 'Roll dice (even: +150, odd: -150)'
  },
  sing: {
    ko: '노래하기',
    en: 'Sing'
  },
  dance: {
    ko: '춤추기',
    en: 'Dance'
  },
  no_job: {
    ko: '없음',
    en: 'None'
  },
  resting: {
    ko: '(쉬는 중)',
    en: '(Resting)'
  },
  finished: {
    ko: '(도착)',
    en: '(Finished)'
  }
};

function t(key) {
  const entry = TRANSLATIONS[key];
  if (!entry) return key;
  return entry[currentLanguage] || entry['en'] || key;
}

function setLanguage(lang) {
  currentLanguage = lang;
}

function getLanguage() {
  return currentLanguage;
}
