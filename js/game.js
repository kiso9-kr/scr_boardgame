// Game Logic - 상태 관리 및 턴 진행

let gameState = null;

// =============================================
// INITIALIZATION
// =============================================
function initGame(playerCount, paths) {
  const chaosDeck = createChaosDeck();
  const jobDeck = createJobDeck();

  const players = [];
  for (let i = 0; i < playerCount; i++) {
    const pathChoice = paths[i];
    const startMoney = pathChoice === 'artist' ? 50 : 150;
    const startCredits = pathChoice === 'artist' ? 1 : 2;

    // Build initial path (start + first segment only, rest built dynamically at checkpoints)
    let initialPath = ['start'];
    if (pathChoice === 'artist') {
      initialPath = initialPath.concat(PATHS.artist_start);
    } else {
      initialPath = initialPath.concat(PATHS.industry_start);
    }
    initialPath.push('checkpoint_i');
    // Add common path
    initialPath = initialPath.concat(PATHS.common1);
    initialPath.push('checkpoint_ii');

    players.push({
      id: i,
      money: startMoney,
      credits: startCredits,
      job: null,
      jobGrade: null,
      initialPath: pathChoice,
      currentPath: initialPath,
      pathIndex: 0, // index in currentPath
      loans: [],
      heldCards: [],
      masteredMusic: false,
      finished: false,
      finishOrder: 0,
      resting: false,
      doubleSalary: false,
      phase2Path: null, // artist or industry for checkpoint_ii split
      phase2Sub: null   // over/under or good/bad
    });
  }

  gameState = {
    players,
    currentPlayerIndex: 0,
    chaosCardDeck: chaosDeck,
    jobCardDeck: jobDeck,
    finishCount: 0,
    phase: 'setup',
    turnPhase: 'roll', // roll, moving, event, endTurn
    waitingForInput: false
  };
}

function startGame() {
  gameState.phase = 'playing';
  refreshGameUI();
  showTurnStart();
}

// =============================================
// TURN MANAGEMENT
// =============================================
function showTurnStart() {
  const player = gameState.players[gameState.currentPlayerIndex];

  if (player.finished) {
    nextPlayer();
    return;
  }

  if (player.resting) {
    player.resting = false;
    refreshGameUI();
    showEventPopup(
      `${t('player_label')} ${gameState.currentPlayerIndex + 1}`,
      t('rest_turn'),
      '',
      [{ text: t('end_turn'), action: () => endTurn() }]
    );
    return;
  }

  gameState.turnPhase = 'roll';
  refreshGameUI();
  document.getElementById('dice-display').textContent = '?';

  renderActionButtons({
    rollDice: true,
    takeLoan: true
  });
}

function handleRollDice() {
  if (gameState.turnPhase !== 'roll') return;
  gameState.turnPhase = 'moving';

  renderActionButtons({});

  animateDice((diceResult) => {
    movePlayer(diceResult);
  });
}

function movePlayer(steps) {
  const player = gameState.players[gameState.currentPlayerIndex];
  let targetIndex = Math.min(player.pathIndex + steps, player.currentPath.length - 1);

  // Force stop at any checkpoint between current position and target
  for (let i = player.pathIndex + 1; i <= targetIndex; i++) {
    const sq = getSquare(player.currentPath[i]);
    if (sq && sq.type === 'checkpoint') {
      targetIndex = i;
      break;
    }
  }

  // Show lantern spotlight
  const token = document.getElementById(`token-p${gameState.currentPlayerIndex}`);
  if (token) token.classList.add('moving');
  showMovingSpotlight(gameState.currentPlayerIndex);

  let currentStep = player.pathIndex;
  const moveInterval = setInterval(() => {
    currentStep++;
    if (currentStep > targetIndex) {
      clearInterval(moveInterval);
      player.pathIndex = targetIndex;
      if (token) token.classList.remove('moving');
      hideMovingSpotlight();
      refreshGameUI();
      handleSquareLanding();
      return;
    }
    player.pathIndex = currentStep;
    refreshGameUI();
  }, 900);
}

// =============================================
// SQUARE LANDING LOGIC
// =============================================
function handleSquareLanding() {
  const player = gameState.players[gameState.currentPlayerIndex];
  const squareId = player.currentPath[player.pathIndex];
  const square = getSquare(squareId);
  const lang = getLanguage();

  if (!square) {
    showEndTurn();
    return;
  }

  const text = lang === 'ko' ? square.text_ko : square.text_en;
  const flavor = lang === 'ko' ? (square.flavor_ko || '') : (square.flavor_en || '');

  // Check for special squares
  if (square.special === 'chooseJob') {
    handleChooseJob(player, square, flavor);
    return;
  }

  if (square.special === 'pathSplit2') {
    handlePathSplit2(player);
    return;
  }

  if (square.special === 'creditFork') {
    handleCreditFork(player, flavor);
    return;
  }

  if (square.special === 'weatherDice') {
    handleWeatherDice(player);
    return;
  }

  if (square.special === 'covid') {
    handleCovidCheckpoint(player, square, flavor);
    return;
  }

  if (square.special === 'covidEnd') {
    handleCovidEnd(player, square);
    return;
  }

  if (square.special === 'goal') {
    handleGoal(player);
    return;
  }

  if (square.special === 'masterMusic') {
    player.masteredMusic = true;
    refreshGameUI();
    showFireworks();
    playFanfare();
    showFanfareBanner(text);
    setTimeout(() => {
      showEventPopup('🎵', text, '', [{ text: 'OK', action: () => showEndTurn() }]);
    }, 2200);
    return;
  }

  if (square.special === 'fanfare') {
    applyBasicEffects(player, square.effect);
    refreshGameUI();
    showFireworks();
    playFanfare();
    showFanfareBanner(text);
    setTimeout(() => {
      showEventPopup(SQUARE_ICONS[square.type] || '🎉', text, flavor, [{
        text: 'OK', action: () => showEndTurn()
      }]);
    }, 2200);
    return;
  }

  if (square.special === 'giveUpArtist') {
    // Move to checkpoint_i
    const cpIdx = player.currentPath.indexOf('checkpoint_i');
    if (cpIdx > -1) {
      player.pathIndex = cpIdx;
      refreshGameUI();
    }
    showEventPopup('↗️', text, '', [{ text: 'OK', action: () => handleSquareLanding() }]);
    return;
  }

  // Handle effects
  const effect = square.effect;

  // Shortcuts / moveTo
  if (effect.moveTo) {
    const moveTargetIdx = player.currentPath.indexOf(effect.moveTo);
    applyBasicEffects(player, effect);
    if (moveTargetIdx > -1) {
      showEventPopup(SQUARE_ICONS[square.type] || '📍', text, flavor, [{
        text: 'OK', action: () => {
          player.pathIndex = moveTargetIdx;
          refreshGameUI();
          handleSquareLanding();
        }
      }]);
      return;
    }
  }

  if (effect.forward) {
    showEventPopup('↗️', text, '', [{
      text: 'OK', action: () => {
        player.pathIndex = Math.min(player.pathIndex + effect.forward, player.currentPath.length - 1);
        refreshGameUI();
        handleSquareLanding();
      }
    }]);
    return;
  }

  // Chaos cards
  if (effect.chaos) {
    handleChaosCards(player, effect.chaos, effect.excludeActions || []);
    return;
  }

  // Payday
  if (effect.payday) {
    handlePayday(player, effect.payday, flavor);
    return;
  }

  // Rent
  if (effect.rent) {
    handleRent(player, effect.rent, flavor);
    return;
  }

  // Dice events
  if (effect.diceEvent === 'evenOdd') {
    handleDiceEvent(player, text, effect.evenMoney, effect.oddMoney);
    return;
  }

  // Give to right/left
  if (effect.giveRight) {
    handleGiveDirection(player, 'right', effect.giveRight, text);
    return;
  }
  if (effect.giveLeft) {
    handleGiveDirection(player, 'left', effect.giveLeft, text);
    return;
  }

  // Basic money/credit effects
  if (effect.money || effect.credit || effect.rest) {
    const shieldIdx = player.heldCards.findIndex(c => c.action === 'shield');
    if (effect.money < 0 && shieldIdx >= 0) {
      // Apply non-money effects immediately, offer shield for the money penalty
      if (effect.credit) player.credits += effect.credit;
      if (effect.rest) player.resting = true;
      refreshGameUI();
      const lang = getLanguage();
      showEventPopup(SQUARE_ICONS[square.type] || '📍', text, flavor, [
        { text: t('use_shield'), class: 'btn-pink', action: () => {
          player.heldCards.splice(shieldIdx, 1);
          refreshGameUI();
          showEndTurn();
        }},
        { text: `${lang === 'ko' ? '지불' : 'Pay'} (${effect.money})`, action: () => {
          player.money += effect.money;
          refreshGameUI();
          showEndTurn();
        }}
      ]);
      return;
    }
    applyBasicEffects(player, effect);
    refreshGameUI();
    showEventPopup(SQUARE_ICONS[square.type] || '📍', text, flavor, [{
      text: 'OK', action: () => showEndTurn()
    }]);
    return;
  }

  // Rest-only squares
  if (square.type === 'rest') {
    player.resting = true;
    refreshGameUI();
    showEventPopup('😴', text, '', [{ text: 'OK', action: () => showEndTurn() }]);
    return;
  }

  // Default - no special effect
  showEventPopup(SQUARE_ICONS[square.type] || '📍', text, flavor, [{
    text: 'OK', action: () => showEndTurn()
  }]);
}

function applyBasicEffects(player, effect) {
  if (effect.money) player.money += effect.money;
  if (effect.credit) player.credits += effect.credit;
  if (effect.rest) player.resting = true;
}

// =============================================
// PAYDAY
// =============================================
function handlePayday(player, grade, flavor) {
  if (!player.job) {
    showEventPopup('💰', getLanguage() === 'ko' ? '직업이 없어 월급을 받을 수 없습니다' : 'No job, no salary!', '', [{
      text: 'OK', action: () => showEndTurn()
    }]);
    return;
  }

  const lang = getLanguage();
  let salary = player.job.grades[grade].salary;

  // Check for held double salary card
  const dblIdx = player.heldCards.findIndex(c => c.action === 'doubleSalary');
  if (dblIdx >= 0) {
    showEventPopup('💰', `${lang === 'ko' ? '월급날' : 'Pay Day'} (${grade})\n${lang === 'ko' ? '급여' : 'Salary'}: ${salary}`, flavor, [
      { text: t('use_double_salary'), class: 'btn-yellow', action: () => {
        salary *= 2;
        player.heldCards.splice(dblIdx, 1);
        player.money += salary;
        refreshGameUI();
        showFireworks();
        showEventPopup('💰💰', `${lang === 'ko' ? '더블 월급!' : 'Double Salary!'} +${salary}`, '', [{
          text: 'OK', action: () => showEndTurn()
        }]);
      }},
      { text: 'OK (+' + salary + ')', action: () => {
        player.money += salary;
        refreshGameUI();
        showFireworks();
        showEndTurn();
      }}
    ]);
  } else {
    player.money += salary;
    refreshGameUI();
    showFireworks();
    showEventPopup('💰', `${lang === 'ko' ? '월급날' : 'Pay Day'} (${grade})\n+${salary}`, flavor, [{
      text: 'OK', action: () => showEndTurn()
    }]);
  }
}

// =============================================
// RENT
// =============================================
function handleRent(player, grade, flavor) {
  if (!player.job) {
    showEndTurn();
    return;
  }

  const rent = player.job.grades[grade].rent;
  if (rent === 0) {
    showEventPopup('🏠', getLanguage() === 'ko' ? '월세 없음!' : 'No rent!', '', [{
      text: 'OK', action: () => showEndTurn()
    }]);
    return;
  }

  // Check shield
  const shieldIdx = player.heldCards.findIndex(c => c.action === 'shield');
  if (shieldIdx >= 0) {
    showEventPopup('🏠', `${getLanguage() === 'ko' ? '월세' : 'Rent'}: -${rent}`, flavor, [
      { text: t('use_shield'), class: 'btn-pink', action: () => {
        player.heldCards.splice(shieldIdx, 1);
        refreshGameUI();
        showEndTurn();
      }},
      { text: `${getLanguage() === 'ko' ? '지불' : 'Pay'} (-${rent})`, action: () => {
        player.money -= rent;
        refreshGameUI();
        showEndTurn();
      }}
    ]);
  } else {
    player.money -= rent;
    refreshGameUI();
    showEventPopup('🏠', `${getLanguage() === 'ko' ? '월세' : 'Rent'}: -${rent}`, flavor, [{
      text: 'OK', action: () => showEndTurn()
    }]);
  }
}

// =============================================
// CHOOSE JOB (Checkpoint i)
// =============================================
function getAvailableJobs(player, deck) {
  // Industry path → industry jobs only
  // Artist path, no music skill → artist jobs except requiresMusicSkill
  // Artist path, music skill → all artist jobs
  let filter;
  if (player.initialPath !== 'artist') {
    filter = j => !j.isArtist;
  } else if (player.masteredMusic) {
    filter = j => j.isArtist;
  } else {
    filter = j => j.isArtist && !j.requiresMusicSkill;
  }
  const available = deck.filter(filter);
  if (available.length === 0) return createJobDeck().filter(filter);
  return available;
}

function handleChooseJob(player, square, flavor) {
  const lang = getLanguage();
  const available = getAvailableJobs(player, [...gameState.jobCardDeck]);

  showEventPopup('⭐', lang === 'ko' ? square.flavor_ko : square.flavor_en, '', [{
    text: t('draw_job'), class: 'btn-green', action: () => {
      hideEventPopup();
      showJobSelection(available, (chosenJob) => {
        player.job = chosenJob;
        const deckIdx = gameState.jobCardDeck.findIndex(j => j.id === chosenJob.id);
        if (deckIdx >= 0) gameState.jobCardDeck.splice(deckIdx, 1);
        refreshGameUI();
        showEndTurn();
      });
    }
  }]);
}

// =============================================
// PATH SPLIT 2 (Checkpoint ii)
// =============================================
function handlePathSplit2(player) {
  const lang = getLanguage();
  // Player chooses artist or industry path for phase 2
  // If they started as artist, they continue on artist; industry continues on industry
  const path2 = player.initialPath;
  player.phase2Path = path2;

  // Extend currentPath based on choice
  if (path2 === 'artist') {
    player.currentPath = player.currentPath.concat(PATHS.artist2);
    player.currentPath.push('checkpoint_a');
  } else {
    player.currentPath = player.currentPath.concat(PATHS.industry2);
    player.currentPath.push('checkpoint_b');
  }

  showEventPopup('⭐', lang === 'ko' ? '계속 나아갑니다!' : 'Continuing forward!', '', [{
    text: 'OK', action: () => showEndTurn()
  }]);
}

// =============================================
// CREDIT FORK (Checkpoint a)
// =============================================
function handleCreditFork(player, flavor) {
  const lang = getLanguage();
  const over10 = player.credits >= 10;

  if (over10) {
    player.currentPath = player.currentPath.concat(PATHS.artist_over);
    player.currentPath.push('checkpoint_iii');
    player.currentPath = player.currentPath.concat(PATHS.covid);
    player.currentPath.push('checkpoint_iv');
    player.currentPath = player.currentPath.concat(PATHS.final);
    player.currentPath.push('goal');
    player.phase2Sub = 'over';
  } else {
    player.currentPath = player.currentPath.concat(PATHS.artist_under);
    player.currentPath.push('checkpoint_iii');
    player.currentPath = player.currentPath.concat(PATHS.covid);
    player.currentPath.push('checkpoint_iv');
    player.currentPath = player.currentPath.concat(PATHS.final);
    player.currentPath.push('goal');
    player.phase2Sub = 'under';
  }

  const pathText = over10
    ? (lang === 'ko' ? '10C 이상! 지름길로 갑니다!' : 'Over 10C! Taking the shortcut!')
    : (lang === 'ko' ? '10C 미만. 긴 길을 갑니다.' : 'Under 10C. Taking the long road.');

  showEventPopup('⭐', pathText, flavor, [{
    text: 'OK', action: () => showEndTurn()
  }]);
}

// =============================================
// WEATHER DICE (Checkpoint b)
// =============================================
function handleWeatherDice(player) {
  const lang = getLanguage();
  showEventPopup('🌤️',
    lang === 'ko' ? '야외 행사가 있습니다! 주사위를 던져 날씨를 결정하세요.' : 'You have outdoor events! Roll the dice to decide the weather.',
    '',
    [{
      text: t('roll_dice'), class: 'btn-green', action: () => {
        animateDice((result) => {
          const isGood = result % 2 === 0;
          if (isGood) {
            player.currentPath = player.currentPath.concat(PATHS.good_weather);
            player.currentPath.push('checkpoint_iii');
            player.phase2Sub = 'good';
          } else {
            // Bad weather: 10 squares then connect to good_weather_4
            player.currentPath = player.currentPath.concat(PATHS.bad_weather);
            player.currentPath.push('good_weather_4');
            player.currentPath.push('good_weather_5');
            player.currentPath.push('checkpoint_iii');
            player.phase2Sub = 'bad';
          }
          // Add remaining common path
          player.currentPath = player.currentPath.concat(PATHS.covid);
          player.currentPath.push('checkpoint_iv');
          player.currentPath = player.currentPath.concat(PATHS.final);
          player.currentPath.push('goal');

          refreshGameUI();
          const weatherText = isGood
            ? (lang === 'ko' ? '☀️ 좋은 날씨! 순조로운 길입니다.' : '☀️ Good weather! Smooth sailing.')
            : (lang === 'ko' ? '🌧️ 나쁜 날씨! 험난한 길입니다.' : '🌧️ Bad weather! Rough road ahead.');

          showEventPopup(isGood ? '☀️' : '🌧️', weatherText, '', [{
            text: 'OK', action: () => showEndTurn()
          }]);
        });
      }
    }]
  );
}

// =============================================
// COVID CHECKPOINT
// =============================================
function handleCovidCheckpoint(player, square, flavor) {
  const lang = getLanguage();
  showEventPopup('🦠',
    lang === 'ko' ? '코로나 9시 통금! 주사위를 굴리세요.' : 'COVID 9pm curfew! Roll the dice.',
    flavor,
    [{
      text: t('roll_dice'), class: 'btn-green', action: () => {
        animateDice((result) => {
          const isEven = result % 2 === 0;
          const amount = isEven ? 100 : -100;
          player.money += amount;
          refreshGameUI();

          showEventPopup('🦠',
            `${lang === 'ko' ? '주사위' : 'Dice'}: ${result} (${isEven ? lang === 'ko' ? '짝수' : 'Even' : lang === 'ko' ? '홀수' : 'Odd'})\n${amount > 0 ? '+' : ''}${amount}`,
            '',
            [{ text: 'OK', action: () => showEndTurn() }]
          );
        });
      }
    }]
  );
}

// =============================================
// COVID END
// =============================================
function handleCovidEnd(player, square) {
  const lang = getLanguage();
  showEventPopup('🎉',
    lang === 'ko' ? '코로나 종료! 모두가 승리! 주사위를 굴리세요.' : 'End of COVID! Everybody wins! Roll the dice.',
    '',
    [{
      text: t('roll_dice'), class: 'btn-green', action: () => {
        animateDice((result) => {
          const isEven = result % 2 === 0;
          const amount = isEven ? 100 : 50;
          player.money += amount;
          refreshGameUI();
          showEventPopup('🎉',
            `${lang === 'ko' ? '주사위' : 'Dice'}: ${result}\n+${amount}`,
            '',
            [{ text: 'OK', action: () => showEndTurn() }]
          );
        });
      }
    }]
  );
}

// =============================================
// DICE EVENTS
// =============================================
function handleDiceEvent(player, text, evenMoney, oddMoney) {
  showEventPopup('🎲', text, '', [{
    text: t('roll_dice'), class: 'btn-green', action: () => {
      animateDice((result) => {
        const isEven = result % 2 === 0;
        const amount = isEven ? evenMoney : oddMoney;
        player.money += amount;
        refreshGameUI();
        const lang = getLanguage();
        showEventPopup('🎲',
          `${lang === 'ko' ? '주사위' : 'Dice'}: ${result}\n${amount > 0 ? '+' : ''}${amount}`,
          '',
          [{ text: 'OK', action: () => showEndTurn() }]
        );
      });
    }
  }]);
}

// =============================================
// GIVE DIRECTION
// =============================================
function handleGiveDirection(player, direction, amount, text) {
  const pCount = gameState.players.length;
  const ci = gameState.currentPlayerIndex;
  let targetIdx;
  if (direction === 'right') {
    targetIdx = (ci + 1) % pCount;
  } else {
    targetIdx = (ci - 1 + pCount) % pCount;
  }

  player.money -= amount;
  gameState.players[targetIdx].money += amount;
  refreshGameUI();

  const lang = getLanguage();
  showEventPopup('💸', text + `\n(→ ${t('player_label')} ${targetIdx + 1})`, '', [{
    text: 'OK', action: () => showEndTurn()
  }]);
}

// =============================================
// CHAOS CARDS
// =============================================
function handleChaosCards(player, count, excludeActions = []) {
  const drawnCards = [];
  for (let i = 0; i < count; i++) {
    if (gameState.chaosCardDeck.length === 0) {
      gameState.chaosCardDeck = createChaosDeck();
    }
    if (excludeActions.length > 0) {
      // Find the first card not in the excluded list
      const idx = gameState.chaosCardDeck.findLastIndex(c => !excludeActions.includes(c.action));
      if (idx >= 0) {
        drawnCards.push(...gameState.chaosCardDeck.splice(idx, 1));
      } else {
        drawnCards.push(gameState.chaosCardDeck.pop());
      }
    } else {
      drawnCards.push(gameState.chaosCardDeck.pop());
    }
  }

  processChaosCardQueue(player, drawnCards, 0);
}

function processChaosCardQueue(player, cards, index) {
  if (index >= cards.length) {
    showEndTurn();
    return;
  }

  const card = cards[index];
  const nextCard = () => processChaosCardQueue(player, cards, index + 1);
  processChaosCard(player, card, nextCard);
}

function processChaosCard(player, card, callback) {
  setEventCardImage(getChaosCardImage(card));
  _processChaosCardEffect(player, card, callback);
}

function _processChaosCardEffect(player, card, callback) {
  const lang = getLanguage();
  const name = lang === 'ko' ? card.name_ko : card.name;
  const desc = lang === 'ko' ? card.description_ko : card.description_en;

  // Check shield
  const shieldIdx = player.heldCards.findIndex(c => c.action === 'shield');

  switch (card.action) {
    case 'communityCollab':
      showEventPopup(`🃏 ${name}`, desc, '', [{
        text: t('choose_player'), class: 'btn-green', action: () => {
          showPlayerSelection(gameState.currentPlayerIndex, (targetIdx) => {
            animateDice((result) => {
              const earn = result * 10;
              player.money += earn;
              gameState.players[targetIdx].money += earn;
              refreshGameUI();
              showEventPopup('🤝', `${lang === 'ko' ? '주사위' : 'Dice'}: ${result}\n${lang === 'ko' ? '둘 다' : 'Both earn'} +${earn}`, '', [{
                text: 'OK', action: callback
              }]);
            });
          });
        }
      }]);
      break;

    case 'doubleSalary':
      player.heldCards.push(card);
      refreshGameUI();
      showEventPopup(`🃏 ${name}`, desc + `\n\n${lang === 'ko' ? '카드를 보관합니다!' : 'Card kept!'}`, '', [{
        text: 'OK', action: callback
      }]);
      break;

    case 'shield':
      player.heldCards.push(card);
      refreshGameUI();
      showEventPopup(`🃏 ${name}`, desc + `\n\n${lang === 'ko' ? '카드를 보관합니다!' : 'Card kept!'}`, '', [{
        text: 'OK', action: callback
      }]);
      break;

    case 'lifeSwap':
      showEventPopup(`🃏 ${name}`, desc, '', [
        { text: t('choose_player'), class: 'btn-pink', action: () => {
          showPlayerSelection(gameState.currentPlayerIndex, (targetIdx) => {
            const target = gameState.players[targetIdx];
            // Swap everything except position and path
            const tempMoney = player.money;
            const tempCredits = player.credits;
            const tempJob = player.job;
            const tempGrade = player.jobGrade;
            const tempLoans = [...player.loans];
            const tempHeld = [...player.heldCards];

            player.money = target.money;
            player.credits = target.credits;
            player.job = target.job;
            player.jobGrade = target.jobGrade;
            player.loans = [...target.loans];
            player.heldCards = [...target.heldCards];

            target.money = tempMoney;
            target.credits = tempCredits;
            target.job = tempJob;
            target.jobGrade = tempGrade;
            target.loans = tempLoans;
            target.heldCards = tempHeld;

            refreshGameUI();
            showEventPopup('🔄', lang === 'ko' ? '인생을 교환했습니다!' : 'Life swapped!', '', [{
              text: 'OK', action: callback
            }]);
          });
        }},
        { text: t('skip'), action: callback }
      ]);
      break;

    case 'tax':
      if (shieldIdx >= 0) {
        showEventPopup(`🃏 ${name}`, desc, '', [
          { text: t('use_shield'), class: 'btn-pink', action: () => {
            player.heldCards.splice(shieldIdx, 1);
            refreshGameUI();
            callback();
          }},
          { text: `${lang === 'ko' ? '지불' : 'Pay'} (-50)`, action: () => {
            player.money += card.moneyEffect;
            refreshGameUI();
            callback();
          }}
        ]);
      } else {
        player.money += card.moneyEffect;
        refreshGameUI();
        showEventPopup(`🃏 ${name}`, desc, '', [{ text: 'OK', action: callback }]);
      }
      break;

    case 'hoisik':
      showEventPopup(`🃏 ${name}`, desc, '', [{
        text: t('roll_dice'), class: 'btn-green', action: () => {
          animateDice((result) => {
            const cost = result * 10;
            if (shieldIdx >= 0) {
              showEventPopup('🍖', `${lang === 'ko' ? '주사위' : 'Dice'}: ${result}\n-${cost}`, '', [
                { text: t('use_shield'), class: 'btn-pink', action: () => {
                  player.heldCards.splice(shieldIdx, 1);
                  refreshGameUI();
                  callback();
                }},
                { text: `${lang === 'ko' ? '지불' : 'Pay'} (-${cost})`, action: () => {
                  player.money -= cost;
                  refreshGameUI();
                  callback();
                }}
              ]);
            } else {
              player.money -= cost;
              refreshGameUI();
              showEventPopup('🍖', `${lang === 'ko' ? '주사위' : 'Dice'}: ${result}\n-${cost}`, '', [{
                text: 'OK', action: callback
              }]);
            }
          });
        }
      }]);
      break;

    case 'sponsorship':
      player.money += card.moneyEffect;
      player.credits += card.creditEffect;
      refreshGameUI();
      showEventPopup(`🃏 ${name}`, desc, '', [{ text: 'OK', action: callback }]);
      break;

    case 'sceneDate': {
      const otherPlayers = gameState.players.filter((_, i) => i !== gameState.currentPlayerIndex);
      const totalCost = otherPlayers.length * 10;
      if (shieldIdx >= 0) {
        showEventPopup(`🃏 ${name}`, desc + `\n(-${totalCost})`, '', [
          { text: t('use_shield'), class: 'btn-pink', action: () => {
            player.heldCards.splice(shieldIdx, 1);
            refreshGameUI();
            callback();
          }},
          { text: `${lang === 'ko' ? '지불' : 'Pay'} (-${totalCost})`, action: () => {
            player.money -= totalCost;
            otherPlayers.forEach(p => p.money += 10);
            refreshGameUI();
            callback();
          }}
        ]);
      } else {
        player.money -= totalCost;
        otherPlayers.forEach(p => p.money += 10);
        refreshGameUI();
        showEventPopup(`🃏 ${name}`, desc + `\n(-${totalCost})`, '', [{ text: 'OK', action: callback }]);
      }
      break;
    }

    case 'merchCollab':
      showEventPopup(`🃏 ${name}`, desc, '', [{
        text: t('roll_dice'), class: 'btn-green', action: () => {
          animateDice((result) => {
            const earn = result * 10;
            player.money += earn;
            refreshGameUI();
            showEventPopup('👕', `${lang === 'ko' ? '주사위' : 'Dice'}: ${result}\n+${earn}`, '', [{
              text: 'OK', action: callback
            }]);
          });
        }
      }]);
      break;

    case 'investment':
      showEventPopup(`🃏 ${name}`, desc, '', [
        { text: t('roll_investment'), class: 'btn-green', action: () => {
          animateDice((result) => {
            const isEven = result % 2 === 0;
            const amount = isEven ? 150 : -150;
            player.money += amount;
            refreshGameUI();
            showEventPopup('📈', `${lang === 'ko' ? '주사위' : 'Dice'}: ${result}\n${amount > 0 ? '+' : ''}${amount}`, '', [{
              text: 'OK', action: callback
            }]);
          });
        }},
        { text: t('walk_away'), class: 'btn-yellow', action: () => {
          player.money -= 50;
          refreshGameUI();
          callback();
        }}
      ]);
      break;

    case 'noraeband':
      showEventPopup(`🃏 ${name}`, desc, '', [
        { text: t('sing'), class: 'btn-green', action: () => {
          const othersCount = gameState.players.length - 1;
          player.credits += othersCount;
          gameState.players.forEach((p, i) => {
            if (i !== gameState.currentPlayerIndex) p.credits -= 1;
          });
          refreshGameUI();
          showEventPopup('🎤', `+${othersCount}C!`, '', [{ text: 'OK', action: callback }]);
        }},
        { text: t('skip'), action: callback }
      ]);
      break;

    case 'danceClub':
      showEventPopup(`🃏 ${name}`, desc, '', [
        { text: t('dance'), class: 'btn-green', action: () => {
          const othersCount = gameState.players.length - 1;
          const earn = othersCount * 30;
          player.money += earn;
          gameState.players.forEach((p, i) => {
            if (i !== gameState.currentPlayerIndex) p.money -= 30;
          });
          refreshGameUI();
          showEventPopup('💃', `+${earn}!`, '', [{ text: 'OK', action: callback }]);
        }},
        { text: t('skip'), action: callback }
      ]);
      break;

    case 'moneyDispute':
      showEventPopup(`🃏 ${name}`, desc, '', [{
        text: t('choose_player'), class: 'btn-pink', action: () => {
          showPlayerSelection(gameState.currentPlayerIndex, (targetIdx) => {
            gameState.players[targetIdx].money -= 100;
            player.money += 100;
            refreshGameUI();
            showEventPopup('💸', `+100 ${lang === 'ko' ? '로부터' : 'from'} ${t('player_label')} ${targetIdx + 1}`, '', [{
              text: 'OK', action: callback
            }]);
          });
        }
      }]);
      break;

    case 'gotCanceled': {
      player.credits += card.creditEffect;
      // Draw new job randomly
      const availableJobs = getAvailableJobs(player, [...gameState.jobCardDeck]);
      const rndIdx = Math.floor(Math.random() * availableJobs.length);
      const newJob = availableJobs[rndIdx];

      showEventPopup(`🃏 ${name}`, desc, '', [{
        text: t('draw_job'), class: 'btn-green', action: () => {
          player.job = newJob;
          const deckIdx2 = gameState.jobCardDeck.findIndex(j => j.id === newJob.id);
          if (deckIdx2 >= 0) gameState.jobCardDeck.splice(deckIdx2, 1);
          refreshGameUI();
          showCardImagePopup(getJobCardImage(newJob.id), () => {
            showEventPopup('🎭', `${lang === 'ko' ? '새 직업' : 'New Job'}: ${newJob.name}`, '', [{
              text: 'OK', action: callback
            }]);
          });
        }
      }]);
      break;
    }

    case 'newEvent':
      player.money += card.moneyEffect;
      player.credits += card.creditEffect;
      refreshGameUI();
      showEventPopup(`🃏 ${name}`, desc, '', [{ text: 'OK', action: callback }]);
      break;

    case 'donation':
      player.money += card.moneyEffect;
      player.credits += card.creditEffect;
      refreshGameUI();
      showEventPopup(`🃏 ${name}`, desc, '', [{ text: 'OK', action: callback }]);
      break;

    default:
      showEventPopup(`🃏 ${name}`, desc, '', [{ text: 'OK', action: callback }]);
  }
}

function removeHeldCard(player, action) {
  const idx = player.heldCards.findIndex(c => c.action === action);
  if (idx >= 0) player.heldCards.splice(idx, 1);
}

// =============================================
// GOAL
// =============================================
function handleGoal(player) {
  const lang = getLanguage();
  player.finished = true;
  gameState.finishCount++;
  player.finishOrder = gameState.finishCount;

  // Bonus
  let bonus = 0;
  if (gameState.finishCount === 1) bonus = 300;
  else if (gameState.finishCount === 2) bonus = 200;
  else if (gameState.finishCount === 3) bonus = 100;

  player.money += bonus;
  refreshGameUI();

  showEventPopup('🏆',
    `${lang === 'ko' ? '도착!' : 'GOAL!'}\n${lang === 'ko' ? `${gameState.finishCount}등!` : `${getOrdinal(gameState.finishCount)} place!`}\n${bonus > 0 ? `${lang === 'ko' ? '보너스' : 'Bonus'}: +${bonus}` : ''}`,
    '',
    [{ text: 'OK', action: () => {
      // Check if all finished
      if (gameState.players.every(p => p.finished)) {
        calculateFinalScores();
      } else {
        showEndTurn();
      }
    }}]
  );
}

function getOrdinal(n) {
  if (n === 1) return '1st';
  if (n === 2) return '2nd';
  if (n === 3) return '3rd';
  return n + 'th';
}

// =============================================
// LOAN
// =============================================
function handleTakeLoan() {
  const player = gameState.players[gameState.currentPlayerIndex];
  const lang = getLanguage();

  if (player.credits >= 1) {
    showEventPopup('🏦', t('loan_confirm'), '', [
      { text: t('pay_with_credit'), class: 'btn-yellow', action: () => {
        player.credits -= 1;
        player.money += 100;
        refreshGameUI();
        showTurnStart();
      }},
      { text: t('loan_direct'), class: 'btn-pink', action: () => {
        player.loans.push(100);
        player.money += 100;
        refreshGameUI();
        showTurnStart();
      }},
      { text: t('close'), action: () => showTurnStart() }
    ]);
  } else {
    showEventPopup('🏦', t('loan_confirm'), '', [
      { text: t('loan_direct'), class: 'btn-pink', action: () => {
        player.loans.push(100);
        player.money += 100;
        refreshGameUI();
        showTurnStart();
      }},
      { text: t('close'), action: () => showTurnStart() }
    ]);
  }
}

// =============================================
// HELD CARD USE
// =============================================
function useHeldCard(cardIndex, action) {
  const player = gameState.players[gameState.currentPlayerIndex];
  // Shield is used reactively in event handlers, not proactively
}

// =============================================
// END TURN
// =============================================
function showEndTurn() {
  gameState.turnPhase = 'endTurn';
  renderActionButtons({ endTurn: true, takeLoan: true, showHeldCards: true });
}

function endTurn() {
  nextPlayer();
}

function nextPlayer() {
  let next = (gameState.currentPlayerIndex + 1) % gameState.players.length;
  let attempts = 0;

  while (gameState.players[next].finished && attempts < gameState.players.length) {
    next = (next + 1) % gameState.players.length;
    attempts++;
  }

  if (attempts >= gameState.players.length) {
    calculateFinalScores();
    return;
  }

  gameState.currentPlayerIndex = next;
  showTurnStart();
}

// =============================================
// FINAL SCORE CALCULATION
// =============================================
function calculateFinalScores() {
  const lang = getLanguage();
  const rankings = gameState.players.map((player, i) => {
    // Repay loans: principal + 50 fee each
    let loanRepayment = 0;
    player.loans.forEach(loan => {
      loanRepayment += loan + 50;
    });

    const finalMoney = player.money - loanRepayment;

    // Convert money to credits (100 = 1C, no rounding)
    const moneyToCredit = Math.floor(Math.max(0, finalMoney) / 100);

    // Respect bonus from job
    const respectBonus = player.job ? player.job.respectBonus : 0;

    const totalCredits = player.credits + moneyToCredit + respectBonus;

    return {
      playerIndex: i,
      job: player.job,
      finalMoney,
      moneyToCredit,
      respectBonus,
      baseCredits: player.credits,
      totalCredits,
      finishOrder: player.finishOrder
    };
  });

  // Sort by total credits descending
  rankings.sort((a, b) => b.totalCredits - a.totalCredits);

  renderGameOver(rankings);
}
